
let maxFormula = decimalOne
            
addLayer("S", {
   






    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,


        
    points: new Decimal(0),
    time: new Decimal(0),
    mostBuyables: new Decimal(0),
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

    update(diff){
      //random stuff
      player["S"].time=player["S"].time.add(diff)
      //more random stuff
    },

    doReset(resetLayer){
      if(tmp[resetLayer].name==tmp.S.name) player.S.whateverTime=new Decimal(0)
      if(tmp[resetLayer].row>this.row) layerDataReset("S", true)
    },

    buyableCount() {
      let count = Decimal.dZero;
      for (const id of [11, 12, 13, 14, 15, 16]) {
        count = count.plus(getBuyableAmount("S", id));
      }
      return count;
    },
    update(diff) {
      Decimal.plus(getClickableState("S",11),   )
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
                "infoboxes",
                
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
          if (hasUpgrade("R",12)) Calculation = Calculation.div(2)
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
          <h2> Current multiplier: <br> ${format(tmp[this.layer].buyables[this.id].effect)}x (50%) </h2>
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
            "width": "305px",
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
          if (hasUpgrade("R",12)) effect = effect.log(1.3)
           effect = effect//.pow(getClickableState("S",16))
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
          if (hasUpgrade("R",12)) Calculation = Calculation.div(2)
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
            "width": "305px",
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
          if (hasUpgrade("R",12)) effect = effect.log(1.3)
         
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
          if (hasUpgrade("R",12)) Calculation = Calculation.div(2)
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
            "width": "305px",
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
          if (hasUpgrade("R",12)) effect = effect.log(1.3)
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
          if (hasUpgrade("R",12)) Calculation = Calculation.div(2)
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
            "width": "305px",
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
         addBuyables(this.layer, this.id, new Decimal(1))
        },
        effect(x) {
          let effect = new Decimal(1)
          effect = effect.mul(getBuyableAmount(this.layer, this.id).mul(0.06)).add(1).mul(buyableEffect("S",15))
          if (hasUpgrade("R",12)) effect = effect.log(1.3)
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
          if (hasUpgrade("R",12)) Calculation = Calculation.div(2)
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
            "width": "305px",
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
          addBuyables(this.layer, this.id, new Decimal(1))
        },
        effect(x) {
          let effect = new Decimal(1)
          effect = effect.mul(getBuyableAmount(this.layer, this.id).mul(0.06)).add(1).mul(buyableEffect("S",16))
          if (hasUpgrade("R",12)) effect = effect.log(1.3)
          return effect;
        },
        unlocked() {
          return true
         }
      
      },
      16: {
        cost(x) {
          let PowerI = new Decimal(1.4)
          if (getBuyableAmount(this.layer,this.id).gte(100)) PowerI = new Decimal(2)
          if (getBuyableAmount(this.layer,this.id).gte(500)) PowerI = new Decimal(200)
          if (getBuyableAmount(this.layer,this.id).gte(1000)) PowerI = new Decimal(20000)
          let Calculation = new Decimal(15625).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
          if (hasUpgrade("R",12)) Calculation = Calculation.div(2)
          return Calculation;
        },
        display() {
          let scaling = "";
          //if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
          if (getBuyableAmount(this.layer, this.id).gte(200)) scaling = "(Superscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Scaling^2)"; 
          return ` 
          <h2>Shift Multiplier 6</h2>
            <br>
          <h2> Current multiplier: ${format(tmp[this.layer].buyables[this.id].effect)}x  (2%) </h2>
            <br>
          <h2> ${format(tmp[this.layer].buyables[this.id].cost)} Meters Of Waves</h2>
          <h2>${format(getBuyableAmount(this.layer, this.id))} bought. ${scaling}</h2>
   
       
      `
        },
        canAfford() {
          return player["S"].points.gte(this.cost())
        },
        style() {
          return {
            "width": "305px",
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
          addBuyables(this.layer, this.id, new Decimal(1))
        },
        effect(x) {
          let effect = new Decimal(1)
          effect = effect.mul(getBuyableAmount(this.layer, this.id).mul(0.02)).add(1)
          if (hasUpgrade("R",12)) effect = effect.log(1.3)
         
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
        effect = player["S"].points.log(2)
        effect = effect.floor()
        return effect
  
      },
      effectDisplay() { 
          
        if (hasUpgrade('S', 14)) return format(upgradeEffect(this.layer, this.id))+"x" 
        if (!hasUpgrade('S', 14)) return "???"
        if (upgradeEffect(this.layer, this.id).gte(15)) return "15x (Hardcapped)"
    
    }
  },






  15: {
    title: "ShftUpg5",
    description: `Keep most of the upgrades on Shifting`,
    cost: new Decimal(7500),
  },
  16: {
    title: "ShftUpg6",
    description: `multiply points by 100x`,





    style() {
      return {
        "width": "150px",
        "height": "85px",
        "border-radius": "20px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },

    cost: new Decimal(2e11),
  },
  17: {
    title: "ShftUpg7",
    description: `RepUpg3 is 40% stronger`,
    cost: new Decimal(7.15e14),



    style() {
      return {
        "width": "150px",
        "height": "85px",
        "border-radius": "20px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
  },
  18: {
    title: "TimeUpg1",
    description: `Time spent this shifting boosts points gain`,





    cost: new Decimal(2e18),
    style() {
      return {
        "width": "150px",
        "height": "85px",
        "border-radius": "20px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },


  },
  19: {
    title: "TimeUpg2",
    description: `Time spent this shift reset boosts MoW gain`,





    cost: new Decimal(6.6e23),
    style() {
      return {
        "width": "150px",
        "height": "85px",
        "border-radius": "20px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },

  },
  21: {
    title: "ShftUpgExt1",
    description: `add 3 Normal upgrades to Main`,
    cost: new Decimal(7.58e30),


    style() {
      return {
        "width": "200px",
        "height": "85px",
        "border-radius": "50px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },

  },




    },
  

  
    clickables: {
      11: {
        canClick() {
          if (tmp.S.buyableCount.clampMin(1).log(60).lt(getClickableState(this.layer, this.id))) return false;
          if (tmp.S.buyableCount.lt()) return false;
          return true;
        },
        unlocked() { return hasUpgrade("R", 14) },
        onClick() {
          let formula = tmp.S.buyableCount;
          for (const id in tmp.S.buyables) {
            if (id === this.id) continue;
            setBuyableAmount("S", id, Decimal.dZero);
          }
          player.S.mostBuyables = formula;
        },
        style() {
          return {
            "width": "355px",
            "height": "195px",
            "border-radius": "5px",
            "border": "0px",
            "margin": "80px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#42ff75"
          }
        },
display(){ 
  let formula = tmp.S.buyableCount;
 // value you have to the right
 return `<h1>Shifting Sacrifice</h1> <br>
        <br>
        <h3 style="color:#b4fc3f ; text-shadow: #66911f 2px 2px 20px;"> Reset all shifting multipliers to gain a boost to Shift multiplier 1 based on Multipliers bought</h3>
        <br>
        <h3> Requires: Total bought shift multipliers: ${format(formula)} / ${format(player["S"].mostBuyables)} </h3>
        <br>
        <h3> Currently: ^${format(tmp[this.layer].clickables[this.id].effect)} -> ^${format(formula.add(1).log(60))} </h3>
        `
      },

      //currencyInternalName: buyableEffect("S",11)



      },


    },
















    row: 1, // Row the layer is in on the tree (0 is the first row)
    
    branches: ["S","U"],
    layerShown(){
      if (hasUpgrade("S",11)) return true
      if (player.points.gte(20000)) return true
      if (player["S"].points.gte(1)) return true
      if (player["R"].points.gte(1)) return true
      if (hasUpgrade("R",11)) return true
      if (hasUpgrade("R",12)) return true
      if (hasUpgrade("R",13)) return true
      if (hasUpgrade("R",14)) return true

  
    },
    symbol() {
      return `
      <p> 
      <p class='cBreak' style='font-size:16px'>Shifting</p>
      </p>`
    },
  
  })

