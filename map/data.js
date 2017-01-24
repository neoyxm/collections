//type defination 
// 1: 居委
// 2: 社区企业
// 3: 社区单位
var data_list = [
	//street
	{type:"1", lng:121.502406,lat:31.28419, title:"玉一居委会", alias:"玉一", tel:"65526325", addr:"玉田新村10弄7号103,104室", info:"<b>总支书记</b>: 蔡济华 65541219, 13391305233<br><b>居委主任</b>: 庄文琴 65537757, 13564102827"},
	{type:"1", lng:121.501806,lat:31.282215, title:"玉二居委会", alias:"玉二", tel:"65527730", addr:"玉田新村44号甲2楼",  info:"<b>总支书记</b>: 孙雅娜 655277671, 13818500976<br><b>居委主任</b>: 刘萍 65520968, 13482159025"},

	
	//police
	{type:"2",lng:121.488974,lat:31.281105, title:"上海外语教育出版社有限公司", alias:"外教出",tel:"021-65425300-4064", addr:"大连西路558号", info:"<b>联系人</b>: 吴宏年"},
	//{type:"2",lng:121.477611,lat:31.262235, title:"广灵派出所", tel:"(021)65290133, (021)65299547", addr:"凉城路800号（近车站北路）"},
	//{type:"2",lng:121.521304,lat:31.295937, title:"广中派出所", tel:"(021)55250958", addr:"政悦路430号（殷行路政悦路）"},

	//center
	{type:"3",lng:121.493727,lat:31.296917, title:"中国石化加油站", alias:"中石化", tel:"", addr:"中山北一路1123号", info:""},
	//{type:"center",lng:121.473443,lat:31.257543, title:"广灵社保中心", tel:"(021)66161686", addr:"祁连山路聚丰园路155号"},
	//{type:"center",lng:121.507794,lat:31.27347, title:"广中社保中心", tel:"021-66050000", addr:"上海市闸北区中山北路1015号"},
];

var icon_list = [
	{type:"1", icon:"./icon/icon1.png"},
	{type:"2", icon:"./icon/icon2.png"},
	{type:"3", icon:"./icon/icon3.png"},		
];

var Quyangboundary_list = [
new BMap.Point(121.487356,31.295941),
new BMap.Point(121.4875,31.291791),
new BMap.Point(121.487931,31.290896),

new BMap.Point(121.487823,31.290001),
new BMap.Point(121.487913,31.28656),
new BMap.Point(121.488506,31.285033),
new BMap.Point(121.486799,31.280928),

new BMap.Point(121.489656,31.280774),
new BMap.Point(121.493716,31.282224),

//new BMap.Point(121.50313,31.282101),
new BMap.Point(121.50322,31.281924),
new BMap.Point(121.502627,31.288952),


new BMap.Point(121.503795,31.291035),
new BMap.Point(121.508897,31.294923),
new BMap.Point(121.505358,31.297199),
new BMap.Point(121.505178,31.298564),
new BMap.Point(121.504729,31.300832),
new BMap.Point(121.487356,31.295941),
];

var styleJson = [
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": { "visibility": "off" }
    }
];

var initial_point = {lng:121.497242, lat:31.290280};
var initial_max_zoom=19;
var initial_min_zoom=16;
var initial_zoom_level = 16;
var show_result_zoom_level = 14;
var show_info_zoom_level = 18;
/*
//if under the low screen resolution, use the low zoom level
if (window.screen.height < 1080)
{
	initial_zoom_level = 16;
}
*/

