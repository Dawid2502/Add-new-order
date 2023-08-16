const calendar = document.querySelector('.calendar-events');
const mainMonth = document.querySelector('.month');
const monthDaysBox = document.querySelector('.month-days');
const prevMonthBtn = document.querySelector('.fa-chevron-left');
const nextMonthBtn = document.querySelector('.fa-chevron-right');
const showCalendarBtn = document.querySelector('.calendar-btn');

let firstDayofMonth; // Pierwszy dzień miesiąca (chodzi o dzień tygodnia)
let amountDaysPreviousMonth; // Ilość dni w poprzednim miesiącu
let amountDaysInMonth; //Ilość dni w miesiącu
let lastDayofMonth; // Ostatni dzień miesiąca (chodzi o dzień tygodnia)
let currentDayIndex;
let deadlineData;

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentDay = date.getDate();

const months = [
	'Styczeń',
	'Luty',
	'Marzec',
	'Kwiecień',
	'Maj',
	'Czerwiec',
	'Lipiec',
	'Sierpień',
	'Wrzesień',
	'Październik',
	'Listopad',
	'Grudzień',
];

const getCalendarData = (currYear, currMonth) => {
	firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
	amountDaysPreviousMonth = new Date(currYear, currMonth, 0).getDate();
	amountDaysInMonth = new Date(currYear, currMonth + 1, 0).getDate();
	lastDayofMonth = new Date(
		currentYear,
		currentMonth,
		amountDaysInMonth
	).getDay();
};

const setPrevMonth = () => {
	monthDaysBox.innerHTML = ` `;
	currentMonth--;
	if (currentMonth < 0) {
		currentMonth = 11;
		currentYear--;
	}
	createCalendar();
};

const setNextMonth = () => {
	monthDaysBox.innerHTML = ` `;
	currentMonth++;
	if (currentMonth > 11) {
		currentMonth = 0;
		currentYear++;
	}
	createCalendar();
};

const handleMenu = () => {
	navigation.classList.toggle('active');
	burgerBtn.classList.toggle('active');
	barsIcon.classList.toggle('hide');
	xIcon.classList.toggle('hide');
};

const createCalendar = () => {
	getCalendarData(currentYear, currentMonth);
	prevMonthBtn.addEventListener('click', setPrevMonth);
	nextMonthBtn.addEventListener('click', setNextMonth);
	mainMonth.textContent = months[currentMonth] + ' ' + currentYear;

	if (firstDayofMonth === 0) {
		firstDayofMonth = 7;
	}

	for (let j = firstDayofMonth - 1; j > 0; j--) {
		const prevMonthDay = document.createElement('li');
		prevMonthDay.classList.add('inactive-day');
		prevMonthDay.innerHTML = `${amountDaysPreviousMonth - j + 1}`;
		monthDaysBox.appendChild(prevMonthDay);
	}

	for (let i = 1; i <= amountDaysInMonth; i++) {
		const monthDay = document.createElement('li');
		monthDay.classList.add('day');
		monthDay.innerHTML = `${i}`;

		monthDay.onclick = function () {
			monthDaysBox.innerHTML = ` `;
			const clickedDate = new Date(currentYear, currentMonth + 1, i);
			// deadlineData = `${monthDay.textContent}-${
			// 	currentMonth + 1
			// }-${currentYear}`;
			deadlineData = `${currentYear}-${
				currentMonth + 1
			}-${monthDay.textContent}`;
			setCurrentDate(clickedDate);
			createCalendar();
			console.log(`${currentYear} ${currentMonth} ${i}`)
			console.log(`${date.getDate()}, ${date.getMonth()}, ${date.getFullYear()}`)
		};

		if (
			i === date.getDate() &&
			(currentMonth + 1) === date.getMonth() &&
			currentYear === date.getFullYear()
		) {
			monthDay.classList.add('select-day');
		}

		monthDaysBox.appendChild(monthDay);
	}

	if (lastDayofMonth === 0) {
		lastDayofMonth = 7;
	}

	for (let j = 1; j <= 7 - lastDayofMonth; j++) {
		const nextMonthDay = document.createElement('li');
		nextMonthDay.classList.add('inactive-day');
		nextMonthDay.innerHTML = `${j}`;
		monthDaysBox.appendChild(nextMonthDay);
	}

};

function setCurrentDate(dat) {
	date = dat;
}

createCalendar();

const showCalendar = () => {
	calendar.classList.toggle('show-calendar');
};

showCalendarBtn?.addEventListener('click', showCalendar);
