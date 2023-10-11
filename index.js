const DOMSelectors = {
    form: document.getElementById("rgbInput"),
    red: document.getElementById("red"),
    green: document.getElementById("green"),
    blue: document.getElementById("blue"),
}

DOMSelectors.form.addEventListener('submit', function(e){
    e.preventDefault();
    const color = {
        red: DOMSelectors.red.value,
        green: DOMSelectors.green.value,
        blue: DOMSelectors.blue.value
    }
    
});