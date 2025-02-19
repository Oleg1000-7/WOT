const burger = document.querySelector(".nav-burger");
const navLinks = document.querySelectorAll(".nav-link");
burger.addEventListener("click", (e) => {
e.preventDefault()
navLinks.forEach((el)=>{if (!el.classList.contains("nav-burger")) {el.classList.toggle("hidden-link");}})
})