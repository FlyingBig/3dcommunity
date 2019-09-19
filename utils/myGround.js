import { Earcut } from '../node_modules/three/src/extras/Earcut';
// 小区道路点位数据
var myRoads= [
	//小区内无箭头道路
	{
		name:'road47',
		type:'road_noArrow',
		point:[[-346.43,0,-255.66],[-372.14,0,-256.71],[-382.49,0,-255.66],[-395.3,0,-247.42],[-397.41,0,-245.4],[-397.86,0,-230.46],[-378.04,0,-215.32],[-358,0,-195.86],[-360.12,0,-194.43],[-380.16,0,-213.69],[-400.19,0,-229.11],[-400.3,0,-246.65],[-395.18,0,-251.25],[-382.94,0,-257.38],[-372.59,0,-259.3],[-345.87,0,-258.72],[-328.17,0,-257.67],[-310.02,0,-246.94],[-305.79,0,-237.64],[-305.24,0,-230.93],[-306.46,0,-193.95],[-309.58,0,-164.43],[-312.14,0,-162.04],[-334.29,0,-161.85],[-336.85,0,-161.75],[-359.45,0,-182.74],[-358.89,0,-185.9],[-335.29,0,-164.82],[-312.7,0,-165.3],[-311.69,0,-168.36],[-307.58,0,-230.07],[-308.02,0,-236.78],[-311.14,0,-243.97],[-328.62,0,-254.7],[-348.21,0,-256.23]]
		,
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road48',
		type:'road_noArrow',
		point:[[-340.97,0,-272.62],[-343.2,0,-258.24],[-345.98,0,-258.24],[-343.64,0,-273.67]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road49',
		type:'road_noArrow',
		point:[[-289.43,0,-231.22],[-304.57,0,-231.22],[-304.9,0,-228.16],[-288.65,0,-227.58]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road50',
		type:'road_noArrow',
		point:[[-289.32,0,-193.66],[-307.02,0,-193.66],[-306.57,0,-190.02],[-287.09,0,-190.88]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road51',
		type:'road_noArrow',
		point:[[-281.97,0,-191.74],[-239.56,0,-183.5],[-221.97,0,-167.02],[-217.74,0,-153.7],[-204.38,0,-125.91],[-196.14,0,-102.34],[-191.25,0,-91.03],[-191.91,0,-86.34],[-190.8,0,-81.45],[-229.76,0,-18.4],[-231.77,0,-20.79],[-194.81,0,-81.45],[-193.7,0,-87.1],[-193.7,0,-91.7],[-195.25,0,-96.88],[-198.71,0,-101.38],[-205.83,0,-124.57],[-215.74,0,-145.56],[-219.97,0,-155.81],[-224.09,0,-165.68],[-240,0,-181.68],[-281.97,0,-189.54]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road52',
		type:'road_noArrow',
		point:[[-114.1,0,-4.6],[-113.88,0,-70.43],[-112.66,0,-168.65],[-112.1,0,-197.68],[-113.88,0,-203.43],[-116.44,0,-205.25],[-153.62,0,-205.73],[-156.29,0,-204.39],[-157.63,0,-202.28],[-159.3,0,-199.79],[-160.08,0,-170.47],[-161.52,0,-72.25],[-162.75,0,-4.89],[-159.85,0,-2.39],[-159.3,0,-70.14],[-158.3,0,-167.79],[-157.74,0,-197.11],[-156.52,0,-200.65],[-153.95,0,-202.76],[-118.44,0,-203.24],[-115.33,0,-200.65],[-114.88,0,-197.59],[-114.66,0,-168.46],[-115.66,0,-71.1],[-116.11,0,-4.79]],

		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road53',
		type:'road_noArrow',
		point:[[-170.88,0,-237.83],[-155.18,0,-203.91],[-156.52,0,-202.38],[-172.99,0,-236.59]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road54',
		type:'road_noArrow',
		point:[[-113.1,0,-232.37],[-113.88,0,-204.1],[-115.77,0,-204.3],[-115.22,0,-233.14]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road55',
		type:'road_noArrow',
		point:[[-113.43,0,-170.28],[-157.96,0,-172.29],[-158.52,0,-170.28],[-113.1,0,-168.17]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road56',
		type:'road_noArrow',
		point:[[-113.66,0,-151.69],[-150.84,0,-154.18],[-150.5,0,-151.88],[-113.43,0,-149.29]]	,
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road57',
		type:'road_noArrow',
		point:[[-114.33,0,-72.92],[-51.87,0,-67.27],[-24.82,0,-69.09],[-17.7,0,-73.21],[-14.14,0,-73.88],[-10.24,0,-76.75],[-8.46,0,-79.05],[-7.35,0,-80.78],[-7.35,0,-84.42],[-5.9,0,-87.3],[-5.12,0,-89.12],[-1.67,0,-91.61],[-0.45,0,-89.69],[-2.45,0,-88.16],[-3.9,0,-86.15],[-5.12,0,-84.32],[-5.01,0,-82.02],[-5.45,0,-78.38],[-7.01,0,-76.37],[-11.69,0,-72.73],[-14.69,0,-71.68],[-16.25,0,-71.68],[-18.81,0,-70.05],[-22.49,0,-68.13],[-24.49,0,-67.65],[-50.43,0,-65.54],[-52.32,0,-65.73],[-113.43,0,-71.39]]	,
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road57',
		type:'road_noArrow',
		point:[[-31.73,0,-4.31],[-31.95,0,-4.31],[-39.3,0,-21.27],[-42.41,0,-28.27],[-42.97,0,-37.85],[-42.3,0,-47.34],[-37.07,0,-54.62],[-21.71,0,-68.03],[-23.82,0,-68.61],[-38.29,0,-57.02],[-44.42,0,-47.82],[-45.2,0,-38.52],[-44.97,0,-28.27],[-34.73,0,-4.6]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road58',
		type:'road_noArrow',
		point:[[-1.78,0,-91.99],[-21.15,0,-114.6],[-23.04,0,-118.25],[-22.49,0,-122.56],[-21.37,0,-125.82],[-10.13,0,-139.23],[20.26,0,-171.14],[31.28,0,-180.91],[34.18,0,-181.68],[37.74,0,-181.59],[40.97,0,-180.53],[45.75,0,-176.99],[89.72,0,-139.9],[90.39,0,-137.89],[68.68,0,-120.45],[66.57,0,-117.29],[68.13,0,-112.02],[67.13,0,-108.57],[63.45,0,-103.3],[61.11,0,-101],[55.44,0,-98.7],[50.98,0,-99.18],[47.31,0,-99.85],[44.31,0,-99.85],[39.74,0,-99.08],[36.29,0,-97.55],[33.28,0,-95.44],[31.50,0,-92.57],[30.06,0,-88.64],[28.61,0,-86.24],[25.49,0,-82.89],[21.60,0,-80.11],[17.14,0,-79.53],[15.70,0,-79.73],[12.91,0,-80.2],[10.58,0,-81.74],[8.02,0,-84.32],[7.01,0,-87.58],[4.23,0,-90.07],[0.89,0,-89.4],[-1.22,0,-92.09],[0.45,0,-93.33],[1.67,0,-91.7],[3.34,0,-92.57],[4.90,0,-92.09],[8.02,0,-90.55],[9.57,0,-87.97],[10.13,0,-85.57],[12.69,0,-82.31],[17.03,0,-81.55],[20.37,0,-82.12],[23.15,0,-84.9],[26.83,0,-87.97],[28.61,0,-91.51],[30.17,0,-96.11],[33.73,0,-99.18],[37.29,0,-101.29],[41.97,0,-101.86],[47.53,0,-101.86],[51.87,0,-101.29],[55.21,0,-101.09],[58.33,0,-102.34],[62.00,0,-104.93],[64.34,0,-109.14],[65.90,0,-112.59],[65.01,0,-115.66],[65.12,0,-117.77],[66.46,0,-121.6],[87.50,0,-139.04],[40.74,0,-179],[38.29,0,-179.48],[35.84,0,-179.76],[33.17,0,-178.9],[29.05,0,-176.12],[20.82,0,-168.17],[-18.92,0,-125.43],[-20.26,0,-120.35],[-19.26,0,-116.71],[0.89,0,-93.81]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road59',
		type:'road_noArrow',
		point:[[-8.24,0,-140.29],[-37.74,0,-175.84],[-39.18,0,-174.02],[-9.57,0,-139.04]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road60',
		type:'road_noArrow',
		point:[[142.60,0,-132.14],[90.39,0,-139.9],[90.06,0,-138.08],[142.27,0,-130.42]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road61',
		type:'road_noArrow',
		point:[[151.51,0,-163.38],[125.01,0,-163.38],[126.24,0,-161.27],[151.95,0,-160.79]],
		height:.3,
		color:"#ffe9d5",
		repeatSize:[1,4],
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road62',
		type:'road_noArrow',
		point:[[157.74,0,-181.59],[168.32,0,-173.34],[179.67,0,-163.57],[190.02,0,-156.67],[201.38,0,-148.53],[217.85,0,-137.32],[234.88,0,-127.06],[239.23,0,-124],[241.90,0,-121.41],[259.49,0,-100.61],[263.60,0,-95.82],[271.84,0,-66.79],[273.96,0,-67.08],[265.39,0,-96.3],[244.57,0,-122.08],[241.56,0,-124.67],[229.32,0,-133.1],[213.29,0,-143.16],[183.45,0,-164.82],[160.30,0,-182.74],[157.07,0,-186.95]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road63',
		type:'road_noArrow',
		point:[[152.62,0,-148.05],[161.19,0,-150.06],[165.42,0,-151.11],[202.94,0,-148.53],[201.71,0,-146.99],[166.31,0,-149.01],[151.39,0,-145.46]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road64',
		type:'road_noArrow',
		point:[[154.07,0,4.89],[172.32,0,1.34],[223.53,0,-5.65],[255.37,0,-10.16],[276.18,0,-11.31],[288.09,0,-12.94],[293.55,0,-14.85],[296.33,0,-16.39],[298.34,0,-20.31],[299.67,0,-35.45],[300.34,0,-46.67],[300.90,0,-64.2],[298.56,0,-64.49],[298.22,0,-51.65],[296.33,0,-21.18],[294.33,0,-17.63],[290.10,0,-16.29],[285.98,0,-14.95],[276.63,0,-14.18],[261.27,0,-12.94],[242.45,0,-10.73],[172.21,0,-1.63],[149.84,0,3.16]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road65',
		type:'road_noArrow',
		point:[[297.22,0,41.11],[292.77,0,-15.43],[290.66,0,-15.43],[294.66,0,41.11]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road66',
		type:'road_noArrow',
		point:[[174.88,0,-1.44],[172.55,0,-29.23],[174.99,0,-38.9],[173.10,0,-39.77],[170.43,0,-28.84],[172.55,0,-1.05]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road67',
		type:'road_noArrow',
		point:[[181.45,0,-120.83],[182.79,0,-108.47],[188.02,0,-95.63],[201.93,0,-79.92],[216.63,0,-68.51],[227.54,0,-62.76],[234.55,0,-62.48],[242.68,0,-68.03],[264.27,0,-68.99],[275.29,0,-65.93],[298.22,0,-64.87],[301.56,0,-150.25],[297.00,0,-167.02],[289.99,0,-174.4],[279.52,0,-180.15],[260.38,0,-178.23],[241.45,0,-174.02],[225.09,0,-167.6],[216.07,0,-160.5],[203.38,0,-145.84],[188.58,0,-133.48],[184.01,0,-126.68],[182.12,0,-122.08],[180.67,0,-124.57],[187.24,0,-135.3],[200.26,0,-146.51],[214.51,0,-162.33],[223.64,0,-169.42],[241.12,0,-176.7],[261.16,0,-181.3],[279.19,0,-182.54],[291.10,0,-176.51],[298.67,0,-168.65],[301.68,0,-160.5],[303.79,0,-149.96],[300.12,0,-62.48],[284.42,0,-63.34],[276.18,0,-63.34],[265.39,0,-66.79],[244.23,0,-66.69],[235.66,0,-59.7],[227.54,0,-60.18],[215.40,0,-66.31],[200.04,0,-79.15],[187.02,0,-93.24],[181.34,0,-108.57],[179.00,0,-120.64],[180.23,0,-123.71]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road68',
		type:'road_noArrow',
		point:[[236.11,0,-172.67],[241.45,0,-120.26],[244.68,0,-67.36],[243.23,0,-67.08],[239.11,0,-128.12],[233.99,0,-171.81]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road69',
		type:'road_noArrow',
		point:[[0.21,0,-2.3],[26.16,0,58.36],[26.27,0,60.94],[25.27,0,65.83],[13.47,0,74.45],[11.91,0,72.54],[22.71,0,64.87],[24.27,0,61.23],[23.82,0,57.11],[-1.89,0,-0.96]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road70',
		type:'road_noArrow',
		point:[[-113.1,0,2.68],[-110.32,0,25.3],[-108.31,0,48.97],[-111.99,0,70.53],[-107.87,0,94.19],[-114.33,0,124.95],[-124.23,0,148.62],[-131.25,0,191.84],[-133.69,0,190.78],[-126.68,0,148.14],[-116.89,0,124],[-110.76,0,94.19],[-114.33,0,77.23],[-114.33,0,69.47],[-110.21,0,47.91],[-115.88,0,2.68]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road71',
		type:'road_noArrow',
		point:[[-143.38,0,1.63],[-143.71,0,20.6],[-144.27,0,27.12],[-147.16,0,26.64],[-146.61,0,20.03],[-146.05,0,2.49]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road72',
		type:'road_noArrow',
		point:[[-143.82,0,26.64],[-137.92,0,28.17],[-135.48,0,32.01],[-133.81,0,38.52],[-136.03,0,44.94],[-138.04,0,47.62],[-143.16,0,48.97],[-178.67,0,47.53],[-187.8,0,46.47],[-192.92,0,45.52],[-193.92,0,42.35],[-193.36,0,26.93],[-146.61,0,26.45],[-143.49,0,26.35],[-144.6,0,28.94],[-190.8,0,28.36],[-191.36,0,41.2],[-190.36,0,43.31],[-187.24,0,44.37],[-177,0,45.32],[-143.05,0,46.38],[-138.37,0,45.32],[-137.37,0,43.31],[-136.37,0,40.25],[-136.37,0,37.66],[-136.81,0,33.54],[-138.93,0,30.47],[-143.49,0,29.42]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road73',
		type:'road_noArrow',
		point:[[-536.45,0,-259.11],[-501.72,0,-234.96],[-476.67,0,-236.21],[-471.33,0,-236.21],[-469.21,0,-234.67],[-437.71,0,-211.39],[-409.43,0,-191.55],[-402.53,0,-184.17],[-396.52,0,-174.3],[-391.4,0,-165.77],[-379.6,0,-152.26],[-368.58,0,-141.44],[-343.53,0,-108.76],[-321.16,0,-69.28],[-313.03,0,-46.95],[-311.14,0,-33.73],[-312.25,0,-25.39],[-314.81,0,-15.52],[-319.38,0,1.53],[-315.26,0,47.82],[-307.02,0,97.26],[-301.45,0,121.6],[-290.88,0,144.12],[-285.65,0,152.26],[-276.18,0,161.46],[-262.38,0,172.19],[-247.24,0,179.09],[-216.52,0,188.29],[-187.68,0,195.29],[-181.12,0,188.58],[-175.77,0,188.1],[-168.2,0,187.91],[-156.4,0,189.16],[-152.62,0,191.17],[-133.69,0,191.65],[-105.75,0,191.65],[-69.69,0,183.79],[-57.89,0,180.15],[-27.83,0,159.83],[16.92,0,122.46],[113.99,0,85.28],[150.62,0,68.13],[175.66,0,30.57],[178.45,0,32.39],[152.84,0,69.76],[115.88,0,87.3],[18.92,0,124.38],[-26.27,0,161.37],[-57,0,181.59],[-71.02,0,186.57],[-105.42,0,193.76],[-152.73,0,193.18],[-157.41,0,191.65],[-168.2,0,190.31],[-179.34,0,191.07],[-186.68,0,197.3],[-247.91,0,181.11],[-262.71,0,174.78],[-287.87,0,153.7],[-303.35,0,121.79],[-308.8,0,98.22],[-318.15,0,44.17],[-321.38,0,2.01],[-314.7,0,-26.26],[-314.25,0,-33.83],[-315.7,0,-46.76],[-323.05,0,-68.23],[-345.76,0,-107.8],[-371.25,0,-140.19],[-393.63,0,-164.15],[-405.54,0,-183.98],[-412.1,0,-190.31],[-471.44,0,-234],[-502.05,0,-233.23],[-538.45,0,-257.57]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},
	{
		name:'road74',
		type:'road_noArrow',
		point:[[-499.05,0,-233.04],[-446.95,0,-201.13],[-442.94,0,-197.49],[-439.93,0,-193.18],[-438.93,0,-186.38],[-418.34,0,-171.62],[-403.98,0,-158.59],[-390.84,0,-144.89],[-382.72,0,-135.49],[-365.35,0,-110.2],[-354.55,0,-90.36],[-347.65,0,-73.78],[-340.64,0,-51.07],[-333.96,0,-9.97],[-330.73,0,38.9],[-325.39,0,89.02],[-319.26,0,112.59],[-314.14,0,126.87],[-304.24,0,144.89],[-283.98,0,173.34],[-258.37,0,197.11],[-236.44,0,210.81],[-208.39,0,222.5],[-195.37,0,225.57],[-170.88,0,229.11],[-151.51,0,227.87],[-134.03,0,226.34],[-115.1,0,220.68],[-93.73,0,212.54],[-16.81,0,168.17],[1.11,0,155.9],[41.97,0,133],[94.29,0,108.09],[148.17,0,88.06],[165.98,0,79.73],[169.32,0,74.17],[172.88,0,65.45],[174.10,0,58.74],[167.54,0,49.44],[166.98,0,48.49],[169.09,0,46.38],[176.22,0,56.15],[175.66,0,64.87],[170.21,0,80.3],[166.65,0,83.17],[150.06,0,90.07],[95.07,0,110.68],[43.41,0,134.92],[-15.36,0,170.28],[-90.61,0,213.97],[-115.22,0,223.17],[-133.14,0,228.35],[-170.1,0,230.93],[-194.81,0,227.2],[-209.73,0,223.56],[-238,0,212.82],[-259.04,0,198.83],[-284.76,0,174.78],[-306.13,0,146.13],[-315.59,0,127.45],[-320.71,0,113.55],[-327.39,0,88.92],[-333.07,0,38.04],[-336.74,0,-9.29],[-343.31,0,-51.36],[-350.1,0,-73.02],[-357.22,0,-90.46],[-368.58,0,-110.2],[-385.05,0,-135.21],[-402.98,0,-154.28],[-420.9,0,-170.66],[-440.49,0,-185.61],[-441.83,0,-192.7],[-445.06,0,-196.25],[-447.95,0,-199.7],[-500.49,0,-231.8]],
		height:.3,
		color:"#ffe9d5",
		ifRepeat:true,
		position:[0,0,0],
		rotate:Math.PI/2
	},




];
// 河流点位数据
var myRivers= [
	{
		name:"",
		type:"river",
		point:[[-609.7,0,-145.75],[-493.26,0,-109.72],[-457.41,0,-73.21],[-439.49,0,-44.75],[-417.67,0,125.82],[-395.96,0,182.83],[-360.45,0,235.44],[-317.48,0,274.63],[-243.12,0,309.7],[-181.67,0,320.53],[-134.59,0,314.59],[-40.97,0,274.53],[141.38,0,172.67],[189.80,0,158.97],[265.05,0,161.37],[455.85,0,141.91],[465.54,0,52.13],[355.67,0,60.66],[176.22,0,82.12],[89.28,0,115.08],[60.56,0,126.97],[24.04,0,145.46],[-57.66,0,197.97],[-81.15,0,210.91],[-88.28,0,215.22],[-124.9,0,227.68],[-192.03,0,232.76],[-249.02,0,217.62],[-281.64,0,190.02],[-316.59,0,145.46],[-334.18,0,99.18],[-350.66,0,-50.21],[-370.69,0,-109.33],[-403.64,0,-152.07],[-445.06,0,-182.54],[-581.2,0,-235.34]],
		height:2,
		repeatSize:[],
		color:'#a1d3ee',
	},
];
// 草坪点位数据
var myGrass= [
	{
		name:'grass1',//外侧道路
		type:'grass',
		point:[[462.64,0,-298.17],[113.21,0,-298.07],[92.62,0,117.19],[425.69,0,64.49]],
		height:0.3,
		color:"",
		repeatSize:[40,20],
		img:"./assets/image/ground.jpg",
		ifRepeat:true,
		position:[0,0,0],
	},
	{
		name:'grass2',//外侧道路
		type:'grass',
		point:[[113.21,0,-300.07],[-125.46,0,-300.99],[-116.44,0,248.47],[92.62,0,117.19]],
		height:0.3,
		color:"",
		repeatSize:[20,20],
		img:"./assets/image/ground.jpg",
		ifRepeat:true,
		position:[0,0,0],
	},
	{
		name:'grass3',//外侧道路
		type:'grass',
		point:[[-124.34,0,-308.71],[-290.66,0,-308.68],[-294.89,0,222.31],[-114.55,0,245.88]],
		height:0.3,
		color:"",
		repeatSize:[20,20],
		img:"./assets/image/ground.jpg",
		ifRepeat:true,
		position:[0,0,0],
	},
	{
		name:'grass4',//外侧道路
		type:'grass',
		point:[[-290.66,0,-309.68],[-395.74,0,-309.13],[-425.02,0,-161.65],[-294.89,0,222.31]],
		height:0.3,
		color:"",
		repeatSize:[20,20],
		img:"./assets/image/ground.jpg",
		ifRepeat:true,
		position:[0,0,0],
	},
	{
		name:'grass5',//外侧道路
		type:'grass',
		point:[[-395.74,0,-309.13],[-551.92,0,-333.56],[-567.17,0,-228.44],[-425.02,0,-161.65]],
		height:0.3,
		color:"",
		repeatSize:[20,20],
		img:"./assets/image/ground.jpg",
		ifRepeat:true,
		position:[0,0,0],
	},
];
// 树木点位数据
var myTrees= [
	{
		name:'tree1',
		type:'tree',
		point:[[-223.75,0,171.72],[-177.11,0,173.73],[-147.72,0,178.9],[-101.08,0,177.37],[-53.1,0,160.89],[-12.69,0,140.38],[19.93,0,103.3],[114.21,0,66.31],[145.05,0,53.95]]
	},
	{
		name:'tree2',
		type:'tree',
		point:[[-312.14,0,107.9],[-302.12,0,137.99],[-252.36,0,184.94],[-209.06,0,200.18],[-152.4,0,207.75],[-97.29,0,203.34],[-38.96,0,176.6],[21.04,0,139.61],[107.76,0,97.93]],
	},
	{
		name:'tree4',
		type:'tree',
		point:[[179.80,0,71.4], [69.80,0,91.4], [209.80,0,68.4], [259.80,0,65.4], [309.80,0,63.4], [349.80,0,55.4], [379.80,0,55.4],[399.80,0,55.4]],
	}

];
var garbageBins = [
	{
		name: '',
		id: '',
		point:[-541.79,0,-250.87],
		rotationY:Math.PI*-0.3,
	},
	{
		name: '',
		id: '',
		point:[-449.06,0,-278.08],
		rotationY:Math.PI*-0.45,
	},
	{
		name: '',
		id: '',
		point:[-366.69,0,-273.86],
		rotationY:Math.PI*0.41,
	},
	{
		name: '',
		id: '',
		point:[-297,0,-258.44],
		rotationY:Math.PI*0.42,
	},
	{
		name: '',
		id: '',
		point:[-179.89,0,-237.55],
		rotationY:Math.PI*0.43,
	},
	{
		name: '',
		id: '',
		point:[-34.18,0,-221.35],
		rotationY:Math.PI*0.44,
	},
	{
		name: '',
		id: '',
		point:[212.73,0,-202.95],
		rotationY:Math.PI*0.44,
	},
	{
		name: '',
		id: '',
		point:[134.14,0,9.77],
		rotationY:Math.PI*.3,
	},
	{
		name: '',
		id: '',
		point:[218.19,0,59.12],
		rotationY:Math.PI*.5,
	},
	{
		name: '',
		id: '',
		point:[121.23,0,-118.73],
		rotationY:Math.PI*.5,
	},
	{
		name: '',
		id: '',
		point:[34.51,0,-1.05],
		rotationY:Math.PI*.5,
	},
	{
		name: '',
		id: '',
		point:[-89.5,0,17.44],
		rotationY:Math.PI*.5,
	},
	{
		name: '',
		id: '',
		point:[-230.77,0,15.43],
		rotationY:Math.PI*.5,
	},
	{
		name: '',
		id: '',
		point:[-295.11,0,-162.42],
		rotationY:Math.PI*.5,
	},
	{
		name: '',
		id: '',
		point:[-178.11,0,218.67],
		rotationY:Math.PI*.5,
},
	{
		name: '',
		id: '',
		point:[32.51,0,132.43],
		rotationY:Math.PI*.5,
	},
	{
		name: '',
		id: '',
		point:[328.50,0,23],
		rotationY:Math.PI*.5,
	},
]
//路灯
var lamps = [
	{
		name:"",
		id:"",
		point:[-543.67,14,-265.72],
		rotationY:Math.PI
	},
	{
		name:"",
		id:"",
		point:[-389.62,14,-265.65],
		rotationY:Math.PI*0.5
	},
	{
		name:"",
		id:"",
		point:[-236.33,14,-266.01],
		rotationY:Math.PI*0.5
	},
	{
		name:"",
		id:"",
		point:[-103.18,14,-265.66],
		rotationY:Math.PI*0.5
	},
	{
		name:"",
		id:"",
		point:[36.49,14,-265.93],
		rotationY:Math.PI*0.5
	},
	{
		name:"",
		id:"",
		point:[158.04,14,-265.63],
		rotationY:Math.PI*0.5
	},
	{
		name:"",
		id:"",
		point:[269.67,14,-265.87],
		rotationY:Math.PI*0.5
	},
	{
		name:"",
		id:"",
		point:[360.04,14,-265.56],
		rotationY:Math.PI*0.5
	},
	{
		name:"",
		id:"",
		point:[438.04,14,-218.56],
		rotationY:Math.PI*0.5
	},
	{
		name:"",
		id:"",
		point:[-293.1,14,-151.31],
		rotationY:0
	},
	{
		name:"",
		id:"",
		point:[-248.69,14,-48.01],
		rotationY:-Math.PI*0.5
	},
	{
		name:"",
		id:"",
		point:[-160.19,14,8.05],
		rotationY:Math.PI*.5
	},
	{
		name:"",
		id:"",
		point:[-67.9,14,9.87],
		rotationY:Math.PI*.5
	},
	{
		name:"",
		id:"",
		point:[24.94,14,-20.12],
		rotationY:-Math.PI*.4
	},
	{
		name:"",
		id:"",
		point:[97.74,14,-44.08],
		rotationY:Math.PI*.5
	},
	{
		name:"",
		id:"",
		point:[142.71,14,-109.91],
		rotationY:Math.PI*.8
	},
	{
		name:"",
		id:"",
		point:[167.65,14,31.24],
		rotationY:Math.PI*0
	},
	{
		name:"",
		id:"",
		point:[320.60,14,50.79],
		rotationY:Math.PI*0.5
	},
	{
		name:"",
		id:"",
		point:[400.30,14,-84.42],
		rotationY:Math.PI*1
	},
	{
		name:"",
		id:"",
		point:[-114.1,14,98.6],
		rotationY:0
	},
	{
		name:"",
		id:"",
		point:[-421.68,14,-183.31],
		rotationY:0
	},
	{
		name:"",
		id:"",
		point:[-324.72,14,-9.58],
		rotationY:0
	},
	{
		name:"",
		id:"",
		point:[-218.63,14,209.37],
		rotationY:-Math.PI*0.7
	},
	{
		name:"",
		id:"",
		point:[-7.9,14,151.21],
		rotationY:-Math.PI*0
	},
	{
		name:"",
		id:"",
		point:[4.12,14,-97.17],
		rotationY:-Math.PI*.3
	},
	{
		name:"",
		id:"",
		point:[95.85,14,-132.24],
		rotationY:-Math.PI*.8
	},
	{
		name:"",
		id:"",
		point:[245.01,14,-127.92],
		rotationY:Math.PI
	},
	{
		name:"",
		id:"",
		point:[-151.62,14,-195.77],
		rotationY:Math.PI
	},
	{
		name:"",
		id:"",
		point:[301.01,14,-13.8],
		rotationY:0
	},

]
class MyGround {
  constructor() {
    // 公路点位数据
    this.driveway = {
      normal: [
        {
          width: 1063,
          height: 57,
          position: [ -40, 1, -298],
          rotation: [Math.PI/2, 0, 0],
          wrap: [ 1, 20 ],
          textRotate: Math.PI/2
        },
        {
          width: 47,
          height: 328,
          position: [ 452, 1, -105],
          rotation: [Math.PI/2, 0, Math.PI/60],
          wrap: [ 1, 7 ],
        }
      ], // 规则路段点位数据信息
      irregular: [
        {
          name:'road8',//外侧道路
          type:'road_branchRoad',
          point:[[-552.48,0,-247.9],[-522.42,0,-265.91],[-524.87,0,-270.32],[-550.59,0,-254.51]],
          height:.3,
          color:"",
          repeatSize:[1,1],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road9',//外侧道路
          type:'road_branchRoad',
          point:[[-522.42,0,-265.91],[-499.6,0,-274.15],[-501.49,0,-279.04],[-524.87,0,-270.32]],
          height:.3,
          color:"",
          repeatSize:[1/5,1/5],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road10',//外侧道路
          type:'road_branchRoad',
          point:[[-499.6,0,-274.15],[-407.87,0,-286.8],[-415,0,-291.5],[-501.49,0,-279.04]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        //小区内部主路
        {
          name:'road11',//外侧道路
          type:'road_branchRoad',
          point:[[-281.75,0,-260.54],[-281.42,0,-122.75],[-290.54,0,-122.75],[-290.32,0,-261.6]],
          height:.3,
          color:"",
          repeatSize:[1,6],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road12',//外侧道路
          type:'road_branchRoad',
          point:[[-281.42,0,-122.75],[-273.73,0,-73.02],[-283.2,0,-72.73],[-290.54,0,-122.75]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road13',//外侧道路
          type:'road_branchRoad',
          point:[[-273.73,0,-73.02],[-263.49,0,-54.52],[-270.51,0,-48.87],[-283.2,0,-72.73]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road14',//外侧道路
          type:'road_branchRoad',
          point:[[-263.49,0,-54.52],[-231.54,0,-21.56],[-237.33,0,-13.89],[-270.51,0,-48.87]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road15',//外侧道路
          type:'road_branchRoad',
          point:[[-231.54,0,-21.56],[-216.63,0,-12.84],[-220.41,0,-4.41],[-237.33,0,-13.89]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road16',//外侧道路
          type:'road_branchRoad',
          point:[[-216.63,0,-12.84],[-200.26,0,-7.86],[-202.94,0,1.44],[-220.41,0,-4.41]],
          height:.3,
          color:"",
          repeatSize:[1,1],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road17',//外侧道路
          type:'road_branchRoad',
          point:[[-200.26,0,-7.86],[-184.79,0,-5.17],[-185.9,0,4.41],[-202.94,0,1.44]],
          height:.3,
          color:"",
          repeatSize:[1,1],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road18',//外侧道路
          type:'road_branchRoad',
          point:[[-184.79,0,-5.17],[-30.28,0,-5.65],[-29.61,0,4.6],[-185.9,0,4.41]],
          height:.3,
          color:"",
          repeatSize:[1,8],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road19',//外侧道路
          type:'road_branchRoad',
          point:[[-30.28,0,-5.65],[-10.58,0,-5.65],[-10.46,0,3.83],[-29.61,0,4.6]],
          height:.3,
          color:"",
          repeatSize:[1,2],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road20',//外侧道路
          type:'road_branchRoad',
          point:[[-10.58,0,-5.65],[16.14,0,-12.84],[17.59,0,-4.41],[-10.46,0,3.83]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road21',//外侧道路
          type:'road_branchRoad',
          point:[[16.14,0,-12.84],[68.57,0,-37.56],[71.80,0,-29.03],[17.59,0,-4.41]],
          height:.3,
          color:"",
          repeatSize:[1,4],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road21',//外侧道路
          type:'road_branchRoad',
          point:[[68.57,0,-37.56],[80.48,0,-45.04],[84.71,0,-38.62],[71.80,0,-29.03]],
          height:.3,
          color:"",
          repeatSize:[1,1],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road22',//外侧道路
          type:'road_branchRoad',
          point:[[80.48,0,-45.04],[90.28,0,-54.52],[95.85,0,-48.1],[84.71,0,-38.62]],
          height:.3,
          color:"",
          repeatSize:[1,1],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road23',//外侧道路
          type:'road_branchRoad',
          point:[[90.28,0,-54.52],[106.87,0,-72.44],[112.21,0,-67.36],[95.85,0,-48.1]],
          height:.3,
          color:"",
          repeatSize:[1,2],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road24',//外侧道路
          type:'road_branchRoad',
          point:[[106.87,0,-72.44],[128.46,0,-103.87],[134.25,0,-100.23],[112.21,0,-67.36]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road25',//外侧道路
          type:'road_branchRoad',
          point:[[128.46,0,-103.87],[141.38,0,-133.1],[146.83,0,-130.61],[134.25,0,-100.23]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road25',//外侧道路
          type:'road_branchRoad',
          point:[[141.38,0,-133.1],[148.05,0,-157.34],[154.29,0,-156.29],[146.83,0,-130.61]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road26',//外侧道路
          type:'road_branchRoad',
          point:[[148.05,0,-157.34],[150.84,0,-184.84],[157.41,0,-184.84],[154.29,0,-156.29]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road27',//外侧道路
          type:'road_branchRoad',
          point:[[150.84,0,-184.84],[149.95,0,-225.38],[156.96,0,-225.95],[157.41,0,-184.84]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        //内部向河边走道路
        {
          name:'road28',//外侧道路
          type:'road_branchRoad',
          point:[[101.19,0,-57.02],[115.33,0,-32.87],[109.54,0,-29.03],[96.18,0,-52.32]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road29',//外侧道路
          type:'road_branchRoad',
          point:[[115.33,0,-32.87],[140.82,0,-6.13],[135.81,0,-0.77],[109.54,0,-29.03]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road30',//外侧道路
          type:'road_branchRoad',
          point:[[140.82,0,-6.13],[172.21,0,22.61],[167.98,0,28.56],[135.81,0,-0.77]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road31',//外侧道路
          type:'road_branchRoad',
          point:[[172.21,0,22.61],[199.71,0,38.04],[197.48,0,44.17],[167.98,0,28.56]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road32',//外侧道路
          type:'road_branchRoad',
          point:[[199.71,0,38.04],[223.64,0,44.75],[221.64,0,51.17],[197.48,0,44.17]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road33',//外侧道路
          type:'road_branchRoad',
          point:[[223.64,0,44.75],[240.12,0,45.42],[237.67,0,51.84],[221.64,0,51.17]],
          height:.3,
          color:"",
          repeatSize:[1,2],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road34',//外侧道路
          type:'road_branchRoad',
          point:[[240.12,0,45.42],[367.80,0,34.59],[367.69,0,39.96],[237.67,0,51.84]],
          height:.3,
          color:"",
          repeatSize:[1,9],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road34',//外侧道路
          type:'road_branchRoad',
          point:[[367.80,0,34.59],[422.57,0,31.14],[423.13,0,36.22],[367.69,0,39.96]],
          height:.3,
          color:"",
          repeatSize:[1,9],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        //右上斜外
        {
          name:'road35',//外侧道路
          type:'road_branchRoad',
          point:[[370.14,0,35.45],[384.83,0,-20.51],[381.38,0,-21.27],[367.02,0,35.36]],
          height:.3,
          color:"",
          repeatSize:[1,9],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        //右上斜外
        {
          name:'road36',//外侧道路
          type:'road_branchRoad',
          point:[[384.83,0,-20.51],[403.87,0,-128.12],[400.86,0,-129.65],[381.38,0,-21.27]],
          height:.3,
          color:"",
          repeatSize:[1,10],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road37',//外侧道路
          type:'road_branchRoad',
          point:[[403.87,0,-128.12],[433.37,0,-176.12],[432.92,0,-182.35],[400.86,0,-129.65]],
          height:.3,
          color:"",
          repeatSize:[1,8],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road38',//外侧道路
          type:'road_branchRoad',
          point:[[384.16,0,-19.74],[388.62,0,-3.35],[385.61,0,-2.78],[382.49,0,-16.39]],
          height:.3,
          color:"",
          repeatSize:[1,5],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road39',//外侧道路
          type:'road_branchRoad',
          point:[[388.62,0,-3.35],[394.74,0,10.83],[392.07,0,11.79],[385.61,0,-2.78]],
          height:.3,
          color:"",
          repeatSize:[1,5],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road40',//外侧道路
          type:'road_branchRoad',
          point:[[394.74,0,10.83],[399.19,0,18.49],[396.41,0,19.84],[392.07,0,11.79]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road41',//外侧道路
          type:'road_branchRoad',
          point:[[399.19,0,18.49],[403.76,0,24.63],[401.08,0,25.97],[396.41,0,19.84]],
          height:.3,
          color:"",
          repeatSize:[1,3],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road42',//外侧道路
          type:'road_branchRoad',
          point:[[403.76,0,24.63],[413.66,0,30.86],[411.77,0,32.68],[401.08,0,25.97]],
          height:.3,
          color:"",
          repeatSize:[1,4],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road43',//外侧道路
          type:'road_branchRoad',
          point:[[368.02,0,-233.14],[397.63,0,-219.24],[395.96,0,-213.88],[357.34,0,-232.28]]
          ,
          height:.3,
          color:"",
          repeatSize:[1,4],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road44',//外侧道路
          type:'road_branchRoad',
          point:[[397.63,0,-219.24],[446.73,0,-203.05],[446.06,0,-198.45],[395.96,0,-213.88]]
          ,
          height:.3,
          color:"",
          repeatSize:[1,5],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road45',//外侧道路
          type:'road_branchRoad',
          point:[[402.98,0,-214.36],[419.67,0,-196.92],[416.22,0,-193.28],[395.18,0,-215.6]]
          ,
          height:.3,
          color:"",
          repeatSize:[1,4],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road46',//外侧道路
          type:'road_branchRoad',
          point:[[419.67,0,-196.92],[428.13,0,-184.75],[423.90,0,-180.91],[416.22,0,-193.28]]
          ,
          height:.3,
          color:"",
          repeatSize:[1,2],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        },
        {
          name:'road47',//外侧道路
          type:'road_branchRoad',
          point:[[428.13,0,-184.75],[440.16,0,-153.22],[439.27,0,-143.16],[423.90,0,-180.91]]
          ,
          height:.3,
          color:"",
          repeatSize:[1,4],
          img:"./assets/image/road1.jpg",
          ifRepeat:true,
          position:[0,0,0],
          rotate:Math.PI/2
        }
      ] // 弯曲不规则露点信息
    }
    this.lampLights = []
		this.cameras = []
		this.rain = null
  }
	/**
	 * 加载小区道路
	 */
	loadRoad(){
		let roadObjs = new THREE.Object3D();
		for(let i=0;i<myRoads.length;i++) {
		  let point = myRoads[i].point;
		  let shape = new THREE.Shape();
      shape.moveTo(point[0][0], -point[0][2]);
      for(let j=1; j<point.length; j++) {
        shape.lineTo(point[j][0], -point[j][2]);
      };
      var extrudeSettings = { amount: .8, bevelEnabled: false, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
      let geo = new THREE.ExtrudeBufferGeometry( shape,  extrudeSettings );
      let mesh = {};
      mesh = new THREE.Mesh( geo, new THREE.MeshPhongMaterial({color: myRoads[i].color}));
      roadObjs.add(mesh);
		}
    roadObjs.rotateX(-Math.PI/2)
		return roadObjs;
	}

  /**
   * 加载公路
   */
	loadDriveWay() {
	  let box = new THREE.Object3D(); // 道路外层容器
    for(let key in this.driveway) {
      if(key === 'normal') {
        // 正常规则道路
        this.driveway[key].map( ( val )=>{
          let { width, height, position, rotation, wrap, textRotate } = val;
          let texture = new THREE.TextureLoader().load('/assets/image/road1.jpg'); //公路统一贴图
          texture.rotation = textRotate || 0;
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(wrap[0], wrap[1]);
          let geometry = new THREE.BoxBufferGeometry( width, height,1 );
          let mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { map: texture } ));
          mesh.rotateX(rotation[0]);
          mesh.rotateY(rotation[1]);
          mesh.rotateZ(rotation[2]);
          mesh.position.set(...position);
          box.add(mesh);
        })
      } else {
        // 非规则道路
        this.driveway[key].map( ( val )=>{
          box.add(this.loadBoxObject(val, 'road'));
        })
      }
    }
    box.position.y = 0.1;
    return box;
  }
	/**
	 * 加载河流
	 */
	loadRiver(){
		let myRiver = [];
    myRiver.push(this.loadBoxObject(myRivers[0], 'river'));
		return myRiver;
	}
	/**
	 * 加载草地
	 */
	loadGrass(){
		let myGrassObjs = new THREE.Object3D();
		for(let i=0;i<myGrass.length;i++){
			myGrassObjs.add(this.loadBoxObject(myGrass[i], 'grass'))
		}
    myGrassObjs.rotateY(Math.PI/60);
		return myGrassObjs;
	}
	/**
	 * 获取box对象
	 * @param size
	 * @param type
	 * @param imgOrColor
	 * @param repeat
	 * @param opacity
	 * @returns {THREE.Mesh}
	 */
	getBoxGeometry(size,type,imgOrColor,repeat,opacity){
		let material;
		if(type=="img"){
			material = new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load(imgOrColor),side:THREE.DoubleSide});
		}else{
			material = new THREE.MeshLambertMaterial({color:imgOrColor});
		}
		if(repeat){
			material.map.wrapS = THREE.RepeatWrapping;
			material.map.wrapT = THREE.RepeatWrapping;
			material.map.repeat.set(repeat[0],repeat[1]);
		}
		if(opacity){
			material.transparent = true;
			material.opacity = opacity;
		}
		let geometry = new THREE.BoxGeometry(size[0],size[1],size[2]);
		let objectMesh = new THREE.Mesh(geometry,material);
		return objectMesh;
	}
	/**
	 * 构造
	 * @param config
	 * @param type
	 */
	loadBoxObject(config,type){
		let topPoints = [];
		let points = config.point;
		for(let i=0;i<points.length;i++) {
			let vertice = points[i];
			topPoints.push([vertice[0],vertice[1]+config.height,vertice[2]]);
		}
		let totalPoints = points.concat(topPoints);
		let vertices =[];           //所有的顶点
		for(let j=0;j<totalPoints.length;j++) {
			vertices.push(new THREE.Vector3(...totalPoints[j]))
		}
		let length = points.length;
		let faces = [];
		/**
     * 侧面可以不需要贴图
     * */
		// for(let n=0;n<length;n++) {                      //侧面生成三角形
		// 	if(n!=length-1) {
		// 		faces.push(new THREE.Face3(n,n+1,length+n+1));
		// 		faces.push(new THREE.Face3(length+n+1,length+n,n));
		// 	}else {
		// 		faces.push(new THREE.Face3(n,0,length));
		// 		faces.push(new THREE.Face3(length,length+n,n));
		// 	}
		// }
		let data=[];
		for(let m=0;m<length;m++) {
			data.push(points[m][0],points[m][2]);
		}
		// 为底部划分平面区域
		let triangles = Earcut.triangulate(data);
		if(triangles && triangles.length) {
			for(let l=0; l<triangles.length; l+=3) {
        faces.push(new THREE.Face3(triangles[l],triangles[l+1],triangles[l+2]));                            //底部的三角面
        faces.push(new THREE.Face3(triangles[l]+length,triangles[l+1]+length,triangles[l+2]+length));        //顶部的三角面
			}
		}
		let geometry = new THREE.Geometry();
		geometry.vertices = vertices;
		geometry.faces = faces;
		geometry.computeFaceNormals();      //自动计算法向量
		//给立方体设置贴图

    let material = null; // 材质贴图
    if( config.img ) {
      let texture = new THREE.TextureLoader().load(config.img); //公路统一贴图
      texture.rotation = Math.PI/2;
      texture.repeat.set(...config.repeatSize);
      material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide, // 两面可见
        map: texture
      });
    } else {
      material = new THREE.MeshLambertMaterial({
        side: THREE.DoubleSide, // 两面可见
        color: config.color
      });
    }
    // 每个面都是整块图形
    let uv = [new THREE.Vector2(0,0),new THREE.Vector2(1,0),new THREE.Vector2(1,1),new THREE.Vector2(0,1)];
    for(let g=0;g<geometry.faces.length;g++){
      geometry.faceVertexUvs[0][g] = [uv[0],uv[1],uv[2]];
      geometry.faceVertexUvs[0][g+1] = [uv[2],uv[3],uv[0]];
    }
    let cube = new THREE.Mesh(geometry, material);
		if(config.ifRepeat){
			cube.material.map.wrapS = THREE.RepeatWrapping;
			cube.material.map.wrapT = THREE.RepeatWrapping;
			cube.material.map.needsUpdate = true;
		}
		if(type=="floor"){
			cube.position.y =0;
		}
		if(type=="road"){
			cube.position.y =1;
		}
		if(type=="river"){
			cube.position.y = 2.5;
		}
		if(type=="grass"){
			cube.position.y = 0
		}
		return cube;
	}
	/**
	 * 使用shape加载对象
	 */
	loadRiverWater(){
		let heartShape = new THREE.Shape();

		heartShape.moveTo( myRivers[0].point[0][0],-myRivers[0].point[0][2] );
		for(let i=1;i<myRivers[0].point.length;i++){
			let point = myRivers[0].point[i];
			heartShape.lineTo(point[0],-point[2])
		}
		let geometry = new THREE.ShapeGeometry( heartShape );
		return geometry;
	}
	/**
	 * 创建材质
	 * @param type
	 * @param imgOrColor
	 * @param size
	 * @param opacity
	 * @returns {MeshPhongMaterial}
	 */
	createMaterial(type,imgOrColor,size,opacity,rotate){
		let material;
		if(type=="img"){
			material = new THREE.MeshPhongMaterial({
				map:new THREE.TextureLoader().load(imgOrColor),
				side:THREE.DoubleSide
			})
		}else{
			material = new THREE.MeshPhongMaterial({color:imgOrColor,side:THREE.DoubleSide})
		}

		if(size){
			material.map.wrapS = THREE.RepeatWrapping;
			material.map.wrapT = THREE.RepeatWrapping;
			material.map.repeat.set(size[0],size[1]);
		}
		if(opacity){
			material.transparent = true;
			material.opacity = opacity;
		}
		if(rotate){
			material.map.rotation = rotate;
		}
		return material;
	}
	/**
	 * 导入模型文件
	 */
	loadTree () {
		return new Promise(function (resolve, reject) {
      let mtlLoader = new THREE.MTLLoader();
      let objLoader = new THREE.OBJLoader();
      let trees = new THREE.Object3D();
      mtlLoader.load('../models/tree/file.mtl',function(materials){
        materials.preload();
        materials.alphaTest = 0;
        materials.blendDstAlpha = 0;
        objLoader.setMaterials(materials);
        objLoader.load('../models/tree//file.obj',function(obj){
          obj.scale.set(0.05, 0.06, 0.05);
          for(let i=0;i<myTrees.length;i++){
            let treePoints = myTrees[i].point;
            for(let j=0;j<treePoints.length;j++){
              let obj1 = obj.clone();
              obj1.position.set(treePoints[j][0],treePoints[j][1],treePoints[j][2]);
              trees.add(obj1);
            }
          }
          resolve(trees);
        },null, (e)=>{console.log(e); reject(e)})
      })
    })
	}

	/**
	 * 加载垃圾桶
	 */
	loadGarbageBin () {
		let objects = new THREE.Object3D();

		let boxInner = new THREE.BoxGeometry(1.2,1.5,1.2);
		let material1 = new THREE.MeshLambertMaterial({color:0xcccccc});
		let material2 = new THREE.MeshLambertMaterial({color:0x256856});

		let upBoxMesh = this.getBoxGeometry([1.5,0.3,3],"color",0x256856);
		let downBoxMesh = this.getBoxGeometry([1.7,0.6,2.7],"color",0x256856);
		//左右两个桶
		let boxLeftMesh = this.getBoxGeometry([1.5,2,1.4],"color",0xcccccc);
		let boxRightMesh = this.getBoxGeometry([1.5,2,1.4],"color",0xcccccc);
		upBoxMesh.position.y=1.6
		downBoxMesh.position.y=-1

		let boxLeftBSP = new ThreeBSP(boxLeftMesh);
		let holeCube = new THREE.Mesh(boxInner);
		holeCube.position.set(0,0.5,0);
		let clipBSP1 = new ThreeBSP(holeCube);
		let resultBSPLeft = boxLeftBSP.subtract(clipBSP1);
		boxLeftMesh = resultBSPLeft.toMesh();
		boxLeftMesh.material = material1;
		boxLeftMesh.position.z = -0.7;

		let boxRightBSP = new ThreeBSP(boxRightMesh);
		let holeCubeRight = new THREE.Mesh(boxInner);
		holeCubeRight.position.set(0,0.5,0);

		let clipBSP2 = new ThreeBSP(holeCubeRight);
		let resultBSPRight = boxRightBSP.subtract(clipBSP2);
		boxRightMesh = resultBSPRight.toMesh();
		boxRightMesh.material = material1;
		boxRightMesh.position.z = 0.7

		let otherWasteMesh = this.getBoxGeometry([0.2,2,1.4],"img","../assets/image/otherWaste.png");
		let recycableMesh = this.getBoxGeometry([0.2	,2,1.4],"img","../assets/image/recycable.png");
		otherWasteMesh.position.set(-.7,0,0.7);
		recycableMesh.position.set(-.7,0,-0.7);
		let otherWasteMesh2 = otherWasteMesh.clone();
		let recycableMesh2 = recycableMesh.clone();
		otherWasteMesh2.position.set(.7,0,.7);
		recycableMesh2.position.set(.7,0,-.7);
		//侧边
		let postMesh = this.getBoxGeometry([1.5,2.3,0.1],"color",0xcccccc);
		postMesh.position.set(0,0.3,-1.4);

		let postMesh2 = postMesh.clone();
		postMesh2.position.set(0,0.3,1.4);

		objects.add(upBoxMesh);
		objects.add(downBoxMesh);
		objects.add(boxLeftMesh);
		objects.add(boxRightMesh);
		objects.add(recycableMesh);
		objects.add(otherWasteMesh);
		objects.add(recycableMesh2);
		objects.add(otherWasteMesh2);
		objects.add(postMesh);
		objects.add(postMesh2);
		objects.position.set(-120,1.7,0);
		objects.castShadow = true;
		var myGarbageBins=[];
		for(let i =0;i<garbageBins.length;i++){
			let garbageBinObj = objects.clone();
			let point = garbageBins[i].point;
			garbageBinObj.position.set(point[0],point[1],point[2]);
			garbageBinObj.scale.set(2,2,2);
			garbageBinObj.position.y = 4;
			garbageBinObj.rotation.y = garbageBins[i].rotationY;
			myGarbageBins.push(garbageBinObj);
		}
		return myGarbageBins;
	}
	/**
	 * 加载路灯
	 */
	loadLamp () {
		let objects = new THREE.Object3D();

		let postBox = new THREE.CylinderBufferGeometry(0.2,0.3,26,30);//灯柱
		let material = new THREE.MeshLambertMaterial({color:0xffffff,side:THREE.DoubleSide});
		let post = new THREE.Mesh(postBox,material);

		let pointsData = [[0,0,0],[0.5,0.5,0],[1,0.7,0],[1.5,0.8,0],[2,0.9,0],[2.5,1,0],[5,1.4,0]];
		let points=[];
		for(let i=0;i<pointsData.length;i++){
			points.push(new THREE.Vector3(pointsData[i][0],pointsData[i][1],pointsData[i][2]));
		}
		let tubeGeometry = new THREE.TubeGeometry(new THREE.SplineCurve3(points),128,0.1,12)
		let materialTube = new THREE.MeshPhongMaterial({color:0xffffff,side:THREE.DoubleSide});
		let tubeMesh = new THREE.Mesh(tubeGeometry,materialTube);
		tubeMesh.position.set(0.2,9,0);

		let lamp = new THREE.Object3D();
		let lampPart1 = this.getBoxGeometry([1.2,0.2,0.6],"color",0x000000);
		let lampPart2 = this.getBoxGeometry([1,0.1,0.5],"color",0xdddddd);
		lampPart1.name="lamp";
		lampPart2.position.y = -0.12;
		lamp.add(lampPart2);
		lamp.add(lampPart1);

		lamp.position.set(5.2,10.4,0)
		objects.position.set(-120,10,0);

		let circleGeometry = new THREE.CircleGeometry( 12, 64 );
		let canvasTexture = this.createCanvasTexture('243,196,16');
		let circleMaterial = new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(canvasTexture)});
		circleMaterial.transparent = true
		circleMaterial.opacity = .5;
		let circleMesh = new THREE.Mesh( circleGeometry, circleMaterial );
		circleMesh.rotation.x = -Math.PI/2
		circleMesh.position.set(0,-12,0);
		circleMesh.visible = false

		let cameraObj = this.addCameras()//灯柱上添加摄像头
		cameraObj.name = "camera"

		let spriteMap = new THREE.TextureLoader().load('./assets/image/camera_video.png')
		let spriteMaterial = new THREE.SpriteMaterial({map:spriteMap,color:0xffffff,sizeAttenuation:false,depthTest:false})
		let sprite = new THREE.Sprite(spriteMaterial)
		sprite.position.set(0,10.5,1.5)
		sprite.scale.set(.05,.05,.05)
		sprite.name = 'camera'

		objects.add(post);
		objects.add(tubeMesh);
		objects.add(lamp);
		objects.add(circleMesh)
		objects.add(cameraObj)
		objects.add(sprite)

		objects.scale.set(0.8,1,0.8)

		let myLamps=[circleMesh];
		for(let i=0;i<lamps.length;i++){
			let lampClone = objects.clone();

			lampClone.position.set(lamps[i].point[0],lamps[i].point[1],lamps[i].point[2]);
			lampClone.rotation.y = lamps[i].rotationY;

			myLamps.push(lampClone);
			this.lampLights.push(lampClone.children[3])
		}
		return myLamps;
	}
	// 构造监控摄像机
	addCameras(){
		let object = new THREE.Object3D();
		let cyliderOut = new THREE.CylinderBufferGeometry(0.2,0.2,1,8);
		let cylider = new THREE.CylinderBufferGeometry(0.16,0.16,.8,30)
		let material1 = new THREE.MeshPhongMaterial({color:0xffffff});
		let material2 = new THREE.MeshLambertMaterial({map:new THREE.TextureLoader().load('../assets/image/camera.png'),side:THREE.DoubleSide})
		let cyliderOutMesh = new THREE.Mesh(cyliderOut,material1);
		let cyliderMesh = new THREE.Mesh(cylider,material2);
		cyliderMesh.position.y=0.2

		let pointsData = [[0,-.4,0],[0,0.6,0],[0.2,0.4,0]];
		let points = [];
		for(let i=0;i<pointsData.length;i++){
			points.push(new THREE.Vector3(pointsData[i][0],pointsData[i][1],pointsData[i][2]));
		}
		let tubeGeometry = new THREE.TubeGeometry(new THREE.SplineCurve3(points),128,0.04,12)
		let tubeMesh = new THREE.Mesh(tubeGeometry,material1);
		tubeMesh.position.set(-0.4,-0.4,0);
		cyliderOutMesh.name = "camera";
		cyliderMesh.name="camera";
		object.add(cyliderOutMesh);
		object.add(cyliderMesh);
		object.add(tubeMesh);
		object.position.set(0,9.4,.7);
		object.rotation.x = Math.PI/2;
		object.rotation.y = Math.PI/2;
		object.name="camera";
		object.scale.set(1,1,1)
		object.name='camera'
		this.cameras.push(object)
		return object
	}
	closeLampLight(){
		for(let i=0;i<this.lampLights.length;i++){
			this.lampLights[i].visible = false
		}
	}
	openLampLight(){
		for(let i=0;i<this.lampLights.length;i++){
			this.lampLights[i].visible = true
		}
	}

	/**
	 * 雨滴
	 */
	createRain(){
		let texture = new THREE.TextureLoader().load("../assets/image/rain.png")
		let geom = new THREE.Geometry();
		let material = new THREE.PointsMaterial({
			size:2,
			transparent:true,
			opacity:.6,
			vertexColors:true,
			color:'#fff',
			map:texture,
			depthTest:false
		})
		let range = 600
		for(let i=0;i<30000;i++){
			let particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
			particle.velocityY = 0.1 + Math.random() / 5;
			particle.velocityX = (Math.random() - 0.5) / 3;
			geom.vertices.push(particle);
			let color = new THREE.Color(0xffffff);
			geom.colors.push(color);
		}
		this.cloud = new THREE.Points(geom, material);
		this.cloud.type = "rain";
		this.cloud.visible = false;
		this.cloud.verticesNeedUpdate = true;
		return this.cloud;
	}
	/**
	 * 创造canvas纹理
	 */
	createCanvasTexture(color){
		let canvas = document.createElement("canvas");
		canvas.width = 112;
		canvas.height = 112;
		let context = canvas.getContext("2d");
		var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
		gradient.addColorStop(0, 'rgba(' + color + ',1)');
		gradient.addColorStop(1, 'rgba(69,56,4,0)');
		context.fillStyle = gradient;
		context.fillRect(0, 0, canvas.width, canvas.height);
		return canvas;
	}

	/**
	 * 添加绿植
	 */
	/**
	 * 获取植物
	 */
	addPlant(size,img,position){
		if(img&&size&&position){
			let plant = new THREE.Object3D();
			let leafTure = new THREE.TextureLoader().load(img);
			let geometry1 = new THREE.PlaneGeometry(size[0],size[1]);
			let leafMaterial = new THREE.MeshLambertMaterial({map:leafTure,side:THREE.DoubleSide,transparent:true});

			for(var i=1;i<4;i++){
				var leaf = new THREE.Mesh(geometry1,leafMaterial);
				leaf.position.set(0,10,0)
				leaf.rotation.y = -Math.PI/(i+1)
				plant.add(leaf);
			}
			plant.position.set(position[0],position[1],position[2]);
		}else{
			let plant = new THREE.Object3D();
			let leafTure = new THREE.TextureLoader().load('../assets/image/tree_icon2.png');
			let geometry1 = new THREE.PlaneGeometry(10,20);
			let leafMaterial = new THREE.MeshLambertMaterial({map:leafTure,side:THREE.DoubleSide,transparent:true,opacity:0.8});

			plant.castShadow = true;
			return plant
		}
	}

	/**
	 * 添加一个tub对象
	 */
	addTube(scene){
		let firstPoint = [0,10,0];
		let pointsData = []
		let firstRadius = 10;

		let beforePoint = firstPoint
		for(let i=0;i<20;i++){
			let yPlus =  Math.random()*2 + beforePoint[1];
			let xPlus = Math.random()-0.5+beforePoint[0];
			let zPlus = Math.random()-0.5+beforePoint[2];
			let nextPoint = [xPlus,yPlus,zPlus];
			beforePoint = [xPlus,yPlus,zPlus];
			pointsData.push(nextPoint)
			if(pointsData.length==20){
				let points = [];
				for(let i=0;i<pointsData.length;i++){
					points.push(new THREE.Vector3(pointsData[i][0],pointsData[i][1],pointsData[i][2]));
				}
				let path = new THREE.SplineCurve3(points)
				let geometry = new THREE.TubeGeometry( path, 200, 2-Math.random()*.3, 100, false );
				let material = new THREE.MeshBasicMaterial( { map: new THREE.TextureLoader().load('../assets/image/wall.png') } );
				let tubeMesh = new THREE.Mesh(geometry,material)
				scene.add(tubeMesh)
				pointsData = []
			}
		}



	}

	/**
	 * 构建树木
	 */
	addTree(scene){
		let treeObj = new THREE.Object3D();


		let plant = new THREE.Object3D();
		for(let j=0;j<1000;j++){
			let leafTure = new THREE.TextureLoader().load('../assets/image/leaf.png');
			let geometry1 = new THREE.PlaneGeometry(10,20);
			let leafMaterial = new THREE.MeshLambertMaterial({map:leafTure,side:THREE.DoubleSide,transparent:true,opacity:0.8});
			let plantMesh = new THREE.Mesh(geometry1,leafMaterial)
			plantMesh.scale.set(.1,.1,.1)
			plantMesh.rotation.x = Math.random()*Math.PI;
			plantMesh.position.set((Math.random()-0.5)*400,1,(Math.random())*100)
			plant.add(plantMesh)

		}
		treeObj.add(plant)
		scene.add( treeObj );

	}
}
export default new MyGround();
