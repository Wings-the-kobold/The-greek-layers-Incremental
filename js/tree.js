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


//function s() {return player.showScreen = !player.showScreen};


addLayer("tree-tab", {
    tabFormat: [        
        "blank",
        ["tree", function() {
            //yeah i couldn't figure out how to fade out thi thing
            
          if (!player.inCutscene) return (layoutInfo.treeLayout ? layoutInfo.treeLayout : TREE_LAYERS )
        }],
        ["Custom", {id:12}],
        ["Custom", {id:13}],

        () => player.inCutscene ? ["column", Array.from({ length: 20 }, () => "blank")] : "blank",
        
        ["Custom", {id:11}],

        ["row", [
            ["Custom", {id:21}],
            ["Custom", {id:22}],
            ["Custom", {id:23}],

            ],
        ],
    
    ],
    previousTab: "",
    leftTab: true,


    update(diff) { 
        
    if (player.finishedStCutscene == false && player.inCutscene == false) {
        player.inCutscene = true
        player.cutsceneName = "startGame"
        player.showScreen = false
        options.theme = themes[0];
        changeTheme();
    }

    else if (player.finishedStCutscene == true){ 
        if (player.timerToAgree >= 0) player.timerToAgree -= diff
           //to fix the number
           player.timerToAgree = Math.floor(player.timerToAgree * 100) / 100
        if (player.timerToAgree != 0 && player.timerToAgree <= 0) player.timerToAgree = 0 
        }
        
        //game initializer
     if (player.inCutscene){
        
            if (player.cutsceneName == "startGame") {
                if (player.frames < 180) player.frames += 1
                if (player.rot < 90) player.rot += 2 
                resizeCanvas()
                }
            if (player.cutsceneName == "endGame") {
                if (player.frames < 180) player.frames += 1
                if (player.rot < 180) player.rot += 2
                resizeCanvas()
            }   
         player.tab = 'none'
        }

       
        
// general cutscene initializer

    
 document.getElementById("screen").style.opacity = player.showScreen == false ? 0 : 1; 
        


    },

    Custom: {
        //this should appear on frame 150
        11: {
            display() {
                
       
                return `<h2>...Continue?</h2>`
            
            },
            onClick() {player.finishedStCutscene = !player.finishedStCutscene},
            canClick() {return true},
            style() {return {
              "width": "100px",
              "height": "50px",
              }},  
            unlocked() {return (player.frames == 180 && player.finishedStCutscene == false && player.cutsceneName == "endGame")}
          },

        12: {
            display() { 
               return `<h1>NOTICE:</h1><br><br>
               
              <h3> This game is HARD, slowpaced, and requires strategies to beat the game. </h3><br><br>
                <h4>
               This game IS part of a series known as 'the greek layer tower'. which is a slow paced incremental game which may involve beating other games of thatonekobold or my incremental mods.<br>
               Expect alot of timewalls and a few forcewalls in this game.<br>
               Also Expect a bit of labor and complex strategies near endgame <br><br>

               If you cannot handle this concept or idea, then dont continue and play some other game! <br>
               The game is also balanced enough the way it is, so please refrain from complaining about how "poorly balanced" this game is, instead you can suggest balance requests in my discord server! <br><br>
               <br>

               You can instead ask for a <b>Balance request</b> in the discord server if a certain mechanic or feature is needed to be rebalanced. in which you can join on the extra things page, or on the left side of the screen.
               however, the owner of the TGLT series/TSEGI (me) not just <i>only</i> decide whether or not it should be balaced, but the majority of people can or may decide if a feature urgently needs a rebalance.
               <br> Essentially, other people have to agree the feature can be rebalanced. not just me.

               </h4>
               
               <br>
               Oh also, in addition to such. this is NOT inspired by the roblox game Grass Cutting Incremental from "supernova". check the games credits on the top right when accepting TOS<br>            
                
               You cannot continue until you have read the TOS <br> 
               You can accept in ${player.timerToAgree}<br>
               `
            },
            
            canClick() {return false},
            style() {return {
              "width": "400px",
              "height": "350px",
              }},  
            unlocked() {return (player.finishedStCutscene == true && player.inCutscene && player.cutsceneName == "startGame")}
        },

        13: {
            display() {
                
       
                return `<h2>I accept. lets play the game!</h2>`
            
            },
            onClick() {player.agreedTOS = true; player.startedGame = true; player.inCutscene = false; player.showScreen = true; save(); doPopup("msg","New theme unlocked!", "Game Notifier",10);},
            canClick() {return true},
            style() {return {
              "width": "400px",
              "height": "50px",
              }},  
            unlocked() {return (player.timerToAgree == 0 && player.inCutscene && player.cutsceneName == "startGame")}
          },
        

          //finish the game off by adding these special options
            21: {
                display() {
                            
                
                    return `<h2>Complete TSEGI (+1 to v${VRSN} TSEGI Completions)</h2>`
                        
                },
                        unlocked() { return player.frames == 180 && player.cutsceneName == "endGame" && player.inCutscene},
                        onClick() {player.finishedStCutscene = !player.finishedStCutscene},
                        canClick() {return true},
                },
            22: {
                display() {return `<h2>Let me continue playing! (+1 v${VRSN} to TSEGI Completions)</h2>`},
                unlocked() { return player.frames == 180 && player.cutsceneName == "endGame" && player.inCutscene},
                onClick() {player.cutsceneName = ""; player.inCutscene = false; },
                canClick() {return true},
            },
            
            23: {
                display() {return `<h2>Run it back!</h2>`},
                unlocked() { return player.frames == 180 && player.cutsceneName == "endGame" && player.inCutscene},
                onClick() {player = null},
                canClick() {return true},
            }    
    },

    
   


})

