
document.addEventListener(
	'mouseover',
	(event) => {
		const el = event.target;
		if (
			'A' === el.tagName
			&& (
				el.protocol !== location.protocol
				|| el.host !== location.host
			)
		) {
			el.target = '_blank';
		}
	},
);

if (document.readyState !== 'loading') {
	init();
}
else {
	window.addEventListener(
		'load',
		init,
		{
			once: true,
		},
	);
}

function init () {
	console.info('DOMContentLoaded!');

	const { body } = document;

	let is_nav_opened = false;
	document.querySelector('header .burger').addEventListener(
		'click',
		() => {
			is_nav_opened = !is_nav_opened;
			updateNav();
		},
	);

	function updateNav () {
		if (is_nav_opened) {
			body.classList.add('_nav_opened');
		}
		else {
			body.classList.remove('_nav_opened');
		}
	}
}
