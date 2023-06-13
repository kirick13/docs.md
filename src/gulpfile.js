
/* eslint-env node, commonjs */

const { src,
		dest,
		task,
		series,
		parallel } = require('gulp');

const { pipeline } = require('./gulpfile/fns');
const MODULES      = require('./gulpfile/modules');
const OPTIONS      = require('./gulpfile/options');

// ----- CSS -----
{
	task(
		'css-clean',
		() => MODULES.purgeFiles(`${OPTIONS.PATH_BUILD}/css/**/*`),
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
			dest(`${OPTIONS.PATH_BUILD}/css`),
			MODULES.compress(
				OPTIONS.COMPRESS,
			),
			dest(`${OPTIONS.PATH_BUILD}/css`),
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
		() => MODULES.purgeFiles(`${OPTIONS.PATH_BUILD}/js/**/*`),
	);
	task(
		'js-build',
		() => pipeline(
			src('./web/*.js'),
			MODULES.jsMinify(),
			dest(`${OPTIONS.PATH_BUILD}/js`),
			MODULES.compress(
				OPTIONS.COMPRESS,
			),
			dest(`${OPTIONS.PATH_BUILD}/js`),
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
			`${OPTIONS.PATH_BUILD}/**/*.html`,
			`${OPTIONS.PATH_BUILD}/**/*.html.gz`,
			`${OPTIONS.PATH_BUILD}/**/*.html.br`,
		]),
	);
	task(
		'html-build',
		() => pipeline(
			src(`${OPTIONS.PATH_PREBUILD}/**/*.html`),
			MODULES.buildPages(),
			MODULES.htmlmin(
				OPTIONS.HTMLMIN,
			),
			dest(OPTIONS.PATH_BUILD),
			MODULES.compress(
				OPTIONS.COMPRESS,
			),
			dest(OPTIONS.PATH_BUILD),
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
		() => MODULES.purgeFiles(`${OPTIONS.PATH_PREBUILD}/**/*`),
	);
	task(
		'md-build',
		() => pipeline(
			src(`${OPTIONS.PATH_SOURCE}/pages/**/*.md`),
			MODULES.markdown(),
			dest(OPTIONS.PATH_PREBUILD),
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
		() => MODULES.purgeFiles(`${OPTIONS.PATH_BUILD}/img/**/*`),
	);
	task(
		'images-build',
		() => pipeline(
			src(`${OPTIONS.PATH_SOURCE}/img/**/*`),
			dest(`${OPTIONS.PATH_BUILD}/img`),
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
