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

new BMap.Point(121.489198,31.280488),
new BMap.Point(121.493716,31.282224),

//new BMap.Point(121.50313,31.282101),
new BMap.Point(121.50322,31.281924),
new BMap.Point(121.502627,31.288952),


new BMap.Point(121.503795,31.291035),
new BMap.Point(121.508897,31.294923),

new BMap.Point(121.505893,31.297056),
new BMap.Point(121.506225,31.298822),
new BMap.Point(121.507959,31.299393),
new BMap.Point(121.507186,31.301329),
new BMap.Point(121.487356,31.295941),
];

var styleJson = [
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": { "visibility": "off" }
    }
];

var MissedRoad_list = [
{label:"运", pos: new BMap.Point(121.499726,31.298055), max_level:16 },
{label:"光", pos: new BMap.Point(121.501019,31.29645), max_level:16 },
{label:"路", pos: new BMap.Point(121.503175,31.296481), max_level:16 },

{label:"腾", pos: new BMap.Point(121.497965,31.296493), max_level:18 },
{label:"克", pos: new BMap.Point(121.498769,31.29674), max_level:18 },
{label:"路", pos: new BMap.Point(121.499609,31.296967), max_level:18 },

{label:"伊", pos: new BMap.Point(121.500588,31.295775), max_level:18 },
{label:"敏", pos: new BMap.Point(121.500233,31.294788), max_level:18 },
{label:"河", pos: new BMap.Point(121.49982,31.293561), max_level:18 },
{label:"路", pos: new BMap.Point(121.499721,31.292312), max_level:18 },

{label:"松", pos: new BMap.Point(121.504851,31.299578), max_level:17 },
{label:"花", pos: new BMap.Point(121.504868,31.298228), max_level:17 },
{label:"江", pos: new BMap.Point(121.506,31.296693), max_level:17 },
{label:"路", pos: new BMap.Point(121.507402,31.295829), max_level:17 },


{label:"辉", pos: new BMap.Point(121.504797,31.296817), max_level:16 },
{label:"河", pos: new BMap.Point(121.504797,31.295891), max_level:16 },
{label:"路", pos: new BMap.Point(121.504833,31.294472), max_level:16 },
];

var initial_point = {lng:121.497242, lat:31.290280};
var initial_max_zoom=20;
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

