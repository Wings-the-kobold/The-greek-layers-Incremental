addLayer("GL", {
    name: "Compression", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sol+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        Solarlight: new Decimal(0),
        Solarlightcap: new Decimal(2000),
        Solar_Shards: new Decimal(0),
        Time: new Decimal(0)
    }},
    color: "#F0FA64",
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
          let mult = new Decimal(0)
          if (getClickableState("GL", 11) == true && player["GL"].Solarlight.lt(player["GL"].Solarlightcap) ) {
          mult = Decimal.pow(getPointGen().pow(0.5), 0.2).sub(1).times(diff)
        }
        player["GL"].Solarlight = player["GL"].Solarlight.plus(mult).clampMin(0)

        if (hasUpgrade("GL",14)) player["GL"].Time = player["GL"].Time.plus(1).clampMin(0)//.times(diff)

        

        },
         


      






  
    tabFormat: {
        "Solarity of Disparity": {      
              content: [
                
                
                ["display-text",
      function() { 
        
        return `You Have Generated ${format(player["GL"].Solarlight)} / ${format(player["GL"].Solarlightcap)} Solar Light`

     }],
     ["display-text",
     function() { 
      if (player["GL"].Solar_Shards.gte(1))
       return `You have ${format(player["GL"].Solar_Shards )} Solar Shards. `

    }],

    // player["GL"].CenterPoints
     "blank",
     "blank",
                //"main-display",
                ["infobox","about"],
                
                 
                ["clickable",11],
                ["clickable",12],
                
             
                "blank",
               "blank",
               "upgrades",
              
                
                
                "blank",
                "blank",
                "blank",
                
            ],
            
        },
        "Light Modifiers": {
          content: [
            "buyables",
          ],
          

        },
       
      },
    

   







    


// if (player["GL"].Solar_shards.gte(1))
    tooltip: () => `<p>Open Layer 2, Main Layer</p>`,
 upgrades: {
          11: {
            fullDisplay() {
                return `<h2>Shardism</h2> <br>
                
                Plasmates Cost is ^0.9 and then /3 <br> <br>
                Cost: 13.5 Solar Shards
                
                `
            },
            cost: new Decimal(13.5),
            //currencyInternalName: player["GL"].Solar_Shards,
            currencyDisplayName: "Solar Shards",
            currencyInternalName: "Solar_Shards",
            currencyLayer: "GL",
            unlocked() {
            return true
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
                return `<h2>Scorch</h2> <br>
               
                
                Multiplys Cost is ^0.9 and then /3 <br> <br>
                Cost: 22 Solar Shards
                `
            },
            cost: new Decimal(22),
            currencyDisplayName: "Solar Shards",
            currencyInternalName: "Solar_Shards",
            currencyLayer: "GL",
            unlocked() {
              return true
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
              let enter
              if (hasUpgrade("GL",13)) enter = format(upgradeEffect("GL",13) )
              else enter = "???"
                return `<h2>Leverage</h2> <br> <br><br>
                
                ^0.09 of Solarity boosts themselves <br>
                Cost: 35 Solar Shards <br> 
                <br> Leverage's effect is ${enter}<br>
                `
            },
          effect() {
            let effect = new Decimal(1)
            return effect = player.points.pow(0.09)
          },
          cost: new Decimal(35),
          currencyDisplayName: "Solar Shards",
            currencyInternalName: "Solar_Shards",
            currencyLayer: "GL",

          unlocked() {
            return true
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
          
          
          let enter;
          let change; 
              if (hasUpgrade("GL",14)) enter = format(upgradeEffect("GL",14),3)
              if (hasUpgrade("GL",14)) change = `Oscillating... <br>Annular's Effect is ^${enter}`
              else change = `Cost: 105 Solar Shards`
            
              return `
              <h2>Annular:</h2> <br>
            [red color]: Instability... <br><br>
            Requires: <br>
            Shardism <br>
            Scorch <br>
            Leverage <br><br>
            
            

            Boost Range: <br> 
            ^0.9 ~ ^1.17 to Solarity <br><br>
            
            ${change}`
           


        },
        unlocked() {if ( hasUpgrade("GL",11) && hasUpgrade("GL",12) && hasUpgrade("GL",13) ) return true},
        branches: ["11","12","13"],
        cost: new Decimal(75),
        currencyDisplayName: "Solar Shards",
          currencyInternalName: "Solar_Shards",
          currencyLayer: "GL",
        
        effect() {
          
          return Decimal.plus(1.035, sin(player["GL"].Time.div(5))*0.135)

        },
        
        style() {
          return {
            "width": "200px",
            "height": "170px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "50px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#3a3337"
          }
        },
    },
          15: {
      fullDisplay() {
        
        
        let enter;
        let change; 
            if (hasUpgrade("GL",15)) enter = format(upgradeEffect("GL",15),3)
            if (hasUpgrade("GL",15)) change = `Oscillating... <br>Coronal's Effect is ${enter}`
            else change = `[Get Requirements to Unlock!]`
          
            return `
            <h2>Coronal:</h2> <br>
          [red color]: Uncomfortibility <br><br>
          Requires:<br> Phaser #10<br> Plasmate #35<br> Multiply #70 <br><br>

          
          

          Boost Range: <br> 
          0.4x - 5.4x to Solar Rays<br><br>
          
          ${change}`
         


      },
      unlocked() {if ( hasUpgrade("GL",11) && hasUpgrade("GL",12) && hasUpgrade("GL",13) ) return true},
      branches: ["14"],
      canAfford() {
        if (hasUpgrade("GL",14) && getBuyableAmount("S",11).gte(35) && getBuyableAmount("S",12).gte(70) && getBuyableAmount("GL",11).gte(10)) return true
        else return false
      },
     


      effect() {
        
        return Decimal.plus(0.4, cos(player["GL"].Time.div(5))*5).abs().clampMin(0.4).clampMax(5.4)

      },
      
      style() {
        return {
          "width": "290px",
          "height": "170px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "50px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#3a3337"
        }
      },
  },
    
        //to do: make Effecter Upgrades.




          






            },

 buyables: { 
  11: {
    cost(x) {
      let scale = new Decimal(1.2)
      let base = new Decimal(5)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
      return Calculation;
    },
    display() {
      return `
    <h2>Phaser #${getBuyableAmount(this.layer, this.id)}</h2>
    <br>
  <h2>  +${format(tmp[this.layer].buyables[this.id].effect)} to Plasmates base. </h2>
    <br>
  <h2>${format(tmp[this.layer].buyables[this.id].cost)} Solar Shards</h2>
  <br>
  <p> Requires Plasmate #3 <p>
  `
    },
    canAfford() {
      return player["GL"].Solar_Shards.gte(this.cost()) && getBuyableAmount("S",11).gte(3)
    },
    buy() {
      if (player["GL"].Solar_Shards.gte(this.cost)) player["GL"].Solar_Shards = player["GL"].Solar_Shards.minus(this.cost());
      addBuyables(this.layer, this.id, 1);
    },
    effect() {
      let effect = decimalOne
      effect = effect.mul(getBuyableAmount(this.layer, this.id))
      return effect;
    },
    style() {
      return {
        "width": "305px",
        "height": "155px",
        "border-radius": "10px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
   
     
  },

  




 },
            

            clickables: {
                11: {
                    display() {
                      let Inactive = `<h2>Start Up Solar Light Generation </h2> <br>[ Requires Solarizor ]<br>`
                      let Active = `<h2> Using ^0.5 of Solarity gain to generate ^0.2 of Solar Light...</h2><br>
                     When Stopping generation, Reset Solar Upgrades, Solarity, Solar Rays, And Solar Modifiers.  <br>
                    <p>(Note: Starting generation does NOT reset lower layers!)</p><br><br>
                      <br>`
                      return getClickableState("GL", 11) ? Active : Inactive  

                    },
                    onClick() {
                      const currentState = getClickableState("GL", 11)
                      setClickableState("GL", 11, !currentState)

                      if (getClickableState("GL", 11) == true ) {
                        player.points = player.points.mul(0)
                        
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


                // DOWN HERE IS A CONVERTARY RESET.

                12: {
                  display() {
                    let gain = player["GL"].Solarlight.pow(0.4)

                    let Inactive = `<h3>CONVERTARY [LAYER 2 RESET]</h3><br> <br>(Requires Solar Light Generation)`
                    let Active = `
                    Convert ALL of your Solar Light into ^0.4 of golden light. <br> 
                    Then reset Solar Upgrades, Solarity, Solar Rays, And Solar Modifiers. 
                    <br> Convertary will Award +${format(gain)} Solar Shards, Before Resetting Solar Light
                    
                    `
                    return getClickableState("GL", 11) ? Active : Inactive  

                  },
                  onClick() {
                    let gain = new Decimal(1)
                    gain = gain.mul(player["GL"].Solarlight.pow(0.4))




                  player["GL"].Solar_Shards = player["GL"].Solar_Shards.plus(gain)
                  player["GL"].points = player["GL"].points.plus(gain)
                  // player["GL"].CenterPoints = player["GL"].CenterPoints.plus(1)
                  player["GL"].Solarlight = player["GL"].Solarlight.mul(0)
                  setClickableState("GL", 11, !getClickableState("GL", 11))
                  layer1Reset()



                  },
              canClick() {return getClickableState("GL", 11)},
              style() { return (getClickableState("GL", 11)) ? {
                      "width": "300px",
                      "height": "100px",
                      "border-radius": "20px",
                      "border": "10px",
                      "margin": "25px",
                      "text-shadow": "0px 0px 10px #000000",
                      
                    } : {
                      "width": "200px",
                      "height": "40px",
                      "border-radius": "20px",
                      "border": "10px",
                      "margin": "25px",
                      "text-shadow": "0px 0px 10px #000000",
                      
                    }
                    
                  },   
                  
                  
              },

                // END OF CLICKABLE CODE



                




            },

           

    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "", description: "Press A to Accelerate the Energy ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["S","GL"],
    layerShown(){ 
      hasCurrency = new Decimal(1)
      if ( hasUpgrade("S",14) || player["GL"].Solar_Shards.gte(1) || player["GL"].Solarlight.gte(1))   return true; 

    }
}

)






// SIDE LAYER BELOW










