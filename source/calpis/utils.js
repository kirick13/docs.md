
import * as parse5Tools from '@parse5/tools';

/**
 * @async
 * @returns {Promise<Record<string, any>>} -
 */
export function getDocsdmPackage() {
	const file = Bun.file('package.json');
	return file.json();
}

/**
 * Creates new HTMLElement with @parse5/tools.
 * @param {string} tag_name Tag name.
 * @param {{ [key: string]: any }} [attributes] Element attributes.
 * @param {Array<import('parse5/dist/tree-adapters/default').Node>} [child_nodes] Child nodes.
 * @returns {import('parse5/dist/tree-adapters/default').Element} -
 */
export function createElement(tag_name, attributes = {}, child_nodes = []) {
	const element = parse5Tools.createElement(
		tag_name,
		attributes,
	);

	if (child_nodes) {
		element.childNodes.push(
			...child_nodes,
		);
	}

	return element;
}

/**
 * Returns inner text of the node.
 * @param {import('parse5/dist/tree-adapters/default').Element} node -
 * @returns {string} -
 */
export function getInnerText(node) {
	const parts = [];

	for (const node_child of node.childNodes) {
		if (parse5Tools.isElementNode(node_child)) {
			parts.push(
				getInnerText(node_child),
			);
		}
		else if (parse5Tools.isTextNode(node_child)) {
			parts.push(
				node_child.value,
			);
		}
	}

	return parts.join('');
}
