// REMINDER: TO PAUSE A FUNCTION DO setTimeout(s)

// instead just make a value 
// base value is 3 seconds

/* generate number between 0 and one and divide it by 

1 / generated num

That will be the CRNG, in which will add to TRNG.



if (CRNG > BRNG) BRNG = CRNG


*/


var setCRNG = new Decimal(0)

const Roll = {
  cooldown: 5,
  baseCoolDown: 5,
  rollTime: 3,
  Amount: 0,
  trueVal: 0
}
 
var RawRNG = 1;
var simulated = []

//const text = ``


//i'd probably need this for TQET
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function animateArray(arr) {
  let pritArr = []
  let slowDown = 1

  for (x in arr) {
    text = arr[x] 
    
    pritArr.push(1 / arr[x]) 

    RawRNG = x != (arr.length - 1) ? arr[x] + " [!]" : arr[x]
    await delay(100 + ((25 * Roll.baseCoolDown) * slowDown))
    slowDown += 1
    
   
    //for technical stuff
  }

  Roll.trueVal = 1/arr[x]
  // 

  console.log(pritArr)
  if (player.Sol.TRNG && player.Sol.CRNG) player.Sol.TRNG = player.Sol.TRNG.plus(player.Sol.CRNG)

  simulated = []
 
}


function roll() {
    Roll.cooldown = Roll.baseCoolDown

    simulated = [Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]
    RawRNG = simulated[simulated.length]
    return animateArray(simulated);
  
}
/*
  SETTINGS
  for later
  random: completely randomized, how meta!
  slowDown: for suspense...

  */

  

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


  addLayer("Sol", {
    symbol() {return `<p><img src="resources/Solaris.png" style="width:80px;height:80px;"></p>`},
    startData() { return {
        unlocked: true,

        Aperativity: new Decimal(0),
        Aperature: new Decimal(0),
        CPBoost: new Decimal(0),
   
        TRNG: new Decimal(0),
        BRNG: new Decimal(1),
        SRNG: new Decimal(0), //stored RNG?
      
        CRNG: new Decimal(0),
        Amount: Roll.Amount,

        MNG: {        
          Replic: 0,
          Smare: 0,
          Total: new Decimal(0),
          Quantify: new Decimal(0),
          Elevate: new Decimal(0), 
        },

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

        solarBurst: false, //should move base Solarity cap to 1e1000, for Pestillessence
        Heliosphere: false,
    }},
    color: "#612700",
   // Can be a function that takes requirement increases into account
   

  
   update(diff) {

                // rebalance this effect
   player["Sol"].CPBoost = player["Sol"].Aperativity.clampMin(1).log(10)




   if (Roll.cooldown > 0) Roll.cooldown = Roll.cooldown - 1 * diff
    
   if (player.Sol.MNG.Rans >= 1) Roll.baseCoolDown = 5 / (1.06 ** player.Sol.MNG.Rans)

   player.Sol.MNG.Total = new Decimal(player.Sol.MNG.Rans + player.Sol.MNG.Replic).add(player.Sol.MNG.Quantify).add(player.Sol.MNG.Elevate)

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
      "blank", "blank", 
      ["display-text", function() { 
        if (player.Sol.tab == 'Aparal' )
         return `Remember: Queued upgrades forces a recontrol reset<br>
        Since these are Tier II Queued upgrades, these also reset Light and Dark, and roots Lunar power by 5
        `
      }],
"blank", "blank", 
      ["row", [ //check upgrades
        ["upgrade",11],
        ["upgrade",12],  
      ]],    
      ["row", [ //check upgrades
        ["upgrade",13],
        ["upgrade",14],  
      ]],
  // #reigion Randomizor
      ["row", [ //check upgrades
        ["Viewer",  {id:12, title: "BRNG Milestones"}],
        ["Viewer",  {id:13, title: "-----[ Machine ]-----"}],
        ["Viewer",  {id:14, title: "TRNG Milestones"}],
      ]],

      ["row", [ //check upgrades
        ["clickable",11],
        ["clickable",12],  
      ]],

      ["row", [ //check upgrades
        ["clickable",21],
        ["clickable",22],  
      ]],

  // #endregion

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
      unlocked() {return hasUpgrade("Sol",14) || player.Sol.CRNG.gt(1)}
    },
    13: {
      display() {return `<h2>The Core</h2>`},
      onClick() {player.Sol.tab = "Core"},
      canClick() {return true},
      style() {return {
        "width": "130px",
        "height": "40px",
        }},  
      unlocked() {return player.Sol.MNG.Total.gte(32)}
    },

    21: {
      display() {return `<h3>Sub: Wall Of Checks </h3>`},
      onClick() {if (player.Sol.tab == "Core") player.Sol.sub = "WoC"},
      canClick() {return false},
      style() {return {
        "width": "120px",
        "height": "40px",
        }},  
      unlocked() {return player.Sol.TRNG.gte(1e10) && player.Sol.tab == "Core"}
    },
    22: {
      display() {return `<h3>Sub: Solar Bursting </h3>`},
      onClick() {if (player.Sol.tab == "Core") player.Sol.sub = "Bursting"},
      canClick() {return true},
      style() {return {
        "width": "100px",
        "height": "40px",
        }},  
      unlocked() {return player.Sol.TBCore.x.gte(3) && player.Sol.tab == "Core"},
    },



  },
  
  
  





  Reset: {
    11: {
      display() {
          
          let nBAR = ``

         let CRNG = new Decimal(player.Sol.CRNG)

          let CurrentCPBoost = player["Sol"].Aperativity.clampMin(1).log(10)
          let ifResetNow = tmp["Sol"].Reset[11].gain
          let newCPBoost = player["Sol"].Aperativity.plus(ifResetNow.clampMin(1)).log(10)

          let SecondReset = CRNG.gte(25) ?  `Note: This will reset CRNG` : ``

          

          if (ifResetNow.gte(1) && CurrentCPBoost.gte(1)) nBAR = `CP Base will be increased ${format(CurrentCPBoost)} -> ${format(newCPBoost)}`


          if (player.L.LunarPower.gte(100) || player.L.LunarEssence.gt(0)) return `
            Aperating will reset everything Lunar Restabalize does as well as Lightness and Darkness. Light/Dark check will be set back down to 1 for Aperativity<br> 
            <br> Aperating Requirements: LC and DC #6 or more. and at least 
            <br> You will earn ${format(tmp["Sol"].Reset[11].gain)} Aperativity before reset <br>
            ${nBAR}
            <br>
            ${SecondReset}
            <br>      
          `
          /* 
          formula:
          A = log10(Light x dark) 
          (essentially log10(Light) + log10(Dark))

          (LK# * DK#) * A^0.5

          */

        },     
      onClick() {
        
        player.Sol.Aperativity = player.Sol.Aperativity.plus(Reset("Sol",11).gain)
        
        EclipsiumReset()
        player.L.LightCheck = new Decimal(1)
        player.L.DarkCheck = new Decimal(1)
        player.L.Light = new Decimal(1)
        player.L.Dark = new Decimal(1)
        player.L.LunarPower = new Decimal(0)                                              
        player.E.TopLVL = new Decimal(0)           
        
        CRNG = new Decimal()
        if (player.Sol.CRNG.gte(25)) player.Sol.CRNG = new Decimal(1)
        setClickableState("L", 41, false)
        setClickableState("L", 42, false)

      },
      canClick() {if (player.L.LightCheck.gte(6) && player.L.DarkCheck.gte(6)) return true},
      
      gain: () => { 
        let base = player.L.LightCheck.mul(player.L.DarkCheck).log(3).div(player.Sol.Aperativity.clampMin(1).log(100).clampMin(1)) ; 
        let secondaryBoost = player.L.Light.mul(player.L.Dark).log(10).pow(0.5); 
        if (TSolStones(2).unlocked) secondaryBoost = secondaryBoost.mul(TSolStones(2).effect)
        
        return base.mul(secondaryBoost)
      
      },
      button: () => { return `Aperate!` },
      unlocked() {
         return player.Sol.tab == "Aparal" //this is the base unlock for Eclipse Tier 6
      },
  },          
 },

 Viewer: {
  11: {
    display() {
      
      let Aperate = ``
      
      let selfDiv = (player.Sol.Aperativity.clampMin(1).log(100).gt(1)) ? `<h3> However, The decaying sun is reducing Aperativity by </h3> </h2 tyle="color:rgb(72, 30, 30)"> ${format(player.Sol.Aperativity.clampMin(1).log(100))} </h2>` : ``
      if (player.Sol.Aperativity.gt(0) || true) Aperate = `
      <h2> Aperativity Points: ${format(player.Sol.Aperativity)}<br></h2> 
      <h3> Aperativity increases CP compounding base by +${format(player.Sol.CPBoost)} </h3> <br>
      

      `

      return `      
      ${Aperate}

      
      `

    },
    

    unlocked() {
     return (player.Sol.tab == "Aparal" && player.Sol.Aperativity.gte(1))
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
     return (player.Sol.tab == "RNG")
    }
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


       
          player.Sol.TRNG = player.Sol.TRNG.plus(player.Sol.CRNG.mul(QuantifyBonus))


        //set CRNG
        player.Sol.CRNG = new Decimal(1 / RawRNG)
        Roll.trueVal = player.Sol.CRNG
        if (player.Sol.Aperativity.gte(15)) player.Sol.CRNG = player.Sol.CRNG.mul(boosted)
        if (player.Sol.MNG.Elevate.gte(1))  player.Sol.CRNG = player.Sol.CRNG.mul(player.Sol.MNG.Elevate.mul(2).pow_base(1.2))

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
    }
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
          reward: `Boost Solarity gain by ` + format(TRNG.pow(2))
        },
        2: {
          unlocked: TRNG.gte(30) || player.Sol.MNG.Total.gte(1),
          text: `TRNG-2`,
          effect: CRNG.log(7).pow(1.25).plus(1),
          reward: `Boost Aperature Points gain by ` + format(CRNG.log(7).pow(1.5).plus(1)) + ` (Based on CRNG)`
        },
        3: {
          unlocked: TRNG.gte(100) || player.Sol.MNG.Total.gte(1),
          text: `TRNG-3`,
          reward: `Unlock MNG`
        },
        4: {
          unlocked: TRNG.gte(500) && player.Sol.MNG.Total.gte(1),
          text: `TRNG-4`,
          reward: `Unlock Aperativity upgrades`
        },
        5: {
          unlocked: TRNG.gte(1000) && player.Sol.MNG.Total.gte(1),
          text: `TRNG-5`,
          reward: `Unlock the ability to store CRNG for SRNG`
        },
        6: {
          unlocked: TRNG.gte(5000),
          text: `TRNG-5`,
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
                      ${TSolStones[id].reward ? TSolStones[id].reward : ""}  
                    </span>
                  <br><br>
                  `
                } 
              }
          let nextUnlock = ``
                if (TSolStones[5].unlocked) nextUnlock = `Next at 5000 TRNG`
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
    }
  },

//<button> Roll BRNG </button>
 
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
          let scaleJump = new Decimal(player.Sol.MNG.Quantify).pow_base(1.33452)
                  
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

           ${player.Sol.MNG.Elevate.gt(0) ? "Effect: " + format(player.Sol.MNG.Elevate.mul(2).pow_base(1.2)) + " CRNG": ""}

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
        let Next = `<span style="color:rgba(0, 0, 0, 0.75); text-shadow: 0px 0px 0px rgba(255, 255, 255, 0)"> -> ^${ReplicEffect(1)} </span>`
        let Next2 = `<span style="color:rgba(0, 0, 0, 0.4); text-shadow: 0px 0px 0px rgba(255, 255, 255, 0)"> -> ^${ReplicEffect(2)}</span>`
        let Next3 = `<span style="color:rgba(0, 0, 0, 0.15); text-shadow: 0px 0px 0px rgba(255, 255, 255, 0)"> -> ^${ReplicEffect(3)}</span>`
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
          let scaleJump = new Decimal(player.Sol.MNG.Replic).pow_base(hyper.plus(1.1))
                  
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
  
  
  // if (player["GL"].Solar_shards.gte(1))
    tooltip: () => `<p>Open Solaris, side layer <br>(last unlock of v0.6 17F-15B)</p>`,


          
           
  
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