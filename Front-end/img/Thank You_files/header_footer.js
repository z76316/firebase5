firebase.initializeApp({
  apiKey: ['AIzaSyB8bXw1Xco2dzjTwI1RvjJsMalLXtr8gYo'],
  projectId: ['appworks-school-stylish'], // 
  storageBucket: ['appworks-school-stylish.appspot.com']
});

let storage = firebase.storage();

// ------------------------- advance preparation -------------------------

const search_button = selectElement('.search-icon');
const search_button2 = selectElement('.search-icon2');
const search_button3 = selectElement('.search-icon3');
const cart = selectElement('.cart');
const float_cart = selectElement('.float-cart');
const header_right = selectElement('.header-right');
const header_right_icon = selectElement('.header-right-icon');
const input = selectElement('.input');


// ------------------------- cart icon -------------------------
cart.addEventListener('click', () => {
	window.location = 'cart.html';
});

float_cart.addEventListener('click', () => {
	window.location = 'cart.html';
});

// ------------------------- link menu & search bar -------------------------
search_button.addEventListener('click', () => {
	if(input.value){
		input_content = input.value;
		clearInput();
		window.location = 'index.html?tag=' + input_content;
	}
});

search_button2.addEventListener('click', () => {
	header_right.style.display = 'flex';
	header_right_icon.style.display = 'none';
	search_button2.style.display = 'none';
});

search_button3.addEventListener('click', () => {
	header_right.style.display = 'flex';
	header_right_icon.style.display = 'none';
	search_button3.style.display = 'none';
});


// ========================= function design house =========================

// ------------------------- clearing product area box function -------------------------
function clearInput() {
	input.value = '';
}

// ------------------------- create element tool -------------------------
function createElement(tag, class_list, content) {
	let element = document.createElement(tag);
	element.innerHTML = content;

	for (let i = 0; i < class_list.length; i++) {
		element.classList.add(class_list[i]);
	}
	
	return element;
}

// ------------------------- selecte element tool -------------------------
function selectElement(attribute) {
	return document.querySelector(attribute);
}

function selectElementAll(attribute) {
	return document.querySelectorAll(attribute);
}








