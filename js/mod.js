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
	num: "0.1 0-0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added things.<br>
		- Added stuff.`

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
	gain = gain.mul(Decimal.pow(player["S"].points.root(40),2).sub(1))
	gain = gain.plus(buyableEffect("S",11))


	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function () {
		if (getBuyableAmount("S",11).gte(5)) {			
			return `Next Unlock at Solarizor Upgrade (NYI)`
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
	return player.points.gte(new Decimal("1e20"))
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