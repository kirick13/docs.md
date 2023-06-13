
/* eslint-env node, commonjs */

const { pipeline: streamPipeline } = require('stream');
const { promisify }                = require('util');

const flatArray = exports.flatArray = (array) => Array.prototype.flat.call(array, Number.POSITIVE_INFINITY);

const streamPipelinePromise = promisify(streamPipeline);
const pipeline = exports.pipeline = (...tasks) => streamPipelinePromise(
	...flatArray(tasks).filter(a => null !== a),
);
pipeline.optional = (value, tasks) => {
	if (value) {
		return tasks;
	}

	return null;
};
