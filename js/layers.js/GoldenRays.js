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
        CentrePoints: new Decimal(0)
    }},
    color: "#F0FA64",
    requires() {
      let base = new Decimal(1)
      let scale = new Decimal (1.1)
      base = scale.pow(player[this.layer].points)
        return base
    } , // Can be a function that takes requirement increases into account
    resource: "Solar Light", // Name of prestige currency
    baseResource: "Solarity", // Prestige currency uses this "base currency"
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.pow(0.3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },


    canReset() {
        return false
    },
    exponent() { return hasUpgrade("S", 11) ? 0.15 : 0.1; },

    passiveGeneration(diff){
        if (inChallenge("SC",1)) {
            let mult = player.points.pow(0.5)
             mult = mult.pow(0.2)
             return mult
        } else { 
        return 0
        
        
        }
    
    
    
      
    
         },

getResetGain() {
  if (player.points.lt(1)) return Decimal.dZero;

  let gain = Decimal.pow(player.points.minus(1), tmp.S.exponent);
  if (hasUpgrade("S", 14)) gain = Decimal.times(upgradeEffect("S", 14), gain)
  return gain;
},


getNextAt() {
  

},






    componentStyles: {
        "prestige-button"() { return {
            "border-radius":"0px",
            "width": "400px",
            "height": "75px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            
        }}
    },
    tabFormat: {
        "Solarity of Disparity": {      
              content: [
                "main-display",
                ["infobox","about"],
                
                "prestige-button",
                "upgrades",
                ["display-text",
      function() { 
        
        return `<h3> ^0.5 of Solarity is being used to make ^0.2 of Solar Light</h3>`

     }],
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

          ],
          

        },
       
      },

      



      prestigeButtonText() {
        
        return `Compress all Solar Light to gain {{amount}} Solarite <br> `
    },




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

            challenges: {

                
            }



    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "", description: "Press A to Accelerate the Energy ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){ if (hasUpgrade("S",14)) return true}
})
