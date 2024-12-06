const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');

    });
});