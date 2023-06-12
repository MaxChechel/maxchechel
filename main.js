import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { CustomEase } from "gsap/all";
import { Flip } from "gsap/all";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";

import { blogListHover } from "./src/blogListHover";

gsap.registerPlugin(ScrollTrigger, Flip, CustomEase);

// Lenis smooth scrolling
let lenis;

// Initialize Lenis smooth scrolling
const initSmoothScrolling = () => {
  lenis = new Lenis({});

  lenis.on("scroll", () => ScrollTrigger.update());

  const scrollFn = (time) => {
    lenis.raf(time);
    requestAnimationFrame(scrollFn);
  };

  requestAnimationFrame(scrollFn);
};

window.addEventListener("DOMContentLoaded", () => {
  initSmoothScrolling();

  //Split type
  const splitText = new SplitType(".text-link_text, .projects_split-text", {
    types: "chars",
    tagName: "char",
  });

  const splitWords = new SplitType(
    "[data-hover-card='text'], [data-scroll-text], [data-hero-heading], [data-section-element]",
    {
      types: "lines, words",
      tagName: "word",
    }
  );

  const textLinks = document.querySelectorAll(".text-link_wrap");
  const textOnScroll = document.querySelectorAll("[data-scroll-text] .word");
  const customEaseIn = CustomEase.create(
    "custom-ease-in",
    "0.47, 0.00, 0.49, 1.00"
  );

  /////////////////////
  const headerPad = document.querySelector(".header_section-pad");
  const heroCta = document.querySelector(".header_cta-wrap .button-wrapper");
  const heroTl = gsap.timeline({ paused: true });

  heroTl
    .to(".header_load-line", {
      width: "100%",
      duration: 1.6,
      ease: "power4.inOut",
    })
    .to(headerPad, {
      height: "0%",
      duration: 1.8,
      ease: "power4.inOut",
    })
    .to(
      ".header_load-line",
      {
        opacity: "0%",
        duration: 0,
        ease: "power4.inOut",
      },
      "<1.4"
    )
    .to(
      ".section_header",
      {
        borderRadius: "12px",
        duration: 1.2,
        ease: "power4.inOut",
      },
      "<0"
    )
    .fromTo(
      "[data-hero-heading] .word",
      {
        y: "100%",
        opacity: 0,
        rotation: "5_short",
      },
      {
        y: "0%",
        opacity: 1,
        duration: 1.2,
        rotation: "360_short",
        ease: "power3.out",
        transformOrigin: "bottom left",
        stagger: {
          each: 0.08,
        },
      },
      "<.2"
    )
    .from(
      heroCta,
      {
        "will-change": "opacity",
        opacity: 0,
        y: "100%",
        ease: "power3.out",
        duration: 1,
      },
      "<.8"
    )
    .to(
      "[data-nav-item]",
      {
        "will-change": "opacity",
        opacity: 1,
        y: "0%",
        duration: 1,
        ease: "power3.out",
        stagger: {
          each: 0.1,
        },
      },
      "<.1"
    )
    .to(
      "[data-scroll-text]",
      {
        "will-change": "opacity",
        opacity: 1,
        duration: 1,
      },
      "< 0.1"
    );
  heroTl.restart();

  //Text on scroll
  gsap.fromTo(
    textOnScroll,
    {
      "will-change": "opacity",
      opacity: 0.05,
    },
    {
      ease: "none",
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: "[data-scroll-text]",
        start: "top 50%",
        end: "bottom 60%",
        scrub: true,
        pin: false,
        pinSpacing: false,
      },
    }
  );

  let mm = gsap.matchMedia();
  mm.add("(hover:hover)", () => {
    //Text links hover
    textLinks.forEach((link) => {
      const text = link.querySelectorAll(".text-link_text-wrap .char");
      //const textAbs = link.querySelectorAll(".text-link_text.is-abs .char");
      const textRotateTl = gsap.timeline({ paused: true });
      textRotateTl.to(text, {
        ease: "power3.out",
        y: "-100%",
        stagger: {
          each: 0.02,
        },
      });

      link.addEventListener("mouseenter", () => {
        textRotateTl.restart();
      });
      link.addEventListener("mouseleave", () => {
        textRotateTl.reverse();
      });
    });
    //text links hover end
    //Cards hover
    gsap.set(".projects_split-text", {
      autoAlpha: 1,
    });
    const hoverCards = document.querySelectorAll("[data-hover-card='card']");

    hoverCards.forEach(function (card) {
      const cardText = card.querySelectorAll("[data-hover-card='text'] .word");
      const cardPad = card.querySelector("[data-hover-card='pad']");

      const splitText = card.querySelectorAll(
        "[data-hover-card='split-text'] .char"
      );

      let textReveal = gsap.timeline({ paused: true });
      //Card heading
      textReveal.to(cardText, {
        duration: 0.8,
        ease: "power2.inOut",
        rotation: "345_short",
        transformOrigin: "bottom left",
        stagger: { each: 0.05, from: "start" },
        y: "400%",
      });
      //Split text
      textReveal.fromTo(
        splitText,
        {
          y: "-100%",
          opacity: 0,
        },
        {
          duration: 0.4,
          stagger: { each: 0.02, from: "start" },
          ease: "power4.out",
          y: "0%",
          opacity: 1,
        },
        0.4
      );
      //Pad in
      let padReveal = gsap.timeline({ paused: true });
      padReveal.fromTo(
        cardPad,
        {
          y: "-100%",
        },
        {
          duration: 0.3,
          ease: customEaseIn,
          y: "0%",
          opacity: 1,
        },
        0.1
      );

      card.addEventListener("mouseenter", () => {
        textReveal.restart();
        padReveal.restart();
      });
      card.addEventListener("mouseleave", () => {
        textReveal.reverse();
        padReveal.reverse();
      });
    });
    // //Blog list items hover
    blogListHover();
    // const listItems = document.querySelectorAll(".blog-list_item"),
    //   shape = document.querySelector(".blog-list_pad"),
    //   listsParent = document.querySelector(".blog-list_items-wrap");

    // listItems[0].classList.add("is-first");
    // listItems[listItems.length - 1].classList.add("is-last");

    // listItems.forEach(function (li) {
    //   li.addEventListener("mouseover", function () {
    //     //let currentItem = e.target;
    //     let state = Flip.getState(".blog-list_pad", { props: "height" });
    //     li.appendChild(shape);
    //     Flip.from(state, {
    //       duration: 0.4,
    //       ease: "power4.out",
    //     });
    //   });
    //   li.addEventListener("mouseleave", function (e) {
    //     let currentItem = e.target;
    //     let state = Flip.getState(".blog-list_pad", { props: "height" });
    //     if (
    //       currentItem.classList.contains("is-first") ||
    //       currentItem.classList.contains("is-last")
    //     ) {
    //       Flip.from(state, {
    //         duration: 0.4,
    //         ease: "power4.out",
    //       });
    //     }
    //   });
    // });

    // listsParent.addEventListener("mouseover", function (e) {
    //   if (e.currentTarget.classList.contains("is-ready"))
    //     shape.classList.add("is-active");

    //   let state = Flip.getState(".blog-list_pad", { props: "height" });
    //   Flip.from(state, {
    //     duration: 0.3,
    //     ease: "power2.out",
    //   });
    // });
    // listsParent.addEventListener("mouseleave", function () {
    //   shape.classList.remove("is-active");
    //   let state = Flip.getState(".blog-list_pad", { props: "height" });
    //   Flip.from(state, {
    //     duration: 0.3,
    //     ease: "power2.out",
    //   });
    // });
  });

  //Bottom letters reveal
  const contactSection = document.querySelector(".section_contact");
  const letters = document.querySelectorAll(".footer_text-logo path");
  const lettersTl = gsap.timeline({ paused: true });
  lettersTl.fromTo(
    letters,
    {
      y: "100%",
      opacity: 0,
    },
    {
      y: "0%",
      opacity: 1,
      stagger: {
        each: 0.025,
      },
    }
  );
  ScrollTrigger.create({
    trigger: contactSection,
    start: "bottom 90%",
    end: "bottom 60%",
    scrub: true,
    onEnter: () => {
      lettersTl.play();
    },
  });

  //Blog list section reveal
  // gsap.set(".blog-list_divider", {
  //   width: "0%",
  //   opacity: 0,
  // });
  // gsap.set(".blog-list_question h3, .blog-list_category-wrap p", {
  //   y: "100%",
  //   opacity: 0,
  // });
  // gsap.set(".blog-list_item", {
  //   pointerEvents: "none",
  // });

  function sectionHeadingReveal(heading, subtext) {
    let tl = gsap.timeline({ paused: true });
    tl.to(heading, {
      y: "0%",
      opacity: 1,
      stagger: {
        each: 0.05,
      },
    }).to(subtext, {
      y: "0%",
      opacity: 1,
      stagger: {
        each: 0.05,
      },
    });
    tl.play();
  }
  const blogSection = document.querySelector(".section_blog-list");
  const blogSectionHeading = blogSection.querySelectorAll(
    "[data-section-element=heading] .word"
  );
  const blogSectionSubtext = blogSection.querySelectorAll(
    "[data-section-element=subtext] .line"
  );
  gsap.set(
    "[data-section-element=heading] .word, [data-section-element=subtext] .line",
    {
      opacity: 0,
    }
  );
  // ScrollTrigger.create({
  //   trigger: blogSection,
  //   start: "top 60%",
  //   end: "top 30%",
  //   onEnter: () => {
  //     sectionHeadingReveal(blogSectionHeading, blogSectionSubtext);

  //     batch.forEach((item, index) => {
  //       const divider = item.querySelector(".blog-list_divider");
  //       const heading = item.querySelector(".blog-list_question h3");
  //       const category = item.querySelector(".blog-list_category-wrap p");
  //       const tl = gsap.timeline({ delay: index * 0.15 });
  //       tl.to(divider, {
  //         width: "100%",
  //         opacity: 1,
  //         duration: 1.6,
  //       })
  //         .to(
  //           heading,
  //           {
  //             y: "0%",
  //             opacity: 1,
  //             duration: 0.7,
  //           },
  //           "<.6"
  //         )
  //         .to(
  //           item,
  //           {
  //             pointerEvents: "all",
  //           },
  //           "2"
  //         )
  //         .to(
  //           category,
  //           {
  //             y: "0%",
  //             opacity: 1,
  //             duration: 0.7,
  //           },
  //           "<.1"
  //         )
  //         .call(() => {
  //           item.closest(".blog-list_items-wrap").classList.add("is-ready");
  //         });
  //     });
  //   },
  // });

  ScrollTrigger.batch(".blog-list_item", {
    interval: 0.1,
    start: "30% bottom",
    end: "50% bottom",
    onEnter: (batch) => {
      batch.forEach((item, index) => {
        const divider = item.querySelector(".blog-list_divider");
        const heading = item.querySelector(".blog-list_question h3");
        const category = item.querySelector(".blog-list_category-wrap p");
        const tl = gsap.timeline({ delay: index * 0.15 });
        tl.to(divider, {
          width: "100%",
          opacity: 1,
          duration: 1.6,
        })
          .to(
            heading,
            {
              y: "0%",
              opacity: 1,
              duration: 0.7,
            },
            "<.6"
          )
          .to(
            item,
            {
              pointerEvents: "all",
            },
            "2"
          )
          .to(
            category,
            {
              y: "0%",
              opacity: 1,
              duration: 0.7,
            },
            "<.1"
          )
          .call(() => {
            item.closest(".blog-list_items-wrap").classList.add("is-ready");
          });
      });
    },
  });
});
