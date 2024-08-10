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
        Light: new Decimal(0), //base generation: 1.75^LightCheck.
        Dark: new Decimal(0),  //base generation: 1.75^DarkCheck. 
        UnwantedChromia: new Decimal(0),
    }},
    color: "#5F506F",
   // Can be a function that takes requirement increases into account
    row: 0,
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
 

         update(diff) {
          let BaseLightIncrement = player.L.LightCheck.pow_base(1.5)
          if (player.L.UnwantedChromia.gt(1)) BaseLightIncrement = BaseLightIncrement.div(player.L.UnwantedChromia.root(10))
           BaseLightIncrement = BaseLightIncrement.times(diff)
          
          let BaseDarkIncrement = player.L.DarkCheck.pow_base(1.5)
          if (player.L.UnwantedChromia.gt(1)) BaseDarkIncrement = BaseDarkIncrement.div(player.L.UnwantedChromia.root(10))
           BaseDarkIncrement = BaseDarkIncrement.times(diff)

        
         if (player.L.DarkCheck.gte(1)) player.L.Dark = player.L.Dark.plus(BaseDarkIncrement)   
         if (player.L.LightCheck.gte(1)) player.L.Light = player.L.Light.plus(BaseLightIncrement)
         

         if (player.L.Light.gte(player.L.LightCheck.pow_base(1.75).mul(100)) || player.L.Dark.gte(player.L.DarkCheck.pow_base(1.75).mul(100)) ) 
          if (getClickableState("L",41) || getClickableState("L",42)) player.L.UnwantedChromia = player.L.UnwantedChromia.plus(player.L.LightCheck.mul(player.L.DarkCheck).mul(diff))


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

        let PostLight= ``
        if (player.L.LightCheck.gte(1) && player.L.DarkCheck.gte(1)) PostLight = `
        <br>...What the hell? what is this~ What are you doing user???? with my power?`


        return `
        *You see a mysterious gray figure, chained into a wall, all bloody and covered with cuts and bruises* <br> 
        s-so i was not wrong then... t-there is someone around <br> 
        Y-You're constricted by the masses too huh?<br>
        O-Oh~ <h3>he</h3> does not like it when someone uses the expander... and breaches the limit <br>
        ...these chains? you want them off? you have to-... use your resourses... please... help... <br>
        ${startFORGETTING}
        ${postLunarity}
        ${postRestabalize}
        ${PostLight}
        
        
        `

     }],
     

    // player["GL"].CenterPoints
     "blank",
     "blank",
                //"main-display",
                ["infobox","about"],

                ["clickable",11],
                ["clickable",21],
                ["clickable",31],
                
                ["row", [
                  ["clickable",41],
                  ["clickable",42],
                ]],
                
                
                ["row", [
                  ["buyable",11],
                  ["buyable",12],
                ]],
             
                "blank",
               "blank",
               
                "blank",
                "blank",
                "blank",
                
            ],
            
        },
        "???" : {
          content: [
            //"buyables",
          "upgrades",
          ["display-text",
            function() { 
      
             
              const time = new Date();
              const hours = time.getHours() % 12;
              const am_pm = time.getHours() < 12;
              const minutes = time.getMinutes();
              const seconds = time.getSeconds();
              
              //if (time.getHours() > 12) hours = hour
              return `The Solar Clock: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${am_pm ? '(Day)' : '(Night)'}`
      
           }],
           "blank",
          ["bar", 11],
          ["bar", 12],
          ["row", [
            ["clickable",51],
            ["clickable",52],
          ]],
          
          ["row", [
            ["buyable",21],
            ["buyable",22],
          ]],
        ],       

        },
       
      },
      bars: {
              11: {   
                  direction: RIGHT,
                  width: 500,
                  height: 60,
                  //textStyle: {"color" : ""},
                  borderStyle: {"color" : "#707CD3"},                  
                  fillStyle() {
                    let Time = new Date()
                    if (Time.getHours() >= 12) return {"background-color" : "#707CD3"}; else return {"background-color" : "#DFE804"}
                  },
                  baseStyle() {
                    let Time = new Date()
                    if (Time.getHours() >= 12) return {"background-color" : "#1A0031"}; else return {"background-color" : "#494C00"}
                  },
                  textStyle() {
                    let Time = new Date()
                    if (Time.getHours() >= 12) return {"color" : "#0F1752"}; else return {"color" : "#ABA250"}
                  },
                  progress() { 
                    let Time = new Date()
                    maxHours = 24
                    let currTimeHours = Time.getMinutes()
                     return currTimeHours/60
},
                  display:()=>`<br>Hour: ${new Date().getHours() % 12} / 12`,

                
                    
                      style() {
                        return {
                          
                          "margin": "0px",
                          "text-shadow": "0px 0px 0px #000000",
                          "color" : "363055",
                      
                      }

                      },

                     //let currTimeHours = new Decimal(Time.getHours() - 12)

              },
              12: {
                direction: RIGHT,
                width: 500,
                height: 60,
                textStyle() {
                  let Time = new Date()
                  if (Time.getHours() >= 12) return {"color" : "#0F1752"}; else return {"color" : "#ABA250"}
                },
                //textStyle: {"color" : "#323361"},
                //baseStyle: {"background-color" : "#1A0031"},
                borderStyle: {"color" : "#707CD3"},
                fillStyle() {
                  let Time = new Date()
                  if (Time.getHours() >= 12) return {"background-color" : "#707CD3"}; else return {"background-color" : "#DFE804"}
                },
                baseStyle() {
                  let Time = new Date()
                  if (Time.getHours() >= 12) return {"background-color" : "#1A0031"}; else return {"background-color" : "#494C00"}
                },
                //8D9300
                progress() { 
                  let Time = new Date()
                  maxMinutes = new Decimal(59)
                  
                  let currTimeMinutes = new Decimal(Time.getSeconds())
                   return currTimeMinutes.div(59)
},
                display() {
                  let Time = new Date()
                  maxMinutes = 59
                  
                  let currTimeMinutes = Time.getMinutes()
                   return `Minutes: ${currTimeMinutes} / ${maxMinutes} (${format((currTimeMinutes/maxMinutes)*100,2)}%)`},

              
                
                   

                    },
  
                   //let currTimeHours = new Decimal(Time.getHours() - 12)

            },
          
// if (player["GL"].Solar_shards.gte(1))
    tooltip: () => `<p>Open Layer 2, Lunaris</p>`,
 upgrades: { 
 
  11: {
    fullDisplay() {
     
      let showReq = `Requires: 14 Lunar Essence and Basity #8`
      if (hasUpgrade("E",this.id)) showReq = ``
        return `<h2>Darken</h2> <br>
        Lunar Essence Boosts Solinity
        ${showReq}
        `
    },
    unlocked() {
      if (player.L.LightCheck.gte(2)) return true
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
      
      if (hasUpgrade("L",11)) effect = effect.mul(player.L.LunarEssence.root(1.35))
      return effect

    },
    canAfford() {
      return player.L.LunarEssence.gte(14) 
    },
    pay() {
     player.L.LunarEssence = player.L.LunarEssence.root(5)
      
    }

},



          






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
  

  //DET1 and NET1
  21: {
    cost(x) {
      let scale = new Decimal(1.5)
      

      let base = new Decimal(10)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))

      //if (hasUpgrade("GL",11)) Calculation = Calculation.pow(0.9).div(3)

      

      if (getBuyableAmount(this.layer,this.id).lt(5) && player.C.CenterPoints.lte(0) && player.GL.points.lte(0) && player.E.EclipseTier.lte(0)) Calculation = Calculation.div(1.1)
      return Calculation;
    },
    
    unlocked() {
      if (player["S"].points.gte(1) || player["GL"].Solar_Shards.gte(1) || getBuyableAmount("S",11).gte(1)) return true

    },
    display() {
      

      let DT = ``
      if (getBuyableAmount(this.layer,this.id).eq(0)) DT = `Requires:
      - 30 Center Points
      - 1e105 Solar Rays
      - Hour must be Day 
      `; else if (getBuyableAmount(this.layer,this.id).eq(1)) DT = `Requires:
      - 1,000,000 Solinity
      - 1e120 Solar Rays
      - Phaser #70
      - Hour must be Day 
      - Must have NT1
      `
      

      return `<h2>Unlock DT${getBuyableAmount(this.layer,this.id).plus(1)}</h2>
  <h3>${DT}</h3>
(Divides Light Amount by a root of 3)
  `
    },
    canAfford() {
      const currTime = new Date()

      if (getBuyableAmount(this.layer,this.id).eq(0) 
      && (player.C.CenterPoints.gte(30) 
      && player.S.points.gte(1e105) 
      && currTime.getHours < 12)
      ) return true;

      else if (getBuyableAmount(this.layer,this.id).eq(1) 
        && player.S.points.gte(1e120) 
        && currTime.getHours < 12 
        && getBuyableAmount("GL",11).gte(70) 
        && getBuyableAmount("L",22).eq(1)
        && player.E.Solinity.gte(1000000)
      ) return true



    },
    buy() {
      if (player.L.points.gte(this.cost) && player.C.checkUpgrades.lt(1)) player.S.points = player.S.points.minus(this.cost());
      addBuyables(this.layer, this.id, 1);
    },

    
    
    effect() {
      let effect = decimalOne
      let base = new Decimal(3)
      if (getBuyableAmount("GL", 11).gte(1)) base = base.mul(buyableEffect("GL", 11).plus(1))
      effect = effect.mul(getBuyableAmount(this.layer, this.id)).mul(base)
      if (player.C.EffectorTier.gte(3)) effect = effect.mul(player.S.points.log(9).clampMin(1))
     // if (hasMilestone("E",1)) effect = effect.pow(0.949)
      if (getBuyableAmount("L",11).gte(1)) effect = effect.mul(buyableEffect("L",11))

      if (getClickableState("C", 21)) effect = effect.pow(0.666)
      if (getClickableState("C", 23)) effect = effect.clampMin(0.1).log(12)
      if (hasUpgrade("E",13)) effect = effect.mul(upgradeEffect("E",13))
      return effect.clampMin(0);
    },
    style() {
      return {
        "width": "225px",
        "height": "155px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
   
     
  },
  22: {
    cost(x) {
      let scale = new Decimal(1.35)
      let base = new Decimal(5)
      let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
      if (hasUpgrade("GL",11)) Calculation = Calculation.pow(0.9).div(3)
      if (getBuyableAmount(this.layer,this.id).lt(5) && player.C.CenterPoints.lte(0) && player.GL.points.lte(0) && player.E.EclipseTier.lte(0)) Calculation = Calculation.div(1.1)
      return Calculation;
    },
    buyMax() {
      let scale = new Decimal(1.34);
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
      //if (player["S"].points.gte(1) || player["GL"].Solar_Shards.gte(1) || getBuyableAmount("S",11).gte(1)) return true
      return true
    },
    display() {
      let NT = ``
      if (getBuyableAmount(this.layer,this.id).eq(0)) NT = `Requires:
      - 30 Center Points
      - 1e9 Solar Light
      - Hour must be Night
      - Dark Check #1 
      `; else if (getBuyableAmount(this.layer,this.id).eq(1)) NT = `Requires:
      - 1e12 Solar Light
      - Plasmate #812
      - Hour must be Night 
      - Must have DT1
      `

      return `<h2>Unlock NT${getBuyableAmount(this.layer,this.id).plus(1)}</h2>
     <h3>${NT}</h3>
  (Divides Dark amount by a root of 3)
  `
    },
    canAfford() {
      const currTime = new Date()

      if (getBuyableAmount(this.layer,this.id).eq(0) 
      && (player.C.CenterPoints.gte(30) 
      && player.GL.Solarlight.gte(1e12) 
      && currTime.getHours < 12)
      ) return true;

      else if (getBuyableAmount(this.layer,this.id).eq(1) 
        && player.S.points.gte(1e120) 
        && currTime.getHours < 12 
        && getBuyableAmount("GL",11).gte(70) 
        && getBuyableAmount("L",22).eq(1)
        && player.E.Solinity.gte(1000000)
      ) return true
    },
    buy() {
      if (player.S.points.gte(this.cost) && player.C.checkUpgrades.lt(1)) player.S.points = player.S.points.minus(this.cost());
      addBuyables(this.layer, this.id, 1);
    },

    
    
    effect() {
     
    },
    style() {
      return {
        "width": "225px",
        "height": "155px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
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

            // Lunarity Displays
            21: {
              display() {
                
                
                let Display = ``
                
                
                let c1 = ``
                
                let c1debufftext = ``
                let c2 = ``

                let c3 = ``

                let c4 = ``
                let c5 = ``
                let c1effect = decimalOne.plus(player.L.LunarPower.log(5)).pow(player.L.LunarPower.log(2)).clampMin(1)
                let c1debuff = decimalOne.plus(player.L.LunarPower.sub(100).log(7.5)).pow(player.L.LunarPower.sub(100).log(4)).clampMin(1)

                if (player.L.LunarPower.gte(100)) c1debufftext = `<h4 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;">Lunar Instability: Lunar Abnormality is dividing Solarity gain by ${format(c1debuff)}</h4>`

                c1 = ``
                if (player.L.LunarPower.gt(0)) c1 = `Lunar Abnormality multiplies solarity gain cap by ${format(c1effect)} <br>`
                
                c2 = ``
                if (player.L.LunarEssence.gt(0)) c2 = `<h3 style="color: #353852; text-shadow: 0px 0px 2px #ffffff";>Lunar Essence: ${format(player.L.LunarEssence)}.</h3>`
                
                if (player.L.Dark.gt(0)) c3 = `<h3 style="color: #160a21; text-shadow: 0px 0px 2px #ffffff";>Dark: ${format(player.L.Dark)} boost to Solarity Gain Cap and ${format(player.L.Dark.pow(0.3))} boost to Solarity`
//

                if (player.L.Light.gt(0)) c4 = `<h3 style="color: #160a21; text-shadow: 0px 0px 2px #ffffff";>Light: ${format(player.L.Light)} boost to Solarity Gain Cap and ${format(player.L.Light.pow(0.25))} boost to Solar Rays`
                
                if (player.L.UnwantedChromia.gt(0) && ( getClickableState("L",41) || getClickableState("L",42) ) ) c5 = `<h4 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;"> Unwanted Chromia: Divides Light and Dark generation by ${format(player.L.UnwantedChromia.log(10))}</h4>`







                // display everything
                if (player.L.Lunarity == true) 
                    return `
                    <h1 style="color: #353852; text-shadow: 0px 0px 2px #ffffff";> Lunaris Basic Stat Viewer </h1>
                    <h3 style="color: #353852; text-shadow: 0px 0px 2px #ffffff";> Lunar Abnormality: ${format(player.L.LunarPower)} (+${format(player.E.TopLVL.div(10))}/sec). 
                    ${c1}${c1debufftext}
                    
                    ${c2}     
                    ${c3}
                    ${c4}
                    ${c5}
                    </h3> `

                    else return ``
              
  
              },

              style() { 
                let dt = 1
                let maxX = 355
                
                


                return (player.L.Lunarity ) ? 
                   {
                      "width": "435px",
                      "height": "160px",
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
              //Restabilize
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
            

                // LIGHT AND DARK DILATATION
            41: {
                  display() {
                    let text = ``
                    let textActive = ``
                    let rewardDisplay = ``


                    setBaseRequirements = new Decimal(1e15)
                    
                    setBaseRequirements = setBaseRequirements.mul(player.L.LightCheck.pow_base(15.75))




                    if (!getClickableState(this.layer,this.id) ) text = `Enter Lightness, where the base Solarity cap starts at 1 instead of e308.  

                    - Upon entering, reset both Light and Dark on enter. 
                    - Upon reaching 100 light. Unwanted Darkness is generated which divides light generation.`
                    else if (!getClickableState("L", this.id) && player.L.LightCheck.gte(1)) text = `Enter Lightness again...`
                    else text = `Goal: ${format(setBaseRequirements)} Solar Rays`

                    let GetReady = ``
                    if (player.S.points.gte(setBaseRequirements)) GetReady = `You can get +1 Level on exit!`

                    if (getClickableState("L", this.id)) textActive = `[ACTIVE] <br>${GetReady}`
                   
                   
                   
                    if (player.L.LightCheck.gte(1)) rewardDisplay = `Start Generating Light. They increase Solarity gain cap equal to its amount.`
      
                    return `
                    <h2>Light Check #${player.L.LightCheck}</h2>
                    ${textActive}              
                    ${text} 
                    ${rewardDisplay}
                    <br>`
                    
      
                  },
                  onClick() {
                    
                    BaseRequirements = new Decimal(1e15)
                    
                    BaseRequirements = BaseRequirements.mul(player.L.LightCheck.pow_base(13.54198))

                  if (getClickableState(this.layer, this.id) && player.S.points.gte(BaseRequirements)) { player.L.LightCheck = player.L.LightCheck.plus(1) }   
                  if (!getClickableState(this.layer, this.id)) {
                    EclipsiumReset() 
                    player.L.Light = new Decimal(0)
                    player.L.Dark = new Decimal(0)}
      
                  const currentState = getClickableState("L", this.id)
                  setClickableState(this.layer, this.id, !currentState)
                  player.L.UnwantedChromia = new Decimal(0)
      
      
      
                  },
              canClick() {
                BaseRequirements = new Decimal(1e15)
                    
                BaseRequirements = BaseRequirements.mul(player.L.LightCheck.pow_base(13.54198))




              //check if it has the check upgrade or is not in the check upgrade
              if (getClickableState(this.layer,this.id) == false && getClickableState("L",42) == false) 
              {
              return true
               } 
              // check if its inside the check upgrade  
              else if (getClickableState(this.layer,this.id) == true)
              {                                                                       
                //check if it meets the requirements to complete the upgrade check.
                 return true                                              
              }                      
              },  
              unlocked() {
                if (getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(6)) return true
                else false
              },
                  
              style: {
                width: "200px",
                height: "200px",
                borderRadius: "0px",
                border: "0px",
                margin: "12px",
                textShadow: "0px 0px 0px #000000",
                backgroundColor: "#e3d08a",
                color: "#160a21",
              },


              },
            
            42: {
                display() {
                  let text = ``
                  let textActive = ``
                  let rewardDisplay = ``


                  setBaseRequirements = new Decimal(1e15)
                  
                  setBaseRequirements = setBaseRequirements.mul(player.L.DarkCheck.pow_base(15.75))




                  if (!getClickableState(this.layer,this.id) ) text = `Enter Darkness, where Solar rays is always capped to 1e15. You generate Dark Essence instead based on your solarity generation. 

                  - Upon entering, reset both Light and Dark on enter. 
                  - Upon reaching 100 Dark. Unwanted Lightness is generated which divides dark generation.`
                  else if (!getClickableState("L", this.id) && player.L.DarkCheck.gte(1)) text = `Enter Darkness again...`
                  else text = `Goal: ${format(setBaseRequirements)} Dark Essence`

                  let GetReady = ``
                  if (player.points.gte(setBaseRequirements)) GetReady = `You can get +1 Level on exit!`

                  if (getClickableState("L", this.id)) textActive = `[ACTIVE] <br>${GetReady}`
                 
                 
                 
                  if (player.L.DarkCheck.gte(1)) rewardDisplay = `Start Generating Dark. They Boost Solarity gain cap and Solarity gain equal to its amount.`
    
                  return `
                  <h2>Dark Check #${player.L.DarkCheck}</h2>
                  ${textActive}              
                  ${text} 
                  ${rewardDisplay}
                  <br>`
                  
    
                },
                onClick() {
                  
                  BaseRequirements = new Decimal(1e15)
                  
                  BaseRequirements = BaseRequirements.mul(player.L.DarkCheck.pow_base(13.54198))

                if (getClickableState(this.layer, this.id) && player.points.gte(BaseRequirements)) { player.L.DarkCheck = player.L.DarkCheck.plus(1) }   
                if (!getClickableState(this.layer, this.id)) {
                  EclipsiumReset() 
                    player.L.Light = new Decimal(0)
                    player.L.Dark = new Decimal(0)
                    
                }
    
                const currentState = getClickableState("L", this.id)
                setClickableState(this.layer, this.id, !currentState)
                
    
                player.L.UnwantedChromia = new Decimal(0)
    
    
                },
            canClick() {
              BaseRequirements = new Decimal(1e15)
                  
              BaseRequirements = BaseRequirements.mul(player.L.DarkCheck.pow_base(13.54198))




            //check if it has the check upgrade or is not in the check upgrade
            if (getClickableState(this.layer,this.id) == false && !getClickableState("L",41)) 
            {
            return true
             } 
            // check if its inside the check upgrade  
            else if (getClickableState(this.layer,this.id) == true)
            {                                                                       
              //check if it meets the requirements to complete the upgrade check.
              return true                                             
            }        
            
            
            
           
            },  
            unlocked() {
              if (getBuyableAmount("L",11).gte(10) && getBuyableAmount("L",12).gte(6)) return true
              else false
            },
                
            style: {
              width: "200px",
              height: "200px",
              borderRadius: "0px",
              border: "0px",
              margin: "12px",
              textShadow: "0px 0px 0px #000000",
              backgroundColor: "#160a21",
              color: "#e3d08a",
            },


            },




            //Displays for DET1 and NET2
          51: {
              display() {
                Hour = new Date()
                let e1 = ``;let e2 = ``;let e3 = ``;let e4 = ``;let e5 = ``
                
                //Tier 1
                if (Hour.getHours() <= 12) e1 = `${(Hour.getHours() % 12) / 100}`; else e1 = `0.00`;
                if (Hour.getHours() <= 12) e2 = `${(1.15 ** Hour.getMinutes()) }`; else e2 = `1`
                if (Hour.getHours() <= 12) e3 = `${Hour.getMinutes() * (1.5 ** (Hour.getHours() % 12))}`; else e3 = `1`
                //* 
                //tier 2 
                let DayT1 = ``
                let DayT2e = ``
                if (true) DayT1 = `
                <h2>Day, Tier 1</h2>
                <h3> H-1: Increase Solar Ray Gain exponent by +${format(e1)}</h3>
                <h3> M-1: Multiply Solarity Gain and its cap by ${format(e2)}</h3>
                <h3> MH-1: Boost The Solar Light cap by ${format(e3)} and its generation by ${format(e3 ** 0.7)}</h3>
                `

                return `<h2>Day time Effects</h2> 
                <h3>(Day Time Exclusive):</h3>
 
                ${DayT1}
                                
                `
              },
              unlocked() {
                 
                //if (player.L.LightCheck.gte(2)) return true
                return true
              },
          canClick() {
            //if (player.C.CenterPoints.gte(Decimal.pow(2, player.C.EffectorTier))) return true
            return false


          },
          style() { return {
                  "width": "225px",
                  "height": "500px",
                  "border-radius": "0px",
                  "border": "10px",
                  "margin": "2px",
                  "text-shadow": "0px 0px 10px #000000",
                  
                }
              },   
              
              
          },
          52: {
            display() {
              Hour = new Date()
                let e1 = ``;let e2 = ``;let e3 = ``;let e4 = ``;let e5 = ``
                
                //Tier 1
                if (Hour.getHours() >= 12) e1 = `${(Hour.getHours() % 12) / 100}`; else e1 = `0.00`;
                if (Hour.getHours() >= 12) e2 = `${1.5 ** (Hour.getMinutes() / 3 ) ** 1.04 }`; else e2 = `1`
                if (Hour.getHours() >= 12) e3 = `${1 + (Hour.getMinutes() * (1 + Hour.getHours() % 12) / 1559.9999999)}`; else e3 = `1`
                //* 
                //tier 2 
                let NT1 = ``
                let NT2e = ``
                if (true) NT1 = `
                <h2>Night, Tier 1</h2>
                <h3> H-1: Decrease Center Points cost exponent by -${format(e1)} (^1 -> ^${1 - e1})</h3>
                <h3> M-1: Increase Solar light Gain cap by ${format(e2)}</h3>
                <h3> MH-1: Raise The Modifier Score by ${format(e3,3)}</h3>
                `
            
               return `<h2>Night time Effects</h2> 
               <h3>(Night Time Exclusive):</h3> 
               
               ${NT1}
               
               `
            },
            unlocked() {
               
              //if (player.L.LightCheck.gte(2)) return true
              return true
            },
        canClick() {
          //if (player.C.CenterPoints.gte(Decimal.pow(2, player.C.EffectorTier))) return true
          return false


        },
        style() { return {
                "width": "225px",
                "height": "500px",
                "border-radius": "0px",
                "border": "0px",
                "margin": "2px",
                "text-shadow": "0px 0px 10px #000000",
                
              }
            },   
            
            
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