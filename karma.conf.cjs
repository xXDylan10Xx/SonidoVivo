const { existsSync } = require('node:fs')

// Usar Edge si no se indicó otro navegador mediante CHROME_BIN.
if (!process.env.CHROME_BIN) {
    const edge = [
        'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
        'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    ].find((ruta) => existsSync(ruta))

    if (edge) process.env.CHROME_BIN = edge
}

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        files: [
            'src/Tests/setup.ts',
            'src/Tests/**/*.spec.*',
        ],
        preprocessors: {
            'src/Tests/**/*.ts': ['esbuild'],
            'src/Tests/**/*.tsx': ['esbuild'],
        },
        esbuild: {
            jsx: 'automatic',
            target: 'es2022',
            loader: {
                '.png': 'dataurl',
                '.css': 'empty',
            },
            define: {
                'process.env.NODE_ENV': '"development"',
            },
        },
        browsers: ['ChromeHeadless'],
        reporters: ['progress'],
        client: {
            jasmine: { random: false },
        },
        hostname: '127.0.0.1',
        listenAddress: '127.0.0.1',
        autoWatch: false,
        singleRun: true,
    })
}
