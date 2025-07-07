var canvas;
var ctx;
var colors_theme
var middleY = window.innerHeight / 2;
var middleX = window.innerWidth / 2
window.addEventListener("resize", (_=>resizeCanvas()));

function retrieveCanvasData() {
	let treeCanv = document.getElementById("treeCanvas")
	let treeTab = document.getElementById("treeTab")
	if (treeCanv===undefined||treeCanv===null) return false;
	canvas = treeCanv;
	ctx = canvas.getContext("2d");
	return true;	
}
function resizeCanvas() {	
		if (!retrieveCanvasData()) return
	
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		middleY = window.innerHeight / 2;
        middleX = window.innerWidth / 2
			if (player.cutsceneName == "startGame") {startGameEclipse()}
			else if (player.cutsceneName == "endGame")  {endGameEclipse(); }
			else if (player.cutsceneName == "") {drawTree(); drawEclipse()}
			
}
function fadeOutAt(n) {return 1 - (player.frames-n)/20}
function fadeInAt(n) {return 0 + (player.frames-n)/20}
function startGameEclipse() {
//This is the sun. stays at center
Circle(middleX, middleY, 300, "#ffa340")
//this is the moon. position from bottom left to center 
x = middleX - 200
y = middleY + 200
radia = player.rot / (Math.PI * 10)
Circle(x + (-207 * Math.cos(radia)), y - ( 239 * Math.sin(player.rot / 90)) , 295, "#000000")
/* move at frame 15
F sequence: 15,40
show text here IF player.frames = value
or use fadeInAt()
fade in sequences: 50, 65, 95, 120 [start button show: 150] */	
text((middleX - 170), (middleY - 400), "The Eclipse just started...", fadeInAt(46) , 30)
text((middleX - 210), (middleY + 350), "Your task:", fadeInAt(85) , 30)
text((middleX - 50), (middleY + 350), "Survive the Eclipse", fadeInAt(120) , 30)
//shrink Eclipse down to minimum
//then start game
}
//finished (no buttons)
function endGameEclipse() {
	let finalTime = player.finalTime
	x = middleX 
	y = middleY
	let frame = 0
    radia = player.rot / (Math.PI * 12)
	Circle(middleX, middleY, 300, "#ffa340")
	if (player.frames < 45) frame = player.frames; else (frame = 45)
	Circle((x + 300) + (-300 * Math.cos(radia - 90)), ( y - 50 ) + ( (50 - (frame * 12) ) * Math.sin((radia)  )) , 295, `rgb(0,0,0,${fadeOutAt(45)})`)
	text((middleX - 125), (middleY - 200), "...", 1 , 300)
	text((middleX - 135), (middleY - 120), "The Eclipse is over...", fadeInAt(65) , 30)
	text((middleX - 500), (middleY - 100), `The Eclipse Lasted ${formatTime(finalTime)}...`, fadeInAt(105) , 30)
	text((middleX - 140), (middleY + 150), `There will soon be more to discover...`, fadeInAt(125),20)
}
//static -> does not move

var opac = 0











function drawEclipse() {
	let sizeMult = player.E.EclipseTier.mul(2).mul(player["E"].ENLlevels.clampMin(0.1))
	let sizeMultbestSize = player.E.EclipseTier.mul(2).mul(player["E"].TopLVL).clampMin(0.1)

	if (player.Sol.activeCheck == "Heliosphere") opac+=0.01; else epac = 0;
	
	if (player.Sol["TMSun"].active) {

		//with time:
		/*
			x , y

			cw ,cy

			(cw/2)

		*/

		Circle((canvas.width / 2), 500, new Decimal(sizeMultbestSize).clampMax(10), "#9e6c20")
		Circle((canvas.width / 2), 500, new Decimal(sizeMult).clampMax(11), "#381803")
	}
	else if (player.Sol["TBSun"].active) {

	}
	else if (player.Sol["TRMoon"].active) {

	}
	else if (player.Sol.activeCheck == "Heliosphere"){
		Circle((canvas.width / 2), 500, new Decimal(sizeMultbestSize).mul(player.Sol.HelioRadiation.root(2).mul(0.5)).clampMax(575), "#9e6c20")
		Circle((canvas.width / 2), 500, new Decimal(sizeMult ).mul(player.Sol.HelioRadiation.plus(35).pow(1.34)).clampMax(568), "#381803")
		text((middleX - 120 ), (middleY - 40), "BREAK YOUR LIMITS", 1 , 25)
		text((middleX - 110 ), (middleY - 0), format(player.Sol.HelioRadiation) , 1 , 25)
		text((middleX + 50 ), (middleY - 0), "√" + format(player.Sol.HelioStat["Reduction"])  , 1 , 25)
	} else {
		Circle((canvas.width / 2), 500, sizeMultbestSize, "#ffa340")
		Circle((canvas.width / 2), 500, sizeMult, "#000000")
	}

}






function drawTree() { //hre is taht
	if (!retrieveCanvasData()) return;
	if (!player.inCutscene) ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (!player.inCutscene) drawEclipse();	
	for (layer in layers){
		if (!tmp[layer].layerShown)
			if (tmp[layer].layerShown == true && tmp[layer].branches){
				for (branch in tmp[layer].branches)
					{
						drawTreeBranch(layer, tmp[layer].branches[branch])
					}
			}		
		drawComponentBranches(layer, tmp[layer].upgrades, "upgrade-")
		drawComponentBranches(layer, tmp[layer].buyables, "buyable-")
		drawComponentBranches(layer, tmp[layer].clickables, "clickable-")
		drawComponentBranches(layer, tmp[layer].Viewer, "Viewer-")		
	}
}

function drawComponentBranches(layer, data, prefix) {
	
	for(id in data) {
		if (data[id].branches) {
			for (branch in data[id].branches)
			{
				drawTreeBranch(id, data[id].branches[branch], prefix + layer + "-")
			}

		}
	}

}

function drawTreeBranch(num1, data, prefix) { // taken from Antimatter Dimensions & adjusted slightly
	let num2 = data
	let color_id = 1
	let width = 15

	

	if (Array.isArray(data)){
		num2 = data[0]
		color_id = data[1]
		width = data[2] || width
	}

	if(typeof(color_id) == "number")
		color_id = colors_theme[color_id]
	if (prefix) {
		num1 = prefix + num1
		num2 = prefix + num2
	}

	

	if (document.getElementById(num1) == null || document.getElementById(num2) == null)
		return


	
	let start = document.getElementById(num1).getBoundingClientRect();
    let end = document.getElementById(num2).getBoundingClientRect();

	if (!player.inCutscene) {
	let x1 = start.left + (start.width / 2) + document.body.scrollLeft;
		let y1 = start.top + (start.height / 2) + document.body.scrollTop;
		let x2 = end.left + (end.width / 2) + document.body.scrollLeft;
		let y2 = end.top + (end.height / 2) + document.body.scrollTop;
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.strokeStyle = color_id
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();

	}
	
	

    

	

}

function Circle(x,y,s=10,color="#000000")
{
   // ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = color;
   // var startPoint = (Math.PI/180)*0; Kinda redundant, it's just 0
   // var endPoint = (Math.PI/180)*360; Again, it's just PI times 2
   ctx.beginPath(); 
   ctx.arc(x, y, s, 0, Math.PI * 2, true);    
   ctx.fill();
   ctx.closePath(); 
} 

function text(x,y,t,o,size=100){	
	ctx.fillStyle = `rgb(0,0,0,${o})`;
	ctx.strokeStyle = `rgb(0,0,0,${o})`;
	ctx.font = `${size}px Righteous`
	ctx.textBaseline = "hanging";
	ctx.fillText(`${t}`, x, y);
}

function ring(x,y,s=10) {
	ctx.fillStyle = "rgb(150,29,28)";
	ctx.beginPath(); 
	ctx.arc(x, y, 20, 0 , Math.PI * 2, true); 
	ctx.closePath();

}

function oval(x,y,ScaleX, ScaleY, c="#ffffff") {
		 ctx.translate(x / 2, y / 2);
         ctx.scale(ScaleX, ScaleY);
         ctx.beginPath();
         ctx.arc(middleX, middleY, r, 0, 2 * Math.PI, false);
         ctx.restore();
         ctx.fillStyle = c;
         ctx.fill();
}