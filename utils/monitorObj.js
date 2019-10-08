import TWEEN from '@tweenjs/tween.js';
import myGround from './myGround'
import echarts from '../node_modules/echarts'
class Monitor {
	constructor(){
		this.weatherInfo = null;
		this.eventList = {
			"neighbor":[
				{
					name:"邻里事件1",
					time:"2019/09/29 16:04",
					desc:"邻里测试事件1"
				},
				{
					name:"邻里事件2",
					time:"2019/09/29 16:05",
					desc:"邻里测试事件2"
				},
				{
					name:"邻里事件3",
					time:"2019/09/29 16:06",
					desc:"邻里测试事件3"
				},
				{
					name:"邻里事件4",
					time:"2019/09/29 16:07",
					desc:"邻里测试事件4"
				},
			],
			"safety":[
				{
					name:"公共安全事件1",
					time:"2019/09/29 16:04",
					desc:"公共安全测试事件1"
				},
				{
					name:"公共安全事件2",
					time:"2019/09/29 16:05",
					desc:"公共安全测试事件2"
				},
				{
					name:"公共安全事件3",
					time:"2019/09/29 16:06",
					desc:"公共安全测试事件3"
				},
				{
					name:"公共安全事件4",
					time:"2019/09/29 16:07",
					desc:"公共安全测试事件4"
				},
			],
			"other":[
				{
					name:"其他事件1",
					time:"2019/09/29 16:04",
					desc:"其他测试事件1"
				},
				{
					name:"其他事件2",
					time:"2019/09/29 16:05",
					desc:"其他测试事件2"
				},
				{
					name:"其他事件3",
					time:"2019/09/29 16:06",
					desc:"其他测试事件3"
				},
				{
					name:"其他事件4",
					time:"2019/09/29 16:07",
					desc:"其他测试事件4"
				},
			],
			"nature":[
				{
					name:"自然灾害事件1",
					time:"2019/09/29 16:04",
					desc:"自然灾害测试事件1"
				},
				{
					name:"自然灾害事件2",
					time:"2019/09/29 16:05",
					desc:"自然灾害测试事件2"
				},
				{
					name:"自然灾害事件3",
					time:"2019/09/29 16:06",
					desc:"自然灾害测试事件3"
				},
				{
					name:"自然灾害事件4",
					time:"2019/09/29 16:07",
					desc:"自然灾害测试事件4"
				},
			],
			"device":[
				{
					name:"设施设备事件1",
					time:"2019/09/29 16:04",
					desc:"设施设备测试事件1"
				},
				{
					name:"设施设备事件2",
					time:"2019/09/29 16:05",
					desc:"设施设备测试事件2"
				},
				{
					name:"设施设备事件3",
					time:"2019/09/29 16:06",
					desc:"设施设备测试事件3"
				},
				{
					name:"设施设备事件4",
					time:"2019/09/29 16:07",
					desc:"设施设备测试事件4"
				},
			],
		}
		this.lastestEvent = [
			{
				name:"测试事件1",//事件标题
				id:"lastest1",//事件id
				location:{
					x: 0,
					y:2,
					z:0
				},//事件位置
				desc:"2栋3单元门口垃圾桶有垃圾溢出，味道极重，有碍观瞻，影响健康。请尽快处理下，谢谢！",//事件描述
			},
			{
				name:"自行车乱停",//事件标题
				id:'lastest2',//事件id
				location:{
					x:100,
					y:2,
					z:-100
				},//事件位置
				desc:'有共享单车进入小区停放于西大门左侧道路',//事件描述
			},
			{
				name:"测试事件",//事件标题
				id:"lastest3",//事件id
				location:{
					x:-300,
					y:2,
					z:300
				},//事件位置
				desc:"测试事件描述",//事件描述
			},
		],
		this.scene = null;
		this.camera = null;
		this.controls = null;
		this.newEventObj = [
			/*{
				pointLight:null,
				object:null,
			}*/
		]
		this.eventNewObj = {
			sprite:null,
			sphere:null,
			pointLight:null,
			interval:null,
		}
	}
	init(scene,camera,controls){
		this.scene = scene;
		this.camera = camera
		this.controls = controls
		this.loadWeather();
		this.eventDom();
		this.loadEventEcharts();
		this.createCountList(this.eventList["safety"]);
		this.loadCameraList(myGround.cameraData);
		this.loadLastEvent(this.lastestEvent);
	}

	/**
	 * 加载天气预报
	 */
	loadWeather(){
		let that = this;


		//创建 script 标签并加入到页面中
		let oHead = document.getElementsByTagName('head')[0];
		let oS = document.createElement('script');
		oHead.appendChild(oS);

		//创建jsonp回调函数
		window["getWeather"] = function (data) {
			oHead.removeChild(oS);
			clearTimeout(oS.timer);
			window["getWeather"] = null;
			if(data.error==0){
				let info = data.results[0].weather_data;
				that.weatherInfo = info;
				that.createWeather([info[0]]);
				document.getElementsByClassName("more-weather")[0].addEventListener("click",function(){
					if(document.getElementsByClassName("weather-item").length>1){
						document.getElementsByClassName('more-weather')[0].innerText="更多"
						document.querySelector(".camera-list").style.top = "394px"
						that.createWeather([that.weatherInfo[0]]);
					}else {
						document.querySelector('.more-weather').innerText = "收起"
						document.querySelector(".camera-list").style.top = "530px"
						that.createWeather(that.weatherInfo);
					}
				})
			}
		};

		//发送请求
		oS.src = "http://api.map.baidu.com/telematics/v3/weather?location=成都市&output=json&ak=L2BFZadMcGyKasWmkoq4lf57&callback=getWeather"

		//超时处理
		/*if (options.time) {
			oS.timer = setTimeout(function () {
				window[callbackName] = null;
				oHead.removeChild(oS);
				options.fail && options.fail({ message: "超时" });
			}, time);
		}*/
	}
	createWeather(list){
		let html = '';
		for(let i=0;i<list.length;i++){
			let info = list[i]
			html+='<div class="weather-item">'
			html+='<div class="weather-box-left">'
			html+='<div class="weather-day">'+info.date.substring(0,2)+'</div>'
			html+='<div class="weather-temperature">'+info.temperature+'</div>'
			html+='</div>'
			html+='<div class="weather-box-right">'
			html+='<div class="weather-icon">'
			html+='<img src="'+info.dayPictureUrl+'">'
			html+='</div>'
			html+='<div class="weather-text">'+info.weather+'</div>'
			html+='</div>'
			html+='</div>'
		}
		document.querySelector(".weather-content").innerHTML = html
	}
	eventDom(){
		document.getElementsByClassName("event-close")[0].addEventListener("click",function(){
			document.querySelector(".event-detail").style.display = "none";
		})
	}
	loadEventEcharts(){
		let that =this;
		let myEcharts = echarts.init(document.getElementById("event-pie"))
		let option = {
			tooltip: {
				trigger: "item",
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [
				{
					name: "访问来源",
					type: "pie",
					radius: "85%",
					center: ["50%", "50%"],
					data: [
						{ value: 235, name: "设施设备", itemStyle: { color: "#0C457A" } },
						{ value: 274, name: "邻里关系", itemStyle: { color: "#0E4C86" } },
						{ value: 310, name: "自然灾害", itemStyle: { color: "#115FA8" } },
						{ value: 335, name: "公共安全", itemStyle: { color: "#1173CE" } },
						{ value: 400, name: "其他", itemStyle: { color: "#1890FF" } }
					],
					roseType: "radius",
					label: {
						normal: {
							textStyle: {
								color: "rgba(255, 255, 255)"
							}
						}
					},
					labelLine: {
						normal: {
							lineStyle: {
								color: "rgba(255, 255, 255, 0.3)"
							},
							length: 2,
							length2: 0
						}
					},
					animationType: "scale",
					animationEasing: "elasticOut",
					animationDelay: function() {
						return Math.random() * 200;
					}
				}
			]
		};
		myEcharts.setOption(option)
		myEcharts.on("click",function (param) {
			if(param.name == "设施设备"){
				that.createCountList(that.eventList["device"]);
			}else if(param.name=="公共安全"){
				that.createCountList(that.eventList["safety"]);
			}else if(param.name=="邻里关系"){
				that.createCountList(that.eventList["neighbor"]);
			}else if(param.name="自然灾害"){
				that.createCountList(that.eventList["nature"]);
			}else {
				that.createCountList(that.eventList["other"]);
			}
		})
	}

	/**
	 * 加载事件加载列表
	 */
	createCountList(list){
		let html='';
		for(let i=0;i<list.length;i++){
			let info = list[i];
			html+='<div class="event-count-list-item">'
			html+='<div class="event-name">'+info.name+'</div>'
			html+='<div class="event-time">'+info.time+'</div>'
			html+='<div class="event-desc">'+info.desc+'</div>'
			html+='</div>'
		}
		document.getElementsByClassName("count-list-content")[0].innerHTML=html;
	}
	//加载摄像头列表
	loadCameraList(list){
		let that = this;
		let htmlStr = "";
		for(let i=0;i<list.length;i++){
			htmlStr+='<div class="camera-item" data-id="'+list[i].id+'">'
			htmlStr+='<div class="camera-title">'+list[i].name+'</div>'
			htmlStr+='<div class="camera-status">'+list[i].status+'</div>'
			htmlStr+='<img class="camera-play" src="../assets/image/play.png">'
			htmlStr+='</div>'
		}
		document.getElementsByClassName("camera-list-content")[0].innerHTML=htmlStr
		let cameraPlays = document.getElementsByClassName("camera-play")
		for(let j=0;j<cameraPlays.length;j++){
			cameraPlays[j].addEventListener("click",function(){
				let id = this.parentElement.getAttribute("data-id");
				for(let i=0;i<myGround.cameraData.length;i++){
					if(id==myGround.cameraData[i].id){
						let src =  myGround.cameraData[i].src;
						let position = myGround.cameraData[i].location
						let cameraPosition = that.camera.position;
						that.camera.lookAt(position.x,position.y,position.z)
						that.controls.target = new THREE.Vector3(position.x,position.y,position.z);
						let tween = new TWEEN.Tween(cameraPosition).to(
								{
									x:position.x+10,
									y:position.y+10,
									z:position.z+10
								},4000
						).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){
							that.camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z)
							that.camera.lookAt(position.x,position.y,position.z)
							document.getElementsByTagName("video")[0].setAttribute("src",src);
						}).start()
					}
				}
			})
		}

	}
	loadLastEvent(list){
		let that = this;
		document.getElementsByClassName("lastest-event")[0].innerHTML = '<div class="new-event lastest-event" data-id="'+list[0].id+'">' +
		'<img src="../assets/image/newEvent.gif" alt="">' +
		'<div class="new-event-text">'+list[0].name+'</div>' +
				'<span class="moreEvent" style="float: right;margin-right: 14px;font-size: 13px;margin-top: 2px;color:#fff;cursor: pointer;">更多</span></div>'
		let htmlStr = "";
		for(let i=1;i<list.length;i++){
			let info = list[i];
				htmlStr+='<div class="new-event" data-id="'+info.id+'">'
			  htmlStr+='<img src="../assets/image/newEvent.gif" alt="">'
			  htmlStr+='<div class="new-event-text">'+info.name+'</div>'
			  htmlStr+='</div>'
		}
		document.getElementsByClassName("new-event-list")[0].innerHTML=htmlStr;
		document.getElementsByClassName("moreEvent")[0].addEventListener("click",function(){
			if(document.getElementsByClassName("new-event-list")[0].style.display=="none"){
				this.innerHTML="收起";
				document.getElementsByClassName("new-event-list")[0].style.display="block";
			}else {
				this.innerHTML ="更多";
				document.getElementsByClassName("new-event-list")[0].style.display = "none";
			}
		})
		/*添加事件位置信息*/
		let events = document.getElementsByClassName("new-event-text");
		for(let i=0;i<events.length;i++){
			events[i].addEventListener("click",function(){
				let id = this.parentElement.getAttribute("data-id");
				for(let i = 0;i<that.lastestEvent.length;i++){
					let info = that.lastestEvent[i];
					if(info.id==id){
						that.addEventLocation(info);
					}
				}
			})
		}
	}
	//环境中添加事件对象
	addEventLocation(info	){
		let that = this;
		that.eventNewObj.pointLight = new THREE.PointLight(0xff0000,2,200);
		that.eventNewObj.pointLight.position.set(info.location.x,info.location.y,info.location.z)
		let sphereObj = new THREE.SphereGeometry(1,20,20);
		let sphereMaterial = new THREE.MeshPhongMaterial({color:0xff0000});
		that.eventNewObj.sphere = new THREE.Mesh(sphereObj,sphereMaterial)
		that.eventNewObj.sphere.attributes = info;
		that.eventNewObj.sphere.name="event";
		that.eventNewObj.sphere.position.set(info.location.x,info.location.y,info.location.z)
		this.scene.add(that.eventNewObj.pointLight);
		this.scene.add(that.eventNewObj.sphere);
		let key = 0;
		that.eventNewObj.interval = setInterval(function(){
			if(key==0){
				that.eventNewObj.sphere.material.color.set(0xffffff)
				that.eventNewObj.pointLight.intensity = 0
				key=1;
			}else {
				that.eventNewObj.sphere.material.color.set(0xff0000)
				that.eventNewObj.pointLight.intensity = 1
				key=0;
			}
		},1000)

		let position = info.location;
		let cameraPosition = that.camera.position;
		that.camera.lookAt(position.x,position.y,position.z)
		that.controls.target = new THREE.Vector3(position.x,position.y,position.z);
		let tween = new TWEEN.Tween(cameraPosition).to(
				{
					x:position.x+10,
					y:position.y+10,
					z:position.z+10
				},4000
		).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function(){
			that.camera.position.set(cameraPosition.x,cameraPosition.y,cameraPosition.z)
			that.camera.lookAt(position.x,position.y,position.z)
		}).start()

		//that.addEventDesc(info);
	}

	/**
	 * 添加事件详细描述面板
	 */
	addEventDesc(info){
		let canvas = document.createElement("canvas");
		canvas.width = 512;
		canvas.height = 412;

		let context = canvas.getContext("2d");
		let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		for(let i = 0; i < imageData.data.length; i ++) {
// 当该像素是透明的,则设置成白色
			if(imageData.data[i + 3] == 0) {
				imageData.data[i] = 255;
				imageData.data[i + 1] = 255;
				imageData.data[i + 2] = 255;
				imageData.data[i + 3] = 255;
			}
		}
		context.putImageData(imageData, 0, 0);
		context.fillStyle="rgb(0,0,0)";
		context.font="35px bold 黑体";
		context.textAlign = "center";
		context.fillText(info.desc,50,50);
		let spritMap = new THREE.CanvasTexture(canvas);
		let spritMaterial = new THREE.SpriteMaterial({map:spritMap});
		let sprite = new THREE.Sprite(spritMaterial);
		sprite.position.set(info.location.x,4,info.location.z);
		this.scene.add(sprite)

	}

	/**
	 * 显示事件详情面板
	 */
	showEventDesc(info){
		document.getElementsByClassName("event-title")[0].innerHTML = info.name;
		document.getElementsByClassName("event-content")[0].innerHTML = info.desc;
		document.querySelector(".event-detail").style.display = "block";
		this.scene.remove(this.eventNewObj.sphere);
		this.scene.remove(this.eventNewObj.pointLight);
		clearInterval(this.eventNewObj.interval);
	}
}
export default new Monitor()