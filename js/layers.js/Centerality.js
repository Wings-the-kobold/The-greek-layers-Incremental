addLayer("C", {
    name: "Center", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: ">C<", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        CenterPoints: new Decimal(0),
        Score: new Decimal(0),
        Highest: new Decimal(0),
        requirement: new Decimal(2000),
        EffectorTier: new Decimal(0), 
        checkUpgrades: new Decimal(0),  
    
    }},
    color: "#1f2129",
   // Can be a function that takes requirement increases into account
    resource: "Solar Light", // Name of prestige currency
    baseResource: "Solarity", // Prestige currency uses this "base currency"
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    //exponent: 0.2, // Prestige currency exponent
   // gainMult() { // Calculate the multiplier for main currency from bonuses
   //     mult = new Decimal(1)
    //    mult = mult.pow(0.3)
    //    return mult
    //},
    //gainExp() { // Calculate the exponent on main currency from bonuses
    //    return new Decimal(1)
   // },
  
  
  
   update(diff) {

    if (hasUpgrade("GL",14)) player["GL"].Time = player["GL"].Time.plus(1).clampMin(0)//.times(diff)
    if (hasUpgrade("GL",15)) player["C"].Score = Decimal.mul(getBuyableAmount("S", 11), getBuyableAmount("S", 12))
    
    player.C.requirement = Decimal.mul(2000   ,  Decimal.pow( 1.35 ,  player.C.CenterPoints   ).clampMin(1)       )
    if (player.C.CenterPoints.lte(0)) player.C.CenterPoints = player.C.CenterPoints.mul(0)
    if (player.C.Score.gte(player.C.Highest)) player.C.Highest = player.C.Score


  }, 
  
  
      
  
  
  
  
  
  
  
    tabFormat: {
        "The Effector": {      
              content: [             
       ["display-text",
     function() { 
      if (player["C"].CenterPoints.gte(1) || player.C.EffectorTier.gte(1))
       return `You have ${format(player["C"].CenterPoints )}  Center Points `
  
     }],
       ["display-text",
     function() { 
      return `You have ${format(player["C"].Score )} / ${format(player.C.requirement)} Modifier Score. <br>
      `
     }],
     "blank",
     "clickables",
     
    






    
    // player["GL"].CenterPoints
    ["display-text",
     function() { 
      


     /* 
       return ` <br>Highest Modifier Score Boosts Solar Light Cap by ${format(player.C.Highest.log(4).root(2))}  [Effector VI]<br>
       
       Your Current Modifier Increases The Base effect of Multiplys base by ^${format(player.C.Score.clampMin(1).log(7).root(7))}  [Effector VII]
       
       </br> `
  */
     }],
     ["display-text",
      function() { 
        let progression = ""
      if (player.C.EffectorTier.eq(4))
      progression = `...What am i doing here... why am i here? WHY DO I EXIST? SOMEONE PLEASE HELP ME IM HAVING AN EXSISTENTIAL CRISIS!`
      else if (player.C.EffectorTier.eq(3))
      progression = `[Last Minor Unlock at Effector Tier IV]`
      else if (player.C.EffectorTier.eq(2))
      progression = `[Next Minor Unlock at Effector Tier III]`
      else if (player.C.EffectorTier.eq(1))
      progression = `[Next Minor Unlock at Effector Tier II]`
      else if (player["C"].Score.gte(1))
      progression = `[Next Minor Unlock at 2000 Modifier Score]`

        return progression
  
     }],
     "blank",
     "blank",
                //"main-display",
                ["infobox","about"],
                
                 
               
                
             
                "blank",
                "blank",
               
              
                
                
                "blank",
                "blank",
                "blank",
                
            ],
            
        },



        "Darkness?": {
          content: [
            "buyables",
            "upgrades",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            
          ],
          
  
        },

        //if (player.C.EffectorTier.gte(2)) {
        

          
        },
        
       
     
    
  
   
  
  
  
  
  
  
  
    
  
  
  // if (player["GL"].Solar_shards.gte(1))
    tooltip: () => `<p>Open Centrality, side layer</p>`,
  upgrades: {
    11: {
      fullDisplay() {
          return `<h2>Jear 1</h2> <br>
          PATH SPLIT UPGRADE: <br>
          16x to Solarity
          `
      },
      cost: new Decimal(1),
      currencyDisplayName: "CenterPoints",
      currencyInternalName: "CenterPoints",
      currencyLayer: "C",
      canAfford() {
        let splitTaken = false
        if (hasUpgrade("C",12) || hasUpgrade("C",13)) splitTaken = true
        return (splitTaken == false) 
      },
      unlocked() {
        if (player.C.EffectorTier.gte(2)) return true
      },
      style() {
        return {
          "width": "150px",
          "height": "75px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#3a3337"
        }
      },
    },
    12: {
      fullDisplay() {
          return `<h2>Jear 2</h2> <br>
          PATH SPLIT UPGRADE: <br>
          4x to Solar Ray Gain
          `
      },
      cost: new Decimal(1),
      currencyDisplayName: "CenterPoints",
      currencyInternalName: "CenterPoints",
      currencyLayer: "C",

      canAfford() {
        let splitTaken = false
          if (hasUpgrade("C",11) || hasUpgrade("C",13)) splitTaken = true
          return (splitTaken == false) 
      },
      unlocked() {
        if (player.C.EffectorTier.gte(2)) return true
      },
      style() {
        return {
          "width": "150px",
          "height": "75px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#3a3337"
        }
      },
    },
    13: {
  fullDisplay() {
      return `<h2>Jear 3</h2> <br>
      PATH SPLIT UPGRADE: <br>
      2x to Solarity AND Solar rays
      `
  },
  cost: new Decimal(1),
  currencyDisplayName: "CenterPoints",
      currencyInternalName: "CenterPoints",
      currencyLayer: "C",
  canAfford() {
      let splitTaken = false
      if (hasUpgrade("C",11) || hasUpgrade("C",12)) splitTaken = true
      return (splitTaken == false ) 
      
  },
  unlocked() {
    if (player.C.EffectorTier.gte(2)) return true
  },
  style() {
    return {
      "width": "150px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#3a3337"
    }
  },
},




14: {
  fullDisplay() {
      return `<h2>Neaver</h2> <br>
      PATH SPLIT UPGRADE II: <br>
      ^1.05 Solar Rays Gain
      `
  },
  cost: new Decimal(4),
  currencyDisplayName: "CenterPoints",
  currencyInternalName: "CenterPoints",
  currencyLayer: "C",
  canAfford() {
    let splitTaken = false
    if (hasUpgrade("C",15) || hasUpgrade("C",16)) splitTaken = true
    return (splitTaken == false) 
  },
  unlocked() {
    if (player.C.EffectorTier.gte(3)) return true
  },
  style() {
    return {
      "width": "200px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "10px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#3a3337"
    }
  },
},
15: {
  fullDisplay() {
      return `<h2>Weaver</h2> <br>
      PATH SPLIT UPGRADE II: <br>
      ^1.15 Solarity gain 
      `
  },
  cost: new Decimal(4),
  currencyDisplayName: "CenterPoints",
  currencyInternalName: "CenterPoints",
  currencyLayer: "C",

  canAfford() {
    let splitTaken = false
      if (hasUpgrade("C",14) || hasUpgrade("C",16)) splitTaken = true
      return (splitTaken == false) 
  },
  unlocked() {
    if (player.C.EffectorTier.gte(3)) return true
  },
  style() {
    return {
      "width": "200px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "10px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#3a3337"
    }
  },
},
16: {
fullDisplay() {
  return `<h2>Leaver</h2> <br>
  PATH SPLIT UPGRADE II : <br>
  3.14x solar Light cap and Generation speed
  `
},
cost: new Decimal(4),
currencyDisplayName: "CenterPoints",
  currencyInternalName: "CenterPoints",
  currencyLayer: "C",
canAfford() {
  let splitTaken = false
  if (hasUpgrade("C",14) || hasUpgrade("C",15)) splitTaken = true
  return (splitTaken == false ) 
  
},
unlocked() {
if (player.C.EffectorTier.gte(3)) return true
},
style() {
  return {
    "width": "200px",
    "height": "75px",
    "border-radius": "0px",
    "border": "0px",
    "margin": "10px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#3a3337"
  }
},
},
        
  

  
  
          
  
  
  
  
  
  
            },
  
  buyables: { 
  
  
  
  
  
  
  
  },
            /*
  let effect1Disp = `log2 of Solar Rays boost Solarity, keep Intricity on ALL layer 1 Resets.` 
                 
                 let effect1 = format(player.S.points.clampMin(1).log(2))

                 let effect2Disp = `log4 of Solar Rays boost Solar Rays, keep Polarize on ALL layer 1 Resets.` 
                 
                 let effect2 = format(player.S.points.clampMin(1).log(4))

                 let effect3Disp = `log9 of Solar Rays boost plasmates effect, Keep Gravitation on ALL layer 1 Resets.` 
                 
                 let effect3 = format(player.S.points.clampMin(1).log(9))

                 let effect4Disp = `log16 of Solar Rays boost multiply's effect, Keep Solarizor on ALL layer 1 Resets.` 
                
                 let effect4 = format(player.S.points.clampMin(1).log(16))


                 let display1 = ``



                 if (player.C.EffectorTier.gte(3)) display1 = `
                 ${effect1Disp} <br> Effector's Tier I effect is ${effect1}  <br>
                 ${effect2Disp} <br> Effector's Tier II effect is ${effect2} <br>
                 ${effect3Disp} <br> Effector's Tier III effect is ${effect3} <br>` 
                 else if (player.C.EffectorTier.gte(2)) display1 = `
                 ${effect1Disp} <br> Effector's Tier I effect is ${effect1} <br>
                 ${effect2Disp} <br> Effector's Tier II effect is ${effect2}`

                 else if (player.C.EffectorTier.gte(1)) display1 = `${effect1Disp} <br> Effector's Tier I effect is ${effect1}`
                  

                   return `
                   <h3>Effector Tier ${player.C.EffectorTier} (max 7) </h3><br> <br>
                   Unlock a new Effect. <br>  
                   cost: ${Decimal.pow(2, player.C.EffectorTier)} <br>
                   ${display1}

                   `


            */
  
    clickables: {
                // Challenge Check Upgrades!
               
      11: {
                  display() {

                     return `
                     <h3>CENTRALIZE [LAYER 2 SIDE RESET]</h3><br> <br>
                     Does Everything Convertary does as well as rooting your solar shards by 4        
                     `
                    

                  },
                  onClick() {
                  player.C.CenterPoints = player.C.CenterPoints.plus(1)
                  player.GL.Solar_Shards = player.GL.Solar_Shards.root(4)
                  layer1Reset()



                  },
              canClick() {
                if (player.C.Score.gte(player.C.requirement)) return true



              },
              style() { return (this.canClick()) ? {
                      "width": "300px",
                      "height": "100px",
                      "border-radius": "20px",
                      "border": "10px",
                      "margin": "0px",
                      "text-shadow": "0px 0px 10px #000000",
                      
                    } : {
                      "width": "250px",
                      "height": "40px",
                      "border-radius": "20px",
                      "border": "10px",
                      "margin": "0px",
                      "text-shadow": "0px 0px 10px #000000",
                      
                    }
                    
                  },   
                  
                  
              },
      12: {
                display() {

            
                   return `
                   <h3>Effector Tier ${player.C.EffectorTier}<br> (max 7) </h3>
                   Unlock a new Effect. <br>  
                   cost: ${format(Decimal.pow(2, player.C.EffectorTier))} Center Points<br>
                   `
                  

                },
                onClick() {
                player.C.EffectorTier = player.C.EffectorTier.plus(1)
                player.C.CenterPoints = player.C.CenterPoints.sub(Decimal.pow(2, player.C.EffectorTier))
                
                //if (player.C.CenterPoints.lte(0)) player.C.CenterPoints = player.C.CenterPoints.abs()


                },
            canClick() {
              if (player.C.CenterPoints.gte(Decimal.pow(2, player.C.EffectorTier)) && player.C.EffectorTier.neq(7)    ) return true
            },
            unlocked() {
              if (player.C.CenterPoints.gte(1) || player.C.EffectorTier.gte(1)) return true
    
            },
                
                
            }, 
      13: {
              display() {

                const effects = [
                  { log: 2, boosts: "Solarity", keep: "Intricity", tier: "I" },
                  { log: 4, boosts: "Solar Rays", keep: "Polarize", tier: "II" },
                  { log: 9, boosts: "plasmates effect", keep: "Gravitation", tier: "III" },
                  { log: 16, boosts: "multiply's effect", keep: "Solarizor", tier: "IV" }
                ];
                
                const effectsDisplay = effects.slice(0, player.C.EffectorTier.toNumber())
                                              .map(({log, boosts, keep, tier}, index) => `TIER ${tier} <br> log${log} of Solar Rays boosts ${boosts}, Keep ${keep} on ALL layer 1 Resets.<br /> Effector's Tier ${tier} effect is ${format(player.S.points.log(log).clampMin(1))}`)
                                              .join('<br><br>');
                
                return `<h3>${effectsDisplay}`

                 
                

              },
              unlocked() {
                if (player.C.CenterPoints.gte(1) || player.C.EffectorTier.gte(1)) return true
      
              },
          canClick() {
            //if (player.C.CenterPoints.gte(Decimal.pow(2, player.C.EffectorTier))) return true
            return false


          },
          style() { return {
                  "width": "600px",
                  "height": "235px",
                  "border-radius": "0px",
                  "border": "10px",
                  "margin": "33px",
                  "text-shadow": "0px 0px 10px #000000",
                  
                }
              },   
              
              
          },

      21: {
            display() {
              let text = ``
              let textActive = ``
              let rewardDisplay = ``
              if (getClickableState("C", 21)) text = `^0.666 to Solarity<br>^0.666 to Solar Rays<br>^0.666 to Plasmate's effect <br>
              require:
              Phaser #15
              Plasmate #60
              Multiply #325 <br> Goal: Plasmate #40 <br> `
              else if (player.C.checkUpgrades.lt(1)) text = `Enter Upgrade Check. #001`
              else text = `Check Upgrade Completed!`
              if (getClickableState("C", 21)) textActive = `[ACTIVE] `
             
             
             
              if (player.C.checkUpgrades.gte(1)) rewardDisplay = `^1.25 to Solarity Gain, and Automate Plasmate buyable, they also no longer spend anything.`

              return `
              <h1>Formality...</h1><br> ${textActive}              
              ${text} <br>
              ${rewardDisplay}

               `
              

            },
            onClick() {
            if (getClickableState("C", 21) && getBuyableAmount("S",11).gte(40) && player.C.checkUpgrades.lt(1)) { player.C.checkUpgrades = player.C.checkUpgrades.plus(1) }   
            if (!getClickableState("C", 21)) {layer1Reset()}

            const currentState = getClickableState("C", 21)
            setClickableState("C", 21, !currentState)
            




            },
        canClick() {
        //check if it has the check upgrade or is not in the check upgrade
        if (getClickableState(this.layer,this.id) == false && player.C.checkUpgrades.lt(1)) 
        {
        //check if it has the requirements to enter unless it is in the check upgrade 
        if (getBuyableAmount("S",11).gte(60) && getBuyableAmount("S",12).gte(325) && getBuyableAmount("GL",11).gte(15)){
            return true
          }
         } 
        // check if its inside the check upgrade  
        else if (getClickableState(this.layer,this.id) == true && player.C.checkUpgrades.lt(1))
        {                                                                       
          //check if it meets the requirements to complete the upgrade check.
          if (getBuyableAmount("S",11).gte(40)) return true                                              
        }                                                                    
        },  
            
            
        },
      22: {
          display() {
            let text = ``
            let textActive = ``
            let rewardDisplay = ``
            let textActiveGoal = ``
            if (!getClickableState("C", 22)) text = `Enter Upgrade Check #002

            Meta Scaling starts instantly <br>Meta Scaling also affects Plasmate <br> ^0.666 to Multiply's effect

            Requires:
            Phaser #20
            Plasmate #250
            Multiply #325 <br>
            `
            else text = `Check Upgrade Completed!`
            if (getClickableState("C", 22)) textActive = `[ACTIVE]`
            if (getClickableState("C", 22)) textActiveGoal = `Goal: Multiply #115`
            else textActiveGoal = ``
            // Goal: Plasmate #40 <br>
           
           
            if (player.C.checkUpgrades.gte(2)) rewardDisplay = `Reduce Meta Scaling power by 35% and Automate Multiply buyable, they also no longer spend anything.`
            else rewardDisplay = ``
            return `
            <h1>Heirarchy...</h1><br> ${textActive}
            ${text}
            ${textActiveGoal}
            ${rewardDisplay}
             `
            

          },
          onClick() {
          if (getClickableState("C", this.id) && getBuyableAmount("S",11).gte(40) && player.C.checkUpgrades.lt(1)) { player.C.checkUpgrades = player.C.checkUpgrades.plus(1) }   
          if (!getClickableState("C", this.id)) {layer1Reset()}

          const currentState = getClickableState("C", this.id)
          setClickableState("C", this.id, !currentState)
          




          },
      canClick() {
      //check if it has the check upgrade or is not in the check upgrade
      if (getClickableState(this.layer,this.id) == false && player.C.checkUpgrades.lt(1)) 
      {
      //check if it has the requirements to enter unless it is in the check upgrade 
      if (getBuyableAmount("S",11).gte(60) && getBuyableAmount("S",12).gte(325) && getBuyableAmount("GL",11).gte(15)){
          return true
        }
       } 
      // check if its inside the check upgrade  
      else if (getClickableState(this.layer,this.id) == true && player.C.checkUpgrades.lt(1))
      {                                                                       
        //check if it meets the requirements to complete the upgrade check.
        if (getBuyableAmount("S",11).gte(40)) return true                                              
      }                                                                    
      },
      style() { return {
        "width": "135px",
        "height": "250px",
        "border-radius": "5px",
        "border": "5px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "border-color":"rgb(240, 117, 16)",
      }
          },   
          
          
      },










          //challenge check upgrade down here
          // should be in "Darkness?" tab

     
  
  
  
            },
  
           
  
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "", description: "Press A to Accelerate the Energy ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["S"],
    layerShown(){ 
      if ( hasUpgrade("GL",15) )   return true; 
  
    }
  }
  
  )