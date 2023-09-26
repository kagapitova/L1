//по заданию необходимо создать функцию аналог метода JSON.stringify

//проверяем какой тип даных к нам пришел и заменяем/добавляем тот синтаксис, которвый был бы добавлен/изменен в JSON.stringify
function jsonToString(obj) {
	if (typeof obj === "undefined") {
		return "undefined";
	} else if (obj === null) {
		return "null";
	} else if (typeof obj === "number" || typeof obj === "boolean") {
		return obj.toString(); //при входящих number или boolean - ничего не меняем,сразу в строку обращаем
	} else if (typeof obj === "string") {
		return '"' + obj + '"'; //ставим верные ковычки
	} else if (Array.isArray(obj)) {
		let arr = [];
		obj.forEach((item) => arr.push(jsonToString(item))); //рекурсией обрабатваем вложенность
		return "[" + arr.join(",") + "]";
	} else {
		let props = [];
		for (let prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				props.push('"' + prop + '":' + jsonToString(obj[prop]));
			}
		}
		return "{" + props.join(",") + "}";
	}
}

const data = {
	name: "Vasya",
	cats: [1, 2, 3],
	school: {
		type: "primary",
		class: [4, 5, 6],
	},
};

const jsonString = jsonToString(data);
console.log(`Наша функция вернула ${typeof jsonString}, c содержанием: ${jsonString}`);
