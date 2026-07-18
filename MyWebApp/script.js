const btn = document.getElementById("helloBtn");
const greeting = document.getElementById("greeting");

btn.addEventListener("click", () => {
    greeting.textContent = "Hello, World!";
    btn.style.backgroundColor = "green";});