var setCRNG = new Decimal(0)

const s = `<i><s>`
const _s = `</i></s>`  

const Roll = {
  cooldown: 5,
  baseCoolDown: 5,
  rollTime: 3,
  Amount: 0,
  trueVal: 0
}

var RawRNG = 1;
var simulated = []
var Heliosity = "";


//i'd probably need this for TQET
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateArray(arr) { //only for RNG
  let pritArr = []
  let slowDown = 1

  for (x in arr) {
    let text = arr[x] 
    
    pritArr.push(1 / arr[x]) 

    RawRNG = x != (arr.length - 1) ? arr[x] + " [!]" : arr[x]
    Roll.trueVal = 1/arr[x]
    await delay(100 + ((25 * Roll.baseCoolDown) * slowDown))
    slowDown += 1

    
  }
  
  
  console.log(pritArr)
  simulated = []
}

async function opacitizeArray(arr, ext=[]) {
  for (x in arr) {
    arr += `${arr[x]} \n<br>` + ext ? ext : ""
    await delay(1500)
  };
}  

//TMSQoL , TRMQoL , TBSQoL
const TMSQoL = [
   `Plasmate/Multiply is no longer reset on Convertary`,
   `You now generate 5% of eclipsium gain per second<br>`,
   `Entering check upgrades no longer resets Multiply<br><br>`
]
const TRMQoL = [
    `Plasmate/Multiply is no longer reset on Centralize`,
    `Automate Phaser, it does not spend resources`,
    `Solarizer Content is no longer reset on check entering.`
]
const TBSQoL = [
    `All Solarize Upgrades are kept on layer 2 resets`,
    `You now generate Solar light outside of dilation at ^0.3 of its gains`,
    // 
    `You now generate Lunar Essence and Aperativity ^0.25 of it's gains`, 
]
const TBCQoL = [
    `Centralizing no longer roots Solar Shards. `,
    `Effector tiers are no longer reset on Lunar and Solar Resets<br>`, //NOT DONE
    `+10 to Multiply's bulk purchase.` //NOT DONE
    // or "Removes Solarizor's requirement for Solar Light Generation"

]




/*
  SETTINGS
  for later
  random: completely randomized, how meta!
  slowDown: for suspense...

  */
function roll() {
    Roll.cooldown = Roll.baseCoolDown

    simulated = [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
    RawRNG = simulated[simulated.length]
    return animateArray(simulated);
  
}

const MNGStyle = {
  "width": "180px",
  "height": "150px",
  "border-radius": "0px",
  "border": "0px",
  "margin": "0px",
  "text-shadow": "0px 0px 10px rgb(157, 122, 48)",
}
const Tier2QueuedUpgs = {
  "width": "250px",
  "height": "144px",
  "border-radius": "0px",
  "border": "0px",
  "margin": "2px",
  "text-shadow": "1px 1px 10px #ffa500",
  "color": "#000000"
}

  const SolarisDialogue = [
      "So… you made it, it’s about time that you came",
      "Not like i have been watching you and all…",
      "And i have watched you… being resourceful with Lunaris… <br>",
      "...Enough chit chat, lets get to the point.",
      "You will prove your worth to me, Solaris, The Solar God.",
      "I will reward you with something much better. The power of the sun.",
      "But first… you have to prove that you are ready for this power.",
      "I will reward you well. do not melt with with the force of the suns.",
  ]



  
  addLayer("Sol", {
    symbol() {
      if (options.betterTree) return ``
      else return `<p><img src="resources/Solaris.png" style="width:80px;height:80px;"></p>`
    }
      ,
    startData() { return {
        unlocked: true,
        peakEnl: new Decimal(0),
        Aperativity: new Decimal(0),
        Aperature: new Decimal(0),
        CPBoost: new Decimal(0),

        latestReset: new Decimal(0),


        activeCheck: "",

        TRNG: new Decimal(0),
        BRNG: new Decimal(1),
        SRNG: new Decimal(0), //stored RNG?
      
        CRNG: new Decimal(0),
        Amount: Roll.Amount,

        SolarHeat: new Decimal(1),
        SolarFragments: new Decimal(1),
        genActive: '',
        // {{}} SH, {{}} SF

        MNG: {        
          Replic: 0,
          Smare: 0,
          Total: new Decimal(0),
          Quantify: new Decimal(0),
          Elevate: new Decimal(0),
          Rans: 0 
        },


        TMSun:{ 
          x: new Decimal(0),
          pending: new Decimal(0),
          active: false
        },
        TRMoon: {
          x: new Decimal(0),
          pending: new Decimal(0),
          active: false
        },
        TBSun: {
          x: new Decimal(0),
          pending: new Decimal(0),
          active: false
        },
        TBCore: {
          x: new Decimal(0),
          pending: new Decimal(0),
          active: false
        },
// player.Sol["TBCore"].x.gte(1)
        null: {
          active: false,
          x: new Decimal(0),
          pending: new Decimal(0)
        },

        tab: "",
        sub: "",
        activeCheck: "",
        selected: "",
        multiBurstAllowed: false, //v0.7 and later!
        solarBurst: false, //should move base Solarity cap to 1e1000, for Pestillessence, and removes CP harshcaps permenantly
        burstAmount: decimalZero,

        testBurst: false,
        Heliosphere: false,
        HelioRadiation: new Decimal(1),
        HelioStat: {
          Reduction: new Decimal(1),
          opac: 0,
          //Base
          Solarity: new Decimal(1), //L0
          Solar_Rays: new Decimal(1), //L0

          // Converter
          Solar_Shard: new Decimal(1), //L1
          Solar_Light: new Decimal(1), //L2

          // Centrality
          Modifier: new Decimal(1), 
          CP: new Decimal(1),

          // Lunaris
          Lunar_Abnorm: new Decimal(1), 
          Light: new Decimal(1),
          Dark: new Decimal(1),

          highSolarity: new Decimal(1),
          highSolar_Rays: new Decimal(1),
        }
    }},
    color: "#612700",
     nodeStyle() {
        

       let XoffSet = -3.15+(1.5*Math.PI*Math.cos(nodePos.tick/60))
       let YoffSet = 1+(-1.5*Math.PI*Math.sin(nodePos.tick/60))
      //maybe have to change this
      nodePos.SolarisX = options.animateTree ? XoffSet : 0.9
	    nodePos.SolarisY = options.animateTree ? YoffSet : 0.9
      
      // 0 degrees is -3.3, 4.5
      // 90 degrees is -7.5, 0.5
      // 180 degrees is -3.3, -3.5
      // 270 degrees is 0.5, 1
      // center is at -3.3,0.15

      // resting is at 1.5

      // use Lunaris's Cos() value 
      // max distance range for SolX is -1 to 4
      // it should be the opposite of LunX
      
      return {
          "padding":  options.betterTree ? "10px" : "0px",
          "bottom": options.betterTree ? nodePos.SolarisY + "cm" : "2cm",
          "left":  options.betterTree ? nodePos.SolarisX+"cm":"0", //nodePos.SolarisY +
          "height": options.betterTree ? "80px": "120px",
          "width": options.betterTree ? "80px" : "120px",
          "border": "var(--hqProperty1)",
          
          "border-color": player.borders["Sol"],
          "border-radius": "60%",
          "transform":options.betterTree && player.Sol.activeCheck == "Heliosphere" ? "scale(3,3)" : "",
          "z-index":options.betterTree && player.Sol.activeCheck == "Heliosphere" ? 100000 : 20   
      }

    },

   // Can be a function that takes requirement increases into account
   
   update(diff) {
    player.Sol.HelioStat["Reduction"] = player.Sol.HelioRadiation.log(100).floor().pow_base(1.05)
    let pre_harshcapBonus = player["Sol"].Aperativity.clampMin(1).log(10)        
    let harshCap_Start = new Decimal(3)
    
    // 3 + (root2(x - 3))
    // x = pre_harshcapBonus

      if (pre_harshcapBonus.gte(harshCap_Start)) pre_harshcapBonus = 
       new Decimal(harshCap_Start)
       .plus( Decimal.root(pre_harshcapBonus.sub(harshCap_Start).plus(1), 3)
       .sub(1) )

      
      player["Sol"].CPBoost = pre_harshcapBonus


   if (Roll.cooldown > 0) Roll.cooldown = Roll.cooldown - 1 * diff
    
   if (player.Sol.MNG.Rans >= 1) Roll.baseCoolDown = 5 / (1.06 ** player.Sol.MNG.Rans)

   player.Sol.MNG.Total = new Decimal(player.Sol.MNG.Rans + player.Sol.MNG.Replic).add(player.Sol.MNG.Quantify).add(player.Sol.MNG.Elevate)

    //Highest ever reached
   if (player["Sol"].peakEnl.gte(player.E.TopLVL)) player["Sol"].peakEnl = player.E.TopLVL

   if (player.Sol.activeCheck == "Heliosphere") player.Sol.HelioRadiation = (player.Sol.HelioRadiation.mul(1.05))

   if (player.Sol.activeCheck == "Heliosphere") player.Sol.HelioStat["Opac"] = player.Sol.HelioStat["Opac"] +=1 ; else player.Sol.HelioStat["Opac"] = 0
    

   player.Sol.HelioStat["Solarity"] = player.points.root(player.Sol.HelioStat["Reduction"])
   player.Sol.HelioStat["Solar_Rays"] = player.S.points.root(player.Sol.HelioStat["Reduction"])
   player.Sol.HelioStat["Solar_Light"] = player.GL.Solarlight.root(player.Sol.HelioStat["Reduction"])
   player.Sol.HelioStat["Solar_Shard"] = player.GL.Solar_Shards.root(player.Sol.HelioStat["Reduction"])

   player.Sol.HelioStat["Modifier"] = player.C.Score.div(player.Sol.HelioStat["Reduction"]) 
   player.Sol.HelioStat["CP"] = player.C.CenterPoints.div(player.Sol.HelioStat["Reduction"])

   player.Sol.HelioStat["Lunar_Abnorm"] = player.L.LunarPower.root(player.Sol.HelioStat["Reduction"])
   player.Sol.HelioStat["Light"] = player.L.Light.root(player.Sol.HelioStat["Reduction"])
   player.Sol.HelioStat["Dark"] = player.L.Dark.root(player.Sol.HelioStat["Reduction"]) 
   if (player.Sol.activeCheck == "Heliosphere"){
      if (player.Sol.HelioStat["Solarity"].gt(player.Sol.HelioStat["highSolarity"])) player.Sol.HelioStat["highSolarity"] = player.Sol.HelioStat["Solarity"]
      if (player.Sol.HelioStat["Solar_Rays"].gt(player.Sol.HelioStat["highSolar_Rays"])) player.Sol.HelioStat["HighSolar_Rays"] = player.Sol.HelioStat["Solar_Rays"]
      }

   let free = TSolStones(5).unlocked ? TSolStones(5).effect : new Decimal(0)

   player.C.FreeCP = free


  

   if (player.Sol.Heliosphere) {
    if (player.Sol.genActive==1) player.Sol.SolarHeat = player.Sol.SolarHeat.plus(gainOf("Solar Heat").mul(diff))
    else if (player.Sol.genActive==2) player.Sol.SolarFragments = player.Sol.SolarFragments.plus(gainOf("Solar Fragments").mul(diff))
        
   }
   if (player.Sol["TBCore"].active && player.points.log(20).gte(player.SolarityCap.log(20))) player.points = player.SolarityCap

   if (player.Sol.TBSun.x.gte(5)) player.Sol.Aperativity = player.Sol.Aperativity.plus(tmp["Sol"].Reset[11].gain.clampMin(0).pow(0.25).times(diff))

    //Updates the Darkness row upgrades               
    if (player.Sol.TBCore.x.gte(2)) DarknessUpgs_Row1 = [256, 64, 30]
    //if (player.Adaptive && player.Sol.TBCore.active) DarknessUpgs_Row1 = [new Decimal(256).times(JearEffectBoost_Core.pow_base(20).root(0.666)) ]
    if (player.Sol.TBCore.x.gte(2)) DarknessUpgs_Row2 = [1.08, 1.17, 36.33]
    if (hasUpgrade("C",33)) CoronalEffectRanges = [0.4 ** DarknessUpgs_Row3[2] , 5.4 ** DarknessUpgs_Row3[2]]
  }, 

  // 
   
  tabFormat: {
    "": {      
      content: [     

     ["row", [ //check upgrades
      () => player.Sol.activeCheck == "" ?  ["Custom", {id:11}] : "",
      () => player.Sol.activeCheck == "" ?  ["Custom", {id:12}] : "",
      () => player.Sol.activeCheck == "" ?  ["Custom", {id:13}] : "",
        ]]  ,
      ["row", [ //check upgrades
          ["Custom", {id:21}],
          ["Custom", {id:22}],
          ["Custom", {id:23}],
        ]],


  //------------------Aperaturize-----------------
      () => player.Sol.tab == "Aparal" ? "blank" : "", 

      ["Viewer",  {id:11, title: "Aparature Stats"}],
      ["Reset", {id:11, title: "Aperaturize"}],   

      () => player.Sol.tab == "Aparal" ? "blank" : "",
      () => player.Sol.tab == "Aparal" ? "blank" : "",

      ["display-text", function() { 
        if (player.Sol.tab == 'Aparal' )
         return `Remember: Queued upgrades forces a recontrol reset<br>
        Since these are Tier II Queued upgrades, these also reset Light and Dark, and roots Lunar power by 5
        `
      }],

      () => player.Sol.tab == "Aparal" ? "blank" : "",
      () => player.Sol.tab == "Aparal" ? "blank" : "",
  
      ["row", [ //check upgrades
        ["upgrade",11],
        ["upgrade",12],  
      ]],    
      ["row", [ //check upgrades
        ["upgrade",13],
        ["upgrade",14],  
      ]],
  //-------------------Randomizor-----------------
      
      ["row", [ //Randomizor machine
        
        

        ["Viewer",  {id:12, title: "BRNG Milestones",}],
        "blank",
        ["Viewer",  {id:13, title: "-----[ Machine ]-----"}],
        "blank",
        ["Viewer",  {id:14, title: "TRNG Milestones"}],
        "blank",
      ]],
      "blank",
      ["row", [ //check upgrades
        ["clickable",11],
        ["clickable",12],  
      ]],
      ["row", [ //check upgrades
        ["clickable",21],
        ["clickable",22],  
      ]],
  
 //-------------------Heliosphere-----------------
 ["display-text", 
           function() {

            let solaris = ``
            for (x in SolarisDialogue) {
              solaris += `<span class="ignThemes">${SolarisDialogue[x]}<br></span>`       
            };
           if (player.Sol.sub == "Heliosphere" && player.Sol.tab != "Core" &&player.Sol.Heliosphere==false) return `      
            ${solaris}
           `;// else if (player.Sol.tab == "Core") return `` 
          }
        ],
        ["Check", {id:11 , item: "Heliosphere"} ],
        
        () => player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" ? "blank" : "",
        /*() => player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" ? "blank" : "",
        () => player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" ? "blank" : "",
         */
        ["Viewer",  {id:21, title: `<span > The Fragmented Sun </span>`}],

        ["row", [ //check upgrades
          ["clickable",31],
          ["clickable",32],  
        ]],

        ["row", [ //check upgrades
          ["buyable",11],
          ["buyable",12],
        ]],

        ["display-text", 

          function() {
            // change to innvation 13 and Solariticism 12
            return (player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" && getBuyableAmount("Sol",11).lte(10) && getBuyableAmount("Sol",12).lte(10)) ? `<span>Next minor unlock at Innvation #10 and Solaritisicm #10 </span>`: `` 
          }
       ],

        ["row", [ //check upgrades
          ["buyable",13],
          ["buyable",14],
        ]],

        ["clickable",1111],
  //-------------------- The Core --------------------
   () => player.Sol.tab == "Core" && player.Sol.sub == "" ? "blank" : "",
   () => player.Sol.tab == "Core" && player.Sol.sub == "" ? "blank" : "",     
   () => player.Sol.tab == "Core" && player.Sol.sub == "" ? "blank" : "",
   () => player.Sol.tab == "Core" && player.Sol.sub == "" ? "blank" : "",
   () => player.Sol.tab == "Core" && player.Sol.sub == "" ? "blank" : "",
   () => player.Sol.tab == "Core" && player.Sol.sub == "" ? "blank" : "",
      ["display-text", 

      function() {
        
        let tDiff = getCoreDifficulty()
        let egg = ``
        if (player.Sol.TBCore.active && tDiff.eq(3)) egg = `<h3 style="color: #e92b21ff"><i>" The pressure of the core... is it too much for us to handle? or am I just..." - Glade</i></h3>`
        else if (player.Sol.TBCore.active && tDiff.eq(2)) egg = `<h3 style="color: #d15f48ff"><i>"These bonuses... are they all a lie? or am I staggering?"- Glade</i></h3>`
        else if (player.Sol.TBCore.active && tDiff.eq(1)) egg = `<h3 style="color: #c57c5fff"><i>"Why do i suddenly feel... vacuous?" - Glade</i></h3>`
        else egg = `<h3 style="color: #c5aa5fff"><i>"The radiation from the stars, they just feel too consolatory..." - Glade</i></h3>`


       if (player.Sol.tab == "Core" && player.Sol.sub == "") return egg }
       ],

  //-------------------- The wall of checks -----------
  //"The radiation from the stars, they just feel too consolatory..." - Glade
  ["Viewer",  {id:31, title: "Solaritology: The study of all things solar."}],

  ["row", [ //check upgrades
    ["clickable",41],
    ["clickable",42],
    ["clickable",43],
    ["clickable",44],
        ]],

        ["row", [ //check upgrades
          ["Custom", {id:111}],
          ["Custom", {id:112}],
          ["Custom", {id:113}],
        ]],    
        ["row", [ //check upgrades
         ["Custom", {id:201}],
        ]],
      
        
//-------------------- Solar Bursting -----------
  //"...And then, the cacophonus sun fell to a silent yet derisioned gaze. its attention is brought to you." - ???
   ["Viewer",  {id:41, title: "<span style='color: rgb(232, 186, 101)'>Solar Bursting...?</span>"}],

],},},


    //for unlockable content 
  Custom: {
    // TAB DIVIDERS
    11: {
      display() {return `<h2>Aparalitize</h2>`},
      onClick() {player.Sol.tab = "Aparal"; player.Sol.sub = ""},
      canClick() {return true},
      style() {return {
        "width": "100px",
        "height": "40px",
        }},  
      unlocked() {return true}
    },
    12: {
      display() {return `<h2>The Randomizor</h2>`},
      onClick() {player.Sol.tab = "RNG"; player.Sol.sub = ""},
      canClick() {return true},
      style() {return {
        "width": "130px",
        "height": "40px",
        }},  
      unlocked() {return hasUpgrade("Sol",14) || player.Sol.CRNG.gt(1) || player.E.EclipseTier.gte(7)}
    }, 
    13: {
      display() {return `<h2>The Core</h2>`},
      onClick() {player.Sol.tab = "Core"; player.Sol.sub = ""},
      canClick() {return true},
      style() {return {
        "width": "130px",
        "height": "40px",
        }},  
      unlocked() {return player.Sol.MNG.Total.gte(20) || player.E.EclipseTier.gte(7)}
    },  

    21: {
      display() {return `<h3>Sub: Heliosphere... </h3>`},
      onClick() {if (player.Sol.tab == "Core") player.Sol.sub = "Heliosphere"},
      canClick() {return true},
      style() {return {
        "width": "120px",
        "height": "40px",
        }},  
      unlocked() {return (player.Sol.MNG.Total.gte(20) || player.E.EclipseTier.gte(7)) && player.Sol.tab == "Core"}
    },
    22: {
      display() {return `<h3>Sub: Wall Of Checks </h3>`},
      onClick() {if (player.Sol.tab == "Core") player.Sol.sub = "WoC"},
      canClick() {return true},
      style() {return {
        "width": "120px",
        "height": "40px",
        }},  
      unlocked() {return player.E.EclipseTier.gte(7) && player.Sol.tab == "Core"}
    },
    23: {
      display() {return `<h3>Sub: Solar Bursting </h3>`},
      onClick() {if (player.Sol.tab == "Core") player.Sol.sub = "Bursting"},
      canClick() {return true},
      style() {return {
        "width": "100px",
        "height": "40px",
        }},  
      unlocked() {return player.Sol.TBCore.x.gte(3) && player.Sol.tab == "Core"},
    },
 
// the UI thing for solaritology
111: {
  display() {
    let short = ""
    if (player.Sol.selected == "TMSun") short = `TMS`
    else if (player.Sol.selected == "TRMoon") short = `TRM`
    else if (player.Sol.selected == "TBSun") short = `TBE`

    return `<h2>Decrease ${short == "" ? "[???]" : short + "'s"} Difficulty by 1</h2>`},
  onClick() {
    let currentActive = player.Sol.selected
    if ( player.Sol[currentActive].pending.gt(0)) player.Sol[currentActive].pending = player.Sol[currentActive].pending.sub(1)
  },
  canClick() {
        if (Selecting("pending").neq(0)) return true
  },
  style() {return {
    "width": "130px",
    "height": "40px",
    }},  
  unlocked() {return player.Sol.selected != "" && player.Sol.selected != "TBCore" && player.Sol.sub == "WoC" && player.Sol[player.Sol.selected].active == false}
},

112: {
  display() {

      let incNum = 1.35 / 59
      let base = 34
      let coreDiff = toNumber(getCoreDifficulty())
      const time = new Date();
      if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) base = base + (6.25 * (coreDiff - 1))
      //if (player.Sol.TBCore.active && getCoreDifficulty().eq(3)) base = base + 0. 
      let Coregoal = base + (time.getMinutes() ** 1.085 * incNum)

  let TMSun = player.Sol.TMSun.x
    let TRMoon = player.Sol.TRMoon.x
    let TBSun = player.Sol.TBSun.x
    let TBCore = player.Sol.TBCore.x

    let TMSunP = player.Sol.TMSun.pending
    let TRMoonP = player.Sol.TRMoon.pending
    let TBSunP = player.Sol.TBSun.pending
    let TBCoreP = player.Sol.TBCore.pending




    let TRMoonReq = player.Sol["TRMoon"].active ? new Decimal(47).sub((TRMoon.plus(TRMoonP)).mul(3.5)).round().plus(TRMoon.plus(TRMoonP).sub(2).clampMin(0).mul(1.75).round()) : 30
    let TBEclReq = player.Sol["TBSun"].active ? new Decimal("5e430").div((TBSun.plus(TBSunP)).pow_base(3)) : 40
    let TMSunReq = player.Sol["TMSun"].active ? new Decimal(1250).mul((TMSun.plus(TMSunP)).pow_base(3.2222).round()) : 40

    if (TMSun.plus(TMSunP).gte(5)) TMSunReq = new Decimal(7.58e5)
    if (TRMoon.plus(TRMoonP).gte(5)) TRMoonReq = new Decimal(30)
    if (TBSun.plus(TBSunP).gte(5)) TBEclReq = new Decimal("1.11e546")

    if (!Selecting("active")) return `<h2>Begin studying the celestial bodies...</h2>`
    else {
      if (player.C.CenterPoints.lt(TRMoonReq) && player.Sol["TRMoon"].active) return `<h2>Goal: ${TRMoonReq} Center points </h2>`
      else if (player.points.lt(TBEclReq) && player.Sol["TBSun"].active) return `<h2>Goal: ${format(TBEclReq)} Solarity </h2>`
      else if (player.GL.Solar_Shards.lt(TMSunReq) && player.Sol["TMSun"].active) return `<h2>Goal: ${format(TMSunReq)} Solar Shards </h2>`
      else if (player.Sol["TBCore"].active && !player.points.log(20).gte(Coregoal)) return `<h2>Why did you do this...?</h2>`
      else return `<h2> Deem yourself knowledgeable...? </h2>`
    }
  },
  onClick() { 
    //Increase only if met requirements  

    let incNum = 1.35 / 59
      let base = 34
      let coreDiff = toNumber(getCoreDifficulty())
      const time = new Date();
      if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) base = base + (6.25 * (coreDiff - 1))
     // if (player.Sol.TBCore.active && getCoreDifficulty().eq(3)) base = base + 0.3
      let Coregoal = base + (time.getMinutes() ** 1.085 * incNum)

    //  if (player.Sol.TBCore.active && getCoreDifficulty().eq(3)) Coregoal = 50.92
       
    let TMSun = player.Sol.TMSun.x
    let TRMoon = player.Sol.TRMoon.x
    let TBSun = player.Sol.TBSun.x
    let TBCore = player.Sol.TBCore.x

    let TMSunP = player.Sol.TMSun.pending
    let TRMoonP = player.Sol.TRMoon.pending
    let TBSunP = player.Sol.TBSun.pending
    let TBCoreP = player.Sol.TBCore.pending
    let total_Difficulty = Selecting("x").plus(Selecting("pending"))
    let TRMoonReq = player.Sol["TRMoon"].active ? new Decimal(47).sub((TRMoon.plus(TRMoonP)).sub(1).mul(3.5).round()) : 30
    let TBSunReq = player.Sol["TBSun"].active ? new Decimal("5e430").div((TBSun.plus(TBSunP)).sub(1).pow_base(5.5e11)) : 40
    let TMSunReq = player.Sol["TMSun"].active ? new Decimal(1200).mul((TMSun.plus(TMSunP)).pow_base(3.25).round()) : 40
    let TBCore1Req = player.Sol["TBCore"].active ? Coregoal : 90


   if (TMSun.plus(TMSunP).gte(5)) TMSunReq = new Decimal(7.58e5)
    if (TRMoon.plus(TRMoonP).gte(5)) TRMoonReq = new Decimal(30)
    if (TBSun.plus(TBSunP).gte(5)) TBEclReq = new Decimal("1.11e546")

    // base = base.plus(getCoreDifficulty().sub(1).mul(10))

    let canLeave = false
    //Increase Melted sun requirements
    /*
    player.Sol[player.Sol.selected].active = true; layer2Reset()
    */

    //The Broken Core clear  
  if (player.Sol["TBCore"].active && tmp["Sol"].Custom["112"].canClick) {
    
      if (player.Sol["TBCore"].pending.eq(3)) doPopup("msg","...H-How~ What did you do…!? h-he wont like this...", "Solaris:",10) /* ...H-How~ What did you do… */
      else if (player.Sol["TBCore"].pending.eq(2)) doPopup("msg","You should probably give up at this point…", "Solaris:",10) 
      else if (player.Sol["TBCore"].pending.eq(1)) doPopup("msg","so… hows it going? Feeling the pain yet? It only gets worse from here…", "Solaris:",10)   

      player.Sol[player.Sol.selected].x = total_Difficulty
      player.Sol[player.Sol.selected].active = false
      player.Sol[player.Sol.selected].pending = new Decimal(0)
      player.Sol.selected = ""
   }
    // if player can complete the check
      // The Raging Moon clear
   else  if (player.C.CenterPoints.gte(TRMoonReq) && Selecting("pending").gte(1) && player.Sol["TRMoon"].active) 
    {
      player.Sol["TRMoon"].x = total_Difficulty
      player.Sol[player.Sol.selected].active = false
      player.Sol[player.Sol.selected].pending = new Decimal(0)
      player.Sol.selected = ""

    } 
      // The Bleeding Eclipse clear
    else if (player.points.gte(TBSunReq) && Selecting("pending").gte(1) && player.Sol["TBSun"].active) 
    {
      player.Sol["TBSun"].x = total_Difficulty 
      player.Sol[player.Sol.selected].active = false
     player.Sol[player.Sol.selected].pending = new Decimal(0)
      player.Sol.selected = ""

    } 
      // The Melted Sun clear
    else if (player.GL.Solar_Shards.gte(TMSunReq) && Selecting("pending").gte(1) && player.Sol["TMSun"].active) {
      player.Sol["TMSun"].x = total_Difficulty
      player.Sol[player.Sol.selected].active = false
      player.Sol[player.Sol.selected].pending = new Decimal(0)
      player.Sol.selected = ""

    } 

    //else quit the check
    else if (Selecting("active") && tmp["Sol"].Custom["112"].canClick) {
      
      if (player.C.CenterPoints.gte(TRMoonReq) && player.Sol["TRMoon"].active) canLeave = true
      else if (player.points.gte(TBSunReq) && player.Sol["TBSun"].active) canLeave = true
      else if (player.GL.Solar_Shards.gte(TMSunReq) && player.Sol["TMSun"].active) canLeave = true
      else if (player.points.log(20).gte(TBCore1Req) && player.Sol["TBCore"].active) canLeave = true


    if (Selecting("pending").gte(1) && Selecting("x").lte(0) && canLeave ) 
      { alert("Make sure to read the guide before entering a check!"); }
      player.Sol[player.Sol.selected].active = false
      player.Sol[player.Sol.selected].pending = new Decimal(0)
      player.Sol.selected = ""
      
      
      return;
    }
    //getCoreDifficulty()
    //start the Check thing
  if (Selecting("pending").gte(1) && !Selecting("active") && tmp["Sol"].Custom["112"].canClick) {
 
        if (!Selecting("active")) player.Sol[player.Sol.selected].active = true
            // reset down below

        layer2Reset()
        player.E.SolarCharge = player.E.SolarCharge.root(10)
        player.E.Solinity =  player.E.Solinity.root(10)
        player.E.Esolar = player.E.Esolar.root(10)
        player.E.Eclipsium = player.E.Eclipsium.root(2)
        player.E.TopLVL = Selecting("pending")
        player.L.Light = new Decimal(1)
        player.L.Dark = new Decimal(1)
        player.L.LunarPower = new Decimal(1)
        player.L.LightCheck = player.L.LightCheck.root(2).round()
        player.L.DarkCheck = player.L.DarkCheck.root(2).round()

        setBuyableAmount("E",12, new Decimal(0))              

       if (player.Sol.selected == "TBCore") switchTheme(themes[5])
        
  }

  }, //
  canClick() { 
      let incNum = 1.35 / 59
      let base = 34
      let coreDiff = toNumber(getCoreDifficulty())
      const time = new Date();
      if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) base = base + (6.25 * (coreDiff - 1))
      //if (player.Sol.TBCore.active && getCoreDifficulty().eq(3)) base = base + 0.3 
      
      /*
       
      */
      let goal = base + (time.getMinutes() ** 1.085 * incNum * coreDiff)
      
    if (getCoreDifficulty().gte(1)) moreDifficulty = new Decimal(10).mul(getCoreDifficulty())
    let TBCore1Req = player.Sol["TBCore"].active ? new Decimal(goal) : 90
                              
   
    if (player.Sol["TBCore"].active) return player.points.log(20).gte(TBCore1Req)
    else if (Selecting("active") && player.Sol["TBCore"].active) return player.points.log(20).gte(TBCore1Req)
    else if (Selecting("active") && !player.Sol["TBCore"].active) return true//Selecting("pending").gte(1)
                 // else return 
            return true        
  },
  style() {return {
    "width": "150px",
    "height": "40px",
    }},  
  unlocked() {
   if (player.Sol.sub == "WoC") return Selecting("pending").gte(1) || Selecting("active") }
},

113: {
  display() {
    let short = ""
    if (player.Sol.selected == "TMSun") short = "TMS"
    else if (player.Sol.selected == "TRMoon") short = "TRM"
    else if (player.Sol.selected == "TBSun") short = "TBE"

    return `<h2>Increase ${short == "" ? "[???]" : short + "'s"} Difficulty by 1</h2>`
  },
  onClick() {  
    let currentActive = player.Sol.selected
    if (currentActive == "TBCore" && Selecting("pending").lt(3) && tmp["Sol"].Custom[113].canClick ) {
      player.Sol["TBCore"].pending = player.Sol["TBCore"].pending.plus(1)

    }
    else if ( Selecting("pending").lt(5) && tmp["Sol"].Custom[113].canClick && currentActive != "TBCore" ) player.Sol[currentActive].pending = player.Sol[currentActive].pending.plus(1)
    
     },
  canClick() {
    let TBCore = player.Sol.TBCore.x
    let TBCoreP = player.Sol.TBCore.pending

    let noFurther = false
    let hasRequirements = false 



     if (player.Sol.selected != "TBCore" && player.Sol.selected != ""){
      if      (TBCore.eq(2) && ( Selecting("pending").plus(Selecting("x")).eq(5)  )) noFurther = true
      else if (TBCore.eq(1) && ( Selecting("pending").plus(Selecting("x")).eq(3)  )) noFurther = true
      else if (TBCore.eq(0) && ( Selecting("pending").plus(Selecting("x")).eq(2)  )) noFurther = true
     }
     else if (player.Sol.selected == "TBCore" && TBCore.plus(TBCoreP).eq(3)) noFurther = true

    //for debugging purposes only
    // return Selecting("pending").plus(Selecting("x")).neq(5) || TBCore.plus(TBCoreP).neq(3)
    return !noFurther 
  
  },
  style() {return {
    "width": "130px",
    "height": "40px",
    }},  
  unlocked() {
    
    let TBCore = player.Sol.TBCore.x
    let TBCoreP = player.Sol.TBCore.pending

    let TMSun = player.Sol.TMSun.x
    let TRMoon = player.Sol.TRMoon.x
    let TBSun = player.Sol.TBSun.x

    let TMSunP = player.Sol.TMSun.pending
    let TRMoonP = player.Sol.TRMoon.pending
    let TBSunP = player.Sol.TBSun.pending
    let noFurther = false
    let forceStart = false

    let totalDif = Selecting("pending").plus(Selecting("x"))

  
    
      if (player.Sol.selected == "TBCore" && (TBCoreP.eq(1) || TBCoreP.gte(1)) ){
        if      (TBCore.eq(2) && TMSun.gte(5) && TRMoon.gte(5) && TBSun.gte(5) ) forceStart = true
        else if (TBCore.eq(1) && TMSun.gte(3) && TRMoon.gte(3) && TBSun.gte(3) ) forceStart = true 
        else if (TBCore.eq(0) && TMSun.gte(2) && TRMoon.gte(2) && TBSun.gte(2) ) forceStart = true 
       // for debugging lol 
       // return  forceStart 
      
     }



    return !forceStart && player.Sol.selected != "" && player.Sol.sub == "WoC" && player.Sol[player.Sol.selected].active == false
      

    
  }
},

201: {
  display() {return `<h2>Go back</h2>`},
  onClick() { 
    if (player.Sol["TBCore"].pending.gte(1)) {
      if (player.youMust == 0 && player.Sol["TBCore"].x.gte(0)) {
        confirm(`...`);
        confirm(`feeling hesitant already?`); 
        confirm(`heh...`);
        confirm(`You're only delaying the inevitable...`); 
        confirm(`The only way to complete this is to...`);
        confirm(`Thrive in your own ambitions...`); player.youMust += 1}

      else if (player.youMust == 1 && player.Sol["TBCore"].x.gte(1)) {
        confirm(`...`);
        confirm(`I can tell you're having second thoughts.`); 
        confirm(`do you need a break? are you scared?`);
        confirm(`You're only delaying the inevitable...`); 
        confirm(`The core is all it takes...`);
        confirm(`Survive in your own challenges...`); player.youMust += 1}

      else if (player.youMust == 2 && player.Sol["TBCore"].x.gte(2)) {
        confirm(`...`);
        confirm(`you know, I don't know why you're so nervous... `); 
        confirm(`I mean... you came so far... `);
        confirm(`and you're stopping RIGHT at the best hard part`); 
        confirm(`where did all that motivation go...? were you not feeling it?`)
        confirm(`Just one more obstacle and you're free.`);
        confirm(`Undermine the solar realities that haunt you...`); player.youMust += 1}  
        
        confirm(`You must go on... worry not any longer...`)
        confirm(`Worry no longer...`)

    }
    player.Sol[player.Sol.selected].pending = new Decimal(0)
    player.Sol.selected = ""
  },
  canClick() {return true},
  style() {return {
    "width": "125px",
    "height": "40px",
    }},  
  unlocked() {
   
    
    return player.Sol.selected != "" && player.Sol.sub == "WoC" && player.Sol[player.Sol.selected].active == false}
},

//player.Sol.selected = ""

  },
  
Reset: {
    11: {
      display() {         
        let nBAR = ``
         let CRNG = new Decimal(player.Sol.CRNG)
          let CurrentCPBoost = player["Sol"].Aperativity.clampMin(1).log(10)
          let ifResetNow = tmp["Sol"].Reset[11].gain
          let harshCap_Start = new Decimal(3)
          
          let newCPBoost = player["Sol"].Aperativity.plus(ifResetNow.clampMin(1)).log(10)
          let pre_harshcapBonus = newCPBoost


              let HarshCap_Viewer = newCPBoost        
              
        
    // 3 + (root2(x - 3))
 
        if (newCPBoost.gte(3)) newCPBoost = 
       new Decimal(harshCap_Start)
        .plus( 
        Decimal.root(pre_harshcapBonus.sub(harshCap_Start).plus(1), 4)
        .sub(1) ) 

   


        let preHarshCap_Notif = newCPBoost.gte(3) ? `<br>
        <h4 style="color:rgba(255, 98, 0, 0.99);"> Harshcapped: effect becomes root3(x); after ${harshCap_Start} </h4>
        <br>
        ` : ``

          let reductionAmount = CurrentCPBoost.sub(player.Sol.CPBoost)
      
          // I gave up on this, do NOT try to solve this please future me
          //  let lossPred = ifResetNow.gte(1) ? `This will increase by ${format(reductionAmount)} next Aperation... <br>` : ``  


        let postHarshCap_effect = CurrentCPBoost.gte(3) ? `
        <h5> You have lost ${format(CurrentCPBoost.sub(player.Sol.CPBoost))} of its effect <br>
        
        </h5>
        ` : ``
          
          let precCount = newCPBoost.gte(3) ? 3 : 2

          let SecondReset = CRNG.gte(10) ?  `Note: This will reset CRNG<br> ` : ``
          if (ifResetNow.gte(1) && CurrentCPBoost.gte(1)) nBAR = `CP Base will be increased ${format(player.Sol.CPBoost,precCount)} -> ${format(newCPBoost,precCount)}
          ${preHarshCap_Notif}
         
          `
        
          if (player.L.LunarPower.gte(100) || player.L.LunarEssence.gt(0)) return `
            Aperating will reset everything Lunar Restabalize does as well as Lightness and Darkness. Light/Dark check will be set back down to 1 for Aperativity<br> 
            <br> Aperating Requirements: LC and DC #6 or more. and at least 
            <br> You will earn ${format(tmp["Sol"].Reset[11].gain)} Aperativity before reset <br>
            ${nBAR} 
            ${postHarshCap_effect}
            <br>
            ${SecondReset}
                  
          `
        },     
      onClick() {
        
        player.Sol.Aperativity = player.Sol.Aperativity.plus(Reset("Sol",11).gain)
        
        EclipsiumReset("Solaris")
        player.L.LightCheck = new Decimal(1)
        player.L.DarkCheck = new Decimal(1)
        player.L.Light = new Decimal(1)
        player.L.Dark = new Decimal(1)
        player.L.LunarPower = new Decimal(0)                                              
        player.E.TopLVL = new Decimal(0)           
        
        CRNG = new Decimal()
        if (player.Sol.CRNG.gte(10)) player.Sol.CRNG = new Decimal(1)
        setClickableState("L", 41, false)
        setClickableState("L", 42, false)

      },
      canClick() {
        //let inAnyCheck = 
        if (player.L.LightCheck.gte(6) && player.L.DarkCheck.gte(6) && !Selecting("active")) return true},
      
      gain: () => { 
        let base = player.L.LightCheck.clampMin(1).mul(player.L.DarkCheck.clampMin(1)).log(3).div(player.Sol.Aperativity.clampMin(1).log(100).clampMin(1)) ; 
        let secondaryBoost = player.L.Light.mul(player.L.Dark).log(10).pow(0.5); 
        
        
        // additional bonuses here  
        if (TSolStones(2).unlocked) secondaryBoost = secondaryBoost.mul(TSolStones(2).effect)

          
        let aperationBonus = softcap(getBuyableAmount("Sol",12).pow_base(1.12), new Decimal(100000), 0.3 ) // normal softcap
          //(1e10 * (log10( x - 1e10 ))

            let harshcap_start = new Decimal(1e10)
            let harshcap_strength = new Decimal(10)
        if (aperationBonus.gte(harshcap_start)) aperationBonus = new Decimal(harshcap_start) // softcap^2
          .mul( 
          softcap(getBuyableAmount("Sol",12).pow_base(1.12), new Decimal(100000), 0.4 )
          .sub(harshcap_start).log(harshcap_strength) 
          )   

        if (getBuyableAmount("Sol",12).gte(1)) secondaryBoost = secondaryBoost.mul(aperationBonus)


        return base.mul(secondaryBoost)
      
      },
      button: () => { return !Selecting("active") ? `Aperate!` : `Can't Aperate while studying...` },
      unlocked() {
         return player.Sol.tab == "Aparal" //this is the base unlock for Eclipse Tier 6
      },
  },          
 },

 Viewer: {
  11: {
    display() {
      /*
      let befReduceAP = tmp["Sol"].Reset[11].gain.gte(100) ? tmp["Sol"].Reset[11].gain.mul(player.Sol.Aperativity.clampMin(1).log(100).clampMin(1)) : new Decimal(1)
      let afterReduceAP = tmp["Sol"].Reset[11].gain

      let subAP = `<h2 style="color:rgba(159, 22, 22, 0.99);">-${format()} </h2>`
     */
      
      let TBSunPassive = ``
		  let TMSunPassive = ``
		  let TRMoonPassive = ``

		  if (player.Sol.TBSun.x.gte(5) && !options.SolarityInfo) TBSunPassive = `TBS 5: Multiply comp. effect increased 1.1 -> ${format(new Decimal(1.2).plus(player.resetTime.div(60).mul(0.01)),3)}<br>`
	    if (player.Sol.TMSun.x.gte(5) && !options.SolarityInfo) TMSunPassive = `TMS 5: Plasmate effect raised to ${format(new Decimal(1.1).plus(player.resetTime.div(60).mul(0.01)),3)}  <br>`
	    if (player.Sol.TRMoon.x.gte(5) && !options.SolarityInfo) TRMoonPassive = `TRM 5: Meta nerf starts +${format(new Decimal(50).plus(player.resetTime.div(60).mul(2),2) )} later     `
      let TimeSpentOn = !options.SolarityInfo ? `<br>You have ${formatTime(player.resetTime.div(60))} of Solar Time. (based on time since last reset)<br>
      ${player.Sol.TBSun.x.gte(5) || player.Sol.TMSun.x.gte(5) || player.Sol.TRMoon.x.gte(5) ? "Which boosts the following:<br>" : ""}
      
      ${TBSunPassive}
      ${TMSunPassive}
      ${TRMoonPassive}
      <br>
      ` : ``


      

      let Aperate = ``

      let harshcapText = player.Sol.CPBoost.gte(3) ? `<h4 style="color:rgba(255, 98, 0, 0.99);">(Harshcapped)</h4><br>` : ``

      let selfDivFormula = player.Sol.Aperativity.clampMin(1).log(100)
      let selfDiv = (selfDivFormula.gt(1)) ? ` However, 
      <h3 style="color:rgba(117, 150, 0, 0.27);">The Decaying Sun</h3> 
      is reducing Aperativity gain by 
      <h2 style="color:rgba(159, 22, 22, 0.99);"> ${format(selfDivFormula)} </h2> 
      <br>
      Resulting in a -${format(tmp["Sol"].Reset[11].gain.mul(selfDivFormula.clampMin(1)).sub(tmp["Sol"].Reset[11].gain))} Aperativity loss
      ` : 
      ``

      //softcap CPBoost when it passes 3

    //  if (player.Sol.CPBoost.gte(3)) 
      

      if (player.Sol.Aperativity.gt(0) || true) Aperate = `
      <h2> Aperativity Points: ${format(player.Sol.Aperativity)}<br></h2> 
      <h3> Aperativity increases CP compounding base by +${format(player.Sol.CPBoost)} </h3> <br>
      ${harshcapText}
      `

      let unrelated = `<span> On an unrelated note, your best highest Enlightenment levels is ${player["Sol"].peakEnl}. </span><br>Does this boost anything? nope! get rekt loser!`

      return `      
      ${Aperate}
      ${player.Sol.TBSun.x.gte(5) || player.Sol.TMSun.x.gte(5) || player.Sol.TRMoon.x.gte(5) ? TimeSpentOn : ""}

      ${selfDiv}

      `

    },
    unlocked() {
     return (player.Sol.tab == "Aparal" && (player.Sol.Aperativity.gte(1) || player.E.EclipseTier.gte(7)))
    }


  },

  // BRNG Milestones
  12: {
    
    display(getData) {
  
      let BRNG = player.Sol.BRNG
      const SolStones = {
        1: {
          unlocked: BRNG.gte(25),
          text: `>25 BRNG`,
          effect: BRNG.log(3).pow(2.5),
          reward: `Light/Dark generation`
        },
        //^(log10(BRNG)/100) of Lightness boosts itself []
        2: {
          unlocked: BRNG.gte(100),
          text: `>100 BRNG`,
          effect: BRNG.log(3).pow(4),
          reward: `Solarity gain cap`
        },
        3: {
          unlocked: BRNG.gte(250),
          text: `>250 BRNG`,
          effect: BRNG.log(7).pow_base(3).pow(1.5),
          reward: `Solar light cap`
        }, //^(log10(BRNG)/100) of Lightness boosts itself
        4: {
          unlocked: BRNG.gte(1000),
          text: `>1000 BRNG`,
          effect: BRNG.log(10).pow_base(2),
          reward: `Solinity, Esolar, and Chimera`
        },
        5: {
          unlocked: BRNG.gte(4500),
          text: `>4500 BRNG`,
          effect: BRNG.log(15).pow_base(4),
          reward: `Modifier Score`
        },
      } 
       

        let result = ``
              for (id in SolStones) {
                if (SolStones[id].unlocked) {
                result += `
                    <span style="border: 2px solid gray; display: inline-block;"> 
                      ${SolStones[id].text /*? Milestones[id].text : warn("missing text at" + id) */ }
                      <br>
                      Boost ${SolStones[id].reward ? SolStones[id].reward : ""} by ${format(SolStones[id].effect) }
                    </span>
                  <br><br>
                  `
                  
                } 
              }

              let nextUnlock = ``
                if (SolStones[5].unlocked) nextUnlock = ``
                else if (SolStones[4].unlocked) nextUnlock = `Next at 4500 BRNG`
                else if (SolStones[3].unlocked) nextUnlock = `Next at 1000 BRNG`
                else if (SolStones[2].unlocked) nextUnlock = `Next at 250 BRNG`
                else if (SolStones[1].unlocked) nextUnlock = `Next at 100 BRNG`
                
              
                  

      return getData ? SolStones : result != "" ? result : result = `<h3> Unlock at 25 BRNG </h3>`;
 
      
   
    },
    
    style() {
      return {
          "border": "2px solid gray",
					"display": "inline-block",
					"font-size": "12px",
					"background-color":"#202021",	
					"padding": "15px",
					"width": "164px",
      }
    },

    unlocked() {
     return (player.Sol.tab == "RNG" )
    },

    forceColumn: true
  },

  13: {
    
    display() { 
     // let CRNG = new Decimal(1 / RawRNG)
      
      let spentAP = player.Sol.Aperativity.div(10)
      let boosted = Roll.Amount > 0 ? spentAP.root(3) : new Decimal(1)

      let isRolling = isNaN(player.Sol.CRNG)

      let QuantifyBonus = (player.Sol.MNG.Quantify.plus(1).pow_base(1.1).pow(2))
      
      //
      
      let basicDisplays = `
       <span> 
            <h3>CRNG: ${ isRolling ? 'Rolling...' : format(player.Sol.CRNG) }</h3><br>
            Raw: ${RawRNG} <br>
            ${!Roll.active && Roll.Amount > 1 ? "Before Bonus: " + format(Roll.trueVal) + `<br><br>`: ""}
            <br>
            <h3>BRNG: ${format(player.Sol.BRNG)}</h3>
           <br>
           <h4> ${Roll.active && boosted.gt(1)? "CRNG boosted by " + format(boosted) + " (based on spent Aperativity) " : ""} </h4>
           
          <br> <h4> ${player.Sol.TRNG.gt(1) ? "TRNG: " + format(player.Sol.TRNG) : ""} </h4>
          ${!Roll.active && Roll.Amount > 0 && player.Sol.MNG.Quantify.gte(1) ? "(+" + format(player.Sol.CRNG.mul(QuantifyBonus)) + ")" : ""}
          <br>


       </span>
       ` 


       let canRoll = (Roll.cooldown <= 0 ) ? `Roll again!` : `Cooldown: ${Math.ceil(Roll.cooldown)}`
       if (player.Sol.Aperativity.lte(15)) canRoll = `Cannot Roll: Aperativity is too low`


       let roller = `
          <span>
            <button style="width:224px" onclick="Roll.cooldown <= 0 && player.Sol.Aperativity.gt(15) ? tmp['Sol'].Viewer[13].rollAP() : 0"; > ${(canRoll)} </button>

          </span>
       `
        
      return basicDisplays + roller
 
    },
    
    async rollAP() { 
  
        // set values
        let spentAP = player.Sol.Aperativity.div(10)
        let boosted = Roll.Amount > 0 ? spentAP.root(3) : new Decimal(1)


        //turn on Roll
        Roll.active = true
        roll()
        
        //wait for animation to be over
        await delay(100 + ((100 + player.Sol.MNG.Rans) * Roll.baseCoolDown ) * (simulated.length) )
        //boost TRNG

        let QuantifyBonus = player.Sol.MNG.Quantify.gte(1) ? (player.Sol.MNG.Quantify.plus(1).pow_base(1.1).pow(2)) : 1


       
       


        //set CRNG
        player.Sol.CRNG = new Decimal(1 / RawRNG)
        Roll.trueVal = player.Sol.CRNG
        if (player.Sol.Aperativity.gte(15)) player.Sol.CRNG = player.Sol.CRNG.mul(boosted)
        if (player.Sol.MNG.Elevate.gte(1))  player.Sol.CRNG = player.Sol.CRNG.mul(player.Sol.MNG.Elevate.pow_base(1.2).mul(1.5))
        

        // add TRNG 
        player.Sol.TRNG = player.Sol.TRNG.plus(player.Sol.CRNG.mul(QuantifyBonus))  

        //detect for BRNG
        if (player.Sol.CRNG.gt(player.Sol.BRNG)) player.Sol.BRNG = player.Sol.CRNG

        //spend AP
        player.Sol.Aperativity = player.Sol.Aperativity.sub(spentAP) 
        Roll.Amount += 1

        //finish rolling
        Roll.active = false

       
    },

    style() {
      return {
          "border": "2px solid gray",
					"display": "inline-block",
					"font-size": "12px",
					"background-color":"#202021",	
					"padding": "15px",
					"width": "224px",
      }
    },

    unlocked() {
     return (player.Sol.tab == "RNG")
    },
    forceColumn: true
  },

  14: {
    
    display(getData) {

      let CRNG = new Decimal(player.Sol.CRNG)
      let TRNG = player.Sol.TRNG
      const TSolStones = {
        1: {
          unlocked: TRNG.gte(10) || player.Sol.MNG.Total.gte(1),
          text: `TRNG-1`,
          effect: TRNG.pow(2),
          reward: `Boost Solarity gain`
        },
        2: {
          unlocked: TRNG.gte(30) || player.Sol.MNG.Total.gte(1),
          text: `TRNG-2`,
          effect: CRNG.log(7).pow(1.25).clampMin(1),
          reward: `Boost Aperature Points gain`
        },
        3: {
          unlocked: TRNG.gte(100) || player.Sol.MNG.Total.gte(1),
          text: `TRNG-3`,
          reward: `Unlock MNG`
        },
        4: {
          unlocked: TRNG.gte(500) && player.Sol.MNG.Total.gte(1),
          text: `TRNG-4`,
          effect: TRNG.div(500).root(1.25),
          reward: `Boost Lunar Abnormality generations`
        },
        5: {
          unlocked: TRNG.gte(1000) && player.Sol.MNG.Total.gte(1),
          text: `TRNG-5`,
          effect: TRNG.div(1000).root(2).mul(1.5),
          reward: `Add free center points`
        },
        6: {
          unlocked: TRNG.gte(100000) && player.Sol.MNG.Total.gte(1),      
          text: `TRNG-6`,
          effect: TRNG.div(100000).root(1.25),
          reward: ``
        },
      } 
       

        let result = ``
              for (id in TSolStones) {
                if (TSolStones[id].unlocked) {
                result += `
                    <span style="border: 2px solid gray; display: inline-block;"> 
                     <h3> ${TSolStones[id].text } </h3>
                      <br>
                      ${TSolStones[id].reward ? TSolStones[id].reward : ""} ${(TSolStones[id].effect ) ? " by " + format(TSolStones[id].effect) : ""} 
                      ${id == 2 ? " (Based on CRNG)" : ""}
                      </span>
                  <br><br>
                  `
                } 
              }
          let nextUnlock = ``
                if (TSolStones[5].unlocked) nextUnlock = `Next at 100000 TRNG`
                else if (TSolStones[4].unlocked) nextUnlock = `Next at 1000 TRNG`
                else if (TSolStones[3].unlocked) nextUnlock = `Next at 500 TRNG`
                else if (TSolStones[2].unlocked) nextUnlock = `Next at 100 TRNG`
                else if (TSolStones[1].unlocked) nextUnlock = `Next at 30 TRNG`
                 

         // if (getData == TSolStones[3].effect && TSolStones[3].effect == undefined) alert("hey! This id doesn't have an effect!");    
      return getData ? TSolStones : result != "" ? result + nextUnlock : result = `<h3> Unlock at 10 TRNG </h3>`;
 
      
   
    },
    
    style() {
      return {
          "border": "2px solid gray",
					"display": "inline-block",
					"font-size": "12px",
					"background-color":"#202021",	
					"padding": "15px",
					"width": "164px",
      }
    },

    unlocked() {
     return (player.Sol.tab == "RNG")
    },

    forceColumn: true
  },

//<button> Roll BRNG </button>
 


21: {
  display() {
    let E1 = ``
    let E2 = ``
    let E3 = ``
    let SE1 = ``
    let SE2 = ``
    // 
    let HeirarchyBonusBoost = softcap((player.Sol.SolarHeat.sub(50)).pow_base(1.02) ,new Decimal(1e30), 0.35 )
    let reduced = (player.Sol.SolarHeat.sub(50)).pow_base(1.02).gte(1e30) ? `<h5> (reduced) </h5>` : ``
    if (player.Sol.SolarHeat.gt(1)) E1 = `${format(player.Sol.SolarHeat.pow(3.75))} to solarity gain cap <br>`
    if (player.Sol.SolarHeat.gte(50)) E2 = `${format(HeirarchyBonusBoost)} to Heirarchy's effect <br> ${reduced}`

    if (player.Sol.SolarHeat.gt(1)) E3 = ` <h4 style="color:rgba(159, 22, 22, 0.99);">/${format((player.Sol.SolarHeat.sub(1).root(2.5)).pow_base(1.02))}</h4> to modifier score  ` 

    if (player.Sol.SolarHeat.gt(1)) SE1 = `${format(player.Sol.SolarFragments.pow(2.4))} to SR Gain <br>`
    if (player.Sol.SolarHeat.gt(1)) SE2 = `${format(player.Sol.SolarFragments.log(10).div(100))} to SR Exponent <br>`
    // player.Sol.SolarFragments.pow(2.4) 

    // player.Sol.SolarFragments.log(10).div(100) //from Solar Fragments, which increase SR exponent


    

    let Bonuses = `
     <span style="border: 2px solid gray; display: inline-block; padding: 6px;">
          <h3> Solar Heat Bonuses: </h3> <br>    
            ${E1}
            ${E2}
            ${E3}
      </span>

      <span style="border: 2px solid gray; display: inline-block; padding: 6px;">
          <h3> Solar Fragments Bonuses: </h3> <br> 
            ${SE1}
            ${SE2}
      </span>
     
    `
   
    let tutorial = ``

    if (player.Sol.SolarHeat.gt(1) && player.Sol.SolarFragments.lte(1)) tutorial = `*burp*<br>`

    else if (player.Sol.SolarHeat.eq(1) && player.Sol.SolarFragments.eq(1)) tutorial = `<p> click on an object to begin Generating it! </p> <br>(Note that starting generation is similar to doing a convertary reset)<br>`

    else tutorial = ``


    return `
      
    ${tutorial}
    <span style="border: 2px solid gray; display: inline-block; padding: 6px;">      
      <h3>
        ${format(player.Sol.SolarHeat)} Solar Heat. <br>
        ${format(player.Sol.SolarFragments)} Solar fragments <br>
        </h3>
    </span>

    ${Bonuses}


    `
  },

  unlocked() {
   return (player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" && player.Sol.Heliosphere)
  },
 style() {
      return {
          "border": "2px solid gray",
					"display": "inline-block",
					"font-size": "12px",
					"background-color":"#202021",	
					"padding": "15px",
					"width": "600px",
      }
    },

 


},
/*
 let TMSun = player.Sol.TMSun.x
    let TRMoon = player.Sol.TRMoon.x
    let TBSun = player.Sol.TBSun.x
    let TBCore = player.Sol.TBCore.x

    let TMSunP = player.Sol.TMSun.pending
    let TRMoonP = player.Sol.TRMoon.pending
    let TBSunP = player.Sol.TBSun.pending
    let TBCoreP = player.Sol.TBCore.pending

    TMSun.neq(TMSunP)
*/


31: {
  display() {
    let TMSun = player.Sol.TMSun.x
    let TRMoon = player.Sol.TRMoon.x
    let TBSun = player.Sol.TBSun.x
    let TBCore = player.Sol.TBCore.x

    let TMSunP = player.Sol.TMSun.pending
    let TRMoonP = player.Sol.TRMoon.pending
    let TBSunP = player.Sol.TBSun.pending
    let TBCoreP = player.Sol.TBCore.pending

   

    let choosingScale = Selecting("pending") == undefined ? new Decimal(0) : Selecting("pending").plus(Selecting("x"))
    let BC_Influence = ``
    //if (player.Sol.selected != "")  choosingScale = player.Sol[player.Sol.selected].pending  
 
    const TMSDebuff = [
      `- Solar light cap and modifier score is capped to ${format(new Decimal(100000).div(choosingScale.sub(1).pow_base(10)))} <br>`
      ,
      `- Solarity gain cap is rooted to ${format(new Decimal(5).pow(choosingScale.div(15)).plus(choosingScale.sub(2)) )} <br>`
      ,
      `- Multiply’s effect is capped to Plasmates effect <br>`
    ]
    const TRMDebuff = [
      `- CP requirement scaling is increased by ${format(choosingScale.pow_base(1.1).mul(100).sub(100))}% <br>`
      ,
      `- Phaser’s cost scaling is Overhauled to ${choosingScale}^x <br>`
      ,
      `- Plasmates and Multiply's cost scalings are completely Overhaulled to 5^x But Meta nerf is disabled <br>`
    ]
    const TBSDebuff = [
      `- Lunar Inst. debuff is significantly stronger (^${format(choosingScale.mul(2).plus(1))}) <br>`
      ,
      `- Lunar Inst. debuff also affects SR gain and Solar Shards gain (^${format(choosingScale.div(11))}) <br>`
      ,
      `- Lunar Inst. debuff also affects Plasmates and Multiply (^0.27)<br>`
    ]
    const TBCDebuff = [
          `> Convertary resets CP layer, and Centralizing resets SL Layer. <br>`
          , // Why do i suddenly feel... vacuous?
          `>> All upgrads acts as special kind of reset when bought <br>` // SL: (roots its currency by 5), C: Divides Center Points by 2 
          , // These bonuses... are they all a lie? or am I staggering?
          `>>> Formality, Heirarchy, and Twilight are all active at once. in addition, ALL other pre-check measures are active<br>
          
          `
            // I just... dont believe in myself anymore... The pressure of the core, is it too much for us to handle?
    ]
    //NON-QOL BONUS



    const TMSBuff = [
          `^${decimalOne.plus(TMSun.mul(0.15))} to Solar light cap and Shards (Gen. AND Mult.)<br>`
          , //hasMilestone("E",5)
          `(1) +${(TMSun.sub(2).mul(0.02))} to Eclipsium's effect base. <br>(2) Move eclipsium's effect cap is ${format(new Decimal(1e10).mul(TMSun.sub(2).pow_base(4.6415e16)),1 )} <br>`
          ,
          `Solar Time raises Plasmate's effect <br>`      

    ]
    const TRMBuff = [
          `-${TRMoon.mul(0.02)} to CP cost scaling requirement <br>`
          ,
          `-${TRMoon.sub(2).mul(0.02)} to Phasers cost scaling<br>`
          , 
          `Solar Time makes Meta nerf start later</b><br>`

    ]
    const TBSBuff = [
       `^${format(new Decimal(0.9).pow(TBSun))} to Lunar Inst. debuff <br>`
          ,
       `+${format(TBSun.sub(2).mul(0.1),1)} Solar light to Solar shard conversion rate exponent <br>`
          ,
          `Solar Time increases Multiply's base</b>`
    ]

    const TBCoreBuff = [
      
      `Solar Shard gain and Effector Tier Effects is ^${format(decimalOne.plus((TBCore.mul(0.25)).mul(new Decimal(1.5).pow_base(TBCore))),2)}<br>`,
      `(1) Unlock <b>Adaptability</b> and Improve Jear paths <br>(2) Unlock darkness tree's row 3 upgrade paths<br>`,
      `<br>The Solar Clock bonus effects are 25% stronger`
      // or ``
    ]
//player.Sol["TBSun"].x.gte(3)
     const ProjectedTMSBuff = [
         `^${decimalOne.plus(TMSunP.plus(TMSun).mul(0.15))} to Solar light cap and Shards (Gen. AND Mult.)<br>`
          ,
          `(1) +${(TMSun.plus(TMSunP).sub(2).mul(0.02))}  to Eclipsium's effect base. <br>(2) Move eclipsium's effect cap is ${format(new Decimal(1e10).mul(TMSunP.sub(2).plus(TMSun).pow_base(4.6415e16)),1 )} <br>`
          ,
          `Solar Time raises Plasmate's effect [^1.1] +0.01/min</b><br>`      

    ]
    const ProjectedTRMBuff = [
       ` -${TRMoon.plus(TRMoonP).mul(0.02)} to CP cost scaling requirement <br>`
          ,
          `-${TRMoon.plus(TRMoonP).sub(2).mul(0.02)} to Phasers cost scaling <br>`
          ,
          `Solar Time makes Meta nerf start later [+50] +3/min<br>`

    ]
    const ProjectedTBSunBuff = [
       `^${format(new Decimal(0.9).pow(TBSun.plus(TBSunP)))} to Lunar Inst. debuff <br>`
          ,
       `+${format(TBSun.plus(TBSunP).sub(2).mul(0.1),1)} Solar light to Solar shard conversion rate exponent <br>`
          ,
       `Solar Time increases Multiply's base [+0.1] +0.01/min`
    ] 
 
    const ProjectedTBCoreBuff = [      
       `Solar shards and Effector Tiers effects is raised ${format(decimalOne.plus((getCoreDifficulty().mul(0.25)).mul(new Decimal(1.5).pow_base(getCoreDifficulty()))),2)} <br>`,
       `(1) Unlock <b>Adaptability</b> and Improve Jear paths <br>(2) Unlock darkness tree's row 3 upgrade paths<br>`,
       `???` //Night time effects are more raised by ^1.25 rather than x1.25
       // if (player.Sol["TBCore"].x.gte(3)) effect*1.25 
    ]

    if (TBCore.plus(TBCoreP).eq(2)) BC_Influence = `
    <h3> Broken core's influence: </h3><br>
    TMS2 and TBE3 is active <br><br>
      <span style='color:rgba(170, 186, 2, 0.99)';> 
        (caps Solar light and Modifier score to 10,000) <br> 
        (Lunar inst. debuff is raised to ^7, and affects Solar Ray's and Solar Shards gain by ^0.27) <br> 
        </span>
    `
    else if (TBCore.plus(TBCoreP).eq(1)) BC_Influence = `
      <h3> Broken core's influence: </h3><br>
      TMS1 and TRM2 is active <br><br>
      <span style='color:rgba(0, 133, 2, 0.99)';>  
        (caps Solar light and Modifier score to 100,000) <br> 
        (increases CP scale by 21%) </span>
      `

    // Leverage, Gravitation, Heirarchy, Solar Ray bonuses are disabled. 

  //player.Sol.selected == "TMSun"
    let type = ``
     {
      if (player.Sol.selected == "TMSun") {
        type = `
            <span> 
              <h2> The Melted Sun ( ${TMSun} / 5 ) </h2>
            </span>
            <br>
              
             Pre-check measures: Leverage and Gravitation is disabled. Convertary is also disabled <br> 
             <h3>
             <span style='color:rgba(80, 44, 225, 0.99)';>
            ${ choosingScale.gte(1) ? TMSDebuff[0] : ""   }
            ${ choosingScale.gte(3) ? TMSDebuff[1] : ""   }
            ${ choosingScale.gte(5) ? TMSDebuff[2] : ""   }
            </span>
             </h3>
            `
      } else if (player.Sol.selected == "TRMoon") {
        type = `
            <span> 
              <h2> The Raging Moon ( ${TRMoon} / 5 ) </h2>
              
            <br>
             Pre-Check measures: Heirarchy is disabled.<br>
              <h3>
                <span style='color:rgba(114, 15, 53, 0.99)';>
                  ${ choosingScale.gte(1) ? TRMDebuff[0] : ""   }
                  ${ choosingScale.gte(3) ? TRMDebuff[1] : ""   }
                  ${ choosingScale.gte(5) ? TRMDebuff[2] : ""   }
              </h3>  
            </span>
            `
      } else if (player.Sol.selected == "TBSun") {
        type = `
            <span> 
              <h2> The Bleeding Sun ( ${TBSun} / 5 ) </h2>
            </span>
            <br>
            Pre-check measures: The Solar ray bonuses are disabled <br>
              <h3>
              <span style='color:rgba(145, 76, 41, 0.99)';>
            ${ choosingScale.gte(1) ? TBSDebuff[0] : ""   }
            ${ choosingScale.gte(3) ? TBSDebuff[1] : ""   }
            ${ choosingScale.gte(5) ? TBSDebuff[2] : ""   }
               </span>
              </h3> 
            `
      } else if (player.Sol.selected == "TBCore") { // player.Sol.TMSun.x.sub(2).mul(0.02)
        let badRays = ``
         
         if (TBCore.eq(2)) badRays = `Solarity gain is nerfed to ^0.85`
         else if (TBCore.eq(1)) badRays = `Solar Rays exponent boost instead does nothing`
         else if (TBCore.eq(0)) badRays = `Solar Rays exponent boost is capped to 1.5 instead of 3`
        
          let CoreType = `Broken`


          let AllPrecheckMeasure = `(ie. <p style='color:rgba(152, 157, 11, 0.99)'>Leverage, Gravitation</p>, <p  style='color:rgba(83, 69, 88, 0.99)'>Heirarchy</p> and <p style='color:rgba(218, 80, 0, 0.99)'>Solar Ray bonuses</p> are disabled)`

        type = `
            <span> 
              <h2> The Broken Core ( ${TBCore} / 3 ) </h2>
            </span>
            <br>
             
             Pre-check measures (I): All other check upgrades and effects are disabled,  <br>
             ${TBCoreP.gte(1) && TBCoreP.plus(TBCore).gte(2) ? "Pre-check measures (II): Dark and Light generations are heavily weakened (^0.02) <br>" : ""} 
             ${TBCoreP.gte(1) && TBCoreP.plus(TBCore).gte(3) ? "Pre-check measures (III): The first bonus effects of the first three studies are also disabled<br>" : ""} 
              <br><h3>
              Unstable core influence: ${badRays}<br>
              <span style='color:rgba(255, 0, 0, 0.99)';>
                ${ choosingScale.gte(1) ? TBCDebuff[0] : ""   }
                ${ choosingScale.gte(2) ? TBCDebuff[1] : ""   }
                ${ choosingScale.gte(3) ? TBCDebuff[2] : ""   }
                
                </span>
              </h3>
              ${ choosingScale.gte(3) ? AllPrecheckMeasure : ""}
            <br>
            ${BC_Influence}
         </span>
            `
      } //player.Sol.TRMoon.x
  } 
//TRMoon.gte(1)
  let unknown=``

const buffColor = 'rgba(100, 222, 0, 0.99)';
const projectedBuffColor = 'rgba(255, 226, 60, 0.99)';


let no1st = TBCoreP.plus(TBCore).gte(3) && player.Sol.selected == "TBCore"? s : ``
let e_no1st = TBCoreP.plus(TBCore).gte(3) && player.Sol.selected == "TBCore"? _s : ``

let noBonus = TBCoreP.plus(TBCore).gte(3)

  let totalBonus = `
 
      <span style="border: 2px solid gray; display: inline-block; padding: 0.1cm"> 
          All possible bonus effects: <br>
    ${ TMSun.eq(0) ? "???<br>" : ""}  
    <br>    
    ${ TMSun.gte(1) ? "<h3>The Melted Sun:</h3><br>" : ""} <h5>   
        ${no1st}  ${ TMSun.gte(1) && TMSunP.eq(0) ? " <span style='color:rgba(100, 222, 0, 0.99)';>" + TMSBuff[0] + " </span> " : unknown  } ${ TMSunP.gte(1) && TMSun.gte(0) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTMSBuff[0] + " </span>" : ""   }
        ${e_no1st}

          ${ TMSun.gte(3) && TMSunP.eq(0) ? " <span style='color:rgba(100, 222, 0, 0.99)';>" + TMSBuff[1] + " </span> " : unknown   } ${ TMSunP.gte(1) && TMSunP.plus(TMSun).gte(3) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTMSBuff[1] + " </span>" : ""   }
          
          ${ TMSun.gte(5) && TMSunP.eq(0) ? " <span style='color:rgba(120, 122, 254, 0.99)';>" + TMSBuff[2] + " </span> " : unknown  } ${ TMSunP.gte(1) && TMSunP.plus(TMSun).gte(5) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTMSBuff[2] + " </span>" : ""   }
        
        </h5>   
    ${ TRMoon.eq(0) ? "???<br>" : ""}
    <br>
    ${TRMoon.gte(1) ? "<h3>The Raging Moon:</h3><br>" : ""} <h5>
     ${no1st}  ${ TRMoon.gte(1) && TRMoonP.eq(0) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TRMBuff[0] + "</span>": unknown  } ${ TRMoonP.gte(1) && TRMoon.gte(0) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTRMBuff[0] + " </span>" : ""   }
     ${e_no1st} 
      ${ TRMoon.gte(3) && TRMoonP.eq(0) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TRMBuff[1] + "</span>": unknown  } ${ TRMoonP.gte(1) && TRMoonP.plus(TRMoon).gte(3) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTRMBuff[1] + " </span>" : ""   }
      
      ${ TRMoon.gte(5) && TRMoonP.eq(0) ? "<span style='color:rgba(120, 122, 254, 0.99)';>" + TRMBuff[2] + "</span>": unknown   } ${ TRMoonP.gte(1) && TRMoonP.plus(TRMoon).gte(5) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTRMBuff[2] + " </span>" : ""   }
    
      </h5> 
    ${ TBSun.eq(0) ? "???<br>" : ""}
    <br> 
    ${TBSun.gte(1) ? "<h3>The Bleeding Eclipse:</h3><br>" : ""}<h5>
      
    ${no1st}
     ${TBSun.gte(1) && TBSunP.eq(0) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBSBuff[0] + "</span>" : unknown   } ${ TBSunP.gte(1) && TBSun.gte(0) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTBSunBuff[0] + " </span>" : ""   }
    ${e_no1st}   

    ${ TBSun.gte(3) && TBSunP.eq(0) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBSBuff[1] + "</span>" : unknown   } ${ TBSunP.gte(1) && TBSunP.plus(TBSun).gte(3) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTBSunBuff[1] + " </span>" : ""   }
      
    ${ TBSun.gte(5) && TBSunP.eq(0) ? "<span style='color:rgba(120, 122, 254, 0.99)';>" + TBSBuff[2] + "</span>" : unknown   } ${ TBSunP.gte(1) && TBSunP.plus(TBSun).gte(5) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTBSunBuff[2] + " </span>" : ""   }
    
    </h5> 
     ${ TBCore.eq(0) ? "???<br>" : ""}
    <br>
    ${TBCore.gte(1) ? "<h3>The Broken Core:</h3><br>" : ""}<h5>
      ${ TBCore.gte(1) && TBCoreP.eq(0)? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBCoreBuff[0] + "</span>" : unknown   } ${ TBCoreP.gte(1) && TBCoreP.plus(TBCore).gte(1) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTBCoreBuff[0] + " </span>" : ""   }
      ${ TBCore.gte(2) && TBCoreP.eq(0)? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBCoreBuff[1] + "</span>" : unknown   } ${ TBCoreP.gte(1) && TBCoreP.plus(TBCore).gte(2) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTBCoreBuff[1] + " </span>" : ""   }
      ${ TBCore.gte(3) && TBCoreP.eq(0)? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBCoreBuff[2] + "</span>" : unknown   } ${ TBCoreP.gte(1) && TBCoreP.plus(TBCore).gte(3) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + ProjectedTBCoreBuff[2] + " </span>" : ""   }
    </h5> <br>
      </span>
       


  




      <span style="border: 2px solid gray; display: inline-block; padding: 0.1cm"> 
          All possible QoL effects: <br>
    ${ TMSun.eq(0) ? "???<br>" : ""}
    <br>
    ${TMSun.gte(1) ? "<h3>The Melted Sun:</h3><br>" : ""}<h5>
          ${ TMSun.gte(1) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TMSQoL[0] + " </span><br>" : unknown  } ${ TMSun.lte(1) && TMSunP.gte(1) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TMSQoL[0] + " </span>" : ""   }
          ${ TMSun.gte(3) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TMSQoL[1] + " </span>" : unknown  } ${ TMSunP.gte(3) || TMSun.plus(TMSunP).gte(3) && TMSun.lt(3) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TMSQoL[1] + " </span>" : ""   }
          ${ TMSun.gte(5) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TMSQoL[2] + " </span>" : unknown   } ${ TMSunP.gte(5) || (TMSun.plus(TMSunP).eq(5) && TMSun.neq(5)) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TMSQoL[2] + " </span>" : ""   } 
        </h5>
    ${ TRMoon.eq(0) ? "???<br>" : ""}
    <br>
    ${ TRMoon.gte(1) ? "<h3>The Raging Moon:</h3><br>" : ""}<h5>
          ${ TRMoon.gte(1) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TRMQoL[0] + "</span><br>": unknown  } ${ TRMoon.lte(1) && TRMoonP.gte(1) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TRMQoL[0] + " </span>" : ""   }
          ${ TRMoon.gte(3) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TRMQoL[1] + "</span><br>": unknown   } ${ TRMoonP.gte(3) || TRMoon.plus(TRMoonP).gte(3) && TRMoon.lt(3) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TRMQoL[1] + " </span>" : ""   }
          ${ TRMoon.gte(5) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TRMQoL[2] + "</span><br>": unknown   } ${ TRMoonP.gte(5) || (TRMoon.plus(TRMoonP).eq(5) && TRMoon.neq(5)) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TRMQoL[2] + " </span>" : ""   }
        </h5>
    ${ TBSun.eq(0) ? "???<br>" : ""}
    <br>
    ${ TBSun.gte(1) ? "<h3>The Bleeding Eclipse:</h3><br>" : ""}<h5>   
          ${ TBSun.gte(1) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBSQoL[0] + "</span><br>" : unknown   } ${ TBSun.lte(1) && TBSunP.gte(1) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TBSQoL[0] + " </span>" : ""   }
          ${ TBSun.gte(3) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBSQoL[1] + "</span><br>" : unknown   } ${ TBSunP.gte(3) || TBSun.plus(TBSunP).gte(3) && TBSun.lt(3) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TBSQoL[1] + " </span>" : ""   }
          ${ TBSun.gte(5) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBSQoL[2] + "</span><br>" : unknown  }  ${ TBSunP.gte(5) || (TBSun.plus(TBSunP).eq(5) && TBSun.neq(5)) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TBSQoL[2] + " </span>" : ""   }
        </h5>
    ${ TBCore.eq(0) ? "???<br>" : ""}
    <br>
    ${ TBCore.gte(1) ? "<h3>The Broken Core:</h3><br>" : ""}<h5>

          ${ TBCore.gte(1) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBCQoL[0] + "</span><br>" : unknown   } ${ TBCoreP.plus(TBCore).eq(1) && TBCoreP.gte(1) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TBCQoL[0] + " </span>" : ""   }
          ${ TBCore.gte(2) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBCQoL[1] + "</span><br>" : unknown   } ${ TBCoreP.gte(2) || TBCore.plus(TBCoreP).gte(2) && TBCore.lt(2) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TBCQoL[1] + " </span>" : ""   }
          ${ TBCore.gte(3) ? "<span style='color:rgba(100, 222, 0, 0.99)';>" + TBCQoL[2] + "</span><br>" : unknown   } ${ TBCoreP.gte(3) || TBCore.plus(TBCoreP).gte(3) && TBCore.lt(3) ? "<span style='color:rgba(255, 226, 60, 0.99)';>" + TBCQoL[2] + " </span>" : ""   }
        </h5> <br>
      </span>

      ${TBCore.eq(3) ? "<h5> You're Ready... </h5>" : ""}
    `
  //TMSQoL , TRMQoL , TBSQoL


    let stats = `
    <h3>${TMSun.gte(1) ? "Melted Sun " + TMSun : "Melted Sun Ø"}, ${TRMoon.gte(1) ? "Raging Moon " + TRMoon : "Raging Moon Ø"}, ${TBSun.gte(1) ? "Bleeding Eclipse  " + TBSun : "Bleeding Eclipse Ø"} </h3>
    
    `


    //this is for v0.6 i think
    let confidence = ``
    if ( TBCoreP.plus(TBCore).eq(3) && TBCore.neq(3) ) confidence = `<b><span style='color:rgba(238, 187, 255, 0.99)';>Are you ready, cursor?</span></b>`

    return `
    Studies made: ${stats}

    <br><br>
    ${type}
      <br>
    ${totalBonus}
    ${confidence}
    `
  },

  unlocked() {
   return (player.Sol.sub == "WoC")
  },
 style() {
      return {
          "border": "2px solid gray",
					"display": "inline-block",
					"font-size": "12px",
					"background-color":"#202021",	
					"padding": "15px",
					"width": "600px",
      }
    },


},

41: {
    display() {
      /*
      let befReduceAP = tmp["Sol"].Reset[11].gain.gte(100) ? tmp["Sol"].Reset[11].gain.mul(player.Sol.Aperativity.clampMin(1).log(100).clampMin(1)) : new Decimal(1)
      let afterReduceAP = tmp["Sol"].Reset[11].gain

      let subAP = `<h2 style="color:rgba(159, 22, 22, 0.99);">-${format()} </h2>`
     */
      
   let showButton = ``
   let requirementsToBurst = new Decimal("1e800")


   let burstReqText = `<span>You will need to reach ${format(requirementsToBurst)} solarity to burst the sun. </span>`
 

   if (player.points.gte("1e800")) showButton = `<button class="Bursting"; style="background-color: #fff642; cursor: alias;" onclick="tmp['Sol'].Viewer[41].burstReset()";> 
          <h1 style='color: #be5117'> Burst the <span style="color: #816305"><u>SUN</u></span>.</h1>
          </button>
     `
                             // multiBurstAllowed
   if (player.Sol.testBurst && player.Sol.multiBurstAllowed==true) {
    showButton = `<button class="Bursting"; style="background-color: #fff642; cursor: alias;" onclick="tmp['Sol'].Viewer[41].burstReset()";> 
          <h1 style='color: #be5117'> Burst the Sun <span style="color: #816305"><u>AGAIN</u></span>.</h1>
          </button>
     `
    
    }
   else if (player.Sol.testBurst && player.Sol.multiBurstAllowed==false /*&& player.Sol.burstAmount.eq(1)*/) {showButton = `<button class="Bursting"; style="background-color: #fff642; cursor: not-allowed;"> 
   <h3 style='color: #be5117'>You have its attention.</h3>
          </button>
     `


      }
     return `<h1>The sun lies cacophonous...</h1>
     
     <br>
    <h3 style='color: #be5117'> Solar Bursting will reset </h3> <h3 style='color: #9c0909'> Solarity, Solar Rays, Center Points,Solar Light/Solar 
Shards ,Eclipsium, Solar Charge, Solinity-Chimera,Lunar Essence, Light/Dark Check, 
Lightness/Darkness, Aperature Points, CRNG/TRNG/BRNG, Solar Heat, Solar 
Fragments, NT1-3, DT1-3 and Upgrade checks 1-4 For a very large boost to solarity gain cap.
</span>
<br><br>
<b><h3>However, </h3><h3='color: rgb(165, 11, 11)'> Solar ray bonuses will be permanently removed furthermore, replaced with a static exponential boost of 1.5</h3> </b>
<br><br>
<span style='color: #be5117'> Bursting for the first* time will increase base solarity gain cap by 1e200, and will remove the first solarity roofcap. </span><br> <h6>*:(more Solar Burstings above 1 increases this by effect by e(100 * 1.146^(SB-1)^2), 
but gets <b><i><span style='color: #bd0000'> exponentially expensive.</span></b></i> <span style='color: #be5117'>but you’ll unlock this much later, despite impossible in this version). </h6></span></h5>
<br><br>

${burstReqText}
<br>
${showButton}
`

    },
    unlocked() {
     return (player.Sol.tab == "Core" && player.Sol.sub == "Bursting")
    },


    burstReset() {
      layer2Reset(true)
      player.E.Eclipsium = decimalZero
      player.E.forgotton = false

      /*
      Solarity, 
      Solar Rays, 
      Center Points,
      Solar Light/Solar Shards,
      Eclipsium,
      Checks 1,2,3,4
      */

        player.E.SolarCharge = new Decimal(1)
        player.E.Solinity = new Decimal(1)
        player.E.Esolar = new Decimal(1)
        player.E.Chimera = new Decimal(1)
      /*
       Solar Charge, 
       Solinity-Chimera,
      */

      player.L.LightCheck = new Decimal(1)
      player.L.DarkCheck = new Decimal(1)
      player.L.Light = new Decimal(1)
      player.L.Dark = new Decimal(1) 
        
      /*
        Lunar Essence, 
        Light/Dark Check, 
        Lightness/Darkness, 
      */



       player["Sol"].Aperativity = new Decimal(1)
                    
            
      
            
       player["Sol"].TRNG = new Decimal(1)
       player["Sol"].BRNG = new Decimal(1)
       player["Sol"].SRNG = new Decimal(0) //stored RNG?
                  
       player["Sol"].CRNG = new Decimal(1)         
       player["Sol"].SolarHeat = new Decimal(1)
       player["Sol"].SolarFragments = new Decimal(1)

       /*
         Aperature Points, 
       CRNG/TRNG/BRNG, 
       Solar Heat, 
       Solar Fragments, 
      */
      
      setBuyableAmount("L", 21, new Decimal(0) )
      setBuyableAmount("L", 22, new Decimal(0) )
      
      //and finally, DT, NT

      
     player.Sol.solarBurst = true
    
       

    }

 },

 },


 buyables: {
  11: {
    cost() {
      let scale = new Decimal(1.16)
      let base = new Decimal(30)
      let x = getBuyableAmount(this.layer,this.id)

      // scales at #33
      // adds 1.2^x scaling

      if ( getBuyableAmount(this.layer,this.id).gte(33)) base = base.mul(getBuyableAmount("Sol",11).sub(32).pow_base(1.2))


      let cost = base.mul(x.pow_base(scale))
     

      return cost;
    },

    cost2() {

      let scale = new Decimal(1.2)
      let base = new Decimal(30)
      let x = getBuyableAmount(this.layer,this.id)

      // scales at #33
      // adds 1.2^x scaling
      if ( getBuyableAmount(this.layer,this.id).gte(33)) base = base.mul(getBuyableAmount("Sol",11).sub(32).pow_base(1.2))
      let cost = base.mul(x.pow_base(scale))
      return cost

    },

    display() {
      
      let scaled = getBuyableAmount(this.layer,this.id).gte(33) ? `<span> Scaled: both costs are increased by ${getBuyableAmount("Sol",11).sub(32).pow_base(1.2)} </span>` : ``
      return `<h1> Innvation #${getBuyableAmount(this.layer,this.id)}</h1>
      +${getBuyableAmount(this.layer,this.id).div(100)} to Solar Fragments generation exponent base
      
      ${scaled}

      Cost: ${format(this.cost())} Solar heat and ${format(this.cost2())} Solar Fragments
      `
      
    },

    canAfford() {     
     return player.Sol.SolarHeat.gte(this.cost()) && player.Sol.SolarFragments.gte(this.cost2())
    },
    buy() {
      if (this.canAfford()) {
      
      player.Sol.SolarHeat = player.Sol.SolarHeat.sub(this.cost()) ; player.Sol.SolarFragments = player.Sol.SolarFragments.sub(this.cost2())
      addBuyables(this.layer, this.id, 1)
      }
    },
    effect() {
      let effect = decimalOne
      if (getBuyableAmount(this.layer,this.id).gte(1)) effect = getBuyableAmount(this.layer,this.id).div(100)
      return effect;
    },     
    unlocked() {
      return (player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" && player.Sol.Heliosphere)

    },
    style() {
      return {
        "width": "200px",
        "height": "125px",
        "border-radius": "5px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
     
  },

  12: {
    cost() {
      let scale = new Decimal(1.16)
      let base = new Decimal(35)
      let x = getBuyableAmount(this.layer,this.id)

    

      let cost = base.mul(scale.pow(x))
     

      return cost;
    },

    cost2() {

      let scale = new Decimal(1.19)
      let base = new Decimal(35)
      let x = getBuyableAmount(this.layer,this.id)

    

      let cost = base.mul(scale.pow(x))
      return cost

    },

    display() {
      // getBuyableAmount("Sol",12).pow_base(1.12)
      let softcaptxt = ``
      let softcaptxt2 = ``
      let aperationBonus = softcap(getBuyableAmount("Sol",12).pow_base(1.12), new Decimal(100000), 0.3 ) // normal softcap
          //(1e10 * (log10( x - 1e10 ))

          // 1e10.mul((x-1e10).log(10))
            let harshcap_start = new Decimal(1e10)
            let harshcap_strength = new Decimal(10)
        if (aperationBonus.gte(harshcap_start)) aperationBonus = new Decimal(harshcap_start) // softcap^2
          .mul( 
          softcap(getBuyableAmount("Sol",12).pow_base(1.12), new Decimal(100000), 0.4 )
          .sub(harshcap_start).log(harshcap_strength) 
          )   

      if (aperationBonus.gte(harshcap_start)) softcaptxt2=`<h4 style="color:rgba(110, 0, 24, 0.99);"> Harshcapped [${format(harshcap_start)}] (log${harshcap_strength}) </h4>`   
      else if (aperationBonus.gte(100000)) softcaptxt=`<h4 style="color:rgba(255, 81, 81, 0.99);"> Softcap [100000] (^0.4) </h4>`

      return `<h1> Solaritisicm #${getBuyableAmount(this.layer,this.id)}</h1>
      ${format(getBuyableAmount(this.layer,this.id).pow_base(1.12))} to Solar heat <br>
      ${format(aperationBonus)} to Aperature points 
      ${softcaptxt}<br>${softcaptxt2} 
      Cost: ${format(this.cost())} Solar heat and ${format(this.cost2())} Solar Fragments
      `
    },
    canAfford() {     
      return player.Sol.SolarHeat.gte(this.cost()) && player.Sol.SolarFragments.gte(this.cost2())
     },
     buy() {
      if (this.canAfford()) {
      
      player.Sol.SolarHeat = player.Sol.SolarHeat.sub(this.cost()) ; player.Sol.SolarFragments = player.Sol.SolarFragments.sub(this.cost2())
      addBuyables(this.layer, this.id, 1)  
    }
    },
    effect() {
      let effect = decimalOne
      
      
      return effect;
    },
    unlocked() {
      return (player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" && player.Sol.Heliosphere)

    },
    style() {
      return {
        "width": "200px",
        "height": "125px",
        "border-radius": "5px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
     
  },

  13: {
    cost() {
      let scale = new Decimal(1.17)
      let base = new Decimal(200)
      let x = getBuyableAmount(this.layer,this.id)

      // scales at #33
      // adds 1.2^x scaling

      let cost = base.mul(scale.pow(x))
     

      return cost;
    },

    cost2() {

      let scale = new Decimal(1.178)
      let base = new Decimal(300)
      let x = getBuyableAmount(this.layer,this.id)

      // scales at #33
      // adds 1.2^x scaling

      let cost = base.mul(scale.pow(x))
      return cost

    },

    display() {
      let x = getBuyableAmount("Sol",13)
      let incrementVal = new Decimal(0.01)
      let harshcap_start = new Decimal(50) //can be increased
      let harshcap_power = new Decimal(1.15) //can be increased (or "weaker")
      let harshcap_difference = x.sub(harshcap_start)

      let increment_reduction = decimalOne.plus(harshcap_difference.root(harshcap_power))
      let base_effect = x.mul(incrementVal)
      
      let pre_harshcapBonus = harshcap_start.mul(0.01)
      
      if (x.gt(harshcap_start)) base_effect = pre_harshcapBonus.plus(harshcap_difference.mul(incrementVal.div(increment_reduction)))

      let harshcap_text = ``
 
      if (x.gte(harshcap_start)) harshcap_text = `<h4 style="color:rgba(110, 0, 24, 0.99);"> Harshcapped (sqrt${harshcap_power}): <br>  +0.01/x -> ${format(incrementVal.div(increment_reduction))}/x </h4>`   

      return `<h1> Exponentiate #${getBuyableAmount(this.layer,this.id)}</h1>
      +${format(base_effect)} to Basity I compounding effect <br>
       ${harshcap_text}
      
      Cost: ${format(this.cost())} Solar heat and ${format(this.cost2())} Solar Fragments
      `
    },
    
    canAfford() {     
      return player.Sol.SolarHeat.gte(this.cost()) && player.Sol.SolarFragments.gte(this.cost2())
     },
     buy() {
      if (this.canAfford()) {
      
      player.Sol.SolarHeat = player.Sol.SolarHeat.sub(this.cost()) ; player.Sol.SolarFragments = player.Sol.SolarFragments.sub(this.cost2())
      addBuyables(this.layer, this.id, 1)
    }
    },
    effect() {
      let effect = decimalOne
    
      return effect;
    },
    unlocked() {
      return (player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" && player.Sol.Heliosphere && getBuyableAmount("Sol",11).gte(10) && getBuyableAmount("Sol",12).gte(10))

    },
    style() {
      return {
        "width": "200px",
        "height": "100px",
        "border-radius": "5px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
     
  },

  14: {
    cost() {
      let scale = new Decimal(1.125)
      let base = new Decimal(250)
      let x = getBuyableAmount(this.layer,this.id)

      // scales at #33
      // adds 1.2^x scaling

      let cost = base.mul(scale.pow(x))
     

      return cost;
    },

    cost2() {

      let scale = new Decimal(1.3)
      let base = new Decimal(350)
      let x = getBuyableAmount(this.layer,this.id)

      // scales at #33
      // adds 1.2^x scaling

      let cost = base.mul(scale.pow(x))
      return cost

    },

    display() {
      // 
      return `<h1> Basity II #${getBuyableAmount(this.layer,this.id)}</h1>
      ${format(getBuyableAmount(this.layer,this.id).pow_base(1.35))} to Basity I <br>
      ${format(getBuyableAmount(this.layer,this.id).pow_base(1.05).pow(player.Sol.SolarHeat.log(4)) )} to Phaser
      
      Cost: ${format(this.cost())} Solar heat and ${format(this.cost2())} Solar Fragments
      `
    },
    canAfford() {     
      return player.Sol.SolarHeat.gte(this.cost()) && player.Sol.SolarFragments.gte(this.cost2())
     },
     buy() {
      if (this.canAfford()) {
      
      player.Sol.SolarHeat = player.Sol.SolarHeat.sub(this.cost()) ; player.Sol.SolarFragments = player.Sol.SolarFragments.sub(this.cost2())
      addBuyables(this.layer, this.id, 1)
      }
    },

    effect() {
      let effect = decimalOne
    
      return effect;
    },
    unlocked() {
      return (player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" && player.Sol.Heliosphere && getBuyableAmount("Sol",11).gte(10) && getBuyableAmount("Sol",12).gte(10))

    },
    style() {
      return {
        "width": "200px",
        "height": "100px",
        "border-radius": "5px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
     
  },
},
 
 upgrades: {
  11: {
    fullDisplay() {
        let reward = ""
        if (hasUpgrade("Sol",this.id)) reward = `<span style='text-decoration: underline;'>Reward:</span><br> add +${format(player.Sol.CPBoost.root(4).sub(1),3)} to annular's max exponent`
      
        return `
          <h3> Extenditality </h3><br><br>
          Queued Upgrade 5: <br>
          Get 2.77e91 Solarity Without Annular While Converting for Solar Light while inside light check <br><br>
          
          ${reward}
        `
    },
    unlocked() {
      if (player.Sol.tab == 'Aparal') return true
      },
    style() {
      
      return Tier2QueuedUpgs
    },
    effect() {
      return player.Sol.CPBoost.root(4).sub(1)

    },
    canAfford() {
     let firstGoal = player.points.gte(2.77e91)
     let noAnnular = hasUpgrade("GL",21) ? false : true
     let mustBeIn = getClickableState("L",41) && getClickableState("GL", 11)
     
     //let restrictions = (!hasUpgrade())

	  return mustBeIn && noAnnular && firstGoal
    },
    pay() {
      EclipsiumReset(true)
      player.L.Light = new Decimal(1)
      player.L.Dark = new Decimal(1)
      player.L.LunarPower = player.L.LunarPower.root(5)                      
     }

},

  12: {
  fullDisplay() {
    let capIncrease = ``
    let effect = player.S.points.pow(0.09)
    if (getClickableState("L",42) && hasUpgrade("Sol",this.id)) capIncrease = `and it's cap`

    let reward = ``
    let Dreward = ``


    if (getClickableState("L",42) && hasUpgrade("Sol",this.id)) Dreward = `<p>+ : ${format(player["S"].bestPointsInDark.pow(1/0.09))} -> ${format(player["S"].bestPointsInDark)} to SR cap </p>`
    if (hasUpgrade("Sol",this.id)) reward = `<span style='text-decoration: underline;'>Reward:</span><br> ^0.09 of Solar Rays boost themselves ${capIncrease} <br>
   SD-104's effect is ${format(effect)}<br>
    `
      return `
        <h3> SD-104 </h3> <br><br>
       Queued Upgrade 6: <br>
       Get 5.1e14 Solar rays (Multipliers) without Gravitation, Solar Shard Upgrades, While inside Dark check <br>
        
       ${reward}
      ${Dreward}
      `
  },
  unlocked() {
    if (player.Sol.tab == 'Aparal') return true
    },
  style() {
    
    return Tier2QueuedUpgs
  },
  effect() {
    return player.S.points.pow(0.09).clampMin(1)

  },
  canAfford() {
    let firstGoal = tmp["S"].getResetGain.gte(4.48e13) //when the multipliers reach 1e10 Solar Rays

    // 1.01e14 <- when Solar Rays mult is 1.5e10

    let Anti_has = true
    let mustBeIn = getClickableState("L",42) 
    let upgs = [11,12,13,21,31]
    for (id in upgs) hasUpgrade("GL",upgs[id]) ? Anti_has = false : 0;


   //
   //let restrictions = (!hasUpgrade())

  return mustBeIn && (Anti_has && !hasUpgrade("S",13)) && firstGoal 
  },
  pay() {
    EclipsiumReset(true)
    player.L.Light = new Decimal(1)
    player.L.Dark = new Decimal(1)
    player.L.LunarPower = player.L.LunarPower.root(5)                          
   }

},
  13: {
  fullDisplay() {
    
   // let effect = player.S.points.pow(0.09)

    let reward = ""
    if (hasUpgrade("Sol",this.id)) reward = `<span style='text-decoration: underline;'>Reward:</span><br> 
    Raise solarity gain cap by ^1.15 while inside light check<br>
    Raise dark essence gain by ^1.05

    `
    
      return `
        <h3> Miscolosia </h3> <br><br>
       Queued Upgrade 7: <br>
       Heirarchy bonus reaches 7.77e77 without any Darkness tree upgrades while inside light check <br>
        
       ${reward}

      `
  },
  unlocked() {
    if (player.Sol.tab == 'Aparal') return true
    },
  style() {
    
    return Tier2QueuedUpgs
  },

  canAfford() {
    let firstGoal = GetHeirarchyBonus().gte(7.77e77)

    let noCenterUpgrades = true
    let mustBeIn = getClickableState("L",41) 
    let upgs = [11,12,13,21,22,23]
    for (id in upgs) hasUpgrade("C", upgs[id]) ? noCenterUpgrades = false : 0;


   //
   //let restrictions = (!hasUpgrade())

  return mustBeIn && noCenterUpgrades && firstGoal
  },
  pay() {
    EclipsiumReset()
    player.L.Light = new Decimal(1)
    player.L.Dark = new Decimal(1)
    player.L.LunarPower = player.L.LunarPower.root(5)                      
   }

}, 
  14: {
  fullDisplay() {

    let reward = ""
    if (hasUpgrade("Sol",this.id)) reward = `<span style='text-decoration: underline;'>Reward:<br>
    </span>
     Unlock The Randomizor. also <br>
     = This will be the last of queued and quest upgrades in Enlightenment, I Hope you're ready for what's next :)
    <br>

    `

      return `
        <h3> Solarify </h3> <br><br>
       Queued Upgrade 8: <br>
       4.44e15 Lightness and Darkness <br>
       Have over 7.15e50 Dark Essence in Dark check under 1 CP without any Darkness Tree upgrades
       
  <br>
        
       ${reward}

      `
  },
  unlocked() {
    if (player.Sol.tab == 'Aparal') return true
    },
  style() { 
    return Tier2QueuedUpgs
  },
  
  canAfford() {
    let firstHandReq = player.L.Light.gte(4.44e15) && player.L.Dark.gte(4.44e15)
    let secondaryReq = player.points.gte(7.15e50)
    let under1CP = player.C.CenterPoints.lt(1) ? true : false
    let mustBeIn = getClickableState("L",42) 

   

   return mustBeIn && under1CP && firstHandReq && secondaryReq
  },
  pay() {
    EclipsiumReset(true)
   player.L.Light = new Decimal(1)
   player.L.Dark = new Decimal(1)
   player.L.LunarPower = player.L.LunarPower.root(5)                        
  }

},
 },

 //Done, Rebalance later
clickables: { 
    
    11: {   
      display() {
      
      let preBonus = player.Sol.MNG.Rans > 0 ? `
      5 -> ${format(5 / ( (1.06 ** player.Sol.MNG.Rans) ),2)} 
      Or /${format(1.06 ** player.Sol.MNG.Rans)}
      ` : ``
      
       // [1.1 second cooldown minimum]   

      return `
        Ransial #${player.Sol.MNG.Rans} (max 25)
        reduce cooldown duration by 6% per level
        ${preBonus}

        Cost: ${format(getScale(11)[0])} CRNG, ${format(getScale(11)[1])} TRNG

        `
        
      },
      onClick() {
       // Clickable("Sol",11).canClick
       player.Sol.MNG.Rans += 1
    //   player.Sol.MNG.Total = player.Sol.MNG.Total.plus(1)
       player.Sol.CRNG = player.Sol.CRNG.sub(getScale(11)[0])
       player.Sol.TRNG = player.Sol.TRNG.sub(getScale(11)[1])
      },

      scale() {
        //3x compounding
        let base1 = new Decimal(10) // CRNG
        let base2 = new Decimal(25) // TRNG
        let scaleJump = new Decimal(player.Sol.MNG.Rans).pow_base(1.5)
                
        base1 = base1.mul(scaleJump)
        base2 = base2.mul(scaleJump)
        

        return [base1, base2];
      },

  canClick() {
    return player.Sol.CRNG.gte(getScale(11)[0]) && player.Sol.TRNG.gte(getScale(11)[1]) && player.Sol.MNG.Rans < 26
  },
  style() { return MNGStyle
      },   
      
unlocked() {
  if (player.Sol.tab == "RNG" && (TSolStones(3).unlocked || player.Sol.MNG.Total.gte(1))) return true

}
    },
    12: {
      display() {
        return `
          Quantify #${player.Sol.MNG.Quantify}
          Gain more TRNG based on Quantify levels

           ${player.Sol.MNG.Quantify.gt(0) ? "Effect: " + format(player.Sol.MNG.Quantify.plus(1).pow_base(1.1).pow(2)) + " TRNG": ""}

          Cost: ${format(getScale(12)[0])} CRNG, ${format(getScale(12)[1])} TRNG

          `
          
        },
        onClick() {
          player.Sol.MNG.Quantify = player.Sol.MNG.Quantify.plus(1)
         // player.Sol.MNG.Total = player.Sol.MNG.Total.plus(1)
          player.Sol.CRNG = player.Sol.CRNG.sub(getScale(12)[0])
          player.Sol.TRNG = player.Sol.TRNG.sub(getScale(12)[1])
        },

        scale() {
          //3x compounding
          let base1 = new Decimal(10) // CRNG
          let base2 = new Decimal(25) // TRNG
          let scaleJump = new Decimal(player.Sol.MNG.Quantify).pow_base(1.33)
                  
          base1 = base1.mul(scaleJump)
          base2 = base2.mul(scaleJump)
          
  
          return [base1, base2];
        },

    canClick() {return player.Sol.CRNG.gte(getScale(12)[0]) && player.Sol.TRNG.gte(getScale(12)[1])},
    style() { return MNGStyle
        },   
        
  unlocked() {
    if (player.Sol.tab == "RNG" && (TSolStones(3).unlocked || player.Sol.MNG.Total.gte(1))) return true
  
  }
    },
    21: {
      display() {
      
        return `
          Elevate #${player.Sol.MNG.Elevate}
          Gain more CRNG based on Elevate Levels

           ${player.Sol.MNG.Elevate.gt(0) ? "Effect: " + format(player.Sol.MNG.Elevate.pow_base(1.2).mul(1.5)) + " CRNG": ""}

          Cost: ${format(getScale(21)[0])} CRNG, ${format(getScale(21)[1])} TRNG

          `
          //player.Sol.MNG.Elevate = new Decimal(10)
        },
        onClick() {
          player.Sol.MNG.Elevate = player.Sol.MNG.Elevate.plus(1)
          // player.Sol.MNG.Total = player.Sol.MNG.Total.plus(1)
           player.Sol.CRNG = player.Sol.CRNG.sub(getScale(21)[0])
           player.Sol.TRNG = player.Sol.TRNG.sub(getScale(21)[1])
        },
        scale() {
          //3x compounding
          let base1 = new Decimal(35) // CRNG
          let base2 = new Decimal(150) // TRNG
          let scaleJump = player.Sol.MNG.Elevate.pow_base(1.25)
                  
          base1 = base1.mul(scaleJump)
          base2 = base2.mul(scaleJump)
          
  
          return [base1, base2];
        },
        canClick() {
          return player.Sol.CRNG.gte(getScale(21)[0]) && player.Sol.TRNG.gte(getScale(21)[1]) 
        },
    style() { return MNGStyle },   
        
  unlocked() {
    if (player.Sol.tab == "RNG" && (TSolStones(3).unlocked || player.Sol.MNG.Total.gte(1))) return true
  }

    },
    22: {
      display() {
        let Next = `<span style="color:rgba(0, 0, 0, 0.75); text-shadow: 0px 0px 0px rgba(255, 255, 255, 0)"> -> ^${format(ReplicEffect(1))} </span>`
        let Next2 = `<span style="color:rgba(0, 0, 0, 0.4); text-shadow: 0px 0px 0px rgba(255, 255, 255, 0)"> -> ^${format(ReplicEffect(2))}</span>`
        let Next3 = `<span style="color:rgba(0, 0, 0, 0.15); text-shadow: 0px 0px 0px rgba(255, 255, 255, 0)"> -> ^${format(ReplicEffect(3),3)}</span>`
        let nexts = Next + Next2 + Next3
        return `
          Replication #${player.Sol.MNG.Replic}
          Light and Dark Boost themselves at a small rate. 
          ^${ReplicEffect(0)}${nexts}

          Cost: ${format(getScale(22)[0])} CRNG, ${format(getScale(22)[1])} TRNG
          ` 
        },
        onClick() {
          player.Sol.MNG.Replic = player.Sol.MNG.Replic + 1
          // player.Sol.MNG.Total = player.Sol.MNG.Total.plus(1)
           player.Sol.CRNG = player.Sol.CRNG.sub(getScale(22)[0])
           player.Sol.TRNG = player.Sol.TRNG.sub(getScale(22)[1])
        },
      scale() {
          //3x compounding
          let base1 = new Decimal (45) // CRNG
          let base2 = new Decimal (200) // TRNG
          let hyper = new Decimal (player.Sol.MNG.Replic / 100)
          let scaleJump = new Decimal(player.Sol.MNG.Replic).pow_base(1.175)
                  
          base1 = base1.mul(scaleJump)
          base2 = base2.mul(scaleJump)
          
  
          return [base1, base2];
        },
    canClick() {return player.Sol.CRNG.gte(getScale(22)[0]) && player.Sol.TRNG.gte(getScale(22)[1]) },
    style() { return MNGStyle
        },   
        
  unlocked() {
    if (player.Sol.tab == "RNG" && (TSolStones(3).unlocked || player.Sol.MNG.Total.gte(1))) return true
  
  }

    },


 
//Start Solar Fragment generation! ${player.Sol.genActive=='2' ? '<br>Generating (^0.05 of Solar heat)>' : ''}
    
    31: {
      display() {
        let heat = player.Sol.SolarHeat
        let deprecate = player.Sol.SolarHeat.gte(200) && player.Sol.genActive=='1' ? `Leaking: gains reduced by <h4 style="color:rgba(159, 22, 22, 0.99);"> ${format(heat.sub(200).root(1.75).pow_base(1.05))}`: ``     
        let underValued = format(gainOf("Solar Heat"),3) + ' Solar Heat per second'
        if (gainOf("Solar Heat").lt(0.1)) underValued = format(gainOf("Solar Heat").mul(60),4)  + ' Solar Heat per minute'
        if (gainOf("Solar Heat").mul(60).lt(0.1)) underValued = format(gainOf("Solar Heat").mul(3600),5) + "0 Solar heat per hour"
        if (gainOf("Solar Heat").mul(3600).lt(0.1)) underValued = `Absolutely nothing! (wowie an easter egg almost!)`
        return` <h2>
     Start solar heat generation! </h2> <h4>${player.Sol.genActive=='1' ? '<br>Generating... <br> Gaining ' + underValued : ''} </h4>
     ${deprecate}`
     
  },
      onClick() {
        player.Sol.genActive=1
      },
      
      unlocked() {
        return (player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" && player.Sol.Heliosphere)
       },
  canClick() {return true},
  style() {
    return{
      "width": "300px",
      "height": "25px",
      "border-radius": "20px",
      "border": "10px",
      "margin": "10px",
      "text-shadow": "0px 0px 10px #000000",
      }
    
      },   
      
      
  },
    32: {
      branches: ["31"],

      
      //getBuyableAmount(this.layer,this.id).div(100)
    display() {

      let exp = format(getBuyableAmount("Sol",11).div(100).plus(0.05),2)
      let gen = player.Sol.genActive=='2' ? ` <br>Generating... (^${exp} of Solar Heat) <br> = ${format(gainOf("Solar Fragments"))} ` : `` 


      return` <h2>
   Start Solar Fragments generation! </h2> <h4> ${gen}
  `
   
},
    onClick() {
      player.Sol.genActive=2
    },
    
    unlocked() {
      return (player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere" && player.Sol.Heliosphere)
     },
canClick() {return true},
style() {
  return{
    "width": "200px",
    "height": "25px",
    "border-radius": "50px",
    "border": "10px",
    "margin": "15px",
    "text-shadow": "0px 0px 10px #000000",
    }
   
    },   
    
    
},

// WoC 

    41: {
      display() {
        let TMSunX = player.Sol.TMSun.x
        let TMSunPend = player.Sol.TMSun.pending

        let TMSPT = (TMSunPend.gte(1) || TMSunX.gte(1)) && player.Sol.selected == "TMSun"  ? `Difficulty: ${TMSunPend.plus(TMSunX)} / 5` : ``

         let mastered = ``
         if (TMSunX.gte(5)) mastered = `<br>Mastered!`  

        return `<h2>The Melted Sun </h2> 
        
        ${TMSPT}${mastered}
        `
      },
      onClick() {  player.Sol.selected = "TMSun";  },
      canClick() {return player.Sol.selected == ""},
      style() {return {
        "width": "140px",
        "height": "20px",
         "margin": "5px"
        }},  
        unlocked() {
          let canShow = true
          let TMSun = player.Sol.TMSun.x
          let TRMoon = player.Sol.TRMoon.x
          let TBEcl = player.Sol.TBSun.x
          let TBCore = player.Sol.TBCore.x
            
          let StudyList = []
          if (TBCore.eq(3)) canShow = false
          else if (TBCore.eq(2) && (TMSun.eq(5) && TBEcl.eq(5) && TRMoon.eq(5)) ) canShow = false
          else if (TBCore.eq(1) && (TMSun.eq(3) && TBEcl.eq(3) && TRMoon.eq(3)) ) canShow = false
          else if (TBCore.eq(0) && (TMSun.eq(2) && TBEcl.eq(2) && TRMoon.eq(2)) ) canShow = false


          return player.Sol.sub == "WoC" && canShow && !(player.Sol.selected == "TRMoon" || player.Sol.selected == "TBSun")
        
        }
    },


    42: {
      display() {
        
        
        let TRMoonX = player.Sol.TRMoon.x
        let TRMoonPend = player.Sol.TRMoon.pending

        let TRMPT = (TRMoonPend.gte(1) || TRMoonX.gte(1)) && player.Sol.selected == "TRMoon" ? `Difficulty: ${TRMoonPend.plus(TRMoonX)} / 5` : ``

        let mastered = ``
        if (TRMoonX.gte(5)) mastered = `<br>Mastered!`  

       return `<h2>The Raging Moon</h2>
        
        ${TRMPT}
        ${mastered}
        `
        
        },
      onClick() {  player.Sol.selected = "TRMoon"    },
      canClick() {return player.Sol.selected == ""},
      style() {return {
        "width": "133px",
        "height": "20px",
         "margin": "5px"
        }},  
        unlocked() {
          let canShow = true
          let TMSun = player.Sol.TMSun.x
          let TRMoon = player.Sol.TRMoon.x
          let TBEcl = player.Sol.TBSun.x
          let TBCore = player.Sol.TBCore.x
            
          let StudyList = []
          if (TBCore.eq(3)) canShow = false
          else if (TBCore.eq(2) && (TMSun.eq(5) && TBEcl.eq(5) && TRMoon.eq(5)) ) canShow = false
          else if (TBCore.eq(1) && (TMSun.eq(3) && TBEcl.eq(3) && TRMoon.eq(3)) ) canShow = false
          else if (TBCore.eq(0) && (TMSun.eq(2) && TBEcl.eq(2) && TRMoon.eq(2)) ) canShow = false

  
          return player.Sol.sub == "WoC" && canShow && !(player.Sol.selected == "TBSun" || player.Sol.selected == "TMSun")
        
        }
    },

    43: {
      display() {
        let TBSunX = player.Sol.TBSun.x
        let TBSunPend = player.Sol.TBSun.pending

        let TBSPT = (TBSunPend.gte(1) || TBSunX.gte(1)) && player.Sol.selected == "TBSun" ? `Difficulty: ${TBSunPend.plus(TBSunX)} / 5` : ``

         let mastered = ``
        if (TBSunX.gte(5)) mastered = `<br>Mastered!`  

        return `<h2> The Bleeding Eclipse </h2> 
        
        ${TBSPT}${mastered}
        `
      
      },
      onClick() { 
       
        player.Sol.selected = "TBSun"; 
      

       },
      canClick() {return player.Sol.selected == ""},
      style() {return {
        "width": "133px",
        "height": "20px",
        "margin": "5px"
        }},  
      unlocked() {
          let canShow = true
          let TMSun = player.Sol.TMSun.x
          let TRMoon = player.Sol.TRMoon.x
          let TBEcl = player.Sol.TBSun.x
          let TBCore = player.Sol.TBCore.x
            
          let StudyList = []
          if (TBCore.eq(3)) canShow = false
          else if (TBCore.eq(2) && (TMSun.eq(5) && TBEcl.eq(5) && TRMoon.eq(5)) ) canShow = false
          else if (TBCore.eq(1) && (TMSun.eq(3) && TBEcl.eq(3) && TRMoon.eq(3)) ) canShow = false
          else if (TBCore.eq(0) && (TMSun.eq(2) && TBEcl.eq(2) && TRMoon.eq(2)) ) canShow = false

       

        return player.Sol.sub == "WoC" && canShow && !(player.Sol.selected == "TRMoon" || player.Sol.selected == "TMSun")
      
      }
    },
    
    // The broken core 
    44: {
      display() {
        let TBCoreX = player.Sol.TBCore.x
        let TBCorePend = player.Sol.TBCore.pending

        let TBCPT = (TBCorePend.gte(1) || TBCoreX.gte(1)) && player.Sol.selected == "TBCore" ? `Difficulty: ${TBCorePend.plus(TBCoreX)} / 3` : ``

        return `<h2>The Broken Core</h2>      
        
        ${TBCPT}
        `
        
      },
      onClick() {  player.Sol.selected = "TBCore" },
      canClick() {
        let TBCore = player.Sol.TBCore.x
        return (TBCore.neq(3)) 
      },
      style() {

        let val = !player.Sol["TBCore"].active  ?   player.RMT : 0
        let negval = !player.Sol["TBCore"].active  ?  player.RMT*-1 : 0
        return {
        "width": "133px",
        "height": "20px",
        "margin": "5px",
        "transform": "translateX(" + val + "px)"
        }},  
      unlocked() {
        let canShow = false
        let TMSun = player.Sol.TMSun.x
        let TRMoon = player.Sol.TRMoon.x
        let TBEcl = player.Sol.TBSun.x
        let TBCore = player.Sol.TBCore.x
          
        let StudyList = []

        if (TBCore.eq(2)) 
          if (TMSun.eq(5) && TBEcl.eq(5) && TRMoon.eq(5)) canShow = true
        else if (TBCore.eq(1))  
          if (TMSun.eq(3) && TBEcl.eq(3) && TRMoon.eq(3)) canShow = true
        else if (TBCore.eq(0))
          if (TMSun.eq(2) && TBEcl.eq(2) && TRMoon.eq(2)) canShow = true
        //else return false

       // return true 
        return player.Sol.sub == "WoC" && canShow //|| player.Sol.selected == "TBCore"
        
        

      }
    },


    1111: {    
      display() {return `Respawn to redo this Check (Adds 1 to deaths) <br>
        <br> For the pressure overcame me...
        `},
      onClick() {EclipsiumReset();  player.Sol.activeCheck = ""; player.Sol.HelioRadiation = new Decimal(1); player.deaths += 1; switchTheme("Eclipse"); save(); window.location.reload(); },
      canClick() {return true},
      style() {return {
        "width": "190px",
        "height": "80px",
        }},  
      unlocked() {return player.Sol.activeCheck == "Heliosphere" && player.Sol.HelioRadiation.gte(1e30)
        }
    
    },
    99: {
     
        display() {return `redo this duality (useful for Solarify)`},
        onClick() {EclipsiumReset(); player.L.Light = new Decimal(0); player.L.Dark = new Decimal(0); },
        canClick() {return true},
        style() {return {
          "width": "190px",
          "height": "40px",
          }},  
        unlocked() {return player.C.CenterPoints.gte(1) && getClickableState("L", this.id)}
      
    }

 },  


 Check: {
  
  
  11: {

    // redoing Heliosphere will perform an aperation reset, and will root BRNG by 1.05
    // so come prepared. 

    display() {
        let text = ``
        let req = ["1e200", "5e27", "100000", "30"]
        let first = ``



        
        if (!player["Sol"].Heliosphere) text = `
        <span> Enter the heliosphere...? </span>
      
        <br>
        <br>
        Requires: <br>
        Light And Dark Checks #10, >1000 TRNG, and CP base is >2.33   <br>
         
         `
        else if (player["Sol"].Heliosphere) text = `
       
        Solarity gain cap is raised to ^1.2769 <br><br>
         The gates of the core has opened... although, it wont be so lenient.</i>
        `
        if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) return `<h1>...while converting for solar light</h1>`
        if (player.Sol.activeCheck == "Heliosphere") text = `
        <h1>
          6.67e200 <br>
          3.33e11 <br>
          >100000 <br>
          >35 
        </h1>
        `
        return `${text}`
        

      }, 
    onClick() {


        if (player["Sol"].activeCheck == "Heliosphere" && Check("Sol",11).CompReq == true ) {
          player["Sol"].Heliosphere = true
          player["Sol"].activeCheck = ""
         
        
        }
        else if (Check("Sol",11).canEnter == true) {
          switchTheme("Heliosphere")
          player.Sol.activeCheck = "Heliosphere"
          layer2Reset()
          player.L.Light = new Decimal(0), 
          player.L.Dark = new Decimal(0),  
          player.L.UnwantedChromia= new Decimal(0)
          player.L.LunarPower = player.L.LunarPower.pow(0.3) 
        
          setTimeout(() => {player.points = new Decimal(0)}, 100)

        }

        

      },
      
    unlocked() {
      if (player.Sol.tab == "Core" && player.Sol.sub == "Heliosphere") return true
      else false
      },
      
    canEnter() {
            return (Check("Sol",11).EnterReq == true && !Check("Sol",11).has)                                                             
            },  
    EnterReq() {
      // make later
        return player.L.LightCheck.gte(10) && player.L.DarkCheck.gte(10) && player.Sol.CPBoost.gte(2.33) && player.Sol.TRNG.gte(1000)     
      },   
    CompReq() { //player.Sol.activeCheck == "Heliosphere"
      // make later
        return player.Sol.HelioStat["highSolarity"].gte(6.67e200) && player.Sol.HelioStat["highSolar_Rays"].gte(3.33e11) && player.Sol.HelioStat["CP"].gte(35) && player.Sol.HelioStat["Solar_Shard"].gte(100000)
      },
    has() { return player["Sol"].Heliosphere },

    png() {if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) return `<p><img src="resources/The Cores Vision.png" style="width:100px;height:100px;"></p> `
         else return `<p><img src="resources/Heliosphere.png" style="width:150px;height:150px;"></p> `}

    },

    //with audio, add 3 seconds to timer since it got cut off shortly.
    //and then add another 3 

 },

// 4:31 -> 271 Seconds


  // if (player["GL"].Solar_shards.gte(1))
    tooltip: () => options.animateTree || options.betterTree ? `<h3>Solaris, The Solar Sun.</h3>` : `<p>Open Layer 2-B, Solaris</p><br>(last unlock of v0.6 20F-19B)</p>`,       
  
    row: 2, 
    position: 3, 
    branches: ["E"],
    layerShown(){ 
      if ( hasMilestone("E",6) ) return true; else return false; 
    },

    unlocked(){
      return true
    },

  })
  
  