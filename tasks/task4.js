//определяем диапазоны падежей и чисел, возвращаем нужный падеж из массива вариантов
function changingEndings(num, arrWords){
	num = Math.abs(num) % 100;
	num = num % 10;
	if(num > 10 && num < 20) return arrWords[2]
	if(num > 1 && num < 5) return arrWords[1];
	if(num === 1) return arrWords[0];
	return arrWords[2];
}

console.log(changingEndings(18,['сообщения', 'сообщения', 'сообщений']))
console.log(changingEndings(3,['товар', 'товара', 'товаров']))
console.log(changingEndings(50,['штука', 'штуки', 'штук']))
console.log(changingEndings(1345,['пара', 'пары', 'пар']))

module.exports = { changingEndings };