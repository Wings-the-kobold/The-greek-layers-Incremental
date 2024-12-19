// REMINDER: TO PAUSE A FUNCTION DO setTimeout(s)

// instead just make a value 
// base value is 3 seconds

/* generate number between 0 and one and divide it by 

1 / generated num

That will be the CRNG, in which will add to TRNG.



if (CRNG > BRNG) BRNG = CRNG


*/



addLayer("Sol", {
    symbol() {
      return `
      <p><img src="resources/Solaris.png" style="width:80px;height:80px;"></p>`
      },
    startData() { return {
        unlocked: true,

        Aperativity: new Decimal(0),
        Aperature: new Decimal(0),
        CPBoost: new Decimal(0),
        CNRG: new Decimal(0),
        TRNG: new Decimal(0),
        BRNG: new Decimal(1),
        baseCoolDown: new Decimal(3),

        TMSun:{ 
          x: new Decimal(0)
        },
        TRMoon: {
          x: new Decimal(0)
        },
        TBSun: {
          x: new Decimal(0)
        },
        TBCore: {
          x: new Decimal(0)
        },

        tab: "",
        sub: "",
        activeCheck: "",

        solarBurst: false,
    
    }},
    color: "#612700",
   // Can be a function that takes requirement increases into account
   

  
   update(diff) {


   player["Sol"].CPBoost = player["Sol"].Aperativity.clampMin(1).log(10)


  }, 
  
  
      
  
  
  
  
  
  
  
  tabFormat: {
    "": {      
      content: [     

      ["row", [ //check upgrades
          ["Custom", {id:11}],
          ["Custom", {id:12}],
          ["Custom", {id:13}],
        ]],
      ["row", [ //check upgrades
          ["Custom", {id:21}],
          ["Custom", {id:22}],
        ]],
        "blank",  
          
      ["Viewer",  {id:11, title: "Aparature Stats"}],
      ["Reset", {id:11, title: "Aperaturize"}], 
],},},


    //for unlockable content 
 
  Custom: {
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
      onClick() {player.Sol.tab = "RNG"},
      canClick() {return true},
      style() {return {
        "width": "130px",
        "height": "40px",
        }},  
      unlocked() {return player.Sol.CPBoost.gte(3)}
    },
    13: {
      display() {return `<h2>The Core</h2>`},
      onClick() {player.Sol.tab = "Core"},
      canClick() {return true},
      style() {return {
        "width": "130px",
        "height": "40px",
        }},  
      unlocked() {return player.C.checkUpgrades.gte(3) || player.E.EclipseTier.gte(1)}
    },

    21: {
      display() {return `<h3>Sub: Wall Of Checks </h3>`},
      onClick() {if (player.Sol.tab == "Core") player.Sol.sub = "WoC"},
      canClick() {return true},
      style() {return {
        "width": "120px",
        "height": "40px",
        }},  
      unlocked() {return player.E.EclipseTier.gte(1) && player.Sol.tab == "Core"}
    },
    22: {
      display() {return `<h3>Sub: Solar Bursting </h3>`},
      onClick() {if (player.Sol.tab == "Core") player.Sol.sub = "Bursting"},
      canClick() {return true},
      style() {return {
        "width": "100px",
        "height": "40px",
        }},  
      unlocked() {return Check("E",11).has && player.Sol.tab == "Core"},
    },



  },
  
  

  Reset: {
    11: {
      display() {
          
          if (player.L.LunarPower.gte(100) || player.L.LunarEssence.gt(0)) return `
            Aperating will reset everything Lunar Restabalize does as well as Lightness and Darkness. Light/Dark check will be set back down to 1 for Aperativity<br> 
            <br> Aperating Requirements: 100 Lunar Power, LC and DC #6 or more
            <br> You will earn ${format(tmp["L"].Reset[11].gain)} Aperativity before reset
            <br> [don't remember the formula for this xd]       
          `
        },     
      onClick() {
        
        player.Sol.Aperativity = player.Sol.Aperativity.plus(Reset("Sol",11).gain)
        
        EclipsiumReset()
        player.L.LightCheck = new Decimal(1)
        player.L.DarkCheck = new Decimal(1)
        player.L.Light = new Decimal(1)
        player.L.Dark = new Decimal(1)
        player.L.LunarPower = new Decimal(0)                                              
        player.L.LunarEssence = player.L.LunarEssence.plus(gain)
        player.E.TopLVL = new Decimal(0)          
        
      },
      canClick() {if (player.L.LunarPower.gte(100) && player.L.LightCheck.gte(6) && player.L.DarkCheck.gte(6)) return true},
      
      gain: () => { return player.L.LunarPower.clampMin(1).log(5)},
      button: () => { return `Aperate!` },
      unlocked() {
         return player.Sol.tab == "Aparal" //this is the base unlock for Eclipse Tier 6
      },
  },          
 },

 //if (player.Sol.tab == "Aparal")
 

 Viewer: {
  11: {
    display() {
      
      let Aperate = ``
      

      if (player.Sol.Aperativity.gt(0) || true) Aperate = `
      <h2>Aperativity Points: ${player.Sol.Aperativity}<br></h2> 
      <h3> Aperativity increases CP compounding base by ${player.Sol.CPBoost} </h3>
      `

      return `      
      ${Aperate}

      
      `

    },
    

    unlocked() {
     return player.Sol.tab == "Aparal"
    }


  },
  12: {

  },
 },



// Why am i even trying to rebalance this before the upgrades?
// upg 1
// Quest Upgrade
// Get 4.10e43 Solarity Without Annular While Converting for Solar Light 
// 
// Reward: Annular is improved by adding +0.2 to it's highest maximum
// 
// ------------------------------------
// upg 2
// Quest Upgrade
// Reach 4.55e26 Solar rays without Gravitation, Solar Shard Upgrades, and Under Effector Tier II (Upgrade from S)
// 
// Reward: 
// 
// 
// 
// :

 upgrades: {


 },


    clickables: { 

    11: {


    },

  },  
  
  
  // if (player["GL"].Solar_shards.gte(1))
    tooltip: () => `<p>Open Solaris, side layer <br>(last unlock of v0.6 15F-13B)</p>`,


            

  
           
  
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