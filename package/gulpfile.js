
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
		() => MODULES.purgeFiles('../build/css/**/*'),
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
			dest('../build/css'),
			MODULES.compress(
				OPTIONS.COMPRESS,
			),
			dest('../build/css'),
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
		() => MODULES.purgeFiles('../build/js/**/*'),
	);
	task(
		'js-build',
		() => pipeline(
			src('./web/*.js'),
			MODULES.jsMinify(),
			dest('../build/js'),
			MODULES.compress(
				OPTIONS.COMPRESS,
			),
			dest('../build/js'),
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
			'../build/**/*.html',
			'../build/**/*.html.gz',
			'../build/**/*.html.br',
		]),
	);
	task(
		'html-build',
		() => pipeline(
			src('../pre-build/**/*.html'),
			MODULES.buildPages(),
			MODULES.htmlmin(
				OPTIONS.HTMLMIN,
			),
			dest('../build'),
			MODULES.compress(
				OPTIONS.COMPRESS,
			),
			dest('../build'),
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
		() => MODULES.purgeFiles('../pre-build/**/*'),
	);
	task(
		'md-build',
		() => pipeline(
			src('../source/pages/**/*.md'),
			MODULES.markdown(),
			dest('../pre-build'),
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
		() => MODULES.purgeFiles('../build/img/**/*'),
	);
	task(
		'images-build',
		() => pipeline(
			src('../source/img/**/*'),
			dest('../build/img'),
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
