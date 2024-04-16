addLayer("S", {
    name: "Solar Ray", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sol", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff6a00",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Solar Rays", // Name of prestige currency
    baseResource: "Solarity", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent 

    tabFormat: {
        "March 8th, 2024": {      
              content: [
                "main-display",
                ["infobox","about"],
                
                "prestige-button",
                "upgrades",
                ["display-text",
      function() { 
        return ` <h3> Your Current Solar Rays Boost Solarity gain by ${format(Decimal.pow( player[this.layer].points.root(40),2),3  )}x</h3>`
        
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
        "Upgrades": {
          content: [
            "buyables",

          ],
          

        },
       
      },







    prestigeButtonText() {
        let exponent = 0.1
        if (hasUpgrade("S",11)) exponent = 0.15
        return `Gain Solar rays by ^${exponent} of Solarity, Then Reset Solarity.<br> (Requires at least 1 Solarity)<br> +${format(getNextAt(this.layer,canMax=true))} Solar Rays<br> `
    },
    canReset() {
        return true
    },
    getResetGain() {
        if (player.points.gt(1)) {
        gain = new Decimal(player.points.pow(0.1)).sub(1)
        }

        return gain

    },
    getNextAt() {
        if (player.points.gt(1)) {
          if (hasUpgrade("S",11)) {
            gain = new Decimal(player.points.pow(0.15)).sub(1)

          } else {
              gain = new Decimal(player.points.pow(0.1)).sub(1)

          }
            
            
        } else  {
            gain = new Decimal(player.points.pow(0.1)).mul(0)
        }
       
        return gain

    },
    componentStyles: {
        "prestige-button"() { return {
            "border-radius":"0px",
        }}
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },


    upgrades:
    {
        11: {
            fullDisplay() {
                return `<h2>Intricity</h2> <br>
                Requires: Plasmate #5 <br><br>
                
                +0.05 Solar Ray Gain Exponent <br> 
                Cost: 22 Solar Rays
                
                `
            },
            cost: new Decimal(22),
            canAfford() {
                if (getBuyableAmount("S",11).gte(5) && player["S"].points.gte(this.cost)) return true

            },
            unlocked() {
              if (getBuyableAmount("S",11).gte(5)) return true
            }
        },

        12: {
          fullDisplay() {
              return `<h2>Polarize</h2> <br>
              Requires: Plasmate #10 <br><br>
              
              -5 to Root formula of solar rays bonus <br> 
              Cost: 105 Solar Rays
              
              `
          },
          cost: new Decimal(105),
          canAfford() {
              if (getBuyableAmount("S",11).gte(10) && player["S"].points.gte(this.cost)) return true

          },
          unlocked() {
            if (hasUpgrade("S",11)) return true
          }
      },


    },



    buyables: {
        11: {
            cost(x) {
              let scale = new Decimal(1.35)
              let base = new Decimal(5)
              let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
              return Calculation;
            },
            display() {
              return `
            <h2>Plasmate #${getBuyableAmount(this.layer, this.id)}</h2>
            <br>
          <h2>  +${format(tmp[this.layer].buyables[this.id].effect)} to Solarity Gain</h2>
            <br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Solar Rays</h2>
          `
            },
            canAfford() {
              return player[this.layer].points.gte(this.cost())
            },
            buy() {
              if (player[this.layer].points.gte(this.cost)) player[this.layer].points = player[this.layer].points.minus(this.cost());
              addBuyables(this.layer, this.id, 1);
            },
            effect() {
              let effect = decimalOne
              effect = effect.mul(getBuyableAmount(this.layer, this.id)).mul(3)
              return effect;
            },
           
             
          },

          
        
    },







    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})