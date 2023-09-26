function first() {
	let needToSee = 12345;
	function second() {
		//здесь все просто - сейчас мы видим переменную needToSee, тк она в нашей блочной видимости и выше на уровень
		console.log(needToSee);
	}
	return second;
}
//при вызове функции first мы в result запишем функцию second, доступ к переменной получаем вызовом нашего result
const result = first();

result();