addLayer("E", {
    name: "Enlightenment", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "⚡", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		    ENLlevels: new Decimal(0),
        TopLVL: new Decimal(0),
       // EclipsedShards: new Decimal(0),
        ECSgain: new Decimal(1),
        Eclipsium: new Decimal(0),
       // falsity: new Decimal(1),
        EclipseTier: new Decimal(0),
        

        //automaticaally updating things 
        ETCost: new Decimal(0),
        SolarCharge: new Decimal(1),
        Solinity: new Decimal(1),
        Esolar: new Decimal(0),
        Chimera: new Decimal(0),

        // checkupgrade
        forgotton: false,
    }},
    color: "#3f5b96",
   // Can be a function that takes requirement increases into account
    resource: "Solar Light", // Name of prestige currency
    baseResource: "Solarity", // Prestige currency uses this "base currency"
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    //exponent: 0.2, // Prestige currency exponent
   // gainMult() { // Calculate the multiplier for main currency from bonuses
   //     mult = new Decimal(1)
    //    mult = mult.pow(0.3)
    //    return mult
    //},
    //gainExp() { // Calculate the exponent on main currency from bonuses
    //    return new Decimal(1)
   // },
    row: 2,

 
  
         update(diff) {
       
         
         if (player.points.div(1e308).gte(1)) player.E.ENLlevels = player.points.div(1e308).log(10).root(2)
            else player.E.ENLlevels = player.E.ENLlevels.mul(0)
         if (player.E.ENLlevels.gte( player.E.TopLVL )) player.E.TopLVL = player.E.ENLlevels

          player.E.ECSgain = player.E.ENLlevels.root(3)
         // player.E.falsity = player.postCap



         //Solar Charge stuff
        let flow = player.E.ENLlevels.div(10) // the base gain generation
        let Baseincrement = new Decimal(1)  // speed increaser
        
        // BOOSTS AND MULTIPLIERS ARE HERE
        Baseincrement = Baseincrement.mul(player.E.Solinity)
      
       let effect2 = player.E.Chimera.pow_base(1.25)

      effect2 = softcap(effect2, new Decimal(10000), 0.1)
        if (player.E.Chimera.gt(1)) Baseincrement = Baseincrement.mul(effect2)
        



       if (player.E.EclipseTier.gte(3)) Baseincrement = Baseincrement.mul(player.E.EclipseTier.sub(2).pow_base(1.15))

        //Totals
        if (player.E.EclipseTier.gte(3)) player.E.SolarCharge = player.E.SolarCharge.plus(flow.times(Baseincrement.times(diff)))
        
        if (player.E.EclipseTier.eq(8))
            player.E.ETCost = new Decimal(105)
        else if (player.E.EclipseTier.eq(7))
            player.E.ETCost = new Decimal(36)
        else if (player.E.EclipseTier.eq(7))
            player.E.ETCost = new Decimal(25)  
        else if (player.E.EclipseTier.eq(6))
            player.E.ETCost = new Decimal(16)
        else if (player.E.EclipseTier.eq(5))
         player.E.ETCost = new Decimal(9)


        else player.E.ETCost = player.E.EclipseTier.plus(1)





       

        },
          
    tabFormat: {
        "Eclipsify": {      
              content: [
                
                
                ["display-text",
      function() { 
      
            return `
            You Have ${format(player["E"].ENLlevels )} Enlightenment Levels    
            `     
     }],

     "blank",
     ["display-text",
      function() { 
        let highestLVLtext = `${format(player.E.TopLVL)}`       
            return `
            
            
            The Highest Enlightenment Level you have reached is ${highestLVLtext}
            
            `
        
     }],
     "blank",
      "blank",
     "blank",
     "blank",
                //"main-display",
                ["infobox","about"],           
                ["clickable",11],
                
               // ["buyable",11],

              "milestones",
                 "blank",
                ["display-text",
                function() { 
                    let b1 = new Decimal(1)
                    let b2 = new Decimal(1)
                    let b3 = new Decimal(1)
                    let b4 = new Decimal(1)
                    let b5 = new Decimal(1)
                    let b6 = new Decimal(1)
                    b1 = b1.mul(player.E.EclipseTier.pow_base(9))
                    b2 = b2.mul(player.E.EclipseTier.pow_base(5))
                    b3 = b3.mul(player.E.EclipseTier.pow_base(2))
                    b4 = b4.mul(player.E.EclipseTier.pow_base(1.25))
                    if (player.E.EclipseTier.gte(3)) b5 = b5.mul(player.E.EclipseTier.sub(2).pow_base(1.15))
                    if (player.E.EclipseTier.gte(4)) b6 = b6.mul(player.E.EclipseTier.sub(3).pow_base(1.5))

                  let b5show = ``
                  let b6show = ``
                  if (player.E.EclipseTier.gte(3)) b5show = `${format(b5)} to Solar Charge Generation`
                  if (player.E.EclipseTier.gte(4)) b6show = `${format(b6)} to Solar Light generation speed`

                  let g = ``
                  if (player.E.EclipseTier.gte(1)) g = `
                  ${format(b1)} Solarity Gain <br> 
                  ${format(b2)} Solar Rays <br> 
                  ${format(b3)} Solar Shards <br> 
                  /${format(b4)} Center Points requirement<br>
                  ${format(player.E.EclipseTier.pow_base(20))} to Solarity gain cap<br>
                  ${b5show} <br>
                  ${b6show} <br>
                  `
                  else g = `None yet [Unlocked at Eclipse Tier 1]`

                  return `Enlightenment is at Eclipse Tier ${player["E"].EclipseTier} <br> 
                  Current Boosts:<br>
                  ${g}
                  `
           
               }],

             


                "blank",
               "blank",

              
                
                
                "blank",
                "blank",
                "blank",
                
            ],
            
        },
        "The Factory": {
          content: [
            ["display-text",
     function() { 
      let effect = new Decimal(1)
        effect = player.E.Eclipsium.pow_base(1.45)
        effect = format(effect)
      if (player.E.EclipseTier.gte(2) )
       return `You Have ${format(player.E.Eclipsium )} Eclipsium , which multiplies Solarity gain cap by ${effect}<br>`

    }],
    
            ["clickable",12],
           


    
            "blank",
            "buyables",
            ["clickable",14],
            "blank",
            "blank",
            ["clickable",21],
            
            "blank",
            ["clickable",22],
            ["clickable",13],
            "blank",
            ["display-text",
            function() { 
              let effect = new Decimal(1)

              // speed variable here
              let speed = new Decimal(0.1)
              speed = speed.mul(player.E.Solinity)
              let Chimera = player.E.Chimera.pow_base(1.25)

              Chimera = softcap(Chimera, new Decimal(10000), 0.1)
              speed = speed.mul(Chimera)

              if (hasMilestone("E",5)) speed = speed.mul(1.7)
              if (player.E.EclipseTier.gte(3)) speed = speed.mul(player.E.EclipseTier.sub(2).pow_base(1.15))


              //speed text display
              let speedtext = `${format(speed.times(100))}%`
              if (speed.gte(1)) speedtext = `${format(speed)} times`
              
              let formula = player.E.SolarCharge.log(2).add(1)
              let C = player.E.Esolar.clampMax(10000)
              let B = Decimal.add(1 , C.log(2))

              let capped = ``
              if (C.gte(10000)) capped = `(capped)`

              let CTct = ``
              if (player.E.Esolar.gt(1)) CTct = `
              ^ B
              <br> B = 1 + log2(C) <br> C = ${format(player.E.Esolar.clampMax(10000))} ${capped} `

              formula = formula.pow(B)

              //push text here
              if (player.E.EclipseTier.gte(2)) effect = effect.mul(player.E.Eclipsium.pow_base(1.45))
                let SSS = `` 
                let formulatedText = `
                 Effect: 
                <br>log2(Solar Charge)${CTct}
                `

                let Etimes = ` Generation is ${speedtext} your Enlightenment Levels, which is currently ${format(speed.mul(player.E.ENLlevels))}`
                if (speed.gte(10000)) Etimes = `Generating ${format(speed.mul(player.E.ENLlevels))} Solar Charge per second...`
              if (player.E.SolarCharge.gt(1) || player.E.EclipseTier.gte(3)) SSS = `
              You Have <h3 style="color: #f08160; text-shadow: 0px 0px 20px #cc0000;"> ${format(player.E.SolarCharge , 1) }   </h3> Solar Charge, Which Increases Solarity gain cap by <h3 style="color: #f08160; text-shadow: 0px 0px 20px #cc0000;"> ${format(formula)}   </h3> 
               <br> ${Etimes} <br>${formulatedText}`
              
               return SSS
            }],
            "blank",
            "blank",
            ["display-text",
     function() { 
      
      if (player.E.EclipseTier.gte(4) )
       return `Note that buying a queued upgrade does a recontrol reset (ignores QoL)`

    }],
            "upgrades",

          
          
          ],
         

        },
       
    },
// if (player["GL"].Solar_shards.gte(1))
    tooltip: () => `<p>Open Layer 2, Main Layer</p> <br> Your Current Eclipse Tier: ${player.E.EclipseTier}`,
 upgrades: {
11: {
    fullDisplay() {
     
      let showReq = `Requires: 3 Eclipsium`
      if (hasUpgrade("E",this.id)) showReq = `Eclarity's effect is ${format(this.effect())}<br>`
        return `<h2>Eclairity</h2> <br>
        Queued Upgrade 1:<br> Reach 30000 Solar light with Plasmate 30 and Phaser 1 or less without any Solar shard Upgrades <br><br>
        ^0.5 of Plasmate amount increases Solar light cap<br> 
       
        ${showReq}
        `
    },
    unlocked() {
      if (hasMilestone("E",4)) return true
      },
    style() {
      
      return {
        "width": "175px",
        "height": "75px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "2px",
        "text-shadow": "1px 1px 10px #ffa500",
        "color": "#f74545"
      }
    },
    effect() {
      let effect = new Decimal(1)
      
      if (hasUpgrade("E",11)) effect = effect.mul(getBuyableAmount("S",11)).pow(0.6).clampMin(1 )
      return effect

    },
    canAfford() {
      if (player.GL.Solarlight.gte(30000) && getBuyableAmount("S",11).lte(30) && getBuyableAmount("GL",11).lte(1) && player.E.Eclipsium.gte(3) && !hasUpgrade("GL",11) && !hasUpgrade("GL",12) && !hasUpgrade("GL",13) && !hasUpgrade("GL",21) && !hasUpgrade("GL",31) ) return true; else return false 
    },
    pay() {
      EclipsiumReset(true)
      
    }

},
12: {
  fullDisplay() {
    let effectTXT =  ``
    let showReq = `Requires: 1 Eclipsium`
    if (hasUpgrade("E",12)) showReq = ``
    if (hasUpgrade("E",this.id)) effectTXT = `Pneomic's Effect is ${format(this.effect())} <br>`
      return `<h2>Pneomic</h2> <br>
      Queued Upgrade 2:<br> Reach 5.11e13 Solarity without any Solarize Upgrades and Solar Shard Upgrades<br><br>
      Solar Charge Boosts Solarity Gain by ^0.45 of its effect <br>
      ${effectTXT}
      ${showReq}
      <br>
      `
  },
 
  unlocked() {
    if (hasMilestone("E",4)) return true
    },
  style() {
    return {
      "width": "175px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "2px",
      "text-shadow": "1px 1px 10px #ffa500",
       "color": "#f74545"
    }
  },
  effect() {
    let effect = new Decimal(1)
    if (hasUpgrade("E",12)) effect = player.E.SolarCharge.pow(0.45)
    return effect

  },
  canAfford() { return player.points.gte(5.11e13) 
  && !hasUpgrade("GL",11) && !hasUpgrade("GL",12) && !hasUpgrade("GL",13) && !hasUpgrade("GL",21) && !hasUpgrade("GL",31) && 
  !hasUpgrade("S",11) && !hasUpgrade("S",12) && !hasUpgrade("S",13) && !hasUpgrade("S",14) && player.E.Eclipsium.gte(1);
},
pay() {
  EclipsiumReset(true)
  setBuyableAmount("GL",11, new Decimal(0))
}

},
   


13: {
                       fullDisplay() {
    
    let text = `Requires: 2 Eclipsium`
    if (hasUpgrade("E",this.id)) text = `PK-44's effect is ${format(this.effect())}`
      return `<h2>PK-44</h2> <br>
      Queued Upgrade 3:<br> Reach Plasmate #74 without Multiply and Effector Tier 0<br><br><br>

      ^0.4 of Multiply Amount boosts Plasmate. also 2x Solar Light cap <br>
      ${text} <br>
      
      `
  },
  
  unlocked() {
    if (hasMilestone("E",4)) return true
    },
  style() {
    return {
      "width": "175px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "2px",
      "text-shadow": "1px 1px 10px #ffa500",
      "color": "#f74545"
    }
  },
  effect() {
    let effect = new Decimal(1)
    if (hasUpgrade("E",13)) effect = effect.mul(getBuyableAmount("S",12).plus(1)).pow(0.4).clampMin(1)
    return effect

  },
  canAfford() {
    if ( getBuyableAmount("S",11).gte(74) && getBuyableAmount("S",12).eq(0) && player.E.Eclipsium.gte(2) && player.C.EffectorTier.eq(0)
    ) return true; else return false 
  },
  pay() {
    EclipsiumReset(true)
    
  }

},

14: {
  fullDisplay() {
  
    let effectTXT = `Requires: 4 Eclipsium`
    if (hasUpgrade("E",this.id)) effectTXT = `Next `
      return `<h2>Astrologic</h2> <br>

      Queued Upgrade 4:<br> Solinity #100 Under Esolar #15, And all other upgrades bought <br><br><br>
      Unlock Chimera Reset (3rd Solinity reset) and Expansion I <br> 


      ${effectTXT}
      
      `
  },
  
  unlocked() {
    if (hasMilestone("E",4)) return true
    },
  style() {
    return {
      "width": "175px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "2px",
      "text-shadow": "1px 1px 10px #ffa500",
       "color": "#f74545"
    }
  },
  effect() {
  
    return new Decimal (0)

  },
  canAfford() {
    if (player.E.Solinity.gte(100) && player.E.Esolar.lte(15) && player.E.Eclipsium.gte(4)) return true; else return false 
  },
  pay() {
    EclipsiumReset()
    player.C.checkUpgrades = new Decimal(0)
  }

},

},

 buyables: { 

  11: {
    cost(x) {
      let scale = new Decimal(1.75)
      let base = new Decimal(1)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
      return Calculation;
    },
    display() {
      return `<h2>Cytochrisy #${getBuyableAmount(this.layer, this.id)}</h2>
  <h2>  +${format(tmp[this.layer].buyables[this.id].effect)} to Phaser's Base. </h2>
    <br>
  <h2>  x${format(getBuyableAmount("E",11).mul(0.5).add(1))} to Solar Gain Cap </h2>
  <h2>Requires:</h2> 
  <h3>  ${format(tmp[this.layer].buyables[this.id].cost)} Eclipsium 
   Phaser #3 </h3>`
    },
    canAfford() {
      return player.E.Eclipsium.gte(this.cost()) && getBuyableAmount("GL",11).gte(3)
    },
    buy() {
    // player.E.Eclipsium = player.E.Eclipsium.minus(this.cost());
      addBuyables(this.layer, this.id, 1);
    },
    effect() {
      let effect = decimalOne
      effect = effect.mul(getBuyableAmount(this.layer, this.id))
      return effect;
    },
    style() {
      return {
        "width": "200px",
        "height": "135px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
    unlocked() {return player.E.Eclipsium.gte(10) || getBuyableAmount(this.layer, this.id).gte(1) || player.E.EclipseTier.gte(3)}
     
  },

  12: {
    cost(x) {
      let scale = new Decimal(1.25)
      let base = new Decimal(10)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
      return Calculation;
    },
    display() {

let effect2 = getBuyableAmount(this.layer, this.id).pow_base(1.2)



      return `<h2>Expansion I #${getBuyableAmount(this.layer, this.id)}</h2><br>
  <h2>  x${format(this.effect())} to Solar Gain Cap </h2>

  <h2>  x${format(effect2)} to Solar Light cap </h2>
  <h2>Requires:</h2> 
  <h3>  ${format(tmp[this.layer].buyables[this.id].cost)} Chimera </h3>
     (Will root Chimera by 1.1 on purchase)`
    },


    canAfford() {
      return player.E.Chimera.gte(this.cost())
    },
    buy() {
    // player.E.Eclipsium = player.E.Eclipsium.minus(this.cost());
      addBuyables(this.layer, this.id, 1);
      player.E.Chimera = player.E.Chimera.root(1.1)

    },
    effect() {
      let effect = decimalOne
      effect = effect.mul(getBuyableAmount(this.layer, this.id).pow_base(2))
      return effect;
    },
    style() {
      return {
        "width": "200px",
        "height": "135px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
    unlocked() {return player.E.Chimera.gte(10)}
     
  },


  21: { //Just so you know, this buyable is not like the others, This acts like a reset instead so that it does not move with the background lmaoo

    display() {
      //GAIN HERE
          let gain = new Decimal(1)
          gain = player.E.SolarCharge.root(10).sub(1)
          
          

            let EsolarBoost = player.E.Esolar.root(1.35)
          
            let chimeraBoost = player.E.Chimera.pow_base(1.15).clampMin(1)
            EsolarBoost = softcap(chimeraBoost, new Decimal(1000), 0.175)
          chimeraBoost = softcap(chimeraBoost, new Decimal(10000), 0.05)


          if (player.E.Esolar.gt(1)) gain = gain.mul(player.E.Esolar.root(1.35))
          if (player.E.Chimera.gt(1)) gain = gain.mul(chimeraBoost)
          gain = softcap(gain, new Decimal(7.5e8), 0.05   )
          
        //   if (hasMilestone("E",5)) gain = gain.mul(1.25)

        
          //"septic"
   return `
    <h2>Solinity #${format(player.E.Solinity)}</h2><br>                   
    <br> Gain +${format(gain)} Solinity Levels, Then Reset Solar Charge.
    Requires: 50 Solar Charge
    `
          
    
        },
        canAfford() {
          return player.E.SolarCharge.gte(50) 
        },
        buy() {
          let gain = new Decimal(1)
          gain = player.E.SolarCharge.root(10).sub(1)
          let EsolarBoost = player.E.Esolar.root(1.35)
          let chimeraBoost = player.E.Chimera.pow_base(1.15).clampMin(1)
          EsolarBoost = softcap(chimeraBoost, new Decimal(1000), 0.175)
          
            
          chimeraBoost = softcap(chimeraBoost, new Decimal(10000), 0.05)

           if (player.E.Esolar.gt(1)) gain = gain.mul(EsolarBoost)
          if (player.E.Chimera.gt(1)) gain = gain.mul(chimeraBoost)

       
         gain = softcap(gain, new Decimal(7.5e8), 0.05  )
        player.E.Solinity = player.E.Solinity.plus(gain)
        player.E.SolarCharge = new Decimal(1)
       
        },
        style() {
          return {
            "width": "266px",
            "height": "135px",
            "border-radius": "0px",
            "border": "0px",
            "margin": "10px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },
        unlocked() {return player.E.EclipseTier.gte(3)}
         
      },
  22: { //Just so you know, this buyable is not like the others, This acts like a reset instead so that it does not move with the background lmaoo

        display() {
          let gain = new Decimal(1)
          gain = player.E.Solinity.root(1.5).log(3).sub(1)
          let chimeraBoost = player.E.Chimera.pow_base(1.15).clampMin(1)
          if (player.E.Chimera.gt(1)) gain = gain.mul(chimeraBoost)
          chimeraBoost = softcap(chimeraBoost, new Decimal(10000), 0.05)
          
        gain = softcap(gain, new Decimal(10000), 0.15 )
        

        if (player.E.Solinity.lt(10)) gain = new Decimal(0)

        let effect = new Decimal(1)
        effect = effect.mul(player.E.Esolar).root(1.35)
       
          
        //   if (hasMilestone("E",5)) gain = gain.mul(1.25)

        let Softcaptext = ``
        if (player.E.Esolar.gte(10000)) Softcaptext = `(Reduced gain)`

        //"septic"
       return `<h2>Esolar #${format(player.E.Esolar)}</h2> ${Softcaptext}<br>                   
        <br> Gain +${format(gain)} Esolar Levels, Then Reset Solar Charge and Solinity.
        Requires: 10 Solinity
        
        Variable C is Equal to Esolar. (at max 10,000)
       Effect boost to Solinity: ${format(effect)}
        `
                  
            
                },
        canAfford() {
                  return player.E.Solinity.gte(10) 
                },
        buy() {
                  let gain = new Decimal(1)
                  gain = player.E.Solinity.root(1.5).log(3).sub(1)
                  let chimeraBoost = player.E.Chimera.pow_base(1.15).clampMin(1)
                  if (player.E.Chimera.gt(1)) gain = gain.mul(chimeraBoost)
                  chimeraBoost = softcap(chimeraBoost, new Decimal(10000), 0.05)
                  
                gain = softcap(gain, new Decimal(10000), 0.15 )
          
                  //   if (hasMilestone("E",5)) gain = gain.mul(1.25)
          
              
                player.E.Esolar = player.E.Esolar.plus(gain)
                player.E.SolarCharge = new Decimal(1)
                player.E.Solinity = new Decimal(1)
               
                },
        style() {
                  return {
                    "width": "266px",
                    "height": "135px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "10px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color": "#ffffff",
                  }
                },
                unlocked() {return player.E.Solinity.gte(10) || player.E.Esolar.gte(1.1) || player.E.EclipseTier.gte(4)},
                branches: ["21"],
                 
    },
  31: { //Just so you know, this buyable is not like the others, This acts like a reset instead so that it does not move with the background lmaoo

      display() {
       let effect = player.E.Chimera.pow_base(1.15).clampMin(1)
       let effect2 = player.E.Chimera.pow_base(1.25)

      effect = softcap(effect, new Decimal(10000), 0.05)
      effect2 = softcap(effect2, new Decimal(10000), 0.1)
        let nf1 = ``
        let nf2 = ``


        if (effect.gte(10000)) nf1 = `(Reduced)`
        if (effect2.gte(10000)) nf2 = `(Reduced)`
   
     return `<h2>Chimera #${format(player.E.Chimera)}</h2><br>                   
      <br> Gain +${format(this.gain())}  Chimera Levels, Then Reset Solar charge, Solinity, and Esolar.
      Requires: Esolar #10+ and Solinity #50+
   
     Effect boost to Solinity and Esolar: ${format(effect)} ${nf1}
     Solar charge Generation speed: ${format(effect2)} ${nf2}
      `
    
              },
      canAfford() {
                return player.E.Esolar.gte(10) && player.E.Solinity.gte(50) 
              },     
       gain() {
        let gain = new Decimal(1)
       gain = player.E.Solinity.log(8).plus(player.E.Esolar.log(6)).sub(1)
       gain = softcap(gain, new Decimal(10), 0.2)

        return gain.clampMin(0)
       },       
      buy() {
  
              player.E.Chimera = player.E.Chimera.plus(this.gain())
              player.E.Esolar = new Decimal(1)
              player.E.SolarCharge = new Decimal(1)
              player.E.Solinity = new Decimal(1)
             
              },

     

      style() {
                return {
                  "width": "266px",
                  "height": "135px",
                  "border-radius": "0px",
                  "border": "0px",
                  "margin": "10px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color": "#ffffff",
                }
              },
              unlocked() {return hasUpgrade("E",14)},
              branches: ["21","22"],
               
  },




 },
            
 milestones: {
  1: {
      requirementDescription: "Eclipse Tier 1",
      effectDescription() {
        return `
        - Solar Light cap is increases based on highest Levels ever reached 
         <br> 
         (Which is ${format(player.E.TopLVL.pow_base(1.75))} btw)
         <br> 
        - +0.03 to Solar Ray Gain Exponent <br>
        - Unlock Eclipse Boosters (below this Milestone Board)
        `
      },
      done() { 
        return player.E.EclipseTier.gte(this.id) },
      unlocked() {return player.E.EclipseTier.gte(this.id) },
      onComplete() {
        doPopup("msg","...h-hello? is anyone there?", "???",3)        
      },
  },
  2: {
    requirementDescription: "Eclipse Tier 2",
    effectDescription() {
      if (player.E.EclipseTier.gte(this.id))
      return `
      - Intricity and Polarized is Improved <br> Intricity: +0.05 -> +0.08 <br> Polarize: -5 -> -10 root base <br> 
      - Solar Rays's First hardcap is ^3 instead of ^2. but its formula is worse after ^2 <br>
      - Unlock Eclipsium <br>
      - ^1.15 Solarity Gain While inside Twilight check after the log nerf.

      ` 
      else return `???`
    },
    done() { return player.E.EclipseTier.gte(this.id) },
    unlocked() {return player.E.EclipseTier.gte(1) },
    onComplete() {
      doPopup("msg","...where~ am I???", "???",3)        
    },
},
  3: {
  requirementDescription: "Eclipse Tier 3",
  effectDescription() {
    if (player.E.EclipseTier.gte(this.id))
    return `
    - QOL1: You can now Bulk Reset Center Points <br>
    - QOL2: Formality is kept on Recontrol<br>
    - Unlock Solar Charge<br>
    - improve Twilight's Generation Exponent from ^0.75 -> ^0.9<br>
    ` 
    else return `???`
  },
  done() { return player.E.EclipseTier.gte(this.id) },
  unlocked() {return player.E.EclipseTier.gte(2) },
  onComplete() {
    doPopup("msg","I hear something... coming...? ", "???",3)        
  },
},
4: {
  requirementDescription: "Eclipse Tier 4",
  effectDescription() {
    if (player.E.EclipseTier.gte(this.id))
    return `
    - QOL3: You always generate Solar Rays based on log10 of Solarity<br>
    - QOL5: Heirarchy is kept on Recontrol <br>
    - You can now pick 2 (x)eavers and 2 Jears in Centrality tree <br>
    - Unlock Recontrol Upgrades <br>
    ` 
    else return `???`
  },
  done() { return player.E.EclipseTier.gte(this.id) },
  unlocked() {return player.E.EclipseTier.gte(3) },
  onComplete() {
    doPopup("msg","I can see it... I can hear... ", "???",3)        
  },
},
5: {
  requirementDescription: "Eclipse Tier 5",
  effectDescription() {
   
    let Heirarchy = player.C.CenterPoints.pow_base(5).clampMin(1)

    if (player.E.EclipseTier.gte(this.id))
    return `
    - ^0.25 of Modifier score multiplies Solar Light cap<br>
    (which is ${format(player.C.Score.pow(0.25))} btw)<br>
    - Heirarchy's effect boost Solarity gain cap by ^0.33<br>
    (which is ${format(Heirarchy.pow(0.33))} btw)<br>
    - Unlock ??? <br>
    - Twilight is kept on Recontrol, and improve its generation even more from ^0.9 -> ^1.05 (+0.15)<br>
    DEBUFF:<br>
    Eclipse Tier Requirement scaling is worsened
    ` 
    else return `???`
  },
  done() { return player.E.EclipseTier.gte(this.id) // && 

   },
  unlocked() {return player.E.EclipseTier.gte(3) },
  onComplete() {
    doPopup("msg","I can see it... I can hear... ", "???",3)        
  },
},
6: {
  requirementDescription: "Eclipse Tier 6",
  effectDescription() {
    
    

    let Heirarchy = player.C.CenterPoints.pow_base(5).clampMin(1)

    if (player.E.EclipseTier.gte(this.id))
    return `
    - Multiply Bulk purchase is increased to 10 per tick<br>
    - Unlock Anti-Scalar Check Upgrade<br>
    ` 



    else return `???`
  },
  done() { return player.E.EclipseTier.gte(this.id) // && 

   },
  unlocked() {return player.E.EclipseTier.gte(3) },
  onComplete() {
    doPopup("msg","I can see it... I can hear... ", "???",3)        
  },
},
},
            clickables: {  
              
     
              11: {
                  display() {
                    
                    let ready = `To get to the next Eclipse Tier: ${player.E.ETCost} Enlightenment Levels `
                    let allReset = ` `
                     if (player.E.EclipseTier.gte(2)) allReset = `(including current progress)`
                  if (player.E.ENLlevels.gte(player.E.ETCost)) ready = `You Can Aquire the next Eclipse Tier on This Eclipsication!`
                   
                  return `
                    <h2>ECLIPSICATION [LAYER 2 RESET]</h2><br> 
                    <h4>Eclipsation will reset EVERYTHING up to this point. ${allReset}</h4>
                    Your first Eclipsication Unlocks a board in this tab that provides various boosts to help you get back to where you started! (after all nerfs) 
                                 
                    ${ready}                  
                    `
      
                  },
                  onClick() {
                  
                  
                  if (player.E.EclipseTier.gte(2)) player.E.Eclipsium = player.E.Eclipsium.plus(player.E.ECSgain)
                  if (player.E.ENLlevels.gte(player.E.ETCost)) {
                    player.E.EclipseTier = player.E.EclipseTier.plus(1)
                    


                    // reset ALL progress
                    player.E.Eclipsium = player.E.Eclipsium.mul(0)
                    setBuyableAmount("E", 11, new Decimal(0) )
                    setBuyableAmount("E", 12, new Decimal(0) )
                    player.E.SolarCharge = new Decimal(1)
                    player.E.Solinity = new Decimal(1)
                    player.E.Esolar = new Decimal(1)
                    player.E.Chimera = new Decimal(1)
                    player.E.upgrades = []

                  }
                  
                  

                  layer2Reset()
                 
                  



                  },
              canClick() {if (player.E.ENLlevels.gte(player.E.ETCost) ) return true},
              style() {
                
                
                return {
                      "width": "500px",
                      "height": "100px",
                      "border-radius": "0px",
                      "border": "10px",
                      "margin": "25px",
                      "text-shadow": "0px 0px 10px #000000",
                      
                    } 
                    
                  },   
                  
                  
              },
              12: {   


          

                          display() {
                            let gain = new Decimal(1)
                            gain = player.E.ENLlevels

                            //"septic"
                          return `
                            <h2>Recontrol [MODIFIED LAYER 2 RESET]</h2> <br> 
                            Doing a recontrol reset does everything Convertary does as well as rooting Solar Shards and Center Points by 3, it also resets some things.
                            
                            <br> recontrol will give +${format(gain)} Eclipsium, then do an Recontrol reset as well as check upgrades
                            `
                            

                          },
                          onClick() {
                            let gain = new Decimal(1)
                            gain = player.E.ENLlevels
                            



                        
                          player.E.Eclipsium = player.E.Eclipsium.plus(gain)
                          EclipsiumReset()
                         


                          },
                      canClick() {if (hasMilestone("E",2) && player.E.ENLlevels.gte(1)) return true},
                      style() { return {
                              "width": "350px",
                              "height": "100px",
                              "border-radius": "5px",
                              "border": "10px",
                              "margin": "25px",
                              "text-shadow": "0px 0px 10px #000000",
                              "color": "#50D1C9"
                            }
                          },   
                          
                    unlocked() {if (hasMilestone("E",2)) return true}
              },
              13: {   


          

                display() {
                  let gain = new Decimal(1)
                  gain = player.E.ENLlevels

                  //"septic"  
                return `
                  <h2>Root your Esolar. and redo Astrologic</h2> <br> 
                  Shows when you messed up Astrologic. Helpful for not softlocking yourself
                  `
                  

                },
                onClick() {
                  player.E.Esolar = new Decimal(15)
                  player.E.Solinity = new Decimal(0)


                },
            canClick() {return true},
            style() { return {
                    "width": "200px",
                    "height": "50px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "text-shadow": "0px 0px 10px #000000",
                    
                  }
                },   
                
          unlocked() {
            if (hasUpgrade("E",11) && hasUpgrade("E",12) && hasUpgrade("E",13) && !hasUpgrade("E",14) && player.E.Esolar.gt(15)) return true


          }
    },
                // END OF CLICKABLE CODE
              
              
        
        14: {
                  display() {
                    let text = ``
                    let textActiveGoal = ``
                    let rewardDisplay = ``
                    let textActive = ``

               

                    

                    if (player.E.forgotton == true) rewardDisplay = `<br><br><br>Phaser is added into the Modifier score formula. You now Generate Solar shards ^0.2 of your current golden light <br>`
                    else rewardDisplay = ``
                    if (getClickableState("E", 14)) textActive = `
                    [ACTIVE] 
                    Goal: 1.16e20 Shade...? and 2 Center Points  

                    
                    `
                    if (player.E.forgotton == true) text = `Check Upgrade Completed!`
                    else if (!getClickableState("E", 14))
                     text = `Enter check upgrade #004
                                     
                    Start helping him...
                    [Check Requirements are unknown... but it will change the entirety of this game temporarily]

                    Requires: 
                    Expansion I #10
                    Phaser #68
                    Cytochrisy #8
                    Multiply #674
                    `
                    else text = ``
                /* Hidden restrictions
                    - Modifier score is reduced to ^0.8
                    - Solar Shards is rooted to 3
                    - Solar Rays is rooted to 5
                    - Solarity gain is rooted by 7*/
          

                    return `<h2>The Forgotton...</h2><br> ${textActive}
          ${text}
          ${textActiveGoal}
          ${rewardDisplay}
           `
                    

                  },
                  onClick() {
                    

                    if ((getClickableState("E", 14) == true) && player.C.CenterPoints.gte(2) && player.points.gte(1.16e20) && (player.E.forgotton == false)) {
                     player.E.forgotton = true 
                     
                     layer2Reset()
                    }
                    else if (getClickableState("E", 14) == false)  {
                    
                    layer2Reset()

                    }
                    const currentState = getClickableState("E", 14)
                    setClickableState("E", 14, !currentState)
                    
                  },
                  
              




              canClick() {
                //check if it has the check upgrade or is not in the check upgrade
                if (getClickableState(this.layer,this.id) == false && player.E.forgotton == false) 
                {
                //check if it has the requirements to enter unless it is in the check upgrade 
                if (getBuyableAmount("E",12).gte(10) && getBuyableAmount("GL",11).gte(68) && getBuyableAmount("E",12).gte(10) && getBuyableAmount("E",11).gte(8)){
                    return true
                  }
                 } 
                // check if its inside the check upgrade  
                else if (getClickableState(this.layer,this.id) == true )
                {                                                                       
                  //check if it meets the requirements to complete the upgrade check.
                  if (player.C.CenterPoints.gte(2) && player.points.gte(1.16e20)) return true                                              
                }                                                                    
                },

              style() {
               return getClickableState("E",14) ? {
                  "width": "150px",
                  "height": "125px",
                  "border-radius": "0px",
                  "border": "0px",
                  "margin": "0px",
                  "text-shadow": "0px 0px 10px #000000",
                  
                }
                : {
                  "width": "150px",
                  "height": "207px",
                  "border-radius": "0px",
                  "border": "0px",
                  "margin": "0px",
                  "text-shadow": "0px 0px 10px #000000",
                  
                }


                  },   
                  
                unlocked() {if (hasMilestone("E",5) && getBuyableAmount("E",12).gte(10)) return true; else return false}  
              },
              




            },

           

    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "", description: "Press A to Accelerate the Energy ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["GL"],
    layerShown(){ 
      hasCurrency = new Decimal(1)
      if ( player["E"].ENLlevels.gte(1) || player.points.gte(1e308) || player.E.EclipseTier.gte(1) )   return true; 

    }
}

)