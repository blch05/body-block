# 🤖 Body Block - 16-Bit Retro Mecha Multiplayer Arena

¡Bienvenido a **Body Block**, un shooter multijugador frenético de estética retro-futurista de 16 bits! Pilota tu mecha industrial en un mapa de isla flotante en formato widescreen 16:9, gestiona tus barras de armadura y energía, equipa poderosos blásteres que caen del cielo y lucha en tiempo real contra bots y otros jugadores.

Esta versión del juego cuenta con una interfaz premium de cabina de mecha, físicas de disparos realineadas y mecánicas de daño por lanzamiento avanzadas.

---

## 🚀 Estado Actual y Características del Juego

### 1. Cabina HUD Premium y Estética Retro de 16 Bits
* **Interfaz de Cabina de Acero**: HUD estilo cristal (glassmorphism) incrustado con un bisel industrial grueso (`#1f1a16`).
* **Tipografía e Iconografía**: Integración total de la fuente de pixeles `'Press Start 2P'` y sombras de bloques sólidos.
* **Métricas Dinámicas**: Indicadores segmentados de armadura (HP), barras de estado de red en tiempo real y rejilla de munición parpadeante con ciclos de alerta roja cuando te quedas sin batería.
* **Drawer de Operaciones**: Panel de control desplegable lateral interactivo para ajustar parámetros de sonido y diagnósticos del sistema mecha.

### 2. Sincronización Multijugador en Tiempo Real Estable
* **Sincronización Visual Completa**: Eliminación del efecto de mechas flotantes o hundidos en plataformas. Los movimientos de los otros mechas están perfectamente nivelados con el suelo.
* **Reflejo de Animaciones**: Los movimientos de correr, saltar, la dirección de giro horizontal (`flipX`), y la visibilidad de los blásteres de otros jugadores se transmiten de forma instantánea.
* **Ángulos de Apuntado Dinámicos**: Los blásteres equipados de otros jugadores rotan en tiempo real siguiendo con precisión la dirección de su puntero de apuntado.

### 3. Físicas de Armas e Interacciones Avanzadas
* **Caché de Posición Terrestre**: Se acabó el problema de armas volviendo a llover del cielo en bucle cada vez que se recarga la pantalla. Las armas registran su colisión con las plataformas y notifican al servidor para fijar y recordar sus coordenadas terrestres finales.
* **Proyectiles Láser Chunky Neon**: Los proyectiles tradicionales fueron sustituidos por potentes rayos láser concéntricos ultra brillantes de 18x8 píxeles (núcleo blanco, anillo amarillo neón y contorno naranja), acompañados de estelas de partículas retro de gran escala.
* **Rotación Basada en Vectores**: Los láseres rotan de forma matemática, alineando su longitud perfectamente con la trayectoria angular del disparo.
* **Lanzamiento de Armas con Daño Directo**: Cuando te quedas sin munición o decides arrojar tu arma, esta se convierte en un proyectil físico. Si impacta contra un bot o jugador, se destruye despidiendo chispas mecánicas y restando una enorme cantidad de vida.
* **Bloqueo por Cadáveres**: Los proyectiles son bloqueados físicamente por los restos de mechas caídos (los cadáveres absorben el fuego enemigo para evitar spam y añadir cobertura estratégica).

### 4. Entorno de Juego Widescreen (16:9)
* **Cámara de 1066px**: Resolución panorámica optimizada, centrando la isla principal en la pantalla.
* **Abismo Mortal**: Deshabilitados los bordes invisibles del mundo; si caes por los lados de la isla flotante, tu mecha será destruido de inmediato y se activará una secuencia dramática de reinicio del sistema (CRT glitch screen con temporizador de reinicio de 2 segundos).
* **Parallax Mejorado**: Tres tipos de texturas de nubes procedimentales que se entrelazan de forma fluida junto con ruinas mecánicas industriales conectadas perfectamente a la base de la pantalla.

---

## 🛠️ Stack Tecnológico
* **Frontend**: HTML5, Vanilla CSS3 (Tokens de diseño personalizados, animaciones micro-UX), Javascript (ES6+) con **Phaser 3** (Arcade Physics).
* **Servidor**: Node.js, Express, **Socket.io** (Conexiones WebSocket en tiempo real).
* **Herramientas de Compilación**: Vite, TypeScript.

---

## 💻 Instrucciones para Ejecutar Localmente

### Requisitos Previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/).

### Instalación de Dependencias
```bash
npm install
```

### Ejecutar el Proyecto
Para la experiencia de desarrollo, debes ejecutar el servidor y el cliente simultáneamente en dos terminales separadas:

1. **Terminal 1 - Servidor Socket.io**:
   ```bash
   npm run server
   ```
2. **Terminal 2 - Cliente de Desarrollo**:
   ```bash
   npm run dev
   ```

El juego se abrirá localmente en tu puerto `http://localhost:5173`. ¡El servidor WebSocket se comunicará de forma transparente a través de los túneles proxy de Vite en el puerto `3000`!
