import { gsap } from "gsap";
import { CustomEase } from "gsap/all";

export function projectCardsHover() {
  const customEaseIn = CustomEase.create(
    "custom-ease-in",
    "0.47, 0.00, 0.49, 1.00"
  );

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
}
