/**
 * @name: 文字贴纸
 * @description: 在几何物体上贴上文字图案
 * @author: chenqy
 * @modifiedBy: chenqy
 * @modifiedTime: 2019/9/19
 */

class FontTexture {
   constructor(){
     // 文字间距
    this.margin = {
       top: 10,
       left: 2
     };
   }
   init( str, position = [0,0,0] ) {
     let heightRatio = this.computedWidthHeight(str, 20, 3)+ this.margin.top*2;
     let box = new THREE.Object3D();
     // 消息提示框背景图片填充
     let plane = new THREE.PlaneBufferGeometry(20, heightRatio);
     let imgTexture = new THREE.TextureLoader().load(`${BASEPATH.basePth}/assets/image/message.png`);
     imgTexture.wrapS = THREE.RepeatWrapping;
     imgTexture.wrapT = THREE.RepeatWrapping;
     imgTexture.repeat.set( 1, 1 );
     let back = new THREE.Mesh(plane, new THREE.MeshBasicMaterial({map: imgTexture, side: THREE.DoubleSide, transparent: true}));
     // 消息提示框文字填充(利用canvas)
     // let heightRatio = 0.825 * 81; // 图片正文类容占比
     let widthRatio = 20; // 图片正文类容占比
     let plane1 = new THREE.PlaneBufferGeometry(widthRatio, heightRatio);
     let canvas = this.fontCanvas(str, widthRatio, heightRatio, 3, '#fff', '#002046');
     let fontTexture = new THREE.TextureLoader().load(canvas);
     fontTexture.wrapS = THREE.RepeatWrapping;
     fontTexture.wrapT = THREE.RepeatWrapping;
     fontTexture.repeat.set(1, 1);
     let font = new THREE.Mesh(plane1, new THREE.MeshBasicMaterial({map: fontTexture}));
     font.scale.set(.8,.8,.8);
     font.position.x = 0;
     font.position.z = .1;
     // 点形状
     let pointer = this.point();
     pointer.position.set(-100, -60, 0);
     // 线形状
     let line = this.line();
     back.rotateY(Math.PI);
     back.layers.mask = 2;
     font.layers.mask = 2;
     box.layers.mask = 2;
     box.add(back, font);
     box.position.set(...position);
     box.name = 'messageBox';
     return box;
   }
  /**
   * @param width 画布宽度
   * @param height 画布高度
   * @param fontColor 字体颜色
   * @param background 背景颜色
   */
  fontCanvas( str, width=100, height=60, fontSize=14, fontColor='#fff', background='#000' ) {
    let that = this;
    let scale = 8; // 放大系数，增加分辨率
    let canvas = document.createElement('canvas');
    canvas.width = width*scale;
    canvas.height = height*scale;
    let context = canvas.getContext('2d');
    context.fillStyle = background;
    context.fillRect(0,0, width*scale, height*scale);
    context.font = `${fontSize*8}px Arial`;
    context.fillStyle = fontColor;
    if(typeof str === 'string') {
      let strs = [];
      // 每行能显示多少个字
      let interval = ~~((width-this.margin.left*2) / fontSize);
      for(let i=0; i<str.length; i+=interval) {
        strs.push(str.substring(i,i+interval));
      }
      strs.map((v,i)=>{
        context.fillText(v, that.margin.left*scale, (i+1)*(fontSize+2)*scale);
      })
    } else {
      str.map((v,i)=>{
        context.fillText(`${v.title}: ${v.content}`, 80, (i+1)*(fontSize+3)*8);
      });
    }
    let url = canvas.toDataURL('image/png');
    return url;
  }
  point() {
    let box = new THREE.Object3D();
    let c0 = new THREE.CircleBufferGeometry(2, 32);
    let mesh = new THREE.Mesh(c0, new THREE.MeshBasicMaterial({color: '#09458D', side: THREE.DoubleSide}));
    let curve = new THREE.EllipseCurve(
      -0,  -0,       // ax, aY
      4, 4,             // xRadius, yRadius
    );
    let points = curve.getPoints( 20 );
    let geometry = new THREE.BufferGeometry().setFromPoints( points );
    let material = new THREE.LineBasicMaterial( { color : '#64B6CE' } );
    let ellipse = new THREE.Line( geometry, material );
    mesh.layers.mask = 2;
    ellipse.layers.mask = 2;
    box.add(mesh, ellipse);
    return box;
  }
  line() {
    let shape = new THREE.Shape();
    shape.moveTo(-100, -60);
    shape.lineTo(-80, 10);
    shape.lineTo(-60, 26);
    let line = new THREE.Line(new THREE.ShapeGeometry(shape), new THREE.MeshBasicMaterial({color: '#54AACA'}));
    line.layers.mask = 2;
    return line;
  }

  /**
   * 计算画布贴图的宽度和高度
   * @param str  需要渲染的文字
   * @param width 初始化的画布宽度
   * @param fontSize 画布字体大小
   */
  computedWidthHeight(str, width, fontSize) {
    let height = 0;
    if(typeof str === 'string') {
      let allWidth = str.length * fontSize;
      height = allWidth/(width - this.margin.left) * fontSize - 5;
    } else {

    }
    return height;
  }
}
export default new FontTexture();
