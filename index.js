/* bla bla explanation
 * afsasfaf
 */

function createEmbed(url, title, description, alias, imageUrl) {
  const container = document.getElementById("embed-container");
  if (!container) {
    console.warn("No #embed-container found in HTML.");
    return;
  }

  container.innerHTML = "";

  const embed = document.createElement("div");
  embed.className = "embed";

  embed.innerHTML = `
    <img class="embed-image" src="${imageUrl}" alt="Preview"/>
    <div class="embed-content">
      <h3 class="embed-title">${title}</h3>
      <p class="embed-description">${description}</p>
      <span class="embed-alias">${alias}</span><br>
      <a href="${url}" target="_blank">${url}</a>
    </div>
  `;

  container.appendChild(embed);
}

document.addEventListener("paste", (event) => {
  const pastedText = event.clipboardData.getData("text");
  if (pastedText.startsWith("http")) {
    createEmbed(
      pastedText,
      "SO;R September Newsletter",
      "This is my winter arc.. -dvwarrior",
      "EmptyWer69 (I LIED IT'S ME.)",
      "https://toby.fangamer.com/assets/images/social-mail.png"
    );
  }
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
    const typedText = target.value.trim();
    if (typedText.startsWith("http")) {
      createEmbed(
        typedText,
        "SO;R September Newsletter",
        "This is my winter arc.. -dvwarrior",
        "EmptyWer69 (I LIED IT'S ME.)",
        "https://toby.fangamer.com/assets/images/social-mail.png"
      );
    }
  }
});

let configBoxHidden = true;

function handleTgConfigs() {
  configBoxHidden = !configBoxHidden;
  const CONFIG_BOX = document.getElementById("config-box");
  CONFIG_BOX.hidden = configBoxHidden;
}

function hideThing(thing, cb) {
  thing.hidden = !cb.checked;
}

function handleTgSub(cb) {
  hideThing(document.getElementById("subtitle"), cb);
}

function handleTgDate(cb) {
  const THING = document.getElementById("date");
  hideThing(THING, cb);

  const SUB = document.getElementById("subtitle");
  SUB.style["margin-bottom"] = THING.hidden ? "128px" : "0px";
}

function handleTgBfBody(cb) {
  hideThing(document.getElementById("bf-body"), cb);
}

function handleTgImage(cb) {
  hideThing(document.getElementById("image-change"), cb);
}

function handleTgImageSub(cb) {
  hideThing(document.getElementById("image-sub"), cb);
}

function handleTgAfBody(cb) {
  hideThing(document.getElementById("af-body"), cb);
}

function handleTgCredits(cb) {
  hideThing(document.getElementById("about"), cb);
}

function isEmpty(mut) {
  let target = document.querySelector(".body");
  if (target.textContent === "") {
    target.innerHTML = "";
  }
}

function setUpMutations(mut) {
  mut.forEach(isEmpty);
}

const OBSERVER = new MutationObserver(setUpMutations);
const CONFIG = { attributes: true, childList: true, characterData: true };
OBSERVER.observe(document.querySelector(".body"), CONFIG);

function changeImage() {
  const INPUT = document.getElementById("file-input");
  INPUT.setAttribute("accept", "image/*");

  INPUT.onchange = _ => {
    const IMG = new Image();

    IMG.onload = function() {
      if (this.width <= 320 && this.height <= 320) {
        document.getElementById("image").setAttribute("image-rendering", "pixelated");
      } else {
        document.getElementById("image").setAttribute("image-rendering", "auto");
      }
    };

    if (!INPUT.files[0].type.includes("image/")) {
      alert("Select an image, please!");
      return;
    }

    IMG.src = URL.createObjectURL(INPUT.files[0]);
    document.getElementById("image").src = IMG.src;
  };

  INPUT.click();
}
