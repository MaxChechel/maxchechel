import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { CustomEase } from "gsap/all";
import SplitType from "split-type";
import { Flip } from "gsap/all";
import Lenis from "@studio-freight/lenis";

window.addEventListener("DOMContentLoaded", (event) => {
  //Split type
  let splitText = new SplitType(".text-link_text, .projects_split-text", {
    types: "chars",
    tagName: "char",
  });
  let splitWords = new SplitType(
    "[data-hover-card='text'], [data-scroll-text], [data-hero-heading]",
    {
      types: "lines, words",
      tagName: "word",
    }
  );
  const textLinks = document.querySelectorAll(".text-link_wrap");
  const textOnScroll = document.querySelectorAll("[data-scroll-text] .word");
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  const customEaseIn = CustomEase.create(
    "custom-ease-in",
    "0.47, 0.00, 0.49, 1.00"
  );
  const customEaseIn2 = CustomEase.create(
    "custom-ease-in-2",
    "0.17, 0.17, 0.34, 1.00"
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
        duration: 1.6,
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
          each: 0.07,
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
  ////////////////////

  let mm = gsap.matchMedia();
  mm.add("(hover:hover)", () => {
    //Text links hover
    textLinks.forEach((link) => {
      const text = link.querySelectorAll(".text-link_text-wrap .char");
      const textAbs = link.querySelectorAll(".text-link_text.is-abs .char");
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
        y: "300%",
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

      card.addEventListener("mouseenter", (e) => {
        textReveal.restart();
        padReveal.restart();
      });
      card.addEventListener("mouseleave", () => {
        textReveal.reverse();
        padReveal.reverse();
      });
    });
    //Blog list items hover
    const listItems = document.querySelectorAll(".blog-list_item"),
      shape = document.querySelector(".blog-list_pad"),
      listsParent = document.querySelector(".blog-list_items-wrap");

    listItems[0].classList.add("is-first");
    listItems[listItems.length - 1].classList.add("is-last");

    listItems.forEach(function (li) {
      li.addEventListener("mouseover", function (e) {
        let currentItem = e.target;
        let state = Flip.getState(".blog-list_pad", { props: "height" });
        li.appendChild(shape);
        Flip.from(state, {
          duration: 0.4,
          ease: "power4.out",
        });
      });
      li.addEventListener("mouseleave", function (e) {
        let currentItem = e.target;
        let state = Flip.getState(".blog-list_pad", { props: "height" });
        if (
          currentItem.classList.contains("is-first") ||
          currentItem.classList.contains("is-last")
        ) {
          Flip.from(state, {
            duration: 0.4,
            ease: "power4.out",
          });
        }
      });
    });

    listsParent.addEventListener("mouseover", function (e) {
      shape.classList.add("is-active");

      let state = Flip.getState(".blog-list_pad", { props: "height" });
      Flip.from(state, {
        duration: 0.3,
        ease: "power2.out",
      });
    });
    listsParent.addEventListener("mouseleave", function (e) {
      shape.classList.remove("is-active");
      let state = Flip.getState(".blog-list_pad", { props: "height" });
      Flip.from(state, {
        duration: 0.3,
        ease: "power2.out",
      });
    });
    /////////////////////////
  });
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1200);
  });

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
        start: "top 10%",
        end: "bottom 50%",
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
      },
    }
  );
  //Bottom letters reveal
  gsap.registerPlugin(ScrollTrigger);
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
});

////////////////////
