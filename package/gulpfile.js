
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
			dest('../build/css/'),
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
		() => MODULES.purgeFiles('../build/**/*.html'),
	);
	task(
		'html-build',
		() => pipeline(
			src('../pre-build/**/*.html'),
			MODULES.buildPages(),
			MODULES.htmlmin(
				OPTIONS.HTMLMIN,
			),
			dest('../build/'),
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
			MODULES.htmlmin(
				OPTIONS.HTMLMIN,
			),
			MODULES.rename({
				extname: '.html',
			}),
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

task(
	'build',
	parallel(
		'css',
		'js',
		series(
			'md',
			'html',
			'md-clean',
		),
	),
);
