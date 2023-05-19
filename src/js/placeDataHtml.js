const { getSequences } = require('./sequences');
function placeDataHtml() {
	console.log('!!!ShowFileName!!!');

	document.getElementById('amountOfSequences').textContent = getSequences().length;
}

let score = getSequences().length;

function generate_card() {
	const div = document.createElement('div');
	article.className = 'cards__item';
	tooltipWrap.dataset.category = category;
	tooltipWrap.innerHTML = `
	<div class="tooltip-wrap__tooltip-item">
		<div class="tooltip-item__title">
			<span>${parsetJSONname}</span>
		</div>
		<div class="tooltip-item__text" id="tooltipText">${getSequences()}</div>
	</div>`;
	console.log(tooltipWrap);
	return tooltipWrap;
}



module.exports = { placeDataHtml};
