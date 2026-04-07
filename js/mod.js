
let Display = `Solarity`

var nodePos = {
	tick: 0,	


	LunarisX: 0,	
	LunarisY: 0,

	SolarisX: 0,
	SolarisY: 0,

}

const tempGlitch = [
				`the time is ticking...`, 
				`ThE t1me !s t1cKinG`,
				 `tH3 t!Me i$ T!C<!N&`,
				 `TH3 tIM3 1S tIC>InG`,
		]

//if (getClickableState("E",14) == true ) Display = `<h3 style="color: #170f1c; text-shadow: 0px 0px 20px #cc0000;"> Shadows...? </h3`

const shiftList = [
	"surface",
	"heat",
	"pressure",
	"shadow"
]



var modInfo = {
	name: "The Solar Eclipse Guidance Incremental",
	id: "OINOINOIN", //after I'm done with this mod, change mod id for balance check

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
	num: "ersion 0.6.04 F23-B21",
	name: "studying the core.",
	
}

// IMPORTANT, THIS DETERMINES THE GAME COMPLETIONS, WHICH SAVES AFTER EVERY RESTART
const VRSN = "0.6"
var nonPlayerValues = {
continuePlaying: false

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

let changelog = ` <span class="ignThemes">
<h1>Changelog:</h1><br><br>
<h2>Start Date: 4/13/2024</h2> <br><br>
<h2>Release Date: 4/2/2026</h2> <br><br>

<span> <i>and yet, the sun rises, why must we no longer appreciate it for its volatility...</i><br></span>
<span> <i>will it ever be trusting enough to allow our gaze within? we will never know...</i></span><br><br>

<h3> Extra Fixes, and tiny tweaks due to feedback and bug reports</h3>
Fix 23:<br>
<b>4.02.2026 </b><br>
- Fixed Extra.js breaking the game when opening the thingy<br>
- Fixed Shardism from doing a reset every time it is obtained<br>
- Reworded Polarizes effect description just a bit<br>
- (Functional) Multiply and Plasmate that wasnt spending any resources without Automated Bonuses<br>
- (Vue 1) maybe fixed the vue issue??? (Spoiler: i somehow didnt)<br>
- (Stylic) Re-styled a couple buyables because they kept leaving 'the box'<br>
<b>4.03.2026</b><br>
- (Stylic) Hopefully made the User Interface more mobile-friendly <br>
- (Functional) Fixed Centrality not unlocking after Coronal was bought <br>
- (Stylic) Fixed tree branches not rendering due to a cutscene related issue <br>
- fixed Centrality's minor unlock text returning undefined<br>
<b> 4.04.2026 </b><br>
- Fixed Polarize being able to be bought before the initial requirements<br>
- fixed the (spends 10% of sr) psrt of plasmate<br>
<b> 4.06.2026 </b><br>
- Changed the text color of the start cutscene to a more brighter and easier to read <br>
- Made the boosts less obscure before it is bought <br>
- Fixed and reworked Multiply to actually spend solarity <br>
- Changed the color contrast to most upgrades for better readability <br>
- <b> reworded Solar Rays Reset by a bit </b><br>
- <b> reworded Solar light by a bit</b> <br>


<br>
Later, i will add notifiers but for now you might just have to keep switching layers as for time <br>


<br><br>
Bal 21: 
<br> - Plasmate now spends solarity 10% of its cost
<br> - Reduced the thank you bonus duration from 24 to 8 hours
<br> - Reduced the requirements of Polarizor from 105 to 85



<h3>v0.6 Fix 22, Balance 20</h3><br>
Solaris... fuck you lol. <br>
- Added ECT 7, and a bit of Quality Of Life... <br><br>
- Added Aperation, The Randomizor, and The Core.<br>
- Updated and changed Annular and Coronal's styling just slightly <br>

- Added unlockable themes, and new Themes as well: <b> Eclipse, Twilight, Heliosphere</b>, And <b> The Core </b><br>
- Added The wall of checks.  <br>
- Added the heliosphere, and its content <br>
- Adjusted the image ratio size of Twilight and the dimensions of the Loading screen by alot <br>
- Reworded a few things (Convertary reset, Centralization, Meta nerf) <br>
- Majorly Shortened and Compacted the Main visuals, like realm currencies. <br>

- Added and changed UI's of custom-made features<br>
- Moved some features into other tabs to save space and clutter <br>
- Center Tree Respec moved from The Effector to The Darkness Tree <br>
- added a few secrets into the game<br>
- also added a couple more stats info 
 <br><br>

TMT Remix update v0.0.2 : <br>
<h4> > I also slightly altered the Viewer component to be customizable to a default </h4><br>
<h5> >* and also added 'forceColumn' which forces the viewer to be displayed when necessary!
<h4> > Also made changelog easier to read just in case of people wanting to see how the game changed over the months </h4><br>
<h4> > Finally decided to fix Gravitations text overlap (It annoyed me enough >:( )</h4><br>
<h4> > You should also go check out the settings! I made it a bit more customizable ;) </h4><br>
<h4> > removed some deprecated functions from the game, as well as compacting some as well  </h4><br>
<h4> >     </h4><br><br>

<h3>Fixes for v0.6: </h3> <br>
Fix 13: Layers no longer randomly switch places when reloading screens <br>
Fix 14: Finally fixed post solarity cap statistics being incorrect<br>
Fix 15: Fixed Center Points incorrect cost scale FOR THE 4TH TIME<br>
Fix 16: Fixed Solar light generation and Solar Charge generation (for REAL this time), i finally understood what diff is and how it functions xd<br>
Fix 17: Fixed Expansion I buyable so that it shows itself when having at least 1 level of it.<br>
Fix 18: Fixed Duality not following Dark requirements<br>
Fix 19: Fixed Jear 1 being able to be purchased during specific conditions via "Jear 2 + Jear 3" <br>
Fix 20: Fixed Dark and Light Generation info being incorrect<br>
Fix 21: Fixed Polarize upgrade showing its base effect before purchase and changing effects after its purchased<br>
Fix 21.1: Removed deprecated implementated values ie player.C.checkUpgrades (just for performance related)
Fix 22: <br> Capitalized Effector Tiers 2 and 3 for the uhh... thingy
 

<h3> Balances for v0.6 </h3><br>
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
Bal 19: Added a debuff to ECT6<br>
Bal 20: Changed how Coronal's effect works. via, the speed of which it increases it's dividing factor is about the same as it is increasing<br>
Bal 21: added a harshcap to Heirarchy starting at 1e150 (root self-scales by its own effect)<br>
Bal 22: Multiply and some other buyables now need at least 1 of its amount for its effect to be applied <br>
<br><br>

<h3>v0.5, Fix 12, Balance 10</h3><br>
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

TMT Remix notice: v0.0.1 <br>
<h4>
> At this point, I changed mostly everything from TMT, welcome to TMT:R, or TMT Remixed/Reimagined <br>
> Added The Viewer component <br>
> added The Reset component, a better version of the classic reset button from tmt <br>
> edited how the 'cursor' reacts with the components and buttons wether or not the can be clicked based on their functionality <br>
> edited some canvas.js things, including changing how the game renders branches and adding an eclipse as a bg <br>
> fixed how themes work to make it much more easier to add custom themes, AND added a new feature to it via 'unlocked' <br>
> added a custom endgame animation and made a customizable loading screen via png <br>
</h4>

</h4>
<h3>Balances for v0.5: </h3><br>
Bal6: Reduced PK44's Plasmate Queue Requirements slightly (75 -> 74) [It was too long] <br>
Bal7: Added a softcap gain to Esolar and added a roofcap to it (starts at 10,000)<br>
Bal8: added 2 softcaps for Chimera's effect boost <br>
Bal9: added a boost cap to Eclipsium [at 50 Eclipsium]<br>
Bal10: Lowered Queue Upgrades goal requirements from 60000 to 30000 (Eclarity) <br>

<h3>Fixes for v0.5: </h3><br>
Fix9: Fixed Center Points bulk purchase not working properly (it was adding instead of setting the value) <br>
<br><br>
v0.5 - v0.5.4
Fix10: Fixed Solar light generation incorrectly displaying its generation value<br>
Fix11: Fixed Solar charge display incorrectly displaying its generation amount<br>
Fix12: Fixed Solar Light generation displaying its unnerfed generation incorrectly.. (IT was displaying as if there was no Solarity gain cap) <br>

<br><br>

<h3>v0.4 Fix 8, Balance 5</h3><br>
<h4>Lol i just Eclips'd ur mom</h4><br>
- there is now a Solarity Gain Cap of e308! [aka Infinity]<br>
- Added Enlightenment <br>
- Added Eclipse Tiers 1 through 4 <br>
- Milestone Feature?????? <br><br>
Fix3: Fixed Annular being able to be purchased before its cost<br>
Fix4: You Know, I forgot to fix Coronal too, since they were showing way before Annular was bought<br>
Fix5: Fixed how Effector Tiers spent Center Points (It incremented by 1, THEN subtracted)<br>
Fix6: Fixed incorrect row placements and adjusted them to look better<br>
Fix7: Updated Color theory on all upgrades, they should be easier to read now :)<br>
Fix8: Changed first tab in Solarizor reset layer date on where the solar eclipse actually happened (i was off by a month)<br>
Bal5: Plasmate has a new Conditional Scaling. where if its below 5 amount, it reduces the cost by 10% until you get to Layer 1. (this is to balance out Layer 0 stage, or Early game)<br>
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
modInfo.changelog = changelog;
// let winText = `0`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything", "rollAP", "Self_Reset"]

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
	let TMSun = player.Sol.TMSun.x
    let TRMoon = player.Sol.TRMoon.x
    let TBSun = player.Sol.TBSun.x
    let TBCore = player.Sol.TBCore.x

    let TMSunP = player.Sol.TMSun.pending
    let TRMoonP = player.Sol.TRMoon.pending
    let TBSunP = player.Sol.TBSun.pending
    let TBCoreP = player.Sol.TBCore.pending
	let BC2_INFL = false 
	let gain = new Decimal(1)

	//timer: 1 day of 5x solarity bonus for 2 weeks, 1.5x Solar Rays

	if (player.Sol["TBCore"].active && getCoreDifficulty().eq(2)) BC2_INFL = true

	

	/*  */
	// PAST THIS POINT IS SOLARIZER EFFECTS

	let deAmp = player.Sol.activeCheck == "Heliosphere" ? 0.7 : 1
	
	gain = gain.plus(buyableEffect("S",11)).clampMin(0)
	gain = gain.mul(buyableEffect("S",12)).clampMin(1)

	

	if (hasUpgrade("S",13)) gain = gain.mul(upgradeEffect("S",13).pow(deAmp)).max(1) //
	if (hasUpgrade("GL",13)) gain = gain.mul(upgradeEffect("GL",13).pow(deAmp)).max(1) 
	
	
	
	let sPoints = player.S.points

	let MAX = (hasMilestone("E", 2) && player.L.activeCheck == "") ? 3 : 2

	if (player.Sol["TBCore"].active && getCoreDifficulty().eq(3)) MAX = 0.85;
	else if (player.Sol["TBCore"].active && getCoreDifficulty().eq(2)) MAX = 1;
	else if (player.Sol["TBCore"].active && getCoreDifficulty().eq(1)) MAX = 1.5;

	let RootEFF1 = new Decimal(40)
	let RootEFF2 = new Decimal(35)
  	let SolarRay1 = sPoints.root(RootEFF1.sub(upgradeEffect("S",12).pow(deAmp)))
  	let SolarRay2 = sPoints.root(RootEFF2.sub(upgradeEffect("S",12).pow(deAmp)))	
    if (SolarRay1.gt(2)) SolarRay1 = softcap(SolarRay1, new Decimal(2), 0.3)

	if (!player.Sol.solarBurst == false || player.Sol.testBurst == false) {
		if (!player.Sol["TBSun"].active || !(player.Sol.TBCore.active && getCoreDifficulty().gte(3))) gain = gain.pow(SolarRay1.clampMax(MAX)).clampMin(1)   
		if (!player.Sol["TBSun"].active || !(player.Sol.TBCore.active && getCoreDifficulty().gte(3))) gain = gain.mul(SolarRay2).clampMin(1)
		}


 		let basePower = 1.5
        if (hasUpgrade("S",12)) basePower = 1.7
        if (hasUpgrade("S",12) && player.E.EclipseTier.gte(2)) basePower = 1.9

    else if (player.Sol.solarBurst || player.Sol.testBurst) gain = gain.pow(basePower)

	// ----------- Solar Light effects ---------	

	
	//player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))
	if (hasUpgrade("GL",21)) gain = gain.pow(upgradeEffect("GL",21).pow(deAmp))
	
	//Check Upgrade 1 and Check Upgrade 2 Debuffs
	
	
	
	// ------------ CENTRALITY EFFECTS -----------
	if (hasUpgrade("C",13)) gain = gain.times(DarknessUpgs_Row1[2] ** deAmp)
	if (hasUpgrade("C",11)) gain = gain.times(DarknessUpgs_Row1[0] ** deAmp)
	if (player.C.activeCheck == "Formality" || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) ) gain = gain.pow(0.666)
	if (player["C"].activeCheck == "Twilight" || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) ) gain = gain.log(12)
	
	gain = gain.mul(GetHeirarchyBonus()) 
	
	
	if (hasUpgrade("C",22)) gain = gain.pow(1.15);

     
	//let  = player.Sol["TBCore"].x 
	 let TBC1Bonus = decimalOne
	
        if (player.Sol["TBCore"].x.gte(1)) {
           
        TBC1Bonus = decimalOne.plus((TBCore.mul(0.25)).mul(new Decimal(1.5).pow_base(TBCore)));
		
        
	}

	 let EffectorTier1_Boost = player.S.points.log(2).clampMin(1).pow(TBC1Bonus) // Base effect
	 let EffectorTier3_Boost = player.S.points.log(9).clampMin(1).pow(TBC1Bonus)
	 
	 let GuidanceBoost = decimalOne
        if (hasUpgrade("dL",11) && player.Sol.TBCore.active){ GuidanceBoost = player.C.CenterPoints.clampMin(1).log(3);
        EffectorTier1_Boost = EffectorTier1_Boost.mul(GuidanceBoost.pow_base(20))
		EffectorTier3_Boost = EffectorTier3_Boost.mul(GuidanceBoost.pow_base(20))
		
      }

	if (getBuyableAmount("GL", 11).gte(1) && hasUpgrade("dL",11) && player.Sol.TBCore.active) gain = gain.mul(buyableEffect("GL", 11).clampMin(1))

	if (player.C.EffectorTier.gte(1)) gain = Decimal.mul(gain, EffectorTier1_Boost)
	if (player.C.EffectorTier.gte(3) && hasUpgrade("dL",11) && player.Sol.TBCore.active) gain = Decimal.mul(gain,EffectorTier3_Boost)	



	if (player["C"].activeCheck == "Twilight" && hasMilestone("E",2) && player.L.activeCheck == ""  || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))) gain = gain.pow(1.15)
	
	if (player["C"].hasFormality) {
		if (!(player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) gain = gain.pow(1.25)
	}// The Forgotton... Check upgrade



		
			let JearBonus = Math.round(10000*(Core_effValue*0.01))/10000 
			let addedBonus = player.points.clampMin(1).log(20).mul(JearBonus)
			let CE_SY__Translation = addedBonus.pow_base(20)	

			let result = new Decimal(1)
			if (player.Adaptive && player.Sol.TBCore.active && hasUpgrade("C",22)) {
			for (id in player.S.upgrades)  { if (id != 21 && getCoreDifficulty().gte(3)) result = result.mul(CE_SY__Translation) }
			for (id in player.GL.upgrades) { if (id != 14 && getCoreDifficulty().gte(3)) result = result.mul(CE_SY__Translation) }
			for (id in player.C.upgrades) { result = result.mul(CE_SY__Translation) } 
			gain = gain.mul(result)
		}

	// --------- ENLIGHTENMENT EFFECTS ---------
	if (player["E"].activeCheck == "Forgotton") gain = gain.root(7)
		
			let LP = player.Sol.activeCheck == "Heliosphere" ? player.Sol.HelioStat["Lunar_Abnorm"] : player.L.LunarPower
		
			let BLEEDINGSUN_POWER = 1
			let c1DEBUFF = new Decimal(1)
			
			//
			if (BC2_INFL) BLEEDINGSUN_POWER = 7
			else if (player.Sol["TBSun"].active) {
				BLEEDINGSUN_POWER = TBSun.plus(TBSunP).mul(2).plus(1)
											// [1 + (log7.5(LP))^log4(LP))] ^ TBE_Debuff
				c1DEBUFF = decimalOne.plus(LP.log(7.5)).pow(player.L.LunarPower.log(4)).clampMin(1).pow(BLEEDINGSUN_POWER)	
			}	                                                                    //  [1 + ( log7.5(LP-100)^log4(LP-100) )] ^ [0.9^TBE_Bonus]



			if (LP.gt(player.L.InstibilityStart) && !player.Sol["TBSun"].active) gain = gain.div( (decimalOne.plus(player.L.LunarPower.sub(player.L.InstibilityStart).log(7.5)).pow(player.L.LunarPower.sub(player.L.InstibilityStart).log(4)).clampMin(1)).pow(new Decimal(0.9).pow(player.Sol["TBSun"].x))     )	
			else if (player.Sol["TBSun"].active || BC2_INFL) gain = gain.div(c1DEBUFF)		



	if (hasMilestone("E",1)) gain = gain.mul(player.E.EclipseTier.pow_base(9))
	gain = gain.mul(upgradeEffect("E",12).pow(deAmp))
	//if (hasUpgrade("E",11)) gain = upgradeEffect("E",11)
	
	if (player.L.DarkCheck.gte(1) && player.L.Dark.gte(1)) gain = player.Sol.activeCheck == "Heliosphere" ? gain.mul(player.Sol.HelioStat["Dark"].pow(0.3)).clampMin(1)  : gain.mul(player.L.Dark.pow(0.3)).clampMin(1) 
	

	//--------- LUNARIS EFFECTS -------------
	let TBC3Improve = 1
        if (player.Sol.TBCore.x.gte(3)) TBC3Improve = 1.25
	if (Hour.getHours() <= 12 && getBuyableAmount("L",21).gte(1)) gain = gain.mul((1.15 ** Hour.getMinutes()) ** TBC3Improve)
	
	//--------- SOLARIS' EFFECTS -------------
	if (TSolStones(1).unlocked) gain = gain.mul(TSolStones(1).effect); 
	if (getClickableState("L",41) && hasUpgrade("Sol",13)) gain = gain.pow(1.05)


	// --------- PESTILLESSENCE EFFECTS ----------



	//--------------- Solarity generation nerf (after all bonuses) ----------------
	if (getClickableState("GL", 11) == true) gain = gain.pow(0.5)
	if (player.L.activeCheck == "TimeTillDark") gain = gain.pow(0.6)
	if (getClickableState("L",42)) gain = gain.root(3)

	
		


	// Down here is non-solarity bonuses	

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
	
		//TMS bonus goes here
	let TMSunBonus = 3	

	let EclipsiumComp = 1.45

	let moved = new Decimal(100000)
	if (Check("L",11).has) moved = new Decimal(1e10)	
	  
    if (TMSun.gte(3)) moved = moved.mul(TMSun.sub(2).pow_base(4.6415e16))
 
    if (TMSun.gte(3)) EclipsiumComp = new Decimal(1.45).plus(TMSun.sub(2).mul(0.02))	



	if (hasMilestone("E",2)) basegainCap = basegainCap.mul(player.E.Eclipsium.pow_base(EclipsiumComp).clampMax(moved))


	basegainCap = basegainCap.mul(getBuyableAmount("E", 11).mul(0.5).add(1))
	basegainCap = basegainCap.mul(buyableEffect("E",12))

	if (getBuyableAmount("L",12).gte(1)) basegainCap = basegainCap.mul(buyableEffect("S",12).pow(getBuyableAmount("L",12).add(1).log(10).div(15)))
	if (getBuyableAmount("L",11).gte(1)) basegainCap = basegainCap.mul(buyableEffect("S",11).pow(getBuyableAmount("L",11).add(1).log(10).div(5)).clampMin(1))


	if (hasMilestone("E",3)) basegainCap = basegainCap.mul(player.E.SolarCharge.log(2).add(1).pow(B)).clampMin(1)
	

	//Heirarchy
	
	if (hasMilestone("E",5) && player.L.activeCheck == "") basegainCap = basegainCap.mul(GetHeirarchyBonus().pow(0.33))
	
	////////

	let c1effect = decimalOne.plus(player.L.LunarPower.clampMin(1).log(5)).pow(player.L.LunarPower.log(2)).clampMin(1)
	basegainCap = basegainCap.mul(c1effect)
	if (player.L.Light.gt(1)) basegainCap = basegainCap.mul(player.L.Light.clampMin(1))
	if (player.L.Dark.gt(1)) basegainCap = basegainCap.mul(player.L.Dark.clampMin(1))
		
		//LUNARIS DAY TIME EFFECTS
	if (Hour.getHours() <= 12 && getBuyableAmount("L",21).gte(1)) basegainCap = basegainCap.mul((1.15 ** Hour.getMinutes()) ** TBC3Improve)
	
	if (BSolStones(2).unlocked) basegainCap = basegainCap.mul(BSolStones(2).effect); 
	//	
	if (getClickableState("L",41) && hasUpgrade("Sol",13)) basegainCap = basegainCap.pow(1.15)	


	// HELIOSPHERE CHECK
	if (Check("Sol",11).has) basegainCap = basegainCap.pow(1.2769) //don't ask why it's that specific 

	// TBC2

	if (player.Sol.TBCore.x.gte(2) && hasUpgrade("C",11)) basegainCap = basegainCap.mul(DarknessUpgs_Row1[0])


	//Time till dark
	if (player.L.activeCheck == "TimeTillDark"){ 
		basegainCap = basegainCap.pow(0.6)
		basegainCap = basegainCap.div(player.L.TimeTillDark.sub(243).abs().div(60).floor().pow_base(100))
	}

	

	if (BSolStones(2).unlocked) basegainCap = basegainCap.mul(BSolStones(2).effect.clampMin(1))


	if (player.Sol.SolarHeat.gt(1)) basegainCap = basegainCap.mul(player.Sol.SolarHeat.pow(3.75).clampMin(1))	

	let currentActive = TMSun.plus(TMSunP)
	let TMSun_MELT_MYSELF = new Decimal(5).pow(currentActive.div(15)).plus(currentActive.sub(2))
	
	if (player.Sol["TMSun"].active) basegainCap = basegainCap.root(TMSun_MELT_MYSELF)
	
	
	// SOLAR BURSTING CAP INCREASE
		let BurstBonus = new Decimal("1e200")
	// remember the formula for extra bursts is 
	// e(100 * 1.146^(SB-1)^2)	

	if (player.Sol.solarBurst || player.Sol.testBurst) basegainCap = basegainCap.mul(BurstBonus)
 	
	
    capBeforeLightAdaptive = basegainCap
	if (getActiveRealmType() == "Light" && hasUpgrade("C",22) && player.Adaptive) basegainCap = basegainCap.pow(1.08)





		
	//this is in getPointGen() btw
	player.SolarityCap = basegainCap
	player.postCap = gain.div(player.BasepointsCap)
	player.beforeCap = gain

	if (player.L.activeCheck == "TimeTillDark" && player.L.TimeTillDark.lte(0)) {
		player.L.activeCheck == ""

		//"Respawn/revive" sets player.L.TimeTillDark to 1
		player.L.TimeTillDark = new Decimal(0)
		gain = gain.mul(0).add(1)
	}
	//change later
	if (player.Sol.activeCheck == "Heliosphere") basegainCap = basegainCap.pow(player.Sol.HelioStat["Reduction"].mul(2))
	
	
	

	if ( player.timerOfBonus != 0 ) gain = gain.mul(5)	
	let SpecialCap = new Decimal(1e800)
	if (player.Sol.solarBurst || player.Sol.testBurst) SpecialCap = new Decimal("e9999999999999999999999999999")
		
	
		
	basegainCap = basegainCap.clampMax(SpecialCap) //might remove if Sgain doesnt breach e800 before bursting


	return gain.clampMax(basegainCap)

	// after 1st pestillessence, Lunar Inst. will divide after the cap so the debuff stays relevant
	// 
}


function addedPlayerData() { return {

	deaths: 0,

	//solarity cap things
	BasepointsCap: new Decimal(1e308),
	SolarityCap: new Decimal(1),
	postCap: new Decimal(1),
	beforeCap: new Decimal(1),

	//this is useless until TBC2 
	Adaptive: false,
	AdaptiveType: "",
	
	//this is basically until any 5th Studies
	resetTime: new Decimal(0),
     

			// 
	rot: 0,
	tick: 0,
	frames: 0,

	showScreen: true,

	finishedStCutscene: false,
	inCutscene: false,
	cutsceneName: "",

	// random movement tickers for 
	RMT: 0,
	
	borders: {
		SR: AllBorders,
		SL: AllBorders,
		CEN: AllBorders,
		E: AllBorders,
		L: AllBorders,
		Sol: AllBorders,

	},


	//DO NOT CHANGE THIS
	agreedTOS: false,
	timerToAgree: 12,

	finalTime: 0,
	startedGame: false,
	gameEnd: false,

	//technical
	debugMode: false,

	//secrets
	secrets: {
	 really: false,
	 why: false,
	},

	eventActive: false,
	timerOfBonus: 28800, //8 hours

	thingy: 0,

	youMust: 0

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
		if (getClickableState("GL",11) && !(player.Sol["TBCore"].active) && options.SolarityInfo) genText = `<h5>
		<br>Solarity Generation has been reduced (OG generation was ${format(getPointGen().pow(2).clampMax(player.SolarityCap))}) </h5>
		Generating ${format(speed)} Golden Light per second
		<br>`
		let capped = ``
	    let pushThrough = ``

		let fogger = `Solarity`
		if (player["E"].activeCheck == "Forgotton") fogger = `Shade...?`
	
		let SD104_Eff = getSRCap().gt(1e15) && getClickableState("L",42)  ? `<span style="color: #0f032b;">The Current Solar ray cap is ${format(getSRCap())} </span><br>` : ``

		//Hardcaps and other things
			// Solarity Hardcap

			let multAfterCap = player.beforeCap.div(player.SolarityCap)
			let powerFormula = (player.beforeCap.div(player.SolarityCap).log(10)) .div(player.SolarityCap.log(10)).plus(1)

			if (getPointGen().gte(player.SolarityCap) && powerFormula.lte(2) && options.SolarityInfo) pushThrough = `<br>
			<h5>If your ${fogger} gain was not capped, you would gain x${format(multAfterCap)} more than what you would have. which is ${format(player.beforeCap)} </h5> `
			
			else if (powerFormula.gte(2) && player.SolarityCap.gte(1e308) && options.SolarityInfo) pushThrough = `<br>
			<h5>If your ${fogger} gain was not capped, your gain would be raised to the ${format(powerFormula,3)}th. which is ${format(player.beforeCap)} </h5>
			`
			else pushThrough = ``

			if (player.SolarityCap.neq(1e308) && options.SolarityInfo) capped = `
			<br>
			The Current ${fogger} Gain Cap is ${format(player.SolarityCap)}<br> 
			${SD104_Eff}

			 ${pushThrough} <br>
			 `
			else capped = ``

			if (player.Sol.activeCheck == "Heliosphere") capped = `
			<span style="color:rgba(229, 0, 0, 0.4); text-shadow: 0px 0px 10px rgb(80, 70, 58);"> thE onLy lImiT iS tHe sUrFace oF tHe sUn</span>`
			if (player.Sol["TBCore"].active) capped = `The Core can withstand up to <span style="color: rgba(255, ${vib}, ${vib}, 1); text-shadow: 0px 0px 10px rgba(210, ${vib+10}, ${vib+10}, 1)"> ${format(player.SolarityCap.log(20))} </span> Core Energy`
			//
		let OOMTEXT = ``
		if (tmp.other.oompsMag != 0) OOMTEXT = `+${format(tmp.other.oomps)} OOMS per second`
		else OOMTEXT = `${format(getPointGen())} `
		
		let forgotten = ``; 
		let forgotten1 = ``; 

		{
		if (player["E"].activeCheck == "Forgotton") forgotten = `<h2 style="color: #170f1c; text-shadow: 0px 0px 10px #ffffff;"> You have ${format(player.points)} Shade...? </h2><br>`; 
		else forgotten = `<h2 style="color: #ffaf47; text-shadow: 0px 0px 10px #de482a;"> You have ${format(player.points)} Solarity </h2>`
		if (getClickableState("L",42) == true) forgotten = `<h2 style="color: #0f032b; text-shadow: 0px 0px 10px #ffffff;"> You have ${format(player.points)} Dark Essence<br>`
		if (player.L.activeCheck == "TimeTillDark") forgotten = `<h2 style="color: #044c76"> ${format(player.points)} / 2.91e41 </h2> <h2 style="color: #61036b"> Dark Entropy </h2><br>`
		if (player.Sol.activeCheck == "Heliosphere" ) forgotten = `<i><h2 style="color:rgba(94, 65, 27, 0.61); text-shadow: 0px 0px 10px rgb(86, 0, 0);">-------------- ${format(player.Sol.HelioStat["Solarity"])}          </h2> </i>`
		if (player.Sol["TBCore"].active) forgotten = `<h2 style="color: rgba(255, ${vib}, ${vib}, 1); text-shadow: 0px 0px 10px rgba(210, ${vib+10}, ${vib+10}, 1)"> ${format(player.points.log(20), getCoreDifficulty().plus(0) )} Core Energy </h2> <br>`
			
	}

		{
		if (!player.startedGame) forgotten1 = `<br><span> Waiting to start... </span>`
		else if (player["E"].activeCheck == "Forgotton") forgotten1 = `<h5 style="color: #31005e; text-shadow: 0px 0px 10px #ffffff;"> Current Shade Production: ${OOMTEXT} Per second </h5><br>`; 
		else if (getClickableState("L", 42)) forgotten1 = `<h5 style="color: #0f032b; text-shadow: 0px 0px 10px #ffffff;"> Current Dark Essence Generation: ${OOMTEXT} Per second </h5><br>`; 
		else if (player.L.activeCheck == "TimeTillDark") forgotten1 = `<h4 style="color: #0f032b; text-shadow: 0px 0px 10px #ffffff;"> Solarity Generation is hidden... </h4><br>`; 
		else if (player.Sol["TBCore"].active) forgotten1 = `<h4 style="color: rgba(${110-(vib*-1)}, ${(vib+10)/1.5}, ${(vib/3)+5}, 1); text-shadow: 0px 0px 10px rgba(210, ${vib+10}, ${vib+10}, 1)"> watch how the core will collapse... </h4> <br>`
		else forgotten1 = options.SolarityInfo /* add the thing that removes cap */? `<h5> Current Solarity Generation: ${OOMTEXT} </h5>` : `<h5> Current Solarity Generation: ${OOMTEXT} ${ player.SolarityCap.neq(player.BasepointsCap) ? "/ " + format(player.SolarityCap) : ""}</h5>`
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
		//options.SolarityInfo

		let TBSunPassive =``;
		let TMSunPassive=``;
		let TRMoonPassive=``;
		if (player.Sol.TBSun.x.gte(5) && options.SolarityInfo) TBSunPassive = `|  TBS 5: Multiply comp. effect increased 1.1 -> <span style="color: rgb(145, 123, 73)"> ${format(new Decimal(1.2).plus(player.resetTime.div(60).mul(0.01)),3)} </span><br>`
	    if (player.Sol.TMSun.x.gte(5) && options.SolarityInfo) TMSunPassive = `|  TMS 5: Plasmate effect raised to <span style="color: rgb(145, 123, 73)">${format(new Decimal(1.1).plus(player.resetTime.div(60).mul(0.01)),3)}</span>  <br>`
	    if (player.Sol.TRMoon.x.gte(5) && options.SolarityInfo) TRMoonPassive = `|  TRM 5: Meta nerf starts <span style="color: rgb(145, 123, 73)">+${format(new Decimal(50).plus(player.resetTime.div(60).mul(2),2) )} later</span> <br>`
		
		let passives = `<h6>${TBSunPassive}${TMSunPassive}${TRMoonPassive}</h6>`

		
		let TimeSpentOn = `<h5 >You have  <p style="color: #ecad26ff";>${format(player.resetTime.div(60))}</p> Solar Time </h5>
		${passives}
		
		`

	//let timerOfBonus_Text = `<h5> Thanks for waiting!<br>You have ${formatTime(player.timerOfBonus)} </h5>`

		// return everything

		let SpecialCapped = ``
		if ((player.points.gte("1e800") || player.PeakReached) && !player.Sol.solarBurst) SpecialCapped = `<h5 style="color: rgb(124, 0, 0)";>Extra solarity has become evanescent... <h5><br> Maybe... the sun is its problem... perhaps its too... frangible...`

		return `
		
		${forgotten}${(player.Sol.TBSun.x.gte(5) || player.Sol.TMSun.x.gte(5) || player.Sol.TRMoon.x.gte(5)) && options.SolarityInfo ? TimeSpentOn : ""}${forgotten1}
		${SpecialCapped}
		${FMTDtext} 
		${genText} 
		${ player.startedGame ? capped : ""}		
		${Noter}	
		
		`
	
	}, 
	
	function event() {
		
		if (player.timerOfBonus <= 0 || (player.timerOfBonus > 0 && player.timerOfBonus < 0)) player.timerOfBonus = 0
	    if (player.timerOfBonus != 0 && player.startedGame) return `<br>Thanks for waiting! <br> as a reward, you get 86400 seconds of the following: 
		<br> 5x Solarity, 1.5x SR
		<br><h5>Time left until this runs out: ${format(player.timerOfBonus,1)}  </h5><br>`	
		
	},	

	function c() {
		let nextText;

		if (player.Sol.TBCore.x.eq(3) || player.Sol.solarBurst) {
			nextText = `Solock XXI: Next unlock at Checktice [coming soon!]`
		}
		else if (player.E.EclipseTier.eq(7)) {
			nextText = `Solock XX (20): Final unlock at <i> The Broken Core #3</i>`
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
		else if (hasUpgrade("S",31) || player["GL"].Solar_Shards.gte(1) || player["GL"].Solar_Shards.gte(1)) {			 
				
				
				nextText = `Solock III: Next Unlock at Coronal Upgrade` //unlock 4
			} 
		else if (getBuyableAmount("S",11).gte(5)) {			
				nextText = `Solock II: Next Unlock at Solarizor Upgrade `
			} 
		else if (player["S"].points.gte(5) || getBuyableAmount("S",11).gte(1)){
				nextText = `Solock I: Next Unlock at Plasmate #5`
				
		} else if (player.startedGame) {
				nextText = `Solock 0: Next Unlock at 5 Solar Rays`	
				
		} else {
			nextText = `<br><h1 class="startGame">Loading Introduction Cutscene...</h1>`
		}



			


			return nextText
	},

	function windowTitle() {
		let TMSun = player.Sol.TMSun.x
 		let TRMoon = player.Sol.TRMoon.x
        let TBSun = player.Sol.TBSun.x
        let TBCore = player.Sol.TBCore.x
		let totalCompletedWoC = TMSun.plus(TRMoon).plus(TBSun).plus(TBCore)
	if (player.agreedTOS) {
		if (TBCore.gte(1)) {
			document.title = `TSEGI - Solaritology: The Broken Core ${TBCore}`
		}
		else if (totalCompletedWoC.gte(1)) {
			document.title = `TSEGI - Solaritology: ${totalCompletedWoC} Studies completed`
		}
		else if (player.Sol.SolarHeat.gt(1) || player.E.EclipseTier.gte(7)) {
			document.title = `TSEGI - The Heliosphere: ${format(player.Sol.SolarHeat)} Solar Heat`
		}
		else if (player.Sol.MNG.Total.gt(0)) {
			document.title = `TSEGI - The Randomizor: ${player.Sol.MNG.Total} Total MNG's`
		}
		else if (player.Sol.Aperativity.gte(35) || (player.Sol.CRNG.gt(0) || Roll.Amount > 0)) {
			document.title = `TSEGI - Solaris: ${format(player.Sol.Aperativity)} Aperativity`
			} 
		else if (player.L.activeCheck == "TimeTillDark") {
			//couldn't get this working :(
			
			// was supposed to scroll though these randomly
			//delay(250)
			
			//tempGlitch[]

			document.title = `The clock is ticking...`


		} 
		else if (player.L.DarkCheck.gte(1) && player.L.LightCheck.gte(1)) {
			document.title = `TSEGI - Lunaris: DK #${player.L.DarkCheck}, LK #${player.L.LightCheck}`
		} 
		else if (player.L.lunarity) {
			document.title = `TSEGI - Lunaris: ${format(player.E.LunarPower)} LP`
		} 
		else if (player.E.EclipseTier.eq(3)) {
			 document.title = `TSEGI - The Solar Factory: ${format(player.E.SolarCharge)} Solar Charge`
		} 
		else if (player.E.EclipseTier.eq(2) && player.E.Eclipsium.gt(0)) {
			document.title = `TSEGI - The Solar Factory: ${format(player.E.Eclipsium)} Eclipsium`
		}
		else if (player.C.checkUpgrades.gte(3) || player.E.TopLVL.gte(1)) {
			document.title = `TSEGI - Enlightenment: ${format(player.E.TopLVL)} ENL (Best)`
		}
		else if (hasUpgrade("GL",15)) {
			document.title = `TSEGI - Centrality: ${format(player["C"].CenterPoints)} CP`
		}
		else if (hasUpgrade("S",14) || player["GL"].Solar_Shards.gte(1) || player["GL"].Solar_Shards.gte(1)) {			 
			
			document.title = `TSEGI - The Converter: ${format(player["GL"].Solar_Shards)} Solar Shards`

		} 
		else if (getBuyableAmount("S",11).gte(5)) {			
			document.title = `TSEGI - The Sun: ${format(player.S.points)} SR`
		} 
		else if (player["S"].points.gte(5) || getBuyableAmount("S",11).gte(1)){
			document.title = `TSEGI - The Sun: ${format(player.S.points)} SR`
			
		} else {
			document.title = `TSEGI - The Sun: ${format(player.points)} Solarity`
			
		}

	} else document.title = `TSEGI - Introduction`
	
		
	},



/*
	function gh() {
		if (true) return `<h6><br>
self reminder: make 'run it back' actually work and endgame buttons<br>
also: add Tabs to Viewers for v0.7<br>
also also: publish the official TSEGI guide
</h6>
`

   (0.7) Rebalance, and buff NMH-1 <br>	
   (0.7) Rebalance Check Upgrade 005 <br>
   (0.7) make activeCheck a global variable<br>
	
	},
*/	
	
	function debug() {

		return options.debugMode ? nodePos : ``
	}


]


function isEndgame() { return false
};



// Less important things beyond this point!


var backgroundStyle = {}; function maxTickLength() {return(60)}; function fixOldSave(oldVersion){}

  
//to get back stuff
/*
player.Sol.TRMoon.x = new Decimal(2)
player.Sol.TBSun.x = new Decimal(2)
player.Sol.TMSun.x = new Decimal(2)
player.Sol.TBCore.x = new Decimal(1)
setBuyableAmount("Sol",11,new Decimal(25))
setBuyableAmount("Sol",12,new Decimal(25))
setBuyableAmount("Sol",13,new Decimal(16))
setBuyableAmount("Sol",14,new Decimal(10))
player.Sol.BRNG = new Decimal(8650)
player.Sol.TRNG = new Decimal(30000)
player["Sol"].Heliosphere = true
player.timePlayed = 1780488
*/



// I should add an anti-cheat system 
// where if the solar clock suddenly changes it gives them a warning
// 
// warn("sudden shift in timelapse detected, initiating anti-cheat protocol.")
// and then it forces a lunarity reset, and then temporarily reducing most gains by ^0.4 for 3 minutes
// 



