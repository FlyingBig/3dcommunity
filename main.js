require('./assets/index');
//创建场景.
let scene = new THREE.Scene();
//相机
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//渲染器
let renderer = new THREE.WebGLRenderer();
//设置画布大小
const contrain = document.getElementById('app');
renderer.setSize(contrain.clientWidth, contrain.clientHeight);
//加入到body
contrain.appendChild(renderer.domElement);


let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
//加入到场景
scene.add(cube);

//设置相机位置
camera.position.set(3, 4, 4);
camera.lookAt(0, 0, 0);

//渲染循环
function animate()
{
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
