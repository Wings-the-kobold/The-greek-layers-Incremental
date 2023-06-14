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
            let PowerI = new Decimal(1.6)
            
            let Calculation = new Decimal(3).mul(Decimal.pow(PowerI, x.pow(1))) //the cost scaling of the upgrade
            return Calculation;
          },
          display() {
            return `Increase Multiplier by 1<br>
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
                effect = effect.add(1);
                return effect;
              },
         
          unlocked() {
            return true
          }
        },
          12: {
          cost(x) {
            let PowerI = new Decimal(1.4)
            
            let Calculation = new Decimal(10).mul(Decimal.pow(PowerI, x.pow(1))) //the cost scaling of the upgrade
            return Calculation;
          },
          display() {
            return `Increase Multiplier gain by +1<br>
            x${format(tmp[this.layer].buyables[this.id].effect)} Multiplier gain</b><br>
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
            effect = effect.add(1);
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
            cost: new Decimal(6000),
        },
    },






    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
