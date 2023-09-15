//нужна функция, которая вызовет каждую функцию в массиве и выведет их порядковый номер
//рассмотрю три варианта выполнения: синхронно и асинхронно

const funcArr = [
	function firstFunc() {
		console.log("Первая функция выполнена");
	},
	function secondFunc() {
		console.log("Вторая функция выполнена");
	},
	function thirdFunc() {
		console.log("Третья функция выполнена");
	},
]

//просто проходим по массиву и вызываем функции
funcArr.forEach((func, index) => {
	console.log(`Порядковый номер: ${index + 1}`);
	return func()
})


const funcArr2 = [
	function firstFunc() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("Первая функция выполнена")
			}, 2000)
		})
	},
	function secondFunc() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("Вторая функция выполнена")
			}, 1000)
		})
	},
	function thirdFunc() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve("Третья функция выполнена")
			}, 3000)
		})
	},
]

//блягодаря  async-await  дожидаемся заверешения таймера каждой функции и только после этого выполняем следующую
async  function asincFuncArr(arr) {
	for (let i = 0; i < arr.length; i++) {
		const resFunc = await arr[i]();
		console.log(resFunc, `Порядковый номер: ${i + 1}`)
	}
}

asincFuncArr(funcArr2);