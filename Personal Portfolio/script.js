document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navAnchors = navLinks ? navLinks.querySelectorAll('a') : [];
    const tabLinks = document.querySelectorAll('.tab-links');
    const tabContents = document.querySelectorAll('.tab-contents');

    if (!navToggle || !navLinks) {
        return;
    }

    navToggle.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navToggle.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            navToggle.click();
        }
    });

    document.addEventListener('click', function (event) {
        if (
            navLinks.classList.contains('open') &&
            !navToggle.contains(event.target) &&
            !navLinks.contains(event.target)
        ) {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    navAnchors.forEach(function (anchor) {
        anchor.addEventListener('click', function () {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    tabLinks.forEach(function (tabLink) {
        tabLink.addEventListener('click', function () {
            const targetId = tabLink.dataset.tab;
            const targetContent = document.getElementById(targetId);

            if (!targetContent) {
                return;
            }

            tabLinks.forEach(function (link) {
                link.classList.remove('active-link');
            });

            tabContents.forEach(function (content) {
                content.classList.remove('active-tab');
            });

            tabLink.classList.add('active-link');
            targetContent.classList.add('active-tab');
        });
    });
});
