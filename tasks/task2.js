//Странное число === совершенное число, проверяем делением без остатка и суммируем результат

//c учетом самого числа и делением пополам
function isPerfect1(num) {
	let acc = 0;
	for(let i = 1; i <= num/2 ; i++) {
		if(num % i === 0) {
			acc += i
		}
	}
	
	if(acc === num && acc !== 0) {
		return true;
	}
	return false;
}

console.log(isPerfect1(6));//true
console.log(isPerfect1(496));//true
console.log(isPerfect1(777));//false
console.log(isPerfect1(0));//false
console.log(isPerfect1(-62));//false

//без учета самого числа и деления пополам
function isPerfect2(num) {
	let acc = 0;
	let i = 1;
	if(num !== 0){
		while (i < num) {
			if (num % i === 0) {
				acc += i;
			}
			i++;
		}
		return acc === num;
	}
	return false
}

console.log(isPerfect2(6));//true
console.log(isPerfect2(496));//true
console.log(isPerfect2(777));//false
console.log(isPerfect2(0));//false
console.log(isPerfect2(-28));//false