var OFFSET_RIGHT = 0;
var OFFSET_LEFT = 1; 
var OFFSET_UP = 2;
var OFFSET_DOWN = 3;

var OFFSET_LEFT3 = 4; 
var OFFSET_UP3 = 5;
var OFFSET_DOWN3 = 6;

var OFFSET_LEFT4 = 7; 
var OFFSET_UP4 = 8;
var OFFSET_DOWN4 = 9;

var OFFSET_LEFT5 = 10; 
var OFFSET_UP5 = 11;
var OFFSET_DOWN5 = 12;
var offset_list = [
	{w:22, h:5},
	{w:-27, h:5},
	{w:-1, h:-17},
	{w:-3, h:26},
	
	{w:-40, h:5},
	{w:-11, h:-19},
	{w:-11, h:26},
	
	{w:-52, h:5},
	{w:-15, h:-18},
	{w:-15, h:26},
	
	{w:-65, h:5},
	{w:-25, h:-18},
	{w:-25, h:26},
];

//type defination 
// 1: 居委
// 2: 社区企业
// 3: 社区单位
var data_list = [
	//street
	{type:"1", lng:121.502406,lat:31.28419, title:"玉一居委会", alias:"玉一", tel:"65526325", addr:"玉田新村10弄7号103,104室", info:"<b>总支书记</b>: 蔡济华 65541219, 13391305233<br><b>居委主任</b>: 庄文琴 65537757, 13564102827",offset:OFFSET_DOWN},
	{type:"1", lng:121.501806,lat:31.282215, title:"玉二居委会", alias:"玉二", tel:"65527730", addr:"玉田新村44号甲2楼",  info:"<b>总支书记</b>: 孙雅娜 655277671, 13818500976<br><b>居委主任</b>: 刘萍 65520968, 13482159025"},
    {type:"1", lng:121.499591,lat:31.283478, title:"玉三居委会", alias:"玉三", tel:"65556196", addr:"玉田新村131号甲2楼",  info:"<b>总支书记</b>: 周阿娣 65532050、13636455324<br><b>居委主任</b>: 高允娟 65537943、13611762774"},
	{type:"1", lng:121.498832,lat:31.283683, title:"玉四居委会", alias:"玉四", tel:"65542426", addr:"玉田新村111号2楼",  info:"<b>总支书记</b>: 梁  溪 13482637922<br><b>居委主任</b>: 张  卓 65537875、13901842109",offset:OFFSET_DOWN},
    {type:"1", lng:121.496281,lat:31.283826, title:"曲一居委会", alias:"曲一", tel:"65525926", addr:"大连西路230弄17号2楼",  info:"<b>总支书记</b>: 凌  云 13817661314<br><b>居委主任</b>: 方志德 65531915、13917899343",offset:OFFSET_DOWN},
    {type:"1", lng:121.493537,lat:31.28307, title:"曲二居委会", alias:"曲二", tel:"65525707", addr:"大连西路270弄10号2楼",  info:"<b>总支书记</b>: 张月红 65550105、13916520556<br><b>居委主任</b>: 王国霞 65533029、13801708869",offset:OFFSET_DOWN},
    {type:"1", lng:121.495156,lat:31.287609, title:"东体居委会", alias:"东体", tel:"65555523", addr:"赤峰路373弄7号2楼",  info:"<b>总支副书记</b>: 季蓉、严毅晨 <br><b>居委主任</b>: 季  蓉 65521835、13661562148",offset:OFFSET_DOWN},
    {type:"1", lng:121.496346,lat:31.28818, title:"东四居委会", alias:"东四", tel:"65544695", addr:"赤峰路372弄7号2楼",  info:"<b>总支副书记/居委主任</b>: 徐建芳 65535696、13816812786",offset:OFFSET_DOWN},
	{type:"1", lng:121.496894,lat:31.289665, title:"东五居委会", alias:"东五", tel:"65548838", addr:"曲阳路619号2楼",  info:"<b>总支书记</b>: 赵云飞 65531684、18930109196<br><b>居委主任</b>: 吴华方 65546948、15900740518",offset:OFFSET_LEFT},
 	{type:"1", lng:121.502522,lat:31.288878, title:"赤一居委会", alias:"赤一", tel:"65555158", addr:"密云路471弄3号2楼",  info:"<b>总支书记</b>: 蒋君宝 65557584、13816372822<br><b>居委主任</b>: 顾栋梅 65530228、13818119185"},
    {type:"1", lng:121.499225,lat:31.289302, title:"赤二居委会", alias:"赤二", tel:"65550702", addr:"曲阳路610弄13号2楼",  info:"<b>总支书记</b>: 杨  宏 65550227、13661426001<br><b>居委主任</b>: 于海明 55540067、13918263735",offset:OFFSET_DOWN},
    {type:"1", lng:121.500289,lat:31.290023, title:"赤三居委会", alias:"赤三", tel:"65532887", addr:"曲阳路630弄3号2楼",  info:"<b>总支书记</b>: 张咏彪 65546452、13391147266<br><b>居委主任</b>: 谢  辉 65526006、13621820162"},
    {type:"1", lng:121.501367,lat:31.287566, title:"密一居委会", alias:"密一", tel:"65542664", addr:"赤峰路317弄11号2楼",  info:"<b>总支书记</b>: 孙  铭 65547286、15921198845<br><b>居委主任</b>: 施祖英 55884496、13916728278"},
    {type:"1", lng:121.499508,lat:31.286737, title:"密二居委会", alias:"密二", tel:"65554873", addr:"玉田支路16号2楼",  info:"<b>总支书记</b>: 高  敏 65549148、13795498042<br><b>居委主任</b>: 赵  伟 65549148、13764099790"},
    {type:"1", lng:121.499104,lat:31.287273, title:"密三居委会", alias:"密三", tel:"65527991", addr:"玉田支路33号2楼",  info:"<b>总支书记/居委主任</b>: 顾莉莉 65532880、13162673636", height:350},
   {type:"1", lng:121.501924,lat:31.29842, title:"运一居委会", alias:"运一", tel:"65529402", addr:"邯郸路47弄69号1楼",  info:"<b>总支书记</b>: 闻伟定 65558569、13611926167<br><b>居委主任</b>: 徐素金 65555061、13916500459", height:560, offset:OFFSET_DOWN},
   {type:"1", lng:121.499908,lat:31.295759, title:"运二居委会", alias:"运二", tel:"65546714", addr:"曲阳路838号－10",  info:"<b>总支副书记</b>: 熊晓燕、朱国华 熊:13917789300<br><b>居委主任</b>: 朱国华 65549278、18930132552", offset:OFFSET_DOWN},
   {type:"1", lng:121.502971,lat:31.295593, title:"运三居委会", alias:"运三", tel:"65540586", addr:"巴林路60弄50号",  info:"<b>总支书记</b>: 梁惠萍 65286994、13501666421<br><b>居委主任</b>: 沈  洁 13816062846", offset:OFFSET_DOWN},
   {type:"1", lng:121.492223,lat:31.290486, title:"上农一居委会", alias:"上农一", tel:"65315104", addr:"赤峰路626弄31号108室",  info:"<b>总支书记</b>: 张  蔚 65521360、13122045451<br><b>总支副书记</b>: 潘红珍", offset:OFFSET_DOWN3},
   {type:"1", lng:121.488791,lat:31.293441, title:"上农二居委会", alias:"上农二", tel:"65429407", addr:"新市路251弄5号102室",  info:"<b>总支书记/居委主任</b>: 付  红 55382602、18918550565 ",height:570},
   {type:"1", lng:121.504902,lat:31.294378, title:"林云居委会", alias:"林云", tel:"65544823", addr:"辉河路26号",  info:"<b>总支书记</b>: 丁  琳 65528478、13651807786<br><b>居委副主任</b>: 史培君 13918900023"},
   {type:"1", lng:121.503122,lat:31.29361, title:"巴林居委会", alias:"巴林", tel:"55884995", addr:"巴林路41弄14号",  info:"<b>总支书记</b>: 方国华 55885026、13023243100<br><b>居委主任</b>: 沈惠娟 65542331、18916196726",offset:OFFSET_DOWN},
   {type:"1", lng:121.492901,lat:31.288253, title:"鸿雁家委会", alias:"鸿雁", tel:"65830642", addr:"赤峰路600弄9号101室",  info:"<b>总支书记</b>: 冯  建 55887113、13162308880<br><b>居委主任</b>: 金今花 65611244、18917077812",offset:OFFSET_DOWN},
   {type:"1", lng:121.493905,lat:31.290398, title:"银联居委会", alias:"银联", tel:"65364462", addr:"东体育会路880弄10号102室",  info:"<b>总支书记</b>: 杨德新 65539362、13621652846<br><b>居委副主任</b>:佘华丽 13795270928"},
  //p1
   {type:"2",lng:121.488974,lat:31.281105, title:"上海外语教育出版社有限公司", alias:"外教出版",tel:"021-65425300-4064", addr:"大连西路558号", info:"<b>联系人</b>: 吴宏年",offset:OFFSET_LEFT4},
   {type:"2",lng:121.496944,lat:31.285556, title:"上海中星集团怡城实业有限公司", alias:"中星",tel:"50874105", addr:"曲阳路561号", info:"<b>联系人</b>: 刘瑾", offset:OFFSET_DOWN},
   {type:"2",lng:121.505089,lat:31.297278, title:"上海电力建筑工程公司", alias:"电力建筑",tel:"65543401", addr:"虹口区松花江路2600号", info:"<b>联系人</b>: 姜庆盛"},
   {type:"2",lng:121.497681,lat:31.296728, title:"上海华谊建设有限公司", alias:"华谊",tel:"54084637", addr:"曲阳路930号5幢8楼", info:"<b>联系人</b>: 金晓琳"},
   {type:"2",lng:121.501846,lat:31.29968, title:"上海材料研究所", alias:"材料研究所",tel:"65556775-202", addr:"邯郸路99号", info:"<b>联系人</b>: 王松",offset:OFFSET_DOWN5},
   {type:"2",lng:121.492101,lat:31.28673, title:"中国科学院上海技术物理研究所", alias:"上海物理所",tel:"65420850", addr:"玉田路500号", info:"<b>联系人</b>: 徐勇"},
   {type:"2",lng:121.497953,lat:31.292488, title:"上海金渤金属材料有限公司", alias:"金渤金属",tel:"55888065", addr:"曲阳路800号2911室", info:"<b>联系人</b>: 唐玉琴",offset:OFFSET_LEFT4},
   {type:"2",lng:121.503427,lat:31.299696, title:"上海财安金融服务股份有限公司", alias:"财安金融",tel:"51278968", addr:"邯郸路135号5号楼2楼", info:"<b>联系人</b>: 萧庆", offset:OFFSET_UP4},
   {type:"2",lng:121.493599,lat:31.295773, title:"中泰证券股份有限公司上海甘河路证券营业部", alias:"中泰证券",tel:"65604050", addr:"甘河路8号底2、3层", info:"<b>联系人</b>: 徐洁", offset:OFFSET_DOWN4},
 {type:"2",lng:121.505983,lat:31.299593, title:"上海申源集体资产经营中心", alias:"申源",tel:"25650047", addr:"邯郸路171号", info:"<b>联系人</b>: 刘璐"},
   {type:"2",lng:121.504614,lat:31.300249, title:"机械工业第四设计研究院上海设计院", alias:"机械四计院",tel:"65524610-212", addr:"邯郸路159号17A室", info:"<b>联系人</b>: 邓可", offset:OFFSET_UP5},
   {type:"2",lng:121.497486,lat:31.296801, title:"上海诚友实业集团有限公司", alias:"诚友",tel:"55896020", addr:"曲阳路930号4幢451室", info:"<b>联系人</b>: 朱浩",offset:OFFSET_LEFT},
   {type:"2",lng:121.503456,lat:31.290864, title:"上海中油大庆石油化工销售公司", alias:"中油大庆",tel:"65559033", addr:"中山北二路1515号D座3505室", info:"<b>联系人</b>: 闫晓芹"},
   {type:"2",lng:121.50282,lat:31.291769, title:"华龙证券股份有限公司上海中山北二路证券营业部", alias:"华龙证券",tel:"65525264", addr:"中山北二路1558号", info:"<b>联系人</b>: 尹朝民"},
   {type:"2",lng:121.488606,lat:31.29196, title:"上海顺朝企业发展集团有限公司", alias:"顺朝",tel:"55391988", addr:"广灵四路24号甲12楼", info:"<b>联系人</b>: 王神甫"},
   {type:"2",lng:121.495038,lat:31.296276, title:"宏源证券股份有限公司上海中山北一路证券营业部", alias:"宏源证券",tel:"65448120", addr:"中山北一路1230号柏树大厦B区3F", info:"<b>联系人</b>: 陈文军", offset:OFFSET_DOWN4},
   {type:"2",lng:121.498778,lat:31.292379, title:"上海商务中心股份有限公司", alias:"商务中心",tel:"65538682", addr:"曲阳路800号40楼10室", info:"<b>联系人</b>: 吴琳", offset:OFFSET_DOWN4},
   {type:"2",lng:121.488562,lat:31.280442, title:"中国银河证券股份有限公司上海大连西路证券营业部", alias:"银河证券",tel:"61480788", addr:"大连西路555-557号", info:"<b>联系人</b>: 李军"},
 {type:"2",lng:121.505018,lat:31.295856, title:"上海威诚邦达检测技术有限公司", alias:"威诚",tel:"65608928", addr:"辉河路102号", info:"<b>联系人</b>: 朱浩",offset:OFFSET_LEFT},
   {type:"2",lng:121.504098,lat:31.297853, title:"上海爱用宝电子商务有限公司", alias:"爱用宝",tel:"60443546", addr:"松花江路2601号6幢103室", info:"<b>联系人</b>: 汪丽", offset:OFFSET_DOWN3},
   {type:"2",lng:121.498412,lat:31.29572, title:"牛津（上海）咨询有限公司", alias:"牛津咨询",tel:"55893008", addr:"曲阳路900弄3号621、622室", info:"<b>联系人</b>: 潭勇", offset:OFFSET_DOWN4},
   {type:"2",lng:121.502809,lat:31.298326, title:"上海维信荟智金融科技有限公司", alias:"维信荟",tel:"61139006", addr:"松花江路2601号1幢A区207室", info:"<b>联系人</b>: 王沁",offset:OFFSET_DOWN3},
   {type:"2",lng:121.504059,lat:31.299574, title:"上海储融检测技术股份有限公司", alias:"储融",tel:"36366937", addr:"邯郸路135号2幢301室", info:"<b>联系人</b>: 唐然", offset:OFFSET_DOWN},
  {type:"2",lng:121.494086,lat:31.289286, title:"上海四海建设工程造价咨询监理有限公司", alias:"四海建设",tel:"65759707", addr:"东体育会路816号A座605室", info:"<b>联系人</b>: 朱惠莉"},
     {type:"2",lng:121.500876,lat:31.29236, title:"上海峥锦实业有限公司", alias:"峥锦",tel:"65968957", addr:"中山北二路1800号7幢8楼805室", info:"<b>联系人</b>: 黄国政", offset:OFFSET_DOWN},
  //p2
	   {type:"2",lng:121.503967,lat:31.29984, title:"上海圣康达实业有限公司", alias:"圣康达",tel:"55572265", addr:"邯郸路135号2幢510室", info:"<b>联系人</b>: 郭纯洁", offset:OFFSET_DOWN3},
  {type:"2",lng:121.494053,lat:31.296058, title:"上海老板电器销售有限公司", alias:"老板电器",tel:"65164764", addr:"中山北一路1200号3楼一楼", info:"<b>联系人</b>: 王昱婷"},
   {type:"2",lng:121.506089,lat:31.296279, title:"上海天夏景观规划设计有限公司", alias:"天夏景观",tel:"65988789-8512", addr:"松花江路2539号1号楼10层", info:"<b>联系人</b>: 周薇"},
   {type:"2",lng:121.505559,lat:31.300429, title:"华东电力试验研究院有限公司", alias:"电力研究院",tel:"25650000", addr:"邯郸路171号", info:"<b>联系人</b>: 王晓村", offset:OFFSET_DOWN5},
    {type:"2",lng:121.49635,lat:31.294302, title:"上海申威资产评估有限公司", alias:"申威",tel:"31273006", addr:"东体育会路860号2号楼202室", info:"<b>联系人</b>: 陈一菁" ,offset:OFFSET_DOWN},
    {type:"2",lng:121.502007,lat:31.300262, title:"上海众鑫建筑设计研究院有限公司", alias:"众鑫",tel:"65605305", addr:"邯郸路98号乙3楼", info:"<b>联系人</b>: 倪伊丽" ,offset:OFFSET_DOWN},
 {type:"2",lng:121.501191,lat:31.292105, title:"上海公惠置业有限公司", alias:"公惠",tel:"55898611", addr:"中山北二路1800号7栋1418室", info:"<b>联系人</b>: 戴馨", offset:OFFSET_DOWN},
{type:"2",lng:121.498162,lat:31.292474, title:"美钻石油钻采系统（上海）有限公司", alias:"美钻石油",tel:"65538126", addr:"曲阳路800号407室", info:"<b>联系人</b>: 毛冠煜",offset:OFFSET_LEFT4},
{type:"2",lng:121.499711,lat:31.29326, title:"上海和平眼科医院有限公司", alias:"和平眼科",tel:"55890118", addr:"伊敏河路61号", info:"<b>联系人</b>: 庄小佩"},
 {type:"2",lng:121.498311,lat:31.295955, title:"浙商控股集团有限公司上海分公司", alias:"浙商控股",tel:"35093963", addr:"曲阳路910号507室", info:"<b>联系人</b>: 仲敏", offset:OFFSET_DOWN4},
 {type:"2",lng:121.490292,lat:31.287847, title:"上海外语教育咨询服务中心", alias:"外教咨询",tel:"35050345", addr:"赤峰路550号上外宾馆204室", info:"<b>联系人</b>: 蔡伟良"},
{type:"2",lng:121.498597,lat:31.290922, title:"上海侨建房地产有限公司", alias:"侨建",tel:"65548400", addr:"中山北二路1705号801室", info:"<b>联系人</b>: 刘瑛", offset:OFFSET_DOWN},
{type:"2",lng:121.505052,lat:31.295805, title:"新美达探伤器材有限公司", alias:"新美达",tel:"55896020", addr:"辉河路100号", info:"<b>联系人</b>: 朱浩",offset:OFFSET_LEFT3},
 {type:"2",lng:121.497042,lat:31.294295, title:"上海柏阳君亭酒店管理有限公司", alias:"柏阳君亭",tel:"60672666", addr:"曲阳路777-779号7、9-19层", info:"<b>联系人</b>: 朱佳芬"},
 {type:"2",lng:121.507345,lat:31.299381, title:"上海欣国泰信息通信有限公司", alias:"欣国泰",tel:"20599199", addr:"邯郸路173号3号楼", info:"<b>联系人</b>: 屠静云"},
 {type:"2",lng:121.48861,lat:31.291956, title:"上海资申实业有限公司", alias:"资申实业",tel:"35051018", addr:"广灵四路24号401室", info:"<b>联系人</b>: 张茜", offset:OFFSET_DOWN4},
 {type:"2",lng:121.493205,lat:31.295394, title:"新兴铸管股分有限公司上海销售分公司", alias:"新兴铸管",tel:"65360417", addr:"中山北一路1108号2楼", info:"<b>联系人</b>: 敖永新"},
{type:"2",lng:121.493205,lat:31.295394, title:"上海上外印务中心", alias:"上外印",tel:"35372945", addr:"大连西路550号", info:"<b>联系人</b>: 王未"},
  {type:"2",lng:121.498651,lat:31.292217, title:"上海振羽商贸有限公司", alias:"振羽商贸",tel:"63570009", addr:"曲阳路800号2号楼2330室", info:"<b>联系人</b>: 范勇华", offset:OFFSET_DOWN4},
  {type:"2",lng:121.499132,lat:31.286064, title:"上海外国语大学贤达经济人文学院", alias:"贤达文院",tel:"51278000", addr:"东体育会路402号", info:"<b>联系人</b>: 陆朴鸣"},
 {type:"2",lng:121.49643,lat:31.297291, title:"上海黄记煌实业发展有限公司", alias:"黄记煌",tel:"55136294", addr:"中山北一路1250号3号楼707室", info:"<b>联系人</b>: 漆思荣", offset:OFFSET_DOWN3},
    {type:"2",lng:121.493691,lat:31.289318, title:"上海瑶华文化传播中心（有限合伙）", alias:"瑶华",tel:"61730722", addr:"东体育会路816号A座8楼", info:"<b>联系人</b>: 江音"},
    {type:"2",lng:121.504539,lat:31.297893, title:"美奥正畸（上海）贸易有限公司", alias:"美奥正畸",tel:"66525323", addr:"虹口区松花江路2601号6幢203室", info:"<b>联系人</b>: 顾正安",offset:OFFSET_LEFT4},
    {type:"2",lng:121.494857,lat:31.296827, title:"上海都赛商务咨询有限公司", alias:"都赛商务",tel:"55800300", addr:"中山北一路1230号A609室", info:"<b>联系人</b>: 高强",offset:OFFSET_LEFT4},
	   {type:"2",lng:121.505921,lat:31.29844, title:"上海豪锦通信科技有限公司", alias:"豪锦通信",tel:"65372340", addr:"邯郸路173号9号单体2层206单元", info:"<b>联系人</b>: 孙伟萍"},
//p3121.493729,31.295863
     {type:"2",lng:121.498543,lat:31.292545, title:"泰科拉软件（上海）有限公司", alias:"泰科拉",tel:"65549695", addr:"曲阳路800号1203室", info:"<b>联系人</b>: 陈燕"},
  {type:"2",lng:121.493729,lat:31.295863, title:"上海乐之语通讯设备有限公司", alias:"乐之语",tel:"69096369", addr:"中山北一路1200号4幢2号楼第六层", info:"<b>联系人</b>: 陈兴明", offset:OFFSET_DOWN3},
   {type:"2",lng:121.496845,lat:31.286167, title:"上海市保安服务总公司虹口区公司", alias:"市保服务",tel:"65455098", addr:"曲阳路563号", info:"<b>联系人</b>: 康淑贞"},
{type:"2",lng:121.50118,lat:31.294200, title:"中国建筑西北设计研究院有限公司上海分公司", alias:"西北设计院",tel:"55882989-128", addr:"巴林路60弄1号", info:"<b>联系人</b>: 李占军"},
{type:"2",lng:121.496844,lat:31.297129, title:"杭州钢铁厂上海物资经销公司", alias:"杭钢厂",tel:"65425985", addr:"中山北一路1250号3号楼1108室", info:"<b>联系人</b>: 朱晓光"},
{type:"2",lng:121.50418,lat:31.298063, title:"上海绩优机电股份有限公司", alias:"绩优机电",tel:"61396166", addr:"虹口区松花江路2601号A区506室", info:"<b>联系人</b>: 纪兰", offset:OFFSET_DOWN4},
 {type:"2",lng:121.504528,lat:31.300157, title:"上海新凯润润滑油技术有限公司", alias:"新凯润",tel:"65552991", addr:"邯郸路159号8楼F座", info:"<b>联系人</b>: 金宝成"},
  {type:"2",lng:121.505188,lat:31.298402, title:"上海工商印刷厂", alias:"工商印刷",tel:"66081975", addr:"邯郸路173号9幢", info:"<b>联系人</b>: 徐洪"},
  {type:"2",lng:121.504524,lat:31.300153, title:"上海四院汽车工程技术有限公司", alias:"四院汽车",tel:"55887533", addr:"邯郸路159号17A西北区", info:"<b>联系人</b>: 邓可"},
   {type:"2",lng:121.506353,lat:31.299726, title:"上海电力建设修造厂", alias:"电力建修",tel:"65550565", addr:"邯郸路173号", info:"<b>联系人</b>: 王凌云", offset:OFFSET_DOWN4},
   {type:"2",lng:121.501307,lat:31.294800, title:"上海大柏树物业有限公司", alias:"大柏树物业",tel:"65530505", addr:"巴林路60弄30号", info:"<b>联系人</b>: 杨小娟"},
    {type:"2",lng:121.490798,lat:31.290479, title:"上海建工医院", alias:"建工医院",tel:"65161277", addr:"中山北二路2199号", info:"<b>联系人</b>: 黄彩萍"},
  {type:"2",lng:121.490384,lat:31.287813, title:"上海上外国际教育交流信息中心", alias:"外教交流",tel:"62176831", addr:"赤峰路555号", info:"<b>联系人</b>: 何晓礴"},
    {type:"2",lng:121.503428,lat:31.290772, title:"上海樱达电器有限公司", alias:"樱达电器",tel:"65548312-802", addr:"中山北二路1515号D座8005室", info:"<b>联系人</b>: 曾湘梁"},
     {type:"2",lng:121.506155,lat:31.295863, title:"上海复旦科技园进修学院", alias:"复旦进修",tel:"65103318", addr:"松花江路2539号1号楼14、15层", info:"<b>联系人</b>: 金源", offset:OFFSET_DOWN4},
     {type:"2",lng:121.494822,lat:31.29618, title:"上海兰生文体进出口有限公司", alias:"兰生文体",tel:"65444588-3573", addr:"中山北一路1230号1107室", info:"<b>联系人</b>: 王蓓"},
      {type:"2",lng:121.503033,lat:31.299877, title:"上海颐和圣康基因健康科技有限公司", alias:"颐和圣康",tel:"55573372", addr:"邯郸路135号1幢", info:"<b>联系人</b>: 刘伟", offset:OFFSET_DOWN4},
    {type:"2",lng:121.501668,lat:31.290699, title:"上海大庆石油实业发展公司", alias:"大庆石油",tel:"65548436", addr:"中山北二路1515号", info:"<b>联系人</b>: 王立军", offset:OFFSET_DOWN4},
    {type:"2",lng:121.498805,lat:31.291935, title:"上海商务中心物业管理有限公司", alias:"商务物业",tel:"55886211", addr:"曲阳路800号28014室", info:"<b>联系人</b>: 陈先敏", offset:OFFSET_DOWN4},
    {type:"2",lng:121.492442,lat:31.286213, title:"上海航遥信息技术有限公司", alias:"航遥信息",tel:"65311974", addr:"玉田路500号1号楼207室", info:"<b>联系人</b>: 葛渭卿"},
{type:"2",lng:121.488754,lat:31.288272, title:"上海莫泰中山北一路酒店有限公司", alias:"莫泰",tel:"51577333", addr:"中山北一路435号", info:"<b>联系人</b>: 许俊"},
 {type:"2",lng:121.497778,lat:31.295011, title:"上海神源国际物流有限公司", alias:"神源物流",tel:"65544396", addr:"曲阳路898号707室", info:"<b>联系人</b>: 刘立文"},
 {type:"2",lng:121.488124,lat:31.291917, title:"上海乐松商贸有限公司", alias:"乐松商贸",tel:"34182265", addr:"广灵四路52号底层", info:"<b>联系人</b>: 周建萍"},
 {type:"2",lng:121.496736,lat:31.294674, title:"上海虹口大柏树房地产市场经营管理有限公司", alias:"大柏树地产",tel:"65607217", addr:"东体育会路1130号502室", info:"<b>联系人</b>: 沈月琴", offset:OFFSET_DOWN5},
 {type:"2",lng:121.498807,lat:31.29568, title:"上海汇舶展览有限公司", alias:"汇舶展览",tel:"61400107", addr:"曲阳路900弄3号617室", info:"<b>联系人</b>: 邹楚君"},
 //p4
{type:"2",lng:121.503033,lat:31.299877, title:"上海市理诚律师事务所", alias:"理诚律所",tel:"63937886", addr:"中山北一路1230号1808室", info:"<b>联系人</b>: 李慈玲", offset:OFFSET_DOWN4},
 {type:"2",lng:121.497961,lat:31.28632, title:"上海市虹口区曲阳文化馆", alias:"曲阳文化馆",tel:"65533134", addr:"曲阳路570号", info:"<b>联系人</b>: 米达"},
{type:"2",lng:121.49867,lat:31.283882, title:"上海大众东颖电力工程有限公司", alias:"大众东颖",tel:"65543577", addr:"玉田新村111号", info:"<b>联系人</b>: 周勇"},
 {type:"2",lng:121.494665,lat:31.29633, title:"湘江沪鑫律师事务所上海分所", alias:"沪鑫律所",tel:"65448610", addr:"中山北一路1230号A区2308室", info:"<b>联系人</b>: 钟棋芳"},
 {type:"2",lng:121.493632,lat:31.289437, title:"锐核软件（上海）有限公司", alias:"锐核软件",tel:"60731951", addr:"东体育会路860号5号楼四楼", info:"<b>联系人</b>: 凌生勇"},
   {type:"2",lng:121.497042,lat:31.294295, title:"上海虞悦餐饮管理有限公司", alias:"虞悦餐饮",tel:"65675257", addr:"曲阳路779号第二、三、四层", info:"<b>联系人</b>: 胡光英"},
   {type:"2",lng:121.488457,lat:31.291975, title:"中铁四局集团有限公司上海分公司", alias:"中铁四局",tel:"65169572", addr:"广灵四路24号甲901室", info:"<b>联系人</b>: 吴建军", offset:OFFSET_DOWN4},
   {type:"2",lng:121.503145,lat:31.29059, title:"上海沪闽经济发展有限公司", alias:"沪闽经发",tel:"65534488-820", addr:"中山北二路1515号D座8008室", info:"<b>联系人</b>: 金帼雄"},
  {type:"2",lng:121.489059,lat:31.292191, title:"上海嘉众物业管理有限公司", alias:"嘉众物业",tel:"55393405", addr:"广灵四路24号甲105室", info:"<b>联系人</b>: 魏蓓蕾"},
  {type:"2",lng:121.506132,lat:31.300476, title:"华东电力试验研究院科技开发有限公司", alias:"华东电研",tel:"25102201", addr:"邯郸路171号", info:"<b>联系人</b>: 张勤美", offset:OFFSET_DOWN4},
  {type:"2",lng:121.495219,lat:31.291969, title:"西本新干线股份有限公司", alias:"西本新干线",tel:"65161686-637", addr:"东体育会路990号201室", info:"<b>联系人</b>: 余华"},
 {type:"2",lng:121.495642,lat:31.297109, title:"南通长城建筑安装工程有限公司上海第一分公司", alias:"南通长建",tel:"65424703", addr:"中山北一路1250号1楼202室", info:"<b>联系人</b>: 汪利民",offset:OFFSET_LEFT4},
 {type:"2",lng:121.498503,lat:31.292228, title:"上海卡斯特机械制造有限公司", alias:"卡斯特",tel:"55540708", addr:"曲阳路800号2306室", info:"<b>联系人</b>: 周鸣华"},
 {type:"2",lng:121.497036,lat:31.295226, title:"上海茶叶进出口公司第三茶厂", alias:"三茶厂",tel:"65420098", addr:"东体育会路1188号5楼", info:"<b>联系人</b>: 陈金尧",offset:OFFSET_LEFT3},
 {type:"2",lng:121.499062,lat:31.295801, title:"科霓卡贸易（上海）有限公司", alias:"科霓卡",tel:"60959353", addr:"曲阳路900弄3号216室", info:"<b>联系人</b>: 杨莉", offset:OFFSET_DOWN3},
 {type:"2",lng:121.493888,lat:31.295813, title:"上海市远东律师事务所", alias:"远东律所",tel:"65604015-805", addr:"甘河路8号17A", info:"<b>联系人</b>: 吴红梅", offset:OFFSET_DOWN4},
 {type:"2",lng:121.497571,lat:31.298316, title:"上海新世纪酒店发展有限公司", alias:"新世纪",tel:"55888000", addr:"曲阳路1000号520", info:"<b>联系人</b>: 李玲", offset:OFFSET_DOWN3},
 {type:"2",lng:121.505557,lat:31.295964, title:"天域生态园林股份有限公司上海分公司", alias:"天域生态",tel:"65988789", addr:"辉河路100号1幢808室", info:"<b>联系人</b>: 周薇",offset:OFFSET_LEFT4},
 {type:"2",lng:121.48946,lat:31.290388, title:"上海炎德医疗器械有限公司", alias:"炎德医疗",tel:"65053789", addr:"中山北一路705号717室", info:"<b>联系人</b>: 余放", offset:OFFSET_DOWN4},
 {type:"2",lng:121.493156,lat:31.287871, title:"上海东宸房地产开发有限公司", alias:"东宸",tel:"65557538", addr:"赤峰路445号8527室", info:"<b>联系人</b>: 孙丽英", offset:OFFSET_DOWN},
 {type:"2",lng:121.492244,lat:31.285907, title:"上海德虹科学器材有限责任公司", alias:"德虹",tel:"25051000-1709", addr:"玉田路500号", info:"<b>联系人</b>: 龚海琼", offset:OFFSET_DOWN},
 {type:"2",lng:121.489405,lat:31.290791, title:"上海市天一律师事务所", alias:"天一律所",tel:"35350691", addr:"中山北一路705号416室", info:"<b>联系人</b>: 田兆丰"},
 {type:"2",lng:121.505431,lat:31.29849, title:"上海宜居酒店管理有限公司", alias:"宜居酒店管理",tel:"61434888", addr:"松花江路2628号", info:"<b>联系人</b>: 黄云鹏"},
 {type:"2",lng:121.495487,lat:31.292721, title:"上海松立工贸有限公司", alias:"松立工贸",tel:"65601973", addr:"东体育会路990号1201室", info:"<b>联系人</b>: 周伟东"},
 {type:"2",lng:121.497909,lat:31.296183, title:"上海嘉禾盛国际商贸有限公司", alias:"嘉禾盛",tel:"35350818", addr:"曲阳路910号502室", info:"<b>联系人</b>: 刘江",offset:OFFSET_UP3},
 //p5
  {type:"2",lng:121.496971,lat:31.295126, title:"上海瑞翡贸易有限公司", alias:"瑞翡贸易",tel:"35317080", addr:"东体育会路1188号608室", info:"<b>联系人</b>: 单娟", offset:OFFSET_DOWN4},
  {type:"2",lng:121.502493,lat:31.29086, title:"上海大庆石油大厦", alias:"庆油大厦",tel:"65559191", addr:"中山北二路1515号", info:"<b>联系人</b>: 尤斌", offset:OFFSET_DOWN4},
  {type:"2",lng:121.505174,lat:31.298211, title:"上海旭捷实业投资有限公司", alias:"旭捷",tel:"65554779", addr:"松花江路2628号", info:"<b>联系人</b>: 蔡雪清"},
 {type:"2",lng:121.495007,lat:31.292215, title:"西本新干线电子商务有限公司上海分公司", alias:"西本电商",tel:"65161686-645", addr:"东体育会路990号302-D室", info:"<b>联系人</b>: 王峰", offset:OFFSET_DOWN4},
 {type:"2",lng:121.496408,lat:31.28055, title:"上海新虹房产经营开发有限公司", alias:"新虹房产",tel:"65218061", addr:"曲阳路487弄10号", info:"<b>联系人</b>: 汤程奇"},
 {type:"2",lng:121.49568,lat:31.292736, title:"上海国慧贸易有限公司", alias:"国慧贸易",tel:"33812667", addr:"东体育会路990号302A室", info:"<b>联系人</b>: 丁紫娟"},
 {type:"2",lng:121.496566,lat:31.296635, title:"上海信本钢铁贸易发展有限公司", alias:"信本钢贸",tel:"55886019", addr:"曲阳路851弄7号201室", info:"<b>联系人</b>: 戴丽红"},
 {type:"2",lng:121.498827,lat:31.290948, title:"上海拉菲餐饮管理有限公司", alias:"拉菲餐饮",tel:"65527979", addr:"中山北二路1705号5层", info:"<b>联系人</b>: 缪丹燕", offset:OFFSET_DOWN3},
 {type:"2",lng:121.503237,lat:31.281247, title:"上海三角地超市公司", alias:"三角地",tel:"56630012", addr:"密云路290号", info:"<b>联系人</b>: 孟文婷"},
 {type:"2",lng:121.504253,lat:31.299985, title:"上海允晟医学检验所有限公司", alias:"允晟医检",tel:"62531800*632", addr:"邯郸路173号3号楼101室", info:"<b>联系人</b>: 高洁", offset:OFFSET_DOWN4},
 {type:"2",lng:121.494129,lat:31.295981, title:"上海英力特劳务派遣有限公司", alias:"英力特",tel:"65607481", addr:"中山北一路1200号1号楼409室", info:"<b>联系人</b>: 邓丽绒"},
 {type:"2",lng:121.490443,lat:31.287065, title:"上海德凯仪器有限公司", alias:"德凯仪器",tel:"65253535", addr:"中山北一路420号", info:"<b>联系人</b>: 施学成"},
 {type:"2",lng:121.498252,lat:31.285198, title:"上海曲阳生活购物中心有限公司", alias:"曲阳购物中心",tel:"65448989", addr:"曲阳路566号601、602室", info:"<b>联系人</b>: 史慧芬"},
 {type:"2",lng:121.50463,lat:31.300287, title:"新开普电子股份有限公司上海分公司", alias:"新开普",tel:"65535358", addr:"邯郸路159号16D室", info:"<b>联系人</b>: 李梁尉"},
 {type:"2",lng:121.498867,lat:31.296021, title:"上海顺顺投资发展有限公司", alias:"顺顺投",tel:"65850126", addr:"曲阳路900弄3号711室", info:"<b>联系人</b>: 张英", offset:OFFSET_DOWN3},
 {type:"2",lng:121.498377,lat:31.292253, title:"东方创业投资管理有限公司", alias:"东方创投",tel:"13661793792", addr:"曲阳路800号902室", info:"<b>联系人</b>: 王淑华", offset:OFFSET_DOWN4},

// unit
	{type:"3",lng:121.506348,lat:31.300483, title:"优族园区", alias:"优族园区", tel:"(021)65558177", addr:"邯郸路173号(近松花江路)", info:"<b>名称</b>:优族园区", offset:OFFSET_DOWN4},
	{type:"3",lng:121.501219,lat:31.299457, title:"上海市南湖职业学校第二分校", alias:"南湖职校二", tel:"021-65556195", addr:"邯郸路53号", info:"<b>名称</b>:上海市南湖职业学校第二分校", offset:OFFSET_DOWN5},
	{type:"3",lng:121.496193,lat:31.297177, title:"沪办大厦", alias:"沪办大厦", tel:"(021)65425141", addr:"中山北一路1250号", info:"<b>名称</b>:沪办大厦", offset:OFFSET_DOWN4},
	{type:"3",lng:121.493785,lat:31.296846, title:"中国石化加油站", alias:"中石化", tel:"", addr:"上海市虹口区中山北一路1123号(近汶水东路)", info:"<b>名称</b>:中国石化加油站", offset:OFFSET_UP3},
	{type:"3",lng:121.493107,lat:31.29619, title:"上海医药工业研究院", alias:"医工院", tel:"", addr:"上海市虹口区中山北一路1111号", info:"<b>名称</b>:上海医药工业研究院", offset:OFFSET_DOWN3},
 	{type:"3",lng:121.494985,lat:31.296074, title:"柏树大厦", alias:"柏树大厦", tel:"(021)65445598", addr:"上海虹口区中山北一路1230号", info:"<b>名称</b>:柏树大厦", offset:OFFSET_DOWN3},
	{type:"3",lng:121.494652,lat:31.294774, title:"岳阳医院", alias:"岳阳医院", tel:"(021)65161782", addr:"上海市虹口区甘河路110号", info:"<b>名称</b>:上海中医药大学附属岳阳中西医结合医院", offset:OFFSET_DOWN3},
	{type:"3",lng:121.49023,lat:31.292615, title:"上海市公安局刑侦/经侦总队", alias:"市刑侦经侦总队", tel:"110", addr:"中山北一路805号", info:"<b>名称</b>:上海市公安局刑侦/经侦总队", offset:OFFSET_DOWN5},
	{type:"3",lng:121.492152,lat:31.294304, title:"北区文化中兴", alias:"北区文化中兴", tel:"", addr:"中山北一路998号", info:"<b>名称</b>:北区文化中兴", offset:OFFSET_DOWN5},
{type:"3",lng:121.496931,lat:31.293872, title:"新疆沪办", alias:"新疆沪办", tel:"(021)65532387", addr:"曲阳路775号9层", info:"<b>名称</b>:新疆维吾尔自治区政府驻上海办事处", offset:OFFSET_DOWN4},
{type:"3",lng:121.49782,lat:31.297035, title:"930创业园区", alias:"930创业园",tel:"", addr:"曲阳路930号（近腾克路）", info:"<b>名称</b>: 930创业园区"},
{type:"3",lng:121.49888,lat:31.295577, title:"复城国际", alias:"复城国际",tel:"", addr:"伊敏河路99弄", info:"<b>名称</b>:复城国际"},
{type:"3",lng:121.50052,lat:31.294694, title:"曲阳路街道社区事务受理服务中心", alias:"街道办事处",tel:"", addr:"伊敏河路88号", info:"<b>名称</b>:曲阳路街道社区事务受理服务中心", offset:OFFSET_LEFT5},
{type:"3",lng:121.501095,lat:31.29393, title:"曲阳路街道社区卫生服务中心", alias:"卫生中心",tel:"", addr:"上海市虹口区巴林路78号", info:"<b>名称</b>:曲阳路街道社区卫生服务中心", offset:OFFSET_LEFT5},
{type:"3",lng:121.503067,lat:31.293966, title:"上海市公安局虹口分局曲阳路派出所", alias:"曲阳派出所",tel:"(021)65552848", addr:"巴林路56号", info:"<b>名称</b>:上海市公安局虹口分局曲阳路派出所"},
{type:"3",lng:121.504454,lat:31.295384, title:"上海市虹口实验学校", alias:"实验学校",tel:"(021)55880345", addr:"运光路（近辉河路）", info:"<b>名称</b>:上海市虹口实验学校", offset:OFFSET_LEFT4},
{type:"3",lng:121.501463,lat:31.294678, title:"曲阳路街道敬老院", alias:"敬老院",tel:"(021)55880345", addr:"上海市虹口区巴林路60弄28号", info:"<b>名称</b>:曲阳路街道敬老院"},
{type:"3",lng:121.504593,lat:31.29474, title:"曲阳社区市民服务驿站", alias:"服务驿站",tel:"(021)65543061", addr:"辉河路51", info:"<b>名称</b>:曲阳社区市民服务驿站"},
{type:"3",lng:121.507823,lat:31.294506, title:"上海市虹口区社会福利院", alias:"福利院",tel:"021-65546977", addr:"密云路623号", info:"<b>名称</b>:上海市虹口区社会福利院", offset:OFFSET_DOWN3},
{type:"3",lng:121.506891,lat:31.29651, title:"复旦大学学生生活园区", alias:"复旦宿舍",tel:"", addr:"松花江路2500弄", info:"<b>名称</b>:复旦大学学生生活园区"},
{type:"3",lng:121.490503,lat:31.290131, title:"上海建工医院", alias:"建工医院",tel:"65366688", addr:"松花江路2500弄", info:"<b>名称</b>:上海建工医院"},
{type:"3",lng:121.495814,lat:31.289657, title:"虹口区第四中心小学", alias:"虹口四中小",tel:"65547734", addr:"东体育会路667号", info:"<b>名称</b>:虹口区第四中心小学", offset:OFFSET_LEFT5},
{type:"3",lng:121.4954,lat:31.290691, title:"虹口体育馆", alias:"虹口体育馆",tel:"65532388", addr:"东体育会路715号", info:"<b>名称</b>:虹口体育馆"},
{type:"3",lng:121.503197,lat:31.29056, title:"上海市南湖职校二分校新泸校区", alias:"南湖职校二(分部)",tel:"", addr:"上海市虹口区密云路479号-甲-1", info:"<b>名称</b>:上海市南湖职校二分校新泸校区"	},
{type:"3",lng:121.502203,lat:31.28866, title:"曲阳第四小学", alias:"曲阳四小",tel:"55540123", addr:"密云路471弄1号", info:"<b>名称</b>:曲阳第四小学", offset:OFFSET_DOWN4	},
{type:"3",lng:121.496583,lat:31.287869, title:"民办宏星小学", alias:"宏星小学",tel:"65522046", addr:"虹口区赤峰路375号(近曲阳路)", info:"<b>名称</b>:民办宏星小学", offset:OFFSET_LEFT4	},
{type:"3",lng:121.48978,lat:31.285774, title:"曲阳污水处理厂", alias:"污水处理厂",tel:"", addr:"上海虹口区", info:"<b>名称</b>:曲阳污水处理厂", offset:OFFSET_DOWN5	},
{type:"3",lng:121.493095,lat:31.284449, title:"民办新北郊初级中学", alias:"新北郊初中",tel:"65542623", addr:"大连西路270弄25号", info:"<b>名称</b>:民办新北郊初级中学"},
{type:"3",lng:121.489321,lat:31.280863, title:"上海外国语大学", alias:"上外",tel:"35372000", addr:"广中路区域大连西路550号", info:"<b>名称</b>:上海外国语大学"},
{type:"3",lng:121.490789,lat:31.28281, title:"虹口区房管局", alias:"虹口房管局",tel:"65533550", addr:"东体育会路359号", info:"<b>名称</b>:虹口区房管局"},
{type:"3",lng:121.489399,lat:31.284316, title:"上海外国语大学分部", alias:"上外分部",tel:"35372000", addr:"广中路区域大连西路550号", info:"<b>名称</b>:上海外国语大学分部"},
{type:"3",lng:121.492355,lat:31.282183, title:"上海市虹口区市场监督管理局", alias:"市场监管局",tel:"", addr:"上海市虹口区大连西路296号", info:"<b>名称</b>:上海市虹口区市场监督管理局", offset:OFFSET_DOWN5},
{type:"3",lng:121.492835,lat:31.283542, title:"上海外国语大学学生公寓", alias:"上外学生公寓",tel:"", addr:"东体育会路411", info:"<b>名称</b>:上海外国语大学学生公寓"},
{type:"3",lng:121.495084,lat:31.282492, title:"阳光之家", alias:"阳光之家",tel:"", addr:"上海市虹口区", info:"<b>名称</b>:阳光之家", offset:OFFSET_DOWN4},
{type:"3",lng:121.497601,lat:31.284767, title:"曲阳医院", alias:"曲阳医院",tel:"65558555", addr:"上海市虹口区玉田路333号", info:"<b>名称</b>:曲阳医院", offset:OFFSET_DOWN4},
{type:"3",lng:121.497928,lat:31.285276, title:"家乐福(曲阳店)", alias:"家乐福",tel:"55896078", addr:"上海市虹口区曲阳路560号曲阳生活购物中心1-2层", info:"<b>名称</b>:家乐福(曲阳店)"},
 {type:"3",lng:121.498411,lat:31.286258, title:"上海市虹口区曲阳图书馆", alias:"曲阳图书馆",tel:"65533134", addr:"曲阳路574号", info:"<b>名称</b>: 上海市虹口区曲阳图书馆"},
{type:"3",lng:121.501543,lat:31.286124, title:"虹口区曲阳第三小学", alias:"曲阳三小",tel:"13917074798", addr:"赤峰路317弄17号", info:"<b>名称</b>: 虹口区曲阳第三小学"},
{type:"3",lng:121.500876,lat:31.285321, title:"曲阳市场监督管理所", alias:"曲阳监管所",tel:"51851401", addr:"上海市虹口区玉田路252号", info:"<b>名称</b>: 上海市虹口区市场监督管理局曲阳市场监督管理所", offset:OFFSET_DOWN5},
{type:"3",lng:121.502075,lat:31.284881, title:"曲阳第二中学", alias:"曲阳二中",tel:"65526354", addr:"虹口区玉田路180号", info:"<b>名称</b>: 曲阳第二中学"},
{type:"3",lng:121.500256,lat:31.283986, title:"上海市迅行中学", alias:"迅行中学",tel:"65558282", addr:"上海市虹口区玉田路248号", info:"<b>名称</b>: 上海市迅行中学(玉田路)", offset:OFFSET_DOWN4},
{type:"3",lng:121.501416,lat:31.282235, title:"曲阳社区文体广场", alias:"曲阳文体广场",tel:"64391731", addr:"曲阳路", info:"<b>名称</b>: 曲阳社区文体广场运动场", offset:OFFSET_DOWN5},
{type:"3",lng:121.500643,lat:31.292086, title:"科技中心(海鸥大厦)", alias:"科技中心(海鸥大厦)",tel:"", addr:"上海虹口区中山北二路1800号", info:"<b>名称</b>: 科技中心(海鸥大厦)"},
{type:"3",lng:121.506741,lat:31.295377, title:"四中心民办实验小学", alias:"四中心民办小学",tel:"", addr:"辉河路40", info:"<b>名称</b>: 四中心民办实验小学"},
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
new BMap.Point(121.50322,31.281924),
new BMap.Point(121.502627,31.288952),
new BMap.Point(121.503795,31.291035),
new BMap.Point(121.508897,31.294923),
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
{label:"路", pos: new BMap.Point(121.502316,31.29650), max_level:16 },

{label:"腾", pos: new BMap.Point(121.497965,31.296493), max_level:18 },
{label:"克", pos: new BMap.Point(121.498769,31.29674), max_level:18 },
{label:"路", pos: new BMap.Point(121.499609,31.296967), max_level:18 },

{label:"伊", pos: new BMap.Point(121.500588,31.295775), max_level:18 },
{label:"敏", pos: new BMap.Point(121.500233,31.294788), max_level:18 },
{label:"河", pos: new BMap.Point(121.49982,31.293561), max_level:18 },
{label:"路", pos: new BMap.Point(121.499721,31.292312), max_level:18 },

{label:"松", pos: new BMap.Point(121.504851,31.299578), max_level:17 },
{label:"花", pos: new BMap.Point(121.504868,31.298600), max_level:17 },
{label:"江", pos: new BMap.Point(121.506,31.296693), max_level:17 },
{label:"路", pos: new BMap.Point(121.508075,31.295528), max_level:17 },

{label:"辉", pos: new BMap.Point(121.504797,31.296999), max_level:16 },
{label:"河", pos: new BMap.Point(121.504797,31.295891), max_level:16 },
{label:"路", pos: new BMap.Point(121.504833,31.294200), max_level:16 },
];

var initial_point = {lng:121.497242, lat:31.290800};
var initial_max_zoom=20;
var initial_min_zoom=16;
var initial_zoom_level = 16;
var show_result_zoom_level = 14;
var show_info_zoom_level = 17;
var show_max_items = 25;
var default_piont_list_height = "550px";

//if under the low screen resolution, use the low zoom level
if (window.screen.height >= 1080)
{
	default_piont_list_height = "820px";
}

