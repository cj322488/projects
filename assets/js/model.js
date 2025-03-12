let scene, camera, renderer, model, controls;

// Initialize the scene
function init() {
    // Create the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("container").appendChild(renderer.domElement);

    // Add a simple light source
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Load the 3D model using GLTFLoader
    const loader = new THREE.GLTFLoader();
    loader.load("assets/3d-models/porsche.glb", (gltf) => {
        model = gltf.scene;
        scene.add(model);
    }, undefined, (error) => {
        console.error('Error loading model:', error);
    });

    // Set up the orbit controls (allows user to interact with the model)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth movement
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;

    // Resize event listener
    window.addEventListener('resize', onWindowResize, false);
}

// Handle window resize to adjust camera and renderer
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Render the scene
function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.x += 0.01; // Rotate the model for dynamic effect
        model.rotation.y += 0.01;
    }

    controls.update(); // Update controls on each frame
    renderer.render(scene, camera);
}

// Start the app
init();
animate();
