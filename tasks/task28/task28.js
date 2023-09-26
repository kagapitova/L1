const addElementButton = document.getElementById('addElementButton');
const template = document.getElementById('myTemplate');

// добавим функцию,  которая из шаблона будет рендерить клоны
// (на практите часто используется динамическая генерация элементов, см. в предыдущих заданиях)
function addElement() {
	// клонируем
	const templateContent = document.importNode(template.content, true);
	
	// добавляем  контейнер новый элемент
	document.body.appendChild(templateContent);
}

// слушатель на кнопку добавления
addElementButton.addEventListener('click', () => {
	addElement();
});