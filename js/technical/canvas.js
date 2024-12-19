var canvas;
var ctx;



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
		canvas.width = 0;
		canvas.height = 0;
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;
		
		if (!player.inCutscene) drawTree();
		if (!player.inCutscene) drawEclipse();
		
		if (player.inCutscene){
			if (!player.startedGame) startGameEclipse();
			else if (player.gameEnded) endGameEclipse();
		}
		
		

		
}


var colors_theme





function startGameEclipse() {

let basex = canvas.width / 2

//This is the sun. stays at center
Circle(basex, 500, 300, "#ffa340")



let x1 = 30


//this is the moon. position from bottom left to center 
Circle(basex , 500, 295, "#000000")


//move at frame 15
//F sequence: 15,40


//show text here

//shrink Eclipse down to minimum

//then start game

}


function endGameEclipse() {

	text((canvas.width/2) + 100, 700, "...",30,1) 
}



//static -> does not move
function drawEclipse() {
	let sizeMult = player.E.EclipseTier.mul(2).mul(player["E"].ENLlevels.clampMin(0.1))
	let sizeMultbestSize = player.E.EclipseTier.mul(2).mul(player["E"].TopLVL).clampMin(0.1)

	
	Circle((canvas.width / 2), 500, sizeMultbestSize, "#ffa340")
	Circle((canvas.width / 2), 500, sizeMult, "#000000")

}



function drawTree() { //hre is taht
	if (!retrieveCanvasData()) return;
	
	if (!player.inCutscene) ctx.clearRect(0, 0, canvas.width, canvas.height);


	
	for (layer in layers){
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

function init()
{
   canvas = document.getElementById('canvas');
   if(canvas.getContext)
	ctx = canvas.getContext('2d');
   else return;

   setInterval(draw, 1000 / 60); // 60 times per second
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

function text(x,y,t,size=20,o=1){
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






function hideAll() {
	
}














