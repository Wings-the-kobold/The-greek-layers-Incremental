var player;
var needCanvasUpdate = true;

var TSEGICompletions = {
		"V0.6" : false,
		"V0.6_Amount" : 0,

		"V0.7" : false,
		"V0.7_Amount" : 0,

		"V0.8" : false,
		"V0.8_Amount" : 0,
	}
const cooldownBeforeChange = 15
var CoreEffectChange = 0
var Core_effValue = 3
var prevCore_eff_Val = 3
var CoreEffectMul = 0.03
var JearEffectBoost_Core;

var AdaptiveDisp = { //every time I try to change the text I have to change the name of it?????

                //dude i hated doing this, now this looks kinda sloppy
            "Light": `<span style="color:rgba(255, 231, 112, 0.91)"> Light:<b> ^1.08 to Solarity gain cap </b></span>`,
            "Dark": `<span style="color:rgba(123, 51, 144, 1)"> Dark: <b>^1.05 to SR cap </b> </span>`,
            "TMSun": `<span style="color:rgba(0, 27, 161, 0.74)"> The Melted Sun: Solar shards boost themselves at a log7 rate </span>`,
            "TBSun": `<span style="color:rgba(94, 44, 8, 1)"> The Bleeding Eclipse: <b>Lunar Instability Debuff begins later based on Lunar Essence </b></span>`, //Based on 100 * Lunar Essence^0.5
          //${format(basedLALater)} L.A <h5>(x${format(formulaLI_StartsLater),3}) 
            "TRMoon": `<span style="color:rgba(94, 8, 85, 1)" > The Raging Moon: <b>Plasmate and Multiply asunderingly divides CP requirements </b> </span>`,
			// (x + y)^0.25

                                // or Gain 20 Free Multiply and Plasmate levels that counts towards Modifier Score
            "TBCore": `<span style="color:rgb(147, 0, 0)"> The Broken Core: <b> give free core energy for each upgrade purchased based on a percentage of core energy (effect changes every 15 Seconds)<b></span>`,
			//5 - 10% range. changes every 15 seconds; maybe an idea or not
          //${hasUpgrade("C",22) ? "<br> Currently: " + format(player.points.log(20).times(0.02),4) : ""} 
            
            "None": `<span style="color:rgba(255, 255, 255, 0.74)"> Weaver on standby... ^1.15 to Solarity gain </span>`,
          
            }


//Core_effValue*0.01
// 100*Math.round(10000*(Core_effValue*0.01))/10000    

const yes = true;
const no = false;

var Heirarchys_ValueBeforeSelfNerf = new Decimal(1)
var SRCap_BeforeAdaptiveBonus = new Decimal(1)
var capBeforeLightAdaptive = new Decimal(1)
// Don't change this
// Remixed note: oh but what if i do >:3
const TMT_VERSION = {
	tmtNum: "2.6.6.2",
	tmtName: "Fixed Reality"
}

var DarknessUpgs_Row1 = [16, 8, 4]
var DarknessUpgs_Row2 = [1.05, 1.15, 3.14]
const DarknessUpgs_Row3 = [6.75e5, 1.09, 2] //this is a const for now maybe

var CoronalEffectRanges = [0.4 , 5.4]

var optionWheelElement = document.getElementById("optionWheel");



const loadingTips = [
`Tooltips added since 11/6/2025!`, // Message or "tooltip" here in every line
`Did you know? That if you try hitting F5 the page refreshes?`,
`Thank you for playing!`,
`<i>"We will always see the moon, before it collapses into rage"</i> - The Dark Sun`,
`<i>"Our Selfless opposition leaves ourselves in such a wither"</i> - The Decaying Sun`,
`<i>"Why do our ends fall deep in such constant pressure"</i> - Solaris`,
`<i>"Please, I beg you to forget me no longer. These chains peirce my broken soul..."</i> - Lunaris`,
`<i>"Do you trust the light? Will you ever find our paths to satisfy the darkness?"</i> - The Light Sun `,
`<i>"From the pressure of the sun, to the calefaction of what you witness" </i> - The Heliosphere`,
`"<i>Share the light, Our presence of magnitation falls upon you"</i> - Theia`,
`"<i>The wrath of our light, mixed with your hopefullness... "</i> - The Raging Moon`,
`*🐊 crocodile noises*`,
`There are 20 Current tooltips in this loading screen! 60% of them are quotations`,
`:3 hai uwu :D >:(`, // 1 in 1,000, 0.1%
`"<i>My effectiveness... is it all real? or is it all but a dream?" </i>- The Melted Sun`,
`"<i>Wounds of my pride bled none, from all means of new power useless..." </i>- The Bleeding Eclipse`,
`"<i>Do they all hate me...? why am I here to be left distant with another... "</i> - Glade `, //5x rarer than other quotes
`"<i>The sun sheds a new dark, shadows never seen before... "</i> - The shade unknown`,
`"<i>The moon turns our way, off from our helpless bodies"</i> - Lunaris`,
`"<i>Perished rays of light that only wanted chaos..."</i> - Lunaris`,
`"<i>The weak sun provides no more, feel its heart teetering."</i> - Solaris`,
`"<i>And yet, the sun rises, why must we no longer appreciate it for its volatility?</i>"`,
`"<i>Do we sin for the sake of our own pleasurable gains?" - The Sinful sun</i>`,
`"<i>Death awaits to those who succumb to the <b>fools eclipse</b> </i>" - The Core`,
`<i>"Nothing can explain how the sun can feel our souls..."</i> - Spectrometer`,
`<i>"...Joy is just an illusion that you breathe. of which we will no longer feel. </i> - The Apathetic Sun`,
`<i>"Do you trust the things that used to be?"</i> - The Decaying Sun`,
`*Greed has stolen this loading tip*`,
`<i>"From all the rocks to things that no longer can be usable... yet we are all broken"</i> - ???`,
`<i>" " </i> - Name`,
`<i>" " </i> - Name`,
`<i>" " </i> - Name`,
`<i>" " </i> - Name`,
`<i>" " </i> - Name`,
`If you see this then that means you have eyes! (yes! really!)`,
``,

]

const rareLoadingTips = [ // > 10000, or 0.1% chance
	
	`The chance of this tooltip appearing is 1 in 1000!`, // 1 in 10000
	`<h1> BIG TEXT YEAHHH!!!!1 </h1>`, // 1 in 25000
	`damn bro, you need to take a shower, I can smell you through the screen 🤢`, // 1 in 27500
	`<i>"Forget ourselves again, Just like... Echo..."</i> - <b>???</b>`, // 1 in 30000

	//1 in 3 if RNG is over 1/50000
	`<i>"THE FUCKING PAIN, I CAN'T LIVE BEING TORTURED ANYMORE SOLARIS! IT HURTS, STOP DOING THIS TO ME"</i> - Lunaris..?`, // 1 in 50000
	`<i>"You will stay in that corner, chained for eternity, Lunaris. I don't care what you think about <b>them</b>"</i> - Solaris..?`, // 1 In 50000
	`<h3><i>"...Am I... a soul~ that's... cursed? I cant...</i>" - Greed..?</h3>`
]




function getResetGain(layer, useType = null) {
	let type = useType
	if (!useType){ 
		type = tmp[layer].type
		if (layers[layer].getResetGain !== undefined)
			return layers[layer].getResetGain()
	} 
	if(tmp[layer].type == "none")
		return new Decimal (0)
	if (tmp[layer].gainExp.eq(0)) return decimalZero
	if (type=="static") {
		if ((!tmp[layer].canBuyMax) || tmp[layer].baseAmount.lt(tmp[layer].requires)) return decimalOne
		let gain = tmp[layer].baseAmount.div(tmp[layer].requires).div(tmp[layer].gainMult).max(1).log(tmp[layer].base).times(tmp[layer].gainExp).pow(Decimal.pow(tmp[layer].exponent, -1))
		gain = gain.times(tmp[layer].directMult)
		return gain.floor().sub(player[layer].points).add(1).max(1);
	} else if (type=="normal"){
		if (tmp[layer].baseAmount.lt(tmp[layer].requires)) return decimalZero
		let gain = tmp[layer].baseAmount.div(tmp[layer].requires).pow(tmp[layer].exponent).times(tmp[layer].gainMult).pow(tmp[layer].gainExp)
		if (gain.gte(tmp[layer].softcap)) gain = gain.pow(tmp[layer].softcapPower).times(tmp[layer].softcap.pow(decimalOne.sub(tmp[layer].softcapPower)))
		gain = gain.times(tmp[layer].directMult)
		return gain.floor().max(0);
	} else if (type=="custom"){
		return layers[layer].getResetGain()
	} else {
		return decimalZero
	}
}

function getNextAt(layer, canMax=false, useType = null) {
	let type = useType
	if (!useType) {
		type = tmp[layer].type
		if (layers[layer].getNextAt !== undefined)
			return layers[layer].getNextAt(canMax)

		}
	if(tmp[layer].type == "none")
		return new Decimal (Infinity)

	if (tmp[layer].gainMult.lte(0)) return new Decimal(Infinity)
	if (tmp[layer].gainExp.lte(0)) return new Decimal(Infinity)

	if (type=="static") 
	{
		if (!tmp[layer].canBuyMax) canMax = false
		let amt = player[layer].points.plus((canMax&&tmp[layer].baseAmount.gte(tmp[layer].nextAt))?tmp[layer].resetGain:0).div(tmp[layer].directMult)
		let extraCost = Decimal.pow(tmp[layer].base, amt.pow(tmp[layer].exponent).div(tmp[layer].gainExp)).times(tmp[layer].gainMult)
		let cost = extraCost.times(tmp[layer].requires).max(tmp[layer].requires)
		if (tmp[layer].roundUpCost) cost = cost.ceil()
		return cost;
	} else if (type=="normal"){
		let next = tmp[layer].resetGain.add(1).div(tmp[layer].directMult)
		if (next.gte(tmp[layer].softcap)) next = next.div(tmp[layer].softcap.pow(decimalOne.sub(tmp[layer].softcapPower))).pow(decimalOne.div(tmp[layer].softcapPower))
		next = next.root(tmp[layer].gainExp).div(tmp[layer].gainMult).root(tmp[layer].exponent).times(tmp[layer].requires).max(tmp[layer].requires)
		if (tmp[layer].roundUpCost) next = next.ceil()
		return next;
	} else if (type=="custom"){
		return layers[layer].getNextAt(canMax)
	} else {
		return decimalZero
	}}

function softcap(value, cap, power = 0.5) {
	if (value.lte(cap)) return value
	else
		return value.pow(power).times(cap.pow(decimalOne.sub(power)))
}

// Return true if the layer should be highlighted. By default checks for upgrades only.
function shouldNotify(layer){
	for (id in tmp[layer].upgrades){
		if (isPlainObject(layers[layer].upgrades[id])){
			if (canAffordUpgrade(layer, id) && !hasUpgrade(layer, id) && tmp[layer].upgrades[id].unlocked){
				return true
			}
		}
	}
	if (player[layer].activeChallenge && canCompleteChallenge(layer, player[layer].activeChallenge)) {
		return true
	}

	if (tmp[layer].shouldNotify)
		return true

	if (isPlainObject(tmp[layer].tabFormat)) {
		for (subtab in tmp[layer].tabFormat){
			if (subtabShouldNotify(layer, 'mainTabs', subtab)) {
				tmp[layer].trueGlowColor = tmp[layer].tabFormat[subtab].glowColor || defaultGlow

				return true
			}
		}
	}

	for (family in tmp[layer].microtabs) {
		for (subtab in tmp[layer].microtabs[family]){
			if (subtabShouldNotify(layer, family, subtab)) {
				tmp[layer].trueGlowColor = tmp[layer].microtabs[family][subtab].glowColor
				return true
			}
		}
	}
	 
	return false
	
}

function canReset(layer)
{	
	if (layers[layer].canReset!== undefined)
		return run(layers[layer].canReset, layers[layer])
	else if(tmp[layer].type == "normal")
		return tmp[layer].baseAmount.gte(tmp[layer].requires)
	else if(tmp[layer].type== "static")
		return tmp[layer].baseAmount.gte(tmp[layer].nextAt) 
	else 
		return false
}

function rowReset(row, layer) { //here is i found what resets the layers
	for (lr in ROW_LAYERS[row]){
		if(layers[lr].doReset) {
			if (!isNaN(row)) Vue.set(player[lr], "activeChallenge", null) // Exit challenges on any row reset on an equal or higher row
			run(layers[lr].doReset, layers[lr], layer)
		}
		else
			if(tmp[layer].row > tmp[lr].row && !isNaN(row)) layerDataReset(lr)
	}
}

function layerDataReset(layer, keep = []) {
	let storedData = {unlocked: player[layer].unlocked, forceTooltip: player[layer].forceTooltip, noRespecConfirm: player[layer].noRespecConfirm, prevTab:player[layer].prevTab} // Always keep these

	for (thing in keep) {
		if (player[layer][keep[thing]] !== undefined)
			storedData[keep[thing]] = player[layer][keep[thing]]
	}

	Vue.set(player[layer], "buyables", getStartBuyables(layer))
	Vue.set(player[layer], "clickables", getStartClickables(layer))
	Vue.set(player[layer], "challenges", getStartChallenges(layer))
	Vue.set(player[layer], "grid", getStartGrid(layer))

	layOver(player[layer], getStartLayerData(layer))
	player[layer].upgrades = []
	player[layer].milestones = []
	player[layer].achievements = []

	for (thing in storedData) {
		player[layer][thing] =storedData[thing]
	}
}


	function addPoints(layer, gain) {
		player[layer].points = player[layer].points.add(gain).max(0)
		if (player[layer].best) player[layer].best = player[layer].best.max(player[layer].points)
	if (player[layer].total) player[layer].total = player[layer].total.add(gain)
}

function generatePoints(layer, diff) {
	addPoints(layer, tmp[layer].resetGain.times(diff))
}
// run(layers["GL"].onPrestige, layers["GL"], gainh)
	function doReset(layer, force=false) {	
	if (tmp[layer].type == "none") return
	let row = tmp[layer].row
	if (!force) {
		
		if (tmp[layer].canReset === false) return;
		
		if (tmp[layer].baseAmount.lt(tmp[layer].requires)) return;
		let gain = tmp[layer].resetGain
		if (tmp[layer].type=="static") {
			if (tmp[layer].baseAmount.lt(tmp[layer].nextAt)) return;
			gain =(tmp[layer].canBuyMax ? gain : 1)
		} 


		if (layers[layer].onPrestige)
			run(layers[layer].onPrestige, layers[layer], gain)
		
		addPoints(layer, gain)
		updateMilestones(layer)
		updateAchievements(layer)

		if (!player[layer].unlocked) {
			player[layer].unlocked = true;
			needCanvasUpdate = true;

			if (tmp[layer].increaseUnlockOrder){
				lrs = tmp[layer].increaseUnlockOrder
				for (lr in lrs)
					if (!player[lrs[lr]].unlocked) player[lrs[lr]].unlockOrder++
			}
		}
	
	}

	if (run(layers[layer].resetsNothing, layers[layer])) return
	tmp[layer].baseAmount = decimalZero // quick fix


	for (layerResetting in layers) {
		if (row >= layers[layerResetting].row && (!force || layerResetting != layer)) completeChallenge(layerResetting)
	}

	player.points = (row == 0 ? decimalZero : getStartPoints())

	for (let x = row; x >= 0; x--) rowReset(x, layer)
	for (r in OTHER_LAYERS){
		rowReset(r, layer)
	}

	player[layer].resetTime = 0

	updateTemp()
	updateTemp()
} //EW

function resetRow(row) {
	//if (prompt('Are you sure you want to reset this row? It is highly recommended that you wait until the end of your current run before doing this! Type "I WANT TO RESET THIS" to confirm')!="I WANT TO RESET THIS") return
	let pre_layers = ROW_LAYERS[row-1]
	let layers = ROW_LAYERS[row]
	let post_layers = ROW_LAYERS[row+1]
	rowReset(row+1, post_layers[0])
	doReset(pre_layers[0], true)
	for (let layer in layers) {
		player[layer].unlocked = false
		if (player[layer].unlockOrder) player[layer].unlockOrder = 0
	}
	player.points = getStartPoints()
	updateTemp();
	resizeCanvas();
}

function startChallenge(layer, x) {
	let enter = false
	if (!player[layer].unlocked || !tmp[layer].challenges[x].unlocked) return
	if (player[layer].activeChallenge == x) {
		completeChallenge(layer, x)
		Vue.set(player[layer], "activeChallenge", null)
		} else {
		enter = true
	}	
	doReset(layer, true)
	if(enter) {
		Vue.set(player[layer], "activeChallenge", x)
		run(layers[layer].challenges[x].onEnter, layers[layer].challenges[x])
	}
	updateChallengeTemp(layer)
} //EW






function canCompleteChallenge(layer, x)
{
	if (x != player[layer].activeChallenge) return
	let challenge = tmp[layer].challenges[x]
	if (challenge.canComplete !== undefined) return challenge.canComplete

	if (challenge.currencyInternalName){
		let name = challenge.currencyInternalName
		if (challenge.currencyLocation){
			return !(challenge.currencyLocation[name].lt(challenge.goal)) 
		}
		else if (challenge.currencyLayer){
			let lr = challenge.currencyLayer
			return !(player[lr][name].lt(challenge.goal)) 
		}
		else {
			return !(player[name].lt(challenge.goal))
		}
	}
	else {
		return !(player.points.lt(challenge.goal))
	}

} //YUCK

function completeChallenge(layer, x) {
	var x = player[layer].activeChallenge
	if (!x) return
	
	let completions = canCompleteChallenge(layer, x)
	if (!completions){
		Vue.set(player[layer], "activeChallenge", null)
		run(layers[layer].challenges[x].onExit, layers[layer].challenges[x])
		return
	}
	if (player[layer].challenges[x] < tmp[layer].challenges[x].completionLimit) {
		needCanvasUpdate = true
		player[layer].challenges[x] += completions
		player[layer].challenges[x] = Math.min(player[layer].challenges[x], tmp[layer].challenges[x].completionLimit)
		if (layers[layer].challenges[x].onComplete) run(layers[layer].challenges[x].onComplete, layers[layer].challenges[x])
	}
	Vue.set(player[layer], "activeChallenge", null)
	run(layers[layer].challenges[x].onExit, layers[layer].challenges[x])
	updateChallengeTemp(layer)
}





VERSION.withoutName = "v" + VERSION.num + (VERSION.pre ? " Pre-Release " + VERSION.pre : VERSION.pre ? " Beta " + VERSION.beta : "")
VERSION.withName = VERSION.withoutName + (VERSION.name ? ": " + VERSION.name : "")


function autobuyUpgrades(layer){
	if (!tmp[layer].upgrades) return
	for (id in tmp[layer].upgrades)
		if (isPlainObject(tmp[layer].upgrades[id]) && (layers[layer].upgrades[id].canAfford === undefined || layers[layer].upgrades[id].canAfford() === true))
			buyUpg(layer, id) 
}

function gameLoop(diff) {
	if (isEndgame() || tmp.gameEnded){
		tmp.gameEnded = true
		clearParticles()
	}

	if (isNaN(diff) || diff < 0) diff = 0
	if (tmp.gameEnded && !player.keepGoing) {
		diff = 0
		//player.tab = "tmp.gameEnded"
		clearParticles()
	}

	if (maxTickLength) {
		let limit = maxTickLength()
		if(diff > limit)
			diff = limit
	}
	if (!player.gameEnd || player.startedGame) addTime(diff)
	player.points = player.points.add(tmp.pointGen.times(diff)).max(0);

	for (let x = 0; x <= maxRow; x++){
		for (item in TREE_LAYERS[x]) {
			let layer = TREE_LAYERS[x][item]
			player[layer].resetTime += diff
			if (tmp[layer].passiveGeneration) generatePoints(layer, diff*tmp[layer].passiveGeneration);
			if (layers[layer].update) layers[layer].update(diff);
		}
	}

	for (row in OTHER_LAYERS){
		for (item in OTHER_LAYERS[row]) {
			let layer = OTHER_LAYERS[row][item]
			player[layer].resetTime += diff
			if (tmp[layer].passiveGeneration) generatePoints(layer, diff*tmp[layer].passiveGeneration);
			if (layers[layer].update) layers[layer].update(diff);
		}
	}	

	for (let x = maxRow; x >= 0; x--){
		for (item in TREE_LAYERS[x]) {
			let layer = TREE_LAYERS[x][item]
			if (tmp[layer].autoPrestige && tmp[layer].canReset) doReset(layer);
			if (layers[layer].automate) layers[layer].automate();
			if (tmp[layer].autoUpgrade) autobuyUpgrades(layer)
		}
	}

	for (row in OTHER_LAYERS){
		for (item in OTHER_LAYERS[row]) {
			let layer = OTHER_LAYERS[row][item]
			if (tmp[layer].autoPrestige && tmp[layer].canReset) doReset(layer);
			if (layers[layer].automate) layers[layer].automate();
				player[layer].best = player[layer].best.max(player[layer].points)
			if (tmp[layer].autoUpgrade) autobuyUpgrades(layer)
		}
	}

	for (layer in layers){
		if (layers[layer].milestones) updateMilestones(layer);
		if (layers[layer].achievements) updateAchievements(layer)
	}

}

function hardReset(resetOptions) {
	
	alert("Yo, I gotta tell you something")
	alert("If you hard reset the game")	
	alert("You'll lose <i>everything</i>. excluding TSEGI Completions")	
	if (confirm("are you sure you want to reset this game?")) alert("Like, listen to me.")

	if (!confirm("do you REALLY want to hard reset this game?")) return
	


	player = null
	if(resetOptions) options = null
	save(true);
	window.location.reload();
}

function startOver() 
{
    player = null
	if(resetOptions) options = null

	TSEGICompletions["V" + VRSN] = true
	TSEGICompletions["V" + VRSN + "_Amount"] += 1

	save(true);
	window.location.reload();
}



var ticking = false

function UpdateBorders() {
//recall borders here

for (item in player.borders) {
	if (item != AllBorders) item = AllBorders
}

if (player["E"].activeCheck == "Forgotton") {let forgottonBorder = "rgba(73, 60, 85, 1)"; player.borders["SR"] = forgottonBorder; player.borders["CEN"] = forgottonBorder; player.borders["GL"] = forgottonBorder; }

else if (getClickableState("L", 42)) player.borders["SR"] = "rgba(26, 0, 68, 1)"; 
else if (player.L.TimeTillDarkActive) {for (item in player.borders) player.borders[item] = "rgba(148, 104, 208, 1)"}
else if (player["Sol"].activeCheck == "Heliosphere") {for (item in player.borders) player.borders[item] = "rgba(169, 51, 0, 1)"}

else if (player.Sol.TRMoon.active) player.borders["CEN"] = "rgba(57, 11, 30, 1)"; 

else if (player.Sol.TMSun.active) {player.borders["GL"] = "rgba(15, 0, 127, 1)";  player.borders["CEN"] = "rgba(15, 0, 127, 1)"; }

else if (player.Sol.TBSun.active) player.borders["L"] = "rgba(145, 76, 41, 0.99)";
else for (item in player.borders) player.borders[item] = AllBorders;




}


var interval = setInterval(function() {
	if (player===undefined||tmp===undefined) return;
	if (ticking) return;
	if (tmp.gameEnded && !player.keepGoing) return;
	ticking = true


	let now = Date.now()
	let diff = ((now - player.time) / 1e3)
	let trueDiff = diff


	CoreEffectChange+=1*diff
	if (CoreEffectChange>=cooldownBeforeChange) {
		CoreEffectChange=0; 
		prevCore_eff_Val=Core_effValue;
		Core_effValue=format(generateRandomNumber(1.5,4.5,false));
		CoreEffectMul = Core_effValue/100
	}

	if (player.offTime !== undefined) {
		if (player.offTime.remain > modInfo.offlineLimit * 3600) player.offTime.remain = modInfo.offlineLimit * 3600
		if (player.offTime.remain > 0) {
			let offlineDiff = Math.max(player.offTime.remain / 10, diff)
			player.offTime.remain -= offlineDiff
			diff += offlineDiff 
		}
		if (!options.offlineProd || player.offTime.remain <= 0) player.offTime = undefined
	}
	if (player.devSpeed) diff *= player.devSpeed
	player.time = now

	if (needCanvasUpdate){ resizeCanvas();
		needCanvasUpdate = false;
	}
	
	tmp.scrolled = document.getElementById('treeTab') && document.getElementById('treeTab').scrollTop > 30
	updateTemp();
	updateOomps(diff);
	updateWidth()
	updateTabFormats()
	
	if (!options.pauseGame) gameLoop(diff)
	fixNaNs()
	adjustPopupTime(trueDiff)
	updateParticles(trueDiff) 
	resizeCanvas();
	
	ticking = false
	//custom non-TMT functions
	if (options.betterTree) UpdateBorders();
	UpdateCoresColor();
	UpdateBranches();
	UpdateRealTime();
	changeImagesIndirect();
	

	if (options.animateTree) {
		nodePos.tick += 1
		if ( nodePos.tick>360 ) nodePos.tick=0
	}
			// Remove deprecated things
			if (document.getElementById("info")) document.getElementById("info").remove()
}, 80)

setInterval(function() {

	
	needCanvasUpdate = true

}, 1)

function UpdateCoresColor() {
	let max = 90
    let min = 20

        
    let range = max-min
    let offset = (max+min)/2
	let amplitude = range/2

          
	if (player.Sol["TBCore"].active) {
		 increment += 1
		 if (increment > 180) increment = 0
		 vib = offset + 1 + Math.sin(increment/20)*amplitude
		 //Decimal.plus(offset+1, Math.sin(player["GL"].Time.div(30))*(range/2)).sub(0.05)
	}
}
function UpdateBranches() {
	tmp["GL"].branches = options.betterTree ? ["S"] : ["S","E"]; 
	tmp["C"].branches = options.betterTree ?  ["E","S"] : ["S"]

}
function UpdateRealTime() {
	const time = new Date();
	const hours = time.getHours() % 12;
	const am_pm = time.getHours() < 12;
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();
	TimeIs = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${am_pm ? '(Day)' : '(Night)'}`
}

function changeImagesIndirect() {
	var optionWheelElement = document.getElementById("optionWheel");	 
	if (optionWheelElement != null && optionWheelElement.getAttribute("src") === "options_wheel.png") optionWheelElement.setAttribute("src", "resources/settings.png");
}

function outerGameUpdates() {
	


}

//ALL CUSTOM FUNCTIONS ARE HERE

//Layer Resets
function layer1Reset(keepUpgrades=false, type="Any") {
player.resetTime = decimalZero

let resetPoints = 0

// Keep upgrades part of the reset
if (player.C.EffectorTier.gte(5)) { resetPoints = 1 }
else if (player.C.EffectorTier.gte(4) || keepUpgrades == true) { player.S.upgrades = [11,12,13,14] }
else if (player.C.EffectorTier.gte(3)) { player.S.upgrades = [11,12,13] }
else if (player.C.EffectorTier.gte(2)) { player.S.upgrades = [11,12]}
else if (player.C.EffectorTier.gte(1)) { player.S.upgrades = [11]}
else if (player.Sol.TMSun.x.gte(5) && (getClickableState("L",41) || getClickableState("L",42))) { player.S.upgrades = [11,12,13,14] }
else { player.S.upgrades = [] }



// Reset Layer Layer 0 currencies
player["S"].points = decimalOne
player.points = player.points.mul(0) // player.points = new Decimal(0)

//For The Converter (should be in the reset instead of here)
player["GL"].Solarlight = new Decimal(0)

//Buyable amount QoL
if ( player.Sol.TRMoon.x.gte(1) && type == "C") 
	{
	return;
}
else if (player.Sol.TMSun.x.gte(1) && type == "SL")
	{
	return;
}
else { 
	setBuyableAmount("S", 11, new Decimal(0)); 
	if (player.Sol.TMSun.x.gte(5) && (getClickableState("L",41) || getClickableState("L",42))) return;
		else setBuyableAmount("S", 12, new Decimal(0))

}

}

function layer2Reset(force=false) {
// Reset currencies

	player.GL.Solar_Shards = new Decimal(0)
	player.C.CenterPoints = new Decimal(0)

	// Reset Check upgrades
	if (!player.E.EclipseTier.gte(3) || force) player["C"].hasFormality = false
	if (!player.E.EclipseTier.gte(4) || force) player["C"].hasHeirarchy = false
	if (!player.E.EclipseTier.gte(5) || force) player["C"].hasTwilight = false


	player.C.Highest = new Decimal(0)
	player.C.Score = new Decimal(0) //idk why this is here lol since its updated automatically

	//Reset upgrades
	player.C.upgrades = []
	player.GL.upgrades = []
	player.C.EffectorTier = new Decimal(0)


	// Reset Buyable levels
	setBuyableAmount("GL", 11, new Decimal(0) )

	//leave dilation  
	exitGeneration()

	//Reset Lower layers
	layer1Reset(false, "Default")

}







//layer3Reset(force=false)



//Generation thigns
function exitGeneration() {
	const currentState = getClickableState("GL", 11)
    if (currentState == true) setClickableState("GL", 11, false)
}
// Custom made reset
function EclipsiumReset(type="recontrol" , Queuereset=false) {
	let varControl = true ? type!="recontrol" : true	
					// if player has Pest-1A or something

	if (!player.Sol["TBCore"].x.gte(2) && type!="recontrol") player.C.EffectorTier = new Decimal(0)
	player.GL.Solar_Shards = player.GL.Solar_Shards.root(3).floor()
	
	player.C.CenterPoints = player.C.CenterPoints.root(3)
	setBuyableAmount("GL", 11, getBuyableAmount("GL",11).root(2).floor())
	player.GL.upgrades = []
	player.C.upgrades = []
	player.C.Highest = player.C.Highest.mul(0)
    player.C.Score = player.C.Score.mul(0)

	if (!player.E.EclipseTier.gte(3)) player["C"].hasFormality = false
	if (!player.E.EclipseTier.gte(4)) player["C"].hasHeirarchy = false
	if (!player.E.EclipseTier.gte(5)) player["C"].hasTwilight = false
	
	exitGeneration()
	
	if (Queuereset == true){ player.C.checkUpgrades = new Decimal(0); player["C"].hasFormality = false; player["C"].hasHeirarchy = false; player["C"].hasTwilight = false}
	layer1Reset(player.Sol["TBSun"].x.gte(1))

}

function ReplicEffect(offset) {
 let replic = player.Sol.MNG.Replic
 let increment = 0.001	

let base = (replic + offset) * increment
  
// let formula = base > 0.2 ? 0.2 + (replic - 200) * increment/2 : 1
	
	const cSoftcap = {
	 Defective: increment/2, 
	 Redundant: increment/4,
  
	 DefVal: 0.2 + ((replic + offset) - 200) * increment/2,
	 RedVal: 0.4 + ((replic + offset) - 400) * increment/4,
	  
	}
  
	if (cSoftcap.RedVal > 0.6) base = 0.6 
	else if (cSoftcap.DefRed > 0.4) base = 0.4 + ((replic + offset) - 400) * cSoftcap.Redundant
	else if (base > 0.2) base = 0.2 + ((replic + offset) - 200) * cSoftcap.Defective
	else return base
  
}

function getBaseCheckGen(type) {

	let BaseLightIncrement = player.L.LightCheck.pow_base(10)
	  if (player.L.UnwantedChromia.gt(1)) BaseLightIncrement = BaseLightIncrement.div(player.L.UnwantedChromia.root(10)).clampMin(1)
	  if (player.E.EclipseTier.gte(6)) BaseLightIncrement = BaseLightIncrement.pow(1.25)   
	  if (BSolStones(1).unlocked) BaseLightIncrement = BaseLightIncrement.mul(BSolStones(1).effect); 	
	  if (getCoreDifficulty().gte(2) && player.Sol.TBCore.active) BaseLightIncrement = BaseLightIncrement.pow(0.02)

	let BaseDarkIncrement = player.L.DarkCheck.pow_base(10)
	  if (player.L.UnwantedChromia.gt(1)) BaseDarkIncrement = BaseDarkIncrement.div(player.L.UnwantedChromia.root(10)).clampMin(1)
	  if (player.E.EclipseTier.gte(6)) BaseDarkIncrement = BaseDarkIncrement.pow(1.25) 
	  if (BSolStones(1).unlocked) BaseDarkIncrement = BaseDarkIncrement.mul(BSolStones(1).effect); 	
	  if (getCoreDifficulty().gte(2) && player.Sol.TBCore.active)  BaseDarkIncrement = BaseDarkIncrement.pow(0.02)

	let ReplicBonuses = [
		player.L.Light.gte(1) ? player.L.Light.pow(ReplicEffect(0)) : 1, 
		player.L.Dark.gte(1) ? player.L.Dark.pow(ReplicEffect(0)) : 1
	]

	

		
		if (type == "Light") return BaseLightIncrement.mul(ReplicBonuses[0])
		else if (type == "Dark") return BaseDarkIncrement.mul(ReplicBonuses[1])
		else alert("Incorrect Gen type input")
   }

//create a custom softcap
/* add any custom softcap formula below */
//yeah i might not use this
function harshcap(val, start=[], nerf=[], format=false) {
	const makeNew = {}

	makeNew.Start = {}
	makeNew.Nerfs = {}
	var effect = new Decimal(val)
	{//makes sure the below works and provides missing code feedback
		{//checks for missing paramaters
			if (val == undefined) throw new Error("Missing input 'val'" );
			if (start == undefined || start.length == undefined) throw new Error("Missing starting nerfs, or the input isn't a list");
			if (nerf == undefined || nerf.length == undefined) throw new Error("Missing nerf formulas, or the input isn't a list");
			if (format !== Boolean && !format == undefined) throw new Error("format paramater must be a Boolean")
			}
		{//fixes both arrays if irregular
			if (!nerf.length>=start.length) nerf.pop(); 
			else if (!start.length>=nerf.length) start.pop()
			}
	} 
	{//automatically assigns Decimals
	for (item in start) 
		if (start[item] instanceof Decimal) makeNew.Start[item] = start[item];
		else makeNew.Start[item] = new Decimal(start[item])
			 console.warn("note: " + start[item] + " is not assigned to a Decimal"); 
	for (item in nerf) 
		if (nerf[item] instanceof Decimal) makeNew.Nerfs[item] = nerf[item];
		else makeNew.Nerfs[item] = new Decimal(nerf[item])
			 console.warn("note: " + nerf[item] + " is not assigned to a Decimal");  
	}

	//does the softcap stuffs based on it's starting position, THEN scales.
	for (item in makeNew.Start) makeNew.Start[item].gt(effect) ? effect = makeNew.Start[item].plus((effect.sub(makeNew.Start[item])).times(makeNew.Nerfs[item])) : 0;

	         return format ? effect.toNumber() : effect	
}

// cSoftcap(20,[10,40],[0.5,0.3])

function start() {
	 player.rot = 0; player.frames = 0;
	 if (player.cutsceneName == "") player.cutsceneName = "gameStart"//; else player.cutsceneName = ""
}
function end() {
	player.rot = 90; player.frames = 0;
	if (player.cutsceneName == "") player.cutsceneName = "gameEnd"//; else player.cutsceneName = ""; 
	player.finalTime = player.timePlayed
//	tmp.gameEnded = !tmp.gameEnded
}

document.title = "Loading Content..."

if (Error) document.title = "Cannot Load Content."

function getSRCap() {
	let baseSRCap = new Decimal(1e15)
	if ( getClickableState("L",42))
		  {
		if (hasUpgrade("Sol",12)) baseSRCap = baseSRCap.mul(player["S"].bestPointsInDark)
		
		SRCap_BeforeAdaptiveBonus = baseSRCap

		if (player.Adaptive && getClickableState('L', 42) && hasUpgrade("C" , 22)) baseSRCap = baseSRCap.pow(1.05)
      
		}
	
		return baseSRCap
}

function GetHeirarchyBonus() {
	let base = new Decimal(5)
    if (player.Sol.CPBoost.gte(0) && !player.Sol["TRMoon"].active ) base = base.plus(player.Sol.CPBoost)//

	//if ()

	let amnt = player.Sol.activeCheck == "Heliosphere" ? player.Sol.HelioStat["CP"].plus(player.C.FreeCP) : player.C.CenterPoints.plus(player.C.FreeCP)

    let effect = amnt.pow_base(base).clampMin(1)
	
	if (hasUpgrade("L",11)) effect = effect.pow(1.15)
		
	if (player["C"].activeCheck == "Twilight") effect = effect.log(12).clampMin(1)
	
	SolarHeat_softcap = softcap((player.Sol.SolarHeat.sub(50)).pow_base(1.02) ,new Decimal(1e30), 0.35 )


	//add upgrade that removes softcaps in Pestillessence
	if (false) SolarHeat_softcap = (player.Sol.SolarHeat.sub(50)).pow_base(1.02)

	effect = player.Sol.SolarHeat.gt(50) ? effect.mul(SolarHeat_softcap) : effect
	
	

	Heirarchys_ValueBeforeSelfNerf = effect
	if (hasUpgrade("C",31)) effect = effect.mul(DarknessUpgs_Row3[0])
	
	//Disdained/ Harshcap
						
					//just in case if the idea is ass
	if (!player.Sol.solarBurst && true) {
		//Increase the root, which starts at 1.5
		let increasedRoot= new Decimal(0)
		let baseRoot = new Decimal(1.5)
		if (effect.gte(player.C.HeirarchyNerfStartAt) ) {
			increasedRoot = effect.div(player.C.HeirarchyNerfStartAt).log(150).div(150).clampMin(0)
		}
		baseRoot = baseRoot.plus(increasedRoot)


		if (effect.gte(player.C.HeirarchyNerfStart)) effect = effect.div(player.C.HeirarchyNerfStartAt).root(baseRoot).mul(player.C.HeirarchyNerfStartAt)
	}

	if (hasUpgrade("C",31)) Heirarchys_ValueBeforeSelfNerf = Heirarchys_ValueBeforeSelfNerf.mul(DarknessUpgs_Row3[0])
	
	
	

	
//format(GetHeirarchyBonus().div(1e130))
	if (player["C"].hasHeirarchy && !player.Sol["TRMoon"].active && !player.Sol["TBCore"].active) return effect; else return new Decimal(1)
}

function getSolarLightGain() {
     let gain = new Decimal(1);
        let TBC1Bonus = new Decimal(1);
        if (player.Sol["TBCore"].x.gte(1)) {
          let TBCore = player.Sol["TBCore"].x;
          TBC1Bonus = decimalOne.plus(
            TBCore.mul(0.25).mul(new Decimal(1.5).pow_base(TBCore))
          );
        }
//
         //The Bleeding Eclipse 3+
              let TBSunP = player.Sol["TBSun"].pending;
              let TBSun = player.Sol["TBSun"].x;
      // The Bleeding Eclipse 3+ Reward
        let power = new Decimal(0.4)
        if (TBSun.gte(3)) power = power.plus(TBSun.sub(2).mul(0.1))

      // Solar shards base gain, also is a power    
         gain = gain.mul(player["GL"].Solarlight.pow(power));

      // Increase the base gains of Solar Shards  
        if (getClickableState("E", 14) == true) gain = gain.root(3);
        if (hasMilestone("E", 1))
          gain = gain.mul(player.E.EclipseTier.pow_base(2));
			
        if (player["Sol"].activeCheck == "Heliosphere")
          // Heliosphere's reduction currency
        gain = gain.root(player.Sol.HelioStat["Reduction"]);
          //The Melted Sun power increase
        gain = gain.pow(decimalOne.plus(player.Sol["TMSun"].x.mul(0.15)));
          //The Broken Core 1's bonus
        gain = gain.pow(TBC1Bonus);

        //The Bleeding Eclipse 3+ (Reduce Solar Shards Gain)
        let BLED_SOLARS = decimalZero;

        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) BLED_SOLARS = 0.27;
        else if (TBSun.plus(TBSunP).gte(3)) BLED_SOLARS = TBSunP.plus(TBSun).div(11);

        let BLEEDING_SOLARS = player.S.poweredInst.pow(BLED_SOLARS);

        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) gain = gain.div(BLEEDING_SOLARS);
        else if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(3)) {
          gain = gain.div(BLEEDING_SOLARS);
        }
		
		return gain
}

function passiveShardGen() 
        {
		
		let TBSunP = player.Sol["TBSun"].pending;
        let TBSun = player.Sol["TBSun"].x;
        let passiveReduction = decimalOne  
		 let BC2_INFL = false

   
		let TBSunBonus = TBSun.mul(0.15)

    // Reduce passive gains QoL
        let BLEEDINGSUN_POWER = 1;
        if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(1))
          BLEEDINGSUN_POWER = TBSun.plus(TBSunP).mul(2).plus(1);
        
        let BLED_SOLARS = decimalZero;
		  
        let BLED_SOLARS_POWER = decimalZero
        let BLEEDING_SOLARS = player.S.poweredInst.pow(BLED_SOLARS_POWER) 
        if (BC2_INFL) BLED_SOLARS_POWER = new Decimal(0.27);
		if (player.Sol["TBCore"].active && getCoreDifficulty().eq(2)) BC2_INFL = true;
		
		if (TBSun.plus(TBSunP).gte(3)) BLED_SOLARS = TBSunP.plus(TBSun).div(11);
        else if (TBSun.plus(TBSunP).gte(3)) BLED_SOLARS_POWER = TBSunP.plus(TBSun).div(11);  

        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2))  passiveReduction = passiveReduction.mul(BLEEDING_SOLARS);
        else if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(3))  passiveReduction = passiveReduction.mul(BLEEDING_SOLARS);	
			
			let passive =
      player["Sol"].activeCheck == "Heliosphere"
        ? player.Sol.HelioStat["Solar_Light"].pow(0.2)
        : player.GL.Solarlight.pow(0.2);


      if (player.Adaptive && hasUpgrade("C" , 22) && getActiveRealmType() == "TMSun" ) passive = passive.mul(player.GL.Solar_Shards.log(7))
       
       return passive
          .pow(decimalOne.plus(TBSunBonus))
		
		
		}

function hasCheck(item) {

}

/* Pseudocode for registering Darkness tree upgrades for ROW 2
// Paramater: row
 if (has TBC2) 
  {
    if (has Jeaver) {
      if (AdaptiveIsActive) slots += 2
      else slots += 1
      }
    else if (has Weaver) slots += 1
    else if (has Neaver) slots += 1
  } 
 else 
  {
    if (has Jeaver) slots += 1
    else if (has Weaver) slots += 1
    else if (has Neaver) slots += 1
  }

	if slots > maxSlots

  (end)
*/



/* 
if (has Neaver) slots += 1
else if (has Weaver) {
	if (has TBC2 && AdaptiveActivated) slots += 2
	else slots += 1
}
else if (has Leaver) slots += 1

if slots >= maxSlots || 

*/

let maxR2Slots = 1


function row2Mechanic(startingSlots) {
	let TBC2 = player.Sol.TBCore.x.gte(2)
	let slots = startingSlots
	var Neaver=false, Weaver=false, Leaver=false

	let maxSlots=1

	const row2Names = [Neaver, Weaver, Leaver]
	for (item in row2Names) {
		row2Names[item].val() = hasUpgrade("C", 21+item)
	}

	if (row2Names[0]) slots += 1
	if (TBC2 && row2Names[1])
		{
		if (player.Adaptive) slots += 2
		else slots += 1
		}
	if (row2Names[2]) slots += 1

	if (slots >= maxSlots) {
		return undefined 
	}
}

//if row2Mechanic(  )


//deprecated
function getDarknessTree(row) {
	
	
	// to "register" or to define the darkness upgrade tree from CP Layer
	//supposed to call the variables in these arrays 
	const row1Names = [Jear1, Jear2, Jear3]
	const row2Names = [Neaver, Weaver, Leaver]
	const row3Names = [Bright, Hyper, Light]

	//and then set the values to them
	for (item in row1Names) {
		row1Names[item] = hasUpgrade("C", 11+item)
	}
	for (item in row2Names) {
		row2Names[item] = hasUpgrade("C", 21+item)
	}
	for (item in row3Names) {
		row3Names[item] = hasUpgrade("C", 31+item)
	}

	//and then I could call them using if (row1[0]) or just if (Jear1) 

	/*
	//this was supposed to add 1 "Slot space" for each row
	if (row == 1) {
		// scaling for this row is 1
		if (hasUpgrade("C",11))
		if (hasUpgrade("C",12)) 		 	
		if (hasUpgrade("C",13)) 
		}
	if (row == 2)
		{ //scaling for this row is 4
		if (hasUpgrade("C",21)) 	
		if (hasUpgrade("C",22)) 	
		if (hasUpgrade("C",23)) 
			}
		if (player.Sol.TBC.x.gte(2)){
			if (row == 3) //scaling for this row is 4
				//these also get unlocked at TBC2 or player.Sol.TBC.x.gte(2)
				if (hasUpgrade("C",31)) 	
				if (hasUpgrade("C",32)) 	
				if (hasUpgrade("C",33)) 	 				
	}
				*/
}


//for the canClick
function AdaptDarknessTree(row) {
	//checks if the player has any upgrades
		let maxUpgradesAllowed = player.C.maxSlots
        let UpgradesTaken = new Decimal(0)
        if (hasUpgrade("C",row*10+1)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",row*10+2)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",row*10+3)) UpgradesTaken = UpgradesTaken.plus(1)
		
     
		if (row=2) {
			if (hasUpgrade("C",22) && player.Adaptive) UpgradesTaken = UpgradesTaken.plus(1)
		}


		if (row=1) {return }
					
        return (UpgradesTaken.lt(player.C.maxSlots)) 
}


//
/*
player cannot get adaptive bonuses if:

- the player has 2 upgrades in the row (including itself)
- the player is not in any check
- the player already have another upgrade purchased already


if the player has purchased an upgrade from row 2, it will prevent you from activating adaptive bonuses
*/

//for 21 and 23



/*	
//maybe for activating the adaptive setting
 canClick() {
	if (!player.Adaptive)//this gets cleared when exiting checks
		{
			if ([21, 22, 23].filter(id => hasUpgrade("C", id)).length >= player.C.maxslots2)
	//for 22, if adaptive is on it takes 2 slots instead of 1
	// 	
	} else if (player.C.maxslots2 >= 1)
	
};



*/



//Only when the game is finished
//function _ () {debugger; /*Cheating? I hardly know her :clueless:*/}


