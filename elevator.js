let Elevators = [];
class Elevator {
	constructor(k,height,width,mask){
		this.is_open = true;
		this.mask = mask;
		this.height = height;
		this.width = width;
		this.padtop = 0;
		this.x = 0;
		this.y = 0;
		this.half = 0;
		this.timing = 30;
		this.index = k;
		this.border = 1;
		this.lock = 1;
		document.getElementsByClassName("elevator")[this.index].onclick = () => {
			var elevator = Elevators[this.index];
			if(typeof(elevator.lock)=="undefined"){
				elevator.lock = 0;
				left_door = document.querySelectorAll(".elevator-left-door")[k];
				right_door = document.querySelectorAll(".elevator-right-door")[k];
				elevator.is_open = !elevator.is_open;
				if(elevator.is_open){
					elevator.timer = setInterval(function(){elevator.lowertext()}.bind(elevator),elevator.timing);
					elevator.timer2 = setInterval(function(){elevator.closedoors()}.bind(elevator),elevator.timing);
				} else {
					elevator.timer = setInterval(function(){elevator.opendoors()}.bind(elevator),elevator.timing);
					elevator.timer2 = setInterval(function(){elevator.raisetext()}.bind(elevator),elevator.timing);
				}
			}
		}

		this.timer = null;
		this.timer2 = null;
		this.timer = setInterval(function(){this.lowertext()}.bind(this),1);
	}
	show_mask(){
		if(this.mask){
			var mask = document.getElementById("elevator" + this.index).getElementsByClassName("elevator-overlay")[0].firstChild;
			mask.style.visibility = "visible";
		}
	}
	hide_mask(){
		if(this.mask){
			var mask = document.getElementById("elevator" + this.index).getElementsByClassName("elevator-overlay")[0].firstChild;
			mask.style.visibility = "hidden";
		}
	}
	opendoors(){
		console.log("opening doors " + this.x + " " + this.y);
		this.hide_mask();
		left_door = document.querySelectorAll(".elevator-left-door")[this.index];
		right_door = document.querySelectorAll(".elevator-right-door")[this.index];
		this.x += 10;
		this.y += 10;
		if(this.x > 100){
			++this.lock;
			this.x = 100;
			this.y = 100;
			clearInterval(this.timer);
			if(this.lock >= 2){
				this.lock = undefined;
			}
			return;
		}
		left_door.style.clipPath = "inset(0% " + this.x + "% 0% 0%)";
		left_door.style.webkitClipPath = "inset(0% " + this.x + "% 0% 0%)";
		right_door.style.clipPath = "inset(0% 0% 0% " + this.y + "%)";
		right_door.style.webkitClipPath = "inset(0% 0% 0% " + this.y + "%)";
	}
	raisetext(){
		console.log("raising text height " + this.height + " padding " + this.padtop);
		this.padtop -= 10;
		if(this.padtop <= 0){
			++this.lock;
			this.padtop = 0;
			clearInterval(this.timer2);
			document.getElementsByClassName("elevator")[this.index].style.overflow = "scroll";
			if(this.lock >= 2){
				this.lock = undefined;
			}
			return;
		}
		document.getElementsByClassName("elevator-text-content")[this.index].style.paddingTop = this.padtop + "px";
	}
	lowertext(){
		console.log("index " + this.index + " lowering text height " + this.height + " padding " + this.padtop);
		this.padtop += 10;
		if(this.padtop > this.height){
			++this.lock;
			clearInterval(this.timer);
			document.getElementsByClassName("elevator")[this.index].style.overflow = "hidden";
			if(this.lock >= 2){
				this.lock = undefined;
				document.getElementsByClassName("elevator")[this.index].scrollTop = "0px";
			}
			return;
		}
		document.getElementsByClassName("elevator-text-content")[this.index].style.paddingTop = this.padtop + "px";
	}
	closedoors(){
		console.log("closing doors " + this.x + " " + this.y);
		document.getElementsByClassName("elevator")[this.index].scrollTop = "0px";
		this.x -= 10;
		this.y -= 10;
		if(this.x < 0){
			++this.lock;
			this.x = 0;
			this.y = 0;
			clearInterval(this.timer2);
			if(this.lock >= 2){
				this.lock = undefined;
				document.getElementsByClassName("elevator")[this.index].scrollTop = "0px";
			}
			this.show_mask();
			return;
		}
		left_door = document.querySelectorAll(".elevator-left-door")[this.index];
		right_door = document.querySelectorAll(".elevator-right-door")[this.index];
		left_door.style.clipPath = "inset(0% " + this.x + "% 0% 0%)";
		left_door.style.webkitClipPath = "inset(0% " + this.x + "% 0% 0%)";
		right_door.style.clipPath = "inset(0% 0% 0% " + this.y + "%)";
		right_door.style.webkitClipPath = "inset(0% 0% 0% " + this.y + "%)";
	}
}
onload = () => {
	var elevators = document.getElementsByClassName("elevator");
	for(let k = 0; k < elevators.length; k++){
		var elevator = elevators[k];
		elevator.id = "elevator" + k;
		if(elevator.getAttribute("height") && elevator.getAttribute("width")){
			var height = elevator.getAttribute("height");
			var width = elevator.getAttribute("width");
		} else {
			var height = 300;
			var width = 300;
		}
		elevator.style.width = width + "px";
		elevator.style.height = height + "px";
		var mask = false;
		if(elevator.getAttribute("mask") && elevator.getAttribute("image")){
			mask = true;
		}
		var content = elevator.innerHTML;
		if(mask){
			elevator.innerHTML = "<div class='elevator-door elevator-left-door'></div><p class='elevator-text-content'></p><div class='elevator-door elevator-right-door'></div><div class='elevator-overlay'><img src='" + elevator.getAttribute("image") + "' style='position:relative;z-index:10;width:" + width + "px;height:" + height + "px;'></div>";
		} else {
			elevator.innerHTML = "<div class='elevator-door elevator-left-door'></div><p class='elevator-text-content'></p><div class='elevator-door elevator-right-door'></div>";
		}
		var text = document.getElementsByClassName("elevator-text-content")[k];
		text.innerHTML = content;
		let half = Number(width) / 2;
		let border = 1;//move into class
		left_door = document.querySelectorAll(".elevator-left-door")[k];
		right_door = document.querySelectorAll(".elevator-right-door")[k];
		left_door.style.width = half + "px";
		right_door.style.width = (half - border) + "px";
		left_door.style.height = height + "px";
		right_door.style.height = height + "px";
		left_door.style.border = border + "px solid black";
		right_door.style.border = border + "px solid black";
		if(elevator.getAttribute("image")){
			left_image = document.createElement('img');
			left_image.src = elevator.getAttribute("image");
			left_image.width = width;
			left_image.height = height;
			left_image.style.clipPath = "inset(0% 50% 0% 0%)";
			left_image.style.webkitClipPath = "inset(0% 50% 0% 0%)";
			left_door.style.overflow = "hidden";
			left_door.appendChild(left_image);
			right_image = document.createElement('img');
			right_image.src = elevator.getAttribute("image");
			right_image.width = width;
			right_image.height = height;
			right_image.style.clipPath = "inset(0% 0% 0% 50%)";
			right_image.style.webkitClipPath = "inset(0% 0% 0% 50%)";
			right_door.style.overflow = "hidden";
			right_door.appendChild(right_image);
			right_door.firstChild.style.position = "relative";
			right_door.firstChild.style.left = "-" + half + "px";
		}
		Elevators.push(new Elevator(k,height,width,mask));
	}
}
