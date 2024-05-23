let modInfo = {
	name: "The Great Eclipse Incremental",
	id: "OINOINOIN",
	author: "ThatOneKobold",
	pointsName: "Solarity",
	modFiles: ["layers.js/SolarRays.js", "layers.js/GoldenRays.js","layers.js/Centerality.js","layers.js/Enlightenment.js","layers.js/dialogueStuff.js","tree.js"],

	discordName: "Join ThatOneKobold's Community Server!",
	discordLink: "https://discord.gg/tJDWU7twvB",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 40,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.4 F6-B4 ",
	name: "Yeh",
}

let changelog = `
<h1>Changelog:</h1><br><br>
<h2>Start Date: 4/13/2024</h2> <br><br>

<h3>v0.4 Fix 6, Balance 4</h3><br>
Lol i just Eclips'd ur mom<br>
- there is now a Solarity Gain Cap of e308! [aka Infinity]
- Added Enlightenment <br>
- Added Eclipse Tiers 1 through 4 <br>
- Milestone Feature?????? <br>
Fix3: Fixed Annular being able to be purchased before its cost<br>
Fix4: You Know, I forgot to fix Coronal too, since they were showing way before Annular was bought<br>
Fix5: Fixed how Effector Tiers spent Center Points (It incremented by 1, THEN subtracted)<br>
Fix6: Fixed incorrect row placements and adjusted them to look better<br>
	<br><br>

<h3>v0.3 Fix 2, Balance 4</h3><br>
CENTER THESE BALLS IN YOUR MOUTH!<br>
- A prestige mechanic where its based off of Modifier Score! [A * B] = Output <br>
- Some unique challenges via "Upgrade Checks"! <br>
- Effector Upgrades which provides powerful Synergy!<br>

Fix2: Fixed Golden Light surpassing Light Cap [was not supposed to happen] It should now stay at a fixed amount. <br>
Bal1: Multiply Scaling 3x every 25 bought, Inflation bad <br>
Bal2: Multiply Scaling 9x every 100 bought, idk this was meant to be harder or something lol <br>
Bal3: Made an Increased Scaling after 200 bought. this just gets harder ;-; <br>
Bal4: Solar rays now have an exponent in which its base cap is ^2<br>

	<br><br>

<h3>v0.2 Fix 1, Balance 0</h3><br>
Second layer has been added...<br>
- 2 Clickables that Reset 1st layer!<br>
- A new Conversion rate system and Light cap stuff<br>
- You ONLY gain solar shards in a very unique and special way.<br>

Fix2: Fixed PointGen() issues/boosts not responding very well (it was an "x= value bug) <br>


	<br><br>

<h3>v0.1 Fix 0, Balance 0</h3><br>
	First layer has been added...<br>
		- 4 Upgrades, and 2 very Important Buyables... Plasmate and Multiply.<br>	
		`

let winText = `The Eclipse is over... You have gotten Everything...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)


	/*  */

	gain = gain.plus(buyableEffect("S",11)).clampMin(0)
	gain = gain.mul(buyableEffect("S",12)).clampMin(1)
	if (hasUpgrade("S",13)) gain = gain.mul(upgradeEffect("S",13)).max(1)
	if (hasUpgrade("GL",13)) gain = gain.mul(upgradeEffect("GL",13)).max(1)
	
	if (hasUpgrade("C",13)) gain = gain.times(2.5)
	if (hasUpgrade("C",11)) gain = gain.times(16)
	
	let sPoints = player.S.points

	let MAX = hasMilestone("E", 2) ? 3 : 2
	let RootEFF1 = new Decimal(40)
	let RootEFF2 = new Decimal(35)


  	let SolarRay1 = sPoints.root(RootEFF1.sub(upgradeEffect("S",12)))
  	let SolarRay2 = sPoints.root(RootEFF2.sub(upgradeEffect("S",12)))
	
    if (SolarRay1.gt(2)) SolarRay1 = softcap(SolarRay1, new Decimal(2), 0.3)

	gain = gain.pow(SolarRay1.clampMax(MAX)).clampMin(1)
	gain = gain.mul(SolarRay2).clampMin(1)

	
	if (hasUpgrade("GL",21)) gain = gain.pow(upgradeEffect("GL",21))
	if (player.C.EffectorTier.gte(1)) gain = Decimal.mul(gain, player.S.points.log(2).clampMin(1))
	

	//all the power effects
	
	if (hasUpgrade("C",22)) gain = gain.pow(1.15)
	if (getClickableState("C", 21)) gain = gain.pow(0.666)

	if (getClickableState("GL", 11) == true) gain = gain.pow(0.5)
	
	if (getClickableState("C", 23) == true ) gain = gain.log(12)
	if (getClickableState("C", 23) == true && hasMilestone("E",2) ) gain = gain.pow(1.15)
	if (player.C.checkUpgrades.gte(2)) {
		
		if (!getClickableState("C", 23)) gain = gain.mul(Decimal.pow(5, player.C.CenterPoints).clampMin(1))
		else if (getClickableState("C", 23)) gain = gain.mul(  Decimal.pow(5, player.C.CenterPoints.log(12)) ).clampMin(1)
	
	}
	if (player.C.checkUpgrades.gte(1)) gain = gain.pow(1.25)
	
	if (hasMilestone("E",1)) gain = gain.mul(player.E.EclipseTier.pow_base(9))





	
	//the point hardcaps
	let C = player.E.Esolar
	let B = new Decimal(1)
	if (C.gt(1))  B = Decimal.add(1 , C.log(2))
	let basegainCap = player.BasepointsCap
	if (hasMilestone("E",1)) basegainCap = basegainCap.mul(player.E.EclipseTier.pow_base(20))
	if (hasMilestone("E",2)) basegainCap = basegainCap.mul(player.E.Eclipsium.pow_base(1.45))
	basegainCap = basegainCap.mul(getBuyableAmount("E", 11).mul(0.5).add(1))




	if (hasMilestone("E",3)) basegainCap = basegainCap.mul(player.E.SolarCharge.log(2).add(1).pow(B))







	//Limit everything to the point gain cap
	player.SolarityCap = basegainCap

	player.postCap = gain.div(player.BasepointsCap)
	player.beforeCap = gain
	return gain.clampMax(basegainCap)


}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	BasepointsCap: new Decimal(1e308),
	SolarityCap: new Decimal(1),
	postCap: new Decimal(1),
	beforeCap: new Decimal(1)
}}

// Display extra things at the top of the page
var displayThings = [
	function () {
		
		// Decimal.pow(getPointGen().pow(0.5), 0.2).sub(1)
		let formula = new Decimal(1)
		let speed = new Decimal(1)
		if (getClickableState("GL", 11)) speed = Decimal.pow(getPointGen().pow(0.5), 0.2).sub(1)
		//if (getClickableState("C", 14)) formula = Decimal.div(getPointGen().pow(1.501501502),   getPointGen())
		
		
		if (hasUpgrade("C",16)) speed = speed.times(3.14)




		//Challenges and Dilations	

		let genText = `Solarity Generation has been reduced (OG generation was ${format(getPointGen().pow(2))}) <br> Generating ${format(speed)} Golden Light per second<br> `
		let capped = ``
	    let pushThrough = ``

		//Hardcaps and other things
			// Solarity Hardcap
			if (getPointGen().gte(player.pointsCap)) pushThrough = `
			If your Solarity gain was not capped, you would gain x${format(player.postCap)} more than what you would have. which is ${format(player.beforeCap)}`
			else pushThrough = ``
			if (player.SolarityCap.neq(1e308)) capped = `The Current Solarity Gain Cap is ${format(player.SolarityCap)} <br> ${pushThrough} <br> `
			else capped = ``


	

		if (player.E.EclipseTier.eq(4)) {
			if (getClickableState("GL", 11)) return `
			Next Unlock at Chimera <br>  ${genText} ${capped}`
			
			else return `Next Unlock at Chimera <br> ${capped}`
		} 

		else if (player.E.Esolar.gte(10)) {
			if (getClickableState("GL", 11)) return `
			Next Unlock at Eclipse Tier 4 <br>  ${genText} ${capped}`
		
			else return `Next Unlock at Eclipse Tier 4 <br> ${capped}`
		}
		else if (player.E.Solinity.gte(10) || player.E.Esolar.gt(1)) {
			if (getClickableState("GL", 11)) return `
			Next Unlock at Esolar #10 <br>  ${genText} ${capped}`
		
			else return `Next Unlock at Esolar #10 <br> ${capped}`
		}
		else if (player.E.EclipseTier.eq(3)) {
			if (getClickableState("GL", 11)) return `
			Next Unlock at Solinity #10 <br>  ${genText} ${capped}`
		
			else return `Next Unlock at Solinity #10 <br> ${capped}`
		}
		
		else if (player.E.Eclipsium.gte(10) || getBuyableAmount("E", 11).gte(1)) {
					if (getClickableState("GL", 11)) return `
					Next Unlock at Cytochrisy #5 (~18 Enclipsium)<br>  ${genText} ${capped}`
				
					else return `Next Unlock at Cytochrisy #5 (~18 Enclipsium) <br> ${capped}`
				}

		else if (player.E.EclipseTier.eq(2)) {
			if (getClickableState("GL", 11)) return `
			Next Unlock at 10 Eclipsium <br>  ${genText} ${capped}`
		
			else return `Next Unlock at 10 Eclipsium <br> ${capped}`
		}
		
		else if (player.E.EclipseTier.eq(1)) {
			if (getClickableState("GL", 11)) return `
			Next Unlock at Eclipse Tier 2 <br>  ${genText} ${capped}`
	
			else return `Next Unlock at Eclipse Tier 2 <br> ${capped}`
		}

		else if (player.C.checkUpgrades.gte(3) || player.E.TopLVL.gte(1)) {
			if (getClickableState("GL", 11)) return `
			Next Unlock at First Eclipsication <br>  ${genText} ${capped}`

			else return `Next Unlock at First Eclipsication <br> ${capped}`
		}
		else if (hasUpgrade("GL",15)) {
			if (getClickableState("GL", 11)) return `
			Next Unlock at Twilight <br>  ${genText}`

			else return `Next Unlock at Twilight`
		}

		else if (hasUpgrade("S",14) || player["GL"].Solar_Shards.gte(1) || player["GL"].Solar_Shards.gte(1)) {			 
			if (getClickableState("GL", 11)) return `
			Next Unlock at Coronal Upgrade ${genText}<br><br> `
			
			else return `Next Unlock at Coronal Upgrade` //unlock 4
		} 
		else if (getBuyableAmount("S",11).gte(5)) {			
			return `Next Unlock at Solarizor Upgrade `
		} 
		else if (player["S"].points.gte(5) || getBuyableAmount("S",11).gte(2)){
			return `Next Unlock at Plasmate #5`

		} else {
			return `Next Unlock at 5 Solar Rays`

		}



	}
	







]

// Determines when the game "ends"
function isEndgame() {
	return false
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(60) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}