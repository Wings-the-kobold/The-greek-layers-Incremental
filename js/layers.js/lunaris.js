addLayer("L", {
    name: "Lunaris", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🌔", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        Lunarity: false,
        LunarPower: new Decimal(1),
        LunarEssence: new Decimal(0),
        LunarCheckUPG: new Decimal(0), //to unlock ECT7
        LightCheck: new Decimal(0),
        DarkCheck: new Decimal(0),
        Light: new Decimal(0),
        Dark: new Decimal(0),   
    }},
    color: "#5F506F",
   // Can be a function that takes requirement increases into account
    row: 0,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
 

         update(diff) {


         

         let flow = player.E.TopLVL.div(10) // the base gain generation
         let Baseincrement = new Decimal(1) // speed


         if (player.L.Lunarity == true) player.L.LunarPower = player.L.LunarPower.plus(flow.times(Baseincrement.times(diff)))

//LPboost.mul(diff)


        },
         
        

    tabFormat: {
        "Him...": {      
              content: [
                
                
                ["display-text",
      function() { 

        let startFORGETTING = ``
        if (getClickableState("E",14)) startFORGETTING = `...these chains... help... they require... the shadows... to chip away...`

        let postLunarity = ``
        if (player.L.Lunarity == true) postLunarity = `
        Thank you... i will help you... I hope i will not become useless to you...`

        let postRestabalize = ``
        if (player.L.LunarEssence.gt(0)) postRestabalize = `
        <br>J-Just what do you think you are doing with my...`

        return `
        *You see a mysterious gray figure, chained into a wall, all bloody and covered with cuts and bruises* <br> 
        s-so i was not wrong then... t-there is someone around <br> 
        Y-You're constricted by the masses too huh?<br>
        O-Oh~ <h3>he</h3> does not like it when someone uses the expander... and breaches the limit <br>
        ...these chains? you want them off? you have to-... use your resourses... please... help... <br>
        ${startFORGETTING}
        ${postLunarity}
        ${postRestabalize}
        
        
        
        `

     }],
     

    // player["GL"].CenterPoints
     "blank",
     "blank",
                //"main-display",
                ["infobox","about"],
                
                 
                "clickables",
                
                "buyables",
             
                "blank",
               "blank",
               "upgrades",
                "blank",
                "blank",
                "blank",
                
            ],
            
        },
        "???": {
          content: [
            //"buyables",
          ],
          

        },
       
      },
     
// if (player["GL"].Solar_shards.gte(1))
    tooltip: () => `<p>Open Layer 2, Lunaris</p>`,
 upgrades: { 
 




          






            },

 buyables: { 
  11: {
    cost(x) {
      let scale = new Decimal(1.3)
      let base = new Decimal(3)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
      return Calculation;
    },
    display() {



      if (player.L.LunarEssence.gt(0)) return `<h2 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;">Ektrosy #${getBuyableAmount(this.layer, this.id)}</h2>
  <h3>  x${format(tmp[this.layer].buyables[this.id].effect)} to Plasmate
    ^${format(getBuyableAmount("L",11).add(1).log(10).div(5).clampMax(10),3)} of Plasmate's effect Increases the Solarity gain cap</h3>
    (which is ${format(buyableEffect("S",11).pow(getBuyableAmount("L",11).add(1).log(10).div(5)).clampMin(1))} btw)
 <h3> Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Center Points</h3>
  <p> Requires: At least 30 Lunar Power <p>
  <p> Note: this roots Center Points by 1.3 after purchase, you must have more than 1 Center point to buy this upgrade<p>
  ` 
  else return ``
    },
    canAfford() {
      return (player.C.CenterPoints.gte(this.cost()) && player.L.LunarEssence.gt(0) && player.L.LunarPower.gte(30) && player.C.CenterPoints.gt(1))
    },
    buy() {
      
      addBuyables(this.layer, this.id, 1);
      player.C.CenterPoints = player.C.CenterPoints.root(1.3)
    },
    effect() {
      let effect = decimalOne
      effect = getBuyableAmount(this.layer, this.id).pow_base(1.2)
      
      return effect;
    },
    style() {
      return (player.L.LunarEssence.gt(0)) ? 
                     {
                        "width": "320px",
                        "height": "130px",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "10px",
                        "text-shadow": "0px 0px 0px #000000",
                        "color" : "",
                    } : {
                    "width": "0px",
                    "height": "0px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color" : "",
                  }
    },
   
     
  },
  12: {
    cost(x) {
      let scale = new Decimal(1.5)
      let base = new Decimal(1)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
      return Calculation;
    },
    display() {



      if (player.L.LunarEssence.gt(0)) return `<h2 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;">Basity I #${getBuyableAmount(this.layer, this.id)}</h2>
  <h3>  x${format(tmp[this.layer].buyables[this.id].effect)} to Multiply</h3>
  <h3>  ^${format(getBuyableAmount("L",12).add(1).log(10).div(15),3)} of Multiply's Effect Increases the Solarity gain cap</h3>
  (which is ${format(buyableEffect("S",12).pow(getBuyableAmount("L",12).add(1).log(10).div(15)))} btw)
  <h3> Cost: ${format(tmp[this.layer].buyables[this.id].cost)} Lunar Essence</h3>
  <p> Requires: At least 30 Lunar Power <p>
  <p> Note: this roots Lunar Essence and Lunar Power by 1.3 instead of subtracting amount<p>
  ` 
  else return ``
    },
    canAfford() {
      return player.L.LunarEssence.gte(this.cost()) && player.L.LunarEssence.gt(0) && player.L.LunarPower.gte(30)
    },
    buy() {
      addBuyables(this.layer, this.id, 1);
      player.L.LunarPower = player.L.LunarPower.root(1.3).round()
      player.L.LunarEssence = player.L.LunarEssence.root(1.3).round()
    },
    effect() {
      let effect = decimalOne
      effect = getBuyableAmount(this.layer, this.id).pow_base(1.2)
      
      return effect;
    },
    style() {
      return (player.L.LunarEssence.gt(0)) ? 
                     {
                        "width": "320px",
                        "height": "130px",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "10px",
                        "text-shadow": "0px 0px 0px #000000",
                        "color" : "",
                    } : {
                    "width": "0px",
                    "height": "0px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color" : "",
                  }
    },
   
     
  },
  




 },
            

            clickables: {
             

                // DOWN HERE IS A CONVERTARY RESET.

            11: {
                    display() {
                      






                      if (player.L.Lunarity == false) return `
                       <h2>Lunarity [ONE TIME RESET] </h2><br> <br>
                      Reset Everything Recontrol does as well as Solar Charge, Solonity, Esolar, Chimera, Expansion I, Best Enlightenment Levels, and the first three recontrol upgrades and Eclipsium to unlock new content(One time reset) <br> Requires: The Forgotton... Check upgrade completed     
                       `
                      else return ``







                    },
                    onClick() {
                     
                    //scaling for this is: (2000 * 1.35^x) / Reduced requirements
                     
                      
                     
                      
                      player.E.SolarCharge = new Decimal(1)
                      player.E.Solinity = new Decimal(1)
                      player.E.Esolar = new Decimal(1)
                      player.E.Chimera = new Decimal(1)
                      
                      player.C.checkupgrades = new Decimal(0)
                      player.E.upgrades = [14]
                      player.E.Eclipsium = new Decimal(0)
                      player.E.TopLVL = new Decimal(0)
                      player.L.Lunarity = true
                      layer2Reset()

                    },
                canClick() {
  
                  return (player.E.forgotton && player.L.Lunarity == false) //this is for later
  
  
  
                },
                style() { 
                  
                  
                  return {
                        "width": "300px",
                        "height": "100px",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "0px",
                        "text-shadow": "0px 0px 10px #000000",
                        "color" : "",
                      }
  
                },
                unlocked() {if (player.L.Lunarity == false) return true},
                // END OF CLICKABLE CODE



                




            },

            21: {
              display() {
                
                
                let Display = ``
                
                
                let c1 = ``
                
                let c1debufftext = ``
                let c2 = ``
                let c1effect = decimalOne.plus(player.L.LunarPower.log(5)).pow(player.L.LunarPower.log(2)).clampMin(1)
                let c1debuff = decimalOne.plus(player.L.LunarPower.sub(100).log(7.5)).pow(player.L.LunarPower.sub(100).log(4)).clampMin(1)

                if (player.L.LunarPower.gte(100)) c1debufftext = `<h4 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;">Lunar Instability: Lunar Abnormality is dividing Solarity gain by ${format(c1debuff)}</h4>`

                c1 = ``
                if (player.L.LunarPower.gt(0)) c1 = `Lunar Abnormality multiplies solarity gain cap by ${format(c1effect)} <br>`
                
                c2 = ``
                if (player.L.LunarEssence.gt(0)) c2 = `<h3 style="color: #353852; text-shadow: 0px 0px 2px #ffffff";>Lunar Essence: ${format(player.L.LunarEssence)}.</h3>`








                // display everything
                if (player.L.Lunarity == true) 
                    return `
                    <h1 style="color: #353852; text-shadow: 0px 0px 2px #ffffff";> Lunaris Basic Stat Viewer </h1>
                    <h3 style="color: #353852; text-shadow: 0px 0px 2px #ffffff";> Lunar Abnormality: ${format(player.L.LunarPower)} (+${format(player.E.TopLVL.div(10))}/sec). 
                    ${c1}${c1debufftext}
                    
                    ${c2}     
                    
                    
                    </h3> `

                    else return ``
              
  
              },

              style() { 
                let dt = 1
                let maxX = 355
                
                


                return (player.L.Lunarity ) ? 
                   {
                      "width": "355px",
                      "height": "125px",
                      "border-radius": "0px",
                      "border": "0px",
                      "margin": "15px",
                      "text-shadow": "0px 0px 0px #000000",
                      "color" : "",
                  } : {
                  "width": "0px",
                  "height": "0px",
                  "border-radius": "0px",
                  "border": "0px",
                  "margin": "0px",
                  "text-shadow": "0px 0px 10px #000000",
                  "color" : "",
                }
            
              
              },
          
                 //unlocked(){ return player.L.Lunarity}
              },
            31: {
                display() {
                  
                  let gain = new Decimal(1)
                  gain = player.L.LunarPower.clampMin(1).log(5)




                  let resetText = `[First Restabilize will Unlock 2 new Buyables]`
                  if (player.L.LunarEssence.gt(0)) resetText = ``

                  if (player.L.LunarPower.gte(100) || player.L.LunarEssence.gt(0)) return `<h2> RESTABILIZATION [MODIFIED RECONTROL RESET 1]</h2> 
                   Gain ${format(gain)} Lunar Essence, Then Reset everything recontrol does as well as Best Enlightenment levels and Lunar Power 
                    to reset you need: 100 Lunar Power
                    ${resetText}
                  `
                  
                },
                
                onClick() {
                  let gain = new Decimal(1)
                  gain = player.L.LunarPower.log(5).clampMin(1)
                  



                player.L.LunarPower = new Decimal(0)
                player.L.LunarEssence = player.L.LunarEssence.plus(gain)
                EclipsiumReset()
                player.E.TopLVL = new Decimal(0)


                },

            canClick() {if (player.L.LunarPower.gte(100)) return true},

                style() { 
                   
                
                    
                  return (player.L.LunarPower.gte(100) || player.L.LunarEssence.gt(0)) ? 
                     {
                        "width": "400px",
                        "height": "40px",
                        "border-radius": "0px",
                        "border": "0px",
                        "margin": "0px",
                        "text-shadow": "0px 0px 0px #000000",
                        "color" : "",
                    } : {
                    "width": "0px",
                    "height": "0px",
                    "border-radius": "0px",
                    "border": "0px",
                    "margin": "0px",
                    "text-shadow": "0px 0px 10px #000000",
                    "color" : "",
                  }
                
                
                },
                
  
             
                    
                   //unlocked() {return player.L.Lunarity}, 
                },



             
            },
          
           

    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "", description: "no.", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["E"],
    layerShown(){ 
      
      if ( hasMilestone("E",5) ) return true; else return false; 

    }
}

)