"use strict";
// --------             Carousel              ---------

// --------             Sticky nav              ---------
let navbar = document.querySelector(".hd-sec");
let sticky = navbar.offsetTop;

window.addEventListener('scroll', () => {
  // console.log(sticky, window.pageYOffset);
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky_menu")
  } else {
    navbar.classList.remove("sticky_menu");
  }
})

// -------      Dynamic color to dekstop menu items       ---------
const dekstopMenuItems = document.querySelectorAll(".main-menu ul li");
let currentIndex = 1;

dekstopMenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    dekstopMenuItems[currentIndex].classList.remove("active");
    currentIndex = index;
    dekstopMenuItems[currentIndex].classList.add("active");
  });
});
// ------         Scroll up               --------
const targetElements = [
  document.querySelector(".top-service-container"),
  document.querySelector(".project-cards"),
  document.querySelector(".contact-page-sec"),
];

let options = {
  threshold: 0.3,
};

function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      console.log("found it", entry.target);
      if (!entry.target || !entry.target.classList.value) return;
      if (entry.target.classList.value.includes("targetSelectorContact")) {
        // dekstopMenuItems[currentIndex].classList.remove("active");
        currentIndex = 4;
        document
          .querySelector(`.main-menu ul li:nth-child(4)`)
          .classList.add("active");
      } else if (
        entry.target.classList.value.includes("targetSelectorProjects")
      ) {
        // dekstopMenuItems[currentIndex].classList.remove("active");
        currentIndex = 3;
        document
          .querySelector(`.main-menu ul li:nth-child(3)`)
          .classList.add("active");
      } else if (
        entry.target.classList.value.includes("targetSelectorServices")
      ) {
        // dekstopMenuItems[currentIndex].classList.remove("active");
        currentIndex = 2;
        document
          .querySelector(`.main-menu ul li:nth-child(2)`)
          .classList.add("active");
      } else if (entry.target.classList.value.includes("slide")) {
        currentIndex = 1;
        document
          .querySelector(`.main-menu ul li:nth-child(1)`)
          .classList.add("active");
      } else if (
        entry.target.classList.value.includes("targetSelectorUsefulLinks")
      ) {
        currentIndex = 5;
        document
          .querySelector(`.main-menu ul li:nth-child(5)`)
          .classList.add("active");
        document
          .querySelector(`.main-menu ul li:nth-child(4)`)
          .classList.remove("active");
      }
    } else {
      if (!entry.target || !entry.target.classList.value) return;
      if (entry.target.classList.value.includes("targetSelectorContact")) {
        document
          .querySelector(`.main-menu ul li:nth-child(4)`)
          .classList.remove("active");
      } else if (
        entry.target.classList.value.includes("targetSelectorProjects")
      ) {
        document
          .querySelector(`.main-menu ul li:nth-child(3)`)
          .classList.remove("active");
      } else if (
        entry.target.classList.value.includes("targetSelectorServices")
      ) {
        document
          .querySelector(`.main-menu ul li:nth-child(2)`)
          .classList.remove("active");
      } else if (entry.target.classList.value.includes("slide")) {
        document
          .querySelector(`.main-menu ul li:nth-child(1)`)
          .classList.remove("active");
      } else if (
        entry.target.classList.value.includes("targetSelectorUsefulLinks")
      ) {
        document
          .querySelector(`.main-menu ul li:nth-child(5)`)
          .classList.remove("active");
      }
    }
  });
}

let observer = new IntersectionObserver(handleIntersection, options);

document.querySelectorAll(".targetSelector").forEach((i) => {
  if (i) {
    observer.observe(i);
  }
});

// -------      Close mobile menu       ---------
let open = false;
let closeBtn;
let openBtn;

window.addEventListener("click", (e) => {
  // console.log(e.target);
  let w = window.innerWidth;
  if (w > 767) return;
  if (e.target.nodeName === "SPAN" && e.target.innerHTML.length) return;
  if (e.target.classList.value === "checkmark") return;
  if (
    (e.target.nodeName === "A" && e.target.id === "scrollUp") ||
    (e.target.nodeName === "SPAN" &&
      e.target.classList.value === "lnr lnr-arrow-up")
  )
    return;
  // if (!e.target.innerHTML.length) {
  if (e.target.classList.value === "meanmenu-reveal") {
    document.querySelector(".main-menu-ul").style.display = "none";
  } else if (
    e.target.classList.value === "meanmenu-reveal meanclose" ||
    (e.target.parentNode &&
      e.target.parentNode.classList.value === "meanmenu-reveal meanclose")
  ) {
    open = true;
    e.target.nextSibling.children[0].style.display = "block";
    document.querySelector(".meanmenu-reveal").classList.add("meanclose");
    document.querySelector(".meanmenu-reveal").style =
      "right: 0px; left: auto; text-align: center; text-indent: 0px; font-size: 18px;";
  } else if (
    (e.target.nodeName == "SPAN" || e.target.classList == "mean-span") &&
    (!e.target.classList.value || !e.target.innerHTML)
  ) {
    document.querySelector(".meanmenu-reveal").classList.add("meanclose");
    document.querySelector(".main-menu-ul").style.display = "block";
    open = true;
  } else if (!document.querySelector(".mobile-nav-menu").innerHTML.length) {
    document.querySelector(".main-menu-ul").style.display = "none";
    document.querySelector(".meanmenu-reveal").classList.value =
      "meanmenu-reveal";
  }
  // }
});

function closeMobileMenu(e) {
  let w = window.innerWidth;
  if (w > 767) return;

  e = e || window.event;
  let target = e.target || e.srcElement;
  target = target.parentNode.parentNode;

  target.style.display = "none";

  target = target.parentNode.previousElementSibling;
  target.classList.value = "meanmenu-reveal";

  target.style =
    "color: white; right: 0px; left: auto; text-align: center; text-indent: 0px; font-size: 18px;";
  target.innerHTML = "";
  const children = [...Array(3).keys()].map((item) =>
    document.createElement("span")
  );
  target.appendChild(children[0]);
  target.appendChild(children[1]);
  target.appendChild(children[2]);

  open = false;
}

// -------       Preload demo images     ---------
const preloadImages = new Array();
const pathToImages = () =>
  [...Array(8).keys()].map(
    (item) => `../images/projects/big/big${item + 1}.png`
  );

const preloadFunc = (myArray) => {
  for (let i = 0; i < myArray.length; i++) {
    preloadImages[i] = new Image();
    preloadImages[i].src = myArray[i];
  }
};

// ---   Set dynamic images to project demos ---
const projectsDemos = document.querySelectorAll(".modal-body > .project-image");

//  ---  Fired when document is loaded   ----
(() => {
  setTimeout(() => {
    preloadFunc(pathToImages());
    projectsDemos.forEach((demo, index) => {
      demo.style.backgroundImage = `url('${preloadImages[index].src}')`;
    });
  }, 1000);
})();

// ------    Toggle modal functionality  --------
const projectsImages = document.querySelectorAll(".service-inner-text");

projectsImages.forEach((image, index) => {
  image.setAttribute("data-toggle", "modal");
  image.setAttribute("data-target", `#exampleModalCenter${index + 1}`);

  // image.addEventListener("click", () => console.log("x"));
});

// -----          Verify identity       --------
const submitFormBtn = document.querySelector(".single-input-fieldsbtn > input");
const checkboxIdentity = document.querySelector(".verify-identity > input");
const checkboxText = document.querySelector(".verify-identity > label");

function handleCheckbox() {
  if (!checkboxIdentity.checked) {
    document.querySelector(".verify-identity .error").style.display = "block";
  } else {
    checkboxText.style.color = "#525459";
    checkboxText.style.textDecoration = "none";
    document.querySelector(".verify-identity .error").style.display = "none";
  }
}

checkboxIdentity.addEventListener("click", handleCheckbox);
submitFormBtn.addEventListener("click", handleCheckbox);

// ----------    Cool BootsTrap  ---------------
// replace xs with ms

const section = document.querySelectorAll(".targetSelectorServices .row .col");
console.log(section);
// [.,.,.,]

if (window.innerWidth < 558) {
  section.forEach((item) => {
    console.log(item.classList.value);
    item.classList.value = item.classList.value.replace("x", "m");
  });
}

// if (window.innerWidth < 558) {
//   section.classList.value.replace("x", "m");
//   // section.classList.remove(".col-xs-6");
//   // section.classList.add(".col-sm-6");
// }
