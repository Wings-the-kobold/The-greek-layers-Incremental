let modInfo = {
	name: "Multi++",
	id: "mymod",
	author: "ThatOneKobold",
	pointsName: "G.M",
	modFiles: ["layers.js", "tree.js"],

	discordName: "My twitch server",
	discordLink: "https://discord.gg/tJDWU7twvB",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.6a - Reduction Era",
	name: "REDUCTION!!",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added things.<br>
		- Added stuff.<br>
		<h3>v0.1.1</h3><br>
		- idk<br>
		- Added stuff.<br>
		<h3>v0.1.6</h3><br>
		- added 2 buyables<br>
		- new prestige layer! (who tf reads these).<br>
		- too many bug fixes xd
		<h3>v0.1.6a</h3><br>
		- fixed everything again askdjngliajg;lk<br>
		- display on reduction and every other buyable and its effects are now normal<br>
		
		
		
		
										
		`

let winText = `hey, this is the end game screen. you can stop playing now lmao`

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
//if (buyableEffect("M" , 11) > 1) effect = 1
	let gain = new Decimal(1)
	gain = gain.mul(buyableEffect("M" , 11))
	if (hasUpgrade('M', 11)) gain = gain.times(2)
	if (hasUpgrade('M', 12)) gain = gain.times(upgradeEffect('M', 12))
	gain = gain.mul(buyableEffect("M" , 13))
	if (hasUpgrade('R', 11)) gain = gain.times(upgradeEffect('R', 11)).add(1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e10"))
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