class GrassArea {
  constructor() {
    this.path = [
      [-455, -88],
      [-425, -88],
      [-130, 130],
      [-230, 130],
    ];
  }
  getArea() {
    let path1 = [{"x":-385,"y":2,"z":-128},{"x":-377.36462499999993,"y":2,"z":-133.20125},{"x":-370.327,"y":2,"z":-136.91},{"x":-363.83987499999995,"y":1.9999999999999998,"z":-139.28374999999997},{"x":-357.8560000000001,"y":2.0000000000000004,"z":-140.48000000000005},{"x":-352.328125,"y":2,"z":-140.65625},{"x":-347.209,"y":1.9999999999999996,"z":-139.96999999999994},{"x":-342.45137500000004,"y":2,"z":-138.57875},{"x":-338.0079999999999,"y":2,"z":-136.64},{"x":-333.83162500000003,"y":2,"z":-134.31125000000003},{"x":-329.875,"y":2,"z":-131.75},{"x":-326.090875,"y":2,"z":-129.11374999999998},{"x":-322.432,"y":2,"z":-126.56},{"x":-318.85112499999997,"y":2,"z":-124.24625},{"x":-315.30099999999993,"y":2,"z":-122.32999999999998},{"x":-311.734375,"y":2,"z":-120.96875},{"x":-308.10400000000004,"y":2,"z":-120.32000000000001},{"x":-304.362625,"y":2,"z":-120.54124999999999},{"x":-300.463,"y":2,"z":-121.79},{"x":-296.35787500000004,"y":2,"z":-124.22375},{"x":-292,"y":2,"z":-128}];
    let path2 = [{"x":-292,"y":2,"z":-128},{"x":-291.513,"y":2,"z":-113.53449999999998},{"x":-290.114,"y":2,"z":-100.11600000000001},{"x":-287.89599999999996,"y":1.9999999999999998,"z":-87.71149999999999},{"x":-284.9520000000001,"y":2.0000000000000004,"z":-76.28800000000001},{"x":-281.375,"y":2,"z":-65.8125},{"x":-277.2579999999999,"y":1.9999999999999996,"z":-56.25199999999999},{"x":-272.694,"y":2,"z":-47.57350000000001},{"x":-267.77599999999995,"y":2,"z":-39.744},{"x":-262.59700000000004,"y":2,"z":-32.730500000000006},{"x":-257.25,"y":2,"z":-26.5},{"x":-251.82799999999997,"y":2,"z":-21.019499999999994},{"x":-246.42400000000004,"y":2,"z":-16.256},{"x":-241.13099999999997,"y":2,"z":-12.176499999999997},{"x":-236.04199999999997,"y":2,"z":-8.748000000000001},{"x":-231.25,"y":2,"z":-5.9375},{"x":-226.848,"y":2,"z":-3.711999999999998},{"x":-222.929,"y":2,"z":-2.038500000000001},{"x":-219.586,"y":2,"z":-0.8839999999999995},{"x":-216.91199999999998,"y":2,"z":-0.21550000000000039},{"x":-215,"y":2,"z":0}];
    let path3 = [{x: -190, y: 2, z: 5},{x:0, y:2, z:5}];
    let path4 = [{"x":0,"y":2,"z":5},{"x":5.9685,"y":2,"z":2.1219999999999994},{"x":11.868,"y":2,"z":-0.534},{"x":17.6895,"y":1.9999999999999998,"z":-3.0010000000000003},{"x":23.424000000000007,"y":2.0000000000000004,"z":-5.312000000000002},{"x":29.0625,"y":2,"z":-7.5},{"x":34.59599999999999,"y":1.9999999999999996,"z":-9.597999999999997},{"x":40.0155,"y":2,"z":-11.639},{"x":45.312,"y":2,"z":-13.655999999999999},{"x":50.4765,"y":2,"z":-15.682000000000002},{"x":55.5,"y":2,"z":-17.75},{"x":60.37350000000001,"y":2,"z":-19.893},{"x":65.08800000000001,"y":2,"z":-22.144},{"x":69.6345,"y":2,"z":-24.536},{"x":74.00399999999999,"y":2,"z":-27.101999999999993},{"x":78.1875,"y":2,"z":-29.875},{"x":82.17600000000002,"y":2,"z":-32.888000000000005},{"x":85.9605,"y":2,"z":-36.17399999999999},{"x":89.53200000000001,"y":2,"z":-39.766000000000005},{"x":92.8815,"y":2,"z":-43.696999999999996},{"x":96,"y":2,"z":-48}];
    let path5 = [{"x":96,"y":2,"z":-48},{"x":101.282,"y":2,"z":-39.97425},{"x":106.336,"y":2,"z":-32.664},{"x":111.17399999999999,"y":1.9999999999999998,"z":-26.01975},{"x":115.80800000000004,"y":2.0000000000000004,"z":-19.992000000000004},{"x":120.25,"y":2,"z":-14.53125},{"x":124.51199999999999,"y":1.9999999999999996,"z":-9.587999999999996},{"x":128.60600000000002,"y":2,"z":-5.112750000000004},{"x":132.54399999999998,"y":2,"z":-1.0560000000000005},{"x":136.338,"y":2,"z":2.6317499999999994},{"x":140,"y":2,"z":6},{"x":143.542,"y":2,"z":9.098250000000004},{"x":146.976,"y":2,"z":11.975999999999999},{"x":150.314,"y":2,"z":14.682750000000002},{"x":153.56799999999998,"y":2,"z":17.267999999999997},{"x":156.75,"y":2,"z":19.78125},{"x":159.872,"y":2,"z":22.272000000000006},{"x":162.946,"y":2,"z":24.789749999999998},{"x":165.984,"y":2,"z":27.384},{"x":168.998,"y":2,"z":30.10425},{"x":172,"y":2,"z":33}];
    let path6 = [{"x":172,"y":2,"z":33},{"x":179.11924999999997,"y":2,"z":36.800125},{"x":185.51400000000004,"y":2,"z":40.120999999999995},{"x":191.23975000000002,"y":1.9999999999999998,"z":42.99337499999999},{"x":196.35200000000006,"y":2.0000000000000004,"z":45.44800000000001},{"x":200.90625,"y":2,"z":47.515625},{"x":204.95799999999994,"y":1.9999999999999996,"z":49.22699999999999},{"x":208.56274999999997,"y":2,"z":50.612875},{"x":211.77599999999998,"y":2,"z":51.704},{"x":214.65325000000007,"y":2,"z":52.53112500000001},{"x":217.25,"y":2,"z":53.125},{"x":219.62175000000002,"y":2,"z":53.516375},{"x":221.82400000000004,"y":2,"z":53.73600000000001},{"x":223.91224999999997,"y":2,"z":53.814625},{"x":225.94199999999995,"y":2,"z":53.782999999999994},{"x":227.96875,"y":2,"z":53.671875},{"x":230.048,"y":2,"z":53.512},{"x":232.23525,"y":2,"z":53.334125},{"x":234.586,"y":2,"z":53.169000000000004},{"x":237.15575,"y":2,"z":53.047374999999995},{"x":240,"y":2,"z":53}];
    let path7 = [{x: 420, y: 2, z: 38},{x: 415, y: 2, z: 65},{x: 150, y: 2, z: 95},{x: 0,y: 2, z: 180}];
    let path8 = [{"x":0,"y":2,"z":180},{"x":-11.92375,"y":2,"z":186.065},{"x":-23.69,"y":2,"z":192.22000000000003},{"x":-35.29124999999999,"y":1.9999999999999998,"z":198.405},{"x":-46.72000000000001,"y":2.0000000000000004,"z":204.56000000000006},{"x":-57.96875,"y":2,"z":210.625},{"x":-69.02999999999999,"y":1.9999999999999996,"z":216.53999999999996},{"x":-79.89625,"y":2,"z":222.245},{"x":-90.55999999999999,"y":2,"z":227.67999999999998},{"x":-101.01375000000002,"y":2,"z":232.78500000000003},{"x":-111.25,"y":2,"z":237.5},{"x":-121.26125000000002,"y":2,"z":241.765},{"x":-131.04000000000002,"y":2,"z":245.52000000000004},{"x":-140.57875,"y":2,"z":248.70499999999998},{"x":-149.86999999999998,"y":2,"z":251.26},{"x":-158.90625,"y":2,"z":253.125},{"x":-167.68,"y":2,"z":254.24},{"x":-176.18375,"y":2,"z":254.545},{"x":-184.41,"y":2,"z":253.98000000000002},{"x":-192.35125,"y":2,"z":252.485},{"x":-200,"y":2,"z":250}];
    let path9 = [{"x":-200,"y":2,"z":250},{"x":-206.50249999999997,"y":2,"z":245.55124999999998},{"x":-213.92,"y":2,"z":241.11000000000004},{"x":-222.11749999999998,"y":1.9999999999999998,"z":236.53374999999997},{"x":-230.9600000000001,"y":2.0000000000000004,"z":231.6800000000001},{"x":-240.3125,"y":2,"z":226.40625},{"x":-250.0399999999999,"y":1.9999999999999996,"z":220.57},{"x":-260.0075,"y":2,"z":214.02875000000003},{"x":-270.08000000000004,"y":2,"z":206.64},{"x":-280.12250000000006,"y":2,"z":198.26125000000002},{"x":-290,"y":2,"z":188.75},{"x":-299.5775,"y":2,"z":177.96375},{"x":-308.72,"y":2,"z":165.76000000000002},{"x":-317.2925,"y":2,"z":151.99624999999997},{"x":-325.15999999999997,"y":2,"z":136.53},{"x":-332.1875,"y":2,"z":119.21875},{"x":-338.24,"y":2,"z":99.91999999999999},{"x":-343.1825,"y":2,"z":78.49125000000001},{"x":-346.88,"y":2,"z":54.78999999999999},{"x":-349.1975,"y":2,"z":28.673750000000023},{"x":-350,"y":2,"z":0}];
    let path10 = [{x: -385,y: 2, z: -128}];
   let vertices = [...path1,...path2,...path3,...path4,...path5,...path6,...path7,...path8,...path9,...path10]; //草坪点总和
    let shape = new THREE.Shape();
    shape.moveTo(-385, -128);
    vertices.map(( v )=>{
      shape.lineTo(v.x, v.z);
    });
    let extrudeSettings = { amount: 0.1, bevelEnabled: false, bevelSegments: 1, steps: 0.1, bevelSize: 1, bevelThickness: 1 };
    let geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    let texture = this.getTexture('/assets/image/grasslight.jpg',{ rx: 1/50, ry: 1/ 50 });
    let material = new THREE.MeshPhongMaterial( { map: texture } );
    let mesh = new THREE.Mesh( geometry, material );
    mesh.rotateX(Math.PI/2);
    mesh.position.y = .7;
    mesh.name = 'grassArea';
    return mesh;
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
}
export default new GrassArea();
