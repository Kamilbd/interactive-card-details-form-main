const forName = document.querySelector('.card__form-name');
const forDate = document.querySelector('.card__form-date');
const name = document.querySelector('#name');
const number = document.querySelector('#number');
const expirtiondateM = document.querySelector('#expirationdate');
const expirationdateTwoY = document.querySelector('#expirationdate-two');
const cvc = document.querySelector('#securitycode');
const sendBtnInfo = document.querySelector('.card__btn-form-info');
const sendBtnPopup = document.querySelector('.card__btn-popup');
const cardNumberText = document.querySelector('.card__img-number');
const imgName = document.querySelector('.card__img-name');
const imgData = document.querySelector('.card__img-num-one');
const imgDataTwo = document.querySelector('.card__img-num-two');
const imgCvc = document.querySelector('.card__second-text');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.card__error');
	formBox.classList.add('card__error-text');
	errorMsg.textContent = msg;
};

const clearError = input => {
	const formBox = input.parentElement;
	formBox.classList.remove('card__error-text');
};
const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder);
		} else {
			clearError(el);
		}
	});
};
const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText} consists of min. ${min}`);
	}
};
const checkNumber = input => {
	if (/[a-zA-Z]/.test(input.value) === true) {
		showError(input, ` Wrong format, numbers olny`);
	}
};
const checkLengthMmYy = (input, min) => {
	const inputs = document.querySelectorAll('.card__block-mmyy input');
	if (input.value.length < min) {
		if (inputs[0].value !== '') {
			showError(inputs[0], `${inputs[0].innerText} YY must have ${min}`);
		} else if (inputs[1].value !== '') {
			showError(inputs[1], `${inputs[1].innerText} MM must have ${min}`);
		} else {
			showError(input, `${input.innerText} (MM/YY) must have ${min}`);
		}
	}
};
const showPopup = () => {
	const popup = document.querySelector('.card__popup');
	const allInputs = document.querySelectorAll(' .card__form-box');
	let errorCount = 0;
	allInputs.forEach(el => {
		if (el.classList.contains('card__error-text')) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		popup.classList.add('card__popup-right-to-center');
	}
};
function resetPage() {
	preventDefaultEnabled = false;
	location.reload();
}
name.addEventListener('input', event => {
	const inputValue = event.target.value;
	const nameArray = inputValue.split(' ');
	const modifiedArray = nameArray.map(name => {
		if (name.length > 0) {
			return name.charAt(0).toUpperCase() + name.slice(1);
		} else {
			return name;
		}
	});
	imgName.textContent = modifiedArray.join(' ');
});

number.addEventListener('input', event => {
	const inputValue = event.target.value;
	const cardNumberArray = inputValue.replace(/\s/g, '').split('');
	let counter = 0;
	cardNumberArray.forEach((space, index) => {
		if (counter === 4) {
			cardNumberArray.splice(index, 0, ' ');
			counter = -1;
		}
		counter++;
	});
	cardNumberText.textContent = cardNumberArray.join('');
});

const FirstExpirtiondateM = event => {
	const inputValue = event.target.value;
	const digitRegex = /(\d{1,4})/g;
	const formattedValue = inputValue.replace(digitRegex, '$1 ');

	imgData.textContent = formattedValue.trim();
};
const secondtExpirtiondateM = event => {
	const inputValue = event.target.value;
	const digitRegex = /(\d{1,4})/g;
	const formattedValue = inputValue.replace(digitRegex, '$1 ');

	imgDataTwo.textContent = formattedValue.trim();
};
const securitycodeImg = event => {
	const inputValue = event.target.value;
	const digitRegex = /(\d{1,3})/g;
	const formattedValue = inputValue.replace(digitRegex, '$1 ');

	imgCvc.textContent = formattedValue.trim();
};

cvc.addEventListener('input', securitycodeImg);
expirtiondateM.addEventListener('input', FirstExpirtiondateM);
expirationdateTwoY.addEventListener('input', secondtExpirtiondateM);

sendBtnInfo.addEventListener('click', e => {
	e.preventDefault();

	checkForm([name, number, expirtiondateM, expirationdateTwoY, cvc]);
	checkLength(name, 4);
	checkLength(number, 16);
	checkNumber(number);
	checkLength(cvc, 3);
	checkLengthMmYy(expirtiondateM, 2);
	checkLengthMmYy(expirationdateTwoY, 2);
	showPopup();
});

sendBtnPopup.addEventListener('click', resetPage);
