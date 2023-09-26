//задаем родительский класс
class Shape {
	constructor() {
		this.type = 'Shape';
	}
	
	// собственного расчета у родительского нет
	calculateArea() {
		return 'формула у наследника';
	}
	
	// собственного расчета у родительского нет
	calculatePerimeter() {
		return 'формула у наследника';
	}
}

class Rectangle extends Shape {
	constructor(width, height) {
		super();//вызываем конструктор родительского класса и передаем параметры данной фигуры
		this.type = 'Rectangle';
		this.width = width;
		this.height = height;
	}
	
	calculateArea() {
		return this.width * this.height;
	}
	
	calculatePerimeter() {
		return 2 * (this.width + this.height);
	}
}

class Circle extends Shape {
	constructor(radius) {
		super();//вызываем конструктор родительского класса и передаем параметры данной фигуры
		this.type = 'Circle';
		this.radius = radius;
	}
	
	calculateArea() {
		return Math.PI * this.radius ** 2;
	}
	
	calculatePerimeter() {
		return 2 * Math.PI * this.radius;
	}
}

class Triangle extends Shape {
	constructor(side1, side2, side3) {
		super();//вызываем конструктор родительского класса и передаем параметры данной фигуры
		this.type = 'Triangle';
		this.side1 = side1;
		this.side2 = side2;
		this.side3 = side3;
	}
	
	calculateArea() {
		const s = (this.side1 + this.side2 + this.side3) / 2;
		return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
	}
	
	calculatePerimeter() {
		return this.side1 + this.side2 + this.side3;
	}
}

const rectangle = new Rectangle(5, 4);
console.log('Прямоугольник площадь:', rectangle.calculateArea()); // 20
console.log('Прямоугольник периметр:', rectangle.calculatePerimeter()); // 18

const circle = new Circle(3);
console.log('Круг площадь:', circle.calculateArea()); // ~28.27
console.log('Круг  периметр:', circle.calculatePerimeter()); // ~18.85

const triangle = new Triangle(3, 4, 5);
console.log('Треугольник площадь:', triangle.calculateArea()); // 6
console.log('Треугольник  периметр:', triangle.calculatePerimeter()); // 12
