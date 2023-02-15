(() => {
    const pswp = document.querySelector(".pswp");

    /**
     * @type {NodeListOf<HTMLImageElement>}
     */
    const elements = document.querySelectorAll("img.item-show");

    const elementsArray = [...elements];

    const waitForLoad = x => new Promise((rs, rj) => {
        if (x.complete) {
            rs();
            return;
        }
        x.addEventListener("load", () => rs());
        x.addEventListener("error", e => rj(e));
    });

    Promise.all(elementsArray.map(x => x.complete ? Promise.resolve() : waitForLoad(x).catch(y => console.error(x, y)))).then(() => {
        const galleryItems = elementsArray.map(x => ({
            src: x.src,
            w: x.naturalWidth,
            h: x.naturalHeight,
            title: x.alt
        }));

        let gallery;

        elementsArray.forEach((x, i) => {
            x.addEventListener("click", () => {
                gallery = new PhotoSwipe(pswp, PhotoSwipeUI_Default, galleryItems, { index: i });
                gallery.init();
            });
        });
    });
})()