function insertRGBBox(rgb) {
  if (checkInput(rgb.red) && checkInput(rgb.green) && checkInput(rgb.blue)) {
    const rgbBox = addBoxContents(rgb);
    rgbBox.style.backgroundColor = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
    DOMSelectors.container[0].appendChild(rgbBox);
  } else {
    alert("Please enter a number between 0 and 255");
  }
}

function checkInput(input) {
  if (input >= 0 && input <= 255) {
    return true;
  }
  return false;
}

function createBox() {
  const rgbBox = document.createElement("div");
  rgbBox.classList.add("rgb-box");
  return rgbBox;
}

function rgbTextContent(rgb) {
  const list = [rgb.red, rgb.green, rgb.blue];
  const newList = []
  list.forEach((color) => {
    if (color === '') {
      newList.push('0');
    } else {
      newList.push(color);
    }
  })
  return `RGB: ${newList.join(', ')}`;
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

function addBoxContents(rgb) {
  const box = createBox();
  const rgbText = document.createElement("p");
  const rgbButton = document.createElement("button");
  const boxNumber = document.createElement("p");
  rgbText.classList.add("rgb-text");
  rgbText.textContent = rgbTextContent(rgb);
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
};

DOMSelectors.inputform.addEventListener("submit", function (e) {
  e.preventDefault();

  const color = {
    red: DOMSelectors.red.value,
    green: DOMSelectors.green.value,
    blue: DOMSelectors.blue.value,
  };
  console.log(`RGB entered: ${color.red}, ${color.green}, ${color.blue}`);
  console.log(DOMSelectors.container);
  insertRGBBox(color);
  DOMSelectors.inputform.reset();
});
