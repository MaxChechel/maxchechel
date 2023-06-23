import { gsap } from "gsap";

export function blogListItemsReveal() {
  const blogSection = document.querySelector(".section_blog-list");
  const blogSectionListItems = blogSection.querySelectorAll(".blog-list_item");
  blogSectionListItems.forEach((item, index) => {
    const divider = item.querySelector(".blog-list_divider");
    const heading = item.querySelector(".blog-list_question h3");
    const category = item.querySelectorAll(".blog-list_category-wrap p");
    const tl = gsap.timeline({ delay: index * 0.2 });
    tl.to(divider, {
      width: "100%",
      opacity: 1,
      duration: 1.6,
      delay: 0.4,
      ease: "power4.inOut",
    })
      .to(
        heading,
        {
          y: "0%",
          opacity: 1,
          duration: 0.6,
        },
        "<.2"
      )
      .call(() => {
        item.closest(".blog-list_items-wrap").classList.add("is-ready");
      })
      .to(
        category,
        {
          y: "0%",
          opacity: 1,
          duration: 0.6,
          stagger: {
            each: 0.05,
          },
        },
        ".7"
      );
  });
}
