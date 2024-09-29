var gW;
var gH;
var curPage;
var controlAnimate = new Array();
var controlTimeout = new Array();
$(document).ready(function(){
//INIT--------------------------------------------------------------------------------------
	gW = window.innerWidth;
	gH = window.innerHeight;
	curPage = 1;
//RUN---------------------------------------------------------------------------------------
	if($("#fullpage").length > 0){
		$("#fullpage").fullpage({
			menu: "#menu, .main_menu",
			css3: true,
			anchors:["firstPage", "secondPage", "thirdPage", "fourthPage", "fifthPage", "sixthPage", "seventhPage", "eighthPage", "ninthPage"],
			controlArrows: false,
			onLeave: function(index, nextIndex, direction){
				$(".fullspace").addClass("anm");
				(nextIndex != 1) ? $(".hdr_lg").addClass("fixed") : $(".hdr_lg").removeClass("fixed");
				$(this).addClass("outsection");
				curPage = nextIndex;
				resetAnmSlide($(this), index);
			},
			afterLoad : function (anchorLink, index){
				$(".fullspace").removeClass("anm");
				startAnmSlide($(this), index);
			},
			afterRender: function(){
				$.getScript("js/custom/space.js");
			},
			onSlideLeave (anchorLink, index, slideIndex, direction, nextSlideIndex){
				var curFullslide = index-1;
				$("#fullpage .section:eq(" + curFullslide + ") .section_nav_list .active").removeClass("active");
				$("#fullpage .section:eq(" + curFullslide + ") .section_nav_list a:eq(" + nextSlideIndex + ")").addClass("active");
				
				if (slideIndex < nextSlideIndex){
					$("#fullpage .section:eq(" + curFullslide + ") .fp-slidesContainer .slide:eq(" + slideIndex + ")").removeClass("outright inright inleft outleft").addClass("outleft");
					$("#fullpage .section:eq(" + curFullslide + ") .fp-slidesContainer .slide:eq(" + nextSlideIndex + ")").removeClass("outleft outright inright inleft").addClass("inleft");
				}
				else{
					$("#fullpage .section:eq(" + curFullslide + ") .fp-slidesContainer .slide:eq(" + slideIndex + ")").removeClass("outleft inright inleft outright").addClass("outright");
					$("#fullpage .section:eq(" + curFullslide + ") .fp-slidesContainer .slide:eq(" + nextSlideIndex + ")").removeClass("outleft outright inleft inright").addClass("inright");
				}
			}
		});
	}
//LOAD--------------------------------------------------------------------------------------
	$(window).load(function(){
		$(".preloader").fadeOut(400);
		$(".wrapper").addClass("loaded");
	});
//BUTTONS-----------------------------------------------------------------------------------
	$(document).on("click", ".main_menu_btn a", function(){
		toggleMenu(!($(this).parent().hasClass("open")));
	});
	$(document).on("click", ".main_menu_in a", function(){
		toggleMenu(false);
	});
	$(document).on("click", ".section_nav_list a", function(){
		var referInx = $(this).index();
		$("#fullpage").fullpage.silentMoveTo(curPage, referInx);
	});
//MOUSE-------------------------------------------------------------------------------------
	$(document).on("mousemove", "body", function(event){
		var relX = (gW / 2) - gW + event.pageX;
		var relY = (gH / 2) - gH + event.pageY;
		
		var percW  = (gW / 2) / 100;
		var percH  = (gH / 2) / 100;
		var percX = relX / percW;
		var percY = relY / percH;
		
		var top_1  = percY / 24;
		var left_1 = percX / 24;
		var top_2  = percY / 12;
		var left_2 = percX / 12;
		var top_3  = percY / 6;
		var left_3 = percX / 6;
		
		animejs(".fullspace_layer_1", left_1, top_1, "linear", 500);
		animejs(".fullspace_layer_2", left_2, top_2, "linear", 500);
		animejs(".fullspace_layer_3", left_3, top_3, "linear", 500);
		
		if(curPage == 1){
			animejs(".ft_planets_on", left_2, top_2, "linear", 700);
			animejs(".ft_planets_tw", left_1, top_1, "linear", 700);
			animejs(".ft_planets_th", left_3, top_3, "linear", 700);
		}
		if(curPage == 3){
			animejs(".th_bg_mr_1", left_1, top_1, "linear", 700);
			animejs(".th_bg_mr_2", left_3, top_3, "linear", 700);
		}
		if(curPage == 4){
			animejs(".fr_bg_mr", left_2, top_2, "linear", 700);
		}
		if(curPage == 5){
			animejs(".ff_bg_mr_2", left_2, top_2, "linear", 700);
			animejs(".ff_bg_mr_1", left_1, top_1, "linear", 700);
			animejs(".ff_bg_mr_3", left_3, top_3, "linear", 700);
		}
		if(curPage == 6){
			animejs(".sx_bg_mr_1", left_2, top_2, "linear", 700);
			animejs(".sx_bg_mr_2", left_3, top_3, "linear", 700);
		}
		if(curPage == 7){
			animejs(".sv_bg_mr_1", left_2, top_2, "linear", 700);
			animejs(".sv_bg_mr", left_1, top_1, "linear", 700);
		}
		if(curPage == 8){
			animejs(".ei_bg_mr_1", left_2, top_2, "linear", 700);
		}
		if(curPage == 9){
			animejs(".ni_bg_mr_1", left_2, top_2, "linear", 700);
		}
	});
});
$(window).resize(function(event){
	gW = window.innerWidth;
	gH = window.innerHeight;
});
//FUNCTIONS---------------------------------------------------------------------------------
//elemPos
function ifViewTop(elem, diff) { //если виден верх блока
    if(!$(elem).length) return false; // element not found
	diff = diff || 0;
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;

    return (docViewBottom + diff) >= elemTop;
}
function ifViewBot(elem, diff) { //если виден низ блока
    if(!$(elem).length) return false; // element not found
	diff = diff || 0;
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return (docViewBottom + diff) >= elemBottom;
}

function animejs(targets, translateX, translateY, easing, duration){
	anime({
		targets: targets,
		translateX: translateX,
		translateY: translateY,
		easing: easing,
		duration: duration
	});
}
function startAnmSlide(objSlide, index){
	if($(objSlide).hasClass("anm")) return false;
	
	$(objSlide).addClass("anm");
	var el_ps = $(objSlide).find(".sc_planet_main_object_ring_circle_content_ptxt");
	var el_pt = $(objSlide).find(".sc_planet_main_text_aln_txt");
	var tm_ps = 4500;
	var tm_pt = 6000;
	var dr_ps = 1000;
	var dr_pt = 5000;
	var format_ps = function(e, s){$(e).text(s + " км")};
	var format_pt = function(e, s){$(e).html(s + " °C<span>температура</span>")};
	var range = ["", "", "", ""];
	if(index == 2){
		format_ps = function(e, s){$(e).text(s.substring(0, 1) + " " + s.substring(1) + " км")};
		range = ["0", "4879", "-190", "430"];
	}
	if(index == 3) range = ["0", "12100", "467", "477"];
	if(index == 4) range = ["0", "12742", "-89", "70"];
	if(index == 5) range = ["0", "6779", "-140", "20"];
	if(index == 6) range = ["0", "12100", "-145", "24000"];
	if(index == 7) range = ["0", "116464", "-175", "11700"];
	if(index == 8) range = ["0", "50724", "-224", "4737"];
	if(index == 9) range = ["0", "49244", "-218", "7000"];
	
	if(index != 1){
		counterFn(range[0], range[1], el_ps, format_ps, tm_ps, dr_ps, index + 100);
		counterFn(range[2], range[3], el_pt, format_pt, tm_pt, dr_pt, index);
	}
}
function resetAnmSlide(objSlide, index){
	if(!$(objSlide).hasClass("anm")) return false;
	
	$(objSlide).removeClass("anm");
	if(index == 2) t_val = "-190";
	if(index == 3) t_val = "467";
	if(index == 4) t_val = "-89";
	if(index == 5) t_val = "-140";
	if(index == 6) t_val = "-145";
	if(index == 7) t_val = "-175";
	if(index == 8) t_val = "-224";
	if(index == 9) t_val = "-218";
	if(index != 1){
		p_el  = $(objSlide).find(".sc_planet_main_object_ring_circle_content_ptxt");
		t_el  = $(objSlide).find(".sc_planet_main_text_aln_txt");
		p_val = "0 км";
		t_val += " °C<span>температура</span>";
		setTimeout(function(){
			stopAnimateJs(p_el, p_val, index + 100);
			stopAnimateJs(t_el, t_val, index);
		}, 200);
	}
}
function counterFn(from, to, el, format, timeout, duration, index){
	var counter = {charged: from};
	controlAnimate[index] = anime({
		targets: counter,
		charged: to,
		round: 1,
		easing: "linear",
		duration: duration,
		autoplay: false,
		update: function() {
			format(el, counter["charged"]);
		}
	});
	controlTimeout[index] = setTimeout(function(){
		controlAnimate[index].play();
	}, timeout);
}
function toggleMenu(direction){
	if(direction){
		$(".main_menu_btn").addClass("open");
		$(".main_menu").fadeIn(300).addClass("open");
		$(".content").addClass("filter_blur");
		$("#fullpage").fullpage.setAllowScrolling(false);
	}
	else{
		$(".main_menu_btn").removeClass("open");
		$(".main_menu").fadeOut(300).removeClass("open");
		$(".content").removeClass("filter_blur");
		$("#fullpage").fullpage.setAllowScrolling(true);
	}
}
function stopAnimateJs(el, val, index){
	if(controlAnimate.hasOwnProperty(index)){
		clearTimeout(controlTimeout[index]);
		controlAnimate[index].pause();
		$(el).html(val);
	}
}