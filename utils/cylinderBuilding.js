import computed,{ createCanvasTexture, getFlowers, reMapUv } from "./bspComputed";
import TWEEN from '@tweenjs/tween.js';
import fontTexture from './fontTexture';
/**
 * 小区建筑 ---- 圆柱体建筑
 *
 * */
export default class CylinderBuild {
	//圆柱的顶部半径, 圆柱的底部半径, 圆柱的高度
	constructor( param = {}) {
		let { radiusTop, radiusBottom, height } = param;
		this.radiusTop = radiusTop || 15;
		this.radiusBottom = radiusBottom || 15;
		this.height = height || 47;
		this.animation = {};
	};
	init() {
		const box = new THREE.Object3D();
		const geometry = new THREE.CylinderBufferGeometry( this.radiusTop, this.radiusBottom, this.height, 16 );
		const texture1 = this.getTexture(`${BASEPATH.basePth}/assets/image/build.jpg`,{ rx: 3, ry: 2 });
		const material = new THREE.MeshBasicMaterial({map: texture1});
		const cylinder = new THREE.Mesh( geometry, material );
		// 顶上遮盖
		const top = new THREE.CircleBufferGeometry(15, 30);
		const texture = this.getTexture(`${BASEPATH.basePth}/assets/image/19.png`,{ rx: 4, ry: 4 });
		const mesh = new THREE.Mesh(top, new THREE.MeshBasicMaterial({color: "#F6F7F8", map: texture}));
	cylinder.position.set(0,21,0);
		box.add(cylinder);
		mesh.position.set(0, 44.7, 0);
		mesh.rotateX(-Math.PI/2);
		box.add(mesh);
		cylinder.position.set(0,21,0);
		// 顶部圆形
		let cTop = computed.cylinder();
		cTop.position.set(0, 45.5, 0);
		box.add(cTop);
		box.userData = {y: 47};
		return box;
	}
	// 贴图方法
	getTexture( url, conf = {} ) {
		let {rx = 1, ry = 1} = conf;
		let texture = new THREE.TextureLoader().load(url);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(rx, ry);
		return texture;
	}

	/**
	 * 返回每层楼的结构
	 * @param Array  data 每层消息点位的数据 eg: [{position:[0,0,0], message: '.......'}]
	 * @returns {THREE.Object3D}
	 */
	getFloor(data) {
		data = data[0];
		let box = new THREE.Object3D();
		let centerWidth = 5; // 中心物体的边长
		var circle = new THREE.CircleBufferGeometry( 20, 32 );
		var circleMaterial = new THREE.MeshBasicMaterial( { color: '#70DFE5', transparent: true, opacity: .8, side: THREE.DoubleSide} );
		var circleMesh = new THREE.Mesh( circle, circleMaterial );
		circleMesh.rotateX(Math.PI/2);
		circleMesh.position.y = -1;
		let center = new THREE.BoxBufferGeometry(centerWidth,2,1);
		let material = new THREE.MeshBasicMaterial({transparent: true, opacity: .3, color: '#70DFE5'});
		let cell = new THREE.Mesh(center, material);
		cell.layers.mask = 2;  // 相机第二视角
		cell.position.z = -centerWidth/2;
		let cell1 = cell.clone();
		cell1.position.z = centerWidth/2;
		let cell2 = cell.clone();
		cell2.rotateY(Math.PI/2);
		cell2.position.x = -centerWidth/2;
		cell2.position.z = 0;
		let cell3 = cell2.clone();
		cell3.position.x = centerWidth/2;
		cell3.position.z = 0;
		let roundWidth = 12; // 周围物体长度
		let round = new THREE.BoxBufferGeometry(roundWidth,2,1);
		let roundmaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: .3, color: '#70DFE5'});
		let roundcell = new THREE.Mesh(round, roundmaterial);
		roundcell.layers.mask = 2;  // 相机第二视角
		roundcell.position.x = roundWidth/2+centerWidth/2+.5;
		let roundcell_1 = roundcell.clone();
		roundcell_1.position.x = -(roundWidth/2+centerWidth/2+.5);
		let roundcell_2 = roundcell.clone();
		roundcell_2.rotateY(Math.PI/2);
		roundcell_2.position.x = 0;
		roundcell_2.position.z = roundWidth/2+centerWidth/2+.5;
		let roundcell_3 = roundcell.clone();
		roundcell_3.rotateY(Math.PI/2);
		roundcell_3.position.x = 0;
		roundcell_3.position.z = -(roundWidth/2+centerWidth/2+.5);
		box.add(cell,cell1,cell2,cell3,roundcell, roundcell_1, roundcell_2, roundcell_3);
		// 闪烁点
		let texture = new THREE.CanvasTexture(createCanvasTexture('249,73,69,1', true, 1));
		let randomM = new THREE.SpriteMaterial({map: texture});
		var centerR = new THREE.Sprite(randomM);
		centerR.scale.set(5, 5, 5);
		centerR.layers.mask = 2;
		centerR.position.set(...data.position);
		// 添加出错信息
		let message = fontTexture.init(data.message);
		message.position.set(data.position[0]+15,data.position[1],data.position[2]-2);
		box.add(message);
		// 围墙
		let wall = getFlowers(360,32,15,.1,3);
		let wallMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: .4, color: '#70DFE5'});
		let wallMesh = new THREE.Mesh(wall, wallMaterial);
		wallMesh.layers.mask = 2;
		wallMesh.position.y = 2.5;
		wallMesh.rotateX(Math.PI/2);
		box.add(wallMesh);
		// 地板
		let floorWave = new THREE.CanvasTexture(createCanvasTexture('78,224,229,.6', true, 1));
		let floorMaterial = new THREE.MeshBasicMaterial({map: floorWave, side: THREE.DoubleSide});
		let floorLine = new THREE.CircleBufferGeometry(15, 32);
		let floorMesh = new THREE.Mesh(floorLine, floorMaterial);
		floorMesh.layers.mask = 2;
		floorMesh.rotateX(Math.PI/2);
		floorMesh.position.y = -.7;
		// 波浪线
		let textureWave = new THREE.CanvasTexture(createCanvasTexture('224,42,39,1', false, .7));
		let materialWave = new THREE.MeshBasicMaterial({map: textureWave, side: THREE.DoubleSide});
		let waveLine = new THREE.CircleBufferGeometry(4, 32);
		let waveMesh = new THREE.Mesh(waveLine, materialWave);
		waveMesh.layers.mask = 2;
		waveMesh.rotateX(Math.PI/2);
		waveMesh.position.set(...data.position);
		waveMesh.position.y = -.5;
		box.add(centerR, waveMesh, floorMesh);
		// 波浪动画
		let animation = new TWEEN.Tween({size: .7})
			.to({size: 1.2},1000)
			.easing(TWEEN.Easing.Quadratic.Out)
			.onUpdate((v)=>{
				waveMesh.scale.set(v.size, v.size, v.size);
			}).repeat(Infinity).start();
		// 储存当前运动状态

		this.animation.wave = animation;
		box.name = 'policeAddress';
		return box;
	}

}
