import {TextureLoader} from "three";

require('three-orbitcontrols');
require('./assets/index');
require('./node_modules/threebsp/index');
require('./node_modules/three/src/extras/Earcut');
import CylinderBuild from './utils/cylinderBuilding';
import PolygonBuild from './utils/polygonBuild';
import computed, { getTransparent } from './utils/bspComputed';
import mainBuild from './utils/mainBuild';
import myBuild from './utils/myBuild';
import numBuild from './utils/numBuild';
import myGround from './utils/myGround';
// obj文件导出
import { objModel } from './utils/modelOut';

import { Water } from './node_modules/three/examples/jsm/objects/Water2';
var water;
//创建场景.
let scene = new THREE.Scene();
//相机
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
//渲染器
let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(0x4682B4,1.0);
//设置画布大小
const contrain = document.getElementById('app');
renderer.setSize(contrain.clientWidth, contrain.clientHeight);
renderer.setClearColor("#cccccc");
//加入到body
contrain.appendChild(renderer.domElement);
//加入灯光
let lights = []; // 灯光集合
lights[ 0 ] = new THREE.PointLight( '#FEFFDD', 1, 0 );
lights[ 1 ] = new THREE.PointLight( '#F9F8F6', 1, 0 );
lights[ 2 ] = new THREE.PointLight( '#F9F8F6', 1, 2000 );

lights[ 0 ].position.set( -500, 400, -1200 );
lights[ 1 ].position.set( 200, 400, 1200 );
lights[ 2 ].position.set( 500, 400, 1200 );

var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
//scene.add( directionalLight );
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

/*// 多边形
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
scene.add(cylinders);*/
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
let CAR = null;
async function scar () {
  let car = await objModel('/models/scar/file.mtl','/models/scar/file.obj');
  car.position.set(0, 0, 0);
  scene.add(car);
};
async function redCar() {
  CAR = await objModel('/models/redCar/file.mtl','/models/redCar/file.obj',-Math.PI/2, 0.001);
  CAR.position.set(0, 0, 0);
  CAR.rotateY(Math.PI*-0.25);
  scene.add(CAR);
};
// scar(); //货车
//redCar(); //小汽车
var axesHelper = new THREE.AxesHelper( 1000 );
axesHelper.position.set(0,10,0);
scene.add( axesHelper );
let PATH = []; //运动轨迹
function runPath() {
  PATH = new THREE.CatmullRomCurve3([
    new THREE.Vector3( -800, 10, 800 ),
    new THREE.Vector3( 800, 10, 800 ),
    new THREE.Vector3( 800, 10, -800 ),
    new THREE.Vector3( -800, 10, -800 ),
  ], true);
  let points = PATH.getPoints( 100 );
  let geometry = new THREE.BufferGeometry().setFromPoints( points );

  let material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

  let curveObject = new THREE.Line( geometry, material );
  scene.add(curveObject);
}
runPath();
let material = new THREE.MeshPhongMaterial( { color: 0x808080 } );

let geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );

let mesh = new THREE.Mesh( geometry, material );
mesh.position.set( 0, - 1, 0 );
mesh.rotation.x = - Math.PI * 0.5;
mesh.receiveShadow = true;
scene.add(mesh);
//设置相机位置
camera.position.set(100, 400, 300);
function initControl() {
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.rotateSpeed = 0.35
}
//渲染循环
let progress = 0;
let avg = Math.PI/2/200;
function runCar(progress) {
  if(progress> 525 && progress <= 725) {
    CAR.rotateY(avg);
  } else if(progress> 1150 && progress <= 1350) {
    CAR.rotateY(avg);
  } else if(progress> 1725 && progress <= 1925) {
    CAR.rotateY(avg);
  } else if(progress>2400  || progress <= 100) {
    CAR.rotateY(avg);
  }
}
function animate() {
  // if ( progress < 2500 && CAR) {
  //   let pro = 0.0004*progress;
  //   let point = PATH.getPoint(pro);
  //   let n = CAR.rotation.y;
  //   runCar(progress, n);
  //   progress ++;
  //   CAR.position.set(point.x, point.y, point.z);
  // } else {
  //   progress = 0;
  // }
	requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
initControl();
animate();


/****加载地面环境***/
var roadObjs = myGround.loadRoad();
scene.add(...roadObjs);

var riverObjs = myGround.loadRiver();
/*for(let i=0;i<riverObjs.length;i++){
  let geom =riverObjs[i].geometry;
  water=new Water(geom,{
		color:'#ffffff',
		scale:2,
		flowDirection:new THREE.Vector2(1,1),
		textureWidth:1024,
		textureHeight:1024,
	});
	water.position.set(0,80,0);

	scene.add(water);
}*/

let watergeometry = myGround.loadRiverWater();
let textureLoader = new TextureLoader();
water=new Water(watergeometry,{
	color:'#ffffff',
	scale:.02,
  normalMap0:textureLoader.load('./assets/image/Water_1_M_Normal.jpg'),
  normalMap1:textureLoader.load('./assets/image/Water_2_M_Normal.jpg'),
	flowDirection:new THREE.Vector2(-1,-1),
	textureWidth:1024,
	textureHeight:1024,
});
water.position.y = 5
water.rotation.x = Math.PI*-0.5
scene.add(water);
scene.add(...riverObjs);

var grassObjs = myGround.loadGrass();
scene.add(...grassObjs);

myGround.loadTree().then(re=>{
  scene.add(...re);
});


