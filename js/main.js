window.onload = function() {
	// Липкое меню
	function appearNav() {
		let scrolled = window.pageYOffset;
		let logo = document.querySelector('.logo')
		let nav = document.querySelector('.nav');
		console.log(window.pageYOffset);
		if (scrolled > 0) {
			nav.classList.add('nav-bg');
		}
		else {
			nav.classList.remove('nav-bg');
		}
	}
	// Плавная прокрутка
	function scrollTo() {
		const anchors = document.querySelectorAll('a[href*="#"]').forEach(function(anchor){
			anchor.addEventListener('click', function(e){
				e.preventDefault();
				const blockId = this.getAttribute('href');
				document.querySelector(blockId).scrollIntoView({
					behavior: "smooth"
				});
			});
		});
	}

	// Меняет цвет заднего фона у radio кнопок
	function changeBg(nameRadio, nameLabel) {
		let name = document.querySelectorAll(nameRadio);
		let label = document.querySelectorAll(nameLabel);
		name[0].checked = "checked";
		for (let i = 0; i < name.length; i++) {
			name[i].addEventListener('click', function(){

				for (let i = 0; i < name.length; i++) {
					label[i].classList.remove('count__label_active');
				}
				if (this.checked) {
					label[i].classList.add('count__label_active');
				}
			});
		}
	}

	// Показать вкладки
	function showTabs() {
		let tabs = document.querySelectorAll('.count__tab');
		let tabsContent = document.querySelectorAll('.count__content');
		tabsContent[0].style.display = "block";
		for (let i = 0; i < tabs.length; i++) {
			tabs[i].addEventListener('click', function(){
				for (let i = 0; i < tabs.length; i++) {
					tabsContent[i].style.display = "none";
					tabs[i].classList.remove('count__tab_active');
				}
				this.classList.add('count__tab_active');
				let data = this.getAttribute("data-num-tab");
				document.querySelector(`${data}`).style.display = "block";;
			});
		}
	}

	// Калькулятор 
	function countPrice() {
				let radioButtons = document.querySelectorAll('.count__radio');
				let firstNum = document.querySelector('.cost__item_first');
				let secondNum = document.querySelector('.cost__item_second');

				let min, floor, max, material;
				let minRadio, maxRadio;

				for (let i = 0; i < radioButtons.length; i++) {
					if (radioButtons[i].checked) {
						if (radioButtons[i].dataset.min) {
							min = radioButtons[i].dataset.min;
						}
						if (radioButtons[i].dataset.max) {
							max = radioButtons[i].dataset.max;
						}
						if (radioButtons[i].dataset.material) {
							material = radioButtons[i].dataset.material;
						}
						if (radioButtons[i].dataset.floor) {
							floor = radioButtons[i].dataset.floor;
						}
					}
				}
				minRadio = (15500 * min * material * floor).toFixed(0);
				maxRadio = (15500 * max * material * floor).toFixed(0);
				firstNum.innerHTML = parseInt(minRadio).toLocaleString('ru-RU');
				secondNum.innerHTML = parseInt(maxRadio).toLocaleString('ru-RU');
				// console.log(minRadio, maxRadio);
			}

	// Вызов всех функций
	function callFunctions() {
		changeBg(".count__material", ".count__label_material"); // смена фона активных radio кнопок
		changeBg(".count__size", ".count__label_size"); // смена фона активных radio кнопок
		changeBg(".count__floor", ".count__label_floor"); // смена фона активных radio кнопок
		countPrice(); // калькулятор стоимости
		scrollTo(); // плавная прокрутка
		// appearNav(); // появление меню при прокрутке вниз
		
		showTabs(); // показать содержимое вкладки
		window.addEventListener('scroll', appearNav);  // появление меню при прокрутке вниз
		document.querySelectorAll('.count__radio').forEach(radio => {
			radio.addEventListener('click', function(){ //калькулятор стоимости
				countPrice();
			});
		});
		Inputmask("+7 999 999-99-99").mask(document.querySelectorAll('.mask')); // маска для номера

	}

	callFunctions();
	

}