addLayer("S", {
    name: "Solar Ray", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sol", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),

    Bulk_M: new Decimal(1),

    metaNerf: new Decimal(300)
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
      let RootEFF1 = new Decimal(40)
	    let RootEFF2 = new Decimal(35)
      let MAX = hasMilestone("E", 2) ? 3 : 2
      
  	  let eff1 = player.S.points.root(RootEFF1.sub(upgradeEffect("S",12))).clampMin(1)
  	  let eff2 = player.S.points.root(RootEFF2.sub(upgradeEffect("S",12))).clampMin(1)
        let capped = ``
      eff1 = softcap(eff1, new Decimal(2), 0.3).clampMax(MAX)

          //if (hasMilestone("E",1)) gain2 = gain2.pow(1.732)

          if (eff1==2) capped = `(capped)`
        return `<h3> Solar Rays Boost the following: <br><br> Solarity by ^${format(eff1,3)} ${capped}<br> Solarity by ${format(eff2,3)} </h3>`

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
            ["display-text",
      function() { 

        
        let x = getBuyableAmount("S",12)
        

        let antiscale =  Decimal.plus(   1  ,   Decimal.div(x.sub(player.S.metaNerf).root(1.5) , 25  )     ) 
      


        let textA = `` 
        let textB = ``
        let textC = `` 
        let textD = ``  
        


//MetaScale
        let display = ``
        if (x.gte(25)) 
        textA = `Nerf 1: <p> Every 25 of 'Multiply' Purchases multiplies its Buyables cost by 3 <p><br>`
        if (x.gte(100)) 
        textB = `Nerf 2: <p> Every 100 of 'Multiply' Purchases multiplies its Buyables cost by 9 <p><br>`
        if (x.gte(200)) 
        textC = `Nerf 3: <p> [200 Multiply] : 'Multiply' base scaling is applied twice <p><br>`
        if (x.gte(player.S.metaNerf)) 
        textD = `Meta Nerf: <p> After 300 of 'Multiply', its costs scale is ${format(antiscale)}^x`
        


        return `${textA} <br> ${textB} <br> ${textC} <br> ${textD} <br> `

     }],
            "buyables",
    /**/
          ],
          

        },
       
      },


      prestigeButtonText() {
        let nerf = getResetGain(this.layer)  .pow(1.501501502)
        
              let nerfText = ``
              if (getClickableState("C", 21)) nerfText = `+${format(nerf)} -> `
             
        //let generation = ``
       // if (hasMilestone("E",1) && player.points.log(10).lt(40)) generation = `<p>Generating ${format(player.points.clampMin(1).log(10))} Solar Rays / Sec (thanks to Eclipse Tier 1)</p>`
        
        return ` <h3> SOLARIZE </h3> [1st Layer Reset]  <br>
        Gain Solar rays by ^${tmp.S.exponent} of Solarity, Then Reset Solarity.<br>
         (Requires at least 1 Solarity)<br>
         ${nerfText} +${format(getNextAt(this.layer))} Solar Rays<br>
         
         
         `
    
    
    
     
    
    
    
    
    
    
    
    
      },
    canReset() {
        return true
    },
    exponent() { 
      let multiboost = decimalZero
      if (hasMilestone("E",1)) multiboost = multiboost.plus(0.03)
        
      return upgradeEffect("S",11).plus(0.1).plus(multiboost)

      },

update(diff) {

  if (getClickableState("C",22)) player.S.metaNerf = player.S.metaNerf.mul(0).add(1)
  else player.S.metaNerf = new Decimal(300)

  let BulkPurchase = new Decimal(1)

  if (player.C.checkUpgrades.gte(2)) BulkPurchase = BulkPurchase.plus(5)
  if (player.E.EclipseTier.gte(3)) BulkPurchase = BulkPurchase.plus(5)


  if (player.C.checkUpgrades.gte(3)) player.S.points = player.S.points.plus(getResetGain("S").pow(0.75))
  if (hasMilestone("E",4)) player.S.points = player.S.points.plus(player.points.clampMin(1).log(10).times(diff))

    player.S.Bulk_M = BulkPurchase
  
     },


getResetGain() {
  if (player.points.lt(1)) return Decimal.dZero;

  let gain = Decimal.pow(player.points, tmp.S.exponent).minus(1);

  if (hasUpgrade("S", 14)) gain = Decimal.times(upgradeEffect("S", 14), gain)
  if (hasUpgrade("GL",31)) gain = gain.times(upgradeEffect("GL",31))
  if (player.C.EffectorTier.gte(2)) gain = gain.times(player.S.points.log(4).clampMin(1))
  if (hasUpgrade("C",12)) gain = gain.times(8)
  if (hasUpgrade("C",13)) gain = gain.times(4)
  if (hasUpgrade("C",21)) gain = gain.pow(1.05)

  if (getClickableState("C", 21)) gain = gain.pow(0.666)
  if (getClickableState("C", 23)) gain = gain.log(12)
  if (hasMilestone("E",1)) gain = gain.mul(player.E.EclipseTier.pow_base(5))
  return gain;

},


getNextAt() {
  if (player.points.lt(1)) return Decimal.dZero;
  
  let gain = Decimal.pow(player.points, tmp.S.exponent).minus(1);
  if (hasUpgrade("S", 14)) gain = Decimal.times(upgradeEffect("S", 14), gain)
  if (hasUpgrade("GL",31)) gain = gain.times(upgradeEffect("GL",31))
  if (player.C.EffectorTier.gte(2)) gain = gain.times(player.S.points.log(4).clampMin(1))
  if (hasUpgrade("C",12)) gain = gain.times(8)
  if (hasUpgrade("C",13)) gain = gain.times(4)
  if (hasUpgrade("C",21)) gain = gain.pow(1.05)

  if (getClickableState("C", 21)) gain = gain.pow(0.666)
  if (getClickableState("C", 23)) gain = gain.log(12)
  
  if (hasMilestone("E",1)) gain = gain.mul(player.E.EclipseTier.pow_base(5))
  return gain;

},

    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },


    automate() {
      if (player.C.checkUpgrades.gte(1)) buyMaxBuyable("S",11)
      if (player.C.checkUpgrades.gte(2)) buyMaxBuyable("S",12)
    },

//
    componentStyles: {
        "prestige-button"() { return {
            "border-radius":"0px",
            "width": "400px",
            "height": "90px",
            "border-radius": "0px",
            "border": "10px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            
        }}
    },

    upgrades:
    {
        11: {
            fullDisplay() {
             // let rootage = new Decimal(0.05)
              if (hasMilestone)


                return `<h2>Intricity</h2> <br>
                Requires:<br> Plasmate #5 <br><br> <br> 
                
                +${upgradeEffect("S",11)} Solar Ray Gain Exponent <br> <br>
                Cost: 22 Solar Rays
                
                `
            },
           
            cost: new Decimal(22),
            canAfford() {
                if (getBuyableAmount("S",11).gte(5) && player["S"].points.gte(this.cost)) return true

            },
            unlocked() {
              if (getBuyableAmount("S",11).gte(5) || player.C.EffectorTier.gte(1)) return true
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
            effect() {
              let base = new Decimal(0)
              if (hasUpgrade("S",11)) base = base.plus(0.05)
              if (hasMilestone("E",2)) base = base.plus(0.03)
              return base
            },
        },

        12: {
          fullDisplay() {
              return `<h2>Polarize</h2> <br>
              Requires:<br> Plasmate #10 <br><br><br> 
              
              -${upgradeEffect("S",12)} to Root formula of solar rays bonus <br><br>
              Cost: 105 Solar Rays
              
              `
          },
          cost: new Decimal(100),
          canAfford() {
              if (getBuyableAmount("S",11).gte(10) && player["S"].points.gte(this.cost)) return true
              else return false
          },
          unlocked() {
            if (hasUpgrade("S",11) || player.C.EffectorTier.gte(2)) return true
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
          effect() {
            let base = new Decimal(0)
            if (hasUpgrade("S",12)) base = base.plus(5)
            if (hasMilestone("E",2)) base = base.plus(5)
            return base
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
          return effect = player.points.pow(0.05).clampMin(1)
        },
        unlocked() {
          if (hasUpgrade("S",12) || player.C.EffectorTier.gte(3)) return true
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
        if (hasUpgrade("S",13) || player.C.EffectorTier.gte(4)) return true
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
    
//if (player.C.checkUpgrades.gte(1))

    buyables: { 
        11: {
            cost(x) {
              let scale = new Decimal(1.35)
              


              let base = new Decimal(5)
              let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))

              if (hasUpgrade("GL",11)) Calculation = Calculation.pow(0.9).div(3)
              return Calculation;
            },
            buyMax() {
              let scale = new Decimal(1.35);
            //  if (hasMilestone("E",1)) scale = scale.times(1.01)
              let base = new Decimal(5);
            
              let amount = player.S.points;
              if (hasUpgrade("GL", 11)) amount = amount.root(0.9).times(3); // upgrade effect is applied last, so it's undone first
              amount = amount.dividedBy(base).log(scale); // then undo the normal calculations
            
              amount = amount.ceil(); // then only at the very very end, floor()
            
              setBuyableAmount("S", 11, amount.plus(1));
             // player.S.points = player.S.points.minus(this.cost(amount));
            },


            unlocked() {
              if (player["S"].points.gte(1) || player["GL"].Solar_Shards.gte(1) || getBuyableAmount("S",11).gte(1)) return true

            },
            display() {
              let nerf = tmp[this.layer].buyables[this.id].effect.pow(1.501501502)




              let nerfText = ``
              if (getClickableState("C", 21)) nerfText = `+${format(nerf)} -> `


              return `
            <h2>Plasmate #${getBuyableAmount(this.layer, this.id)}</h2>
            <br>
          <h2> ${nerfText} +${format(tmp[this.layer].buyables[this.id].effect)} to Solarity Gain</h2>
            <br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Solar Rays</h2>

          `
            },
            canAfford() {
              return player[this.layer].points.gte(this.cost())
            },
            buy() {
              if (player.S.points.gte(this.cost) && player.C.checkUpgrades.lt(1)) player.S.points = player.S.points.minus(this.cost());
              addBuyables(this.layer, this.id, 1);
            },

            
            
            effect() {
              let effect = decimalOne
              let base = new Decimal(3)
              if (getBuyableAmount("GL", 11).gte(1)) base = base.mul(buyableEffect("GL", 11).plus(1))
              effect = effect.mul(getBuyableAmount(this.layer, this.id)).mul(base)
              if (player.C.EffectorTier.gte(3)) effect = effect.mul(player.S.points.log(9).clampMin(1))
              
             // if (hasMilestone("E",1)) effect = effect.pow(0.949)
              if (getClickableState("C", 21)) effect = effect.pow(0.666)
              if (getClickableState("C", 23)) effect = effect.clampMin(0.1).log(12)
              return effect.clampMin(0);
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
            cost() {
              let scale = new Decimal(1.4)
              let base = new Decimal(500)
              let x = getBuyableAmount("S",12)
            
            

              let cost = base.mul(scale.pow(x))
              if (hasUpgrade("GL",12)) cost = cost.pow(0.9).div(3)
              if (x.gte(25)) cost = cost.mul(Decimal.pow(3, x.div(25).floor()))
              if (x.gte(100)) cost = cost.mul(Decimal.pow(9, x.div(100).floor()))
              if (x.gte(200)) cost = cost.mul(Decimal.pow(1.4, x.sub(200)))
                if (x.gte(player.S.metaNerf)) {
                  scaledAmt = x.sub(player.S.metaNerf)
                  metaScaling = scaledAmt.root(1.5).div(25).add(1).pow(scaledAmt)
                  cost = cost.mul(metaScaling)
                }     
              return cost;
            },

            buyMax() {
              let scale = new Decimal(1.4)
              let base = new Decimal(500)

              let x = getBuyableAmount("S",12)

              let dx = x.plus(5)

              let cost = base.mul(scale.pow(dx))
              
              if (hasUpgrade("GL",12)) cost = cost.pow(0.9).div(3)
              if (dx.gte(25)) cost = cost.mul(Decimal.pow(3, dx.div(25).floor()))
              if (dx.gte(100)) cost = cost.mul(Decimal.pow(9, dx.div(100).floor()))
              if (dx.gte(200)) cost = cost.mul(Decimal.pow(1.4, dx.sub(200)))
                if (dx.gte(player.S.metaNerf)) {
                  scaledAmt = dx.sub(player.S.metaNerf)
                  metaScaling = scaledAmt.root(1.5).div(25).add(1).pow(scaledAmt)
                  cost = cost.mul(metaScaling)
                }   
           
              if (player.points.gte(cost)) addBuyables("S", 12, 5)
              else if (player.points.gte(this.cost)) addBuyables("S", 12, 1)
              else player.points = player.points.plus(1) // :trol:




             // player.S.points = player.S.points.minus(this.cost(amount));
            },

            display() {
              let nerf = tmp[this.layer].buyables[this.id].effect.pow(1.501501502)

              let nerfText = ``
              if (getClickableState("C", 22)) nerfText = `x${format(nerf)} -> `
              return `
            <h2>Multiply #${getBuyableAmount(this.layer, this.id)}</h2>
            <br>
          <h2> ${nerfText}  x${format(buyableEffect("S",12))} to Solarity Gain</h2>
            <br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Solarity</h2> <br>
          <h3> [Requires Plasmate #15] </h3>
          `
            },
            canAfford() {
              if  (player.points.gte(this.cost()) && getBuyableAmount("S",11).gte(15)) return true
            },
            buy() {

              if (player.points.gte(this.cost)) 
                  if (player.C.checkUpgrades.lt(2)) player.points = player.points.minus(this.cost());
                  else player.points = player.points
              
              addBuyables(this.layer, this.id, 1);



            },
            effect() {
              let effect = decimalOne
              effect = Decimal.pow(1.1,getBuyableAmount(this.layer, this.id))
              if (player.C.EffectorTier.gte(4)) effect = effect.mul(player.S.points.log(16).clampMin(1))
              if  (player.C.checkUpgrades.gte(3)) effect = effect.pow(1.312)

              if (getClickableState("C",22)) effect = effect.pow(0.666)
              if (getClickableState("C", 23)) effect = effect.log(12)
              
              
              return effect;
            },
            unlocked() {
              if (hasUpgrade("S",12)) return true

            },
            style() {
              return {
                "width": "305px",
                "height": "170px",
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