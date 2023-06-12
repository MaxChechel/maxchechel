import { gsap } from "gsap";

export function sectionHeadingReveal(heading, subtext) {
  let tl = gsap.timeline({ paused: true });
  tl.to(heading, {
    y: "0%",
    opacity: 1,
    duration: 0.8,

    stagger: {
      each: 0.1,
    },
  }).to(
    subtext,
    {
      y: "0%",
      opacity: 1,

      stagger: {
        each: 0.075,
      },
    },
    "<.3"
  );
  tl.play();
}
