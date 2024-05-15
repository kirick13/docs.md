
import { CalpisFile }     from 'calpis';
import markdownIt         from 'markdown-it';
import {
	bundledLanguages,
	getHighlighter }      from 'shiki';
import { project_config } from '../project-config.js';

const HIGNLIGHT_THEME = project_config.code_highlight_theme ?? 'one-dark-pro';
const CSS_COLOR_MATCH = /color:\s*(#[\da-f]{3,8})/i;

export default async function () {
	const colors = new Map();

	const highlighter = await getHighlighter({
		themes: [
			HIGNLIGHT_THEME,
		],
		langs: Object.keys(bundledLanguages),
	});

	const md = markdownIt({
		html: true,
		highlight(code, lang) {
			return highlighter.codeToHtml(
				code,
				{
					lang,
					theme: HIGNLIGHT_THEME,
					transformers: [{
						pre(node) {
							delete node.properties.style;
							delete node.properties.class;

							node.properties['data-lang'] = lang;
						},
						span(node) {
							if (typeof node.properties.style === 'string') {
								const match = node.properties.style.match(CSS_COLOR_MATCH);
								if (match === null) {
									console.error(node);
									throw new Error('Color not found');
								}

								const color = match[1];

								let color_id = colors.get(color);
								if (typeof color_id !== 'number') {
									color_id = colors.size;

									colors.set(
										color,
										color_id,
									);
								}

								node.properties.style = node.properties.style.replace(
									CSS_COLOR_MATCH,
									'',
								);

								node.properties.class ??= '';
								node.properties.class += ` c${color_id}`;
								node.properties.class = node.properties.class.trim();
							}
						},
					}],
				},
			);
		},
	});

	let file_location_base;

	return new TransformStream({
		transform(file, controller) {
			file_location_base ??= file.location.base;

			const result = md.render(
				file.get(
					CalpisFile.AS_STRING,
				),
			);

			file.location.ext = '.html';

			file.set(result);

			controller.enqueue(file);
		},
		flush(controller) {
			if (file_location_base) {
				let file_contents = 'pre {\n';
				for (const [ color, color_id ] of colors) {
					file_contents += `\t& .c${color_id} { color: ${color} }\n`;
				}
				file_contents += '}\n';

				const file = new CalpisFile(
					file_location_base,
					'css/shiki.scss',
				);

				file.set(file_contents);

				controller.enqueue(file);
			}
		},
	});
}
