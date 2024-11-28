window.addEventListener("load", () => {
  const slider = document.querySelector(".card-slider");
  const cards = Array.from(document.querySelectorAll(".card"));

  const clonedCards = cards.map((card) => card.cloneNode(true));

  clonedCards.forEach((card) => slider.appendChild(card));

  clonedCards.forEach((card) =>
    slider.insertBefore(card.cloneNode(true), cards[0])
  );
  const allCards = Array.from(slider.querySelectorAll(".card"));

  slider.scrollTop = cards[0].clientHeight * cards.length;

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
    const y = e.pageY - slider.offsetTop;
    const walk = y - startY;
    slider.scrollTop = scrollTop - walk;
  });

  slider.addEventListener("scroll", () => {
    const sliderHeight = slider.scrollHeight;
    const cardHeight = allCards[0].clientHeight;
    const visibleHeight = slider.clientHeight;

    if (slider.scrollTop <= 0) {
      slider.scrollTop =
        sliderHeight - visibleHeight - cardHeight * cards.length;
    } else if (slider.scrollTop + visibleHeight >= sliderHeight) {
      slider.scrollTop = cardHeight * cards.length;
    }

    const sliderMiddle =
      slider.getBoundingClientRect().top + slider.clientHeight / 2;

    let closestCard = null;
    let closestDistance = Number.POSITIVE_INFINITY;

    allCards.forEach((card) => {
      const cardMiddle =
        card.getBoundingClientRect().top + card.clientHeight / 2;
      const distance = Math.abs(cardMiddle - sliderMiddle);

      if (distance < closestDistance) {
        closestCard = card;
        closestDistance = distance;
      }
    });

    allCards.forEach((card) => card.classList.remove("active"));
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
