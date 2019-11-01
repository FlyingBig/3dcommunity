/**
 * 集合物体融合计算
 * 参考：https://blog.csdn.net/qq_30100043/article/details/78944426
 * */
class ComputedBuild {
	cylinder() {
		let config = {
			material: {
				type: 'MeshBasicMaterial',
				color: "#EAD7A7"
			},
		};
		let parent = new THREE.CylinderGeometry(15, 15, 2, 32);
		let child = new THREE.CylinderGeometry(14.5, 14.5, 2, 32);
		let result = new ThreeBSP(parent).subtract(new ThreeBSP(child)).toMesh();
		let texture = new THREE.TextureLoader().load( 'assets/image/cylinderTop.png' );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 20, 1 );
		let t = new THREE.MeshBasicMaterial({
			color: '#B8A382',
			map: texture,
		});
		t.transparent = true;
		t.opacity = 1;
		result.material = t;
		return result;
	}
};
export default new ComputedBuild();

/**f
 *  === 根据集合体生成透明模型
 * geometry  集合模型
 * color 模型颜色
 * opacity 模型透明度
 * */
export const getTransparent = ( geometry, color = '#19EAFD', opacity = 0.2) => {
	let box = new THREE.Object3D();
	box.userData = geometry.userData;
	box.layers.mask = 2;
	if( geometry.type === 'Group' || geometry.type === 'Object3D' ) {
		let { position, rotation } = geometry;
		for( let i=0; i< geometry.children.length; i++ ) {
			box.add( getTransparent(geometry.children[i]) );
		}
		box.position.set(position.x, position.y, position.z);
		box.rotateX(rotation.x);
		box.rotateY(rotation.y);
		box.rotateZ(rotation.z);
		return box;
	} else {
		let { position, rotation, scale } = geometry;
		geometry = geometry.geometry;
		// 面
		const material1 = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: opacity});
		const face = new THREE.Mesh(geometry, material1);
		// 线
		const material2 = new THREE.MeshBasicMaterial({color: color, wireframe: true, transparent: true, opacity: opacity+0.2});
		const line = new THREE.Mesh(geometry, material2);
		// 点
		var material3 = new THREE.PointsMaterial({
			color: color,    //设置颜色，默认 0xFFFFFF
			size: 1
		});
		//const point = new THREE.Points(geometry, material3);
		// 纠正位置
		box.position.set(position.x, position.y, position.z);
		box.scale.set(scale.x, scale.y, scale.z);
		box.rotateX(rotation.x);
		box.rotateY(rotation.y);
		box.rotateZ(rotation.z);
		face.layers.mask = 2;
		line.layers.mask = 2;
		//point.layers.mask = 2;
		// box.add(face);
		box.add(line);
		//box.add(point);
		return box;
	}
}

/**
 *  === 改变模型的视角层级
 * geometry  模型
 * index 层级
 * */
export const changeModelIndex = ( geometry, index ) => {
	geometry.layers.mask = index;
	if(geometry.type === 'Object3D' || geometry.type === 'Group') {
		for(let i=0, j=geometry.children.length;i<j;i++) {
			let child = geometry.children[i];
			changeModelIndex(child, index);
		}
	}
}

export const clearMemoty = (obj)=>{
	if (!obj) return;
	if( obj instanceof THREE.Mesh) {
		obj.geometry.dispose();
		obj.material.dispose();
	} else {
		obj.traverse((item)=>{
			if(item instanceof THREE.Mesh) {
				item.geometry.dispose();
				item.material.dispose();
			}
		})
	}
};
/**
 * 添加画布渐变贴图
 * @param color  颜色 string(255,0,0,.8)
 * @param direct 方向 boolean
 * @param range  范围 number
 * @returns {HTMLElement}
 */
export const  createCanvasTexture = (color, direct, range) => {
	let canvas = document.createElement("canvas");
	canvas.width = 100;
	canvas.height = 100;
	let context = canvas.getContext("2d");
	var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
	if(direct) {
		gradient.addColorStop(0, 'rgba(' + color + ')');
		gradient.addColorStop(range, 'rgba(0,0,0,0)');
		gradient.addColorStop(1, 'rgba(0,0,0,0)');
	} else {
		gradient.addColorStop(1, 'rgba(' + color + ')');
		gradient.addColorStop(.7, 'rgba(0,0,0,0)');
		gradient.addColorStop(0, 'rgba(0,0,0,0)');
	}
	context.fillStyle = gradient;
	context.fillRect(0, 0, canvas.width, canvas.height);
	return canvas;
}
/**
 * 自定义弧形
 * @param deg  扇形角度
 * @param splitNum 切割数
 * @param length 弧的距离
 * @param interval 两个弧之间的距离
 * @param amount 拉伸厚度
 * @returns {THREE.ExtrudeGeometry}
 */
export const getFlowers = (deg, splitNum, length, interval=1.6, amount=.1)=>{
	let path = [], path1 = [], path2 = [];
	let baseDeg = Math.PI/180*deg/splitNum;
	let space = length-interval;
	for(let i=0; i<=splitNum; i++) {
		path1.push([Math.sin(baseDeg*i)*length,Math.cos(baseDeg*i)*length]);
		path2.push([Math.sin(baseDeg*i)*space,Math.cos(baseDeg*i)*space]);
	};
	path2.reverse();
	path = [...path1, ...path2];
	let shape = new THREE.Shape();
	shape.moveTo(path[0][0], path[0][1]);
	for(let i=1; i<path.length; i++) {
		shape.lineTo(path[i][0], path[i][1]);
	};
	let obj = {amount: amount, bevelEnabled: false, bevelThickness: 1};
	let geo = new THREE.ExtrudeGeometry(shape, obj);
	return geo;
}
/**
 * 修改uv坐标
 * @param geometry
 */
export const reMapUv = (geometry) => {
	var faces = geometry.faces;
	geometry.faceVertexUvs[0] = [];
	geometry.faces.forEach(function(face, index) {
		var components = ['x', 'y', 'z']
		var v1 = geometry.vertices[face.a];
		var v2 = geometry.vertices[face.b];
		var v3 = geometry.vertices[face.c];
		let distanceZ = 0;
		if(v1.z == v2.z && v1.z == v3.z) {
			distanceZ = 0;
		} else {
			distanceZ = v1.z || v2.z || v3.z;
		}
		let g = [];
		// 判断是否为二维图形
		if( !distanceZ) {
			// 若为二维图形, 直接使用各个顶点的坐标
			g.push(
				new THREE.Vector2(v1.x, v1.y),
				new THREE.Vector2(v2.x, v2.y),
				new THREE.Vector2(v3.x, v3.y)
			)
		} else {
			// 若为三维图形, 则使用同一平面的点的距离作为uv的x轴,异面点的距离作为y轴;
			let distanceX = 0; // x轴
			let distanceY = 0; // y轴
			// 找出二维坐标
			if(v1.z === v2.z ) {
				distanceX = Math.sqrt(Math.pow((v1.x-v2.x),2)+Math.pow((v1.y-v2.y),2));
				distanceY = Math.abs(v3.z - v1.z);
			} else if(v1.z === v3.z) {
				distanceX = Math.sqrt(Math.pow((v1.x-v3.x),2)+Math.pow((v1.y-v3.y),2));
				distanceY = Math.abs(v2.z - v1.z);
			} else {
				distanceX = Math.sqrt(Math.pow((v3.x-v2.x),2)+Math.pow((v3.y-v2.y),2));
				distanceY = Math.abs(v1.z - v2.z);
			}

			if(index % 2 === 0){
				g.push(
					new THREE.Vector2(0, 0),
					new THREE.Vector2(distanceX, 0),
					new THREE.Vector2(0, distanceY)
				)
			} else {
				g.push(
					new THREE.Vector2(distanceX, 0),
					new THREE.Vector2(distanceX, distanceY),
					new THREE.Vector2(0, distanceY)
				)
			}
		}
		geometry.faceVertexUvs[0].push(g);
	});
}