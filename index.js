function insertRGBBox(rgb) {
    const rgbBox = document.createElement("div");
    rgbBox.classList.add("rgb-box");
    rgbBox.style.backgroundColor = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
    DOMSelectors.container[0].appendChild(rgbBox);
}

const DOMSelectors = {
    form: document.getElementById("rgbInput"),
    red: document.getElementById("red"),
    green: document.getElementById("green"),
    blue: document.getElementById("blue"),
    container: document.getElementsByClassName("container"),
}

DOMSelectors.form.addEventListener('submit', function(e){
    e.preventDefault();
    
    const color = {
        red: DOMSelectors.red.value,
        green: DOMSelectors.green.value,
        blue: DOMSelectors.blue.value
    }
    console.log(`RGB entered: ${color.red}, ${color.green}, ${color.blue}`)
    console.log(DOMSelectors.container)
    insertRGBBox(color);
    DOMSelectors.form.reset();
});