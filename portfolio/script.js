// --- STARS BACKGROUND IMPLEMENTATION ---
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        // Posiciones aleatorias
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Tamaños aleatorios para efecto de profundidad
        const size = Math.random() * 2;

        star.style.position = 'absolute';
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.opacity = Math.random();

        // Animación de parpadeo suave
        star.style.animation = `blink ${2 + Math.random() * 3}s infinite ease-in-out`;

        container.appendChild(star);
    }
}

// Definir la animación de parpadeo en el CSS dinámicamente
const style = document.createElement('style');
style.innerHTML = `
    @keyframes blink {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(style);

createStars();

// --- THREE.JS EARTH IMPLEMENTATION ---
const earthContainer = document.getElementById('earth-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
earthContainer.appendChild(renderer.domElement);

// Earth Geometry and Texture
const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
const textureLoader = new THREE.TextureLoader();

// Textura de la Tierra (usando una fuente fiable de texturas abiertas)
const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');

const earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    specular: 0x333333,
    shininess: 5,
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earth);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Luz blanca más fuerte
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x1e40af, 4); // Azul oscuro intenso
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

camera.position.z = 6;

function animateEarth() {
    requestAnimationFrame(animateEarth);

    const scrollY = window.scrollY;

    // Rotación constante sobre su eje
    earth.rotation.y += 0.005;

    // Efecto de Órbita al bajar
    // Movimiento: Centro -> Derecha -> Atrás -> Izquierda -> Centro
    const orbitRadius = 5; // Aumentado el radio para que el movimiento sea más visible
    const angle = (scrollY * 0.002);

    earth.position.x = Math.sin(angle) * orbitRadius;
    earth.position.z = Math.cos(angle) * orbitRadius - 6;

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animateEarth();
