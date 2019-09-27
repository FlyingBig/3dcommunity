/**
 * 小区建筑 ---- 圆柱体建筑
 *
 * */
export default class PolygonBuild {
  //圆柱的顶部半径, 圆柱的底部半径, 圆柱的高度
  constructor( ) {
    this.path = [
      [0, 0],
      [32, 0],
      [32, -45],
      [-3, -45],
      [-3, -32],
      [20, -32],
      [20, -15],
      [0, -15],
      [0, 0]
    ];
  };
  init( path) {
    const box = new THREE.Object3D();
    // 主体构造
    const shape = new THREE.Shape();
    shape.moveTo(this.path[0][0], this.path[0][1]);
    for(let i = 1; i<this.path.length; i++) {
      shape.lineTo(this.path[i][0], this.path[i][1]);
    }
    const extrudeSettings = { depth: 12, bevelSegments: 2, steps: 1, bevelSize: 1, bevelThickness: 1 };
    const geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );

    let texture = this.getTexture( '/assets/image/wall.png' );
    const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: "#C9C9D3"}));
    box.add(mesh);
    // 窗户贴图
    const window =  this.getWindowForOne('/assets/image/door1.jpg',20, 12);
    window.rotateX(Math.PI*0.5);
    window.position.set(9, -16.2, 6);
    let windowFon = window.clone();
    windowFon.position.set(20, -46.2, 6);
    windowFon.scale.set(1.2, 1, 1);
    box.add(window);
    box.add(windowFon);
    // 门贴图
    const door =  this.getDoor(4, 5);
    door.rotateX(Math.PI*0.5);
    door.position.set(5, -46.2, 3);
    box.add(door);
    // 楼顶道路
    const walk =  this.getTop(13, 45);
    walk.position.set(26, -22.4, 13.1);
    box.add(walk);
    const walk1 =  walk.clone();
    walk1.rotateZ(Math.PI * 0.5);
    walk1.position.set(14, -38.7, 13.1);
    walk1.scale.set(1.1,0.8,1);
    box.add(walk);
    box.add(walk1);
    // 顶上建筑
    const topBuild = this.getTopBuild(24, 14,5);
    topBuild.position.set(11, -7, 16);
    const wapian = this.getTopBuildWap(24, 14);
    wapian.position.set(11, -7, 18.6);
    const window2 =  this.getWindowForOne('/assets/image/12.jpg',24, 5, 4, 1);
    window2.rotateX(Math.PI * 0.5);
    window2.position.set(11, -14.2, 16);
    const k = new THREE.Object3D();
    k.add(wapian, topBuild, window2);
    let copyk = k.clone();
    copyk.position.set(-3, -31.2, 0);
    box.add(k);
    box.add(copyk);
    box.rotateX( Math.PI * -0.5 );
    box.userData = {y: 20};
    return box;
  }
  // 贴图方法
  getTexture( url, conf = {} ) {
    let { rx = 1, ry = 1 } = conf;
    let texture = new THREE.TextureLoader().load( url );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( rx, ry );
    return texture;
  }
  // 材质生成
  getMaterial( conf ) {
    let { type, color } = conf;
    let { map } = this.config; //贴图设置
    let material = {}; // 贴图容器
    // 材质需要贴图
    if( this.config.map ) {
      let texture = this.getTexture(this.config.map.url);
      material = eval(`new THREE.${type}( { color: ${color}, ${map.type}: texture } )`);
      return material;
    };
    material = eval(`new THREE.${type}( {color: '${color}'} )`);
    return material;
  }
  assignUVs(geometry) {
    geometry.computeBoundingBox();
    var max = geometry.boundingBox.max,
      min = geometry.boundingBox.min;
    var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
    var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
    var faces = geometry.faces;
    geometry.faceVertexUvs[0] = [];
    for (var i = 0; i < faces.length ; i++) {
      var v1 = geometry.vertices[faces[i].a],
        v2 = geometry.vertices[faces[i].b],
        v3 = geometry.vertices[faces[i].c];
      geometry.faceVertexUvs[0].push([
        new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
        new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
        new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
      ]);
    }
    geometry.uvsNeedUpdate = true;
  }
  getWindowForOne(url, w, h, x, y ) {
    x = x || 4;
    y = y || 3;
    const geometry = new THREE.PlaneBufferGeometry( w, h );
    const texture = this.getTexture( url, { rx: x, ry: y});
    const door = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "#fff", map: texture}));
    return door;
  }
  getDoor( w, h ) {
    const geometry = new THREE.PlaneBufferGeometry( w, h );
    const texture = this.getTexture('/assets/image/door.jpg', { rx: 1, ry: 1});
    const door = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "#fff", map: texture}));
    return door;
  }
  getTop( w, h ) {
    const geometry = new THREE.PlaneBufferGeometry( w, h );
    const texture = this.getTexture('/assets/image/11.jpg', { rx: 5, ry: 5});
    const door = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "#fff", map: texture}));
    return door;
  }
  getTopBuild( w, h, d ) {
    const geometry = new THREE.BoxBufferGeometry( w, h, d );
    const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: "#A7A8B1"}));
    return mesh;
  }
  getTopBuildWap(  w, h  ) {
    const geometry = new THREE.PlaneBufferGeometry( w, h );
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: "#6D6D79"}));
    return mesh;
  }
}
