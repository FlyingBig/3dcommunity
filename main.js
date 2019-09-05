import {TextureLoader} from "three";

require('three-orbitcontrols');
require('./assets/index');
require('./node_modules/threebsp/index');
require('./node_modules/three/src/extras/Earcut');

import Stats from 'stats-js';
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
// 渲染房屋
class RenderCanvas {
  constructor(){
    //创建场景.
    this.scene = new THREE.Scene();
    //相机
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
    // 渲染器
    this.renderer = new THREE.WebGLRenderer();
    // 灯光集合
    this.lights = [];
    // 房屋建筑信息
    this.positions = {
      mybuild: { position:[[-360, 82 , -225]], rotation: [Math.PI*1.4] }, // 明宇
      cylinder: { position:[
          [40, 0 , -55],
          [-10, 0 , -30],
          [-70, 0 , -30],
          [-190, 0 , -30],
          [-250, 0 , -75],
        ],
        rotation: [0,0,0,0,0]
      }, // 圆形建筑物
      polygon: { position:[
          [40, 0 , 25]
        ], rotation: [2*Math.PI]
      }, // 厂房
      main: { position:[
          [120, 0 , -110],
          [-150, 0 , -175],
          [-150, 0 , -125],
        ], rotation: [-Math.PI*0.7, -Math.PI*0.5, -Math.PI*0.5]
      }, // 住宅1
      nums: {
        position:[
          [310, 0 , -180],
          [330, 0 , -130],
          [320, 0 , -70],
          [295, 0 , -50],
          [235, 0 , -50],
          [185, 0 , -110],
          [215, 0 , -160],
          [275, 0 , -170],
          [-25, 0 , -70],
          [-35, 0 , -140],
          [-15, 0 , -160],
          [20, 0 , -180],
          [65, 0 , -150],
          [-240, 0 , -125],
          [-230, 0 , -175],
        ],
        rotation: [-Math.PI/3, -Math.PI/2, -Math.PI*0.6, -Math.PI*1.2, -Math.PI*1.2, -Math.PI*1.5, -Math.PI*1.8, -Math.PI*1.8, -Math.PI*1.5, -Math.PI*1.7, -Math.PI*1.8, -Math.PI/6, -Math.PI/3, Math.PI/2, Math.PI*0.2]
      }, // 住宅2
    };
    // 车辆运动的速度
    this.speed = 2;
    // 车辆模型集合
    this.cars = {};
    // 性能指标
    this.stats = {};
  }
  init() {
    // 设置画布大小/颜色
    const contrain = document.getElementById('app');
    this.renderer.setSize(contrain.clientWidth, contrain.clientHeight);
    this.renderer.setClearColor("#0E101F");
    contrain.appendChild(this.renderer.domElement);
    // 添加灯光
    this.lights[ 0 ] = new THREE.PointLight( '#FEFFDD', 1, 0 );
    this.lights[ 1 ] = new THREE.PointLight( '#F9F8F6', 1, 0 );
    this.lights[ 2 ] = new THREE.PointLight( '#F9F8F6', 1, 2000 );

    this.lights[ 0 ].position.set( -500, 400, -1200 );
    this.lights[ 1 ].position.set( 200, 400, 1200 );
    this.lights[ 2 ].position.set( 500, 400, 1200 );

    this.scene.add( this.lights[ 0 ] );
    this.scene.add( this.lights[ 1 ] );
    this.scene.add( this.lights[ 2 ] );

    this.stats = new Stats();
    this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );

    //设置相机位置
    this.camera.position.set(100, 400, 300);
    this.roadGrass();
    this.positionBuild();
    this.foot();
    this.axesHelper();
    this.initControl();
    // this.loadWater();
    this.animate();
    this.redCar();
  }
  // 添加缩放拖拽控制器
  initControl() {
    let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.rotateSpeed = 0.35
  }
  // 房屋数量，位置，旋转角度信息
  positionBuild() {
    let that = this;
    let positions = this.positions;
    // 建筑集合
    let builds = {};
    // 圆形建筑
    const cylinder = new CylinderBuild().init();
    // 多边形
    const polygon = new PolygonBuild().init();
    polygon.rotateX( Math.PI * -0.5 );
    // 主要建筑
    const main = mainBuild.init();
    // 明宇大厦
    const mybuild = myBuild.init();
    // 数窗最多的建筑
    const nums = numBuild.init();
    builds.cylinder = cylinder;
    builds.polygon = polygon;
    builds.main = main;
    builds.mybuild = mybuild;
    builds.nums = nums;
    for(let key in positions) {
      if( positions[key].position.length ) {
        let { position, rotation } = positions[key];
        position.map((re, index)=>{
          let build = builds[key].clone();
          build.position.set(...re);
          key === 'main' ? build.rotateZ(rotation[index]) : build.rotateY(rotation[index]);
          that.scene.add(build);
        })
      }
    }
  }
  // 底面地面
  foot() {
    let material = new THREE.MeshPhongMaterial( { color: 0x808080 } );
    let geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
    let mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 0, - 1, 0 );
    mesh.rotation.x = - Math.PI * 0.5;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }
  // 加载草坪，道路
  roadGrass() {
    let roadObjs = myGround.loadRoad();
    this.scene.add(...roadObjs);

    let riverObjs = myGround.loadRiver();
    this.scene.add(...riverObjs);

    let grassObjs = myGround.loadGrass();
    this.scene.add(...grassObjs);

    // myGround.loadTree().then(re=>{
    //   this.scene.add(re);
    // });
  }
  // 添加辅助线工具
  axesHelper() {
    let axesHelper = new THREE.AxesHelper( 1000 );
    axesHelper.position.set(0,10,0);
    this.scene.add( axesHelper );
  }
  // 车辆运动轨迹
  carRunning( car, angle ) {
    let direction = Math.cos(angle);
    if(car.position.x == -550) {
      car.rotateY(Math.PI);
      direction = Math.cos(0)
    } else if(car.position.x == 500) {
      car.rotateY(Math.PI);
      direction = Math.cos(Math.PI)
    }
    car.position.x += this.speed*direction;
  }
  // 动画
  animate() {
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
    let ks = Object.keys(this.cars);
    if( ks.length ) {
      for(let i=0; i<ks.length; i++) {
        let car = this.cars[ks[i]];
        let angle = car.rotation.x;
        this.carRunning(car, angle);
      }
    }
    let aim = this.animate.bind(this);
    requestAnimationFrame(aim);
    this.stats.update();
    this.renderer.render(this.scene, this.camera);
  }
  // 添加车辆模型
  async redCar() {
    let param = [{
      mtlUrl: '/models/redCar/file.mtl',
      objUrl: '/models/redCar/file.obj',
      deg: -Math.PI/2,
      scale: 0.001,
      position: [-550, 2, -350]
    },{
      mtlUrl: '/models/scar/file.mtl',
      objUrl: '/models/scar/file.obj',
      deg: 0,
      scale: 0.003,
      position: [-500, 2, -370]
    }]
    let car = await Promise.all(objModel(param));
    this.cars.smallCar = car[0];
    this.cars.truck = car[1];
    this.scene.add(...car);
  }
  loadWater() {
    let riverObjs = myGround.loadRiver();
    let watergeometry = myGround.loadRiverWater();
    let textureLoader = new TextureLoader();
    let water = new Water(watergeometry,{
      color:'#76A9AC',
      scale:.02,
      normalMap0:textureLoader.load('./assets/image/Water_1_M_Normal.jpg'),
      normalMap1:textureLoader.load('./assets/image/Water_2_M_Normal.jpg'),
      flowDirection:new THREE.Vector2(-1,-1),
      textureWidth:1024,
      textureHeight:1024,
    });
    water.position.y = 5
    water.rotation.x = Math.PI*-0.5
    this.scene.add(water);
    this.scene.add(...riverObjs);
  }
}
new RenderCanvas().init();
