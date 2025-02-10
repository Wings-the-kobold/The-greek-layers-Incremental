
var canGet =` You Can Aquire the next Eclipse Tier on This Eclipsication!` 

addLayer("E", {
    name: "Enlightenment", // This is optional, only used in a few places, If absent it just uses the layer id.
   // symbol: "⚡", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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

        activeCheck: "",


        forgotton: false,
    }},
    color: "#3f5b96",
 
    row: 2,

 //if (player.L.TimeTillDarkCheck == false)
    
 symbol() {
  return `
  <p><img src="resources/The Eclipse.png" style="width:80px;height:80px;",></p>`
  },



         update(diff) {
         let Hour = new Date()
         
        let ENLcap = 9
        if (Check("L",11).has) ENLcap = 16

         if (player.points.div(1e308).gte(1)) {
          
          player.E.ENLlevels = player.points.div(1e308).log(10).root(2).clampMax(ENLcap)
        
        }
            else player.E.ENLlevels = player.E.ENLlevels.mul(0)
         if (player.E.ENLlevels.gte( player.E.TopLVL )) player.E.TopLVL = player.E.ENLlevels

          player.E.ECSgain = player.E.ENLlevels.root(3)
         // player.E.falsity = player.postCap

        //Check("L",11).has

         //Solar Charge stuff
        let gainSC = player.E.ENLlevels.div(10) // the base gain generation      
        let gainL1 = tmp["E"].buyables["21"].gain//.times(diff)
    
    // BOOSTS AND MULTIPLIERS ARE HERE 

   //Solar charge
      let speedSC = player.E.Solinity.clampMin(1) 
      let effect2 = player.E.Chimera.pow_base(1.25)

      effect2 = softcap(effect2, new Decimal(10000), 0.1)
      if (player.E.Chimera.gt(1)) speedSC = speedSC.mul(effect2)
      if (Hour.getHours() <= 12 && getBuyableAmount("L",21).gte(2) && !Hour.getHours == 12) speedSC = speedSC.mul(1.5 ** Hour.getHours()) 
      if (player.E.EclipseTier.gte(3)) speedSC = speedSC.mul(player.E.EclipseTier.sub(2).pow_base(1.15))
                
        //Solinity passive gen
      let speedL1 = tmp["E"].buyables["21"].gain
        
        //Generation
        if (player.E.EclipseTier.gte(3)) player.E.SolarCharge = player.E.SolarCharge.plus(gainSC.times(speedSC.times(diff)))
        if (player.E.EclipseTier.gte(6)) player.E.Solinity = player.E.Solinity.plus(gainL1.div(10).times(diff))


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
            
        let ENLcap = 9

        let ENLCapText = ``
        let CappedText = ``
        if (player.E.ENLlevels.gte(ENLcap)) CappedText = `If this wasn't capped, your Enlightenment Levels would instead be ${format(player.points.div(1e308).clampMin(1).log(10).root(2),4)}`

        if (Check("L",11).has) ENLcap = 16; else ENLCapText = `(capped)`
        
            return `
            You Have ${format(player["E"].ENLlevels)} Enlightenment Levels ${ENLCapText}<br><br>
            ${CappedText}   
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
                    let b1 = player.E.EclipseTier.pow_base(9)
                    let b2 = player.E.EclipseTier.pow_base(5)
                    let b3 = player.E.EclipseTier.pow_base(2)
                    let b4 = player.E.EclipseTier.pow_base(1.25)
                    let b5 = player.E.EclipseTier.sub(2).pow_base(1.15)
                    let b6 = player.E.EclipseTier.sub(3).pow_base(1.5)
                    let b7 = player.E.EclipseTier.sub(4).pow_base(2)
                    let b8 = player.E.EclipseTier.sub(5).pow_base(5)
                    

                  let b5show = ``
                  let b6show = ``
                  let b7show = ``
                  let b8show = ``
                  player.E.EclipseTier.gte(3) ? b5show = `${format(b5)} to Solar Charge Generation` : b5show = ``
                  player.E.EclipseTier.gte(4) ? b6show = `${format(b6)} to Solar Light generation speed` : b6show = ``
                  player.E.EclipseTier.gte(5) ? b7show = `${format(b7)} to Eclipsium gain` : b7show = `` ;
                  player.E.EclipseTier.gte(6) ? b8show = `${format(b8)} to Luner Essence gain` : b8show = `` ;
                  

                   //return


                  let g = ``
                  if (player.E.EclipseTier.gte(1)) g = `
                  ${format(b1)} Solarity Gain <br> 
                  ${format(b2)} Solar Rays <br> 
                  ${format(b3)} Solar Shards <br> 
                  /${format(b4)} Center Points requirement<br>
                  ${format(player.E.EclipseTier.pow_base(20))} to Solarity gain cap<br>
                  ${b5show} <br>
                  ${b6show} <br>
                  ${b7show} <br>
                  ${b8show} <br>
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

    let cap = new Decimal(100000)

    if (Check("L",11).has) cap = new Decimal(1e10)

      let effect = new Decimal(1)
        effect = player.E.Eclipsium.pow_base(1.45).clampMax(cap)
       // effect = effect
        
        

      if (player.E.EclipseTier.gte(2) )
       return `You Have ${format(player.E.Eclipsium)} Eclipsium , which multiplies Solarity gain cap by ${format(effect)} ${effect >= cap ? "" : "(Capped)" }<br>`

    }],
    
    ["Reset", {id: 11, title: "RECONTROLLERIZE"}],
           


    
            "blank",
            "buyables",
            ["Check", {id: 11, item:"Forgotten"}],
            "blank",
            "blank",
         
            
            "blank",
            ["display-text", //The entire Solar charge display lies here
            function() { 
              let effect = new Decimal(1)
              
              // speed variable here

              let speed = new Decimal(0.1)
              speed = speed.mul(player.E.Solinity)
              let Chimera = player.E.Chimera.pow_base(1.25)

              Chimera = softcap(Chimera, new Decimal(10000), 0.1)
              speed = speed.mul(Chimera)

              let S1 = new Decimal(1)
              S1 = S1.mul(buyableEffect("L",31).mul(10).clampMin(1) )


              
              let S1Text = ``
              if (getBuyableAmount("L",31).gte(1)) S1Text = `S = ${S1}`; else if (hasUpgrade("L",21)) S1Text = `<h4 style="color: #6c598f"> S = 0</h4>`
              let ViableS = ``
              if (hasUpgrade("L",21)) ViableS = `<h4 style="color: #6c598f">+ log4(S)</h4>`
              

              //[buyable thing here]



              let Hour = new Date()
              if (Hour.getHours() <= 12 && getBuyableAmount("L",21).gte(2) && !Hour.getHours == 12) speed = speed.mul(1.5 ** Hour.getHours()) 




              //if (hasMilestone("E",5)) speed = speed.mul(1.7)
              if (player.E.EclipseTier.gte(3)) speed = speed.mul(player.E.EclipseTier.sub(2).pow_base(1.15))


              //speed text display
              let speedtext = `${format(speed.times(100))}% of `
              if (speed.gte(1)) speedtext = `${format(speed)} times`
              

              //Formula stuff 
              let formula = player.E.SolarCharge.log(2).add(1)
              let C = player.E.Esolar.clampMax(10000)
              let B = Decimal.add(1 , C.log(2))
                


              let capped = ``
              if (C.gte(10000)) capped = `(capped)`

              let CTct = ``
              if (player.E.Esolar.gt(1)) CTct = `
              ^ B
              <br> B = 1 + log2(C) ${ViableS} <br> C = ${format(player.E.Esolar.clampMax(10000))} ${capped} <br> ${S1Text}`

              formula = formula.pow(
                 B
                .plus(S1.log(4))
          )



              //push text here
              if (player.E.EclipseTier.gte(2)) effect = effect.mul(player.E.Eclipsium.pow_base(1.45))
                let SSS = `` 





              //Now display stuff goes down here
                let formulatedText = `
                 Effect Formula: 
                <br>log2(Solar Charge)${CTct}
                `

                let Etimes = ``
                if (speed.gte(10000)) Etimes = `Generating ${format(speed.mul(player.E.ENLlevels))} Solar Charge per second...`; 
                else Etimes = ` Generation is ${speedtext} your Enlightenment Levels, which is currently ${format(player.E.ENLlevels.mul(speed))}`

                //Solar Charge Display
              if (player.E.SolarCharge.gt(1) || player.E.EclipseTier.gte(3)) SSS = `
              You Have <h3 style="color: #f08160; text-shadow: 0px 0px 20px #cc0000;"> ${format(player.E.SolarCharge , 3) }   </h3> Solar Charge, Which Increases Solarity gain cap by <h3 style="color: #f08160; text-shadow: 0px 0px 20px #cc0000;"> ${format(formula)}   </h3> 
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

    Reset: {

       11: {   
           display() {
            let gain = Reset("E",11).gain            
        return `<br> 
               Doing a recontrol reset does everything Convertary does as well as rooting Solar Shards and Center Points by 3, it also resets some things. <br>
                            
                <br> You will gain ${format(gain)} Eclipsium on Recontrol
                            `
                        
          },
         onClick() {
            player.E.Eclipsium = player.E.Eclipsium.plus(Reset("E",11).gain)
            EclipsiumReset()
                },

    canClick() {if (player.E.ENLlevels.gte(1)) return true},
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
                          
                    unlocked() {if (hasMilestone("E",2)) return true},
                    gain() {
                      let gain = player.E.ENLlevels
                      if (player.E.EclipseTier.gte(5)) gain = gain.mul(player.E.EclipseTier.sub(4).pow_base(2))
                      return gain
                      },      
                    button: () => { return `Recontrol the layers!` },
              },

              

    },

    Check: {
      11: {
        display() {
          let text = ``
        
          if (!Check("E",11).has) text = `
          It is unknown, for the darkness lurks with pure rage...<br><br>
          Requires:Expansion I #10, Phaser #68, Cytochrisy #8, Multiply #674
          `
          else if (player["E"].activeCheck == "Forgotton") text = `Goal: 1.16e20 Shade...? and 2 Center Points`       
          if (Check("E",11).has) text = `Phaser is added into the Modifier score formula. You now Generate Solar shards ^0.2 of your current golden light<br>`
          return text
        },
        onClick() {
          if (player["E"].activeCheck == "Forgotton" && Check("E",11).CompReq == true ) {
            player["E"].forgotton = true
            player["E"].activeCheck = ""
          }
          else if (Check("E",11).canEnter == true) player.E.activeCheck = "Forgotton"; layer2Reset()
    
        },
        unlocked() {
          if (hasMilestone("E",5) && getBuyableAmount("E",12).gte(10) ) return true
          else false
        },
    canEnter() {
      return (Check("E",11).EnterReq == true && !Check("E",11).has && player["E"].activeCheck == "")                                                             
      },  
    EnterReq() {
     return (getBuyableAmount("E",12).gte(10) && getBuyableAmount("GL",11).gte(68) && getBuyableAmount("E",12).gte(10) && getBuyableAmount("E",11).gte(8))   
    },   
    CompReq() {
    return player.C.CenterPoints.gte(2) && player.points.gte(1.16e20)
    },
    
    has() { return player["E"].forgotton },
    
    png() {return `<p><img src="resources/The Forgotton.png" style="width:150px;height:150px;"></p> `}
    
    
    
    
    
    
    
    
    
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
      Queued Upgrade 3:<br> Reach Plasmate #74 without Multiply and no effector tiers<br><br><br>

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
    unlocked() {return player.E.Chimera.gte(10) || getBuyableAmount(this.layer, this.id).gte(1)}
     
  },


  21: { //Just so you know, this buyable is not like the others, This acts like a reset instead so that it does not move with the background lmaoo

    display() {
      //GAIN HERE
      let gain = tmp["E"].buyables["21"].gain

          
        let locked = `Current Solinity generation: ${format(gain.div(10))}`
        if (!player.E.EclipseTier.gte(6)) locked = `<br> Gain +${format(gain)} Solinity Levels, Then Reset Solar Charge.
    Requires: 50 Solar Charge`

   return `
    <h2>Solinity #${format(player.E.Solinity)}</h2><br>                   
    ${locked}
    `
          
    
        },
        canAfford() {
          return player.E.SolarCharge.gte(50) && !player.E.EclipseTier.gte(6)
        },
        buy() {
          
        player.E.Solinity = player.E.Solinity.plus(tmp["E"].buyables[21].gain)
        player.E.SolarCharge = new Decimal(1)
       
        },

        gain() {
          let gain = new Decimal(1)
          gain = player.E.SolarCharge.root(10).sub(1)
          let EsolarBoost = player.E.Esolar.root(1.35)
          let chimeraBoost = player.E.Chimera.pow_base(1.15).clampMin(1)
          let Hour = new Date()
          if (getBuyableAmount("L",22).gte(2) && Hour.getHours() >= 12) gain = gain.times(1.5 ** (Hour.getHours() % 12))

          EsolarBoost = softcap(EsolarBoost, new Decimal(1000), 0.175)
          
            
          chimeraBoost = softcap(chimeraBoost, new Decimal(10000), 0.05)

           if (player.E.Esolar.gt(1)) gain = gain.mul(EsolarBoost)
          if (player.E.Chimera.gt(1)) gain = gain.mul(chimeraBoost)
            
         gain = softcap(gain, new Decimal(7.5e8), 0.05  )
         return gain
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
          
       
        let Hour = new Date()
        if (getBuyableAmount("L",22).gte(2) && Hour.getHours() >= 12) gain = gain.times(1.5 ** (Hour.getHours() % 12))
        gain = softcap(gain, new Decimal(10000), 0.15 )
                

        if (player.E.Solinity.lt(10)) gain = new Decimal(1)

       // let effect = new Decimal(1)
       // effect = effect.mul(player.E.Esolar).root(1.35)
       
          
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
                  
                  let Hour = new Date()
                  if (getBuyableAmount("L",22).gte(2) && Hour.getHours() >= 12) gain = gain.times(1.5 ** (Hour.getHours() % 12))

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

        let TillDarkText = `- Solar Light cap is boosted based on highest Levels ever reached 
         <br> 
         (Which is ${format(player.E.TopLVL.pow_base(1.75))} btw)
         <br> 
        - +0.03 to Solar Ray Gain Exponent <br>`

        if (player.L.TimeTillDarkActive == true) TillDarkText = `<h3 style="color:#7d0f9c">You're wasting time...<br></h3>`
        return `
        ${TillDarkText}
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
      let TillDarkText = `
      - Intricity and Polarized is Improved <br> Intricity: +0.05 -> +0.08 <br> Polarize: -5 -> -10 root base <br> 
      - Solar Rays's First hardcap is ^3 instead of ^2. but its formula is worse after ^2 <br>
      - ^1.15 Solarity Gain While inside Twilight check after the log nerf.`

      if (player.L.TimeTillDarkActive == true) TillDarkText = `<h3 style="color:#7d0f9c">Leave this page...<br></h3>`

      if (player.E.EclipseTier.gte(this.id))
      return `
      ${TillDarkText}      
      - Unlock Eclipsium <br>
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

    let TillDarkText = ``

    if (player.L.TimeTillDarkActive == true) TillDarkText = `<h3 style="color:#7d0f9c">Why are you here?</h3><br>`; else TillDarkText = `<br>- improve Twilight's Generation Exponent from ^0.75 -> ^0.9<br>`

    if (player.E.EclipseTier.gte(this.id))
    return `
    - QOL1: You can now Bulk Reset Center Points <br>
    - QOL2: Formality is no longer reset on Recontrol<br>
    - Unlock Solar Charge<br>
    ${TillDarkText}
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
    - QOL5: Heirarchy is no longer reset on Recontrol <br>
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
   
    let HeirarchyBonus = GetHeirarchyBonus()

    let TillDarkText = `- ^0.25 of Modifier score multiplies Solar Light cap<br>
    (which is ${format(player.C.Score.pow(0.25))} btw)<br>
    - Heirarchy's effect boost Solarity gain cap by ^0.33<br>
    (which is ${format(GetHeirarchyBonus().pow(0.33))} btw)<br>
    - Unlock ??? <br>`

    if (player.L.TimeTillDarkActive == true) TillDarkText = `<h3 style="color:#7d0f9c">...</h3><br>`


    if (player.E.EclipseTier.gte(this.id))
    return `
    ${TillDarkText}<br>
    - Twilight is no longer reset on Recontrol, and improve its generation even more from ^0.9 -> ^1.05 (+0.15)<br>
    <p style="color:red"> DEBUFF: Eclipse Tier Requirement scaling is worsened</p><br>
  
    ` 
    else return `???`
  },
  done() { return player.E.EclipseTier.gte(this.id) // && 

   },
  unlocked() {return player.E.EclipseTier.gte(4) },
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
    - QOL5: Generate 10% of Solinity gain per second. (Disables Solinity reset) <br>
    - QOL6: Highest solar light cap is kept on Recontrol and Restabilize. <br>
    - Dark and Light generation is raised to 1.25<br>
    - Unlock Solaris, the solar sun.<br>
    <p>Oh also, keep Eclarity on Future Eclipsifications. (and start with it) because at this point it's impossible to obtain.</p>
    ` 



    else return `???`
  },
  done() { return player.E.EclipseTier.gte(this.id) // && 

   },
  unlocked() {return player.E.EclipseTier.gte(5) },
  onComplete() {
    doPopup("msg","the eclipse grows weak...", "Game:",10)  

  },
}, 
7: {
  requirementDescription: "Eclipse Tier 7",
  effectDescription() {

    let Heirarchy = player.C.CenterPoints.pow_base(5).clampMin(1)

    if (player.E.EclipseTier.gte(this.id))
    return `
    - QOL7: passivly generate 1% of Esolar levels gain per second, (Locks Esolar reset)<br>
    - QOL8: you can now gain bulk Light and Dark checks<br>
    - QOL9: You now start Eclipsifications with Lunarity performed <br> 
    - Raise all ongoing Solarity cap multipliers by 1.15 After all bonuses and powers <br>
    - Unlock The Core.<br>
    <p>Oh also, keep all other Recontrol Upgrades on Eclipsifications, since you have been tortured enough<br>
    ` 



    else return `???`
  },
  done() { return player.E.EclipseTier.gte(this.id) // && 

   },
  unlocked() {return player.E.EclipseTier.gte(6) },
  onComplete() {
    doPopup("msg","The core begins to crumble...", "Game:",10)  

  },


},


},
            clickables: {      
              11: {
                  display() {
                    
                  let ready = `To get to the next Eclipse Tier: ${player.E.ETCost} Enlightenment Levels `
                   
                  if (player.E.ENLlevels.gte(player.E.ETCost) ) 
                    {
                      
                      
                  if (player.E.EclipseTier.eq(6)) ready = `You have reached the max Eclipse tier (For now...)`  
                     
                  else if (player.E.EclipseTier.eq(5) && Check("L",11).has)
                       ready = canGet     

                    } else ready = `You have reached the max Eclipse tier (For now...)`;
                   

                     
                   let unlocker = ``
                   if (player.E.Eclipsium.gte(1)) unlocker = `("The Factory" Content included)`
                   if (player.L.Lunarity) unlocker = `("The Factory" Content, and Lunaris included)`
                   if (Check("L",11).has) unlocker = `("The Factory" Content, and Lunaris content, excluding its progresional check upgrade)`
                      
                  let firstUnlock = ``


                   if (player.E.EclipseTier.lte(1)) firstUnlock = `Your first Eclipsication Unlocks a board in this tab that provides various boosts to help you get back to where you started! (after all nerfs) `
                  return `<h1>Eclipsify [LAYER 2 RESET]</h1><br> 
                    <h2>Sacrifice everything ${unlocker} to tame the eclipse.</h2>
                    ${firstUnlock}     

                    <h3>${ready}</h3>                  
                    `
      
                  },
                  onClick() {
                    
                    if (player.E.EclipseTier.gte(5)) player.E.upgrades = [11]; else player.E.upgrades = []

                    if (player.E.ENLlevels.gte(player.E.ETCost)) {
                    player.E.EclipseTier = player.E.EclipseTier.plus(1)
                    }


                    // reset ALL Layer Layer 2 progress
                    player.E.Eclipsium = player.E.Eclipsium.mul(0)
                    setBuyableAmount("E", 11, new Decimal(0) )
                    setBuyableAmount("E", 12, new Decimal(0) )
                    player.E.SolarCharge = new Decimal(1)
                    player.E.Solinity = new Decimal(1)
                    player.E.Esolar = new Decimal(1)
                    player.E.Chimera = new Decimal(1)
                    
                    
                    // Lunaris

                    player.L.Lunarity = false
                    player.L.LunarPower = new Decimal(1)
                    player.L.LunarEssence=  new Decimal(0)
                    player.L.LunarCheckUPG= new Decimal(0)
                    player.L.LightCheck= new Decimal(0)
                    player.L.DarkCheck= new Decimal(0)
                    player.L.Light= new Decimal(0), 
                    player.L.Dark= new Decimal(0),  
                    player.L.UnwantedChromia= new Decimal(0)
                    player.L.upgrades = []                                                   
                    setBuyableAmount("L", 11, new Decimal(0) )
                    setBuyableAmount("L", 12, new Decimal(0) )
                    setBuyableAmount("L", 13, new Decimal(0) )
                    setBuyableAmount("L", 21, new Decimal(0) )
                    setBuyableAmount("L", 22, new Decimal(0) )
                    setBuyableAmount("L", 23, new Decimal(0) )
                    setBuyableAmount("L", 31, new Decimal(0) )

                    // Solaris


                  layer2Reset(true)    

                  },
              canClick() {
                
                if (player.E.EclipseTier.eq(5) && Check("L",11).has && player.E.ENLlevels.gte(player.E.ETCost)) return true

                else if (player.E.ENLlevels.gte(player.E.ETCost) ) return true                     
                
                if (player.E.EclipseTier.eq(6)) return false

                },
              style() {
                
                
                return {
                      "width": "500px",
                      "height": "150px",
                      "border-radius": "0px",
                      "border": "10px",
                      "margin": "25px",
                      "text-shadow": "0px 0px 10px #000000",
                      
                    } 
                    
                  },   
                  
                  
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
            },

    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "...", onPress(){
          alert("...really?"); 
          if (player.secrets.really == false)
         {alert("why must you be so ignorant..."); 
          alert("you know... you have found one of the many secrets in this game i'll tell you that...");
          alert(".");
          alert("..");
          alert("...");
          alert("hope you fail. :)");
          alert("goodbye.");
           player.secrets.really = true
        }
        else {
          alert("didn't you just hear what i just said?")
          alert("cant you not read you moron")
          alert("i guess not.")
          }

         
        }
        
        
        },
    ],
    branches: ["GL"],
    layerShown(){ 
      hasCurrency = new Decimal(1)
      if ( player["E"].ENLlevels.gte(1) || player.points.gte(1e308) || player.E.EclipseTier.gte(1) )   return true; 
    }
}

)