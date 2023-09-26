//выбрала Яндекс api для выполненеия этой задачи
//в кабинете разработчика Яндекса получила ключ к api и подключила скрипт в html файле
const addressInput = document.getElementById('addressInput');
const suggestionsList = document.getElementById('suggestions');

//пишем функцию на геокидинг по документации Яндекса https://yandex.ru/dev/jsapi-v2-1/doc/ru/v2-1/ref/reference/geocode
function renderSugList(sugArr) {
	suggestionsList.innerHTML = ''; //очистка от старых подсказок
	sugArr.forEach(sug => {
		const liSug = document.createElement('li');//для каждого предполагаемого адреса создаем элемент li
		liSug.textContent = sug;
		//добавили листенер,где при клике на нашу подсказку устанавливаем новое значение инпута
		liSug.addEventListener('click', () => {
			addressInput.value = sug;
			suggestionsList.innerHTML = ''; //удаляем все подсказки,тк пользователь уже сделал свой выбор
		});
		suggestionsList.appendChild(liSug);//вставляем подсказку в списо подсказок
	});
}
function geocode(address) {
	return ymaps.geocode(address)
		.then((response) => {//в девтулз можно посмотреть как уходят запросы к api яндекса и приходят ответы
			const suggestions = [];//здесь будем собирать коллекцию подсказок
			response.geoObjects.each(function (obj) { //проходим цклом по объектам из ответа
				suggestions.push(obj.getAddressLine()); // пользуясь инструкцией выбираем нужные поля геоОбъекта https://yandex.ru/dev/jsapi-v2-1/doc/ru/v2-1/ref/reference/map.GeoObjects#methods-summary
			});
			renderSugList(suggestions);//рендерим список подсказок
		})
}

//эта функция по орграничению кол-ва запросов на сервер за отрезок времени
function setTimeLimit(func, wait) {
	let timeout;//здесь храним код таймера
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timeout);//очищаем старый таймаут
		timeout = setTimeout(() => {
			func.apply(context, args);
		}, wait);// когда таймер установлен - функция будет вызвана только после истечения таймера
	};
}

//вызываем наш геокод внутри дебаунса
const geoDelay = setTimeLimit((sug) => {
	if (sug.trim() === '') {
		suggestionsList.innerHTML = '';
		return;
	}
	geocode(sug);
}, 1000); //не чаще одной секунды проверяем подсказки

// ставим слушатель на инпут, где при изменении будет вызвана вся наша констркуция с задержками и выдачей подсказок
addressInput.addEventListener('input', (event) => {
	const address = event.target.value;
	geoDelay(address);
});