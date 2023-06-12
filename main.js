import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { CustomEase } from "gsap/all";
import { Flip } from "gsap/all";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";

import { blogListHover } from "./src/blogListHover";
import { sectionHeadingReveal } from "./src/sectionHeadingReveal";
import { projectCardsHover } from "./src/projectCardsHover";
import { blogListItemsReveal } from "./src/blogListItemsReveal";
import { projectCardsReveal } from "./src/projectCardsReveal";
import { contactCardsReveal } from "./src/contactCardsReveal";

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

  //Hovers
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

    //Cards hover
    projectCardsHover();
    // //Blog list items hover
    blogListHover();
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

  //Blog list section reveal//

  //Set initial states for elements
  gsap.set(".blog-list_divider", {
    width: "0%",
    opacity: 0,
  });
  gsap.set(".blog-list_question h3, .blog-list_category-wrap p", {
    y: "100%",
    opacity: 0,
  });
  gsap.set(
    "[data-section-element=heading] .word, [data-section-element=subtext] .line",
    {
      opacity: 0,
      y: "100%",
    }
  );
  const blogSection = document.querySelector(".section_blog-list");
  const blogSectionListItems = blogSection.querySelectorAll(".blog-list_item");
  const blogSectionHeading = blogSection.querySelectorAll(
    "[data-section-element=heading] .word"
  );
  const blogSectionSubtext = blogSection.querySelectorAll(
    "[data-section-element=subtext] .line"
  );

  ScrollTrigger.create({
    trigger: blogSection,
    start: "top 60%",
    end: "top 30%",
    once: true,
    onEnter: () => {
      sectionHeadingReveal(blogSectionHeading, blogSectionSubtext);
      blogListItemsReveal();
      gsap.fromTo(
        ".blog-list_cta-wrap .button",
        {
          opacity: 0,
          y: "100%",
        },
        {
          opacity: 1,
          y: "0%",
          ease: "power3.out",
          duration: 1,
        },
        "<1"
      );
    },
  });

  //Projects section reveal//

  //Set initial states for elements
  gsap.set(".projects_link-wrapper", {
    borderColor: "#1d1c16",
  });
  const projSection = document.querySelector(".section_projects");
  const projSectionHeading = projSection.querySelectorAll(
    "[data-section-element=heading] .word"
  );
  const projSectionSubtext = projSection.querySelectorAll(
    "[data-section-element=subtext] .line"
  );

  ScrollTrigger.create({
    trigger: projSection,
    start: "top 60%",
    end: "top 30%",
    once: true,
    onEnter: () => {
      sectionHeadingReveal(projSectionHeading, projSectionSubtext);
      projectCardsReveal();
    },
  });

  //Contact section reveal//

  //Set initial states for elements
  gsap.set(".contact_link-wrapper", {
    borderColor: "#fffdfa",
  });
  gsap.set(".contact_link-wrapper h3", {
    y: "300%",
  });
  gsap.set(".contact_link-wrapper .contact_icon", {
    opacity: 0,
  });
  const contactSectionHeading = contactSection.querySelectorAll(
    "[data-section-element=heading] .word"
  );
  const contactSectionSubtext = contactSection.querySelectorAll(
    "[data-section-element=subtext] .line"
  );

  ScrollTrigger.create({
    trigger: contactSection,
    start: "top 60%",
    end: "top 30%",
    once: true,
    onEnter: () => {
      sectionHeadingReveal(contactSectionHeading, contactSectionSubtext);
      contactCardsReveal();
    },
  });
});
