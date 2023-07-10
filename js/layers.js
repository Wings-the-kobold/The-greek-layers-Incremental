addLayer("U", {
    name: "Upgrades", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: true,
      
     
  }},
    color: "#B8B799",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    
    tabFormat: [
      "main-display",
      ["display-text",
          function() {`you have ${format(player.points)} points` }, //you add this for every currency, it shows the effect 
         
        ],
      "buyables",
      "upgrades",
    ],
    












    upgrades: {
      11: {
        title: `<h2>Upg1</h2>`,
        cost: new Decimal(10),
        description: `<h3>Generate 1 point per second.`,
       //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

        style() {
          return {
            "width": "150px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },
        currencyInternalName: "points",
        //resetNothing() {return hasUpgrade('S', 15)}
      },
      12: {
        title: `<h2>Upg2</h2>`,
        cost: new Decimal(5000),
        description: `<h3>Point gain is increased (2x)</h3>`,
        


        style() {
          return {
            "width": "150px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }

        },

       unlocked() {
         if (hasUpgrade("U",11) && player.points.gte(new Decimal(this.cost)) || hasUpgrade("U",12) ) return true
         if (hasUpgrade("S",11)) return true
        },
        currencyInternalName: "points",
        resetNothing() {return hasUpgrade('S', 15)},
      },
      13: { 
        title: `<h2>Upg3</h2>`,
        cost: new Decimal (10000),
        description: `<h3>RepUpg2 effect is increased by 20% </h3>`,

        style() {
          return {
            "width": "150px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },

        unlocked() {
         if (hasUpgrade("U",12) && player.points.gte(new Decimal(this.cost)) || hasUpgrade("U",13)) return true
         if (hasUpgrade("S",11)) return true
         
        },
        currencyInternalName: "points",
      },
      14: { 
        title: `<h2>Upg4</h2>`,
        cost: new Decimal (20000),
        description: `<h3>gain 20% more Meters of Waves per OoM of Points </h3>`,
        effect() {
            let OoMs = player.points.add(1).log(10)
            let effect = new Decimal (1)

            effect = effect.mul(OoMs)

        },


        

        style() {
          return {
            "width": "150px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
          
        },
        resetNothing() {return hasUpgrade('S', 15)},
        unlocked() {
         if (hasUpgrade("S",11) || player["S"].points.gte(1)) return true
      
         
        },
        currencyInternalName: "points",
      },
      15: { 
        title: `<h2>Upg5</h2>`,
        cost: new Decimal (1.85e7),
        description: `<h3>Meters of waves boosts upg2 </h3>`,
        effect() {
            let OoMs = player["S"].points.add(1).log(10)
            let effect = new Decimal (1)

            effect = effect.mul(OoMs)

        },


        resetNothing() {return hasUpgrade('S', 15)},

        style() {
          return {
            "width": "150px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },

        unlocked() {
        if (hasUpgrade("S",11) || player["S"].points.gte(1)) return true

         
        },
        currencyInternalName: "points",
      },
      14: {
        title: `<h2>Upg4</h2>`,
        cost: new Decimal (20000),
        description: `<h3>You gain 15% more Meter of Waves Per OoMs of Points in current Shift run</h3>`,

        style() {
          return {
            "width": "150px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },
        effect() {
          let effect = decimalOne
          


          let OoMs = player.points.log(10).floor()
          effect = new Decimal (1.15).pow(OoMs)

          effect = softcap(effect, new Decimal('1e20'), new Decimal(0.7))
          effect = softcap(effect, new Decimal('1e50'), new Decimal(0.5))
          effect = softcap(effect, new Decimal('1e150'), new Decimal(0.3))






          return effect
  
  
        },
        effectDisplay() { 
          
          if (hasUpgrade('U', 14)) return format(upgradeEffect(this.layer, this.id))+"x" 
          if (!hasUpgrade('U', 14)) return "???"
            let softcap = "";
            //if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
            if (effect.gte(200)) softcap = "(Softcapped)";
            if (effect.gte(500)) softcap = "(Softcapped+)";
            if (effect.gte(500)) softcap = "(Softcapped++)"; 
            return ``
      
      },




        unlocked() {
         if (hasUpgrade('S',11)) return true

         
        },
        currencyInternalName: "points",


      },
    },

    
    buyables: {
        11: {
          cost(x) {
            let PowerI = new Decimal(1.55)
        
            let Calculation = new Decimal(15).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
            return Calculation;
          },
          display() {
            return `
          <h2>Rep Upgrade 1</h2>
          <br>
        <h2>  +${format(tmp[this.layer].buyables[this.id].effect)} Effect Boost to Upg1</h2>
          <br>
        <h2>${format(tmp[this.layer].buyables[this.id].cost)} Points</h2>
        <h2>${format(getBuyableAmount(this.layer, this.id))} bought</h2>`
          },
          canAfford() {
            return player.points.gte(this.cost())
          },
          style() {
            return {
              "width": "250px",
              "height": "135px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let effect = decimalZero
            effect = getBuyableAmount(this.layer, this.id).mul(buyableEffect("U",13))
            
            return effect;
          },
          unlocked() {
            if (hasUpgrade("U",11) && player.points.gte(10) || getBuyableAmount(this.layer,this.id).gte(1)) return true
            if (hasUpgrade("S",11)) return true
           }
        
        },
        12: {
          cost(x) {
            let PowerI = new Decimal(1.25)
            if (getBuyableAmount(this.layer,this.id).gte(100)) PowerI = new Decimal(1.5)
            if (getBuyableAmount(this.layer,this.id).gte(500)) PowerI = new Decimal(3)
            if (getBuyableAmount(this.layer,this.id).gte(1000)) PowerI = new Decimal(20)
            let Calculation = new Decimal(200).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
            return Calculation;
          },
          display() {
            let scaling = "";
            //if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
            if (getBuyableAmount(this.layer, this.id).gte(200)) scaling = "(Superscaled)";
            if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
            if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Scaling^2)"; 
            return ` 
            <h2>Rep Upgrade 2</h2>
              <br>
            <h2>  x${format(tmp[this.layer].buyables[this.id].effect)} points gain </h2>
              <br>
            <h2> ${format(tmp[this.layer].buyables[this.id].cost)} Points</h2>
            <h2>${format(getBuyableAmount(this.layer, this.id))} bought ${scaling}</h2>
     
         
        `
          },
          canAfford() {
            return player.points.gte(this.cost())
          },
          style() {
            return {
              "width": "250px",
              "height": "135px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let effect = new Decimal(1.1)
            effect = effect.pow(getBuyableAmount(this.layer, this.id))
            if (hasUpgrade("U",13)) effect = effect.mul(1.2)
            return effect;
          },
          unlocked() {
            if (hasUpgrade("U",11) && player.points.gte(new Decimal(100)) || getBuyableAmount(this.layer, this.id).gte(1)) return true
            if (hasUpgrade("S",11)) return true
           }
        
        },
        13: {
          cost(x) {
            let PowerI = new Decimal(1.8)
        
            let Calculation = new Decimal(2500).mul(Decimal.pow(PowerI, x.pow(1.05))).ceil()
            return Calculation;
          },
          display() {
            return `
          <h2>Rep Upgrade 3</h2>
          <br>
        <h2>  x${format(tmp[this.layer].buyables[this.id].effect)} multiplier to repUpg1 </h2>
          <br>
        <h2>${format(tmp[this.layer].buyables[this.id].cost)} Points</h2>
        <h2>${format(getBuyableAmount(this.layer, this.id))} bought</h2>`
          },
          canAfford() {
            return player.points.gte(this.cost())
          },
          style() {
            return {
              "width": "250px",
              "height": "135px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let effect = decimalZero
            if (!hasUpgrade("S", 12 )) effect = getBuyableAmount(this.layer, this.id).div(10).add(1)
            if (hasUpgrade("S", 12 )) effect = getBuyableAmount(this.layer, this.id).div(5).add(1)
            return effect;
          },
          unlocked() {
            if (hasUpgrade("U",11) && player.points.gte(10) || getBuyableAmount(this.layer,this.id).gte(1)) return true
            if (hasUpgrade("S",11)) return true
           }
        
        },
    },








    row: 0, // Row the layer is in on the tree (0 is the first row)
    
    layerShown(){return true}
})

addLayer("S", {
   
  symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  }},
  color: "#5D9B9B ",
  requires: new Decimal(20000), // Can be a function that takes requirement increases into account
  resource: "Meters of Waves", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {return player.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      if (hasUpgrade("U",14)) mult = mult.times(1.2).pow(player.points.log(10)).ceil()



      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
  },
  infoboxes: {

    about: {
      title: "Shifting",
      body() {
        return `<h3>Welcome to the first prestige reset of this game. 
        As you can see, Your upgrades are starting to get really expensive. 
        But this button can help with the cost of shifting your upgrades and points.
         </h3>`
      },
    

    },
  },
    tabFormat: {
      "Shifting": {      
            content: [
              "main-display",
            
              
              "prestige-button",
              "blank",
              "blank",
              "blank",
              "blank",
              "blank",
              "blank",
              "blank",
              "blank",
              "upgrades",
          ],
      },

      "Shifting Multipliers": {
        content: [
       "buyables",
       ],  

    },  
    },
  
  resetDescription: `
  <h2>Shift the multipliers!</h2><br><br>
  `,


  componentStyles: {
    "prestige-button"() { return {
      
      'height':'150px','width':'200px', "border-radius": "10px"
    
    
        } 
      }
    },

  buyables: {

    11: {
      cost(x) {
        let PowerI = new Decimal(1.4)
        if (getBuyableAmount(this.layer,this.id).gte(100)) PowerI = new Decimal(2)
        if (getBuyableAmount(this.layer,this.id).gte(500)) PowerI = new Decimal(200)
        if (getBuyableAmount(this.layer,this.id).gte(1000)) PowerI = new Decimal(20000)
        let Calculation = new Decimal(5).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
        return Calculation;
      },
      display() {
        let scaling = "";
        //if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
        if (getBuyableAmount(this.layer, this.id).gte(200)) scaling = "(Superscaled)";
        if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
        if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Scaling^2)"; 
        return ` 
        <h2>Shift Multiplier 1</h2>
          <br>
        <h2> Current multiplier: ${format(tmp[this.layer].buyables[this.id].effect)}x (50%) </h2>
          <br>
        <h2> ${format(tmp[this.layer].buyables[this.id].cost)} Meters Of Waves</h2>
        <h2>${format(getBuyableAmount(this.layer, this.id))} bought ${scaling}</h2>
 
     
    `
      },
      canAfford() {
        return player["S"].points.gte(this.cost())
      },
      style() {
        return {
          "width": "250px",
          "height": "135px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      buy() {
        player["S"].points = player["S"].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let effect = new Decimal(1)
        effect = effect.mul(getBuyableAmount(this.layer, this.id).mul(0.5)).add(1).mul(buyableEffect("S",12))
       
        return effect;
      },
      unlocked() {
        return true
       }
    
    },
    12: {
      cost(x) {
        let PowerI = new Decimal(1.4)
        if (getBuyableAmount(this.layer,this.id).gte(100)) PowerI = new Decimal(2)
        if (getBuyableAmount(this.layer,this.id).gte(500)) PowerI = new Decimal(200)
        if (getBuyableAmount(this.layer,this.id).gte(1000)) PowerI = new Decimal(20000)
        let Calculation = new Decimal(25).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
        return Calculation;
      },
      display() {
        let scaling = "";
        //if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
        if (getBuyableAmount(this.layer, this.id).gte(200)) scaling = "(Superscaled)";
        if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
        if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Scaling^2)"; 
        return ` 
        <h2>Shift Multiplier 2</h2>
          <br>
        <h2> Current multiplier: ${format(tmp[this.layer].buyables[this.id].effect)}x  (25%) </h2>
          <br>
        <h2> ${format(tmp[this.layer].buyables[this.id].cost)} Meters Of Waves</h2>
        <h2>${format(getBuyableAmount(this.layer, this.id))} bought ${scaling}</h2>
 
     
    `
      },
      canAfford() {
        return player["S"].points.gte(this.cost())
      },
      style() {
        return {
          "width": "250px",
          "height": "135px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      buy() {
        player["S"].points = player["S"].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let effect = new Decimal(1)
        effect = effect.mul(getBuyableAmount(this.layer, this.id).mul(0.25)).add(1).mul(buyableEffect("S",13))
        
       
        return effect;
      },
      unlocked() {
        return true
       }
    
    },
    13: {
      cost(x) {
        let PowerI = new Decimal(1.4)
        if (getBuyableAmount(this.layer,this.id).gte(100)) PowerI = new Decimal(2)
        if (getBuyableAmount(this.layer,this.id).gte(500)) PowerI = new Decimal(200)
        if (getBuyableAmount(this.layer,this.id).gte(1000)) PowerI = new Decimal(20000)
        let Calculation = new Decimal(125).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
        return Calculation;
      },
      display() {
        let scaling = "";
        //if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
        if (getBuyableAmount(this.layer, this.id).gte(200)) scaling = "(Superscaled)";
        if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
        if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Scaling^2)"; 
        return ` 
        <h2>Shift Multiplier 3</h2>
          <br>
        <h2> Current multiplier: ${format(tmp[this.layer].buyables[this.id].effect)}x  (12%) </h2>
          <br>
        <h2> ${format(tmp[this.layer].buyables[this.id].cost)} Meters Of Waves</h2>
        <h2>${format(getBuyableAmount(this.layer, this.id))} bought ${scaling}</h2>
 
     
    `
      },
      canAfford() {
        return player["S"].points.gte(this.cost())
      },
      style() {
        return {
          "width": "250px",
          "height": "135px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      buy() {
        player["S"].points = player["S"].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let effect = new Decimal(1)
        effect = effect.mul(getBuyableAmount(this.layer, this.id).mul(0.12)).add(1).mul(buyableEffect("S",14))
       
        return effect;
      },
      unlocked() {
        return true
       }
    
    },
    14: {
      cost(x) {
        let PowerI = new Decimal(1.4)
        if (getBuyableAmount(this.layer,this.id).gte(100)) PowerI = new Decimal(2)
        if (getBuyableAmount(this.layer,this.id).gte(500)) PowerI = new Decimal(200)
        if (getBuyableAmount(this.layer,this.id).gte(1000)) PowerI = new Decimal(20000)
        let Calculation = new Decimal(725).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
        return Calculation;
      },
      display() {
        let scaling = "";
        //if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
        if (getBuyableAmount(this.layer, this.id).gte(200)) scaling = "(Superscaled)";
        if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
        if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Scaling^2)"; 
        return ` 
        <h2>Shift Multiplier 4</h2>
          <br>
        <h2> Current multiplier: ${format(tmp[this.layer].buyables[this.id].effect)}x  (6%) </h2>
          <br>
        <h2> ${format(tmp[this.layer].buyables[this.id].cost)} Meters Of Waves</h2>
        <h2>${format(getBuyableAmount(this.layer, this.id))} bought ${scaling}</h2>
 
     
    `
      },
      canAfford() {
        return player["S"].points.gte(this.cost())
      },
      style() {
        return {
          "width": "250px",
          "height": "135px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      buy() {
        player["S"].points = player["S"].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let effect = new Decimal(1)
        effect = effect.mul(getBuyableAmount(this.layer, this.id).mul(0.06)).add(1).mul(buyableEffect("S",15))
       
        return effect;
      },
      unlocked() {
        return true
       }
    
    },
    15: {
      cost(x) {
        let PowerI = new Decimal(1.4)
        if (getBuyableAmount(this.layer,this.id).gte(100)) PowerI = new Decimal(2)
        if (getBuyableAmount(this.layer,this.id).gte(500)) PowerI = new Decimal(200)
        if (getBuyableAmount(this.layer,this.id).gte(1000)) PowerI = new Decimal(20000)
        let Calculation = new Decimal(3625).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
        return Calculation;
      },
      display() {
        let scaling = "";
        //if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
        if (getBuyableAmount(this.layer, this.id).gte(200)) scaling = "(Superscaled)";
        if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
        if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Scaling^2)"; 
        return ` 
        <h2>Shift Multiplier 5</h2>
          <br>
        <h2> Current multiplier: ${format(tmp[this.layer].buyables[this.id].effect)}x  (3%) </h2>
          <br>
        <h2> ${format(tmp[this.layer].buyables[this.id].cost)} Meters Of Waves</h2>
        <h2>${format(getBuyableAmount(this.layer, this.id))} bought ${scaling}</h2>
 
     
    `
      },
      canAfford() {
        return player["S"].points.gte(this.cost())
      },
      style() {
        return {
          "width": "250px",
          "height": "135px",
          "border-radius": "10px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      buy() {
        player["S"].points = player["S"].points.sub(this.cost())
        setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
      },
      effect(x) {
        let effect = new Decimal(1)
        effect = effect.mul(getBuyableAmount(this.layer, this.id).mul(0.06)).add(1)
       
        return effect;
      },
      unlocked() {
        return true
       }
    
    },



    },


  upgrades: {

    11: {
      title: "ShftUpg1",
      description: `Points boost themselves.`,
      cost: new Decimal(3),
      effect() {
        let effect = decimalOne
        effect = player.points.add(1).log(10).min(15)
        effect = effect.add(0.1)
        effect = effect.ceil()
        return effect


      },
      effectDisplay() { 
        
        if (hasUpgrade('S', 11)) return format(upgradeEffect(this.layer, this.id))+"x" 
        if (!hasUpgrade('S', 11)) return "???"
        if (upgradeEffect(this.layer, this.id).gte(15)) return "15x (Hardcapped)"
    
    }
    





    },
      12: {
        title: "ShftUpg2",
        description: `repUpg3 is 10% stronger`,
        cost: new Decimal(40),
    },
    13: {
      title: "ShftUpg3",
      description: `Points gain base becomes ^1 -> ^1.15`,
      cost: new Decimal(200),
  },
  14: {
    title: "ShftUpg4",
    description: `Meters Of Waves Boost points`,
    cost: new Decimal(825),
    effect() {
      let effect = decimalOne
      effect = player["S"].points.pow(0.5)
      return effect

    },
},
15: {
  title: "ShftUpg5",
  description: `Keep most of the upgrades on Shifting`,
  cost: new Decimal(7500),
},
  },

  row: 1, // Row the layer is in on the tree (0 is the first row)
  
  branches: ["S","U"],
  layerShown(){return true}
})


