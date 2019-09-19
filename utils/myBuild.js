class MyBuild {
  constructor(){
    // 椭圆的pointer
    this.ellipsePath = new THREE.EllipseCurve(
      0, 0,
      30, 64
    ).getPoints(50);
  }
  init() {
    const points = this.ellipsePath;
    const box = new THREE.Object3D();
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    for(let i=1; i<points.length; i++ ) {
      shape.lineTo(points[i].x, points[i].y);
    }
    const extrudeSettings = { depth: 80, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 1 };
    const geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
    const texture = this.getTexture('/assets/image/16.png',{ rx: 1/ 4, ry: 1/10 });
    const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: "#C9C9D3", map: texture}));
    mesh.rotateX(Math.PI * 0.5);
    // 房屋顶上
    const top = this.ellipseTop();
    top.position.set(0, 1.5, 0);
    top.rotateX(Math.PI * -0.5);
    box.add(top);
    box.add(mesh);
    // 底层多边形
    const basic = this.bottomBuild();
    basic.position.set(20, -80, 50);
    box.add(basic);
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
  // 椭圆顶层
  ellipseTop() {
    const points = this.ellipsePath;
    const shape = new THREE.Shape();
    shape.moveTo(points[0].x, points[0].y);
    for(let i=1; i<points.length; i++ ) {
      shape.lineTo(points[i].x, points[i].y);
    }
    const geometry = new THREE.ShapeBufferGeometry(shape);
    const texture = this.getTexture('/assets/image/19.png',{ rx: 1/ 4, ry: 1/10 });
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: "#F6F7F8", map: texture}));
    return mesh;
  }
  // 半圆建筑
  halfCircle() {
    const box = new THREE.Object3D();
    const points = this.getHalfCirclePoints();
    const shape = new THREE.Shape();
    shape.moveTo(points[0][0], points[0][1]);
    for(let i=1; i<points.length; i++ ) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    const extrudeSettings = { depth: 10, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 1 };
    const geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
    const texture = this.getTexture('/assets/image/16.png',{ rx: 1/ 4, ry: 1/10 });
    const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ map: texture}));
    // 贴纸
    const foot = new THREE.ShapeBufferGeometry(shape);
    const texture1 = this.getTexture('/assets/image/17.png',{ rx: 1/ 4, ry: 1/10 });
    const footImg = new THREE.Mesh(foot, new THREE.MeshBasicMaterial({map: texture1}))
    box.add(mesh);
    footImg.position.set(0, 0, 11.1);
    box.add(footImg);
    box.rotateX(Math.PI * -0.5);
    return box;
  }
  // 获取半圆点位
  getHalfCirclePoints(radius) {
    let points = [];
    for(let i=1; i<=50; i++) {
      let deg = Math.PI * (i / 50);
      points.push([Math.cos(deg)*20, Math.sin(deg)*20]);
    }
    points.unshift([radius, 0])
    points.push([-radius, 0], [radius, 0]);
    return points;
  }
  // 明宇底层
  bottomBuild() {
    const box = new THREE.Object3D();
    const shape = new THREE.Shape();
    shape.moveTo(0,-10);
    shape.lineTo(0,72);
    shape.bezierCurveTo(0,78,5,95,20,95);
    shape.lineTo(70,96);
    shape.lineTo(70,65);
    shape.bezierCurveTo(30,32,30,-10,0,-10);
    const extrudeSettings = { depth: 20, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 1 };
    const geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
    const texture = this.getTexture('/assets/image/16.png',{ rx: 1/ 4, ry: 1/10 });
    const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ map: texture}));
    mesh.rotateX(Math.PI * -0.5);
    // 顶上贴纸
    const foot = new THREE.ShapeBufferGeometry(shape);
    const texture1 = this.getTexture('/assets/image/17.png',{ rx: 1/ 4, ry: 1/10 });
    const footImg = new THREE.Mesh(foot, new THREE.MeshBasicMaterial({map: texture1}))
    box.add(mesh);
    footImg.rotateX(Math.PI * -0.5);
    footImg.position.set(0, 21.1, 1);
    box.add(footImg);
    // 底层半圆
    const halfCircle = this.halfCircle();
    halfCircle.position.set(35, 22, -20);
    halfCircle.rotateZ(Math.PI*0.31);
    box.add(halfCircle);
    // 草坪
    const lawn = this.getLawn();
    lawn.position.set(20, 22, -75);
    box.add(lawn);
    const lawn1 = lawn.clone();
    lawn1.position.set(36, 22, -78);
    box.add(lawn1);
    const lawn2 = lawn.clone();
    lawn2.position.set(48, 22, -70);
    box.add(lawn2);
    return box;
  }
  // 草坪
  getLawn() {
    const geometry = new THREE.CircleBufferGeometry( 5, 32 );
    const texture = this.getTexture('/assets/image/18.png');
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    const lawn = new THREE.Mesh( geometry, material );
    lawn.rotateX(Math.PI * -0.5);
    return lawn;
  }
}
export default new MyBuild();
