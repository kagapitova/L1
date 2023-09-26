function walkDom(node) {
	if (node == null) return null; // если узла нет - возвразаем null
	
	console.log(node.tagName); //  выводим tag  текущего узла
	
	for (let i = 0; i < node.children.length; i++) { // проходим по дочерним  node
		const child = node.children[i];
		walkDom(child); // рекурсивно заходим в каждый node
	}
}

const body = document.querySelector('body');

walkDom(body);