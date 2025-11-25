document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const scrollButtons = document.querySelectorAll('[data-scroll]');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const metricValues = document.querySelectorAll('.metric-value');
    const form = document.querySelector('.cta-form');
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    const rangeLabel = document.getElementById('rangeLabel');
    const rangeBadge = document.querySelector('[data-dashboard-range]');
    const chartCanvas = document.getElementById('volumeChart');
    const laneList = document.getElementById('laneList');
    const statShipments = document.getElementById('statShipments');
    const statShipmentsDelta = document.getElementById('statShipmentsDelta');
    const statOnTime = document.getElementById('statOnTime');
    const statDistance = document.getElementById('statDistance');
    const statEmissions = document.getElementById('statEmissions');

    const toggleNav = () => {
        hamburger?.classList.toggle('is-open');
        hamburger?.classList.toggle('active'); // legacy support
        navMenu?.classList.toggle('is-open');
        navMenu?.classList.toggle('active'); // legacy support
        document.body.classList.toggle('nav-open');
    };

    const closeNav = () => {
        hamburger?.classList.remove('is-open', 'active');
        navMenu?.classList.remove('is-open', 'active');
        document.body.classList.remove('nav-open');
    };

    hamburger?.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleNav();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => closeNav());
    });

    document.addEventListener('click', (event) => {
        if (!navMenu || !hamburger) return;
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedHamburger = hamburger.contains(event.target);
        if (!clickedInsideMenu && !clickedHamburger && navMenu.classList.contains('is-open')) {
            closeNav();
        }
    });

    const smoothScroll = (target) => {
        if (!target) return;
        const el = document.querySelector(target);
        if (!el) return;
        const navHeight = document.querySelector('.navbar')?.offsetHeight ?? 0;
        const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({
            top,
            behavior: 'smooth'
        });
    };

});
// End of script.js


document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Team modal data ---------- */
  const teamData = {
    m1: {
      name: "Asha Kumar",
      role: "Head Organizer",
      avatar: "assets/human 1.avif",
      bio: "Asha coordinates events and partnerships. 8+ years in community building and event ops."
    },
    m2: {
      name: "Ravi Patel",
      role: "Tech Lead",
      avatar: "assets/human2.jpg",
      bio: "Ravi leads platform architecture and dev tools. Expert in realtime and cloud systems."
    },
    m3: {
      name: "Maya Singh",
      role: "Community Manager",
      avatar: "assets/human3.webp",
      bio: "Maya handles communications, onboarding and member success for our community."
    }
  };

  /* ---------- Modal controls ---------- */
  const modal = document.getElementById('memberModal');
  const modalAvatar = document.getElementById('modalAvatar');
  const modalName = document.getElementById('modalName');
  const modalRole = document.getElementById('modalRole');
  const modalBio = document.getElementById('modalBio');
  const modalClose = modal?.querySelector('.modal-close');
  const modalBackdrop = modal?.querySelector('.modal-backdrop');

  const openMemberModal = (key) => {
    const data = teamData[key];
    if (!data || !modal) return;
    modalAvatar.src = data.avatar;
    modalAvatar.alt = `${data.name} avatar`;
    modalName.textContent = data.name;
    modalRole.textContent = data.role;
    modalBio.textContent = data.bio;
    modal.setAttribute('aria-hidden', 'false');
    // trap focus: send focus to close button
    modalClose?.focus();
    document.body.style.overflow = 'hidden';
  };

  const closeMemberModal = () => {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // return focus to first team card (nice to have)
    const firstCard = document.querySelector('.team-card');
    firstCard?.focus();
  };

  // open by clicking card (or keyboard Enter)
  document.querySelectorAll('.team-card').forEach(card => {
    const key = card.dataset.member;
    card.addEventListener('click', () => openMemberModal(key));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMemberModal(key);
      }
    });
  });

  modalClose?.addEventListener('click', closeMemberModal);
  modalBackdrop?.addEventListener('click', closeMemberModal);

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
      closeMemberModal();
    }
  });

});
// Set the date/time for the next meeting
// Set the date/time for the next meeting (used only if countdown elements exist)
const meetingDate = new Date("2025-12-05T15:00:00").getTime();

// Only run the global countdown updater if the countdown elements exist on the page
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

if (daysEl && hoursEl && minutesEl && secondsEl) {
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = meetingDate - now;

    if (distance < 0) {
      daysEl.textContent = "0";
      hoursEl.textContent = "0";
      minutesEl.textContent = "0";
      secondsEl.textContent = "0";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

  // Update countdown every second
  setInterval(updateCountdown, 1000);
  updateCountdown(); // initial call
}
// Scheduler variables and behavior: only initialize if the scheduler elements exist
const meetingDateInput = document.getElementById('meetingDate');
const slotBtns = document.querySelectorAll('.slot-btn');
const selectedDateTimeSpan = document.getElementById('selectedDateTime');
const confirmBtn = document.getElementById('confirmBtn');

if (meetingDateInput && selectedDateTimeSpan && confirmBtn && slotBtns.length > 0) {
  let selectedDate = null;
  let selectedTime = null;
  let countdownInterval = null;

  // Update display function
  function updateDisplay() {
    if (selectedDate && selectedTime) {
      selectedDateTimeSpan.textContent = `${selectedDate} at ${selectedTime}`;
      // start a countdown for the selected meeting only if countdown elements exist
      if (daysEl && hoursEl && minutesEl && secondsEl) {
        startCountdown(new Date(`${selectedDate} ${selectedTime}`));
      }
    } else if (selectedDate) {
      selectedDateTimeSpan.textContent = `${selectedDate}`;
    } else if (selectedTime) {
      selectedDateTimeSpan.textContent = `${selectedTime}`;
    } else {
      selectedDateTimeSpan.textContent = 'None';
    }
  }

  // Countdown function (works only if countdown elements exist)
  function startCountdown(meetingDateTime) {
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    if (countdownInterval) clearInterval(countdownInterval);

    function updateCountdownForSelection() {
      const now = new Date().getTime();
      const distance = meetingDateTime.getTime() - now;

      if (distance < 0) {
        daysEl.textContent = "0";
        hoursEl.textContent = "0";
        minutesEl.textContent = "0";
        secondsEl.textContent = "0";
        clearInterval(countdownInterval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
    }

    updateCountdownForSelection(); // initial call
    countdownInterval = setInterval(updateCountdownForSelection, 1000);
  }

  // Event listeners
  meetingDateInput.addEventListener('change', () => {
    selectedDate = meetingDateInput.value;
    updateDisplay();
  });

  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedTime = btn.dataset.time;
      updateDisplay();
    });
  });

  confirmBtn.addEventListener('click', () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both a date and a time slot!');
      return;
    }
    alert(`Meeting booked on ${selectedDate} at ${selectedTime}`);
  });

}
//sectioon of abotut page with no doubt we can use to change this as a image and a yaru da nee nan than da kadavul enna vella yaar iruk
const statNumbers = document.querySelectorAll('.stat-number');

statNumbers.forEach(el => {
  const target = +el.getAttribute('data-target');
  let count = 0;
  const step = target / 200; // duration steps

  const update = () => {
    count += step;
    if(count < target){
      el.textContent = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  };

  update();
});
