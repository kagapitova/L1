// выбираем основные html элементы и устанавливаем  некоторые состояния
const table = document.getElementById("table");
const pagination = document.querySelector(".pagination__container");
const itemsPerPage = 50;
let sortParametr = null;
let ascending = true;
let currentPage = 1;
let data = [];

// здесь получаем наши данные для таблицы - отправляем запрос, записываем ответ в массив data
async function getData() {
	try {
		const response = await fetch("http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true");
		data = await response.json();
		return data;
	} catch (error) {
		console.error("Ошибка получения данных:", error);
		return [];
	}
}

// создаем html шаблон для строк нашей таблицы и заполняем его
function renderTable(page) {
	const first = (page - 1) * itemsPerPage; // определяем с какую по какую строку мы будем рендерить
	const last = first + itemsPerPage;
	const curPageRow = data.slice(first, last); // вырезаем нужное и циклом проходим через шаблон

	table.innerHTML = ""; // очищаем контейнер для следующих вызовов функции
	curPageRow.forEach(item => {
		const row = document.createElement("tr");
		// каждый td - ячейка, которая будет хранить соответсвующее ей свойство из объекта
		row.innerHTML = `
            <td>${item.fname}</td>
            <td>${item.lname}</td>
            <td>${item.tel}</td>
            <td>${item.address}</td>
            <td>${item.city}</td>
            <td>${item.state}</td>
            <td>${item.zip}</td>
        `;
		table.appendChild(row); // накапливаем строки в html элементе таблицы
	});
}

// создаем пагинацию
function renderPagination() {
	const allBtns = Math.ceil(data.length / itemsPerPage); // определяем кол-во кнопок
	pagination.innerHTML = ""; // очищаем контейнер для следующих вызовов функции

	for (let i = 1; i <= allBtns; i++) { // в проходе по циклу создаем необходимое кол-во кнопок для пагинации
		const btn = document.createElement("button"); // создаем элемент  btn
		btn.classList.add('pagination__item'); // добаляем ей класс
		btn.textContent = i; // нумеруем
		btn.addEventListener("click", () => { // добавляем слушатель для переклбчения старницы и окраса кнопки при взаимодействии
			currentPage = i; // передаем значение текущей страницы и вызываем перерендер таблицы (см. ниже)
			document.querySelectorAll('.pagination__item').forEach((el)=>{ // здесь чистим ранее окрашенные кнопки
				el.classList.remove('active')
			})
			btn.classList.add('active'); // красим нужную кнопку
			renderTable(currentPage); // обновляем таблицу
		});
		
		pagination.appendChild(btn); // накапливаем кнопки в html элементе пагинации
	}
}

// задаем логику сортировки и навешивем на каждый столбец oncklick с данной функцией
function sortingByParametr(index) {
	if (sortParametr === index) {
		ascending = !ascending; // тоглим сортировку по кликнутому параметру
	} else {
		ascending = true;
	}
	sortParametr = index; // сохранили параметр сортировки с состояние
	
	data.sort((a, b) => { // далее классическим способом сортируем
		const key = Object.keys(a)[index];
		const valueA = a[key];
		const valueB = b[key];

		if (valueA < valueB) {
			return ascending ? -1 : 1;
		}
		if (valueA > valueB) {
			return ascending ? 1 : -1;
		}
		return 0;
	});

	renderTable(currentPage); // перерисовываем таблицу с учетом сортировки
}

async function renderApp() { // собираем все для запуска нашего приложения
	data = await getData();
	renderTable(currentPage);
	renderPagination();
}

renderApp();  // отрисовываем приложение

// устанавливаем слушатель на кнопку сброса сортировки
document.querySelector(".reload-data-button").addEventListener("click", () => {
	renderApp();
});