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