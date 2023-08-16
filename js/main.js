let addOrderBtn;
let deleteAllBtn;
let saveBtn;
let cancelBtn;
let deleteOrderBtn;
let editOrderBtn;
let saveEditBtn;
let cancelEditBtn;

let panel;
let editPanel;

let inputAmount;
let inputCustomer;
let inputOrder;
let inputDeadline;

let tBodyOrder;

let editAmount;
let editCustomer;
let editOrder;
let editDeadline;

// let code;
// let customer;
// let order;
// let deadline;

let ID = 0;
let orderEdit;
let editedOrder;
// let productCode = 0;
let selectedProduct;
let editSelectedProduct;

const productCode = {
	'Stolik kawowy czarny':'2100',
	'Stolik kawowy biały':'2101',
	'Fotel':'3010',
	'Stół - jadalnia':'3600',
	'Stół - kuchnia':'3601',
	'Krzesło':'4000',
}

const main = () => {
	prepareElements();
	prepareEvents();
};

const prepareElements = () => {
	addOrderBtn = document.querySelector('.add-new');
	deleteAllBtn = document.querySelector('.delete-all');
	saveBtn = document.querySelector('.save');
	cancelBtn = document.querySelector('.cancel');
	deleteOrderBtn = document.querySelector('.delete');
	editOrderBtn = document.querySelector('.edit');
	saveEditBtn = document.querySelector('.save-btn'); //
	cancelEditBtn = document.querySelector('.cancel-btn'); //

	panel = document.querySelector('.order-panel'); //
	editPanel = document.querySelector('.edit-panel'); //

	inputAmount = document.querySelector('#in-amount');
	inputCustomer = document.querySelector('#in-customer');
	inputOrder = document.querySelector('#choose-product');
	inputDeadline = document.querySelector('#in-deadline');

	tBodyOrder = document.querySelector('tBody');
	orderBox = tBodyOrder.querySelector('tr');

	editAmount = document.querySelector('#new-amount'); //
	editCustomer = document.querySelector('#new-customer'); //
	editOrder = document.querySelector('#new-product'); //
	editDeadline = document.querySelector('#new-deadline'); //
};

const prepareEvents = () => {
	addOrderBtn.addEventListener('click', openPanel);
	cancelBtn.addEventListener('click', closePanel);
	saveBtn.addEventListener('click', checkInputs);
	deleteOrderBtn?.addEventListener('click', deleteOrder);
	deleteAllBtn.addEventListener('click', deleteAllOrders);
	cancelEditBtn.addEventListener('click', closeEditPanel);
	saveEditBtn.addEventListener('click', getEditData);
	tBodyOrder.addEventListener('click', checkClick);
};

const openPanel = () => {
	panel.style.display = 'flex';
};

const closePanel = () => {
	panel.style.display = 'none';
	clearInputs();
};

const checkInputs = () => {
	if (
		inputAmount.value !== '' &&
		inputCustomer.value !== '' &&
		inputOrder.value !== 'none'
	) {
		createNewOrder();
	} else {
		alert('Wypełnij Wszystkie pola!!!');
	}
};

const clearInputs = () => {
	const inputs = [inputCustomer, inputAmount];
	inputs.forEach((el) => {
		el.value = '';
	});
	deadlineData = '';
	inputOrder.selectedIndex = 0;
};

const createNewOrder = () => {
	const newOrder = document.createElement('tr');
	newOrder.setAttribute('id', ID);
	newOrder.classList.add('order-element');
	newOrder.innerHTML = `<td class="code">${productCode[selectedProduct]}</td>
    <td class="customer">${inputCustomer.value}</td>
    <td class="order">${selectedProduct}</td>
	<td class="amount">${inputAmount.value}</td>
    <td class="deadline">${deadlineData}</td>
    <td class="options"><button class="edit"><i
    class="fa-regular fa-pen-to-square"></i></button><button class="delete"><i class="fa-solid fa-xmark"></i></button></td>`;
	tBodyOrder.appendChild(newOrder);
	closePanel();
	ID++;
	clearInputs();
};

const closeEditPanel = () => {
	editPanel.style.display = 'none';
};

const checkClick = (e) => {
	console.log(e.target);
	if (e.target.classList.value !== '') {
		if (e.target.closest('button').classList.contains('edit')) {
			console.log(e.target);
			editPanel.style.display = 'flex';
			editOrderData(e);
		} else if (e.target.closest('button').classList.contains('delete')) {
			deleteOrder(e);
		}
	}
};

const editOrderData = (e) => {
	const tot = e.target.closest('tr').id;
	editedOrder = document.getElementById(tot);
	productCode[selectedProduct] = editedOrder.children[0].textContent;
	editCustomer.value = editedOrder.children[1].textContent;
	selectedProduct = editedOrder.children[2].textContent;
	editAmount.value = editedOrder.children[3].textContent;
};

const getEditData = () => {
	if (
		editCustomer.value !== '' &&
		editOrder.value !== 'none' &&
		editAmount.value !== ''
	) {
		editedOrder.children[0].textContent = productCode[editSelectedProduct];
		editedOrder.children[1].textContent = editCustomer.value;
		editedOrder.children[2].textContent = editSelectedProduct;
		editedOrder.children[3].textContent = editAmount.value;
		editedOrder.children[4].textContent = editDeadline.value;
		console.log(editDeadline.value)
		editPanel.style.display = 'none';
	}
};

const deleteOrder = (e) => {
	const deleteOrder = e.target.closest('tr');
	deleteOrder.remove();
};

const deleteAllOrders = () => {
	const allElements = document.getElementsByTagName('tr');
	tBodyOrder.remove(allElements);
};

const chooseProduct = () => {
	selectedProduct = inputOrder.options[inputOrder.selectedIndex].text;
};

const editProduct = () => {
	editSelectedProduct = editOrder.options[editOrder.selectedIndex].text;
};

document.addEventListener('DOMContentLoaded', main);
