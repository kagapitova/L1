const myInput = document.getElementById("password__input");
const letter = document.getElementById("letter");
const capital = document.getElementById("capital");
const number = document.getElementById("number");
const length = document.getElementById("length");
const symbol = document.getElementById("symbol");
const security = document.getElementById("security");
const submitBtn = document.getElementById('submit_btn');

// счетчик надежности пароля будем считать из кол-ва выполненных проверок
let score = {
	letter: 0,
	capital: 0,
	number: 0,
	lengthValue: 0,
	symbol: 0
};

//когда пользователь на инпуте пароля - внизу отображается блок с подсказками
myInput.onfocus = function() {
	document.getElementById("message").style.display = "block";
}

// когда пользователь уходит с инпута - блок с подсказками скрывается
myInput.onblur = function() {
	document.getElementById("message").style.display = "none";
}

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();
})

function getScore() {
	let count = 0;
	for (const prop in score) {
		count += score[prop];
	}
	return count;
}

// Когда пользователь начинает вводить что-то в поле пароля
myInput.onkeyup = function() {
	// Проверка строчных букв
	const lowerCaseLetters = /[a-z]/g;
	if(myInput.value.match(lowerCaseLetters)) {
		letter.classList.remove("invalid");
		letter.classList.add("valid");
		score.letter = 1;
	} else {
		letter.classList.remove("valid");
		letter.classList.add("invalid");
		score.letter = 0;
	}
	
	// Проверка заглавных букв
	const upperCaseLetters = /[A-Z]/g;
	if(myInput.value.match(upperCaseLetters)) {
		capital.classList.remove("invalid");
		capital.classList.add("valid");
		score.capital = 1;
	} else {
		capital.classList.remove("valid");
		capital.classList.add("invalid");
		score.capital = 0;
	}
	
	// Проверка чисел
	const numbers = /[0-9]/g;
	if(myInput.value.match(numbers)) {
		number.classList.remove("invalid");
		number.classList.add("valid");
		score.number = 1;
	} else {
		number.classList.remove("valid");
		number.classList.add("invalid");
		score.number = 0;
	}
	
	// Проверить длину
	if(myInput.value.length >= 8) {
		length.classList.remove("invalid");
		length.classList.add("valid");
		score.lengthValue = 1;
	} else {
		length.classList.remove("valid");
		length.classList.add("invalid");
		score.lengthValue = 0;
	}
	
	const symbols =  /[!@#$&*%]/;
	if(myInput.value.match(symbols)){
		symbol.classList.remove("invalid");
		symbol.classList.add("valid");
		score.symbol = 1;
	} else {
		symbol.classList.remove("valid");
		symbol.classList.add("invalid");
		score.symbol = 0;
	}
	
	console.log(getScore())
	
	// этв проверка выводит слодность пароля на страницу на основании score
	if(getScore() < 3){
		security.innerHTML = "Слабый пароль";
	} else if (getScore() < 5) {
		security.innerHTML = "Средний пароль";
		security.classList.remove("invalid");
		security.classList.add("normal");
	} else if (getScore() >= 5){
		security.innerHTML = "Безопасный пароль";
		security.classList.remove("invalid");
		security.classList.remove("normal");
		security.classList.add("valid");
	}
}