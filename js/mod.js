let modInfo = {
	name: "The Greek Layers incremental",
	id: "Omega",
	author: "Wings",
	pointsName: "Points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "Wings#8659",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 3,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.3",
	name: "Too much chaos",
}

let changelog = `<h1>Changelog:</h1><br>
		<h3>v0.0.1</h3><br>
		- The First layer is added
		I have no idea what im doing :D
		<h3>v0.0.2 - synergism. </h3><br>
		- added 2 more upgrades.<br>
	   *unplesant kobold groan noises*
	    <h3>v0.0.4 - Chaos. </h3><br>
		- 2 buyables have been added (1 is working)
		- increased offline limit to 3 hours
		I think im getting the hang of this(kinda)
	   `

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

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
	if (hasUpgrade('B', 16)) gain = gain.pow(1.05)
	
	

    
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	Photosmic: new Decimal(0),
}}

// Display extra things at the top of the page
var displayThings = [

]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("6.69e9"))
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