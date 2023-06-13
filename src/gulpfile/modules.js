
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
modules.require(
	'compress',
	'gulp-web-compress',
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

// ----- JS -----
modules.define(
	'jsMinify',
	() => {
		const { minify } = require('terser');

		return (options = {}) => modules.transform(
			1_000_000,
			{
				ordered: false,
			},
			async (file, cb) => {
				const result = await minify(
					file.contents.toString(),
					options,
				);

				file.contents = Buffer.from(result.code);

				cb(
					null,
					file,
				);
			},
		)
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

		const BUILD_ID = Math.random().toString(36).slice(2);
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

				let code_examples = { other: [] };
				try {
					code_examples = require(
						file.path.replace(
							/\.html$/,
							'.json',
						),
					);
				}
				catch {}

				const page_paths = new Set();
				{
					const path = '/' + file.path.split('/pre-build/')[1];

					page_paths.add(path);
					page_paths.add(
						path.replace(/\.html$/, ''),
					);
					page_paths.add(
						path.replace(/\/index\.html$/, '/'),
					);
				}

				file.contents = Buffer.from(
					ejs.render(
						html_source,
						{
							...structuredClone(OPTIONS.CONFIG),
							$build_id: BUILD_ID,
							$package: require('../package.json'),
							$page: {
								title: page_title,
								paths: page_paths,
								content: page_contents,
								code_examples,
							},
						},
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
		const REGEXP_HTTP_METHOD = /^(GET|POST|PUT|PATCH|DELETE|OPTIONS)\s+/;

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
			async function (file, callback) {
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
				const elements = [ ...document.querySelector('body').childNodes ];
				for (let index = 0; index < elements.length; index++) {
					const el = elements[index];

					if (
						'P' === el.tagName
						&& el.textContent.startsWith('<<< PARAMETERS')
					) {
						const el_parameters = document.createElement('div');
						el_parameters.classList.add('parameters');

						for (const parameters_raw of el.innerHTML.split(' PARAMETERS\n')[1].split(/\n(?:&lt;|<){3}(?:\n|$)/)) {
							if (parameters_raw.length === 0 || parameters_raw.startsWith('&lt;&lt;&lt;')) {
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
								note = data.pop().slice(6);
								note = note[0].toUpperCase() + note.slice(1);
							}

							for (const line of data) {
								if (line.startsWith('&lt;&lt;&lt;') !== true) {
									el_parameter.innerHTML += `<p>${line}</p>`;
								}
							}

							if (note) {
								el_parameter.innerHTML += `<p class="footnote">${note}</p>`;
							}
						}

						// console.log('el_parameters', el_parameters.outerHTML);

						el.replaceWith(el_parameters);
					}
					else if (
						'H1' === el.tagName
						&& 'MARK: Examples' === el.textContent
					) {
						const data = {
							request: undefined,
							other: [],
						};

						const context = {
							section: null,
							snippet: null,
						};

						for (
							let index_examples = 0;
							(index + index_examples) < elements.length;
							index++, index_examples++
						) {
							const el_this = elements[index + index_examples];

							switch (el_this.tagName) {
								case 'H2': {
									const is_request = 'request' === el_this.textContent.toLowerCase();

									context.section = {
										is_request,
										title: is_request ? null : el_this.textContent,
										snippets: [],
									};
									context.snippet = null;

									if (is_request) {
										data.request = context.section;
									}
									else {
										data.other.push(
											context.section,
										);
									}
								} break;
								case 'P': {
									if (context.section.is_request) {
										if (
											null === context.section.title
											&& context.section.snippets.length === 0
										) {
											let html = el_this.innerHTML;

											if (REGEXP_HTTP_METHOD.test(html)) {
												context.section.is_title_monospace = true;

												html = html.replace(
													REGEXP_HTTP_METHOD,
													'<span class="_method">$1</span>&nbsp;',
												);
											}

											context.section.title = html;
										}
									}
									else {
										context.snippet = {
											subtitle: el_this.innerHTML,
										};
										context.section.snippets.push(context.snippet);
									}
								} break;
								case 'PRE': {
									if (context.section.is_request) {
										context.section.snippets.push({
											content: el_this.outerHTML,
										});
									}
									else {
										if (context.snippet) {
											context.snippet.content = el_this.outerHTML;
										}
										else {
											context.section.snippets.push({
												content: el_this.outerHTML,
											});
										}
									}
								} break;
								// no default
							}

							el_this.remove();
						}

						// console.log('data', require('util').inspect(data, { depth: 10, colors: true }));

						const file_code_examples = file.clone();
						file_code_examples.path = file_code_examples.path.replace(/\.md$/, '.json');
						file_code_examples.contents = Buffer.from(
							JSON.stringify(data),
						);

						this.push(file_code_examples);

						el.remove();
					}
				}

				contents = document.querySelector('body').innerHTML.trim();

				file.contents = Buffer.from(contents);
				file.path = file.path.replace(/\.md$/, '.html');

				callback(null, file);
			},
		);
	},
);
