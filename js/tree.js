var layoutInfo = {
    startTab: "none",
    startNavTab: "tree-tab",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree



addNode("sNode", {
    color() {return tmp.S.color},
    row: 0,
    position: 1,
    symbol() {
        return `<span style='margin-left:> You have ${format(player.S.points)} Solar Rays`

    },
    nodeStyle() { return {
        "position": "absolute",
        "height": "85px",
        "width": "175px",
        "margin-left": (options.mobileShortcuts?"80px":"-160px"),
        "margin-top": "8px",
        "z-index": "0",
        "transform":"scale("+(options.mobileShortcuts?"1":"0")+",1)",
    }
    },

}, 
)


function s() {return player.showScreen = !player.showScreen};

addLayer("tree-tab", {
    tabFormat: [        
        "blank",
        ["tree", function() {
           //if (!player.inCutscene) 
            return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS)
        }]
    
    
    
    ],
    previousTab: "",
    leftTab: true,


    update(diff) {
        
        //document.getElementById("screen").style.opacity

    if (player.inCutscene) {
    if (player.tick < 120) player.tick += 1
        
    if (player.rot < 90) player.rot = player.rot + 2 

    document.getElementById("screen").style.opacity = "0"; 
    document.getElementById("debugStats").innerHTML = `Rotation: ${player.rot} <br> Frame ${player.tick}`   



    } else 
    if (player.inCutscene == false) 
        {
            document.getElementById("screen").style.opacity = "1";
            document.getElementById("debugStats").innerHTML = ``   

        }
        



    },


})

