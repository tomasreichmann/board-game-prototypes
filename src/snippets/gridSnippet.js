/* Open an image in a new tab, paste this in the console, hit ENTER */
(() => {
    let size = 70; // in pixels
    let opacity = 0.5;
    let lineWidth = 4; // in percents of size
    const getGridStyle = () => `
background-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) ${100 - lineWidth}%, rgba(0,0,0,${opacity}) ${
        100 - lineWidth
    }%), linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) ${100 - lineWidth}%, rgba(0,0,0,${opacity}) ${
        100 - lineWidth
    }%);
background-position: right bottom, left top;
background-repeat: repeat, repeat;
background-size: ${size}px ${size}px, ${size}px ${size}px;
position: fixed;
left: 0;
top: 0;
width: 100vw;
height: 100vh;
`;

    const oldGrid = document.getElementById("grid");
    if (oldGrid) {
        oldGrid.remove();
    }
    const gridElement = document.createElement("div");
    gridElement.id = "grid";
    const refreshGridStyle = () => {
        gridElement.style = getGridStyle();
    };
    refreshGridStyle();
    const sizeSlider = document.createElement("input");
    sizeSlider.type = "range";
    sizeSlider.min = 1;
    sizeSlider.max = 300;
    sizeSlider.value = size;

    sizeSlider.oninput = (event) => {
        size = Number(event.target.value);
        refreshGridStyle();
    };
    gridElement.appendChild(sizeSlider);
    document.body.append(gridElement);
})();
