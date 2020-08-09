const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

if(sessionStorage.getItem("sliderpos") === null)
	sessionStorage.setItem("sliderpos", "right");

if(sessionStorage.getItem("sliderpos") === "right"){
	container.classList.remove("right-panel-active");
}

if(sessionStorage.getItem("sliderpos") === "left"){
	container.classList.add("right-panel-active");
}

signUpButton.addEventListener('click', () => {
	sessionStorage.setItem("sliderpos", "left");
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	sessionStorage.setItem("sliderpos", "right");
	container.classList.remove("right-panel-active");
});