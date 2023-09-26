//нужна функция, которая вызовет каждую функцию в массиве и выведет их порядковый номер
const funcArr = [
	function firstFunc() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("Первая асинхронная функция выполнена")
			}, 3000)
		})
	},
	function secondFunc() {
		console.log("Вторая функция выполнена");
	},
	function thirdFunc() {
		console.log("Третья функция выполнена");
	},
	function fourFunc() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("Четвертая асинхронная функция выполнена")
			}, 1000)
		})
	},
];

//блягодаря  async-await  дожидаемся заверешения таймера каждой функции и только после этого выполняем следующую
async  function asincFuncArr(arr) {
	for (let i = 0; i < arr.length; i++) {
		const resFunc = await arr[i]();
		if (resFunc) {
			console.log(resFunc, `Порядковый номер: ${i + 1}`)
		} else {
			console.log(`Порядковый номер: ${i + 1}`)
		}
	}
}

asincFuncArr(funcArr);