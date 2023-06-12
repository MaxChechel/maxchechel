import { gsap } from "gsap";

export function contactCardsReveal() {
  const contactSection = document.querySelector(".section_contact");
  const contactCards = contactSection.querySelectorAll(".contact_link-wrapper");
  contactCards.forEach((item, index) => {
    const heading = item.querySelector("h3");
    const arrow = item.querySelector(".contact_icon");
    const tl = gsap.timeline({ delay: index * 0.2 + 0.15 });
    tl.to(item, {
      borderColor: "#c9c6ce",
      delay: 0.6,
      duration: 0.7,
    })
      .to(
        heading,
        {
          y: "0%",
          opacity: 1,
          duration: 0.7,
        },
        "<.1"
      )
      .to(
        arrow,
        {
          opacity: 1,
          duration: 0.7,
        },
        "<.4"
      );
  });
}
