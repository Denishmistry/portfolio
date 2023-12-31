window.addEventListener("load", function () {


  tltransition.play(0);

  var loading = true;


  init();
  var mobile = window.innerWidth < 768;
  // console.log(mobile);
  gsap.registerPlugin(ScrollTrigger);






  // ================
  // Custom Cursor
  // ===============
  const cursor = document.querySelector('.cursor')

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px'
    cursor.style.top = e.clientY + 'px'
    // console.log(e,e.screenY )
  })
  const links = document.querySelectorAll(
    "a , input,textarea,button,.hover,label"
  );
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      cursor.classList.add("large");
    });
    link.addEventListener("mouseleave", () => {
      cursor.classList.remove("large");
    });
  });

  // ================
  // Spliting text
  // ===============

  const swiftUpElements = document.querySelectorAll('.split');
  swiftUpElements.forEach(elem => {

    // const words = elem.textContent.split('');
    const words = elem.textContent.split(' ');
    elem.innerHTML = '';

    words.forEach((el, index) => {

      let child = words.children;
      // console.log(el ,index);
      if (el === "") {
        words[index] = `<span class="parent empty"><span class="child">${words[index]}</span></span>`;
      } else {
        words[index] = `<span class=${""}><span class="child">${words[index]}</span></span>`;
      }
    });

    elem.innerHTML = words.join(' ');

  });

  swiftUpElements.forEach((section, index) => {

    ScrollTrigger.create({
      trigger: section,
      id: index + 1,
      start: 'top 95%',
      end: 'top 0%',
      once: false,
      // end: () => `+=${section.clientHeight + 30}`,
      toggleActions: 'play reverse none reverse',
      toggleClass: {
        targets: section,
        className: "active"
      },
      markers: false
    })

  });
  // ================
  // Mobile menu
  // ================

  const mobile_icon = document.querySelector('.mobile-icon');
  const mobile_menu = document.querySelector('.mobilemenu');
  const hamburger_icon = document.querySelector("#mobile-icon i");
  const menu_list = document.querySelectorAll(".mobilemenu li");


  menu_list.forEach(function (item) {
    item.addEventListener('click', function () {
      mobile_icon.classList.remove('open');
      mobile_menu.classList.remove('open');
      document.querySelector("header").classList.remove('open');

      changeIcon();

    });
  });

  function openCloseMenu() {
    mobile_icon.classList.toggle('open');
    mobile_menu.classList.toggle('open');
    document.querySelector("header").classList.toggle('open');
    changeIcon()

  }


  function changeIcon(icon) {
    var x = document.querySelector(".material-icons");
    if (x.innerHTML === "menu") {
      x.innerHTML = "close";
    } else {
      x.innerHTML = "menu";
    }
  }


  mobile_icon.addEventListener('click', openCloseMenu);




  // ==============================
  // Gsap Horizontal scroll
  // ==============================
  //list as many as you'd like


  function horizontalScroll(selector) {



    let horizontalSections = document.querySelectorAll(".projects");

    horizontalSections.forEach((horizontalSection) => {
      let pinWrap = horizontalSection.querySelector(selector);
      let pinWrapWidth = pinWrap.offsetWidth;
      let horizontalScrollLength = pinWrapWidth - window.innerWidth;
      gsap.to(pinWrap, {
        scrollTrigger: {

          scrub: true,
          trigger: horizontalSection,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${pinWrapWidth}`,
          invalidateOnRefresh: true
        },
        x: -horizontalScrollLength,
        ease: "none"
      });
    });

  }
  setTimeout(() => {
    horizontalScroll(".pin-wrap");
  }, 300);



  // ==============================
  // Gsap SlideUpOnLoad animation
  // ==============================
  function OnLoadAnimation(selector, Ystart, Yend, OpacityStart, OpacityEnd, delay) {
    const select2 = document.querySelectorAll(selector);
    gsap.utils.toArray(select2).forEach((slidedown) => {
      gsap.set(slidedown, {
        y: Ystart,
        opacity: OpacityStart,
      });
      gsap.to(slidedown, {
        y: Yend,
        duration: 2,
        delay: delay,
        ease: "power2.out",
        opacity: OpacityEnd,
      });

    });
  }

  OnLoadAnimation(".home h1", 20, 0, 0, 1, 3);
  OnLoadAnimation(".home p", 20, 0, 0, 1, 3.5);
  OnLoadAnimation(".home a", 20, 0, 0, 1, 4);



  // ======================
  // Gsap SlideUp animation
  // ======================
  function SlideUp(
    selector,
    Ystart,
    Yend,
    scrub,
    OpacityStart,
    OpacityEnd,
    StartPosition,
    EndPosition,
    markers
  ) {
    const select2 = document.querySelectorAll(selector);
    gsap.utils.toArray(select2).forEach((slidedown) => {
      gsap.set(slidedown, {
        y: Ystart,
        opacity: OpacityStart,
      });
      gsap.to(slidedown, {
        scrollTrigger: {
          trigger: slidedown,
          scrub: scrub,
          markers: markers,
          ease: Power2.easeOut,
          start: StartPosition,
          duration: 1,
          end: EndPosition,
        },

        y: Yend,
        opacity: OpacityEnd,
      });

    });
  }
  setTimeout(() => {
    SlideUp(".social", 0, -20, 3, 1, 0, "top 80%", "bottom 80%", false);
    SlideUp(".wid-child-1", `${mobile ? "60" : "200"}`, 0, 3, 0, 1, "top 100%", "bottom 75%", false);
    SlideUp(".wid-child-2", `${mobile ? "60" : "300"}`, `${mobile ? "0" : "50"}`, 3, 0, 1, "top 100%", "bottom 75%", false);
    SlideUp(".wid-child-3", `${mobile ? "60" : "400"}`, `${mobile ? "0" : "100"}`, 3, 0, 1, "top 100%", "bottom 75%", false);
    SlideUp(".slup", "100", 0, 3, 0, 1, "top 100%", `${mobile ? "bottom 85%" : "bottom 75%"}`, false);

    SlideUp(".scroll-down", 0, -20, 3, 0, 1, "top 80%", "bottom 80%", false);
    // SlideUp(".explore", "250", 150, 3, 0, 1, "top 80%", "bottom 60%", false);

  }, 300);
  // ==============================
  // Gsap Stagger Animation
  // ==============================
  function staggerAnim(selector, staggerTime, y) {
    const selectorelm = document.querySelectorAll(selector);
    gsap.set(selectorelm, {
      opacity: 0,
      y: y
    });

    let Start, End;
    if (window.innerWidth > 768) {
      Start = "top 85%";
      End = "bottom 10%";

    } else {
      Start = "top 60%";
      End = "bottom 0%";
    }

    ScrollTrigger.batch(selectorelm, {
      scrub: 2,

      start: Start,
      end: End,
      markers: false,
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: staggerTime,

      }),
      onLeave: batch => gsap.to(batch, {
        opacity: 0,
        y: -y,

      }),
      onEnterBack: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: staggerTime
      }),
      onLeaveBack: batch => gsap.to(batch, {
        opacity: 0,
        y: y
      }),

    });

    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(selectorelm, {
      y: y,
      opacity: 0
    }));
  }
  setTimeout(() => {
    staggerAnim(".exp-main ", 0.1, 100);
    staggerAnim(".blog ", 0.1, 100);

  }, 300);

  // ==================================
  // Multiple Animation About section
  // ===================================


  const main = document.querySelector('.about')

  const tl = gsap.timeline({})
  tl.from('.about-image', {

    opacity: 0,
    scale: 0.8,

  }).to('.about-image', {
    opacity: 1,

  })
  tl.add(() => {}, "+=0.2")


  tl.from('.about-image', {
    // scale:1,


  }).to('.about-image', {
    scale: 0.8,
    opacity: `${mobile ? "0" : "0.5"}`,
    x: `${mobile ? "0" : "30%"}`
  })



  tl.add(() => {}, "+=0.2") // Add delay to the next animation
  tl.from('.about-wrapper', {
    y: 50,
    opacity: 0,
  }).to('.about-wrapper', {
    opacity: 1,
    y: 0
  })
  // console.warn(main.clientHeight);
  ScrollTrigger.create({
    trigger: main,
    // pinnedContainer: '.container-pin',
    start: 'top top',
    end: `+=${main.clientHeight + (mobile ? 1500 : 4000)  + 'px '}`,

    pin: true,
    pinSpacing: true,
    scrub: true,
    animation: tl,
    markers: false,
  })
  // console.log(mobile)
  // ===================================
  // Multiple Animation Call To Action
  // ===================================


  const CTAmain = document.querySelector('#cta')
  gsap.set("#cta *", {
    transformPerspective: 400,
    transformStyle: "preserve-3d"
  });
  const cta_tl = gsap.timeline({})
  cta_tl.from('.line-1', {

    opacity: 0,
    y: "100px",
    rotationX: -20,

  }).to('.line-1', {
    opacity: 1,
    y: "0",
    rotationX: 0,
  })
  cta_tl.add(() => {}, "+=0.2")
  cta_tl.to('.line-1', {
    opacity: 0,
    y: "-100px",
    rotationX: 20,
  })

  // Line 2
  cta_tl.from('.line-2', {

    opacity: 0,
    y: "100px",
    rotationX: -20,

  }).to('.line-2', {
    opacity: 1,
    y: "0",
    rotationX: 0,
  })
  cta_tl.add(() => {}, "+=0.2")
  cta_tl.to('.line-2', {
    opacity: 0,
    y: "-100px",
    rotationX: 20,
  })
  // Line-3
  cta_tl.from('.line-3', {

    opacity: 0,
    y: "100px",
    rotationX: -20,

  }).to('.line-3', {
    opacity: 1,
    y: "0",
    rotationX: 0,
  })
  cta_tl.add(() => {}, "+=0.2")
  cta_tl.to('.line-3', {

    y: "-100px",

  })
  // cta_tl.add(()=>{}, "+=0.2")
  // cta_tl.to('.line-3', {
  //   opacity:0,
  //   y:"-100px",
  //   rotationX:20,
  // })

  // console.warn(CTAmain.clientHeight);


  setTimeout(() => {
    ScrollTrigger.create({
      trigger: CTAmain,
      // pinnedContainer: '.container-pin',
      start: 'top 25%',
      end: `+=${CTAmain.clientHeight + mobile ? 1500 : 4000 + 'px '}`,

      pin: true,
      scrub: true,
      animation: cta_tl,
      markers: false,
    })
  }, 300)
  // ========================
  // Text scroll Animation
  // =======================
  function TextScrollFunction(selector, StartPositionX, EndPositionX) {

    gsap.utils.toArray(selector).forEach((textanim) => {
      gsap.set(textanim, {
        x: StartPositionX,
      });
      gsap.to(textanim, {
        scrollTrigger: {
          trigger: textanim,
          pin: false,
          scrub: true,
          markers: false,
          start: "top 100%",
          end: "bottom 0%",
        },
        x: EndPositionX,
        duration: 1000,
        ease: "none",
      });
    });

  }
  TextScrollFunction(".project_text", "-100%", "-200%");

  // ================
  // sticky header
  // ===============
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = document.querySelector("header").offsetHeight;

  window.addEventListener("scroll", function (event) {
    didScroll = true;
  });

  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = window.scrollY || document.documentElement.scrollTop;

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      document.querySelector("header").classList.remove("header-anim");
    } else {
      // Scroll Up
      if (st + window.innerHeight < document.documentElement.scrollHeight) {
        document.querySelector("header").classList.add("header-anim");
      }
    }
    if (st < 180) {
      document.querySelector("header").classList.add("fixed-header");
    }
    if (st > 0) {
      document.querySelector("header").classList.add("fixed-header");
    } else {
      document.querySelector("header").classList.remove("fixed-header");
      document.querySelector("header").classList.remove("header-anim");
    }

    lastScrollTop = st;
  }



  // document.querySelectorAll('.mobilemenu a').forEach((event) => {
  //   event.addEventListener("click", (i) => {

  //   });

  // });

});

// ====================
// Full screen mobile
// ===================

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);


// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});





// =======================
// Smooth windows Scroll
// =======================

function init() {
  new SmoothScroll(document, 120, 12)
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
      target = (
          document.scrollingElement ||
          document.documentElement ||
          document.body.parentNode ||
          document.body
      ); // cross browser support for document scrolling

  var moving = false;
  var pos = target.scrollTop;
  var frame =
      target === document.body && document.documentElement
          ? document.documentElement
          : target; // safari is the new IE

  target.addEventListener("mousewheel", scrolled, { passive: false });
  target.addEventListener("DOMMouseScroll", scrolled, { passive: false });

  function scrolled(e) {
      e.preventDefault(); // disable default scrolling

      var delta = normalizeWheelDelta(e);

      pos += -delta * speed;
      pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)); // limit scrolling

      if (!moving) update();
  }

  function normalizeWheelDelta(e) {
      if (e.detail) {
          if (e.wheelDelta)
              return (
                  (e.wheelDelta / e.detail) * 40 * (e.detail > 0 ? 1 : -1)
              ); // Opera
          else return -e.detail / 3; // Firefox
      } else return e.wheelDelta / 120; // IE,Safari,Chrome
  }

  function update() {
      moving = true;

      var delta = (pos - target.scrollTop) / smooth;

      target.scrollTop += delta;

      if (Math.abs(delta) > 0.5) requestFrame(update);
      else moving = false;
  }

  var requestFrame =
      (function () {
          // requestAnimationFrame cross browser
          return (
              window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              function (func) {
                  window.setTimeout(func, 1000 / 50);
              }
          );
      })();

  // Additional code to handle smooth scroll when clicking on links
  var links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function (link) {
      link.addEventListener("click", function (e) {
          e.preventDefault();
          var targetId = this.getAttribute("href").substring(1);
          var targetElement = document.getElementById(targetId);
          if (targetElement) {
              pos = targetElement.offsetTop;
              update();
          }
      });
  });
}




// ================
// Ref Site
//================

// https://gsap.com/community/forums/topic/35406-animate-rotationx-and-y/

// ================
// page transition
// ================
const $main = document.querySelector("main");
const $header = document.querySelector("header");
// const $main = document.querySelector(".profile-page");
const $logo = document.querySelector(".transition__logo");
const $frameBlack = document.querySelector(".page-transition__black");
const $frameRed = document.querySelector(".page-transition__seondary");
// const $button = document.querySelector("#button");

let tltransition = new TimelineMax({
    paused: true,
  })
  .fromTo(
    $frameRed,
    1.2, {
      scaleX: 0,
    }, {
      scaleX: 1,
      transformOrigin: "left",
      ease: Power4.easeInOut,
    }
  )
  .fromTo(
    $frameBlack,
    1.2, {
      scaleX: 0,
    }, {
      scaleX: 1,
      transformOrigin: "left",
      ease: Power4.easeInOut,
    },
    0.2
  )
  .fromTo($logo, 0.5, {
      xPercent: -100,
      autoAlpha: 0
    }, {
      xPercent: -50,
      autoAlpha: 1,
      ease: Power4.easeInOut
    },
    .7)
  .set($frameRed, {
    scaleX: 0,
  })

  // .fromTo(
  //   $header, {
  //     autoAlpha: 0,
  //   }, {
  //     autoAlpha: 1,
  //     ease: Power4.easeInOut,
  //   }
  // )
  .to($header, {
    opacity: 1,
  }).to($main, {
    opacity: 1,
  })
  .to($frameBlack, 1.2, {
    scaleX: 0,
    transformOrigin: "right",
    ease: Power4.easeInOut,
  })

  .to(
    $logo,
    0.2, {
      xPercent: 100,
      autoAlpha: 0,
    },
    '-=1.2'
  )