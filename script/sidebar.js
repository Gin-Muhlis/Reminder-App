// !animasi hamburger-menu dan navigasi
const menus = document.querySelectorAll(".menu-button");
const navMenu = document.querySelector("#sidebar");
const closeBUtton = document.querySelectorAll('.close-sidebar-button');

menus.forEach(function (menu) {
    menu.addEventListener("click", function () {
        navMenu.classList.add('show');
    });
});

closeBUtton.forEach(event => {
  event.addEventListener('click', () => {
    navMenu.classList.remove('show');
  })
})