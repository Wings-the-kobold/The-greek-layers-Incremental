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
   
    tooltip: () => `<p>Open Layer 1, Main Layer</p>`,
    tabFormat: {
        "March 8th, 2024": {      
              content: [
                
                ["infobox","about"],
                ["display-text",
                function() { 
                  
                  return `You have ${format(player.S.points)} Solar Rays.`
          
               }],
               "blank",
                "prestige-button",
                "blank",
                "upgrades",
                ["display-text",
      function() { 
        let gain = new Decimal(0)
        let gain2 = new Decimal(1)
        if (hasUpgrade("S",12)) {
          gain = player["S"].points.root(35).max(1)
          gain2 = gain2.mul(player["S"].points.root(25)).max(1)
          } else {
          gain = player["S"].points.root(40).max(1)
          gain2 = gain2.mul(player["S"].points.root(30)).max(1)
          }
        return `<h3> Solar Rays Boost Solarity by ^${format(gain,3)} and x${format(gain2,3)}</h3>`

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
        "Solar Modifiers ": {
          content: [
            "buyables",

          ],
          

        },
       
      },


      prestigeButtonText() {
        let exponent = 0.1
        if (hasUpgrade("S",11)) exponent = 0.15
        return `Gain Solar rays by ^${exponent} of Solarity, Then Reset Solarity.<br> (Requires at least 1 Solarity)<br> +${format(getNextAt(this.layer))} Solar Rays<br> `
    },
    canReset() {
        return true
    },
    exponent() { return hasUpgrade("S", 11) ? 0.15 : 0.1; },


getResetGain() {
  if (player.points.lt(1)) return Decimal.dZero;

  let gain = Decimal.pow(player.points, tmp.S.exponent).minus(1);
  if (hasUpgrade("S", 14)) gain = Decimal.times(upgradeEffect("S", 14), gain)
  return gain;
},


getNextAt() {
  if (player.points.lt(1)) return Decimal.dZero;
  
  let gain = Decimal.pow(player.points, tmp.S.exponent).minus(1);
  if (hasUpgrade("S", 14)) gain = Decimal.times(upgradeEffect("S", 14), gain)
  return gain;

},

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
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

    upgrades:
    {
        11: {
            fullDisplay() {
                return `<h2>Intricity</h2> <br>
                Requires:<br> Plasmate #5 <br><br> <br> 
                
                +0.05 Solar Ray Gain Exponent <br> <br>
                Cost: 22 Solar Rays
                
                `
            },
           
            cost: new Decimal(22),
            canAfford() {
                if (getBuyableAmount("S",11).gte(5) && player["S"].points.gte(this.cost)) return true

            },
            unlocked() {
              if (getBuyableAmount("S",11).gte(5) || inChallenge("GL",11)) return true
            },
            style() {
              return {
                "width": "150px",
                "height": "75px",
                "border-radius": "0px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#3a3337"
              }
            },
        },

        12: {
          fullDisplay() {
              return `<h2>Polarize</h2> <br>
              Requires:<br> Plasmate #10 <br><br><br> 
              
              -5 to Root formula of solar rays bonus <br><br>
              Cost: 105 Solar Rays
              
              `
          },
          cost: new Decimal(100),
          canAfford() {
              if (getBuyableAmount("S",11).gte(10) && player["S"].points.gte(this.cost)) return true
              else return false
          },
          unlocked() {
            if (hasUpgrade("S",11) || inChallenge("GL",11)) return true
          },
          style() {
            return {
              "width": "150px",
              "height": "75px",
              "border-radius": "0px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#3a3337"
            }
          },
      },
      
        13: {
        fullDisplay() {
          let enter
          if (hasUpgrade("S",13)) enter = format(upgradeEffect("S",13) )
          else enter = "???"
            return `<h2>Gravitation</h2> <br>
            Requires:<br>  Multiply #20 <br><br><br> 
            
            ^0.05 of Solarity boosts themselves <br>

            <br> Gravitations effect is ${enter}<br>
            `
        },
        cost: new Decimal(0),
        canAfford() {
            if (getBuyableAmount("S",12).gte(20) && player["S"].points.gte(this.cost) ) return true
            else return false
        },
        effect() {
          let effect = new Decimal(1)
          return effect = player.points.pow(0.05)
        },
        unlocked() {
          if (hasUpgrade("S",12) || inChallenge("GL",11)) return true
        },
        style() {
          return {
            "width": "150px",
            "height": "75px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#3a3337"
          }
        },
    },
        14: {
      fullDisplay() {
        let enter
        if (hasUpgrade("S",14)) enter = format(upgradeEffect("S",14) )
        else enter = "???"
          return `<h2>Solarizor</h2> <br>
          Requires:<br>Plasmate #17 <br>
          Multiply #25 <br><br>
          
          log15 of Solar Rays boosts themselves <br> 

          <br> Solarizors effect is ${enter}<br>
          `
      },
      cost: new Decimal(0),
      canAfford() {
          if (getBuyableAmount("S",11).gte(17) && getBuyableAmount("S",12).gte(25)) return true
          else return false
      },
      effect() {
        return player["S"].points.log(15).plus(1)
      },
      unlocked() {
        if (hasUpgrade("S",13) || inChallenge("GL",11)) return true
      },
      onPurchase() {
        player["S"].points = player["S"].points.mul(0).add(1)
      },
      style() {
        return {
          "width": "150px",
          "height": "75px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#3a3337"
        }
      },
  },
    },



    buyables: {
        11: {
            cost(x) {
              let scale = new Decimal(1.35)
              let base = new Decimal(5)
              let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
              if (hasUpgrade("GL",11)) Calculation = Calculation.pow(0.9).div(3)
              
              return Calculation;
            },
            unlocked() {
              if (player["S"].points.gte(1) || player["GL"].Solar_Shards.gte(1)) return true

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
              if (getBuyableAmount("GL", 11).gte(1)) effect = effect.mul(getBuyableAmount("GL", 11).gte(1))
              return effect;
            },
            style() {
              return {
                "width": "305px",
                "height": "155px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#ffffff"
              }
            },
           
             
          },

          12: {
            cost(x) {
              let scale = new Decimal(1.4)
              let base = new Decimal(500)
              let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
              if (hasUpgrade("GL",12)) Calculation = Calculation.pow(0.9).div(3)
              return Calculation;
            },
            display() {
              return `
            <h2>Multiply #${getBuyableAmount(this.layer, this.id)}</h2>
            <br>
          <h2>  x${format(buyableEffect("S",12))} to Solarity Gain</h2>
            <br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Solarity</h2> <br>

          <h3> [Requires Plasmate #15] </h3>
          `
            },
            canAfford() {
              if  (player.points.gte(this.cost()) && getBuyableAmount("S",11).gte(15)) return true
            },
            buy() {
              if (player.points.gte(this.cost)) player.points = player.points.minus(this.cost());
              addBuyables(this.layer, this.id, 1);
            },
            effect() {
              let effect = decimalOne
              effect = Decimal.pow(1.1,getBuyableAmount(this.layer, this.id))
              return effect;
            },
            unlocked() {
              if (hasUpgrade("S",12)) return true

            },
            style() {
              return {
                "width": "305px",
                "height": "155px",
                "border-radius": "10px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#ffffff"
              }
            },
             
          },
        
    },





    
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})