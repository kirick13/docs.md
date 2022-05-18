
/* eslint-env node, commonjs */

const { readFileSync } = require('fs');
const { get }          = require('lodash');

const OPTIONS = require('./options');

const modules = module.exports = {};
modules.require = (name, path = name) => {
	Object.defineProperty(
		modules,
		name,
		{
			get: () => require(path),
		},
	);
};
modules.define = (name, getter) => {
	Object.defineProperty(
		modules,
		name,
		{
			get () {
				const value = getter();
				Object.defineProperty(
					modules,
					name,
					{ value },
				);
				return value;
			},
			configurable: true,
		},
	);
};

// ----- TOOLS -----
modules.require('del');
modules.define(
	'purgeFiles',
	() => (paths) => modules.del(
		paths,
		{ force: true },
	),
);
modules.require(
	'rename',
	'gulp-rename',
);
modules.require(
	'transform',
	'parallel-transform',
);

// ----- CSS -----
modules.define(
	'scss',
	() => {
		const { compileString } = require('sass');

		return (options = {}) => modules.transform(
			1e6,
			{
				ordered: false,
			},
			(file, callback) => {
				file.contents = Buffer.from(
					compileString(
						file.contents.toString(),
						options,
					).css,
				);

				callback(
					null,
					file,
				);
			},
		);
	},
);
modules.require(
	'autoprefixer',
	'gulp-autoprefixer',
);
modules.define(
	'cleanCSS',
	() => {
		const CleanCSS = require('clean-css');
		const cleancss_instance = new CleanCSS(OPTIONS.CLEANCSS);

		return () => modules.transform(
			1e6,
			{
				ordered: false,
			},
			(file, callback) => {
				file.contents = Buffer.from(
					cleancss_instance.minify(
						file.contents.toString(),
					).styles.replace(/\n\s*/g, ''),
				);

				callback(null, file);
			},
		);
	},
);

// ----- HTML -----
modules.require('htmlmin', 'gulp-htmlmin');
modules.require('htmlParser', 'node-html-parser');
modules.define(
	'buildPages',
	() => {
		const ejs = require('ejs');

		const html_source = readFileSync('./web/template.html').toString();

		const REGEXP_TITLE = /^<h\d>([^<]*)<\/h\d>/;

		return () => modules.transform(
			1e6,
			{
				ordered: false,
			},
			async (file, callback) => {
				const page_contents = file.contents.toString();
				const page_title = page_contents.match(REGEXP_TITLE)?.[1];

				file.contents = Buffer.from(
					ejs.render(
						html_source,
						Object.assign(
							OPTIONS.CONFIG,
							{
								$page: {
									title: page_title,
									content: page_contents,
								},
							},
						),
						{
							filename: file.path,
						},
					),
				);

				callback(null, file);
			},
		);
	},
);
modules.define(
	'replaceConfigVariables',
	() => () => modules.transform(
		1e6,
		{ ordered: false },
		async (file, callback) => {
			let content = file.contents.toString();

			content = content.replace(
				/<=\s+([\w.]+)\s+>/g,
				(_, path) => get(OPTIONS.CONFIG, path),
			);

			file.contents = Buffer.from(content);

			callback(null, file);
		},
	),
);

// ----- MARKDOWN -----
modules.define(
	'markdown',
	() => {
		const ejs = require('ejs');
		const hljs = require('highlight.js/lib/core');
		const LRU = require('lru-cache');
		const markdownIt = require('markdown-it');

		ejs.cache = new LRU(1e3);

		const markdown = markdownIt({
			html: true,
			highlight (string, language) {
				hljs.registerLanguage(
					language,
					require('highlight.js/lib/languages/' + language),
				);

				if (
					language
					&& hljs.getLanguage(language)
				) {
					try {
						return hljs.highlight(
							string,
							{ language },
						).value;
					}
					catch {}
				}
			},
		});

		return () => modules.transform(
			1e6,
			{
				ordered: false,
			},
			async (file, callback) => {
				let contents = file.contents.toString();

				contents = ejs.render(
					contents,
					{},
					{
						filename: file.path,
					},
				);

				contents = markdown.render(contents);

				file.contents = Buffer.from(contents);

				callback(null, file);
			},
		);
	},
);
