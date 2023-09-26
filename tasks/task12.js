const book = {
	title: 'Гарри Поттер',
	author: 'Джоан Роулинг',
	publicationYear: 1997,
	
//геттер на title
	getTitle: function () {
		return this.title;
	},

//геттер на author
	getAuthor: function () {
		return this.author;
	},

//геттер на year
	getPublicationYear: function () {
		return this.publicationYear;
	},

//сеттер на  title
	setTitle: function (newTitle) {
		this.title = newTitle;
	},

//сеттер на author
	setAuthor: function (newAuthor) {
		this.author = newAuthor;
	},

//сеттер на year
	setPublicationYear: function (newYear) {
		this.publicationYear = newYear;
	},

//получить все данные
	displayInfo: function () {
		return `${this.author} написал/a ${this.title}, опубликовано в ${this.publicationYear}`;
	},
};

// проверяем работу
console.log(book.displayInfo());//Джоан Роулинг написал/а Гарри Поттер, опубликовано в 1997
//задаем новые значения
book.setTitle('Му-му');
book.setAuthor('Иван Тургенев');
book.setPublicationYear(1854);
//получает новые значения по отдельности
console.log(book.getTitle());
console.log(book.getAuthor());
console.log(book.getPublicationYear());
// проверяем работу всех вместе
console.log(book.displayInfo());//Иван Тургенев написал/a Му-му, опубликовано в 1854
