document.addEventListener("DOMContentLoaded", () => {
	const sliders = document.querySelectorAll(".emotions-slider");

	if (!sliders.length) return;

	sliders.forEach((element) => {
		const slider = element.querySelector(".swiper");
		const prevEl = element.querySelector(".slider-nav__item_prev");
		const nextEl = element.querySelector(".slider-nav__item_next");

		// Función para calcular y fijar la altura máxima
		function fixContainerHeight() {
			const slides = element.querySelectorAll(".emotions-slider__slide");
			let maxHeight = 0;

			// Hacer todas las slides visibles temporalmente para medir
			slides.forEach((slide) => {
				const item = slide.querySelector(".emotions-slider-item");
				if (item) {
					// Temporalmente expandir header/footer para medir altura máxima
					const header = item.querySelector(".emotions-slider-item__header");
					const footer = item.querySelector(".emotions-slider-item__footer");
					
					if (header) header.style.maxHeight = "none";
					if (footer) footer.style.maxHeight = "none";
					
					const height = slide.offsetHeight;
					if (height > maxHeight) maxHeight = height;
					
					// Restaurar
					if (header) header.style.maxHeight = "";
					if (footer) footer.style.maxHeight = "";
				}
			});

			// Añadir margen de seguridad
			maxHeight += 40;

			// Fijar altura del contenedor
			element.style.minHeight = maxHeight + "px";
		}

		// Inicializar Swiper
		const swiperInstance = new Swiper(slider, {
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
			},
			on: {
				init: function() {
					// Fijar altura después de que Swiper esté listo
					setTimeout(fixContainerHeight, 100);
				}
			}
		});

		// Recalcular al redimensionar ventana
		let resizeTimer;
		window.addEventListener("resize", () => {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				element.style.minHeight = "";
				setTimeout(fixContainerHeight, 100);
			}, 250);
		});
	});
});

