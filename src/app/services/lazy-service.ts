export class LazyService {

    static ImgLazyLoad(doc) {
        const winH = window.innerHeight;
        let lazyImages = [];
        let lazyBgs = [];

        if (document.querySelector('.section-content')) {
            lazyImages = window.innerWidth > 1100 ? doc.nativeElement.querySelectorAll('.cmPic.lazy') :
                doc.nativeElement.querySelectorAll('.current .cmPic.lazy');

            lazyBgs = window.innerWidth > 1100 ? doc.nativeElement.querySelectorAll('.cmBg.lazy') :
                doc.nativeElement.querySelectorAll('.current .cmBg.lazy');
        } else {
            lazyImages = doc.nativeElement.querySelectorAll('.cmPic.lazy');
            lazyBgs = doc.nativeElement.querySelectorAll('.cmBg.lazy');
        }

        [].slice.call(lazyImages).forEach((elm) => {
            if (elm.getBoundingClientRect().top <= winH + 250) {
                const src = elm.getAttribute('data-src');
                elm.setAttribute('src', src);
                elm.classList.remove('lazy');
            }
        });

        [].slice.call(lazyBgs).forEach((elm) => {
            if (elm.getBoundingClientRect().top <= winH + 250) {
                const src = elm.getAttribute('data-src');
                elm.style.backgroundImage = 'url(' + src + ')';
                elm.classList.remove('lazy');
            }
        });
    }


}
