require('three-orbitcontrols');
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
renderer.setClearColor("#0E101F");
//加入到body
contrain.appendChild(renderer.domElement);
//加入灯光
let lights = []; // 灯光集合
lights[ 0 ] = new THREE.PointLight( '#f00', 1, 0 );
lights[ 1 ] = new THREE.PointLight( 0x965955, 1, 0 );
lights[ 2 ] = new THREE.PointLight( 0x967A55, 1, 0 );

lights[ 0 ].position.set( 0, 200, 0 );
lights[ 1 ].position.set( 100, 200, 100 );
lights[ 2 ].position.set( - 100, - 200, - 100 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );

let geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
//加入到场景
scene.add(cube);

//设置相机位置
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

function initControl() {
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.rotateSpeed = 0.35
}
//渲染循环
function animate()
{
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
initControl();
animate();
