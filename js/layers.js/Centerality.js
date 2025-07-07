addLayer("C", {
    position: 1, 
    startData() { return {
        unlocked: true,
        CenterPoints: new Decimal(0),
       
        Score: new Decimal(0),
        Highest: new Decimal(0),
        requirement: new Decimal(2000),
        EffectorTier: new Decimal(0), 
        checkUpgrades: new Decimal(0), //well, uh. since these are removed, I should give a boost to removed content
        hasFormality: false,
        hasHeirarchy: false,
        hasTwilight: false,  
        activeCheck: "",
    
    }},
    color: "#1f2129",
   
   symbol() {
    return `
    <p><img src="resources/Centrality.png" style="width:80px;height:80px;",></p>`
    },
    
   update(diff) {

    if (hasUpgrade("GL",21)) player["GL"].Time = player["GL"].Time.plus(decimalOne.times(diff)).clampMin(0)

    let ScoreBoost = new Decimal(1)
    Hour = new Date()

    if (Check("E",11).has) ScoreBoost = ScoreBoost.mul(getBuyableAmount("GL",11).clampMin(1))
    if (getBuyableAmount("L",21).gte(1) && Hour.getHours() >= 12) ScoreBoost = ScoreBoost.pow(1 + (Hour.getMinutes() * (1 + Hour.getHours() % 12) / 1000)) //buff this if DT is still too op
    if (getBuyableAmount("L",21).gte(3) && Hour.getHours() <= 12) ScoreBoost = ScoreBoost.mul(1.12 ** Hour.getMinutes() * (1.3 ** (Hour.getHours() % 12)))

 // 1.12^M -> 1.35^H

    if (hasUpgrade("GL",31) ) player.C.Score = getBuyableAmount("S", 11).mul(getBuyableAmount("S", 12)).mul(ScoreBoost)
    if (player["E"].activeCheck == "Forgotton") player.C.Score = player.C.Score.pow(0.8)
   


    if (player.C.CenterPoints.lte(0)) player.C.CenterPoints = player.C.CenterPoints.mul(0)
    if (player.C.Score.gte(player.C.Highest)) player.C.Highest = player.C.Score

    //if (tmp["C"].hasFormality == undefined) {tmp["C"].hasFormality = false}

    fix(tmp["C"].hasFormality)
    fix(tmp["C"].hasHeirarchy)
    fix(tmp["C"].hasTwilight)
    

    let Divisor = new Decimal(1)

    if (hasMilestone("E",1)) Divisor = Divisor.mul(player.E.EclipseTier.pow_base(1.25))
    if (hasUpgrade("L",13)) Divisor = Divisor.mul(upgradeEffect("L",13))



    Hour = new Date()
    let exponent = 0
    let reductions = new Decimal(1)
    if (Hour.getHours() >= 12 && getBuyableAmount("L",22).gte(1)) exponent = 1 - (Hour.getHours() % 12) / 100; else exponent = 1

    player.C.requirement = player.C.CenterPoints.clampMin(1).pow_base(1.35).times(2000).div(Divisor).pow(exponent)
  }, 
  

    tabFormat: {
        "The Effector": {      
              content: [             
       ["display-text",
     function() { 
      let FourMTD = ``
      
      if (player.L.activeCheck == "TimeTillDark") FourMTD = `/<h3 style="color: #060114;"> 40 Dark Energy</h3>`; else FourMTD = `Center Points`


      if (player["C"].CenterPoints.gte(1) || player.C.EffectorTier.gte(1) || player.L.activeCheck == "TimeTillDark")
       return `You have ${format(player["C"].CenterPoints )} ${FourMTD} `
  
     }],
       ["display-text",
     function() { 
    



      let HeirarchyBoost = ``

      let forgotten = ``; if (player["E"].activeCheck == "Forgotton") forgotten = `<h3 style="color: #170f1c; text-shadow: 0px 0px 20px #ffffff;"> ${format(player["C"].Score )} Emptyness...? </h3>`; else forgotten = `${format(player["C"].Score )} / ${format(player.C.requirement)} Modifier Score.`

      let newBaseText = ``
      if (player.Sol.CPBoost.gt(0 )) newBaseText = `Thanks to aperature, Heirarchy's base is 5 -> ${format(player.Sol.CPBoost.plus(5))}`
      
      if (player["C"].hasHeirarchy) HeirarchyBoost = `Thanks to Heirarchy, Solarity is being boosted by ${format(GetHeirarchyBonus())}` 
 
      return `You have ${forgotten} <br> <br>
      ${HeirarchyBoost}<br>
      ${newBaseText}
      `
      //if (player.C.checkUpgrades.gte(2)) gain = gain.mul(Decimal.pow(5, player.C.CenterPoints).clampMin(1))
     }],
     "blank",

     ["row", [
      ["Reset", {id:11, title: "CENTRALIZATION"}],
      "blank",
      "blank",
      "blank",
      ["clickable",12],
    ]],
      "blank",
     ["Viewer",  {id:11, title: "The Effector™️"}],

    //check upgrade guide
 ["display-text",function() { if ((player.C.EffectorTier.gte(4) || player.E.Eclipsium.gte(1)) && !player["C"].hasFormality)
       return `<h2>Check Upgrades.</h2><br><br>
       <h4 class="hl"> 
       These sort of act like challenges, except you cannot leave until you meet ALL of it's goal requirements. <br>
       </h4>
       <h5>
       <br> Whereas you have to meet its Enter requirements to start checking. 
       <br> these 'enter' requirements are called a 'gate'. or 'gates' if multiple requirements are needed
       <br> You also MUST check the previous check upgrade to be able to check the next
       <br> You will see more of these later on, so do not exspect these are the only ones... 
       <br> Oh also, you can only complete a check upgrade ONCE. except IF it is modified.</h5>
       
       `
      if ((player["C"].hasFormality || player.E.EclipseTier.gt(0)) & !player["C"].hasHeirarchy) return `if you need a refresher on check upgrades, you can look at my docs, or you can wait until I add a button on refreshers on these types of things if you have unlocked them yet.`
      if (player["C"].hasHeirarchy || player.E.EclipseTier.gte(2)) return ``


     }],
     ["row", [
     
      ["Check", {id:11 , item: "Formality"} ],
      ["Check", {id:12, item: "Heirarchy"} ],
      ["Check", {id:13, item: "Twilight"} ],
      
      "blank",
      "blank",
      "blank",
     
      "blank",
      "blank",
      "blank",
      ["clickable",23],
    ]],
    
    ["clickable",31],
  
    // player["C"].CenterPoints
    ["display-text",
     function() { 
     /* 
       return ` <br>Highest Modifier Score Boosts Solar Light Cap by ${format(player.C.Highest.log(4).root(2))}  [Effector VI]<br>
       
       Your Current Modifier Increases The Base effect of Multiplys base by ^${format(player.C.Score.clampMin(1).log(7).root(7))}  [Effector VII]
       
       </br> `
  */
     }],
     ["display-text",
      function() { 
        
     
      let progression;
    
      if (player.C.EffectorTier.eq(4))
      progression = `🙂`
      else if (player.C.EffectorTier.eq(3))
      progression = `[Last Minor Unlock at Effector Tier IV]`
      else if (player.C.EffectorTier.eq(2))
      progression = `[Next Minor Unlock at Effector Tier III]`
      else if (player.C.EffectorTier.eq(1))
      progression = `[Next Minor Unlock at Effector Tier II]`
      else if (player["C"].Score.gte(1))
      progression = `[Next Minor Unlock at 2000 Modifier Score]`

        return `${progression}<br>
        ${type1}
        `
  
     }],
     "blank",
     "blank",
                //"main-display",
                ["infobox","about"],
                "blank",
                "blank",
                "blank",
                "blank",
                "blank",
                
            ],
            
        },



        "Darkness?": {
          content: [
            "buyables",
            "upgrades",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            "blank",
            
          ],
          
  
        },

        //if (player.C.EffectorTier.gte(2)) {
        
        

          
        },

  Viewer: {

    11: {
      display() {

        const effects = [
          { log: 2, boosts: "Solarity", keep: "Intricity", on: "ALL layer 1 Resets.", tier: "I" },
          { log: 4, boosts: "Solar Rays", keep: "Polarize", on: "ALL layer 1 Resets.", tier: "II" },
          { log: 9, boosts: "plasmates effect", keep: "Gravitation", on: "ALL layer 1 Resets.", tier: "III" },
          { log: 16, boosts: "multiply's effect", keep: "Solarizor", on: "ALL layer 1 Resets.",tier: "IV" },
          { log: 25, boosts: "Solarity Gain Cap", keep: "Shardism,Scorch, and Leverage", on: "ALL Recontrol Resets.",tier: "V" },
          { log: 36, boosts: "Light/Dark Generation", keep: "Annular", on: "ALL Recontrol Resets.", tier: "VI" },

        ];
        
        const effectsDisplay = effects.slice(0, player.C.EffectorTier.toNumber())
                                      .map(({log, boosts, keep, on, tier}, index) => `<h2>TIER  ${tier}</h2> <h3> <br> log${log} of Solar Rays boosts ${boosts}. Keep ${keep} on ${on} <br /> Effector's Tier ${tier} effect is ${format(player.S.points.log(log).clampMin(1))}</h3>`)
                                      .join('<br><br>');
        
   
        if (player.E.EclipseTier.lt(1) || !player.C.EffectorTier.gte(1)) return `<h1>Locked.</h1><br><h3>Get Effector Tier I to unlock this board</h3>`; else return `${effectsDisplay}`

      },
      unlocked() {
        if (player.C.CenterPoints.gte(1) || player.C.EffectorTier.gte(1) || player.E.EclipseTier.gte(1)) return true

      },

  


  },

  },
 
  Check: {
  
    11: {
    display() {
        let text = ``
       
        
        if (!player["C"].hasFormality) text = `
        ^0.666 to Solarity, Solar Rays, and Plasmate's effect.<br><br>
        Requires:
        Phaser #15, Plasmate #60 and Multiply #325 
         `
        else if (player["C"].hasFormality) text = `
        
        ^1.25 to Solarity Gain, and Automate Plasmate buyable, they also no longer spend anything.`
       
        if (player.C.activeCheck == "Formality") text = `Goal: Plasmate #40`
    
        return `             
        ${text}
      `
        

      }, 
    onClick() {
        if (player["C"].activeCheck == "Formality" && Check("C",11).CompReq == true ) {
          player["C"].hasFormality = true
          player["C"].activeCheck = ""
        }
        else if (Check("C",11).canEnter == true) player.C.activeCheck = "Formality"; layer1Reset()
      },
      
    unlocked() {
      if (player.C.EffectorTier.gte(4) || player.E.Eclipsium.gte(1)) return true
      else false
      },
      
    canEnter() {
            return (Check("C",11).EnterReq == true && !Check("C",11).has)                                                             
            },  
    EnterReq() {
        return (getBuyableAmount("S",11).gte(60) && getBuyableAmount("S",12).gte(325) && getBuyableAmount("GL",11).gte(15))   
      },   
    CompReq() {
        return getBuyableAmount("S",11).gte(40)
      },
    has() { return player["C"].hasFormality },

    png() {return `<p><img src="resources/Formality.png" style="width:150px;height:150px;"></p> `}

    },

    12: {
      display() {
        let text = ``
        if (!player["C"].hasHeirarchy && player["C"].activeCheck == "") text = `
        Meta Scaling starts instantly, of which also affects Plasmate. ^0.666 to Multiply's effect<br><br>
        Requires: Phaser #17, Plasmate #235, Multiply #370  
        `
        else if (player["C"].activeCheck == "Heirarchy") text = `Goal: Multiply #80`       
        if (player["C"].hasHeirarchy) text = `Center Points Boosts Solarity by a starting base of 5, and Automate 'Multiply' with a bulk purchase of 5! <br>
        

        
        `
        return `${text}`
        

      },
      onClick() {
        if (player["C"].activeCheck == "Heirarchy" && Check("C",12).CompReq == true ) {
          player["C"].hasHeirarchy = true
          player["C"].activeCheck = ""
        }
        else if (Check("C",12).canEnter == true) player.C.activeCheck = "Heirarchy"; layer1Reset()
      },

      unlocked() {
        if (player.C.EffectorTier.gte(4) || player.E.Eclipsium.gte(1)) return true
        else false
      },
     
      
      canEnter() {
        return (Check("C",12).EnterReq == true && !Check("C",12).has && player["C"].activeCheck == "")                                                             
        },  
      EnterReq() {
       return (getBuyableAmount("S",11).gte(235) && getBuyableAmount("S",12).gte(370) && getBuyableAmount("GL",11).gte(17) && Check("C",11).has)   
      },   
      CompReq() {
    return getBuyableAmount("S",11).gte(40)
  },

      has() { return player["C"].hasHeirarchy },

      png() {return `<p><img src="resources/Heirarchy.png" style="width:150px;height:150px;"></p> `}


  

    },

    13: {
    display() {
     
      
      let Twilight = new Decimal(0.75);if (hasMilestone("E",3)) Twilight = Twilight.plus(0.15);if (hasMilestone("E",5)) Twilight = Twilight.plus(0.15)

        
      if (player["C"].activeCheck == "Twilight" ) return `Goal: Multiply #30`       
      else if (Check("C",13).has ) return `Multiply's effect is ^1.312, You now generate Solar rays ^${Twilight} of your solar rays (can be increased later on)<br>`
      else return `All effects are reduced to log12(x)<br><br>
      Requires:Phaser #25, Plasmate #262, Multiply #380, 15 Center Points  `
       
        //return `${text} `
      },
      onClick() {
        if (player["C"].activeCheck == "Twilight" && Check("C",13).CompReq == true ) {
          player["C"].hasTwilight = true
          player["C"].activeCheck = ""
        }
        else if (Check("C",13).canEnter == true) player.C.activeCheck = "Twilight"; layer1Reset()

      },
      unlocked() {
        if ( player.C.EffectorTier.gte(4) || player.E.Eclipsium.gte(1) ) return true
        else false
      },
  canEnter() {
    return (Check("C",13).EnterReq == true && !Check("C",13).has && player["C"].activeCheck == "")                                                             
    },  
  EnterReq() {
    return (getBuyableAmount("S",11).gte(262) && getBuyableAmount("S",12).gte(380) && getBuyableAmount("GL",11).gte(25) && player.C.CenterPoints.gte(15) && Check("C",12).has)   
  },   
  CompReq() {
    return getBuyableAmount("S",12).gte(30)
},

  has() { return player["C"].hasTwilight },

  png() {return `<p><img src="resources/Twilight.png" style="width:150px;height:150px;"></p> `}

  },

  },

    tooltip: () => `<p>Open Centrality, side layer</p>`,
  upgrades: {
    11: {
      fullDisplay() {
          return `<h2>Jear 1</h2> <br>
          PATH SPLIT UPGRADE: <br>
          16x to Solarity
          `
      },
      canAfford() {
        let maxUpgradesAllowed = new Decimal(1)
        let UpgradesTaken = new Decimal(0)
         if (hasMilestone("E",4)) maxUpgradesAllowed = maxUpgradesAllowed.plus(1)

        if (hasUpgrade("C",11)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",12)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",13)) UpgradesTaken = UpgradesTaken.plus(1)

       

        return (!UpgradesTaken.eq(maxUpgradesAllowed)) 
      },
      cost: new Decimal(1),
      currencyDisplayName: "CenterPoints",
      currencyInternalName: "CenterPoints",
      currencyLayer: "C",
    
      unlocked() {
        if (player.C.EffectorTier.gte(2)) return true
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
          return `<h2>Jear 2</h2> <br>
          PATH SPLIT UPGRADE: <br>
          8x to Solar Ray Gain
          `
      },
      cost: new Decimal(1),
      currencyDisplayName: "CenterPoints",
      currencyInternalName: "CenterPoints",
      currencyLayer: "C",

      canAfford() {
        let maxUpgradesAllowed = new Decimal(1)
        let UpgradesTaken = new Decimal(0)
        if (hasMilestone("E",4)) maxUpgradesAllowed = maxUpgradesAllowed.plus(1)
        if (hasUpgrade("C",11)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",12)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",13)) UpgradesTaken = UpgradesTaken.plus(1)

        

        return (!UpgradesTaken.eq(maxUpgradesAllowed)) 
      },
      unlocked() {
        if (player.C.EffectorTier.gte(2)) return true
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
      return `<h2>Jear 3</h2> <br>
      PATH SPLIT UPGRADE: <br>
      4x to Solarity AND Solar rays
      `
  },
  cost: new Decimal(1),
  currencyDisplayName: "CenterPoints",
      currencyInternalName: "CenterPoints",
      currencyLayer: "C",
      canAfford() {
        let maxUpgradesAllowed = new Decimal(1)
        let UpgradesTaken = new Decimal(0)
        if (hasMilestone("E",4)) maxUpgradesAllowed = maxUpgradesAllowed.plus(1)
        if (hasUpgrade("C",11)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",12)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",13)) UpgradesTaken = UpgradesTaken.plus(1)

        


        return (!UpgradesTaken.eq(maxUpgradesAllowed)) 
      },
  unlocked() {
    if (player.C.EffectorTier.gte(2)) return true
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




21: {
  fullDisplay() {
      return `<h2>Neaver</h2> <br>
      PATH SPLIT UPGRADE II: <br>
      ^1.05 Solar Rays Gain
      `
  },
  cost: new Decimal(4),
  currencyDisplayName: "CenterPoints",
  currencyInternalName: "CenterPoints",
  currencyLayer: "C",
  canAfford() {
    let maxUpgradesAllowed = new Decimal(1)
    let UpgradesTaken = new Decimal(0)
    if (hasUpgrade("C",21)) UpgradesTaken = UpgradesTaken.plus(1)
    if (hasUpgrade("C",22)) UpgradesTaken = UpgradesTaken.plus(1)
    if (hasUpgrade("C",23)) UpgradesTaken = UpgradesTaken.plus(1)

    if (hasMilestone("E",4)) maxUpgradesAllowed = maxUpgradesAllowed.plus(1)


    return (!UpgradesTaken.eq(maxUpgradesAllowed)) 
  },
  unlocked() {
    if (player.C.EffectorTier.gte(3)) return true
  },
  style() {
    return {
      "width": "200px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "10px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#3a3337"
    }
  },
},
22: {
  fullDisplay() {
      return `<h2>Weaver</h2> <br>
      PATH SPLIT UPGRADE II: <br>
      ^1.15 Solarity gain 
      `
  },
  cost: new Decimal(4),
  currencyDisplayName: "CenterPoints",
  currencyInternalName: "CenterPoints",
  currencyLayer: "C",

  canAfford() {
    let maxUpgradesAllowed = new Decimal(1)
    let UpgradesTaken = new Decimal(0)
    if (hasUpgrade("C",21)) UpgradesTaken = UpgradesTaken.plus(1)
    if (hasUpgrade("C",22)) UpgradesTaken = UpgradesTaken.plus(1)
    if (hasUpgrade("C",23)) UpgradesTaken = UpgradesTaken.plus(1)

    if (hasMilestone("E",4)) maxUpgradesAllowed = maxUpgradesAllowed.plus(1)


    return (!UpgradesTaken.eq(maxUpgradesAllowed)) 
  },
  unlocked() {
    if (player.C.EffectorTier.gte(3)) return true
  },
  style() {
    return {
      "width": "200px",
      "height": "75px",
      "border-radius": "0px",
      "border": "0px",
      "margin": "10px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#3a3337"
    }
  },
},
23: {
fullDisplay() {
  return `<h2>Leaver</h2> <br>
  PATH SPLIT UPGRADE II : <br>
  3.14x solar Light cap and Generation speed
  `
},
cost: new Decimal(4),
currencyDisplayName: "CenterPoints",
  currencyInternalName: "CenterPoints",
  currencyLayer: "C",
  canAfford() {
    let maxUpgradesAllowed = new Decimal(1)
    let UpgradesTaken = new Decimal(0)
    if (hasUpgrade("C",21)) UpgradesTaken = UpgradesTaken.plus(1)
    if (hasUpgrade("C",22)) UpgradesTaken = UpgradesTaken.plus(1)
    if (hasUpgrade("C",23)) UpgradesTaken = UpgradesTaken.plus(1)

    if (hasMilestone("E",4)) maxUpgradesAllowed = maxUpgradesAllowed.plus(1)


    return (!UpgradesTaken.eq(maxUpgradesAllowed)) 
  },
unlocked() {
if (player.C.EffectorTier.gte(3)) return true
},
style() {
  return {
    "width": "200px",
    "height": "75px",
    "border-radius": "0px",
    "border": "0px",
    "margin": "10px",
    "text-shadow": "0px 0px 10px #000000",
    "color": "#3a3337"
  }
},
},
        
  

  
  
          
  
  
  
  
  
  
            },
  
  Reset: {

    11: {   
       
      display() {
  let gain = hasMilestone("E",3) ? `Your CP will be set to ${tmp["C"].CPgain} on reset` : `You will earn +1 CP on reset`
  if (tmp["C"].CPgain == "0") gain = ``
        return `
      <br> 
        Doing a recontrol reset does everything Convertary does as well as rooting Solar Shards and Center Points by 3, it also resets some things. <br>            
           ${gain}
         `                       
                 },
                 onClick() {
                if (hasMilestone("E",3) && !getClickableState("E",14))
                player.C.CenterPoints = tmp["C"].CPgain
                else player.C.CenterPoints = player.C.CenterPoints.plus(1)
                  player.GL.Solar_Shards = player.GL.Solar_Shards.root(4)
                layer1Reset()
                
                },
             canClick() {

              if (player.C.Score.gte(player.C.requirement)) return true

            },
                                 
              unlocked() { return true },
       
             button: () => { if (!tmp["C"].CPgain == "0") return !hasMilestone("E",3) ? `Centralize Once!` : `Centralize All!`; else return `Cant reset`},
                     },
       
                     
       
           },        

   CPgain() {
    let Divisor = new Decimal(1)
    let mult = new Decimal()
      if (hasMilestone("E",1)) Divisor = player.E.EclipseTier.pow_base(1.35)
      if (hasUpgrade("L",13)) Divisor = Divisor.mul(upgradeEffect("L",13))

      Hour = new Date()
      let exponent = 0
      if (Hour.getHours() >= 12 && getBuyableAmount("L",22).gte(1)) exponent = 1 - (Hour.getHours() % 12) / 100; else exponent = 1

      
      
    //this is the buyMax reset thing
     if (hasMilestone("E",3) && player.C.Score.gte(player.C.requirement)) mult = player.C.Score.root(exponent).times(Divisor).div(2000).log(1.35).round()

    return mult
   },
           


     

  
  clickables: {
                
               
      
      12: {
                display() {

            
                   return `
                   <h3>Effector Tier ${player.C.EffectorTier}<br> (max 7) </h3>
                   Unlock a new Effect. <br>  
                   cost: ${format(Decimal.pow(2, player.C.EffectorTier))} Center Points<br>
                   `
                  

                },
                onClick() {
                
                player.C.CenterPoints = player.C.CenterPoints.sub(Decimal.pow(2, player.C.EffectorTier))
                player.C.EffectorTier = player.C.EffectorTier.plus(1)
                //if (player.C.CenterPoints.lte(0)) player.C.CenterPoints = player.C.CenterPoints.abs()


                },
            canClick() {
              let maxPurchase = 4

              if (player.C.CenterPoints.gte(Decimal.pow(2, player.C.EffectorTier)) && player.C.EffectorTier.neq(maxPurchase)    ) return true
            },
            unlocked() {
              if (player.C.CenterPoints.gte(1) || player.C.EffectorTier.gte(1) || player.E.EclipseTier.gte(1)) return true
    
            },
                
                
            },   
      31: {
      display() {
         return `
         <h3>Recenter the upgrade tree and do a Convertary reset (respec)<br>
         `
      },
      onClick() {
      
      layer1Reset()
    
      player.C.upgrades = []
      //if (player.C.CenterPoints.lte(0)) player.C.CenterPoints = player.C.CenterPoints.abs()


      },
  canClick() {
    if (hasUpgrade("C",11) || hasUpgrade("C",12)|| hasUpgrade("C",13)) return true
  },
  unlocked() {
    if (player.E.EclipseTier.gte(4)) return true
  },
  style() { return {
    "width": "250px",
    "height": "35px",
    "border-radius": "0px",
    "border": "10px",
    "margin": "33px",
    "text-shadow": "0px 0px 10px #000000",
    
  }
}, 
      
  }, 

            },

    row: 1, // Row the layer is in on the tree (0 is the first row)
   
    branches: ["S"],
    layerShown(){ 
      if ( hasUpgrade("GL",15) || player.E.EclipseTier.gte(1) )   return true; 
  
    }
  }
  
  )