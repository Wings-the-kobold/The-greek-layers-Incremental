
/*
addLayer("C", {
     // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
    color: "#587246 ",
    requires: new Decimal("1e30"), // Can be a function that takes requirement increases into account
    resource: "Conversion Ranks", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.1, // Prestige currency exponent
    symbol() {
      return `
      <p> 
      <p class='cBreak' style='font-size:16px'>Conversion Ranks</p>
      </p><p class='cBreak' style='font-size:13px'>[Node #03]</p>
      </p>`
    },
    
    infoboxes: {
  
      about: {
        title: "Conversion rank",
        body() {
          return `<h2>SOFT RESET: Conversion rank </h2><br> 
          Convert Points and Post-Shifting Upgrades for a milestone boost! (does not reset shifting layer)
          `
        },
      
  
      },
    },
     
    resetDescription: `
    <h2>Convert my points!</h2><br><br>
    `,
  
  
    componentStyles: {
      "prestige-button"() { return {
        
        'height':'150px','width':'200px', "border-radius": "10px"
      
      
          } 
        }
      },
 
    milestones: {
      1: {
            requirementDescription: "At Rank 1:",
            effectDescription: "Multiply Points by 5x Compounding per rank",
            done() { return player["C"].points.gte(1) }
        },
      2: {
            requirementDescription: "At Rank 2:",
            effectDescription: "RepUpg2 is 20% stronger based on ranks starting at 2",
            done() { return player["C"].points.gte(2) }
        },
      3: {
            requirementDescription: "At Rank 3:",
            effectDescription: "repUpg1, repUpg2, and repUpg3 no longer spends amount",
            done() { return player["C"].points.gte(3) }
        },
      4: {
          requirementDescription: "At Rank 4:",
          effectDescription: "repUpg1, repUpg2, and repUpg3 no longer spends amount",
          done() { return player["C"].points.gte(4) }
      },
      5: {
        requirementDescription: "At Rank 5:",
        effectDescription: "repUpg1, repUpg2, and repUpg3 no longer spends amount",
        done() { return player["C"].points.gte(5) }
      
    },
      6: {
      requirementDescription: "At Rank 10:",
      effectDescription: "repUpg1, repUpg2, and repUpg3 no longer spends amount",
      done() { return player["C"].points.gte(9) }
    
    },
      7: {
        requirementDescription: "At Rank 15:",
        effectDescription: "First",
        done() { return player["C"].points.gte(9) }
      
      },
      8: {
        requirementDescription: "At Rank 15:",
        effectDescription: "First",
        done() { return player["C"].points.gte(9) }
      
      },
      9: {
        requirementDescription: "At Rank 15:",
        effectDescription: "First",
        done() { return player["C"].points.gte(9) }
      
      },
      11: {
        requirementDescription: "At Rank 15:",
        effectDescription: "First",
        done() { return player["C"].points.gte(9) }
      
      },
      12: {
        requirementDescription: "At Rank 15:",
        effectDescription: "First",
        done() { return player["C"].points.gte(9) }
      
      },
      13: {
        requirementDescription: "At Rank 15:",
        effectDescription: "First",
        done() { return player["C"].points.gte(9) }
      
      },
      14: {
        requirementDescription: "At Rank 15:",
        effectDescription: "First",
        done() { return player["C"].points.gte(9) }
      
      },
      15: {
        requirementDescription: "At Rank 15:",
        effectDescription: "First",
        done() { return player["C"].points.gte(9) }
      
      },
      16: {
        requirementDescription: "At Rank 15:",
        effectDescription: "First",
        done() { return player["C"].points.gte(9) }
      
      },
      17: {
        requirementDescription: "At Rank 15:",
        effectDescription: "First",
        done() { return player["C"].points.gte(9) }
      
      },

  },



  
  
   
    row: 1, // Row the layer is in on the tree (0 is the first row)
    
    branches: ["R"],
    layerShown(){
      //if (hasUpgrade("R",16)) return true
      let totalCompletions = new Decimal(challengeCompletions("R", 11))
      totalCompletions= totalCompletions.plus(challengeCompletions("R", 12))
      totalCompletions= totalCompletions.plus(challengeCompletions("R", 13))
      totalCompletions= totalCompletions.plus(challengeCompletions("R", 14))
      if (totalCompletions.gte(10)) return true; else return false
  
  
  
    }
  })
 




















  addLayer("CT", {
    // This appears on the layer's node. Default is the id with the first letter capitalized
   position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
   startData() { return {
       unlocked: true,
   points: new Decimal(0),
   }},
   color: "#d6a765 ",
   requires: new Decimal("50"), // Can be a function that takes requirement increases into account
   resource: "Condensed Tiers", // Name of prestige currency
   baseResource: "Conversion Ranks", // Name of resource prestige is based on
   baseAmount() {return player["C"].points}, // Get the current amount of baseResource
   type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
   exponent: 1.1, // Prestige currency exponent
   symbol() {
     return `
     <p> 
     <p class='cBreak' style='font-size:16px'>Condensed Tiers</p>
     </p><p class='cBreak' style='font-size:13px'>[Node #05]</p>
     </p>`
   },
   
   infoboxes: {
 
     about: {
       title: "Condensed Tiers",
       body() {
         return `<h2>SOFT RESET: Condensed Tier </h2><br> 
         Convert Points and Post-Shifting Upgrades for a milestone boost! (does not reset shifting layer)
         `
       },
     
 
     },
   },
    
   resetDescription: `
   <h2>Condense my tiers!</h2><br><br>
   `,
 
 
   componentStyles: {
     "prestige-button"() { return {
       
       'height':'150px','width':'200px', "border-radius": "10px"
     
     
         } 
       }
     },

     milestones: {
       1: {
           requirementDescription: "At Rank 1:",
           effectDescription: "Multiply Points by 5x Compounding per rank",
           done() { return player["C"].points.gte(1) }
       },
       2: {
           requirementDescription: "At Rank 2:",
           effectDescription: "RepUpg2 is 20% stronger based on ranks starting at 2",
           done() { return player["C"].points.gte(2) }
       },
       3: {
           requirementDescription: "At Rank 3:",
           effectDescription: "repUpg1, repUpg2, and repUpg3 no longer spends amount",
           done() { return player["C"].points.gte(3) }
       },
       4: {
         requirementDescription: "At Rank 4:",
         effectDescription: "repUpg1, repUpg2, and repUpg3 no longer spends amount",
         done() { return player["C"].points.gte(4) }
     },
       5: {
       requirementDescription: "At Rank 5:",
       effectDescription: "repUpg1, repUpg2, and repUpg3 no longer spends amount",
       done() { return player["C"].points.gte(5) }
     
   },
       6: {
     requirementDescription: "At Rank 10:",
     effectDescription: "repUpg1, repUpg2, and repUpg3 no longer spends amount",
     done() { return player["C"].points.gte(9) }
   
   },
   7: {
     requirementDescription: "At Rank 15:",
     effectDescription: "First",
     done() { return player["C"].points.gte(9) }
   
   },
 },



 
 
  
   row: 2, // Row the layer is in on the tree (0 is the first row)
   
   branches: ["C"],
   layerShown(){
     //if (hasUpgrade("R",16)) return true
     return false
 
 
 
   }
 })



*/
