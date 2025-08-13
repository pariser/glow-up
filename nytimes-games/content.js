let shouldChangeStyle = (url) =>
  ["www.nytimes.com/crosswords", "www.nytimes.com/puzzles"].some(
    (website) =>
      url.startsWith(`http://${website}`) ||
      url.startsWith(`https://${website}`)
  );

let changeStyle =
  !!document.body && !!document.URL && shouldChangeStyle(document.URL);

console.log(`NYT Style Override Extension Running, changeStyle=${changeStyle}`);

// For the specific crossword app
if (changeStyle) {
  [
    // "Header-headerBuffer",
    // "AlternatePuzzles",
    // "SubGameplayGrid",
    ".pz-footer",
    ".pz-ad-box",
    "#portal-editorial-content",
    "#js-mobile-toolbar",
    "#js-logo-nav",
  ].forEach((querySelector) => {
    document.querySelectorAll(querySelector).forEach((el) => {
      console.log("Hiding element", el);
      el.style.display = "none";
    });
  });

  document.querySelectorAll(".pz-header,.pz-nav").forEach((el) => {
    console.log("Styling title bar, element:", el);
    el.style.width = "45px";
    el.style.overflow = "hidden";
    el.style.position = "fixed";
    el.style.paddingRight = "0";
  });

  document.querySelectorAll(".pz-game-title-bar").forEach((el) => {
    console.log("Styling crossword title element", el);
    el.style.paddingTop = "0";
  });

  document.querySelectorAll(".xwd__header--row").forEach((el) => {
    console.log("Styling crossword print button element", el);
    el.style.alignItems = "start";
  });

  document.querySelectorAll("#portal-game-header").forEach((el) => {
    console.log("Styling spelling bee title element", el);
    el.style.paddingLeft = "20px";
  });

  // document.querySelectorAll(".top-sale-banner").forEach((el) => {
  //   console.log("Removing sale banner", el);
  //   el.parentElement.remove();
  // });

  document.querySelectorAll(".top-sale-banner-spacing").forEach((el) => {
    console.log("Top sale banner spacing", el);
    el.style.marginTop = "auto";
  });

  // document.querySelectorAll('#js-global-nav').forEach((el) => {
  //   console.log("Styling nav element", el);
  //   el.style.
  // });
}
