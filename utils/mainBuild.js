/**
 * 小区建筑 ---- 圆柱体建筑
 *
 * */
class MainBuild {
  constructor() {
    this.path = [
      [0, 0],
      [60, 0],
      [60, -15],
      [50, -15],
      [50, -29],
      [35, -29],
      [35, -15],
      [25, -15],
      [25, -29],
      [10, -29],
      [10, -15],
      [0, -15],
      [0, 0]
    ];
  }
  //圆柱的顶部半径, 圆柱的底部半径, 圆柱的高度
  init() {
   let path = this.path;
   const box = new THREE.Object3D();
   const shape = new THREE.Shape();
    shape.moveTo(path[0][0], path[0][1]);
   for (let i=1; i< path.length; i++) {
     shape.lineTo(path[i][0], path[i][1]);
   }
    const extrudeSettings = { depth: 40, bevelSegments: 1, steps: 0, bevelSize: 0, bevelThickness: 1 };
    const geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
    const texture = this.getTexture('/assets/image/14.png',{rx: 1/30, ry: 1/40});
    const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: "#C9C9D3", map: texture}));
    geometry.computeBoundingBox();
    // 顶上地面
    const foot = this.getBuildTop();
    foot.position.set(0, 0, 41.5);
    box.add(foot);
    box.add(mesh);
    box.rotateX(Math.PI * -0.5);
    return box;
  }
  // 贴图方法
  getTexture( url, conf = {} ) {
    let { rx=1, ry=1 } = conf;
    let texture = new THREE.TextureLoader().load( url );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( rx, ry );
    return texture;
  }
  // 建筑房顶
  getBuildTop() {
    let path = this.path;
    const geometry =  new THREE.Shape();
    geometry.moveTo(path[0][0], path[0][1]);
    for(let i=1; i<path.length; i++) {
      geometry.lineTo(path[i][0], path[i][1]);
    }
    const shape = new THREE.ShapeBufferGeometry(geometry);
    const texture = this.getTexture('/assets/image/15.png',{rx: 1/30, ry: 1/20});
    const mesh = new THREE.Mesh(shape, new THREE.MeshBasicMaterial({map: texture}));
    return mesh;
  }

}
export default new MainBuild();
