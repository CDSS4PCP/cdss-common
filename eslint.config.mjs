export default [
    {
        'languageOptions': {
            'parserOptions': {
                'ecmaVersion': 2020,
                'sourceType': 'module',
                'ecmaFeatures': {
                    'experimentalObjectRestSpread': true,
                }
            },
            'globals': {
                'es6': true,
                'node': true,
                'mocha': true
            }
        },

        'rules': {
            'indent': ['error', 4],
            'linebreak-style': ['error', 'unix'],
            'no-console': ['warn', {'allow': ['warn', 'error']}],
            // 'no-unused-vars': ['warn', {'vars': 'all', 'args': 'none'}],
            'quotes': ['error', 'single', {'allowTemplateLiterals': true}],
            'semi': ['error', 'always']
        },
        'ignores': ['dist/*']

    }
];
