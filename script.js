document.addEventListener("DOMContentLoaded", () => {
    const year = document.querySelector("#currentYear");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const navbar = document.querySelector("#mainNavbar");
    const navLinks = document.querySelectorAll(".navbar .nav-link[href^='#']");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (navbar?.classList.contains("show") && window.bootstrap) {
                window.bootstrap.Collapse.getOrCreateInstance(navbar).hide();
            }
        });
    });

    const sections = [...navLinks]
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter((section) => section instanceof HTMLElement);

    if ("IntersectionObserver" in window) {
        const revealItems = document.querySelectorAll(
            ".feature-card, .discover-card, #about .container, main > section.text-center .container",
        );
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 },
        );

        revealItems.forEach((item) => {
            item.classList.add("reveal-on-scroll");
            revealObserver.observe(item);
        });

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    navLinks.forEach((link) => {
                        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
                        link.classList.toggle("active", isCurrent);
                        if (isCurrent) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            { rootMargin: "-25% 0px -65% 0px" },
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }
});
