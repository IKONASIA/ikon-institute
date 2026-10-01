document.addEventListener("DOMContentLoaded", function () {

    // Website ke sabhi page sections
    const pages = document.querySelectorAll(".page-content");

    // Navigation aur page change karne wale links
    const pageLinks = document.querySelectorAll("a[data-page]");

    // Available pages
    const validPages = ["home", "courses", "events", "contact"];


    // Page show karne ka function
    function showPage(pageName, updateHistory = true) {

        // Invalid page ho to Home show hoga
        if (!validPages.includes(pageName)) {
            pageName = "home";
        }

        // Sabhi pages ko hide/show karna
        pages.forEach(function (page) {

            if (page.id === "page-" + pageName) {
                page.classList.add("active");
            } else {
                page.classList.remove("active");
            }

        });


        // Active navigation link update karna
        pageLinks.forEach(function (link) {

            const isActive = link.dataset.page === pageName;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }

        });


        // URL hash update karna
        if (updateHistory && window.location.hash !== "#" + pageName) {
            history.pushState(
                { page: pageName },
                "",
                "#" + pageName
            );
        }

        // Page change hone par top par scroll
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    // Navigation aur CTA links par click event
    pageLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const pageName = this.dataset.page;

            showPage(pageName);

        });

    });


    // Browser Back / Forward button support
    window.addEventListener("popstate", function () {

        const pageName = window.location.hash.substring(1) || "home";

        showPage(pageName, false);

    });


    // URL hash manually change hone par page update
    window.addEventListener("hashchange", function () {

        const pageName = window.location.hash.substring(1) || "home";

        showPage(pageName, false);

    });


    // Website open hone par initial page
    const initialPage = window.location.hash.substring(1) || "home";

    showPage(initialPage, false);

});
