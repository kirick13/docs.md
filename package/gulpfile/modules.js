
/* eslint-env node, commonjs */

const { readFileSync } = require('fs');

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
modules.define(
	'purgeFiles',
	() => {
		const del = require('del');

		return (paths) => del(
			paths,
			{
				force: true,
			},
		);
	},
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
modules.require(
	'htmlmin',
	'gulp-htmlmin',
);
modules.require('parse5');
modules.require('cheerio');
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

				// const el = modules.parse5.parseFragment(page_contents).childNodes[0];
				// console.log('el', el.innerText);

				// const $ = modules.cheerio.load(page_contents);
				// console.log($('body').children().html());

				file.contents = Buffer.from(
					ejs.render(
						html_source,
						Object.assign(
							OPTIONS.CONFIG,
							{
								$package: require('../package.json'),
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

// ----- MARKDOWN -----
modules.define(
	'markdown',
	() => {
		const ejs        = require('ejs');
		const { JSDOM }  = require('jsdom');
		const hljs       = require('highlight.js/lib/core');
		const LRU        = require('lru-cache');
		const markdownIt = require('markdown-it');

		const REGEXP_PARAMETER_DEFINITION = /^([^:]+):\s([^[]+)(?:\s\[(REQUIRED|DEPRECATED|EXPERIMENTAL)])*$/;

		ejs.cache = new LRU(1e3);

		const markdown = markdownIt({
			html: true,
			highlight (string, language) {
				if (typeof language === 'string' && language.length > 0) {
					hljs.registerLanguage(
						language,
						require('highlight.js/lib/languages/' + language),
					);
				}

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
					{
						$package: require('../package.json'),
					},
					{
						filename: file.path,
					},
				);

				contents = markdown.render(contents);

				const { document } = new JSDOM(contents).window;
				for (const el of document.querySelector('body').childNodes) {
					if (
						'P' === el.tagName
						&& el.textContent.startsWith('<<< PARAMETERS')
					) {
						const el_parameters = document.createElement('div');
						el_parameters.classList.add('parameters');

						for (const parameters_raw of el.innerHTML.split(' PARAMETERS\n')[1].split(/\n(?:&lt;){3}(?:\n|$)/)) {
							if (parameters_raw.length === 0) {
								continue;
							}

							const el_parameter = document.createElement('div');
							el_parameter.classList.add('parameter');

							el_parameters.append(el_parameter);

							const data = parameters_raw.split('\n');

							{
								const [
									,
									name,
									type,
									mod,
								] = data.shift().match(REGEXP_PARAMETER_DEFINITION);

								let html = '<div class="parameter-def">';
								html += `<div class="_name">${name}</div>`;
								html += `<div class="_type">${type}</div>`;
								if (mod) {
									html += `<div class="_mod _${mod.toLowerCase()}"></div>`;
								}
								html += '</div>';

								el_parameter.innerHTML += html;
							}

							let note;
							if (data[data.length - 1].startsWith('Note: ')) {
								note = data.pop();
							}

							for (const line of data) {
								el_parameter.innerHTML += `<p>${line}</p>`;
							}

							if (note) {
								el_parameter.innerHTML += `<p class="footnote">${note}</p>`;
							}
						}

						// console.log('el_parameters', el_parameters.outerHTML);

						el.replaceWith(el_parameters);
					}
				}

				contents = document.querySelector('body').innerHTML;

				file.contents = Buffer.from(contents);

				callback(null, file);
			},
		);
	},
);
