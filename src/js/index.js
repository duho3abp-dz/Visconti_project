'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // -------------------------Slide-Pen-------------------------//
    const slidePen = (classPen) => {
        const pen = document.querySelector(classPen);
        
        pen.style.left = `50%`;
    }

    // -------------------------Full-Page-Scroll-------------------------//
    const fullPageScroll = ({
        sliderClass,
        wrapperClass, 
        sectionsAll, 
        headerLink, 
        footerLink, 
        active,
        penClasses
    }) => {
        const wrapper = document.querySelector(wrapperClass),
              sections = document.querySelectorAll(sectionsAll),
              headerLinks = document.querySelectorAll(headerLink),
              footerLinks = document.querySelectorAll(footerLink);

        let index = 0;

        const startAnimationSlidePen = () => {
            const [ black, white, blue ] = penClasses;

            switch (index) {
                case 2:
                    slidePen(black);
                    break;
                case 3:
                    slidePen(white);
                    break;
                case 4:
                    slidePen(blue);
                    break;
            
                default:
                    break;
            }
        };

        const changeSection = async () => {

            if (index >= 0 && index < sections.length - 1) {
                document.querySelector('.slider').style.overflow = 'hidden';
            }

            wrapper.style.top = `-${index * 100}%`;

            startAnimationSlidePen();
        
            await setTimeout(() => {
                sections.forEach((section, i) => {
                    if (index === i) {
                        sections.forEach(section => section.classList.remove(active));
                        section.classList.add(active);
                    }
                })
            }, 500);

            if (index === sections.length - 1) {
                window.removeEventListener('wheel', wheelSections);
                window.removeEventListener('keydown', keydownScrollSections);
                document.querySelector('.slider').style.overflow = 'auto';
            }
            
        };

        const wheelSections = (e) => {
            if (sections[index].classList.contains(active)) {
                if (+e.deltaY < -100) {
                    if (index > 0) {
                        index--;
                        changeSection();
                    }
                }
                if (+e.deltaY > 100) {
                    if (index < sections.length - 1) {
                        index++;
                        changeSection();
                    }
                }
            }
        };

        const keydownScrollSections = (e) => {
            if (e.keyCode === 38) {
                if (index > 0) {
                    index--;
                    changeSection();
                }
            }
            if (e.keyCode === 40) {
                if (index < sections.length - 1) {
                    index++;
                    changeSection();
                }
            }
        };

        const scrollLastSections = (e) => {
            if (+e.target.scrollTop === 0) {
                window.addEventListener('wheel', wheelSections);
                window.addEventListener('keydown', keydownScrollSections);        
            }
        };

        const addEventClinckForLinks = (links, footer) => links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault();

            window.addEventListener('wheel', wheelSections);
            window.addEventListener('keydown', keydownScrollSections);

            if (footer) { document.querySelector('.slider').scrollTop = 0 }
            
            index = +e.target.getAttribute('href');
            changeSection();
        }))

        document.body.style.cssText = `
            width: 100vw;
            height: 100vh;
            overflow: hidden;  
        `;
        document.querySelector(sliderClass).style.overflow = 'hidden';

        addEventClinckForLinks(headerLinks)

        document.querySelector('.slider').addEventListener('scroll', scrollLastSections);
        window.addEventListener('wheel', wheelSections);
        window.addEventListener('keydown', keydownScrollSections);

    };

    // -------------------------Slider-------------------------//
    const slider = ({
        wrapperClass, 
        slidesClass, 
        btnsPrevClass, 
        btnsNextClass,
        active, 
        non
    }) => {
        const wrapper = document.querySelector(wrapperClass),
              slides = document.querySelectorAll(slidesClass),
              btnsPrev = document.querySelectorAll(btnsPrevClass),
              btnsNext = document.querySelectorAll(btnsNextClass);

        let widthSlide, index;

        const createIndex = () => {
            slides.forEach((slide, i) => {
                if (slide.classList.contains(active)) {
                    index = i;
                }
            });
        };

        const setWidthSlide = (slide) => {
            const marginLeftComputed = +window.getComputedStyle(slide).marginLeft.replace(/px/, ''),
                  marginRightComputed = +window.getComputedStyle(slide).marginRight.replace(/px/, ''),
                  widthSlideComputed = +window.getComputedStyle(slide).width.replace(/px/, '');

            widthSlide = widthSlideComputed + marginRightComputed + marginLeftComputed;
        }

        const settingSliderParameters = () => {
            slides.forEach((slide, i) => {
                if (non) {
                    if(i === 0) {
                        btnsPrev[i].classList.add(non);
                    }
                    if(i === slides.length - 1) {
                        btnsNext[i].classList.add(non);
                    }
                }

                if (slide.classList.contains(active)) { index = i; }

                if (slide.classList.contains(active)) {
                    setWidthSlide(slide);
                }
            });
        };
        
        const changeSlide = (i) => {
            const shift =  i * widthSlide;

            wrapper.style.transform = `translateX(-${shift}px)`;
            slides.forEach((slide, ind) => {
                if (i === ind) {
                    slides.forEach(slide => slide.classList.remove(active));
                    slide.classList.add(active);
                }
            })
            
        };

        const addEventClick = (btns) => btns.forEach(btn => btn.addEventListener('click', e => {
            e.preventDefault();

            if (btn.classList.contains(btnsPrevClass.replace(/\./, ''))) {
                index--;
                if (index < 0) {
                    index = 0
                }
            }
            if (btn.classList.contains(btnsNextClass.replace(/\./, ''))) {
                index++;
                if (index > slides.length - 1) {
                    index = slides.length - 1
                }
                
            }
            
            changeSlide(index);
        }));

        createIndex();
        settingSliderParameters();
        addEventClick(btnsPrev);
        addEventClick(btnsNext);

    };

    // -------------------------Slider-Round-------------------------//
    const sliderRound = ({
        wrapperClass, 
        slidesClass, 
        btnsPrevClass, 
        btnsNextClass,
        active
    }) => {
        const wrapper = document.querySelector(wrapperClass),
              slides = document.querySelectorAll(slidesClass),
              btnPrev = document.querySelector(btnsPrevClass),
              btnNext = document.querySelector(btnsNextClass);

        let index,
            wrapperWidth,
            widthSlide,
            next = 0,
            prev = slides.length - 1;

        const createIndex = () => {
            const slides = document.querySelectorAll(slidesClass);
            slides.forEach((slide, i) => {
                if (slide.classList.contains(active)) {
                    index = i;
                }
            });
        };

        const setWidthSlide = (slide) => {
            const marginLeftComputed = +window.getComputedStyle(slide).marginLeft.replace(/px/, ''),
                  marginRightComputed = +window.getComputedStyle(slide).marginRight.replace(/px/, ''),
                  widthSlideComputed = +window.getComputedStyle(slide).width.replace(/px/, '');

            widthSlide = widthSlideComputed + marginRightComputed + marginLeftComputed;
        }

        const deleteSlide = (side) => {
            const slides = document.querySelectorAll(slidesClass);

            if(side === 'prev') {
                slides[slides.length - 1].remove();
            }
            if(side === 'next') {
                slides[0].remove();
            }
        };

        const createSlide = (side) => {
            const newPreSlide = document.createElement('div');

            if(side === 'prev') {
                newPreSlide.classList.add(...slides[prev].classList);
                newPreSlide.innerHTML = slides[prev].innerHTML;        

                prev--;
                if (prev < 0) {
                    prev = slides.length - 1;
                }
            }
            if(side === 'next') {
                newPreSlide.classList.add(...slides[next].classList);
                newPreSlide.innerHTML = slides[next].innerHTML;                

                next++;
                if (next >= slides.length) {
                    next = 0;
                }
            }

            return newPreSlide;
        };

        const addSlide = (side) => {
            wrapper.style.transition = 'unset';
            if (side === 'prev') {
                wrapper.style.transform = `translateX(-${(wrapperWidth / 2) + widthSlide}px)`;
                wrapper.prepend(createSlide(side));
                deleteSlide(side);
            }
            if (side === 'next') {
                wrapper.style.transform = `translateX(-${(wrapperWidth / 2) - widthSlide}px)`;
                wrapper.append(createSlide(side));
                deleteSlide(side);
            }
        };

        const changeSlide = () => {
            wrapperWidth = +window.getComputedStyle(document.querySelector(wrapperClass)).width.replace(/px/, '');

            wrapper.style.transition = '0.5s';
            wrapper.style.transform = `translateX(-${ wrapperWidth / 2 }px)`;

            document.querySelectorAll(slidesClass).forEach((slide, i) => {
                if (i === index) {
                    document.querySelectorAll(slidesClass).forEach(slide => slide.classList.remove(active));
                    slide.classList.add(active);
                }
            });
        };

        const addEventClick = (btn) => btn.addEventListener('click', e => {
            e.preventDefault();

            if (btn.classList.contains(btnsPrevClass.replace(/\./, ''))) {
                addSlide('prev');
                changeSlide();
            }
            if (btn.classList.contains(btnsNextClass.replace(/\./, ''))) {
                addSlide('next');
                changeSlide();
            }
        });

        wrapperWidth = +window.getComputedStyle(document.querySelector(wrapperClass)).width.replace(/px/, '');
        document.querySelectorAll(slidesClass).forEach(slide => !slide.classList.contains(active) ? setWidthSlide(slide) : null );

        createIndex();
        addEventClick(btnPrev);
        addEventClick(btnNext);

    };

    // -------------------------Start-Scripts-------------------------//

    if (window.innerWidth > 1024) {

        document.querySelector('.pen--black').style.left = '110%';
        document.querySelector('.pen--blue').style.left = '110%';
        document.querySelector('.pen--white').style.left = '-10%';

        fullPageScroll({
            sliderClass: '.slider',
            wrapperClass: '.wrapper',
            sectionsAll: 'section',
            headerLink: '.header__link',
            footerLink: '.footer__list--white',
            active: 'section--active',
            penClasses: [
                '.pen--black',
                '.pen--white',
                '.pen--blue',
            ]
        });
        
    }
    

    slider({
        wrapperClass: '.sixth-section__slider--wrapper',
        slidesClass: '.sixth-section__slide',
        btnsPrevClass: '.sixth-section__prev',
        btnsNextClass: '.sixth-section__next',
        active: 'sixth-section__slide--active',
        non: 'sixth-section--non'
    });

    sliderRound({
        wrapperClass: '.seventh-section__wrapper',
        slidesClass: '.seventh-section__slide',
        btnsPrevClass: '.seventh-section__prev',
        btnsNextClass: '.seventh-section__next',
        active: 'seventh-section__slide--active'
    });

    sliderRound({
        wrapperClass: '.eighth-section__wrapper',
        slidesClass: '.eighth-section__slide',
        btnsPrevClass: '.eighth-section__prev--prev',
        btnsNextClass: '.eighth-section__next',
        active: 'eighth-section__slide--active'
    });

});