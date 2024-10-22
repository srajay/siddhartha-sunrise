// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();
// Create a new camera with perspective view
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

// Position the camera based on the object to render
let objToRender = "old_house";
camera.position.set(0, 0, objToRender === "old_house" ? 1200 : 500);

// Keep track of the mouse position (optional: can be used for eye-tracking effects)
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Keep the 3D object in a global variable for access later
let object;

// Instantiate the GLTFLoader to load the .gltf model
const loader = new GLTFLoader();
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);

    // Center the model
    object.position.set(0, -250, 0);
    object.scale.set(1, 1, 1); // Adjust the scale if necessary
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.error(error);
  }
);

// Create the renderer with a transparent background
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

// Add lighting to illuminate the model
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft overall lighting
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 2, 1000); // Bright light from the top-right
pointLight1.position.set(100, 100, 100);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xffffff, 1.5, 1000); // Dimmer light from the bottom-left
pointLight2.position.set(-100, -100, 100);
scene.add(pointLight2);

// Set up orbit controls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = false; // Enable zooming in and out
controls.enablePan = true; // Enable panning

// Adjust orbit controls sensitivity
controls.minDistance = 300; // Set the minimum zoom distance
controls.maxDistance = 1400; // Set the maximum zoom distance

// const zoomButton = document.getElementById("enableZoomButton");
// zoomButton.addEventListener("click", () => {
//   controls.enableZoom = true; // Enable zooming
//   zoomButton.disabled = true; // Disable button after zoom is enabled
// });

// Animation loop for smooth rendering
function animate() {
  requestAnimationFrame(animate);

  // Update controls for smooth interaction
  controls.update();

  // Render the scene with the camera
  renderer.render(scene, camera);
}

// Adjust the scene when the window is resized
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Optional: Add a mouse listener (can be used for effects)
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

// Start rendering the scene
animate();
