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
			if (player.cutsceneName == "startGame" && player.inCutscene ) {startGameEclipse()}
			else if (player.cutsceneName == "endGame" && player.inCutscene )  {endGameEclipse(); }
		    if (!player.inCutscene) drawTree();	
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
text((middleX - 195), (middleY - 400), "The Eclipse has just started...", fadeInAt(46) , 30, "200, 140, 0")
text((middleX - 300), (middleY + 350), "Your task:", fadeInAt(85) , 30, "200, 140, 0")
text((middleX - 120), (middleY + 350), "Survive, and Tame the Eclipse.", fadeInAt(120) , 30, "200, 140, 0")
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
	text((middleX - 220), (middleY - 50), `The Eclipse Lasted ${formatTime(finalTime)}...`, fadeInAt(105) , 15, "200, 140, 0"  )
	//prob need help making this based on the length of the text instead of just eyeballing it :/
	text((middleX - 140), (middleY + 150), `There will soon be more to discover...`, fadeInAt(145),20)
}
//static -> does not move

var opac = 0

function drawEclipse() {
	let sizeMult = player.E.EclipseTier.mul(2).mul(player["E"].ENLlevels.clampMin(0.1))
	let sizeMultbestSize = player.E.EclipseTier.mul(2).mul(player["E"].TopLVL.plus(0.01)).clampMin(0.1)

	if (player.Sol.activeCheck == "Heliosphere") opac+=0.01; else epac = 0;
	
	if (player.Sol.activeCheck == "Heliosphere" && options.showEclipse){
		Circle((canvas.width / 2), 500, new Decimal(sizeMultbestSize).mul(player.Sol.HelioRadiation.root(2).mul(0.5)).clampMax(575), "#9e6c20")
		Circle((canvas.width / 2), 500, new Decimal(sizeMult ).mul(player.Sol.HelioRadiation.plus(35).pow(1.34)).clampMax(568), "#381803")
		text((middleX - 120 ), (middleY - 40), "BREAK YOUR LIMITS", 1 , 25)
		text((middleX - 110 ), (middleY ), format(player.Sol.HelioRadiation) , 1 , 25)
		text((middleX + 50 ), (middleY ), "√" + format(player.Sol.HelioStat["Reduction"])  , 1 , 25)
	} else {
		if (options.showEclipse){

			//The Raging moons "Eclipse"
			if (player.Sol["TRMoon"].active) {
			Circle((canvas.width / 2)+(Math.sin(player.RMT/40) * Math.cos(player.C.CenterPoints.mul(1.2))), 500-((player.RMT/40) * Math.sin(player.C.CenterPoints) ), player.C.Score.log(1.5).clampMax(500), "#823c3c")
			Circle((canvas.width / 2)+(Math.sin(player.RMT/50) * Math.cos(player.C.CenterPoints)), 500-((player.RMT/50) * Math.sin(player.C.CenterPoints) ), player.C.CenterPoints.mul(1.25).clampMax(450), "#656561")

			}
			// The Melted Suns "Eclipse"
			else if (player.Sol["TMSun"].active) {
			Circle((canvas.width / 2)+0.01, 500, player.points.root(player.Sol["TMSun"].x.plus(player.Sol["TMSun"].pending)).log(1.79).plus(0.01).clampMax(450), "#005ad8", Math.PI*2.2)	//base of the circle
			Circle((canvas.width / 2), 500, player.SolarityCap.root(player.Sol["TMSun"].x.plus(player.Sol["TMSun"].pending)).log(1.8).clampMax(500), "#04044c", Math.PI*2.4)
			Circle((canvas.width / 2)+0.01, 500, player.points.root(player.Sol["TMSun"].x.plus(player.Sol["TMSun"].pending)).log(1.735).plus(0.01).clampMax(450), "#005ad8", Math.PI/1.3)
			Circle((canvas.width / 2), 500, player.SolarityCap.root(player.Sol["TMSun"].x.plus(player.Sol["TMSun"].pending)).log(1.74).clampMax(500), "#04044c", Math.PI/1.8)	
			}
			//TBSun's "Eclipse"
			else if (player.Sol["TBSun"].active) { 
			
			let TBSun = player.Sol.TBSun.x
			let TBSunP = player.Sol.TBSun.pending
				
			let c1effect = decimalOne.plus(player.L.LunarPower.log(5)).pow(player.L.LunarPower.log(2)).clampMin(1)

          // Broken core's influence
          let BC2_INFL = false
          if (player.Sol["TBCore"].active && getCoreDifficulty().eq(2)) BC2_INFL = true
				//-------------------------------------------          
          //The Bleeding Sun 1 & 2
          let BLEEDINGSUN_POWER = 1
          if (BC2_INFL) BLEEDINGSUN_POWER = 7 // Broken core influence
          else if ( player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(1)) BLEEDINGSUN_POWER = TBSun.plus(TBSunP).mul(2).plus(1)
          let base_NOMERCYDEBUFF = decimalOne.plus( player.L.LunarPower.log(7.5)).pow(player.L.LunarPower.log(4)) .clampMin(1).pow(BLEEDINGSUN_POWER)

          let c1NOMERCYDEBUFF = base_NOMERCYDEBUFF

				Circle((canvas.width / 2), 500, player.points.log(10).root(1.25).clampMax(500), "#baa921", Math.PI*2)
				
					Circle((canvas.width / 2), 500, c1effect.log(1.32).pow(1.21).clampMax(500), "#786400", Math.PI*2.5)	
					
				Circle((canvas.width / 2), 500, player.L.LunarPower.log(1.1).pow(1.1).clampMax(500), "#702500", Math.PI)
					
				Circle((canvas.width / 2), 500, c1NOMERCYDEBUFF.log(2).clampMax(500), "#baa921", Math.PI/1.5)
					
			}

			else {
			Circle((canvas.width / 2), 500, sizeMultbestSize, "#ffa340")
			Circle((canvas.width / 2), 500, sizeMult, "#000000")
		    }
		
		}
	}

}
function drawTree() { //hre is taht
	if (!retrieveCanvasData()) return;
	if (!player.inCutscene) ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (!player.inCutscene) drawEclipse();	
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
	let width = 8

	

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







// Fundamental shapes and things

function Circle(x,y,s=10,color="#000000",arc=Math.PI * 2)
{
   // ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = color;
   // var startPoint = (Math.PI/180)*0; Kinda redundant, it's just 0
   // var endPoint = (Math.PI/180)*360; Again, it's just PI times 2
   ctx.beginPath(); 
   ctx.arc(x, y, s, 0, arc, true);    
   ctx.fill();
   ctx.closePath(); 
} 

function text(x,y,t,o,size=100,color="0,0,0"){	
	ctx.fillStyle = `rgb(${color+','+o})`;
	ctx.strokeStyle = `rgb(${color+','+o})`;
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