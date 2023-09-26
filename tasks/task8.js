const funcArr = [
	function firstFunc() {
		return "Первая функция выполнена";
	},
	function firstAsyncFunc() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("Первая асинхронная функция выполнена")
			}, 2000)
		})
	},
	function secondFunc() {
		return "Вторая функция выполнена";
	},
	function secondAsyncFunc() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("Вторая асинхронная функция выполнена")
			}, 1000)
		})
	},
	function thirdFunc() {
		return "Третья функция выполнена";
	},
	function thirdAsyncFunc() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("Третья асинхронная функция выполнена")
			}, 3000)
		})
	},
]

//в этой функции задаем асинхронность нашей анонимной функции, внутри используем Promise.all
//данный метод выполняет все функции по порядку и возвращает массив резльтатов этих функций
function closureAsincFunc(array) {
	return async function() {
		const result = await Promise.all(array.map(func => func()));
		console.log(result);
	};
}

closureAsincFunc(funcArr)();