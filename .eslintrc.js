module.exports = {
    root: true,
    extends: ['airbnb', 'loose-airbnb-react'],
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
        webextensions: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 7,
        ecmaFeatures: {
            classes: true,
            modules: true
        }
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'webpack.config.js'
            }
        }
    },
    rules: {
        semi: ['warn', 'never'],
        indent: [
            1,
            4,
            {
                SwitchCase: 1
            }
        ],
        'import/no-extraneous-dependencies': ['error', {
            'devDependencies': [
                'build/**',
                'postcss.config.js'
            ]
        }],
        'function-paren-newline': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'react/prop-types': 0,
    },
    globals: {
        chrome: true
    }
}
