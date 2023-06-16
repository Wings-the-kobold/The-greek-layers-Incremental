

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
      },
      doReset(resettingLayer) {
        if (layers[resettingLayer].row <= layers[this.layer].row) return; // just necessary boilerplate
        
        let keep = [];
        if (hasUpgrade("I", 13)) keep.push("upgrades");
        layerDataReset(this.layer, keep);
      },
      



    buyables: {
        11: {
          cost(x) {
            let PowerI = new Decimal(1.5)
            
            let Calculation = new Decimal(3).mul(Decimal.pow(PowerI, x.pow(1))).div(buyableEffect("R" , 11)) //the cost scaling of the upgrade
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
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },


            effect() {
                let effect = getBuyableAmount(this.layer, this.id);
                if (buyableEffect("M", 11).lt(1)) effect = new Decimal(1);
                effect = effect.add(1).mul(buyableEffect("R" , 12).sub(1));
                return effect;
              },
         
          unlocked() {
            return true
          },
          
        },
          12: {
          cost(x) {
            let PowerI = new Decimal(1.5)
            
            let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1))).div(buyableEffect("R" , 11)) //the cost scaling of the upgrade
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
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect() {
            let effect = getBuyableAmount(this.layer, this.id);
            if (buyableEffect("M", 12).lt(1)) effect = new Decimal(1);
            effect = effect.add(1).mul(buyableEffect("R" , 12).sub(1));
            
            return effect;
          },
          unlocked() {
            return true
          }
        },
            13: {
          cost(x) {
            let PowerI = new Decimal(1.4)
            
            let Calculation = new Decimal(200).mul(Decimal.pow(PowerI, x.pow(1))).div(buyableEffect("R" , 11)) //the cost scaling of the upgrade
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
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect() {
            let effect = getBuyableAmount(this.layer, this.id).add(1);
            if (buyableEffect("M", 13).lt(1)) effect = new Decimal(1);
            effect = effect.pow(1.1).sub(getBuyableAmount(this.layer, this.id)).mul(buyableEffect("R" , 12));
           
            return effect;
          },
          unlocked() {
            return true
          }
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
      },
        12: {
            title: "Produci",
            description: "Multiplier Boosts G.M",
            effect() {
                return player[this.layer].points.add(1).log(5).add(1) 
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
                return player[this.layer].points.add(1).log(50).add(1)
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
          cost: new Decimal(15000),
          effect() {
            //let effect = 2
           //if (hasUpgrade('R', 12)) effect = effect.mul(upgradeEffect('R', 12))

          },
          effectDisplay() {
            // if (hasUpgrade('R', 12)) return format(upgradeEffect(this.layer, this.id))+"x"
            // else return "2.00x"
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
            return player[this.layer].points.add(1).log(5).add(1) 
          },
          effectDisplay() { if (hasUpgrade('M', 12)) return format(upgradeEffect(this.layer, this.id))+"x" },
          cost: new Decimal(30000),
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
          cost: new Decimal(1e6),
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
  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
  exponent: 0.7, // Prestige currency exponent
  resetDescription: `Reduction reset will do everything Multiplier does as well as its upgrades to gain  `,
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      return mult

  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
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
          setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
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
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
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
      {key: "R", description: "Press 'R' to Reduce the Multiplier layer back down to 1", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  layerShown(){
    if (hasUpgrade('M', 13)) return true
    if (player[this.layer].points.gte(1)) return true
    if (hasUpgrade('R', 11)) return true
    if (getBuyableAmount('R', 12).gte(1)) return true
    if (getBuyableAmount('R', 11).gte(1)) return true
},
})

//addLayer(string, {constructor})
addLayer("I", {
  name: "Increasor", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "x↑", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: true,
  points: new Decimal(0),

  increment: new Decimal(0),
  }},


 /* tabFormat: [
    "main-display",
    ["prestige-button"],
    
    ["display-text",
        function() { return `You have ` + format(player.increment) + ` increment<br> your current increment boosts Multiplier by ` },
       
      ],
    "blank",
    
    "milestones",
    "blank",
    "blank",
    "upgrades"
],
//*/
  color: "#E18E5F",
  requires: new Decimal("15000"), // Can be a function that takes requirement increases into account
  resource: "Incresors", // Name of prestige currency
  baseResource: "Multiplier", // Name of resource prestige is based on
  baseAmount() {return player["M"].points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      return mult

  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
  },

    upgrades: {

        11: {
          title: "finally a QoL upgrade",
          description: "gain 50% of Multiplier gain as you would reset for Incresor every second",
          cost: new Decimal(5)
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
    
    milestones: {
      1: {
        requirementDescription: "Get your first increasor",
        effectDescription: "G.M gain is raised ^1.05",
      done() { return player["I"].points.gte(1) }
    },
      2: {
      requirementDescription: "Get your first upgrade",
      effectDescription: "Unlock Increment [NYI]",
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
      requirementDescription: "500 Incresors",
      effectDescription: "Autobuy all Multiplier buyables",
      done() { return player["I"].points.gte(500) }
  },
  },



  row: 1, // Row the layer is in on the tree (0 is the first row)
  branches: ["I", "M"],
  layerShown(){ 
    if (player[this.layer].points.gte(1)) return true
    if (hasUpgrade('I', 11)) return true
    if (player["M"].points.gte(15000)) return true
  
  }
})


//dont worry about this lol
/*
addLayer("T", {
  name: "Exponentiation", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "x^", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  }},
  color: "#A13E5F",
  requires: new Decimal("700"), // Can be a function that takes requirement increases into account
  resource: "Exponentiate", // Name of prestige currency
  baseResource: "Reduction Points", // Name of resource prestige is based on
  baseAmount() {return player["M"].points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.75, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      return mult

  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
  },

    upgrades: {

        11: {
          title: "finally a QoL upgrade",
          description: "gain 10% of Multiplier every second",
          cost: new Decimal(10)
        },
        12: {
          title: "the best unlock upgrades",
          description: "Unlock 3 upgrades from multiplier layer",
          cost: new Decimal("4.20e69")
        },
        13: {
          title: "i hate this, can i keep everything?",
          description: "Keep all multiplier buyables on reduction and divide",
          cost: new Decimal("9e420")
        },

    },
    
  


  row: 3, // Row the layer is in on the tree (0 is the first row)
  branches: ["I", "T", "M", "R"],
  layerShown(){return true}
})
*/