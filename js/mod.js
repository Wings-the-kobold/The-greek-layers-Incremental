let modInfo = {
	name: "The Meta Upgrades Incremental",
	id: "mymod",
	author: "ThatOneKobold",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "arbgpo",
	name: "just some upgrades",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1  [UPDATE 1]</h3><br>
		- Added a few upgrades<br>
		- Added stuff.`

let winText = `Yeah, this is the endgame screen, congrats for winning this mod. now you can go and touch grass`

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
	let gain = new Decimal(0)
	if (hasUpgrade("U",11)) gain = new Decimal(1)
	gain = gain.add(buyableEffect("U",11))
	gain = gain.mul(buyableEffect("U",12))
	if (hasUpgrade("U",12)) gain = gain.mul(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	`<br> hi this is a floatimg text`
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal(100000))
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