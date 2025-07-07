// ************ Themes ************
var themes = ["default", "aqua", 'Eclipse', "Twilight", "Heliosphere"]
//var unlTh

var colors = {
	default: {
		unlocked: () => {return true},
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
		unlocked: () => {return true},
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
		unlocked: () => {return player.agreedTOS},
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
		unlocked: () => {return Check("C",13).has},
		1: "#3a027d",//Branch color 1
		2: "#160826",//Branch color 2
		3: "#0c0812",//Branch color 3
		color: "rgba(52, 30, 62, 0.75)",
		points: "#8c3e01",
		locked: "#bf8f8f",
		background: "#08040f",
		background_tooltip: "rgba(0, 0, 0, 0.75)",
		milestonebg: "#4b006e",
		milestonetxt: "#85519e",
		milestonelockedbg: "#000000", 
		milestonelockedtxt: "#ffd86b",

	},

	Heliosphere: {
		unlocked: () => {return player.Sol.activeCheck == "Heliosphere" || player.Sol.Heliosphere },
		1: "#d44d13",//Branch color 1
		2: "#8f6b00",//Branch color 2
		3: "#1c0d0d",//Branch color 3
		color: "rgba(246, 189, 119, 0.46)",
		points: "#8c3e01",
		locked: "#bf8f8f",
		background: "#0a0500",
		background_tooltip: "rgba(208, 174, 22, 0.29)",
		milestonebg: "#ea7b40",
		milestonetxt: "rgba(155, 0, 0, 0.43)",
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

function switchTheme(force) {

	let index = themes.indexOf(options.theme)
	let nextindex = themes.indexOf(options.theme) + 1
	
	if (options.theme === null || index >= themes.length-1 || index < 0) {
		options.theme = themes[0];
	}
	else {
		if (colors[themes[nextindex]].unlocked()) index ++; else index = 0;
		options.theme = themes[index];
	
	}

	if (force != undefined) options.theme = force;
	changeTheme();
	resizeCanvas();

	

	

}


//