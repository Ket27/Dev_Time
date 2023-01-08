const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const lengthSlider = document.querySelector('#length');
const strengthWord = document.querySelector('.Strength-Word');

const updateSlider = function(){
	document.querySelector('.password span').innerText = lengthSlider.value;
}
updateSlider();

lengthSlider.addEventListener("input", updateSlider);

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

generateEl.addEventListener('click', function(){
	const length = +lengthEl.value;
	const hasUpper = uppercaseEl.checked;
	const hasLower = lowercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;
	
	const arr = [
	 uppercaseEl.checked,
	 lowercaseEl.checked,
	 numbersEl.checked,
	 symbolsEl.checked
	]

	resultEl.innerText = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
	var count = 0;
	if(length > 12){
		strengthWord.innerText = "Strong";
		strengthWord.style.color = "green";
	}
	else{
		var count = 0;
		for(let i =0; i<4; i++){
			if(arr[i] == true){
				count++;
			}
		}

		if(count == 4){
			strengthWord.innerText = "Strong";
		}
	
		else if(count == 2){
			strengthWord.innerText = "Weak";
			strengthWord.style.color = "yellow"
		}
	
		else if(count == 3){
			strengthWord.innerText = "Medium";
			strengthWord.style.color = "yellow"
		}
	
		else{
			strengthWord.innerText = "Too Weak";
			strengthWord.style.color = "red";
		}
	}
})

function generatePassword(length, upper, lower, number, symbol){
	let generatedPassword = '';
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}

clipboard.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard');
});

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()* 26) + 97);
} 

function getRandomNumber(){
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*()_-=+{[}]:";<.,>/?';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
