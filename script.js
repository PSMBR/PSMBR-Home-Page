
/* ========================================
   PSMBR - MAIN JAVASCRIPT
======================================== */

console.log("Script.js Version 1");
console.log("index.html Version 1.5");
console.log("style.css Version 1.5");
console.log("SnowScript.js Version 1.25");

/* =========================================
   PAGE FADE TRANSITION
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("a[href]").forEach(link => {

        link.addEventListener("click", event => {

            const url = new URL(link.href);

            // Only transition when navigating to another page
            if (
                url.origin !== window.location.origin ||
                url.pathname !== window.location.pathname
            ) {
                if (
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey ||
                    link.target === "_blank"
                ) {
                    return;
                }

                event.preventDefault();

                document.body.classList.add("page-leaving");

                setTimeout(() => {
                    window.location.href = link.href;
                }, 400);
            }

        });

    });

});
