function insertRGBBox(rawRGB) {
  const rgb = validRGB(rawRGB);
  console.log(rgb);
  DOMSelectors.inputform.reset();
  DOMSelectors.container[0].insertAdjacentHTML(
    "beforeend",
    `<div class="rgb-box" style="background-color: rgb(${rgb.red}, ${
      rgb.green
    }, ${rgb.blue});"><p class="box-number">Box #${
      DOMSelectors.container[0].childElementCount + 1
    }</p><p class="rgb-text">RGB: ${rgb.red}, ${rgb.green}, ${
      rgb.blue
    }</p><button class="rgb-button">Delete Box</button></div>`
  );
}

function isInteger(value) {
  return (
    !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10))
  );
}

function validRGB(rgb) {
  console.log(`checking rgb: ${rgb.red}, ${rgb.green}, ${rgb.blue}`);
  try {
    rgb = blankRGB(rgb);
    intRGB = [parseInt(rgb.red), parseInt(rgb.green), parseInt(rgb.blue)];
    console.log(`parsed RGB values: ${intRGB}`);
    intRGB.forEach((color) => {
      if (color > 255 || color < 0 || !isInteger(color)) {
        throw "Invalid RGB value";
      }
    });
    return { red: intRGB[0], green: intRGB[1], blue: intRGB[2] };
  } catch {
    console.log("Invalid RGB value" + { red: "", green: "", blue: "" });
    DOMSelectors.error.textContent = "Invalid RGB value";
  }
}

function blankRGB(rgb) {
  const list = [rgb.red, rgb.green, rgb.blue];
  const newList = [];
  list.forEach((color) => {
    if (color === "") {
      newList.push("0");
    } else {
      newList.push(color);
    }
  });
  return {
    red: newList[0],
    green: newList[1],
    blue: newList[2],
  };
}

function delButton(input) {
  const buttons = Array.from(input);
  console.log(buttons)
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      button.parentElement.remove();
      const boxNumbers = document.getElementsByClassName("box-number");
      for (let i = 0; i < boxNumbers.length; i++) {
        boxNumbers[i].textContent = `Box #${i + 1}`;
      }
    });
  });
}

function getColor(dom) {
  return {
    red: dom.red.value,
    green: dom.green.value,
    blue: dom.blue.value,
  };
}

const DOMSelectors = {
  inputform: document.getElementById("rgbInput"),
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
  container: document.getElementsByClassName("container"),
  error: document.getElementById("error"),
  buttons: document.getElementsByClassName("rgb-button"),
};

DOMSelectors.inputform.addEventListener("submit", function (e) {
  e.preventDefault();
  DOMSelectors.error.textContent = "";
  const color = getColor(DOMSelectors);
  console.log(`RGB entered: ${color.red}, ${color.green}, ${color.blue}`);
  console.log(DOMSelectors.container);
  insertRGBBox(color);
  delButton(DOMSelectors.buttons);
});
