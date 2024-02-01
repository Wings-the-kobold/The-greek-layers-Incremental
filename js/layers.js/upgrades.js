addLayer("U", {
    name: "Upgrades", // This is optional, only used in a few places, If absent it just uses the layer id.
    
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: true,
      resetTime: true,
     
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
    
respec() {

},

doReset(resettingLayer) {
  
  if(tmp[resettingLayer].row>this.row) {
   layerDataReset(this.layer)
   if (hasUpgrade("S",15)) player.U.upgrades.push("11")
   
   }
   
//if (inChallenge("R",11)) keep.pop("upgrades"); //ignore this
  
},
 tooltip: "View Upgrades",



automate() {
  if (hasUpgrade("R",24)) buyBuyable("U",11)
  if (hasUpgrade("R",24)) buyBuyable("U",12)
  if (hasUpgrade("R",24)) buyBuyable("U",13)

},



    upgrades: {
      11: {
        title: `<h2>Upg1</h2>`,
        cost: new Decimal(10),
        description() {return `<h3>Start Generating ${format(upgradeEffect(this.layer,this.id))} point per second.`},
       //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,
        
        style() {
          return {
            "width": "130px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },
        currencyInternalName: "points",
        resetNothing() {return hasUpgrade("S", 15)},
        effect() {
          let final = new Decimal(1) //if (hasUpgrade("R",43)) effect=effect.pow(1.5)
          final = final.plus(buyableEffect("U",11))
          if (hasUpgrade("R",11) && tmp.R.effect.gt(1)) final = final.mul(tmp.R.effect)
          
          if (inChallenge("R",12)) final = final.pow(0.8)
          if (hasMilestone("C", 4)) final = final.pow(1.25)





         // if (hasUpgrade("U",15)) final = final.add(upgradeEffect("U",15))



          return final
        },
      },
      12: {
        title: `<h2>Upg2</h2>`,
        cost: new Decimal(5000),
        description(){ 
          let chain = "";



          let softchain = new Decimal(50)
          if (!inChallenge("R",13) && hasChallenge("R",13)) softchain = softchain.times(challengeEffect("R",13))
    
          let mediumchain = new Decimal(1e10)
          
          
          let hardchain = new Decimal(1e30)


          if (upgradeEffect("U",12).gte(softchain)) chain = "(Softchained)";
          if (upgradeEffect("U",12).gte(mediumchain)) chain = "(Mediumchained)";
          if (upgradeEffect("U",12).gte(hardchain)) chain = "(Hardchained)"; 
          if (inChallenge("R",13) && upgradeEffect("U",12).gte(softchain)) {chain = "Superchained (due to chain+)"} else {chain};
          return  `<h3>Point gain is increased by ${format(upgradeEffect(this.layer,this.id))}x ${chain}</h3>`
          
          //if (inChallenge("R",12)&&) 
      
      },
        effect() {
          let final = new Decimal(2)
          let softchain = new Decimal(50)
          let mediumchain = new Decimal(1e10)
          let hardchain = new Decimal(1e30)

          if (hasUpgrade("S",14)) final = final.times(upgradeEffect("S",14))
          
          if (!inChallenge("R",13)&& hasChallenge("R",13)) softchain = softchain.times(challengeEffect("R",13))
          if (inChallenge("R",13)) final = softchain.div(1.5)
            
          if (hasUpgrade("R",42)) final = final.mul(6)
          if (hasChallenge("R",12)) final = final.times(challengeEffect("R",12))
          //if (hasUpgrade("U",15)) final = final.times(upgradeEffect("U",15))
         
            final = softcap(final, softchain, new Decimal(0.8))
            final = softcap(final, mediumchain, new Decimal(0.6))
            final = softcap(final, hardchain, new Decimal(0.45)) 
          if (inChallenge("R",12)) final = final.pow(0.8)
          return final
        },

        style() {
          return {
            "width": "130px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }

        },
        
       unlocked() {
         if (inChallenge("R",11)) return false 
         if (hasUpgrade("U",11) && player.points.gte(new Decimal(this.cost)) ) return true
         if (hasUpgrade("S",11)) return true
         if (getBuyableAmount(this.layer,this.id).gte(1)) return true   
         if (hasUpgrade("R",11)) return true
    if (hasUpgrade("R",12)) return true
    if (hasUpgrade("R",13)) return true
    if (hasUpgrade("R",14)) return true
    if (player.points.gte("5.15e19")) return true
    if (player["R"].points.gte(1)) return true


        },
        currencyInternalName: "points",
        
      },
      13: { 
        title: `<h2>Upg3</h2>`,
        cost: new Decimal (10000),
        description() {return `<h3>RepUpg2 effect is increased by ${format(upgradeEffect("U",13))}x </h3>` } ,
        //hasMilestone(layer, id)\
        effect() {
        let effect = new Decimal(1) //the starting base of the thing 
        let rank1MilestoneEff = new Decimal(1)
        if (hasMilestone("C", 1)){ 
          
        (player["C"].points, 2)
        rank1MilestoneEff = Decimal.pow(2, player["C"].points)
      
      }
        if (hasUpgrade("U",13)) effect = effect.mul(1.2)

         if (hasMilestone("C", 1)) effect = effect.mul(rank1MilestoneEff)

        return effect
        },
        style() {
          return {
            "width": "130px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },

        unlocked() {
          if (inChallenge("R",11) || inChallenge("R",14)) return false
         if (hasUpgrade("U",12) && player.points.gte(new Decimal(this.cost)) || hasUpgrade("U",13)) return true
         if (hasUpgrade("S",11)) return true
         if (hasUpgrade("R",11)) return true
         if (hasUpgrade("R",12)) return true
         if (hasUpgrade("R",13)) return true
         if (hasUpgrade("R",14)) return true
        
         if (player["R"].points.gte(1)) return true
     
        },
        currencyInternalName: "points",
      },
      14: { 
        title: `<h2>Upg4</h2>`,
        cost: new Decimal (20000),
        description() { let chain = "";



        let softchain = new Decimal(50)
        if (!inChallenge("R",13) && hasChallenge("R",13)) softchain = softchain.times(challengeEffect("R",13))
        let mediumchain = new Decimal(1e10)
        
        
        let hardchain = new Decimal(1e30)
        
        if (inChallenge("R",13) && upgradeEffect("U",14).gte(softchain)) {chain = "Superchained (due to chain+)"} else {chain};
        if (upgradeEffect("U",14).gte(softchain)) chain = "(Softchained)";
        if (upgradeEffect("U",14).gte(mediumchain)) chain = "(Mediumchained)";
        if (upgradeEffect("U",14).gte(hardchain)) chain = "(Hardchained)"; 

       
        
        
        
        
        return `<h3>gain 10% more Meters of Waves per OoM of Points </h3><br> <h4>current: ${format(upgradeEffect(this.layer,this.id))}x ${chain}</h4>`
      },
      effect() {
          let softchain = new Decimal(25)
          if (!inChallenge("R",13) && hasChallenge("R",13)) softchain = softchain.times(challengeEffect("R",13))


          let mediumchain = new Decimal(1000)



          let hardchain = new Decimal(1e10)
          
          let effect = new Decimal (1)
          let OoMs = player.points.add(1).log(10)
          effect = effect.mul(OoMs)
          if (inChallenge("R",12)) effect = effect.pow(0.8)

          if (inChallenge("R",13)) {
            effect = effect.min(softchain).div(1.5)
          } else {
            effect = softcap(effect, softchain, new Decimal(0.8))
            effect = softcap(effect, mediumchain, new Decimal(0.6))
            effect = softcap(effect, hardchain, new Decimal(0.45))
          }

          
          
          return effect
        },
       

        

        style() {
          return {
            "width": "130px",
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
         if (inChallenge("R",11) || inChallenge("R",14)) return false 
         if (hasUpgrade("S",11) || player["S"].points.gte(1)) return true
         if (hasUpgrade("R",11)) return true
         if (hasUpgrade("R",12)) return true
         if (hasUpgrade("R",13)) return true
         if (hasUpgrade("R",14)) return true
         if (player.points.gte("5.15e19")) return true
         if (player["R"].points.gte(1)) return true
         
         
        },
        currencyInternalName: "points",
      },
      
      
    },

    
    buyables: {
        11: {
          cost(x) {
            let scale = new Decimal(1.55)
            let base = new Decimal(15)


            if (hasUpgrade("R",42)) scale = scale.mul(1.15)
            let Calculation = new Decimal(base).mul(Decimal.pow(scale, x)).ceil()
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
              "width": "270px",
              "height": "165px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            
            if (!hasUpgrade("R", 24)) player.points = player.points.minus(this.cost());
            addBuyables(this.layer, this.id, 1);
          },
          effect() {
            let effect = decimalOne
            effect = Decimal.mul(getBuyableAmount(this.layer, this.id),(buyableEffect("U",13)))
            if (hasUpgrade("R",33)) effect = effect.pow(1.15)
            if (hasUpgrade("S",17)) effect = effect.mul(upgradeEffect("S",17))
            //if (inChallenge("R",12)) effect = effect.pow(0.8)
            return effect;
          },
          automate() {
            
            
          },
          
          unlocked() {
            if (hasUpgrade("U",11) && player.points.gte(5) || getBuyableAmount(this.layer,this.id).gte(1)) return true
            if (hasUpgrade("S",11)) return true
            if (inChallenge("R",14)) return true
            //if (inChallenge("R",11) || inChallenge("R",13)) return false
           },
           
           
        },
        12: {
          cost(x) {

          base = new Decimal(200)
          let cost = decimalOne
          let scale = new Decimal(1.21)
          if (hasUpgrade("R",42)) scale = scale.mul(1.15)

          let scaleplus = new Decimal(100)
          let scaleplusplus = new Decimal(500)
          let scaleplusplusplus = new Decimal(750)
          // scale formulas
          v_ = base.mul(Decimal.pow(scale, x))// prescaling, or base scaling

          if (getBuyableAmount(this.layer,this.id).lte(scaleplus)) cost = v_ 

          if (getBuyableAmount(this.layer,this.id).gt(scaleplus)) 
          cost = base.mul(Decimal.pow(3 , x))    .mul(scaleplus.pow_base(scale/3))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplus)) 
          cost = base.mul(Decimal.pow(27 , x))     .mul(scaleplusplus.pow_base(scale/27))

          if (getBuyableAmount(this.layer,this.id).gt(scaleplusplusplus))  
          cost = base.mul(Decimal.pow(19683 , x)) .mul(scaleplusplusplus.pow_base(scale/19683)) 
        return cost

          },
          display() {
            let scaling = "";
            if (player[this.layer].buyables[12].gte(0)) scaling = "";
            if (player[this.layer].buyables[12].gte(100)) scaling = "(Super scaling)";
            if (player[this.layer].buyables[12].gte(500)) scaling = "(Hyper scaling)";
            if (player[this.layer].buyables[12].gte(1000)) scaling = "(Scaling^2)"; 
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
              "width": "270px",
              "height": "165px",
              "border-radius": "10px",
              "border": "5px",
              "margin": "0px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            if (!hasUpgrade("R", 24)) player.points = player.points.minus(this.cost());
            addBuyables(this.layer, this.id, 1);
          },
          effect() {
            let effect = new Decimal(1.1)
            effect = effect.pow(getBuyableAmount(this.layer, this.id))
            if (hasUpgrade("U",13)) effect = effect.mul(upgradeEffect("U",13))
            if(hasUpgrade("R",33)) effect = effect.pow(1.15)
            if (inChallenge("R",12)) effect = effect.pow(0.8)
            return effect;
          },
          unlocked() {
            //if (inChallenge("R",11)) return false
            
            if (hasUpgrade("U",11) && (player.points.gte(150) || player[this.layer].buyables[12].gte(1))) return true
            if (hasUpgrade("S",11)) return true
            if (inChallenge("R",14)) return false
           }
        
        },
        13: {
          cost(x) {
            let scale = new Decimal(1.8)
            if (hasUpgrade("R",42)) scale = scale.mul(1.15)
            let nerfs = new Decimal(1)
            if(hasUpgrade("R",33)) nerfs=nerfs.pow(1.15)
            let Calculation = new Decimal(2500).mul(Decimal.pow(scale, x.pow(nerfs))).ceil()
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
              "height": "165px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            if (!hasUpgrade("R", 24)) player.points = player.points.minus(this.cost());
            addBuyables(this.layer, this.id, 1);
          },
          effect() {
            let effect = decimalZero
            let baseFormula = new Decimal(0.1)
            if (hasUpgrade("S", 12)) baseFormula = baseFormula.mul(1.4)
           // if (hasUpgrade("S", 17)) baseFormula = baseFormula.mul(1.5)
           let r3Eff = new Decimal(1)
           r3Eff = Decimal.pow(1.4 , player["C"].points.sub(2) ).clampMin(1)



            effect = getBuyableAmount(this.layer, this.id).mul(baseFormula).add(1)
            if(hasUpgrade("R",33)) effect=effect.pow(1.15)
            
            if (inChallenge("R",12)) effect = effect.pow(0.8)
            if (hasMilestone("C",3)) effect = effect.mul(r3Eff)

            return effect;

          },
          unlocked() {
            
            if (hasUpgrade("U",12) && player.points.gte(2000) || getBuyableAmount(this.layer,this.id).gte(1)) return true
            
            if (hasUpgrade("S",11)) return true


            
            if (inChallenge("R",14)) return false

          
           }
        
        },
      
    },








    row: 0, // Row the layer is in on the tree (0 is the first row)
    
    layerShown(){return true},
    symbol() {
      return `
      <p> 
      <p class='cBreak' style='font-size:16px'>Main</p>
      </p>`
    },
}) 