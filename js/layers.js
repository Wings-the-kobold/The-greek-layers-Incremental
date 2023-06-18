
addLayer("M", {
  name: "Multiplier", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "x", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  }},
  color: "#E902AB",
  requires: new Decimal(10), // Can be a function that takes requirement increases into account
  resource: "Multiplier", // Name of prestige currency
  baseResource: "G.M", // Name of resource prestige is based on
  baseAmount() {return player.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.4, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      mult = mult.mul(buyableEffect("M" , 12))
      if(hasUpgrade("M", 16)) mult = mult.times(2)
      if (hasMilestone('I', 3)) mult = mult.pow(1.05)
      if(hasUpgrade("F", 11)) mult = mult.times(1.5)
      return mult

  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)

  },
  resetDescription: `Multiply G.M by 0 to gain `,
  passiveGeneration() {
    let gen = new Decimal(1)
    if(hasUpgrade("I", 11)) gen = gen.mul(0.5) // multiplies passive generation by the upgrade effect
    if(hasUpgrade("I", 11)) return gen // returns the correct value
   // return gen
    },
    doReset(resettingLayer) {
      if (layers[resettingLayer].row <= layers[this.layer].row) return; // just necessary boilerplate
      
      let keep = [];
      if (hasUpgrade("I", 13)) keep.push("upgrades");
      layerDataReset(this.layer, keep);
    },
    update(diff){
      if(hasMilestone("I", 6)){
        if(player.M.points.gte(tmp.M.buyables[11].cost)){
          layers.M.buyables[11].buy()
        }
        if(player.M.points.gte(tmp.M.buyables[12].cost)){
          layers.M.buyables[12].buy()
        }
        if(player.M.points.gte(tmp.M.buyables[13].cost)){
          layers.M.buyables[13].buy()
        }
      }
    },
    

    nodeStyle: {'border-radius': '40%'},

    //buyUpgrade(layer, id)

  buyables: {
    
      11: {
        cost(x) {
          let PowerI = new Decimal(1.4)
          
          let Calculation = new Decimal(3).mul(Decimal.pow(PowerI, x.pow(1))).div(buyableEffect("R" , 11)).ceil()
           //Calculation = Calculation.add(0.1)
          //the cost scaling of the upgrade
          return Calculation;
        },
        display() {
          return `<h2>Increase G.M gain by +1</h2><br>
          <h3> +${format(tmp[this.layer].buyables[this.id].effect)} Generated Multiplier boost<h3></b><br> 
      <h3>Cost: ${formatWhole(tmp[this.layer].buyables[this.id].cost)} Multiplier</h3>`
        },
        canAfford() {
          return player[this.layer].points.gte(this.cost())
        },
        style() {
          return {
            "width": "500px",
            "height": "105px",
            "border-radius": "10px",
            "border": "2px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },
        buy() {
          player[this.layer].points = player[this.layer].points.sub(this.cost())
          addBuyables(this.layer, this.id, 1)
        },


          effect() {
              let effect = getBuyableAmount(this.layer, this.id);
              if (buyableEffect("M", 11).lt(1)) effect = new Decimal(1);
              effect = effect.add(1).mul(buyableEffect("R" , 12).sub(1));
              effect = softcap(effect, new Decimal(200), new Decimal(0.5))
              //if (inChallenge("F", 12)) effect = effect.pow(0.5)
              return effect;
            },
       
        unlocked() {
          return true
        },
        autobuyUpgrades() {
      if (hasMilestone("I",6)) return true
    },
        
      },
        12: {
        cost(x) {
          let PowerI = new Decimal(1.4)
          
          let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1))).div(buyableEffect("R" , 11)).ceil() //the cost scaling of the upgrade
          return Calculation;
        },
        display() {
         
         return `<h2>Increase Multiplier gain by +1</h2><br>
          <h3>  x${format(tmp[this.layer].buyables[this.id].effect)} Multiplier Boost</h3></b><br>
      <h3>Cost: ${formatWhole(tmp[this.layer].buyables[this.id].cost)} Multiplier</h3>`
        },
        canAfford() {
          return player[this.layer].points.gte(this.cost())
        },
        style() {
          return {
            "width": "500px",
            "height": "105px",
            "border-radius": "10px",
            "border": "2px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },
        buy() {
          player[this.layer].points = player[this.layer].points.sub(this.cost())
          addBuyables(this.layer, this.id, 1)
        },
        effect() {
          let effect = getBuyableAmount(this.layer, this.id);
          if (buyableEffect("M", 12).lt(1)) effect = new Decimal(1);
          effect = effect.add(1).mul(buyableEffect("R" , 12).sub(1));
          effect = softcap(effect, new Decimal(200), new Decimal(0.5))
          //if (inChallenge("F", 12)) effect = effect.pow(0.5)
          
          return effect;
        },
        unlocked() {
          return true
        },
       
      },
          13: {
        cost(x) {
          let PowerI = new Decimal(1.4)
          
          let Calculation = new Decimal(200).mul(Decimal.pow(PowerI, x.pow(1.1))).div(buyableEffect("R" , 11))        .ceil() //the cost scaling of the upgrade
          return Calculation;
        },
        display() {
          return `<h2>Multiply G.M gain by 10% compounding</h2><br>
          <h3> x${format(tmp[this.layer].buyables[this.id].effect)} G.M gain</h3></b><br>
      <h3>${formatWhole(tmp[this.layer].buyables[this.id].cost)} Multiplier</h3>`
        },
        canAfford() {
          return player[this.layer].points.gte(this.cost())
        },
        style() {
          return {
            "width": "500px",
            "height": "105px",
            "border-radius": "10px",
            "border": "2px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },
        buy() {
          player[this.layer].points = player[this.layer].points.sub(this.cost())
          addBuyables(this.layer, this.id, 1)
        },
     
          effect() {
            let effect = getBuyableAmount(this.layer, this.id).pow_base(1.1).times(getBuyableAmount("R", 12).add(1))
            if (inChallenge("F", 12)) effect = effect.pow(0.5)
            return effect
          },
        
        unlocked() {
          return true
        },
        
      },
  },

  upgrades: {
    
      11: {
          title: "Basic I",
          description: "Gain 2x more G.M",
          cost: new Decimal(30),
          effect() {
            let effect = new Decimal(2)
            if (hasUpgrade('R', 12)) effect = effect.mul(upgradeEffect('R', 12))
          //  if (hasMilestone('I', 3)) effect = effect.mul(2)
            //if (hasMilestone('I', 4)) effect = effect.mul(2)
          },
          effectDisplay() {
            return format(upgradeEffect(this.layer, this.id))+"x"
           
          },
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "10px",
              "border": "2px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
    },
      12: {
          title: "Produci",
          description: "Multiplier Boosts G.M",
          effect() {
              return player[this.layer].points.add(1).log(10).add(1) 
          },
          effectDisplay() { if (hasUpgrade('M', 12)) return format(upgradeEffect(this.layer, this.id))+"x" },
          cost: new Decimal(400),
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "10px",
              "border": "2px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
    },
      13: {
          title: "Weak Produci",
          description: `Multiplier Boosts G.M again, but much weaker.<br>`,
          effect() {
              return player[this.layer].points.add(1).log(10).div(10).add(1)
          },
          effectDisplay() { if (hasUpgrade('M', 13)) return format(upgradeEffect(this.layer, this.id))+"x" },
          cost: new Decimal(2000),
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "10px",
              "border": "2px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
    },
      14: {
        title: "Basic II",
        description: "Gain 2x more G.M",
        cost: new Decimal(30000),
        effect() {
        let effect = new Decimal(2)
        if (hasUpgrade('R', 12)) effect = effect.mul(upgradeEffect('R', 12))

        },
        effectDisplay() {
          if (hasUpgrade('R', 12)) return format(upgradeEffect(this.layer, this.id))+"x"
          else return "2.00x"
        },
        style() {
          return {
            "width": "200px",
            "height": "75px",
            "border-radius": "10px",
            "border": "2px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },
        unlocked() {
          if (hasUpgrade("I",12)) return true
        },
    },
      15: {
        title: "Incresio",
        description: "Incresors Boosts G.M",
        effect() {
          return player["I"].points.add(1).log(7).add(1) 
        },
        effectDisplay() { if (hasUpgrade('M', 15)) return format(upgradeEffect(this.layer, this.id))+"x" },
        cost: new Decimal(600000),
        style() {
          return {
          "width": "200px",
          "height": "75px",
          "border-radius": "10px",
          "border": "2px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }

      },
      unlocked() {
        if (hasUpgrade("I",12)) return true
      },
    },
      16: {
        title: "Kaboom",
        description: "Multiplier gain is doubled",
        cost: new Decimal("2e6"),
        style() {
          return {
          "width": "200px",
          "height": "75px",
          "border-radius": "10px",
          "border": "2px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
      }

    },
    unlocked() {
      if (hasUpgrade("I",12)) return true
    },
  },
  },

  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
      {key: "m", description: "Press M to multiply by 0", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  layerShown(){return true}
})

addLayer("R", {
name: "Reduction", // This is optional, only used in a few places, If absent it just uses the layer id.
symbol: "⬇r", // This appears on the layer's node. Default is the id with the first letter capitalized
position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
startData() { return {
    unlocked: true,
points: new Decimal(0),
}},
color: "#5A66D6",
requires: new Decimal(3500), // Can be a function that takes requirement increases into account
resource: "Reduction Points", // Name of prestige currency
baseResource: "Multiplier", // Name of resource prestige is based on
baseAmount() {return player["M"].points}, // Get the current amount of baseResource
type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
exponent: 1, // Prestige currency exponent
resetDescription: `Reduction reset will do everything Multiplier does as well as its upgrades to gain  `,
gainMult() { // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1)
    if (hasMilestone("I",7)) mult = mult.div(1.5)
    //if (hasUpgrade("F",11)) mult = mult.div(2)
    return mult

},
gainExp() { // Calculate the exponent on main currency from bonuses
    return new Decimal(1)
},
autoPrestige() {
  if (hasMilestone("I",4)) return true

},

resetDescription: `
<h2>Reduction</h2><br> 
Reduce the Multiplier Layer, which resets all Multiplier upgrades and its amount. <br> you will gain 
 `,
 componentStyles: {
  "prestige-button"() { return {
    
    'height':'150px','width':'400px', "border-radius": "10px"
  
  
      } 
    }
  },

buyables: {
  11: {
      cost(x) {
        let PowerI = new Decimal(2)
        
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1))) //the cost scaling of the upgrade
        return Calculation;
      },

      
      display() {
        return `<h2>Dividi</h2><br>
       <h3>  /${format(tmp[this.layer].buyables[this.id].effect)} buyable cost</h3> </b><br>
    <h3>${formatWhole(tmp[this.layer].buyables[this.id].cost)} Reduction Points</h3>`
      },
      canAfford() {
        return player[this.layer].points.gte(this.cost())
      },
      style() {
        return {
          "width": "200px",
          "height": "105px",
          "border-radius": "10px",
          "border": "2px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      buy() {
        player[this.layer].points = player[this.layer].points.sub(this.cost())
        addBuyables(this.layer, this.id, 1)
      },
        effect() {
            let effect = getBuyableAmount(this.layer, this.id);
            effect = effect.add(1);
            return effect;
          },


  },
  12: {
    cost(x) {
      let PowerI = new Decimal(2)
      
      let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1))) //the cost scaling of the upgrade
      return Calculation;
    },
    display() {
      return `<h2>Multiplicand</h2><br> 
      <h3>x${format(tmp[this.layer].buyables[this.id].effect.sub(1))} buyable strength <h3></b><br>
  <h3>${formatWhole(tmp[this.layer].buyables[this.id].cost)} Reduction Points</h3>`
    },
    canAfford() {
      return player[this.layer].points.gte(this.cost())
    },
    style() {
      return {
        "width": "200px",
        "height": "105px",
        "border-radius": "10px",
        "border": "2px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
    buy() {
      player[this.layer].points = player[this.layer].points.sub(this.cost())
      addBuyables(this.layer, this.id, 1)
    },
      effect() {
        let effect = new Decimal(1);
        if (buyableEffect("R", 12).lt(1)) effect = new Decimal(1); // <-- why is this here? this should very clearly be different than the first line
        if (effect.lt(1)) effect = new Decimal(1);
        effect = effect.add(getBuyableAmount(this.layer, this.id)).add(1)
        return effect;
        },


},

},
upgrades: {
  11: {
    title: "Reduction upgrade I",
    description: "unspent Reduction points boost G.M",
    cost: new Decimal(1),
    effect() {
      return player[this.layer].points.add(1) 
  },
    effectDisplay() { if (hasUpgrade('R', 11)) return format(upgradeEffect(this.layer, this.id))+"x" }
  },
  12: {
    title: "Reduction Upgrade II",
    description: "Basic Upgrade I is boosted by unspent Reduction points",
    cost: new Decimal(5),
    effect() {
      return player[this.layer].points.add(1) 
  },
    effectDisplay() { if (hasUpgrade('R', 12)) return format(upgradeEffect(this.layer, this.id))+"x" }
  },
  },


row: 1, // Row the layer is in on the tree (0 is the first row)
branches: ["M", "R"],
hotkeys: [
    {key: "r", description: "Press 'R' to Reduce the Multiplier layer back down to 1", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
],
layerShown(){
  if (hasUpgrade('M', 13)) return true
  if (player[this.layer].points.gte(1)) return true
  if (hasUpgrade('R', 11)) return true
  if (getBuyableAmount('R', 12).gte(1)) return true
  if (getBuyableAmount('R', 11).gte(1)) return true
 // if (player["F"].points.gte(1)) return true
 // if (hasUpgrade('F', 11)) return true
},
})

//addLayer(string, {constructor})
addLayer("I", {
name: "Increasor", // This is optional, only used in a few places, If absent it just uses the layer id.
symbol: "x↑", // This appears on the layer's node. Default is the id with the first letter capitalized
position: 3,
 // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
startData() { return {
    unlocked: true,
points: new Decimal(0),
increment: new Decimal(1),
}},
effect() {
  let effect = new Decimal(1)
  if (hasMilestone("I",5)) effect = player["I"].increment.log(2).pow(1.1).max(1).floor()
  return effect
},

update(diff) {
  if (hasMilestone("I", 5)) player["I"].increment = player["I"].increment.add(0.2)
  

},
resetDescription: `
<h2>Incresity</h2><br> 
Perform an Incresity reset, which resets everything Reduction does. <br> you will gain 
 `,
tabFormat: [
  "main-display",
  "prestige-button",
  
  ["display-text",
      function() { if(hasMilestone("I",5)) return `<br>You have <h3 style="color:#2287EC ; text-shadow: #063770 0px 0px 10px;"> ${format(player["I"].increment)}</h3> increment <br><br>Your current Increment boosts G.M gain by <h3 style="color:#2287EC ; text-shadow: #063770 0px 0px 10px;">${format(tmp["I"].effect)}x</h3>`},
     //#2EAE07
    ],
  "blank",
  
  "milestones",
  "blank",
  "blank",
  "upgrades"
],
//*/
color: "#E18E5F",
requires: new Decimal("10000"), // Can be a function that takes requirement increases into account
resource: "Incresors", // Name of prestige currency
baseResource: "Multiplier", // Name of resource prestige is based on
baseAmount() {return player["M"].points}, // Get the current amount of baseResource
type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
exponent: 0.5, // Prestige currency exponent
gainMult() { // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1)
    //if (hasUpgrade("F",11)) mult = mult.times(2)
    return mult

},
gainExp() { // Calculate the exponent on main currency from bonuses
    return new Decimal(1)
},

componentStyles: {
  "prestige-button"() { return {
    
    'height':'150px','width':'200px', "border-radius": "10px",
  
  
  } 
}

},

  upgrades: {

      11: {
        title: "finally a QoL upgrade",
        description: "gain 50% of Multiplier gain as you would reset on multiplying by 0 every second",
        cost: new Decimal(3)
      },
      12: {
        title: "the best unlock upgrades",
        description: "Unlock 3 upgrades from multiplier layer",
        cost: new Decimal(50)
      },
      13: {
        title: "This upgrade sucks",
        description: "Keep all multiplier buyables on reduction and divide",
        cost: new Decimal(500)
      },

  },
  
  buyables: {
    11: {
      

    },


  },
  






  milestones: {
    1: {
      requirementDescription: "Get your first increasor",
      effectDescription: "G.M gain is raised ^1.05",
    done() { return player["I"].points.gte(1) }
  },
    2: {
    requirementDescription: "Get your first upgrade",
    effectDescription: "Get 3x more G.M",
  done() { if (hasUpgrade("I",11)) return true }
  },
    3: {
        requirementDescription: "10 Incresors",
        effectDescription: "Multiplier is raised ^1.05",
      done() { return player["I"].points.gte(10) }
    },
    4: {
      requirementDescription: "100 Incresors ",
      effectDescription: "Autobuy Reduction points",
      done() { return player["I"].points.gte(100) }
  },
  5: {
    requirementDescription: "300 Incresors ",
    effectDescription: "Unlock Increment",
    done() { return player["I"].points.gte(300) },
  },
    6: {
    requirementDescription: "1000 Incresors",
    effectDescription: "Autobuy all Multiplier buyables",
    done() { return player["I"].points.gte(1000) },
    toggles: [["M", "idle"]["M", "auto"]],

},
7: {
  requirementDescription: "Get all QoL Upgrades",
  effectDescription: "Divide Reduction Requirement Cost by 1.5",
  done() { if (hasUpgrade("I",11) && hasUpgrade("I",12) && hasUpgrade("I",13) ) return true /*alert("you got the milestone")*/},
},
},



row: 1, // Row the layer is in on the tree (0 is the first row)
branches: ["I", "M"],
layerShown(){ 
  if (player[this.layer].points.gte(1)) return true
  if (hasUpgrade('I', 11)) return true
  if (player["M"].points.gte(15000)) return true
  //if (player["F"].points.gte(1)) return true
 // if (hasUpgrade('F', 11)) return true
}
})
/*/primitate
addLayer("F", {
name: "Fixate", // This is optional, only used in a few places, If absent it just uses the layer id.
symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
startData() { return {
    unlocked: true,
points: new Decimal(0),
replicand: new Decimal(0),
}},
color: "#53DB6E",
requires: new Decimal(20), // Can be a function that takes requirement increases into account
resource: "Fixations", // Name of prestige currency
baseResource: "Reduction Points", // Name of resource prestige is based on
baseAmount() {return player["R"].points}, // Get the current amount of baseResource
type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
exponent: 0.5, // Prestige currency exponent
gainMult() { // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1)
    return mult

},
gainExp() { // Calculate the exponent on main currency from bonuses
    return new Decimal(1)
},

componentStyles: {
  "prestige-button"() { return {
    
    'height':'150px','width':'400px', "border-radius": "10px"
  
  
  } }




},

resetDescription: `
<h2>Fixation</h2><br> 
Fixing resets everything Reduction or Incresity does, including their Upgrades and incresity milestones.<br>in return, you will gain `,


tabFormat: {
  "Fixation": {      
        content: [
          "main-display",
          "prestige-button",
          
      ],
  
  },
  "Challenges": {
      content: [
     "challenges",
     ],
    
  },
  "The Upgrade Tree": {
    content: [
   "upgrades",
   ],  
},   
},

upgrades: {
          11: {
            title: `
            (11)<h3> Unlock Challenges.</h3><br>
            <br>Reducers gain, Incresor gain is increased by 50%
            <br> Multiplier gain is increased by 40%.
            <br> G.M gain is increased by 30%
            <br> You keep Incresity QoL Milestones on Fixate
            `,
            cost: new Decimal(1),
            style() {
              return {
                "width": "600px",
                "height": "75px",
                "border-radius": "0px",
                "border": "1px",
                "margin": "30px",
                "text-shadow": "10px 20px 50px #ffffff",
                "color": "#D51159"
              }
            },
            branches: [("F",11), ("F",12), ("F",13), ("F",14)],
          },
    
          

          12: {
          title: "Produci Upgrade is ^2 stronger",
          cost: new Decimal(2),
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "0px",
              "border": "8px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          branches: [("F",12), ("F",15)],
          canAfford() {
            if ( hasUpgrade("F",13) || hasUpgrade("F",14) ) return false
          },
          },
          
          13: {
          title: "Multiplier exponent becomes ^0.3 -> ^0.4",
          cost: new Decimal(2),
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "0px",
              "border": "2px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          branches: [("F",13), ("F",16)],
          canAfford() {
            if ( hasUpgrade("F",12) || hasUpgrade("F",14) ) return false
          },
          },
          
          14: {
          title: "Start generating Replicand",
          cost: new Decimal(2),
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "0px",
              "border": "2px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          branches: [("F",14), ("F",17)],
          canAfford() {
            if ( hasUpgrade("F",12) || hasUpgrade("F",13) ) return false
          },
          },
       
          

          15: {
          title: "Reduction upgrade I is ^1.2 stronger",
          cost: new Decimal(3),
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "0px",
              "border": "2px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          branches: [("F",15), ("F",18)],
          canAfford() {
            if ( hasUpgrade("F",13) || hasUpgrade("F",14) ) return false
          },
          
          },

          16: {
          title: "Weak Produci exponent becomes ^1 -> ^1.1",
          cost: new Decimal(3),
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "0px",
              "border": "2px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          branches: [("F",16), ("F",19),("F",18),("F",20)],
          
          canAfford() {
            if ( hasUpgrade("F",12) || hasUpgrade("F",14) ) return false
          },
          },
          
          17: {
          title: "Replicand gain is 2x faster",
          cost: new Decimal(3),
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "0px",
              "border": "2px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          branches: [("F",17), ("F",19)],
          canAfford() {
            if ( hasUpgrade("F",12) || hasUpgrade("F",13) ) return false
          },
          },
      
          

          18: {
          title: "Multiplier Softcap starts +20 upgrades later",
          cost: new Decimal(5),
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "0px",
              "border": "2px",
              "margin": "2px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          
          },

          19: {
          title: "Increment gain is boosted by Replicand at a reduced rate",
          cost: new Decimal(5),
          style() {
            return {
              "width": "200px",
              "height": "75px",
              "border-radius": "0px",
              "border": "2px",
              "margin": "2px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          
          },
          21: {
            title: "Reduction does not reset multiplier upgrades",
            cost: new Decimal(10),
            style() {
              return {
                "width": "200px",
                "height": "75px",
                "border-radius": "0px",
                "border": "2px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#ffffff"
              }
            },
            
            },

          22: {
              title: "Going Incresity does not reset multiplier upgrades",
              cost: new Decimal(10),
              style() {
                return {
                  "width": "200px",
                  "height": "75px",
                  "border-radius": "0px",
                  "border": "2px",
                  "margin": "10px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color": "#ffffff"
                }
              },
              
              },
          
},

     challenges: {
            11: {
                name: "Basic Challenge",
                challengeDescription: ` Now do it all again! <br>- Does a Fixor reset <br>- No restrictions applied<br> `,
                canComplete: function() {return player["R"].points.gte("25")},
                goalDescription: `25 reduction points<br>`,
                completionLimit: new Decimal(5),
                unlocked() {
                  if (hasUpgrade("F",11)) return true
                },
                style() {
                  return {
                    "width": "300px",
                    "height": "275px",
                    "border-radius": "15px",
                    "border": "2px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#ffffff"
                  }
                },
                rewardDescription: `100% boost to G.M, additive. 
                <br> on full completion: keep Autobuyer milestones on fixate`,
                completionLimit: new Decimal(5),
                rewardEffect() {
                  let effect = new Decimal(1)
                  effect = effect.times(challengeCompletions("F", 12)).times(1.2)
                  
                  return effect
                },
                rewardDisplay() {
                  return `<br> Multiplier effect to G.M: ${challengeCompletions("F", 12)}% weaker`
                },
            },
              12: {
                  name: "Anti-Multiplier",
                  challengeDescription: `this upgrade nerf is awful.<br> - Does a Fixor reset <br>- All Multiplier Buyables are nerfed ^0.5
                  <br>`,
                  canComplete: function() {return player["R"].points.gte("30")},
                  goalDescription: `30 Reduction points<br>`,
                  unlocked() {
                    if (hasUpgrade("F",11)) return true
                  },
                  style() {
                    return {
                      "width": "300px",
                      "height": "300px",
                      "border-radius": "15px",
                      "border": "2px",
                      "margin": "5px",
                      "text-shadow": "0px 0px 10px #000000",
                      "color": "#ffffff"
                    }
                  },
                  rewardDescription: "Buyables softcaps are 5% weaker",
                  completionLimit: new Decimal(5),
                  rewardEffect() {
                    let effect = new Decimal(1)
                    effect = effect.times(challengeCompletions("F", 12)).times(1.05)
                    
                    return effect
                  },
                  rewardDisplay() {
                    return `<br> All Multiplier Softcaps are ${challengeCompletions("F", 12)}% weaker`
                  },
              },
              13: {
                name: "Super Scale",
                challengeDescription: `
                This is a bad challenge, and i hate you.<br>
                - Does a Fixor reset <br> - Reducers scaling is increased ^2 -> ^3 <br>
                - Multiplier Scaling is increased ^1.3 -> ^1.6 <br>
                `,
                canComplete: function() {return player["R"].points.gte("30")},
                goalDescription: "30 Reduction points",
                unlocked() {
                  if (hasUpgrade("F",11)) return true
                },
                style() {
                  return {
                    "width": "550px",
                    "height": "325px",
                    "border-radius": "15px",
                    "border": "2px",
                    "margin": "5px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#ffffff"
                  }
                },
                rewardDescription: `Lower the cost scalings for Multiplier and Reduction Buyables by -0.02 per completion<br>`,
                rewardEffect() {
                  let effect = new Decimal(1)
                  effect = effect.times(challengeCompletions("F", 13)).times(1.02)
                  
                  return effect
                },
                rewardDisplay() {
                  return `<br>- Reduction buyables is reduced to ^2 -> ^${format(challengeEffect("F", 13).add(2))} <br> - Multiplier buyables is reduced to ^1.3 -> ^${format(challengeEffect("F", 13).add(1.3))}`
                },
                completionLimit: new Decimal(5),
              
            },
            },
  



row: 3, // Row the layer is in on the tree (0 is the first row)
branches: ["T","R"],
layerShown(){
  if (player["R"].points.gte(20)) return true
  if (player["F"].points.gte(1)) return true
  if (hasUpgrade("F",11)) return true 

}
})
//*/
