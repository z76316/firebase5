// ------------------------- advance preparation -------------------------
const	cart_num = selectElement('.cart-num');
const	cart_num2 = selectElement('.cart-num2');

// ------------------------- onload -------------------------
window.onload = function () {
	// check if there is any item in localStorage
	if(localStorage.getItem('list')) {
		cart_num.innerHTML = JSON.parse(localStorage.getItem('list')).length;
		cart_num2.innerHTML = JSON.parse(localStorage.getItem('list')).length;
	}

	let initialURL = new URL(window.location.href);
	let order_number = initialURL.searchParams.get("order_number");
	if(order_number) {
		let thankyou_area = selectElement('.thankyou-area');
		let order_number_h2 = createElement('H2', [], order_number);
		thankyou_area.append(order_number_h2);

	} else {
		
	}

}