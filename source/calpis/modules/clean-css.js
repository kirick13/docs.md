
import { CalpisFile } from 'calpis';
import CleanCSS       from 'clean-css';

export default function (options) {
	const cleanCssInstance = creareInstance(options);

	return new TransformStream({
		async transform(file, controller) {
			file.set(
				process(
					cleanCssInstance,
					file.get(
						CalpisFile.AS_STRING,
					),
				),
			);

			controller.enqueue(file);
		},
	});
}

export function creareInstance(options) {
	return new CleanCSS(options);
}

export function process(cleanCssInstance, content) {
	const result = cleanCssInstance.minify(content);

	return result.styles.replaceAll(/\n\s*/g, '');
}
