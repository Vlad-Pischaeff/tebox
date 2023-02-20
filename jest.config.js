module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        "^.+\\.svg$": "jest-svg-transformer",
        "^.+\\.sass$": "jest-transform-stub",
    },
    globals: {
        'window': {
            'location': {}
        }
    }
}
