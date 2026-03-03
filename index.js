import * as THREE from 'three';

const w = window.innerWidth;
const h = window.innerHeight;

// 1. THE SCENE (The space)
const scene = new THREE.Scene();

// 2. THE CAMERA (The eyes)
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

// 3. THE RENDERER (The engine)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xF0F0F0);
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement); // This adds the canvas to the HTML

// 4. THE OBJECT (A simple Green Triangle using BufferGeometry)
// const geometry = new THREE.BoxGeometry();
function getPoints() {
 const vertices = [];
 const colors = [];
 // vertices.push(0, 0, 0, 0, 3, 0, 0, 0, 3);
 const numPoints = 100;
 const size = 4.5;
 let x, y, z, r, g, b;
 const colorMult = 0.3;
 for (let i = 0; i < numPoints; i += 1) {
  x = Math.random() * size - size * 0.5;
  y = Math.random() * size - size * 0.5;
  z = Math.random() * size - size * 0.5;
  // r = 0;
  // g = 0;
  // b = 0;
  r = x * colorMult;
  g = y * colorMult;
  b = z * colorMult;
  vertices.push(x, y, z);
  colors.push(r, g, b);
 }
 return { vertices, colors }
}
function getArtThing({ vertices, colors }) {
 const geometry = new THREE.BufferGeometry();
 const material = new THREE.MeshBasicMaterial({
  // color: 0x000066,
  vertexColors: true,
  side: THREE.DoubleSide,
  opacity: 0.5,
  transparent: true,
 });
 geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3),
 );
 geometry.setAttribute(
  "color",
  new THREE.Float32BufferAttribute(colors, 3),
 );
 const mesh = new THREE.Mesh(geometry, material);
 function update() {
  mesh.rotation.x += 0.001;
  mesh.rotation.y += 0.002;
  // mesh.rotateX(0.001);
  // mesh.rotateY(0.002);
 }
 return { mesh, update };
}

const points = getPoints()
const artThing = getArtThing(points);
scene.add(artThing.mesh);

const sunlight = new THREE.DirectionalLight(0xffffff);
sunlight.position.y = 2;
scene.add(sunlight);

// 5. THE ANIMATION LOOP (The heartbeat)
function animate() {
 requestAnimationFrame(animate);
 artThing.update();
 // Let's make it spin like the pros do
 // mesh.rotation.x += 0.01;
 // mesh.rotation.y += 0.02;
 renderer.render(scene, camera);
}

animate();