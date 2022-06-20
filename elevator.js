   var timer = null;
   var timer2 = null;
   const timing = 30;
   var is_open = new Boolean;
   var globalcontent = "";
   let width = 0;
   let height = 0;
   let padtop = 0;
   let half = 0;
   let x = 0;
   let y = 0;
   onload = () => {
      var elevator = document.getElementById("elevator");
      var content = elevator.innerHTML;
      elevator.innerHTML = "<div class='door' id='left_door'></div><p id='textcontent'>" + content + "</p><div class='door' id='right_door'></div>";
      text = document.getElementById("textcontent");
      globalcontent = text.innerHTML;
      height = document.getElementById("elevator").getAttribute("height");
      width = document.getElementById("elevator").getAttribute("width");
      document.getElementById("elevator").style.width = width + "px";
      document.getElementById("elevator").style.height = height + "px";
      half = Number(width) / 2;
      x = 0;
      y = 0;
      document.getElementById("left_door").style.width = half + "px";
      document.getElementById("right_door").style.width = half + "px";
      document.getElementById("left_door").style.height = height + "px";
      document.getElementById("right_door").style.height = height + "px";
      if(document.getElementById("elevator").getAttribute("image")){
         left_door = document.getElementById("left_door");
         right_door = document.getElementById("right_door");
         left_image = document.createElement('img');
         left_image.src = document.getElementById("elevator").getAttribute("image");
         left_image.width = width;
         left_image.height = height;
         left_image.style.clipPath = "inset(0% 50% 0% 0%)";
         left_door.appendChild(left_image);
         right_image = document.createElement('img');
         right_image.src = document.getElementById("elevator").getAttribute("image");
         right_image.width = width;
         right_image.height = height;
         right_image.style.clipPath = "inset(0% 0% 0% 50%)";
         right_door.appendChild(right_image);
         right_door.firstChild.style.position = "relative";
         right_door.firstChild.style.left = "-" + half + "px";
         //left_door.style.backgroundImage = "url('" + image + "')";
         //left_door.style.backgroundRepeat = "no-repeat";
         //left_door.style.backgroundSize =  "cover";
         //left_door.firstChild.style.clipPath = "inset(0% 50% 0% 0%)";
      }
      is_open = true;
      timer = setInterval(lowertext,1);
      document.getElementById("elevator").onclick = () => {
         left_door = document.getElementById("left_door");
         right_door = document.getElementById("right_door");
         is_open = !is_open;
         if(is_open){
            timer = setInterval(lowertext,timing);
            timer2 = setInterval(closedoors,timing);
         } else {
            timer = setInterval(opendoors,timing);
            timer2 = setInterval(raisetext,timing);
         }
      }
   }
   opendoors = () => {
         console.log("opening doors " + x + " " + y);
         left_door = document.getElementById("left_door");
         right_door = document.getElementById("right_door");
         x += 10;
         y += 10;
         if(x > 100){
            x = 100;
            y = 100;
            clearInterval(timer);
            return;
         }
         left_door.style.clipPath = "inset(0% " + x + "% 0% 0%)";
         right_door.style.clipPath = "inset(0% 0% 0% " + y + "%)";
   }
   lowertext = () => {
      console.log("lowering text height " + height + " padding " + padtop);
      padtop += 10;
      if(padtop > height){
         clearInterval(timer);
         return;
      }
      document.getElementById("textcontent").style.paddingTop = padtop + "px";
   }
   raisetext = () => {
      console.log("raising text height " + height + " padding " + padtop);
      padtop -= 10;
      if(padtop <= 0){
         padtop = 0;
         clearInterval(timer2);
         return;
      }
      document.getElementById("textcontent").style.paddingTop = padtop + "px";
   }
   closedoors = () => {
         console.log("closing doors " + x + " " + y);
         x -= 10;
         y -= 10;
         if(x < 0){
            x = 0;
            y = 0;
            clearInterval(timer2);
            return;
         }
         left_door = document.getElementById("left_door");
         right_door = document.getElementById("right_door");
         left_door.style.clipPath = "inset(0% " + x + "% 0% 0%)";
         right_door.style.clipPath = "inset(0% 0% 0% " + y + "%)";
   }
