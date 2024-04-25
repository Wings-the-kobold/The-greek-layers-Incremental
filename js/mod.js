let modInfo = {
	name: "The Great Eclipse Incremental",
	id: "OINOINOIN",
	author: "ThatOneKobold",
	pointsName: "Solarity",
	modFiles: ["layers.js/SolarRays.js", "layers.js/GoldenRays.js","layers.js/Centerality.js","tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 40,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3 F2-B1",
	name: "Yeh",
}

let changelog = `
<h1>Changelog:</h1><br><br>

<h3>v0.3 Fix 2, Balance 1</h3><br>
CENTER THESE BALLS IN YOUR MOUTH!<br>
- A prestige mechanic where its based off of Modifier Score! [A * B] = Output <br>
- Some unique challenges via "Upgrade Checks"! <br>
- Effector Upgrades which provides powerful Synergy!<br>
Bal1: Multiply Scaling Doubles every 25 bought, idk this was meant to be harder or something lol <br>


	<br><br>

<h3>v0.2 Fix 2, Balance 0</h3><br>
Second layer has been added...<br>
- 2 Clickables that Reset 1st layer!<br>
- A new Conversion rate system and Light cap stuff<br>
- You ONLY gain solar shards in a very unique and special way.<br>
Fix2: Fixed PointGen() issues/boosts not responding very well (it was an "x= value bug) <br>


	<br><br>


<h3>v0.1 Fix 1, Balance 0</h3><br>
	 Fix 1: Fixed Solar Rays Reset lol<br>
	 <br><br>

<h3>v0.1 Fix 0, Balance 0</h3><br>
	First layer has been added...<br>
		- 3 Upgrades, and 2 very Important Buyables... Plasmate and Multiply.<br>	
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

	gain = gain.plus(buyableEffect("S",11)).clampMin(1)
	gain = gain.mul(buyableEffect("S",12).clampMin(1))
	if (hasUpgrade("S",13)) gain = gain.mul(upgradeEffect("S",13)).max(1)
	if (hasUpgrade("GL",13)) gain = gain.mul(upgradeEffect("GL",13)).max(1)


	if (hasUpgrade("S",12)) {
			gain = gain.pow(player["S"].points.root(35)).clampMin(1)
			gain = gain.mul(player["S"].points.root(25)).clampMin(1)
			
			} else {
			gain = gain.pow(player["S"].points.root(40)).clampMin(1)
			gain = gain.mul(player["S"].points.root(30)).clampMin(1)
			}

	if (hasUpgrade("GL",14)) gain = gain.pow(upgradeEffect("GL",14))
	if (getClickableState("GL", 11) == true) gain = gain.pow(0.5)











	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function () {

		if (hasUpgrade("GL",15)) {
			if (getClickableState("GL", 11)) return `Next Unlock at Shade, and 10+ Center Points <br><br> (also btw ur gain is divided by /${format(getPointGen().pow(0.5))}) <br> <h4> Generating ${format(Decimal.pow(getPointGen().pow(0.5), 0.2).sub(1),3)} Golden Light Per Second...  </h4>`
			else return `Next Unlock at Shade, and 10+ Center Points<br><br> Self Note: Create Clickable Which Resets Solar Shards and Solar Rays for a Center point`
		}

		else if (hasUpgrade("S",14) || player["GL"].Solar_Shards.gte(1) || player["GL"].Solar_Shards.gte(1)) {			 
			if (getClickableState("GL", 11)) return `Next Unlock at Coronal Upgrade <br><br> (also btw ur gain is divided by /${format(getPointGen().pow(0.5))}) <br> <h4> Generating ${format(Decimal.pow(getPointGen().pow(0.5), 0.2).sub(1),3)} Golden Light Per Second...  </h4>`
			else return `Next Unlock at Coronal Upgrade`
		} 
		else if (getBuyableAmount("S",11).gte(5)) {			
			return `Next Unlock at Solarizor Upgrade`
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
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}