function nestWriteCounter() { // работаем со счетчиком
	let count = 0;
	
	function docWriteRecursive() {
		try {
			document.write("N"); // для корректного подсчета нудно дождвться выполнения каждой функции
			count++;
			docWriteRecursive();
		} catch (error) {
			// игнорируем ошибки, пока document.write() не сможет вызваться
		}
	}
	
	docWriteRecursive();
	return count;
}

const nestedCount = nestWriteCounter();
console.log("Количество вложенных вызовов document.write():", nestedCount);

//мои результаты:
// для goole chrome вложенность - 7870 вызовов (+- 10 вызовов погрешность)
// для Safari вложенность - 53132 вызовов (+- 60 вызовов погрешность)

// также пробовала менять длинну строки, котрая передается  в document.write() - ее длинна в диапозоне 1-10 символов
// не влияет на кол-во вызовов
