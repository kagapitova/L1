let data = [
	{ name: 'Lena', age: 25, },
	{ name: 'Misha', age: 85, },
	{ name: 'Petya', age: 85, },
	{ name: 'Ivan', age: 85, },
	{ name: 'Galya', age: 44, },
	{ name: 'Ryben', age: 19, },
	{ name: 'Leonid', age: 3, },
];

//используем метод массива sort и задаем правила сортировки через следущую функцию
function customSort (arr) {
	
	const newArr = [...arr]; //предотвращаем мутацию оригинального массива
	
	//изначально сортируем по возрасту
	const sortedByAge = newArr.sort((a, b) => {
		return (b.age < a.age) - (a.age < b.age);
	})
	//далее сортируем по алфавиту, такое решение работает, даже если много одинаковых значений
	return sortedByAge.sort((a, b) => {
		if (a.age === b.age) {
			return (b.name < a.name) - (a.name < b.name)
		}
	})
}

console.log(customSort(data))