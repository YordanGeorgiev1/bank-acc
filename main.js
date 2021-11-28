const openCloseModal = () => {
  const OpenAccButtons = document.querySelectorAll(".btn--show-modal");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const btnCloseModal = document.querySelector(".btn--close-modal");

  const open = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const close = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  OpenAccButtons.forEach((b) => b.addEventListener("click", open));

  btnCloseModal.addEventListener("click", close);
  overlay.addEventListener("click", close);

  document.addEventListener("keydown", (e) => {
    if (e.key == "Escape") close();
  });
};

const scrollIntoView = () => {
  const learnMoreScroll = document.querySelector(".btn--scroll-to");
  const sectionOne = document.querySelector("#section--1");
  const scrollLinks = document.querySelectorAll(".nav__link");
  const logo = document.querySelector("#logo");
  const header = document.querySelector(".header");

  logo.addEventListener("click", () => {
    header.scrollIntoView({ behavior: "smooth" });
  });

  learnMoreScroll.addEventListener("click", () => {
    sectionOne.scrollIntoView({ behavior: "smooth" });
  });

  scrollLinks.forEach((l) => {
    l.addEventListener("click", (e) => {
      e.preventDefault();
      const attribute = l.getAttribute("href");
      if (attribute == "#") return;
      const currLink = document.querySelector(attribute);
      currLink.scrollIntoView({ behavior: "smooth" });
    });
  });
};

const cookies = () => {
  const createCookies = document.createElement("div");
  createCookies.classList.add("cookie-message");
  createCookies.innerHTML =
    "We Provide Cookies For Our Website " +
    '<button class="btn btn--close-cookie">Accept</button>';
  document.body.append(createCookies);
  const btnCloseCookies = document.querySelector(".btn--close-cookie");

  btnCloseCookies.addEventListener("click", () => {
    createCookies.remove();
  });
};

const hoverElements = () => {
  const nav = document.querySelector(".nav");
  const otherLinks = nav.querySelectorAll(".nav__link");

  const hover = (e, opacity) => {
    const curr = e.target;
    if (curr.classList.contains("nav__link")) {
      let currLink = curr;
      otherLinks.forEach((link) => {
        if (link !== currLink) link.style.opacity = opacity;
      });
    }
  };

  nav.addEventListener("mouseover", (e) => {
    hover(e, 0.5);
  });

  nav.addEventListener("mouseout", (e) => {
    hover(e, 1);
  });
};

const activateOperations = () => {
  const buttonsContainer = document.querySelector(".operations__tab-container");
  const buttonsChangeContent = document.querySelectorAll(".operations__tab");
  const contentAfterClick = document.querySelectorAll(".operations__content");

  buttonsContainer.addEventListener("click", (e) => {
    const currButton = e.target.closest(".operations__tab");
    // if (!currButton) return;

    buttonsChangeContent.forEach((b) =>
      b.classList.remove("operations__tab--active")
    );
    contentAfterClick.forEach((c) =>
      c.classList.remove("operations__content--active")
    );
    currButton.classList.add("operations__tab--active");
    const currContent = document.querySelector(
      `.operations__content--${currButton.dataset.tab}`
    );
    currContent.classList.add("operations__content--active");
  });
};

const IntersectionObserving = () => {
  const header = document.querySelector(".header");
  const nav = document.querySelector(".nav");

  const stickyNav = (entries) => {
    const entry = entries[0];
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  };

  const observerHeader = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 1,
    // rootMargin: `-${navHeight}px`
  });
  observerHeader.observe(header);

  const allSections = document.querySelectorAll(".section");

  const revealSection = (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  };

  const observerSections = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.2,
  });

  allSections.forEach((section) => {
    observerSections.observe(section);
    section.classList.add("section--hidden");
  });

  const imgTargets = document.querySelectorAll("img[data-src]");

  const loadImg = (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", () => {
      entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
  };

  const observerImg = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: "-200px",
  });

  imgTargets.forEach((img) => observerImg.observe(img));
};

const SlidesAndDots = () => {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  createDots();

  const activateDot = (slide) => {
    const dots = document.querySelectorAll(".dots__dot");
    dots.forEach((dot) => dot.classList.remove("dots__dot--active"));
    const dotSlide = document.querySelector(
      `.dots__dot[data-slide="${slide}"]`
    );
    dotSlide.classList.add("dots__dot--active");
  };

  activateDot(0);

  let currSlide = 0;
  const maxSlide = slides.length - 1;

  slides.forEach((s, i) => (s.style.transform = `translateX(${i * 100})%`));

  const goToSlide = (slide) => {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  goToSlide(0);

  const nextSlide = () => {
    if (currSlide == maxSlide) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = () => {
    if (currSlide == 0) {
      currSlide = maxSlide;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    activateDot(currSlide);
  };

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") prevSlide();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__dot")) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

const askingToLeave = () => {
  window.addEventListener("beforeunload", (e) => {
    e.preventDefault();
    e.returnValue = "";
  });
};

openCloseModal();
scrollIntoView();
cookies();
hoverElements();
activateOperations();
IntersectionObserving();
SlidesAndDots();
askingToLeave();
