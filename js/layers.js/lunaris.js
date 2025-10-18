const TillDark = new Audio('resources/4MUD.mp3');

const storedChecks = [];


const dualityScaling = {
  Voided: {
    Start: new Decimal(10),
    Effect: 2
  },
  Ignorant: {
    Start: new Decimal(10),
    Effect: 2
  },
}

var TimeIs = ``

addLayer("L", {
    name: "Lunaris", // This is optional, only used in a few places, If absent it just uses the layer id.
    
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        Lunarity: false,
        LunarPower: new Decimal(1),
        LunarEssence: new Decimal(0),
        LunarCheckUPG: new Decimal(0), //to unlock ECT7
        LightCheck: new Decimal(0),
        DarkCheck: new Decimal(0),
        Light: new Decimal(0), //base generation: 1.75^LightCheck.
        Dark: new Decimal(0),  //base generation: 1.75^DarkCheck. 
        UnwantedChromia: new Decimal(0),


        

        TimeTillDarkActive: false,
        TimeTillDark: new Decimal(0),
        TimeTillDarkCheck: false,
        activeCheck: "",

    }},
    color: "#5F506F",
   // Can be a function that takes requirement increases into account
    row: 0,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
 
    symbol() {
       if (options.betterTree) return ``
      else return `
      <p><img src="resources/Lunaris.png" style="width:80px;height:80px;"></p>`
      },
  nodeStyle() {            
       let distance = player.Sol.activeCheck == "Heliosphere" ? 0.5: 1.5
       let XoffSet = -3.15+(distance*Math.PI*Math.cos(nodePos.tick/60))
       let YoffSet = 1+(distance*Math.PI*Math.sin(nodePos.tick/60))
                                              //true      //false (resting pos)
       nodePos.LunarisX = options.animateTree ? XoffSet   :    0.9                                       
       nodePos.LunarisY = options.animateTree ? YoffSet  :   0.9 
       
       let size = player.L.TimeTillDarkActive ? "scale(2,2)"  : (player.Sol.activeCheck == "Heliosphere" ? "scale(0.6,0.6)" : "scale(1,1)")

      return { // 
          "padding":  options.betterTree ? "10px" : "0px",
          "bottom": options.betterTree ? nodePos.LunarisY+"cm" : "2cm",
          "right": options.betterTree ? nodePos.LunarisX+"cm":"0",
          "height": options.betterTree ? "80px": "120px",
          "width": options.betterTree ? "80px" : "120px",
          "border": "var(--hqProperty1)",
          "border-color": player.borders["L"],
          "border-radius": "60%",
           "transform":options.betterTree ? size : "", //For heliosphere
          "z-index":options.betterTree && player.Sol.activeCheck == "Heliosphere" ?  1 : 100000
      }

    },

    //L1, D1, L2, D2, L3, DT2, D3
         update(diff) {          
         if (player.L.DarkCheck.gte(1)) player.L.Dark = player.L.Dark.plus(getBaseCheckGen("Dark").times(diff))   
         if (player.L.LightCheck.gte(1)) player.L.Light = player.L.Light.plus(getBaseCheckGen("Light").times(diff))
         
         if (player.L.Light.gte(player.L.LightCheck.pow_base(8).mul(100)) || player.L.Dark.gte(player.L.DarkCheck.pow_base(8).mul(100)) ) 
         if (getClickableState("L",41) || getClickableState("L",42)) player.L.UnwantedChromia = player.L.UnwantedChromia.plus(player.L.LightCheck.mul(player.L.DarkCheck).mul(diff))
 
         let flow = player.E.TopLVL.div(10) // the base gain generation
         let Baseincrement = new Decimal(1) // speed
         if (TSolStones(4).unlocked) Baseincrement = Baseincrement.mul(TSolStones(4).effect)
         if (player.L.Lunarity == true) player.L.LunarPower = player.L.LunarPower.plus(flow.times(Baseincrement.times(diff)))

//LPboost.mul(diff)


// Time Until Dark Check
if (player.L.activeCheck == "TimeTillDark" && player.L.TimeTillDark.gt(0)) {
  player.L.TimeTillDark = player.L.TimeTillDark.sub(diff)
  }

  if (player.Sol.TBSun.x.gte(5)) player.L.LunarEssence = player.L.LunarEssence.plus(tmp["L"].Reset[11].gain.pow(0.25).times(diff))
    
        },
         
    tabFormat: {
        "Him...": {      
              content: [
                
                
                ["display-text",
      function() { //remember to make more dialogue (or move them to Storyline)

        let startFORGETTING = ``
        if (getClickableState("E",14)) startFORGETTING = `...these chains... help... they require... the shadows... to chip away...`

        let postLunarity = ``
        if (player.L.Lunarity == true) postLunarity = `
        Thank you... i will help you... I hope i will not become useless to you...`

        let postRestabalize = ``
        if (player.L.LunarEssence.gt(0)) postRestabalize = `
        <br>J-Just what do you think you are doing with my...`

        let PostLight= ``
        if (player.L.LightCheck.gte(1) && player.L.DarkCheck.gte(1)) PostLight = `
        <br>...What the hell? what is this~ What are you doing user???? with my power?`


        return `
        *You see a mysterious gray figure, chained into a wall, all bloody and covered with cuts and bruises* <br> 
        s-so i was not wrong then... t-there is someone around <br> 
        Y-You're constricted by the masses too huh?<br>
        O-Oh~ <h3>he</h3> does not like it when someone uses the expander... and breaches the limit <br>
        ...these chains? you want them off? you have to-... use your resourses... please... help... <br>
        ${startFORGETTING}
        ${postLunarity}
        ${postRestabalize}
        ${PostLight}
        
        
        `

     }],
     "blank",
    ["Viewer",  {id:11, title: "Lunaris Stat Viewer"}],

     

    ["Reset", {id:11, title: "RESTABILIZATION"}],
    "blank",
    //tmp[this.layer].Reset[11].gain

                //"main-display",
                ["clickable",11],
                ["clickable",21],
                ["clickable",31],
                "blank",
                
                ["row", [ //check upgrades
                  ["clickable",41],
                  ["clickable",42],
                ]],
                
                
                ["row", [
                  ["buyable",11],
                  ["buyable",12],
                  ["buyable",31],
                ]],
             
               "blank",
               "blank",
               
                "blank",
                "blank",
                "blank",
                
            ],
            
        },
        "???" : {
          content: [
            //"buyables",
          
          ["display-text",
            function() { 
      
             
              
              //if (time.getHours() > 12) hours = hour
              return `The Solar Clock: <h3>${TimeIs}</h3>`
      
           }],
           "blank",
           ["column", [
              ["bar", 11],
              ["bar", 12],
          
          ]],

        
          ["row", [
            ["clickable",51],
            ["clickable",52],
          ]],
          
          ["row", [
            
            ["buyable",21],
            
        
            ["buyable",22],
            
          ]],



          ["column", [
            "blank",
            "blank",
             ["display-text",
            function() {
              
              if (getBuyableAmount("L",21).gte(2) && getBuyableAmount("L",22).gte(2)) // DT2 and NT2
                return `Chronology`; 
              else if (player.E.EclipseTier.gte(6) && getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5)) return `Re-unlock "Chronology" at DT2 and NT2`
              else if (player.E.EclipseTier.gte(6)) return `Re-Unlock "The Solar Clock" at Ektrosity #10 and Basity I #5`
                else return `Requires Solock 16`
           }],


          ["row", [
            
            ["upgrade",11],
            
        
            ["upgrade",12],

            ["upgrade",13],
            
          ]],


          ["row", [
            
            ["upgrade",21],
            
        
            ["upgrade",22],

            ["upgrade",23],
            
          ]],

          ]],
          ["Check", {id:11, item: "TimeTillDark"}]
          
         
        ],       

         //
       
        },
       
      },
      bars: {
              11: {   
                  direction: RIGHT,
                  width: 500,
                  height: 60,
                  //textStyle: {"color" : ""},
                  borderStyle: {"color" : "#707CD3"},                  
                  fillStyle() {
                    let Time = new Date()
                    if (Time.getHours() >= 12) return {"background-color" : "#707CD3"}; else return {"background-color" : "#DFE804"}
                  },
                  baseStyle() {
                    let Time = new Date()
                    if (Time.getHours() >= 12) return {"background-color" : "#1A0031"}; else return {"background-color" : "#494C00"}
                  },
                  textStyle() {
                    let Time = new Date()
                    if (Time.getHours() >= 12) return {"color" : "#0F1752"}; else return {"color" : "#ABA250"}
                  },
                  progress() { 
                    let Time = new Date()
                    maxHours = 24
                    let currTimeHours = Time.getMinutes()
                     return currTimeHours/60
},
                  display:()=>`<br>Hour: ${new Date().getHours() % 12} / 12`,

                
                    
                      style() {
                        return {
                          
                          "margin": "0px",
                          "text-shadow": "0px 0px 0px #000000",
                          "color" : "363055",
                      
                      }

                      },
                    
                    unlocked() {
                      if (getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5)) return true
                    }

                     //let currTimeHours = new Decimal(Time.getHours() - 12)

              },
              12: {
                direction: RIGHT,
                width: 500,
                height: 60,
                textStyle() {
                  let Time = new Date()
                  if (Time.getHours() >= 12) return {"color" : "#0F1752"}; else return {"color" : "#ABA250"}
                },
                //textStyle: {"color" : "#323361"},
                //baseStyle: {"background-color" : "#1A0031"},
                borderStyle: {"color" : "#707CD3"},
                fillStyle() {
                  let Time = new Date()
                  if (Time.getHours() >= 12) return {"background-color" : "#707CD3"}; else return {"background-color" : "#DFE804"}
                },
                baseStyle() {
                  let Time = new Date()
                  if (Time.getHours() >= 12) return {"background-color" : "#1A0031"}; else return {"background-color" : "#494C00"}
                },
                //8D9300
                progress() { 
                  let Time = new Date()
                  maxMinutes = new Decimal(59)
                  
                  let currTimeMinutes = new Decimal(Time.getSeconds())
                   return currTimeMinutes.div(59)
},
                display() {
                  let Time = new Date()
                  maxMinutes = 59
                  
                  let currTimeMinutes = Time.getMinutes()
                   return `Minutes: ${currTimeMinutes} / ${maxMinutes} (${format((currTimeMinutes/maxMinutes)*100,2)}%)`},

               unlocked() {
                      if (getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5)) return true
                    },
                
                   //player.L.Lunarity == true

                    },
                   
                   //let currTimeHours = new Decimal(Time.getHours() - 12)

            },
          

    tooltip: () => options.animateTree || options.betterTree ? `<h3>Lunaris, The Lunar Sun. </h3><br>
<h5><i> ${getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5)? "The solar clock reads: " + TimeIs : ""}</i></h5>` : `<p>Open Layer 2, Lunaris</p><br>
<h5><i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time: ${getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5)? TimeIs : ""} `,
 upgrades: { 
 
//First row
  11: {
    fullDisplay() {
     baseEffect = player.C.CenterPoints.pow_base(5)
     trueEffect = baseEffect.pow(1.15)
     difEffect = trueEffect.div(baseEffect)

      
        return `<h2>6:00 </h2> <br>
        Requires: Hour must be equal to 6 (at night) to purchase.<br><br>
        
        Heirarchy is raised to 1.15  <br>
        Effect: ${format(baseEffect)} -> ${format(trueEffect)}<br>
        This is essentially a ${format(difEffect)}x boost to Heirarchy. meaning (if you have )
     
        `
    },
    unlocked() {
      if (getBuyableAmount("L",21).gte(1) && getBuyableAmount("L",22).gte(1)) return true
      },
    style() {
      
      return {
        "width": "175px",
        "height": "75px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "2px",
        "text-shadow": "1px 1px 10px #ffa500",
        "color": "#ffffff"
      }
    },
    effect() {
      let effect = new Decimal(1)
      
      if (hasUpgrade("L",11)) effect = effect.mul(player.L.LunarEssence.root(1.35))
      return effect

    },
    canAfford() {
      let Time = new Date()
	  return Time.getHours() == 18
    },
    pay() {
     player.L.LunarEssence = player.L.LunarEssence.root(5)
      
    }

},
  12: {
  fullDisplay() {
   baseEffect = player.E.SolarCharge
   trueEffect = baseEffect.max(1).log(5).pow(0.8)
   difEffect = trueEffect.div(baseEffect)

    
      return `<h2>8:00 </h2> <br>
      Requires: Hour must be equal to 6 (at night) to purchase.<br><br>
      
      Solar Charge boosts Multiply and Plasmate at a reduced rate <br>
      Effect: ${format(baseEffect)} -> x${format(trueEffect,2)}<br>
     
   
      `
  },
  unlocked() {
    if (getBuyableAmount("L",21).gte(1) && getBuyableAmount("L",22).gte(1)) return true
    },
  style() {
    
    return {
      "width": "175px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "2px",
      "text-shadow": "1px 1px 10px #ffa500",
      "color": "#ffffff"
    }
  },
  effect() {
    
    baseEffect = player.E.SolarCharge
    effect = baseEffect.max(1).log(5).pow(0.8)

    
    return effect

  },
  canAfford() {
    let Time = new Date()
	  return Time.getHours() == 20 
  },
  pay() {
   player.L.LunarEssence = player.L.LunarEssence.root(5)
    
  }

},
  13: {
  fullDisplay() {
   baseEffect = player.C.CenterPoints
   
      return `<h2>4:00 </h2> <br>
      Requires: Hour must be equal to 4 (at night) to purchase.<br><br>
      
      CP divides its own requirement <br>
      Effect: /${format(baseEffect.mul(2.5).plus(1),2)} CP Requirement cost <br>
     
   
      `
  },
  unlocked() {
    if (getBuyableAmount("L",21).gte(1) && getBuyableAmount("L",22).gte(1)) return true
    },
  style() {
    
    return {
      "width": "175px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "2px",
      "text-shadow": "1px 1px 10px #ffa500",
      "color": "#ffffff"
    }
  },
  effect() {
    //let effect = new Decimal(1)
    
    if (hasUpgrade(this.layer,this.id)) return player.C.CenterPoints.mul(2.5).plus(1)
    

  },
  canAfford() {
    let Time = new Date()
	  return Time.getHours() == 16

   
  },
  pay() {
   player.L.LunarEssence = player.L.LunarEssence.root(5)
    
  }

},

//Second row.
  21: {
  fullDisplay() {

   baseEffect = player.C.CenterPoints
   
      return `<h2>Zykochare </h2> <br>
      Quest: get at least 40 CP while inside Dark Check <br><br>
      
      Add a new Viable to the Solar Charge formula, and unlock Duality<br>      
      <br>
      `
  },
  unlocked() {
    if (getBuyableAmount("L",21).gte(1) && getBuyableAmount("L",22).gte(1)) return true
    },
  style() {
    
    return {
      "width": "175px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "2px",
      "text-shadow": "1px 1px 10px #ffa500",
      "color": "#ffffff"
    }
  },
  effect() {
    //let effect = new Decimal(1)
    
    if (hasUpgrade(this.layer,this.id)) return player.C.CenterPoints.mul(2.5).plus(1)
    

  },
  canAfford() {
  return(getClickableState("L",42) && player.C.CenterPoints.gte(40)) 
  },
  

},
22: {
  fullDisplay() {

   baseEffect = player.C.CenterPoints
   
      return `<h2>SK-32</h2> <br>
      Quest: Reach 1.15e11 Solar Light while inside Light check <br><br>
      
      Phasers cost is ^0.85. and Raise its effect by 1.15 <br>      
      <br>
      `
  },
  unlocked() {
    if (getBuyableAmount("L",21).gte(1) && getBuyableAmount("L",22).gte(1)) return true
    },
  style() {
    
    return {
      "width": "175px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "2px",
      "text-shadow": "1px 1px 10px #ffa500",
      "color": "#ffffff"
    }
  },
  effect() {
    //let effect = new Decimal(1)
    
    if (hasUpgrade(this.layer,this.id)) return player.C.CenterPoints.mul(2.5).plus(1)
    

  },
  canAfford() {
     return (getClickableState("L",41) && player.GL.Solarlight.gte(1.15e11)) 

   
  },
 

},          
23: {
  fullDisplay() {
   // baseEffect = new Decimal(0)
   let baseEffect = player.C.CenterPoints.pow_base(1.15)
   // Good luck! here is something to help you for This huge Check Upgrade.
   // if (hasUpgrade("L",23)) 
    let eff = ``
    if (hasUpgrade(this.layer,this.id)) eff = `Anaphalagia's effect is ${baseEffect}`
        return `<h2>Anaphalagia</h2> <br>
      Quest: Reach Multiply #247 while inside Dark Check <br><br>
      Requires: Zykochare and SK-22
       <br>   
      Plasmate and Multiply is boosted on Center Points
      
      <br>
      `
  },
  unlocked() {
    if (getBuyableAmount("L",21).gte(1) && getBuyableAmount("L",22).gte(1)) return true
    },
  style() {
    
    return {
      "width": "175px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "2px",
      "text-shadow": "1px 1px 10px #ffa500",
      "color": "#ffffff"
    }
  },
  effect() {
    //let effect = new Decimal(1)
    
    if (hasUpgrade(this.layer,this.id)) return player.C.CenterPoints.pow_base(1.15)
    //return new Decimal(1)

  },
  canAfford() {
     return (getClickableState("L",42)== true && getBuyableAmount("S",12).gte(247) && hasUpgrade("L",21) && hasUpgrade("L",22)) 

   
  },
  

},  





            },
 Reset: {
    11: {
      display() {
          let resetText = `Since this is your first reset, you will unlock lunar buyables.`
          if (player.L.LunarEssence.gt(0)) resetText = ``
          if (player.L.LunarPower.gte(100) || player.L.LunarEssence.gt(0) || player.E.EclipseTier.gte(6)) return `
            Doing a Restabilization will Reset everything similar recontrol does as well as Best Enlightenment levels and Lunar Power.<br> 
            <br> Restabilize Requirements: 100 Lunar Power
            <br> You will earn ${format(tmp["L"].Reset[11].gain)} Lunar Essence before reset
            ${resetText}
          `
        },     
      onClick() {
        let gain = tmp["L"].Reset[11].gain
        
        //fix later, the NaN is from player.S.poweredInst
        player.L.LunarPower = new Decimal(0.00000000000001)                                              
        player.L.LunarEssence = player.L.LunarEssence.plus(gain)
        EclipsiumReset()
        player.E.TopLVL = new Decimal(0)
        },
      canClick() {if (player.L.LunarPower.gte(100)) return true},
      
      gain: () => { 
        let bonus = player.E.EclipseTier.sub(5).pow_base(3); 
        
        return player.E.EclipseTier.gte(6) ? player.L.LunarPower.clampMin(1).log(5).mul(bonus) : player.L.LunarPower.clampMin(1).log(5)
      },
      button: () => { return `Restabilize Abnormalities` },
      unlocked() {
        if (player.L.Lunarity) return true; else false;
      },
  },          
 },
 Viewer: {

      11: {
        display() {
          let LI_gain = TSolStones(4).unlocked ? player.E.TopLVL.div(10).mul(TSolStones(4).effect) : player.E.TopLVL.div(10)
          
         

          let TBSunP = player.Sol["TBSun"].pending
          let TBSun = player.Sol["TBSun"].x
          
          let plural = TBSun.plus(TBSunP).gte(3) ? `'s` : ``

          let Display = ``; let c1 = ``;let c1debufftext = ``; let c2 = ``; let c3 = ``; let c4 = ``; let c5 = ``; let THEBLEEDINGSUN = ``; let c6b = ``;
          let c1effect = decimalOne.plus(player.L.LunarPower.log(5)).pow(player.L.LunarPower.log(2)).clampMin(1)

          // Broken core's influence
          let BC2_INFL = false
          if (player.Sol["TBCore"].active && getCoreDifficulty().eq(2)) BC2_INFL = true
//-------------------------------------------          
          //The Bleeding Sun 1 & 2
          let BLEEDINGSUN_POWER = 1
          if (BC2_INFL) BLEEDINGSUN_POWER = 7 // Broken core influence
          else if ( player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(1)) BLEEDINGSUN_POWER = TBSun.plus(TBSunP).mul(2).plus(1)
          let base_NOMERCYDEBUFF = decimalOne.plus( player.L.LunarPower.log(7.5)).pow(player.L.LunarPower.log(4)) .clampMin(1).pow(BLEEDINGSUN_POWER)
          let c1NOMERCYDEBUFF = base_NOMERCYDEBUFF
//-------------------------------------------
          //The Bleeding Sun 3
          let BLED_SOLARS = decimalZero
          if (BC2_INFL) BLED_SOLARS = 0.27 // Broken core influence
          else if (TBSun.plus(TBSunP).gte(3)) BLED_SOLARS = TBSunP.plus(TBSun).div(11)
          let BLEEDING_SOLARS = base_NOMERCYDEBUFF.pow(BLED_SOLARS)  
          let BLEEDING_SOLARS_Text = (TBSun.plus(TBSunP).gte(3)) || BC2_INFL ? `Solar reduction: <h4 style="color:rgba(255, 122, 39, 1); text-shadow: 0px 0px 30px rgba(157, 38, 38, 1);">
          ${format(BLEEDING_SOLARS)}
          </h4><br>` : ``
//-------------------------------------------
          // The Bleeding Sun 5

          let BLED_BUYABLES = decimalZero
          if (TBSun.plus(TBSunP).gte(5)) BLED_BUYABLES = 0.27
          let BLEEDING_BUYABLES = base_NOMERCYDEBUFF.pow(BLED_BUYABLES)  
          let BLEEDING_BUYABLES_Text = (TBSun.plus(TBSunP).gte(5))  ? `Plasmate and Multiply is <h4 style="color:rgba(255, 154, 39, 1); text-shadow: 0px 0px 30px rgba(107, 22, 22, 1);">
          ${format(BLEEDING_BUYABLES)}
          
          </h4> weaker.<br>` : ``

          

          //Lunar Instability debuff
          let c1debuff = decimalOne.plus((player.L.LunarPower.sub(100).log(7.5)).pow(player.L.LunarPower.sub(100).log(4))  .pow(new Decimal(0.9).pow(player.Sol["TBSun"].x)) ).clampMin(1)
          
        
          
          
            let c1Text = `<h4 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;">Reduce Solarity gain by ${format(c1debuff)} (Based on Lunar Abnormality's effect)</h4>`
            if (player.Sol["TBSun"].active || BC2_INFL) THEBLEEDINGSUN = `The Bleeding Sun's Effect${plural} : 
            <h4 style="color:rgb(255, 89, 39); text-shadow: 0px 0px 30px rgb(205, 49, 49);">/${format(c1NOMERCYDEBUFF)} to Solarity gain</h4><br>
            ${BLEEDING_SOLARS_Text}
            ${BLEEDING_BUYABLES_Text}
            `
                      

          c1 = ``; c2 = ``
          if (player.L.LunarPower.gte(100) && !player.Sol["TBSun"].active && !(player.Sol.TBCore.active && getCoreDifficulty().gte(2) )) c1debufftext = `
          <h3 style="color: #353852; text-shadow: 0px 0px 2px #ffffff";>Lunar Instability: </h3>
          ${c1Text}
          
          `
    
  
            if (player.L.LunarPower.gt(0)) c1 = `Lunar Abnormality multiplies solarity gain cap by ${format(c1effect)} <br>`       
            if (player.L.LunarEssence.gt(0)) c2 = `<h3 style="color: #353852; text-shadow: 0px 0px 2px #ffffff";>Lunar Essence: ${format(player.L.LunarEssence)}.</h3>`  

            if (player.L.Dark.gt(0)) c3 = `Dark: ${format(player.L.Dark)} boost to Solarity Gain Cap and ${format(player.L.Dark.pow(0.3))} boost to Solarity`
            if (player.L.Light.gt(0)) c4 = `Light: ${format(player.L.Light)} boost to Solarity Gain Cap and ${format(player.L.Light.pow(0.25))} boost to Solar Rays`
            
            if (player.L.UnwantedChromia.gt(0) && ( getClickableState("L",41) || getClickableState("L",42) ) ) c5 = `<h4 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;"> Unwanted Chromia: Divides Light and Dark generation by ${format(player.L.UnwantedChromia.log(10))}</h4>`

            if (getBaseCheckGen("Light").eq(getBaseCheckGen("Dark"))  )
           Display = "Light & Dark Generations: " + format(getBaseCheckGen("Dark"))
            else if (player.L.Light.div(player.L.Dark).lte(9) && player.L.Dark.div(player.L.Light).lte(9))
           Display = "Light & Dark Generations: ~" + format(getBaseCheckGen("Dark"))   
            else
           Display = "Light Generation: " + format(getBaseCheckGen("Light")) + " | " + "Dark Generation: " + format(getBaseCheckGen("Dark"))
            
            if (player.Sol.activeCheck == "Heliosphere") Display = ``


           

            // player.Sol.HelioStat["Lunar_Abnorm"]
          // display everything
          
            if (player.Sol.activeCheck == "") return `
              <h3 style="color: #353852; text-shadow: 0px 0px 2px #ffffff";> Lunar Abnormality: ${format(player.L.LunarPower)} (+${format(LI_gain)}/sec). <br>${c1}</h3>
              ${c1debufftext}
              ${THEBLEEDINGSUN} <br> 


              ${c2}<br>  
              <h3 style="color: #160a21; text-shadow: 0px 0px 2px #ffffff";>${c3}<br>${c4}</h3>

              <br>${c5}<br>
              <h3 style="color: #160a21; text-shadow: 0px 0px 2px #ffffff";>
              ${Display}
                </h3>
               `
            else return `
                <h1 style="color:rgba(192, 0, 0, 0.5); text-shadow: 0px 0px 2px #ffffff"; > ${format(player.Sol.HelioStat["Lunar_Abnorm"])} </h1> <br>
                <h2 style="color:rgba(81, 0, 0, 0.43); text-shadow: 0px 0px 2px rgba(152, 0, 190, 0.45)";> ${format(player.Sol.HelioStat["Lunar_Abnorm"].clampMin(101).sub(100).log(7.5).pow(player.Sol.HelioStat["Lunar_Abnorm"].clampMin(101).sub(100).log(4)))} </h2> <br>
                <h2 style="color:rgba(100, 247, 51, 0.5); text-shadow: 0px 0px 10px rgba(251, 255, 167, 0.74)";> 
                ${format(player.Sol.HelioStat["Light"])}</h2> ->  
                 <h3 style="color:rgba(204, 0, 0, 0.3); text-shadow: 0px 0px 50px rgba(196, 104, 4, 0.67);"> ${format(player.Sol.HelioStat["Light"].pow(0.25))} </h3> <br>
                <h2 style="color:rgba(75, 150, 255, 0.5); text-shadow: 0px 0px 10px rgba(202, 167, 255, 0.74)";> ${format(player.Sol.HelioStat["Dark"])} </h2> -> 
                 <h3 style="color:rgba(94, 65, 27, 0.61); text-shadow: 0px 0px 10px rgb(86, 0, 0);"> ${format(player.Sol.HelioStat["Dark"].pow(0.3))} </h3>
                <br>
            `  
         
        
              

        },
        

        unlocked() {
         return player.L.Lunarity == true
        }


      },

    },

    //DEV NOTE: MAKE THIS DOABLE IN Day TIME, or set it to DAY time 
 Check: {
  11: {
    display() {

      //(increases by 1.35 per hour)

      let incNum = 1.35 / 59
      let base = 34
      let coreDiff = toNumber(getCoreDifficulty())
      const time = new Date();
      if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) base = base + (8 * (coreDiff - 1))
      let goal = base + (time.getMinutes() ** 1.085 * incNum * coreDiff)
      
      // every minute 

        let text = ``
        if (!player["L"].TimeTillDarkCheck) text = `
       <span style="font-size:11px"> 
          Requires Time of x:3x to enter<br>
          Recommended Time of 1x:3x<br>
            - Eclipse Tier Bosuses are disabled <br>
            - Solarity gain and cap is ^0.6. Solarity cap base starts at 1<br>
            - Every minute that passes in this check upgrade divides Solar gain cap by 100 compounding<br>
            - It will also reset Solarity every minute (NYI)
            - You will be given a timer to complete this check upgrade.<br></h4> <h3 style="color: #d81111"> Do not let it reach 0. <br>
          Recommend turning off autosave before entering this check because this can softlock you! (Ill add a death counter for 4MUD soon...)
        </span> `
        else if (player["L"].TimeTillDarkCheck) text = `
                  (Permenant Unlock) Unlock Eclipse Tier 6. <br> 
                  Move eclipsium bonus cap to 1e10
                  `
       
        if (player.L.activeCheck == "TimeTillDark") text = `
        You know when to leave...<br> Remember: <p style="color: #d81111"> Do not let it reach 0.</p>`
        if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) return `<h1>It requires ${format(goal)} Core Energy...</h1>`
        return `             
        ${text}
      `
      }, 
    onClick() {
        if (player.L.activeCheck == "TimeTillDark" && Check("L",11).CompReq == true ) {
          
          player["L"].TimeTillDarkCheck = true
          player["L"].activeCheck = ""
         
          player.L.Light = new Decimal(0)
          player.L.Dark = new Decimal(0)
            
          if (storedChecks[1]) player.C.hasFormality = true
          if (storedChecks[2]) player.C.hasHeirarchy = true
          player.C.hasTwilight = true
          storedChecks = []
        }
        else if (Check("L",11).canEnter == true) {
          player.L.TimeTillDark = new Decimal(243)
          player.L.activeCheck = "TimeTillDark"; layer2Reset(true)

          if (Check("C",11).has) storedChecks.push(player.C.hasFormality); else false
          if (Check("C",12).has) storedChecks.push(player.C.hasHeirarchy); else false 
          if (Check("C",13).has) storedChecks.push(player.C.hasTwilight); else false
          
          player.C.hasFormality = false; player.C.hasHeirarchy = false; player.C.hasTwilight = false

          TillDark.play();
          doPopup("msg","Good luck...", "Lunaris",8)
        }
      },
  
    unlocked() {
      if (hasUpgrade("L",23) || player.E.EclipseTier.gte(6)) return true
      else false
      },
      
    canEnter() {
            return (Check("L",11).EnterReq == true && !Check("L",11).has)                                                             
            },  
    EnterReq() {
      let Time = new Date() 
      let Minutes = Time.getMinutes()

        return true
        //(Minutes >= 30 && Minutes < 40)  
      },   
    CompReq() {
        return (player.points.gte(2.91e41) && player.C.CenterPoints.gte(40) && player.L.TimeTillDark.gt(0))
      },
    has() { return player["L"].TimeTillDarkCheck },

    png() {if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) return `<p><img src="resources/The Cores Vision.png" style="width:100px;height:100px;"></p> `
         else return `<p><img src="resources/4 Minutes Until dark.png" style="width:150px;height:150px;"></p> `},

    

    },
 },


    buyables: { 
  11: { //Ektrosy
    cost(x) {
      let scale = new Decimal(1.3)
      let base = new Decimal(3)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
      return Calculation;
    },
    display() {



      if (player.L.LunarEssence.gt(0)) return `<h2 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;">Ektrosy #${getBuyableAmount(this.layer, this.id)}</h2>
  <h3>  x${format(tmp[this.layer].buyables[this.id].effect)} to Plasmate
    ^${format(getBuyableAmount("L",11).add(1).log(10).div(5).clampMax(10),3)} of Plasmate's effect Increases the Solarity gain cap</h3>
    (which is ${format(buyableEffect("S",11).pow(getBuyableAmount("L",11).add(1).log(10).div(5)).clampMin(1))} btw)
 <h3> Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Center Points</h3>
  <p> Requires: At least 30 Lunar Power <p>
  <p> Note: this roots Center Points by 1.3 after purchase, you must have more than 1 Center point to buy this upgrade<p>
  ` 
  else return ``
    },
    canAfford() {
      return (player.C.CenterPoints.gte(this.cost()) && player.L.LunarEssence.gt(0) && player.L.LunarPower.gte(30) && player.C.CenterPoints.gt(1))
    },
    buy() {
      
      addBuyables(this.layer, this.id, 1);
      player.C.CenterPoints = player.C.CenterPoints.root(1.3)
    },
    effect() {
      let effect = decimalOne
      effect = getBuyableAmount(this.layer, this.id).pow_base(1.2)
      
      return effect;
    },
    style() {
      return (player.L.LunarEssence.gt(0)) ? 
                     {
                        "width": "320px",
                        "height": "130px",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "10px",
                        "text-shadow": "0px 0px 0px #000000",
                        "color" : "",
                    } : {
                    "width": "0px",
                    "height": "0px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color" : "",
                  }
    },
    unlocked() {
      return (player.L.Lunarity || player.E.EclipseTier.gte(6))
     },
     
  },
  12: { //Basity I
    cost(x) {
      let scale = new Decimal(1.5)
      let base = new Decimal(1)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
      return Calculation;
    },
    display() {//

      let Basity_II = getBuyableAmount("Sol",13).gte(1) ? `<h4>(1.2 -> ${format(getBuyableAmount("Sol",13).div(100).plus(1.2))}) </h4>` : ``

      if (player.L.LunarEssence.gt(0)) return `<h2 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;">Basity I #${getBuyableAmount(this.layer, this.id)}</h2>
  <h3>  x${format(tmp[this.layer].buyables[this.id].effect)} to Multiply</h3> ${Basity_II}
  <h3>  ^${format(getBuyableAmount("L",12).add(1).log(10).div(15),3)} of Multiply's Effect Increases the Solarity gain cap</h3>
  (which is ${format(buyableEffect("S",12).pow(getBuyableAmount("L",12).add(1).log(10).div(15)))} btw)
  <h3> Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Lunar Essence</h3>
  <p> Requires: At least 30 Lunar Power <p>
  <p> Note: this roots Lunar Essence and Lunar Power by 1.3 instead of subtracting amount<p>
  ` 
  else return ``
    },
    canAfford() {
      return player.L.LunarEssence.gte(this.cost()) && player.L.LunarEssence.gt(0) && player.L.LunarPower.gte(30)
    },
    buy() {
      addBuyables(this.layer, this.id, 1);
      player.L.LunarPower = player.L.LunarPower.root(1.3).round()
      player.L.LunarEssence = player.L.LunarEssence.root(1.3).round()
    },
    effect() {
      let effect = decimalOne

      let baseCompEffect = new Decimal(1.2).plus(getBuyableAmount("Sol",13).div(100))

      let Basity_II = getBuyableAmount("Sol",14).pow_base(1.35)

      effect = getBuyableAmount(this.layer, this.id).pow_base(baseCompEffect).mul(Basity_II)
      
      return effect;
    },
    style() {
      return (player.L.LunarEssence.gt(0)) ? 
                     {
                        "width": "320px",
                        "height": "130px",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "10px",
                        "text-shadow": "0px 0px 0px #000000",
                        "color" : "",
                    } : {
                    "width": "0px",
                    "height": "0px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color" : "",
                  }
    },
   unlocked() {
    return (player.L.Lunarity || player.E.EclipseTier.gte(6))
   },
     
  },
  

  //DET1 and NET1
  21: {
    cost(x) {
      let scale = new Decimal(1.5)
  
      let base = new Decimal(10)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))

      if (getBuyableAmount(this.layer,this.id).lt(5) && player.C.CenterPoints.lte(0) && player.GL.points.lte(0) && player.E.EclipseTier.lte(0)) Calculation = Calculation.div(1.1)
      return Calculation;
    },
    
    unlocked() {
      if (getBuyableAmount("L",22).gte(3)) return false
      return ((getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5)) || player.E.EclipseTier.gte(6))
      //change to Light/Dark check #2 or #3 later

    },
    display() {  
    let b = new Decimal(1)
    let firstSc = b.times(1000).times(getBuyableAmount(this.layer,this.id).pow_base(100))
    let secondSc = b.times(2).plus(getBuyableAmount(this.layer, this.id).mul(2).round()).sub(1)
    let A = ``
    if (getBuyableAmount(this.layer,this.id).eq(0)) A = `Activate SOLAR TIME` 
    if (getBuyableAmount(this.layer,this.id).gte(1)) A = `Find another D-Time effect`
    if (getBuyableAmount(this.layer,this.id).eq(2)) A = `Find the final D-Time effect`
    if (getBuyableAmount(this.layer,this.id).eq(3)) A = `[Maxed]`

      let DT = ``
      if (getBuyableAmount(this.layer,this.id).eq(0)) DT = `Requires:
      - 36 Center Points
      - 8.4e86 Solar Rays 
      - Hour must be Day
      `
      if ( getBuyableAmount(this.layer,this.id).gte(1) && !getBuyableAmount("L",this.id).neq(3) ) DT = `Requires:
      - ${firstSc} Light
      - Light Check #${secondSc} 
      `
      return `<h2>${A}</h2>
  <h3>${DT}</h3>
(Divides Light Amount by a root of 3)
  `
    },
    canAfford() {
      const currTime = new Date()


      
      let b = new Decimal(1)

      let firstSc = b.times(1000).times(getBuyableAmount(this.layer,this.id).pow_base(100))
      let secondSc = b.times(2).plus(getBuyableAmount(this.layer, this.id).mul(2).round()).sub(1)


      if (getBuyableAmount(this.layer,this.id).eq(0)) 
      {
        if (player.C.CenterPoints.gte(36) 
      && player.S.points.gte(8.4e86)
      && currTime.getHours() <= 12
    
      )
       return true;
      } 


      else if (getBuyableAmount(this.layer,this.id).gte(1) ){ 
        if (player.L.Light.gte(firstSc) && player.L.LightCheck.gte(secondSc) && getBuyableAmount(this.layer,this.id).lt(3)) return true}
        
      



    },
    buy() {
      player.L.Light = player.L.Light.root(3)

      /*
      
      */




      addBuyables(this.layer, this.id, 1);
    },

    style() {
      return {
        "width": "250px",
        "height": "155px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
   
     
  },

  //Night Tier Effects
  22: {
    cost(x) {
      let scale = new Decimal(1.35)
      let base = new Decimal(5)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
      if (hasUpgrade("GL",11)) Calculation = Calculation.pow(0.9).div(3)
      if (getBuyableAmount(this.layer,this.id).lt(5) && player.C.CenterPoints.lte(0) && player.GL.points.lte(0) && player.E.EclipseTier.lte(0)) Calculation = Calculation.div(1.1)
      return Calculation;
    },
    buyMax() {
      let scale = new Decimal(1.34);
    //  if (hasMilestone("E",1)) scale = scale.times(1.01)
      let base = new Decimal(5);
    
      let amount = player.S.points;
      if (hasUpgrade("GL", 11)) amount = amount.root(0.9).times(3); // upgrade effect is applied last, so it's undone first
      amount = amount.dividedBy(base).log(scale); // then undo the normal calculations
    
      amount = amount.ceil(); // then only at the very very end, floor()
    
      setBuyableAmount("S", 11, amount.plus(1));
     // player.S.points = player.S.points.minus(this.cost(amount));
    },

    unlocked() {
      if (getBuyableAmount("L",22).gte(3)) return false
      return ((getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5)) || player.E.EclipseTier.gte(6))
    },
    display() {
      let b = new Decimal(1)

      let firstSc = b.times(1000).times(getBuyableAmount(this.layer,this.id).pow_base(100))
      let secondSc = b.times(2).plus(getBuyableAmount(this.layer, this.id).mul(2).round()).sub(1)


      let NT = ``
      if (getBuyableAmount(this.layer,this.id).eq(0)) NT = `Requires:
      - 38 Center Points
      - 1.5e11 Solar Light
      - Dark Check #1 
      - Hour must be Night
      `
      if (getBuyableAmount(this.layer,this.id).gte(1) && !getBuyableAmount("L",this.id).neq(3)) NT = `Requires:
      - ${firstSc} Darkness
      - Dark Check #${secondSc} 
      `

      let A = ``
    if (getBuyableAmount(this.layer,this.id).eq(0)) A = `Activate LUNAR TIME` 
    if (getBuyableAmount(this.layer,this.id).gte(1)) A = `Find another L-Time effect`
    if (getBuyableAmount(this.layer,this.id).eq(2)) A = `Find the final L-Time effect`
    if (getBuyableAmount(this.layer,this.id).eq(3)) A = `[Maxed]`

      return `<h2>${A}</h2>
     <h3>${NT}</h3>
  (Resets Dark amount upon unlocking)
  `
    },
    canAfford() {
      const currTime = new Date()

      let b = new Decimal(1)

      let firstSc = b.times(100).times(getBuyableAmount(this.layer,this.id).pow_base(100))
      let secondSc = b.times(2).plus(getBuyableAmount(this.layer, this.id).mul(2).round()).sub(1)



      if (getBuyableAmount(this.layer,this.id).eq(0) && player.C.CenterPoints.gte(38) && player.GL.Solarlight.gte(1.5e11) && currTime.getHours() >= 12  ) return true;
      else {
          if (getBuyableAmount(this.layer,this.id).gte(1)) { 
             if (player.L.Dark.gte(firstSc) && player.L.DarkCheck.gte(secondSc) && getBuyableAmount(this.layer,this.id).lt(3)) return true
      
            };
          }
    },
    buy() {
      player.L.Dark = player.L.Dark.root(3)
      addBuyables(this.layer, this.id, 1);
    }, 
    effect() {
     
    },
    style() {
      return {
        "width": "250px",
        "height": "155px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
   
     
  },

  31: { //Duality
    cost(x) {
      let scale = new Decimal(1.86)
      let base = new Decimal(100000)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x)).pow(1.05)
      return Calculation;
    },
    display() {
      let AdvancedV = ``
      let O = player.E.SolarCharge.log(2).add(1)
      
      let B = Decimal.add(1 , player.E.Esolar.clampMax(10000).log(2))
      let S = buyableEffect("L",31).log(4)
      if (getBuyableAmount(this.layer, this.id).gte(1)) AdvancedV = `Log2(C) = ${format(B)} <br> Log4(S) = ${format(S)} <br> B = ${format(B.plus(S).add(1),3)} <br> Log2(Solar Charge) = ${format(O,5)}  `

      if (hasUpgrade("L",21)) return `<h2 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;">Duality #${getBuyableAmount(this.layer, this.id)}</h2>
  <h3>  +${format(tmp[this.layer].buyables[this.id].effect)} To S Viable </h3>
   <br> ${AdvancedV} <br>
 <h3> Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Light and Dark</h3>
  <p> Requires: LightCheck/DarkCheck 4 <p>
  <p> Note: This roots Light and Dark by 1.15 on purchase<p>
  <p>First level unlocks Viable breakdown (in this buyable)</p>
  ` 
  else return ``
    },
    canAfford() {
      return (player.L.Light.gte(this.cost()) && player.L.Dark.gt(this.cost()) && hasUpgrade("L",21))
    },
    buy() {
      
      addBuyables(this.layer, this.id, 1);
      player.L.Light = player.L.Light.root(1.15)
      player.L.Dark = player.L.Dark.root(1.15)
    },
    effect() {
      let effect = decimalZero
      effect = getBuyableAmount(this.layer, this.id).mul(2)
      
      return effect;
    },
    style() {
      return (hasUpgrade("L",21)) ? 
                     {
                        "width": "320px",
                        "height": "175px",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "10px",
                        "text-shadow": "0px 0px 0px #000000",
                        "color" : "",
                    } : {
                    "width": "540px",
                    "height": "0px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color" : "",
                  }
    },
     
  },
  
 },
            
// 1.75e48
  clickables: {
       // DOWN HERE IS A CONVERTARY RESET.

      11: { //Lunarity
                    display() {
                      
                      if (player.L.Lunarity == false && !player.E.EclipseTier.gte(6)) return `
                       <h2>Lunarity [ONE TIME RESET] </h2><br> <br>
                      Reset Everything Recontrol does as well as Solar Charge, Solonity, Esolar, Chimera, Expansion I, Best Enlightenment Levels, the first three recontrol upgrades and Eclipsium to unlock new content(One time reset) <br> Requires: The Forgotton... Check upgrade completed     
                       `
                      else return `<h2>Lunarity Again...[ONE TIME RESET]</h2>
                      <br> Reset 'The Factory Content', as well as Best Enlightenment levels.
                      <br> Since Eclipse Tier is higher than 5, you just need Astrologic to re-activate Lunarity
                      `

                    },
                    onClick() {
                      player.E.SolarCharge = new Decimal(1)
                      player.E.Solinity = new Decimal(1)
                      player.E.Esolar = new Decimal(1)
                      player.E.Chimera = new Decimal(1)
 
                      if (player.E.EclipseTier.gte(6)) player.E.upgrades = [11,14]; else player.E.upgrades = [14]

                      player.E.Eclipsium = new Decimal(0)
                      player.E.TopLVL = new Decimal(0)
                      player.L.Lunarity = true
                      setBuyableAmount("E",12, new Decimal(0))
                      
                      layer2Reset()
                        
                    },
                canClick() {
  
                  if (!player.E.EclipseTier.gte(6) && player.E.forgotton && player.L.Lunarity == false) return true//this is for later
                  else if (hasUpgrade("E",14)) return true
  
  
                },
                style() { 
                  
                  
                  return {
                        "width": "300px",
                        "height": "100px",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "0px",
                        "text-shadow": "0px 0px 10px #000000",
                        "color" : "",
                      }
  
                },
                unlocked() {if (player.L.Lunarity == false) return true},
                // END OF CLICKABLE CODE
            },

            //

            //Light check: getClickableState("L",41)
      41: { 
        display() {
                    let text = ``
                    let textActive = ``
                    let rewardDisplay = ``
                    let setBaseRequirements = new Decimal(1e15)
                    let projectedMax = player.S.points.div(1e15).log(10000).floor()
                    let maximum = new Decimal(20).plus(player.Sol.TBCore.x.mul(5))
                    let lScale = player.L.LightCheck.gt(dualityScaling["Ignorant"].Start) ? `<h3 style="color:rgb(134, 0, 0);">The light grows Ignorant... (^${format(dualityScaling["Ignorant"].Effect)}) </h3>` : ``
                    let IgnScale = player.L.LightCheck.gte(dualityScaling["Ignorant"].Start) ? (player.L.LightCheck.sub(dualityScaling["Ignorant"].Start)).pow_base(10000) : 1
                    let GetReady = ``
                    let scaleDebuff = ``
                    let Goal_Text = ``
                    setBaseRequirements = setBaseRequirements.mul(player.L.LightCheck.pow_base(10000)).mul(IgnScale)
                    
                    if (projectedMax.gte(dualityScaling["Ignorant"].Start)) projectedMax = player.S.points.mul( dualityScaling["Ignorant"].Start.pow_base(10000).div(1e15) ).log(10000).div(2)
                    if (projectedMax.gte(dualityScaling["Ignorant"].Start) && player.L.LightCheck.lt(dualityScaling["Ignorant"].Start)) scaleDebuff = `NOTE: <h3 style="color:rgb(134, 0, 0);">Ignorant scaling has become active... </h3>`
                     
                    // if is in check and is over maximum
                    if (getClickableState("L", this.id) && (player.L.LightCheck.gte(maximum) || projectedMax.gte(maximum))) text = `<br>You need TBC${player.Sol.TBCore.x.plus(1)} to get more Light!`          
                    // if not in check but Player has >1 LK
                    else if (!getClickableState("L", this.id) && player.L.LightCheck.gte(1)) text = `Enter Lightness again... <br> [Solarity gain cap base is 1 instead of 1e308]`
                    // if not in check (but is entering for the first time)
                    else if (!getClickableState(this.layer,this.id) ) text = `Enter Lightness, where the base Solarity cap starts at 1 instead of e308.  
                    - Upon entering, reset both Light and Dark on enter. 
                    - Upon reaching 100 light. Unwanted Darkness is generated which divides light generation.`
                    
                    if (getClickableState("L", this.id)) Goal_Text = ` Goal: ${format(setBaseRequirements)} Solar Rays`
                    
                    if (player.E.EclipseTier.gte(7) && player.S.points.gte(setBaseRequirements)) GetReady = `You will gain +${projectedMax.plus(1).sub(player.L.LightCheck).floor()} Level(s) on exit! <br> ${scaleDebuff}`
                    else if (player.S.points.gte(setBaseRequirements)) GetReady = `You can get +1 Level on exit!`
               
                    if (getClickableState("L", this.id)) textActive = `[ACTIVE] <br>
                    ${GetReady}
                    <br>
                    ${lScale}
                    `
                                  
                    if (player.L.LightCheck.gte(1) && !getClickableState("L", this.id)) rewardDisplay = `Start Generating Light. They boost Solarity gain cap and Solar Rays equal to its amount.`
      
                    return `
                    <h2>Light Check #${player.L.LightCheck}</h2>
                    <h4>Rep-Check 1</h4>
                    ${textActive}              
                    ${text} 
                    ${Goal_Text}
                    ${rewardDisplay}
                    <br>`
                    
      
                },
        onClick() {
                    
                  let IgnScale = player.L.LightCheck.gte(dualityScaling["Ignorant"].Start) ? (player.L.LightCheck.sub(dualityScaling["Ignorant"].Start)).pow_base(10000) : 1
                  BaseRequirements = new Decimal(1e15)
                  BaseRequirements = BaseRequirements.mul(player.L.LightCheck.pow_base(10000)).mul(IgnScale)

                 // let scale1 = 
                  let gainMaxLightCheck = player.S.points.div(1e15).log(10000).floor()

                  console.log(format(gainMaxLightCheck))


                  if (getClickableState(this.layer, this.id) && player.S.points.gte(BaseRequirements)) { 
                   
                   if (player.E.EclipseTier.gte(7)) {

                    let getMax = player.S.points.div(1e15).log(10000).floor()

                    if (getMax.gte(dualityScaling["Ignorant"].Start)) getMax = player.S.points.mul( dualityScaling["Ignorant"].Start.pow_base(10000).div(1e15) ).log(10000).div(2)
                      player.L.LightCheck = getMax.plus(1).floor()
                      
                    //    
                  }
                   else player.L.LightCheck = player.L.LightCheck.plus(1)
                   


                  }   
                  if (!getClickableState(this.layer, this.id)) {
                    EclipsiumReset() 
                    player.L.Light = new Decimal(0)
                    player.L.Dark = new Decimal(0)}
      
                  const currentState = getClickableState("L", this.id)
                  setClickableState(this.layer, this.id, !currentState)
                  player.L.UnwantedChromia = new Decimal(0)
      
      
      
                },
        canClick() {
              let IgnScale = player.L.LightCheck.gte(dualityScaling["Ignorant"].Start) ? (player.L.LightCheck.sub(dualityScaling["Ignorant"].Start)).pow_base(10000) : 1
              BaseRequirements = new Decimal(1e15)
              BaseRequirements = BaseRequirements.mul(player.L.LightCheck.pow_base(10000)).mul(IgnScale)


              //check if it has the check upgrade or is not in the check upgrade
              if (getClickableState(this.layer,this.id) == false && getClickableState("L",42) == false) 
              {
              return true
               } 
              // check if its inside the check upgrade  
              else if (getClickableState(this.layer,this.id) == true)
              {                                                                       
                //check if it meets the requirements to complete the upgrade check.
                 return true                                              
              }                      
          },  
        unlocked() {
                if (getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5)) return true
                else false
          },
                  
              style() { return {
                "width": "200px",
                "height": "165px",
                "borderRadius": "0px",
                "border": "0px",
                "margin": "12px",
                "textShadow": "0px 0px 0px #000000",
                "backgroundColor": "#e3d08a",
                "color": "#160a21",
                }
              },
             
              },
            
              //dark check: getClickableState("L",42)
      42: { 
                display() {
                  let text = ``
                  let textActive = ``
                  let rewardDisplay = ``
                  let projectedMax = player.points.div(1e15).log(100000).floor()
                  let maximum = new Decimal(20).plus(player.Sol.TBCore.x.mul(5))
                  let GetReady = ``
                  let metaScale = player.L.DarkCheck.gte(20) ? new Decimal(100000).mul(decimalOne.plus(player.L.DarkCheck.sub(20).mul(0.01))) : new Decimal(100000)
                  let scaleDebuff = ``
                  let setBaseRequirements = new Decimal(1e15)
                  let dScale = player.L.DarkCheck.gt(dualityScaling["Voided"].Start) ? `<h3 style="color:rgb(116, 0, 0);"> The Darkness becomes Voided... (^${format(dualityScaling["Voided"].Effect)}) </h3>` : ``   
                  let VoidScale = player.L.DarkCheck.gte(dualityScaling["Voided"].Start) ? (player.L.DarkCheck.sub(dualityScaling["Voided"].Start)).pow_base(100000) : 1
                  let Goal_Text = ``

                  setBaseRequirements = setBaseRequirements.mul(player.L.DarkCheck.pow_base(100000)).mul(VoidScale)  
                  
                  if (projectedMax.gte(dualityScaling["Voided"].Start)) projectedMax = player.points.mul( dualityScaling["Voided"].Start.pow_base(metaScale).div(1e15) ).log(100000).div(2).clampMax(maximum)   
                  if (projectedMax.gte(dualityScaling["Voided"].Start) && player.L.DarkCheck.lt(dualityScaling["Voided"].Start)) scaleDebuff = `NOTE: <h3 style="color:rgb(116, 0, 0);">Voided scaling has become active... </h3>`


                  // if is in check and is over maximum  
                  if (getClickableState("L", this.id) && projectedMax.gte(maximum)) text = `<br>You need TBC${player.Sol.TBCore.x.plus(1)} to get more Dark!`
                  // if not in check but Player has >1 LK
                  else if (!getClickableState("L", this.id) && player.L.DarkCheck.gte(1)) text = `Enter Darkness again... [Solar Rays is capped to 1e15. Dark Essence is Generated instead of Solarity]`             
                  // if not in check (but is entering for the first time)
                  else if (!getClickableState(this.layer,this.id) ) text = `
                  Enter Darkness, where Solar rays is always capped to 1e15. You generate Dark Essence instead based on your solarity generation. 
                  - Upon entering, reset both Light and Dark on enter. 
                  - Upon reaching 100 Dark. Unwanted Lightness is generated which divides dark generation.`
                  // if the player is in the check anyway
                  else text = ` Goal: ${format(setBaseRequirements)} Dark Essence` 
                  
                  if (getClickableState("L", this.id)) Goal_Text = ` Goal: ${format(setBaseRequirements)} Dark Essence`
                  
                  if (player.E.EclipseTier.gte(7) && player.points.gte(setBaseRequirements)) GetReady = 
                  player.L.DarkCheck.gte(maximum) || projectedMax.gte(maximum) ? `` : `You will gain +${projectedMax.plus(1).sub(player.L.DarkCheck).floor()} Level(s) on exit! <br> ${scaleDebuff}`;  
                  else if (player.points.gte(setBaseRequirements)) GetReady = `You can get +1 Level on exit!`;

                  //Active text
                  if (getClickableState("L", this.id)) textActive = `[ACTIVE] <br>${GetReady} <br>
                  ${dScale}
                  `                 

                  if (player.L.DarkCheck.gte(1) && !getClickableState("L", this.id)) rewardDisplay = `Start Generating Dark. They Boost Solarity gain cap and Solarity gain equal to its amount.`
    

                  //` Goal: ${format(setBaseRequirements)} Dark Essence`  
                  return `
                  <h2>Dark Check #${player.L.DarkCheck}</h2>
                  <h4>Rep-Check 2</h4>
                  ${textActive}              
                  ${text}  
                  ${Goal_Text}
                  ${rewardDisplay}
                  <br>`
                  
    
                },
                onClick() {
                  //increases the scale power by 0.01 per Dark Check starting at 20                                                          OG cost scaling before 20
                  let metaScale = player.L.DarkCheck.gte(20) ? new Decimal(100000).mul(decimalOne.plus(player.L.DarkCheck.sub(20).mul(0.01))) : new Decimal(100000)   

                  let VoidScale = player.L.DarkCheck.gte(dualityScaling["Voided"].Start) ? (player.L.DarkCheck.sub(dualityScaling["Voided"].Start)).pow_base(100000) : 1
                  let BaseRequirements = new Decimal(1e15)
                  BaseRequirements = BaseRequirements.mul(player.L.DarkCheck.pow_base(100000)).mul(VoidScale)

                  let maximum = new Decimal(20).plus(player.Sol.TBCore.x.times(5)) 

                if (getClickableState(this.layer, this.id) && player.points.gte(BaseRequirements)) { 
                  BorderAlterations_SR = "rgba(26, 0, 68, 1)"
                  if (player.E.EclipseTier.gte(7)) {

                  let getMax = player.points.div(1e15).log(100000).floor()

                  if (getMax.gte(dualityScaling["Voided"].Start)) getMax = player.points.mul( dualityScaling["Voided"].Start.pow_base(100000).div(1e15) ).log(100000).div(2)
                  
                  player.L.DarkCheck = getMax.plus(1).floor().clampMax(maximum)

                  }
                  else player.L.DarkCheck = player.L.DarkCheck.plus(1) 
                
                
                }   
                if (!getClickableState(this.layer, this.id)) {
                  EclipsiumReset() 
                    player.L.Light = new Decimal(0)
                    player.L.Dark = new Decimal(0)
                    BorderAlterations_SR = "rgba(239, 149, 64, 0.883)"
                    
                }
    
                const currentState = getClickableState("L", this.id)
                

                setClickableState(this.layer, this.id, !currentState)
                
    
                player.L.UnwantedChromia = new Decimal(0)
    
    
                },



                
                canClick() {
                  let VoidScale = player.L.DarkCheck.gte(dualityScaling["Voided"].Start) ? (player.L.DarkCheck.sub(dualityScaling["Voided"].Start)).pow_base(100000) : 1
                  let BaseRequirements = new Decimal(1e15)
                  BaseRequirements = BaseRequirements.mul(player.L.DarkCheck.pow_base(100000)).mul(VoidScale)

                  let maximum = new Decimal(20).plus(player.Sol.TBCore.x.times(5)) 


            //check if it has the check upgrade or is not in the check upgrade
            if (getClickableState(this.layer,this.id) == false && !getClickableState("L",41)) 
            {
            return true
             } 
            // check if its inside the check upgrade  
            else if (getClickableState(this.layer,this.id) == true)
            {                                                                       
              //check if it meets the requirements to complete the upgrade check.
              return true                                             
            }        
            
            if (player.L.DarkCheck.gte(maximum)) return false
            
            
           
                },  
                unlocked() {
              if (getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(5) ) return true
              else false
                },
                
            style() { return {
              "width": "200px",
              "height": "165px",
              "borderRadius": "0px",
              "border": "0px",
              "margin": "12px",
              "textShadow": "0px 0px 0px #000000",
              "backgroundColor": "#160a21",
              "color": "#e3d08a",
            }
          },

            },


            //Displays for DET1 and NET2
          51: { //DT
            
              display() {
                Hour = new Date()
                let e1 = ``;let e2 = ``;let e3 = ``;let e4 = ``;let e5 = ``
                //pre message

                let ActiveText = `` //#32068c
                if (getBuyableAmount("L",22).gte(1)) {
                    if ( Hour.getHours() >= 12 ) ActiveText = `<h3 style="#32068c"> [INACTIVE] </h3>`; else ActiveText = `<h3 style="#3a3b33"> [ACTIVE] </h3>`
                  }

                let preMessage = ``
                if (getBuyableAmount("L",21).gte(1)) preMessage = `<h2>Day time Effects</h2> 
                <h3>(Day Time Exclusive):</h3>` 
                else preMessage = `[Locked]`
                //Tier 1
               
                
                if (Hour.getHours() <= 12){
                 e1 = `${(Hour.getHours() % 12) / 100}` 
                 e2 = `${(1.15 ** Hour.getMinutes()) }`; 
                 e3 = `${Hour.getMinutes() * (1.5 ** (Hour.getHours() % 12))}`;
                 e4 = `${2 ** Hour.getHours()}`;
                 e5 = `${1+(1.1 ** Hour.getMinutes())/3 * (1.25 ** (Hour.getHours() % 12))}`
                  // 1+ (1.1^(M/3)) * (1.25^H)
                 // 1.5^M * 3^H -> 1.25^M * 3^H

                } else {
                  e1 = `0.00`;
                  e2 = `1`;
                  e3 = `1`;
                  e4 = `1`;
                  e5 = `1`;
                }

                let D1 = ``
                let D2 = ``
                let D3 = ``
                // getBuyableAmount("L",21).gte(3) d = d.mul(1.5 ** Hour.getMinutes() * (3 ** (Hour.getHours() % 12)))
                if (getBuyableAmount("L",21).gte(3)) D3 = `MH-2: Boost Modifier Score by ${format(e5)}`
                if (getBuyableAmount("L",21).gte(2)) D2 = `H-2: Boost Solar Charge Gain by ${format(e4)}`

                if (getBuyableAmount("L",21).gte(1)) D1 = `
                 H-1: Boost Solar Ray Exp Base by +${format(e1)}
                 M-1: Boost Solarity Gain and cap by ${format(e2)}
                 MH-1: Boost The Solar Light cap by ${format(e3)}
                `;

                // DH-2: Hours increases Solar Charge Gain by 3^H

                return `<h1>${preMessage}</h1> ${ActiveText}
                <h4>${D1}
                ${D2}
                ${D3}
                </h4>`


                
              },
              unlocked() {
                 
                if (player.L.LightCheck.gte(2)) return true
               
              },
          canClick() {
            //if (player.C.CenterPoints.gte(Decimal.pow(2, player.C.EffectorTier))) return true
            return false


          },
          style() { return {
                  "width": "270px",
                  "height": "150px",
                  "border-radius": "0px",
                  "border": "10px",
                  "margin": "2px",
                  "text-shadow": "0px 0px 10px #000000",
                  
                }
              },   
              
              
          },
          52: { //NT
            display() {
              let Hour = new Date()
                let e1 = ``;let e4 = ``;let e5 = ``
                


                let ActiveText = `` //#32068c
                if (getBuyableAmount("L",22).gte(1)) {
                    if ( Hour.getHours() >= 12 ) ActiveText = `<h3 style="#32068c"> [ACTIVE] </h3>`; else ActiveText = `<h3 style="#3a3b33"> [INACTIVE] </h3>`
                  }

                //pre message
                let preMessage = ``
                if (getBuyableAmount("L",22).gte(1)) preMessage = `<h2>Night time Effects</h2> 
                <h3>(Night Time Exclusive):</h3>` 
                else preMessage = `[Locked]`

                //Tier 1
                if (Hour.getHours() >= 12) e1 = `${(Hour.getHours() % 12) / 100}`; else e1 = `0.00`;
                
                  
                let e2 = Hour.getHours() >= 12 ? (1.5 ** (Hour.getMinutes() / 3 ) ** 1.04) : 1

                let d = Hour.getHours() >= 12 ? 1 + (Hour.getMinutes() * (1 + Hour.getHours() % 12) / 1000) : 1;
                  // 


                //NH-2: Hours boosts Solinity and Esolar gain by 1.5^H
                if (getBuyableAmount("L",22).gte(2) && Hour.getHours() >= 12) e4 = `H-2: boost Solinity and Esolar by ${format(1.5 ** (Hour.getHours() % 12))}`; else e4 = `H-2: boost Solinity and Esolar by 1`
                
                if (getBuyableAmount("L",22).gte(3) && Hour.getHours() >= 12 ) e5 = `MH-2: Multiply effect is increased by ${format((1.1 + (Hour.getHours() % 12)/55 ) ** Hour.getMinutes() ,2 )  }`; else e3 = `1` 

             
                



                //tier 2 
                let NT1 = ``
                let NT2 = ``
                let NT3 = ``  
                
                if (getBuyableAmount("L",22).gte(3)) NT3 = `${e5}`; if (getBuyableAmount("L",22).gte(2)) NT2 = `${e4}`

                if ((getBuyableAmount("L",22).gte(1))) NT1 = `
                 H-1: Reduce CP Cost Exp Base by ${format(e1)} (^${1 - e1})
                 M-1: Boost Solar light Gain Cap by ${format(e2)}
                 MH-1: Raise the modifier score to ${format(d,3)}
                `

              
            
               return `<h1>${preMessage}</h1> ${ActiveText}
               <h4>${NT1}
                   ${NT2}
                   ${NT3}</h4>
               `
            },
            unlocked() {
               
             if (player.L.LightCheck.gte(2)) return true
              
            },
        canClick() {
          //if (player.C.CenterPoints.gte(Decimal.pow(2, player.C.EffectorTier))) return true
          return false


        },
        style() { return {
                "width": "270px",
                "height": "150px",
                "border-radius": "0px",
                "border": "10px",
                "margin": "2px",
                "text-shadow": "0px 0px 10px #000000",
                
              }
            },   
            
            
              },
     

          },
  
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "do you want a hotkey?", onPress(){warn("well TOO BAD!")}},
    ],
    branches: ["E"],
    layerShown(){ 
      if ( hasMilestone("E",5) ) return true; else return false; 
    }
}

)