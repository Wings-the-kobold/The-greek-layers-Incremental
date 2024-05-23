addLayer("E", {
    name: "Enlightenment", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⚡", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		    ENLlevels: new Decimal(0),
        TopLVL: new Decimal(0),
       // EclipsedShards: new Decimal(0),
        ECSgain: new Decimal(1),
        Eclipsium: new Decimal(0),
       // falsity: new Decimal(1),
        EclipseTier: new Decimal(0),
        

        //automaticaally updating things 
        ETCost: new Decimal(0),
        SolarCharge: new Decimal(1),
        Solinity: new Decimal(1),
        Esolar: new Decimal(0),
    }},
    color: "#3f5b96",
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
       
         
         if (player.points.div(1e308).gte(1)) player.E.ENLlevels = player.points.div(1e308).log(10).root(2)
            else player.E.ENLlevels = player.E.ENLlevels.mul(0)
         if (player.E.ENLlevels.gte( player.E.TopLVL )) player.E.TopLVL = player.E.ENLlevels

          player.E.ECSgain = player.E.ENLlevels.root(3)
         // player.E.falsity = player.postCap



         //Solar Charge stuff
        let flow = player.E.ENLlevels.div(10) // the base gain generation
        let Baseincrement = new Decimal(1)  // speed increaser
        
        // BOOSTS AND MULTIPLIERS ARE HERE
        Baseincrement = Baseincrement.mul(player.E.Solinity)
        //Totals
        if (player.E.EclipseTier.gte(3)) player.E.SolarCharge = player.E.SolarCharge.plus(flow.times(Baseincrement.times(diff)))




        if (player.E.EclipseTier.gt(4))
         player.E.ETCost = Decimal.pow(player.E.EclipseTier,2).plus(1)
        else player.E.ETCost = player.E.EclipseTier.plus(1)


        },
          
    tabFormat: {
        "Sun of the Exterior": {      
              content: [
                
                
                ["display-text",
      function() { 
        
        

        
       
            return `
            You Have ${format(player["E"].ENLlevels )} Enlightenment Levels    
            `
        
     }],

     "blank",
     ["display-text",
      function() { 
        let highestLVLtext = `${format(player.E.TopLVL)}`
         
       
            return `
            
            
            The Highest Enlightenment Level you have reached is ${highestLVLtext}
            
            `
        
     }],




     "blank",
     
   


       
       "blank",



     "blank",
     "blank",
                //"main-display",
                ["infobox","about"],
          
                 
                ["clickable",11],
                
               // ["buyable",11],

              "milestones",
                 "blank",
                ["display-text",
                function() { 
                    let b1 = new Decimal(1)
                    let b2 = new Decimal(1)
                    let b3 = new Decimal(1)
                    let b4 = new Decimal(1)
                    
                    b1 = b1.mul(player.E.EclipseTier.pow_base(9))
                    b2 = b2.mul(player.E.EclipseTier.pow_base(5))
                    b3 = b3.mul(player.E.EclipseTier.pow_base(2))
                    b4 = b4.mul(player.E.EclipseTier.pow_base(1.25))
                  let g = ``
                  if (player.E.EclipseTier.gte(1)) g = `${format(b1)} Solarity Gain <br> ${format(b2)} Solar Rays <br> ${format(b3)} Solar Shards <br> /${format(b4)} Center Points requirement <br>${format(player.E.EclipseTier.pow_base(20))} to Solarity gain cap<br>
                  `
                  else g = `None yet [Unlocked at Eclipse Tier 1]`

                  return `Enlightenment is at Eclipse Tier ${player["E"].EclipseTier} <br> 
                  Current Boosts:<br>
                  ${g}
                  `
           
               }],

             


                "blank",
               "blank",

              
                
                
                "blank",
                "blank",
                "blank",
                
            ],
            
        },
        "Sun of the Interior": {
          content: [
            ["display-text",
     function() { 
      let effect = new Decimal(1)
        effect = player.E.Eclipsium.pow_base(1.45)
        effect = format(effect)
      if (player.E.EclipseTier.gte(2) )
       return `You Have ${format(player.E.Eclipsium )} Eclipsium , which multiplies Solarity gain cap by ${effect}<br>`

    }],
    
            ["clickable",12],
    


    
            "blank",
            "buyables",
            "blank",
            "blank",
            ["clickable",21],
            
            "blank",
            ["clickable",22],
            "blank",
            "blank",
            ["clickable",13],
            ["display-text",
            function() { 
              let effect = new Decimal(1)
              let speed = new Decimal(0.1)
              speed = speed.mul(player.E.Solinity)





              //speed text display
              let speedtext = `${format(speed.times(100))}%`
              if (speed.gte(1)) speedtext = `${format(speed)} times`
              
              let formula = player.E.SolarCharge.log(2).add(1)
              let C = player.E.Esolar
              let B = Decimal.add(1 , C.log(2))

              let CTct = ``
              if (player.E.Esolar.gt(1)) CTct = `
              ^ B
              <br> B = 1 + log2(C) <br> C = ${format(player.E.Esolar)}`

              formula = formula.pow(B)


              if (player.E.EclipseTier.gte(2)) effect = effect.mul(player.E.Eclipsium.pow_base(1.45))
                let SSS = `` 
                let formulatedText = `
                 Effect: 
                <br>log2(Solar Charge)${CTct}
                `
              if (player.E.SolarCharge.gt(1) || player.E.EclipseTier.gte(3)) SSS = `
              You Have <h3 style="color: #f08160; text-shadow: 0px 0px 20px #cc0000;"> ${format(player.E.SolarCharge , 1) }   </h3> Solar Charge, Which Increases Solarity gain cap by <h3 style="color: #f08160; text-shadow: 0px 0px 20px #cc0000;"> ${format(formula)}   </h3> 
               <br> Generation is ${speedtext} your Enlightenment Levels, which is currently ${format(speed.mul(player.E.ENLlevels))} <br>${formulatedText}`
              return SSS
            }],
            "upgrades",

          
          
          ],
         

        },
       
    },
// if (player["GL"].Solar_shards.gte(1))
    tooltip: () => `<p>Open Layer 3, Main Layer</p> <br> Your Current Eclipse Tier: ${player.E.EclipseTier}`,
 upgrades: {
  11: {
    fullDisplay() {
      let effectTXT =  ``
      if (hasUpgrade("E",this.id)) effectTXT = `${format(this.effect())}`
        return `<h2>Eclairity</h2> <br>
        
        Solar Charge makes Solar light generation faster<br> <br>
        Cost: 10 Eclipsium
        
        `
    },
    cost: new Decimal(13.5),
    //currencyInternalName: player["GL"].Solar_Shards,
    currencyDisplayName: "Eclipsium",
    currencyInternalName: "Eclipsium",
    currencyLayer: "E",
    unlocked() {
      if (hasMilestone("E",4)) return true
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
    effect() {
      let effect = new Decimal(1)
      if (hasUpgrade("E",11)) effect = effect.mul(player.E.SolarCharge).pow(0.75)
      return effect

    }



},
12: {
  fullDisplay() {
    let effectTXT =  ``
    if (hasUpgrade("E",this.id)) effectTXT = `${format(this.effect())}`
      return `<h2>Eclairity</h2> <br>
      
      Solar Charge makes Solar light generation faster<br> <br>
      Cost: 10 Eclipsium
      
      `
  },
  cost: new Decimal(13.5),
  //currencyInternalName: player["GL"].Solar_Shards,
  currencyDisplayName: "Eclipsium",
  currencyInternalName: "Eclipsium",
  currencyLayer: "E",
  unlocked() {
    if (hasMilestone("E",4)) return true
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
  effect() {
    let effect = new Decimal(1)
    if (hasUpgrade("E",11)) effect = effect.mul(player.E.SolarCharge).pow(0.75)
    return effect

  },
  canAfford() {
    if (player.points.gte(8.91e14) && getBuyableAmount("S",11).eq(0) && getBuyableAmount("S",12).eq(0)) return true 
  },


},
    

            },

 buyables: { 

  11: {
    cost(x) {
      let scale = new Decimal(2.05)
      let base = new Decimal(1)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
      return Calculation;
    },
    display() {
      return `<h2>Cytochrisy #${getBuyableAmount(this.layer, this.id)}</h2>
  <h2>  +${format(tmp[this.layer].buyables[this.id].effect)} to Phaser's Base. </h2>
    <br>
  <h2>  x${format(getBuyableAmount("E",11).mul(0.5).add(1))} to Solar Gain Cap </h2>
  <h2>Requires:</h2> 
  <h3>  ${format(tmp[this.layer].buyables[this.id].cost)} Eclipsium 
   Phaser #3 </h3>`
    },
    canAfford() {
      return player.E.Eclipsium.gte(this.cost()) && getBuyableAmount("GL",11).gte(3)
    },
    buy() {
    // player.E.Eclipsium = player.E.Eclipsium.minus(this.cost());
      addBuyables(this.layer, this.id, 1);
    },
    effect() {
      let effect = decimalOne
      effect = effect.mul(getBuyableAmount(this.layer, this.id))
      return effect;
    },
    style() {
      return {
        "width": "200px",
        "height": "135px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
    unlocked() {return player.E.Eclipsium.gte(10) || getBuyableAmount(this.layer, this.id).gte(1) || player.E.EclipseTier.gte(3)}
     
  },
  21: { //Just so you know, this buyable is not like the others, This acts like a reset instead so that it does not move with the background lmaoo

    display() {
          let gain = new Decimal(1)
          gain = player.E.SolarCharge.root(10).sub(1)
          if (player.E.Esolar.gt(1)) gain = gain.mul(player.E.Esolar.root(1.35))
          //"septic"
   return `
    <h2>Solinity #${format(player.E.Solinity)}</h2> <br>                   
    <br> Gain +${format(gain)} Solinity Levels, Then Reset Solar Charge.
    Requires: 50 Solar Charge
    `
          
    
        },
        canAfford() {
          return player.E.SolarCharge.gte(50) 
        },
        buy() {
          let gain = new Decimal(1)
          gain = player.E.SolarCharge.root(10).sub(1)
          if (player.E.Esolar.gt(1)) gain = gain.mul(player.E.Esolar.root(1.35))
       
    
      
        player.E.Solinity = player.E.Solinity.plus(gain)
        player.E.SolarCharge = new Decimal(1)
       
        },
        style() {
          return {
            "width": "266px",
            "height": "135px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "10px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },
        unlocked() {return player.E.EclipseTier.gte(3)}
         
      },
  22: { //Just so you know, this buyable is not like the others, This acts like a reset instead so that it does not move with the background lmaoo

        display() {
        let gain = new Decimal(1)
        gain = player.E.Solinity.root(1.5).log(3).sub(1)
        if (player.E.Solinity.lt(10)) gain = new Decimal(0)
        let effect = new Decimal(1)
        effect = effect.mul(player.E.Esolar).root(1.35)
        

        //"septic"
       return `<h2>Esolar #${format(player.E.Esolar)}</h2> <br>                   
        <br> Gain +${format(gain)} Esolar Levels, Then Reset Solar Charge and Solinity.
        Requires: 10 Solinity
        
        Variable C is Equal to Esolar.
       Effect boost to Solinity: ${format(effect)}
        `
                  
            
                },
        canAfford() {
                  return player.E.Solinity.gte(10) 
                },
        buy() {
                  let gain = new Decimal(1)
                  gain = player.E.Solinity.log(3).sub(1)
                  
            
            
            
              
                player.E.Esolar = player.E.Esolar.plus(gain)
                player.E.SolarCharge = new Decimal(1)
                player.E.Solinity = new Decimal(1)
               
                },
        style() {
                  return {
                    "width": "266px",
                    "height": "135px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "10px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#ffffff",
                  }
                },
                unlocked() {return player.E.Solinity.gte(10) || player.E.Esolar.gte(1.1)



                },
                branches: ["21"],
                 
    },
/*
  14 : {   


          

    display() {
      let gain = new Decimal(1)
      gain = player.E.SolarCharge.root(10).sub(1)

      //"septic"
    return `
      <h2>Solinity #${format(player.E.Solinity)}</h2> <br>                   
      <br> Gain +${format(gain)} Solinity Levels, Then Reset Solar Charge.
      Requires: 50 Solar Charge
      `
      

    },
    onClick() {
      let gain = new Decimal(1)
      gain = player.E.SolarCharge.root(10).sub(1)
      



  
    player.E.Solinity = player.E.Solinity.plus(gain)
    player.E.SolarCharge = new Decimal(1)
    


    },
canClick() {if (player.E.SolarCharge.gte(50)) return true},
style() { return {
        "width": "350px",
        "height": "100px",
        "border-radius": "5px",
        "border": "10px",
        "margin": "25px",
        "text-shadow": "0px 0px 10px #000000",
        
      }
    },   
    
unlocked() {if (hasMilestone("E",3)) return true}
}, 
 */




 },
            
 milestones: {
  1: {
      requirementDescription: "Eclipse Tier 1",
      effectDescription() {
        return `
        - Solar Light cap is increases based on highest Levels ever reached 
         <br> 
         (Which is ${format(player.E.TopLVL.pow_base(1.75))} btw)
         <br> 
        - +0.03 to Solar Ray Gain Exponent <br>
        - Unlock Eclipse Boosters (below this Milestone Board)
        `
      },
      done() { 
        return player.E.EclipseTier.gte(this.id) },
      unlocked() {return player.E.EclipseTier.gte(this.id) },
      onComplete() {
        doPopup("msg","...h-hello? is anyone there?", "???",3)        
      },
  },
  2: {
    requirementDescription: "Eclipse Tier 2",
    effectDescription() {
      if (player.E.EclipseTier.gte(this.id))
      return `
      - Intricity and Polarized is Improved <br> Intricity: +0.05 -> +0.08 <br> Polarize: -5 -> -10 root base <br> 
      - Solar Rays's First hardcap is ^3 instead of ^2. but its formula is worse after ^2 <br>
      - Unlock Eclipsium <br>
      - ^1.15 Solarity Gain While inside Twilight check after the log nerf.

      ` 
      else return `???`
    },
    done() { return player.E.EclipseTier.gte(this.id) },
    unlocked() {return player.E.EclipseTier.gte(1) },
    onComplete() {
      doPopup("msg","...where~ am I???", "???",3)        
    },
},
  3: {
  requirementDescription: "Eclipse Tier 3",
  effectDescription() {
    if (player.E.EclipseTier.gte(this.id))
    return `
    - QOL1: You can now Bulk Reset Center Points <br>
    - QOL2: Formality is kept on Recontrol<br>
    - Unlock Solar Charge<br>
    - Formality's Exponent is increased 1.25 -> 1.4 <br>
    ` 
    else return `???`
  },
  done() { return player.E.EclipseTier.gte(this.id) },
  unlocked() {return player.E.EclipseTier.gte(2) },
  onComplete() {
    doPopup("msg","I hear something... coming...? ", "???",3)        
  },
},
4: {
  requirementDescription: "Eclipse Tier 4",
  effectDescription() {
    if (player.E.EclipseTier.gte(this.id))
    return `
    - QOL3: You always generate Solar Rays based on log10 of Solarity<br>
    - QOL4: Unlock Offset points (Centrality layer)<br>
    - QOL5: Heirarchy is kept on Recontrol <br>
    - Unlock Recontrol Upgrades, as well as Expansion I  <br>
    ` 
    else return `???`
  },
  done() { return player.E.EclipseTier.gte(this.id) },
  unlocked() {return player.E.EclipseTier.gte(3) },
  onComplete() {
    doPopup("msg","I can see it... I can hear... ", "???",3)        
  },
},
5: {
  requirementDescription: "Eclipse Tier 5",
  effectDescription() {
    if (player.E.EclipseTier.gte(this.id))
    return `
    - Generate Solar Light ^0.35 of its Solar Light cap<br>
    - Heirarchy's effect boost Solarity gain cap<br>
    - Unlock Lunaris <br>
    - Twilight is kept on Recontrol, and
    <br>
    DEBUFF:<br>
    Eclipse Tier Requirement is worsened
    ` 
    else return `???`
  },
  done() { return player.E.EclipseTier.gte(this.id) },
  unlocked() {return player.E.EclipseTier.gte(3) },
  onComplete() {
    doPopup("msg","I can see it... I can hear... ", "???",3)        
  },
},
},
            clickables: {  
              
     
              11: {
                  display() {
                    
                    let ready = `To get to the next Eclipse Tier: ${player.E.ETCost} Enlightenment Levels `
                    let allReset = ` `
                     if (player.E.EclipseTier.gte(2)) allReset = `(including current progress)`
                  if (player.E.ENLlevels.gte(player.E.ETCost)) ready = `You Can Aquire the next Eclipse Tier on This Eclipsication!`
                   
                  return `
                    <h2>ECLIPSICATION [LAYER 3 RESET]</h2><br> 
                    <h4>Eclipsation will reset EVERYTHING up to this point. ${allReset}</h4>
                    Your first Eclipsication Unlocks a board in this tab that provides various boosts to help you get back to where you started! (after all nerfs) 
                                 
                    ${ready}                  
                    `
      
                  },
                  onClick() {
                  
                  
                  if (player.E.EclipseTier.gte(2)) player.E.Eclipsium = player.E.Eclipsium.plus(player.E.ECSgain)
                  if (player.E.ENLlevels.gte(player.E.ETCost)) {
                    player.E.EclipseTier = player.E.EclipseTier.plus(1)
                    


                    // reset ALL progress
                    player.E.Eclipsium = player.E.Eclipsium.mul(0)
                    setBuyableAmount("E", 11, new Decimal(0) )
                    player.E.SolarCharge = new Decimal(1)
                    player.E.Solinity = new Decimal(1)
                    player.E.Esolar = new Decimal(1)

                  }
                  
                  

                  layer2Reset()
                 
                  



                  },
              canClick() {if (player.E.ENLlevels.gte(player.E.ETCost) ) return true},
              style() {
                
                
                return {
                      "width": "500px",
                      "height": "100px",
                      "border-radius": "0px",
                      "border": "10px",
                      "margin": "25px",
                      "text-shadow": "0px 0px 10px #000000",
                      
                    } 
                    
                  },   
                  
                  
              },
              12: {   


          

                          display() {
                            let gain = new Decimal(1)
                            gain = player.E.ENLlevels

                            //"septic"
                          return `
                            <h2>Recontrol [MODIFIED LAYER 3 RESET]</h2> <br> 
                            Doing a recontrol reset does everything Convertary does as well as rooting Solar Shards and Center Points by 3, it also resets some things.
                            
                            <br> recontrol will give +${format(gain)} Eclipsium, then do an Recontrol reset as well as check upgrades
                            `
                            

                          },
                          onClick() {
                            let gain = new Decimal(1)
                            gain = player.E.ENLlevels
                            



                        
                          player.E.Eclipsium = player.E.Eclipsium.plus(gain)
                          EclipsiumReset()
                         


                          },
                      canClick() {if (hasMilestone("E",2) && player.E.ENLlevels.gte(1)) return true},
                      style() { return {
                              "width": "350px",
                              "height": "100px",
                              "border-radius": "5px",
                              "border": "10px",
                              "margin": "25px",
                              "text-shadow": "0px 0px 10px #000000",
                              
                            }
                          },   
                          
                    unlocked() {if (hasMilestone("E",2)) return true}
              },

                // END OF CLICKABLE CODE
              
              
        
        15: {
                  display() {
                    let Inactive = `<h3>Enter</h3> <h2>THE XONE</h2> <br>[ Requires 5 Eclipsium]<br>`
                    let Active = `<h2> Everything is dilated by ^0.7 Except for Upgrade Checks Rewards </h2><br>
                    <br>
                   `
                    return getClickableState("E", 11) ? Active : Inactive  

                  },
                  onClick() {
                    const currentState = getClickableState("E", 11)
                    setClickableState("E", 11, !currentState)

                    if (getClickableState("E", 11) == true ) {
                      player.points = player.points.mul(0)
                      player.S.points = player.S.points.mul(0)
                      
                    }
                    if (getClickableState("GL", 11) == false)  {
                    let currentSOLARLIGHT = player.GL.Solarlight
                      layer1Reset()
                      player.GL.Solarlight = currentSOLARLIGHT
                      currentSOLARLIGHT = currentSOLARLIGHT.mul(0).plus(1)
                    }
                    
                    
                  },
                  branches: ["11", "12"],
              canClick() {if (hasUpgrade("S",14)) return true},
              style() {
                return (getClickableState("GL", 11)) ? {
                  "width": "500px",
                  "height": "50px",
                  "border-radius": "0px",
                  "border": "0px",
                  "margin": "25px",
                  "text-shadow": "0px 0px 10px #000000",
                  
                } : {
                  "width": "300px",
                  "height": "40px",
                  "border-radius": "20px",
                  "border": "10px",
                  "margin": "25px",
                  "text-shadow": "0px 0px 10px #000000",
                  
                }
                  },   
                  
                  
              },
                




            },

           

    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "", description: "Press A to Accelerate the Energy ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["GL"],
    layerShown(){ 
      hasCurrency = new Decimal(1)
      if ( player["E"].ENLlevels.gte(1) || player.points.gte(1e308) || player.E.EclipseTier.gte(1) )   return true; 

    }
}

)