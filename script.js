const card = document.querySelector("#card");
const toast = document.querySelector("#toast");
const surpriseBtn = document.querySelector("#surpriseBtn");
const colorBtn = document.querySelector("#colorBtn");
const message = document.querySelector("#message");
const contactForm = document.querySelector("#contactForm");

const moods = [
  ["#46e0ff", "#c6ff5f", "#ff6f91", "A brighter mood just arrived."],
  ["#7cf7d4", "#ffe66d", "#ff8c42", "Warm, crisp, and ready to launch."],
  ["#9dff7a", "#56cfe1", "#f72585", "Fresh energy, same friendly hello."],
  ["#ffd166", "#06d6a0", "#ef476f", "A little festival of pixels."],
];

let moodIndex = 0;
let toastTimer;

document.addEventListener("pointermove", (event) => {
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateX = ((y / rect.height) - 0.5) * -8;
  const rotateY = ((x / rect.width) - 0.5) * 8;
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

document.addEventListener("pointerleave", () => {
  if (!card) return;
  card.style.transform = "rotateX(0deg) rotateY(0deg)";
});

if (surpriseBtn) {
  surpriseBtn.addEventListener("click", () => {
    showToast("Sparkle mode: absolutely engaged.");
    burstConfetti();
  });
}

if (colorBtn) {
  colorBtn.addEventListener("click", () => {
    moodIndex = (moodIndex + 1) % moods.length;
    const [cyan, lime, coral, text] = moods[moodIndex];
    document.documentElement.style.setProperty("--cyan", cyan);
    document.documentElement.style.setProperty("--lime", lime);
    document.documentElement.style.setProperty("--coral", coral);
    message.textContent = text;
    showToast("Mood shifted.");
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    contactForm.reset();
    showToast("Message sent into the glow.");
    burstConfetti();
  });
}

function showToast(text) {
  if (!toast) return;

  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

function burstConfetti() {
  for (let i = 0; i < 36; i += 1) {
    const piece = document.createElement("span");
    const size = Math.random() * 8 + 5;
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 170 + 70;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    piece.style.cssText = `
      position: fixed;
      left: 50%;
      top: 50%;
      width: ${size}px;
      height: ${size}px;
      border-radius: ${Math.random() > 0.5 ? "50%" : "3px"};
      background: hsl(${Math.random() * 360}, 95%, 68%);
      pointer-events: none;
      z-index: 10;
      transform: translate(-50%, -50%);
      transition: transform 780ms cubic-bezier(.14,.76,.18,1), opacity 780ms ease;
    `;

    document.body.appendChild(piece);
    requestAnimationFrame(() => {
      piece.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${Math.random() * 520}deg)`;
      piece.style.opacity = "0";
    });
    setTimeout(() => piece.remove(), 820);
  }
}
