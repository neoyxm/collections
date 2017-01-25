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
	createMarkers(data_list, marker_vec);
	loadDetailedInfoByType("all");
	
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

	function loadDetailedInfoByType(type, keyword)
	{
		var content = '';
		var indexs_vec = [];
		var count = 1;
		for (var i = 0; i < data_list.length; i++) {
			if(data_list[i].type == type || type == "all")
			{
				var info_line = '<div class="info" id='+i+' onclick="onInfoClick(this)"> '+ (count++) + ': '+ data_list[i].title +'<br>'+ data_list[i].addr +'</div>';
				if (typeof keyword === 'string')
				{
					if( data_list[i].title.match(keyword) != null || data_list[i].addr.match(keyword) != null)
					{
						content += info_line;
						indexs_vec.push(i);
					}
				}
				else
				{
					content += info_line;
					indexs_vec.push(i);
				}
			}
		}
		
		if (content == '' && typeof keyword === 'string')
		{
			//use the current selected type to back
			content = '<center><p> 没有找到相关内容 <br>';
			content +='<button class="button" name="search" id="'+currSelectedType+'" onClick=onBtnClick(this)>返回</button>';
			content +='</p></center>';
		}
			
		var check_list = document.getElementById("check_list");
		check_list.innerHTML = content;
		return indexs_vec;
	}

    function createMarkers(data_list, out_vec)
	{
			for (var i = 0; i < data_list.length; i++) {
				var point = new BMap.Point(data_list[i].lng,data_list[i].lat);
				var marker = new BMap.Marker(point);
				var icon_name = getIcon(data_list[i].type);
				if(icon_name != null){
			//		var icon = new BMap.Icon(icon_name, new BMap.Size(30,39));
			//		marker.setIcon(icon);
				}
				marker.setTitle(data_list[i].title);
				var alias_label =  new BMap.Label(data_list[i].alias, {offset:{width:22, height:5 }});
				alias_label.setStyle({fontSize : "12px",background:"rgba(255,255,255,0)", border:"none"});
				marker.setLabel(alias_label);
				map.addOverlay(marker);
				marker.addEventListener('click', callback); 
				//make the element to contain the marker & type
				var markerElem = [];
				markerElem.push(marker);  //save the marker
				markerElem.push(data_list[i].type); //save the type
				markerElem.push(alias_label); // save the label
				//put the element to vector
				out_vec.push(markerElem);
			}		
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

	function showMarkersByIndexs(out_vec, indexs_vec)
	{
		for (var i = 0; i < out_vec.length; i++) {
			if(indexs_vec.indexOf(i) >= 0)
				out_vec[i][0].show();
			else
				out_vec[i][0].hide();
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

	function showInfoWindow(currItem)
	{
		var content = '<img src="./image/mm.jpg"></img>';
		content = content +  '<p style="margin:0;line-height:20px;">' + currItem.info + '</p>';
		content = content +  '<p style="margin:0;line-height:20px;"><b>地址</b>：' + currItem.addr + '。 <b>电话</b>:'+currItem.tel+'</p>';

		var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
			title: currItem.title, //标题
			width: 500, //宽度
			height: 360, //高度
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
		loadDetailedInfoByType(e.id);
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
		var indexs_vec = loadDetailedInfoByType(currSelectedType, keyword);	
		if (indexs_vec.length > 0)
		{
			showMarkersByIndexs(marker_vec, indexs_vec);
			map.reset();
		}
	}
