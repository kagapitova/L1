const url = `https://api.openweathermap.org/data/2.5/weather?q=Москва&lang=ru&appid=ec36077e31c3116463126dec31e21c97&units=metric`;;

//напишем асинхронную функцию,  которая будет проверять погоду в москве
const fetchUrl = async (url) => {
	try {
		const res = await fetch(url); //дожидаемся ответ
		const data = await res.json(); //парсим полученный объект
		const moskovDeg =`${data.main.temp.toFixed(0)}°C`; //задаем формат результата
		return moskovDeg;
	} catch (err) {
		console.log('Ошибка: ' + err); //обработка ошибки
	}
};

//узнаем погоду в Москве сейчас
fetchUrl(url)
	.then(moskovDeg => console.log(moskovDeg))
	.catch(err => console.log(err)); //если ошибка - выводим ошибку

