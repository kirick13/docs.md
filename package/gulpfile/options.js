
/* eslint-env node, commonjs */

const { get,
        merge }     = require('lodash');
const { SassNumber,
        SassString,
		sassNull  } = require('sass');

const CONFIG = exports.CONFIG = merge(
	require('../config.json'),
	require('../../source/config.json'),
);

exports.SCSS = {
	functions: {
		'getConfig($path)': function ([ path ]) {
			const value = get(
				CONFIG,
				path.assertString('path').text,
			);

			if (typeof value === 'string') {
				return new SassString(value);
			}
			else if (typeof value === 'number') {
				return new SassNumber(value);
			}

			return sassNull;
		},
	},
};

exports.CLEANCSS = {
	level: 2,
};

exports.HTMLMIN = {
	collapseWhitespace: true,
	conservativeCollapse: false,
	quoteCharacter: '\'',
	removeAttributeQuotes: true,
	removeComments: true,
	sortAttributes: true,
	sortClassName: true,
	useShortDoctype: true,
	minifyCSS: true,
	minifyJS: false,
};
