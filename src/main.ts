import * as Phaser from 'phaser';
import { io, Socket } from 'socket.io-client';
import './style.css';

function createMetalSlugSkyTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    const grad = ctx.createLinearGradient(0, 0, 0, 600);
    grad.addColorStop(0, '#361e12'); // Dark industrial warm brown
    grad.addColorStop(0.4, '#7c401c'); // Terracotta warm orange
    grad.addColorStop(0.8, '#c6843c'); // Sunset copper/gold
    grad.addColorStop(1, '#e6b86c'); // Warm sandy gold
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 600);
    return canvas.toDataURL();
}

function createMetalSlugSmokeTexture1() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.imageSmoothingEnabled = false;

    const drawSmoke = (cx: number, cy: number) => {
        ctx.fillStyle = '#422818';
        ctx.beginPath();
        ctx.arc(cx + 24, cy + 28, 14, 0, Math.PI * 2);
        ctx.arc(cx + 48, cy + 20, 18, 0, Math.PI * 2);
        ctx.arc(cx + 74, cy + 24, 16, 0, Math.PI * 2);
        ctx.arc(cx + 96, cy + 30, 12, 0, Math.PI * 2);
        ctx.rect(cx + 14, cy + 20, 90, 18);
        ctx.fill();

        ctx.fillStyle = '#8c5834';
        ctx.beginPath();
        ctx.arc(cx + 24, cy + 28, 12, 0, Math.PI * 2);
        ctx.arc(cx + 48, cy + 20, 16, 0, Math.PI * 2);
        ctx.arc(cx + 74, cy + 24, 14, 0, Math.PI * 2);
        ctx.arc(cx + 96, cy + 30, 10, 0, Math.PI * 2);
        ctx.rect(cx + 16, cy + 20, 86, 16);
        ctx.fill();

        ctx.fillStyle = '#c69460';
        ctx.beginPath();
        ctx.arc(cx + 24, cy + 26, 10, 0, Math.PI * 2);
        ctx.arc(cx + 48, cy + 17, 14, 0, Math.PI * 2);
        ctx.arc(cx + 74, cy + 21, 12, 0, Math.PI * 2);
        ctx.arc(cx + 96, cy + 28, 8, 0, Math.PI * 2);
        ctx.rect(cx + 18, cy + 18, 80, 12);
        ctx.fill();
    };

    drawSmoke(0, 10);
    return canvas.toDataURL();
}

function createMetalSlugSmokeTexture2() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.imageSmoothingEnabled = false;

    const drawWispy = (cx: number, cy: number) => {
        ctx.fillStyle = '#422818';
        ctx.beginPath();
        ctx.ellipse(cx + 64, cy + 32, 50, 10, 0, 0, Math.PI * 2);
        ctx.ellipse(cx + 40, cy + 32, 20, 14, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#8c5834';
        ctx.beginPath();
        ctx.ellipse(cx + 64, cy + 32, 46, 8, 0, 0, Math.PI * 2);
        ctx.ellipse(cx + 40, cy + 32, 17, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#c69460';
        ctx.beginPath();
        ctx.ellipse(cx + 64, cy + 30, 42, 6, 0, 0, Math.PI * 2);
        ctx.ellipse(cx + 40, cy + 30, 14, 9, 0, 0, Math.PI * 2);
        ctx.fill();
    };

    drawWispy(0, 0);
    return canvas.toDataURL();
}

function createMetalSlugSmokeTexture3() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.imageSmoothingEnabled = false;

    const drawStorm = (cx: number, cy: number) => {
        ctx.fillStyle = '#422818';
        ctx.beginPath();
        ctx.arc(cx + 32, cy + 36, 18, 0, Math.PI * 2);
        ctx.arc(cx + 64, cy + 24, 22, 0, Math.PI * 2);
        ctx.arc(cx + 96, cy + 36, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#8c5834';
        ctx.beginPath();
        ctx.arc(cx + 32, cy + 36, 15, 0, Math.PI * 2);
        ctx.arc(cx + 64, cy + 24, 19, 0, Math.PI * 2);
        ctx.arc(cx + 96, cy + 36, 15, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#c69460';
        ctx.beginPath();
        ctx.arc(cx + 32, cy + 33, 12, 0, Math.PI * 2);
        ctx.arc(cx + 64, cy + 21, 16, 0, Math.PI * 2);
        ctx.arc(cx + 96, cy + 33, 12, 0, Math.PI * 2);
        ctx.fill();
    };

    drawStorm(0, 0);
    return canvas.toDataURL();
}

function createMetalSlugRuinsTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = '#4a2c1b';

    ctx.beginPath();
    ctx.ellipse(120, 256, 180, 100, 0, 0, Math.PI * 2);
    ctx.ellipse(380, 256, 220, 120, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(40, 100, 80, 160);
    ctx.fillRect(70, 40, 20, 60);

    ctx.fillRect(160, 80, 12, 180);
    ctx.fillRect(240, 60, 12, 200);
    ctx.fillRect(160, 100, 90, 8);
    ctx.fillRect(160, 150, 90, 8);

    ctx.fillRect(320, 80, 16, 180);
    ctx.fillRect(280, 80, 120, 10);

    ctx.beginPath();
    ctx.ellipse(430, 256, 70, 70, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(400, 140, 60, 120);

    ctx.fillRect(430, 60, 4, 80);
    ctx.fillRect(425, 80, 14, 4);

    ctx.fillRect(0, 200, 512, 56);

    ctx.fillStyle = '#6e4028';
    ctx.fillRect(48, 108, 64, 148);
    ctx.fillRect(74, 46, 12, 54);
    ctx.fillRect(406, 148, 48, 108);

    ctx.beginPath();
    ctx.ellipse(200, 256, 50, 60, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#c6843c';
    ctx.fillRect(56, 130, 12, 12);
    ctx.fillRect(84, 130, 12, 12);
    ctx.fillRect(56, 160, 12, 12);
    ctx.fillRect(84, 160, 12, 12);

    ctx.fillRect(415, 170, 10, 10);
    ctx.fillRect(435, 170, 10, 10);
    ctx.fillRect(415, 200, 10, 10);
    ctx.fillRect(435, 200, 10, 10);

    return canvas.toDataURL();
}

function createMetalSlugGroundTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    ctx.imageSmoothingEnabled = false;

    // Rusted industrial metal plating
    ctx.fillStyle = '#5c3824'; // Warm rust base brown
    ctx.fillRect(0, 0, 32, 32);

    // Plate seams and shadows
    ctx.fillStyle = '#2d180c'; // Deep dark sepia
    ctx.fillRect(0, 30, 32, 2); // Bottom border
    ctx.fillRect(30, 0, 2, 32); // Right border
    ctx.fillRect(0, 0, 32, 1);  // Top shadow
    ctx.fillRect(0, 0, 1, 32);  // Left shadow

    // Heavy rust/damage details
    ctx.fillStyle = '#422818'; // Dark corrosion
    ctx.fillRect(4, 4, 6, 3);
    ctx.fillRect(14, 18, 10, 4);
    ctx.fillRect(2, 22, 6, 2);
    ctx.fillRect(22, 8, 4, 8);

    ctx.fillStyle = '#7c4c34'; // Bright rust highlights
    ctx.fillRect(8, 6, 4, 2);
    ctx.fillRect(18, 16, 6, 2);
    ctx.fillRect(4, 24, 4, 2);
    ctx.fillRect(24, 12, 4, 2);

    // Rivet studs on corners
    const drawRivet = (rx: number, ry: number) => {
        ctx.fillStyle = '#2d180c'; // Rivet shadow
        ctx.fillRect(rx, ry + 1, 3, 2);
        ctx.fillStyle = '#c6843c'; // Rivet copper highlight
        ctx.fillRect(rx + 1, ry, 2, 2);
    };
    drawRivet(3, 3);
    drawRivet(25, 3);
    drawRivet(3, 25);
    drawRivet(25, 25);

    // Top metal trim plate highlight
    ctx.fillStyle = '#9c6444';
    ctx.fillRect(1, 1, 29, 2);
    ctx.fillRect(1, 1, 2, 29);

    return canvas.toDataURL();
}

type FramePainter = (ctx: CanvasRenderingContext2D, frameSize: number) => void;

const RETRO_PALETTE = {
    outline: '#1f1a16',
    shadow: '#3d3328',
    dark: '#565046',
    mid: '#6d6d6d',
    light: '#b9b39e',
    olive: '#b8541c',
    oliveLight: '#f4b03c',
    armor: '#6d6d6d',
    armorLight: '#a6a6a6',
    warning: '#f4b41b',
    rust: '#a3523e',
    cable: '#4b2e24',
    smoke: '#6e6258',
    tracer: '#fff1b8',
    tracerCore: '#fff7f0',
    sand: '#d2b48c',
    sandDark: '#b89b68',
    black: '#120f0c',
    white: '#f9f4e8'
};

function drawPixelRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function createSpriteSheetDataUrl(frameWidth: number, frameHeight: number, frames: FramePainter[]) {
    const canvas = document.createElement('canvas');
    canvas.width = frameWidth * frames.length;
    canvas.height = frameHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('No se pudo crear el canvas para el spritesheet retro.');
    }

    ctx.imageSmoothingEnabled = false;
    frames.forEach((paintFrame, index) => {
        ctx.save();
        ctx.translate(index * frameWidth, 0);
        paintFrame(ctx, frameWidth);
        ctx.restore();
    });

    return canvas.toDataURL('image/png');
}

function drawRetroPlayerFrame(ctx: CanvasRenderingContext2D, _size: number, variant: 'idle' | 'walk1' | 'walk2' | 'jump' | 'dead') {
    const isJump = variant === 'jump';
    const isDead = variant === 'dead';
    const bodyTilt = variant === 'walk1' ? -1 : variant === 'walk2' ? 1 : 0;
    const trackShift = variant === 'walk1' ? 1 : variant === 'walk2' ? -1 : 0;

    // Outer silhouette
    drawPixelRect(ctx, 8, 7, 16, 17, RETRO_PALETTE.outline);
    drawPixelRect(ctx, 9, 8, 14, 15, isDead ? RETRO_PALETTE.shadow : RETRO_PALETTE.olive);

    // Armor panels / three-tone shading
    drawPixelRect(ctx, 10, 9, 12, 4, isDead ? RETRO_PALETTE.dark : RETRO_PALETTE.oliveLight);
    drawPixelRect(ctx, 10, 13, 12, 5, isDead ? RETRO_PALETTE.shadow : RETRO_PALETTE.olive);
    drawPixelRect(ctx, 10, 18, 12, 2, isDead ? RETRO_PALETTE.rust : RETRO_PALETTE.dark);
    drawPixelRect(ctx, 11, 10, 3, 2, RETRO_PALETTE.light);
    drawPixelRect(ctx, 19, 10, 2, 2, RETRO_PALETTE.warning);
    drawPixelRect(ctx, 13, 14, 6, 3, isDead ? RETRO_PALETTE.smoke : RETRO_PALETTE.armorLight);

    // Hatch / details / rivets
    drawPixelRect(ctx, 14, 12, 4, 3, isDead ? RETRO_PALETTE.cable : RETRO_PALETTE.mid);
    drawPixelRect(ctx, 12, 12, 1, 1, RETRO_PALETTE.outline);
    drawPixelRect(ctx, 19, 12, 1, 1, RETRO_PALETTE.outline);
    drawPixelRect(ctx, 12, 17, 1, 1, RETRO_PALETTE.outline);
    drawPixelRect(ctx, 19, 17, 1, 1, RETRO_PALETTE.outline);

    // Eyes / visor
    if (!isDead) {
        drawPixelRect(ctx, 12, 11, 2, 2, RETRO_PALETTE.warning);
        drawPixelRect(ctx, 18, 11, 2, 2, RETRO_PALETTE.warning);
        drawPixelRect(ctx, 13, 16, 6, 1, RETRO_PALETTE.white);
    } else {
        drawPixelRect(ctx, 12, 11, 8, 2, RETRO_PALETTE.rust);
        drawPixelRect(ctx, 13, 16, 5, 1, RETRO_PALETTE.cable);
    }

    // Arms
    drawPixelRect(ctx, 5, 12 + bodyTilt, 4, 5, isDead ? RETRO_PALETTE.rust : RETRO_PALETTE.armor);
    drawPixelRect(ctx, 23, 12 - bodyTilt, 4, 5, isDead ? RETRO_PALETTE.rust : RETRO_PALETTE.armor);
    drawPixelRect(ctx, 4, 14 + bodyTilt, 2, 2, RETRO_PALETTE.warning);
    drawPixelRect(ctx, 24, 14 - bodyTilt, 2, 2, RETRO_PALETTE.warning);

    // Tracks / base
    drawPixelRect(ctx, 7, 22, 18, 5, RETRO_PALETTE.outline);
    drawPixelRect(ctx, 8, 23, 16, 3, isDead ? RETRO_PALETTE.rust : RETRO_PALETTE.dark);
    drawPixelRect(ctx, 9 + trackShift, 24, 4, 1, RETRO_PALETTE.light);
    drawPixelRect(ctx, 15, 24, 4, 1, RETRO_PALETTE.light);
    drawPixelRect(ctx, 10, 25, 12, 1, isDead ? RETRO_PALETTE.cable : RETRO_PALETTE.oliveLight);

    if (isJump) {
        drawPixelRect(ctx, 10, 20, 12, 2, RETRO_PALETTE.white);
        drawPixelRect(ctx, 12, 21, 8, 1, RETRO_PALETTE.warning);
    }

    if (isDead) {
        drawPixelRect(ctx, 9, 19, 14, 4, RETRO_PALETTE.rust);
        drawPixelRect(ctx, 11, 18, 2, 6, RETRO_PALETTE.cable);
        drawPixelRect(ctx, 18, 18, 2, 6, RETRO_PALETTE.cable);
        drawPixelRect(ctx, 14, 20, 1, 5, RETRO_PALETTE.warning);
    }
}

function drawRetroLaserFrame(ctx: CanvasRenderingContext2D, _size: number, variant: 'gun' | 'flash1' | 'flash2') {
    if (variant === 'gun') {
        drawPixelRect(ctx, 1, 6, 12, 3, RETRO_PALETTE.black);
        drawPixelRect(ctx, 2, 5, 11, 5, RETRO_PALETTE.outline);
        drawPixelRect(ctx, 3, 6, 9, 3, RETRO_PALETTE.dark);
        drawPixelRect(ctx, 4, 7, 6, 1, RETRO_PALETTE.light);
        drawPixelRect(ctx, 10, 4, 2, 5, RETRO_PALETTE.mid);
        drawPixelRect(ctx, 12, 5, 2, 3, RETRO_PALETTE.warning);
        drawPixelRect(ctx, 6, 4, 4, 2, RETRO_PALETTE.armorLight);
        drawPixelRect(ctx, 5, 9, 3, 2, RETRO_PALETTE.shadow);
        drawPixelRect(ctx, 7, 8, 2, 2, RETRO_PALETTE.black);
        drawPixelRect(ctx, 13, 6, 1, 1, RETRO_PALETTE.white);
        return;
    }

    const spread = variant === 'flash1' ? 2 : 4;
    drawPixelRect(ctx, 7, 1 + spread, 2, 6, RETRO_PALETTE.warning);
    drawPixelRect(ctx, 1 + spread, 7, 6, 2, RETRO_PALETTE.warning);
    drawPixelRect(ctx, 7, 7, 2, 2, RETRO_PALETTE.white);
    drawPixelRect(ctx, 4, 4, 2, 2, RETRO_PALETTE.white);
    drawPixelRect(ctx, 10, 4, 2, 2, RETRO_PALETTE.warning);
    drawPixelRect(ctx, 4, 10, 2, 2, RETRO_PALETTE.warning);
    drawPixelRect(ctx, 10, 10, 2, 2, RETRO_PALETTE.white);
}

interface DummyObj {
    id: string;
    hitbox: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    visual: Phaser.GameObjects.Sprite;
    gun: Phaser.GameObjects.Sprite;
    lastFired: number;
    hp: number; 
}

class MainScene extends Phaser.Scene {
    // --- VARIABLES DE MOVIMIENTO JUGADOR ---
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private playerVisual!: Phaser.GameObjects.Sprite; 

    private keys!: {
        left: Phaser.Input.Keyboard.Key;
        right: Phaser.Input.Keyboard.Key;
        up: Phaser.Input.Keyboard.Key;
        down: Phaser.Input.Keyboard.Key;
        dash: Phaser.Input.Keyboard.Key;
    };
    private facingDirection: -1 | 1 = 1;
    private isDashing = false;
    private readonly dashSpeed = 800;
    private readonly dashDurationMs = 140;
    private readonly dashCooldownMs = 350;
    private readonly runSpeed = 250;
    private readonly jumpSpeed = -400;
    private nextDashAt = 0;
    
    private isCrouching = false;
    private lastGroundedAt = 0;
    private readonly crouchGroundGraceMs = 120;
    
    private crouchCurrentSpeed = 0;
    private currentCrouchProgress = 0; 
    private hasCrouchRebounded = false;
    private blockCrouchUntil = 0;

    private readonly crouchStartSpeed = 230;
    private readonly crouchMinSpeed = 90;
    private readonly crouchDecelerationPerSecond = 170;
    private readonly crouchMaxScaleX = 1.35;
    private readonly crouchMinScaleY = 0.55;
    private readonly crouchFinalScaleX = 1.92;
    private readonly crouchFinalScaleY = 0.24;
    
    private readonly crouchMinReboundSpeed = -250; 
    private readonly crouchMaxReboundSpeed = -650; 
    private readonly crouchReboundLockMs = 180;

    private readonly standingCollider = { width: 22, height: 30, offsetX: 5, offsetY: 2 };
    private readonly crouchingCollider = { width: 28, height: 18, offsetX: 2, offsetY: 14 };

    // --- VARIABLES DE ARMAMENTO Y SISTEMA COMPETITIVO ---
    private bullets!: Phaser.Physics.Arcade.Group;
    private weapons!: Phaser.Physics.Arcade.Group;
    private thrownWeapons!: Phaser.Physics.Arcade.Group; 
    private gunSprite!: Phaser.GameObjects.Sprite; 
    
    private corpses!: Phaser.Physics.Arcade.StaticGroup; 
    private dummyHitboxes!: Phaser.Physics.Arcade.Group;
    private dummiesList: DummyObj[] = [];

    // ECONOMÍA DE ARMAS
    private hasWeapon = false; 
    private playerAmmo = 0;
    private readonly maxAmmo = 7;
    // ammoText removed for HTML overlay HUD
    private pickupRequestPending = false;
    private pendingWeaponPickupId: string | null = null;

    private lastFired = 0;
    private readonly fireRate = 200; 
    private recoilUntil = 0;
    
    private playerHp = 3; 
    private isDead = false;

    // --- VARIABLES DE MULTIJUGADOR ---
    private socket!: Socket;
    private otherPlayers!: Phaser.GameObjects.Group;
    private pendingNetworkWeapons: Array<{ id: string; x: number; y: number }> = [];
    private bulletTrailEmitters = new Map<Phaser.GameObjects.GameObject, Phaser.GameObjects.Particles.ParticleEmitter>();
    // hud icons removed for HTML overlay HUD
    private scanlines!: Phaser.GameObjects.TileSprite;
    private smwHillBg!: Phaser.GameObjects.TileSprite;

    private isHost = false;
    private cloudsList: Phaser.GameObjects.Sprite[] = [];

    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.spritesheet('retroPlayer', createSpriteSheetDataUrl(32, 32, [
            (ctx) => drawRetroPlayerFrame(ctx, 32, 'idle'),
            (ctx) => drawRetroPlayerFrame(ctx, 32, 'walk1'),
            (ctx) => drawRetroPlayerFrame(ctx, 32, 'walk2'),
            (ctx) => drawRetroPlayerFrame(ctx, 32, 'jump'),
            (ctx) => drawRetroPlayerFrame(ctx, 32, 'dead')
        ]), { frameWidth: 32, frameHeight: 32 });

        this.load.spritesheet('retroLaser', createSpriteSheetDataUrl(16, 16, [
            (ctx) => drawRetroLaserFrame(ctx, 16, 'gun'),
            (ctx) => drawRetroLaserFrame(ctx, 16, 'flash1'),
            (ctx) => drawRetroLaserFrame(ctx, 16, 'flash2')
        ]), { frameWidth: 16, frameHeight: 16 });

        this.load.image('smwSky', createMetalSlugSkyTexture());
        this.load.image('smwCloud1', createMetalSlugSmokeTexture1());
        this.load.image('smwCloud2', createMetalSlugSmokeTexture2());
        this.load.image('smwCloud3', createMetalSlugSmokeTexture3());
        this.load.image('smwHill', createMetalSlugRuinsTexture());
        this.load.image('smwGround', createMetalSlugGroundTexture());

        const graphics = this.make.graphics({ x: 0, y: 0 }, false);
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(0, 0, 2, 2);
        graphics.generateTexture('pixel', 2, 2);
        graphics.clear();

        graphics.lineStyle(1, 0x8b764f, 0.45);
        graphics.fillStyle(0x8a6e46, 1);
        graphics.fillRect(0, 0, 64, 64);
        for (let i = 0; i <= 64; i += 8) {
            graphics.lineBetween(i, 0, i, 64);
            graphics.lineBetween(0, i, 64, i);
        }
        graphics.generateTexture('grid', 64, 64);
        graphics.clear();

        graphics.fillStyle(0x5c4a38, 0.16);
        for (let y = 0; y < 64; y += 4) {
            graphics.fillRect(0, y, 64, 2);
        }
        graphics.generateTexture('scanlines', 64, 64);
        graphics.clear();

        graphics.fillStyle(0xb85e43, 1);
        graphics.fillTriangle(4, 12, 12, 12, 8, 2);
        graphics.fillTriangle(4, 12, 12, 12, 8, 22);
        graphics.fillRect(6, 8, 4, 10);
        graphics.generateTexture('heart', 16, 24);
        graphics.clear();

        graphics.fillStyle(0x7f866f, 1);
        graphics.fillRect(2, 2, 10, 16);
        graphics.fillStyle(0x1f1a16, 1);
        graphics.fillRect(4, 4, 6, 12);
        graphics.fillStyle(0xf4b41b, 1);
        graphics.fillRect(6, 6, 2, 8);
        graphics.generateTexture('battery', 14, 20);
        graphics.clear();

        graphics.fillStyle(0xff5500, 1); // Neon orange outer glow
        graphics.fillRect(0, 0, 18, 8);
        graphics.fillStyle(0xffe600, 1); // Neon yellow inner glow
        graphics.fillRect(2, 2, 14, 4);
        graphics.fillStyle(0xffffff, 1); // Super bright white core
        graphics.fillRect(4, 3, 10, 2);
        graphics.generateTexture('bullet', 18, 8);
        graphics.clear();
    }

    private createRetroAnimations() {
        if (!this.anims.exists('player-idle')) {
            this.anims.create({
                key: 'player-idle',
                frames: [{ key: 'retroPlayer', frame: 0 }],
                frameRate: 1,
                repeat: -1
            });
            this.anims.create({
                key: 'player-run',
                frames: [
                    { key: 'retroPlayer', frame: 1 },
                    { key: 'retroPlayer', frame: 2 }
                ],
                frameRate: 8,
                repeat: -1
            });
            this.anims.create({
                key: 'player-jump',
                frames: [{ key: 'retroPlayer', frame: 3 }],
                frameRate: 1,
                repeat: -1
            });
            this.anims.create({
                key: 'player-dead',
                frames: [{ key: 'retroPlayer', frame: 4 }],
                frameRate: 1,
                repeat: -1
            });
            this.anims.create({
                key: 'muzzle-flash',
                frames: [
                    { key: 'retroLaser', frame: 1 },
                    { key: 'retroLaser', frame: 2 }
                ],
                frameRate: 18,
                repeat: 0
            });
        }
    }

    private setupRetroHud() {
        const toggleBtn = document.getElementById('controls-toggle');
        const drawer = document.getElementById('controls-drawer');
        if (toggleBtn && drawer) {
            toggleBtn.onclick = () => {
                drawer.classList.toggle('open');
            };
        }
    }

    private refreshHud() {
        const hpBar = document.getElementById('hud-hp-bar');
        const hpCurrent = document.getElementById('hud-hp-current');
        if (hpBar) {
            const hpPct = (this.playerHp / 3) * 100;
            hpBar.style.width = `${hpPct}%`;
            if (this.playerHp <= 1) {
                hpBar.classList.add('critical');
            } else {
                hpBar.classList.remove('critical');
            }
        }
        if (hpCurrent) {
            hpCurrent.innerText = Math.max(0, this.playerHp).toString();
        }

        const weaponName = document.getElementById('hud-weapon-name');
        const weaponIcon = document.getElementById('hud-weapon-icon');
        const ammoText = document.getElementById('hud-ammo-text');
        
        if (weaponName) {
            weaponName.innerText = this.hasWeapon ? 'MECHA BOLTS' : 'NO WEAPON';
        }
        if (weaponIcon) {
            if (this.hasWeapon) {
                weaponIcon.innerText = '⚡';
                weaponIcon.classList.add('active');
            } else {
                weaponIcon.innerText = '❌';
                weaponIcon.classList.remove('active');
            }
        }
        if (ammoText) {
            if (this.hasWeapon) {
                if (this.playerAmmo > 0) {
                    ammoText.innerText = `BOLTS ${this.playerAmmo}/${this.maxAmmo}`;
                    ammoText.style.color = '#f9f4e8';
                } else {
                    ammoText.innerText = 'VACÍA! DISPARA O LANZA';
                    ammoText.style.color = '#b8541c';
                }
            } else {
                ammoText.innerText = 'SEARCH FIELD';
                ammoText.style.color = '#a6a6a6';
            }
        }

        const slots = document.querySelectorAll('.ammo-slot');
        slots.forEach((slot, index) => {
            if (this.hasWeapon) {
                slot.classList.remove('empty-flash');
                if (index < this.playerAmmo) {
                    slot.classList.add('active');
                } else {
                    slot.classList.remove('active');
                    if (this.playerAmmo === 0) {
                        slot.classList.add('empty-flash');
                    }
                }
            } else {
                slot.classList.remove('active');
                slot.classList.remove('empty-flash');
            }
        });
    }

    private updateOnlineCount() {
        const count = this.otherPlayers ? (this.otherPlayers.getLength() + 1) : 1;
        const el = document.getElementById('hud-online-players');
        if (el) el.innerText = `ONLINE: ${count}`;

        const squadList = document.getElementById('squad-list');
        if (squadList) {
            squadList.innerHTML = '';
            
            const localItem = document.createElement('div');
            localItem.className = 'squad-item local';
            localItem.innerHTML = `<span>🤖 YOU</span><span class="status-indicator"></span>`;
            squadList.appendChild(localItem);

            if (this.otherPlayers) {
                this.otherPlayers.getChildren().forEach((other: any) => {
                    const id = other.getData('id') || 'UNKNOWN';
                    const shortId = id.substring(0, 6).toUpperCase();
                    const item = document.createElement('div');
                    item.className = 'squad-item';
                    item.innerHTML = `<span>⚙️ MECHA_${shortId}</span><span class="status-indicator"></span>`;
                    squadList.appendChild(item);
                });
            }
        }
    }

    private flashSprite(sprite: Phaser.GameObjects.Sprite, tint: number, duration = 70) {
        sprite.setTint(tint);
        this.tweens.add({
            targets: sprite,
            alpha: { from: 1, to: 0.85 },
            duration,
            yoyo: true,
            repeat: 1,
            onComplete: () => sprite.clearTint().setAlpha(1)
        });
    }

    private shakeCamera(power: number) {
        const duration = Phaser.Math.Clamp(50 + power * 0.08, 50, 130);
        const intensity = Phaser.Math.Clamp(0.002 + power * 0.000015, 0.002, 0.02);
        this.cameras.main.shake(duration, intensity);
    }

    private spawnMuzzleFlash(x: number, y: number, flipLeft: boolean) {
        const flash = this.add.sprite(x, y, 'retroLaser', 1).setDepth(30).setFlipX(flipLeft).setScale(1.2);
        flash.play('muzzle-flash');
        flash.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => flash.destroy());
    }

    private attachBulletTrail(bullet: Phaser.Physics.Arcade.Sprite) {
        if (this.bulletTrailEmitters.has(bullet)) {
            return;
        }

        const emitter = this.add.particles(0, 0, 'pixel', {
            speed: { min: 0, max: 35 },
            lifespan: { min: 120, max: 220 },
            alpha: { start: 0.85, end: 0 },
            scale: { start: 2.5, end: 0 }, // Brighter and thicker glow trails
            tint: [0xffffff, 0xffe600, 0xff5500],
            frequency: 14,
            blendMode: Phaser.BlendModes.ADD,
            maxParticles: 18,
        });

        emitter.startFollow(bullet);
        this.bulletTrailEmitters.set(bullet, emitter);

        bullet.once(Phaser.GameObjects.Events.DESTROY, () => {
            this.cleanupBulletTrail(bullet);
        });
    }

    private cleanupBulletTrail(bullet: Phaser.GameObjects.GameObject) {
        const emitter = this.bulletTrailEmitters.get(bullet);
        if (!emitter) {
            return;
        }

        emitter.stop();
        emitter.destroy();
        this.bulletTrailEmitters.delete(bullet);
    }

    private setRetrowaveCamera() {
        this.cameras.main.setBackgroundColor('#361e12');
    }

    private applyDamageFeedback(target: Phaser.GameObjects.Sprite, tint: number, shakePower = 30) {
        this.flashSprite(target, tint, 70);
        this.shakeCamera(shakePower);
    }

    private setCrouchState(crouching: boolean) {
        const body = this.player.body as Phaser.Physics.Arcade.Body;
        this.isCrouching = crouching;
        if (crouching) {
            body.setSize(this.crouchingCollider.width, this.crouchingCollider.height, false);
            body.setOffset(this.crouchingCollider.offsetX, 32 - this.crouchingCollider.height);
        } else {
            body.setSize(this.standingCollider.width, this.standingCollider.height, false);
            body.setOffset(this.standingCollider.offsetX, 32 - this.standingCollider.height);
        }
    }

    create() {
        this.input.mouse!.disableContextMenu();
        this.setRetrowaveCamera();

        // Draw SMW Sky gradient background
        this.add.image(533, 300, 'smwSky').setDisplaySize(1066, 600).setDepth(-100).setScrollFactor(0);

        // Spawn 8 organic drifting clouds with random types, sizes, and speeds
        const cloudKeys = ['smwCloud1', 'smwCloud2', 'smwCloud3'];
        for (let i = 0; i < 8; i++) {
            const key = Phaser.Utils.Array.GetRandom(cloudKeys);
            const x = Phaser.Math.Between(0, 1166);
            const y = Phaser.Math.Between(40, 220);
            const scale = Phaser.Math.FloatBetween(0.8, 1.5);
            const speed = Phaser.Math.FloatBetween(12, 32);
            const cloud = this.add.sprite(x, y, key);
            cloud.setDepth(-95);
            cloud.setScrollFactor(0);
            cloud.setScale(scale);
            cloud.setData('speed', speed);
            this.cloudsList.push(cloud);
        }

        // Create repeating ruins background base seamlessly aligned to the bottom viewport bezel
        this.smwHillBg = this.add.tileSprite(533, 600, 1066, 256, 'smwHill')
            .setOrigin(0.5, 1)
            .setDepth(-90)
            .setScrollFactor(0);

        this.scanlines = this.add.tileSprite(533, 300, 1066, 600, 'scanlines')
            .setDepth(220)
            .setAlpha(0.04)
            .setBlendMode(Phaser.BlendModes.MULTIPLY)
            .setScrollFactor(0);

        this.createRetroAnimations();

        // Create the matrix-based solid blocks group
        const ground = this.physics.add.staticGroup();

        // 2D Matrix of the level: 25 columns x 19 rows (grid block size: 32x32)
        // 0 = empty, 1 = solid rusted steel plating
        const LEVEL_MATRIX: number[][] = Array(18).fill(null).map(() => Array(25).fill(0));
        // The bottom-most row is solid floor
        LEVEL_MATRIX.push(Array(25).fill(1));

        // Create platforms/buildings to show the power of the matrix system
        // Left platform (columns 4 to 7, Row 15)
        LEVEL_MATRIX[15][4] = 1;
        LEVEL_MATRIX[15][5] = 1;
        LEVEL_MATRIX[15][6] = 1;
        LEVEL_MATRIX[15][7] = 1;

        // Right platform (columns 17 to 20, Row 15)
        LEVEL_MATRIX[15][17] = 1;
        LEVEL_MATRIX[15][18] = 1;
        LEVEL_MATRIX[15][19] = 1;
        LEVEL_MATRIX[15][20] = 1;

        // Draw and register all solid blocks in the matrix, offset by 133px to center the 800px island on 1066px screen
        for (let r = 0; r < LEVEL_MATRIX.length; r++) {
            for (let c = 0; c < LEVEL_MATRIX[r].length; c++) {
                if (LEVEL_MATRIX[r][c] === 1) {
                    const bx = c * 32 + 16 + 133;
                    const by = r * 32 + 16;
                    const block = ground.create(bx, by, 'smwGround') as Phaser.Physics.Arcade.Image;
                    block.setDepth(-20);
                    block.refreshBody();
                }
            }
        }

        this.corpses = this.physics.add.staticGroup();
        this.bullets = this.physics.add.group({ defaultKey: 'bullet', maxSize: 100 });
        this.weapons = this.physics.add.group();
        this.thrownWeapons = this.physics.add.group();
        this.dummyHitboxes = this.physics.add.group();

        // --- CONEXIÓN AL SERVIDOR (Proxied via Vite in development, or connects directly) ---
        this.socket = io();
        this.otherPlayers = this.add.group();

        this.socket.on('connect_error', (error) => {
            console.error('[socket] Error de conexión:', error.message);
        });

        this.socket.on('currentPlayers', (players) => {
            Object.keys(players).forEach((id) => {
                if (id !== this.socket.id) {
                    this.addOtherPlayer(id, players[id]);
                } else if(this.player) {
                    this.player.setPosition(players[id].x, players[id].y);
                }
            });
            this.updateOnlineCount();
        });

        this.socket.on('newPlayer', (data) => {
            this.addOtherPlayer(data.id, data.player);
            this.updateOnlineCount();
        });

        this.socket.on('playerDisconnected', (id) => {
            this.otherPlayers.getChildren().forEach((otherPlayer: any) => {
                if (id === otherPlayer.getData('id')) {
                    const gun = otherPlayer.getData('gun');
                    if (gun) gun.destroy();
                    otherPlayer.destroy();
                }
            });
            this.updateOnlineCount();
        });

        this.socket.on('playerMoved', (playerInfo) => {
            this.otherPlayers.getChildren().forEach((otherPlayer: any) => {
                if (playerInfo.id === otherPlayer.getData('id')) {
                    const scaleX = playerInfo.scaleX ?? 1;
                    const scaleY = playerInfo.scaleY ?? 1;
                    otherPlayer.setPosition(playerInfo.x, playerInfo.y - 14.5 * scaleY);
                    otherPlayer.setScale(scaleX, scaleY);
                    otherPlayer.setRotation(playerInfo.rotation ?? 0);
                    otherPlayer.setFlipX(playerInfo.flipX ?? false);
                    if (playerInfo.anim) {
                        otherPlayer.play(playerInfo.anim, true);
                    }
                    const otherGun = otherPlayer.getData('gun');
                    if (otherGun) {
                        otherGun.setVisible(playerInfo.gunVisible ?? false);
                        otherGun.setPosition(playerInfo.gunX ?? playerInfo.x, playerInfo.gunY ?? playerInfo.y);
                        otherGun.setRotation(playerInfo.gunRotation ?? 0);
                        otherGun.setFlipY(playerInfo.gunFlipY ?? false);
                    }
                }
            });
        });

        // --- LÓGICA DE ARMAS POR RED ---
        this.socket.on('currentWeapons', (serverWeapons: any) => {
            Object.values(serverWeapons).forEach((w: any) => this.createNetworkWeapon(w.id, w.x, w.y));
        });

        this.socket.on('spawnWeapon', (w: any) => this.createNetworkWeapon(w.id, w.x, w.y));

        this.socket.on('weaponDestroy', (weaponId: string) => {
            this.weapons.getChildren().forEach((w: any) => {
                if (w.getData('id') === weaponId) w.destroy();
            });

            if (this.pendingWeaponPickupId === weaponId) {
                this.pendingWeaponPickupId = null;
                this.pickupRequestPending = false;
            }
        });

        this.socket.on('weaponPickedUpConfirmed', (weaponId: string) => {
            console.log('[pickup-client] Pickup CONFIRMED for:', weaponId);
            if (this.pendingWeaponPickupId !== weaponId) {
                return;
            }

            this.pendingWeaponPickupId = null;
            this.pickupRequestPending = false;
            this.hasWeapon = true;
            this.playerAmmo = this.maxAmmo;
            if (!this.isDead) this.gunSprite.setVisible(true);
            this.playerVisual.setTint(0xf4b41b);
            this.refreshHud();
        });

        this.socket.on('weaponPickupDenied', (payload: { weaponId: string; reason: string }) => {
            console.warn('[pickup-client] Pickup DENIED for:', payload.weaponId, 'Reason:', payload.reason);
            this.pendingWeaponPickupId = null;
            this.pickupRequestPending = false;
        });

        // --- LÓGICA DE DISPARO POR RED ---
        this.socket.on('enemyShot', (data: any) => {
            // Reutilizamos la función de disparo pero con color rojo para enemigos online
            this.fireBullet(data.x, data.y, data.angle, 'dummy', null as any, this.time.now, 0xff0000);
        });

        // Listen for enemy mecha bolt throws
        this.socket.on('enemyThrownWeapon', (data: any) => {
            this.spawnEnemyThrownWeapon(data.ownerId, data.x, data.y, data.angle);
        });

        // --- SINCRONIZACIÓN DE BOTS / DUMMIES ---
        this.socket.on('hostStatus', (data: { isHost: boolean }) => {
            this.isHost = data.isHost;
            console.log('[socket] Elected host status:', this.isHost);
        });

        this.socket.on('currentDummies', (serverDummies: any) => {
            console.log('[socket] Received currentDummies:', serverDummies);
            Object.keys(serverDummies).forEach(id => {
                const dummy = this.dummiesList.find(d => d.id === id);
                if (dummy) {
                    const data = serverDummies[id];
                    dummy.hp = data.hp;
                    dummy.hitbox.setPosition(data.x, data.y);
                }
            });
        });

        this.socket.on('dummyMoved', (updatedDummies: any) => {
            if (this.isHost) return;
            Object.keys(updatedDummies).forEach(id => {
                const dummy = this.dummiesList.find(d => d.id === id);
                if (dummy) {
                    const data = updatedDummies[id];
                    dummy.hitbox.setPosition(data.x, data.y);
                    dummy.visual.setPosition(data.x, data.y - 16);
                    dummy.visual.setFlipX(data.flipX);
                    if (data.anim) {
                        dummy.visual.play(data.anim, true);
                    }
                    if (data.gunVisible) {
                        dummy.gun.setVisible(true);
                        dummy.gun.setPosition(data.gunX, data.gunY);
                        dummy.gun.setRotation(data.gunRotation);
                        dummy.gun.setFlipY(data.gunFlipY);
                    } else {
                        dummy.gun.setVisible(false);
                    }
                }
            });
        });

        this.socket.on('dummyDamaged', (data: { dummyId: string; hp: number; shooterId: string }) => {
            const dummy = this.dummiesList.find(d => d.id === data.dummyId);
            if (dummy) {
                dummy.hp = data.hp;
                this.applyDamageFeedback(dummy.visual, 0xffffff, 30);
                this.time.delayedCall(100, () => {
                    if (dummy.visual.active) {
                        dummy.visual.setTint(0xbe7a3c);
                    }
                });
            }
        });

        this.socket.on('dummyKilled', (data: { dummyId: string; corpseId: string; respawnX: number; respawnY: number; deathX: number; deathY: number }) => {
            const dummy = this.dummiesList.find(d => d.id === data.dummyId);
            if (dummy) {
                if (data.deathY <= 600) {
                    this.createCorpseSprite(data.corpseId, data.deathX, data.deathY);
                }
                dummy.hitbox.setPosition(data.respawnX, data.respawnY);
                dummy.hitbox.setVelocity(0, 0);
                dummy.hp = 3;
                dummy.visual.setTexture('retroPlayer', 4).setTint(0xbe7a3c);
                dummy.gun.setVisible(false);
            }
        });

        // --- LÓGICA DE CADÁVERES POR RED ---
        this.socket.on('currentCorpses', (serverCorpses: any[]) => {
            serverCorpses.forEach((c: any) => this.createCorpseSprite(c.id, c.x, c.y));
        });

        this.socket.on('corpseSpawned', (c: any) => {
            this.createCorpseSprite(c.id, c.x, c.y);
        });

        this.socket.on('removeCorpse', (id: string) => {
            this.corpses.getChildren().forEach((corpse: any) => {
                if (corpse.getData('id') === id) {
                    corpse.destroy();
                }
            });
        });

        this.player = this.physics.add.sprite(533, 500, 'cube');
        this.player.setOrigin(0.5, 1); 
        this.player.setVisible(false); 
        this.player.setBounce(0.0); 
        this.player.setCollideWorldBounds(false);
        this.setCrouchState(false);

        this.playerVisual = this.add.sprite(533, 500, 'retroPlayer', 0);
        this.playerVisual.setOrigin(0.5, 0.5); 
        this.playerVisual.setTint(0xc4c0ad); 
        this.playerVisual.setScale(1.28);
        this.playerVisual.play('player-idle', true);

        this.gunSprite = this.add.sprite(this.player.x, this.player.y, 'retroLaser', 0);
        this.gunSprite.setDepth(10); 
        this.gunSprite.setVisible(false); 
        this.gunSprite.setScale(1.6); // 1.6x oversized mecha blaster

        // ammoText text display removed for HTML HUD

        this.setupRetroHud();
        this.refreshHud();

        this.spawnDummy('dummy_0', 333, 100);
        this.spawnDummy('dummy_1', 733, 100);

        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.player, this.corpses); 
        this.physics.add.collider(this.dummyHitboxes, ground);
        this.physics.add.collider(this.dummyHitboxes, this.corpses);
        this.physics.add.collider(this.dummyHitboxes, this.player);
        this.physics.add.collider(this.weapons, ground);
        this.physics.add.collider(this.thrownWeapons, ground);
        this.physics.add.collider(this.thrownWeapons, this.corpses);
        
        this.physics.add.collider(this.bullets, ground, (bulletObj: any, _groundObj: any) => {
            const bullet = bulletObj as Phaser.Physics.Arcade.Sprite;
            let bounces = bullet.getData('bounces') || 0;
            bounces++;
            bullet.setData('bounces', bounces);
            if (bounces > 2) {
                this.cleanupBulletTrail(bullet);
                bullet.disableBody(true, true);
            }
        });

        // Bullets blocked by dead mecha corpses
        this.physics.add.overlap(this.corpses, this.bullets, (_corpseObj: any, bulletObj: any) => {
            const bullet = bulletObj as Phaser.Physics.Arcade.Sprite;
            if (!bullet.active) return;
            this.cleanupBulletTrail(bullet);
            bullet.disableBody(true, true);
        });

        this.physics.add.overlap(this.dummyHitboxes, this.bullets, (dummyHitbox: any, bullet: any) => {
            if (!bullet.active) return; 
            if (bullet.getData('owner') === 'dummy') return; 
            this.cleanupBulletTrail(bullet);
            bullet.disableBody(true, true); 
            const dummy = this.dummiesList.find(d => d.hitbox === dummyHitbox);
            if (dummy) {
                // Server-authoritative dummy damage handling
                this.socket.emit('dummyHit', { dummyId: dummy.id, isVoid: false });
            }
        });

        this.physics.add.overlap(this.player, this.bullets, (_playerHitbox: any, bullet: any) => {
            if (!bullet.active || bullet.getData('owner') === 'player') return; 
            this.cleanupBulletTrail(bullet);
            bullet.disableBody(true, true); 
            if (this.isDead) return;
            this.playerHp--;
            this.applyDamageFeedback(this.playerVisual, 0xffffff, 35);
            this.time.delayedCall(100, () => { if (this.playerVisual.active && !this.isDead) this.playerVisual.setTint(this.hasWeapon ? 0xf4b41b : 0xc4c0ad); });
            this.refreshHud();
            if (this.playerHp <= 0) this.killPlayer();
        });

        this.physics.add.overlap(this.player, this.weapons, this.pickUpWeapon, undefined, this);

        // Register overlap checks for thrown weapons to deal damage authoritatively
        this.physics.add.overlap(this.dummyHitboxes, this.thrownWeapons, (dummyHitboxObj: any, thrownWeaponObj: any) => {
            const thrown = thrownWeaponObj as Phaser.Physics.Arcade.Sprite;
            const dummyHitbox = dummyHitboxObj as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
            if (!thrown.active) return;
            
            const dummy = this.dummiesList.find(d => d.hitbox === dummyHitbox);
            if (dummy) {
                this.spawnDeathDebris(thrown.x, thrown.y);
                thrown.destroy();
                this.socket.emit('dummyHit', { dummyId: dummy.id, isVoid: false });
            }
        });

        this.physics.add.overlap(this.player, this.thrownWeapons, (_playerObj: any, thrownWeaponObj: any) => {
            const thrown = thrownWeaponObj as Phaser.Physics.Arcade.Sprite;
            if (!thrown.active) return;
            
            const ownerId = thrown.getData('ownerId');
            if (ownerId === this.socket.id) return;
            
            this.spawnDeathDebris(thrown.x, thrown.y);
            thrown.destroy();
            
            if (this.isDead) return;
            this.playerHp--;
            this.applyDamageFeedback(this.playerVisual, 0xffffff, 45);
            this.time.delayedCall(100, () => {
                if (this.playerVisual.active && !this.isDead) {
                    this.playerVisual.setTint(this.hasWeapon ? 0xf4b41b : 0xc4c0ad);
                }
            });
            this.refreshHud();
            if (this.playerHp <= 0) this.killPlayer();
        });

        if (this.input.keyboard) {
            this.keys = this.input.keyboard.addKeys({
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                dash: Phaser.Input.Keyboard.KeyCodes.SHIFT
            }) as any;
        }

        this.pendingNetworkWeapons.forEach((w) => this.createNetworkWeapon(w.id, w.x, w.y));
        this.pendingNetworkWeapons = [];
        // Eliminado el generador local de armas, ahora las crea el server.

        this.refreshHud();
    }

    private createNetworkWeapon(id: string, x: number, y: number) {
        if (!this.weapons) {
            this.pendingNetworkWeapons.push({ id, x, y });
            return;
        }

        const exists = this.weapons.getChildren().some((weapon: any) => weapon.getData('id') === id);
        if (exists) {
            return;
        }

        const weapon = this.weapons.create(x, y, 'retroLaser', 0) as Phaser.Physics.Arcade.Sprite;
        weapon.setData('id', id);
        weapon.setBounce(0.3);
        weapon.setTint(0xc6b27b);
        weapon.setScale(2.0); // 2.0x chunky mecha bolts pickup
    }

    private addOtherPlayer(id: string, playerInfo: any) {
        const alreadyExists = this.otherPlayers.getChildren().some((otherPlayer: any) => otherPlayer.getData('id') === id);
        if (alreadyExists) {
            return;
        }

        const scaleX = playerInfo.scaleX ?? 1;
        const scaleY = playerInfo.scaleY ?? 1;
        const otherPlayer = this.add.sprite(playerInfo.x, playerInfo.y - 14.5 * scaleY, 'retroPlayer', 0);
        otherPlayer.setTint(0xd68a41); 
        otherPlayer.setOrigin(0.5, 0.5);
        otherPlayer.setData('id', id);
        otherPlayer.setScale(scaleX, scaleY);
        otherPlayer.setRotation(playerInfo.rotation ?? 0);
        otherPlayer.setFlipX(playerInfo.flipX ?? false);
        if (playerInfo.anim) {
            otherPlayer.play(playerInfo.anim, true);
        }

        // Spawn a secondary mecha blaster scaled up to 1.6 for other players
        const otherGun = this.add.sprite(playerInfo.gunX ?? playerInfo.x, playerInfo.gunY ?? playerInfo.y, 'retroLaser', 0);
        otherGun.setDepth(10);
        otherGun.setTint(0xaa6b32);
        otherGun.setScale(1.6);
        otherGun.setVisible(playerInfo.gunVisible ?? false);
        otherGun.setRotation(playerInfo.gunRotation ?? 0);
        otherGun.setFlipY(playerInfo.gunFlipY ?? false);
        otherPlayer.setData('gun', otherGun);

        this.otherPlayers.add(otherPlayer);
    }

    private spawnDummy(id: string, x: number, y: number) {
        const hitbox = this.dummyHitboxes.create(x, y, 'cube') as Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        hitbox.setOrigin(0.5, 1);
        hitbox.setSize(this.standingCollider.width, this.standingCollider.height);
        hitbox.setOffset(this.standingCollider.offsetX, 32 - this.standingCollider.height);
        hitbox.setCollideWorldBounds(false);
        hitbox.setVisible(false);
        hitbox.setData('dummyId', id);

        const visual = this.add.sprite(x, y, 'retroPlayer', 0);
        visual.setOrigin(0.5, 0.5);
        visual.setTint(0xbe7a3c);
        visual.setScale(1.28, 1.18); // Match the exact mecha aesthetic

        const gun = this.add.sprite(x, y, 'retroLaser', 0);
        gun.setDepth(10);
        gun.setTint(0xaa6b32);
        gun.setScale(1.6); // 1.6x mecha gun presence

        this.dummiesList.push({ id, hitbox, visual, gun, lastFired: 2000, hp: 3 });
    }

    private spawnDeathDebris(x: number, y: number) {
        const emitter = this.add.particles(x, y, 'pixel', {
            speed: { min: 40, max: 180 },
            angle: { min: 200, max: 340 },
            gravityY: 700,
            lifespan: { min: 260, max: 700 },
            quantity: 1,
            scale: { start: 1.4, end: 0 },
            alpha: { start: 1, end: 0 },
            tint: [0xf4b41b, 0xb85e43, 0x6d6d6d, 0xf9f4e8],
            blendMode: Phaser.BlendModes.ADD,
            frequency: 0,
            maxParticles: 18
        });

        emitter.emitParticleAt(x, y, 12);
        this.time.delayedCall(900, () => emitter.destroy());
    }

    private createCorpseSprite(id: string, x: number, bottomY: number) {
        const exists = this.corpses.getChildren().some((c: any) => c.getData('id') === id);
        if (exists) return;

        const corpse = this.corpses.create(x, bottomY - 20.48, 'retroPlayer', 4) as Phaser.Physics.Arcade.Image;
        corpse.setScale(1.28);
        corpse.setTint(0xa3533d);
        corpse.setData('id', id);
        corpse.refreshBody();

        const body = corpse.body as Phaser.Physics.Arcade.StaticBody;
        body.setSize(22 * 1.28, 20 * 1.28);
        body.setOffset(5 * 1.28, 7 * 1.28);

        this.spawnDeathDebris(x, bottomY - 18);
        this.shakeCamera(50);
    }

    // killDummy removed in favor of server-authoritative dummy respawn and corpse synchronization

    private killPlayer() {
        if (this.isDead) return;
        this.isDead = true;
        const corpseId = 'corpse_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        if (this.player.y <= 600) {
            this.createCorpseSprite(corpseId, this.player.x, this.player.y);
            this.socket.emit('spawnCorpse', { id: corpseId, x: this.player.x, y: this.player.y });
        }
        this.player.body.enable = false;
        this.playerVisual.setVisible(false);
        if (this.gunSprite) this.gunSprite.setVisible(false);
        this.hasWeapon = false;
        this.playerAmmo = 0;

        const deathOverlay = document.getElementById('death-overlay');
        const timerEl = document.getElementById('respawn-timer');
        if (deathOverlay) {
            deathOverlay.classList.add('active');
        }
        let countdown = 2;
        if (timerEl) timerEl.innerText = countdown.toString();
        const interval = setInterval(() => {
            countdown--;
            if (timerEl) timerEl.innerText = countdown.toString();
            if (countdown <= 0) clearInterval(interval);
        }, 1000);

        this.time.delayedCall(2000, () => {
            if (deathOverlay) {
                deathOverlay.classList.remove('active');
            }
            this.player.setPosition(Phaser.Math.Between(180, 880), 50);
            this.player.setVelocity(0, 0);
            this.setCrouchState(false);
            this.player.body.enable = true;
            this.playerVisual.setVisible(true).setTint(0xc4c0ad).play('player-idle', true); 
            this.playerHp = 3;
            this.refreshHud();
            this.isDead = false;
        });
    }

    private pickUpWeapon(_player: any, weapon: any) {
        if (this.hasWeapon || this.pickupRequestPending) return; 
        const weaponId = weapon.getData('id');
        console.log('[pickup-client] Overlapped weapon:', weaponId);
        if (!weaponId) return;

        this.pickupRequestPending = true;
        this.pendingWeaponPickupId = weaponId;
        console.log('[pickup-client] Emitting weaponPickedUp request for:', weaponId);
        this.socket.emit('weaponPickedUp', weaponId);
    }

    private throwGun(targetX: number, targetY: number) {
        this.hasWeapon = false;
        this.gunSprite.setVisible(false);
        this.playerVisual.setTint(0xc4c0ad);
        this.refreshHud();
        const centerY = this.player.y - 16;
        const thrownGun = this.thrownWeapons.create(this.gunSprite.x, this.gunSprite.y, 'retroLaser', 0) as Phaser.Physics.Arcade.Sprite;
        thrownGun.setTint(0xa3533d).setBounce(0.5).setCollideWorldBounds(true);
        thrownGun.setScale(2.0); // 2.0x chunky mecha thrown gun
        thrownGun.setData('ownerId', this.socket.id);
        const angle = Phaser.Math.Angle.Between(this.player.x, centerY, targetX, targetY);
        const thrownBody = thrownGun.body as Phaser.Physics.Arcade.Body;
        this.physics.velocityFromRotation(angle, 700, thrownBody.velocity);
        thrownGun.setAngularVelocity(Phaser.Math.Between(500, 1000) * (Math.random() > 0.5 ? 1 : -1));

        // Broaden weapon throwing trajectories across multiplayer lobbies
        this.socket.emit('throwWeapon', { x: this.gunSprite.x, y: this.gunSprite.y, angle });

        this.time.delayedCall(3000, () => { if (thrownGun && thrownGun.active) thrownGun.destroy(); });
    }

    private spawnEnemyThrownWeapon(ownerId: string, x: number, y: number, angle: number) {
        const thrownGun = this.thrownWeapons.create(x, y, 'retroLaser', 0) as Phaser.Physics.Arcade.Sprite;
        thrownGun.setTint(0xa3533d).setBounce(0.5).setCollideWorldBounds(true);
        thrownGun.setScale(2.0);
        thrownGun.setData('ownerId', ownerId);
        const thrownBody = thrownGun.body as Phaser.Physics.Arcade.Body;
        this.physics.velocityFromRotation(angle, 700, thrownBody.velocity);
        thrownGun.setAngularVelocity(Phaser.Math.Between(500, 1000) * (Math.random() > 0.5 ? 1 : -1));
        this.time.delayedCall(3000, () => { if (thrownGun && thrownGun.active) thrownGun.destroy(); });
    }

    private fireBullet(x: number, y: number, angle: number, owner: 'player' | 'dummy', recoilTarget: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, time: number, tint?: number) {
        const bullet = this.bullets.get(x, y) as Phaser.Physics.Arcade.Sprite; 
        if (bullet) {
            bullet.enableBody(true, x, y, true, true);
            const bulletBody = bullet.body as Phaser.Physics.Arcade.Body;
            
            // Override world gravity (800) to float slowly
            bulletBody.setAllowGravity(false);
            bulletBody.setGravityY(70);

            // Elastic bounce
            bullet.setBounce(1.0);
            bullet.setCollideWorldBounds(false);

            bullet.setData('owner', owner);
            bullet.setTint(tint || (owner === 'player' ? 0xf4b41b : 0xb85e43));
            this.physics.velocityFromRotation(angle, 900, bulletBody.velocity);
            
            // Align laser visual orientation perfectly along trajectory vector angle
            bullet.setRotation(angle);
            bullet.setScale(1.5); // Oversized retro laser projectile

            this.attachBulletTrail(bullet);
            const spawnTime = time;
            bullet.setData('spawnTime', spawnTime);
            
            // Extended bullet lifetime to 5000ms
            this.time.delayedCall(5000, () => {
                if (bullet.active && bullet.getData('spawnTime') === spawnTime) {
                    this.cleanupBulletTrail(bullet);
                    bullet.disableBody(true, true);
                }
            });

            if (recoilTarget) {
                this.physics.velocityFromRotation(angle + Math.PI, 450, recoilTarget.body.velocity);
                if (owner === 'player') {
                    this.recoilUntil = time + 180;
                    this.socket.emit('shoot', { x, y, angle }); // Notificar disparo al server
                    this.spawnMuzzleFlash(x, y, angle > Math.PI * 0.5 || angle < -Math.PI * 0.5);
                } else if (owner === 'dummy' && this.isHost) {
                    const dummyId = recoilTarget.getData('dummyId') || 'dummy';
                    this.socket.emit('dummyShot', { dummyId, x, y, angle });
                    this.spawnMuzzleFlash(x, y, angle > Math.PI * 0.5 || angle < -Math.PI * 0.5);
                }
            } else if (owner === 'dummy') {
                this.spawnMuzzleFlash(x, y, angle > Math.PI * 0.5 || angle < -Math.PI * 0.5);
            }
        }
    }

    update(time: number, delta: number) {
        if (!this.keys || !this.player) return;

        // --- IA DUMMIES ---
        this.dummiesList.forEach(dummy => {
            const { hitbox, visual, gun } = dummy;
            if (!hitbox.active) return;

            if (!this.isHost) {
                // Non-hosts do not simulate physics or AI locally, waiting for network positions
                const body = hitbox.body as Phaser.Physics.Arcade.Body;
                body.setAllowGravity(false);
                hitbox.setVelocity(0, 0);
                return;
            }

            // Host simulates physics and AI authoritatively
            const body = hitbox.body as Phaser.Physics.Arcade.Body;
            body.setAllowGravity(true);

            // Check if dummy fell off the island into the void
            if (hitbox.y > 650) {
                this.socket.emit('dummyHit', { dummyId: dummy.id, isVoid: true });
                return;
            }

            const isOnGround = hitbox.body.blocked.down || hitbox.body.touching.down;
            const centerY = hitbox.y - 16;
            visual.setPosition(hitbox.x, hitbox.y - 16);
            if (!this.isDead) {
                const angle = Phaser.Math.Angle.Between(hitbox.x, centerY, this.player.x, this.player.y - 16);
                gun.setPosition(hitbox.x + Math.cos(angle) * 25, centerY + Math.sin(angle) * 25).setRotation(angle);
                const aimLeft = this.player.x < hitbox.x;
                gun.setFlipY(aimLeft); visual.setFlipX(aimLeft); gun.setVisible(true);
                if (time > dummy.lastFired) {
                    dummy.lastFired = time + Phaser.Math.Between(1000, 2500); 
                    this.fireBullet(gun.x + Math.cos(angle) * 10, gun.y + Math.sin(angle) * 10, angle, 'dummy', hitbox, time);
                    if (Math.random() > 0.6 && isOnGround) hitbox.setVelocityY(-400);
                }
            } else gun.setVisible(false);
            if (isOnGround) hitbox.body.velocity.x *= 0.90;
            visual.play(this.isDead ? 'player-dead' : (Math.abs(hitbox.body.velocity.x) > 10 || Math.abs(hitbox.body.velocity.y) > 10 ? 'player-run' : 'player-idle'), true);
        });

        // Clean up out-of-bounds weapons and thrown items falling into the void
        this.weapons.getChildren().forEach((w: any) => {
            if (w.y > 650) {
                w.destroy();
            }
        });
        this.thrownWeapons.getChildren().forEach((tw: any) => {
            if (tw.y > 650) {
                tw.destroy();
            }
        });

        if (this.isDead) return;

        // Check if player fell off the island into the void
        if (this.player.y > 650) {
            this.killPlayer();
            return;
        }

        // --- LÓGICA JUGADOR ---
        const body = this.player.body as Phaser.Physics.Arcade.Body;
        const isOnGround = body.blocked.down || body.touching.down;
        const isRecoiling = time < this.recoilUntil;
        const pointer = this.input.activePointer;

        if (this.hasWeapon && this.gunSprite) {
            const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y - 16, pointer.worldX, pointer.worldY);
            this.gunSprite.setPosition(this.player.x + Math.cos(angle) * 25, this.player.y - 16 + Math.sin(angle) * 25).setRotation(angle);
            this.gunSprite.setFlipY(pointer.worldX < this.player.x);
        }

        if (pointer.isDown && this.hasWeapon && time > this.lastFired) {
            if (this.playerAmmo > 0) {
                const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y - 16, pointer.worldX, pointer.worldY);
                this.fireBullet(this.gunSprite.x, this.gunSprite.y, angle, 'player', this.player, time);
                this.facingDirection = pointer.worldX < this.player.x ? -1 : 1;
                this.lastFired = time + this.fireRate;
                this.playerAmmo--;
                this.refreshHud();
            } else this.throwGun(pointer.worldX, pointer.worldY);
        }

        if (isOnGround) this.lastGroundedAt = time;
        const shouldCrouch = this.keys.down.isDown && (isOnGround || time - this.lastGroundedAt <= this.crouchGroundGraceMs) && !this.isDashing && time >= this.blockCrouchUntil;

        if (shouldCrouch !== this.isCrouching) {
            this.setCrouchState(shouldCrouch);
            if (shouldCrouch) {
                this.crouchCurrentSpeed = this.crouchStartSpeed;
                this.hasCrouchRebounded = false;
            } else if (!this.hasCrouchRebounded) {
                this.hasCrouchRebounded = true;
                this.blockCrouchUntil = time + this.crouchReboundLockMs;
                if (!this.keys.down.isDown) {
                    this.player.setVelocityX(Math.abs(body.velocity.x) > 0.001 ? body.velocity.x : this.facingDirection * this.crouchMinSpeed);
                    this.player.setVelocityY(Phaser.Math.Linear(this.crouchMinReboundSpeed, this.crouchMaxReboundSpeed, this.currentCrouchProgress));
                }
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.dash) && time >= this.nextDashAt) {
            const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y - 16, pointer.worldX, pointer.worldY);
            if (this.isCrouching) this.setCrouchState(false);
            this.isDashing = true; this.nextDashAt = time + this.dashCooldownMs;
            this.physics.velocityFromRotation(angle, this.dashSpeed, this.player.body.velocity);
            this.time.delayedCall(this.dashDurationMs, () => this.isDashing = false);
        }

        if (!this.isDashing) {
            if (this.isCrouching) {
                this.crouchCurrentSpeed = Math.max(this.crouchMinSpeed, this.crouchCurrentSpeed - this.crouchDecelerationPerSecond * (delta / 1000));
                this.currentCrouchProgress = Phaser.Math.Clamp(1 - (this.crouchCurrentSpeed - this.crouchMinSpeed) / (this.crouchStartSpeed - this.crouchMinSpeed), 0, 1);
                const crouchDirection = this.keys.left.isDown ? -1 : this.keys.right.isDown ? 1 : 0;
                if (crouchDirection !== 0 && !isRecoiling) { this.facingDirection = crouchDirection as -1 | 1; this.player.setVelocityX(crouchDirection * this.crouchCurrentSpeed); }
            } else if (!isRecoiling) {
                if (this.keys.left.isDown) { this.facingDirection = -1; this.player.setVelocityX(-this.runSpeed); }
                else if (this.keys.right.isDown) { this.facingDirection = 1; this.player.setVelocityX(this.runSpeed); }
                else if (isOnGround) this.player.body.velocity.x *= 0.8; 
            }
            if (this.keys.up.isDown && isOnGround && !this.isCrouching) this.player.setVelocityY(this.jumpSpeed);
        }

        // --- MOTOR VISUAL ---
        this.playerVisual.setFlipX(this.facingDirection === -1);
        if (this.isCrouching) {
            this.playerVisual.play('player-run', true);
        } else if (this.isDashing) {
            this.playerVisual.play('player-run', true);
        } else if (!isOnGround) {
            this.playerVisual.play('player-jump', true);
        } else if (Math.abs(body.velocity.x) > 18) {
            this.playerVisual.play('player-run', true);
        } else {
            this.playerVisual.play('player-idle', true);
        }
        if (this.isCrouching) {
            this.playerVisual.setRotation(0).setScale(Phaser.Math.Linear(this.crouchMaxScaleX, this.crouchFinalScaleX, this.currentCrouchProgress), Math.max(0.1, Phaser.Math.Linear(this.crouchMinScaleY, this.crouchFinalScaleY, this.currentCrouchProgress)));
        } else if (this.isDashing) {
            this.playerVisual.setFlipX(false).setRotation(Phaser.Math.Angle.Between(this.player.x, this.player.y - 16, pointer.worldX, pointer.worldY)).setScale(Phaser.Math.Linear(this.playerVisual.scaleX, 1.6, 0.4), Phaser.Math.Linear(this.playerVisual.scaleY, 0.4, 0.4));
        } else if (!isOnGround) {
            this.playerVisual.rotation = Phaser.Math.Angle.RotateTo(this.playerVisual.rotation, 0, 0.2);
            const stretch = Phaser.Math.Clamp(Math.abs(body.velocity.y) / 800, 0, 1);
            this.playerVisual.setScale(Phaser.Math.Linear(this.playerVisual.scaleX, 1 - stretch * 0.4, 0.3), Phaser.Math.Linear(this.playerVisual.scaleY, 1 + stretch * 0.4, 0.3));
        } else {
            const stretchX = Phaser.Math.Clamp(Math.abs(body.velocity.x) / 400, 0, 1);
            this.playerVisual.setRotation(0).setScale(Phaser.Math.Linear(this.playerVisual.scaleX, 1.28 + stretchX * 0.34, 0.3), Phaser.Math.Linear(this.playerVisual.scaleY, 1.18 - stretchX * 0.12, 0.3));
        }
        this.playerVisual.setPosition(this.player.x, this.player.y - (14.5 * this.playerVisual.scaleY));

        // Organic drifting clouds wrapping
        this.cloudsList.forEach(cloud => {
            const speed = cloud.getData('speed') as number;
            cloud.x -= speed * (delta / 1000);
            if (cloud.x < -150) {
                cloud.x = 1200;
                cloud.y = Phaser.Math.Between(40, 220);
                cloud.setScale(Phaser.Math.FloatBetween(0.8, 1.5));
                cloud.setData('speed', Phaser.Math.FloatBetween(12, 32));
            }
        });

        this.smwHillBg.tilePositionX += 0.05;
        this.scanlines.tilePositionY += 0.8;

        // Monitor ground settled coordinate reports for weapons to prevent sky drops on client reloads
        this.weapons.getChildren().forEach((weapon: any) => {
            const wBody = weapon.body as Phaser.Physics.Arcade.Body;
            if (wBody && (wBody.blocked.down || wBody.touching.down)) {
                if (!weapon.getData('landedReported')) {
                    weapon.setData('landedReported', true);
                    const id = weapon.getData('id');
                    if (id) {
                        this.socket.emit('weaponLanded', { id, x: weapon.x, y: weapon.y });
                    }
                }
            }
        });

        // --- SINCRONIZACIÓN ONLINE ---
        if (this.socket) {
            const anim = this.playerVisual.anims.currentAnim ? this.playerVisual.anims.currentAnim.key : 'player-idle';
            const gunVisible = this.gunSprite.visible;
            const gunX = this.gunSprite.x;
            const gunY = this.gunSprite.y;
            const gunRotation = this.gunSprite.rotation;
            const gunFlipY = this.gunSprite.flipY;
            const flipX = this.playerVisual.flipX;

            const oldX = this.player.getData('oldX');
            const oldY = this.player.getData('oldY');
            const oldRotation = this.player.getData('oldRotation');
            const oldAnim = this.player.getData('oldAnim');
            const oldFlipX = this.player.getData('oldFlipX');
            const oldGunVisible = this.player.getData('oldGunVisible');
            const oldGunX = this.player.getData('oldGunX');
            const oldGunY = this.player.getData('oldGunY');
            const oldGunRotation = this.player.getData('oldGunRotation');
            const oldGunFlipY = this.player.getData('oldGunFlipY');

            if (oldX !== this.player.x || oldY !== this.player.y || oldRotation !== this.playerVisual.rotation ||
                oldAnim !== anim || oldFlipX !== flipX || oldGunVisible !== gunVisible ||
                oldGunX !== gunX || oldGunY !== gunY || oldGunRotation !== gunRotation || oldGunFlipY !== gunFlipY) {

                this.socket.emit('playerMovement', {
                    x: this.player.x,
                    y: this.player.y,
                    scaleX: this.playerVisual.scaleX,
                    scaleY: this.playerVisual.scaleY,
                    rotation: this.playerVisual.rotation,
                    flipX,
                    anim,
                    gunVisible,
                    gunX,
                    gunY,
                    gunRotation,
                    gunFlipY
                });

                this.player.setData('oldX', this.player.x)
                           .setData('oldY', this.player.y)
                           .setData('oldRotation', this.playerVisual.rotation)
                           .setData('oldAnim', anim)
                           .setData('oldFlipX', flipX)
                           .setData('oldGunVisible', gunVisible)
                           .setData('oldGunX', gunX)
                           .setData('oldGunY', gunY)
                           .setData('oldGunRotation', gunRotation)
                           .setData('oldGunFlipY', gunFlipY);
            }
        }

        // Host authoritative dummy sync broadcast
        if (this.socket && this.isHost) {
            const dummyStates: Record<string, any> = {};
            this.dummiesList.forEach(d => {
                const body = d.hitbox.body as Phaser.Physics.Arcade.Body;
                dummyStates[d.id] = {
                    x: d.hitbox.x,
                    y: d.hitbox.y,
                    vx: body.velocity.x,
                    vy: body.velocity.y,
                    anim: d.visual.anims.currentAnim ? d.visual.anims.currentAnim.key : 'player-idle',
                    flipX: d.visual.flipX,
                    gunX: d.gun.x,
                    gunY: d.gun.y,
                    gunRotation: d.gun.rotation,
                    gunFlipY: d.gun.flipY,
                    gunVisible: d.gun.visible
                };
            });
            this.socket.emit('dummyUpdate', dummyStates);
        }
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1066,
    height: 600,
    parent: 'app',
    pixelArt: true,
    roundPixels: true,
    physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 800 }, debug: false } },
    scene: [MainScene]
};
new Phaser.Game(config);