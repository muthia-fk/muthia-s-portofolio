// Pesan alert sederhana
function showMessage() {
    alert("Terima kasih telah mengunjungi portofolio saya!");
}

// Scroll ke section dengan offset agar tidak ketutupan header
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
}

// Highlight aktif saat section terlihat
const sections = document.querySelectorAll("section");
const navButtons = document.querySelectorAll("nav button");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120; // offset header
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navButtons.forEach(button => {
        button.classList.remove("active");
        if (button.getAttribute("onclick").includes(current)) {
            button.classList.add("active");
        }
    });
});

// Dark Mode Toggle dengan ikon 🌙 ↔ 🌞
const toggleBtn = document.getElementById("toggleDarkMode");
const headerH1 = document.querySelector("header h1");

// Original and Neon header texts
const originalHeader = `Welcome to 
<span class="symbol star">⋆</span><span class="symbol dot">.</span> 
<span class="symbol pink">𐙚</span><span class="symbol blue">˚</span> 
<span class="symbol lilac">࿔</span> 
Muthia's 
<span class="symbol pink">𝜗𝜚</span><span class="symbol blue">˚</span><span class="symbol star">⋆</span> 
portofolio page!`;

const neonHeader = `<span style="color: #000000;">Welcome to</span> <span style="color: #FFD700;">♬</span><span style="color: #FF1493;">ˎ</span><span style="color: #39FF14;">ˊ</span><span style="color: #0099FF;">˗</span> <span style="color: #000000;">Muthia's</span> <span style="color: #FFB6C1;">ꕤ</span><span style="color: #DA70D6;">*</span><span style="color: #FF0B55;">.ﾟ</span> <span style="color: #000000;">portofolio page!</span>`;

// Default: Pastel Mode aktif → tampilkan ikon bulan 🌙
toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';

toggleBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");

    // cek apakah dark-mode aktif
    if (document.body.classList.contains("dark-mode")) {
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // Neon Mode → ikon matahari
        headerH1.innerHTML = neonHeader; // Ganti header untuk Neon Mode
    } else {
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>'; // Pastel Mode → ikon bulan
        headerH1.innerHTML = originalHeader; // Kembali ke header asli
    }
});

// Back to Top
const backToTopBtn = document.getElementById("backToTop");

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fade out otomatis saat di posisi paling atas
window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
        backToTopBtn.classList.add("hidden"); // sembunyikan
    } else {
        backToTopBtn.classList.remove("hidden"); // tampilkan
    }
});

// Animasi reveal tiap section
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.4 // cover 40% area section baru dianggap terlihat
});

// Apply ke semua section
document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});

const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// Project card -> modal detail
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('projectModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalImage = document.getElementById('modalImage');
const modalPrimary = document.getElementById('modalPrimary');

function openModal(card) {
    const title = card.querySelector('h3')?.innerText || '';
    const desc = card.querySelector('p')?.innerText || '';
    const img = card.querySelector('img')?.src || '';
    const link = card.querySelector('.project-btn')?.getAttribute('href') || '#';

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalImage.src = img;
    modalPrimary.href = link;

    modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
}

projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        // prevent clicks on action buttons inside card from opening modal
        if (e.target.closest('.project-actions')) return;
        openModal(card);
    });
});

modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });