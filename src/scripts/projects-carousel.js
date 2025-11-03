document.addEventListener("DOMContentLoaded", () => {
	const sliders = document.querySelectorAll(".emotions-slider");

	if (!sliders.length) return;

	sliders.forEach((element) => {
		const slider = element.querySelector(".swiper");
		const prevEl = element.querySelector(".slider-nav__item_prev");
		const nextEl = element.querySelector(".slider-nav__item_next");

		new Swiper(slider, {
			slidesPerView: "auto",
			spaceBetween: 30,
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
				320: {
					spaceBetween: 16,
					slidesPerView: 1.2
				},
				// Móvil
				480: {
					spaceBetween: 18,
					slidesPerView: 1.4
				},
				// Tablet pequeña
				640: {
					spaceBetween: 22,
					slidesPerView: 1.6
				},
				// Tablet
				768: {
					spaceBetween: 26,
					slidesPerView: 1.8
				},
				// Desktop pequeño
				1024: {
					spaceBetween: 30,
					slidesPerView: 2.2
				},
				// Desktop medio
				1280: {
					spaceBetween: 35,
					slidesPerView: 2.4
				},
				// Desktop grande (tu pantalla 2560x1440)
				1440: {
					spaceBetween: 40,
					slidesPerView: 2.5
				},
				// Desktop muy grande
				1920: {
					spaceBetween: 45,
					slidesPerView: 2.6
				},
				// Pantallas ultra anchas (tu pantalla 2880x1800)
				2400: {
					spaceBetween: 50,
					slidesPerView: 2.8
				}
			}
		});
	});
});
