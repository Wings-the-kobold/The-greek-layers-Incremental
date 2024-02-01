

addLayer("C", {
     // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    points: new Decimal(0),
    }},
    color: "#587246 ",
    requires() {
    let base = new Decimal(1e30)
    let increase = new Decimal(1.1)
    increase = increase.pow(player["C"].points)
    let result = base.pow(increase)
      return result.div(2)
    }, 
    type: "static",
    // Can be a function that takes requirement increases into account
    resource: "Conversion Ranks", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    
     // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
   
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
 












  doReset(resetLayer) {
    if (hasMilestone("C", 5)) {
        if (inChallenge("R", 11) || inChallenge("R", 12) || inChallenge("R", 13) || inChallenge("R", 14)) {
        return;
      } 
    } else {
      if (tmp[resetLayer].row>this.row) {
        layerDataReset(this.layer) 
      }
    }
    
   },


    milestones: {
      1: {
            requirementDescription: "Rank 1:",
            effectDescription() { 

              let r1Eff = new Decimal(1)
              r1Eff = Decimal.pow(2, player["C"].points)
                return `Multiply Upg3 by ${format(r1Eff)}x (2.00x Compounding) per rank`

              },
            
            done() { return player["C"].points.gte(1) },
            unlocked() {
              return true

            },
        },
      2: {
            requirementDescription: "Rank 2:",
            effectDescription() { 

                let r2Eff = new Decimal(1)
               if (hasMilestone("C",2)) r2Eff = Decimal.mul(3, player["C"].points.sub(1))
                return `ShftUpg1 roofchain base is added +${format(r2Eff)} (+20% of base) for every conversion rank starting at 2`

              },
            done() { return player["C"].points.gte(2) },
           
        },
      3: {
            requirementDescription: "Rank 3:",
            effectDescription() { 

              let r3Eff = new Decimal(1)
              r3Eff = Decimal.pow(1.4 , player["C"].points.sub(2) ).clampMin(1)
                return `repUpg3 is multiplied by ${format(r3Eff)}x. increased by conversion ranks starting at 3 (1.4x compounding)`
              },
            
            done() { return player["C"].points.gte(3) }
        },
      4: {
          requirementDescription: "Rank 4:",
          effectDescription: "Upg1 is raised ^1.00 -> ^1.25, point gain is doubled per conversion rank starting at 4",
          done() { return player["C"].points.gte(4) },
          unlocked() {
              return hasMilestone("C",3)
    
            }
      },
      5: {
        requirementDescription: "Rank 5:",
        effectDescription: "Conversion ranks does not reset when entering repression challenges",
        done() { return player["C"].points.gte(5) },
        unlocked() {
          return hasMilestone("C",4)

        }
      
    },
    6: {
      requirementDescription: "Rank 6:",
      effectDescription() { 

        let r1Eff = new Decimal(1)
        r1Eff = Decimal.pow(4, player["C"].points)
          return `Ranks boost Pressure point gain by ${format(r1Eff)}x (4x Compounding) per rank`

        },
      
      done() { return player["C"].points.gte(6) },
      unlocked() {
          return hasMilestone("C",5)

        }
    
    },
       7: {
      requirementDescription: "Rank 8:",
      effectDescription: " Upg2, Upg3 and Upg4 is no longer reset on shifting ",
      done() { return player["C"].points.gte(8) },
      unlocked() {
        return hasMilestone("C",6)

      },
    },
      
    
      8: {
        requirementDescription: "Rank 10:",
        effectDescription: "First",
        done() { return player["C"].points.gte(10) },
        unlocked() {
            return hasMilestone("C",7)
  
          }
      
      },
      9: {
        requirementDescription: "Rank 20:",
        effectDescription: "First",
        done() { return player["C"].points.gte(20) },
        unlocked() {
            return hasMilestone("C",8)
  
          }
      
      },
      11: {
        requirementDescription: "Conversion Rank 20",
        effectDescription: "First",
        done() { return player["C"].points.gte(20) },
        unlocked() {
            return hasMilestone("C",9)
  
          }
      
      }, 
      12: {
        requirementDescription: "At Rank 30:",
        effectDescription: "First",
        done() { return player["C"].points.gte(30) }
      
      },
      13: {
        requirementDescription: "At Rank 40:",
        effectDescription: "First",
        done() { return player["C"].points.gte(40) }
      
      },
      14: {
        requirementDescription: "At Rank 50:",
        effectDescription: "First",
        done() { return player["C"].points.gte(50) }
      
      },
      15: {
        requirementDescription: "At Rank 60:",
        effectDescription: "First",
        done() { return player["C"].points.gte(60) }
      
      },
      16: {
        requirementDescription: "At Rank 70:",
        effectDescription: "First",
        done() { return player["C"].points.gte(70) }
      
      },
      17: {
        requirementDescription: "At Rank 80:",
        effectDescription: "First",
        done() { return player["C"].points.gte(80) }
      
      },
      18: {
        requirementDescription: "At Rank 100:",
        effectDescription: "First",
        done() { return player["C"].points.gte(100) }
      
      },

  },



  
  
   
    row: 1, // Row the layer is in on the tree (0 is the first row)
    
    branches: ["R"],
    layerShown(){
       return false
     
      let totalCompletions = new Decimal(challengeCompletions("R", 11))
      totalCompletions= totalCompletions.plus(challengeCompletions("R", 12))
      totalCompletions= totalCompletions.plus(challengeCompletions("R", 13))
      totalCompletions= totalCompletions.plus(challengeCompletions("R", 14))
     
      if ((totalCompletions.gte(15) || player.points.gte(1e30) || player["C"].points.gte(1) ) && !inChallenge("R",14) ) return true; else return false
      
      
  
    },



  })
 



















/*
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
