// Navigation class must be defined before Slideshow class
class Navigation {
    constructor(el, settings) {
        if (!el) {
            throw new Error('Navigation element is required');
        }

        this.DOM = { el: el };

        this.settings = {
            next: () => false,
            prev: () => false,
            toggleAutoPlay: () => false
        };
        Object.assign(this.settings, settings);

        // Initialize pagination
        this.DOM.pagination = {
            current: this.DOM.el.querySelector('.boxnav__label--current'),
            total: this.DOM.el.querySelector('.boxnav__label--total')
        };
    }

    setCurrent(val, direction) {
        if (!this.DOM.pagination.current) return;

        TweenMax.to(this.DOM.pagination.current, 0.4, {
            ease: 'Back.easeIn',
            y: direction === 'right' ? '-100%' : '100%',
            opacity: 0,
            onComplete: () => {
                this.DOM.pagination.current.innerHTML = val;
                TweenMax.to(this.DOM.pagination.current, 0.8, {
                    ease: 'Expo.easeOut',
                    startAt: { y: direction === 'right' ? '50%' : '-50%', opacity: 0 },
                    y: '0%',
                    opacity: 1
                });
            }
        });
    }

    setTotal(val) {
        if (this.DOM.pagination.total) {
            this.DOM.pagination.total.innerHTML = val;
        }
    }
}

// Slide class
class Slide {
    constructor(el, settings) {
        this.DOM = { el: el };
        this.settings = {
            detailsEl: null,
            onHideDetails: () => false
        };
        Object.assign(this.settings, settings);

        this.DOM.wrap = this.DOM.el.querySelector('.slide__wrap');
        this.DOM.img = this.DOM.wrap.querySelector('.slide__img');
        this.DOM.titleWrap = this.DOM.wrap.querySelector('.slide__title-wrap');

        this.config = {
            animation: {
                duration: 1.2,
                ease: Expo.easeInOut
            }
        };
    }

    setCurrent(isCurrent = true) {
        this.DOM.el.classList[isCurrent ? 'add' : 'remove']('slide--current');
    }

    hide(direction) {
        return this.toggle('hide', direction);
    }

    show(direction) {
        this.DOM.el.style.zIndex = 1000;
        return this.toggle('show', direction);
    }

    toggle(action, direction) {
        return new Promise((resolve) => {
            if (action === 'show') {
                TweenMax.to(this.DOM.wrap, this.config.animation.duration, {
                    ease: this.config.animation.ease,
                    startAt: { x: direction === 'right' ? '100%' : '-100%' },
                    x: '0%'
                });

                TweenMax.to(this.DOM.titleWrap, this.config.animation.duration, {
                    ease: this.config.animation.ease,
                    startAt: { x: direction === 'right' ? '-100%' : '100%' },
                    x: '0%'
                });
            }

            TweenMax.to(this.DOM.img, this.config.animation.duration, {
                ease: this.config.animation.ease,
                startAt: action === 'hide' ? {} : { x: direction === 'right' ? '-100%' : '100%', scale: 1.1 },
                x: '0%',
                scale: action === 'hide' ? 1.1 : 1,
                onStart: () => {
                    this.DOM.img.style.transformOrigin = action === 'hide' ?
                        direction === 'right' ? '100% 50%' : '0% 50%' :
                        direction === 'right' ? '0% 50%' : '100% 50%';
                    this.DOM.el.style.opacity = 1;
                },
                onComplete: () => {
                    this.DOM.el.style.zIndex = 999;
                    this.DOM.el.style.opacity = action === 'hide' ? 0 : 1;
                    resolve();
                }
            });
        });
    }
}

// Slideshow class
class Slideshow {
    constructor(el) {
        this.DOM = { el: el };
        this.isAnimating = false;
        this.current = 0;

        // Auto-play configuration
        this.autoPlayConfig = {
            enabled: true, // Auto-play enabled by default
            interval: 3000,
            timer: null
        };

        // Initialize slides
        this.slides = Array.from(this.DOM.el.querySelectorAll('.slide'))
            .map((slideEl, pos) => new Slide(slideEl));

        this.slidesTotal = this.slides.length;

        if (this.slidesTotal > 0) {
            this.init();
        }
    }

    init() {
        this.slides[this.current].setCurrent();
        this.startAutoPlay();
    }

    startAutoPlay() {
        if (this.autoPlayConfig.timer) {
            clearInterval(this.autoPlayConfig.timer);
        }

        this.autoPlayConfig.timer = setInterval(() => {
            if (!this.isAnimating) {
                this.navigate('right');
            }
        }, this.autoPlayConfig.interval);
    }

    navigate(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        const nextSlidePos = direction === 'right' ?
            (this.current + 1) % this.slidesTotal :
            (this.current - 1 + this.slidesTotal) % this.slidesTotal;

        Promise.all([
            this.slides[this.current].hide(direction),
            this.slides[nextSlidePos].show(direction)
        ]).then(() => {
            this.slides[this.current].setCurrent(false);
            this.current = nextSlidePos;
            this.slides[this.current].setCurrent();
            this.isAnimating = false;
        });
    }
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
    const slideshowEl = document.querySelector('.slideshow');
    if (slideshowEl) {
        new Slideshow(slideshowEl);
    }
});
