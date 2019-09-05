/**
 * obj文件导出
 *
 * */
import { OBJLoader, MTLLoader } from 'three-obj-mtl-loader';
export const objModel = ( mtlUrl, objUrl, deg = 0, scale = 0.05 ) => {
  let mtlLoader = new MTLLoader();
  return new Promise(function (resolve, reject) {
    mtlLoader.load( mtlUrl, ( materials ) => {
      materials.preload();
      let objloader = new OBJLoader();
      objloader.setMaterials(materials);
      objloader.load( objUrl, ( obj ) => {
        obj.scale.set(scale, scale, scale);
        obj.rotateY(deg);
        const box = new THREE.Object3D();
        // 车灯方向
        var targetObject = new THREE.Object3D();
        targetObject.position.set(32, 0, 0);
        // 车灯模拟
        let spotLight = new THREE.SpotLight( '#CDC141' );
        spotLight.position.set( 10, 5, 0 );
        spotLight.angle = Math.PI / 8;
        spotLight.decay = 2;
        spotLight.distance = 100;
        spotLight.target = targetObject;
        // 返回模型
        box.add( spotLight );
        box.add( obj );
        box.add( targetObject );
        box.name = 'car';
        resolve (box);
      }, null, (e) => { console.log(e); return reject(e) })
    });
  })
}
