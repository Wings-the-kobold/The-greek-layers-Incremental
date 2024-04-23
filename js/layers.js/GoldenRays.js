addLayer("GL", {
    name: "Compression", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        Solarlight: new Decimal(0),
        Solarlightcap: new Decimal(2000),
        Solar_Shards: new Decimal(0),
       
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
          if (getClickableState("GL", 11) == true && player["GL"].Solarlight.lt(player["GL"].Solarlightcap) ) {
            let mult = tmp.pointGen.times(diff)
            player["GL"].Solarlight = player["GL"].Solarlight.plus(mult.pow(0.1).sub(1)).clampMin(0)
             
        }
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
        "Centrality of Reality ": {
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

            
            canAfford() {
                if (player["GL"].Solar_Shards.gte(13.5)) return true
            },
            onPurchase() {
              player["GL"].Solar_Shards = player["GL"].Solar_Shards.sub(13.5)
            }, 
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
                Cost: 22 Solar Rays
                `
            },
            cost: new Decimal(22),
            canAfford() {
              if (player["GL"].Solar_Shards.gte(22)) return true

          },
          onPurchase() {
            player["GL"].Solar_Shards = player["GL"].Solar_Shards.sub(22)
          }, 
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
              return `<h2>Intricity</h2> <br>
              
              
              ^0.09 of Solarity Boosts themselves <br> <br>
              Cost: 75 Solar Rays
              
              `
          },
          cost: new Decimal(75),
          onPurchase() {
            player["GL"].Solar_Shards = player["GL"].Solar_Shards.sub(75)
          }, 
          canAfford() {
            if (player["GL"].Solar_Shards.gte(75)) return true
        },
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
                      if (getClickableState("GL", 11) == false) 
                      layer1Reset()

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
