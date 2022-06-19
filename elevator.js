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
      is_open = false;
      text = document.getElementById("textcontent");
      globalcontent = text.innerHTML;
      height = document.getElementById("elevator").getAttribute("height");
      width = document.getElementById("elevator").getAttribute("width");
      document.getElementById("elevator").style.width = width + "px";
      document.getElementById("elevator").style.height = height + "px";
      half = Number(width) / 2;
      x = Math.round(half);
      y = Math.round(half);
      document.getElementById("left_door").style.width = half + "px";
      document.getElementById("right_door").style.width = half + "px";
      document.getElementById("left_door").style.height = height + "px";
      document.getElementById("right_door").style.height = height + "px";
      timer = setInterval(lowertext,1);
      document.getElementById("elevator").onclick = () => {
         left_door = document.getElementById("left_door");
         right_door = document.getElementById("right_door");
         is_open = !is_open;
         if(is_open){
            timer = setInterval(opendoors,timing);
            timer2 = setInterval(raisetext,timing);
         } else {
            timer = setInterval(lowertext,timing);
            timer2 = setInterval(closedoors,timing);
         }
      }
   }
   opendoors = () => {
         left_door = document.getElementById("left_door");
         right_door = document.getElementById("right_door");
         x -= 10;
         y += 10;
         if(x <= 0){
            clearInterval(timer);
            return;
         }
         left_door.style.width = "" + x + "px";
         right_door.style.width = "" + x + "px";
         //right_door.style.left = y + "px";
         console.log("opening doors " + x + " " + y);
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
         x += 10;
         y -= 10;
         if(x > half){
            clearInterval(timer2);
            return;
         }
         console.log("closing doors " + x + " " + y);
         left_door = document.getElementById("left_door");
         right_door = document.getElementById("right_door");
         left_door.style.width = "" + x + "px";
         right_door.style.width = "" + x + "px";
         //right_door.style.left = y + "px";
   }
