//type defination 
// 1: 居委
// 2: 社区企业
// 3: 社区单位
var data_list = [
	//street
	{type:"1", lng:121.502406,lat:31.28419, title:"玉一居委会", alias:"玉一", tel:"65526325", addr:"玉田新村10弄7号103,104室", info:"<b>总支书记</b>: 蔡济华 65541219, 13391305233<br><b>居委主任</b>: 庄文琴 65537757, 13564102827"},
	{type:"1", lng:121.501806,lat:31.282215, title:"玉二居委会", alias:"玉二", tel:"65527730", addr:"玉田新村44号甲2楼",  info:"<b>总支书记</b>: 孙雅娜 655277671, 13818500976<br><b>居委主任</b>: 刘萍 65520968, 13482159025"},
    {type:"1", lng:121.499591,lat:31.283478, title:"玉三居委会", alias:"玉三", tel:"65556196", addr:"玉田新村131号甲2楼",  info:"<b>总支书记</b>: 周阿娣 65532050、13636455324<br><b>居委主任</b>: 高允娟 65537943、13611762774"},
	{type:"1", lng:121.498832,lat:31.283683, title:"玉四居委会", alias:"玉四", tel:"65542426", addr:"玉田新村111号2楼",  info:"<b>总支书记</b>: 梁  溪 13482637922<br><b>居委主任</b>: 张  卓 65537875、13901842109"},
    {type:"1", lng:121.496281,lat:31.283826, title:"曲一居委会", alias:"曲一", tel:"65525926", addr:"大连西路230弄17号2楼",  info:"<b>总支书记</b>: 凌  云 13817661314<br><b>居委主任</b>: 方志德 65531915、13917899343"},
    {type:"1", lng:121.493537,lat:31.28307, title:"曲二居委会", alias:"曲二", tel:"65525707", addr:"大连西路270弄10号2楼",  info:"<b>总支书记</b>: 张月红 65550105、13916520556<br><b>居委主任</b>: 王国霞 65533029、13801708869"},
    {type:"1", lng:121.495156,lat:31.287609, title:"东体居委会", alias:"东体", tel:"65555523", addr:"赤峰路373弄7号2楼",  info:"<b>总支副书记</b>: 季蓉、严毅晨 <br><b>居委主任</b>: 季  蓉 65521835、13661562148"},
    {type:"1", lng:121.496346,lat:31.28818, title:"东四居委会", alias:"东四", tel:"65544695", addr:"赤峰路372弄7号2楼",  info:"<b>总支副书记/居委主任</b>: 徐建芳 65535696、13816812786"},
	{type:"1", lng:121.496894,lat:31.289665, title:"东五居委会", alias:"东五", tel:"65548838", addr:"曲阳路619号2楼",  info:"<b>总支书记</b>: 赵云飞 65531684、18930109196<br><b>居委主任</b>: 吴华方 65546948、15900740518"},
 	{type:"1", lng:121.502522,lat:31.288878, title:"赤一居委会", alias:"赤一", tel:"65555158", addr:"密云路471弄3号2楼",  info:"<b>总支书记</b>: 蒋君宝 65557584、13816372822<br><b>居委主任</b>: 顾栋梅 65530228、13818119185"},
    {type:"1", lng:121.499225,lat:31.289302, title:"赤二居委会", alias:"赤二", tel:"65550702", addr:"曲阳路610弄13号2楼",  info:"<b>总支书记</b>: 杨  宏 65550227、13661426001<br><b>居委主任</b>: 于海明 55540067、13918263735"},
    {type:"1", lng:121.500289,lat:31.290023, title:"赤三居委会", alias:"赤三", tel:"65532887", addr:"曲阳路630弄3号2楼",  info:"<b>总支书记</b>: 张咏彪 65546452、13391147266<br><b>居委主任</b>: 谢  辉 65526006、13621820162"},
    {type:"1", lng:121.501367,lat:31.287566, title:"密一居委会", alias:"密一", tel:"65542664", addr:"赤峰路317弄11号2楼",  info:"<b>总支书记</b>: 孙  铭 65547286、15921198845<br><b>居委主任</b>: 施祖英 55884496、13916728278"},
    {type:"1", lng:121.499508,lat:31.286737, title:"密二居委会", alias:"密二", tel:"65554873", addr:"玉田支路16号2楼",  info:"<b>总支书记</b>: 高  敏 65549148、13795498042<br><b>居委主任</b>: 赵  伟 65549148、13764099790"},
    {type:"1", lng:121.499104,lat:31.287273, title:"密三居委会", alias:"密三", tel:"65527991", addr:"玉田支路33号2楼",  info:"<b>总支书记/居委主任</b>: 顾莉莉 65532880、13162673636"},
   {type:"1", lng:121.501924,lat:31.29842, title:"运一居委会", alias:"运一", tel:"65529402", addr:"邯郸路47弄69号1楼",  info:"<b>总支书记</b>: 闻伟定 65558569、13611926167<br><b>居委主任</b>: 徐素金 65555061、13916500459"},
   {type:"1", lng:121.499908,lat:31.295759, title:"运二居委会", alias:"运二", tel:"65546714", addr:"曲阳路838号－10",  info:"<b>总支副书记</b>: 熊晓燕、朱国华 熊:13917789300<br><b>居委主任</b>: 朱国华 65549278、18930132552"},
   {type:"1", lng:121.502971,lat:31.295593, title:"运三居委会", alias:"运三", tel:"65540586", addr:"巴林路60弄50号",  info:"<b>总支书记</b>: 梁惠萍 65286994、13501666421<br><b>居委主任</b>: 沈  洁 13816062846"},
   {type:"1", lng:121.492223,lat:31.290486, title:"上农一居委会", alias:"上农一", tel:"65315104", addr:"赤峰路626弄31号108室",  info:"<b>总支书记</b>: 张  蔚 65521360、13122045451<br><b>总支副书记</b>: 潘红珍"},
   {type:"1", lng:121.488791,lat:31.293441, title:"上农二居委会", alias:"上农二", tel:"65429407", addr:"新市路251弄5号102室",  info:"<b>总支书记/居委主任</b>: 付  红 55382602、18918550565 "},
   {type:"1", lng:121.504902,lat:31.294378, title:"林云居委会", alias:"林云", tel:"65544823", addr:"辉河路26号",  info:"<b>总支书记</b>: 丁  琳 65528478、13651807786<br><b>居委副主任</b>: 史培君 13918900023"},
   {type:"1", lng:121.503122,lat:31.29361, title:"巴林居委会", alias:"巴林", tel:"55884995", addr:"巴林路41弄14号",  info:"<b>总支书记</b>: 方国华 55885026、13023243100<br><b>居委主任</b>: 沈惠娟 65542331、18916196726"},
   {type:"1", lng:121.492901,lat:31.288253, title:"鸿雁家委会", alias:"鸿雁", tel:"65830642", addr:"赤峰路600弄9号101室",  info:"<b>总支书记</b>: 冯  建 55887113、13162308880<br><b>居委主任</b>: 金今花 65611244、18917077812"},
   {type:"1", lng:121.493905,lat:31.290398, title:"银联居委会", alias:"银联", tel:"65364462", addr:"东体育会路880弄10号102室",  info:"<b>总支书记</b>: 杨德新 65539362、13621652846<br><b>居委副主任</b>:佘华丽 13795270928"},
 
	//police
	//police
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
var show_max_items = 25;
/*
//if under the low screen resolution, use the low zoom level
if (window.screen.height < 1080)
{
	initial_zoom_level = 16;
}
*/

