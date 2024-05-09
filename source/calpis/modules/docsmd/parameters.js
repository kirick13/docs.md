
import * as parse5Tools         from '@parse5/tools';
import {
	parseFragment,
	serialize as getInnerHtml } from 'parse5';
import { createElement }        from '../../utils.js';

const PARAMETERS_TITLE_REGEXP = /^([^\s:]+)(?::\s([^[]+))?(?:\s\[(REQUIRED)])?(?:\s\[(DEPRECATED)])?(?:\s\[(EXPERIMENTAL)])?$/;

/**
 * @param {Array<import('parse5/dist/tree-adapters/default').Node>} nodes -
 * @returns {import('parse5/dist/tree-adapters/default').Element} -
 */
export function processParameters(nodes) {
	while (nodes.length > 0) {
		const node = nodes[0];

		if (parse5Tools.isElementNode(node)) {
			if (node.nodeName !== 'p') {
				throw new Error(`Unexpected node ${node.nodeName} found in "Parameters" block.`);
			}

			// const parameters_raw = getInnerHtml(node).split('\n');
			// console.log('parameters_raw', parameters_raw);

			const elements = [];
			let element_header;
			let elements_description = [];
			for (const line of getInnerHtml(node).split('\n')) {
				if (element_header) {
					// found next parameter
					if (line.startsWith('|- ')) {
						elements.push(
							createElement(
								'div',
								{},
								[
									element_header,
									...elements_description,
								],
							),
						);

						element_header = processParametersDefinition(line);
						elements_description = [];
					}
					else if (line.startsWith('|  ')) {
						elements_description.push(
							createElement(
								'div',
								{},
								parseFragment(
									line.slice(3),
								).childNodes,
							),
						);
					}
					else {
						throw new Error(`Unexpected line "${line}" found in "Parameters" block, expected parameter description.`);
					}
				}
				// expect title
				else if (line.startsWith('|- ')) {
					element_header = processParametersDefinition(line);
				}
				else {
					throw new Error(`Unexpected line "${line}" found in "Parameters" block, expected parameter definition.`);
				}
			}

			if (element_header) {
				elements.push(
					createElement(
						'div',
						{},
						[
							element_header,
							...elements_description,
						],
					),
				);
			}

			nodes.shift();

			return createElement(
				'div',
				{
					class: 'parameters',
				},
				elements,
			);
		}

		nodes.shift();
	}

	throw new Error('No parameters found in "Parameters" block.');
}

/**
 * @param {string} line -
 * @returns {import('parse5/dist/tree-adapters/default').Element} -
 */
function processParametersDefinition(line) {
	const match = line.slice(3).match(PARAMETERS_TITLE_REGEXP);
	if (!match) {
		throw new Error(`Invalid title line "${line}" found in "Parameters" block.`);
	}

	const [
		,
		name,
		type,
		...flags
	] = match;

	const elements_flags = [];
	for (const flag of flags) {
		if (
			typeof flag === 'string'
			&& flag.length > 0
		) {
			elements_flags.push(
				createElement(
					'div',
					{
						class: `parameter-header-flag _${flag.toLowerCase()}`,
					},
				),
			);
		}
	}

	return createElement(
		'div',
		{
			class: 'parameter-header',
		},
		[
			createElement(
				'div',
				{
					class: 'parameter-header-name',
				},
				[
					parse5Tools.createTextNode(name),
				],
			),
			createElement(
				'div',
				{
					class: 'parameter-header-type',
				},
				parseFragment(type).childNodes,
			),
			...elements_flags,
		],
	);
}
