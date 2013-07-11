/************************************





*************************************/
/*通用脚本*/
var base={
		/*无限TAB页（商品列表页）*/
	unlimitTabScrollhover:function(bigBox, btnLi, photoLi, cur){
		/*参数解释:
		bigBox:代表图片外层的DIV;
		btnLi:按钮;
		photoLi:代表相应tab页所对应的显示内容；
		cur:代表tab页选中的样式；
		*/
		$(bigBox).each(function(i) {
			var box = $(bigBox).eq(i);
			var btn=box.find(btnLi);
			var photo = box.find(photoLi);	
			var key = 0;
			var speed=100;
				btn.mousedown(function(){
						key = $(this).index();
						btn.removeClass(cur).eq(key).addClass(cur);
						photo.hide().eq(key).show();
				});
			});
		},
/*无限左右滚动（商品列表页）*/		
	leftAndRightScroll:function(bigBox,sUl,btnl,btnr,curl,cur,movenum,margin){
		/*
		bigBox:父级容器
		sUl:滚动的列表所在ul；
		btnl:左滚按钮；
		btnr:右滚按钮；
		cur:按钮激活的类名；
		curl:左侧按钮当前（防IE6）；
		movenum:控制一次滚动几个li；
		margin:li的间距；
		*/
		$(bigBox).each(function(i) {
			var n = 0;
			var m = 0;
			var mainBox = $(bigBox).eq(i);
			var ul = mainBox.find(sUl);
			var btn_l = mainBox.find(btnl);
			var btn_r = mainBox.find(btnr);
			var removing = (ul.find("li").innerWidth()+margin)*movenum;
			var liLength =Math.ceil(ul.find("li").length/movenum);
			btn_l.removeClass(curl);
			btn_r.addClass(cur);
			/*不够1屏以上就不显示按钮*/
			if(ul.find("li").length<=movenum){
				btn_l.hide();
				btn_r.hide();
				}
			/*左按钮事件*/
			btn_l.click(function(){
				if(m!=0){
					n -= removing;
					ul.stop(true,false).animate({left:-n},500);
					m -=1;
					if(m==0){btn_l.removeClass(curl);btn_r.addClass(cur)}else{btn_r.addClass(cur)};
				};
				return false;
			});
			/*右按钮事件*/
			btn_r.click(function(){
				if(m <liLength-1){
					n += removing;
					ul.stop(true,false).animate({left:-n},500);
					m+=1;
					if(m>liLength-1){btn_r.removeClass(cur);}else if(m==liLength-1){btn_r.removeClass(cur);btn_l.addClass(curl)}else{btn_l.addClass(curl)};
				};
				return false;
			});
		});
	},
	/*（显示关闭层,简单直接无特效） （注册）*/
	showoff:function(showlink,showcontent,closebtn){
		/*showlink：代表点击显示的按钮
		showcontent：代表隐藏的主体内容
		closebtn：代表点击隐藏的按钮*/
		$(showlink).click(function(){
			$(showcontent).show();
			return false;
		});
		$(closebtn).click(function(){
			$(showcontent).hide();
		});
	},
	/*（点击显示，点击隐藏--此函数必须HTML显示的主体内容content在显示按钮btnShow的下面） （团购流程-提交订单页，团购首页）*/
	clickHideShow:function(btnShow,btnHide,content){
		/*btnShow：代表点击显示的按钮
		btnHide：代表点击隐藏的按钮
		content：代表隐藏的主体内容*/
		/*需要显示，又需要隐藏的时候（如团购首页的切换城市）*/
		if(btnShow||btnShow!=""){
			$(btnShow).click(function(){
				$(this).next(content).fadeIn();
			});
		$(btnHide).click(function(){
				$(this).parents(content).fadeOut();
			});
			}
		/*只需要隐藏的时候(如团购首页的ad广告)*/
		else{
			$(btnHide).click(function(){
				$(this).parents(content).fadeOut();
			});
			}
		},
	/*（滑上加样式，滑开减样式( 滑上显示.show，滑开隐藏.hide)） （团购首页）*/
	hoverClass:function(hoverId,content,className){
		/*hoverId：代表移上去的按钮
		content：代表要加样式的主体内容
		className：代表要加的样式名称*/
		
		/*不是给自身添加样式的（如团购首页全部商品分类的显示与隐藏）*/
		if(content||content!=""){
			$(hoverId).hover(
			function(){
				$(content).addClass(className);
				},
			function(){
				$(content).removeClass(className);
				}
				);
			}
		/*给自身添加样式的（如团购首页Li移上去边框变红色）*/
		else{
			$(hoverId).hover(
			function(){
				$(this).addClass(className);
				},
			function(){
				$(this).removeClass(className);
				}
				);
			}
		},
	/*（点击弹出层pop，点击关闭按钮关闭弹出层） （我的团购订单页，团购首页）*/
	layerShowHide:function(showId,ev,layerName,closeId){
		/*showId：代表点击弹出层的按钮
		layerName：代表弹出的主体内容
		closeId：代表关闭弹出层的按钮*/
		$(showId).click(function(){
			lhh.layerShow(ev,layerName);
			});
		$("#"+layerName).find(closeId).click(function(){
			lhh.closeLayer(layerName);
			});
		},
	/*(选项卡tab函数) (退款_实体商品(虚拟商品)页，我的团购订单页，团购首页)*/
	tabFun:function(btnWrap,contentId,className){
		/*btnWrap：代表切换选项卡的按钮的外层
		contentId：代表选项卡对应的主体内容
		className：代表选项卡选中的样式名称*/
		var btnId=$(btnWrap).find("a");
		$(btnId).click(function(){
			var index=$(btnId).index($(this));
			$(btnId).removeClass(className).eq(index).addClass(className);
			$(contentId).hide().eq(index).show();
			return false;
			});
	},
	/*（模拟select下拉菜单） （团购首页，团购更多页）*/
	selectAnalog:function(selectId,className){
			/*selectId:代表要使用模拟的select的ID名字或者class名字
			className:代表覆盖默认设置的select-analog的样式及其子孙元素的样式*/
			$(selectId).each(function(index){
				/*根据select的值创建相应的HTML*/
				var firstHtml=$(this).find("option:first").html();
				var html="<div class='select-analog";
				if(className){ /*如果有覆盖样式的话就加上样式，否则不加*/
					html+=" "+className;
				}
				html+="'><a class='title' title='模拟select下拉框' href='#'>";
				html+=firstHtml;
				html+="<span class='arr'></span></a>";
				var htmlUl=$("<ul></ul>");
				var optionLength=$(this).find("option").length;
				for(var i=0;i<optionLength;i++){
					var htmlLi="<li><a href='#'>"+$(this).find("option").eq(i).html()+"</a></li>";
					htmlUl.append(htmlLi);
					}
				html+="<ul>"+htmlUl.html()+"</ul></div>";
				$(this).after(html);
				var selectW=$(this).width();
				var arrWidth=$(".arr").eq(index).width();
				$(this).remove();
				/*对生成的相应的HTML加方法模拟select下拉框*/
				var btnId=$(".select-analog").eq(index).find(".title");
				var ul=$(".select-analog").eq(index).find("ul");
				var arr="<span class='arr'></span>";
				/*判断浏览器,因为各浏览器对select的宽度取值不一样*/
				function userBrowser() {  
					var browserName = navigator.userAgent.toLowerCase();
					if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {  
						browserName = "safari";  
					} else {  
						browserName = "unknow";  
					}  
						return browserName;  
        			}
				var browser = userBrowser();
				if (browser == "safari") {
					$(btnId).width(selectW+arrWidth+20);
            		}  
           		else{  
                	$(btnId).width(selectW+arrWidth+2);
            		}
				var paddingW=parseInt($(btnId).css("padding-left"));
				ul.width($(btnId).width()+paddingW);
				$(".select-analog").mouseleave(function(){
					ul.hide();
					});
				$(btnId).click(function(){
					$(".select-analog").find("ul").hide().eq(index).show();
					return false;
					});
				ul.find("a").click(function(){
					$(btnId).html($(this).html()+arr);
					ul.hide();
					return false;
					});
				});
		},
	/*(图片循环滚动) (团购首页)*/
	imgScroll:function(imgBox,numBox,speed,stopTime,className){
		/*参数解释:
		imgBox:代表图片外层的DIV;
		numBox:代表数字外层的DIV;
		speed:代表滚动动画的速度，数值越大，滚动越慢;
		stopTime:代表图片停留的时间
		className:代表数字选中的样式
		*/
		var imgBox=$(imgBox);
		var li=imgBox.find("li");
		var num=$(numBox).find("a");
		var i=1;
		li.eq(0).clone().appendTo(imgBox);  /*先把第一个Li复制插入到imgBox里面,方便循环滚动*/
		/*imgBox.width(li.width()*(li.length+1));  根据img的数量初始化img UL的宽度，这样Li就可以水平浮动了*/
		/*定义自动滚动函数*/
		function scrollAuto(){
			if(i>li.length){
				imgBox.css("left",0);
				i=1;
				}
			imgBox.animate({"left":-li.width()*i},speed);
			num.removeClass(className).eq(i).addClass(className);
			if(i==li.length){
				num.removeClass(className).eq(0).addClass(className);
				}
			i++;
			}
		var timer=setInterval(scrollAuto,stopTime);
		/*移到数字，就显示相应的图片，并停止动画*/
		num.hover(
			function(){
				var index=num.index($(this));
				imgBox.stop().animate({"left":-li.width()*index},speed);
				num.removeClass(className).eq(index).addClass(className);
				clearInterval(timer);
				},
			function(){
				i=num.index($(this))+1;  /*当鼠标移开后，显示鼠标停留的图片的下一张图片*/
				timer=setInterval(scrollAuto,stopTime);
				}
		);
		/*移到图片上，就停止动画*/
		li.hover(
			function(){
				clearInterval(timer);
				},
			function(){
				i=li.index($(this))+1;  /*当鼠标移开后，显示鼠标停留的图片的下一张图片*/
				timer=setInterval(scrollAuto,stopTime);
				}
		);
		},
		/*(图片循环滚动-有延迟) 首页*/
		imgScroll_later:function(imgBox,numBox,speed,stopTime,className){
			/*参数解释:
			imgBox:代表图片外层的DIV;
			numBox:代表数字外层的DIV;
			speed:代表滚动动画的速度，数值越大，滚动越慢;
			stopTime:代表图片停留的时间
			className:代表数字选中的样式
			*/
			var imgBox=$(imgBox);
			var li=imgBox.find("li");
			var num=$(numBox).find("a");
			var i=1;
			li.eq(0).find("img").each(function(){
				this.src = $(this).attr("gome-src"); 
				$(this).removeAttr("gome-src");
			});	
			
			li.eq(0).clone().appendTo(imgBox);  /*先把第一个Li复制插入到imgBox里面,方便循环滚动*/
			/*imgBox.width(li.width()*(li.length+1));  根据img的数量初始化img UL的宽度，这样Li就可以水平浮动了*/
			/*定义自动滚动函数*/
			function scrollAuto(){
				if(i>li.length){
					imgBox.css("left",0);
					i=1;
				};
			
				/*gome-src替换*/
				var scrolljudge = li.eq(i).find("img").attr("gome-src");
				if(i > 0 && scrolljudge != undefined){
					li.eq(i).find("img").each(function(){
					   this.src = $(this).attr("gome-src");
					   $(this).removeAttr("gome-src"); 
					});	
				}
			
				imgBox.animate({"left":-li.width()*i},speed);
				num.removeClass(className).eq(i).addClass(className);
				if(i==li.length){
					num.removeClass(className).eq(0).addClass(className);
				};
				i++;
			}
			var timer=setInterval(scrollAuto,stopTime);
			/*移到数字，就显示相应的图片，并停止动画*/
			num.hover(
				function(){
					var index=num.index($(this));
					
					/*gome-src替换*/
					var hoverjudge = li.eq(index).find("img").attr("gome-src");
					if(index > 0 && hoverjudge != undefined){
						li.eq(index).find("img").each(function(){
						   this.src = $(this).attr("gome-src"); 
						   $(this).removeAttr("gome-src");
						});	
					};
					
					imgBox.stop().animate({"left":-li.width()*index},speed);
					num.removeClass(className).eq(index).addClass(className);
					clearInterval(timer);
					},
				function(){
					i=num.index($(this))+1;  /*当鼠标移开后，显示鼠标停留的图片的下一张图片*/
					timer=setInterval(scrollAuto,stopTime);
					}
			);
			/*移到图片上，就停止动画*/
			li.hover(
				function(){
					clearInterval(timer);
					},
				function(){
					i=li.index($(this))+1;  /*当鼠标移开后，显示鼠标停留的图片的下一张图片*/
					timer=setInterval(scrollAuto,stopTime);
					}
			);
		},
	/*(input获得焦点的时候清除placeholder水印) (团购首页)*/
	inputFocus:function(inputId){
		/*参数解释:
		inputId:代表水印的ID;
		*/
		function setVal(id,val){
			id.val(val);
			id.attr("placeholder",val);
			id.prev("label").empty();
			}
		/*取得占位符文本*/
		function returnVal(id){
			return id.val()||id.attr("placeholder")||id.prev("label").text();
			}
		$(inputId).each(function(index){
			$(this).css("color", "#999");
			var thisInput=$(inputId).eq(index);
			var placeholder=returnVal(thisInput);
			$(this).focus(function(){
				$(this).css("color", "#000");
				if(returnVal(thisInput)==placeholder){
					setVal(thisInput,"");
					}
				});
			$(this).blur(function(){
				if(returnVal(thisInput)==""){
					setVal(thisInput,placeholder);
					$(this).css("color", "#999");
					}
				else{
					$(this).css("color", "#000");
					}
				});
			})
		},
	/*(截取字符，超过出现省略号,如果文本只有一行的话建议用CSS解决) */	
	stringCut:function(stringId,num){
		/*参数解释:
		stringId:代表需要截取字符的容器的ID;
		num:代表要截取的字符数
		*/
		var stringId=$(stringId);
		/*循环设置文本*/
		stringId.each(function(){
			var str=$(this).text();
			$(this).attr("title",str);
			if(str.length>num){
				var newStr=str.substring(0,num)+"...";
				$(this).text(newStr);
				}
			})
		}
	}

var lxf = {
	/*通用脚本 焦点图上下滚动效果*/
	lxfScroll:function(main,title,txt){
		var lxfscroll_ul = $(main);
		var lxfscroll_li = $(main).children();
		var lxfscroll_tli = $(title).children();
		var lxfscroll_speed = 350;//切换的速度
		var lxfscroll_autospeed = 6000;//自动播放的速度		
		var lxfscroll_n = 0;
		var lxfscroll_imgheight = $(main).find("img").height();//获取图片高度
		var lxfscroll_lilength = lxfscroll_li.length;//获取图片数量
		var lxfscroll_timer;
		var lxfscroll_alt = $(txt);
		/* 标题按钮事件 */
		function lxfscroll() {
			lxfscroll_tli.mouseenter(function(){
				var lxfscroll_index = lxfscroll_tli.index($(this));
				var lxfscroll_lipoint = lxfscroll_index*lxfscroll_imgheight;
				var lxfscroll_imgTitle = lxfscroll_li.find("img").eq(lxfscroll_index).attr("alt");
				lxfscroll_alt.text(lxfscroll_imgTitle);
				lxfscroll_tli.removeClass("cur");
				$(this).addClass("cur");
				$(main).stop(true,false).animate({
					"top":-lxfscroll_lipoint+"px"
				}
				,lxfscroll_speed);
			});
		};
		/* 自动轮换 */
		function lxfscroll_autoroll() {
			if(lxfscroll_n >= lxfscroll_lilength) {
				lxfscroll_n = 0;
			}
			lxfscroll_imgheight = $(main).find("img").height();//获取图片高度
			var lxfscroll_lipoint = lxfscroll_n*lxfscroll_imgheight;
			var lxfscroll_imgTitle = lxfscroll_li.find("img").eq(lxfscroll_n).attr("alt");
			lxfscroll_ul.stop(true,false).animate({
				"top":-lxfscroll_lipoint+"px"
			}
			,lxfscroll_speed);
			lxfscroll_tli.removeClass("cur").eq(lxfscroll_n).addClass("cur");
			lxfscroll_alt.text(lxfscroll_imgTitle);
			lxfscroll_n++;
			lxfscroll_timer = setTimeout(lxfscroll_autoroll, lxfscroll_autospeed);
		};
		/* 鼠标悬停即停止自动轮换 */
		function lxfscroll_stoproll() {
			lxfscroll_li.hover(function() {
				clearTimeout(lxfscroll_timer);
				lxfscroll_n = $(this).prevAll().length+1;
			}
			, function() {
				lxfscroll_timer = setTimeout(lxfscroll_autoroll, lxfscroll_autospeed);
			});
			lxfscroll_tli.hover(function() {
				clearTimeout(lxfscroll_timer);
				lxfscroll_n = $(this).prevAll().length+1;
			}
			, function() {
				lxfscroll_timer = setTimeout(lxfscroll_autoroll, lxfscroll_autospeed);
			});
		};
		lxfscroll();
		lxfscroll_autoroll();
		lxfscroll_stoproll();//启动自动播放功能
		},
		
	/*通用脚本 鼠标经过背景变色并显示子内容*/	
	bgcolor:function(id,myclass,box){
		$(id).hover(function(){
			$(this).addClass(myclass).find(box).show();
		}
		, function(){
			$(this).removeClass(myclass).find(box).hide();
		})
	},
	
	/*通用脚本 单击关闭或显示指定的层（通用效果，onclick里面调用函数，然后使用单引号在参数里面写层的Class名称）*/
	closediv:function(e){
		$(e).hide()
	},
	opendiv:function(e){
		$(e).show();
	},
	opendiv_hidemine:function(t,m){
		$(t).show();
		$(m).hide();
		}
};
/***********************************/	
var lx = {
	/* 通用脚本 Tab页点击切换 （购物流程 > 订单状态; 频道页-服装;）*/
	tabclick:function(btn,contbox,cur){
		$(contbox).hide().eq(0).show();
		$(btn).click(function(){
			$(btn).removeClass(cur);
			$(this).addClass(cur);
			$(contbox).hide().eq($(btn).index($(this))).show();
		});
	},
	/* 通用脚本 Tab页点击切换 （购物流程 > 订单状态; 频道页-服装;）*/
	tabopen:function(btn,contbox,cur){
		var _title =$(btn).find("h3");
		_title.click(function(){
			var aaa=$(this).parent().attr("class");
			if(aaa=="cur"){_title.parent().removeClass(cur);
			$(contbox).hide();}else{
			_title.parent().removeClass(cur);
			$(this).parent().addClass(cur);
			$(contbox).hide().eq(_title.index($(this))).show();}
		});
	},
	/* 通用脚本 Tab页点击切换（频道页-图书;）*/
	tabclick_list:function(btn,contbox,cur){
		$(contbox).hide().eq(0).show();
		$(btn).click(function(){
			$(contbox).eq($(btn).index($(this))).toggle();
			$(this).toggleClass(cur);
		});
	},
	/* 通用脚本 Tab页经过切换 */
	tabhover:function(btn,contbox,cur){
	$(contbox).hide().eq(0).show();
	$(btn).hover(function(){
		var i = $(btn).index($(this));
		function abc(){
		$(btn).removeClass(cur);
		$(btn).eq(i).addClass(cur);
		$(contbox).hide().eq(i).show();
		}
		timer=setTimeout(abc,200);
	},function(){
			clearTimeout(timer);
		});
	},
	/* 通用脚本 Tab页经过切换 控制两个DIV同时变化 */
	tabhovertwobox:function(btn,contbox1, contbox2, cur){
	$(contbox1).hide().eq(0).show();
	$(contbox2).hide().eq(0).show();
	$(btn).hover(function(){
		$(btn).removeClass(cur);
		$(this).addClass(cur);
		$(contbox1).hide().eq($(btn).index($(this))).show();
		$(contbox2).hide().eq($(btn).index($(this))).show();
	});
	},
	/* 通用脚本 Tab页hover切换,并轮播-无特效*/
	lxtabbox:function(btn,boxhome,cur){
		$(boxhome).hide().eq(0).show();
		$(btn).removeClass(cur).eq(0).addClass(cur);
		var i=0;
		var btnnum = $(btn).length-1;
		//首页为您推荐 按钮
		function lx_fybtn(){
		    $(btn).hover(function(){
				var lxtabbtn_eq=$(btn).index($(this));
				i = lxtabbtn_eq;
				$(btn).removeClass(cur);
				$(this).addClass(cur);
				$(boxhome).hide().eq(lxtabbtn_eq).show();
				
			});
			$(btn).click(function(){
				return false;
			});
		};
		//首页为您推荐 自动播放
		function lx_fyauto(){
			if(i>btnnum){i=0;}
			$(boxhome).hide().eq(i).show();
			$(btn).removeClass(cur).eq(i).addClass(cur);
			timer=setTimeout(lx_fyauto, 6000);
		    i++;
		};
		//首页为您推荐 悬停
		function lx_fystop(){
			$(boxhome).hover(function(){
				clearTimeout(timer);
			}
			, function(){
				timer=setTimeout(lx_fyauto, 6000);
			});
		};
	    lx_fybtn();
		lx_fyauto();
		lx_fystop();
    },
	
	/* 通用脚本 Tab页点击切换 （首页-为您推荐） */
	tabhover_later:function(btn,boxhome,cur){
		$(boxhome).hide().eq(0).show();
		$(btn).removeClass(cur).eq(0).addClass(cur);
		var i=0;
		var btnnum = $(btn).length-1;
		//首页为您推荐 按钮
		$(boxhome).eq(0).find("img").each(function(){
			this.src = $(this).attr("gome-src");
			$(this).removeAttr("gome-src");
		});
		$(btn).hover(function(){
			var lxtabbtn_eq=$(btn).index($(this));
			i = lxtabbtn_eq;
			function way(){
				$(btn).removeClass(cur);
				$(btn).eq(i).addClass(cur);
				$(boxhome).hide().eq(lxtabbtn_eq).show();
			};    
			timers=setTimeout(way,500);
			/*gome-src替换*/
			var hoverjudge = $(boxhome).eq(lxtabbtn_eq).find("img").attr("gome-src");
			if(lxtabbtn_eq > 0 && hoverjudge != undefined){
				$(boxhome).eq(lxtabbtn_eq).find("img").each(function(){
					this.src = $(this).attr("gome-src");
					$(this).removeAttr("gome-src");
				});
			};
		},function(){
			clearTimeout(timers);
		});
		/*$(btn).click(function(){
			return false;
		});*/
    },
	/* 通用脚本 Tab页点击切换,并轮播-无特效 （首页-为您推荐） */
	lxtabbox_later:function(btn,boxhome,cur){
		$(boxhome).hide().eq(0).show();
		$(btn).removeClass(cur).eq(0).addClass(cur);
		var i=0;
		var btnnum = $(btn).length-1;
		//首页为您推荐 按钮
		$(boxhome).eq(0).find("img").each(function(){
			this.src = $(this).attr("gome-src");
			$(this).removeAttr("gome-src");
		});
		function lx_fybtn(){
		    $(btn).hover(function(){
				var lxtabbtn_eq=$(btn).index($(this));
				i = lxtabbtn_eq;
				
				function way(){
					$(btn).removeClass(cur);
					$(btn).eq(i).addClass(cur);
					$(boxhome).hide().eq(lxtabbtn_eq).show();
				};    
				timers=setTimeout(way,500);
				/*gome-src替换*/
				var hoverjudge = $(boxhome).eq(lxtabbtn_eq).find("img").attr("gome-src");
				if(lxtabbtn_eq > 0 && hoverjudge != undefined){
					$(boxhome).eq(lxtabbtn_eq).find("img").each(function(){
						this.src = $(this).attr("gome-src");
						$(this).removeAttr("gome-src");
					});
				};
				
			},function(){
				clearTimeout(timers);
			});
			$(btn).click(function(){
				return false;
			});
		};
		//首页为您推荐 自动播放
		function lx_fyauto(){
			if(i>btnnum){i=0;}
			/*gome-src替换*/
			var scrolljudge = $(boxhome).eq(i).find("img").attr("gome-src");
			if(i>0 && scrolljudge != undefined){
				$(boxhome).eq(i).find("img").each(function(){
					this.src = $(this).attr("gome-src");
					$(this).removeAttr("gome-src");
				});
			};
			
			$(boxhome).hide().eq(i).show();
			$(btn).removeClass(cur).eq(i).addClass(cur);
			timer=setTimeout(lx_fyauto, 6000);
		    i++;
		};
		//首页为您推荐 悬停
		function lx_fystop(){
			$(boxhome).hover(function(){
				clearTimeout(timer);
			}
			, function(){
				timer=setTimeout(lx_fyauto, 6000);
			});
		};
	    lx_fybtn();
		lx_fyauto();
		lx_fystop();
    },
    /*通用脚本 简单Tab页  点击切换-无轮播无特效 （供应商>订单管理， 排行榜>首页）*/
	tabclick_simple:function(btn,contbox,cur){
		$(contbox).hide().eq(0).show();
		$(btn).click(function(){
			$(btn).removeClass(cur);
			$(this).addClass(cur);
			$(contbox).hide().eq($(btn).index($(this))).show();
		});
	},
    /*简单Tab页  点击切换-无轮播无特效 （排行榜>首页）*/
	tabclick_all:function (btn,content,cont,cur){
		$(btn).click(function(){
			var i=$(btn).parent().index($(this).parent());
			var j=$(btn).parent().eq(i).find("li").index($(this));
			$(btn).parent().eq(i).find("li").removeClass(cur).eq(j).addClass(cur);
			$(content).eq(i).find(cont).hide().eq(j).show();
		});
	},
	
    /*通用脚本 银行支付方式选择 （团购流程>支付订单）*/
	radioclick:function(boxul, cur){
		$(boxul).find("input").attr("checked","");
		$("#radio-bank0").attr("checked","checked");
		$(boxul).find("label").click(function(){
			$(boxul).find("li").removeClass(cur);
			$(this).parent("li").addClass(cur);
		});
	},
	/*通用脚本 鼠标经过时显示 鼠标离开时收起 （排行榜 > 首页）*/
	hover_showandhide:function(btn, showbox, cur){
		$(btn).hover(function(){
			function later(){
				$(showbox).show();
				$(btn).addClass(cur);
				};
				timer=setTimeout(later,500);
			},function(){
				$(showbox).hide();
				$(btn).removeClass(cur);
				clearTimeout(timer);
			}
		);
	},
	/* 鼠标经过时显示 其他box收起 （排行榜 ＞ 首页　＞　商品信息）*/
	hover_sh:function(hoverbtn, hoverbox, cur){
		$(hoverbtn).mouseenter(function(){
			var i = $(hoverbtn).parent().index($(this).parent());
			$(hoverbtn).parent().eq(i).find("li").removeClass(cur);
			$(this).addClass(cur);
			$(hoverbtn).parent().eq(i).find(hoverbox).hide();
			$(this).find(hoverbox).show();
		});
	},
	/* 鼠标经过时显示 其他不显示部分收起 （频道 ＞ 服装　＞　精选单品）*/
	hover_single:function(singlelist, cur){
		$(singlelist).find("li").mouseenter(function(){
			$(singlelist).find("div").hide();
			$(this).find("div").show();
			$(singlelist).find("p").show();
			$(this).find("p").hide();
		});
	},
	/* 团购流程-收货地址 修改 关闭*/
	fixclose:function(btn,contbox){
		$(btn).click(function(){
			$(btn).hide();
			$(this).siblings().show();
			$(contbox).show().eq($(btn).index($(this))).hide();
		});
		},
	/* 团购流程-收货地址 显示更多地址*/
	showmoreadr:function(adrbtn){
	    $(adrbtn).find("a").text('收起更多地址');
	    $(adrbtn).toggle(
	    function(){
	  	    $(this).nextAll().slideUp('fast');
		    $(this).find("a").text('展开更多地址');
	    }
	    ,function(){
		    $(this).nextAll().slideDown('fast');
		    $(this).find("a").text('收起更多地址');
	    });
	},
	/*通用脚本 select模拟*/
	select_modle:function(selectshow, box, btn){
		/*经过 显示&收起*/
		$(selectshow).mouseenter(function(){
		    $(box).show();
		});
		$(selectshow).mouseleave(function(){
		    $(box).hide();
		});
		$(box).mouseenter(function(){
		    $(box).show();
		});
		$(box).mouseleave(function(){
		    $(box).hide();
		});
		/*选择之后 内容显示*/
		$(btn).click(function(){
		    var cont = $(btn).eq($(btn).index($(this))).html();
			$(selectshow).html(cont);
			$(box).hide();
		});
	},
	/*通用脚本 radio选中状态*/
	radio_checked:function(radiobtn){
		$(radiobtn).find(':input[@type=radio]').removeAttr("checked");
		$(radiobtn).find(':input[@type=radio]').eq(0).attr("checked","checked");
	},
	/*通用radio 控制不同div显示隐藏 （售后服务-商品信息.html 地址选择）*/
	tabclick_radio:function(btn,contbox){
		$(btn).removeAttr("checked");
		$(contbox).hide();
		$(btn).click(function(){
			$(contbox).hide().eq($(btn).index($(this))).show();
		});
	},
	/* 通用脚本 Tab页点击切换 （购物流程 > 订单状态; 频道页-服装;）*/
	tabclick:function(btn,contbox,cur){
		$(contbox).hide().eq(0).show();
		$(btn).click(function(){
			$(btn).removeClass(cur);
			$(this).addClass(cur);
			$(contbox).hide().eq($(btn).index($(this))).show();
		});
		},
		
	/* 通用脚本 点击 li列表，显示内容详情 （频道页-图书音像）*/
	click_showdetail:function(btn, boxlist, boxcont, cur){
		$(boxcont).hide().eq(0).show();
		$(boxlist).show().eq(0).hide();
		$(btn).click(function(){
			$(btn).removeClass(cur);
			$(this).addClass(cur);
			$(boxcont).hide().eq($(btn).index($(this))).show();
			$(boxlist).show().eq($(btn).index($(this))).hide();
		});
		},
	/*有滚动效果的TAB页 （频道页-图书音像）*/
	tabScroll:function(imgBox, btntab, btnone, btntwo, showbox, cur, d, n, speed){
		/*参数解释:
		imgBox:代表图片外层的DIV;
		btntab:tab页按钮;
		btnone:代表控制tab页向前滚动的按钮；
		btntwo:代表控制tab页向后滚动的按钮;
		showbox:代表相应tab页所对应的显示内容；
		cur:代表tab页选中的样式；
		d:代表每次移动的位移；
		n:代表所能在外面显示的li个数；
		speed:代表切换的速度；
		*/
		var imgBox=$(imgBox);
		var ul=imgBox.find("ul");
		var li=imgBox.find("li");
		var ulleft=ul.scrollLeft();
		var lilength=li.length;
		var cureq = 0;
		var d=72;
		var n=5;
		var speed=200;
		


        /*点击tab页显示相应内容*/
		$(btntab).click(function(){
			cureq = $(this).index();
		    $(btntab).removeClass(cur);
		    $(btntab).eq(cureq).addClass(cur);
            $(showbox).hide().eq(cureq).show();
		});


		/*点击向前、向后滚动按钮*/
		$(btnone).click(function(){
			if(ulleft <= -d*(lilength-n-1)){
			    ulleft=-d*(lilength-n-1);
				$(this).removeClass(cur).addClass(cur);
            }
			ul.animate({"left":ulleft-d+"px"}, speed);
			ulleft=ulleft-d;
			$(btntwo).removeClass(cur).addClass(cur);
			/*LI的选中状态控制*/
			if(cureq <= (lilength-n)){
				if(ulleft < -d*cureq){
					cureq = cureq+1;
					$(btntab).removeClass(cur);
					$(btntab).eq(cureq).addClass(cur);
					$(showbox).hide().eq(cureq).show();
				}
			};
		});

		/*点击向后滚动按钮*/
        $(btntwo).click(function(){
            if(ulleft >=0-d){
			    ulleft=-d;
				$(this).addClass(cur).removeClass(cur);
            }
			ul.animate({"left":ulleft+d+"px"}, speed);
			ulleft=ulleft+d;
			$(btnone).addClass(cur).removeClass(cur);
			/*LI的选中状态控制*/
			if(cureq >= n){
				if(ulleft > -d*(cureq-n+1)){
					cureq = cureq-1;
					$(btntab).removeClass(cur);
					$(btntab).eq(cureq).addClass(cur);
					$(showbox).hide().eq(cureq).show();
				}
			};
		});

		},
	
	/*个人中心-门店会员个人信息修改  点击修改，出现可编辑状态，再点保存*/
	uc_fixsave:function(fixbtn, inforbox, editipt){
		var vinfor = $(inforbox).text();
	    $(fixbtn).toggle(
			function(){
				$(this).text("取消");
				$(inforbox).hide();
				$(editipt).show().attr("value", vinfor);
			},
			function(){
				$(this).text("修改");
				$(editipt).hide();
				$(inforbox).show();
			});
	},
	/*商品详情-发表评论 推荐点*/
	push_point:function(ipt, point, closebtn, cur){
		$(ipt).val("");
		
		var apoint=$(point).find("a");
		var i=0;
		$(ipt).focus(function(){
			$(point).show();
			$(closebtn).click(function(){
			    $(point).hide();
			});
		});
		apoint.one("click", function(){
			if(i<3){
				var val=$(ipt).val();
				val += $(this).text() + " ";
				$(ipt).val(val);
				$(this).addClass(cur);
				i++;
			};	
		});
	},
	/*通用， 顶部广告收缩效果*/
	imgad:function(imgs, imgb, tbd, tbu, tsd, tstop){
		/*
		参数含义：
		imgs：小图片；
		imgb：大图片；
		tbd:大图展开时间；
		tbu：大图收起时间；
		tsd：小图展开时间；
		tstop：大图展示的停留时间；
		*/
		var imgs = $(imgs);
		var imgb = $(imgb);
		imgs.hide();
		imgb.hide();
		imgb.slideDown(tbd);
		setTimeout(function(){
			imgb.slideUp(tbu, function(){
				imgs.slideDown(tsd);})		
		}		
		, tstop) 
	},
	/*弹出层通用 同一页面多个相同弹出层 显示及关闭 （个人中心-客户服务-购买咨询.html）*/
	popupclick:function(btn, box, closebox, dtop, dleft){
		/*
		参数含义：
		btn:触发弹出层显示的按钮；
		box:弹出层的外框；
		closebox:关闭按钮外框；
		dleft:弹出层的left值；
		dtop:弹出层的top值；
		*/
		$(box).hide();
		$(btn).click(function(){
			var btntop = $(this).offset().top - dtop; 
			var btnleft = $(this).offset().left - dleft; 
		    $(box).show();
			$(box).css({top:btntop, left:btnleft});
		});
		$(closebox).click(function(){
		    $(box).hide();	
		});
	},
	/*弹出层通用 HOVER方法 同一页面多个相同弹出层 显示及关闭 （个人中心-客户服务-购买咨询.html）*/
	popuphover:function(btn, box, closebox, dtop, dleft){
		/*
		参数含义：
		btn:触发弹出层显示的按钮；
		box:弹出层的外框；
		closebox:关闭按钮外框；
		dleft:弹出层的left值；
		dtop:弹出层的top值；
		*/
		$(box).hide();
		$(btn).mouseenter(function(){
			var btntop = $(this).offset().top - dtop; 
			var btnleft = $(this).offset().left - dleft; 
		    $(box).show();
			$(box).css({top:btntop, left:btnleft});
		});
		$(box).mouseout(function(){
		    $(box).hide();	
		});
		$(closebox).click(function(){
		    $(box).hide();	
		});
	},
	/*弹出层通用 CLICK方法 同一页面多个相同弹出层 显示及关闭 （个人中心-客户服务-购买咨询.html）*/
	popupclick:function(btn, box, closebox, dtop, dleft){
		/*
		参数含义：
		btn:触发弹出层显示的按钮；
		box:弹出层的外框；
		closebox:关闭按钮外框；
		dleft:弹出层的left值；
		dtop:弹出层的top值；
		*/
		$(box).hide();
		$(btn).click(function(){
			var btntop = $(this).offset().top - dtop; 
			var btnleft = $(this).offset().left - dleft; 
		    $(box).show();
			$(box).css({top:btntop, left:btnleft});
		});
		$(closebox).click(function(){
		    $(box).hide();	
		});
	},
	/*弹出层通用 CLICK方法 同一页面多个相同弹出层 显示及关闭 （个人中心-客户服务-购买咨询.html）*/
	popuphoverclose:function(btn, box, closebox, dtop, dleft){
		/*
		参数含义：
		btn:触发弹出层显示的按钮；
		box:弹出层的外框；
		closebox:关闭按钮外框；
		dleft:弹出层的left值；
		dtop:弹出层的top值；
		*/
		$(box).hide();
		$(btn).mouseenter(function(){
			var btntop = $(this).offset().top - dtop; 
			var btnleft = $(this).offset().left - dleft; 
		    $(box).show();
			$(box).css({top:btntop, left:btnleft});
		});
		$(closebox).click(function(){
		    $(box).hide();	
		});
	},
	/*会员中心 点查看弹出下一行（tr）的蓝色信息框*/
	uc_bluebox:function(btn, boxclose, trbox){
		$(btn).parents("tr").next(trbox).hide();
	    $(btn).click(function(){
		    $(this).parents("tr").next(trbox).show();
		});
		$(boxclose).click(function(){
		    $(this).parents(trbox).hide();
		});
	},
	/*通用 select判断value值来控制对应div的隐藏显示*/
	select_boxsh:function(selectbtn, selectbox){
		var i = $(selectbtn).find("option:selected").val();
		$(selectbox).hide().eq(i).show();
		$(selectbtn).change(function(){
			var n = $(this).val();
			$(selectbox).hide().eq(n).show();
		});
	},
	/*通用 输入框清空和还原*/
	valnone:function(id,text){
	    $(id).focus(function(){
		    $(this).val("");
		});	
		 $(id).blur(function(){
		    $(this).val(text);
		});	
	},
	/*通用 radio 控制一个DIV时判断DIV是否显示*/
	radion_onediv:function(theradio, thebox, box, cur){
		function sfsh(){
			var selected = $(theradio).attr("checked");
			if(selected == undefined){
				$(thebox).hide();
				$(theradio).parent().removeClass(cur);
			}
			else{
				$(thebox).show();
				$(theradio).parent().addClass(cur);
			}
		};
		sfsh();
		$(box).find("input").click(function(){
			sfsh();
		});
	},
	/*通用radio控制div切换*/
	radio_tabclick:function(rtbtn, rtbox, rtcur){
		$(rtbtn).removeAttr("checked").eq(0).attr("checked","checked");
		$(rtbox).hide().eq(0).show();
	    $(rtbtn).click(function(){
			var i = $(rtbtn).index($(this));
		    $(rtbox).hide().eq(i).show();
			$(rtbtn).parent().removeClass(rtcur).eq(i).addClass(rtcur);
		});
	},
	/*个人头像 点击小图，显示大图*/
	pic_smalltobig:function(imgboxs, imgboxb, cur){
		/*
	    参数含义：
		imgboxs:所有小图标的最外层；
		imgboxb：大图的最外层；
		cur:小图外层的li的样式；
		*/
		var li = $(imgboxs).find("li");
		var imgs = $(imgboxs).find("img");
		var imgb = $(imgboxb).find("img");
		li.removeClass(cur).eq(0).addClass(cur);
		li.click(function(){
			var i = li.index($(this));
			li.removeClass(cur).eq(i).addClass(cur);
			var srcs = imgs.eq(i).attr("src");
			var srcbarray = srcs.split("_");
			var srcbname = srcbarray[0];
			var srcb = srcbname + ".jpg";
			imgb.attr("src", srcb);
		});
	},
	/*个人中心-收藏夹 编辑分类*/
	uc_editkinds:function(hbtn, cbtn, editbox, offbtn){
		$(hbtn).each(function(m){
			$(cbtn).hide();
			$(editbox).hide();
			var n = 0;
			$(cbtn).eq(m).click(function(){
				var i = $(cbtn).index($(this));
				$(editbox).eq(i).show();
				$(cbtn).eq(i).hide();
				n = 1;
			});
			$(hbtn).eq(m).hover(
				function(){
					if(n==0){
						$(this).find(cbtn).show();
					}else{
						$(this).find(cbtn).hide();
						}
				},
				function(){
					$(this).find(cbtn).hide();
				}
			);
			$(offbtn).eq(m).click(function(){
				var j = $(offbtn).index($(this));
				$(editbox).eq(j).hide();
				n = 0;	
			});
	    });
	},
	/*点出按钮控制两个DIV*/
	btntwodiv:function(btn,box,box2){
		$(box).eq(1).hide();
	    $(btn).click(function(){
			$(box).eq(0).hide();
			$(box).eq(1).show();
			$(box2).hide();
		});
	}
};
/***********************************/
var lhh = {
	/* 通用脚本 （展开全部） （购物流程 > 订单状态） */
	openlist:function(openlink,openbox,num){
		var openbox = $(openbox).children().eq(num).nextAll();
		openbox.hide();
		$(openlink).click(function(){
			openbox.show();
			return false;
		});
	},
	/*通用脚本 （框焦点状态） （）*/
	focushighlight:function(focusdom,cur){
		$(focusdom).focus(function(){
			$(this).addClass(cur);
		});
		$(focusdom).blur(function(){
			$(this).removeClass(cur);
		});
	},
	/* 通用脚本 层显示与隐藏-层居中弹出，背景遮罩 (购物流程 > 订单提交成功 （企业网银）+ 立即支付（企业网银）)*/
	layerShow:function (ev, layerName) {
		
		var isIE = $.browser.msie && !$.support.opacity,
		isIE6 = isIE && $.browser.version < 7;
		if (!$("#Overlay").length > 0) {
			if (!isIE6) {
				$("body").append("<div id='Overlay' style='background:#000;cursor: pointer;display: block;filter:alpha(opacity=60);opacity: 0.6;height:100%;width:100%; position: fixed; left: 0;top: 0;z-index:9999998'></div>")
			}
			else {
				$("html").css({"height": "100%"});
				$("body").css({"height": "100%"});
				$("body").append("<div class='overlay' id='Overlay'><iframe  frameborder=0 id='frame1' style='filter:alpha(opacity=10);opacity: 0.6;height:100%;width:100%;'></iframe></div>")
			}
		}
		/* 实现弹出 */
		$("#Overlay").show();
		var od = $("#" + layerName);
		var itop = (document.documentElement.clientHeight - od.height()) / 2;
		var ileft = (document.documentElement.clientWidth - od.width()) / 2;
		if (!isIE6) {
			od.css("top", itop).css("left", ileft).css("position", "fixed").css("z-index","9999999").show();
		}
		else {
			od.css("position", "absolute").show();
			od.addClass("chagetop");
		}
	},
	closeLayer:function (layerName) {
		$("#" + layerName).hide();
		$("#Overlay").hide();
	},/*关闭*/
	/*通用脚本 （鼠标hover子集添加Class） （首页）*/
	hover:function(hoverpraent,hover){
		$(hoverpraent).children().hover(function(){
			$(this).addClass(hover);
		},function(){
			$(this).removeClass(hover);
		});
	},
	/*通用脚本 （鼠标hover自身添加Class） （首页）*/
	hoverself:function(hoverpraent,hover){
		$(hoverpraent).hover(function(){
			$(this).addClass(hover);
		},function(){
			$(this).removeClass(hover);
		});
	},
	/*通用脚本 （鼠标hover添加Class移除其他目标上的class,鼠标离开，保留当前目标上的class） （首页）*/
	hoverkeep:function(hoverpraent,hover){
		$(hoverpraent).children().hover(function(){
			$(this).parent().children().removeClass(hover);
			$(this).addClass(hover);
		});
	},
	/*通用脚本 （鼠标经过时目标显示，自身添加Class，从自身离开时，目标不变；从目标上离开时目标隐藏）（首页）*/
	clickshow:function(hoverlink,hover,hideField){
		$(hideField).hide();
		$(hoverlink).click(function(){
			if($(hideField).is(":hidden")){
			$(this).addClass(hover);
			$(hideField).show();
			}else{
				$(this).removeClass(hover);
				$(hideField).hide();
			};
			});
		$(hideField).mouseleave(function(){
			$(hideField).fadeOut();
			$(hoverlink).removeClass(hover);
		});
	},
	/*通用脚本（鼠标经过时目标显示，目标添加Class，从身离开时，目标不变；从目标上离开时移除class）（首页）*/
	clickparentadd:function(hoverlink,hoverparent,hover,hideField){
		$(hoverlink).click(function(){
				
				if($(this).parent().parent().hasClass(hover)){
					$(this).parent().parent().removeClass(hover);
					return false;
				}else{
					$(hoverparent).removeClass(hover);
					$(this).parent().parent().addClass(hover);
					return false;
					}
			}
			);
			$(hideField).mouseleave(function(){
				$(this).parent().removeClass(hover);
			});
	},
	/*通用脚本 (当内容大于一定高度时，出现y轴滚动条) （首页-购物车）*/
	overflowyauto:function(warp,heightbox,num){
		var currentHeight = $(warp).height();
		if(currentHeight>=num){
			$(heightbox).css({'overflow-y':'auto','height':num-90})
		};
	},
	/*通用脚本 (根据分辨率大小切换图片路径) （首页-广告图）*/
	replaceImg:function(adsimg,name){
		//var winWidth = $(window).width();
		var winWidth = (screen.width);
		var Vimg = $(adsimg).find("img")
		Vimg.each(function(){
		/*if (winWidth <= 1024) {
			 var adsimgUrl =$(this).attr("src");
			 var imgname = adsimgUrl.substring(ednnum);
			 var Filefront = adsimgUrl.substring(0,ednnum);
			$(this).attr("src",Filefront+name+"/"+imgname);
			}else{
			$(this).attr("src",adsimgUrl);
			};*/
		var newAttr = "src"; 
       	var adsimgUrl =$(this).attr("src");
       	if(adsimgUrl.indexOf("grey.gif")!=-1){
           newAttr = "gome-src";
           adsimgUrl =$(this).attr("gome-src");
       	};
       	if(winWidth<=1024){
           var n=adsimgUrl.lastIndexOf(".");
           var newStr=adsimgUrl.substring(0,n)+"_s"+adsimgUrl.substring(n);
           $(this).attr(newAttr,newStr);
           };
       	});
	},
	/*通用脚本(返回顶部) （首页）*/
	backtop:function (sidefloatbox,fixbox,backlink) {
		if(screen.width<=1024){
			offside=1;
			}
		else{
			var offside = ($(sidefloatbox).offset().left)-($(fixbox).outerWidth());
			}
		$(fixbox).css("right",offside-1);
		var top =$(window).scrollTop();
		if(top>0){
			$(fixbox).show();
		};
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$(fixbox).show();
			} else {
				$(fixbox).hide();
			};
		});
		$(backlink).find("a").click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 100);
			return false;
		});
	},
	/*通用脚本(返回顶部) （首页）*/
	fixedend:function (positionbox,fixbox,fixboxparent,fixedclass,num) {
		/*
		positionbox:欲停留的位置；
		fixbox:浮动的元素；
		fixboxparent:浮动的元素的父级；
		fixedclass：fixed clacss name；
		num:fixbox距离底部的值；
		*/
		var Thefixbox=$(fixbox);
		var Thepositionbox=$(positionbox);
		var Thefixboxparent=$(fixboxparent);
		var offtop=Thepositionbox.offset().top;
		var windowH=$(window).height();
		var fixboxH=Thefixbox.innerHeight();
		var endtop = offtop-windowH+fixboxH+num;
		var n=0;
		function fixedscroll() {
			var top =$(window).scrollTop();
			if (top >=endtop) {
				Thefixbox.removeClass(fixedclass);
					if(n==0){
						Thefixboxparent.hide();
						Thefixbox.clone().appendTo(positionbox);
					n=1;
					};
			} else {
				Thefixbox.addClass(fixedclass);
				Thepositionbox.empty();
				Thefixboxparent.show();
				n=0;
			};
		};
		fixedscroll();
		$(window).scroll(fixedscroll);
	},
	/*通用脚本（文本输入框获得焦点时，提示隐藏，输入框背景变化）（登录 注册）*/
	textfocus:function(textfocus,cur){
		var tip = $(textfocus).siblings("label");
		$(tip).click(function(){
			$(this).hide();
			$(this).siblings("input").focus();
		});
		$(textfocus).focus(function(){
			$(this).parent().addClass(cur);
			$(this).siblings("label").hide();
		});
		$(textfocus).blur(function(){
			$(this).parent().removeClass(cur);
			if(this.value==""){
				$(this).siblings("label").show();
			};
		});
	},
	/*通用脚本（文本输入框获得焦点时，输入框背景变化）（0元购机）*/
	onlytextfocus:function(textfocus,cur){
		$(textfocus).focus(function(){
			$(this).addClass(cur);
		});
		$(textfocus).blur(function(){
			$(this).removeClass(cur);
		});
	},
	/*通用脚本（倒计时）（首页）*/
	countdown:function(countdom){
		/*countdom:倒计时容器；
		  time：倒计时时间
		*/
		var count = $(countdom).text();
		  countdown = setInterval(function(){
		    $(countdom).html(count);
			count--;
		    if (count < 0) {
				clearTimeout(countdown)
		      window.location = 'http://gome.com.cn';
		    }
		  }, 1000);
	},
	/*通用脚本（邮箱后缀补全）（首页）*/
	emailsuffix:function(inputval,suffixlist){
		/*inputval:用户输入的input；
		  suffixlist：邮箱后缀列表
		*/
		var i=-1;
		var suffix = ["163.com","126.com","sina.com","QQ.com","hotmail.com"]
		$(inputval).keyup(function(){
			var val = $(inputval).val();
			var prefix = (val.indexOf('@') != -1) ? val.split('@')[0] : val;
			$(suffixlist).empty();
			$(suffixlist).show();
			for(var i=0;i<suffix.length;i++){
				var semail = prefix + "@" + suffix[i];
				if (semail.indexOf(val) != -1) {
				   $(suffixlist).show().append("<li>" + semail + "</li>");
				}
			};
			$(suffixlist).find("li").hover(function(){
				$(suffixlist).find("li").removeClass("hover");
				$(this).addClass("hover");
			},function(){
				$(this).removeClass("hover");
			});
			$(suffixlist).find("li").click(function(){
				$(inputval).siblings("label").hide();
				var allval = $(this).text();
				$(inputval).val(allval);
				$(suffixlist).empty().hide();
			});
		});
		function keydownval(){
			var li=$(suffixlist).find("li");
			li.removeClass("hover");
				i++;
				li.eq(i).addClass("hover");
			if(i == li.length-1){
				i=-1;
			};
		};
		function keyupval(){
			var li=$(suffixlist).find("li");
			if(i == -1){
				i=li.length-1;
				li.eq(i).addClass("hover");
			}
			else{
				li.removeClass("hover");
				i--;
				li.eq(i).addClass("hover");
			}
		};
		$(inputval).keyup(function(event){
			event=event||window.event;
			switch(event.keyCode)
				{
					case 38:keyupval();break; 
					case 40:keydownval();break; 
					case 13:enterval();break; 
					}
			});
		function enterval(){
			var allval = $(suffixlist).find("li").eq(i).text();
			$(inputval).val(allval);
			$(suffixlist).empty().hide();
		};
		$(document).click(function(){
			$(suffixlist).empty().hide();
		});
	},
	/*导航当前栏目高亮显示 （cps）*/
	currentnav:function(nav,cur){
		/*
		nav:导航ID；
		cur：添加class名；
		*/
		var myNav = $(nav).find("a");
		for (var i=0;i<myNav.length;i++){
			var links = myNav.eq(i).attr("href");
			var myURL = document.location.href;
			if(myURL.indexOf(links) != -1){
				myNav.eq(i).parent("li").addClass(cur);
			};
		};
	},
	/*第一个和最后一个添加class名first，last(首页)*/
	firstlast:function(name,firstclass,lastclass){
		/*
		name:元素id；
		firstclass：firstclass名；
		lastclass：lastclass名；
		*/
		$(name).each(function() {
			var nameObj = $(this).children();
			$(nameObj).first().addClass(firstclass);
			$(nameObj).last().addClass(lastclass);
		});
	},
	/*排序 （列表页）*/
	listsort:function(sortlink,cur,lift,b){
		$(sortlink).click(function(){
			var leftWidth = ($(this).width()-$(b).width())/2-5;
			$(sortlink).removeClass(cur);
			$(this).addClass(cur);
			$(b).css("left",leftWidth)
			return false;
		});
	},
	/*仅横向滚动（服装列表页）*/
	horizontalScroll:function(scrollbox,btnl,btnr,curID,next,curl,cur,num,movenum){
		/*
		scrollbox:滚动的列表所在ul;
		btnl:左滚按钮；
		btnr:右滚按钮；
		curID：当前显示的最后一个li位置；
		next:为curID添加的同名去掉".";
		cur:按钮激活的类名；
		curl:左侧按钮当前（防IE6）；
		*/
		var n = 0;
		var m = 0;
		var removing = ($(scrollbox).find("li").innerWidth())*movenum;
		var liLength = $(scrollbox).find("li").length/movenum;
		$(btnl).removeClass(curl);
		$(btnr).addClass(cur);
		
		$(btnl).click(function(){
			if(m!=0){
				n -= removing;
				$(scrollbox).stop(true,false).animate({left:-n},500);
				m -=1;
				if(m==0){$(btnl).removeClass(curl);}else{$(btnr).addClass(cur)};
			};
			return false;
		});
		
		$(btnr).click(function(){
			if(m <liLength-1){
				n += removing;
				$(scrollbox).stop(true,false).animate({left:-n},500);
				m+=1;
				if(m>=liLength-1){$(btnr).removeClass(cur);}else{$(btnl).addClass(curl)};
			};
			return false;
		});
	},
	/*点击左右滚动*/
	clickscrollstep:function(scrolparent,scrollbox,clbtnp,clbtnn,curnum,allnum,move,cur,space){
		/*
		scrolparent:滚动的父级；
		scrollbox：滚动的元素本身；
		clbtnp：前一个按钮；
		clbtnn：后一个按钮；
		curnum：当前页数；
		allnum：总共页数；
		move：设置为0，则移动父级的宽度；设置其他数值则为自定义移动个数；
		cur：按钮当前状态控制的class；
		space:两个元素间的间距，用于弥补移动产生的误差；
		*/
		$(scrolparent).each(function() {
			var thisscrollbox = $(this).find(scrollbox);
			var thisboxchildren = thisscrollbox.children();
			var thisboxParent=thisscrollbox.parent();
			var thischildrenlength = thisboxchildren.length;
			var thischildrenWidth = thisscrollbox.children().innerWidth()+space;
			var thisscrollboxWidth = thischildrenWidth*thischildrenlength;
			if(move!=0){
				var moving = thischildrenWidth*move;
				thismove = move;
			}else{
				var moving = thisboxParent.width();
				var thismove = Math.round(moving/thischildrenWidth);
			};
			var thisclbtnp = $(this).find(clbtnp);
			var thisclbtnn = $(this).find(clbtnn);
			var thiscurnum = $(this).find(curnum);
			var thisallnum = $(this).find(allnum);
			var allnumtext = Math.ceil((thisboxchildren.length)/thismove);
			var m=1;
			var n=0;
			thisallnum.text(allnumtext);
			/*thisscrollbox.css("width",thisscrollboxWidth);*/
			thisclbtnp.addClass(cur);
			if(m==allnumtext){
				thisclbtnn.addClass(cur);
			};
			thisclbtnp.click(function(){
				if(m!=1){
					m-=1;
					n-=moving;
					thiscurnum.text(m);
					thisclbtnn.removeClass(cur);
					thisscrollbox.stop(true,false).animate({left:-n},500);
					if(m==1){
						thisclbtnp.addClass(cur);
					};
				};
			});
			thisclbtnn.click(function(){
				if(m<allnumtext){
					m+=1;
					n+=moving;
					thiscurnum.text(m);
					thisclbtnp.removeClass(cur);
					thisscrollbox.stop(true,false).animate({left:-n},500);
					if(m>=allnumtext){
						$(this).addClass(cur);
					};
				};
			});
		});
	},
	/*左右自动+点击滚动*/
	clickandautoscrollstep:function(scrolparent,scrollbox,clbtnp,clbtnn,curnum,allnum,move,cur,space,speed){
		/*
		scrolparent:滚动的父级；
		scrollbox：滚动的元素本身；
		clbtnp：前一个按钮；
		clbtnn：后一个按钮；
		curnum：当前页数；
		allnum：总共页数；
		move：设置为0，则移动父级的宽度；设置其他数值则为自定义移动个数；
		cur：按钮当前状态控制的class；
		space:两个元素间的间距，用于弥补移动产生的误差；
		speed：滚动速度；
		*/
			var thisscrollbox = $(scrolparent).find(scrollbox);
			var thisboxchildren = thisscrollbox.children();
			var thisboxParent=thisscrollbox.parent();
			var thischildrenlength = thisboxchildren.length;
			var thischildrenWidth = thisscrollbox.children().innerWidth()+space;
			var thisscrollboxWidth = thischildrenWidth*thischildrenlength;
			if(move!=0){
				var moving = thischildrenWidth*move;
				thismove = move;
			}else{
				var moving = thisboxParent.width();
				var thismove = Math.round(moving/thischildrenWidth);
			};
			var thisclbtnp = $(scrolparent).find(clbtnp);
			var thisclbtnn = $(scrolparent).find(clbtnn);
			var thiscurnum = $(scrolparent).find(curnum);
			var thisallnum = $(scrolparent).find(allnum);
			var allnumtext = Math.ceil((thisboxchildren.length)/thismove);
			var m=1;
			var n=0;
			/*初始化*/
			thisallnum.text(allnumtext);
			thisscrollbox.css("width",thisscrollboxWidth);
			thisclbtnp.addClass(cur);
			if(m==allnumtext){
				thisclbtnn.addClass(cur);
			};
			/*前一个按钮点击*/
			thisclbtnp.click(function(){
				if(m!=1){
					m-=1;
					n-=moving;
					thiscurnum.text(m);
					thisclbtnn.removeClass(cur);
					thisscrollbox.stop(true,false).animate({left:-n},500);
					if(m==1){
						thisclbtnp.addClass(cur);
					};
				};
			});
			/*下一个按钮点击*/
			thisclbtnn.click(function(){
				if(m<allnumtext){
					m+=1;
					n+=moving;
					thiscurnum.text(m);
					thisclbtnp.removeClass(cur);
					thisscrollbox.stop(true,false).animate({left:-n},500);
					if(m>=allnumtext){
						$(this).addClass(cur);
					};
				};
			});
			/*自动滚动*/
			function autoscrollstep(){
				m+=1;
				n+=moving;
				if(m>allnumtext){
					n-=moving*m;
					m=1;
					n=0
				};
				thiscurnum.text(m);
				thisclbtnp.removeClass(cur);
				thisclbtnn.removeClass(cur);
				thisscrollbox.stop(true,false).animate({left:-n},500);
				if(m>=allnumtext){
					thisclbtnn.addClass(cur);
				}else if(m==1){
					thisclbtnp.addClass(cur);
				};
			};
			var timer2=setInterval(autoscrollstep,speed);
			/*清除滚动*/
			function stepscrollstep(){
				thisboxchildren.hover(function(){
					clearInterval(timer2);
				},function(){
					timer2=setInterval(autoscrollstep,speed);
				});
				thisclbtnn.hover(function(){
					clearInterval(timer2);
				},function(){
					timer2=setInterval(autoscrollstep,speed);
				});
				thisclbtnp.hover(function(){
					clearInterval(timer2);
				},function(){
					timer2=setInterval(autoscrollstep,speed);
				});
			};
			stepscrollstep();
	},
	/*阻止链接跳转*/
	returnfalse:function(links){
		$(links).click(function(){
			return false;
		});
	},
	/*通用脚本 （鼠标经过时目标显示，自身添加Class，从自身离开时，目标不变；从目标上离开时目标隐藏）（首页）*/
	clicknextshow:function(hoverlink,hover,hideField,hidelink,parents){
		$(hideField).hide();
		var hoverlink=$(hoverlink);
		hoverlink.click(function(){
			if($(hideField).is(":hidden")){
			$(this).parent().addClass(hover);
			$(this).siblings(hideField).show();
			var offside = $(this).offset().left-$(parents).offset().left;
			var rightval = $(this).parent().innerWidth()-$(this).innerWidth()-2;
			if(offside>300){
				$(this).next().css({right:rightval,left:"auto"});
			};
			}else{
				$(this).parent().removeClass(hover);
				$(this).siblings(hideField).hide();
			};
			});
		hoverlink.not($(hidelink)).hover(
			function(){},
			function(){
				$(hideField).hide();
				hoverlink.parent().removeClass(hover);
			}
		);
		$(hideField).hover(function(){
			$(this).parent().addClass(hover);
			$(this).show();
		},function(){
			$(this).hide();
			hoverlink.parent().removeClass(hover);
		});
		$(hidelink).click(function(){
			$(parents).hide();
		});
	},
	/*点击后目标添加class （我的国美-sidenav）*/
	clickadd:function(links,cur){
		$(links).click(function(){
			if($(this).parent().hasClass(cur)){
				$(this).parent().removeClass(cur);
			}else{
				$(this).parent().addClass(cur);
			};
		});
	},
	/*hover延迟 （团购更多城市）*/
	laterhover:function(alink,hover,time){
	/*alink:链接；
	hvoer:a:hover添加的class名；
	time：延迟时间；
	*/
	$(alink).hover(function(){
		var thislink = $(this)
			function leater(){
				thislink.addClass(hover);
			}      
			timer=setTimeout(leater,time);
		},function(){
			$(this).removeClass(hover)
			clearTimeout(timer);
		});	
	},/*添加class （首页楼层tab）*/
	classadd:function(obj,name){
	/*obj:添加的目标；
	name:class名；
	*/
		$(obj).addClass(name);
	},
	/*延迟加载图片（首页-菜单）*/
	hoverloadingimg:function(hoverobj,imgbox){
		$(hoverobj).one("mouseover",function(){
			$(this).find("img").each(function(){
			   this.src = $(this).attr("gome-src"); 
			   $(this).removeAttr("gome-src");
			});	
		});
	},
	/*延迟加载图片（首页-套购）*/
	hoverloadingimg1:function(hoverobj,imgbox){
		$(hoverobj).one("mouseover",function(){
			$(imgbox).find("img").each(function(){
			   this.src = $(this).attr("gome-src"); 
			   $(this).removeAttr("gome-src");
			});	
		});
	},
	/*DOM完成后加载图片（首页-首屏广告图片）*/
	readyimg:function(img,time){
		function imglater(){
		$(img).find("img").each(function(){
		   this.src = $(this).attr("gome-src"); 
		   $(this).removeAttr("gome-src");
		});	
		};
		setTimeout(imglater,time);
	},
	/*延迟加载图片（首页-焦点图-为您推荐）*/
 laterloading:function(main,titleli,speed,imgHoverBox2,imgHover){
	 /*
	 参数含义：
	 main：图片外层，此处为包着图片的ul样式;
	 titleli:触发按钮的外层，此处为包着按钮的ul样式；
	 speed:图片自动切换速度；
	 imgHoverBox2：
	 imgHover：
	 */
	 
	
	var lxfscroll = $(main);
	var ul = lxfscroll;
	var li = lxfscroll.find("li");
	var tli = $(titleli);
	var cutspeed = 300;//手动切换的速度
	var autospeed = speed;//自动播放的速度
	var n = 0;
	var imgwidth = li.width();//获取图片宽度
	var lilength = li.length;//获取图片数量
	lxfscroll.width((lilength+1)*imgwidth); //使得图片的UL的宽度等于图片的个数乘以单个图片的宽度
	var timer;
	
	li.eq(0).find("img").each(function(){
		this.src = $(this).attr("gome-src"); 
		$(this).removeAttr("gome-src");
	});	
	li.eq(0).clone().appendTo(ul);
	/* 标题按钮事件 */
	function hoverscroll() {
		tli.mouseenter(function(){
			var index = tli.index($(this));
			var lipoint = index*imgwidth;
			tli.removeClass("cur");
			$(this).addClass("cur");
			ul.stop(true,false).animate({"left":-lipoint+"px"},cutspeed);
			/*gome-src替换*/
			var hoverjudge = li.eq(index).find("img").attr("gome-src");
			if(index > 0 && hoverjudge != undefined){
				li.eq(index).find("img").each(function(){
				   this.src = $(this).attr("gome-src"); 
				   $(this).removeAttr("gome-src");
				});	
			}
			});
	};
	/* 自动轮换 */
	function autoroll() {
		/*最后一个回到第一个的时候*/
		if(n >= lilength+1) {
			tli.removeClass("cur").eq(0).addClass("cur"); 
			ul.stop(true,false).css({left:"0px"});
			n = 1;
		};
		
		/*gome-src替换*/
		var scrolljudge = li.eq(n).find("img").attr("gome-src");
		if(n > 0 && scrolljudge != undefined){
			li.eq(n).find("img").each(function(){
			   this.src = $(this).attr("gome-src");
			   $(this).removeAttr("gome-src"); 
			});	
		}
		
		
		var lipoint = n*imgwidth;
		ul.stop(true,false).animate({"left":-lipoint+"px"},cutspeed);
		tli.removeClass("cur").eq(n).addClass("cur");
		if(n >= lilength){
			tli.removeClass("cur").eq(0).addClass("cur"); 
		};
		n++;
		timer = setTimeout(autoroll, autospeed);
			};
	/* 鼠标悬停即停止自动轮换 */
	function stoproll() {
		li.hover(function() {
			clearTimeout(timer);
			n = $(this).prevAll().length+1;
		}
		, function() {
			timer = setTimeout(autoroll, autospeed);
		});
		tli.hover(function() {
			clearTimeout(timer);
			n = $(this).prevAll().length+1;
		}
		, function() {
			timer = setTimeout(autoroll, autospeed);
		});
	};
	/*多张图片时，鼠标移动到图片上，图片透明*/
	var slideLi=$("#js-slide-imgBox").find("li");
	slideLi.each(function(i){
		var slideLIa=$(this).find("a");
		/*创建覆盖层*/
		var imgHoverBox=$("<span class='imgHoverBox'></span>");
		if(slideLIa.length>1){
			slideLi.eq(i).find("a").append(imgHoverBox);
			$(".imgHoverBox").addClass("imgHover");
			/*让span的宽高等于图片的宽高*/
			for(var m=0;m<slideLi.find(".imgHoverBox").length;m++){
				var imgHoverBoxIndex=$(".imgHoverBox").eq(m);
				imgHoverBoxIndex.width(imgHoverBoxIndex.parents("div").width()).height(imgHoverBoxIndex.parents("div").height());
				}	
			slideLIa.each(function(){
				$(this).hover(
					function(){
				  		slideLi.eq(i).find(".imgHoverBox").removeClass("imgHover");
						$(this).find(".imgHoverBox").addClass("imgHover");
						clearTimeout(timer);
							},
					function(){
						//slideLi.eq(i).find(".imgHoverBox").addClass("imgHover");
						//slideLi.eq(i).find(".imgHoverBox").removeClass("imgHover");
						}
					);
				});
		}
	lxfscroll.mouseleave(function(){
		$(this).find(".imgHoverBox").addClass("imgHover");
		});
	});
	hoverscroll();
	autoroll();//启动自动播放功能
	stoproll();//启动鼠标悬停功能
	},
	/*隐藏显示 （0元购机）*/
	hideshow:function(clickbtn,content,cur){
		/*
		clickbtn:点击按钮；
		content：显示的内容；
		cur:class；
		*/
		var contentbox =$(content);
		$(clickbtn).click(function(){
			if(contentbox.is(":hidden")){
				contentbox.show();
				$(this).addClass(cur);
			}else{
				contentbox.hide();
				$(this).removeClass(cur);
			};
		});
	},
	/*radio、checkbox选中状态,此行添加class后控制背景变色等效果 （0元购机）*/
	inputcheck:function(box,input,cur){
		/*
		box:radio、checkbox所在行；
		input:radio、checkbox；
		cur:class；
		*/
		$(box).each(function() {
			var thisInput =$(this).find(input);
			var thisContent =$(this);
			if(thisInput.is(":checked")){
				thisContent.addClass(cur);
			}else{
					thisContent.removeClass(cur);
			};
			thisInput.click(function(){
				$(box).removeClass(cur);
				if(thisInput.is(":checked")){
					thisContent.addClass(cur);
				}else{
					thisContent.removeClass(cur);
				};
			});
		});
	},
	/*checkbox选中状态,目标显示（0元购机）*/
	checkshow:function(input,content,cur){
		/*
		input:radio、checkbox；
		content:要显示的内容；
		cur:class；
		*/
			var thisInput =$(input);
			var thisContent =$(content);
			if(thisInput.is(":checked")){
				thisContent.show();
			}else{
				thisContent.hide();
			};
			thisInput.click(function(){
				if(thisInput.is(":checked")){
					thisContent.show();
				}else{
					thisContent.hide();
				};
			});
	},
	checktabshow:function(label,content,cur){
		/*
		label:radio、checkbox所在的label；
		content:要显示的内容；
		cur:class；
		*/
			$(label).find("input").removeAttr("checked").eq(0).attr("checked","checked");
			$(content).hide().eq(0).show();
			$(label).click(function(){
				$(content).hide();
					var i =$(this).index();
					$(content).eq(i).show();
			});
	},
	autohide:function(btn,content,time){
		/*
		btn:控制隐藏的按钮；
		content：显示的内容；
		time:停留时间；
		*/
		var thecontent = $(content);
		$(btn).click(function(){
			thecontent.show();
			function hidelater(){
				thecontent.fadeOut("slow");
			};
			setTimeout(hidelater,time);
		});
	},
	/*更换文字*/
	changetexthide:function(clickbtn,content,cur,textbox,defaulttext,changetext){
		/*
		clickbtn:点击按钮；
		content：显示的内容；
		cur:class；
		textbox:文字区域；
		defaulttext：初始文字；
		*/
		var contentbox =$(content);
		$(clickbtn).click(function(){
			if(contentbox.is(":hidden")){
				contentbox.show();
				$(this).addClass(cur).find(textbox).text(changetext);
			}else{
				contentbox.hide();
				$(this).removeClass(cur).find(textbox).text(defaulttext);
			};
		});
	},
	addrselect:function(selectgroup,addrbox){
		$(selectgroup).change(function(){
			var thistext=$(this).find('option:selected').text();
			$(addrbox).text(thistext);
		});
	}
};
/***********************************/
var xdm = {
	/*通用脚本（轮播）（首页）*/
 Scroll:function(main,titleli,speed,imgHoverBox2,imgHover){
	var lxfscroll = $(main);
	var ul = lxfscroll;
	var li = lxfscroll.find("li");
	var tli = $(titleli);
	var cutspeed = 300;//切换的速度
	var autospeed = speed;//自动播放的速度
	var n = 0;
	var imgwidth = li.width();//获取图片宽度
	var lilength = li.length;//获取图片数量
	lxfscroll.width((lilength+1)*imgwidth); //使得图片的UL的宽度等于图片的个数乘以单个图片的宽度
	var timer;
	li.eq(0).clone().appendTo(ul);
	/* 标题按钮事件 */
	function hoverscroll() {
		tli.mouseenter(function(){
			var index = tli.index($(this));
			var lipoint = index*imgwidth;
			tli.removeClass("cur");
			$(this).addClass("cur");
			ul.stop(true,false).animate({"left":-lipoint+"px"},cutspeed);
		});
	};
	/* 自动轮换 */
	function autoroll() {
		/*最后一个回到第一个的时候*/
		if(n >= lilength+1) {tli.removeClass("cur").eq(0).addClass("cur"); ul.stop(true,false).css({left:"0px"});n = 1;};
		var lipoint = n*imgwidth;
		ul.stop(true,false).animate({"left":-lipoint+"px"},cutspeed);
		tli.removeClass("cur").eq(n).addClass("cur");
		if(n >= lilength){tli.removeClass("cur").eq(0).addClass("cur"); };
		n++;
		timer = setTimeout(autoroll, autospeed);
			};
	/* 鼠标悬停即停止自动轮换 */
	function stoproll() {
		li.hover(function() {
			clearTimeout(timer);
			n = $(this).prevAll().length+1;
		}
		, function() {
			timer = setTimeout(autoroll, autospeed);
		});
		tli.hover(function() {
			clearTimeout(timer);
			n = $(this).prevAll().length+1;
		}
		, function() {
			timer = setTimeout(autoroll, autospeed);
		});
	};
	/*多张图片时，鼠标移动到图片上，图片透明*/
	var slideLi=$("#js-slide-imgBox").find("li");
	slideLi.each(function(i){
		var slideLIa=$(this).find("a");
		/*创建覆盖层*/
		var imgHoverBox=$("<span class='imgHoverBox'></span>");
		if(slideLIa.length>1){
			slideLi.eq(i).find("a").append(imgHoverBox);
			$(".imgHoverBox").addClass("imgHover");
			/*让span的宽高等于图片的宽高*/
			for(var m=0;m<slideLi.find(".imgHoverBox").length;m++){
				var imgHoverBoxIndex=$(".imgHoverBox").eq(m);
				imgHoverBoxIndex.width(imgHoverBoxIndex.parents("div").width()).height(imgHoverBoxIndex.parents("div").height());
				}	
			slideLIa.each(function(){
				$(this).hover(
					function(){
				  		slideLi.eq(i).find(".imgHoverBox").removeClass("imgHover");
						$(this).find(".imgHoverBox").addClass("imgHover");
						clearTimeout(timer);
							},
					function(){
						//slideLi.eq(i).find(".imgHoverBox").addClass("imgHover");
						//slideLi.eq(i).find(".imgHoverBox").removeClass("imgHover");
						}
					);
				});
		}
	lxfscroll.mouseleave(function(){
		$(this).find(".imgHoverBox").addClass("imgHover");
		});
	});
	hoverscroll();
	autoroll();//启动自动播放功能
	stoproll();//启动鼠标悬停功能
	},
	/*（浮动导航的定位与显示隐藏） （团购首页）*/
	floatBox:function(food,history,historyClose,pageTop,floatBox,historyContent,sideNav,pageTurn,proContentBox){
		var winWidth=$(window).width();
		var content=$(historyContent);
		var speed=500; //效果运行的时间
		$(floatBox).css("right",(winWidth-990)/2-43);
		/*定位到相应的版块*/
		$(food).click(function(){
			$("html,body").animate({"scrollTop":$("#"+$(this).attr("id")+"-box").offset().top},speed);
			});
		/*显示隐藏历史记录*/
		$(history).click(function(){
			$(floatBox).css("width","244px");
			$(this).parents(sideNav).next(historyContent).fadeIn();
			return false;
			});
		$(historyClose).click(function(){
			$(this).parents(historyContent).hide();
			$(floatBox).css("width","42px");
			return false;
			});
		/*返回顶部*/
		$(pageTop).click(function(){
			$("html,body").animate({"scrollTop":0},speed);
			});
		/*浏览历史里面翻页的个数及翻页的效果*/
		/*var proNum=content.find(".pro-box").length;
		if(proNum==0){
			content.find(".page-turn").remove();
			$(".history-box").append("<p class='no-history'>暂无历史记录！</p>");
			}
		else if(proNum<=2){
			content.find(".page-turn").remove();
			content.find(".pro-box:last").css("border","none");
			}
		else if(proNum>2){
			$(".pro-content").height(265);
			var pageTurn=content.find(".page-turn");
			var proHtml="<a title='title' href='#'>turn page</a>";
			pageTurn.empty();
			for(var i=0;i<=proNum%2;i++){
				proHtml.clone().appendTo();
			}
			pageTurn.find("a:first").addClass("select");
		}*/
		/*浏览历史里面翻页效果*/
		var pageTurnA=$(pageTurn).find("a");
		pageTurnA.click(function(){
			var i=pageTurnA.index($(this));
			pageTurnA.removeClass("select").eq(i).addClass("select");
			$(proContentBox).animate({"margin-top":-262*i+"px"},300);
			return false;
			});
	},
	/*（img点击input选中）（团购流程-支付订单页）*/
	inputSelect:function(id){
		$(id).find("img").click(function(){
			$(id).find("input").removeAttr("checked");
			$(this).prev("input").attr("checked","checked");
			});
		},
	/*(input数字增加、减少、改变) (团购流程-提交订单页)*/
	inputValChange:function(addId,cutId,popId,inputId){
		/*函数主体*/
		function changeVal(className,i){
			var thisInput=$(inputId).eq(i);
			var inputVal=thisInput.val();
			if(className=="btn-cut"){
					inputVal--;
					thisInput.val(inputVal);
				}
			else if(className=="btn-add"){
					inputVal++;
					thisInput.val(inputVal);
				}
			if(inputVal<1){
				$(popId).hide();
				$(popId).parent().eq(i).find(popId).eq(0).show();
				thisInput.val(0);
				}
			else if(inputVal>4){
				$(popId).hide();
				$(popId).parent().eq(i).find(popId).eq(1).show();
				thisInput.val(4);
				}
			else{
				$(popId).hide();
				}
			}
		/*点击加按钮执行*/
		$(addId).click(function(){
			var index=$(addId).index($(this));
			changeVal($(this).attr("class"),index);
			return false;
			});
		/*点击减按钮执行*/
		$(cutId).click(function(){
			var index=$(cutId).index($(this));
			changeVal($(this).attr("class"),index);
			return false;
			});
		/*直接输入input值执行*/
		$(inputId).change(function(){
			var index=$(inputId).index($(this));
			changeVal($(this).attr("class"),index);
			});
		},
	/*(大图浏览) (商品大图页)*/
	imgListScroll:function(listId,boxId,numId,num){
		/*参数解释:
		listId:小图片列表的ID;
		boxId：大图片的外层div的ID;
		numId：显示图片数量的ID;
		num:列表能看见的小图片的数量
		*/
		var btnPrev=$(listId).find("a:first");
		var btnNext=$(listId).find("a:last");
		var largeImg=$(boxId).find("img:first");
		var numTotle=$(listId).find("li").length;
		var i=0;
		var singleHeight=$(listId).find("li").height()+parseInt($(listId).find("li").css("margin-bottom"));
		/*默认刚进页面显示第一个*/
		$(listId).find("ul a:first img").addClass("cur");
		var curImg=$(listId).find(".cur");
		var numNow=$(listId).find("ul img").index(curImg)+1;
		imgSrcChange();
		/*设置显示图片数量*/
		$(numId).children(":first-child").html(numNow);
		$(numId).children(":last-child").html(numTotle);
		/*更改大图SRC的函数*/
		function imgSrcChange(){
			/*var s=curImg.attr("src").substring(0,15);
			var s2=curImg.attr("src").substring(21);
			largeImg.attr("src",s+s2);*/
			var src=curImg.attr("src");
			var n=src.lastIndexOf(".");
			largeImg.attr("src",src.substring(0,n)+"_l"+src.substring(n));
			}
		/*判断是否可点击翻页*/
		if(numTotle>num){
			btnNext.addClass("next-able");
			}
		else{
			btnNext.removeClass("next-able");
			}
		/*点击翻页*/
		btnNext.click(function(){
			if($(this).hasClass("next-able")){
				i++;
				if(numTotle-(i+1)<num){
					$(this).removeClass("next-able");
					}
				$(listId).find("ul").animate({"top":-singleHeight*i},300);
				btnPrev.addClass("prev-able");
				curImg=$(listId).find(".cur");
				imgSrcChange();
				}
			return false;
			});
		btnPrev.click(function(){
			if($(this).hasClass("prev-able")){
				i--;
				if(i==0){
					$(this).removeClass("prev-able");
					}
				$(listId).find("ul").animate({"top":-singleHeight*i},300);
				btnNext.addClass("next-able");
				curImg=$(listId).find(".cur");
				imgSrcChange();
				$(listId).find("ul").addClass("ulie6");
				}
			return false;
			});
		$(listId).find("li a").click(function(){
			$(listId).find("li img").removeClass("cur");
			$(this).find("img").addClass("cur");
			curImg=$(listId).find(".cur");
			imgSrcChange();
			var j=$(listId).find("ul img").index(curImg);
			$(numId).children(":first-child").html(j+1);
			return false;
			});
		},
		liheight:function(id){
			$(id).find("li").each(function(){
				var h=$(this).height();
				$(this).find("strong").css({"height":h,"line-height":h+"px"});
				});
			},
	/*(选择分类) (团购更多页)*/
	kindsSelect:function(btnWrap,contentId,className){
		/*btnWrap：代表切换选项卡的按钮的外层
		contentId：代表选项卡对应的主体内容
		className：代表选项卡选中的样式名称*/
		var btnId=$(btnWrap).find("a");
		$(btnId).click(function(){
			var index=$(btnId).index($(this));
			if(index==0){
				$(btnId).removeClass(className).eq(index).addClass(className).addClass("no-limit");
	  			$(contentId).hide();
			}
			else{
	  			$(btnId).removeClass(className).eq(index).addClass(className);
	  			$(contentId).hide().eq(index-1).show();
			}
			return false;
			});
	},
	/*(判断展示精品团购的展开与关闭) (团购更多页)*/
/*	isOpen:function(id){
		$(id).each(function(){
			var widthTotle=0;
			for(var i=0;i<$(this).find("a").length;i++){
				widthTotle+=$(this).find("a").eq(i).width()+8;
				}
			if(widthTotle>$(this).width()){
				$(this).after("<a class='open' href='#'>展开</a>");
				}
			});
		},*/
	/*(精品团购的展开与关闭) (团购更多页)*/
	openClose:function(openId,closeId,content){
		$(content).each(function(){
			$(this).find(openId).each(function(){
				$(this).click(function(){
					var h=$(this).prev("div").height();
					$(this).parents("li").animate({"height":h},200);
					$(this).text("收起").removeClass().addClass("close2");
					$(this).live("click",function(){
					$(this).parents("li").animate({"height":"20px"},200);
						$(this).text("展开").removeClass().addClass("open");
					});
					return false;
					});
				/*$(closeId).live("click",function(){
					$(this).parents("li").animate({"height":"20px"},200);
						$(this).text("展开").removeClass().addClass("open");
					});*/
				});
			/*$(this).find(closeId).each(function(){
				$(this).click(function(){
					var h=$(this).prev("div").height();
					$(this).parents("li").animate({"height":"20px"},200);
					$(this).text("展开").removeClass().addClass("open");
					});
				});*/
			});
		}
};
