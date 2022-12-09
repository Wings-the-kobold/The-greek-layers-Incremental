let modInfo = {
	name: "The Greek Layers incremental",
	id: "Omega",
	author: "Wings",
	pointsName: "Points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "Wings#8659",
	discordLink: "",
	initialStartPoints: new Decimal (10.5), // Used for hard resets and new players
	offlineLimit: 3,  // In hours 
}

// Set your version in num and name
let VERSION = {
	num: "0.1.5",
	name: "The Alpha Era.",
}

let changelog = `<h1>Changelog:</h1><br>
		<h3>v0.0.1</h3><br>
		- The First layer is added
		I have no idea what im doing :D
		<h3>v0.0.2 - synergism. </h3><br>
		- added 2 more upgrades.<br>
	   *unplesant kobold groan noises*
	    <h3>v0.0.4 - Chaos. </h3><br>
		- 1 buyable have been added
		- increased offline limit to 3 hours because YEA, WHY NOT.
		I think im getting the hang of this(kinda)
		<h3>v0.1.5 - Alpha era. POG!</h3><br>
		- Alpha Layer!!!! ong!
		- Fixed some stuff
		kobold is getting less confused yay
	   `

let winText = `You have gotten enough upgrades and points that can no longer give any more progress. and thus, ending this game. (good job)`

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
	if (hasUpgrade('B', 11)) gain = gain.times(2)
	if (hasUpgrade('B', 12)) gain = gain.times(2)
	if (hasUpgrade('B', 13)) gain = gain.times(5)
	if (hasUpgrade('B', 14)) gain = gain.times(upgradeEffect('B', 14)) 
	if (hasUpgrade('B', 16)) gain = gain.times(1.3)
	if (hasUpgrade('A', 12)) gain = gain.times(10)
	if (hasUpgrade('A', 13)) gain = gain.times(upgradeEffect('A', 13))
	if (hasUpgrade('A', 14)) gain = gain.times(upgradeEffect('A', 14))
	if (hasUpgrade('A', 16)) gain = gain.times(4)
	gain = gain.times(buyableEffect('B', 21))
	return gain;
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [

]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("2.11e9"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(100) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}