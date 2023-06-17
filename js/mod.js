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
	num: `0.2.7 - 6+7 = 12`,
	name: "aaaaa",
}

let changelog = `<h1>Changelog:</h1><br>
	<h2>v0.1</h2><br>
		- Added things.<br>
		- Added stuff.<br>
		<h2>v0.1.1 - the pain begins</h2><br>
		- idk<br>
		- Added stuff.<br>
		<h2>v0.1.6 - Reducer era</h2><br>
		- added 2 buyables<br>
		- new prestige layer! (who tf reads these).<br>
		- too many bug fixes xd <br>
		<h2>v0.1.6a</h2><br>
		- fixed everything again askdjngliajg;lk<br>
		- display on reduction and every other buyable and its effects are now normal<br>
		<h3>v0.2 - Increasor chaos</h3><br>
		- NERFED: <br>
		- Multiplier gain (^0.5 -> ^0.3)<br>
		- Reduction gain amount 2000 -> 3500 <br>
		- Reduction Scale increase ^0.5 -> ^0.7<br>
		ADDED:<br>
		- Increasor layer! :O {some QoL upgrades are stil in WIP}<br>
		- QoL upgrades<br>
		FIXED:<br>
		- buttons are easier to read<br>
		- endgame is now 1e100 -> 1e10 {what was i thinking on that lmao}<br>
		- Reduction layer buyables boost Multiplier buyables normally<br>
		<h2>v0.2.3 - Incremented</h2><br>
		- added a new sub currency for Incresor<br>
		<h2>v0.2.7 - Chaotic bug fixes</h2><br>
<br>
		<h3>BUFFED/NERFED</h3><br>
		- Nerfed Incresor Requirement [15,000 -> 10,000] <br>
		- Nerfed Scalings for each multiplier buyable ^1.5 -> ^1.4 <br>
		- Split the 1000 Incresor milestone into the first three milestones, this is a reward for being an impatient freak <br>
		<br><h3>FIXED</h3><br>
		- Compounding Buyable works as intended <br>
		- floating point in the buyables is removed. it was funny while it lasted lmao <br>
		- autobuyer works! yayy!!!!!
		<br><h3>ADDED</h3>
		- a bLuE tExT fOr AbSolUteLy nO rEaSoN<br>
		- endgame is now 1e15 -> 1e13
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
	let gain = new Decimal(1)
	gain = gain.mul(buyableEffect("M" , 11))
	if (hasUpgrade('M', 11)) gain = gain.times(2)
	if (hasUpgrade('M', 12)) gain = gain.times(upgradeEffect('M', 12))
	gain = gain.mul(buyableEffect("M" , 13))
	if (hasUpgrade('R', 11)) gain = gain.times(upgradeEffect('R', 11)).add(1)
	if (hasUpgrade('M', 14)) gain = gain.times(2)
	if (hasUpgrade('M', 15)) gain = gain.times(upgradeEffect('M', 15))
	if (hasMilestone('I', 1)) gain = gain.pow(1.05)
	if (hasMilestone('I', 2)) gain = gain.times(3)
	if (hasMilestone('I',5)) gain = gain.times(tmp["I"].effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page

var displayThings = [
	`	<br><h4 style="color:#2287EC ; text-shadow: #063770 0px 0px 10px;">hi im blue<div></h4><br>
	
	`
]

// Determines when the game "ends"
function isEndgame() {
	return player["R"].points.gte(new Decimal(20))
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