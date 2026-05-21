import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { AddressInfo } from 'net';
import path from 'path';

const app = express();
app.use(cors());

// Servir los archivos estáticos del cliente compilado (Phaser + Vite)
app.use(express.static(path.join(process.cwd(), 'dist')));

// Ruta comodín para asegurar que index.html se sirva en cualquier GET del cliente
app.get('/*splat', (req, res, next) => {
    // Si la petición es para Socket.io, dejamos que pase
    if (req.path.startsWith('/socket.io')) {
        return next();
    }
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });
const port = Number(process.env.PORT ?? 3000);

const players: Record<string, any> = {};
let nextWeaponId = 0;
const weapons: Record<string, any> = {};
const MAX_WEAPONS_ON_FIELD = 20;
const WEAPON_PICKUP_RADIUS = 48;

const corpses: Array<{ id: string; x: number; y: number }> = [];
const MAX_CORPSES = 40;

let hostId: string | null = null;
const dummies: Record<string, any> = {
    'dummy_0': { id: 'dummy_0', x: 333, y: 100, hp: 3, vx: 0, vy: 0, anim: 'player-idle', scaleX: 1.28, scaleY: 1.18, rotation: 0, flipX: false, gunX: 0, gunY: 0, gunRotation: 0, gunFlipY: false, gunVisible: false },
    'dummy_1': { id: 'dummy_1', x: 733, y: 100, hp: 3, vx: 0, vy: 0, anim: 'player-idle', scaleX: 1.28, scaleY: 1.18, rotation: 0, flipX: false, gunX: 0, gunY: 0, gunRotation: 0, gunFlipY: false, gunVisible: false }
};

// Bucle de generación de armas en el servidor (cada 3 segundos)
setInterval(() => {
    if (Object.keys(weapons).length >= MAX_WEAPONS_ON_FIELD) {
        return;
    }

    const id = `weapon_${nextWeaponId++}`;
    const weaponData = {
        id,
        x: Math.floor(Math.random() * 600) + 233,
        y: -50 // Caen desde arriba
    };
    weapons[id] = weaponData;
    io.emit('spawnWeapon', weaponData);

    // Las armas desaparecen automáticamente después de 30 segundos
    setTimeout(() => {
        if (weapons[id]) {
            console.log(`[weapon-timeout] Expiró arma ${id} después de 30s`);
            delete weapons[id];
            io.emit('weaponDestroy', id);
        }
    }, 30000);
}, 3000);

io.on('connection', (socket) => {
    console.log(`[+] Conectado: ${socket.id}`);
    
    players[socket.id] = { 
        x: 533, 
        y: 100, 
        scaleX: 1, 
        scaleY: 1, 
        rotation: 0,
        flipX: false,
        anim: 'player-idle',
        gunVisible: false,
        gunX: 0,
        gunY: 0,
        gunRotation: 0,
        gunFlipY: false
    };

    // Elect host if none active
    if (hostId === null) {
        hostId = socket.id;
        console.log(`[host] Elected host: ${hostId}`);
    }
    socket.emit('hostStatus', { isHost: socket.id === hostId });

    // Anunciar al resto que entró un jugador nuevo.
    socket.broadcast.emit('newPlayer', {
        id: socket.id,
        player: players[socket.id]
    });

    // Enviar estado inicial: jugadores, armas, cadáveres y bots
    socket.emit('currentPlayers', players);
    socket.emit('currentWeapons', weapons);
    socket.emit('currentCorpses', corpses);
    socket.emit('currentDummies', dummies);

    socket.on('playerMovement', (data) => {
        if (players[socket.id]) {
            players[socket.id] = data;
            socket.broadcast.emit('playerMoved', { id: socket.id, ...data });
        }
    });

    // Sincronización de disparos
    socket.on('shoot', (shootData) => {
        // El servidor recibe el disparo y lo retransmite a los demás
        socket.broadcast.emit('enemyShot', { 
            ownerId: socket.id, 
            ...shootData 
        });
    });

    // Cuando un jugador recoge un arma
    socket.on('weaponPickedUp', (weaponId) => {
        const weapon = weapons[weaponId];
        const player = players[socket.id];

        console.log(`[pickup] Player ${socket.id} trying to pick up weapon ${weaponId}`);
        console.log(`[pickup] Weapon:`, weapon);
        console.log(`[pickup] Player:`, player);

        if (!weapon || !player) {
            console.log(`[pickup] Denied: missing weapon or player`);
            socket.emit('weaponPickupDenied', { weaponId, reason: 'missing_weapon_or_player' });
            return;
        }

        const dx = player.x - weapon.x;
        console.log(`[pickup] dx: ${dx}, limit: ${WEAPON_PICKUP_RADIUS}`);
        // Since weapon Y is simulated with gravity on the client but static on the server (y = -50),
        // we only perform a horizontal (X) distance check to avoid false-negatives due to Y mismatch.
        if (Math.abs(dx) > WEAPON_PICKUP_RADIUS) {
            console.log(`[pickup] Denied: out of range (dx = ${dx})`);
            socket.emit('weaponPickupDenied', { weaponId, reason: 'out_of_range' });
            return;
        }

        console.log(`[pickup] Confirmed!`);
        delete weapons[weaponId];
        socket.emit('weaponPickedUpConfirmed', weaponId);
        io.emit('weaponDestroy', weaponId);
    });

    // Sincronización de cadáveres (corpses)
    socket.on('spawnCorpse', (corpseData) => {
        const id = corpseData.id || `corpse_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        const newCorpse = { id, x: corpseData.x, y: corpseData.y };
        corpses.push(newCorpse);
        console.log(`[corpse] Spawned corpse: ${id} at x=${corpseData.x}, y=${corpseData.y}`);

        if (corpses.length > MAX_CORPSES) {
            const removed = corpses.shift();
            if (removed) {
                console.log(`[corpse] Removing old corpse: ${removed.id}`);
                io.emit('removeCorpse', removed.id);
            }
        }

        socket.broadcast.emit('corpseSpawned', newCorpse);
    });

    // Caching settled weapon Y coordinates to prevent sky drops on client reloads
    socket.on('weaponLanded', (data: { id: string; x: number; y: number }) => {
        if (weapons[data.id]) {
            weapons[data.id].x = data.x;
            weapons[data.id].y = data.y;
            console.log(`[weapon-landed] Weapon ${data.id} settled at x=${data.x}, y=${data.y}`);
        }
    });

    // Broadcasting throwing trajectories across mecha lobbies
    socket.on('throwWeapon', (data: any) => {
        socket.broadcast.emit('enemyThrownWeapon', {
            ownerId: socket.id,
            ...data
        });
        console.log(`[throw] Player ${socket.id} threw mecha bolt at angle=${data.angle}`);
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('playerDisconnected', socket.id);

        if (socket.id === hostId) {
            const remainingIds = Object.keys(players);
            if (remainingIds.length > 0) {
                hostId = remainingIds[0];
                io.to(hostId).emit('hostStatus', { isHost: true });
                console.log(`[host] Transferred host status to player: ${hostId}`);
            } else {
                hostId = null;
                console.log(`[host] No players remaining. Host is null.`);
            }
        }
    });

    // Bot Synchronization events
    socket.on('dummyUpdate', (updatedDummies: any) => {
        if (socket.id === hostId) {
            Object.keys(updatedDummies).forEach(id => {
                if (dummies[id]) {
                    dummies[id] = { ...dummies[id], ...updatedDummies[id] };
                }
            });
            socket.broadcast.emit('dummyMoved', updatedDummies);
        }
    });

    socket.on('dummyShot', (shotData: any) => {
        if (socket.id === hostId) {
            socket.broadcast.emit('enemyShot', { ownerId: shotData.dummyId, ...shotData });
        }
    });

    socket.on('dummyHit', (hitData: any) => {
        const dummy = dummies[hitData.dummyId];
        if (dummy) {
            if (hitData.isVoid) {
                dummy.hp = 0;
            } else {
                dummy.hp--;
            }
            io.emit('dummyDamaged', { dummyId: hitData.dummyId, hp: dummy.hp, shooterId: socket.id });
            if (dummy.hp <= 0) {
                dummy.hp = 3;
                const respawnX = Math.floor(Math.random() * 700) + 180;
                const respawnY = 50;
                const deathX = dummy.x;
                const deathY = dummy.y;
                dummy.x = respawnX;
                dummy.y = respawnY;
                dummy.vx = 0;
                dummy.vy = 0;
                const corpseId = 'corpse_' + Date.now() + '_' + Math.floor(Math.random() * 1000);

                if (deathY <= 600) {
                    const newCorpse = { id: corpseId, x: deathX, y: deathY };
                    corpses.push(newCorpse);
                    if (corpses.length > MAX_CORPSES) {
                        const removed = corpses.shift();
                        if (removed) {
                            io.emit('removeCorpse', removed.id);
                        }
                    }
                }

                io.emit('dummyKilled', { dummyId: hitData.dummyId, corpseId, respawnX, respawnY, deathX, deathY });
            }
        }
    });
});

httpServer.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`[-] Puerto ${port} en uso. Cierra el proceso actual o usa PORT=<otro>.`);
        return;
    }

    console.error('[-] Error del servidor:', error);
});

httpServer.listen(port, () => {
    const address = httpServer.address() as AddressInfo | null;
    const activePort = address?.port ?? port;
    console.log(`[+] Servidor levantado en http://localhost:${activePort}`);
});