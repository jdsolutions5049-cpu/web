import * as THREE from '/vendor/three/three.module.js';

const canvas = document.querySelector('[data-hero-canvas]');
const stage = canvas?.parentElement;

if (canvas && stage) {
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	let renderer;

	try {
		renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true,
			powerPreference: 'low-power',
			preserveDrawingBuffer: true
		});
	} catch {
		stage.classList.add('hero-scene-unavailable');
	}

	if (renderer) {
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1 : 1.35));
		renderer.setClearColor(0x07120f, 0);
		renderer.outputColorSpace = THREE.SRGBColorSpace;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
		camera.position.set(0, 0, 12);

		const uniforms = {
			uTime: { value: 0 },
			uPointer: { value: new THREE.Vector2() },
			uScroll: { value: 0 },
			uAspect: { value: 1 }
		};
		const backdropMaterial = new THREE.ShaderMaterial({
			uniforms,
			depthWrite: false,
			vertexShader: `
				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				uniform float uTime;
				uniform float uScroll;
				uniform float uAspect;
				uniform vec2 uPointer;
				varying vec2 vUv;
				float hash(vec2 p) {
					return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
				}
				float noise(vec2 p) {
					vec2 i = floor(p);
					vec2 f = fract(p);
					f = f * f * (3.0 - 2.0 * f);
					return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
				}
				float field(vec2 p) {
					float value = 0.0;
					float amplitude = 0.5;
					for (int i = 0; i < 3; i++) {
						value += amplitude * noise(p);
						p = p * 2.03 + 7.1;
						amplitude *= 0.5;
					}
					return value;
				}
				void main() {
					vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
					p += uPointer * 0.045;
					p.x += uScroll * 0.08;
					float flow = field(p * 3.0 + vec2(uTime * 0.022, -uTime * 0.016));
					float ribbon = 1.0 - smoothstep(0.02, 0.16, abs(sin((p.x * 1.4 + p.y + flow) * 3.0)));
					float glow = ribbon * (0.05 + flow * 0.11);
					vec3 deep = vec3(0.025, 0.07, 0.055);
					vec3 green = vec3(0.10, 0.18, 0.045);
					vec3 acid = vec3(0.79, 0.96, 0.25);
					vec3 color = mix(deep, green, smoothstep(0.18, 0.88, flow) * 0.72);
					color += acid * glow;
					float vignette = 1.0 - smoothstep(0.32, 1.25, length((vUv - 0.5) * vec2(1.2, 0.9))) * 0.45;
					color *= vignette;
					gl_FragColor = vec4(color, 0.94);
					#include <tonemapping_fragment>
					#include <colorspace_fragment>
				}
			`
		});
		const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), backdropMaterial);
		backdrop.position.z = -14;
		backdrop.frustumCulled = false;
		backdrop.renderOrder = -10;
		scene.add(backdrop);

		scene.add(new THREE.AmbientLight(0xc9f542, 1.15));
		const keyLight = new THREE.PointLight(0xc9f542, 24, 18);
		keyLight.position.set(4, 3, 5);
		scene.add(keyLight);
		const fillLight = new THREE.PointLight(0x7c9d29, 12, 16);
		fillLight.position.set(-3, -2, 4);
		scene.add(fillLight);

		const rig = new THREE.Group();
		scene.add(rig);
		const coreGeometry = new THREE.IcosahedronGeometry(1.25, 1);
		const core = new THREE.Mesh(coreGeometry, new THREE.MeshStandardMaterial({
			color: 0x526c18,
			emissive: 0x26390c,
			emissiveIntensity: 0.72,
			metalness: 0.28,
			roughness: 0.32,
			flatShading: true
		}));
		rig.add(core);
		rig.add(new THREE.LineSegments(
			new THREE.EdgesGeometry(coreGeometry),
			new THREE.LineBasicMaterial({ color: 0xc9f542, transparent: true, opacity: 0.85 })
		));

		const ringOne = new THREE.Mesh(
			new THREE.TorusGeometry(2.05, 0.012, 5, 180),
			new THREE.MeshBasicMaterial({ color: 0xc9f542, transparent: true, opacity: 0.6 })
		);
		ringOne.rotation.set(0.9, 0.25, 0.3);
		rig.add(ringOne);
		const ringTwo = new THREE.Mesh(
			new THREE.TorusGeometry(2.7, 0.008, 4, 200),
			new THREE.MeshBasicMaterial({ color: 0x91b72c, transparent: true, opacity: 0.35 })
		);
		ringTwo.rotation.set(0.35, 1.0, 0.8);
		rig.add(ringTwo);
		const knot = new THREE.Mesh(
			new THREE.TorusKnotGeometry(1.55, 0.012, 200, 5, 2, 3),
			new THREE.MeshBasicMaterial({ color: 0xd5f86a, transparent: true, opacity: 0.48, wireframe: true })
		);
		rig.add(knot);

		const nodes = [];
		const nodeGeometry = new THREE.BoxGeometry(0.075, 0.075, 0.075);
		const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xd5f86a });
		for (let index = 0; index < 10; index += 1) {
			const angle = (index / 10) * Math.PI * 2;
			const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
			node.position.set(Math.cos(angle) * 2.7, Math.sin(angle) * 2.7, 0);
			rig.add(node);
			nodes.push(node);
		}

		const pointer = new THREE.Vector2();
		const targetPointer = new THREE.Vector2();
		let scrollProgress = 0;
		const resize = () => {
			const bounds = stage.getBoundingClientRect();
			const width = Math.max(1, bounds.width);
			const height = Math.max(1, bounds.height);
			const aspect = width / height;
			renderer.setSize(width, height, false);
			camera.aspect = aspect;
			camera.updateProjectionMatrix();
			uniforms.uAspect.value = aspect;
			const viewHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.z - backdrop.position.z);
			backdrop.scale.set(viewHeight * aspect * 1.08, viewHeight * 1.08, 1);
			rig.position.set(aspect < 0.75 ? 1.9 : 4.05, aspect < 0.75 ? 2.2 : 0.15, 0);
			rig.scale.setScalar(aspect < 0.75 ? 0.62 : 1);
		};
		resize();
		const resizeObserver = new ResizeObserver(resize);
		resizeObserver.observe(stage);

		if (!reducedMotion) {
			window.addEventListener('pointermove', event => {
				targetPointer.set((event.clientX / window.innerWidth - 0.5) * 2, -(event.clientY / window.innerHeight - 0.5) * 2);
			}, { passive: true });
			window.addEventListener('scroll', () => {
				scrollProgress = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
			}, { passive: true });
		}

		const render = time => {
			uniforms.uTime.value = reducedMotion ? 0 : time;
			uniforms.uScroll.value = scrollProgress;
			uniforms.uPointer.value.lerp(targetPointer, reducedMotion ? 0 : 0.035);
			rig.rotation.y = (reducedMotion ? 0.3 : time * 0.085) + pointer.x * 0.12 + scrollProgress * 0.18;
			rig.rotation.x = (reducedMotion ? -0.2 : Math.sin(time * 0.16) * 0.09) + pointer.y * 0.1;
			ringOne.rotation.z += reducedMotion ? 0 : 0.0008;
			ringTwo.rotation.x += reducedMotion ? 0 : 0.00055;
			knot.rotation.y += reducedMotion ? 0 : 0.0012;
			nodes.forEach((node, index) => { node.rotation.x += reducedMotion ? 0 : 0.002 + index * 0.0001; });
			renderer.render(scene, camera);
			canvas.dataset.ready = 'true';
			canvas.dataset.frames = String(Number(canvas.dataset.frames || 0) + 1);
		};

		if (reducedMotion) {
			render(0);
		} else {
			let frame = 0;
			let lastFrame = 0;
			const animate = now => {
				frame = window.requestAnimationFrame(animate);
				if (document.hidden || now - lastFrame < 1000 / 30) return;
				lastFrame = now;
				pointer.lerp(targetPointer, 0.035);
				render(now * 0.001);
			};
			frame = window.requestAnimationFrame(animate);
			window.addEventListener('pagehide', () => {
				window.cancelAnimationFrame(frame);
				resizeObserver.disconnect();
				renderer.dispose();
			}, { once: true });
		}
	}
}