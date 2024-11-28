window.addEventListener("load", () => {
  const slider = document.querySelector(".card-slider");
  const cards = Array.from(document.querySelectorAll(".card"));

  let isDown = false;
  let startY;
  let scrollTop;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startY = e.pageY - slider.offsetTop;
    scrollTop = slider.scrollTop;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageY - slider.offsetTop;
    const walk = x - startY;
    slider.scrollTop = scrollTop - walk;
  });

  slider.addEventListener("scroll", () => {
    const sliderMiddle =
      slider.getBoundingClientRect().top + slider.clientHeight / 2;

    let closestCard = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const cardMiddle =
        card.getBoundingClientRect().top + card.clientHeight / 2;
      const distance = Math.abs(cardMiddle - sliderMiddle);

      if (distance < closestDistance) {
        closestCard = card;
        closestDistance = distance;
      }
    });

    cards.forEach((card) => card.classList.remove("active"));
    if (closestCard) {
      closestCard.classList.add("active");

      const cardCenter =
        closestCard.getBoundingClientRect().top + closestCard.clientHeight / 2;
      const offset = cardCenter - slider.clientHeight / 2;

      slider.scrollTo({
        top: slider.scrollTop + offset,
        behavior: "smooth",
      });
    }
  });
});
