
let Display = `Solarity`

//if (getClickableState("E",14) == true ) Display = `<h3 style="color: #170f1c; text-shadow: 0px 0px 20px #cc0000;"> Shadows...? </h3`





let modInfo = {
	name: "The Great Eclipse Incremental",
	id: "OINOINOIN",
	author: "ThatOneKobold",
	
	
	
	pointsName: "Solarity",

	modFiles: ["layers.js/SolarRays.js", "layers.js/GoldenRays.js","layers.js/Centerality.js","layers.js/Enlightenment.js","layers.js/dialogueStuff.js","layers.js/lunaris.js","tree.js"],
	discordName: "Join ThatOneKobold's Community Server!",
	discordLink: "https://discord.gg/tJDWU7twvB",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 40,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.5 F10-B10 [BETA TESTING]",
	name: "Yeh",
}

let changelog = `
<h1>Changelog:</h1><br><br>
<h2>Start Date: 4/13/2024</h2> <br><br>


<h3>v0.5 Fix 10, Balance 10</h3><br>
Lunaris, do my laundry! <br>
- added <h3> The Forgotton </h3> <br>
- Added 2 new Currencies <br>
- added THE first One Time Reset Lunarity <br>
- added a side Reset for Eclipsification (50% chance it gets reset on Eclipsification) <br>
- NEW CHECK UPGRADE?!?! <br>
- Renamed Enlightenment tabs: SOTI -> Eclipsify. and SOTE -> The Factory [dw these will return soon]<br>
- NEW UI CHANGE????! <br>

<br>
Bal6: Reduced PK44's Plasmate Queue Requirements slightly (75 -> 74) [It was too long] <br>
Bal7: Added a softcap gain to Esolar and added a roofcap to it (starts at 10,000)<br>
Bal8: added 2 softcaps for Chimera's effect boost <br>
Bal9: added a boost cap to Eclipsium [at 50 Eclipsium]<br>
Bal10: Lowered Queue Upgrades goal requirements from 60000 to 30000 (Eclarity) <br>
Fix9: Fixed Center Points bulk purchase not working properly (it was adding instead of setting the value) <br>
Fix10: Fixed Solar Light generation incorrectly displaying its generation value<br>

<br><br>

<h3>v0.4 Fix 8, Balance 5</h3><br>
<h4>Lol i just Eclips'd ur mom</h4><br>
- there is now a Solarity Gain Cap of e308! [aka Infinity]
- Added Enlightenment <br>
- Added Eclipse Tiers 1 through 4 <br>
- Milestone Feature?????? <br><br>
Fix3: Fixed Annular being able to be purchased before its cost<br>
Fix4: You Know, I forgot to fix Coronal too, since they were showing way before Annular was bought<br>
Fix5: Fixed how Effector Tiers spent Center Points (It incremented by 1, THEN subtracted)<br>
Fix6: Fixed incorrect row placements and adjusted them to look better<br>
Fix7: Updated Color theory on all upgrades, they should be easier to read now :)<br>
Fix8: Changed first tab in Solarizor reset layer date on where the solar eclipse actually happened (i was off by a month)<br>
Bal5: Plasmate has a new Conditional Scaling. where if its below 5 amount, it reduces the cost by 10% until you get to Layer 2. (this is to balance out Layer 1 stage, or Early game)<br>
	<br><br>

<h3>v0.3 Fix 2, Balance 4</h3><br>
<h4>CENTER THESE BALLS IN YOUR MOUTH!</h4><br>
- A prestige mechanic where its based off of Modifier Score! [A * B] = Output <br>
- Some unique challenges via "Upgrade Checks"! <br>
- Effector Upgrades which provides powerful Synergy!<br><br>

Fix2: Fixed Golden Light surpassing Light Cap [was not supposed to happen] It should now stay at a fixed amount. <br>
Bal1: Multiply Scaling 3x every 25 bought, Inflation bad <br>
Bal2: Multiply Scaling 9x every 100 bought, idk this was meant to be harder or something lol <br>
Bal3: Made an Increased Scaling after 200 bought. this just gets harder ;-; <br>
Bal4: Solar rays now have an exponent in which its base cap is ^2<br>

	<br><br>

<h3>v0.2 Fix 1, Balance 0</h3><br>
<h4>Second layer has been added...</h4><br>
- 2 Clickables that Reset 1st layer!<br>
- A new Conversion rate system and Light cap stuff<br>
- You ONLY gain solar shards in a very unique and special way.<br>

Fix2: Fixed PointGen() issues/boosts not responding very well (it was an "x= value bug) <br>


	<br><br>

<h3>v0.1 Fix 0, Balance 0</h3><br>
	<h4>First layer has been added...</h4><br>
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


	//Check Upgrade 1 and Check Upgrade 2 Debuffs
	if (getClickableState("C", 21)) gain = gain.pow(0.666)
	if (getClickableState("C", 23) == true ) gain = gain.log(12)




	if (getClickableState("C", 23) == true && hasMilestone("E",2) ) gain = gain.pow(1.15)
	if (player.C.checkUpgrades.gte(2)) {
		let Heirarchy = player.C.CenterPoints.pow_base(5).clampMin(1)
		if (!getClickableState("C", 23)) gain = gain.mul(Heirarchy)
		else if (getClickableState("C", 23)) gain = gain.mul(Heirarchy.log(12)).clampMin(1)
	
	}
	if (player.C.checkUpgrades.gte(1)) gain = gain.pow(1.25)
		// The Forgotton... Check upgrade

	if (getClickableState("E",14)) gain = gain.root(7)
	


	if (player.L.LunarPower.gt(100)) gain = gain.div(decimalOne.plus(player.L.LunarPower.sub(100).log(7.5)).pow(player.L.LunarPower.sub(100).log(4)).clampMin(1))	


	if (hasMilestone("E",1)) gain = gain.mul(player.E.EclipseTier.pow_base(9))
	gain = gain.mul(upgradeEffect("E",12))
	//if (hasUpgrade("E",11)) gain = upgradeEffect("E",11)









	//Solar Light generation
	if (getClickableState("GL", 11) == true) gain = gain.pow(0.5)
	
	//the point hardcaps
	let C = player.E.Esolar.clampMax(10000)
	let B = new Decimal(1)
	if (C.gt(1))  B = Decimal.add(1 , C.log(2))
	let basegainCap = player.BasepointsCap
	if (hasMilestone("E",1)) basegainCap = basegainCap.mul(player.E.EclipseTier.pow_base(20))
	if (hasMilestone("E",2)) basegainCap = basegainCap.mul(player.E.Eclipsium.pow_base(1.45))
	basegainCap = basegainCap.mul(getBuyableAmount("E", 11).mul(0.5).add(1))
	basegainCap = basegainCap.mul(buyableEffect("E",12))

	if (getBuyableAmount("L",12).gte(1)) basegainCap = basegainCap.mul(buyableEffect("S",12).pow(getBuyableAmount("L",12).add(1).log(10).div(15)))
	if (getBuyableAmount("L",11).gte(1)) basegainCap = basegainCap.mul(buyableEffect("S",11).pow(getBuyableAmount("L",11).add(1).log(10).div(5)).clampMin(1))



	if (hasMilestone("E",3)) basegainCap = basegainCap.mul(player.E.SolarCharge.log(2).add(1).pow(B))
	if (hasMilestone("E",5)) basegainCap = basegainCap.mul(player.C.CenterPoints.pow_base(5).pow(0.33).clampMin(1))
	let c1effect = decimalOne.plus(player.L.LunarPower.log(5)).pow(player.L.LunarPower.log(2)).clampMin(1)
	basegainCap = basegainCap.mul(c1effect)





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

	
	function() {
		
		// Decimal.pow(getPointGen().pow(0.5), 0.2).sub(1)

		let nextText = `new Decimal(1)`
		let speed = new Decimal(1)
		if (getClickableState("GL", 11)) speed = getPointGen().pow(0.5).pow(0.2)
			//.pow(0.5).pow(0.2).sub(1)
			
		//if (getClickableState("C", 14)) formula = Decimal.div(getPointGen().pow(1.501501502),   getPointGen())
		
		
		if (hasUpgrade("C",16)) speed = speed.times(3.14)
			if (player.E.EclipseTier.gte(5)) speed = speed.times(player.E.EclipseTier.pow_base(1.35))



		//Challenges and Dilations	

		let genText = ``
		if (getClickableState("GL",11)) genText = `
		Solarity Generation has been reduced (OG generation was ${format(getPointGen().pow(2))}) 
		<br> Generating ${format(speed)} Golden Light per second
		<br>`
		let capped = ``
	    let pushThrough = ``

		let fogger = `Solarity`
		if (getClickableState("E",14)) fogger = `Shade...?`


		//Hardcaps and other things
			// Solarity Hardcap
			if (getPointGen().gte(player.pointsCap)) pushThrough = `<br>
			If your ${fogger} gain was not capped, you would gain x${format(player.postCap)} more than what you would have. which is ${format(player.beforeCap)}`
			else pushThrough = ``
			if (player.SolarityCap.neq(1e308)) capped = `
			<br>
			The Current Solarity Gain Cap is ${format(player.SolarityCap)}
			 <br> ${pushThrough} <br> `
			else capped = ``


	//player.L.LunarPower.gte(1000)

		if (getBuyableAmount("L",11).gte(10) || getBuyableAmount("L",12).gte(6)) {
			if (getClickableState("GL", 11)) nextText = `
			Next Unlock at Lightness #10 and Darkness #8 `
		
		else nextText = `Next Unlock at Lightness #10 and Darkness #8`
		} 
		else if (getBuyableAmount("E",12).gte(10) || player.L.lunarity == true) {
				if (getClickableState("GL", 11)) nextText = `
				Next Unlock at Ektrosy #9 and Basity I #5`
				
				else nextText = `Next Unlock at Ektrosy #10 and Basity I #5`
		} 
		else if (player.E.Chimera.gte(10)) {
				if (getClickableState("GL", 11)) nextText = `
				Next Unlock at Expansion I #10 <br> `
				
				else nextText = `Next Unlock at Expansion I #10 `
		} 
		else if (player.E.EclipseTier.eq(4)) {
			if (getClickableState("GL", 11)) nextText = `
			Next Unlock at Chimera #10 (hint: each queued upgrade has a certain loophole inside except for Astrologic) <br>`
			
			else nextText = `Next Unlock at Chimera #10 (hint: each queued upgrade has a certain loophole inside except for Astrologic)`
		} 
		else if (player.E.Esolar.gte(10)) {
			if (getClickableState("GL", 11)) nextText = `
			Next Unlock at Eclipse Tier 4`
		
			else nextText = `Next Unlock at Eclipse Tier 4`
		}
		else if (player.E.Solinity.gte(10) || player.E.Esolar.gt(1)) {
			if (getClickableState("GL", 11)) nextText = `
			Next Unlock at Esolar #10`
		
			else nextText = `Next Unlock at Esolar #10`
		}
		else if (player.E.EclipseTier.eq(3)) {
			if (getClickableState("GL", 11)) nextText = `
			Next Unlock at Solinity #10`
		
			else nextText = `Next Unlock at Solinity #10`
		}
		else if (player.E.Eclipsium.gte(10) || getBuyableAmount("E", 11).gte(1)) {
					if (getClickableState("GL", 11)) nextText = `
					Next Unlock at Cytochrisy #5 (~18 Enclipsium)`
				
					else nextText = `Next Unlock at Cytochrisy #5 (~18 Enclipsium)`
				}
		else if (player.E.EclipseTier.eq(2)) {
			if (getClickableState("GL", 11)) nextText =`
			Next Unlock at 10 Eclipsium `
		
			else nextText = `Next Unlock at 10 Eclipsium`
		}
		else if (player.E.EclipseTier.eq(1)) {
			if (getClickableState("GL", 11)) return `
			Next Unlock at Eclipse Tier 2 <br>`
	
			else nextText = `Next Unlock at Eclipse Tier 2 `
		}
		else if (player.C.checkUpgrades.gte(3) || player.E.TopLVL.gte(1)) {
			if (getClickableState("GL", 11)) nextText = `
			Next Unlock at First Eclipsication <br>`

			else nextText = `Next Unlock at First Eclipsication`
		}
		else if (hasUpgrade("GL",15)) {
			if (getClickableState("GL", 11)) nextText = `
			Next Unlock at Twilight `

			else nextText = `Next Unlock at Twilight`
		}
		else if (hasUpgrade("S",14) || player["GL"].Solar_Shards.gte(1) || player["GL"].Solar_Shards.gte(1)) {			 
			if (getClickableState("GL", 11)) nextText = `
			Next Unlock at Coronal Upgrade `
			
			nextText = `Next Unlock at Coronal Upgrade` //unlock 4
		} 
		else if (getBuyableAmount("S",11).gte(5)) {			
			nextText = `Next Unlock at Solarizor Upgrade `
		} 
		else if (player["S"].points.gte(5) || getBuyableAmount("S",11).gte(2)){
			nextText = `Next Unlock at Plasmate #5`

		} else {
			nextText = `Next Unlock at 5 Solar Rays`

		}
		
		let OOMTEXT = ``
		if (tmp.other.oompsMag != 0) OOMTEXT = `+${format(tmp.other.oomps)} OOMS per second`
		else OOMTEXT = `${format(getPointGen())} per second`
		let forgotten = ``; if (getClickableState("E", 14)) forgotten = `<h2 style="color: #170f1c; text-shadow: 0px 0px 10px #ffffff;"> You Have ${format(player.points)} Shade...? </h2>`; else forgotten = `<h2 style="color: #ffaf47; text-shadow: 0px 0px 10px #de482a;"> You Have ${format(player.points)} Solarity </h2>`
		let forgotten1 = ``; if (getClickableState("E", 14)) forgotten1 = `<h5 style="color: #170f1c; text-shadow: 0px 0px 10px #ffffff;"> Current Shade Production: ${OOMTEXT} Per second </h5>`; else forgotten1 = `<h5> Current Solarity Generation: ${OOMTEXT} </h5>`
		
		//Solarity Generation:
		return `
		
		${forgotten} <br>
		${forgotten1} <br>
		${nextText} <br>
		${genText}
		${capped}
		`

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