const data = '[{"test": 1}, {"test": 2}, {"test": 3, "inside": {"test": 4}}, {"test": 5}]'
const data1 = '[{"test": 1}]'
const data2 = '[]'

//конвертируем JSON в связный список путем прохода циклом по каждому объекту
function convertJSONToLinkList(jsonObj) {
	const parsedObj = JSON.parse(jsonObj);//подготовили объект для цикла, далее задаем голову
	const head = {
		value: null,
		next: null,
	};

	let currentNode = head; //пока у нас текущий элемент будет голова

	//запускаем цикл, где задаем узлы и их значения
	parsedObj.forEach((obj)=>{
		const newNode = {
			value: obj,
			next: null,
		};
		currentNode.next = newNode; //задаем ссылку на следующий узел
		currentNode = newNode; //переходим в новый узел
	})
	return head.next; //когда цикл завершен - все узлы заданы,след узел от головы
}

//для удобства просмотра результата возьмем функцию с javascript.ru
function printList(list) {
	if (list) {
		console.log(list.value); // выводим текущий элемент
		printList(list.next); // делаем то же самое для остальной части списка
	}
}

printList(convertJSONToLinkList(data));
printList(convertJSONToLinkList(data1));
printList(convertJSONToLinkList(data2));