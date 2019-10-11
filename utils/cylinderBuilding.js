import computed from "./bspComputed";

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
  };
  init() {
    const box = new THREE.Object3D();
    const geometry = new THREE.CylinderBufferGeometry( this.radiusTop, this.radiusBottom, this.height, 16 );
    const texture1 = this.getTexture('/assets/image/circle.png',{ rx: 16, ry: 17 });
    const material = new THREE.MeshBasicMaterial({map: texture1});
    const cylinder = new THREE.Mesh( geometry, material );
    // 顶上遮盖
    const top = new THREE.CircleBufferGeometry(15, 8);
    const texture = this.getTexture('/assets/image/19.png',{ rx: 4, ry: 4 });
    const mesh = new THREE.Mesh(top, new THREE.MeshBasicMaterial({color: "#F6F7F8", map: texture}));
    cylinder.position.set(0,21,0);
    box.add(cylinder);
    mesh.position.set(0, 45, 0);
    mesh.rotateX(-Math.PI/2);
    box.add(mesh);
    cylinder.position.set(0,21,0);
    // 顶部圆形
    let cTop = computed.cylinder();
    cTop.position.set(0, 47, 0);
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
}
