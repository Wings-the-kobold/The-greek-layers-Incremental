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
        CenterPoints: new Decimal(0)
    }},
    color: "#F0FA64",
   // Can be a function that takes requirement increases into account
    resource: "Solar Light", // Name of prestige currency
    baseResource: "Solarity", // Prestige currency uses this "base currency"
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
            player["GL"].Solarlight = player["GL"].Solarlight.plus(mult.pow(0.1).sub(1)).max(0)
             
        }
        },
         


        
        
        doReset(resetLayer){  
      
          if(tmp[resetLayer].row < this.row) layerDataReset(resetLayer)
          if(tmp[resetLayer].row > this.row) {
            layerDataReset(this.layer)
            //if (hasUpgrade("R",13)) player.S.upgrades.push("15")
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
       
       return `You have ${format(player["GL"].Solar_Shards )} Solar Shards. `

    }],
     "blank",
     "blank",
                //"main-display",
                ["infobox","about"],
                
                 
                ["clickable",11],
                ["clickable",12],
                
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                
            ],
            
        },
        "Centrality of Reality ": {
          content: [
            "buyables",
            "upgrades",
            
            //["clickable",13],
          ],
          

        },
       
      },
      getResetGain() {
        let gain = new Decimal(1)
        gain = gain.mul(player["GL"].Solarlight.pow(0.4))
      
        
      
        return gain;
      },
      
      
      getNextAt() {
        let gain = new Decimal(1)
        gain = gain.mul(player["GL"].Solarlight.pow(0.4))     
        return gain;
      },


      prestigeButtonText() {
        let exponent = 0.1
        if (hasUpgrade("S",11)) exponent = 0.15
        return `Gain Solar rays by ^${exponent} of Solarity, Then Reset Solarity.<br> (Requires at least 1 Solarity)<br> +${format(getNextAt(this.layer))} Solar Rays<br> `
        
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




      /* 
      let gain = new Decimal(1)
      gain = gain.mul(player["GL"].Solarlight.pow(0.4))
      
      
      
      
      
      
      
      
      */
      



    


// if (player["GL"].Solar_shards.gte(1))
/*
 upgrades: {
                11: {
                    title:"Chasm-1",
                    description: "5x Energy Gain",
                    cost: new Decimal(5),
                },
                12: {
                    title: "Chasm-2",
                    description: "3x Acceleron Gain",
                    cost: new Decimal(10),
                    
                },
                13: {
                    title: "Heterogenic-1",
                    description: "Accelerons boost Energy Gain",
                    cost: new Decimal(20),
                    
                },
            },
*/

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
                      doReset(1)

                    },
                canClick() {return true},
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
                    let Inactive = `<h3>CONVERTARY [LAYER 2 RESET]</h3><br> <br>(Requires Solar Light Generation)`
                    let Active = `
                    Convert ALL of your Solar Light into ^0.4 of golden light. <br> 
                    Then reset Solar Upgrades, Solarity, Solar Rays, And Solar Modifiers. 
                    <br> Convertary will Award +${format(player["GL"].Solarlight.pow(0.4))} Solar Shards, Before Resetting Solar Light
                    `
                    return getClickableState("GL", 11) ? Active : Inactive  

                  },
                  onClick() {
                    let gain = new Decimal(1)
                    gain = gain.mul(player["GL"].Solarlight.pow(0.4))




                  player["GL"].Solar_Shards = player["GL"].Solar_Shards.plus(gain)
                  player["GL"].Solarlight = player["GL"].Solarlight.mul(0)
                  setClickableState("GL", 11, !getClickableState("GL", 11))
                  doReset(this.layer)



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


      if (hasUpgrade("S",14)) return true; 
      else if (player["GL"].Solar_shards .gte(1)) return true;
      else if (player["GL"].Solarlight.gte(1) ) return true;
      else return false;
    }
}

)
