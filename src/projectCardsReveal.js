import { gsap } from "gsap";

export function projectCardsReveal() {
  const projSection = document.querySelector(".section_projects");
  const projCards = projSection.querySelectorAll(".projects_link-wrapper");
  projCards.forEach((item, index) => {
    const heading = item.querySelector(".projects_text");
    const tl = gsap.timeline({ delay: index * 0.2 + 0.15 });
    tl.to(item, {
      borderColor: "#5a5958",
      delay: 0.6,
      duration: 0.7,
    }).from(
      heading,
      {
        y: "300%",
        opacity: 1,
        duration: 0.7,
      },
      "<.1"
    );
  });
}
