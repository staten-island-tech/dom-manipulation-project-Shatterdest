function insertRGBBox(rawRGB) {
  const rgb = validRGB(rawRGB);
  console.log(rgb)
  DOMSelectors.inputform.reset();
  const rgbBox = boxContents(rgb);
  rgbBox.style.backgroundColor = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
  DOMSelectors.container[0].appendChild(rgbBox);
}

function isInteger(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function validRGB(rgb) {
  console.log(`checking rgb: ${rgb.red}, ${rgb.green}, ${rgb.blue}`);
  try {
    rgb = blankRGB(rgb);
    intRGB = [parseInt(rgb.red), parseInt(rgb.green), parseInt(rgb.blue)];
    console.log(`parsed RGB values: ${intRGB}`)
    intRGB.forEach((color) => {
      if (color > 255 || color < 0 || !isInteger(color)) {
        throw "Invalid RGB value";
      }
    })
    return { red: intRGB[0], green: intRGB[1], blue: intRGB[2] }
  } catch {
    console.log("Invalid RGB value" + { red: "", green: "", blue: "" });
    DOMSelectors.error.textContent = "Invalid RGB value";
  }
}
function createBox() {
  const rgbBox = document.createElement("div");
  rgbBox.classList.add("rgb-box");
  return rgbBox;
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

function delButton(rgbButton, box) {
  rgbButton.addEventListener("click", function () {
    box.remove();
    const boxNumbers = document.getElementsByClassName("box-number");
    for (let i = 0; i < boxNumbers.length; i++) {
      boxNumbers[i].textContent = `Box #${i + 1}`;
    }
  });
}

function boxContents(rgb) {
  const box = createBox();
  const rgbText = document.createElement("p");
  const rgbButton = document.createElement("button");
  const boxNumber = document.createElement("p");
  rgbText.classList.add("rgb-text");
  rgbText.textContent = `RGB: ${rgb.red}, ${rgb.green}, ${rgb.blue}`;
  rgbButton.classList.add("rgb-button");
  rgbButton.textContent = "Delete Box";
  delButton(rgbButton, box);
  boxNumber.classList.add("box-number");
  boxNumber.textContent = `Box #${DOMSelectors.container[0].childElementCount + 1
    }`;
  box.appendChild(boxNumber);
  box.appendChild(rgbText);
  box.appendChild(rgbButton);
  return box;
}

const DOMSelectors = {
  inputform: document.getElementById("rgbInput"),
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
  container: document.getElementsByClassName("container"),
  error: document.getElementById("error"),
};

DOMSelectors.inputform.addEventListener("submit", function (e) {
  e.preventDefault();
  DOMSelectors.error.textContent = '';
  const color = {
    red: DOMSelectors.red.value,
    green: DOMSelectors.green.value,
    blue: DOMSelectors.blue.value,
  };
  console.log(`RGB entered: ${color.red}, ${color.green}, ${color.blue}`);
  console.log(DOMSelectors.container);
  insertRGBBox(color);
});
