const moment = require('moment');// импортируем библиотеку Moment.js

// задаем функции, которые помогут нам получать разнообразные даты
function getCurrentDate(format = 'YYYY-MM-DD') { //получаем дату в заданном формате
	return moment().format(format);
}

function addDays(date, days) {
	return moment(date).add(days, 'days').format('YYYY-MM-DD'); //сколько дней до даты
}

function daysDiff(startDate, endDate) { //вернет сколько дней между датами
	const start = moment(startDate);
	const end = moment(endDate);
	return end.diff(start, 'days');
}
//задаем экспорт (можно также на каждую функцию экспорт написать)
module.exports = {
	getCurrentDate,
	addDays,
	daysDiff,
};
