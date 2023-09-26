// следуя инструкции https://dev.vk.com/ru/api/access-token/implicit-flow-user#Redirect_uri получила доступ к API

const owner_id = "-121258913"; //группа дешевых путешествий
const access_token = "e361c211e361c211e361c21160e0746df1ee361e361c211866bc782caec91e6722a577a";
let count = 5; // кол-во постов в одной загрузке

const widgetList = document.querySelector('.widget__list');
const spinner = document.getElementById('spinner');
const apiError = document.querySelector('.api_error');

let canMakeApiCall = true; // состояние для проверочной функции
let maxLocalStorage = 0; // сюда запишем размер хранилища

// создадим ссылку запроса
const buildApiUrl = (offset, count) => `https://api.vk.com/method/wall.get?access_token=${access_token}&owner_id=${owner_id}&count=${count}&offset=${offset}&v=5.131`;

function countMaxLocalStorage() { // считаем хранилище (функция из 18го задания)
	let key = 'a';
	let data = 'x';
	try {
		while (true) {
			localStorage.setItem(key, data);
			data += data
		}
	} catch (error) {
		maxLocalStorage = JSON.stringify(localStorage).length;
		localStorage.removeItem(key);
	}
	
	const takenMemory = (JSON.stringify(localStorage).length / 1024 / 1024).toFixed(2);
	const allMemory = (maxLocalStorage / 1024 / 1024).toFixed(2)
	console.log(`Использовано ${takenMemory} MB / Общий допустимый объем ${allMemory} MB`); // выводим состояние хранилища
}

function saveToLocalStorage(responseItems) { // заполняем хранилище постами из сообщества вк
	const localStorageItems = JSON.parse(localStorage.getItem('items'));
	let resultItems;
	
	if (localStorageItems) { // если уже есть что-то в хранилище
		responseItems.forEach(responseItem => localStorageItems.push(responseItem)); // проходим циклом по новым постам и добавляем в переменную resultItems
		resultItems = localStorageItems;
	} else {
		resultItems = responseItems; // если хранилище пустое - добавляем наши посты в переменную resultItems
	}
	
	try {
		localStorage.setItem('items', JSON.stringify(resultItems));  // заполняем зранилице из нашей подготовленной переменной resultItems
	} catch (error) {
		const storageItems = JSON.parse(localStorage.getItem('items')); // если зранилище заполнено - возьмем все посты из зранилища
		storageItems.splice(0, count); // уберем старые посты
		localStorage.setItem('items', JSON.stringify(storageItems)); // пробуем повторно заплнить хранилище
	}
	
	countMaxLocalStorage();  // пересчитываем заполненность хранилища
}

function makeVKApiRequest() { // делаем запрос к api
	const script = document.createElement('script');
	
	const callbackName = 'handleVKApiResponse' + Date.now();	// определяем колбэк функцию
	window[callbackName] = handleVKApiResponse;	// прикрепляем функцию обратного вызова к объекту глобального окна
	
	script.src = buildApiUrl(getOffset(), count) + '&callback=' + callbackName;	// создаем элемент скрипта и указываем его источником URL-адрес API ВКонтакте
	document.head.appendChild(script); // добавляем элемент сценария в документ, чтобы инициировать запрос JSONP
	
	script.onload = () => {	// очищаем функцию после завершения запроса
		delete window[callbackName];
		document.head.removeChild(script);
	};
}

function handleVKApiResponse(response) { // обрабатываем ответ от api
	if (response.error) {
		apiError.innerHTML = response.error.error_msg
		return;
	}
	
	apiError.innerHTML = '';
	if (response.response.items.length > 0) {
		saveToLocalStorage(response.response.items); // записываем в хранилище новые посты
		renderPosts(response.response.items); // выводим их
		endLoading();
	} else {
		endLoading();
		canMakeApiCall = false;
	}
}

function renderPosts(items) { // выводим посты на страницу динамически
	let postArrHtml = [];// подготовим HTML элементы для дальнейшего рендеринга постов
	let imgHtml = '';
	items.forEach((item) => { //  для каждого поста по шаблону задаем html элементы
		
		if (item.attachments.length > 0) {
			item.attachments.forEach(attachment => {
				if (attachment.type === 'photo') {
					imgHtml = `<img class="post__img" src=${attachment.photo.sizes[2].url} />`;
				}
			})
		}
		
		let res =`
				<li class="post__item">
          <div class="post__text">${item.text}</div>
          <div class="img-date__container">
	          <div class="post__date">${new Date(item.date * 1000).toLocaleDateString()}</div>
	          ${imgHtml}
					</div>
        </li>
      `
		postArrHtml.push(res); // сохраняем посты в массив
	})
	
	widgetList.innerHTML += postArrHtml.join(''); // вставляем наши посты в виджет
}

function isScrolledToBottom() {// проверяем, прокрутил ли пользователь страницу до конца.
	const windowHeight = window.innerHeight;
	const documentHeight = document.documentElement.scrollHeight;
	const scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
	
	return documentHeight - scrollPosition <= windowHeight + 5;	// результат где наш пользователь, на сколько близко к низу страницы
}

function startLoading() { // устанавливаем новое состояние на запрос и делаем спинер видимым
	canMakeApiCall = false;
	spinner.classList.remove('hidden');
}

function endLoading() { // устанавливаем новое состояние на запрос и прячем спинер
	spinner.classList.add('hidden');
	canMakeApiCall = true;
}

function addOffset() { // добавляем значение offset
	localStorage.setItem('offset', getOffset() + count);
}

function getOffset() { // полечаем значение offset
	const localStorageOffset = localStorage.getItem('offset');
	return localStorageOffset ? parseInt(localStorageOffset) : 0;
}

window.addEventListener('scroll', () => { // добавляем на окно слушатель скрола
	if (isScrolledToBottom() && canMakeApiCall) {
		startLoading(); // вызываем комплекс наших функций для погрузки постов
		addOffset();
		makeVKApiRequest();
	}
});

function initPage() { // запускаем виджет
	const localStorageItems = JSON.parse(localStorage.getItem('items'));
	localStorageItems //если хранилище что-то в себе имеет
		? renderPosts(localStorageItems) // рендерим
		: makeVKApiRequest(); // или отправляем запрос на получение постов
}

initPage();