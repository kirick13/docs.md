
import { CalpisFile }       from 'calpis';
import { render }           from 'ejs';
import { getDocsdmPackage } from '../utils.js';

export default async function (
	data = {},
	options = {},
) {
	const docsmd = await getDocsdmPackage();

	return new TransformStream({
		transform(file, controller) {
			const result = render(
				file.get(
					CalpisFile.AS_STRING,
				),
				{
					docsmd,
					...data,
				},
				{
					strict: true,
					...options,
					filename: file.location.path,
				},
			);

			file.location.ext = '.html';

			file.set(result);

			controller.enqueue(file);
		},
	});
}
