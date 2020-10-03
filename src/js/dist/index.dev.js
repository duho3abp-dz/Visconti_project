'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

window.addEventListener('DOMContentLoaded', function () {
  // -------------------------Slide-Pen-------------------------//
  var slidePen = function slidePen(classPen) {
    var pen = document.querySelector(classPen);
    pen.style.top = "50%";
  }; // -------------------------Full-Page-Scroll-------------------------//


  var fullPageScroll = function fullPageScroll(_ref) {
    var sliderClass = _ref.sliderClass,
        wrapperClass = _ref.wrapperClass,
        sectionsAll = _ref.sectionsAll,
        headerLink = _ref.headerLink,
        footerLink = _ref.footerLink,
        active = _ref.active,
        penClasses = _ref.penClasses;
    var wrapper = document.querySelector(wrapperClass),
        sections = document.querySelectorAll(sectionsAll),
        headerLinks = document.querySelectorAll(headerLink),
        footerLinks = document.querySelectorAll(footerLink);
    var index = 0;

    var startAnimationSlidePen = function startAnimationSlidePen() {
      var _penClasses = _slicedToArray(penClasses, 3),
          black = _penClasses[0],
          white = _penClasses[1],
          blue = _penClasses[2];

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

    var changeSection = function changeSection() {
      return regeneratorRuntime.async(function changeSection$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (index >= 0 && index < sections.length - 1) {
                document.querySelector('.slider').style.overflow = 'hidden';
              }

              wrapper.style.top = "-".concat(index * 100, "%");
              startAnimationSlidePen();
              _context.next = 5;
              return regeneratorRuntime.awrap(setTimeout(function () {
                sections.forEach(function (section, i) {
                  if (index === i) {
                    sections.forEach(function (section) {
                      return section.classList.remove(active);
                    });
                    section.classList.add(active);
                  }
                });
              }, 500));

            case 5:
              if (index === sections.length - 1) {
                window.removeEventListener('wheel', wheelSections);
                window.removeEventListener('keydown', keydownScrollSections);
                document.querySelector('.slider').style.overflow = 'auto';
              }

            case 6:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    var wheelSections = function wheelSections(e) {
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

    var keydownScrollSections = function keydownScrollSections(e) {
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

    var scrollLastSections = function scrollLastSections(e) {
      if (+e.target.scrollTop === 0) {
        window.addEventListener('wheel', wheelSections);
        window.addEventListener('keydown', keydownScrollSections);
      }
    };

    var addEventClinckForLinks = function addEventClinckForLinks(links, footer) {
      return links.forEach(function (link) {
        return link.addEventListener('click', function (e) {
          e.preventDefault();
          window.addEventListener('wheel', wheelSections);
          window.addEventListener('keydown', keydownScrollSections);

          if (footer) {
            document.querySelector('.slider').scrollTop = 0;
          }

          index = +e.target.getAttribute('href');
          changeSection();
        });
      });
    };

    document.body.style.cssText = "\n            width: 100vw;\n            height: 100vh;\n            overflow: hidden;  \n        ";
    document.querySelector(sliderClass).style.overflow = 'hidden';
    addEventClinckForLinks(headerLinks);
    document.querySelector('.slider').addEventListener('scroll', scrollLastSections);
    window.addEventListener('wheel', wheelSections);
    window.addEventListener('keydown', keydownScrollSections);
  }; // -------------------------Slider-------------------------//


  var slider = function slider(_ref2) {
    var wrapperClass = _ref2.wrapperClass,
        slidesClass = _ref2.slidesClass,
        btnsPrevClass = _ref2.btnsPrevClass,
        btnsNextClass = _ref2.btnsNextClass,
        active = _ref2.active,
        non = _ref2.non;
    var wrapper = document.querySelector(wrapperClass),
        slides = document.querySelectorAll(slidesClass),
        btnsPrev = document.querySelectorAll(btnsPrevClass),
        btnsNext = document.querySelectorAll(btnsNextClass);
    var widthSlide, index;

    var createIndex = function createIndex() {
      slides.forEach(function (slide, i) {
        if (slide.classList.contains(active)) {
          index = i;
        }
      });
    };

    var setWidthSlide = function setWidthSlide(slide) {
      var marginLeftComputed = +window.getComputedStyle(slide).marginLeft.replace(/px/, ''),
          marginRightComputed = +window.getComputedStyle(slide).marginRight.replace(/px/, ''),
          widthSlideComputed = +window.getComputedStyle(slide).width.replace(/px/, '');
      widthSlide = widthSlideComputed + marginRightComputed + marginLeftComputed;
    };

    var settingSliderParameters = function settingSliderParameters() {
      slides.forEach(function (slide, i) {
        if (non) {
          if (i === 0) {
            btnsPrev[i].classList.add(non);
          }

          if (i === slides.length - 1) {
            btnsNext[i].classList.add(non);
          }
        }

        if (slide.classList.contains(active)) {
          index = i;
        }

        if (slide.classList.contains(active)) {
          setWidthSlide(slide);
        }
      });
    };

    var changeSlide = function changeSlide(i) {
      var shift = i * widthSlide;
      wrapper.style.transform = "translateX(-".concat(shift, "px)");
      slides.forEach(function (slide, ind) {
        if (i === ind) {
          slides.forEach(function (slide) {
            return slide.classList.remove(active);
          });
          slide.classList.add(active);
        }
      });
    };

    var addEventClick = function addEventClick(btns) {
      return btns.forEach(function (btn) {
        return btn.addEventListener('click', function (e) {
          e.preventDefault();

          if (btn.classList.contains(btnsPrevClass.replace(/\./, ''))) {
            index--;

            if (index < 0) {
              index = 0;
            }
          }

          if (btn.classList.contains(btnsNextClass.replace(/\./, ''))) {
            index++;

            if (index > slides.length - 1) {
              index = slides.length - 1;
            }
          }

          changeSlide(index);
        });
      });
    };

    createIndex();
    settingSliderParameters();
    addEventClick(btnsPrev);
    addEventClick(btnsNext);
  }; // -------------------------Slider-Round-------------------------//


  var sliderRound = function sliderRound(_ref3) {
    var wrapperClass = _ref3.wrapperClass,
        slidesClass = _ref3.slidesClass,
        btnsPrevClass = _ref3.btnsPrevClass,
        btnsNextClass = _ref3.btnsNextClass,
        progressBarClass = _ref3.progressBarClass,
        progressLineClass = _ref3.progressLineClass,
        timeChangeSlide = _ref3.timeChangeSlide,
        active = _ref3.active;
    var wrapper = document.querySelector(wrapperClass),
        slides = document.querySelectorAll(slidesClass),
        btnPrev = document.querySelector(btnsPrevClass),
        btnNext = document.querySelector(btnsNextClass);
    var index,
        progressIndex,
        wrapperWidth,
        widthSlide,
        next = 0,
        prev = slides.length - 1;

    var createIndex = function createIndex() {
      var slides = document.querySelectorAll(slidesClass);
      slides.forEach(function (slide, i) {
        if (slide.classList.contains(active)) {
          index = i;

          if (progressBarClass) {
            progressIndex = i;
          }
        }
      });
    };

    var setWidthSlide = function setWidthSlide(slide) {
      var marginLeftComputed = +window.getComputedStyle(slide).marginLeft.replace(/px/, ''),
          marginRightComputed = +window.getComputedStyle(slide).marginRight.replace(/px/, ''),
          widthSlideComputed = +window.getComputedStyle(slide).width.replace(/px/, '');
      widthSlide = widthSlideComputed + marginRightComputed + marginLeftComputed;
    };

    var setProgress = function setProgress() {
      var progressLine = document.querySelector(progressLineClass);
      slides.forEach(function (slide, i) {
        if (progressIndex === i) {
          var progress = (i + 1) / slides.length * 100;
          progressLine.style.width = "".concat(progress, "%");
        }
      });
    };

    var changeProgressIndex = function changeProgressIndex(side) {
      switch (side) {
        case 'prev':
          if (progressIndex > 0) {
            progressIndex--;
          } else {
            progressIndex = slides.length - 1;
          }

          setProgress();
          break;

        case 'next':
          if (progressIndex < slides.length - 1) {
            progressIndex++;
          } else {
            progressIndex = 0;
          }

          setProgress();
          break;

        default:
          break;
      }
    };

    var createProgressBar = function createProgressBar() {
      var activeSlide = document.querySelector(".".concat(active)),
          activeSlideLeft = activeSlide.getBoundingClientRect().left;
      document.querySelector(progressBarClass).style.left = "".concat(activeSlideLeft, "px");
      setProgress();
    };

    var deleteSlide = function deleteSlide(side) {
      var slides = document.querySelectorAll(slidesClass);

      if (side === 'prev') {
        slides[slides.length - 1].remove();
      }

      if (side === 'next') {
        slides[0].remove();
      }
    };

    var createSlide = function createSlide(side) {
      var newPreSlide = document.createElement('div');

      if (side === 'prev') {
        var _newPreSlide$classLis;

        (_newPreSlide$classLis = newPreSlide.classList).add.apply(_newPreSlide$classLis, _toConsumableArray(slides[prev].classList));

        newPreSlide.innerHTML = slides[prev].innerHTML;
        prev--;

        if (prev < 0) {
          prev = slides.length - 1;
        }
      }

      if (side === 'next') {
        var _newPreSlide$classLis2;

        (_newPreSlide$classLis2 = newPreSlide.classList).add.apply(_newPreSlide$classLis2, _toConsumableArray(slides[next].classList));

        newPreSlide.innerHTML = slides[next].innerHTML;
        next++;

        if (next >= slides.length) {
          next = 0;
        }
      }

      return newPreSlide;
    };

    var addSlide = function addSlide(side) {
      wrapper.style.transition = 'unset';

      if (side === 'prev') {
        wrapper.style.transform = "translateX(-".concat(wrapperWidth / 2 + widthSlide, "px)");
        wrapper.prepend(createSlide(side));
        deleteSlide(side);
      }

      if (side === 'next') {
        wrapper.style.transform = "translateX(-".concat(wrapperWidth / 2 - widthSlide, "px)");
        wrapper.append(createSlide(side));
        deleteSlide(side);
      }
    };

    var changeSlide = function changeSlide() {
      wrapperWidth = +window.getComputedStyle(document.querySelector(wrapperClass)).width.replace(/px/, '');
      wrapper.style.transition = '0.5s';
      wrapper.style.transform = "translateX(-".concat(wrapperWidth / 2, "px)");
      document.querySelectorAll(slidesClass).forEach(function (slide, i) {
        if (i === index) {
          document.querySelectorAll(slidesClass).forEach(function (slide) {
            return slide.classList.remove(active);
          });
          slide.classList.add(active);
        }
      });
    };

    var startIntervalAutoSlide = function startIntervalAutoSlide() {
      addSlide('next');
      changeSlide();

      if (progressBarClass) {
        changeProgressIndex('next');
      }
    };

    var addEventClick = function addEventClick(btn) {
      return btn.addEventListener('click', function (e) {
        e.preventDefault();

        if (btn.classList.contains(btnsPrevClass.replace(/\./, ''))) {
          addSlide('prev');
          changeSlide();

          if (progressBarClass) {
            changeProgressIndex('prev');
          }
        }

        if (btn.classList.contains(btnsNextClass.replace(/\./, ''))) {
          addSlide('next');
          changeSlide();

          if (progressBarClass) {
            changeProgressIndex('next');
          }
        }
      });
    };

    wrapperWidth = +window.getComputedStyle(document.querySelector(wrapperClass)).width.replace(/px/, '');
    document.querySelectorAll(slidesClass).forEach(function (slide) {
      return !slide.classList.contains(active) ? setWidthSlide(slide) : null;
    });
    createIndex();
    addEventClick(btnPrev);
    addEventClick(btnNext);

    if (progressBarClass) {
      createProgressBar();
    }

    if (timeChangeSlide) {
      setInterval(startIntervalAutoSlide, timeChangeSlide);
    }
  }; // -------------------------Start-Scripts-------------------------//


  if (window.innerWidth > 1024) {
    document.querySelectorAll('.pen').forEach(function (pen) {
      return pen.style.top = '-50%';
    });
    fullPageScroll({
      sliderClass: '.slider',
      wrapperClass: '.wrapper',
      sectionsAll: 'section',
      headerLink: '.header__link',
      footerLink: '.footer__list--white',
      active: 'section--active',
      penClasses: ['.pen--black', '.pen--white', '.pen--blue', '.pen']
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
    active: 'seventh-section__slide--active',
    progressBarClass: '.seventh-section__progress-bar',
    progressLineClass: '.seventh-section__progress-bar--progress',
    timeChangeSlide: 5000
  });
  sliderRound({
    wrapperClass: '.eighth-section__wrapper',
    slidesClass: '.eighth-section__slide',
    btnsPrevClass: '.eighth-section__prev--prev',
    btnsNextClass: '.eighth-section__next',
    active: 'eighth-section__slide--active'
  });
});