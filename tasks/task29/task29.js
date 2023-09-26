const myForm = document.getElementById('myForm');

// добавим функцию обработчик события
function handleSubmit(event) {
	// получим данные из формы
	const formData = new FormData(myForm);
	const formObject = {};
	formData.forEach((value, key) => {
		formObject[key] = value;
	});
	
	// отобразим данные из формы
	alert(`Отправляем:\nИмя: ${formObject.name}\nФамилию: ${formObject.email}`);
}

// слушатель кнопки сабмит
myForm.addEventListener('submit', handleSubmit);