let modInfo = {
	name: "The Great Eclipse Incremental",
	id: "mymod",
	author: "nobody",
	pointsName: "Solarity",
	modFiles: ["layers.js/SolarRays.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2 F0-B0",
	name: "Yeh",
}

let changelog = `<h1>Changelog:</h1><br>

<h3>v0.2 Fix 0, Balance 1</h3><br>
First layer has been added...<br>
- 3 Upgrades, and 2 very Important Buyables... Plasmate and Multiply.

	<h3>v0.1 Fix 0, Balance 0</h3><br>
		First layer has been added...<br>
		- 3 Upgrades, and 2 very Important Buyables... Plasmate and Multiply.`

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
	
	gain = buyableEffect("S",12)
	gain = gain.mul(buyableEffect("S",11))
	if (hasUpgrade("S",13)) gain = gain.mul(upgradeEffect("S",13))
	if (hasUpgrade("S",12)) {
			gain = gain.mul(player["S"].points.sqrt(35)).plus(1)
			
			} else {
			gain = gain.mul(player["S"].points.sqrt(40)).plus(1)
			}
	
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function () {

		if (hasUpgrade("S",14)) {			
			return `Next Unlock at 6 Centre Points [NYI]`
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