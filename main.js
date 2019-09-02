require('three-orbitcontrols');
require('./assets/index');
require('./node_modules/threebsp/index');
import CylinderBuild from './utils/cylinderBuilding';
import PolygonBuild from './utils/polygonBuild';
import computed, { getTransparent } from './utils/bspComputed';
import mainBuild from './utils/mainBuild';
import myBuild from './utils/myBuild';
import numBuild from './utils/numBuild';
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
lights[ 0 ] = new THREE.PointLight( '#FEFFDD', 1, 0 );
lights[ 1 ] = new THREE.PointLight( '#F9F8F6', 1, 0 );
lights[ 2 ] = new THREE.PointLight( '#F9F8F6', 1, 2000 );

lights[ 0 ].position.set( -500, 400, -300 );
lights[ 1 ].position.set( 200, 400, 350 );
lights[ 2 ].position.set( 500, 400, 300 );

scene.add( lights[ 0 ] );
scene.add( lights[ 1 ] );
scene.add( lights[ 2 ] );

// 生成建筑
let config = {
  material: {
    type: 'MeshBasicMaterial',
  },
  map: {
    type: 'map',
    url: 'assets/image/circle.png'
  },
};
const build = new CylinderBuild({ config }).init();
// 圆柱体顶部
let cTop = computed.cylinder();
cTop.position.set(0, 20, 0);
let cylinders = new THREE.Object3D();
cylinders.add(build, cTop);

// 多边形
const polygonF = new PolygonBuild().init();
polygonF.rotateX( Math.PI * -0.5 );
//主要建筑
const mainBuilds = mainBuild.init();
// 明宇大厦
const mybuild = myBuild.init();
// 数窗最多的建筑
const numbuild = numBuild.init();
numbuild.position.set(20, 0 , -100);
mybuild.position.set(40, 80 , 100);
mainBuilds.position.set(90, 0 , -90);
polygonF.position.set(100, 0 , -50);
cylinders.position.set(-102, 20 , -28);
scene.add(numbuild);
scene.add(mybuild);
scene.add(mainBuilds);
scene.add(polygonF);
scene.add(cylinders);
// 透明建筑
// console.log(mybuild);
//   if(mybuild.children) {
//     let box = new THREE.Object3D();
//     for(let i=0; i<mybuild.children.length-1;i++) {
//       let j = getTransparent(mybuild.children[i].geometry);
//       let { position, rotation } = mybuild.children[i];
//       box.add(j);
//     }
//     box.add(getTransparent(mybuild.children[2].children[0].geometry));
//     scene.add(box);
//   }
//const opc = getTransparent(mybuild.);
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
