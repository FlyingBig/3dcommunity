/**
 * 小区建筑 ---- 圆柱体建筑
 *
 * */
export default class CylinderBuild {
  //圆柱的顶部半径, 圆柱的底部半径, 圆柱的高度
  constructor( param ) {
    let { radiusTop, radiusBottom, height, config } = param;
    this.radiusTop = radiusTop || 10;
    this.radiusBottom = radiusBottom || 10;
    this.height = height || 37;
    this.config = config;
  };
  init() {
    const geometry = new THREE.CylinderGeometry( this.radiusTop, this.radiusBottom, this.height, 32 );
    const material = this.getMaterial( this.config.material );
    const cylinder = new THREE.Mesh( geometry, material );
    return cylinder;
  }
  // 贴图方法
  getTexture( url, conf ) {
    let texture = new THREE.TextureLoader().load( url );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 10, 8 );
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
}
