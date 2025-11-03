document.addEventListener("DOMContentLoaded", () => {
	const sliders = document.querySelectorAll(".emotions-slider");

	if (!sliders.length) return;

	sliders.forEach((element) => {
		const slider = element.querySelector(".swiper");
		const prevEl = element.querySelector(".slider-nav__item_prev");
		const nextEl = element.querySelector(".slider-nav__item_next");

		new Swiper(slider, {
			slidesPerView: 1.4,
			spaceBetween: 20,
			speed: 500,
			centeredSlides: true,
			initialSlide: 1,
			loop: false,
			grabCursor: true,
			navigation: { 
				nextEl, 
				prevEl, 
				disabledClass: "disabled" 
			},
			breakpoints: {
				480: {
					slidesPerView: 1.6,
					spaceBetween: 20
				},
				640: { 
					slidesPerView: 2,
					spaceBetween: 25 
				},
				768: {
					slidesPerView: 2.4,
					spaceBetween: 30
				},
				1024: { 
					slidesPerView: 2.8,
					spaceBetween: 35 
				},
				1280: {
					slidesPerView: 3,
					spaceBetween: 40
				}
			}
		});
	});
});
