// ************ Options ************

let options = {}

function getStartOptions() {
	return {
		autosave: true,
		msDisplay: "always",
		theme: "default",
		hqTree: false,
		betterTree: false,
		animateTree: false,
		SolarityInfo: true,
		showEclipse:true,		
		debugMode: false, 

		offlineProd: true,
		hideChallenges: true,
		showStory: true,
		forceOneTab: false,
		oldStyle: false,
		tooltipForcing: false,
	}
}

function toggleOpt(name) {
	if (name == "oldStyle" && styleCooldown > 0)
		return;

	options[name] = !options[name];
	if (name == "hqTree")
		changeTreeQuality();
	if (name == "oldStyle")
		updateStyle();
	if (name == "betterTree")
	   options.betterTree = true


}
var styleCooldown = 0;
function updateStyle() {
	styleCooldown = 1;
	let css = document.getElementById("styleStuff");
	css.href = options.oldStyle ? "oldStyle.css" : "style.css";
	needCanvasUpdate = true;
}

/*
document.body.style.setProperty('--changePosX', val + 'px')
document.body.style.setProperty('--changePosY', val2 + 'px')
*/

function changeTreeQuality() {
	var on = options.hqTree;
	document.body.style.setProperty('--hqProperty1', on ? "15px solid" : "4px solid");
	document.body.style.setProperty('--hqProperty2a', on ? "-4px -4px 4px rgb(255,69,0,0.5) inset" : "-8px -8px 4px rgba(34, 55, 175, 0) inset");
	document.body.style.setProperty('--hqProperty2b', on ? "0px 0px 35px rgb(255,215,0)" : "");
	document.body.style.setProperty('--hqProperty3', on ? "2px 2px 4px rgba(120, 200, 110, 0.25)" : "none");
}

function useBetterTree() {
	var on = options.betterTree

}



function toggleAuto(toggle) {
	Vue.set(player[toggle[0]], [toggle[1]], !player[toggle[0]][toggle[1]]);
	needCanvasUpdate=true
}

const MS_DISPLAYS = ["ALL", "NEXT", "NONE"];

const MS_SETTINGS = ["always", "next", "never"];

function adjustMSDisp() {
	options.msDisplay = MS_SETTINGS[(MS_SETTINGS.indexOf(options.msDisplay) + 1) % 5];
}
function milestoneShown(layer, id) {
	complete = player[layer].milestones.includes(id);
	auto = layers[layer].milestones[id].toggles;
	
	//player.E.EclipseTier.eq()
	

	switch (options.msDisplay) {
		case "always":
			return true;
			break;
		case "next":
			return !complete /*|| hasMilestone(layer,id)*/;
			break;
		case "never":
			return false;
			break;
	}
	return false;
}
