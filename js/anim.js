// Wrap every letter in a span
var textWrapper = document.querySelector('.ml__16');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter__16'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml__16 .letter__16',
    translateY: [-100,0],
    easing: "easeOutExpo",
    duration: 1400,
    delay: (el, i) => 30 * i
  }).add({
    targets: '.ml__16',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });