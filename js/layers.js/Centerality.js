var MaxSlotsPerRow = 1

var SR_tag = "Solar Rays"




addLayer("C", {
    position: 1, 
    startData() { return {
        unlocked: true,
        CenterPoints: new Decimal(0),
        FreeCP: new Decimal(0),
        Score: new Decimal(0),
        Highest: new Decimal(0),
        requirement: new Decimal(2000),
        EffectorTier: new Decimal(0), 
        checkUpgrades: new Decimal(0), //well, uh. since these are removed, I should give a boost to removed content
        hasFormality: false,
        hasHeirarchy: false,
        hasTwilight: false,  
        activeCheck: "",
        maxslots1: 1,
        maxslots2: 1,
        HeirarchyNerfStartAt: new Decimal(1e150), //VERY neccesary to be e150 rather than e140

        adaptiveReq: new Decimal(1e10),
    
    }},
    color: "#1f2129",
   
   symbol() {
    return `
    <p><img src="resources/Centrality.png" style="width:80px;height:80px;",></p>`
    },
   
   update(diff) {
    if  (player.Sol.TBCore.active) SR_tag = "Solar Energy" 




    if (hasUpgrade("GL",21)) player["GL"].Time = player["GL"].Time.plus(decimalOne.times(diff)).clampMin(0)

    let ScoreBoost = new Decimal(1)
    let Hour = new Date()

    let TBC3Improve = 1
    if (player.Sol.TBCore.x.gte(3)) TBC3Improve = 1.25

let NT2Buff = ((1 + (Hour.getMinutes() * (1 + Hour.getHours() % 12) / 1000)) ** TBC3Improve)
    if (Check("E",11).has && !(player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) ScoreBoost = ScoreBoost.mul(getBuyableAmount("GL",11).clampMin(1))
    if (getBuyableAmount("L",21).gte(1) && Hour.getHours() >= 12) ScoreBoost = ScoreBoost.pow(
      NT2Buff
    ) //buff this if DT is still too op
    
    if (getBuyableAmount("L",21).gte(3) && Hour.getHours() <= 12) ScoreBoost = ScoreBoost.mul(1+(1.1 ** Hour.getMinutes())/2 * (1.25 ** (Hour.getHours() % 12)))
    
    
fixNaNs()

 // 1.12^M -> 1.35^H


    let ScoreNerf = player.Sol.SolarHeat.sub(1).root(2.5).pow_base(1.02)

    
    if (hasUpgrade("GL",31) ) { 
    
     if (hasUpgrade("dL",11) && player.Sol.TBCore.active) {
      player.C.Score = getBuyableAmount("S", 12).pow(2.2).mul(ScoreBoost).div(ScoreNerf)
     } 
      else {
      player.C.Score = getBuyableAmount("S", 11).mul(getBuyableAmount("S", 12)).mul(ScoreBoost).div(ScoreNerf)
    }
    }
    
    if (player["E"].activeCheck == "Forgotton") player.C.Score = player.C.Score.pow(0.8)
   


    if (player.C.CenterPoints.lte(0)) player.C.CenterPoints = player.C.CenterPoints.mul(0)
    if (player.C.Score.gte(player.C.Highest)) player.C.Highest = player.C.Score
    let tmsunp = player.Sol["TMSun"].pending
    let tmsun = player.Sol["TMSun"].x
    let trmoonp = player.Sol["TRMoon"].pending
    let trmoon = player.Sol["TRMoon"].x
    

   

    //if (totalDiff.gte(5) && player.Sol["TRMoon"].active) scale = new Decimal(5) ;

    let total_Difficulty_TMSUN = tmsunp.plus(tmsun)
    let total_Difficulty_TRMOON = trmoonp.plus(trmoon)

    if (player.Sol["TMSun"].active) player.C.Score = player.C.Score.clampMax(new Decimal(100000).div(total_Difficulty_TMSUN.sub(1).pow_base(10)))
   
    if (player.Sol["TBCore"].active && getCoreDifficulty().eq(2)) player.C.Score = player.C.Score.clampMax(10000)  
    else if (player.Sol["TBCore"].active && getCoreDifficulty().eq(1)) player.C.Score = player.C.Score.clampMax(100000)
    

    //if (tmp["C"].hasFormality == undefined) {tmp["C"].hasFormality = false}

    fix(tmp["C"].hasFormality)
    fix(tmp["C"].hasHeirarchy)
    fix(tmp["C"].hasTwilight)
    

    let Divisor = new Decimal(1)

    if (hasMilestone("E",1)) Divisor = Divisor.mul(player.E.EclipseTier.pow_base(1.25))
    if (hasUpgrade("L",13)) Divisor = Divisor.mul(upgradeEffect("L",13))
    if (player.Adaptive && player.Sol.TRMoon.active && hasUpgrade("C", 22) ) {
      Divisor = Divisor.mul((getBuyableAmount("S",11).plus(getBuyableAmount("S",12))).clampMin(1).pow(0.4))
    }  


    
    let exponent = 0

    if (player.Sol.TBCore.x.gte(3)) TBC3Improve = 1.25
    if (Hour.getHours() >= 12 && getBuyableAmount("L",22).gte(1)) exponent = 1 - ((Hour.getHours() % 12) * TBC3Improve ) / 100; else exponent = 1
    


    let Compound = 1.35 
    if (player.Sol["TBCore"].active && getCoreDifficulty().eq(1)) Compound = new Decimal(1.6335) 

    if (player.Sol["TRMoon"].active) Compound = new Decimal(Compound).mul(total_Difficulty_TRMOON.pow_base(1.1))
    if (player.Sol["TRMoon"].x.gte(1)) Compound = new Decimal(Compound).sub(player.Sol.TRMoon.x.mul(0.02))   


//
   // 1.35 * 1.21 = 1.6335
    if (hasMilestone("E",4)) player.C.maxslots1, player.C.maxslots2 = 2;
    else player.C.maxslots1, player.C.maxslots2 = 1;
    

    player.C.requirement = player.C.CenterPoints.clampMin(1).pow_base(Compound).times(2000).div(Divisor).pow(exponent)

    
   
    
  }, 
  
 nodeStyle() {
      return {
        
         
          "bottom": options.betterTree ? "2.2cm" : "2cm",
          "right": options.betterTree ? "1.5cm" : "0px",
          "height": "120px",
          "width": "120px",

          "border": "var(--hqProperty1)",
          "border-color": player.borders["CEN"],
          "border-radius": "60%",
          
      }
/*
 nodeStyle() {
      return {
        
          "bottom": "2cm",
          "right": "1.5cm",
          "height": "120px",
          "width": "120px",
          "border": "var(--hqProperty1)",
          "border-color": player.borders["CEN"],
          "border-radius": "60%",
          
      }

*/


    },
    tabFormat: {
        "The Effector": {      
              content: [             
       ["display-text",
     function() { 
      let FourMTD = ``
      let sS = player.Sol["TRMoon"].active ? `<s>` : ``
      let sE = player.Sol["TRMoon"].active ? `</s>` : ``
      if (player.L.activeCheck == "TimeTillDark") FourMTD = `/<h3 style="color: #060114;"> 40 Dark Energy</h3>`; else FourMTD = `Center Points`

      if (player.Sol.activeCheck == "Heliosphere") 
              return `<h1 style="color:rgba(255, 255, 255, 0.74); text-shadow: 0px 0px 20px rgb(100, 100, 100);"> ${player.C.FreeCP.gt(0) ? format(player.Sol.HelioStat["CP"].plus(player.C.FreeCP)) : format(player.Sol.HelioStat["CP"]) } </h1>`;
      else if (player["C"].CenterPoints.gte(1) || player.C.EffectorTier.gte(1) || player.L.activeCheck == "TimeTillDark" || (Selecting("active") && player.Sol.TBCore.x.gte(2))) 
        return `
      You have ${format(player["C"].CenterPoints,1)}  
      
      ${sS}${player.C.FreeCP.gt(0) ? " (" + format(player.C.CenterPoints.plus(player.C.FreeCP)) + ") " : ""}${sE}
      ${FourMTD} `;
      
      
  
     }],
       ["display-text",
     function() { 
      let sS = player.Sol["TRMoon"].active ? `<s>` : ``
      let sE = player.Sol["TRMoon"].active ? `</s>` : ``
      
      let hell = player.Sol["TRMoon"].active ? `<br> <br><i>Remember when the night was audacious..?</i> - Lunaris` : ``

      // <i> you'll never need them again... </i> - Glade
      //
      let extraCP = player.C.FreeCP.gt(0) ? `Thanks to TRNG-5, You have formed an extra +${format(player.C.FreeCP)} Center Points` : ``
       
      let boost = `<h4 style="color:rgba(159, 22, 22, 0.99)";> /${format(Heirarchys_ValueBeforeSelfNerf.div(GetHeirarchyBonus()))} </h4>`
      if (Heirarchys_ValueBeforeSelfNerf.div(GetHeirarchyBonus()).lt(1)) boost = `<h4 style="color:rgba(17, 233, 28, 0.99)";> ${format(new Decimal(1).div(Heirarchys_ValueBeforeSelfNerf.div(GetHeirarchyBonus()))) } </h4>`
      let stateMode = `<span style="color:rgba(200, 150, 0, 0.99)"> Disdained </span>`
      if (Heirarchys_ValueBeforeSelfNerf.div(GetHeirarchyBonus()).gte(1)) stateMode = `<span style="color:rgba(192, 0, 0, 0.99)"> Harshcapped </span>`



      //down here is where the formula changes to make it better or less disparaging
      


      //Remove this if Solarity doesn't reach e800 by the time the player completes 5th studies of everything but not TBC3
      let increasedRoot= new Decimal(0)
      let baseRoot = new Decimal(1.5)
      if (GetHeirarchyBonus().gte(player.C.HeirarchyNerfStartAt) ) {
        increasedRoot = GetHeirarchyBonus().div(player.C.HeirarchyNerfStartAt).log(150).div(150).clampMin(0)
      }
      baseRoot = baseRoot.plus(increasedRoot)
      
      let Disdained = `${stateMode}: ${boost} to Heirarchy effect  <br> 
      <h5>root${format(baseRoot,4)} || Starts at: ${format(player.C.HeirarchyNerfStartAt)} </h5> 
      <h6>(Might get changed or removed at v0.7 depending on earlier progressions)</h6>
      ` //i think it should be just root(2) with +0.1 per log100 gng
      
      let PreDisdained =`` 
      if ( Heirarchys_ValueBeforeSelfNerf.gte(player.C.HeirarchyNerfStartAt) && Heirarchys_ValueBeforeSelfNerf.div(GetHeirarchyBonus()).gte(1) ) PreDisdained = `<span style="color:rgba(159, 22, 22, 0.99);"> ${format(Heirarchys_ValueBeforeSelfNerf)} -> </span>` 
      if ( Heirarchys_ValueBeforeSelfNerf.gte(player.C.HeirarchyNerfStartAt) && Heirarchys_ValueBeforeSelfNerf.div(GetHeirarchyBonus()).lt(1)) PreDisdained = `<span style="color:rgba(17, 233, 28, 0.99);"> ${format(Heirarchys_ValueBeforeSelfNerf)} -> </span>`
      
      let HeirarchyBoost = ``

      let forgotten = ``; if (player["E"].activeCheck == "Forgotton") forgotten = `<h3 style="color: #170f1c; text-shadow: 0px 0px 20px #ffffff;"> ${format(player["C"].Score )} Emptyness...? </h3>`; else forgotten = `${format(player["C"].Score )} / ${format(player.C.requirement)} Modifier Score.`

      let newBaseText = ``
      if (player.Sol.CPBoost.gt(0)) newBaseText = `Thanks to Aperature, Heirarchy's base is 5 -> ${format(player.Sol.CPBoost.plus(5))}`
      
      if (player["C"].hasHeirarchy) HeirarchyBoost = `Thanks to Heirarchy, Solarity is being boosted by ${PreDisdained} ${format(GetHeirarchyBonus())}
      
      <br>
      ${Heirarchys_ValueBeforeSelfNerf.gte(player.C.HeirarchyNerfStartAt) ? Disdained : ""}
      ` 
       // put the Harshcap text here! it starts at 1e150!
      

      if (player.Sol["TBCore"].active) HeirarchyBoost = `<i>why do we exist just to leave ourselves tenuous..?</i> - The Eclipse..? <br> <s>Thanks to Heirarchy, Solarity is being boosted by ${format(player.points.log(20).pow_base(5).pow(player.S.points.root(7)))}</s> `
     
     
     
      if (player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(2)) newBaseText = `<i>yet our eyes become weaker every falling second~</i> - The Core...?`
      if (player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(3)) extraCP = `<i>do you wish to harm his ego this bad?</i> - Glade...?`

      if (player.Sol.activeCheck == "") return `You have ${forgotten} <br><br> 
      ${sS}${HeirarchyBoost}<br>
      ${newBaseText}<br>
      ${extraCP}
      ${sE}
      ${hell}
      `
      else return ` <h2 style="color:rgba(121, 121, 120, 0.5); text-shadow: 0px 0px 20px rgba(37, 37, 37, 0.82);"> ${format(player["C"].Score)} / ${format(player.C.requirement)} </h2>
      <br>
      <h3 style="color:rgba(10, 10, 10, 0.6); text-shadow: 0px 0px 20px rgba(219, 219, 219, 0.5);"> 
      5 -> ${format(player.Sol.CPBoost.plus(5))} <br>
      x${format(GetHeirarchyBonus())} <br>
    
      </h3>
      <br>
    
      `

      // The shadow of the sun is darker than you can imagine...
      

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
       <br> There can be multiple goal requirements at once.
       <br> Whereas you have to meet its Enter requirements to start checking. 
       <br> these 'enter' requirements are called a 'gate'. or 'gates' if multiple requirements are needed
       <br> You also MUST check the previous check upgrade to be able to check the next, eg. you require check 1 to complete check 2.
       <br> You will see more of these later on, so do not expect these are the only ones... 
       <br> Oh also, you can only complete a check upgrade ONCE. except IF it is modified. which you will also see later on in this game.</h5>
       
       `
      if ((player["C"].hasFormality || player.E.EclipseTier.gt(0)) & !player["C"].hasHeirarchy) return `if you need a refresher on check upgrades, you can look at my docs, or you can wait until I add a button on refreshers on these types of things if you have unlocked them yet.`
      else if (player["C"].hasHeirarchy || player.E.EclipseTier.gte(2)) return ``
      else return ``

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
    
    
  
    // player["C"].CenterPoints
  /*
    ["display-text",
     function() { 
     /* 
       return ` <br>Highest Modifier Score Boosts Solar Light Cap by ${format(player.C.Highest.log(4).root(2))}  [Effector VI]<br>
       
       Your Current Modifier Increases The Base effect of Multiplys base by ^${format(player.C.Score.clampMin(1).log(7).root(7))}  [Effector VII]
       
       </br> `
  
     }],
    */

     ["display-text",
      function() { 
        
     
      let progression;
    
      if (player.C.EffectorTier.eq(4))
      progression = ``
      else if (player.C.EffectorTier.eq(3))
      progression = `[Last Minor Unlock at Effector Tier IV]`
      else if (player.C.EffectorTier.eq(2))
      progression = `[Next Minor Unlock at Effector Tier III]`
      else if (player.C.EffectorTier.eq(1))
      progression = `[Next Minor Unlock at Effector Tier II]`
      else if (player["C"].Score.gte(1))
      progression = `[Next Minor Unlock at 2000 Modifier Score]`
      else progression = ``
        return `${progression}<br>
   
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
            "blank",


            /*
               ["display-text",
                function() { 
                  let tempCalc = [new Decimal(256), new Decimal(30), new Decimal(DarknessUpgs_Row1[2])   ]
                 // let JearBonus = player.points.log(20).mul(). Math.round(10000*(Core_effValue*0.01))/10000 
                 let baseCoreThing = player.points.log(20).mul(CoreEffectMul)
                 let coreBoost = baseCoreThing.pow_base(20)
                  
                 //boost the thing
                 step1 = [tempCalc[0].mul(coreBoost), tempCalc[1].mul(coreBoost), tempCalc[2].mul(coreBoost)] 
                 //done!

                 //Apply formality for display and to make it accurate
                 step2 = [step1[0].pow(0.666), step1[1], step1[2].pow(0.666)] 

                 step3 = [step2[0].log(12), step2[1], step2[2].log(12) ]

                 step4 = [step2[0].log(20), step2[1], step2[2].log(20) ] 
                 // convert to core energy 

                  if (player.Sol.TBCore.x.gte(2)) return `<h5>Jear upgrade multiplier breakdown: <br>
                  
                  
                  
                  ${"log20 of JEAR1 (Base core energy): " + format(tempCalc[0].log(20)     )  }
                  <br>

                  
                  ${format(CoreEffectMul*100) + "% of core energy : " +"( "+ format(player.points.log(20).mul(CoreEffectMul) ) + " ) " }
                  <br>
                  ${"which translates to: " +" "+ format(coreBoost) + " to all Jear paths (before Formality/Twilight)" }
                  <br>
                  ${"jear paths are now: " + format(step1[0]) + " to Solarity, " + format(step1[1]) + " to SR, " + format(step1[2]) + " and " + format(step1[2]) + " to Solarity and SR"  }<br>


                  <br>
                  ${"Formality applied (Jear1, Jear2, Jear3): "  + format(step2[0] ) + " Solarity, NA" + ", " + format(step2[2] )+ " and " + format(step1[2]) + " SR"  }.
                  <br>
                  ${"Twilight applied after: " + format(step3[0]) + " Solarity , NA" +", " + format(step3[2] ) + " and " + format(step1[2]) + " SR"  }
                  <br>
                  ${"Converting to Core energy: " + format(step3[0].log(20)) + " Solarity , NA" +", " + format(step3[2].log(20) ) + " and " + format(step1[2]) + " SR"  }
                  

                  </h5>
        
                  
                  
                  `
             
            
              }],
            */

             ["display-text", `Row cost: 1 CP` ],
            ["row", [ //Row 1 Darkness tree upgrades
              
              ["upgrade",11],
              ["upgrade",12],
              ["upgrade",13],  
            ]],
            "blank", //player.C.EffectorTier.gte(3)
             ["display-text", `Row cost: 4 CP` ],
             () => { let text = ``
              player.Sol.TBCore.x.gte(2) ? ["display-text", `Row cost: 16 CP` ] : "blank"},
            ["row", [ //Row 2 Darkness tree upgrades

              ["upgrade",21],
              ["upgrade",22],
              ["upgrade",23],  
            ]],
            
            () => { let text = ``
              player.Sol.TBCore.x.gte(2) ? ["display-text", `Row cost: 16 CP` ] : "blank"},
            ["row", [ //Row 3 Darkness tree upgrades (Not unlocked until The Broken Core 2)

              ["upgrade",31],
              ["upgrade",32],
              ["upgrade",33],  
            ]],
            ["row", [ //Row 3 Darkness tree upgrades (Not unlocked until The Broken Core 2)
              ["clickable",31],
              ["clickable",21], // Adaptive
               
            ]],

            // let Notice = `Note: Adaptive is only temporary and resets on Recontrol!`
             ["display-text",
                function() { 
                  
                  if (player.Sol.TBCore.x.gte(2)) return `----------- Note: Adaptive is only temporary and resets on Recontrol! -----------`
             
            
              }],
            "blank",




            "blank",
            "blank",
            
          ],
          
          

              
        },

        //if (player.C.EffectorTier.gte(2)) {
        
        
        /* 
        
        */
          
        },

  Viewer: {

    11: {
      display() {

        const useCurrency = player.Sol.activeCheck == "" ? player.S.points : player.Sol.HelioStat["Solar_Rays"];

        //  
        const effects = [
          { log: 2, boosts: player.Sol.TBCore.active ? "Free core energy" : "Solarity", keep: "Intricity", on: "ALL layer 1 Resets.", tier: "I", pressure: "IS FAR"},
          { log: 4, boosts: SR_tag, keep: "Polarize", on: "ALL layer 1 Resets.", tier: "II", pressure: "GREATER THAN" },
          { log: 9, boosts: player.Sol.TBCore.active ? "Free core energy " : "Plasmate's effect", keep: "Gravitation", on: "ALL layer 1 Resets.", tier: "III", pressure: "WHAT YOU" },
          { log: 16, boosts: "Multiply's effect", keep: "Solarizor", on: "ALL layer 1 Resets.",tier: "IV", pressure: "CAN COMPREHEND. SECONDLY," },
          { log: 25, boosts: "Solarity Gain Cap", keep: "Shardism,Scorch, and Leverage", on: "ALL Recontrol Resets.",tier: "V", pressure: "AND THE BROKEN STARS" },
          { log: 36, boosts: "Light/Dark Generation", keep: "Annular", on: "ALL Recontrol Resets.", tier: "VI", pressure: "WILL COLLAPSE ON YOUR OWN WILL"  },

        ];
        let TBC1Bonus = new Decimal(1)
        if (player.Sol["TBCore"].x.gte(1)) {
           let TBCore = player.Sol["TBCore"].x 
           TBC1Bonus = decimalOne.plus((TBCore.mul(0.25)).mul(new Decimal(1.5).pow_base(TBCore)));
           //.pow(TBC1Bonus)
          }

        let GuidanceBoost = decimalOne
        if (hasUpgrade("dL",11) && player.Sol.TBCore.active){ GuidanceBoost = player.C.CenterPoints.clampMin(1).log(3);
        GuidanceBoost = GuidanceBoost.pow_base(20)
      }
        const effectsDisplay = player.Sol.activeCheck == "" ? effects.slice(0, player.C.EffectorTier.toNumber())
                                      .map(({log, boosts, keep, on, tier}, index) => `
                                      <h2>TIER  ${tier} </h2> <h3> 
                                      <br>${player.Sol.TBCore.active ? "(???) " : "log " + log + " of "}  ${SR_tag} ${player.Sol.TBCore.active ? " adds to " : "boosts"} ${boosts}. Keep ${keep} on ${on} 
                                      <br /> ${player.Sol.TBCore.active ? "+" + format(useCurrency.log(log).pow(TBC1Bonus).mul(GuidanceBoost).log(20).clampMin(1))
                                        
                                        + " to " + boosts :
                                        
                                      "Effector Tier " + tier + " effect is " + format(useCurrency.log(log).pow(TBC1Bonus).clampMin(1))  } 
                                      `)
                                      .join('<br><br>') :
                                      effects.slice(0, player.C.EffectorTier.toNumber())
                                      .map(({log, tier, pressure}, index) => `

                                      <h1>${tier}: ${format(useCurrency.log(log).clampMin(1))}</h1><br>
                                      <h2> ${pressure} </h2>

                                      `).join(`<br><br>`)
        
   
        if (player.E.EclipseTier.lt(1) || !player.C.EffectorTier.gte(1)) 
          if (player.Sol.activeCheck == "") return `<h1>Locked.</h1><br><h3>Get Effector Tier I to unlock this board</h3>`; 
          else return ``
        else return `${effectsDisplay}`

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


        if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) text = `<h1> The Core... </h1>`
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
        if ( player.C.EffectorTier.gte(4) || player.E.Eclipsium.gte(1) ) return true
        else if (player.Sol.activeCheck == "Heliosphere") return false
        else return false
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

    png() {
      if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) return `<p><img src="resources/The Cores Vision.png" style="width:100px;height:100px;"></p> `
      
      else return `<p><img src="resources/Formality.png" style="width:130px;height:130px;"></p> `}

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
        if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) text = `<h1> Demands it's...</h1>`
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
        if ( player.C.EffectorTier.gte(4) || player.E.Eclipsium.gte(1) ) return true
        else if (player.Sol.activeCheck == "Heliosphere") return false
        else return false
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

      png() {
         if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) return `<p><img src="resources/The Cores Vision.png" style="width:100px;height:100px;"></p> `
         else return `<p><img src="resources/Heirarchy.png" style="width:125px;height:125px;"></p> `}


  

    },

    13: {
    display() {
     
      
      let Twilight = new Decimal(0.75);if (hasMilestone("E",3)) Twilight = Twilight.plus(0.15);if (hasMilestone("E",5)) Twilight = Twilight.plus(0.15)

        
      if (player["C"].activeCheck == "Twilight" ) return `Goal: Multiply #30`  

      else if (Check("C",13).has && !player.Sol["TBCore"].active ) return `Multiply's effect is ^1.312, You now generate Solar rays ^${Twilight} of your solar rays (can be increased later on)<br>`
      
      if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) return `<h1> dignitary sacrifice... </h1>`
      
      else return `All effects are reduced to log12(x)<br><br>
      Requires:Phaser #25, Plasmate #262, Multiply #380, 15 Center Points  `
       
        //return `${text} `
      },
      onClick() {
        if (player["C"].activeCheck == "Twilight" && Check("C",13).CompReq == true ) {
          player["C"].hasTwilight = true

          //
          player["C"].activeCheck = ""
          doPopup("msg","Checkpoint: New theme unlocked", "Game Notifier",10)
          // message player that they have unlocked a new theme

        }
        else if (Check("C",13).canEnter == true) player.C.activeCheck = "Twilight"; layer1Reset()

      },
      unlocked() {
        if ( player.C.EffectorTier.gte(4) || player.E.Eclipsium.gte(1) ) return true
        else if (player.Sol.activeCheck == "Heliosphere") return false
        else return false
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

  png() {
    if ((player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))) return `<p><img src="resources/The Cores Vision.png" style="width:100px;height:100px;"></p> `
         else return`<p><img src="resources/Twilight.png" style="width:125px;height:125px;"></p> `}

  },

  },

    tooltip() {
      let plural = player.C.CenterPoints.plus(player.C.FreeCP).gte(1) ? `'s` : ``
      let Studies = ``
      if (player.Sol.TMSun.active) Studies = `It's epicenter gone wild...`
      else if (player.Sol.TRMoon.active) Studies = `The Moon isn't happy...`
      else Studies = `The center of it all...`
      let loreText = `<p>Open Centrality layer 1-A</p> <br> <i>you have ${format(player.C.CenterPoints.plus(player.C.FreeCP),1)} center points</i>`
      if (options.betterTree) loreText = `<h3> ${Studies} </h3><br><i>${format(player.C.CenterPoints.plus(player.C.FreeCP),1)} Solar Ray${plural} centered...</i>`
     
      
      return loreText
    },
  upgrades: {
    11: {
      fullDisplay() {

          let TBC2_Improve = `16x to Solarity gain`
          if (player.Sol.TBCore.x.gte(2)) TBC2_Improve = `256x to Solarity gain & it's cap`
          if (player.Sol.TBCore.active) TBC2_Improve = `${format(new Decimal(256).log(20))} Free Core energy`




          //NOTE: DO THIS EFFECT AFETR FORMALITY AND TWILIGHT
          
          if (player.Sol.TBCore.active && getCoreDifficulty().gte(3)) TBC2_Improve = `${format(new Decimal(256).log(12).pow(0.666).log(20) )} Free Core energy
          <br>
          
       


          `

          if (player.Sol.activeCheck == "") return `<h2>Jear 1</h2> <br>
          PATH SPLIT UPGRADE: <br>
          ${ TBC2_Improve }
          `; else return `
            <h1> THE COMBINED </h1>
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
          "text-shadow": "0px 0px 10px #965c3f",
            "color":" rgb(77, 77, 77)",
        }
      },
      onPurchased() {
        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("C")
      },
    },
    12: {
      fullDisplay() {

         if (player.Sol.activeCheck == "")  return `<h2>Jear 2</h2> <br>
          PATH SPLIT UPGRADE: <br>
         ${ player.Sol.TBCore.x.gte(2) ? "64x to Solar Rays" : "8x to Solar Rays"}
          `
          else return `
          <h1> FORCES OF </h1>
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
         "text-shadow": "0px 0px 10px #965c3f",
            "color":" rgb(77, 77, 77)",
        }
      },
      onPurchased() {
        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("C")
      },
    },
    13: {
  fullDisplay() {
    if (player.Sol.activeCheck == "")  return `<h2>Jear 3</h2> <br>
      PATH SPLIT UPGRADE: <br>
      ${ player.Sol.TBCore.x.gte(2) ? "30x to Solarity AND Solar Rays" : "4x to Solarity AND Solar Rays"} 
      `
      else return `
          <h1> THE SUN's </h1>
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
      "text-shadow": "0px 0px 10px #965c3f",
            "color":" rgb(77, 77, 77)",
    }
  },
  onPurchased() {
        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("C")
      },
    },

    21: {
      fullDisplay() {
        if (player.Sol.activeCheck == "")  return `<h2>Neaver</h2> <br>
          PATH SPLIT UPGRADE II: <br>
          ${ player.Sol.TBCore.x.gte(2) ? "^1.08 Solar Rays Gain" : "^1.05 Solar Rays Gain"} 
          `
          else return `
              <h1> PRESSURE WILL </h1>
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
        if (player.Adaptive) UpgradesTaken = UpgradesTaken.plus(1)

        return (!UpgradesTaken.eq(maxUpgradesAllowed)) 
      },
      unlocked() {
        if (player.C.EffectorTier.gte(3)&& !player.Adaptive) return true
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
      onPurchased() {
        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("C")
      },
    },
    22: {
      fullDisplay() {

          // Change the effects to the following:

          // if has TBC2, and is not inside of any "realms"
          // When light is active: ^1.15 to Solarity gain cap
          // When dark is active: ^1.04 to SR cap
          // When TMS is active: ^1.25 Modifier score (Post Hardcap)
          // ${format(player.C.Score.root(1.25))} -> ${format(player.C.Score)} 

          // When TBE is active: Lunar Inst debuff now starts later based on LE
          // Curently: 500 -> ${format(basedLALater)} <h5>(x${format(formulaLI_StartsLater),3}) 


          // When TRM is active: Plasmate and Multiply reduces CP requirement ✅ 
          // When TBC is active: 2% of Core energy boosts all Jear paths.  
          // Currently: +format(player.points.log(20).times(0.02),4) 


          // Outside of "realms": Solarity gain by ^1.15, and 
          // else if not have TBC2: Boost solarity gain by ^1.15

          
          //if there is an upgrade that increases row 2 slot by 1, add the effect prior to adaptive here in the display
        
           let basedLALater = new Decimal(100)
           let formulaLI_StartsLater = player.L.LunarEssence.pow(0.33)
           if (player.L.LunarEssence.gte(1)) basedLALater = basedLALater.mul(formulaLI_StartsLater)

           

           let formulaCP_ReduceCPReq = getBuyableAmount("S",11).plus(getBuyableAmount("S",12)).clampMin(1).pow(0.4)

         
          let AdaptiveEffDis = ``
          
          
          let requiresToBuy_TMS = ``
          if (player.Sol.TMSun.active && TMSun.plus(TMSunP).eq(5) && player.Adaptive && !hasUpgrade("C",22)) requiresToBuy_TMS = `Requires: >2.15e117 Solarity to aquire`
          else if (player.Sol.TMSun.active && TMSun.plus(TMSunP).eq(4) && player.Adaptive && !hasUpgrade("C",22)) requiresToBuy_TMS = `Requires: >7.15e134 Solarity to aquire`
          else if (player.Sol.TBCore.active && getCoreDifficulty().gte(3) && player.Adaptive && !hasUpgrade("C",22)) requiresToBuy_TMS = `Requires 16 Core energy to aquire`

          if (player.Sol.TBSun.active ) {
            if (player.Sol.TBSun.active && !player.L.LunarEssence.gte(1) ) AdaptiveEffDis = `<br>Note: This effect cannot be applied due to insufficent Lunar Essence.`
            else AdaptiveEffDis = `<br>The new Lunar Instability nerf is now: 100 -> ${format(basedLALater)} <h5>(x${format(formulaLI_StartsLater,3)}) `
          }
          
          let JearBonus = Math.round(10000*(Core_effValue*0.01))/10000 

          JearEffectBoost_Core = player.points.log(20).times(JearBonus)

          let difference = Core_effValue-prevCore_eff_Val
          let differText = `NA`
          if (difference>=1 && difference != 0) differText = `⬆️ +${format(difference,2)}`
          else if (difference<=1 && difference != 0) differText= `⬇️ ${format(difference,2)}`
         
          
          let result = new Decimal(0)
          let addedBonus = player.points.log(20).mul(JearBonus)
          if (player.Adaptive && player.Sol.TBCore.active ) {
          for (id in player.S.upgrades)  { if (id != 21 && getCoreDifficulty().gte(3)) result = result.plus(addedBonus) }
          for (id in player.GL.upgrades) { if (id != 14 && getCoreDifficulty().gte(3)) result = result.plus(addedBonus) }
          for (id in player.C.upgrades) { result = result.plus(addedBonus) }

            
		    
        

		}


          if (player.Sol.TBCore.active ) AdaptiveEffDis = `<br><br>
          You are getting ${format(JearEffectBoost_Core,3)} core energy per upgrade<br>
          Gave +${format(result,3)} free core energy (Ignores other check debuffs)
          <br><h4>(${format(100*JearBonus)}% of core energy) || ${format(cooldownBeforeChange-CoreEffectChange,1) } seconds to next change || ${differText}</h4> `



          if (player.Sol.TRMoon.active ) AdaptiveEffDis = `<br> ${format(player.C.requirement.mul(formulaCP_ReduceCPReq))} -> ${format(player.C.requirement)}. 
         (/${format(formulaCP_ReduceCPReq,3)})
        
          
          `
          if (player.Sol.TMSun.active  ) AdaptiveEffDis = `<br> Weaver's Adaptive for The Melted Sun is ${format(player.GL.Solar_Shards.log(7))}) `;



          if (getActiveRealmType() == "Dark") AdaptiveEffDis = `<br>SR Cap increased by ${format(getSRCap().div(SRCap_BeforeAdaptiveBonus))}`
          if (getActiveRealmType() == "Light") AdaptiveEffDis = `<br>Solarity Cap increased by ${format(capBeforeLightAdaptive.div(player.SolarityCap )) } (amount)`  
          
   //if (player.Adaptive && getActiveRealmType("Any") && hasUpgrade("C",22)) {effect = effect}

          let Adaptive = ``
          if (player.Sol.TBCore.x.gte(2) ) Adaptive = `(Adaptive)`


          let AdaptText = "^1.17 Solarity Gain"
          if (player.Adaptive) AdaptText = AdaptiveDisp[getActiveRealmType()]


          // copy: if (player.Adaptive && hasUpgrade("C" , 22) && getActiveRealmType("Any") ) {effect = effect}

          if (player.Sol.activeCheck == "") return `<h2>Weaver ${Adaptive}</h2> <br>
          PATH SPLIT UPGRADE II: <br>
          ${ player.Sol.TBCore.x.gte(2) ? AdaptText : "^1.15 Solarity gain"} 
          ${player.Adaptive && getActiveRealmType() != "None" && hasUpgrade("C",22) ? AdaptiveEffDis : "" }<br>
          ${requiresToBuy_TMS}
          `
          else return `BRING YOU`
      },
      cost() { 
         TMSun = player.Sol["TMSun"].x
         TMSunP = player.Sol["TMSun"].pending
         if (player.Sol.TMSun.active && TMSun.plus(TMSunP).eq(5) && player.Adaptive) return player.points.gte("6.15e116")
         else if (player.Sol.TMSun.active && TMSun.plus(TMSunP).eq(4) && player.Adaptive) return player.points.gte("7.15e137")
       
         if (player.Sol.TBCore.active && getCoreDifficulty().gte(3) && player.Adaptive) return player.points.log(20).gte(16)
         else if (hasUpgrade("C",22)) return new Decimal(4)

      },
      currencyDisplayName: "CenterPoints",
      currencyInternalName: "CenterPoints",
      currencyLayer: "C",

      canAfford() {

         TMSun = player.Sol["TMSun"].x
            TMSunP = player.Sol["TMSun"].pending

        let maxUpgradesAllowed = new Decimal(1)
        let UpgradesTaken = new Decimal(0)
        if (hasUpgrade("C",21)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",22)) UpgradesTaken = UpgradesTaken.plus(1)
        if (player.Adaptive) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",23)) UpgradesTaken = UpgradesTaken.plus(1)

        if (hasMilestone("E",4)) maxUpgradesAllowed = maxUpgradesAllowed.plus(1)

        if (player.Sol.TMSun.active && TMSun.plus(TMSunP).eq(5) && player.Adaptive) return player.points.gte("2.15e117")
        else if (player.Sol.TMSun.active && TMSun.plus(TMSunP).eq(4) && player.Adaptive) return player.points.gte("7.15e138") //might change idk
        else if (player.Sol.TBCore.active && getCoreDifficulty().gte(3) && player.Adaptive) return player.points.log(20).gte(16)
        else return (UpgradesTaken.lt(maxUpgradesAllowed)) 
      },
      unlocked() {
        let TMSun = player.Sol.TMSun.x
         let TMSunP = player.Sol.TMSun.pending
        let TMSDiff = TMSun.plus(TMSunP)

        if (player.C.EffectorTier.gte(3)) return true
        if (player.Sol.TMSun.active && TMSDiff.gte(4)) return true
        if (hasUpgrade("C",22) && player.Adaptive) return true
        
      },
      style() {
        let baseWidth = "200px"
        if (player.Adaptive) baseWidth = "400px"
        return {
          "width": baseWidth,
          "height": "75px",
          "border-radius": "0px",
          "border": "0px",
          "margin": "10px",
          "text-shadow": "0px 0px 10px #965c3f",
            "color":" rgb(77, 77, 77)",
        }
      },
      onPurchased() {
        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("C")

      },
    },
    23: {
    fullDisplay() {
      if (player.Sol.activeCheck == "")  return `<h2>Leaver</h2> <br>
      PATH SPLIT UPGRADE II : <br>
      ${ player.Sol.TBCore.x.gte(2) ? "36.33x solar Light cap AND Generation speed " : "3.14x solar Light cap AND Generation speed"} 
      `; else return `TO YOUR KNEES.`
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
        if (player.Adaptive) UpgradesTaken = UpgradesTaken.plus(1)  

        return (!UpgradesTaken.eq(maxUpgradesAllowed)) 
      },
    unlocked() {
    if (player.C.EffectorTier.gte(3) && !player.Adaptive) return true
    },
    style() {
      return {
        "width": "200px",
        "height": "75px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color":" rgb(147, 107, 130)",
      }
    },
    onPurchased() {
        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("C")
      },
    },


    /* 
    Rays
     ^1.05 to Multiply's effect


    Center
     +25 to Meta nerf start


    Light
      ^2 to BOTH Coronal ranges  
      (0.16 - 29.16)
      (/6.25 to x29.16)
    */
    31: {
      fullDisplay() {

        let PostNerf = ``
        if (Heirarchys_ValueBeforeSelfNerf.gte(1e150)) PostNerf = `<h5>(Ignores Disdained nerf!)</h5>`


      return `<h2>Bright</h2> <br>
      PATH SPLIT UPGRADE III : <br>
      x${format(DarknessUpgs_Row3[0])} to Heirarchy bonus<br><br>
      
      `
      //or /4 Modifier score requirement
      // maybe scales with harshcap?

    },
    currencyDisplayName: "CenterPoints",
      currencyInternalName: "CenterPoints",
      currencyLayer: "C",
      canAfford() {

        let hasTBC2 = player.Sol.TBCore.x.gte(2)

        let thing = Selecting("active")

        let maxUpgradesAllowed = new Decimal(1)
        let UpgradesTaken = new Decimal(0)
        if (hasUpgrade("C",31)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",32)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",33)) UpgradesTaken = UpgradesTaken.plus(1)
        
        if (!thing) return (!UpgradesTaken.eq(maxUpgradesAllowed) && player.C.CenterPoints.gte(16)) 
        else return (hasTBC2 && !UpgradesTaken.eq(maxUpgradesAllowed))
      },

    unlocked() { 
      if (Selecting("active") && player.C.CenterPoints.lt(16) ) return false
      else return player.Sol.TBCore.x.gte(2) 

    },
    style() {
      return {
        "width": "140px",
        "height": "75px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#67017dff"
      }
    },  
    
     pay() {
      if (!Selecting("active")) player.C.CenterPoints = player.C.CenterPoints.sub(this.cost);
      else if (Selecting("active")) player.C.CenterPoints = new Decimal(0.5)  //set to 0 if respeccing
    },
    

    },
    32: {
      fullDisplay() {
       return `<h2>Hyper</h2> <br>
      PATH SPLIT UPGRADE III : <br>
      /${DarknessUpgs_Row3[1]} to Meta nerf strength
      `
    },
   // cost: new Decimal(16),
    currencyDisplayName: "CenterPoints",
      currencyInternalName: "CenterPoints",
      currencyLayer: "C",
      canAfford() {

        let hasTBC2 = player.Sol.TBCore.x.gte(2)

        let thing = Selecting("active")

        let maxUpgradesAllowed = new Decimal(1)
        let UpgradesTaken = new Decimal(0)
        if (hasUpgrade("C",31)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",32)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",33)) UpgradesTaken = UpgradesTaken.plus(1)
        
        if (!thing) return (!UpgradesTaken.eq(maxUpgradesAllowed) && player.C.CenterPoints.gte(16)) 
        else return (hasTBC2 && !UpgradesTaken.eq(maxUpgradesAllowed))
      },
    unlocked() {
    if (Selecting("active") && player.C.CenterPoints.lt(16) ) return false
      else return player.Sol.TBCore.x.gte(2) 
    },
    style() {
      return {
        "width": "140px",
        "height": "75px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #ffffffff",
        "color": "#000000ff"
      }
    },  

     pay() {
      if (!Selecting("active")) player.C.CenterPoints = player.C.CenterPoints.sub(this.cost);
      else if (Selecting("active")) player.C.CenterPoints = new Decimal(0.5)
    },

    },
    33: {
      fullDisplay() { //not done with this one yet
       return `<h2>Light</h2> <br>
      PATH SPLIT UPGRADE III : <br>
      ^2 to BOTH Coronal ranges <br>
      (/6.25 to x29.16)
      `
    },
    //cost: new Decimal(16),
    currencyDisplayName: "CenterPoints",
      currencyInternalName: "CenterPoints",
      currencyLayer: "C",
      canAfford() {

        let hasTBC2 = player.Sol.TBCore.x.gte(2)

        let thing = Selecting("active")

        let maxUpgradesAllowed = new Decimal(1)
        let UpgradesTaken = new Decimal(0)
        if (hasUpgrade("C",31)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",32)) UpgradesTaken = UpgradesTaken.plus(1)
        if (hasUpgrade("C",33)) UpgradesTaken = UpgradesTaken.plus(1)
        
        if (!thing) return (!UpgradesTaken.eq(maxUpgradesAllowed) && player.C.CenterPoints.gte(16)) 
        else return (hasTBC2 && !UpgradesTaken.eq(maxUpgradesAllowed))
      },
    unlocked() {
     if (Selecting("active") && player.C.CenterPoints.lt(16) ) return false
      else return player.Sol.TBCore.x.gte(2) 
    },
    pay() {
      if (!Selecting("active")) player.C.CenterPoints = player.C.CenterPoints.sub(this.cost);
      else if (Selecting("active")) player.C.CenterPoints = new Decimal(0.5)
    },

    style() {
      return {
        "width": "140px",
        "height": "75px",
        "border-radius": "0px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#c0b06bff"
      }
    },  


    }               

  
            },
  
  Reset: {

    11: {   
       
      display() {
        let gain = ``
        let singular = !hasMilestone("E",3) && !getClickableState("E",14) ? `a` : `many`
        let singular2 = hasMilestone("E",3) && !getClickableState("E",14) ? `s` : ``
        let rootSS = player.Sol["TBCore"].x.eq(0) ? `<h5> note: this will also root solar shards by 4 </h5>` : ``
        let g = hasMilestone("E",3) && tmp["C"].CPgain.neq(player.C.CenterPoints) ? `Your CP will be set to ${player.Sol.activeCheck == "Heliosphere" ?  format(tmp["C"].CPgain.div(player.Sol.HelioStat["Reduction"].plus(player.C.FreeCP)  ),2) : tmp["C"].CPgain} on reset` : `You will earn +1 CP on reset`
  if (tmp["C"].CPgain.gte(1) ) gain = `${g}`
        return `
      <br> 
       <h4>To centralize all things that are solar...</h4><br> <span> Receive ${singular} Center point${singular2}, then reset Solar upgrades, Solarity, Solar Rays, and solar modifiers</span><br> 
        ${rootSS}          
           ${gain}
          
         `                       
                 },
                 onClick() {
                  if (hasMilestone("E",3) && !getClickableState("E",14))
                  player.C.CenterPoints = tmp["C"].CPgain
                //  else player.C.CenterPoints = player.C.CenterPoints.plus(1)
                  if (player.Sol["TBCore"].x.eq(0)) player.GL.Solar_Shards = player.GL.Solar_Shards.root(4)

                  layer1Reset(player.C.EffectorTier.gte(4), "C")
                  if (player.Sol["TBCore"].active) reset_GoldRays()
                },
             canClick() {
              let TrueScore = player.Sol.activeCheck == "Heliosphere" ? player.Sol.HelioStat["Modifier"] : player.C.Score
              

              if (TrueScore.gte(player.C.requirement) && tmp["C"].CPgain.neq(player.C.CenterPoints)) return true

            },
                                 
              unlocked() { return true },
       
             button: () => { if (!tmp["C"].CPgain.eq(0)) return !hasMilestone("E",3) ? `Centralize Once!` : `Centralize All!`; else return `Cant reset`},
                     },
       
                     
       
           },        

   CPgain() {

    let TrueScore = player.Sol.activeCheck == "Heliosphere" ? player.Sol.HelioStat["Modifier"] : player.C.Score
    ///TrueScore

    let Divisor = new Decimal(1)
    let mult = new Decimal()
      if (hasMilestone("E",1)) Divisor = player.E.EclipseTier.pow_base(1.35)
      if (hasUpgrade("L",13)) Divisor = Divisor.mul(upgradeEffect("L",13))


     if (player.Adaptive && player.Sol.TRMoon.active && hasUpgrade("C" , 22)) {
      Divisor = Divisor.mul((getBuyableAmount("S",11).plus(getBuyableAmount("S",12))).clampMin(1).pow(0.4))
    }  
        
      Hour = new Date()
      let exponent = 0
      let TBC3Improve = 0
    if (player.Sol.TBCore.x.gte(3)) TBC3Improve = 1.25
    if (Hour.getHours() >= 12 && getBuyableAmount("L",22).gte(1)) exponent = 1 - ((Hour.getHours() % 12) * TBC3Improve ) / 100; else exponent = 1

      
      
    //this is the buyMax reset thing

    let trmoonp = player.Sol["TRMoon"].pending
    let trmoon = player.Sol["TRMoon"].x
    
    let total_Difficulty_TRMOON = trmoonp.plus(trmoon)

  let Compound = 1.35
  if (player.Sol["TRMoon"].active) Compound = new Decimal(Compound).mul(total_Difficulty_TRMOON.pow_base(1.1))
  if (player.Sol["TRMoon"].x.gte(1)) Compound = new Decimal(Compound).sub(player.Sol.TRMoon.x.mul(0.02)) 

     if (hasMilestone("E",3) && TrueScore.gte(player.C.requirement)) mult = player.C.Score.root(exponent).times(Divisor).div(2000).log(Compound).round()
    
      if (player.Sol.activeCheck == "Heliosphere") mult = mult.div(player.Sol.HelioStat["Reduction"])
    return mult
   },         
  
  clickables: {
                
               
      
      12: {
                display() {

            
                  if (player.Sol.activeCheck == "") return `
                   <h3>Effector Tier ${player.C.EffectorTier}<br> (max 4) </h3>
                   Unlock a new Effect. <br>  
                   cost: ${format(Decimal.pow(2, player.C.EffectorTier))} Center Points<br>
                   `
                   else return `<h1> ${player.C.EffectorTier} / 4 </h1> `
                  

                },
                onClick() {
                
                player.C.CenterPoints = player.C.CenterPoints.sub(Decimal.pow(2, player.C.EffectorTier))
                player.C.EffectorTier = player.C.EffectorTier.plus(1)
                //if (player.C.CenterPoints.lte(0)) player.C.CenterPoints = player.C.CenterPoints.abs()
                if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("C") 

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
        let RemoveAdaptive = ``
        if (player.Sol.TBCore.x.gte(2)) RemoveAdaptive = `Note: This will also deactivate Adaptive!`
         return `
         <h3>Recenter the upgrade tree and do a Convertary reset (respec)<br>
         ${RemoveAdaptive}
         `
      },
      onClick() {
      
      layer1Reset()
     if (player.Adaptive) player.Adaptive = false

      player.C.upgrades = []
      //if (player.C.CenterPoints.lte(0)) player.C.CenterPoints = player.C.CenterPoints.abs()
        if (Selecting("active")) player.C.CenterPoints = decimalZero

      },
  canClick() {
    if (hasUpgrade("C",11) || hasUpgrade("C",12)|| hasUpgrade("C",13)) return true
  },
  unlocked() {
    if (player.E.EclipseTier.gte(4)) return true
    
  },
  style() { return {
    "width": "250px",
    "height": "65px",
    "border-radius": "0px",
    "border": "10px",
    "margin": "33px",
    "text-shadow": "0px 0px 10px #000000",
    
  }
}, 
      
  }, 
      21: {
      display() {
        let effectDisplay = getActiveRealmType() == "None" ? `EFFECT: Not in check...` : `EFFECT: ${getActiveRealmType()}`
        let active = !player.Adaptive ? `DISABLED` : `ENABLED`
       //${Notice}
        let canAdaptText = `Cannot Adapt: Weaver Required to adapt<br>` 
        let UpgradeTreeConditions = hasUpgrade("C",22) && !(hasUpgrade("C",21) || hasUpgrade("C",23))
        let CPAdaptiveConditions = player.C.Score.gte(player.C.adaptiveReq)
        //<br> Requires at least 5 Non-free CP
        if (CPAdaptiveConditions && (UpgradeTreeConditions) ) canAdaptText = `Click here to adapt Weaver! (Disables Neaver+Leaver)<br>`;
        else if (UpgradeTreeConditions && !CPAdaptiveConditions) canAdaptText = `Needs at least ${format(player.C.adaptiveReq)} Modifier Score to Go Adaptive! (Nothing this OP is free you know...)`;
        else if ([21, 22, 23].filter(id => hasUpgrade("C", id)).length >= player.C.maxslots2 ) canAdaptText = `Cannot adapt: Not enough slots to activate<br>`
        if (player.Adaptive) canAdaptText = ` `

        // (Centralizes and resets CP) </br> STATUS: ${} <br> Requires at least 5 Non-free CP`}


        return `<h3>ADAPTIVE MODE</h3>

        (Centralizes and resets CP)
         STATUS: ${active}<br>
         ${player.Adaptive ? effectDisplay : "EFFECT: Needs Adaptive..."} <br>
         ${canAdaptText} 
         
         `
      },
      onClick() {
      
        player.Adaptive = !player.Adaptive
        layer1Reset()
        player.C.CenterPoints = decimalZero
      },
  canClick() {
    /*
    player cannot get adaptive bonuses if:

    - the player has 2 upgrades in the row (including itself)
    - the player is not in any check
    - the player already have another upgrade purchased already


    if the player has purchased an upgrade from row 2, it will prevent you from activating adaptive bonuses
    */

    let AdjustReq = 1.5e10 // (at least 7PM)
    //should adjust these later
    if (player.Sol.TRMoon.active) player.C.adaptiveReq = new Decimal(1e8)

    else player.C.adaptiveReq = new Decimal(1.5e10)

    if (!player.Adaptive && player.C.Score.gte(player.C.adaptiveReq))//this gets cleared when exiting checks or respeccing
        {
          if (hasUpgrade("C",22) && !(hasUpgrade("C",21) || hasUpgrade("C",23))) return true
          else if ([21, 22, 23].filter(id => hasUpgrade("C", id)).length > player.C.maxslots2) return false
      
      } 
    


  },
  unlocked() {
    if (player.Sol.TBCore.x.gte(2)) return true
  },
  style() { return {
    "width": "250px",
    "height": "65px",
    "border-radius": "0px",
    "border": "10px",
    "margin": "33px",
    "text-shadow": "0px 0px 10px #000000",
    
  }
}, 
      
  }, 

            },


    
    branches: ["S"],
    layerShown(){ 
      if ( hasUpgrade("GL",31) || player.E.EclipseTier.gte(1) )   return true; 
  
    },
    row: 1, 
   
  }
  
  )


