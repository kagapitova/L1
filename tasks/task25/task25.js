// создам 4 блока и присвоим им стили разными способами
const body = document.querySelector('body');
body.style.cssText = 'display: flex; margin: auto; flex-direction: row; justify-content: center; margin-top: 50px;';
function createBlocks(){
	const block1 = document.createElement('div'); // создаем див и передаем все стили через свойства объекта
	block1.style.cssText = 'width: 100px; display: block; height: 100px; background: #9797AF;';
	console.log(block1)
	
	const block2 = document.createElement('div');// создаем див и передаем все стили через установку атрибуа
	block2.setAttribute('style', 'width: 100px; display: block; height: 100px; background: #cb11ab;');
	
	const block3 = document.createElement('div'); // создаем див и передаем каждый стиль отдельно
	block3.style.background = '#6725A8';
	block3.style.width = '100px';
	block3.style.height = '100px';
	block3.style.marginTop = '100px';// див будет сдвинут вниз
	
	const block4 = document.createElement('div'); // создаем див и присвоим диву класс со стилями
	// (предпочтительный вариант, тк он не засоряет код)
	block4.classList.add('perfect');
	
	// помещаем стилизованные элементы в body
	body.appendChild(block1);
	body.appendChild(block2);
	body.appendChild(block3);
	body.appendChild(block4);
}

createBlocks();