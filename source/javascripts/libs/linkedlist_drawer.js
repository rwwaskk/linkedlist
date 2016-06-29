function LinkedListDrawer(name, canvas, maxCharSize) {
  this.maxCharSize= maxCharSize;
  this.name = name;
  this.canvas = canvas;
};

function removeCanvas(canvas) {
  canvas.remove();
};

function drawCanvas(name, canvas) {

};


LinkedListDrawer.prototype.draw = function() {
  var canvas = this.canvas;
  var name = this.name;
  var maxCharSize = this.maxCharSize;

  //The this.name (up to 28 characters long, including white space)
  var length = this.name.length;
  if (name.length > maxCharSize ){//Exceed character length limit, remove canvas
      removeCanvas(canvas);
  }
  else{

    var context = canvas.getContext('2d');

    //calculate width and length
    var width=700/1.25/length;
    var start;
    if (width>40){
      width=40;
    }

    var height= width/2;

    //the start postion of the link list
    var start = (700-width*length*1.25)/2;
    var horizon = 5;

    //DO NOT CHANGE THOSE
    var mid_horizon = horizon+height/2;
    var name_counter =0;

    var x = height/5;
    var y = height/5;
    var interval=width/4;

    var radius = 0.75*width;

    var text_pos=width*1.1;


    canvas.height=mid_horizon+width/2+width/2.1+5;

    for (var i=1;i<name.length+1;i++){

      context.beginPath();
      context.strokeStyle='#F9BF3B';

      //the rectangle
      context.rect(start, horizon, width, height);

      //the middle line
      context.moveTo(start+width/2,horizon);
      context.lineTo(start+width/2,horizon+height);

      //if this is the last element
      if (i==name.length){
        context.moveTo(start+width/2,horizon+height);
        context.lineTo(start+width,horizon);

      }
      else{
        //the arrow
        context.moveTo(start+0.75*width,mid_horizon);
        context.lineTo(start+width+interval,mid_horizon);

        context.moveTo(start+width+interval,mid_horizon);
        context.lineTo(start+width+interval-x,mid_horizon+y);

        context.moveTo(start+width+interval,mid_horizon);
        context.lineTo(start+width+interval-x,mid_horizon-y); 
      }

      var startAngle = 1.2 * Math.PI;
      var endAngle = 1 * Math.PI;
      var counterClockwise = true;

      context.stroke();

      context.beginPath();
      context.arc(start+width/4+radius*0.81, mid_horizon+width/2, radius, startAngle, endAngle, counterClockwise);

      context.moveTo(start+width/4+radius*0.81-radius,mid_horizon+width/2);
      context.lineTo(start+width/4+radius*0.81-radius-x,mid_horizon-y+width/2);

      context.moveTo(start+width/4+radius*0.81-radius,mid_horizon+width/2);
      context.lineTo(start+width/4+radius*0.81-radius+x,mid_horizon-y+width/2); 

      context.font = ' 15pt Calibri';
      context.fillStyle = '#859900';
      context.fillText(name.charAt(name_counter), start+width/4+radius*0.81-radius-width/14, mid_horizon+width/2+width/2.1);

      context.lineWidth=1;
      context.strokeStyle='#F9BF3B';
      context.stroke();
      start+=width/2*2+interval;
      name_counter+=1;
    }
  }
};

var name = document.getElementById('name-helper').innerHTML;
var canvas = document.getElementById('myCanvas');
var myDrawer = new LinkedListDrawer(name, canvas, 28);
myDrawer.draw();