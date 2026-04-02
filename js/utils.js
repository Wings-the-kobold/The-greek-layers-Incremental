// ************ Big Feature related ************

function respecBuyables(layer) {
	if (!layers[layer].buyables) return
	if (!layers[layer].buyables.respec) return
	if (!player[layer].noRespecConfirm && !confirm(tmp[layer].buyables.respecMessage || "Are you sure you want to respec? This will force you to do a \"" + (tmp[layer].name ? tmp[layer].name : layer) + "\" reset as well!")) return
	run(layers[layer].buyables.respec, layers[layer].buyables)
	updateBuyableTemp(layer)
	document.activeElement.blur()
}

function canAffordUpgrade(layer, id) {
	let upg = tmp[layer].upgrades[id]
	if(tmp[layer].deactivated) return false
	if (tmp[layer].upgrades[id].canAfford === false) return false
	let cost = tmp[layer].upgrades[id].cost
	if (cost !== undefined) 
		return canAffordPurchase(layer, upg, cost)

	return true
}

function canBuyBuyable(layer, id) {
	let b = temp[layer].buyables[id]
	return (b.unlocked && run(b.canAfford, b) && player[layer].buyables[id].lt(b.purchaseLimit) && !tmp[layer].deactivated)
}



function canAffordPurchase(layer, thing, cost) {


	if (thing.currencyInternalName) {
		let name = thing.currencyInternalName
		if (thing.currencyLocation) {
			return !(thing.currencyLocation[name].lt(cost))
		}
		else if (thing.currencyLayer) {
			let lr = thing.currencyLayer
			return !(player[lr][name].lt(cost))
		}
		else {
			return !(player[name].lt(cost))
		}
	} else {
		return player[layer].points.gte(cost);
	}
	/*
	let intName = isFunction(thing.currencyInternalName) ? thing.currencyInternalName() : thing.currencyInternalName
	let lr = isFunction(thing.currencyLayer) ? thing.currencyLayer() : thing.currencyLayer
	let plr = player
	let loc = thing.currencyLocation
	if (intName) {
		if (isFunction(intName) && !isFunction(lr)) { return plr.lr.intName().gte(cost)} //if internamName is a function
		else if (isFunction(intName) && isFunction(lr)) {return plr.lr().intName().gte(cost)} // if both are a function
		else if (!isFunction(intName) || intName == undefined) { return (plr.lr instanceof Decimal) ? plr[lr].gte(cost) : false}
		else if (!isFunction(intName) && intName) return plr[lr][intName].gte(cost);
		else if (loc) {return loc[intName].gte(cost)}
		else if (lr) {return plr[lr][intName].gte(cost)}
		else {return (plr[intName].gte(cost))}
	} else {
		return 
	}

*/




	/* 
		Reference: 
        currencyInternalName: () => { return player.Sol.activeCheck == "Heliosphere" ? "Heliostat['Solar_Shard']" : "Solar_Shards"},
        currencyLayer: () => { return player.Sol.activeCheck == "Heliosphere" ? "Sol" :  "GL"},
		
		Target:
		player.Sol.HelioStat["Solar_Shard"]

		*/
}

function buyUpgrade(layer, id) {
	buyUpg(layer, id)
}

function buyUpg(layer, id) {
	if (!tmp[layer].upgrades || !tmp[layer].upgrades[id]) return
	
	if (!player[layer].unlocked || player[layer].deactivated) return
	if (!tmp[layer].upgrades[id].unlocked) return
	if (player[layer].upgrades.includes(id)) return
	
	
	let pay = layers[layer].upgrades[id].pay

	let upg = tmp[layer].upgrades[id]
	if (upg.canAfford === false) return;

		let cost = tmp[layer].upgrades[id].cost
		if (cost == undefined) {
			cost = upg.canAfford
			if (cost === true) player[layer].upgrades.push(id);
			return 0;
		}
			else if (upg.currencyInternalName) {
			let name = upg.currencyInternalName
			if (upg.currencyLocation) {
				if (upg.currencyLocation[name].lt(cost)) return
				upg.currencyLocation[name] = upg.currencyLocation[name].sub(cost)
			}
			else if (upg.currencyLayer) {
				let lr = upg.currencyLayer
				if (player[lr][name].lt(cost)) return
				player[lr][name] = player[lr][name].sub(cost)
			}
			else {
				if (player[name].lt(cost)) return
				player[name] = player[name].sub(cost)
			}
		}
				else {
					if (player[layer].points.lt(cost)) return
				player[layer].points = player[layer].points.sub(cost)
		}
	
	player[layer].upgrades.push(id);
	if (upg.onPurchase != undefined)
		run(upg.onPurchase, upg)
	needCanvasUpdate = true
}


function buyMaxBuyable(layer, id) {
	if (!player[layer].unlocked) return
	if (!tmp[layer].buyables[id].unlocked) return
	if (!tmp[layer].buyables[id].canBuy) return
	if (!layers[layer].buyables[id].buyMax) return

	run(layers[layer].buyables[id].buyMax, layers[layer].buyables[id])
	updateBuyableTemp(layer)
}

function buyBuyable(layer, id) {
	if (!player[layer].unlocked) return
	if (!tmp[layer].buyables[id].unlocked) return
	if (!tmp[layer].buyables[id].canBuy) return

	run(layers[layer].buyables[id].buy, layers[layer].buyables[id])
	updateBuyableTemp(layer)
}

function clickClickable(layer, id) {
	if (!player[layer].unlocked || tmp[layer].deactivated) return
	if (!tmp[layer].clickables[id].unlocked) return
	if (!tmp[layer].clickables[id].canClick) return

	run(layers[layer].clickables[id].onClick, layers[layer].clickables[id])
	updateClickableTemp(layer)
}

function clickGrid(layer, id) {
	if (!player[layer].unlocked  || tmp[layer].deactivated) return
	if (!run(layers[layer].grid.getUnlocked, layers[layer].grid, id)) return
	if (!gridRun(layer, 'getCanClick', player[layer].grid[id], id)) return

	gridRun(layer, 'onClick', player[layer].grid[id], id)
}

// Function to determine if the player is in a challenge
function inChallenge(layer, id) {
	let challenge = player[layer].activeChallenge
	if (!challenge) return false
	id = toNumber(id)
	if (challenge == id) return true

	if (layers[layer].challenges[challenge].countsAs)
		return tmp[layer].challenges[challenge].countsAs.includes(id) || false
	return false
}

// ************ Misc ************

var onTreeTab = true

function showTab(name, prev) {
	if (LAYERS.includes(name) && !layerunlocked(name)) return
	if (player.tab !== name) clearParticles(function(p) {return p.layer === player.tab})
	if (tmp[name] && player.tab === name && isPlainObject(tmp[name].tabFormat)) {
		player.subtabs[name].mainTabs = Object.keys(layers[name].tabFormat)[0]
	}
	var toTreeTab = name == "none"
	player.tab = name
	if (tmp[name] && (tmp[name].row !== "side") && (tmp[name].row !== "otherside")) player.lastSafeTab = name
	updateTabFormats()
	needCanvasUpdate = true
	document.activeElement.blur()

}

function showNavTab(name, prev) {
	console.log(prev)
	if (LAYERS.includes(name) && !layerunlocked(name)) return
	if (player.navTab !== name) clearParticles(function(p) {return p.layer === player.navTab})
	if (tmp[name] && tmp[name].previousTab !== undefined) prev = tmp[name].previousTab
	var toTreeTab = name == "tree-tab"
	console.log(name + prev)
	if (name!== "none" && prev && !tmp[prev]?.leftTab == !tmp[name]?.leftTab) player[name].prevTab = prev
	else if (player[name])
		player[name].prevTab = ""
	player.navTab = name
	updateTabFormats()
	needCanvasUpdate = true
}


function goBack(layer) {
	let nextTab = "none"

	if (player[layer].prevTab) nextTab = player[layer].prevTab
	if (player.navTab === "none" && (tmp[layer]?.row == "side" || tmp[layer].row == "otherside")) nextTab = player.lastSafeTab

	if (tmp[layer].leftTab) showNavTab(nextTab, layer)
	else showTab(nextTab, layer)

}

function layOver(obj1, obj2) {
	for (let x in obj2) {
		if (obj2[x] instanceof Decimal) obj1[x] = new Decimal(obj2[x])
		else if (obj2[x] instanceof Object) layOver(obj1[x], obj2[x]);
		else obj1[x] = obj2[x];
	}
}

function prestigeNotify(layer) {
	if (layers[layer].prestigeNotify) return layers[layer].prestigeNotify()
	
	if (isPlainObject(tmp[layer].tabFormat)) {
		for (subtab in tmp[layer].tabFormat){
			if (subtabResetNotify(layer, 'mainTabs', subtab))
				return true
		}
	}
	for (family in tmp[layer].microtabs) {
		for (subtab in tmp[layer].microtabs[family]){
			if (subtabResetNotify(layer, family, subtab))
				return true
		}
	}
	if (tmp[layer].autoPrestige || tmp[layer].passiveGeneration) return false
	else if (tmp[layer].type == "static") return tmp[layer].canReset
	else if (tmp[layer].type == "normal") return (tmp[layer].canReset && (tmp[layer].resetGain.gte(player[layer].points.div(10))))
	else return false
}

function notifyLayer(name) {
	if (player.tab == name || !layerunlocked(name)) return
	player.notify[name] = 1
}

function subtabShouldNotify(layer, family, id) {
    let subtab = {}
    if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
    else subtab = tmp[layer].microtabs[family][id]
	if (!subtab.unlocked) return false
    if (subtab.embedLayer) return tmp[subtab.embedLayer].notify
    else return subtab.shouldNotify
}

function subtabResetNotify(layer, family, id) {
	let subtab = {}
	if (family == "mainTabs") subtab = tmp[layer].tabFormat[id]
	else subtab = tmp[layer].microtabs[family][id]
	if (subtab.embedLayer) return tmp[subtab.embedLayer].prestigeNotify
	else return subtab.prestigeNotify
}

function nodeShown(layer) {
	return layerShown(layer)
}

function layerunlocked(layer) {
	if (tmp[layer] && tmp[layer].type == "none") return (player[layer].unlocked)
	return LAYERS.includes(layer) && (player[layer].unlocked || (tmp[layer].canReset && tmp[layer].layerShown))
}

function keepGoing() {
	player.keepGoing = true;
	needCanvasUpdate = true;
}

function toNumber(x) {
	if (x.mag !== undefined) return x.toNumber()
	if (x + 0 !== x) return parseFloat(x)
	return x
}

function updateMilestones(layer) {
	if (tmp[layer].deactivated) return
	for (id in layers[layer].milestones) {
		if (!(hasMilestone(layer, id)) && layers[layer].milestones[id].done()) {
			player[layer].milestones.push(id)
			if (layers[layer].milestones[id].onComplete) layers[layer].milestones[id].onComplete()
			if (tmp[layer].milestonePopups || tmp[layer].milestonePopups === undefined) doPopup("milestone", tmp[layer].milestones[id].requirementDescription, "Milestone Gotten!", 3, tmp[layer].color);
			player[layer].lastMilestone = id
		}
	}
}

function updateAchievements(layer) {
	if (tmp[layer].deactivated) return
	for (id in layers[layer].achievements) {
		if (isPlainObject(layers[layer].achievements[id]) && !(hasAchievement(layer, id)) && layers[layer].achievements[id].done()) {
			player[layer].achievements.push(id)
			if (layers[layer].achievements[id].onComplete) layers[layer].achievements[id].onComplete()
			if (tmp[layer].achievementPopups || tmp[layer].achievementPopups === undefined) doPopup("achievement", tmp[layer].achievements[id].name, "Achievement Gotten!", 3, tmp[layer].color);
		}
	}
}

function addTime(diff, layer) {
	let data = player
	let time = data.timePlayed
	if (layer) {
		data = data[layer]
		time = data.time
	}

	//I am not that good to perfectly fix that leak. ~ DB Aarex
	if (time + 0 !== time) {
		console.log("Memory leak detected. Trying to fix...")
		time = toNumber(time)
		if (isNaN(time) || time == 0) {
			console.log("Couldn't fix! Resetting...")
			time = layer ? player.timePlayed : 0
			if (!layer) player.timePlayedReset = true
		}
	}
	time += toNumber(diff)

	if (layer) data.time = time
	else data.timePlayed = time
}

shiftDown = false
ctrlDown = false

document.onkeydown = function (e) {
	if (player === undefined) return;
	shiftDown = e.shiftKey
	ctrlDown = e.ctrlKey
	if (tmp.gameEnded && !player.keepGoing) return;
	let key = e.key
	if (ctrlDown) key = "ctrl+" + key
	if (onFocused) return
	if (ctrlDown && hotkeys[key]) e.preventDefault()
	if (hotkeys[key]) {
		let k = hotkeys[key]
		if (player[k.layer].unlocked && tmp[k.layer].hotkeys[k.id].unlocked)
			k.onPress()
	}
}

document.onkeyup = function (e) {
	shiftDown = e.shiftKey
	ctrlDown = e.ctrlKey
}

var onFocused = false
function focused(x) {
	onFocused = x
}


function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
};

function isPlainObject(obj) {
	return (!!obj) && (obj.constructor === Object)
}


// Converts a string value to whatever it's supposed to be
function toValue(value, oldValue) {
	if (oldValue instanceof Decimal) {
		value = new Decimal (value)
		if (checkDecimalNaN(value)) return decimalZero
		return value
	}
	if (!isNaN(oldValue)) 
		return parseFloat(value) || 0
	return value
}

// Variables that must be defined to display popups
var activePopups = [];
var popupID = 0;

// Function to show popups
function doPopup(type = "none", text = "This is a test popup.", title = "", timer = 3, color = "") {
	switch (type) {
		case "achievement":
			popupTitle = "Achievement Unlocked!";
			popupType = "achievement-popup"
			break;
		case "challenge":
			popupTitle = "Good Job lol";
			popupType = "challenge-popup"
			break;
		case "msg":
			popupTitle = "";
			popupType = "default-popup"
			break;
		default:
			popupTitle = "Something Happened?";
			popupType = "default-popup"
			break;
	}
	if (title != "") popupTitle = title;
	popupMessage = text;
	popupTimer = timer;

	activePopups.push({ "time": popupTimer, "type": popupType, "title": popupTitle, "message": (popupMessage + "\n"), "id": popupID, "color": color })
	popupID++;
}

//Function to reduce time on active popups
function adjustPopupTime(diff) {
	for (popup in activePopups) {
		activePopups[popup].time -= diff;
		if (activePopups[popup]["time"] < 0) {
			activePopups.splice(popup, 1); // Remove popup when time hits 0
		}
	}
}

function run(func, target, args = null) {
	if (isFunction(func)) {
		let bound = func.bind(target)
		return bound(args)
	}
	else
		return func;
}

function gridRun(layer, func, data, id) {
	if (isFunction(layers[layer].grid[func])) {
		let bound = layers[layer].grid[func].bind(layers[layer].grid)
		return bound(data, id)
	}
	else
		return layers[layer].grid[func];
}

function Check(layer, id) {return tmp[layer].Check[id]}
function Viewer(layer, id) {return tmp[layer].Viewer[id]}
function Reset(layer, id) {return tmp[layer].Reset[id]}
function Ception(layer,id) {return tmp[layer].buyables[id].gain}
function miniBoard(layer, id) {return tmp[layer].miniBoard[id]}
function fix(item) {if (item == undefined) item = false ;return item}  
function Clickable(layer,id) {return tmp[layer].clickables[id]}
function BSolStones(id=0) {let data = tmp["Sol"].Viewer[12].display(true); if (id != null) return data[id]; else return data}
function TSolStones(id=0) {let data = tmp["Sol"].Viewer[14].display(true); if (id != null) return data[id]; else return data}
function getMNG(item) {if (!item == undefined) return tmp["Sol"].MNG[item]; else alert("unfound data '" + item + "'")}
function getScale(id) {return tmp["Sol"].clickables[id].scale}

function MeltedSun() {
	return player.Sol.TMSun
}
function RagingMoon() {
	return player.Sol.TRMoon
}
function BleedingSun() {
	return player.Sol.TBSun
}
function BrokenCore() {
	return player.Sol.TBCore
}

function Selecting(type) {
	if (type)
		if (["x", "pending", "active"].includes(type))
			{if (player.Sol.selected == "TMSun") return player.Sol.TMSun[type]
				else if (player.Sol.selected == "TRMoon") return player.Sol.TRMoon[type]	
				else if (player.Sol.selected == "TBSun") return player.Sol.TBSun[type]
				else if (player.Sol.selected == "TBCore") return player.Sol.TBCore[type]
				else return player.Sol.null[type]
				}
		else {console.error("Input error: " + type + " is not in the list"); throw new Error}		
	else {console.error("Unknown error: Type is not defined or is redeclared")}
	
}


// general important things to save

function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

	//I want to make pancakes in vscode using arrays only
const buffColor = "'rgba(100, 222, 0, 0.99)'" + "';>'"
const projectedBuffColor = "'rgba(255, 226, 60, 0.99)'" + "';>'";

function makeBuffTextLine(condition, buff, color) {
let content = "<span style=" + color + buff + "</span>"
//`${color} ${buff} </span>`
 if (condition) return content; else return ""
}


//Solar heat and Solar Fragment generation function)
function gainOf(item) {
	

	if (item == "Solar Heat") {
		//[1.05^sqrt1.5(x - 200)] player.Sol.SolarHeat
		let baseHeatgen = decimalOne
		heat = player.Sol.SolarHeat
		
		//bonuses here
		if (getBuyableAmount("Sol",12).gte(1)) baseHeatgen = baseHeatgen.mul(getBuyableAmount("Sol",12).pow_base(1.12))
		

			
		//nerfs here
		if (heat.gte(200)) {
			return baseHeatgen.div(heat.sub(200).root(1.75).pow_base(1.05)    )
		}
		else return baseHeatgen
	
	
	}
	else if (item == "Solar Fragments") {
		let power = new Decimal(0.05).plus(getBuyableAmount("Sol",11).div(100))

		return player.Sol.SolarHeat.sub(1).pow(power)
	}

}

function gainOfEsolar() {
	let gain = new Decimal(1)
                  gain = player.E.Solinity.root(1.5).log(3).sub(1)
                  let chimeraBoost = player.E.Chimera.pow_base(1.15).clampMin(1)
                  if (player.E.Chimera.gt(1)) gain = gain.mul(chimeraBoost)
                  chimeraBoost = softcap(chimeraBoost, new Decimal(10000), 0.05)
                  
                  let Hour = new Date()
				  let TBC3Improve = 1
                  if (player.Sol.TBCore.x.gte(3)) TBC3Improve = 1.25
					let NT2Bonus = 1.5 ** (Hour.getHours() % 12) ** TBC3Improve
                  if (getBuyableAmount("L",22).gte(2) && Hour.getHours() >= 12) gain = gain.times(NT2Bonus)

                return softcap(gain, new Decimal(10000), 0.15 )

}

function gainOfSolinity() {
	 let gain = new Decimal(1)
          gain = player.E.SolarCharge.root(10).sub(1)
          let EsolarBoost = player.E.Esolar.root(1.35)
          let chimeraBoost = player.E.Chimera.pow_base(1.15).clampMin(1)
          let Hour = new Date()
          
         let TBC3Improve = 1
       	 if (player.Sol.TBCore.x.gte(3)) TBC3Improve = 1.25
		 let NT2Bonus = 1.5 ** (Hour.getHours() % 12) ** TBC3Improve
         if (getBuyableAmount("L",22).gte(2) && Hour.getHours() >= 12) gain = gain.times(NT2Bonus)


          EsolarBoost = softcap(EsolarBoost, new Decimal(1000), 0.175)
            
          chimeraBoost = softcap(chimeraBoost, new Decimal(10000), 0.05)

           if (player.E.Esolar.gt(1)) gain = gain.mul(EsolarBoost)
          if (player.E.Chimera.gt(1)) gain = gain.mul(chimeraBoost)
            
         gain = softcap(gain, new Decimal(7.5e8), 0.05  )
		return gain
}

function gainOfChimera() {


}

function generateRandomNumber(min, max, int=true) {
  // Ensure min is less than or equal to max
  if (min > max) {
    [min, max] = [max, min]; // Swap values if min is greater than max
  }
  if (int) return Math.floor(Math.random() * (max - min + 1)) + min;
  else return Math.random() * (max - min) + min
}

//ALL TBC related things
// for TBC1
	function reset_Cent() {
	player.C.CenterPoints = new Decimal(0)
	player.C.Highest = new Decimal(0)
	player.C.Score = new Decimal(0)
	player.C.EffectorTier = new Decimal(0)
	if (player.Adaptive && getCoreDifficulty().gte(3) && player.Sol.TBCore.active && hasUpgrade("C",22)) {player.C.upgrades = []; player.C.upgrades.push(22);}
	else player.C.upgrades = []

	//if (player.Adaptive)  

	}
	function reset_GoldRays() {
	player.GL.upgrades = []
	player.GL.Solar_Shards = new Decimal(0)
	setBuyableAmount("GL", 11, new Decimal(1))
	}
	// for TBC2

	//

	function Self_Reset(upgLayer="none") {
		//	Origionally they were supposed to set it to 0, but that would be a little too harsh...
		if (upgLayer == "GL") player.GL.Solar_Shards = player.GL.Solar_Shards.root(5)

	    else if (upgLayer == "C") player.C.CenterPoints = player.C.CenterPoints.div(2)	
		else if (upgLayer == "S") player.S.points = player.S.points.root(2)
	}

	function getCoreDifficulty() {
		 let TBCore = player.Sol.TBCore.x
         let TBCoreP = player.Sol.TBCore.pending
		return TBCore.plus(TBCoreP)
	}

// gets the name of active Realm check, 
// paramaters are used to check if that realm is active
//maybe leave the parameter stuff out for now
function getActiveRealmType(TargetCheck=null) {
	let activeCheck;

	

  for (const type of ["TMSun", "TRMoon", "TBSun", "TBCore"]) {
    if (player.Sol[type].active) return type;
	activeCheck = type
  }
  if (getClickableState('L', 42)) {activeCheck = "Dark"; return "Dark";}
  else if (getClickableState('L', 41)) {activeCheck = "Light"; return "Light";}


  if (TargetCheck != null && activeCheck == TargetCheck) return true;

  else return "None";

  

}

//should probably add the bonuses soon if i have not already...

//In the future, there WILL be an upgrade or QoL that will allow ONE Adaptive effect to override the origional one

function IsAdapting() {
	if (player.Adaptive) {
		 if (getActiveRealmType() != "None") player.AdaptiveType = getActiveRealmType()



		/*

		if (player.AdaptiveType == "Dark") SRCap = SRcap.pow(1.05)
		else if (player.AdaptiveType == "Light") effect = effect.pow(1.08)
		else if (player.AdaptiveType == "TRMoon") ReduceRquirements = player.L.LunarPower.log(9).mul(0.1)
		else if (player.AdaptiveType == "TMSun") SRCap = SRcap.pow(1.05)
		else if (player.AdaptiveType == "TBSun") StartLater = player.L.LunarEssence.pow(0.47)



		*/



		if ( getActiveRealmType("Dark")) player.AdaptiveType = getActiveRealmType()
		else if (getActiveRealmType("Light")) lightAdaptive() 
	        // ^1.08 to Hierarchy bonus
		else if ( getActiveRealmType("TMSun")) TMSunAdaptive()
			// ^1.2 Modifier score cap
		else if (getActiveRealmType("TRMoon")) TRMoonAdaptive()
			// Reduce Center Point requirements by 10% per log9 of L.A (Additive)
		else if (getActiveRealmType("TBSun")) TBSunAdaptive()
			// L.I debuff starts later based on L.E ) (^0.47)
		else if (getActiveRealmType("TBCore")) TBCoreAdaptive()
			// 2% of Core Energy boosts Jear paths

	}
	else player.AdaptiveType = ""
}		








/*

Adaptive = {
        
    Light: ^1.08 to Heirarchy bonus
    Dark: ^1.05 to SR cap
    The Melted Sun: ^1.2 Modifier score cap 
    The Bleeding Eclipse: L.I Debuff begins at ${format(basedLALater)} L.A </span>`, //Based on 500 * Lunar Essence^0.65
    The Raging Moon: /1.25 to modifier requirements 
    The Broken Core: 2% of Core Energy increases all Jear paths. 
    // Jear 1 +1.85 Core Energy -> ???
    // 
    
    "None": `<span style="color:rgba(255, 255, 255, 0.74)> Weaver on standby... ^1.15 to Solarity gain </span>`,
  
    }


/*


function glitchArray(arr, delay) {
  if (arr && arr.isArray())
	setTimeout(() => {
		// Generate a random index within the array's bounds
		const randomIndex = Math.floor(Math.random() * arr.length);

		// Select the item at the random index
		const selectedItem = arr[randomIndex];

		return selectedItem
		// You can perform other actions with the selectedItem here
	}, delay);
  else console.error("missing array")
}







// if (getRepCheck())




//if (getClickableState("L", "21")) BorderAlterations_SR = "rgba(26, 0, 68, 1)"

//if in any challenge that affects a layer or currency, put them in here!



//for cheaters
// debugger

/* remove later



devtools.toString = function() {
  if (!this.opened) {
    
    debugger
    window.location.reload()
  }
  this.opened = true;
}
*/


//R-Swarm*'s 


