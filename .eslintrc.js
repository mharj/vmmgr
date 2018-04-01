module.exports = {
	"extends": "google",
	"env": { 
		"es6": true,
		"node" : true,
	},
	"parserOptions": {
		"ecmaVersion": 2017,
		"sourceType": "module",
		"ecmaFeatures": {
			"modules": true,
			"experimentalObjectRestSpread": true
		}
	},
	"rules": {
		"require-jsdoc": 0,
		"indent": ["error", "tab", {"SwitchCase": 1}],
		"no-tabs": 0,
		'max-len': [ 2, {
			code: 240,
			tabWidth: 2,
			ignoreUrls: true,
			ignoreTrailingComments: true
		}],
		'key-spacing': ["error", { "mode": "minimum" }]		
	},
};