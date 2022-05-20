
/* eslint-env node, commonjs */

const { get,
        merge }     = require('lodash');
const { SassNumber,
        SassString,
        SassColor,
        sassNull  } = require('sass');

function parseHexColor (hex) {
	if(/^#([\da-f]{3}){1,2}$/i.test(hex)){
		let color = [ ...hex.slice(1) ];

		if (color.length === 3) {
			color = [
				color[0],
				color[0],
				color[1],
				color[1],
				color[2],
				color[2],
			];
		}

		const color_number = Number.parseInt(
			color.join(''),
			16,
		);

		return {
			red: (color_number >> 16) & 255,
			green: (color_number >> 8) & 255,
			blue: color_number & 255,
		};
	}

	throw new Error('Bad Hex');
}

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
		'getConfigColor($path)': function ([ path ]) {
			const value = get(
				CONFIG,
				path.assertString('path').text,
			);

			if (typeof value === 'string' && value.startsWith('#')) {
				return new SassColor(
					parseHexColor(value),
				);
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
