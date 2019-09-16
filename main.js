import {TextureLoader} from "three";

require('three-orbitcontrols');
require('./assets/index');
require('./node_modules/threebsp/index');
require('./node_modules/three/src/extras/Earcut');

import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import TWEEN from '@tweenjs/tween.js';
import Stats from 'stats-js';
import CylinderBuild from './utils/cylinderBuilding';
import PolygonBuild from './utils/polygonBuild';
import { getTransparent } from './utils/bspComputed';
import mainBuild from './utils/mainBuild';
import myBuild from './utils/myBuild';
import numBuild from './utils/numBuild';
import myGround from './utils/myGround';
import grassarea from './utils/grassArea';

// obj文件导出
import { objModel } from './utils/modelOut';

import { Water } from './node_modules/three/examples/jsm/objects/Water2';
// 渲染房屋
class RenderCanvas {
	constructor(){
		//创建场景.
		this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog('#BCC1BB', 300, 1000);
		//相机
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
		// 渲染器
		this.renderer = new THREE.WebGLRenderer({alpha: true});
		// 房屋建筑信息
		this.positions = {
			mybuild: { position:[[-360, 82 , -225]], rotation: [Math.PI*1.4] }, // 明宇
			cylinder: { position:[
					[40, 4 , -55],
					[-10, 4 , -30],
					[-70, 4 , -30],
					[-190, 4 , -30],
					[-250, 4 , -75],
				],
				rotation: [0,0,0,0,0]
			}, // 圆形建筑物
			polygon: { position:[
					[40, 2 , 25]
				], rotation: [2*Math.PI]
			}, // 厂房
			main: { position:[
					[120, 2 , -110],
					[-165, 2 , -175],
					[-165, 2 , -145],
				], rotation: [-Math.PI*0.7, -Math.PI*0.5, -Math.PI*0.5]
			}, // 住宅1
			nums: {
				position:[
					[310, 3 , -180],
					[330, 3 , -130],
					[320, 3 , -70],
					[295, 3 , -50],
					[235, 3 , -50],
					[225, 3 , -100],
					[215, 3 , -160],
					[275, 3 , -170],
					[-45, 3 , -100],
					[-35, 3 , -170],
					[-15, 3 , -190],
					[20, 3 , -200],
					[65, 3 , -180],
					[-240, 3 , -125],
					[-230, 3 , -185],
				],
				rotation: [-Math.PI/3, -Math.PI/2, -Math.PI*0.6, -Math.PI*1.2, -Math.PI*1.2, -Math.PI*1.5, -Math.PI*1.8, -Math.PI*1.8, -Math.PI*1.5, -Math.PI*1.7, -Math.PI*1.8, -Math.PI/6, -Math.PI/3, Math.PI/2, Math.PI*0.2]
			}, // 住宅2
		};
		// 草坪位置
    this.grass = [
      [-30, 0, 30],
      [-60, 0, 60],
      [-90, 0, 100],
      [-90, 0, 140],
      [0, 0, 30],
      [30, 0, 30]
    ]
		// 车辆运动的速度
		this.speed = 2;
    // 灯光位置i
    this.positionLight = [[-500, 400, -1200], [200, 400, 1200 ], [500, 400, 1200]];
    // 场景贴图控制
    this.sceneTexture = {
      day: new THREE.TextureLoader().load( '/assets/image/sky.jpg'),
      night: new THREE.TextureLoader().load( '/assets/image/night.jpg')
    };
    this.sceneBox = null;
		// 车辆模型集合
		this.cars = {};
		// 性能指标
		this.stats = {};
		// 道路偏转系数
    this.roadDeflection = 0;
    // 所有建筑类型
    this.builds = {};
    // 透明模式
    this.opacity = false;
    this.eventBtn();
	}
	init() {
		// 设置画布大小/颜色
		const contrain = document.getElementById('app');
		this.renderer.setSize(contrain.clientWidth, contrain.clientHeight);
		// this.renderer.setClearColor("red");
		contrain.appendChild(this.renderer.domElement);
		// 添加灯光
    let lights = [];
		lights[ 0 ] = new THREE.PointLight( '#FEFFDD', 1, 50000, 2 );
		lights[ 1 ] = new THREE.PointLight( '#F9F8F6', 1, 50000, 2 );
		lights[ 2 ] = new THREE.PointLight( '#F9F8F6', 1, 50000, 2 );
		lights[ 0 ].position.set( ...this.positionLight[0] );
		lights[ 1 ].position.set( ...this.positionLight[1] );
		lights[ 2 ].position.set( ...this.positionLight[2] );

		this.scene.add( ...lights );
    // 添加性能指标
		this.stats = new Stats();
		this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
		document.body.appendChild( this.stats.dom );
		// 添加整体风格
    let skyBoxMaterial = new THREE.MeshBasicMaterial({map: this.sceneTexture.day, side: THREE.DoubleSide, fog: false});
    this.sceneBox = new THREE.Mesh(
      new THREE.IcosahedronBufferGeometry( 5000, 1 ),  //盒子物体
      skyBoxMaterial
    );
    this.scene.add(this.sceneBox );
		// 设置相机位置
		this.camera.position.set(100, 100, 100);
		this.roadGrass();
		// 草地区域
    this.scene.add(grassarea.getArea());
		this.positionBuild();
		this.getOpacity();
		this.foot();
		this.axesHelper();
		this.initControl();
		this.loadWater();
		this.animate();
		this.redCar();
		this.randomBuild( 150 );
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      new THREE.Vector3( -10,  10, 0 ),
      new THREE.Vector3( -10, -10, 0 ),
      new THREE.Vector3(  10, -10, 0 )
    );
    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
    let mesh = new THREE.Mesh(geometry);
    let g = new THREE.PlaneGeometry(5,5);
    let mesh1= new THREE.Mesh(g);
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
		this.builds = builds;
		let entitiesBox = new THREE.Object3D();
    entitiesBox.name = 'entitiesBox';
		for(let key in positions) {
			if( positions[key].position.length ) {
				let { position, rotation } = positions[key];
				position.map((re, index)=>{
					let build = builds[key].clone();
					build.position.set(...re);
					key === 'main' ? build.rotateZ(rotation[index]) : build.rotateY(rotation[index]);
          build.name = 'entitiesBuild';
          entitiesBox.add(build);
				})
			}
		}
		this.scene.add(entitiesBox);
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
	  // 加载小区的道路
		let roadObjs = myGround.loadRoad();
		this.scene.add(roadObjs);
    // 加载公路
    let driveRoad = myGround.loadDriveWay();
    this.scene.add(driveRoad);
    // 加载河流
		let riverObjs = myGround.loadRiver();
		this.scene.add(...riverObjs);
    // 加载草坪
		let grassObjs = myGround.loadGrass();
		this.scene.add(grassObjs);
    // 加载树木
		myGround.loadTree().then(re => {
      this.scene.add(re);
    })
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
    car.position.z += this.roadDeflection*direction;
	}
	// 随机生成简单模型
  randomBuild( num ) {
	  let path = new THREE.CatmullRomCurve3([
	    new THREE.Vector3(650, 2, 500),
      new THREE.Vector3(650, 2, -500),
      new THREE.Vector3(-650, 2, -500),
      new THREE.Vector3(-650, 2, 500),
    ], true);
	  // 模糊物体所有的点位信息
    let points = path.getPoints( num );
    let geo = new THREE.BufferGeometry().setFromPoints( points );
    this.scene.add(new THREE.Line(geo));
	  let demoBuild = new THREE.BoxBufferGeometry(20, 45, 20);
	  let geometers = [];
	  // 合并为一个geometry对象
    for( let i=0; i<points.length; i++ ) {
      let { x, z } = points[i];
      let mz = THREE.Math.randFloat(-50, 50); // 偏移随机
      let s = THREE.Math.randFloat(0.6, 1.4);
      let cloneDemo = demoBuild.clone();
      cloneDemo.translate(x+mz, 45*s/2, z+mz);
      cloneDemo.scale( 1, s, 1 );
      geometers.push(cloneDemo);
    }
    let geometry = BufferGeometryUtils.mergeBufferGeometries( geometers );
    // geometry.computeBoundingBox();
    let mesh = new THREE.Mesh(geometry, new THREE.MeshToonMaterial({color: '#525352'}));
    this.scene.add(mesh);
  }
	// 动画
	animate(time) {
    TWEEN.update(time);
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
	// 添加obj模型
	async redCar() {
		let param = [{
			mtlUrl: '/models/redCar/file.mtl',
			objUrl: '/models/redCar/file.obj',
			deg: -Math.PI/2,
			scale: 0.001,
			position: this.computedRoal([-550, 2, -280])
		},{
			mtlUrl: '/models/scar/file.mtl',
			objUrl: '/models/scar/file.obj',
			deg: 0,
			scale: 0.003,
			position: this.computedRoal([-100, 2, -315])
		},{
      mtlUrl: '/models/fountain/file.mtl',
      objUrl: '/models/fountain/file.obj',
      scale: 6,
      position: [-138, 0, -120],
      noLight: true
    }]
		let car = await Promise.all(objModel(param));
		this.cars.smallCar = car[0];
		this.cars.truck = car[1];
		this.scene.add(...car);
	}
	// 加载水波动画
	loadWater() {
		let watergeometry = myGround.loadRiverWater();
		let textureLoader = new TextureLoader();
		let water = new Water(watergeometry,{
			color:'#a1d3ee',
			scale:.02,
      alpha: 1.0,
			normalMap0:textureLoader.load('./assets/image/Water_1_M_Normal.jpg'),
			normalMap1:textureLoader.load('./assets/image/Water_2_M_Normal.jpg'),
			flowDirection: new THREE.Vector2(-1,-1),
			textureWidth: 512,
			textureHeight: 512,
      distortionScale: 3.7,
      fog: this.scene.fog !== undefined
		});
		water.position.y = 5
		water.rotation.x = Math.PI*-0.5
		this.scene.add(water);
	}
  // 计算道路的偏移量
  computedRoal( tanslate ) {
    let [x, y, z] = tanslate;
    let z1 = z + this.roadDeflection * Math.abs(-550 - x) / 2;
    return [x, y, z1]
  }
  // 透明建筑物
  getOpacity() {
	  let builds = {}, that = this;
    for( let key in this.builds ) {
      let opc = getTransparent(this.builds[key]);
      builds[key] = opc;
    }
    let positions = this.positions;
    let opacityBox = new THREE.Object3D();
    opacityBox.name = 'opacityBox';
    opacityBox.visible = this.opacity;
    for(let key in positions) {
      if( positions[key].position.length ) {
        let { position, rotation } = positions[key];
        position.map((re, index)=>{
          let build = builds[key].clone();
          build.position.set(...re);
          key === 'main' ? build.rotateZ(rotation[index]) : build.rotateY(rotation[index]);
          build.name = 'opacityBuild';
          opacityBox.add(build);
        })
      }
    }
    this.scene.add(opacityBox);
  }
  // 过度动画
  transfrom(prop, sourceProp, time, show ) {
    let tween = new TWEEN.Tween(prop.scale)
      .to(sourceProp, time)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function( p ) {
        prop.scale.set(p.x, p.y, p.z);
      })
      .onComplete(function () {
        prop.visible = show;
        tween = null;
      })
      .start();
  }
  // node事件
  eventBtn() {
	  let btn = document.getElementById('opc');
	  let that = this;
    btn.addEventListener('click', function () {
      that.opacity = !that.opacity;
      let childrens = that.scene.children;
      // 显示
      if(!that.opacity) {
        that.scene.children[0].position.set( ...that.positionLight[0] );
        that.scene.children[1].position.set( ...that.positionLight[1] );
        that.scene.children[2].position.set( ...that.positionLight[2] );
        that.sceneBox.material.map = that.sceneTexture.day;
      } else {
        that.scene.children[0].position.set( that.positionLight[0][0]*10, that.positionLight[0][1]*10, that.positionLight[0][2]*10 );
        that.scene.children[1].position.set( that.positionLight[1][0]*10, that.positionLight[1][1]*10, that.positionLight[2][2]*10 );
        that.scene.children[2].position.set( that.positionLight[2][0]*10, that.positionLight[2][1]*10, that.positionLight[2][2]*10 );
        that.sceneBox.material.map = that.sceneTexture.night;
      }
      for(let i=0, j=childrens.length; i<j; i++) {
        if( childrens[i].name === 'entitiesBox' ) {
          let tprop = that.opacity ? {y: 1} : {y: 0};
          let sprop = that.opacity ? {y: 0} : {y: 1};
          let m = new TWEEN.Tween(tprop)
            .to(sprop, 600)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function( p ) {
              childrens[i].scale.y = p.y;
            })
            .onComplete(function () {
              childrens[i].visible = !that.opacity;
              m = null;
            }).start();
        }
        if( childrens[i].name === 'opacityBox' ){
          //[i].visible = that.opacity;
          let tprop = !that.opacity ? {y: 1} : {y: 0};
          let sprop = !that.opacity ? {y: 0} : {y: 1};
          let m = new TWEEN.Tween(tprop)
            .to(sprop, 600)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function( p ) {
              childrens[i].scale.y = p.y;
            })
            .onComplete(function () {
              childrens[i].visible = that.opacity;
              m = null;
            }).start();
        }
      }
    }, false)
  }
}
new RenderCanvas().init();
