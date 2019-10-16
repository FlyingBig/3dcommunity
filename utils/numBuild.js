class NumBuild {
	constructor() {
		this.path = [
			[0, 0],
			[25, 0],
			[25, 12],
			[39, 12],
			[39, 25],
			[-15, 25],
			[-15, 12],
			[0, 12],
			[0, 0],
		];
	}
	init() {
		// const box = new THREE.Object3D();
		const main = this.getMainBuild();
		// box.add(main);
		return main;
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
	getMainBuild() {
		const path = this.path;
		const box = new THREE.Object3D();
		const shape = new THREE.Shape();
		shape.moveTo(path[0][0], path[0][1]);
		for(let i=1; i<path.length; i++) {
			shape.lineTo(path[i][0], path[i][1]);
		}
		const geometry = new THREE.ExtrudeBufferGeometry(shape, {depth: 40, bevelEnabled: false});
		const texture = this.getTexture(`${BASEPATH.basePth}/assets/image/build3.jpg`,{ rx: .03, ry: .03 });
		const material = new THREE.MeshBasicMaterial({map: texture});
		const mesh = new THREE.Mesh(geometry, material);
		mesh.rotateX(Math.PI * -0.5);
		// 顶部
		const top = new THREE.ShapeBufferGeometry(shape);
		const texture1 = this.getTexture(`${BASEPATH.basePth}/assets/image/15.png`,{ rx: 1/30, ry: 1/25 });
		const material1 = new THREE.MeshBasicMaterial({map: texture1});
		const mesh1 = new THREE.Mesh(top, material1);
		mesh1.rotateX(Math.PI * -0.5);
		mesh1.position.set(0, 40.2, 0);
		box.add(mesh,mesh1);
		box.userData = {y: 40};
		return box;
	}
}
export default new NumBuild();
