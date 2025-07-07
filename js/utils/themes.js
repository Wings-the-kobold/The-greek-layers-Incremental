// ************ Themes ************
var themes = ["default", "aqua", 'Eclipse', "Twilight",]

var colors = {
	default: {
		1: "#ffffff",//Branch color 1
		2: "#bfbfbf",//Branch color 2
		3: "#7f7f7f",//Branch color 3
		color: "#dfdfdf",
		points: "#ffb300",
		locked: "#bf8f8f",
		background: "#0f0f0f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",

		milestonebg: "#e37734",
		milestonetxt: "#291102",
		milestonelockedbg: "#000000", 
		milestonelockedtxt: "#ffd86b",

	},
	aqua: {
		1: "#bfdfff",
		2: "#8fa7bf",
		3: "#5f6f7f",
		color: "#bfdfff",
		points: "#dfefff",
		locked: "#c4a7b3",
		background: "#001f3f",
		background_tooltip: "rgba(0, 15, 31, 0.75)",
		
	},

	Eclipse: {
		1: "#ff9036",//Branch color 1
		2: "#a14800",//Branch color 2
		3: "#7d0202",//Branch color 3
		color: "#000000",
		points: "#8c3e01",
		locked: "#bf8f8f",
		background: "#54240f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		milestonebg: "#ea7b40",
		milestonetxt: "rgba(0, 0, 0, 0.947)",
		milestonelockedbg: "#000000", 
		milestonelockedtxt: "#ffd86b",
	},

	Twilight: {
		1: "#3a027d",//Branch color 1
		2: "#160826",//Branch color 2
		3: "#0c0812",//Branch color 3
		color: "#2e006e",
		points: "#8c3e01",
		locked: "#bf8f8f",
		background: "#08040f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		milestonebg: "#4b006e",
		milestonetxt: "#85519e",
		milestonelockedbg: "#000000", 
		milestonelockedtxt: "#ffd86b",

	},

}



function changeTheme() {

	colors_theme = colors[options.theme || "default"];
	document.body.style.setProperty('--background', colors_theme["background"]);
	document.body.style.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
	document.body.style.setProperty('--color', colors_theme["color"]);
	document.body.style.setProperty('--points', colors_theme["points"]);
	//document.body.style.setProperty("--hideALL", !inCutscene ? "relative" : "absolute");

	document.body.style.setProperty("--milestonelocked", colors_theme["milestonelockedbg"]);
	document.body.style.setProperty("--milestonelockedtxt", colors_theme["milestonelockedtxt"]);
	document.body.style.setProperty("--milestone", colors_theme["milestonebg"]);
	document.body.style.setProperty("--milestonetxt", colors_theme["milestonetxt"]);
	

}
function getThemeName() {
	return options.theme? options.theme : "default";
}

function switchTheme() {
	let index = themes.indexOf(options.theme)
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		index ++;
		options.theme = themes[index];
		//options.theme = themes[1];
	}
	changeTheme();
	resizeCanvas();
}
