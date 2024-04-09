export default function openImageInNewTab(url: string) {
    const tabRef = window.open("about:blank");
    const image = new Image();
    image.src = url;
    setTimeout(function () {
        if (tabRef) {
            tabRef.document.getElementsByTagName("body")[0].innerHTML = image.outerHTML;
        }
    }, 0);
}
