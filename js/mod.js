let modInfo = {
	name: "The Meta Upgrades Incremental",
	id: "TMUI",
	author: "ThatOneKobold",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "My Twitch stuff ",
	discordLink: "discord.gg/tJDWU7twvB",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 7,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "v0.2",
	name: "just some upgrades",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1  [UPDATE 1]</h3><br>
		- Added a few upgrades<br>
		- Added stuff.
		<h3>v0.1.1  [BUG FIX 1]</h3><br>
		- Fixed early game multiplier in point gen<br>
		<h3>v0.1.3  [REBALANCE 1]</h3><br>
		- Made upgrades apear sooner, idk about the second repUPG2 though.<br>
		
		<h3>v0.2  [UPDATE 2]</h3><br>
		- added some shifting upgrades
		- lore? <br>
		- added shifting layer <br>
		- im starting to get lazy <br>
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

	gain = gain.mul(buyableEffect("S",11))
	if (hasUpgrade("S",13)) gain = gain.pow(1.15)
	if (hasUpgrade("S",11)) gain = gain.times(upgradeEffect("S",11).floor())
	if (hasUpgrade("S",14)) gain = gain.times(upgradeEffect("S",14).floor())
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	`<br> hi this is a floatimg text`
//`<br> also, endgame is exactly 100,000`
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal(1e18))
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