//gets the canvas element to draw and preps it for drawing
canvas = document.getElementById("music_notes");
ctx = canvas.getContext("2d");
colors = ["#FF6100","#1E46ff"];
//sets the dimensions of the canvas so there's no warping
canvas.width = window.innerWidth;
canvas.height = 300;
i=0;
line_spacing = (canvas.height-5*6)/6
let note_types = ["whole","half","quarter","eighth"];
//class in charge of holding all relevant information regarding rendering musical notes
class note {
	constructor(x) {
		this.x = x;
		this.y = 50;
		this.r = 20;
		this.thickness = 7;
		this.frame = 0;
		this.dframe = 20;
		this.color = "";
		this.randomize();
	}
	//function in charge of picking a random location and type of note
	randomize () {
		this.note_type = note_types[Math.floor(Math.random()*4)];
		this.note = Math.floor(Math.random()*9);
		if (this.note%2==0) {
			//this.y = line_spacing+(7*line_spacing*this.note%2);
			this.y = line_spacing+(line_spacing*this.note/2);
		}
		else {
			this.y = line_spacing+line_spacing/2+(line_spacing*(this.note-1)/2);
		}
		this.color = colors[Math.floor(Math.random()*colors.length)];
	}
	//function that runs every frame to update the page
	update() {
		this.draw();
	}
	//function in charge of displaying a music note
	draw () {
		ctx.fillStyle = "rgba(0,0,0,0.5)";
		ctx.strokeStyle = "rgba(0,0,0,0.5)";
		ctx.beginPath();
		ctx.arc(this.x+5, this.y+5, this.r, 0, this.frame/360 * Math.PI);
		if (this.note_type == "quarter" || this.note_type == "eighth") {
			ctx.fill();
		}
		ctx.stroke();
		ctx.lineWidth = 7;
		if (this.note_type != "whole") {
			if (this.note<=3) {
				ctx.fillRect(this.x+5+this.r,this.y+5,this.thickness,this.frame/8);
			}
			else {
				ctx.fillRect(this.x+this.r+5,this.y-100+5,this.thickness,this.frame/8);
			}
		}
		if (this.note_type == "eighth") {
			if (this.note<=3) {
				ctx.beginPath();
				ctx.arc(this.x+50-7+5,this.r*5+this.y+5,this.r, (2*Math.PI)/2, (3*Math.PI)/2);
				ctx.stroke();
			}
			else {
				ctx.beginPath();
				ctx.arc(this.x+50-7+5,this.y-100+5,this.r, (1*Math.PI)/2, (2*Math.PI)/2);
				ctx.stroke();
			}
		}
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, this.frame/360 * Math.PI);
		if (this.note_type == "quarter" || this.note_type == "eighth") {
			ctx.fill();
		}
		ctx.stroke();
		ctx.lineWidth = 7;
		if (this.note_type != "whole") {
			if (this.note<=3) {
				ctx.fillRect(this.x+this.r,this.y,this.thickness,this.frame/8);
			}
			else {
				ctx.fillRect(this.x+this.r,this.y-100,this.thickness,this.frame/8);
			}
		}
		if (this.note_type == "eighth") {
			if (this.note<=3) {
				ctx.beginPath();
				ctx.arc(this.x+50-7,this.r*5+this.y,this.r, (2*Math.PI)/2, (3*Math.PI)/2);
				ctx.stroke();
			}
			else {
				ctx.beginPath();
				ctx.arc(this.x+50-7,this.y-100,this.r, (1*Math.PI)/2, (2*Math.PI)/2);
				ctx.stroke();
			}
		}
		if (i>this.x && i<canvas.width+500 && this.frame<=800) {
			if (this.frame >= 800) {
				this.frame = 800;
			}
			this.frame+=20;
		}
		if (i-500>canvas.width && this.frame >=0) {
			this.frame+=-20;
			if (this.frame <= 0) {
				this.frame = 0;
			}
		}
	}
}
notes = [];
a = canvas.width/11;
for (i=0;i<10;i++) {
	n = new note(i*a+a);
	notes[i] = n;
}
function draw() {
	//ctx.fillStyle = "#202C3C";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#F8F8F8";
	for (j=0; j<5; j++) {
		ctx.fillStyle = "rgba(0,0,0,0.5)";
		if (i<canvas.width) {
			ctx.fillRect(170,line_spacing+line_spacing*j+5,i,5);
		}
		else {
			ctx.fillRect(170+i-canvas.width,line_spacing+line_spacing*j+5,canvas.width,5);
		}
		ctx.fillStyle = "#F8F8F8";
		if (i<canvas.width) {
			ctx.fillRect(175,line_spacing+line_spacing*j,i,5);
		}
		else {
			ctx.fillRect(175+i-canvas.width,line_spacing+line_spacing*j,canvas.width,5);
		}
		if (i>canvas.width*2) {
			i = 0;
			for (a=0;a<notes.length;a++) {
				notes[a].randomize();
			}
		}
	}
	ctx.fillRect(170,line_spacing,5,line_spacing*4+5);
	window.requestAnimationFrame(draw);
	i=canvas.width;
	for (j=0;j<notes.length;j++) {
		notes[j].update();
	}
	ctx.font = '200px Arial';
	ctx.fillStyle = "rgba(0,0,0,0.5)";
	ctx.fillText('𝄞', 45, line_spacing*5);  // Unicode character U+1D11E
	ctx.font = '200px Arial';
	ctx.fillStyle = "#F8F8F8";
	ctx.fillText('𝄞', 50, line_spacing*5);  // Unicode character U+1D11E
}
draw();
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = 300;
	console.log(canvas.height);
	console.log(canvas.width);
}
// Call resize on load and window resize
window.addEventListener('resize', resize);
