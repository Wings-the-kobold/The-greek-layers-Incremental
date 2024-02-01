addLayer("S", {
    
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
    
    
    
    
    //e: setClickableState(this.layer, this.id, 2),
    points: new Decimal(0),
    time: new Decimal(0),
    mostBuyables: new Decimal(0),
    }},
    color: "#5D9B9B",
    requires: new Decimal(20000), // Can be a function that takes requirement increases into account
    resource: "Meters of Waves", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade("U",14)) mult = mult.times(1.2).pow(player.points.log(10)).ceil()
        if (hasUpgrade("R",43)) mult = mult.div(10)
  
  
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },

    
    passiveGeneration(diff){
      let mult = new Decimal(0)
  
  
  
    if (hasUpgrade("R",34)) mult = mult.add(0.33)
    return mult
       },

       automate() {
        if (hasUpgrade("R",35)) buyBuyable("S",11)
        if (hasUpgrade("R",35)) buyBuyable("S",12)
        if (hasUpgrade("R",35)) buyBuyable("S",13)
        if (hasUpgrade("R",35)) buyBuyable("S",14)
        if (hasUpgrade("R",35)) buyBuyable("S",15)
        if (hasUpgrade("R",35)) buyBuyable("S",16)
      },


    update(diff){
      //random stuff
      player["S"].time=player["S"].time.add(diff)
      let x = new Decimal(1)
      Decimal.plus(getClickableState("S",11), x.times(diff))//more random stuff



    },

    doReset(resetLayer){  
      
      if(tmp[resetLayer].name==tmp.S.name) player.S.time=new Decimal(1)
      if(tmp[resetLayer].row>this.row) {
        layerDataReset(this.layer)
        if (hasUpgrade("R",13)) player.S.upgrades.push("15")
        }
    },

    buyableCount() {
      let count = Decimal.dZero;
      for (const id of [11, 12, 13, 14, 15, 16]) {
        count = count.plus(getBuyableAmount("S", id));
      }
      return count;
    },
    
    infoboxes: {
 
      about: {
        title: "The Shifted Rift.",
        body() {
          return `<h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;">Welcome to the first prestige reset of the game.<h4> 
           As you can see, Your upgrades are starting to get really expensive. 
           However, While on your journey, You discover a powerful yet strange substance, it feels sticky and gooey.
           You are in question of this strange substance, but it seems to glow a light blue aura. 
           As you pick it up, the ground is in chaos, dismemberance, and discord as the ground is cracking out of line, Reality seems to be shifting on its own.
           It's effects leaves you in deep fear as it shakes desperatly and dramatically for attention. its dangers is the broken lair beneath.
           You decide... activate its use? and let it destroy everything you have? <br>
           [Resets base features like repUpgs and Upgs]
           `
        },
      },
    },
//

    
      tabFormat: {
        "Shifting": {      
              content: [
                "main-display",
                ["infobox","about"],
                
                "prestige-button",
                ["display-text",
      function() { 
        if(hasUpgrade("S",17)) return `<br> <h3> Due to ShftUpg7, your current time spent this shifting is boosting RepUpg1 by  ${format(upgradeEffect("S",17))}x </h3>`
        
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
            "upgrades",

          ],
          

        },
        "Shifting Multipliers": {
          content: [
         "buyables",
         "clickables",
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
          
          let repressdownEffect = new Decimal(1)
          if (hasUpgrade("R",12)) repressdownEffect = 1.1
          if (!hasUpgrade("R",12)) repressdownEffect = 1
          
          
          base = new Decimal(5)
          let cost = new Decimal(5)
          let scaleplus = new Decimal(100)
          let scaleplusplus = new Decimal(500)
          let scaleplusplusplus = new Decimal(750)
          // scale formulas
          v_ = base.mul(Decimal.pow(1.4, x))// prescaling, or base scaling

          if (getBuyableAmount(this.layer,this.id).lte(scaleplus)) cost = v_ 

          if (getBuyableAmount(this.layer,this.id).gt(scaleplus)) 
          cost = base.mul(Decimal.pow(Decimal.pow(20,repressdownEffect) , x))    .mul(scaleplus.pow_base(1.4/20))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplus)) 
          cost = base.mul(Decimal.pow(Decimal.pow(4000,repressdownEffect) , x))     .mul(scaleplusplus.pow_base(1.4/4000))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplusplus))  
          cost = base.mul(Decimal.pow(Decimal.pow(160000000 , repressdownEffect) , x)) .mul(scaleplusplusplus.pow_base(1.4/160000000)) 

          if (hasUpgrade("R",12)) cost = cost.div(14)
          return cost;
  
      /*
          0-99: cost = 5*1.4^amount
          100-499: cost = 5*20^amount * 5*1.4^100 / 5*20^100  
          500-749: cost = 5*4000^amount * 5*1.4^500 / 5*4000^500
          750+: cost = 5*160m^amount * 5*1.4^750 / 5*160m^750
              |                                   | (Condensing!)
              V                                   V
          sc : 5* 1.4^x
          sc+ : 5*1.4^100 / 5*20^100 ----------> (1.4/20)^100
          sc++ : * 5*1.4^500 / 5*4000^500 -----------> (1.4/4 000)^500
          sc+++ : 5*1.4^750 / 5*160m^750 -----------> (1.4/160 000 000)^750
              |                                   | (adding the base scales and its start)
              V                                   V
          5*1.4^amount * 1
          5*20^amount * (1.4/20)^scaleplus          
          5*4000^amount * (1.4/4 000)^scaleplusplus
          5*160000000^amount * (1.4/160 000 000)^scaleplusplusplus
              |                                   | (converting to TMT)
              V                                   V
          cost = base.mul(1.4).pow(x)
          cost = base.mul(20).pow(x)   .mul((1.4).div(20) ).pow(scaleplus))
          cost = base.mul(4000).pow(x)  .mul((1.4).div(4000)).pow(scaleplusplus))
          cost = base.mul(160000000).pow(x)  .mul((1.4).div(160000000)).pow(scaleplusplusplus))
              |                                   | (adding onto the scale check)
              V                                   V
          
          if (getBuyableAmount(this.layer,this.id).lt(scaleplus)) cost = v_
          if (getBuyableAmount(this.layer,this.id).gt(scaleplus)) cost = base.mul(20).pow(x)    .mul((1.4).div(20) ).pow(scaleplus))
          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplus)) cost = base.mul(4000).pow(x)     .mul((1.4).div(4000)).pow(scaleplusplus))
          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplusplus))  cost = base.mul(160000000).pow(x)  .mul((1.4).div(160000000)).pow(scaleplusplusplus))
              
    
    */    //polishing and final
        },
        display() {
          let scaling = "";
          if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
          if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = "(Superscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(750)) scaling = "(Scaling^2)"; 
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
            "height": "155px",
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
        
          if (getClickableState("S",11) && hasUpgrade("R",14)) effect = effect.pow(getClickableState("S",11)).clampMin(1)
          if (hasUpgrade("R",37)) effect = effect.mul(upgradeEffect("R",37))
          if (inChallenge("R",12)) effect = effect.pow(0.8)
          return effect;
        },
        unlocked() {
          if (inChallenge("R",14)) return false; else return true
  
        },
      
      },
      12: {
        cost(x) {
          let repressdownEffect = new Decimal(1)
          if (hasUpgrade("R",12)) repressdownEffect = 1.1
          if (!hasUpgrade("R",12)) repressdownEffect = 1
          
          
          base = new Decimal(25)
          let cost = decimalOne

          let scaleplus = new Decimal(100)
          let scaleplusplus = new Decimal(500)
          let scaleplusplusplus = new Decimal(750)
          // scale formulas
          v_ = base.mul(Decimal.pow(1.4, x))// prescaling, or base scaling

          if (getBuyableAmount(this.layer,this.id).lte(scaleplus)) cost = v_ 

          if (getBuyableAmount(this.layer,this.id).gt(scaleplus)) 
          cost = base.mul(Decimal.pow(Decimal.pow(20,repressdownEffect) , x))    .mul(scaleplus.pow_base(1.4/20))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplus)) 
          cost = base.mul(Decimal.pow(Decimal.pow(4000,repressdownEffect) , x))     .mul(scaleplusplus.pow_base(1.4/4000))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplusplus))  
          cost = base.mul(Decimal.pow(Decimal.pow(160000000 , repressdownEffect) , x)) .mul(scaleplusplusplus.pow_base(1.4/160000000)) 

          if (hasUpgrade("R",12)) cost = cost.div(14)
          return cost;
        },
        display() {
          let scaling = "";
          if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
          if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = "(Superscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(750)) scaling = "(Scaling^2)"; 
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
            "height": "145px",
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
          if (inChallenge("R",12)) effect = effect.pow(0.8)
         
          return effect;
        },
        unlocked() {
          if (inChallenge("R",14)) return false; else return true
  
        },
      
      },
      13: {
        cost(x) {
          let repressdownEffect = new Decimal(1)
          if (hasUpgrade("R",12)) repressdownEffect = 1.1
          if (!hasUpgrade("R",12)) repressdownEffect = 1
          
          
          base = new Decimal(125)
          let cost = decimalOne

          let scaleplus = new Decimal(100)
          let scaleplusplus = new Decimal(500)
          let scaleplusplusplus = new Decimal(750)
          // scale formulas
          v_ = base.mul(Decimal.pow(1.4, x))// prescaling, or base scaling

          if (getBuyableAmount(this.layer,this.id).lte(scaleplus)) cost = v_ 

          if (getBuyableAmount(this.layer,this.id).gt(scaleplus)) 
          cost = base.mul(Decimal.pow(Decimal.pow(20,repressdownEffect) , x))    .mul(scaleplus.pow_base(1.4/20))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplus)) 
          cost = base.mul(Decimal.pow(Decimal.pow(4000,repressdownEffect) , x))     .mul(scaleplusplus.pow_base(1.4/4000))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplusplus))  
          cost = base.mul(Decimal.pow(Decimal.pow(160000000 , repressdownEffect) , x)) .mul(scaleplusplusplus.pow_base(1.4/160000000)) 

          if (hasUpgrade("R",12)) cost = cost.div(14)
          return cost;
        },
        display() {
          let scaling = "";
          if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
          if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = "(Superscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(750)) scaling = "(Scaling^2)"; 
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
            "height": "145px",
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
          if (hasUpgrade("R",36)) effect = effect.mul(upgradeEffect("R",36))
          if (inChallenge("R",12)) effect = effect.pow(0.8)
          return effect;
        },
        unlocked() {
          if (inChallenge("R",14)) return false; else return true
  
        },
      
      },
      14: {
        cost(x) {
          let repressdownEffect = new Decimal(1)
          if (hasUpgrade("R",12)) repressdownEffect = 1.05
          if (!hasUpgrade("R",12)) repressdownEffect = 1
          
          
          base = new Decimal(625)
          let cost = decimalOne

          let scaleplus = new Decimal(100)
          let scaleplusplus = new Decimal(500)
          let scaleplusplusplus = new Decimal(750)
          // scale formulas
          v_ = base.mul(Decimal.pow(1.4, x))// prescaling, or base scaling

          if (getBuyableAmount(this.layer,this.id).lte(scaleplus)) cost = v_ 

          if (getBuyableAmount(this.layer,this.id).gt(scaleplus)) 
          cost = base.mul(Decimal.pow(Decimal.pow(20,repressdownEffect) , x))    .mul(scaleplus.pow_base(1.4/20))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplus)) 
          cost = base.mul(Decimal.pow(Decimal.pow(4000,repressdownEffect) , x))     .mul(scaleplusplus.pow_base(1.4/4000))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplusplus))  
          cost = base.mul(Decimal.pow(Decimal.pow(160000000 , repressdownEffect) , x)) .mul(scaleplusplusplus.pow_base(1.4/160000000)) 

          if (hasUpgrade("R",12)) cost = cost.div(14)
          return cost;
        },
        display() {
          let scaling = "";
          if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
          if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = "(Superscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(750)) scaling = "(Scaling^2)"; 
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
            "height": "145px",
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
        effect() {
          //this is in buyable 4, or id 14
          let effect = new Decimal(1)
         
          effect = effect.mul(getBuyableAmount(this.layer, this.id).mul(0.06)).add(1).mul(buyableEffect("S",15))
          if (hasUpgrade("R",25)) effect = effect.mul(upgradeEffect("R",25))
          if (inChallenge("R",12)) effect = effect.pow(0.8)
          return effect
        },
        unlocked() {
          if (inChallenge("R",14)) return false; else return true
  
        },
      
      },
      15: {
        cost(x) {
          
          
          base = new Decimal(3125)
          let cost = decimalOne

          let scaleplus = new Decimal(100)
          let scaleplusplus = new Decimal(500)
          let scaleplusplusplus = new Decimal(750)
          // scale formulas
          v_ = base.mul(Decimal.pow(1.4, x))// prescaling, or base scaling

          if (getBuyableAmount(this.layer,this.id).lte(scaleplus)) cost = v_ 

          if (getBuyableAmount(this.layer,this.id).gt(scaleplus)) 
          cost = base.mul(Decimal.pow(20 , x))    .mul(scaleplus.pow_base(1.4/20))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplus)) 
          cost = base.mul(Decimal.pow(4000 , x))     .mul(scaleplusplus.pow_base(1.4/4000))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplusplus))  
          cost = base.mul(Decimal.pow(160000000 , x)) .mul(scaleplusplusplus.pow_base(1.4/160000000)) 

          if (hasUpgrade("R",12)) cost = cost.div(14)
          return cost;
        },
        display() {
          let scaling = "";
          if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
          if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = "(Superscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(750)) scaling = "(Scaling^2)"; 
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
            "height": "145px",
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
          if (hasUpgrade("R",36)) effect = effect.mul(upgradeEffect("R",36))
          if (inChallenge("R",12)) effect = effect.pow(0.8)
          return effect;
        },
        unlocked() {
          if (inChallenge("R",14)) return false; else return true
  
        },
      
      },
      16: {
        cost(x) {
          base = new Decimal(3125)
          let cost = decimalOne

          let scaleplus = new Decimal(100)
          let scaleplusplus = new Decimal(500)
          let scaleplusplusplus = new Decimal(750)
          // scale formulas
          v_ = base.mul(Decimal.pow(1.4, x))// prescaling, or base scaling

          if (getBuyableAmount(this.layer,this.id).lte(scaleplus)) cost = v_ 

          if (getBuyableAmount(this.layer,this.id).gt(scaleplus)) 
          cost = base.mul(Decimal.pow(20 , x))    .mul(scaleplus.pow_base(1.4/20))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplus)) 
          cost = base.mul(Decimal.pow(4000 , x))     .mul(scaleplusplus.pow_base(1.4/4000))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplusplus))  
          cost = base.mul(Decimal.pow(160000000 , x)) .mul(scaleplusplusplus.pow_base(1.4/160000000)) 

          if (hasUpgrade("R",12)) cost = cost.div(14)
          return cost;
          
        },
        display() {
          let scaling = "";
          if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
          if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = "(Superscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
          if (getBuyableAmount(this.layer, this.id).gte(750)) scaling = "(Scaling^2)"; 
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
          if (hasUpgrade("R",37)) effect = effect.mul(upgradeEffect("R",37))
          if (inChallenge("R",12)) effect = effect.pow(0.8)
          return effect;
        },
        unlocked() {
          if (inChallenge("R",14)) return false; else return true
  
        },
      
      },
    },
  
  
    upgrades:  
    
    { 
      11: {
        /*hardcap() {
        let roofchain = new Decimal(15)
        let r2Eff = new Decimal(0)
        if (hasMilestone("C", 2)) r2Eff = Decimal.mul(3, player["C"].points.sub(1))   
        roofchain = roofchain.plus(r2Eff)
      
        if (hasUpgrade("R",23)) roofchain = roofchain.times(2)
         return roofchain
        },*/

        title: "ShftUpg1",
        description: `Points boost themselves.`,
        cost: new Decimal(3),
        effect() {
          let effect = decimalOne  

          /*     all the hardcap stuff      */
          let roofchain = new Decimal(15)
        let r2Eff = new Decimal(0)
        //Conversion rank 2, Conversion ranks adds onto shftupg1    
    
        if (hasMilestone("C", 2)) r2Eff = Decimal.mul(3, player["C"].points.sub(1))   
        roofchain = roofchain.plus(r2Eff)
      
        if (hasUpgrade("R",23)) roofchain = roofchain.times(2)

          /*     all the hardcap stuff      */




          effect = player.points.add(1).log(10)
         /* hardcap  */ effect = effect.ceil().min(roofchain)
         
          if (hasUpgrade("R",22)) effect = effect.pow(1.35)
          if (hasUpgrade("R",23)) effect = effect.div(1.5)

          return effect//.minus(1)
  
  
        },
        effectDisplay() { 
          let roofchain = new Decimal(15)
          let r2Eff = new Decimal(0)
          //Conversion rank 2, Conversion ranks adds onto shftupg1    
      
          if (hasMilestone("C", 2)) r2Eff = Decimal.mul(3, player["C"].points.sub(1))   
          roofchain = roofchain.plus(r2Eff)
        
          if (hasUpgrade("R",23)) roofchain = roofchain.times(2)



          //if (hasUpgrade('S', 11) && !upgradeEffect(this.layer, this.id).gte(this.hardcap)) return format(upgradeEffect(this.layer, this.id))+"x" 
          if (!hasUpgrade('S', 11)) return "???"
          return (upgradeEffect(this.layer, this.id).gte(roofchain)) ? `${format(upgradeEffect(this.layer, this.id))}x (roofchained)` : `${format(upgradeEffect(this.layer, this.id))}x `
         
      },
      unlocked() {
        if (inChallenge("R",14)) return false; else return true

      },
  
  
  
  
  
      },
      12: {
          title: "ShftUpg2",
          description: `repUpg3 is 40% stronger`,
          cost: new Decimal(40),
          unlocked() {
            if (inChallenge("R",14)) return false; else return true
    
          },
      },
      13: {
        title: "ShftUpg3",
        description() {
         return (hasUpgrade("R",22)) ? `Points gain base becomes ^1.15 -> ^1.45` : `Points gain base becomes ^1 -> ^1.15`
          


        },
        cost: new Decimal(200),
        unlocked() {
          if (inChallenge("R",14)) return false; else return true
  
        },
      },
      14: {
      title: "ShftUpg4",
      description: `Meters Of Waves Boosts Upg 2`,
      cost: new Decimal(825),
      effect() {
        let effect = decimalOne
        effect = player["S"].points.log(2).max(1)
        effect = effect.floor()
        return effect
  
      },
      effectDisplay() { 
          
        if (hasUpgrade('S', 14)) return format(upgradeEffect(this.layer, this.id))+"x" 
        if (!hasUpgrade('S', 14)) return "???"
        if (upgradeEffect(this.layer, this.id).gte(15)) return `15x (Hardcapped)`
    
    },
    unlocked() {
      if (inChallenge("R",14)) return false; else return true

    },
      },
      15: {
    title: "ShftUpg5",
    description: `Keep Upg1 on Shifting resets`,
    cost: new Decimal(7500),
    unlocked() {
      if (inChallenge("R",14)) return false; else return true

    },
      },
      16: {
    title: "ShftUpg6",
    description: `multiply points by 20x`,
    unlocked() {
        if (inChallenge("R",14)) return false; else return true

      },




    

    cost: new Decimal(1e9),
      },
      17: {
    title: `<h4 style="color: #Fe02f3; font-family: Nova Mono">TimeUpg1<h4>`,
    description: `Time spent this shifting boosts Upg1`,
    cost: new Decimal(1e14),

    effect() {
      let effect = new Decimal(1)
      effect =player["S"].time.add(1).log(10).pow(2).add(1)
      if (hasChallenge("R",14)) effect = effect.mul(challengeEffect("R",14))
      return effect

    },
   

    },

 },

  
    clickables: {
      11: {
        canClick() {
          if (tmp.S.buyableCount.clampMin(1).log(100).lt(getClickableState(this.layer, this.id))) return false
          if (tmp.S.buyableCount.add(1).log(100).gte(1)) return true
          
        },
        unlocked() {return hasUpgrade("R", 14)},
        onClick() {
          let formula = tmp.S.buyableCount;
          if (buyableEffect("S",11).gt(1)) {
          for (const id in tmp.S.buyables) {
            if (id === this.id) continue;
            setBuyableAmount("S", id, Decimal.dZero);
          }
          player.S.mostBuyables = formula;
          setClickableState(this.layer, this.id, tmp.S.buyableCount.log(100).clampMin(1))
          setBuyableAmount("S",11 , new Decimal(0))
        
        } else alert("Hey! stop it! you cant get this upgrade!~")
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
        <h3> Currently: ^${format(getClickableState(this.layer, this.id))} -> ^${format(formula.add(1).log(100))} </h3>
        `
      },

      //currencyInternalName: buyableEffect("S",11)



      unlocked() {
        if (inChallenge("R",14)) return false
        return hasUpgrade("R",14)

      },  
    
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
      if (inChallenge("R",11)) return true
      if (inChallenge("R",12)) return true
      if (inChallenge("R",13)) return true
      if (inChallenge("R",14)) return true
      if (inChallenge("R",15)) return true
      if (inChallenge("R",16)) return true

  
    },
    symbol() {
      return `
      <p> 
      <p class='cBreak' style='font-size:16px'>Shifting</p>
      </p>
      <p class='cBreak' style='font-size:13px'>[Node #01]</p>
    </p>`
      
    },
  
  })

