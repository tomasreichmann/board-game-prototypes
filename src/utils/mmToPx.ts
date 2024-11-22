const mmElement = document.createElement("div");
mmElement.style.width = "10000mm";
document.body.appendChild(mmElement);
const mmWidth = mmElement.offsetWidth / 10000;
document.body.removeChild(mmElement);

export default function mmToPx(mm: number) {
    return mmWidth * mm;
}
/*
const getDeviceDPI = () => {
    return (window.devicePixelRatio || 1) * 72;
};
export default function mmToPx(mm: number, dpi = getDeviceDPI()) {
    return (mm * dpi) / 25.4;
} */
