let shouldChangeStyle = (url) =>
  ["www.dndbeyond.com/characters/"].some(
    (website) =>
      url.startsWith(`http://${website}`) ||
      url.startsWith(`https://${website}`)
  );

let changeStyle =
  !!document.body && !!document.URL && shouldChangeStyle(document.URL);

console.log(
  `D&D Beyond Style Override Extension Running, changeStyle=${changeStyle}`
);

// For the specific crossword app
if (changeStyle) {
  [".header-wrapper"].forEach((querySelector) => {
    document.querySelectorAll(querySelector).forEach((el) => {
      console.log("Hiding element", el);
      el.style.display = "none";
    });
  });

  let done = false;
  let interval = null;

  stopPolling = () => {
    done = true;

    if (interval) {
      clearInterval(interval);
      interval = null;
    }

    return null;
  };

  setInterval(() => {
    if (done) {
      return stopPolling();
    }

    if (document.querySelectorAll(".ct-character-sheet").length === 0) {
      // console.log("Still waiting for '.ct-character-sheet' to load");
      return;
    }

    stopPolling();
    console.log("Found '.ct-character-sheet'");

    const siteMain = document.getElementById("site-main");
    siteMain.classList.add("no-top-padding");

    const site = document.getElementById("site");
    site.classList.add("really-fix-background-top");

    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      @media (max-width: 1023px) {
          #site-main.no-top-padding {
              padding-top: 0 !important;
          }
      }

      @media (min-width: 768px) {
        html body.body-rpgcharacter-sheet.really-fix-background-top {
          background: url(https://www.dndbeyond.com/avatars/43993/216/638609651459074281.jpeg) no-repeat center 105px, url(https://www.dndbeyond.com/attachments/0/84/background_texture.png) #f9f9f9 !important;
        }
      }
      @media (min-width: 1024px) {
        html body.body-rpgcharacter-sheet.really-fix-background-top {
          background: url(https://www.dndbeyond.com/avatars/43993/216/638609651459074281.jpeg) no-repeat center 105px, url(https://www.dndbeyond.com/attachments/0/84/background_texture.png) #f9f9f9 !important;
        }
      }
      @media (min-width: 1200px) {
        html body.body-rpgcharacter-sheet.really-fix-background-top {
          background: url(https://www.dndbeyond.com/avatars/43993/216/638609651459074281.jpeg) no-repeat center 116px, url(https://www.dndbeyond.com/attachments/0/84/background_texture.png) #f9f9f9 !important;
        }
      }
      @media (min-width: 1921px) {
        html body.body-rpgcharacter-sheet.really-fix-background-top {
          background: url(https://www.dndbeyond.com/avatars/43993/217/638609651460604288.jpeg) no-repeat center 116px, url(https://www.dndbeyond.com/attachments/0/84/background_texture.png) #f9f9f9 !important;
        }
      }
      @media (min-width: 2561px) {
        html body.body-rpgcharacter-sheet.really-fix-background-top {
          background: url(https://www.dndbeyond.com/avatars/43993/218/638609651463184274.jpeg) no-repeat center 116px, url(https://www.dndbeyond.com/attachments/0/84/background_texture.png) #f9f9f9 !important;
        }
      }

      @media screen and (min-width: 1200px) {
        .ct-sidebar {
          top: 0 !important;
        }
      }
    `;

    console.log("Inserting", styleEl);
    site.parentElement.insertBefore(styleEl, site);
  }, 10);
}
