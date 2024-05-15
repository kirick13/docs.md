
import {
    gzip,
	pipeline,
	read,
	write }                     from 'calpis';
import {
	bundleCss,
	cleanCss,
	docsmd,
	ejs,
	markdown as markdownToHtml,
	minifyHtml,
	scss }                      from './calpis/modules.js';
import {
	OPTIONS_PATH,
	OPTIONS_MINIFY_HTML,
	OPTIONS_CLEANCSS,
	OPTIONS_GZIP }              from './calpis/options.js';

export const markdown = pipeline(
	read(
		{ base: `${OPTIONS_PATH}/source` },
		'**/*.md',
	),
	ejs(),
	markdownToHtml(),
	write(
		`${OPTIONS_PATH}/tmp-markdown`,
	),
);

export const html = pipeline(
	read(
		{ base: `${OPTIONS_PATH}/tmp-markdown` },
		'**/*.html',
	),
	docsmd(),
	minifyHtml(
		OPTIONS_MINIFY_HTML,
	),
	write(`${OPTIONS_PATH}/build`),
	gzip(OPTIONS_GZIP),
	write(`${OPTIONS_PATH}/build`),
);

export const css = pipeline(
	read(
		'web/*.scss',
		`${OPTIONS_PATH}/source/**/*.{css,scss}`,
		`${OPTIONS_PATH}/tmp-markdown/**/*.{css,scss}`,
	),
	scss(),
	bundleCss(),
	cleanCss(OPTIONS_CLEANCSS),
	write(`${OPTIONS_PATH}/build`),
	gzip(OPTIONS_GZIP),
	write(`${OPTIONS_PATH}/build`),
);

export const content = pipeline(
	read(
		{ base: `${OPTIONS_PATH}/source` },
		'**/*.js',
		'**/*.woff2',
		'**/*.{jpg,jpeg,png,svg,webp}',
	),
	write(`${OPTIONS_PATH}/build`),
);
