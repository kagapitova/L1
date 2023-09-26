//по заданию необходимо создать функцию аналог метода JSON.parse

function parseJSON(str) { // создаем аналог парса
	let index = 0;
	function skipSpace() { // пропускаем пробелы
		while (index < str.length && /\s/.test(str[index])) {
			index++; // шаг по одному символу
		}
	}
	
	function parseString() {
		let result = '';
		index++; // Пропускаем открывающую кавычку
		
		while (index < str.length && str[index] !== '"') {
			result += str[index]; // забираем необходимую строку
			index++;
		}
		
		index++;
		return result;// возвращаем ее
	}
	
	function parseNumber() {
		let result = '';
		while (index < str.length && /[\d.eE+-]/.test(str[index])) { //  проверяем наоичие number
			result += str[index];
			index++;
		}
		return parseFloat(result); // конвертим стринг в number
	}
	
	function parseValue() {
		skipSpace(); // пропускаем пробелы
		const startChar = str[index];
		
		switch (startChar) { // применяем свич кейс  на
			case '{':
				return parseObject(); // объект
			case '[':
				return parseArray(); // массив
			case '"':
				return parseString(); // строку
			case 't': // предполагаем true
				index += 4;
				return true;
			case 'f':  // предполагаем false
				index += 5;
				return false;
			case 'n':    // предполагаем  null
				index += 4;
				return null;
			default:
				if (/[\d-]/.test(startChar)) { // если цифра - парсим как number
					return parseNumber();
				}
		}
	}
	
	function parseObject() {
		const obj = {};
		index++;
		
		while (index < str.length && str[index] !== '}') {
			const key = parseString(); // ключ всегда стринг
			index++;
			const value = parseValue(); // здесь подбираем походящий парс
			obj[key] = value;
			if (str[index] === ',') { // если запятая - пропустим
				index++;
			}
		}
		index++;
		return obj; // вернем полученный объект
	}
	
	function parseArray() {
		const arr = [];
		index++;
		// повторяем аналогичный алгоритм с массивом
		while (index < str.length && str[index] !== ']') {
			const value = parseValue();
			arr.push(value); // добавляем выделенные значения в наш результативный массив
			if (str[index] === ',') {
				index++;
			}
		}
		index++;
		return arr;
	}
	
	return parseValue();
}

// рассмотрим пример со вложенными объектами и массивами
const jsonString = '{"name":"Vasya","age":9,"hasCat":true,"cats":[1,2,3],"home":{"address":"test"},"school":{"type":"primary","class":[4,5,6],"test":{"obj":1}}}';
const parsedObject = parseJSON(jsonString);
console.log(parsedObject);
