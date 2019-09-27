import {TextureLoader} from "three";

require('three-orbitcontrols');
require('./assets/index');
require('./node_modules/threebsp/index');
require('./node_modules/three/src/extras/Earcut');
let demoData = require('./json/build.json');

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
import parking from './utils/parking';
import fontTexture from './utils/fontTexture';
import elevator from './utils/elevator';

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
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
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
    this.positionLight = [
      [-500, 400, -1200], [200, 400, 1200 ], [500, 400, 1200],
      [-5000, 4000, -12000], [2000, 4000, 12000 ], [5000, 4000, 12000],
    ];
    // 场景贴图控制
    this.sceneTexture = {
      day: new THREE.TextureLoader().load( '/assets/image/sky.jpg'),
      night: new THREE.TextureLoader().load( '/assets/image/night.jpg', texture=>{
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 2);
      })
    };
		// 车辆模型集合
		this.cars = {};
		// 性能指标
		this.stats = {};
		// 道路偏转系数
    this.roadDeflection = 0;
    // 所有建筑类型
    this.builds = {};
    // 草坪
    this.diffModel = {};
    // 透明模式
    this.opacity = false;
    this.eventBtn();
	}
	// 启动函数
	init() {
		// 设置画布大小/颜色
		const contrain = document.getElementById('app');
		this.renderer.setSize(contrain.clientWidth, contrain.clientHeight);
		// this.renderer.setClearColor("red");
		contrain.appendChild(this.renderer.domElement);
		// 添加灯光
    let lightsDay = [];
    lightsDay[ 0 ] = new THREE.PointLight( '#FEFFDD', 1, 50000, 2 );
    lightsDay[ 1 ] = new THREE.PointLight( '#F9F8F6', 1, 50000, 2 );
    lightsDay[ 2 ] = new THREE.PointLight( '#F9F8F6', 1, 50000, 2 );
    lightsDay[ 0 ].position.set( ...this.positionLight[0] );
    lightsDay[ 1 ].position.set( ...this.positionLight[1] );
    lightsDay[ 2 ].position.set( ...this.positionLight[2] );
		// 夜晚的灯光位置，层级信息
		let lightsNight = [];
    lightsNight.push(lightsDay[ 0 ].clone());
    lightsNight.push(lightsDay[ 0 ].clone());
    lightsNight.push(lightsDay[ 0 ].clone());
    lightsNight[0].layers.mask = 2;
    lightsNight[0].position.set(...this.positionLight[3]);
    lightsNight[1].layers.mask = 2;
    lightsNight[1].position.set(...this.positionLight[4]);
    lightsNight[2].layers.mask = 2;
    lightsNight[2].position.set(...this.positionLight[5]);
		this.scene.add( ...lightsDay, ...lightsNight);
    // 添加性能指标
		this.stats = new Stats();
		this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
		document.body.appendChild( this.stats.dom );
		// 添加晴天天空
    let skyBoxMaterial = new THREE.MeshBasicMaterial({map: this.sceneTexture.day, side: THREE.DoubleSide, fog: false});
    let sceneBox = new THREE.Mesh(
      new THREE.IcosahedronBufferGeometry( 5000, 1 ),  //盒子物体
      skyBoxMaterial
    );
    // 添加夜晚天空
    let nightBoxMaterial = new THREE.MeshBasicMaterial({map: this.sceneTexture.night, side: THREE.DoubleSide, fog: false});
    let nightBoxM = new THREE.Mesh(
      new THREE.IcosahedronBufferGeometry( 5000, 1 ),  //盒子物体
      nightBoxMaterial
    );
    nightBoxM.layers.mask = 2;
    this.scene.add(sceneBox,  nightBoxM);
		// 设置相机位置
		this.camera.position.set(100, 100, 100);
		this.camera.lookAt(0,0,0);
		this.roadGrass();
    this.scene.add(grassarea.getArea());
		this.positionBuild();
		this.getOpacity();
		this.foot();
		this.axesHelper();
		this.initControl();
		// this.loadWater();
		this.animate();
		this.redCar();
		this.loadGarbages();
		this.loadLamps();
		this.randomBuild( 150 );
    this.loadParking();
    this.mouseEvent();
    this.addRain();
    this.loadHydrant();
    this.addElevator();
	}
	// 添加缩放拖拽控制器
	initControl() {
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25
    this.controls.rotateSpeed = 0.35
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
          build.matrixAutoUpdate = false;
          build.updateMatrix();
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
		// 相机第二视角的底图
		let meshIndex = mesh.clone();
		meshIndex.layers.mask = 2;
		this.scene.add(mesh, meshIndex);
	}
	// 加载草坪，道路
	roadGrass() {
	  // 加载小区的道路
		// let roadObjs = myGround.loadRoad();
		// this.scene.add(roadObjs);
    // // 加载公路
    // let driveRoad = myGround.loadDriveWay();
    // this.scene.add(driveRoad);
    // 加载河流
		let riverObjs = myGround.loadRiver();
		this.scene.add(...riverObjs);
    // 加载草坪
		this.diffModel.grass = myGround.loadGrass();
		this.scene.add(this.diffModel.grass);
/*    // 加载树木
		myGround.loadTree().then(re => {
      this.scene.add(re);
    })*/
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
    this.diffModel.random = mesh;
    this.scene.add(this.diffModel.random);
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
    if(myGround.cloud&&myGround.cloud.visible){
      this.renderRain();
    }
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
    // 停车长汽车位置摆放
    let car1 = car[0].children[2].clone();
    car1.children.map((v)=>{
      v.matrixAutoUpdate = false;
    });
    car1.position.set(-167,2,67);
    car1.rotateY(Math.PI/2);
    car1.matrixAutoUpdate = false;
    car1.updateMatrix();
    let car3 = car1.clone();
    car3.position.x = -150;
    car3.updateMatrix();
    let car4 = car1.clone();
    car4.position.x = -154;
    car4.position.z = 38;
    car4.rotateY(Math.PI);
    car4.updateMatrix();
    let car2 = car[1].children[2].clone();
    car2.position.set(-185.5,2,65);
    car2.rotateY(Math.PI/2);
    car2.matrixAutoUpdate = false;
    car2.updateMatrix();
    this.scene.add(car1, car2, car3, car4);
	}
	// 添加消防栓模型
  async loadHydrant() {
	  let position = [[20, 1, -3], [-20, 1, 7], [-70, 1, 7],  [-220, 1, 20], [-16, 1, -100], [100, 1, -70]];
	  let param = [{
     mtlUrl: '/models/hydrant/file.mtl',
     objUrl: '/models/hydrant/file.obj',
     //deg: -Math.PI/2,
     //scale: 0.001,
     noLight: true,
    }];
	  let model = await Promise.all(objModel(param)); // 获取模型
    let obj = new THREE.Object3D();
    position.map((v)=>{
      let c = model[0].clone();
      c.position.set(...v);
      obj.add(c);
    })
	  this.scene.add(obj);
  }
	// 加载水波动画
	loadWater() {
	  // 河流水波
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
		water.rotation.x = Math.PI*-0.5;

		let fountrinWater = new THREE.CircleBufferGeometry(8, 32);
    let water1 = new THREE.Mesh(fountrinWater, new THREE.MeshPhongMaterial({color: '#a1d3ee'}))
    water1.position.set(-138, 0, -120);
    water1.rotation.x = Math.PI*-0.5;
    water1.position.y = 2
    this.scene.add( water, water1);
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
    //opacityBox.visible = this.opacity;
    // 图层显示
    opacityBox.layers.mask = 2;
    for(let key in positions) {
      if( positions[key].position.length ) {
        let { position, rotation } = positions[key];
        position.map((re, index)=>{
          let build = builds[key].clone();
          build.position.set(...re);
          key === 'main' ? build.rotateZ(rotation[index]) : build.rotateY(rotation[index]);
          build.name = 'opacityBuild';
          build.userData.id = `${key}${index}`;
          build.matrixAutoUpdate = false;
          build.updateMatrix();
          opacityBox.add(build);
        })
      }
    };
    this.scene.add(opacityBox);
  }
  // 物体层级改变
  changeBuildIndex() {
    let cameraIndex = this.opacity ? 2 : 1;
	  // 草坪层级
    this.diffModel.grass.layers.mask = cameraIndex;
    for(let i=0; i<this.diffModel.grass.children.length; i++) {
      this.diffModel.grass.children[i].layers.mask = cameraIndex;
    }
    // 周围随机建筑
    this.diffModel.random.layers.mask = cameraIndex;
  }
  // 过度动画
  transfrom(prop, time, cameraIndex ) {
	  let that = this;
    let tween = new TWEEN.Tween({y: 1})
      .to({y: 0}, time)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function( p ) {
        prop.scale.y = p.y;
      })
      .onComplete(function () {
        that.camera.layers.mask = cameraIndex;
        that.changeBuildIndex();
        prop.scale.y = 1;
        tween = that = null;
      }).start();
  }
  // node事件
  eventBtn() {
    let btn = document.getElementById('opc');
    let that = this;
    // 切换模式
    btn.addEventListener('click', function () {
      that.opacity = !that.opacity;
      let childrens = that.scene.children;
      for(let i=0, j=childrens.length; i<j; i++) {
        if( childrens[i].name === 'entitiesBox' && that.opacity) {
          let cameraIndex = that.opacity ? 2 : 1;
          that.transfrom(childrens[i], 600, cameraIndex);
        }
        if( childrens[i].name === 'opacityBox' && !that.opacity){
          let cameraIndex = that.opacity ? 2 : 1;
          that.transfrom(childrens[i], 600, cameraIndex);
        }
      }

    }, false)
    // 关闭video
    let closeVideo = document.getElementById('closeVideo')
    closeVideo.addEventListener('click',function(){
      document.getElementsByTagName('video')[0].setAttribute('src','')
      document.getElementById('videoPanel').style.display = 'none'
    },false)
    // 下雨状态
    let rainBtn = document.getElementById('rain');
    rainBtn.addEventListener('click',function(){
      if (myGround.cloud){
        if(myGround.cloud.visible){
          myGround.cloud.visible = false;
        }else {
          myGround.cloud.visible = true;
        }
      }
    })
    // 电梯上升
    let up = document.getElementById('up');
    up.addEventListener('click',function(){
      let childrens = that.scene.children;
      let g = null;
      for(let i=0, j=childrens.length; i<j; i++) {
        if( childrens[i].name === 'elevator' ) {
          g = childrens[i];
          break;
        }
      }
      elevator.runningElevator(g);
    })
  }
  //添加垃圾桶
	loadGarbages (){
		let garbages = myGround.loadGarbageBin();

		this.scene.add(...garbages)
	}
	//添加路灯
	loadLamps (){
		let lamps = myGround.loadLamp();
		this.scene.add(...lamps)
	}
	// 停车场
  loadParking() {
	  let groundPark = parking.init();
    groundPark.position.set(-170,2,52);
	  this.scene.add(groundPark);
  }
  // 消息提示框
  messageBox( str, position ) {
	  str = str || [{title: "房屋类型", content: '商业住宅房子'},{title: '楼牌号', content: "7幢1单元"},{title: '楼层数', content: '22层'},{title: '户型', content: '两梯四户'}];
	  let message = fontTexture.init(str);
    message.scale.set(.5,.5,.5);
    message.position.set(position.x+60, position.y+30, position.z);
	  this.scene.add(message);
  }
  // 雨滴效果
  mouseEvent(){
    let that = this;
    //鼠标双击进入观察状态
    document.addEventListener("dblclick",function(event){
      let mouse = {x:'',y:''}
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      let raycaster = new THREE.Raycaster();
      // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
      raycaster.setFromCamera( mouse, that.camera );
      // 获取raycaster直线和所有模型相交的数组集合
      var intersects = raycaster.intersectObjects(that.scene.children,true);
      // 选中物体的第一个
      let obj = intersects[0].object;
      if( intersects.length ){
        // 点击摄像机移动视角并播放视
        if ( obj.name === 'camera') {
            let position = intersects[0].point;
            let cameraPosition = that.camera.position;
            that.camera.lookAt(position.x,position.y,position.z)
            that.controls.target = new THREE.Vector3(position.x,position.y,position.z);
            let tween = new TWEEN.Tween(cameraPosition).to(
              {
                x:position.x+10,
                y:position.y+10,
                z:position.z+10
              },1200
            ).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){
              that.camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z)
              that.camera.lookAt(position.x,position.y,position.z)
            }).onComplete(function () {
              document.getElementById("videoPanel").style.display = "block";
              document.getElementsByTagName("video")[0].style.display = "block"
              document.getElementsByTagName("video")[0].setAttribute("src","./assets/image/test.mp4");
              tween = null;
            }).start()
        }
        // 删除消息盒子
        if ( obj.parent.name === 'messageBox') {
          let t = new TWEEN.Tween({x: .5, y: .5, z: .5})
            .to({x: 0, y: 0, z: 0}, 800)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function (res) {
              obj.parent.scale.set(res.x, res.y, res.z);
            })
            .onComplete(function () {
              // 删除掉所有的模型组内的mesh
              obj.parent.traverse(function (item) {
                if (item instanceof THREE.Mesh) {
                  item.geometry.dispose(); // 删除几何体
                  item.material.dispose(); // 删除材质
                }
              });
              that.scene.remove(obj.parent);
              t = null;
            }).start();
        }
      };

      // 透明建筑射线碰撞
      let opacityRay = new THREE.Raycaster();
      opacityRay.setFromCamera( mouse, that.camera );
      let targetMesh = null; //  碰撞对象
      for(let i=0; i<that.scene.children.length; i++) {
        if(that.scene.children[i].name === 'opacityBox') {
          targetMesh = that.scene.children[i];
          break;
        }
      }
      let objs = raycaster.intersectObject(targetMesh, true);
      if( objs.length ) {
        let findParent = function( child ) {
          if( child.parent.name !==  'opacityBuild' ) {
            child = child.parent;
            return findParent(child);
          } else {
            return child.parent;
          }
        }
        let parent = findParent(objs[0].object);
        let position = parent.position;
        position.y = parent.userData.y;
        let data = demoData[parent.userData.id];
        that.messageBox( data, position );
      }
    })
    document.addEventListener("contextmenu",function(event){
      that.outlook()
    })
  }
  outlook(){
    let that = this;
    that.camera.lookAt(0,0,0)
    that.controls.target = new THREE.Vector3(0,0,0);
    let cameraPosition = that.camera.position
    let tween = new TWEEN.Tween(cameraPosition).to(
      {
        x:100,
        y:100,
        z:100
      },2000
    ).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){
      that.camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z)
      that.camera.lookAt(0,0,0)
    }).start()
  }
  renderRain(){
    let vertices = myGround.cloud.geometry.vertices;
    vertices.forEach(function(v){
      v.y = v.y - (v.velocityY)*9;
      v.x = v.x - (v.velocityX)*.5;

      if (v.y <= -60) v.y = 60;
      if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
    })
    myGround.cloud.geometry.verticesNeedUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }
  addRain(){
    let rain = myGround.createRain()
    this.scene.add(rain)
  }
  // 添加电梯模型
  addElevator() {
	  let model = elevator.init();
    model.position.set(-10, 4 , -30);
	  this.scene.add(model);
  }
}
new RenderCanvas().init();
