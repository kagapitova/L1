// есть два способа отсчета по числам Фибоначчи: c учетом 0 и без него.я выбрала способ без 0.


class MathX {
	
	//на каждом шаге запоминаем значения двух предыдущих чисел последовательности.
	getFibNumByPosition = (n) => {
			let a = 1;
			let b = 1;
			for (let i = 3; i <= n; i++) { //если хотим считать с 0, то i = 2
				let c = a + b;
				a = b;
				b = c;
			}
			return b;
		}
		
	//циклом высчитываем значения каждого числа фиб до целевого	числа
	getFibNumsByPosOfLastNum = (n) => {
			let result = [];
			for (let i = 1; i < n + 1; i++) {
				result.push(this.getFibNumByPosition(i));
			}
			return result
	}
	
	//проверяем простое ли число
	isPrime = (n) => {
		for (let i = 2; i < n; i++) {
			if (n % i === 0) return false;
		}
		return n !== 1;
	}
	
	//проверяем все числа, пока счетчик i не будет равен переданной позиции
	getPrimeNumByPosition(n) {
		let i = 0;
		let num = 2;
		while (i < n) {
			if (this.isPrime(num)) {
				i++;
			}
			num++;
		}
		return num - 1;
	}
	
	//если число простое - добавляем в массив. проверка идет до числа n
	getPrimeNumsByLastNum = (n) => {
		let result = [];
		for (let i = 1; i < n + 1; i++) {
			if(this.isPrime(i)){
				result.push(i);
			}
		}
		return result
	}
	
	
}

const fibCounter = new MathX();

console.log(fibCounter.getFibNumByPosition(7))
console.log(fibCounter.getFibNumByPosition(8))
console.log(fibCounter.getFibNumByPosition(21))
console.log(fibCounter.getFibNumByPosition(1))
console.log(fibCounter.getFibNumsByPosOfLastNum(7))
console.log(fibCounter.getFibNumsByPosOfLastNum(8))
console.log(fibCounter.getFibNumsByPosOfLastNum(21))
console.log(fibCounter.getFibNumsByPosOfLastNum(1))
console.log(fibCounter.getPrimeNumByPosition(1))
console.log(fibCounter.getPrimeNumByPosition(2))
console.log(fibCounter.getPrimeNumByPosition(12))
console.log(fibCounter.getPrimeNumsByLastNum(1))
console.log(fibCounter.getPrimeNumsByLastNum(2))
console.log(fibCounter.getPrimeNumsByLastNum(12))

