multiplyBeforeNerfs = new Decimal(0)


addLayer("S", {
   
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),

    Bulk_M: new Decimal(1),
    metaNerf: new Decimal(300),
    multMeta: new Decimal(1),
    metaScale: new Decimal(1),


    bestPointsInDark: new Decimal(0),
    poweredInst: new Decimal(1)

      
    
    }},
    color: "#ff6a00",
    


    nodeStyle() {
      return {
        
         // "margin": "-19cm 0cm 25px",
        
          "bottom": options.betterTree ? "2.5cm" : "2.5cm",
          "height": options.betterTree ? "100px" : "125px",
          "width": options.betterTree ? "170px" : "125px",

          "border": "var(--hqProperty1)",
          "border-color": player.borders["SR"],
          "border-radius": options.betterTree ? "7%" : "50%",
          
          
      }

    },

    symbol() {
      return `
      <p><img src="resources/Solarizor.png" style="width:70px;height:70px;"></p>`
      },

    
    tooltip()  {
      let loreText = `Open Layer 0, ${SR_tag}`
      if (options.betterTree && (player.Sol.activeCheck == "Heliosphere")) loreText = `<b>Where we die in the sun...</b>`
      if (options.betterTree) loreText = `<h3>The rays of our sun...</h3><br><i>Power rate: ^${format(tmp.S.exponent,5)}</i>`
      
      return loreText
    },

    /* 
if (hasUpgrade("dL",11) && player.Sol.TBCore.active) 
    */


    //: () => `<p>Open Layer 0, Main Layer</p>`,
    tabFormat: {
        "April 8th, 2024": {      
              content: [
                
                ["infobox","about"],
                ["display-text",
                function() { 
                  let forgotten = ``; if (player["E"].activeCheck == "Forgotton") forgotten = 
                  `<h3 style="color: #1c130f; text-shadow: 0px 0px 30px #ffffff;"> You Have ${format(player.S.points)} Shadow...? </h3>`; 
                  else if (player.Sol.TBCore.active) forgotten = `You have <b>${format(player.S.points.log(20).clampMin(1),3)} ${SR_tag}</b> <br><h5> (${format(player.S.points)} Solar Rays) `
                  else forgotten = `You Have ${format(player.S.points)} Solar Rays`
                  
                   if (player.Sol.activeCheck == "Heliosphere") forgotten = `<h3 style="color:rgba(204, 0, 0, 0.3); text-shadow: 0px 0px 50px rgba(196, 104, 4, 0.67);"> ~~~~~~~~~~~ ${format(player.Sol.HelioStat["Solar_Rays"])}<h3 style="color: #170f1c; text-shadow: 0px 0px 30px #ffffff;">`
                  return `${forgotten}`
          
               }],
               "blank",
               
//let TBCoreRestrict = `<br><h4 style="color: #4c0000ff"> Because of TBC2, every purchase divides your current Core energy by 1.5 </h4>`
                ["Reset", {id: 11, title: "SOLARIZE"}],


                "blank",

                ["display-text",
                function() { 
                  let TBCoreRestrict = `<h4 style="color: rgba(${70+(vib)}, ${(vib+10)}, ${(vib/2)+35}, 1)";> Because of TBC2, every purchase roots your Solar rays by 2 </h4>`
                  if (player.Sol.TBCore.active && getCoreDifficulty().gte(2) && getBuyableAmount("S",11).gte(5)) return TBCoreRestrict
                }], 
                ["row", [ //check upgrades
                   ["upgrade",11],
                   ["upgrade",12], 
                   ["upgrade",13], 
                   ["upgrade",21],  
                   ["upgrade",14], 
                   
               ]], 


               "blank",
                ["display-text",
      function() { 
      let RootEFF1 = new Decimal(40)
	    let RootEFF2 = new Decimal(35)
      let MAX = (hasMilestone("E", 2) && player.L.activeCheck == "") ? 3 : 2
    if (player.Sol["TBCore"].active && getCoreDifficulty(3)) MAX = 0.85;
  	else if (player.Sol["TBCore"].active && getCoreDifficulty(2)) MAX = 1;
	  else if (player.Sol["TBCore"].active && getCoreDifficulty(1)) MAX = 1.5;


  	  let eff1 = player.S.points.root(RootEFF1.sub(upgradeEffect("S",12))).clampMin(1)
  	  let eff2 = player.S.points.root(RootEFF2.sub(upgradeEffect("S",12))).clampMin(1)
        let capped = ``
      eff1 = !player.Sol["TBSun"].active ? softcap(eff1, new Decimal(2), 0.3).clampMax(MAX) : eff1

          //if (hasMilestone("E",1)) gain2 = gain2.pow(1.732)

          if (eff1==2 && hasMilestone("E", 2)) capped = `(capped)`

          let TBSN1 = ``; let TBSN2 = ``;
        
        let badRaysTxt = ``
        if (getCoreDifficulty().eq(2)) badRaysTxt = `Solarity exponent increase by [Disabled]`
        else if (getCoreDifficulty().eq(1)) badRaysTxt = `Solarity by ^${format(eff1,3)} ${capped}`





        if (player.Sol["TBSun"].active) return `<h3 class="ignThemes"> <s>Solar Rays Boost the following: </s><br><br> <s> Solarity by ^${format(eff1,3)} ${capped} </s><br> <s>Solarity by ${format(eff2,3)} </s></h3>
        <br> "Forget the sun that's injured, broken even..." - Solaris</i>
        `
        else if (player.Sol["TBCore"].active && getCoreDifficulty().lt(3)) return `
        <h4 class="ignThemes">
         Solar Rays Boost the following: <br>
        <i></h3><h3 style="color: rgba(${100-(vib*-1.5)}, ${(vib+10)/1.2}, ${(vib/2)+10}, 1)">
         ${badRaysTxt}</h4> </i> 
        <br>
         <h4 class="ignThemes"> Core Energy by +${format(eff2.log(20),3)} <br>
        <br><i> "reject the dishonorable rays, and find your own path..." - The Core </i> </h4>
        `
        
        let getOldPointGen = player.points.log(20).root(0.85)

        if (player.Sol["TBCore"].active && getCoreDifficulty().gte(3)) return `Core energy reduced to ^0.85... <br> <h6>-${format(getOldPointGen.div(player.points.log(20)))} to core energy</h6>`
        
        let basePower = 1.5
        if (hasUpgrade("S",12)) basePower = 1.7
        if (hasUpgrade("S",12) && player.E.EclipseTier.gte(2)) basePower = 1.9

        if (player.Sol.solarBurst || player.Sol.testBurst) return `<h3 class="ignThemes">removed: Solar rays bonuses
        <br>
        Instead: ^${basePower} to solarity
        </h3>
        `
        else return `<h3 class="ignThemes"> Solar Rays Boost the following: <br><br>  Solarity by ^${format(eff1,3)} ${capped} <br> Solarity by ${format(eff2,3)} </h3>` 
       

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
        
        player.S.metaScaling
        let antiscale =  Decimal.plus(   1  ,   Decimal.div(x.sub(player.S.metaNerf).root(1.5) , 25  )     ) 
      
        
        let textA = `` 
        let textB = ``
        let textC = `` 
        let textD = ``  
        
        let TRMoon = player.Sol["TRMoon"].x
        let TRMoonP = player.Sol["TRMoon"].pending

        let totalDiff = TRMoon.plus(TRMoonP)

        if (totalDiff.gte(5) && player.Sol["TRMoon"].active) scale = new Decimal(4) ;


        let prec = 0
        if (player.Sol.TRMoon.x.gte(5)) prec = 2

//MetaScale
        let display = ``
        if (x.gte(25)) 
        textA = `Nerf 1: <p> Every 25 of 'Multiply' Purchases multiplies its Buyables cost by 3 <p><br>`
        if (x.gte(100)) 
        textB = `Nerf 2: <p> Every 100 of 'Multiply' Purchases multiplies its Buyables cost by 9 <p><br>`
                
        if (player.Sol.TBCore.active ) textA = `Nerf 1: Every 25 of 'Multiply' Purchases adds its requirements by 0.15`
        if (player.Sol.TBCore.active ) textB = `Nerf 2: Every 100 of 'Multiply' Purchases adds its requirements by 0.45`
        
        if (x.gte(200)) 
        textC = `Nerf 3: <p> [200 Multiply] : 'Multiply' base scaling is applied twice <p><br>`
        if (x.gte(player.S.metaNerf) && !(totalDiff.gte(5) && player.Sol["TRMoon"].active)) 
        textD = `Meta Nerf: add a new scaling of ${format(player.S.metaScaling)}^x (starts at ${format(player.S.metaNerf,prec)})`
        else textD = (totalDiff.gte(5) && player.Sol["TRMoon"].active) ? `<s>Meta Nerf: add a new scaling of ${format(player.GL.Solar_Shards.pow(5))}^x (starts at ${player.S.metaNerf})</s> <br>
         <b> "A pure balance of good and bad... just only then you'll suffer enough." - Lunaris<br>` : ``
          let nerf1 =  getBuyableAmount("S",12).div(25).floor().mul(3 / 20)
          let nerf2 =  getBuyableAmount("S",12).div(100).floor().mul(9 / 20)
          let inflatedMultiply = nerf1.plus(nerf2)
          mInf = ``
   if (player.Sol.TBCore.active ) mInf = `<h5>(Multiply's Cost requirement is increased by an additional <span style="color: rgba(${100-(vib*-1.5)}, ${(vib-10)/1.2}, ${(vib/2)-10}, 1)">${format(inflatedMultiply)}</span>) </h5>`


        return `${textA} <br> ${textB} ${mInf} <br> ${textC} <br> ${textD} <br> `

     }],
      ["row", [ //check upgrades
        ["display-text", 
        function() {if (hasUpgrade("dL",11) && player.Sol.TBCore.active) return `(Disabled: Plasmate)`}],
                   ["buyable",11],
                   ["buyable",12], 
                  
               ]], 

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
            let gained = player.S.points.plus(tmp["S"].getResetGain).log(20).sub(player.S.points.log(20)) 
            
            let CORE_ENERGY = `Solarity`
            let useSymbol = `^`
            if (player)
            if (player.Sol.TBCore.active) {
              CORE_ENERGY = "Core Energy"
              useSymbol = `x`
            }
           
            
             


            if (player.Sol.activeCheck == "")
            return `
            Gain ${SR_tag} by ${useSymbol}${format(tmp.S.exponent,autoAcc)} of ${CORE_ENERGY}, Then Reset ${CORE_ENERGY}.
            <br>
             (Requires at least 1 ${CORE_ENERGY})<br><br>
            ${SR_tag} earned: ${nerfText} ${player.Sol.TBCore.active ? format(gained,3) : format(tmp["S"].getResetGain)} ${SR_tag} 
            <br>`

            else return `<h3 style="color:rgba(125, 68, 6, 0.66); text-shadow: 0px 0px 50px rgba(255, 244, 172, 0.5);"> +${format(player.Sol.HelioStat["Solarity"].clampMin(1).log(10))} </h3>` //``

            },     
          onClick() {
            let gain = tmp["S"].getResetGain
            player.S.points = player.S.points.add(gain)
            player.points = new Decimal(0)
            player.resetTime = decimalZero

            },
          canClick() {if (player.points.gte(1)) return true},
          
        //  gain: () => { return player.L.LunarPower.clampMin(1).log(5)},
          button: () => { return `Form ${SR_tag}` },
          unlocked() {return true},
      },          
     },
//
    exponent() { Hour = new Date()
      let multiboost = decimalZero

      if (hasMilestone("E",1) && player.L.activeCheck == "") multiboost = multiboost.plus(0.03)
      
        let TBC3Improve = 1
        if (player.Sol.TBCore.x.gte(3)) TBC3Improve = 1.25
      if (Hour.getHours() <= 12 && getBuyableAmount("L",21).gte(1)) multiboost = multiboost.plus( ((Hour.getHours() % 12)  / 150) * TBC3Improve) 
      if (player.Sol.SolarFragments.gt(1)) multiboost = multiboost.plus(player.Sol.SolarFragments.log(10).div(100))
      
      return upgradeEffect("S",11).plus(0.1).plus(multiboost)
      },

update(diff) {
 //technical stuff
 player.resetTime = player.resetTime.plus(decimalOne.mul(diff))

  
  if (!player.Sol.solarBurst) player.points = player.points.clampMax("1e800")


  if (player["C"].activeCheck == "Heirarchy" || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) ) player.S.metaNerf = player.S.metaNerf.mul(0).add(1)
  else player.S.metaNerf = new Decimal(300)



 // old start is 300
 if (player.Sol.TRMoon.x.gte(5)) player.S.metaNerf = player.S.metaNerf.plus(player.resetTime.div(60).mul(2).plus(50))


  let BulkPurchase = new Decimal(1)

  if (Check("C",12).has) BulkPurchase = new Decimal(5)
 // if (player.E.EclipseTier.gte(3)) BulkPurchase = BulkPurchase.plus(5)


  let Twilight = new Decimal(0.75)
  if (hasMilestone("E",3)) Twilight = Twilight.plus(0.15)
  if (hasMilestone("E",5)) Twilight = Twilight.plus(0.15)
  if (player.Sol["TBCore"].active) Twilight = new Decimal(0.01)

  if (player["C"].hasTwilight) player.S.points = player.S.points.plus(getResetGain("S").clampMin(1).pow(Twilight))


  //Twilight QoL
    if (hasMilestone("E",4)) player.S.points = player.S.points.plus(player.points.clampMin(1).log(10).times(diff)) 
      player.S.Bulk_M = BulkPurchase;
  
    //SR Cap
    
   
  
   //The Bleeding Eclipse
  let TBSun = player.Sol["TBSun"].x
  let TBSunP = player.Sol["TBSun"].pending
  let BLEEDINGSUN_POWER = 1
  let CORE2_INFL = player.Sol.TBCore.active && getCoreDifficulty().gte(2)
  if (CORE2_INFL) BLEEDINGSUN_POWER = 7
  else if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(1) ) BLEEDINGSUN_POWER = TBSun.plus(TBSunP).mul(2).plus(1)
  
  if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(1) || CORE2_INFL) player.S.poweredInst = decimalOne.plus( player.L.LunarPower.log(7.5)).pow(player.L.LunarPower.log(4)) .clampMin(1).pow(BLEEDINGSUN_POWER)

  // TBE +3

   
    
    
    
    if (getClickableState("L",42) == true && tmp["S"].getResetGain.clampMin(0).pow(0.09).gte(player["S"].bestPointsInDark)) player["S"].bestPointsInDark = tmp["S"].getResetGain.clampMin(0).pow(0.09).clampMin(1)
   
    if (getClickableState("L",42) && player.S.points.gte(getSRCap())) player.S.points = player.S.points.clampMax(getSRCap())

      // /


    //generally for meta scale

      let x = getBuyableAmount("S",12)
      scaledAmt = x.sub(player.S.metaNerf)
   
      if (getBuyableAmount("S", 12).gte(player.S.metaNerf)) player.S.metaScaling = getBuyableAmount("S", 12).sub(player.S.metaNerf).root(1.5).div(25).add(1)
      if (hasUpgrade("C",32)) player.S.metaScaling = player.S.metaScaling.div(DarknessUpgs_Row3[1])

      if (getBuyableAmount("S",12).gte(player["S"].metaNerf)) player["S"].multMeta = scaledAmt.pow_base(player.S.metaScaling)


      if (hasUpgrade("S",13) && !hasUpgrade("S",21)) player.S.upgrades.push(21) 
      else if (hasUpgrade("S",21) && !hasUpgrade("S",13)) player.S.upgrades.push(13)
      

     if (player.startedGame && player.timerOfBonus >= 0.01) player.timerOfBonus -= diff 
    
     player.RMT = generateRandomNumber(-30,30)

     

     },


getResetGain() {
  if (player.points.lt(1)) return Decimal.dZero;
    let Helio = player.Sol.activeCheck == "Heliosphere" ? 0.7 : 1
    let gain = player.Sol.activeCheck == "Heliosphere" ? player.Sol.HelioStat["Solarity"].clampMin(1).log(10) : Decimal.pow(player.points, tmp.S.exponent).minus(1);

    let f = player.Sol.activeCheck == "Heliosphere" ? player.Sol.HelioStat["Solar_Rays"].clampMin(1) : player.S.points   ;
    let TBSun = player.Sol.TBSun.x
    let TBSunP = player.Sol.TBSun.pending

    

    if (hasUpgrade("S", 14)) gain = Decimal.times(upgradeEffect("S", 14).pow(Helio), gain)
    if (hasUpgrade("GL",31)) gain = gain.times(upgradeEffect("GL",31).pow(Helio))

      let TBC1Bonus = new Decimal(1)
               if (player.Sol["TBCore"].x.gte(1)) {
                let TBCore = player.Sol["TBCore"].x 
                TBC1Bonus = decimalOne.plus((TBCore.mul(0.25)).mul(new Decimal(1.5).pow_base(TBCore)));
           //.pow(TBC1Bonus)
          }  

    if (player.C.EffectorTier.gte(2)) gain = gain.times( f.log(4).clampMin(1).pow(TBC1Bonus))
    
    


   
    if (hasUpgrade("C",12)) gain = gain.times(DarknessUpgs_Row1[1] ** Helio) // Jear 2
    if (hasUpgrade("C",13)) gain = gain.times(DarknessUpgs_Row1[2] ** Helio) // Jear 3
    if (hasUpgrade("C",21)) gain = gain.pow(DarknessUpgs_Row2[0]) // Neaver
    
    //Check debuffs
      {  
    if (player.C.activeCheck == "Formality" || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))) gain = gain.pow(0.666)
    if (player["C"].activeCheck == "Twilight" || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))) gain = gain.log(12)
    if (player["E"].activeCheck == "Forgotton" ) gain = gain.root(5)
    } 

    if (hasMilestone("E",1)) gain = gain.mul(player.E.EclipseTier.pow_base(5).pow(Helio))
    
    if (player.L.LightCheck.gte(1) && player.L.Light.gte(1)) gain = gain.mul(player.L.Light.pow(0.25).pow(Helio).clampMin(1)) 
    if (hasUpgrade("Sol",12)) gain = gain.mul(upgradeEffect("Sol",12).pow(Helio))
      

      //for The Bleding Eclipse 3+
     let BLED_SOLARS_POWER = decimalZero
     
     if (player.Sol["TBCore"].active && getCoreDifficulty().eq(2)) BLED_SOLARS_POWER = 0.27;
     else if (TBSun.plus(TBSunP).gte(3)) BLED_SOLARS_POWER = TBSunP.plus(TBSun).div(11);   

     let BLEEDING_SOLARS = player.S.poweredInst.pow(BLED_SOLARS_POWER) 
     
     if (player.Sol.TBCore.active && getCoreDifficulty().eq(2)) gain = gain.div(BLEEDING_SOLARS);
     else if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(3)) gain = gain.div(BLEEDING_SOLARS);
       
     let GuidanceBoost = decimalOne
        if (hasUpgrade("dL",11) && player.Sol.TBCore.active){ GuidanceBoost = player.C.CenterPoints.clampMin(1).log(3);
        GuidanceBoost = GuidanceBoost.pow_base(20)
      }
      gain = gain.mul(GuidanceBoost)
     
    

    gain = gain.mul(player.Sol.SolarFragments.pow(2.4))
    if ( player.timerOfBonus != 0 ) gain = gain.mul(1.5)                          
  return gain//.clampMin(1);

},
// also kind of redundant, 
getNextAt() {
return  tmp["S"].getResetGain

},
    //kind of redundant. I use getResetGain() now :)
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },


    automate() {
      if (!(player.Sol["TBCore"].active && getCoreDifficulty().gte(1))) {
        if ( player["C"].hasFormality && player.L.activeCheck == "") buyMaxBuyable("S",11)
        if ( player["C"].hasHeirarchy && player.L.activeCheck == "") buyMaxBuyable("S",12)
        }

      if (player.Sol.TRMoon.x.gte(3)) buyMaxBuyable("GL",11)  

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
                let requires = `Requires:<br> Plasmate #5 <br><br> <br>`
                if (hasUpgrade("dL",11) && player.Sol.TBCore.active) requires = `Requires: 200 Solar Light<br><br> <br>`
                
                let costDisplay = `Cost: 22 ${SR_tag}`
                if (player.Sol.TBCore.active) costDisplay = `Cost: 1.032 ${SR_tag}`
                
                return !(player.Sol.activeCheck == "Heliosphere") ? ` <h2>Intricity</h2> <br>
                ${requires}
                
                +${hasUpgrade("S",11) ? upgradeEffect("S",11) : "???"} ${SR_tag} Gain Exponent <br> <br>
                ${costDisplay}
                
                ` : `<h1>The Sun<h1>`
            },
           
            cost: new Decimal(22),
            canAfford() {
              if (hasUpgrade("dL",11) && player.Sol.TBCore.active) return player.GL.Solarlight.gte(200)
              else if (getBuyableAmount("S",11).gte(5) && player["S"].points.gte(this.cost)) return true
            else return false

            },
            unlocked() {
              if (getBuyableAmount("S",11).gte(5) || player.C.EffectorTier.gte(1) || hasUpgrade("dL",11)) return true
            },
            style() {
              return {
                "width": "160px",
                "height": "85px",
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
            
            onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("S")
            },
         
        },

        12: {
          fullDisplay() {
            let showText = `???`
            if (hasUpgrade("S",12)) showText = `-${upgradeEffect("S",12)}`
              let costDisplay = `2.33e24`
              if (player.Sol.TBCore.active) costDisplay = `18.73`

            let requires = `Requires:<br> Plasmate #10 <br><br> <br>`
            if (hasUpgrade("dL",11) && player.Sol.TBCore.active) requires = `Requires: ${costDisplay} ${SR_tag}<br><br> <br>`
            //
            let bonus = 0.2
            if (player.E.EclipseTier.gte(2)) bonus = 0.4
            

             let upgTextbeforeBurst = `${showText} to the root formula of ${SR_tag} bonus <br><br>`  
             if (player.Sol.solarBurst || player.Sol.testBurst) upgTextbeforeBurst = `+${bonus} to the static power bonus`


            return !(player.Sol.activeCheck == "Heliosphere") ? `<h2>Polarize</h2> <br>
              ${requires}
              ${upgTextbeforeBurst}
              ${!(hasUpgrade("dL",11) && player.Sol.TBCore.active) ? "Cost: 105 Solar Rays" : "<br>"}
              
              ` : `<h1>Must aquire<h1>`
          },
          cost: new Decimal(100),
          canAfford() {
              if (hasUpgrade("dL",11) && player.Sol.TBCore.active) return player.S.points.gte(2.33e24)
              else if (getBuyableAmount("S",11).gte(10) && player["S"].points.gte(this.cost)) return true
              else return false
          },
          unlocked() {
            if (hasUpgrade("S",11) || player.C.EffectorTier.gte(2)) return true
          },
          style() {
            return {
              "width": "160px",
              "height": "85px",
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
          onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("S")
            },
      },
      
        13: {
        fullDisplay() {
          let enter;
          
              if (player.Sol.TBCore.active && hasUpgrade("S",13)) enter = format(upgradeEffect("S",13).log(20) , 3 )
              else if (hasUpgrade("S",13)) enter = format(upgradeEffect("S",13) )
              else enter = "???"

              let readNormal = player.Sol["TMSun"].active ? `IGNORE<br>IGNORE<br>IGNORE <br>` : ``
              let readNormal2 = player.Sol["TMSun"].active ? `` : `<br> Gravitation's effect is ${enter}<br>`
              if (player.Sol.TBCore.active && hasUpgrade("S",13) && getCoreDifficulty().gte(3)) readNormal2 = `<br> Added +${enter} to Core Energy<br>`

              let readNormal3 = player.Sol["TMSun"].active && !player.Sol.TBCore.active && getCoreDifficulty().gte(3) ? `<s>^0.05 of <br> boosts</s>` : `^0.05 of Solarity boosts themselves`
              if (player.Sol.TBCore.active) readNormal3 = `5% of core energy adds itself`

              let readNormal4 = player.Sol["TMSun"].active   ? `<h2>Gravit</h2><br> ` : `<h2>Gravitation</h2>`
              let readNormal5 = player.Sol["TMSun"].active  ? `Requires:` : `Requires: Multiply #20`

              if (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) readNormal4 = `<h2>BROKEN</h2>`
              if (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) readNormal5 = `<h2>no </h2>`
              if (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) readNormal3 = ``
              if (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) readNormal2 = ``
              
            //synergy
            return !(player.Sol.activeCheck == "Heliosphere") ? `${readNormal4}<br>
                ${readNormal5} <br><br><br><br>
                ${readNormal3} <br> 
                ${readNormal2}
            ` : `<h1>it's acursed<h1>`
        },
        cost: new Decimal(0),
        canAfford() {
            if (getBuyableAmount("S",12).gte(20) && player["S"].points.gte(this.cost) ) return true
            else return false
        },
        effect() {
          let effect = new Decimal(1)
          
          if (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) return decimalOne;
          else if (player.Sol["TMSun"].active) return decimalOne;
          
          else return player.points.pow(0.05).clampMin(1)
          
        },
        onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("S")
            },
        unlocked() {
          if (hasUpgrade("S",12) || player.C.EffectorTier.gte(3)) return true
        },
        style() {
          return {
            "width": player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))? "80px" :"160px",
            "height": player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))? "80px" : "37.5px",
            "border-radius": "0px",
            "border": "0px",
            "margin": player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))? "11px" : "5px",
            "transform": player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))? "rotate(10deg)" : "rotate(0deg)",
            "letter-spacing": player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) ? "2px" : "0px",
            "filter": player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) ? "blur(1px)" : "blur(0px)",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#664257"
          }
        },
    },  
    21: {
        fullDisplay() {
          let enter
          if (hasUpgrade("S",13)) enter = format(upgradeEffect("S",13) )
          let readNormal4, readNormal5;
          let normalTMSun = `Solarity <br> themselves <br>`
              if (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) readNormal4 = `<h2>UPGRADE</h2><br><h2>synergy </h2><br><br>`

          

              if (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) normalTMSun = ``    



          else enter = "???"
            return !(player.Sol.activeCheck == "Heliosphere") || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) ? `${readNormal4} <br>
            Multiply #20 <br><br><br> 

            ${normalTMSun}
            
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
          if (player.Sol["TMSun"].active && (hasUpgrade("S",12) || player.C.EffectorTier.gte(3))  || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) && hasUpgrade("S",12) ) return true
        },
        style() {
          return {
            "width": "80px",
            "height": "37.5px",
            "border-radius": "0px",
            "border": "0px",
            "margin": player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) ? "11px" : "0px",
            "transform": player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) ? "rotate(-10deg)" : "rotate(0deg)",
            "letter-spacing": player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) ? "2px" : "0px",
            "filter": player.Sol["TMSun"].active || (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) ? "blur(1px)" : "blur(0px)",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#664257"
          }
        },
        onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("S")
            },
    },
        14: {
      fullDisplay() {
        let enter
        
        if (hasUpgrade("S",14)) enter = format(upgradeEffect("S",14) )
        else enter = "???"

        let requires = `Requires:<br>Plasmate #17 <br>
          Multiply #25 <br><br>`
            if (hasUpgrade("dL",11) && player.Sol.TBCore.active) requires = `Requires:<br> Multiply #100 <br><br>`

          return !(player.Sol.activeCheck == "Heliosphere") ? `<h2>Solarizor</h2> <br>
          ${requires}
          log15 of ${SR_tag} boosts themselves <br> 
          <br> Solarizors effect is ${enter}<br>
          ` : `<h1>sacrifice... your<h1>`
      },
      cost: new Decimal(0),
      canAfford() {
          if (hasUpgrade("dL",11) && player.Sol.TBCore.active) return getBuyableAmount("S",12).gte(100)
          else if (getBuyableAmount("S",11).gte(17) && getBuyableAmount("S",12).gte(25)) return true
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
      onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("S")
            },
  },    

    },
    
//if (player.C.checkUpgrades.gte(1))

    buyables: { 
        11: {
            cost(x) {
              let scale = new Decimal(1.35)
              

              let base = new Decimal(5)
              
              
              let TRMoon = player.Sol["TRMoon"].x
              let TRMoonP = player.Sol["TRMoon"].pending

              let totalDiff = TRMoon.plus(TRMoonP)

              if (totalDiff.gte(5) && player.Sol["TRMoon"].active) scale = new Decimal(5) ;
              

              let Calculation = new Decimal(base).mul(Decimal.pow(scale, x))
              if (player["C"].activeCheck == "Heirarchy") {
                let scaledAmt = getBuyableAmount("S",12)
                let metaScaling = scaledAmt.root(1.5).div(25).add(1).pow(scaledAmt)
                Calculation = Calculation.mul(metaScaling)
              }    

              if (hasUpgrade("GL",11)) Calculation = Calculation.pow(0.9).div(3)

              

              if (getBuyableAmount(this.layer,this.id).lt(5) && player.C.CenterPoints.lte(0) && player.GL.points.lte(0) && player.E.EclipseTier.lte(0)) Calculation = Calculation.div(1.1)
              return Calculation.clampMin(5);
            },
            buyMax() {
              
              
              let scale = new Decimal(1.34);
            //  if (hasMilestone("E",1)) scale = scale.times(1.01)
               let base = new Decimal(5);
               let TRMoon = player.Sol["TRMoon"].x
               let TRMoonP = player.Sol["TRMoon"].pending

               let totalDiff = TRMoon.plus(TRMoonP)

               if (totalDiff.gte(5) && player.Sol["TRMoon"].active) scale = new Decimal(5) ;
              
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
              if (hasUpgrade("dL",11) && player.Sol.TBCore.active) return false 
              else if (player["S"].points.gte(5) || player["GL"].Solar_Shards.gte(1) || getBuyableAmount("S",11).gte(1)) return true

            },
            display() {
             
              
              let nerf = tmp["S"].buyables[11].effect.pow(1.501501502)
              let nerfText = ``
              let TBCoreRestrict = `<br><br><h4 style="color: rgba(${255 - (vib/2)}, ${vib*1.2}, ${vib*1.2}, 1)"> Because of TBC2, every purchase roots your current Solar rays by 2 </h4>`
              // rgba(255, 0, 0, 1)
              if (player.Sol.TBCore.active && getCoreDifficulty().gte(3) )  nerfText = `+${format(tmp["S"].buyables[11].effect.div(0.666).plus(12).div(20) )} -> `
              else if (player.C.activeCheck == "Formality") nerfText = `+${format(nerf)} -> `
              
            
             let displayNormal = format(this.effect()) + " to Solarity Gain"
             if (player.Sol.TBCore.active) displayNormal = format(this.effect().clampMin(1).log(20)) + " Free core energy"
              
            if (player.Sol.activeCheck == "")  return `
            <h2>Plasmate #${getBuyableAmount(this.layer, this.id)}</h2>
            <br>
            <h2> ${nerfText} +${displayNormal} </h2>
            <br>
            <h2>Costs: ${format(  tmp[this.layer].buyables[this.id].cost     )} Solar Rays</h2>
            ${player.Sol.TBCore.active && getCoreDifficulty().gte(2) ? TBCoreRestrict : "<br><br>"}
          `

            else if (player.Sol.activeCheck == "Heliosphere") {
              return `<h1> ${getBuyableAmount(this.layer, this.id)} / 100 </h1>`
              //player.Sol.activeCheck == "Heliosphere"
            } 

            },
            canAfford() {                                                                  // change to Solar Rays via player.Sol.HelioStat["Solar_Rays"]
              if (player.Sol.activeCheck == "Heliosphere") return getBuyableAmount("S",11).gte(100) ? false : player.Sol.HelioStat["Solar_Rays"].gte(this.cost());
              else return player.S.points.gte(this.cost())
            },
            buy() {
              if (!player.Sol.activeCheck == "Heliosphere") 
                {
                player.S.points = player.S.points.minus(this.cost());
                setBuyableAmount("S", 11, getBuyableAmount("S",11).plus(1))
              }
              else {player.Sol.HelioStat["Solar_Rays"].minus(this.cost); addBuyables(this.layer, this.id, 1);}
              

              if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1)) && player.S.points.gte(this.cost)) {buyMaxBuyable("S",11); }

              if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("S");
                
            },
            
            effect() {
              let TMSun = player.Sol.TMSun.x
              let TRMoon = player.Sol.TRMoon.x
              let TBSun = player.Sol.TBSun.x
              let TBCore = player.Sol.TBCore.x

              let TMSunP = player.Sol.TMSun.pending
              let TRMoonP = player.Sol.TRMoon.pending
              let TBSunP = player.Sol.TBSun.pending
              let TBCoreP = player.Sol.TBCore.pending


              let effect = decimalOne
              let base = new Decimal(1)
              if (getBuyableAmount("GL", 11).gte(1)) base = base.mul(buyableEffect("GL", 11).plus(1))
              effect = effect.mul(getBuyableAmount(this.layer, this.id)).mul(base)

                let TBC1Bonus = new Decimal(1)
               if (player.Sol["TBCore"].x.gte(1)) {
                let TBCore = player.Sol["TBCore"].x 
                TBC1Bonus = decimalOne.plus((TBCore.mul(0.25)).mul(new Decimal(1.5).pow_base(TBCore)));

                


                
           //.pow(TBC1Bonus)
          }


              if (player.C.EffectorTier.gte(3) && !(hasUpgrade("dL",11) && player.Sol.TBCore.active)) effect = effect.mul(player.S.points.log(9).clampMin(1).pow(TBC1Bonus))



             // if (hasMilestone("E",1)) effect = effect.pow(0.949)
              if (getBuyableAmount("L",11).gte(1)) effect = effect.mul(buyableEffect("L",11))
              
              if (hasUpgrade("L",23)) effect = effect.mul(upgradeEffect("L",23))  
// so (effect/12) - 0.666 
              if (player.C.activeCheck == "Formality"  || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))) effect = effect.pow(0.666)
              if (player["C"].activeCheck == "Twilight"  || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))) effect = effect.clampMin(0.1).log(12)
              if (hasUpgrade("E",13)) effect = effect.mul(upgradeEffect("E",13))
              
                
              if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(5)) effect = effect.div(player.S.poweredInst.clampMin(1).pow(0.27))   


              if (TMSun.gte(5)) effect = effect.pow( new Decimal(1.1).plus(player.resetTime.clampMin(0).div(60).mul(0.01)) )   
              return effect.clampMin(0);
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

        12: {
            cost() { //
              let scale = new Decimal(1.4)
              let base = new Decimal(500)
              let x = getBuyableAmount("S",12)

                  let TRMoon = player.Sol["TRMoon"].x
                  let TRMoonP = player.Sol["TRMoon"].pending

                  let totalDiff = TRMoon.plus(TRMoonP)

                  if (totalDiff.gte(5) && player.Sol["TRMoon"].active) scale = new Decimal(5) ;


              let cost = base.mul(scale.pow(x))
              if (hasUpgrade("GL",12)) cost = cost.pow(0.9).div(3)
              if (x.gte(25)) cost = cost.mul(Decimal.pow(3, x.div(25).floor()))
              if (x.gte(100)) cost = cost.mul(Decimal.pow(9, x.div(100).floor()))
              if (x.gte(200)) cost = cost.mul(Decimal.pow(1.4, x.sub(200)))
                if (x.gte(player.S.metaNerf) && !(totalDiff.gte(5) && player.Sol["TRMoon"].active)) {
                  scaledAmt = x.sub(player.S.metaNerf)
                  
                  cost = cost.mul(player["S"].multMeta)
                }     

                
              return cost;
            },

            buyMax() {
              let scale = new Decimal(1.4)
              let base = new Decimal(500)

              let TRMoon = player.Sol["TRMoon"].x
              let TRMoonP = player.Sol["TRMoon"].pending

              let totalDiff = TRMoon.plus(TRMoonP)

              if (totalDiff.gte(5) && player.Sol["TRMoon"].active) scale = new Decimal(5) ;

              let x = getBuyableAmount("S",12)

              let dx = x.plus(player.S.Bulk_M)

              let cost = base.mul(scale.pow(dx))
              
              if (hasUpgrade("GL",12)) cost = cost.pow(0.9).div(3)
              if (dx.gte(25)) cost = cost.mul(Decimal.pow(3, dx.div(25).floor()))
              if (dx.gte(100)) cost = cost.mul(Decimal.pow(9, dx.div(100).floor()))
              if (dx.gte(200)) cost = cost.mul(Decimal.pow(scale, dx.sub(200)))
                
                if (dx.gte(player.S.metaNerf) && !(totalDiff.gte(5) && player.Sol["TRMoon"].active)) {
                  scaledAmt = dx.sub(player.S.metaNerf)
                  cost = cost.mul(player["S"].multMeta)
                }   
       // console.log(metaScaling.root(scaledAmt))

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

               let requires = ` <h3> [Requires Plasmate #15] </h3>`
               if (hasUpgrade("dL",11) && player.Sol.TBCore.active) requires = `<h3> [Requires Nothing!] </h3>`

              

              let nerfText = ``
               if (player.Sol.TBCore.active && getCoreDifficulty().gte(3) )  nerfText = `${format(tmp["S"].buyables[12].effect.log(20).div(0.666).plus(0.6) )} -> `
               else if (player["C"].activeCheck == "Heirarchy") nerfText = `x${format(nerf)} -> `
              
              
              let TBCoreRestrict = `<h4 style="color: rgba(${255 - (vib/2)}, ${vib*1.2}, ${vib*1.2}, 1)"> Because of TBC2, every purchase divides your current Core energy by 1.5 </h4>`

             
              let showNormalCost = format(tmp[this.layer].buyables[this.id].cost) + " Solarity"
              if (player.Sol.TBCore.active) {
                showNormalCost = format(player.points.log(20)) + " / " + format(tmp[this.layer].buyables[this.id].cost.log(20)) + " Core Energy"
              }
              let displayNormalEffect = "x" + format(this.effect()) + " to Solarity Gain"
              
              if (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) displayNormalEffect = "+" + format(this.effect().log(20),3) + " Free core energy"
              else if (player.Sol.TBCore.active) displayNormalEffect = "+" + format(this.effect().log(20)) + " Free core energy"
             

          if (player.Sol.activeCheck == "") return `
            <h2>Multiply #${getBuyableAmount(this.layer, this.id)}</h2>
            <br>
            <h2> ${nerfText}  ${displayNormalEffect}</h2>
            <br>
            <h2> Costs: ${showNormalCost} </h2> <br>
           ${requires}
            ${player.Sol.TBCore.active && getCoreDifficulty().gte(2) ? TBCoreRestrict : ""}
          `
          else if (player.Sol.activeCheck == "Heliosphere") {
              return `<h1> ${getBuyableAmount(this.layer, this.id)} / 100 </h1>
                        >15
              `
              } 

            },
            canAfford() {  
              if (hasUpgrade("dL",11) && player.Sol.TBCore.active) return player.points.gte(this.cost())
              else if (player.Sol.activeCheck == "Heliosphere" ) 
                return player.Sol.HelioStat["Solarity"].gte(this.cost()) && getBuyableAmount("S",11).gte(15) && getBuyableAmount("S",12).lt(100)              
              else if (player.Sol.activeCheck == "") return player.points.gte(this.cost()) && getBuyableAmount("S",11).gte(15)
  
            },
            buy() {
            if (!player.Sol.activeCheck == "Heliosphere")
              if (player.points.gte(this.cost)) { if (player.C.checkUpgrades.lt(2)) player.points = player.points.minus(this.cost()); }
            else if (player.points.gte(this.cost) && player.Sol.activeCheck == "Heliosphere") player.Sol.HelioStat["Solarity"] = player.Sol.HelioStat["Solarity"].minus(this.cost());
              
            if (!(getBuyableAmount("S",12).gte(100) && player.Sol.activeCheck == "Heliosphere")) addBuyables(this.layer, this.id, 1);
            if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1)) && player.S.points.gte(this.cost)) {buyMaxBuyable("S",12 ); }

            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) player.points = player.points.root(1.5)
            },
            effect() {
              
              let TMSun = player.Sol.TMSun.x
              let TRMoon = player.Sol.TRMoon.x
              let TBSun = player.Sol.TBSun.x
              let TBCore = player.Sol.TBCore.x

              let TMSunP = player.Sol.TMSun.pending
              let TRMoonP = player.Sol.TRMoon.pending
              let TBSunP = player.Sol.TBSun.pending
              let TBCoreP = player.Sol.TBCore.pending

             

              let baseComp = 1.1
              if (TBSun.gte(5)) baseComp = new Decimal(1.2).plus(player.resetTime.clampMin(0).div(60).mul(0.01));

              let effect = decimalOne
              effect = effect.mul(getBuyableAmount("S",12).pow_base(baseComp))//  Decimal.pow(baseComp   ,getBuyableAmount(this.layer, this.id))

                let TBC1Bonus = new Decimal(1)
               if (player.Sol["TBCore"].x.gte(1)) {
                let TBCore = player.Sol["TBCore"].x 
                TBC1Bonus = decimalOne.plus((TBCore.mul(0.25)).mul(new Decimal(1.5).pow_base(TBCore)));
           //
          }

                let EffectorTier4_Boost = player.S.points.log(16).clampMin(1).pow(TBC1Bonus)      
                
                let GuidanceBoost = decimalOne
                if (hasUpgrade("dL",11) && player.Sol.TBCore.active){ GuidanceBoost = player.C.CenterPoints.clampMin(1).log(3);
                EffectorTier4_Boost = EffectorTier4_Boost.mul(GuidanceBoost.pow_base(20))
          
		
                }



                if (player.C.EffectorTier.gte(4)) effect = effect.mul(EffectorTier4_Boost);
                              

                if (player.hasTwilight && !player.Sol["TBCore"].active) effect = effect.pow(1.312)
                //if (player.C.checkUpgrades.gte(3))
              
              if (getBuyableAmount("L",12).gte(1)) effect = effect.mul(buyableEffect("L",12).clampMin(1))
              if (hasUpgrade("L",12)) effect = effect.mul(upgradeEffect("L",12).clampMin(1))
              if (hasUpgrade("L",23)) effect = effect.mul(upgradeEffect("L",23).clampMin(1))  
                
                

              if (player["C"].activeCheck == "Heirarchy" || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))) effect = effect.pow(0.666)
              if (player["C"].activeCheck == "Twilight"  || (player.Sol.TBCore.active && getCoreDifficulty().gte(3))) effect = effect.log(12)
              
                   if (getBuyableAmount("L",22).gte(3) && Hour.getHours() >= 12 ) effect = effect.mul((1.1 + (Hour.getHours() % 12)/55 ) ** Hour.getMinutes())
                multiplyBeforeNerfs = effect.log(20)
              if (player.Sol["TMSun"].active && TMSun.plus(TMSunP).gte(5)) effect = effect.clampMax(buyableEffect("S",11))

              if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(5)) effect = effect.div(player.S.poweredInst.clampMin(1).pow(0.27))  


             // if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(5))  


                
              //    if (hasUpgrade("E",13)) effect = effect.mul(upgradeEffect("E",13))
              
              if (getBuyableAmount("S",12).gte(1)) return effect;
              else return decimalOne
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