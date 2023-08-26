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
	num: `0.2.8 - "ToL sucks!"`,
	name: "Banana",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added things.<br>
		- Added stuff.<br>
		<h3>v0.1.1 - the pain begins</h3><br>
		- idk<br>
		- Added stuff.<br>
		<h3>v0.1.6 - Reducer era</h3><br>
		- added 2 buyables<br>
		- new prestige layer! (who tf reads these).<br>
		- too many bug fixes xd <br>
		<h3>v0.1.6a</h3><br>
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
		<h3>v0.2.3 - Incremented</h3><br>
		- added a new sub currency for Incresor<br><br>
		
		<h1>who tf reads these</h1>
		
										
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
 `<br>Hey, this game is currently in the archive, i will soon be putting it back once i feel like doing this mod, <br>
  <a href=https://raw.githack.com/Wings-the-kobold/The-greek-layers-incremental/Meta-Upgrades-Incremental-(Tree-ver.)/index.html>Click here to go to TMUI, TMT version<a>
  <br> <a href=https://scratch.mit.edu/projects/852049398/>Click here to go to one of my non-TMT mods, [Incremental Prestige Layers]<a>
  <br><br> <a href=https://www.youtube.com/watch?v=xvFZjo5PgG0>Click here to get free discord nitro<a>
  <br><br> <a href= https://www.discord.gg/tJDWU7twvB>Click here to join the kobold pack! (also to get updates for my future mods and game updates!)<a>
  `
]

// Determines when the game "ends"
function isEndgame() {
	if (player.points.gte(new Decimal("1e15"))) return true
	alert("you got the milestone")
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