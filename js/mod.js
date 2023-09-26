let modInfo = {
	name: "The Meta Upgrades Incremental",
	id: "TMUI",
	author: "ThatOneKobold",
	pointsName: "points",
	modFiles: ["layers.js/repression.js", "layers.js/upgrades.js", "layers.js/shifting.js", "tree.js","layers.js/ranks.js","credits.js"],

	discordName: "Join the kobold pack!",
	discordLink: "discord.gg/tJDWU7twvB",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: `v0.5.2 - NOWW its not broken ;3`,
	name: "Repression?",
}

let changelog = `<h1>changelog thing</h1><br>
	<h3>(v0.1)  [UPDATE 1]</h3><br><br>
		- Added a few upgrades<br>
		- Added stuff.<br><br>

		<h3>v0.1.1  [BUG FIX 1]</h3><br><br>
		- Fixed early game multiplier in point gen<br><br>

		<h3>v0.1.3  [REBALANCE 1]</h3><br><br>
		- Made upgrades apear sooner, idk about the second repUPG2 though.<br><br>
		
		<h3>(v0.2)  [UPDATE 2]</h3><br>
		- added some shifting upgrades
		- lore? <br>
		- added shifting layer <br>
		- im starting to get lazy <br><br>

		<h3>v0.2.5  [BUG FIX 2]</h3><br>
		- fixed QoL upgrade on ShftUpg5 <br><br>
		- 
		
		<h3>(v0.3)  [UPDATE 3]	</h3><br>
		- added some shifting upgrades
		- lore? <br>
		
		- Buffed shtfUpg2 <br>
		
		- shftUpg4 is nerfed from ^0.5 -> log2(x) [just a slight nerf]
		- offline time reduced from 5 hours to 1 hour<br><br>

		<h3>(v0.4.0a)   [UPDATE 4]	</h3><br>
		- Added a new layer, Repression!<br>
		- Theres only 2 rows of upgrades! im njot done with this, so please sit tight!<br>
		- Visual Update!<br>
		- TONS OF BUG FIXES<br>
		- offline time reduced from 5 hours to 1 hour<br>
		- Nova Mono my beloved <br>
		- added credits because this update took a long bit [ 5 months ]<br><br>

		<h3>(v0.5)   [UPDATE 5]	</h3><br>
		- Rebalanced alot of things<br>
		- added visual effects to Upg4, and rewrote ShftUpg7 -> TimeUpg1<br>
		- Added some challenges<br>
		- nerfed D2 (sqrt3(R) -> log5(R))<br>
		- buffed A2 (2x -> 4x Ibs gain)<br>
		- reworded softcaps to softchains and hardcaps to roofchains<br>
		- adjusted repUpg2's scaling by a little bit<br>
		- added softchains to Upg2, Upg4 <br>
		- nerfed shifting sacrifice (log70 -> log100)

		<h3>v0.5.2  [BUG FIX 2]</h3><br><br>
		- Fixed shifting upgrades magically disapearing<br>
		- Fixed ShftUpg4 returning 0 since it didnt have .max(1), since its effect log2(1) is 0.
		- i accidentally deleted the code for RepUpg2's Boost in getPointGen(), so uh, sorry!
		<br><br>

		`

let winText = `Yeah, this is the endgame screen, congrats for winning this mod. now you can go and touch grass`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	if (hasUpgrade("U",11)) return true; 
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain = new Decimal(1)
	if (hasUpgrade("U",11) && !player.points.eq(0) ) gain = (upgradeEffect("U",11)); else player.points = player.points.plus(0.1)


	if (!inChallenge("R",14)) {
		
		gain = gain.times(buyableEffect("U",12)) 
		gain = gain.mul(buyableEffect("S",11))
		gain = gain.pow(hasUpgrade("R", 32) && hasUpgrade("S", 13) ? 1.3 : 1.15)

		if (hasUpgrade("S",11) ) gain = gain.times(upgradeEffect("S",11))
	
		
		if (hasUpgrade("S",16)) gain = gain.mul(20)
		
	} 
	
	if (hasUpgrade("U",12)) gain = gain.times(upgradeEffect("U",12))
	
	if (hasChallenge("R",11)) gain = gain.pow(challengeEffect("R",11))
	return gain//.minus(1)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	
}}

var Progress;

function progression() {
	    
		/*layer: just started */ 
let currentProgress = 0
/*part: first upgrade is bought */
if (hasUpgrade("U",11)) {
	
currentProgress = 1
	}	

/*part: all upgrades are bought */
if (hasUpgrade("U",11) && hasUpgrade("U",12)&& hasUpgrade("U",13)&& hasUpgrade("U",14)&& hasUpgrade("U",15)) 
{
	
currentProgress = 2
	}



/*layer: shifting */
if (player.points.gte(20000) || player["S"].points.gte(1)|| hasUpgrade("S",11)) {currentProgress = 3}
     
if (buyableEffect("S",11).gt(1)) {currentProgress=4}



/*layer: repression */









	

	/*after everything has been checked, set variables */ 
 Progress = currentProgress;
return currentProgress
}







// Display extra things at the top of the page
var displayThings = [

	

	//if (pr)






	() => !hasUpgrade("U", 11) ? `(Locked)<br>something gleams with power...` : `<br> ` 
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e70"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}