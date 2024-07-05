addLayer("C", {
    name: "Center", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: ">C<", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        CenterPoints: new Decimal(0),
       
        Score: new Decimal(0),
        Highest: new Decimal(0),
        requirement: new Decimal(2000),
        EffectorTier: new Decimal(0), 
        checkUpgrades: new Decimal(0),  
    
    }},
    color: "#1f2129",
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
  
  
  
   update(diff) {

    if (hasUpgrade("GL",21)) player["GL"].Time = player["GL"].Time.plus(decimalOne.times(diff)).clampMin(0)

    let PhaserBoost = new Decimal(1)
    if (player.E.forgotton == true) PhaserBoost = getBuyableAmount("GL",11).clampMin(1)
    if (hasUpgrade("GL",31)) player.C.Score = getBuyableAmount("S", 11).mul(getBuyableAmount("S", 12)).mul(PhaserBoost)
    
    

    if (getClickableState("E", 14)) player.C.Score = player.C.Score.pow(0.8)
    

    
    if (player.C.CenterPoints.lte(0)) player.C.CenterPoints = player.C.CenterPoints.mul(0)
    if (player.C.Score.gte(player.C.Highest)) player.C.Highest = player.C.Score

    let Divisor = new Decimal(1)

    if (hasMilestone("E",1)) Divisor = Divisor.mul(player.E.EclipseTier.pow_base(1.25))

    player.C.requirement = Decimal.mul(2000   ,  Decimal.pow( 1.35 , player.C.CenterPoints ) ).div(Divisor).clampMin(1)
    

  }, 
  
  
      
  
  
  
  
  
  
  
    tabFormat: {
        "The Effector": {      
              content: [             
       ["display-text",
     function() { 

        
      if (player["C"].CenterPoints.gte(1) || player.C.EffectorTier.gte(1))
       return `You have ${format(player["C"].CenterPoints )}  Center Points `
  
     }],
       ["display-text",
     function() { 
      
      let valueHeirarchy = decimalZero
      if (player.C.checkUpgrades.gte(2)) valueHeirarchy = Decimal.pow(5, player.C.CenterPoints).clampMin(1)

        if (getClickableState("C", 23)) valueHeirarchy = valueHeirarchy.log(12)

      let HeirarchyBoost = ``

      let forgotten = ``; if (getClickableState("E", 14)) forgotten = `<h3 style="color: #170f1c; text-shadow: 0px 0px 20px #ffffff;"> ${format(player["C"].Score )} / ${format(player.C.requirement)} Emptyness...? </h3>`; else forgotten = `${format(player["C"].Score )} / ${format(player.C.requirement)} Modifier Score.`

      if (player.C.checkUpgrades.gte(2)) HeirarchyBoost = `Thanks to Heirarchy, Solarity is being boosted by ${format(valueHeirarchy)}` 

      return `You have ${forgotten} <br> <br>
      ${HeirarchyBoost} 
      `
      //if (player.C.checkUpgrades.gte(2)) gain = gain.mul(Decimal.pow(5, player.C.CenterPoints).clampMin(1))
     }],
     "blank",
     "clickables",
     
    






    
    // player["GL"].CenterPoints
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




        let progression = ""
        if (player.E.EclipseTier.gte(1)) type1 = `
        <br><br>------
        <br>part 2: (P-a -> Person a; P-b -> person b, and ECT...)
        <br> P-A: YOU CLEARLY DID IT!
        <br> P-B: WAIT WAIT GUYS STOP ARGUEING! WHAT IS THAT THING???
        <br> *they all stop to look at the yellow gate, in which seems to be the Eclipsifier*
        <br> P-A, P-B: Woah...
        <br> P-C: Finally we get to stop arg- WOAH
        <br> P-B: ...really? you still decide to bring that up?
        <br> P-C: well actually we havent introduced ourselves with the reader here~
        <br> *they both look at them, P-A, P-B glares*
        <br> [Unlock more dialogue at Eclipse Tier 2!]`

      if (getClickableState("C",23)) progression = `
        Note that this Upgrade check has a large Timewall of around 6 hours <br>
        <br> Person A: In the meantime, why dont you just play other games? like touching grass? or playing adopt me in roblox??? 
        <br>Person A: w-what do you mean you hate adopt me? 
        <br>Person A: adopt me is FUN 
        <br>Person B: pfft oh please, adopt me is for KIDS
        <br>Person A: OH YEAH? THEN WHAT DO YOU SUGGEST?? 
        <br>Person B: ...idk lmao probably something better than your stinky game 
        <br>Person A: GIVE ME SOMETHING THAT COULD BE BETTER THAN ADOPT ME
        <br>Person B: The person playing this game can probably tell us
        <br>Person C: HEY! WHAT DID I TELL YOU ABOUT BREAKING THE FOURTH WALL?
        <br>Person B: Sorry, I Have a habit to uncontrollably tell that the reader is doing
        <br>Person C: >:( well than stop it! its getting very annoying!
        <br>Person C: And were not even helping because by the looks of it, Our dialogue is filling up the bottom half of the screen!
        <br>Person A and B: HYPOCRITE!
        <br>Person C: YOU DID IT FIRST PERSON B
        <br>*the three are now arguing... when will this ever end?*
        <br> [Unlock more dialogue at higher resets]
        ${type1}
       `
      else if (player.C.EffectorTier.eq(4))
      progression = `🙂`
      else if (player.C.EffectorTier.eq(3))
      progression = `[Last Minor Unlock at Effector Tier IV]`
      else if (player.C.EffectorTier.eq(2))
      progression = `[Next Minor Unlock at Effector Tier III]`
      else if (player.C.EffectorTier.eq(1))
      progression = `[Next Minor Unlock at Effector Tier II]`
      else if (player["C"].Score.gte(1))
      progression = `[Next Minor Unlock at 2000 Modifier Score]`

        return progression
  
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
        
       
     
    
  
   
  
  
  
  
  
  
  
    
  
  
  // if (player["GL"].Solar_shards.gte(1))
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
        if (hasUpgrade("C",11)) UpgradesTaken = UpgradesTaken.plus(1)
        else if (hasUpgrade("C",12)) UpgradesTaken = UpgradesTaken.plus(1)
        else if (hasUpgrade("C",13)) UpgradesTaken = UpgradesTaken.plus(1)

        if (hasMilestone("E",4)) maxUpgradesAllowed = maxUpgradesAllowed.plus(1)


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
        if (hasUpgrade("C",11)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",12)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",13)) UpgradesTaken = UpgradesTaken.plus(1)

        if (hasMilestone("E",4)) maxUpgradesAllowed = maxUpgradesAllowed.plus(1)


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
        if (hasUpgrade("C",11)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",12)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",13)) UpgradesTaken = UpgradesTaken.plus(1)

        if (hasMilestone("E",4)) maxUpgradesAllowed = maxUpgradesAllowed.plus(1)


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
  


            
  
    clickables: {
                
               
      11: {
                  display() {

                     return `
                     <h3>CENTRALIZE [LAYER 2 SIDE RESET]</h3><br> <br>
                     Does Everything Convertary does as well as rooting your solar shards by 4        
                     `
                    

                  },
                  onClick() {
                    let Divisor = new Decimal(1)
                    let mult = new Decimal(1)
                   
                  if (hasMilestone("E",1)) Divisor = Divisor.mul(player.E.EclipseTier.pow_base(1.35))
                  let basecost = new Decimal(2000).div(Divisor)
                    //this is the buyMax reset thing
                   if (hasMilestone("E",3) && player.C.Score.gte(player.C.requirement)) mult = player.C.Score.div(basecost).log(1.35).round()
                   
                  //scaling for this is: (2000 * 1.35^x) / Reduced requirements
                   
                    
                  if (hasMilestone("E",3) && !getClickableState("E",14))
                  player.C.CenterPoints = mult
                  else player.C.CenterPoints = player.C.CenterPoints.plus(1)
                    player.GL.Solar_Shards = player.GL.Solar_Shards.root(4)
                  layer1Reset()
                  



                  },
              canClick() {

                if (player.C.Score.gte(player.C.requirement)) return true



              },
              style() { return (this.canClick()) ? {
                      "width": "300px",
                      "height": "100px",
                      "border-radius": "20px",
                      "border": "10px",
                      "margin": "0px",
                      "text-shadow": "0px 0px 10px #000000",
                      
                    } : {
                      "width": "250px",
                      "height": "40px",
                      "border-radius": "20px",
                      "border": "10px",
                      "margin": "0px",
                      "text-shadow": "0px 0px 10px #000000",
                      
                    }
                    
                  },   
                  
                  
              },
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
      13: {
              display() {

                const effects = [
                  { log: 2, boosts: "Solarity", keep: "Intricity", tier: "I" },
                  { log: 4, boosts: "Solar Rays", keep: "Polarize", tier: "II" },
                  { log: 9, boosts: "plasmates effect", keep: "Gravitation", tier: "III" },
                  { log: 16, boosts: "multiply's effect", keep: "Solarizor", tier: "IV" }
                ];
                
                const effectsDisplay = effects.slice(0, player.C.EffectorTier.toNumber())
                                              .map(({log, boosts, keep, tier}, index) => `<h3>TIER ${tier} <br> log${log} of Solar Rays boosts ${boosts}, Keep ${keep} on ALL layer 2 Resets.<br /> Effector's Tier ${tier} effect is ${format(player.S.points.log(log).clampMin(1))}</h3>`)
                                              .join('<br><br>');
                
           
                if (player.E.EclipseTier.lt(1) || !player.C.EffectorTier.gte(1)) return `<h1>Locked.</h1><br><h3>Get Effector Tier I to unlock this board</h3>`; else return `${effectsDisplay}`


               

                 
                

              },
              unlocked() {
                if (player.C.CenterPoints.gte(1) || player.C.EffectorTier.gte(1) || player.E.EclipseTier.gte(1)) return true
      
              },
          canClick() {
            //if (player.C.CenterPoints.gte(Decimal.pow(2, player.C.EffectorTier))) return true
            return false


          },
          style() { return {
                  "width": "600px",
                  "height": "235px",
                  "border-radius": "0px",
                  "border": "10px",
                  "margin": "33px",
                  "text-shadow": "0px 0px 10px #000000",
                  
                }
              },   
              
              
          },






// Challenge Check Upgrades!


      21: {
            display() {
              let text = ``
              let textActive = ``
              let rewardDisplay = ``
              if (!getClickableState("C", 21) && player.C.checkUpgrades.lt(1)) text = `Enter Upgrade Check. #001 <br>
              ^0.666 to Solarity<br>^0.666 to Solar Rays<br>^0.666 to Plasmate's effect <br>
              Requires:
              Phaser #15
              Plasmate #60
              Multiply #325 <br>
               `
              else if (!getClickableState("C", 21) && player.C.checkUpgrades.gte(1)) text = `Check Upgrade Completed!<br>`
              else text = `Goal: Plasmate #40`
              if (getClickableState("C", 21)) textActive = `[ACTIVE] `
             
             
             
              if (player.C.checkUpgrades.gte(1)) rewardDisplay = `^1.25 to Solarity Gain, and Automate Plasmate buyable, they also no longer spend anything.`

              return `
              <h1>Formality...</h1>
              ${textActive}              
              ${text} 
              ${rewardDisplay}
              <br>`
              

            },
            onClick() {
            if (getClickableState("C", 21) && player.C.checkUpgrades.lt(1)) { player.C.checkUpgrades = player.C.checkUpgrades.plus(1) }   
            if (!getClickableState("C", 21)) {layer1Reset()}

            const currentState = getClickableState("C", 21)
            setClickableState("C", 21, !currentState)
            




            },
        canClick() {
        //check if it has the check upgrade or is not in the check upgrade
        if (getClickableState(this.layer,this.id) == false && player.C.checkUpgrades.lt(1)) 
        {
        //check if it has the requirements to enter unless it is in the check upgrade 
        if (getBuyableAmount("S",11).gte(60) && getBuyableAmount("S",12).gte(325) && getBuyableAmount("GL",11).gte(15)){
            return true
          }
         } 
        // check if its inside the check upgrade  
        else if (getClickableState(this.layer,this.id) == true && player.C.checkUpgrades.lt(1))
        {                                                                       
          //check if it meets the requirements to complete the upgrade check.
          if (getBuyableAmount("S",11).gte(40)) return true                                              
        }                                                                    
        },  
        unlocked() {
          if (player.C.EffectorTier.gte(4) || player.E.Eclipsium.gte(1)) return true
          else false
        },
            
        },
      22: {
          display() {
            let text = ``
            let textActive = ``
            let rewardDisplay = ``
            let textActiveGoal = ``
            
            if (!getClickableState("C", 22) && player.C.checkUpgrades.lt(2)) text = `Enter Upgrade Check #002

            Meta Scaling starts instantly <br>Meta Scaling also affects Plasmate <br> ^0.666 to Multiply's effect

            Requires:
            Phaser #17
            Plasmate #235
            Multiply #370
            Formality 
            `
            else if (player.C.checkUpgrades.gte(2)) text = `Check Upgrade Completed!`
            else text = ``
            if (getClickableState("C", 22)) textActive = `
            [ACTIVE] 
            Goal: Multiply #80`
            
            else textActiveGoal = ``
            // Goal: Plasmate #40 <br>
           
           
            if (player.C.checkUpgrades.gte(2)) rewardDisplay = `Center Points Boosts Solarity by 5^x, and Automate 'Multiply' with a bulk purchase of 5! <br>`
            else rewardDisplay = ``



            return `
            <h1>Heirarchy...</h1><br> ${textActive}
            ${text}
            ${textActiveGoal}
            ${rewardDisplay}
             `
            

          },
          onClick() {
          if (getClickableState("C", this.id) && player.C.checkUpgrades.lt(2)) { player.C.checkUpgrades = player.C.checkUpgrades.plus(1) }   
          if (!getClickableState("C", this.id)) {layer1Reset()}

          const currentState = getClickableState("C", this.id)
          setClickableState("C", this.id, !currentState)
          




          },
          unlocked() {
            if (player.C.EffectorTier.gte(4) || player.E.Eclipsium.gte(1)) return true
            else false
          },
      canClick() {
      //check if it has the check upgrade or is not in the check upgrade
      if (getClickableState(this.layer,this.id) == false && player.C.checkUpgrades.lt(2)) 
      {
      //check if it has the requirements to enter unless it is in the check upgrade 
      if (getBuyableAmount("S",11).gte(235) && getBuyableAmount("S",12).gte(370) && getBuyableAmount("GL",11).gte(17) && !player.C.checkUpgrades.gte(2)){
          return true
        }
       } 
      // check if its inside the check upgrade  
      else if (getClickableState(this.layer,this.id) == true && player.C.checkUpgrades.lt(2))
      {                                                                       
        //check if it meets the requirements to complete the upgrade check.
        if (getBuyableAmount("S",12).gte(80)) return true                                              
      }                                                                    
      },
      style() { 
          },   
          
          
      },
      23: {
        display() {
          let text = ``
          let textActive = ``
          let rewardDisplay = ``
          let textActiveGoal = ``
          let Twilight = new Decimal(0.75)
          if (hasMilestone("E",3)) Twilight = Twilight.plus(0.15)
          if (hasMilestone("E",5)) Twilight = Twilight.plus(0.15)

          if (player.C.checkUpgrades.gte(3)) text = `Check Upgrade Completed!`
          else if (!getClickableState("C", 23))
           text = `Enter Upgrade Check #003

          All effects are reduced to log12(x)

          Requires:
          Phaser #25
          Plasmate #262
          Multiply #380
          15 Center Points
          Heirarchy
          `
          else text = ``

          

          if (getClickableState("C", 23)) textActive = `
          [ACTIVE] 
          Goal: Multiply #30
          `
          
          else textActiveGoal = ``
          // Goal: Plasmate #40 <br>
         
         
          if (player.C.checkUpgrades.gte(3)) rewardDisplay = `Multiply's effect is raised ^1.312. You now generate ^${Twilight} of Solar Rays per Second [can be increased later on] <br>`
          else rewardDisplay = ``



          return `
          <h1>Twilight...</h1><br> ${textActive}
          ${text}
          ${textActiveGoal}
          ${rewardDisplay}
           `
          

        },
        onClick() {
        if (getClickableState("C", this.id) && player.C.checkUpgrades.lt(3)) { player.C.checkUpgrades = player.C.checkUpgrades.plus(1) }   
        if (!getClickableState("C", this.id)) {layer1Reset()}

        const currentState = getClickableState("C", this.id)
        setClickableState("C", this.id, !currentState)
        




        },
        unlocked() {
          if ( player.C.EffectorTier.gte(4) || player.E.Eclipsium.gte(1) ) return true
          else false
        },
    canClick() {
    //check if it has the check upgrade or is not in the check upgrade
    if (getClickableState(this.layer,this.id) == false && !player.C.checkUpgrades.gte(3)) 
    {
    //check if it has the requirements to enter unless it is in the check upgrade 
    if (getBuyableAmount("S",11).gte(262) && getBuyableAmount("S",12).gte(380) && getBuyableAmount("GL",11).gte(25) && player.C.CenterPoints.gte(15) && player.C.checkUpgrades.gte(2)){
        return true
      }
     } 
    // check if its inside the check upgrade  
    else if (getClickableState(this.layer,this.id) == true )
    {                                                                       
      //check if it meets the requirements to complete the upgrade check.
      if (getBuyableAmount("S",12).gte(30)) return true                                              
    }                                                                    
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





          //challenge check upgrade down here
          // should be in "Darkness?" tab

     
  
  
  
            },
  
           
  
    row: 1, // Row the layer is in on the tree (0 is the first row)
   
    branches: ["S"],
    layerShown(){ 
      if ( hasUpgrade("GL",15) || player.E.EclipseTier.gte(1) )   return true; 
  
    }
  }
  
  )