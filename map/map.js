	var currInfoWindow;
	var currSelectedType="all";
	var map = new BMap.Map("container",{minZoom:initial_min_zoom,maxZoom:initial_max_zoom,enableMapClick:false});          
	var point = new BMap.Point(initial_point.lng, initial_point.lat);   /*121.497136,31.285672*/
	map.centerAndZoom(point, initial_zoom_level);   
	map.enableScrollWheelZoom(true);                  
	map.addControl(new BMap.NavigationControl());
	map.enableContinuousZoom();
	map.setMapStyle({styleJson:styleJson});

	var marker_vec = [];
	var page_result_list = {index:[], currPageStartNo:0, currPageEndNo:0};
	var max_items = show_max_items;
	var g_missed_rd_lb_vec = [];
	
	initGUI();

	function initGUI()
	{
		//init the page button
		setButtonState(document.getElementById("prev"), false);	
		setButtonState(document.getElementById("next"), false);	
		
		//draw the missed road
		g_missed_rd_lb_vec = initMissedRoad(MissedRoad_list, map.getZoom());
		map.addEventListener("zoomend", onMapZoomed);
		
		//set the point list height
		var point_list = document.getElementById("check_list");
		var h1 = document.getElementById('pageBtn_div').offsetHeight;
		var h2 = document.getElementById('select_div').offsetHeight;
		var screen_height = window.screen.availHeight;
		point_list.style.height = Math.ceil((screen_height - h2 - h1)*0.83) + "px";

		//draw the boundary of quyang
		setQuyangBoundary();
		
		//load the default type
		loadDetailedInfoByType({type:"1"});
		disableBtnByID("1");
		currSelectedType = "1";
	}
	
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
		showMissRoad(g_missed_rd_lb_vec, this.getZoom());
	}

	function setQuyangBoundary(){    
		var ply = new BMap.Polyline(Quyangboundary_list, {strokeWeight: 8, strokeColor: "#ff6600"});
		map.addOverlay(ply);       
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

			if(typeof param.type === 'string' && (data_list[i].type == param.type || param.type === "all"))
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
			map.removeOverlay(marker_vec[i][0]);
		}
		
		var content = '';
		page_result_list.currPageStartNo = begin_no;
		for(var i = begin_no; i < result_list.index.length && (i - begin_no + 1) <= max_items; i++)
		{
			var index = result_list.index[i];
			var info_line1 = '<div class="info" id='+index+' onclick="onInfoClick(this)"> ';
			var info_line2 = ': '+ data_list[index].title +'</div> <div style="font-size:12px;">地址 : '+ data_list[index].addr +'</div>';
			{
				content += info_line1 + (i+1) + info_line2;
			}
			//marker_vec[index][0].show();
			marker_vec[index][0].setLabel(marker_vec[index][2]);
			map.addOverlay(marker_vec[index][0]);
			result_list.currPageEndNo = i;
		}
		var total_pages = 1;
		var curr_page   = 1;
		if(result_list.index.length > max_items)
		{
			if(result_list.currPageEndNo + 1 < result_list.index.length)
				setButtonState(document.getElementById("next"), true);	
			else
				setButtonState(document.getElementById("next"), false);	

			if (result_list.currPageStartNo == 0)
				setButtonState(document.getElementById("prev"), false);	
				
			total_pages = Math.ceil(result_list.index.length/max_items);
			curr_page   = Math.ceil((result_list.currPageEndNo + 1)/max_items);
		}
		else
		{
			setButtonState(document.getElementById("prev"), false);	
			setButtonState(document.getElementById("next"), false);
		}
		document.getElementById("show_rec").innerHTML = "共 " + result_list.index.length + " 个单位, " + curr_page +"/" + total_pages + " 页";
		var check_list = document.getElementById("check_list");
		check_list.innerHTML = content;
	}
	
	function showPrevPage()
	{
		clearInfoWindow();
		setButtonState(document.getElementById("next"), true);	
		if (page_result_list.currPageStartNo > 0)
		{
			var prevBeginNo =  page_result_list.currPageStartNo - max_items;
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
		clearInfoWindow();
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

 

	function getOffset(offset_idx, label_text_len)
	{
		var w = 0;
		var h = 0;
		if (label_text_len <= 0)
				return;

		if (typeof offset_idx === "undefined")
				offset_idx = OFFSET_RIGHT;


		switch(offset_idx)
		{
				case OFFSET_RIGHT:
						w = g_icon_w + g_h_gap; 			 
						h = Math.ceil(g_icon_label_font_size/2); 			 
						break;
				case OFFSET_LEFT:
						w = -(Math.ceil(g_icon_label_font_size*label_text_len + 2)); 			 
						h = Math.ceil(g_icon_label_font_size/2); 			 
						break;
				case OFFSET_DOWN:
						w = Math.ceil(g_icon_w/2 - g_icon_label_font_size*label_text_len/2); 			 
						h = Math.ceil(g_icon_label_font_size/2 + g_icon_h / 2  + 4); 			 
						break;
				case OFFSET_UP:
						w = Math.ceil(g_icon_w/2 - g_icon_label_font_size*label_text_len/2); 			 
						h = -(Math.ceil(g_icon_label_font_size/2 + g_icon_h/2  - 2)); 			 
						break;
		}

		return {w:w, h:h}
	}	

	function createMarker(data_item, out_vec)
	{
		var point = new BMap.Point(data_item.lng,data_item.lat);
		var icon_name = getIcon(data_item.type);
		var icon = null;
		if(icon_name != null){
			var icon_w = 13;
			var icon_h = 22;
			icon = new BMap.Icon(icon_name, new BMap.Size(icon_w,icon_h), {anchor:new BMap.Size(icon_w-9,icon_h)});
		}

		var marker = new BMap.Marker(point, {icon:icon});

		marker.setTitle(data_item.title);
		var offset = getOffset(data_item.offset, data_item.alias.length);
		var alias_label =  new BMap.Label(data_item.alias, {offset:{width:offset.w, height:offset.h}});
		var font_size   = g_icon_label_font_size + "px";
		alias_label.setStyle({fontSize : font_size,  background:"#FFDEAD", border:"none", color:"#000099", lineHeight: font_size});
		marker.setLabel(alias_label);
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
		return "./icon/icon"+type+".png";
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
	
	function getInfoWinSize(currItem)
	{
		var searchInfoWin_height = 400;
		var searchInfoWin_width  = 460;

		if (currItem.type == "1")
		{
			if(typeof currItem.height !== "undefined")
				searchInfoWin_height = currItem.height;
		}
		else if (currItem.type == "2" || currItem.type == "3")
		{
			searchInfoWin_width  = 300;		
			searchInfoWin_height = 70;
		}

		return {w:searchInfoWin_width, h:searchInfoWin_height};
	}

	function getInfoWinContent(currItem)
	{
		var content = '<p style="margin:0;line-height:20px;">' + currItem.info + '</p>';
		content = content +  '<p style="margin:0;line-height:20px;"><b>地址</b>：' + currItem.addr;
	
		if (currItem.tel !== "")
		{
			content = content+ '。 <b>电话</b>:'+currItem.tel+'</p>';
		}

		if (currItem.type == "1")
		{
			var img = '<img src="./image/' + currItem.alias + '.jpg"></img>';
			img = '<a href="#" onclick=showBrief("' + currItem.alias  + '")>' + img + '</a>';

			content = img + content;
		}

		return content;
	}

	function showInfoWindow(currItem)
	{
		var content = getInfoWinContent(currItem);

		var searchInfoWin_size = getInfoWinSize(currItem);
		var searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
			title: currItem.title, //标题
			width: searchInfoWin_size.w, //宽度
			height: searchInfoWin_size.h, //高度
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
	
	 
	function enableSelBtns()
	{
		var btnList = document.getElementsByName("selBtn");
		
		for(var i = 0; i < btnList.length; i++)
		{
			btnList[i].disabled = false;
		}
	}
	
	function clearInfoWindow()
	{
		//here,  e.id is the type of info
		if (typeof currInfoWindow === 'object')
		{
			currInfoWindow.close();
		}
		map.reset();
	}	

	function onBtnClick(e)
	{
		if (e.id == "3")
			max_items = 9999;
		else
			max_items = show_max_items;
	
		clearInfoWindow();
		//showMarkersByType(marker_vec, e.id)
		loadDetailedInfoByType({type:e.id});
		disableBtnByID(e.id); 
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
		var res = getSearchResult(searchInput.value.trim());
		if(res)
			enableSelBtns();
	}
	
	function onSearchEnter(e)
	{
		//on input the enter key, trigger the search function
	    if(event.keyCode == 13) {
			var res = getSearchResult(e.value.trim());
			if(res)
				enableSelBtns();
		}
	}

	function getSearchResult(keyword)
	{
		var has_result = loadDetailedInfoByType({keyword:keyword});	
		map.reset();
		return has_result;
	}
