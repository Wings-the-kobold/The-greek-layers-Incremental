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
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.mul(buyableEffect("M" , 12))
        return mult

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },


    buyables: {
        11: {
          cost(x) {
            let PowerI = new Decimal(1.5)
            
            let Calculation = new Decimal(3).mul(Decimal.pow(PowerI, x.pow(1))).div(buyableEffect("R" , 11)) //the cost scaling of the upgrade
            return Calculation;
          },
          display() {
            return `Increase G.M gain by +1<br>
            +${format(tmp[this.layer].buyables[this.id].effect)} Generated Multiplier boost</b><br>
        <h1>${formatWhole(tmp[this.layer].buyables[this.id].cost)} Multiplier</h1>`
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
          }
        },
          12: {
          cost(x) {
            let PowerI = new Decimal(1.5)
            
            let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1))).div(buyableEffect("R" , 11)) //the cost scaling of the upgrade
            return Calculation;
          },
          display() {
            return `Increase Multiplier gain by +1<br>
            x${format(tmp[this.layer].buyables[this.id].effect)} Multiplier Boost</b><br>
        <h1>Cost: ${formatWhole(tmp[this.layer].buyables[this.id].cost)} Multiplier</h1>`
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
            return `Multiply G.M gain by 10% compounding<br>
            x${format(tmp[this.layer].buyables[this.id].effect)} G.M gain</b><br>
        <h1>${formatWhole(tmp[this.layer].buyables[this.id].cost)} Multiplier</h1>`
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
            effect = effect.pow(1.1).sub(getBuyableAmount(this.layer, this.id)).mul(buyableEffect("R" , 12)).sub(1);
           
            return effect;
          },
          unlocked() {
            return true
          }
        },
    },

    upgrades: {
        11: {
            title: "Multiplier...",
            description: "Gain 2x more G.M",
            cost: new Decimal(30),
            
        },
        12: {
            title: "Multiplier... Multiply?",
            description: "Multiplier Boosts G.M",
            effect() {
                return player[this.layer].points.add(1).log(10) 
            },
            effectDisplay() { if (hasUpgrade('M', 12)) return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(400),
        },
        13: {
            title: "Another Multiplier boost...",
            description: "Multiplier Boosts G.M again, but much weaker",
            effect() {
                return player[this.layer].points.add(1).log(40)
            },
            effectDisplay() { if (hasUpgrade('M', 13)) return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(2000),
        },
    },






    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
  requires: new Decimal(5000), // Can be a function that takes requirement increases into account
  resource: "Reduction Points", // Name of prestige currency
  baseResource: "Multiplier", // Name of resource prestige is based on
  baseAmount() {return player["M"].points}, // Get the current amount of baseResource
  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.65, // Prestige currency exponent
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
          let PowerI = new Decimal(1.8)
          
          let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1))) //the cost scaling of the upgrade
          return Calculation;
        },
        display() {
          return `Reduce all Multiplier Buyables Costs by %100<br>
          /${format(tmp[this.layer].buyables[this.id].effect)} buyable cost </b><br>
      <h1>${formatWhole(tmp[this.layer].buyables[this.id].cost)} Reduction Points</h1>`
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
        let PowerI = new Decimal(1.8)
        
        let Calculation = new Decimal(1).mul(Decimal.pow(PowerI, x.pow(1))) //the cost scaling of the upgrade
        return Calculation;
      },
      display() {
        return `all Multiplier buyables are 50% stronger<br>
        x${format(tmp[this.layer].buyables[this.id].effect.sub(1))} buyable strength </b><br>
    <h1>${formatWhole(tmp[this.layer].buyables[this.id].cost)} Reduction Points</h1>`
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
          effect = effect.add(getBuyableAmount(this.layer, this.id).mul(1.5)).add(1)
          return effect;
          },


  },

  },
  upgrades: {
    11: {
      title: "HA! very easy!",
      description: "unspent Reduction points boost G.M",
      cost: new Decimal(1),
      effect() {
        return player[this.layer].points.add(1) 
    },
      effectDisplay() { if (hasUpgrade('R', 11)) return format(upgradeEffect(this.layer, this.id))+"x" }
    }


  },


  row: 1, // Row the layer is in on the tree (0 is the first row)
  branches: ["M", "R"],
  hotkeys: [
      {key: "T", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
  ],
  layerShown(){return true}
})










/*
addLayer("I", {
  name: "Increasor", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "x↑", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  }},
  color: "#E18E5F",
  requires: new Decimal("15000"), // Can be a function that takes requirement increases into account
  resource: "Mul+", // Name of prestige currency
  baseResource: "Multiplier", // Name of resource prestige is based on
  baseAmount() {return player["M"].points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.65, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      return mult

  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
  },

    upgrades: {

        11: {
          title: "finally a QoL upgrade"
          description: "gein 10% of"

        },
        12: {
          title: ""


        },

    },





  row: 1, // Row the layer is in on the tree (0 is the first row)
  layerShown(){return true}
})
*/
