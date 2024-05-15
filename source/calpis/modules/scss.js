
import { CalpisFile } from 'calpis';
import {
	SassString,
	compileString }   from 'sass';

export default function (options = {}) {
	if (options.functions) {
		prepareFunctions(options.functions);
	}

	return new TransformStream({
		transform(file, controller) {
			if (file.location.ext === '.scss') {
				const result = compile(
					file.location.path,
					file.get(
						CalpisFile.AS_STRING,
					),
					options,
				);

				file.set(result);

				file.location.ext = '.css';
			}

			controller.enqueue(file);
		},
	});
}

export function compile(path, string, options = {}) {
	if (options.functions) {
		prepareFunctions(options.functions);
	}

	return compileString(
		string,
		{
			...options,
			url: new URL(
				path,
				'file://',
			),
		},
	).css;
}

const SYMBOL_IS_PREPARED = Symbol('prepared');
const TYPES = {
	string: SassString,
};

export function prepareFunctions(options_functions) {
	if (options_functions[SYMBOL_IS_PREPARED] !== true) {
		for (const [ name, fn ] of Object.entries(options_functions ?? {})) {
			options_functions[name] = (...args) => {
				const { type, value } = fn(...args);

				const TypeClass = TYPES[type];
				if (!TypeClass) {
					throw new Error(`Unknown type: ${type}`);
				}

				return new TypeClass(value);
			};
		}

		Object.defineProperty(
			options_functions,
			SYMBOL_IS_PREPARED,
			{
				value: true,
				enumerable: false,
			},
		);
	}
}
