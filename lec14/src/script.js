const ctx = canvas.getContext("2d");
// function calls a callback count times. Saves typing out for loops all the time 
const doFor = (count, callback) => {
  var i = 0;
  while (i < count) {
    callback(i++)
  }
};
// creates a random integer between min and max. If min only given the between 0 and the value 
const randI = (min, max = min + (min = 0)) => (Math.random() * (max - min) + min) | 0;
// same as above but as floats.
const rand = (min, max = min + (min = 0)) => Math.random() * (max - min) + min;
// creates a 2d point at x,y. If only x is a point than set to that point
const point = (x = 0, y) => {
  if (x.x && y === undefined) {return { x: x.x,y: x.y} }
  return {x,y: y === undefined ? 0 : y }
};
function ease (time, amount = 2) { return Math.pow(time % 1,amount) };
const clamp = (v, min = 1,max = min + (min = 0)) => v < min ? min : v > max ? max : v;




// stuff for stars
const skyColour = [10,30,50];
const density = 1000; // number of star per every density pixels
const colourChangeRate = 16; // Time in frames to change a colour
const stars = [];
const star = { // define a star
  draw() {
    this.count += 1; // integer counter used to triger color change every 16 frames
    if (this.count % colourChangeRate === 0) { // change colour ?
      // colour is a gaussian distrabution (NOT random) centered at #888
      var c = (Math.random() + Math.random() + Math.random() + Math.random()) * 4;
      var str = "#";
      str += Math.floor(c * this.red).toString(16); // change color
      str += Math.floor(c * this.green).toString(16); // change color
      str += Math.floor(c * this.blue).toString(16); // change color
      

      this.col = str;
    }
    ctx.fillStyle = this.col;
    // move star around  a pixel. Again its not random
    // but a gaussian distrabution. The movement is sub pixel and will only
    // make the stars brightness vary not look like its moving
    var ox = (Math.random() + Math.random() + Math.random() + Math.random()) / 4;
    var oy = (Math.random() + Math.random() + Math.random() + Math.random()) / 4;
    ctx.fillRect(this.pos.x + ox, this.pos.y + oy, this.size, this.size);
  }
}
// create a random star
// the size is caculated to produce many more smaller stars than big
function createStar(pos) {
  stars.push(Object.assign({}, star, {
    pos,
    col: "#ccc",
    count: randI(colourChangeRate),
    size: rand(1) * rand(1) * 2 + 0.5,
    red: 1-(rand(1) * rand(1) *rand(1)),  // reduces colour channels
    green: 1-(rand(1) * rand(1) *rand(1)), // but only by a very small amount
    blue: 1-(rand(1) * rand(1) *rand(1)),  // most of the time but occasional 
                                           // star will have a distinct colour
  }));
}

var starCount;
var skyGrad;

// render the stars
function mainLoop(time) {
  // resize canva if page size changes
  if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    // create a new set of stars 
    stars.length = 0;
    // density is number of pixels one the canvas that has one star
    starCount = Math.floor((canvas.width * canvas.height) / density);
    // create the random stars;
    doFor(starCount, () => createStar(point(randI(canvas.width), randI(canvas.height))));
    skyGrad = ctx.createLinearGradient(0,0,0,canvas.height);
    skyGrad.addColorStop(0,"black");
    doFor(100,(i)=>{
        var pos  = clamp(i/100,0,1);
        var col = ease(pos);
        skyGrad.addColorStop(
            pos,
            "rgb(" + 
              Math.floor(skyColour[0] * col) + "," +
              Math.floor(skyColour[1] * col) + "," +
              Math.floor(skyColour[2] * col) + ")"
         );
     });
     // floating point error can cause problems if we dont set the top
     // at 1
     skyGrad.addColorStop(1,"rgb("+skyColour[0]+","+skyColour[1]+","+skyColour[2]+")");
    
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  doFor(starCount, (i) => stars[i].draw());

  requestAnimationFrame(mainLoop);
}
requestAnimationFrame(mainLoop);




function firstMove() {
    let id = null; 

    const elem = document.getElementById("lilContainer");
    let pos = 0; 
    clearInterval(id);
    id = setInterval(frame,5);

    let direction = "right";

    function frame() {
      if (pos == 450) {
        if (direction === "right") {
          direction = "down";
          elem.style.backgroundColor = "green";
        } else if (direction === "down") {
          direction = "left";
          elem.style.backgroundColor = "black";
        } else if (direction === "left") {
          direction = "up";
          elem.style.backgroundColor = "purple";
        } else if (direction === "up") {
          direction = "right";
          elem.style.backgroundColor = "blue";
        }
  
        pos = 0;
      }
    
      if (direction === "right") {
        pos++;
        elem.style.left = pos + "px";
      } else if (direction === "down") {
        pos++;
        elem.style.top = pos + "px";
      } else if (direction === "left") {
        pos++;
        elem.style.left = (450 - pos) + "px";
      } else if (direction === "up") {
        pos++;
        elem.style.top = (450 - pos) + "px";
      }
    
      console.log(pos);
      console.log(elem.style.left, elem.style.top);
    }
}    


const dissapearDiv = document.getElementById('dissapear');
const lilContainerDiv = document.getElementById('lilContainer');

// Function to change the color of #dissapear to match #lilContainer and add twinkle effect
function twinkle() {
  const lilContainerColor = getComputedStyle(lilContainerDiv).backgroundColor;
  dissapearDiv.style.backgroundColor = lilContainerColor;

  // Add twinkle effect by changing opacity
  dissapearDiv.style.opacity = '0';
  setTimeout(() => {
    dissapearDiv.style.opacity = '1';
  }, 500);
}

// Call the twinkle function every 1 second
setInterval(twinkle, 1000);