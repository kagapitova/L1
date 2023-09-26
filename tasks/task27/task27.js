// для этого задания я звяла из своего git готовую верстку статичной Солнечной системы.
//  при выполнении задачи 27 добавим планетам анимацию движения по орбите.

// у каждой планеты задан свой радиус орбиты  и время прохождения полного оборота.
const planets = {
	mercury: "animation: orb 7s linear infinite;", // движение будет продолжаться равномерно и бесконено
	venus: "animation: orb 18s linear infinite;",
	earth: "animation: orb 30s linear infinite;",
	mars: "animation: orb 56s linear infinite;",
	jupiter: "animation: orb 80s linear infinite;",
	saturn: "animation: orb 120s linear infinite;",
	uranus: "animation: orb 150s linear infinite;",
	neptune: "animation: orb 170s linear infinite;",
}

function setAnimation (){
	for (let key in planets) { // проходим по объекту планет
		const planetEl = document.querySelector(`.${key}`); // выбираем планету
		planetEl.style.cssText += planets[`${key}`];  // задаем ее стрку для анимации
	}
	
	let cssAnimation = document.createElement('style'); // создаем элемент стиля и передаем ему рамки анимации орбиты - orb
	let rules = document.createTextNode('@keyframes orb {\n' +
		'    from {\n' +
		'        transform: rotate(0deg);\n' +
		'    }\n' +
		'\n' +
		'    to {\n' +
		'        transform: rotate(-360deg);\n' +
		'    }\n' +
		'}');
	cssAnimation.appendChild(rules); // сохраняем правила в элемент стиля
	document.getElementsByTagName("head")[0].appendChild(cssAnimation);// устанавливаем стиль в  html объекте
}

setAnimation(); //  вызываем функцию и залипаем на планеты



