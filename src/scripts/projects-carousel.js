document.addEventListener("DOMContentLoaded", () => {
	const sliders = document.querySelectorAll(".emotions-slider");

	if (!sliders.length) return;

	sliders.forEach((element) => {
		const slider = element.querySelector(".swiper");
		const prevEl = element.querySelector(".slider-nav__item_prev");
		const nextEl = element.querySelector(".slider-nav__item_next");

		new Swiper(slider, {
			slidesPerView: 1.3,
			spaceBetween: 24,
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
				// Móvil pequeño
				375: {
					slidesPerView: 1.4,
					spaceBetween: 20
				},
				// Móvil grande
				480: {
					slidesPerView: 1.5,
					spaceBetween: 24
				},
				// Tablet pequeña
				640: {
					slidesPerView: 2.0,
					spaceBetween: 28
				},
				// Tablet
				768: {
					slidesPerView: 2.2,
					spaceBetween: 32
				},
				// Desktop pequeño
				1024: {
					slidesPerView: 2.6,
					spaceBetween: 36
				},
				// Desktop medio
				1280: {
					slidesPerView: 2.8,
					spaceBetween: 40
				},
				// Desktop grande (tu pantalla 2560x1440)
				1440: {
					slidesPerView: 3.0,
					spaceBetween: 44
				},
				// Desktop muy grande
				1920: {
					slidesPerView: 3.2,
					spaceBetween: 48
				},
				// Pantallas ultra anchas (tu pantalla 2880x1800)
				2400: {
					slidesPerView: 3.4,
					spaceBetween: 52
				}
			}
		});
	});
});