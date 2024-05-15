
import * as parse5Tools         from '@parse5/tools';
import { CalpisFile }           from 'calpis';
import { render as renderEjs }  from 'ejs';
import {
	parseFragment,
	serialize as getInnerHtml } from 'parse5';
import { project_config }       from '../project-config.js';
import {
	getDocsdmPackage,
	createElement,
	getInnerText }              from '../utils.js';
import { processParameters }    from './docsmd/parameters.js';

export default async function () {
	const [
		template_code,
		docsmd,
	] = await Promise.all([
		readTemplateCode(),
		getDocsdmPackage(),
	]);
	// console.log('config', config);

	const BUILD_ID = Date.now();

	return new TransformStream({
		transform(file, controller) {
			const html = file.get(CalpisFile.AS_STRING);
			const fragment = parseFragment(html);

			// console.log('----------', file.location.path, '----------');

			const {
				page_title,
				page_contents_table,
				fragment: fragment_page,
			} = processBody(
				fragment.childNodes,
			);
			// console.log('fragment_article', getInnerHtml(fragment_page));

			const file_url = '/' + file.location.path.split('/tmp-markdown/')[1];
			const urls = new Set([
				file_url,
				file_url.replace(/\.html$/, ''),
				file_url.replace(/\/index\.html$/, '/'),
			]);

			file.set(
				renderEjs(
					template_code,
					{
						BUILD_ID,
						docsmd,
						project_config,
						page: {
							title: page_title,
							contents_table: page_contents_table,
							urls,
							content: getInnerHtml(fragment_page),
						},
					},
					{
						filename: file.location.path,
					},
				),
			);

			controller.enqueue(file);
		},
	});
}

/**
 * @async
 * @returns {Promise<string>} -
 */
function readTemplateCode() {
	const file = Bun.file('web/template.html');
	return file.text();
}

/**
 * @param {Array<import('parse5/dist/tree-adapters/default').Node>} nodes -
 * @returns {{ page_title: string, page_contents_table: Array<{ level: number, content: string }>, fragment: import('parse5/dist/tree-adapters/default').DocumentFragment }} -
 */
function processBody(nodes) {
	let page_title;
	const page_contents_table = [];
	const fragment = parse5Tools.createDocumentFragment();

	while (nodes.length > 0) {
		const elements_article = [];

		while (nodes.length > 0) {
			const node = nodes[0];

			let do_shift = true;

			if (parse5Tools.isTextNode(node)) {
				elements_article.push(node);
			}
			else if (parse5Tools.isCommentNode(node)) {
				if (node.data.trim() === 'DOCS.MD: PARAMETERS') {
					do_shift = false;
					nodes.shift();

					elements_article.push(
						processParameters(nodes),
					);
				}
				else {
					elements_article.push(node);
				}
			}
			else if (parse5Tools.isElementNode(node)) {
				if (
					!page_title
					&& node.nodeName === 'h1'
				) {
					page_title = getInnerText(node);
				}

				/** @type {import('parse5/dist/tree-adapters/default').Node} */
				const node_first_child = node.childNodes[0];
				if (
					node.nodeName === 'h2'
					&& node_first_child.nodeName === '#comment'
					&& node_first_child.data.trim() === 'DOCS.MD: SAMPLE'
				) {
					do_shift = false;
					nodes.shift();

					// element_samples.childNodes.push(
					// 	...processSamples(nodes),
					// );

					fragment.childNodes.push(
						createElement(
							'div',
							{ class: 'article' },
							elements_article,
						),
					);

					elements_article.length = 0;

					const element_samples = processSamples(nodes);
					if (element_samples.length > 0) {
						fragment.childNodes.push(
							createElement(
								'div',
								{ class: 'samples' },
								[
									createElement(
										'div',
										{ class: 'samples-group' },
										element_samples,
									),
								],
							),
						);
					}
				}
				else {
					if (node.nodeName === 'h2') {
						const content = getInnerText(node);
						const id = encodeURIComponent(
							content.toLowerCase().replaceAll(/\s+/g, '-'),
						);

						parse5Tools.setAttribute(
							node,
							'id',
							id,
						);

						page_contents_table.push({
							id,
							content: getInnerText(node),
						});
					}

					elements_article.push(node);
				}
			}
			else {
				throw new Error(`Unsupported node ${node.nodeName}`);
			}

			if (do_shift) {
				nodes.shift();
			}
		}

		if (elements_article.length > 0) {
			fragment.childNodes.push(
				createElement(
					'div',
					{ class: 'article' },
					elements_article,
				),
			);
		}
	}

	processContent(fragment.childNodes);

	return {
		page_title,
		page_contents_table,
		fragment,
	};
}

/**
 * @param {Array<import('parse5/dist/tree-adapters/default').Node>} nodes -
 */
function processContent(nodes) {
	for (const node of nodes) {
		if (parse5Tools.isElementNode(node)) {
			if (node.tagName === 'a') {
				if (
					node.childNodes.length === 1
					&& parse5Tools.isElementNode(node.childNodes[0])
					&& node.childNodes[0].tagName === 'code'
				) {
					parse5Tools.setAttribute(
						node,
						'data-code',
						'',
					);
				}

				const href = parse5Tools.getAttribute(node, 'href');
				if (
					typeof href === 'string'
					&& (
						href.startsWith('//')
						|| href.startsWith('http://')
						|| href.startsWith('https://')
					)
				) {
					parse5Tools.setAttribute(
						node,
						'target',
						'_blank',
					);

					parse5Tools.setAttribute(
						node,
						'rel',
						'noopener noreferrer',
					);
				}
			}
			else {
				processContent(node.childNodes);
			}
		}
	}
}

/**
 * @param {Array<import('parse5/dist/tree-adapters/default').Node>} nodes -
 * @returns {Array<import('parse5/dist/tree-adapters/default').Element>} -
 */
function processSamples(nodes) {
	/* const element_start = */ nodes.shift();

	const nodes_result = [];

	while (nodes.length > 0) {
		let title;
		const langs = [];
		const blocks = [];

		while (nodes.length > 0) {
			const node = nodes[0];

			if (parse5Tools.isElementNode(node)) {
				// if we have a title, we expect only <pre> elements
				if (title) {
					// we expect to find a title element only of the same level as our title
					// or of the same level as the top sample header
					// otherwise, this is an error in structure
					if (
						node.nodeName === 'h2'
						|| node.nodeName === 'h3'
					) {
						break;
					}
					// if we found a <pre> element, add it to the sample blocks
					else if (node.nodeName === 'pre') {
						langs.push(
							parse5Tools.getAttribute(
								node,
								'data-lang',
							),
						);
						blocks.push(node);

						nodes.shift();
					}
					else {
						throw new Error(`Unexpected node ${node.nodeName} found in "Sample" block.`);
					}
				}
				// we don't have a title yet, looking for first element
				// if it is a title
				else if (node.nodeName === 'h3') {
					title = getInnerHtml(node);
					nodes.shift();
				}
				// if it isn't a title, throw an error
				else {
					throw new Error(`Unexpected node ${node.nodeName} found in "Sample" block.`);
				}
			}
			else {
				nodes.shift();
			}
		}

		nodes_result.push(
			createSampleBlock(
				title,
				langs,
				blocks,
			),
		);

		if (
			nodes.length === 0
			|| nodes[0].tagName === 'h2'
		) {
			break;
		}
	}

	return nodes_result;
}

const HTTP_METHOD_REGEXP = /^\[(GET|POST|PUT|PATCH|DELETE)]\s(.*)$/;

function createSampleBlock(
	title,
	langs,
	blocks,
) {
	const title_match = title.match(HTTP_METHOD_REGEXP);

	const elements_title = [];
	if (title_match) {
		elements_title.push(
			createElement(
				'span',
				{
					'class': 'http-method',
					'data-method': title_match[1],
				},
			),
			createElement(
				'span',
				{ class: '_monospace' },
				[
					parse5Tools.createTextNode(
						title_match[2],
					),
				],
			),
		);
	}
	else {
		elements_title.push(
			parse5Tools.createTextNode(title),
		);
	}

	const element_sample_header = createElement(
		'div',
		{ class: 'sample-header' },
		[
			createElement(
				'span',
				{},
				elements_title,
			),
		],
	);

	if (langs.length > 1) {
		const elements_option = [];
		for (const [ index, lang ] of langs.entries()) {
			elements_option.push(
				createElement(
					'option',
					{
						value: String(index),
					},
					[
						parse5Tools.createTextNode(lang),
					],
				),
			);
		}

		const element_select_container = createElement(
			'div',
			{ class: 'sample-lang' },
			[
				createElement(
					'select',
					{},
					elements_option,
				),
			],
		);

		element_sample_header.childNodes.push(element_select_container);
	}

	for (const [ index, block ] of blocks.entries()) {
		parse5Tools.setAttribute(
			block,
			'data-index',
			String(index),
		);
	}

	return createElement(
		'div',
		{ class: 'sample' },
		[
			element_sample_header,
			...blocks,
		],
	);
}
