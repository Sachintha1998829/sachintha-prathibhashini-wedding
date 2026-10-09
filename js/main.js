
/* ==========================================
   SACHINTHA & PRATHIBHASHINI
   Wedding website JavaScript
   ========================================== */

// Wedding date: 20 January 2027, Sri Lanka time
// Countdown targets the Poruwa ceremony at 10:10 AM.
const WEDDING_DATE = new Date("2027-01-20T10:10:00+05:30");

// IMPORTANT:
// Replace this with your real email address
// before using the RSVP form.
const COUPLE_EMAIL = "YOUR_EMAIL_HERE";

// ------------------------------------------
// Countdown
// ------------------------------------------

const countdown = document.getElementById("countdown");

const cd = {
  days: document.getElementById("cd-days"),
  hours: document.getElementById("cd-hours"),
  minutes: document.getElementById("cd-minutes"),
  seconds: document.getElementById("cd-seconds"),
};

function updateCountdown() {
  if (!countdown) return;

  const diff = WEDDING_DATE.getTime() - Date.now();

  if (diff <= 0) {
    countdown.innerHTML =
      '<p class="cd-today">Our special day has arrived!</p>';

    clearInterval(countdownTimer);
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);

  if (cd.days) {
    cd.days.textContent = Math.floor(totalSeconds / 86400);
  }

  if (cd.hours) {
    cd.hours.textContent = String(
      Math.floor((totalSeconds % 86400) / 3600)
    ).padStart(2, "0");
  }

  if (cd.minutes) {
    cd.minutes.textContent = String(
      Math.floor((totalSeconds % 3600) / 60)
    ).padStart(2, "0");
  }

  if (cd.seconds) {
    cd.seconds.textContent = String(totalSeconds % 60).padStart(2, "0");
  }
}

updateCountdown();
const countdownTimer = setInterval(updateCountdown, 1000);

// ------------------------------------------
// Reveal sections when scrolling
// ------------------------------------------

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// ------------------------------------------
// Gallery lightbox
// ------------------------------------------

const lightbox = document.getElementById("lightbox");

if (lightbox) {
  const lightboxImg = lightbox.querySelector("img");

  document.querySelectorAll(".gallery-grid img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.showModal();
    });
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target === lightboxImg) {
      lightbox.close();
    }
  });
}

// ------------------------------------------
// RSVP form
// ------------------------------------------

const form = document.getElementById("rsvp-form");
const note = document.getElementById("rsvp-note");

if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);

    const firstName = String(data.get("first-name") || "").trim();
    const lastName = String(data.get("last-name") || "").trim();

    if (!firstName || !lastName) {
      note.textContent = "Please enter your first and last name.";
      note.hidden = false;
      return;
    }

    if (
      !COUPLE_EMAIL ||
      COUPLE_EMAIL === "pasindubalasooriya1998@gmail.com"
    ) {
      note.textContent =
        "The RSVP form needs the couple's email address before it can be used.";
      note.hidden = false;
      return;
    }

    const attending = String(data.get("attending") || "Yes");
    const guestCount = String(data.get("guests") || "0");
    const guestNames = String(data.get("guest-names") || "").trim();
    const message = String(data.get("message") || "").trim();

    const lines = [
      `Guest name: ${firstName} ${lastName}`,
      `Attending: ${attending}`,
      `Number of additional guests: ${guestCount}`,
      `Additional guest names: ${guestNames || "Not provided"}`,
      "",
      "Message:",
      message || "No message",
    ];

    const subject = `Wedding RSVP - ${firstName} ${lastName}`;

    const mailto =
      `mailto:${COUPLE_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;

    note.textContent =
      "Your email app should open with the RSVP details. Please send the email to complete your response.";
    note.hidden = false;

    window.location.href = mailto;
  });
}




/* ===== WEDDING ENVELOPE OPEN ANIMATION ===== */
(function () {
  function setupWeddingEnvelope() {
    const screen = document.getElementById("envelope-screen");
    const openButton = document.getElementById("open-invitation");

    if (!screen || !openButton) {
      console.error("Envelope screen or button was not found.");
      return;
    }

    document.body.style.overflow = "hidden";

    openButton.addEventListener("click", function () {
      if (screen.classList.contains("is-opening")) return;

      screen.classList.add("is-opening");
      openButton.disabled = true;
      openButton.textContent = "With love ♥";

      setTimeout(function () {
        screen.classList.add("is-open");
        document.body.style.overflow = "";
      }, 1100);

      setTimeout(function () {
        screen.remove();
      }, 2100);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupWeddingEnvelope);
  } else {
    setupWeddingEnvelope();
  }
})();
/* ===== END WEDDING ENVELOPE ANIMATION ===== */
