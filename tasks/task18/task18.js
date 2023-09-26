function calculateMaxLocalStorageSize() {
	let key = 'a';
	let data = 'x';
	localStorage.clear(); //перед тестом очищаем хранилище для точности измерения
	try {
		while (true) {
			localStorage.setItem(key, data);
			data += data
		}
	} catch (error) {
		return { // вернем данные
			estimatedSize: JSON.stringify(localStorage).length,
			errorMessage: error.message,
		};
	}
}

const localStorageInfo = calculateMaxLocalStorageSize();
console.log('Размер в байтах:', localStorageInfo.estimatedSize, 'байт');
console.log('Размер в мегабайтах:', Math.round(localStorageInfo.estimatedSize/1024/1024), 'мегабайт');
console.log('Стоп:', localStorageInfo.errorMessage);

// мой результат в google chrome
//Размер в байтах: 4194312 байт
//Размер в мегабайтах: 4 мегабайт
