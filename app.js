//variables for setup

let container;
let camera;
let renderer;
let scene;
let robot;

function init(){
    container = document.querySelector('.scene');

    //create scene
    scene = new THREE.Scene();

    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 1000;

    //camera setup
    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-8, 3, 25);

    const ambient = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambient);

    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(10, 10, 100);
    scene.add(light);

    //renderer
    renderer = new THREE.WebGLRenderer({antialias:true, alpha:true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    //load model
    const loader = new THREE.GLTFLoader();
    loader.load('./combat_robot/scene.gltf', 
    function(gltf){
        scene.add(gltf.scene);
        robot = gltf.scene.children[0];
        animate();
    });

}

function animate() {
    requestAnimationFrame(animate);    
    if (robot) {
        robot.rotation.z += 0.005;
    }
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);

init();
