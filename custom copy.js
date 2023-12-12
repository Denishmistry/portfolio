window.addEventListener("load", function () {
  init();
  gsap.registerPlugin(ScrollTrigger);


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



    let horizontalSections = document.querySelectorAll(".Projects");

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
  horizontalScroll(".pin-wrap");


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
  OnLoadAnimation(".home h1", 20, 0, 0, 1, 0);
  OnLoadAnimation(".home p", 20, 0, 0, 1, 0.4);
  OnLoadAnimation(".home a", 20, 0, 0, 1, 0.8);

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

  SlideUp(".social", 0, -20, 3, 1, 0, "top 80%", "bottom 80%", false);
  // SlideUp(".about-image", 0, -20, 3, 1, 0, "top 80%", "bottom 80%", true);

// ===================
// Multiple Animation
// ===================


const main = document.querySelector('#about')

const tl = gsap.timeline({})
tl.from('.about-image', {

  opacity:0,
  scale:0.8,

}).to('.about-image', {
  opacity:1,

})
tl.add(()=>{}, "+=0.2")
tl.from('.about-image', {
  // scale:1,


}).to('.about-image', {
  scale:0.8,
  opacity:0.5,
  x:"30%"
})
tl.add(()=>{}, "+=0.2") // Add delay to the next animation
tl.from('.about-wrapper', {
  y: 50,
  opacity:0,
}).to('.about-wrapper', {
  opacity:1,
  y:0
})
console.warn(main.clientHeight);
ScrollTrigger.create({
  trigger: main,
  // pinnedContainer: '.container-pin',
  start: 'top top',
  end:`+=${main.clientHeight + 4000 + 'px '}`,
  // bottom: () => {
  //   const height = main.clientHeight ;
  //   console.log(height)
  //   return `bottom+=${height}px`
  //   // return `bottom+=${height}px bottom`
  // },
  pin: true,
  scrub: true,
  animation: tl,
  markers: false,
})

// console.log(document.querySelector("#about").offsetHeight);
// gsap.timeline({
//   scrollTrigger:{
//     trigger:'#about',
//     pin:true,
//     pinSpacing:true,
//     markers:true,
//     start:'top top',
//     // end:'+=2500',
//     end:`+=${document.querySelector("#about").offsetHeight}`,
//     scrub:3,
//   },
//   defaults:{duration:1, ease:'none'}
// })
//  .from('.about-image', {scale:1,opacity:1})
// .to('.about-image', {opacity:0.5,scale:0.5})
// .from('.about-wrapper', {opacity:0,y:"-100px"})
// .to('.about-wrapper', {opacity:1,y:"150px"})
// .from('.text h1', {opacity:0, x:'-=100', duration:0.5},0.5)
// .to({}, {duration:0.3})

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
      Start = "top 80%";
      End = "bottom 20%";

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

      }),
      onLeave: batch => gsap.to(batch, {
        opacity: 0,
        y: -y,

      }),
      onEnterBack: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,

      }),
      onLeaveBack: batch => gsap.to(batch, {
        opacity: 0,
        y: y,

      }),
    });
    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(selectorelm, {
      y: y,
      opacity: 0
    }));
  }

  // staggerAnim(".about-img-grid > * ", 0.1, 100);
  // staggerAnim(".about-wrapper > div ", 0.8, 100);
  // staggerAnim(".tabs > div ", 0.2, 100);
  staggerAnim(".news > a ", 0.2, 100);
  staggerAnim(".logos > * ", 0.2, 100);



  // ======================
  // Gsap scaleUp animation
  // ======================
  function scaleUp(selector, InitialScalepos, EndScalepos, StartRadius, EndRadius) {
    const select2 = document.querySelectorAll(selector);
    gsap.utils.toArray(select2).forEach((slideup) => {
      gsap.set(slideup, {
        scale: InitialScalepos,
        x: "0%",
        y: "0%",
        borderRadius: StartRadius,
        opacity: 0.8
      });
      gsap.to(slideup, {
        scrollTrigger: {
          trigger: slideup,
          scrub: 3,
          markers: false,
          start: "top 100%",
          end: "top 50%",
        },
        scale: EndScalepos,
        x: "0%",
        y: "0",
        borderRadius: EndRadius,
        opacity: 1
      });

    });
  }
  scaleUp(".video", 0.6, 1, "100px", "0%");


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

});


function init() {
  new SmoothScroll(document, 120, 12)
}

function SmoothScroll(target, speed, smooth) {
  if (target === document)
    target = (document.scrollingElement ||
      document.documentElement ||
      document.body.parentNode ||
      document.body) // cross browser support for document scrolling

  var moving = false
  var pos = target.scrollTop
  var frame = target === document.body &&
    document.documentElement ?
    document.documentElement :
    target // safari is the new IE

  target.addEventListener('mousewheel', scrolled, {
    passive: false
  })
  target.addEventListener('DOMMouseScroll', scrolled, {
    passive: false
  })

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling

    var delta = normalizeWheelDelta(e)

    pos += -delta * speed
    pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

    if (!moving) update()
  }

  function normalizeWheelDelta(e) {
    if (e.detail) {
      if (e.wheelDelta)
        return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1) // Opera
      else
        return -e.detail / 3 // Firefox
    } else
      return e.wheelDelta / 120 // IE,Safari,Chrome
  }

  function update() {
    moving = true

    var delta = (pos - target.scrollTop) / smooth

    target.scrollTop += delta

    if (Math.abs(delta) > 0.5)
      requestFrame(update)
    else
      moving = false
  }

  var requestFrame = function () { // requestAnimationFrame cross browser
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
  }()
}