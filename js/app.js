//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }


if (document.querySelector('.body-slider__body')) {
	let mainslide = new Swiper('.body-slider__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		mousewheel: true,
		autoplay: {
			delay: 3500,
		},
		//touchRatio: 0,
		//simulateTouch: false,
		//loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.body-slider__dotts',
			clickable: true,
		},
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}

if (document.querySelector('.page-slider__body')) {
	let mainslide = new Swiper('.page-slider__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 5,
		autoHeight: true,
		speed: 800,
		//mousewheel: true,
		autoplay: {
			delay: 3500,
		},
		//touchRatio: 0,
		//simulateTouch: false,
		loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.page-slider__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.page-slider__button-next',
			prevEl: '.page-slider__button-prev',
		},
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}




let headerBurger = document.querySelector('.menu__icon');
let headerMenu = document.querySelector('.menu__content');
if (headerBurger) {
	headerBurger.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock');
		headerBurger.classList.toggle('_active');
		headerMenu.classList.toggle('_active');
	});
}

//appearance of block
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 4;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;

			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_active');
			} else {
				if (!animItem.classList.contains('_anim-no-hide')) {
					animItem.classList.remove('_active');
				}
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
}

//appearance of menu
const animMenu = document.querySelector('._anim-menu');
const animSubmenu = document.querySelector('._anim-submenu');
if (animMenu) {
	window.addEventListener('scroll', animMenuOnScroll);
	function animMenuOnScroll() {
		const animMenuHeight = animMenu.offsetHeight;
		const animMenuOffset = offset(animMenu).top;
		const animStart = 3;

		let animMenuPoint = window.innerHeight - animMenuHeight / animStart;
		if (animMenuHeight > window.innerHeight) {
			animMenuPoint = window.innerHeight - window.innerHeight / animStart;
		}

		if ((pageYOffset > animMenuOffset - animMenuPoint) && pageYOffset < (animMenuOffset + animMenuHeight)) {
			animMenu.classList.add('_active');
			if (animSubmenu) {
				animSubmenu.classList.add('_active');
			}

		}
		if (animMenuOffset < 5) {
			animMenu.classList.remove('_active');
			if (animSubmenu) {
				animSubmenu.classList.remove('_active');
			}

		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}
}





//==== mansory grid
let elems = document.querySelectorAll('.tab-block__grid');
for (let j = 0; j < elems.length; j++) {
	let elem = elems[j];
	setTimeout(function () {
		const iso = new Isotope(elem, {
			itemSelector: '.info-block__item',
			layoutMode: 'masonry'
		});

		let filterBtns = document.querySelectorAll('.tab-block__filter-btn');
		for (let index = 0; index < filterBtns.length; index++) {
			let filterBtn = filterBtns[index];
			filterBtn.addEventListener('click', (e) => {
				for (let i = 0; i < filterBtns.length; i++) {
					filterBtns[i].classList.remove('_active');
				}
				filterBtn.classList.add('_active');
				let filter = e.currentTarget.dataset.filter;

				iso.arrange({ filter: filter });
			})
		}
	}, 500)
}


//page-navigation
const anchors = document.querySelectorAll('a[href*="#"]');
const pagePoints = document.querySelectorAll('._pagePoint')
if (anchors.length > 0) {
	for (let i = 0; i < anchors.length; i++) {
		let anchor = anchors[i];
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const blockId = anchor.getAttribute('href');
			document.querySelector('' + blockId).scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		});

	}
}


// showMore
let showMoreInfo = document.querySelectorAll('._showMore');
let btnShowMoreInfo = document.querySelectorAll('._btnShowMore');
if (showMoreInfo) {
	for (let index = 0; index < showMoreInfo.length; index++) {
		btnShowMoreInfo[index].addEventListener("click", function (e) {
			showMoreInfo[index].classList.toggle('_open');
			btnShowMoreInfo[index].innerHTML = 'Hide'
			btnShowMoreInfo[index].classList.toggle('_open');
			if (!showMoreInfo[index].classList.contains('_open')) {
				btnShowMoreInfo[index].innerHTML = 'see all 10 commandements';
			}
		})
	}
}

//page URL
const currentUrl = window.location.href;
let headerLinks = document.querySelectorAll('.menu__link');
for (let p = 0; p < headerLinks.length; p++) {
	let headerLink = headerLinks[p].getAttribute('href');
	if (currentUrl.includes(headerLink)) {
		headerLinks[p].classList.add('_page-open')
	} else {
		headerLinks[p].classList.remove('_page-open')
	}
}
