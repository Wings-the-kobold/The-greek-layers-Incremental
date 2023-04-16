let modInfo = {
	name: "The ",
	id: "Omega",
	author: "Wings",
	pointsName: "Points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "Holmium67#8659",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 30,  // In hours 
}

// Set your version in num and name
let VERSION = {
	num: "0.0.5",
	name: "The Alpha Era.",
}

let changelog = `<h1>Changelog:</h1><br>
		<h1> the changelog sucks</h1>
		<h4> frick off m8, no one looks at these anyways </h4>
	   `

let winText = `good job idk what to say but rkiasrberk erbks er fowrh0qw3gdz we0ihnsg`

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
	if (hasUpgrade('B', 11)) {
		x = new Decimal(3) //base multiplier

		  if(hasUpgrade('B', 14)) {
			x = x.times(upgradeEffect('B', 14))
		  } //boost from B14

		gain = gain.add(x)
	 }
	if (hasUpgrade('B', 12)) gain = gain.times(upgradeEffect('B', 12)) 
	
	if (hasUpgrade('B', 13)) gain = gain.times(1.55)
	gain = gain.times(buyableEffect('B', 21))
	return gain;
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
 "I HAVE NOTHING TO PUT HERE AKJSNGUIENGOEN"
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("400"))
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