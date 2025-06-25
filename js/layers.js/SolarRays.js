addLayer("S", {
   
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),

    Bulk_M: new Decimal(1),
    metaNerf: new Decimal(300),
    multMeta: new Decimal(1),
    
    bestPointsInDark: new Decimal(0)
      
    }},
    color: "#ff6a00",
   
    symbol() {
      return `
      <p><img src="resources/Solarizor.png" style="width:70px;height:70px;"></p>`
      },

    
    tooltip: () => `<p>Open Layer 0, Main Layer</p>`,
    tabFormat: {
        "April 8th, 2024": {      
              content: [
                
                ["infobox","about"],
                ["display-text",
                function() { 
                  let forgotten = ``; if (player["E"].activeCheck == "Forgotton") forgotten = 
                  `<h3 style="color: #170f1c; text-shadow: 0px 0px 30px #ffffff;"> You Have ${format(player.S.points)} Shadow...? </h3>`; 
                  else forgotten = `You Have ${format(player.S.points)} Solar Rays`
                  
                   if (player.Sol.activeCheck == "Heliosphere") forgotten = `<h3 style="color:rgba(204, 0, 0, 0.3); text-shadow: 0px 0px 50px rgba(196, 104, 4, 0.67);"> ~~~~~~~~~~~ ${format(player.Sol.HelioStat["Solar_Rays"])}<h3 style="color: #170f1c; text-shadow: 0px 0px 30px #ffffff;">`
                  return `${forgotten}`
          
               }],
               "blank",
               

                ["Reset", {id: 11, title: "SOLARIZE"}],


                "blank",


                ["row", [ //check upgrades
                   ["upgrade",11],
                   ["upgrade",12], 
                   ["upgrade",13], 
                   ["upgrade",21],  
                   ["upgrade",14], 
                   
               ]], 



                ["display-text",
      function() { 
      let RootEFF1 = new Decimal(40)
	    let RootEFF2 = new Decimal(35)
      let MAX = (hasMilestone("E", 2) && player.L.activeCheck == "") ? 3 : 2
    


  	  let eff1 = player.S.points.root(RootEFF1.sub(upgradeEffect("S",12))).clampMin(1)
  	  let eff2 = player.S.points.root(RootEFF2.sub(upgradeEffect("S",12))).clampMin(1)
        let capped = ``
      eff1 = !player.Sol["TBSun"].active ? softcap(eff1, new Decimal(2), 0.3).clampMax(MAX) : eff1

          //if (hasMilestone("E",1)) gain2 = gain2.pow(1.732)

          if (eff1==2 && hasMilestone("E", 2)) capped = `(capped)`

          let TBSN1 = ``; let TBSN2 = ``;
          
        return !player.Sol["TBSun"].active ? `<h3 class="ignThemes"> Solar Rays Boost the following: <br><br>  Solarity by ^${format(eff1,3)} ${capped} <br> Solarity by ${format(eff2,3)} </h3>` : 
        `<h3 class="ignThemes"> <s>Solar Rays Boost the following: </s><br><br> <s> Solarity by ^${format(eff1,3)} ${capped} </s><br> <s>Solarity by ${format(eff2,3)} </s></h3>
        <br> <i>"Forget the sun that's injured, broken even... - Solaris"</i>
        `

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


      Reset: {
        11: {
          display() {
            let nerf = new Decimal(0)
            if (player.C.activeCheck == "Formality") nerf = tmp["S"].getResetGain  .pow(1.501501502)
     
                  let nerfText = ``
                  if (player.C.activeCheck == "Formality") nerfText = `${format(nerf)} -> `
      
          //player["C"].activeCheck == "Heirarchy"
            

            let autoAcc = 2 
            if (player.Sol.SolarFragments.gt(1)) autoAcc = 3 

            if (player.Sol.activeCheck == "")

            return `
            Gain Solar rays by ^${format(tmp.S.exponent,autoAcc)} of Solarity, Then Reset Solarity.
            <br>
             (Requires at least 1 Solarity)<br><br>
            Solar rays earned:  ${nerfText} ${format(tmp["S"].getResetGain)} Solar Rays  
             `

            else return `<h3 style="color:rgba(125, 68, 6, 0.66); text-shadow: 0px 0px 50px rgba(255, 244, 172, 0.5);"> +${format(player.Sol.HelioStat["Solarity"].clampMin(1).log(10))} </h3>` //``

            },     
          onClick() {
            let gain = tmp["S"].getResetGain
            player.S.points = player.S.points.add(gain)
            player.points = new Decimal(0)
            },
          canClick() {if (player.points.gte(1)) return true},
          
        //  gain: () => { return player.L.LunarPower.clampMin(1).log(5)},
          button: () => { return `Form Solar Rays!` },
          unlocked() {return true},
      },          
     },
//
    exponent() { Hour = new Date()
      let multiboost = decimalZero

      if (hasMilestone("E",1) && player.L.activeCheck == "") multiboost = multiboost.plus(0.03)
      if (Hour.getHours() <= 12 && getBuyableAmount("L",21).gte(1)) multiboost = multiboost.plus((Hour.getHours() % 12) / 150)
      if (player.Sol.SolarFragments.gt(1)) multiboost = multiboost.plus(player.Sol.SolarFragments.log(10).div(100))
      
      return upgradeEffect("S",11).plus(0.1).plus(multiboost)
      },

update(diff) {

  if (player["C"].activeCheck == "Heirarchy") player.S.metaNerf = player.S.metaNerf.mul(0).add(1)
  else player.S.metaNerf = new Decimal(300)

  let BulkPurchase = new Decimal(1)

  if (Check("C",12).has) BulkPurchase = new Decimal(5)
 // if (player.E.EclipseTier.gte(3)) BulkPurchase = BulkPurchase.plus(5)


  let Twilight = new Decimal(0.75)
  if (hasMilestone("E",3)) Twilight = Twilight.plus(0.15)
  if (hasMilestone("E",5)) Twilight = Twilight.plus(0.15)

  if (player["C"].hasTwilight) player.S.points = player.S.points.plus(getResetGain("S").pow(Twilight))


  //Twilight QoL
  if (hasMilestone("E",4)) player.S.points = player.S.points.plus(player.points.clampMin(1).log(10).times(diff))

    player.S.Bulk_M = BulkPurchase;
  
    //SR Cap
    
    (getClickableState("L",42) && tmp["S"].getResetGain.pow(0.09).gte(player["S"].bestPointsInDark)) ? (player["S"].bestPointsInDark = tmp["S"].getResetGain.pow(0.09)) : 0;



    
   
    if (getClickableState("L",42) && player.S.points.gte(getSRCap())) player.S.points = getSRCap()

      // /







    //generally for meta scale

      let x = getBuyableAmount("S",12)
      scaledAmt = x.sub(player.S.metaNerf)
      metaScaling = scaledAmt.root(1.5).div(25).add(1).pow(scaledAmt)
      if (getBuyableAmount("S",12).gte(player["S"].metaNerf)) player["S"].multMeta = metaScaling


      if (hasUpgrade("S",13) && !hasUpgrade("S",21)) player.S.upgrades.push(21) 
      else if (hasUpgrade("S",21) && !hasUpgrade("S",13)) player.S.upgrades.push(13)
      

       

     },


getResetGain() {
  if (player.points.lt(1)) return Decimal.dZero;
    let Helio = player.Sol.activeCheck == "Heliosphere" ? 0.7 : 1
    let gain = player.Sol.activeCheck == "Heliosphere" ? player.Sol.HelioStat["Solarity"].clampMin(1).log(10) : Decimal.pow(player.points, tmp.S.exponent).minus(1);

    let f = player.Sol.activeCheck == "Heliosphere" ? player.Sol.HelioStat["Solar_Rays"].clampMin(1) : player.S.points   ;


    if (hasUpgrade("S", 14)) gain = Decimal.times(upgradeEffect("S", 14).pow(Helio), gain)
    if (hasUpgrade("GL",31)) gain = gain.times(upgradeEffect("GL",31).pow(Helio))
    if (player.C.EffectorTier.gte(2)) gain = gain.times( f.log(4).clampMin(1))
    if (hasUpgrade("C",12)) gain = gain.times(8 ** Helio)
    if (hasUpgrade("C",13)) gain = gain.times(4 ** Helio)
    if (hasUpgrade("C",21)) gain = gain.pow(1.05)
    
      {  
    if (player.C.activeCheck == "Formality") gain = gain.pow(0.666)
    if (player["C"].activeCheck == "Twilight") gain = gain.log(12)
    if (player["E"].activeCheck == "Forgotton" ) gain = gain.root(5)
    } 
    if (hasMilestone("E",1)) gain = gain.mul(player.E.EclipseTier.pow_base(5).pow(Helio))
    
    if (player.L.LightCheck.gte(1) && player.L.Light.gte(1)) gain = gain.mul(player.L.Light.pow(0.25).pow(Helio)) 
    if (hasUpgrade("Sol",12)) gain = gain.mul(upgradeEffect("Sol",12).pow(Helio))
    gain = gain.mul(player.Sol.SolarFragments.pow(2.4))
   
  return gain.clampMin(1);

},

getNextAt() {
return  tmp["S"].getResetGain

},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },


    automate() {
      if ( player["C"].hasFormality && player.L.activeCheck == "") buyMaxBuyable("S",11)
      if ( player["C"].hasHeirarchy && player.L.activeCheck == "") buyMaxBuyable("S",12)
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
              
              //if (player.Sol.activeCheck == "Heliosphere") {}

                return !(player.Sol.activeCheck == "Heliosphere") ? ` <h2>Intricity</h2> <br>
                Requires:<br> Plasmate #5 <br><br> <br> 
                
                +${upgradeEffect("S",11)} Solar Ray Gain Exponent <br> <br>
                Cost: 22 Solar Rays
                ` : `<h1>The Sun<h1>`
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
                "width": "160px",
                "height": "75px",
                "border-radius": "0px",
                "border": "0px",
                "margin": "5px",
                "text-shadow": "0px 0px 10px #000000",
                "color": "#664257"
              }
            },
            effect() {
              let base = new Decimal(0)
              if (hasUpgrade("S",11)) base = base.plus(0.05)
              if (hasMilestone("E",2) && player.L.activeCheck == "") base = base.plus(0.03)
              return base
            },
        },

        12: {
          fullDisplay() {
            return !(player.Sol.activeCheck == "Heliosphere") ? `<h2>Polarize</h2> <br>
              Requires:<br> Plasmate #10 <br><br><br> 
              
              -${upgradeEffect("S",12)} to Root formula of solar rays bonus <br><br>
              Cost: 105 Solar Rays
              
              ` : `<h1>Must aquire<h1>`
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
              "width": "160px",
              "height": "75px",
              "border-radius": "0px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#664257"
            }
          },
          effect() {
            let base = new Decimal(0)
            if (hasUpgrade("S",12)) base = base.plus(5)
            if (hasMilestone("E",2) && player.L.activeCheck == "") base = base.plus(5)
            return base
          },
      },
      
        13: {
        fullDisplay() {
          let enter

              let readNormal = player.Sol["TMSun"].active ? `IGNORE<br>IGNORE<br>IGNORE <br>` : ``
              let readNormal2 = player.Sol["TMSun"].active ? `` : `<br> Gravitation's effect is ${format(effect = player.points.pow(0.05).clampMin(1))}<br>`
              let readNormal3 = player.Sol["TMSun"].active ? `<s>^0.05 of <br> boosts</s>` : `^0.05 of Solarity boosts themselves`
              let readNormal4 = player.Sol["TMSun"].active ? `<h2>Gravit</h2><br> ` : `<h2>Gravitation</h2>`
              let readNormal5 = player.Sol["TMSun"].active ? `Requires:` : `Requires: Multiply #20`
          if (hasUpgrade("S",13)) enter = format(upgradeEffect("S",13) )

            

          else enter = "???"
            return !(player.Sol.activeCheck == "Heliosphere") ? `${readNormal4}<br>
                ${readNormal5} <br><br><br><br>
                ${readNormal3} <br> 
                ${readNormal2}
            ` : `<h1>it's forsaken<h1>`
        },
        cost: new Decimal(0),
        canAfford() {
            if (getBuyableAmount("S",12).gte(20) && player["S"].points.gte(this.cost) ) return true
            else return false
        },
        effect() {
          let effect = new Decimal(1)
          return effect = player.Sol["TMSun"].active ? new Decimal(1) : player.points.pow(0.05).clampMin(1)
           
          
        },
        unlocked() {
          if (hasUpgrade("S",12) || player.C.EffectorTier.gte(3)) return true
        },
        style() {
          return {
            "width": player.Sol["TMSun"].active ? "80px" :"160px",
            "height": player.Sol["TMSun"].active ? "80px" : "37.5px",
            "border-radius": "0px",
            "border": "0px",
            "margin": player.Sol["TMSun"].active ? "11px" : "5px",
            "transform": player.Sol["TMSun"].active ? "rotate(10deg)" : "rotate(0deg)",
            "letter-spacing": player.Sol["TMSun"].active ? "2px" : "0px",
            "filter": player.Sol["TMSun"].active ? "blur(1px)" : "blur(0px)",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#664257"
          }
        },
    },  
    21: {
        fullDisplay() {
          let enter
          if (hasUpgrade("S",13)) enter = format(upgradeEffect("S",13) )
            
          else enter = "???"
            return !(player.Sol.activeCheck == "Heliosphere") ? `<h2>ation</h2> <br>
            Multiply #20 <br><br><br> 
            
            Solarity <br> themselves <br>
            ` : `<h1>it's forsaken<h1>`
        },
        cost: new Decimal(0),
        canAfford() {
            return false
        },
        effect() {
          
          return effect = new Decimal(1)
        },
        unlocked() {
          if (player.Sol["TMSun"].active && (hasUpgrade("S",12) || player.C.EffectorTier.gte(3))) return true
        },
        style() {
          return {
            "width": "80px",
            "height": "37.5px",
            "border-radius": "0px",
            "border": "0px",
            "margin": player.Sol["TMSun"].active ? "11px" : "0px",
            "transform": player.Sol["TMSun"].active ? "rotate(-10deg)" : "rotate(0deg)",
            "letter-spacing": player.Sol["TMSun"].active ? "2px" : "0px",
            "filter": player.Sol["TMSun"].active ? "blur(1px)" : "blur(0px)",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#664257"
          }
        },
    },
        14: {
      fullDisplay() {
        let enter
        if (hasUpgrade("S",14)) enter = format(upgradeEffect("S",14) )
        else enter = "???"
          return !(player.Sol.activeCheck == "Heliosphere") ? `<h2>Solarizor</h2> <br>
          Requires:<br>Plasmate #17 <br>
          Multiply #25 <br><br>
          
          log15 of Solar Rays boosts themselves <br> 

          <br> Solarizors effect is ${enter}<br>
          ` : `<h1>sacrifice... your<h1>`
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
          "width": "160px",
          "height": "75px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#664257"
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




              if (player["C"].activeCheck == "Heirarchy") {
                let scaledAmt = getBuyableAmount("S",12)
                let metaScaling = scaledAmt.root(1.5).div(25).add(1).pow(scaledAmt)
                Calculation = Calculation.mul(metaScaling)
              }    

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
              
               if (player.Sol.activeCheck == "Heliosphere") {

                //change amount to 

                if (amount.gte(this.cost) && !getBuyableAmount(this.layer, this.id).eq(100)) addBuyables(this.layer, this.id, 1)
               }
               else setBuyableAmount("S", 11, amount.plus(1));
             // player.S.points = player.S.points.minus(this.cost(amount));
            },


            unlocked() {
              if (player["S"].points.gte(1) || player["GL"].Solar_Shards.gte(1) || getBuyableAmount("S",11).gte(1)) return true

            },
            display() {
              let nerf = tmp[this.layer].buyables[this.id].effect.pow(1.501501502)
              let nerfText = ``
              if (player.C.activeCheck == "Formality") nerfText = `+${format(nerf)} -> `
              //player.Sol.HelioStat["Solarity"]
              
            if (player.Sol.activeCheck == "")  return `
            <h2>Plasmate #${getBuyableAmount(this.layer, this.id)}</h2>
            <br>
          <h2> ${nerfText} +${format(this.effect())} to Solarity Gain</h2>
            <br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Solar Rays</h2>
          `

            else if (player.Sol.activeCheck == "Heliosphere") {
              return `<h1> ${getBuyableAmount(this.layer, this.id)} / 100 </h1>`
              //player.Sol.activeCheck == "Heliosphere"
            } 

            },
            canAfford() {                                                                  // change to Solar Rays via player.Sol.HelioStat["Solar_Rays"]
              if (player.Sol.activeCheck == "Heliosphere") return getBuyableAmount("S",11).gte(100) ? false : player.Sol.HelioStat["Solar_Rays"].gte(this.cost());
              else return player[this.layer].points.gte(this.cost())
            },
            buy() {
              if (!player.Sol.activeCheck == "Heliosphere") if (player.S.points.gte(this.cost) && player.C.checkUpgrades.lt(1)) player.S.points = player.S.points.minus(this.cost());
              else  player.Sol.HelioStat["Solar_Rays"].minus(this.cost)
              



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
              
              if (hasUpgrade("L",23)) effect = effect.mul(upgradeEffect("L",23))  

              if (player.C.activeCheck == "Formality") effect = effect.pow(0.666)
              if (player["C"].activeCheck == "Twilight") effect = effect.clampMin(0.1).log(12)
              if (hasUpgrade("E",13)) effect = effect.mul(upgradeEffect("E",13))

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

              let dx = x.plus(player.S.Bulk_M)

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

              if (player.Sol.activeCheck == "Heliosphere") {
                if (player.Sol.HelioStat["Solarity"].gte(this.cost) && !getBuyableAmount(this.layer, this.id).gte(100)) {addBuyables(this.layer, this.id, 1)} 
              }
              else if (player.points.gte(cost)) addBuyables("S", 12, player.S.Bulk_M)
              else if (player.points.gte(this.cost)) addBuyables("S", 12, 1)
              else player.points = player.points.plus(1) // :trol:




             // player.S.points = player.S.points.minus(this.cost(amount));
            },

            display() {
              let nerf = tmp[this.layer].buyables[this.id].effect.pow(1.501501502)

              let nerfText = ``
              if (player["C"].activeCheck == "Heirarchy") nerfText = `x${format(nerf)} -> `
              
              if (player.Sol.activeCheck == "")  
              return `
            <h2>Multiply #${getBuyableAmount(this.layer, this.id)}</h2>
            <br>
          <h2> ${nerfText}  x${format(buyableEffect("S",12))} to Solarity Gain</h2>
            <br>
          <h2>${format(tmp[this.layer].buyables[this.id].cost)} Solarity</h2> <br>
          <h3> [Requires Plasmate #15] </h3>
          `
          else if (player.Sol.activeCheck == "Heliosphere") {
              return `<h1> ${getBuyableAmount(this.layer, this.id)} / 100 </h1>
                        >15
              `
              } 

            },
            canAfford() {     
              if (player.Sol.activeCheck == "Heliosphere" ) 
                return player.Sol.HelioStat["Solarity"].gte(this.cost()) && getBuyableAmount("S",11).gte(15) && getBuyableAmount("S",12).lt(100)              
              else if (player.Sol.activeCheck == "") return player.points.gte(this.cost()) && getBuyableAmount("S",11).gte(15)
  
            },
            buy() {
            if (!player.Sol.activeCheck == "Heliosphere")
              if (player.points.gte(this.cost)) { if (player.C.checkUpgrades.lt(2)) player.points = player.points.minus(this.cost()); }
            else if (player.points.gte(this.cost) && player.Sol.activeCheck == "Heliosphere") player.Sol.HelioStat["Solarity"] = player.Sol.HelioStat["Solarity"].minus(this.cost());
              
            if (!(getBuyableAmount("S",12).gte(100) && player.Sol.activeCheck == "Heliosphere")) addBuyables(this.layer, this.id, 1);



            },
            effect() {
              let effect = decimalOne
              effect = Decimal.pow(1.1,getBuyableAmount(this.layer, this.id))
              if (player.C.EffectorTier.gte(4)) effect = effect.mul(player.S.points.log(16).clampMin(1))
              if  (player.C.checkUpgrades.gte(3)) effect = effect.pow(1.312)
              
              if (getBuyableAmount("L",12).gte(1)) effect = effect.mul(buyableEffect("L",12))
              if (hasUpgrade("L",12)) effect = effect.mul(upgradeEffect("L",12))
              if (hasUpgrade("L",23)) effect = effect.mul(upgradeEffect("L",23))  
                
              if (player["C"].activeCheck == "Heirarchy") effect = effect.pow(0.666)
              if (player["C"].activeCheck == "Twilight") effect = effect.log(12)
              
              if (getBuyableAmount("L",22).gte(3) && Hour.getHours() >= 12 ) effect = effect.mul((1.1 + (Hour.getHours() % 12)/55 ) ** Hour.getMinutes())
  

              //    if (hasUpgrade("E",13)) effect = effect.mul(upgradeEffect("E",13))
              
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
        {key: "s", description: "S to Solarize", onPress(){if (tmp["S"].Reset.canClick) tmp["S"].Reset.onClick}},
    ],
    layerShown(){return player.startedGame == true}
    
})