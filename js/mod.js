let modInfo = {
	name: "The Quantum Energy Tree",
	id: "TQET (The Origional)",
	author: "ThatOneKobold",
	pointsName: "Energy",
	modFiles: ["layers.js/Acceleration.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 10000000,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Hey uh, i have something to say right now, uhm-... you reached endgame...`

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




function addedPlayerData() { return {
	EnergyNerf: new Decimal(0.3),
	SizeDilation: new Decimal(500),
	AbsorbedTime: new Decimal(1)
  }}
  
  function antiEnergy() {
	let eff = player.points.add(1).pow(0.5)
	return eff
	}
  function antiCollision() {
	let eff = (antiEnergy()).log(5).add(1).pow(2.5)
	return eff
	}
	function QuantizedTime(diff) {
		//random stuff
		player.AbsorbedTime=player.AbsorbedTime.add(1).div(player.SizeDilation)
		let increment = player.AbsorbedTime.add(diff)
		increment = increment.div(player.SizeDilation)
		let eff = new Decimal(1)
		if (increment.gt(1)) eff = Decimal.log(2,increment).pow(2).pow(increment)
		return eff
	}
	
// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)


	


	let gain = new Decimal(3)


	gain = gain.div(player.SizeDilation) // Size Dilation Nerf
	if (gain.gte(1)) gain = gain.pow(0.3) // Adjusted Power

	if (antiCollision().gte(1)) gain = gain.div(antiCollision()) //Anti-Collision
	gain = gain.div(QuantizedTime())
	return gain
}



// player variables and nerfs go here

  // wherever tmp is calculated, add these lines
  
  
  // back to mod.js
  var displayThings = [
	
	() => `Size Dilation: Time is ${format(player.SizeDilation)}x Slower <br>`,
	() => {if (getPointGen().gte(1)) return `AdjustedPower: Energy gain is ^${format(player.EnergyNerf)} if above 1`},
	() => `Anti-Collision: You have ${format(antiEnergy())} Anti-Energy, which makes Energy gain /${format(antiCollision())}`,
	() => `Quantized Time: You have ${format(player.AbsorbedTime)} Absorbed Time, which makes energy gain /${QuantizedTime()}`,
	//() => `Energy Dissapation: you are losing 50% of your energy gain every gametime second due via "Cooldown" `,
	//() => `<br>Power Storage Unit: you can hold only 1e10 of energy (Energy Hardcap)`,
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