var TOTAL_WIDTH = 700;
var STROKE_STYLE = '#F9BF3B';
var Y_POS = 5;
var MAX_CHAR_SIZE = 28;

var THREE_QUARTERS = 0.75;
var ONE_QUARTER = 0.25;
var STARTING_ANGLE = 1.2 * Math.PI;
var ARC_ANGLE = 0.81;
var ENDING_ANGLE = 1 * Math.PI;
var COUNTER_CLOCK_WISE = true;
var FONT = '15pt Calibri';
var FILL_STYLE = '#859900';

/**
 * A drawer to draw the linked list

 * @constructor
 * @param {string} name - A string, intended to be the name of blog author
 * @param {string} canvas - HTML5 Canvas
 */

function LinkedListDrawer(name, canvas) {
  this.name = name;
  this.canvas = canvas;
}

/**
 * Remove canvas from page
 */

LinkedListDrawer.prototype.removeCanvas = function() {
  this.canvas.remove();
};

/**
 * Draw a rectangle

 * @param {number} x - The x-coordinate of the upper-left corner of the rectangle
 */

LinkedListDrawer.prototype.drawRectangle = function(x) {
  this.context.rect(x, Y_POS, this.width, this.height);
};

/**
 * Draw a vertical line in the middle of a rectangle

 * @param {number} x - The x-coordinate of the upper-left corner of the rectangle
 */

LinkedListDrawer.prototype.drawMiddleLine = function(x) {
  var width = this.width;
  this.context.moveTo(x + width / 2, Y_POS);
  this.context.lineTo(x + width / 2, Y_POS + this.height);
};

/**
 * Draw a diagonal line in the second half of the last rectangle

 * @param {number} x - The x-coordinate of the upper-left corner of the rectangle
 */

LinkedListDrawer.prototype.drawLastLine = function(x) {
  var width = this.width;
  this.context.moveTo(x + width / 2, Y_POS + this.height);
  this.context.lineTo(x + width, Y_POS);
};

/**
 * Draw an arrow start from the center of the second half of the rectangle
 * and end at the middle of the left of the next rectangle

 * @param {number} x - The x-coordinate of the upper-left corner of the rectangle
 */

LinkedListDrawer.prototype.drawArrow = function(x) {
  var width = this.width;
  var midY = this.midY;
  var interval = this.interval;
  var rightEnd = x + width + interval;
  var arrowIndent = rightEnd - this.oneFifthHeight;
  // the line
  this.context.moveTo(x + THREE_QUARTERS * width, midY);
  this.context.lineTo(rightEnd, midY);

  // the lower diagonal
  this.context.moveTo(rightEnd, midY);
  this.context.lineTo(arrowIndent, midY + this.oneFifthHeight);

  // the upper diagonal
  this.context.moveTo(rightEnd, midY);
  this.context.lineTo(arrowIndent, midY - this.oneFifthHeight);
};

/**
 * Draw an arc from the middle of the first half of the rectange
 * pointing to a character

 * @param {number} x - The x-coordinate of the upper-left corner of the rectangle
 */

LinkedListDrawer.prototype.drawArc = function(x) {
  var width = this.width;
  var midY = this.midY;
  var radius = this.radius;
  this.context.stroke();
  this.context.beginPath();
  this.context.arc(x + this.width * ONE_QUARTER + radius * ARC_ANGLE,
                   midY + this.width / 2,
                   radius,
                   STARTING_ANGLE,
                   ENDING_ANGLE,
                   COUNTER_CLOCK_WISE);

  this.context.moveTo(x + this.width * ONE_QUARTER + radius * ARC_ANGLE - radius, midY + width / 2);
  this.context.lineTo(x + this.width * ONE_QUARTER + radius * ARC_ANGLE - radius - this.oneFifthHeight,
                      midY - this.oneFifthHeight + width / 2);

  this.context.moveTo(x + this.width * ONE_QUARTER + radius * ARC_ANGLE - radius, midY + width / 2);
  this.context.lineTo(x + this.width * ONE_QUARTER + radius * ARC_ANGLE - radius + this.oneFifthHeight,
                      midY - this.oneFifthHeight + width / 2);
};

/**
 * Draw the name

 * @param {number} x - The x-coordinate of the upper-left corner of the rectangle
 * @param {number} nameCounter - The nameCounter-th character
 */

LinkedListDrawer.prototype.drawName = function(x, nameCounter) {
  var width = this.width;
  var radius = this.radius;
  var midY = this.midY;
  this.context.font = FONT;
  this.context.fillStyle = FILL_STYLE;
  this.context.fillText(name.charAt(nameCounter),
                     x + width * ONE_QUARTER + radius * ARC_ANGLE - radius - width / 14 - 3,
                     midY + width / 2 + width / 2.1);

  this.context.lineWidth = 1;
  this.context.stroke();
};

/**
 * Draw a rectange pointing to each character of the name
 */

LinkedListDrawer.prototype.drawLoop = function() {
  var context = this.context;
  var nameCounter = 0;
  var width = this.width;
  var start  = this.start;
  var height = this.height;
  var midY = this.midY;
  var interval = this.interval;
  var radius = this.radius;
  var textPos = this.textPos;
  this.canvas.height = midY + width / 2 + width / 2.1 + 5;

  for (var i = 1; i < this.nameLength + 1; i++) {
    context.beginPath();
    context.strokeStyle = STROKE_STYLE;

    this.drawRectangle(start);
    this.drawMiddleLine(start);

    //if this is the last element
    if (i == name.length) {
      this.drawLastLine(start);
    } else {
      this.drawArrow(start);
    }
    this.drawArc(start);
    this.drawName(start, nameCounter);

    // update starting positions
    start += width / 2 * 2 + interval;
    nameCounter += 1;
  }
};

/**
 * Setting all necessay parameters for the drawer
 */

LinkedListDrawer.prototype.setParameters = function() {
  var length = this.nameLength;
  if (length > MAX_CHAR_SIZE) {
    this.removeCanvas();
  } else {

    // calculate width and length
    var width = TOTAL_WIDTH / 1.25 / length;
    if (width > 40) {
      width = 40;
    }
    var height = width / 2;

    //the start postion of the link list
    var start = (TOTAL_WIDTH - width * length  * 1.25) / 2;

    var midY = Y_POS + height / 2;
    var oneFifthHeight = height / 5;

    // The distance between rectangles
    var interval = width * ONE_QUARTER;
    var radius = THREE_QUARTERS * width;
    var textPos = width * 1.1;

    this.width = width;
    this.height = height;
    this.start = start;
    this.midY = midY;
    this.oneFifthHeight = oneFifthHeight;
    this.interval = interval;
    this.radius = radius;
    this.textPos = textPos;
  }
};

/**
 * Start to draw name on the canvas
 */

LinkedListDrawer.prototype.draw = function() {
  var canvas = this.canvas;
  var name = this.name;
  var maxCharSize = MAX_CHAR_SIZE;

  // The this.name (up to 28 characters long, including white space)
  var length = this.name.length;
  this.nameLength = length;
  if (name.length > maxCharSize) { // Exceed character length limit, remove canvas
    this.removeCanvas();
  } else {
    var context = canvas.getContext('2d');
    this.context = context;
    this.setParameters();
    this.drawLoop();
  }
};

var nameHelper = document.getElementById('name-helper');
var canvas = document.getElementById('myCanvas');
if (nameHelper && canvas) {
  var name = nameHelper.innerHTML;
  var myDrawer = new LinkedListDrawer(name, canvas);
  myDrawer.draw();
}
