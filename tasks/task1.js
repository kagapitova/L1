//Проверяем символы попарно с конца и начала
function isPalindrome1(str) {
	str = str.toLowerCase().replace(/\s/g,''); //убираем лишнее
	const length = Math.floor(str.length/2);
	
	//проверяем пары
	for (let i = 0; i < length; i++) {
		if (str[i] !== str[str.length - i - 1]) {
			return false;
		}
	}
	return true;
}

console.log(isPalindrome1("аргентина Манит негра")) //true
console.log(isPalindrome1("аргентина")) //false
console.log(isPalindrome1("Закопан на показ")) //true


//Проверка через методы стринг
function isPalindrome2(str) {
	str = str.toLowerCase().replace(/\s/g,'');//убираем лишнее
	const newStr = str.split('').reverse().join('');//переворачиваем и проверяем
	return str === newStr
}

console.log(isPalindrome2("аргентина Манит негра")) //true
console.log(isPalindrome2("аргентина")) //false
console.log(isPalindrome2("Закопан на показ")) //true