
/**
 * @typedef {object} CalpisModule
 * @property {() => Promise<object>} module -
 * @property {Array<any>} args -
 */

/**
 * @returns {CalpisModule} -
 */
export function bundleCss() {
	return {
		module: () => import('./modules/bundle-css.js'),
		args: [],
	};
}

/**
 * @param {object} options -
 * @returns {CalpisModule} -
 */
export function cleanCss(options) {
	return {
		module: () => import('./modules/clean-css.js'),
		args: [
			options,
		],
	};
}

/**
 * @returns {CalpisModule} -
 */
export function docsmd() {
	return {
		module: () => import('./modules/docsmd.js'),
		args: [],
	};
}

/**
 * @param {object} data -
 * @param {object} options -
 * @returns {CalpisModule} -
 */
export function ejs(data, options) {
	return {
		module: () => import('./modules/ejs.js'),
		args: [
			data,
			options,
		],
	};
}

/**
 * @returns {CalpisModule} -
 */
export function markdown() {
	return {
		module: () => import('./modules/markdown.js'),
		args: [],
	};
}

/**
 * @param {object} options -
 * @returns {CalpisModule} -
 */
export function minifyHtml(options) {
	return {
		module: () => import('./modules/html-minify.js'),
		args: [
			options,
		],
	};
}

/**
 * @param {object} [options] -
 * @returns {CalpisModule} -
 */
export function scss(options) {
	return {
		module: () => import('./modules/scss.js'),
		args: [
			options,
		],
	};
}
