
/* eslint-env node, commonjs */

const { src,
		dest,
		task,
		series,
		parallel } = require('gulp');

const { pipeline } = require('./gulpfile/fns');
const MODULES      = require('./gulpfile/modules');
const OPTIONS      = require('./gulpfile/options');

const PATH_SOURCE = '/var/docs.md/source';
const PATH_BUILD = '/var/docs.md/build';
const PATH_PREBUILD = '/tmp/pre-build';

// ----- CSS -----
{
	task(
		'css-clean',
		() => MODULES.purgeFiles(`${PATH_BUILD}/css/**/*`),
	);
	task(
		'css-build',
		() => pipeline(
			src('./web/*.scss'),
			MODULES.scss(
				OPTIONS.SCSS,
			),
			MODULES.rename({
				extname: '.css',
			}),
			MODULES.autoprefixer(),
			MODULES.cleanCSS(OPTIONS.CLEANCSS),
			dest(`${PATH_BUILD}/css`),
			MODULES.compress(
				OPTIONS.COMPRESS,
			),
			dest(`${PATH_BUILD}/css`),
		),
	);
	task(
		'css',
		series(
			'css-clean',
			'css-build',
		),
	);
}

// ----- JS -----
{
	task(
		'js-clean',
		() => MODULES.purgeFiles(`${PATH_BUILD}/js/**/*`),
	);
	task(
		'js-build',
		() => pipeline(
			src('./web/*.js'),
			MODULES.jsMinify(),
			dest(`${PATH_BUILD}/js`),
			MODULES.compress(
				OPTIONS.COMPRESS,
			),
			dest(`${PATH_BUILD}/js`),
		),
	);
	task(
		'js',
		series(
			'js-clean',
			'js-build',
		),
	);
}

// ----- HTML -----
{
	task(
		'html-clean',
		() => MODULES.purgeFiles([
			`${PATH_BUILD}/**/*.html`,
			`${PATH_BUILD}/**/*.html.gz`,
			`${PATH_BUILD}/**/*.html.br`,
		]),
	);
	task(
		'html-build',
		() => pipeline(
			src(`${PATH_PREBUILD}/**/*.html`),
			MODULES.buildPages(),
			MODULES.htmlmin(
				OPTIONS.HTMLMIN,
			),
			dest(PATH_BUILD),
			MODULES.compress(
				OPTIONS.COMPRESS,
			),
			dest(PATH_BUILD),
		),
	);
	task(
		'html',
		series(
			'html-clean',
			'html-build',
		),
	);
}

// ----- MARKDOWN -----
{
	task(
		'md-clean',
		() => MODULES.purgeFiles(`${PATH_PREBUILD}/**/*`),
	);
	task(
		'md-build',
		() => pipeline(
			src(`${PATH_SOURCE}/pages/**/*.md`),
			MODULES.markdown(),
			dest(PATH_PREBUILD),
		),
	);
	task(
		'md',
		series(
			'md-clean',
			'md-build',
		),
	);
}

// ----- IMAGES -----
{
	task(
		'images-clean',
		() => MODULES.purgeFiles(`${PATH_BUILD}/img/**/*`),
	);
	task(
		'images-build',
		() => pipeline(
			src(`${PATH_SOURCE}/img/**/*`),
			dest(`${PATH_BUILD}/img`),
		),
	);
	task(
		'images',
		series(
			'images-clean',
			'images-build',
		),
	);
}

task(
	'build',
	parallel(
		'css',
		'js',
		'images',
		series(
			'md',
			'html',
			'md-clean',
		),
	),
);
