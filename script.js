document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // DARK MODE
    // =========================
    const themeButton = document.createElement("button");
    themeButton.className = "theme-toggle";
    themeButton.setAttribute("aria-label", "Ganti tema");
    themeButton.innerHTML = "🌙";
    document.body.appendChild(themeButton);

    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeButton.innerHTML = "☀️";
    }

    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const dark = document.body.classList.contains("dark-mode");
        localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
        themeButton.innerHTML = dark ? "☀️" : "🌙";
    });

    // =========================
    // HAMBURGER MENU
    // =========================
    const navbar = document.querySelector(".navbar");
    const navMenu = document.querySelector(".nav-menu");

    if (navbar && navMenu) {
        const menuButton = document.createElement("button");
        menuButton.className = "menu-toggle";
        menuButton.setAttribute("aria-label", "Buka menu");
        menuButton.innerHTML = "☰";
        navbar.appendChild(menuButton);

        menuButton.addEventListener("click", () => {
            navMenu.classList.toggle("show-menu");
            menuButton.innerHTML = navMenu.classList.contains("show-menu") ? "✕" : "☰";
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("show-menu");
                menuButton.innerHTML = "☰";
            });
        });
    }

    // =========================
    // TYPING EFFECT DI HOME
    // =========================
    const heroName = document.querySelector(".hero h1:nth-of-type(2) span");

    if (heroName) {
        const text = heroName.textContent.trim();
        heroName.textContent = "";
        let index = 0;

        const typing = setInterval(() => {
            heroName.textContent += text[index];
            index++;

            if (index >= text.length) {
                clearInterval(typing);
            }
        }, 100);
    }

    // =========================
    // ANIMASI SAAT SCROLL
    // =========================
    const cards = document.querySelectorAll(
        ".profile-card, .education-card, .skill-card, .project-card, .contact-card, .info-box"
    );

    cards.forEach(card => card.classList.add("reveal"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.15
    });

    cards.forEach(card => observer.observe(card));

    // =========================
    // PROGRESS BAR KEAHLIAN
    // =========================
    const skillProgress = document.querySelectorAll(".skill-progress");

    const skillValues = {
        html: "25%",
        css: "25%",
        cpp: "25%",
        network: "25%",
        git: "25%",
        github: "25%",
        database: "25%",
        algorithm: "25%"
    };

    skillProgress.forEach(bar => {
        const className = [...bar.classList].find(item => skillValues[item]);

        if (className) {
            const value = skillValues[className];
            bar.style.width = "0%";
            bar.dataset.target = value;

            const skillCard = bar.closest(".skill-card");
            const percentage = skillCard?.querySelector(".skill-name span");

            if (percentage) {
                percentage.textContent = "0%";
            }

            const skillObserver = new IntersectionObserver((entries, obs) => {
                if (entries[0].isIntersecting) {
                    let current = 0;
                    const target = parseInt(value);

                    const animation = setInterval(() => {
                        current++;
                        bar.style.width = current + "%";

                        if (percentage) {
                            percentage.textContent = current + "%";
                        }

                        if (current >= target) {
                            clearInterval(animation);
                        }
                    }, 15);

                    obs.unobserve(bar);
                }
            }, { threshold: 0.4 });

            skillObserver.observe(bar);
        }
    });

    // =========================
    // TOMBOL KEMBALI KE ATAS
    // =========================
    const topButton = document.createElement("button");
    topButton.className = "back-to-top";
    topButton.innerHTML = "↑";
    topButton.setAttribute("aria-label", "Kembali ke atas");
    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 350) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // =========================
    // FORM KONTAK
    // =========================
    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nama = document.querySelector("#nama").value.trim();
            const email = document.querySelector("#email").value.trim();
            const pesan = document.querySelector("#pesan").value.trim();

            if (!nama || !email || !pesan) {
                alert("Mohon isi semua bagian formulir terlebih dahulu.");
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                alert("Format email belum benar. Silakan periksa kembali.");
                return;
            }

            alert(
                "Pesan berhasil disiapkan, " + nama + "! Terima kasih sudah menghubungi saya."
            );

            contactForm.reset();
        });
    }

    // =========================
    // TAHUN FOOTER OTOMATIS
    // =========================
    const footerYear = document.querySelector("footer p:last-child");

    if (footerYear) {
        footerYear.textContent = "© " + new Date().getFullYear();
    }
// =========================
// ANIMASI BINTANG JATUH ✨🌠
// =========================

function createShootingStar() {

    const star = document.createElement("div");

    star.className = "shooting-star";

    // Posisi awal acak
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 60 + "vh";

    // Ukuran bintang lebih besar
    const size = Math.random() * 3 + 2;
    star.style.width = size + "px";
    star.style.height = size + "px";

    // Kecepatan acak
    const duration = Math.random() * 1.2 + 0.8;
    star.style.animationDuration = duration + "s";

    document.body.appendChild(star);

    // Hapus setelah selesai
    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}


// Membuat beberapa bintang sekaligus
setInterval(() => {

    const jumlahBintang = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < jumlahBintang; i++) {
        setTimeout(() => {
            createShootingStar();
        }, i * 150);
    }

}, 500);
});
