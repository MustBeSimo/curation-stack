window.addEventListener('DOMContentLoaded', function() {
// Section name map for accessible nav dot labels
var sectionNames = {
  'hero': 'Top',
  'section-01': 'The Same Problem',
  'section-02': 'The Quality Arc',
  'section-03': 'What Hermès Knows',
  'section-04': 'The Curation Stack',
  'section-05': 'Quality When Everyone Creates',
  'section-06': 'Software Rots',
  'section-07': 'Quality Tiers',
  'section-08': 'Remix Culture',
  'section-09': 'Community Decides Fails',
  'section-10': 'The Abuse Layer',
  'section-11': 'White Space',
  'section-12': 'Minimum Viable Stack',
  'section-13': 'Concrete Signals',
  'section-14': 'Build the Quality Layer',
  'section-refs': 'Sources'
};

// Guard: if GSAP fails to load, show all content immediately
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Progress bar
  gsap.to('#progressBar', {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    }
  });

  // Hero animations
  var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .to('.hero-label', { opacity: 1, y: 0, duration: 0.8 }, 0.2)
    .to('.hero h1 .line-inner', { y: 0, opacity: 1, duration: 1, stagger: 0.15 }, 0.4)
    .to('.hero-subtitle', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 }, 0.8)
    .to('.hero-author', { opacity: 1, y: 0, duration: 0.6 }, 1.2)
    .to('.companion-note', { opacity: 1, x: 0, duration: 0.6 }, 1.4)
    .to('.hero-meta', { opacity: 1, duration: 0.6 }, 1.6);

  // Section-level reveal (one trigger per section)
  gsap.utils.toArray('.section').forEach(function(section) {
    gsap.fromTo(section,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
          onEnter: function() { section.classList.add('visible'); }
        }
      }
    );
  });

  // Batched child animations (reduces trigger count drastically)
  ScrollTrigger.batch('.section p, .section h3', {
    start: 'top 88%',
    onEnter: function(batch) {
      gsap.fromTo(batch,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }
      );
    },
    once: true
  });

  ScrollTrigger.batch('.styled-list li', {
    start: 'top 90%',
    onEnter: function(batch) {
      gsap.fromTo(batch,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06 }
      );
    },
    once: true
  });

  ScrollTrigger.batch('.tier-card, .split-card', {
    start: 'top 85%',
    onEnter: function(batch) {
      gsap.fromTo(batch,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    },
    once: true
  });

  // Unique elements: one trigger each (diagrams, code blocks, thesis boxes, etc.)
  gsap.utils.toArray('.diagram, .case-study, .prediction').forEach(function(el) {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      }
    );
  });

  gsap.utils.toArray('.comp-table').forEach(function(table) {
    gsap.fromTo(table,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7,
        scrollTrigger: { trigger: table, start: 'top 85%', once: true }
      }
    );
  });

  gsap.utils.toArray('.code-block').forEach(function(cb) {
    gsap.fromTo(cb,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8,
        scrollTrigger: {
          trigger: cb, start: 'top 85%', once: true,
          onEnter: function() { cb.classList.add('visible'); }
        }
      }
    );
  });

  gsap.utils.toArray('.thesis-box').forEach(function(tb) {
    gsap.fromTo(tb,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8,
        scrollTrigger: {
          trigger: tb, start: 'top 85%', once: true,
          onEnter: function() { tb.classList.add('visible'); }
        }
      }
    );
  });

  // Flow rows within diagrams (staggered per diagram)
  gsap.utils.toArray('.diagram').forEach(function(diagram) {
    var rows = diagram.querySelectorAll('.flow-row');
    gsap.fromTo(rows,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.12,
        scrollTrigger: { trigger: diagram, start: 'top 80%', once: true }
      }
    );
  });

  // Footer animation
  gsap.fromTo('.footer',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.8,
      scrollTrigger: { trigger: '.footer', start: 'top 85%', once: true }
    }
  );

  // Navigation dots
  var navDotsContainer = document.getElementById('navDots');
  var allSections = document.querySelectorAll('.section');
  var sectionIds = ['hero'];

  allSections.forEach(function(s) {
    if (s.id) sectionIds.push(s.id);
  });

  sectionIds.forEach(function(id, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'nav-dot';
    dot.dataset.target = id;
    if (i === 0) {
      dot.classList.add('active');
      dot.setAttribute('aria-current', 'true');
    }

    var label = sectionNames[id] || ('Section ' + (i + 1));
    dot.setAttribute('aria-label', 'Navigate to ' + label);
    dot.addEventListener('click', function() {
      var target = document.getElementById(id);
      if (target) {
        gsap.to(window, { duration: 1, scrollTo: { y: target, offsetY: 40 }, ease: 'power2.inOut' });
      }
    });
    navDotsContainer.appendChild(dot);
  });

  // Update active dot on scroll
  sectionIds.forEach(function(id, i) {
    var el = document.getElementById(id);
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top center',
      end: 'bottom center',
      onEnter: function() { updateActiveDot(i); },
      onEnterBack: function() { updateActiveDot(i); }
    });
  });

  function updateActiveDot(index) {
    var dots = navDotsContainer.querySelectorAll('.nav-dot');
    dots.forEach(function(d, i) {
      var isActive = i === index;
      d.classList.toggle('active', isActive);
      if (isActive) {
        d.setAttribute('aria-current', 'true');
      } else {
        d.removeAttribute('aria-current');
      }
    });
  }

  // Parallax background
  var parallaxLayer = document.querySelector('.parallax-layer');
  if (parallaxLayer) {
    gsap.to(parallaxLayer, {
      y: '-10%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });
  }

} else {
  // GSAP failed to load: make everything visible immediately
  document.querySelectorAll('.hero-label,.hero-subtitle,.hero-author,.companion-note,.hero-meta,.section,.footer')
    .forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
    });
  document.querySelectorAll('.hero h1 .line-inner')
    .forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  // Create static nav dots without GSAP scroll-to
  var navDotsContainer = document.getElementById('navDots');
  var staticSections = document.querySelectorAll('.section');
  var staticIds = ['hero'];
  staticSections.forEach(function(s) { if (s.id) staticIds.push(s.id); });
  staticIds.forEach(function(id, i) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'nav-dot';
    if (i === 0) dot.classList.add('active');
    var label = sectionNames[id] || ('Section ' + (i + 1));
    dot.setAttribute('aria-label', 'Navigate to ' + label);
    dot.addEventListener('click', function() {
      var target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    navDotsContainer.appendChild(dot);
  });
}
}); // end DOMContentLoaded
