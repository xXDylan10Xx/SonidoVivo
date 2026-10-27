# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Pruebas unitarias con Jasmine y Karma

Instalar las dependencias del proyecto y ejecutar las pruebas:

    npm install
    npm test

En PowerShell, si la política de scripts bloquea npm, usar npm.cmd install y npm.cmd test.

Jasmine define las pruebas y sus expectativas. Karma las ejecuta en un navegador sin
ventanas visibles y se cierra al terminar. La configuración usa Edge si está instalado
en las rutas habituales de Windows; en otros equipos usa Chrome. También se puede
indicar la ruta del navegador con la variable de entorno CHROME_BIN.

Los archivos de prueba se guardan en src/Tests con terminación .spec.ts o .spec.tsx.
karma-esbuild prepara TypeScript y JSX para ejecutarlos en el navegador.

La prueba inicial del botón verifica el texto recibido por props y el evento onClick
mediante un spy de Jasmine. Usa act() de React para esperar las actualizaciones del DOM
y desmonta el componente al terminar.

Para comprobar también compilación y estilo:

    npm run build
    npm run lint

Referencias: [Jasmine](https://jasmine.github.io/tutorials/your_first_suite.html),
[Karma con Jasmine](https://github.com/karma-runner/karma-jasmine) y
[act de React](https://react.dev/reference/react/act).

Objetivo acordado para esta entrega: al menos 15 pruebas en Jasmine/Karma,
incluyendo lógica, DOM, eventos y mocks. El informe de cobertura se completará
cuando estén incorporados los casos de prueba.

Carrito.spec.tsx comprueba el flujo desde los componentes reales de la aplicación
y simula las lecturas y escrituras de localStorage con spies de Jasmine.

El [documento de cobertura y control de calidad](docs/CoberturaTesting.md) contiene la matriz de las 15 pruebas actuales, resultados y evidencia. Los porcentajes de cobertura quedan pendientes de la integración del equipo.
