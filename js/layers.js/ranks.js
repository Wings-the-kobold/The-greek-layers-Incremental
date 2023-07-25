addLayer("C", {
    symbol: "cr", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
    color: "#587246 ",
    requires: new Decimal("1e30"), // Can be a function that takes requirement increases into account
    resource: "Converted Ranks", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.1, // Prestige currency exponent
    
    
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
            effectDescription: "RepUpg2 is 15% stronger",
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
  },



  
  
   
    row: 1, // Row the layer is in on the tree (0 is the first row)
    
    branches: ["S"],
    layerShown(){
      if (hasUpgrade("R",16)) return true
     
  
  
  
    }
  })
  