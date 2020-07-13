module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	extends: ["eslint:recommended"],
	rules: {
		"no-mixed-spaces-and-tabs": 2,
		"indent": [2, "tab"],
		"no-undef": 2,
		"no-redeclare": 2,
		"semi": [2, "always"],
		"no-func-assign": 2,
		"spaced-comment": 2,
	},
	parserOptions: {
		sourceType: 'module'
	}
};
