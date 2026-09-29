document.querySelector('.menu-toggle')?.addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open')));
const siteNav = document.querySelector('.site-nav');
if (siteNav) {
	const updateNav = () => siteNav.classList.toggle('is-scrolled', window.scrollY > 12);
	updateNav();
	window.addEventListener('scroll', updateNav, { passive: true });
}
let progressFrame = 0;
const updateScrollProgress = () => {
	if (progressFrame) return;
	progressFrame = window.requestAnimationFrame(() => {
		const scrollable = document.documentElement.scrollHeight - window.innerHeight;
		const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
		document.body.style.setProperty('--page-progress', String(Math.min(1, Math.max(0, progress))));
		progressFrame = 0;
	});
};
updateScrollProgress();
window.addEventListener('scroll', updateScrollProgress, { passive: true });
document.querySelectorAll('[data-countdown]').forEach(countdown => {
	const targetTime = new Date(countdown.dataset.countdown).getTime();
	const units = {
		days: countdown.querySelector('[data-countdown-days]'),
		hours: countdown.querySelector('[data-countdown-hours]'),
		minutes: countdown.querySelector('[data-countdown-minutes]'),
		seconds: countdown.querySelector('[data-countdown-seconds]')
	};
	const message = countdown.querySelector('[data-countdown-message]');
	let timer;
	const renderCountdown = () => {
		const remaining = Math.max(0, targetTime - Date.now());
		const values = {
			days: Math.floor(remaining / 86400000),
			hours: Math.floor((remaining % 86400000) / 3600000),
			minutes: Math.floor((remaining % 3600000) / 60000),
			seconds: Math.floor((remaining % 60000) / 1000)
		};
		Object.entries(values).forEach(([unit, value]) => {
			if (units[unit]) units[unit].textContent = String(value).padStart(2, '0');
		});
		if (remaining <= 0) {
			if (message) message.textContent = 'The scheduled test start time has arrived.';
			window.clearInterval(timer);
		}
	};
	renderCountdown();
	if (targetTime > Date.now()) timer = window.setInterval(renderCountdown, 1000);
});
document.querySelectorAll('[data-countdown-toggle]').forEach(toggle => {
	const dateInput = toggle.form?.querySelector('[data-countdown-date]');
	const syncRequirement = () => { if (dateInput) dateInput.required = toggle.checked; };
	toggle.addEventListener('change', syncRequirement);
	syncRequirement();
});
document.querySelectorAll('[data-auto-submit]').forEach(input => input.addEventListener('change', () => input.form?.requestSubmit()));
document.querySelectorAll('form[data-confirm]').forEach(form => form.addEventListener('submit', event => {
	if (!window.confirm(form.dataset.confirm)) event.preventDefault();
}));
document.querySelectorAll('[data-scroll]').forEach(button => button.addEventListener('click', () => document.querySelector('.internship-slider').scrollBy({ left: button.dataset.scroll === 'left' ? -360 : 360, behavior: 'smooth' })));
document.querySelectorAll('[data-domain]').forEach(link => link.addEventListener('click', () => {
	const domain = document.querySelector('select[name="domain"]');
	const type = document.querySelector('select[name="type"]');
	if (domain) domain.value = link.dataset.domain;
	if (type && link.dataset.type) type.value = link.dataset.type;
}));
setTimeout(() => document.querySelector('.flash')?.remove(), 5000);

document.querySelectorAll('[data-whatsapp-enquiry]').forEach(button => button.addEventListener('click', () => {
	const form = button.closest('[data-whatsapp-form]');
	if (!form) return;
	const fields = new FormData(form);
	const details = [
		['fullName', 'Name'], ['phone', 'Phone'], ['email', 'Email'], ['type', 'Interested in'],
		['domain', 'Program'], ['course', 'Course'], ['organization', 'Organization'], ['college', 'College'],
		['branch', 'Branch'], ['year', 'Year of study'], ['city', 'City'], ['state', 'State'], ['message', 'My question']
	];
	const lines = details
		.map(([key, label]) => [label, String(fields.get(key) || '').trim()])
		.filter(([, value]) => value)
		.map(([label, value]) => `${label}: ${value}`);
	const message = [
		'Hi Jay Dynamic Solutions, can I get more information?',
		...(lines.length ? ['', ...lines] : [])
	].join('\n');
	window.open(`https://wa.me/918308035049?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const typewriter = document.querySelector('[data-typewriter]');
if (typewriter && !reducedMotion) {
	const phrases = JSON.parse(typewriter.dataset.phrases);
	let phraseIndex = 0;
	let characterIndex = phrases[0].length;
	let deleting = true;
	const typeNext = () => {
		if (document.hidden) return window.setTimeout(typeNext, 400);
		const phrase = phrases[phraseIndex];
		let delay = deleting ? 32 : 62;
		if (deleting) {
			characterIndex = Math.max(0, characterIndex - 1);
			typewriter.textContent = phrase.slice(0, characterIndex);
			if (characterIndex === 0) {
				phraseIndex = (phraseIndex + 1) % phrases.length;
				deleting = false;
				delay = 260;
			}
		} else {
			characterIndex = Math.min(phrase.length, characterIndex + 1);
			typewriter.textContent = phrase.slice(0, characterIndex);
			if (characterIndex === phrase.length) {
				deleting = true;
				delay = 1500;
			}
		}
		window.setTimeout(typeNext, delay);
	};
	window.setTimeout(typeNext, 1300);
}

const revealSelector = [
	'main:not(.dashboard) > section',
	'main:not(.dashboard) > header',
	'main.admin-login',
	'main.error-page',
	'.service-grid > *',
	'.courses-grid > *',
	'.program-grid > *',
	'.editorial-grid > *',
	'.capability-list > article',
	'.career-step-list > article',
	'.approach-steps > article',
	'.numbers > div',
	'.sat-grid > article'
].join(',');

if (!reducedMotion && 'IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return;
			entry.target.classList.add('is-visible');
			if (entry.target.matches('.career-step-list > article')) entry.target.parentElement.classList.add('is-visible');
			revealObserver.unobserve(entry.target);
		});
	}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

	document.querySelectorAll(revealSelector).forEach(target => {
		if (target.classList.contains('reveal')) return;
		const siblingIndex = [...target.parentElement.children].indexOf(target);
		target.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 5) * 75}ms`);
		if (target.matches('.capability-list > article')) target.dataset.revealDirection = 'right';
		if (target.matches('.career-step-list > article')) target.dataset.revealDirection = 'right';
		if (target.matches('.service-grid > *')) target.dataset.revealDirection = 'left';
		target.classList.add('scroll-reveal');
		revealObserver.observe(target);
	});
}

const tiltCards = document.querySelectorAll('.service-card, .course-list-card, .program-card, .editorial-card, .sat-grid article');
if (!reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
	tiltCards.forEach(card => {
		card.classList.add('card-tilt');
		card.addEventListener('pointermove', event => {
			const bounds = card.getBoundingClientRect();
			const x = (event.clientX - bounds.left) / bounds.width - 0.5;
			const y = (event.clientY - bounds.top) / bounds.height - 0.5;
			card.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
			card.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
		});
		card.addEventListener('pointerleave', () => {
			card.style.setProperty('--tilt-x', '0deg');
			card.style.setProperty('--tilt-y', '0deg');
		});
	});
}

const counters = document.querySelectorAll('[data-counter]');
if (!reducedMotion && counters.length && 'IntersectionObserver' in window) {
	const counterObserver = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return;
			counterObserver.unobserve(entry.target);
			const counter = entry.target;
			const target = Number(counter.dataset.counter);
			const suffix = counter.dataset.counterSuffix || '';
			const start = performance.now();
			const countUp = now => {
				const progress = Math.min((now - start) / 1100, 1);
				const eased = 1 - Math.pow(1 - progress, 3);
				counter.textContent = `${Math.round(target * eased)}${suffix}`;
				if (progress < 1) window.requestAnimationFrame(countUp);
			};
			window.requestAnimationFrame(countUp);
		});
	}, { threshold: 0.65 });
	counters.forEach(counter => counterObserver.observe(counter));
}

document.querySelectorAll('[data-slider]').forEach(slider => {
	const slides = [...slider.querySelectorAll('.slide')];
	const dots = [...slider.querySelectorAll('[data-slide-to]')];
	const count = slider.querySelector('[data-slide-count]');
	let current = 0;
	let timer;
	if (!slides.length) return;
	const showSlide = (index) => {
		current = (index + slides.length) % slides.length;
		slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === current));
		dots.forEach((dot, dotIndex) => { dot.classList.toggle('is-active', dotIndex === current); dot.setAttribute('aria-selected', dotIndex === current ? 'true' : 'false'); });
		if (count) count.textContent = String(current + 1).padStart(2, '0');
	};
	const restart = () => { clearInterval(timer); if (!reducedMotion) timer = setInterval(() => showSlide(current + 1), 5000); };
	slider.querySelector('[data-slide="prev"]')?.addEventListener('click', () => { showSlide(current - 1); restart(); });
	slider.querySelector('[data-slide="next"]')?.addEventListener('click', () => { showSlide(current + 1); restart(); });
	dots.forEach(dot => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.slideTo)); restart(); }));
	slider.addEventListener('mouseenter', () => clearInterval(timer));
	slider.addEventListener('mouseleave', restart);
	slider.addEventListener('focusin', () => clearInterval(timer));
	slider.addEventListener('focusout', event => { if (!slider.contains(event.relatedTarget)) restart(); });
	restart();
});

// A restrained follower cursor for mouse users, with independent click ripples.
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
	const cursor = document.createElement('div');
	cursor.className = 'custom-cursor';
	cursor.setAttribute('aria-hidden', 'true');
	cursor.innerHTML = '<span class="custom-cursor-core"></span><span class="custom-cursor-ring"></span>';
	document.body.append(cursor);

	const isInteractive = target => target instanceof Element && target.closest('a, button, input, select, textarea, label, [role="button"]');
	document.addEventListener('pointermove', event => {
		if (event.pointerType !== 'mouse') return;
		document.body.classList.add('custom-cursor-active');
		cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
		cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
		cursor.classList.toggle('is-hovering', !!isInteractive(event.target));
	}, { passive: true });
	document.addEventListener('pointerdown', event => {
		if (event.pointerType === 'mouse') cursor.classList.add('is-pressed');
		const target = event.target instanceof Element ? event.target.closest('.btn, button, .nav-links a, .editorial-card a, .course-list-card>a, .service-card>a, .program-card a') : null;
		if (!target || reducedMotion) return;
		const bounds = target.getBoundingClientRect();
		const ripple = document.createElement('span');
		ripple.className = 'click-ripple';
		ripple.style.left = `${event.clientX - bounds.left}px`;
		ripple.style.top = `${event.clientY - bounds.top}px`;
		if (target.matches('.btn-acid, .sat-form button')) ripple.classList.add('is-warm');
		target.append(ripple);
		ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
	}, { passive: true });
	document.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'), { passive: true });
	document.addEventListener('pointercancel', () => cursor.classList.remove('is-pressed'), { passive: true });
	document.addEventListener('pointerleave', event => {
		if (event.target === document) document.body.classList.remove('custom-cursor-active');
	});
}
