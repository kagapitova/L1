const dateUtils = require('./task16.module');// импортируем модуль

const currentDate = dateUtils.getCurrentDate();
console.log('Current Date:', currentDate);

const futureDate = dateUtils.addDays(currentDate, 7);
console.log('Date 7 days from now:', futureDate);

const startDate = '2023-09-15';
const endDate = '2023-09-22';
const daysDifference = dateUtils.daysDiff(startDate, endDate);
console.log('Days Difference:', daysDifference);
