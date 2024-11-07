
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
	num: "0.5.4 F12-B13",
	name: "Yeh",
}
/*
6 Unique Upgrade types that are probably exclusive to SLOWPACED games
basic upgrade check, queued/quest upgrade, repeatable check, modifier check, intersection/conditional check, 
*/

/* Upgrades types that can be in both Fastpaced and Slow paced 
binary buyable, Decaying buyable(decreases slowly and persists within all resets), 

*/

/* Upgrades types that are probably exclusive to FASTPACED games
Randized buyables(Has no scaling, but increases cost between x and y per bought), Powerable Upgrade(increases slowly and persists within all resets), 

*/
/* 
<h3>v0.6 Fix 10, Balance 10</h3><br>
Solaris dont BURN my laundry! <br>
- added Aperation<br>
- added <br>
- <br>
- <br>*/
let changelog = `
<h1>Changelog:</h1><br><br>
<h2>Start Date: 4/13/2024</h2> <br><br>
<h3>there are currently 6 Unique upgrades types according TESGI's draft (Layers 1-4) </h3> <br><br><br>









<h3>v0.5 Fix 12, Balance 10</h3><br>
Lunaris, do my laundry! <br>
- added <h3> The Forgotton </h3> <br>
- added 2 new Currencies <br>
- added the first one time reset  <br>
- added a side Reset for Eclipsification (50% chance it gets reset on Eclipsification) <br>
- NEW CHECK UPGRADE?!?! <br>
- Renamed Enlightenment tabs: SOTI -> Eclipsify. and SOTE -> The Factory [dw these will return soon]<br>
- NEW UI CHANGE????! <br>
- added the solar clock (and maybe buffed it a slight bit) <br>
- a new upgrade type (subspecies) is here! [Repeatable Check Upgrades]. <br>
- Added Chronology <br>
- Changed Main layer 2 reset from Eclipsification to Eclipsify <br>
<br> Dev note: 🐊 <br>
<br>
Bal6: Reduced PK44's Plasmate Queue Requirements slightly (75 -> 74) [It was too long] <br>
Bal7: Added a softcap gain to Esolar and added a roofcap to it (starts at 10,000)<br>
Bal8: added 2 softcaps for Chimera's effect boost <br>
Bal9: added a boost cap to Eclipsium [at 50 Eclipsium]<br>
Bal10: Lowered Queue Upgrades goal requirements from 60000 to 30000 (Eclarity) <br>
Fix9: Fixed Center Points bulk purchase not working properly (it was adding instead of setting the value) <br>
Fix10: Fixed Solar light generation incorrectly displaying its generation value<br>
Fix11: Fixed Solar charge display incorrectly displaying its generation amount<br>
Fix12: Fixed Solar Light generation displaying its unnerfed generation incorrectly.. (IT was displaying as if there was no Solarity gain cap) <br>
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

Fix1: Fixed PointGen() issues/boosts not responding very well (it was an "x= value bug) <br>


	<br><br>

<h3>v0.1 Fix 0, Balance 0</h3><br>
	<h4>First layer has been added...</h4><br>
		- 4 Upgrades, and 2 very Important Buyables... Plasmate and Multiply.<br>	
		`

let winText = `The Eclipse is over... for its rays and shades all crumble beneath you... as your moons and suns have become distant. guide no more... they say.`

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
	Hour = new Date()
	let e2 = 0


	let gain = new Decimal(1)


	/*  */
	// PAST THIS POINT IS SOLARIZER EFFECTS
	gain = gain.plus(buyableEffect("S",11)).clampMin(0)
	gain = gain.mul(buyableEffect("S",12)).clampMin(1)
	if (hasUpgrade("S",13)) gain = gain.mul(upgradeEffect("S",13)).max(1) //
	if (hasUpgrade("GL",13)) gain = gain.mul(upgradeEffect("GL",13)).max(1) 
	
	if (hasUpgrade("C",13)) gain = gain.times(2.5)
	if (hasUpgrade("C",11)) gain = gain.times(16)
	
	let sPoints = player.S.points

	let MAX = (hasMilestone("E", 2) && player.L.TimeTillDarkCheck == false) ? 3 : 2
	let RootEFF1 = new Decimal(40)
	let RootEFF2 = new Decimal(35)
  	let SolarRay1 = sPoints.root(RootEFF1.sub(upgradeEffect("S",12)))
  	let SolarRay2 = sPoints.root(RootEFF2.sub(upgradeEffect("S",12)))	
    if (SolarRay1.gt(2)) SolarRay1 = softcap(SolarRay1, new Decimal(2), 0.3)
	gain = gain.pow(SolarRay1.clampMax(MAX)).clampMin(1)
	gain = gain.mul(SolarRay2).clampMin(1)

	
	//
	if (hasUpgrade("GL",21)) gain = gain.pow(upgradeEffect("GL",21))
	

	
	//Check Upgrade 1 and Check Upgrade 2 Debuffs
	if (getClickableState("C", 21)) gain = gain.pow(0.666)
	if (getClickableState("C", 23) == true ) gain = gain.log(12)
	// ------------ CENTRALITY EFFECTS -----------
	let HeirarchyBonus = player.C.CenterPoints.pow_base(5).clampMin(1)
	
	if (hasUpgrade("L",11)) HeirarchyBonus = HeirarchyBonus.pow(1.15)	

	if (hasUpgrade("C",22)) gain = gain.pow(1.15)
	if (player.C.EffectorTier.gte(1)) gain = Decimal.mul(gain, player.S.points.log(2).clampMin(1))
	if (getClickableState("C", 23) == true && hasMilestone("E",2) && player.L.TimeTillDarkCheck == false ) gain = gain.pow(1.15)
	if (player.C.checkUpgrades.gte(2)) {
		
		if (!getClickableState("C", 23)) gain = gain.mul(HeirarchyBonus)
		else if (getClickableState("C", 23)) gain = gain.mul(HeirarchyBonus.log(12)).clampMin(1)
	}
	if (player.C.checkUpgrades.gte(1)) gain = gain.pow(1.25)// The Forgotton... Check upgrade
		


	// --------- ENLIGHTENMENT EFFECTS ---------
	if (getClickableState("E",14)) gain = gain.root(7)
	if (player.L.LunarPower.gt(100)) gain = gain.div(decimalOne.plus(player.L.LunarPower.sub(100).log(7.5)).pow(player.L.LunarPower.sub(100).log(4)).clampMin(1))	
	if (hasMilestone("E",1)) gain = gain.mul(player.E.EclipseTier.pow_base(9))
	gain = gain.mul(upgradeEffect("E",12))
	//if (hasUpgrade("E",11)) gain = upgradeEffect("E",11)
	if (getClickableState("L",42) == true) gain = gain.root(3).mul(2)
	if (player.L.DarkCheck.gte(1) && player.L.Dark.gte(1)) gain = gain.mul(player.L.Dark.pow(0.3)) 
	



	//--------- LUNARIS EFFECTS -------------
	if (Hour.getHours() <= 12 && getBuyableAmount("L",21).gte(1)) gain = gain.mul(1.15 ** Hour.getMinutes())
	
	



	//--------------- Solarity generation nerf ----------------
	if (getClickableState("GL", 11) == true) gain = gain.pow(0.5)
	if (player.L.TimeTillDarkActive == true) gain = gain.pow(0.6)


	// ------------------ SOLAR CHARGE EFFECTS --------------
	let C = player.E.Esolar.clampMax(10000)
	let B = new Decimal(1)
	let S = new Decimal(0)
	if (buyableEffect("L",31).gt(1)) S = buyableEffect("L",31).log(4)
	if (C.gt(1))  B = Decimal.add(1 , C.log(2)).add(S)

	

	
	let basegainCap = player.BasepointsCap
	// --------------- check upgrade Lightness
	if (getClickableState("L", 41) || player.L.TimeTillDarkActive == true) basegainCap = new Decimal(1)


	if (hasMilestone("E",1)) basegainCap = basegainCap.mul(player.E.EclipseTier.pow_base(20))
	if (hasMilestone("E",2)) basegainCap = basegainCap.mul(player.E.Eclipsium.pow_base(1.45))
	basegainCap = basegainCap.mul(getBuyableAmount("E", 11).mul(0.5).add(1))
	basegainCap = basegainCap.mul(buyableEffect("E",12))

	if (getBuyableAmount("L",12).gte(1)) basegainCap = basegainCap.mul(buyableEffect("S",12).pow(getBuyableAmount("L",12).add(1).log(10).div(15)))
	if (getBuyableAmount("L",11).gte(1)) basegainCap = basegainCap.mul(buyableEffect("S",11).pow(getBuyableAmount("L",11).add(1).log(10).div(5)).clampMin(1))



	if (hasMilestone("E",3)) basegainCap = basegainCap.mul(player.E.SolarCharge.log(2).add(1).pow(B))
	

	//Heirarchy
	
	if (hasMilestone("E",5) && player.L.TimeTillDarkCheck == false) basegainCap = basegainCap.mul(HeirarchyBonus.pow(0.33))


	let c1effect = decimalOne.plus(player.L.LunarPower.clampMin(1).log(5)).pow(player.L.LunarPower.log(2)).clampMin(1)
	basegainCap = basegainCap.mul(c1effect)
	if (player.L.Light.gt(1)) basegainCap = basegainCap.mul(player.L.Light)
	if (player.L.Dark.gt(1)) basegainCap = basegainCap.mul(player.L.Dark)
	if (Hour.getHours() <= 12 && getBuyableAmount("L",21).gte(1)) basegainCap = basegainCap.mul(1.15 ** Hour.getMinutes())
	



	//Limit everything to the point gain cap

	//Time till dark
	if (player.L.TimeTillDarkActive == true){ 
		basegainCap = basegainCap.pow(0.6)
		basegainCap = basegainCap.div(player.L.TimeTillDark.sub(243).abs().div(60).floor().pow_base(100))
	}
	
	//this is in getPointGen() btw
	player.SolarityCap = basegainCap
	player.postCap = gain.div(player.BasepointsCap)
	player.beforeCap = gain

	if (player.L.TimeTillDarkActive == true && player.L.TimeTillDark.lte(0)) {
		layer2Reset()
		player.L.TimeTillDarkActive = false
		player.L.TimeTillDark = new Decimal(0)
		gain= new Decimal(0)
	}

	return gain.clampMax(basegainCap)


}

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
		if (getClickableState("GL", 11)) speed = getPointGen().clampMax(player.SolarityCap).pow(0.5).pow(0.2)
			//.pow(0.5).pow(0.2).sub(1)
			
		//if (getClickableState("C", 14)) formula = Decimal.div(getPointGen().pow(1.501501502),   getPointGen())
		
		
		if (hasUpgrade("C",16)) speed = speed.times(3.14)
			
		if (player.E.EclipseTier.gte(5)) speed = speed.times(player.E.EclipseTier.pow_base(1.35))



		//Challenges and Dilations	

		let genText = ``
		if (getClickableState("GL",11)) genText = `
		<br>Solarity Generation has been reduced (OG generation was ${format(getPointGen().pow(2).clampMax(player.SolarityCap))}) <br>
		<br> Generating ${format(speed)} Golden Light per second
		<br>`
		let capped = ``
	    let pushThrough = ``

		let fogger = `Solarity`
		if (getClickableState("E",14)) fogger = `Shade...?`
		//if (getClickableState("L",11)) fogger = ``


		//Hardcaps and other things
			// Solarity Hardcap
			if (getPointGen().gte(player.pointsCap)) pushThrough = `<br>
			If your ${fogger} gain was not capped, you would gain x${format(player.postCap)} more than what you would have. which is ${format(player.postCap.mul(player.SolarityCap))}`
			else pushThrough = ``
			if (player.SolarityCap.neq(1e308)) capped = `
			<br>
			The Current Solarity Gain Cap is ${format(player.SolarityCap)}
			 <br> ${pushThrough} <br>
			 `
			else capped = ``


	/*

			 TO DO: MAKE DAY TIER II and Night tier II, then make 2 Lunarity check upgrades. and a queued upgrade.<br>
			 6:00 PM - ^1.15 to Heirarchy's effect. Cost: <br>
			 12:30 AM - Increase solar light cap by 1.5 per Center point compounding<br>
			 8:00 PM - Solar charge boosts Multiply and Plasmate at a reduced rate (log5(x))<br>
			 10:00 PM - Requires 6PM,12.5AM, 10PM, 8PM, and X40PM: Boost Enlightenment levels by 1.15x <br>
			 x:40 AM - reduce solar charge's log effect base by -0.1<br>

	*/
	if (true) {	
		if (getBuyableAmount("L",22).gte(2) && getBuyableAmount("L",22).gte(2)) {
		nextText = `Solock XV (16): Next Unlock at Anaphalagia (1x:x)`
		} 
		else if (getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5)) {
			nextText = `Solock XV (15): Next Unlock at D-Time II and N-Time II`
		} 
		else if (getBuyableAmount("E",12).gte(10) || player.L.lunarity == true) {
				
				nextText = `Solock XIV (14): Next Unlock at Ektrosy #9 and Basity I #5`
						
		} 
		else if (player.E.Chimera.gte(10)) {
				nextText = `Solock XIII: Next Unlock at Expansion I #10 `
		} 
		else if (player.E.EclipseTier.eq(4)) {
			 nextText = `Solock XII: Next Unlock at Chimera #10`
		} 
		else if (player.E.Esolar.gte(10)) {
			 nextText = `Solock XI: Next Unlock at Eclipse Tier 4`
		}
		else if (player.E.Solinity.gte(10) || player.E.Esolar.gt(1)) {
			 nextText = `Solock X: Next Unlock at Esolar #10`
		}
		else if (player.E.EclipseTier.eq(3)) {
			 nextText = `Solock IX: Next Unlock at Solinity #10`
		}
		else if (player.E.Eclipsium.gte(10) || getBuyableAmount("E", 11).gte(1)) {
			nextText = `Solock VIII: Next Unlock at Cytochrisy #5`
				}
		else if (player.E.EclipseTier.eq(2)) {
			 nextText = `Solock VII: Next Unlock at 10 Eclipsium`
		}
		else if (player.E.EclipseTier.eq(1)) {
			 nextText = `Solock VI: Next Unlock at Eclipse Tier 2 `
		}
		else if (player.C.checkUpgrades.gte(3) || player.E.TopLVL.gte(1)) {
			 nextText = `Solock V: Next Unlock at First Eclipsication`
		}
		else if (hasUpgrade("GL",15)) {
			 nextText = `Solock IV: Next Unlock at Twilight`
		}
		else if (hasUpgrade("S",14) || player["GL"].Solar_Shards.gte(1) || player["GL"].Solar_Shards.gte(1)) {			 
			
			
			nextText = `Solock III: Next Unlock at Coronal Upgrade` //unlock 4
		} 
		else if (getBuyableAmount("S",11).gte(5)) {			
			nextText = `Solock II: Next Unlock at Solarizor Upgrade `
		} 
		else if (player["S"].points.gte(5) || getBuyableAmount("S",11).gte(2)){
			nextText = `Solock I: Next Unlock at Plasmate #5`

		} else {
			nextText = `Solock 0: Next Unlock at 5 Solar Rays`

			}
		}


		let OOMTEXT = ``
		if (tmp.other.oompsMag != 0) OOMTEXT = `+${format(tmp.other.oomps)} OOMS per second`
		else OOMTEXT = `${format(getPointGen())} per second`
		let forgotten = ``; 

		if (getClickableState("E", 14)) forgotten = `<h2 style="color: #170f1c; text-shadow: 0px 0px 10px #ffffff;"> You Have ${format(player.points)} Shade...? </h2>`; 
		else forgotten = `<h2 style="color: #ffaf47; text-shadow: 0px 0px 10px #de482a;"> You Have ${format(player.points)} Solarity </h2>`
		
		if (getClickableState("L",42) == true) forgotten = `<h2 style="color: #0f032b; text-shadow: 0px 0px 10px #ffffff;"> You Have ${format(player.points)} Dark Essence`
		
		if (player.L.TimeTillDarkActive == true) forgotten = `<h2 style="color: #044c76"> ${format(player.points)} / 3e44 </h2> <h2 style="color: #61036b"> Dark Entropy </h2>`

		let forgotten1 = ``; 
//#31005e
		if (getClickableState("E", 14)) forgotten1 = `<h5 style="color: #31005e; text-shadow: 0px 0px 10px #ffffff;"> Current Shade Production: ${OOMTEXT} Per second </h5>`; 
		else forgotten1 = `<h5> Current Solarity Generation: ${OOMTEXT} </h5>`
		if (getClickableState("L", 42)) forgotten1 = `<h5 style="color: #0f032b; text-shadow: 0px 0px 10px #ffffff;"> Current Dark Essence Generation: ${OOMTEXT} Per second </h5>`; 
		if (player.L.TimeTillDarkActive == true) forgotten1 = `<h4 style="color: #0f032b; text-shadow: 0px 0px 10px #ffffff;"> Solarity Generation is hidden... </h4>`; 
//5b0935


		//Solarity Generation:


		let FMTDtext = ``

		let FMTDnerf = ``

		if (player.L.TimeTillDark.sub(243).abs().gte(60)) FMTDnerf = `<h4 style="color: #9a1212";>Solarity gain cap reduced by /${format(player.L.TimeTillDark.sub(243).abs().div(60).floor().pow_base(100))} </h4>`
		
		completion = Decimal.div(player.points.clampMin(1).log(10), new Decimal(3e44).log(10)).mul(100)
		


		
		if (player.L.TimeTillDarkActive == true) FMTDtext = `<br><h3 style="color: #9a1212"; class="glitch"; data-text="The clock is ticking...";>The clock is ticking...</h3> <br>
		 <h4 style="color:#5022f3"> You have ${format(player.L.TimeTillDark,1)} Seconds left to complete this check</h4> <br> 
		 ${FMTDnerf}
		 Progress to completion: ${format(completion,2)}%
		 `

		if (player.L.TimeTillDarkActive == true) nextText = ``

		return `
		
		${forgotten}<br>${forgotten1}<br>${FMTDtext} <br>
		${nextText}
		${genText} 
		${capped} <br>

		
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