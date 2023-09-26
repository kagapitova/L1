async function loadImage(url) {
	const body = document.querySelector('body');
	//создаем промис
	return new Promise(async (resolve, reject) => {
		const image = document.createElement('img');
		//дожидаемся события "полная загрузка"
		image.onload = () => {
			resolve({
				url: url,
			});
		};
		//обрабатываем ошибку
		image.onerror = (error) => {
			reject(error);
		};
		
		image.src = url;
		body.appendChild(image); //размещаем картинку котика в body
	});
}

const url = 'https://kartinkof.club/uploads/posts/2022-03/1648227845_5-kartinkof-club-p-mem-kotik-milii-5.jpg';

//асинхронно запускаем функцию,проверяем консоль и любуемся мемным котиком
(async () => {
	try {
		const img = await loadImage(url);
		console.log('Изображение загружено:', img);
	} catch (error) {
		console.error('Ошибка загрузки изображения:', error); //если ошибка - выводим ошибку
	}
})();
