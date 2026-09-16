document.querySelector('.menu-toggle')?.addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open')));
document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => document.querySelector('.internship-slider').scrollBy({ left: button.dataset.scroll === 'left' ? -360 : 360, behavior: 'smooth' })));
document.querySelectorAll('[data-domain]').forEach(link => link.addEventListener('click', () => { const select = document.querySelector('select[name="domain"]'); if (select) select.value = link.dataset.domain; }));
setTimeout(() => document.querySelector('.flash')?.remove(), 5000);

const slider = document.querySelector('[data-slider]');
if (slider) {
	const slides = [...slider.querySelectorAll('.slide')];
	const dots = [...slider.querySelectorAll('[data-slide-to]')];
	const count = slider.querySelector('[data-slide-count]');
	let current = 0;
	let timer;
	const showSlide = (index) => {
		current = (index + slides.length) % slides.length;
		slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === current));
		dots.forEach((dot, dotIndex) => { dot.classList.toggle('is-active', dotIndex === current); dot.setAttribute('aria-selected', dotIndex === current ? 'true' : 'false'); });
		if (count) count.textContent = String(current + 1).padStart(2, '0');
	};
	const restart = () => { clearInterval(timer); timer = setInterval(() => showSlide(current + 1), 5000); };
	slider.querySelector('[data-slide="prev"]')?.addEventListener('click', () => { showSlide(current - 1); restart(); });
	slider.querySelector('[data-slide="next"]')?.addEventListener('click', () => { showSlide(current + 1); restart(); });
	dots.forEach(dot => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.slideTo)); restart(); }));
	slider.addEventListener('mouseenter', () => clearInterval(timer));
	slider.addEventListener('mouseleave', restart);
	restart();
}
