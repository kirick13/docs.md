
import { minify }     from '@minify-html/node';
import { CalpisFile } from 'calpis';

export default function (options = {}) {
	return new TransformStream({
		transform(file, controller) {
			const result = minify(
				file.get(
					CalpisFile.AS_NODEJS_BUFFER,
				),
				options,
			);

			file.set(result);

			controller.enqueue(file);
		},
	});
}
