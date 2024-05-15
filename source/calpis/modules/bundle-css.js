
import { CalpisFile } from 'calpis';

export default function () {
	const css = [];

	return new TransformStream({
		transform(file) {
			const file_contents = file.get(CalpisFile.AS_STRING);

			if (file.location.path.startsWith('/app/web/')) {
				css.unshift(
					'/* core styles */',
					file_contents,
				);
			}
			else {
				css.push(
					`/* ${file.location.path} */`,
					file_contents,
				);
			}
		},
		flush(controller) {
			const file = new CalpisFile(
				'.',
				'css/style.css',
			);

			file.set(
				css.join('\n\n'),
			);

			controller.enqueue(file);
		},
	});
}
