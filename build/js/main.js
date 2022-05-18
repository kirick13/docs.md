
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
