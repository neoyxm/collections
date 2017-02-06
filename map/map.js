	var currInfoWindow;
	var currSelectedType="all";
	var map = new BMap.Map("container",{minZoom:initial_min_zoom,maxZoom:initial_max_zoom,enableMapClick:false});          
	var point = new BMap.Point(initial_point.lng, initial_point.lat);   /*121.497136,31.285672*/
	map.centerAndZoom(point, initial_zoom_level);   
	map.enableScrollWheelZoom(true);                  
	map.addControl(new BMap.NavigationControl());
	map.enableContinuousZoom();
	map.setMapStyle({styleJson:styleJson});
	setQuyangBoundary();

	var missed_rd_lb_vec =	initMissedRoad(MissedRoad_list, map.getZoom());
	map.addEventListener("zoomend", onMapZoomed);

	var marker_vec = [];
	//default , not loading the data
	//loadDetailedInfoByType("1");
	
	var page_result_list = {index:[], currPageStartNo:0, currPageEndNo:0};

	//init the page button
	setButtonState(document.getElementById("prev"), false);	
	setButtonState(document.getElementById("next"), false);	

	
	function initMissedRoad(missed_list, curr_level)
	{
		var missed_rd_lb_vec = [];
		for (var i = 0; i < missed_list.length; i++)
		{
			var missed_rd = new BMap.Label(missed_list[i].label, {position:missed_list[i].pos});
			missed_rd.setStyle({fontSize : "12px",background:"rgba(255,255,255,0)", border:"none"});
			if(missed_list[i].max_level >= curr_level)
				missed_rd.show();
			else	
				missed_rd.hide();
			map.addOverlay(missed_rd);
			missed_rd_lb_vec.push({lb:missed_rd, max_level:missed_list[i].max_level})
		}
		return missed_rd_lb_vec;
	}

	function showMissRoad(lb_vec, curr_level)
	{
		for(var i = 0;  i < lb_vec.length; i++)
		{
			if (lb_vec[i].max_level >= curr_level)
				lb_vec[i].lb.show();
			else
				lb_vec[i].lb.hide();
		}
	}

	function onMapZoomed()
	{
		//alert("current level" + this.getZoom());
		showMissRoad(missed_rd_lb_vec, this.getZoom());
	}

	function setQuyangBoundary(){    
		var pointArray = [];
		var count = Quyangboundary_list.length;
		//for (var i = 0; i < count; i++) {
			var ply = new BMap.Polyline(Quyangboundary_list, {strokeWeight: 5, strokeColor: "red"});
			map.addOverlay(ply); 
			pointArray = pointArray.concat(ply.getPath());
		//}    
		map.setViewport(pointArray);                
	}

	function loadDetailedInfoByType(param)
	{
		var content = '';
		var has_result = false;
		
		page_result_list.index = [];
		page_result_list.currPageEndNo = 0;
		page_result_list.currPageStartNo = 0;

		for (var i = 0; i < data_list.length; i++) {
			// create the marker if not existing
			if(typeof marker_vec[i] !== 'object' )
				createMarker(data_list[i], marker_vec);

			if(typeof param.type === 'string' && (data_list[i].type == param.type || param.type == "all"))
			{
				page_result_list.index.push(i);
				has_result = true;
			}
			else if (typeof param.keyword === 'string')
			{

				if( data_list[i].title.match(param.keyword) != null || data_list[i].addr.match(param.keyword) != null)
				{
					page_result_list.index.push(i);
					has_result = true;
				}
			}
		}
		
		if(true == has_result)
		{
			showResultInPageMode(0,  page_result_list);	
		}
		else if (false == has_result && typeof param.keyword === 'string')
		{
			//use the current selected type to back
			content = '<center><p> 没有找到相关内容 <br>';
			content +='<button class="button" name="search" id="'+currSelectedType+'" onClick=onBtnClick(this)>返回</button>';
			content +='</p></center>';
			var check_list = document.getElementById("check_list");
			check_list.innerHTML = content;
		}
			
		return has_result;
	}

	function setButtonState(btnElement, state)
	{
		if (state == true)
			btnElement.disabled = false;
		else
			btnElement.disabled = true;
	}

	function showResultInPageMode(begin_no, result_list)
	{
		for(var i = 0; i < marker_vec.length; i++)
		{
			marker_vec[i][0].hide();
		
		}
		var content = '';
		page_result_list.currPageStartNo = begin_no;
		for(var i = begin_no; i < result_list.index.length && (i - begin_no + 1) <= show_max_items; i++)
		{
			var index = result_list.index[i];
			var info_line1 = '<div class="info" id='+index+' onclick="onInfoClick(this)"> ';
			var info_line2 = ': '+ data_list[index].title +'<br>'+ data_list[index].addr +'</div>';
			{
				content += info_line1 + (i+1) + info_line2;
			}
			marker_vec[index][0].show();
			result_list.currPageEndNo = i;
		}

		if(result_list.index.length > show_max_items)
		{
			if(result_list.currPageEndNo + 1 < result_list.index.length)
				setButtonState(document.getElementById("next"), true);	
			else
				setButtonState(document.getElementById("next"), false);	
		}
		else
		{
			setButtonState(document.getElementById("prev"), false);	
			setButtonState(document.getElementById("next"), false);
		}
		document.getElementById("show_rec").innerHTML = "共 " + result_list.index.length + " 个单位";
		var check_list = document.getElementById("check_list");
		check_list.innerHTML = content;
	}
	
	function showPrevPage()
	{
		setButtonState(document.getElementById("next"), true);	
		if (page_result_list.currPageStartNo > 0)
		{
			var prevBeginNo =  page_result_list.currPageStartNo - show_max_items;
			if (prevBeginNo < 0)
				prevBeginNo = 0;
			showResultInPageMode(prevBeginNo, page_result_list);
		}
		else
		{
			setButtonState(document.getElementById("prev"), false);	
		}
	}
	
	function showNextPage()
	{
		setButtonState(document.getElementById("prev"), true);	
		if (page_result_list.currPageEndNo + 1 < page_result_list.index.length)
		{
			showResultInPageMode(page_result_list.currPageEndNo + 1 , page_result_list);
		}
		else
		{
			setButtonState(document.getElementById("next"), false);	
		}
	}

	function createMarker(data_item, out_vec)
	{
		var point = new BMap.Point(data_item.lng,data_item.lat);
		var marker = new BMap.Marker(point);
		var icon_name = getIcon(data_item.type);
		if(icon_name != null){
	//		var icon = new BMap.Icon(icon_name, new BMap.Size(30,39));
	//		marker.setIcon(icon);
		}
		marker.setTitle(data_item.title);
		var alias_label =  new BMap.Label(data_item.alias, {offset:{width:22, height:5 }});
		alias_label.setStyle({fontSize : "12px",background:"rgba(255,255,255,0)", border:"none"});
		marker.setLabel(alias_label);
		map.addOverlay(marker);
		marker.addEventListener('click', callback); 
		//make the element to contain the marker & type
		var markerElem = [];
		markerElem.push(marker);  //save the marker
		markerElem.push(data_item.type); //save the type
		markerElem.push(alias_label); // save the label
		//put the element to vector
		out_vec.push(markerElem);
	}

	function showMarkersByType(out_vec, type)
	{
		for (var i = 0; i < out_vec.length; i++) {
			var markerElem = out_vec[i];
			if (markerElem[1] == type || type == "all")
			{
				markerElem[0].show();
			}
			else
				markerElem[0].hide();
		}
	}

	function findItemByTitle(title)
	{
		for (var i = 0; i < data_list.length; i++) {
			if (data_list[i].title == title)
				return data_list[i];
		}
		return null;
	}
	
	function getIcon(type)
	{
		for (var i = 0; i < icon_list.length; i++)
		{
			if(icon_list[i].type == type)
				return icon_list[i].icon;
		}
		return null;
	}
	
	function callback(e)
	{		
		var currItem = findItemByTitle(this.getTitle());
		if(currItem == null)
			return null;

		showInfoWindow(currItem);	
	}

	function showBrief(title)
	{
		window.open("./brief/"+title+".html","_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=450, height=440");
	}
	
	function showInfoWindow(currItem)
	{
		var content = '<img src="./image/' + currItem.alias + '.jpg"></img>';
		content = '<a href="#" onclick=showBrief("' + currItem.alias  + '")>' + content + '</a>';
		content = content +  '<p style="margin:0;line-height:20px;">' + currItem.info + '</p>';
		content = content +  '<p style="margin:0;line-height:20px;"><b>地址</b>：' + currItem.addr + '。 <b>电话</b>:'+currItem.tel+'</p>';

		var searchInfoWin_height = 400;
		if(typeof currItem.height !== "undefined")
			searchInfoWin_height = currItem.height;

		var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
			title: currItem.title, //标题
			width: 460, //宽度
			height: searchInfoWin_height, //高度
			panel : "panel", //检索结果面板
			enableAutoPan : true, //自动平移
			enableSendToPhone: false,
			searchTypes :[]
		});
		var point = new BMap.Point(currItem.lng,currItem.lat);
		searchInfoWindow.open(point);
		currInfoWindow = searchInfoWindow;
	}
	
	function disableBtnByID(id)
	{
		var btnList = document.getElementsByName("selBtn");
		
		for(var i = 0; i < btnList.length; i++)
		{
			if (id == btnList[i].id)
				btnList[i].disabled = true;
			else
				btnList[i].disabled = false;
		}
	}
	
	function onBtnClick(e)
	{
		//here,  e.id is the type of info
		if (typeof currInfoWindow === 'object')
		{
			currInfoWindow.close();
		}

		showMarkersByType(marker_vec, e.id)
		loadDetailedInfoByType({type:e.id});
		disableBtnByID(e.id); 
		map.reset();
		currSelectedType = e.id;
	}

	function onInfoClick(e)
	{
		var marker =  marker_vec[e.id];
		map.centerAndZoom(marker[0].getPosition(), show_info_zoom_level);		
		showInfoWindow(data_list[e.id]);
	}
	
	function onSearchBtnClick()
	{
		var searchInput= document.getElementById("searchInput");
		getSearchResult(searchInput.value.trim());
	}
	
	function onSearchEnter(e)
	{
		//on input the enter key, trigger the search function
	    if(event.keyCode == 13) {
			getSearchResult(e.value.trim());
		}
	}

	function getSearchResult(keyword)
	{
		var has_result = loadDetailedInfoByType({keyword:keyword});	
		map.reset();
	}
