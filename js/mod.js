
let Display = `Solarity`

//if (getClickableState("E",14) == true ) Display = `<h3 style="color: #170f1c; text-shadow: 0px 0px 20px #cc0000;"> Shadows...? </h3`

const shiftList = [
	"surface",
	"heat",
	"pressure",
	"shadow"
]



let modInfo = {
	name: "The Solar Eclipse Guidance Incremental",
	id: "test1", //after I'm done with this mod, change mod id for balance check

	// main id save: OINOINOIN 
	// testing id save: test1

	author: "ThatOneKobold",
	
	pointsName: "Solarity",

	modFiles: ["layers.js/SolarRays.js", 
		"layers.js/GoldenRays.js",
		"layers.js/Centerality.js",
		"layers.js/Enlightenment.js",
		"layers.js/extras.js",
		"layers.js/lunaris.js","layers.js/solaris.js",
		"tree.js"],
	discordName: "Join ThatOneKobold's Community Server!",
	discordLink: "https://discord.gg/tJDWU7twvB",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 40,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.6 F20-B18",
	name: "Solaris's awakening.",
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
let changelog = ` <span class="ignThemes">
<h1>Changelog:</h1><br><br>
<h2>Start Date: 4/13/2024</h2> <br><br>
<h3>there are currently 6 Unique upgrades types according TESGI's draft (Layers 1-4) </h3> <br><br><br>

<span> <i>and the sun rises, yet we no longer appreciate it for its volatility...</i><br></span>

<span> <i>will it ever be trusting enough to allow our gaze within? we will never know...</i></span><br><br>

<h3>v0.6 Fix 20, Balance 18</h3><br>
Solaris... fuck you lol. <br>
- Added ECT 7, and a bit of QoL... <br><br>
- Added Aperation, The Randomizor, and The Core.<br>
- Updated and changed Annular and Coronal's styling just slightly <br>
- Added unlockable themes <br>
- Added The wall of checks.  <br>
- Added the heliosphere, and its content 
<br><br>

<h4> > I also slightly altered the Viewer component to be customizable to a default </h4><br>
<h4> > Also made changelog easier to read just in case of people wanting to see how the game changed over the months </h4><br>
<h4> > Finally decided to fix Gravitations text overlap (It annoyed me enough >:( )</h4><br><br>


- Majorly Shortened and Compacted the Main visuals, like realm currencies. <br>
- Added New Themes: Eclipse and Twilight<br>
- Added and changed UI's of custom-made features<br>
- Moved some features into other tabs to save space and clutter <br>
	<br> Center Tree Respec moved from The Effector to The Center Tree
<br>added a few secrets into the game 

Fixes:<br>
Fix 13: Layers no longer randomly switch places when reloading screens <br>
Fix 14: Finally fixed post solarity cap statistics being incorrect<br>
Fix 15: Fixed Center Points incorrect cost scale FOR THE 4TH TIME<br>
Fix 16: Fixed Solar light generation and Solar Charge generation (for REAL this time), i finally understood what diff is and how it functions xd<br>
Fix 17: Fixed Expansion I buyable so that it shows itself when having at least 1 level of it.<br>
Fix 18: Fixed Duality not following Dark requirements<br>
Fix 19: Finally fixed what made the Duality checks not return to their normal color after leaving it. <br>
Fix 20: Fixed Jear 1 being able to be purchased during specific conditions via "Jear 2 + Jear 3" <br>

<br>
Balances <br>
Bal 11: Added a cap to Eclipsium at a base of 100,000<br>
Bal 12: Added a new boost to Eclipsium at Eclipse Tier 5<br>
Bal 13: slightly nerfed the goal requirements for Light And Dark Rep-Checks <br>
	Light: 150^(Level^2.25) -> 100^(Level^2) <br>
	Dark: 150^(Level^5.25) -> 100^(Level^3) <br>
Bal 14: nerfed Lunar Time first requirements from 3e12 Solar Light to 1.5e11 <br>
Bal 15: buffed MH-1 <br>
	1 + (M * (1 + H / 1560) ->  1 + (M * (1 + H / 1000) <br>
Bal 16: completely changed the formula for MH-2 <br>
	    new: 1+(1.1^(M/3)) * (1.25^H) <br>
		old: 1.5^M * 3^H -> 1.25^M * 3^H  <br><br>
Bal 17: buffed Dark check nerfs to be applied after all bonuses have been applied <br>
Bal 18: added a scaling to duality checks once it reaches 10. <br> 
<br><br>

<h3>v0.5 to v0.5.4, Fix 12, Balance 10</h3><br>
Lunaris, do my laundry! <br>
- added Eclipse tier 5 and 6 <br><br>
- added <h3> The Forgotton </h3> <br>
- added 2 new Currencies <br>
- added the first one time reset  <br>
- NEW CHECK UPGRADES?!?! <br>
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
<br><br>
v0.5 - v0.5.4
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
	</span>
		`

let winText = `0`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "rollAP"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}





// Determines if it should show points/sec
function canGenPoints(){
	return player.startedGame
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	Hour = new Date()
	let e2 = 0


	let gain = new Decimal(0)

	//timer: 3 weeks of 5x solarity bonus, 2x SR and 1.5x Plasmate's effect 


	/*  */
	// PAST THIS POINT IS SOLARIZER EFFECTS

	let deAmp = player.Sol.activeCheck == "Heliosphere" ? 0.7 : 1
	
	gain = gain.plus(buyableEffect("S",11)).clampMin(0)
	gain = gain.mul(buyableEffect("S",12)).clampMin(1)
	if (hasUpgrade("S",13)) gain = gain.mul(upgradeEffect("S",13).pow(deAmp)).max(1) //
	if (hasUpgrade("GL",13)) gain = gain.mul(upgradeEffect("GL",13).pow(deAmp)).max(1) 
	
	if (hasUpgrade("C",13)) gain = gain.times(2.5 ** deAmp)
	if (hasUpgrade("C",11)) gain = gain.times(16 ** deAmp)
	
	let sPoints = player.S.points

	let MAX = (hasMilestone("E", 2) && player.L.activeCheck == "") ? 3 : 2
	let RootEFF1 = new Decimal(40)
	let RootEFF2 = new Decimal(35)
  	let SolarRay1 = sPoints.root(RootEFF1.sub(upgradeEffect("S",12).pow(deAmp)))
  	let SolarRay2 = sPoints.root(RootEFF2.sub(upgradeEffect("S",12).pow(deAmp)))	
    if (SolarRay1.gt(2)) SolarRay1 = softcap(SolarRay1, new Decimal(2), 0.3)
	if (!player.Sol["TBSun"].active) gain = gain.pow(SolarRay1.clampMax(MAX)).clampMin(1)
	if (!player.Sol["TBSun"].active) gain = gain.mul(SolarRay2).clampMin(1)

	
	//
	if (hasUpgrade("GL",21)) gain = gain.pow(upgradeEffect("GL",21).pow(deAmp))
	
	//Check Upgrade 1 and Check Upgrade 2 Debuffs
	if (player.C.activeCheck == "Formality") gain = gain.pow(0.666)
	if (player["C"].activeCheck == "Twilight" ) gain = gain.log(12)
	// ------------ CENTRALITY EFFECTS -----------
	//hasUpgrade("Sol")
	gain = gain.mul(GetHeirarchyBonus()) 

	if (hasUpgrade("C",22)) gain = gain.pow(1.15)
	if (player.C.EffectorTier.gte(1)) gain = Decimal.mul(gain, player.S.points.log(2).clampMin(1))
	if (player["C"].activeCheck == "Twilight" && hasMilestone("E",2) && player.L.activeCheck == "" ) gain = gain.pow(1.15)
	
	if (player["C"].hasFormality) gain = gain.pow(1.25)// The Forgotton... Check upgrade

	// --------- ENLIGHTENMENT EFFECTS ---------
	if (player["E"].activeCheck == "Forgotton") gain = gain.root(7)
		
			let LP = player.Sol.activeCheck == "Heliosphere" ? player.Sol.HelioStat["Lunar_Abnorm"] : player.L.LunarPower
		
			let BLEEDINGSUN_POWER = 1
			let c1DEBUFF = new Decimal(1)
			if (player.Sol["TBSun"].active) BLEEDINGSUN_POWER = player.Sol["TBSun"].pending.plus(1)
			if (player.Sol["TBSun"].active) c1DEBUFF = decimalOne.plus(LP.log(7.5)).pow(player.L.LunarPower.log(4)).clampMin(1).pow(BLEEDINGSUN_POWER)	

	if (LP.gt(100) && !player.Sol["TBSun"].active) gain = gain.div( (decimalOne.plus(player.L.LunarPower.sub(100).log(7.5)).pow(player.L.LunarPower.sub(100).log(4)).clampMin(1)).pow(new Decimal(0.9).pow(player.Sol["TBSun"].x))     )	
	else if (player.Sol["TBSun"].active) gain = gain.div(c1DEBUFF)		



	if (hasMilestone("E",1)) gain = gain.mul(player.E.EclipseTier.pow_base(9))
	gain = gain.mul(upgradeEffect("E",12).pow(deAmp))
	//if (hasUpgrade("E",11)) gain = upgradeEffect("E",11)
	
	if (player.L.DarkCheck.gte(1) && player.L.Dark.gte(1)) gain = player.Sol.activeCheck == "Heliosphere" ? gain.mul(player.Sol.HelioStat["Dark"].pow(0.3))  : gain.mul(player.L.Dark.pow(0.3)) 
	

	//--------- LUNARIS EFFECTS -------------
	if (Hour.getHours() <= 12 && getBuyableAmount("L",21).gte(1)) gain = gain.mul(1.15 ** Hour.getMinutes())
	
	//--------- SOLARIS' EFFECTS -------------
	if (TSolStones(1).unlocked) gain = gain.mul(TSolStones(1).effect); 
	if (getClickableState("L",41) && hasUpgrade("Sol",13)) gain = gain.pow(1.05)


	// --------- PESTILLESSENCE EFFECTS ----------



	//--------------- Solarity generation nerf (after all bonuses) ----------------
	if (getClickableState("GL", 11) == true) gain = gain.pow(0.5)
	if (player.L.activeCheck == "TimeTillDark") gain = gain.pow(0.6)
	if (getClickableState("L",42)) gain = gain.root(3)


	// ------------------ SOLAR CHARGE EFFECTS --------------
	let C = player.E.Esolar.clampMax(10000)
	let B = new Decimal(1)
	let S = new Decimal(0)
	if (buyableEffect("L",31).gt(1)) S = buyableEffect("L",31).log(4)
	if (C.gt(1))  B = Decimal.add(1 , C.log(2)).add(S)


	// ---------------- TRNG,BRNG,CRNG
	
		

	
	let basegainCap = player.BasepointsCap
	// --------------- check upgrade Lightness
	if (getClickableState("L", 41) || player.L.activeCheck == "TimeTillDark") basegainCap = new Decimal(1)
	


	//---------- INCREASING SOLARITY CAP
	if (hasMilestone("E",1)) basegainCap = basegainCap.mul(player.E.EclipseTier.pow_base(20))

	let moved = new Decimal(100000)
	if (player.E.EclipseTier.gte(6)) moved = new Decimal(1e10)	
	if (hasMilestone("E",2)) basegainCap = basegainCap.mul(player.E.Eclipsium.pow_base(1.45).clampMax(moved))


	basegainCap = basegainCap.mul(getBuyableAmount("E", 11).mul(0.5).add(1))
	basegainCap = basegainCap.mul(buyableEffect("E",12))

	if (getBuyableAmount("L",12).gte(1)) basegainCap = basegainCap.mul(buyableEffect("S",12).pow(getBuyableAmount("L",12).add(1).log(10).div(15)))
	if (getBuyableAmount("L",11).gte(1)) basegainCap = basegainCap.mul(buyableEffect("S",11).pow(getBuyableAmount("L",11).add(1).log(10).div(5)).clampMin(1))


	if (hasMilestone("E",3)) basegainCap = basegainCap.mul(player.E.SolarCharge.log(2).add(1).pow(B)).clampMin(1)
	

	//Heirarchy
	
	if (hasMilestone("E",5) && player.L.activeCheck == "") basegainCap = basegainCap.mul(GetHeirarchyBonus().pow(0.33))


	let c1effect = decimalOne.plus(player.L.LunarPower.clampMin(1).log(5)).pow(player.L.LunarPower.log(2)).clampMin(1)
	basegainCap = basegainCap.mul(c1effect)
	if (player.L.Light.gt(1)) basegainCap = basegainCap.mul(player.L.Light)
	if (player.L.Dark.gt(1)) basegainCap = basegainCap.mul(player.L.Dark)
	if (Hour.getHours() <= 12 && getBuyableAmount("L",21).gte(1)) basegainCap = basegainCap.mul(1.15 ** Hour.getMinutes())
	
	if (BSolStones(2).unlocked) basegainCap = basegainCap.mul(BSolStones(2).effect); 
	//	
	if (getClickableState("L",41) && hasUpgrade("Sol",13)) basegainCap = basegainCap.pow(1.15)	


	// HELIOSPHERE CHECK
	if (Check("Sol",11).has) basegainCap = basegainCap.pow(1.2769) //don't ask why it's that specific 




	//Time till dark
	if (player.L.activeCheck == "TimeTillDark"){ 
		basegainCap = basegainCap.pow(0.6)
		basegainCap = basegainCap.div(player.L.TimeTillDark.sub(243).abs().div(60).floor().pow_base(100))
	}

	

	if (BSolStones(2).unlocked) basegainCap = basegainCap.mul(BSolStones(2).effect.clampMin(1))


	if (player.Sol.SolarHeat.gt(1)) basegainCap = basegainCap.mul(player.Sol.SolarHeat.pow(3.75).clampMin(1))	




	//this is in getPointGen() btw
	player.SolarityCap = basegainCap
	player.postCap = gain.div(player.BasepointsCap)
	player.beforeCap = gain

	if (player.L.activeCheck == "TimeTillDark" && player.L.TimeTillDark.lte(0)) {
		player.L.activeCheck == ""

		player.L.TimeTillDark = new Decimal(0)
		gain = gain.mul(0).add(1)
	}
	//change later
	if (player.Sol.activeCheck == "Heliosphere") basegainCap = basegainCap.pow(player.Sol.HelioStat["Reduction"].mul(2))

	return gain.clampMax(basegainCap)


}

function addedPlayerData() { return {

	deaths: 0,

	BasepointsCap: new Decimal(1e308),
	SolarityCap: new Decimal(1),
	postCap: new Decimal(1),
	beforeCap: new Decimal(1),

	rot: 0,
	tick: 0,
	frames: 0,
	//inCutscene: false,
	showScreen: true,

	finishedStCutscene: false,
	inCutscene: false,
	cutsceneName: "",


	//DO NOT CHANGE THIS
	agreedTOS: false,
	timerToAgree: 12,

	finalTime: 0,
	startedGame: false,
	gameEnd: false,

	//technical
	debugMode: false,

	//secret
	secrets: {
	 really: false,
	 why: false,
	},

	eventActive: false,

	thingy: 0,

	TSEGI_COMPLETIONS: {
		"V0.6" : false,

	},



}}   


// The main animation of some texts, this might come in handy


  
 


// Display extra things at the top of the page
var displayThings = [
	
	// REMINDER: seperate displays into different functions (for displayThings)
	
	function s() {
		let speed = new Decimal(1)
		if (getClickableState("GL", 11)) speed = getPointGen().clampMax(player.SolarityCap).pow(0.5).pow(0.2)
		
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
		if (player["E"].activeCheck == "Forgotton") fogger = `Shade...?`
	
		let SD104_Eff = getSRCap().gt(1e15) && getClickableState("L",42) ? `<span style="color: #0f032b;">The Current Solar ray cap is ${format(getSRCap())} </span><br>` : ``

		//Hardcaps and other things
			// Solarity Hardcap

			let multAfterCap = player.beforeCap.div(player.SolarityCap)

			if (getPointGen().gte(player.SolarityCap)) pushThrough = `<br>
			<p>If your ${fogger} gain was not capped, you would gain x${format(multAfterCap)} more than what you would have. which is ${format(player.beforeCap)} </p> <br>`
			else pushThrough = ``
			if (player.SolarityCap.neq(1e308)) capped = `
			<br>
			The Current Solarity Gain Cap is ${format(player.SolarityCap)}<br> 
			${SD104_Eff}

			 ${pushThrough} <br>
			 `
			else capped = ``

			if (player.Sol.activeCheck == "Heliosphere") capped = `
			<span style="color:rgba(229, 0, 0, 0.4); text-shadow: 0px 0px 10px rgb(80, 70, 58);"> thE onLy lImiT iS tHe sUrFace oF tHe sUn</span>`

			//
		let OOMTEXT = ``
		if (tmp.other.oompsMag != 0) OOMTEXT = `+${format(tmp.other.oomps)} OOMS per second`
		else OOMTEXT = `${format(getPointGen())} per second`
		
		let forgotten = ``; 
		let forgotten1 = ``; 

		{
		if (player["E"].activeCheck == "Forgotton") forgotten = `<h2 style="color: #170f1c; text-shadow: 0px 0px 10px #ffffff;"> You Have ${format(player.points)} Shade...? </h2><br>`; 
		else forgotten = `<h2 style="color: #ffaf47; text-shadow: 0px 0px 10px #de482a;"> You Have ${format(player.points)} Solarity </h2>`
		if (getClickableState("L",42) == true) forgotten = `<h2 style="color: #0f032b; text-shadow: 0px 0px 10px #ffffff;"> You Have ${format(player.points)} Dark Essence<br>`
		if (player.L.activeCheck == "TimeTillDark") forgotten = `<h2 style="color: #044c76"> ${format(player.points)} / 2.91e41 </h2> <h2 style="color: #61036b"> Dark Entropy </h2><br>`
		if (player.Sol.activeCheck == "Heliosphere" ) forgotten = `<i><h2 style="color:rgba(94, 65, 27, 0.61); text-shadow: 0px 0px 10px rgb(86, 0, 0);">-------------- ${format(player.Sol.HelioStat["Solarity"])}          </h2> </i>`
		}

		{
		if (player["E"].activeCheck == "Forgotton") forgotten1 = `<h5 style="color: #31005e; text-shadow: 0px 0px 10px #ffffff;"> Current Shade Production: ${OOMTEXT} Per second </h5><br>`; 
		else forgotten1 = `<h5> Current Solarity Generation: ${OOMTEXT} </h5>`
		if (getClickableState("L", 42)) forgotten1 = `<h5 style="color: #0f032b; text-shadow: 0px 0px 10px #ffffff;"> Current Dark Essence Generation: ${OOMTEXT} Per second </h5><br>`; 
		if (player.L.activeCheck == "TimeTillDark") forgotten1 = `<h4 style="color: #0f032b; text-shadow: 0px 0px 10px #ffffff;"> Solarity Generation is hidden... </h4><br>`; 
		}

		// ${shiftText(shiftList, player.Sol.activeCheck == "Heliosphere")}
		
		if (player.Sol.activeCheck == "Heliosphere") forgotten1 = `<br><span style="color:rgba(255, 166, 0, 0.14); text-shadow: 0px 0px 10px rgb(255, 166, 0);">
			the surface of the sun. <br>
			and the heat of the sun. <br>
			and the pressure of the sun. <br>
			and the shadow of the sun. <br>
			all at once,<br>
		 </span>`

		//5b0935


		//Solarity Generation:


		let FMTDtext = ``

		let FMTDnerf = ``

		if (player.L.TimeTillDark.sub(243).abs().gte(60)) FMTDnerf = `<h4 style="color: #9a1212";>Solarity gain cap reduced by /${format(player.L.TimeTillDark.sub(243).abs().div(60).floor().pow_base(100))} </h4> | `
		
		completion1 = Decimal.div(player.points.clampMin(1).log(10), new Decimal(2.91e41).log(10)).mul(50)
		completion2 = Decimal.div(player.C.CenterPoints.clampMin(1).log(10), new Decimal(40).log(10)).mul(50)

		completionFULL = completion1 + completion2
		
		if (player.L.activeCheck == "TimeTillDark") FMTDtext = `<br><h3 style="color: #9a1212"; class="glitch"; data-text="The clock is ticking...";>The clock is ticking...</h3> <br>
		 <h4 style="color:#5022f3"> You have ${format(player.L.TimeTillDark,1)} Seconds left to complete this check</h4> <br> 
		 ${FMTDnerf}
		 Progress to completion: ${format(completionFULL,2)}%
		 <br>`

		if (player.L.activeCheck == "TimeTillDark") nextText = ``
		if (player.L.activeCheck == "TimeTillDark") genText = ``
		//thing that returns ALL 
		
		let Noter = ``
		if (options.autosave) Noter = `Autosave is on.`

		return `
		
		${forgotten}${forgotten1}${FMTDtext} 

		${genText} 
		${capped}		
		${Noter}	`
	
	}, 
	
	function c() {
		let nextText;

		if (player.E.EclipseTier.eq(7)) {
			nextText = `Solock XX (20): Next unlock at <i> The Broken Core #3</i>`
			}
		else if (getBuyableAmount("Sol",13).gte(6)) { //unlocks MNG upgrades
			nextText = `Solock (19.5): Eclipse Tier 7 awaits you :)`
				} 
		else if (player.Sol.Heliosphere) { //unlocks MNG upgrades
			nextText = `Solock XIX (19): Next unlock at Exponentiate #6`
				} 
		else if (player.Sol.MNG.Total.gte(20)) { //unlocks MNG upgrades
			nextText = `Solock (18.5): ...Beat <i>The Heliosphere to continue...</i>`
				} 
		else if (player.Sol.Aperativity.gte(35) || player.Sol.CRNG.gt(0)) { //unlocks AP Upgrades
				nextText = `Solock XVII (18): Next Unlock at 20 total MNG bought`
			} 
		else if (player.E.EclipseTier.eq(6)) {
				nextText = `Solock XVI (17): Next unlock at 35 Aperativity`
				} 
		else if (hasUpgrade("L",23)) {
				nextText = `Solock (16.5): [Get ECT 6 to continue]`
				} 
		else if (getBuyableAmount("L",22).gte(2) && getBuyableAmount("L",22).gte(2)) {
			nextText = `Solock XV (16): Next Unlock at Anaphalagia (1x:x)`
			} 
		else if (getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5)) {
				nextText = `Solock XV (15): Next Unlock at D-Time II and N-Time II`
		} 
		else if (getBuyableAmount("E",12).gte(10) || player.L.lunarity == true) {
					
					nextText = `Solock XIV (14): Next Unlock at Ektrosy #9 and Basity I #5`
							
			} 
		else if (player.E.Chimera.gte(10)) {
					nextText = `Solock XIII: Next Unlock at Expansion I #10, and a Lunarity performed`
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
		else if (player["S"].points.gte(5) || getBuyableAmount("S",11).gte(1)){
				nextText = `Solock I: Next Unlock at Plasmate #5`
				
		} else {
				nextText = `Solock 0: Next Unlock at 5 Solar Rays`	
				
			}



			


			return nextText
	},

	function windowTitle() {

	if (player.agreedTOS) {

		if (player.Sol.SolarHeat.gt(1) || player.E.EclipseTier.gte(7)) {
			document.title = `TSEGI - ${format(player.Sol.SolarHeat)} Solar Heat`
		}
		else if (player.Sol.MNG.Total.gt(0)) {
			document.title = `TSEGI - ${player.Sol.MNG.Total} Total MNG's`
		}
		else if (player.Sol.Aperativity.gte(35) || (player.Sol.CRNG.gt(0) || Roll.Amount > 0)) {
			document.title = `TSEGI - ${format(player.Sol.Aperativity)} Aperativity`
			} 
		else if (player.L.activeCheck == "TimeTillDark") {
			//couldn't get this working :(
			tempGlitch = {
				1: `the time is ticking...`, 
				2: `ThE t1me !s t1cKinG`,
				3: `tH3 t!Me i$ T!C<!N&`,
				4: `TH3 tIM3 1S tIC>InG`,
			}
			
			//delay(250)
			
			document.title = `The clock is ticking...`


		} 
		else if (player.L.DarkCheck.gte(1) && player.L.LightCheck.gte(1)) {
			document.title = `TSEGI - DK #${player.L.DarkCheck} and LK #${player.L.LightCheck}`
		} 
		else if (player.L.lunarity) {
			document.title = `TSEGI - ${format(player.E.LunarPower)} LP`
		} 
		else if (player.E.EclipseTier.eq(3)) {
			 document.title = `TSEGI - ${format(player.E.SolarCharge)} Solar Charge`
		} 
		else if (player.E.EclipseTier.eq(2) && player.E.Eclipsium.gt(0)) {
			document.title = `TSEGI - ${format(player.E.Eclipsium)} Eclipsium`
		}
		else if (player.C.checkUpgrades.gte(3) || player.E.TopLVL.gte(1)) {
			document.title = `TSEGI - ${format(player.E.TopLVL)} Enlightenment (Best)`
		}
		else if (hasUpgrade("GL",15)) {
			document.title = `TSEGI - ${format(player["C"].CenterPoints)} CP`
		}
		else if (hasUpgrade("S",14) || player["GL"].Solar_Shards.gte(1) || player["GL"].Solar_Shards.gte(1)) {			 
			
			document.title = `TSEGI - ${format(player["GL"].Solar_Shards)} Solar Shards`

		} 
		else if (getBuyableAmount("S",11).gte(5)) {			
			document.title = `TSEGI - ${format(player.S.points)} SR`
		} 
		else if (player["S"].points.gte(5) || getBuyableAmount("S",11).gte(1)){
			document.title = `TSEGI - ${format(player.S.points)} SR`
			
		} else {
			document.title = `TSEGI - ${format(player.points)} Solarity`
			
		}

	} else document.title = `TSEGI - Introduction`
	
		
	},

	function gh() {
		if (true) return `<br>
To do list: <br>  
   - Debuffs (), Balance (), Add Bonuses (): TMS (⭕), TRM (✅), and TBE (✅) <br> 
   - Create softcaps and cost scalings for Solaritology upgrades<br>
   - Debuffs (), Balance (), Bonuses (): TBC1, TBC2, TBC3 <br><br>

   if (player.Sol[""].active) for debuffs <br>
		
		Finish making scalings for TMS<br>
		in display()
`
/*
   (0.7) Rebalance, and buff NMH-1 <br>	
   (0.7) Rebalance Check Upgrade 005 <br>
   (0.7) make activeCheck a global variable<br>
*/		
	},

	



]

// Determines when the game "ends"
function isEndgame() {
	return player.Sol.solarBurst
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

  





// I should add an anti-cheat system 
// where if the solar clock suddenly changes it gives them a warning
// 
// warn("sudden shift in timelapse detected, initiating anti-cheat protocol.")
// and then it forces a lunarity reset, and then temporarily reducing most gains by ^0.4 for 3 minutes
// 