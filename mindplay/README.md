# MindPlay

Plataforma de tests de personalidad y minijuegos. React + Vite, sin backend ni APIs externas, mobile-first.

## Ejecutar en local

```bash
npm install
npm run dev
```

## Compilar para producción

```bash
npm run build
```

Genera la carpeta `dist/`.

## Desplegar en Netlify

Opción A — conectar el repositorio en Netlify:
- Build command: `npm run build`
- Publish directory: `dist`
(ya configurado en `netlify.toml`, incluido en el proyecto)

Opción B — despliegue manual:
- Ejecuta `npm run build`
- Arrastra la carpeta `dist/` a Netlify Drop (app.netlify.com/drop)

No se necesitan variables de entorno: no hay base de datos ni APIs externas.

## Añadir un test nuevo

1. Crea `src/data/tests/mi-test.js` siguiendo el esquema de `personality.js`
2. Impórtalo y añádelo al array `TESTS` en `src/data/tests/index.js`

No hace falta tocar ningún componente: `QuizEngine`, `ResultPage` y las recomendaciones funcionan con cualquier test que siga el esquema.

## Añadir un juego nuevo

1. Crea los metadatos en `src/data/games/mi-juego.js` (título, categoría, instrucciones)
2. Añádelo al array `GAMES` en `src/data/games/index.js`
3. Crea el componente interactivo en `src/engines/gameLogic/MiJuego.jsx` (recibe `finish(scoreValue, scoreLabel)`)
4. Regístralo en `GAME_COMPONENTS` dentro de `src/engines/gameLogic/index.js`

## Activar publicidad

Todo pasa por `src/config/ads.js`:
- `ADS_ENABLED: false` → no se muestra nada
- `ADS_ENABLED: false` + `SHOW_PLACEHOLDERS: true` → se ven los huecos reservados (modo desarrollo)
- `ADS_ENABLED: true` → hueco listo para conectar un proveedor real (pendiente)

Placements ya integrados: `home-mid`, `test-between`, `test-result`, `game-between`, `game-result`.
