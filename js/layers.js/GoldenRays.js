
var useCurrency = ""
var GL_useBranches = ["E","S"]


addLayer("GL", {
  name: "Compression", // This is optional, only used in a few places, If absent it just uses the layer id.
  //symbol: "Sol+", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,

      points: new Decimal(0), //i forgot what this was for lmao
      Solarlight: new Decimal(0),
      Solarlightcap: new Decimal(2000),
      bestCap: new Decimal(1),

      Solar_Shards: new Decimal(0),
      Time: new Decimal(0), // for unstable upgrades only
      
      ghh: 3,
      ghh2: 100,
    };
  },
  color: "#F0FA64",
  // Can be a function that takes requirement increases into account
  resource: "Solar Light", // Name of prestige currency
  baseResource: "Solarity", // Prestige currency uses this "base currency"
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have


   nodeStyle() {

      return {
          "bottom": "2.2cm" ,
          "left": options.betterTree ? "5cm" : "0px",
          "height": options.betterTree ? "105px" : "125px",
          "width": options.betterTree ? "105px" : "125px",

          "border": "var(--hqProperty1)",
          "border-color": player.borders["GL"],
          "border-radius": options.betterTree ? "43%" : "70%",
          
      }

    },

/*
 nodeStyle() {
      return {
        
          "bottom":  "2cm",
          "left": "5cm",
          "height": "105px",
          "width": "105px",

          "border": "var(--hqProperty1)",
          "border-color": player.borders["SL"],
          "border-radius": "60%",
          
      }

    },

*/

  symbol() {
    return `
      <p><img src="resources/The Converter.png" style="width:70px;height:70px;"></p>`;
  },

  update(diff) {

    let mult = new Decimal(0);
    let speed = new Decimal(1);
    let Hour = new Date();
    let BC2_INFL = false

    if (player.Sol["TBCore"].active && getCoreDifficulty().eq(2)) BC2_INFL = true


    if (
      getClickableState("GL", 11) == true &&
      !player["GL"].Solarlight.gte(player["GL"].Solarlightcap)
    ) {
      mult = Decimal.pow(
        getPointGen().clampMax(player.SolarityCap).pow(0.5),
        0.2
      ).sub(1);

      //increase genreative speed
      if (hasUpgrade("C", 16)) speed = speed.times(3.14);
      if (player.E.EclipseTier.gte(5))
        speed = speed.times(player.E.EclipseTier.sub(3).pow_base(1.5));
    }

    //for unstable upgrades
    if (hasUpgrade("GL", 14))
      player["GL"].Time = player["GL"].Time.plus(1).clampMin(0); //.times(diff)

    let Base = new Decimal(2000);

    // Increasing Solar Light Cap

    
    if (hasMilestone("E", 1) && player.L.activeCheck == "")
      Base = Base.mul(player.E.TopLVL.pow_base(1.75));
    if (hasUpgrade("C", 23)) Base = Base.mul(3.14);
    if (hasUpgrade("E", 11)) Base = Base.mul(upgradeEffect("E", 11));
    if (hasUpgrade("E", 13)) Base = Base.mul(2);
    if (!player.E.EclipseTier.gte(7)) Base = Base.mul(getBuyableAmount("E", 12).pow_base(1.35));
    if (hasMilestone("E", 5) && player.L.activeCheck == "")
      Base = Base.mul(player.C.Score.clampMin(1).pow(0.25));
    if (Hour.getHours() <= 12 && getBuyableAmount("L", 21).gte(1))
      Base = Base.mul(Hour.getMinutes() * 1.5 ** (Hour.getHours() % 12));
    
    if (BSolStones(3).unlocked) Base = Base.mul(BSolStones(3).effect);
    if (player.Sol["TMSun"].x.gte(1))
      Base = Base.pow(decimalOne.plus(player.Sol["TMSun"].x.mul(0.15)));

    // > TMSun and TBCore restrictions
    if (player.Sol["TMSun"].active)
      Base = new Decimal(100000)
        .div(player.Sol["TMSun"].pending.sub(1).pow_base(10))
        .pow(decimalOne.plus(player.Sol["TMSun"].x.mul(0.15)));

    if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Base = new Decimal(10000); 
    else if (player.Sol["TBCore"].active && getCoreDifficulty().eq(1))
      Base = new Decimal(100000); 
    

    //Solar Light cap QoL
    // 
    
    
    player.GL.Solarlightcap = Base;
    if ( player.E.EclipseTier.gte(6) && player.GL.Solarlightcap.gte(player.GL.bestCap) )
      player.GL.bestCap = player.GL.Solarlightcap;
    if (!player.Sol["TMSun"].active) {
      
      if ( player.E.EclipseTier.gte(6) )
        player.GL.Solarlightcap = player.GL.bestCap;
    }
   
    //Solar light generation
    player["GL"].Solarlight = player["GL"].Solarlight.plus(
      mult.times(speed).times(diff)
    ).clampMin(0).clampMax(player["GL"].Solarlightcap);

    //maybe this isnt needed?
    if (player["GL"].Solarlight.gt(player["GL"].Solarlightcap)) {
      player["GL"].Solarlight = player["GL"].Solarlightcap;
    }

    // passive solar shard generation
    let passive =
      player["Sol"].activeCheck == "Heliosphere"
        ? player.Sol.HelioStat["Solar_Light"].pow(0.2)
        : player.GL.Solarlight.pow(0.2);

      let TBSunP = player.Sol["TBSun"].pending;
        let TBSun = player.Sol["TBSun"].x;
        let passiveReduction = decimalOne  

    // Reduce passive gains QoL
        let BLEEDINGSUN_POWER = 1;
        if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(1))
          BLEEDINGSUN_POWER = TBSun.plus(TBSunP).mul(2).plus(1);
        
        let BLED_SOLARS = decimalZero;

        let BLED_SOLARS_POWER = decimalZero
        let BLEEDING_SOLARS = player.S.poweredInst.pow(BLED_SOLARS_POWER) 
        if (BC2_INFL) BLED_SOLARS_POWER = new Decimal(0.27);
        else if (TBSun.plus(TBSunP).gte(3)) BLED_SOLARS_POWER = TBSunP.plus(TBSun).div(11);  

        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2))  passiveReduction = passiveReduction.mul(BLEEDING_SOLARS);

        else if (player.Sol["TBSun"].active && TBSun.plus(TBSunP).gte(3))  passiveReduction = passiveReduction.mul(BLEEDING_SOLARS);
        








        if (TBSun.plus(TBSunP).gte(3)) BLED_SOLARS = TBSunP.plus(TBSun).div(11);

       

        
    
    // Solar shards passive generation
    if (
      player.E.forgotton == true &&
      !(player.Sol["TBCore"].active && player.Sol["TBCore"].pending.gte(1))
    )
      player.GL.Solar_Shards = player.GL.Solar_Shards.plus(
        passive
          .pow(decimalOne.plus(player.Sol["TMSun"].x.mul(0.15)))
          .div(passiveReduction)

          .times(diff)
      );

    if (player.Sol["TBSun"].x.gte(3) && getClickableState("GL",11) == false) {
        player.GL.Solarlight = player.GL.Solarlight.plus( (getPointGen().pow(0.5).pow(0.2).pow(0.3)).times(diff) ).clampMax(player.GL.Solarlightcap)
    }  

    // UTILITY STUFF
      // Broken upgrades VFX
    if (hasUpgrade("GL", 13) && !hasUpgrade("GL", 14))
      player.GL.upgrades.push(14);
    else if (hasUpgrade("GL", 14) && !hasUpgrade("GL", 13))
      player.GL.upgrades.push(13);
      // VFX for TMSun
    if (player.Sol["TMSun"].active) {
      player.GL.ghh += Math.random() * (5 - -5) + -5;
      player.GL.ghh2 += Math.random() * (5 - -5) + -5;
      if (player.GL.ghh > 40 || player.GL.ghh < -40) player.GL.ghh = 0;
      if (player.GL.ghh2 > 150 || player.GL.ghh2 < 80) player.GL.ghh2 = 100;
    }
  },

  tabFormat: {
    "Solarity of Disparity": {
      content: [
        [
          "display-text",
          function () {
            let forgotten = ``;
            if (player["E"].activeCheck == "Forgotton")
              forgotten = `<h3 style="color: #170f1c; text-shadow: 0px 0px 20px #ffffff;"> You Have Generated ${format(
                player["GL"].Solarlight
              )} / ${format(player["GL"].Solarlightcap)} Void...? </h3>`;
            else
              forgotten = `You Have Generated ${format(
                player["GL"].Solarlight
              )} / ${format(player["GL"].Solarlightcap)} Solar Light`;

            if (player.Sol.activeCheck == "Heliosphere")
              forgotten = `<h2 style="color:rgba(147, 147, 102, 0.4); text-shadow: 0px 0px 20px rgba(224, 221, 124, 0.7);"> ${format(
                player.Sol.HelioStat["Solar_Light"]
              )} </h2>`;

            return `${forgotten}`;
          },
        ],
        [
          "display-text",
          function () {
            let forgotten = ``;
            if (player["E"].activeCheck == "Forgotton")
              forgotten = `<h3 style="color: #170f1c; text-shadow: 0px 0px 20px #ffffff;"> You have ${format(
                player["GL"].Solar_Shards
              )} Gloom...? </h3>`;
            else
              forgotten = `You Have ${format(
                player["GL"].Solar_Shards
              )} Solar Shards`;

            if (player.Sol.activeCheck == "Heliosphere")
              forgotten = `<h2 style="color:rgba(255, 255, 0, 0.5); text-shadow: 0px 0px 20px rgba(105, 54, 6, 0.8);"> ${format(
                player.Sol.HelioStat["Solar_Shard"]
              )} </h2>`;
            if (player["GL"].Solar_Shards.gte(1)) return `${forgotten}`;
            //player.Sol.activeCheck == "Heliosphere"
          },
        ],

        // player["GL"].CenterPoints
        "blank",
        "blank",
        //"main-display",
        ["infobox", "about"],

        ["clickable", 11],
        ["clickable", 12],

        "blank",
        "blank",
        ["display-text",
            function() { 
            let TBCoreRestrict = `<h4 style="color: #4c0000ff"> Because of TBC2, every purchase roots your Solar Light by 2 </h4>`
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) return TBCoreRestrict
        }],  
        "upgrades",
        "blank",
        "blank",
        "blank",
      ],
    },
    "Light Modifiers": {
      content: ["buyables"],
    },
  },

  // if (player["GL"].Solar_shards.gte(1))
  tooltip() {
    let TMSunText = player.Sol.TMSun.active ? `...Rays of light broken.` : `...Where dawn breaks.`
    let loreText = `<p>Open The Converter layer 1</p> <br> <i>You have ${format(player.GL.Solar_Shards,2)} Solar Shards</i>`
    if (options.betterTree) loreText = `<h3>${TMSunText}</h3><br><p><i>${format(player.GL.Solar_Shards,2)} Shards of the sun...</i></p>`
    return loreText
  },
  upgrades: {
    11: {
      fullDisplay() {
        if (player.Sol.activeCheck == "")
          return `<h2>Shardism</h2> <br>
                
                Plasmates Cost is ^0.9 and then /3 <br> <br>
                Cost: 13.5 Solar Shards
                `;
        else
          return `<h1> 13.5 </h1>
                
                <br> <h2> Attempts of </h2>
                `;
      },
      cost: new Decimal(13.5),
      //currencyInternalName: player["GL"].Solar_Shards,
      currencyDisplayName: "Solar Shards",
      currencyInternalName: "Solar_Shards",
      currencyLayer: "GL",

      unlocked() {
        return true;
      },
      style() {
        return {
          width: "150px",
          height: "75px",
          "border-radius": "0px",
          border: "0px",
          margin: "5px",
          "text-shadow": "0px 0px 10px #000000",
          color: "#664257",
        };
      },
      onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("GL")
            },
    },
    12: {
      fullDisplay() {
        if (player.Sol.activeCheck == "")
          return `<h2>Scorch</h2> <br>
               
                
                Multiplys Cost is ^0.9 and then /3 <br> <br>
                Cost: 22 Solar Shards
                `;
        else
          return `<h1> 22 </h1>
                
                <br> <h2> Resistance will </h2>`;
      },
      cost: new Decimal(22),
      currencyInternalName: "Solar_Shards",
      currencyLayer: "GL",
      unlocked() {
        return true;
      },
      style() {
        return {
          width: "150px",
          height: "75px",
          "border-radius": "0px",
          border: "0px",
          margin: "5px",
          "text-shadow": "0px 0px 10px #000000",
          color: "#664257",
        };
      },
      onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("GL")
            },
    },
    13: {
      fullDisplay() {
        let enter;
        if (hasUpgrade("GL", 13) && player.Sol.TBCore.active) enter = format(player.points.pow(0.09).log(20)) 
        else if (hasUpgrade("GL", 13)) enter = format(upgradeEffect("GL", 13));

        else enter = "???";

        let readNormal = player.Sol["TMSun"].active? `IGNORE<br>IGNORE<br>IGNORE <br>`: `Cost: 35 Solar Shards`;
        let readNormal2 = player.Sol["TMSun"].active ? ``: `<br> Leverage's effect is ${enter}<br>`;
        if (player.Sol.TBCore.active && hasUpgrade("GL",13)) readNormal2 = `<br> Added +${enter} to Core Energy<br>`
        else if (player.Sol.TBCore.active) readNormal2 = `???`
        
        let readNormal3 = player.Sol["TMSun"].active ? `<s>^0.09 of <br> boosts</s>`: `^0.09 of Solarity boosts themselves`;
        if (player.Sol.TBCore.active) readNormal3 = `9% of core energy adds itself`

        let readNormal4 = player.Sol["TMSun"].active? `<h2>Leve</h2><br> <br><br>`: `<h2>Leverage</h2> <br> <br><br>`;
        if (player.Sol.activeCheck == "")
          return `${readNormal4}
                
                ${readNormal3} <br>
                ${readNormal} <br> 
                ${readNormal2}
                `;
        else
          return `<h1> 35 </h1>
              
                <br> <h2> be in </h2>`;
      },
      effect() {
        let effect = new Decimal(1);
        return (effect = player.Sol["TMSun"].active
          ? new Decimal(1)
          : player.points.pow(0.09));
      },
      cost: new Decimal(35),
      currencyInternalName: "Solar_Shards",
      currencyLayer: "GL",

      unlocked() {
        return true;
      },
      style() {
        // let MeltedSunUIChange = player.Sol["TMSun"].active ? "rotate(40deg);" : "rotate(0deg)"
        return {
          width: player.Sol["TMSun"].active ? "75px" : "150px",
          height: player.Sol["TMSun"].active ? "37.5px" : "75px",
          "border-radius": "0px",
          border: "0px",
          margin: player.Sol["TMSun"].active ? "25px" : "5px",
          "text-shadow": "0px 0px 10px #000000",
          color: "#664257",
          transform: player.Sol["TMSun"].active
            ? "rotate(10deg)"
            : "rotate(0deg)",
          "letter-spacing": player.Sol["TMSun"].active ? "1.5px" : "0px",
          filter: player.Sol["TMSun"].active ? "blur(1px)" : "blur(0px)",
        };
      },
      onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("GL")
            },
    },
    //broken "upgrade"
    14: {
      fullDisplay() {
        let enter;
        if (hasUpgrade("GL", 13)) enter = format(upgradeEffect("GL", 13));
        else enter = "???";

        let readNormal = player.Sol["TMSun"].active
          ? ` THE SUN<br>THE SUN<br>THE SUN`
          : `Cost: 35 Solar Shards`;
        let readNormal2 = player.Sol["TMSun"].active
          ? ``
          : `<br> Leverage's effect is ${enter}<br>`;
        if (player.Sol.activeCheck == "")
          return `<h2>rage</h2> <br> <br><br>
                
                <s> Solarity themselves </s><br>
                ${readNormal} <br> 
               
                `;
        else
          return `<h1> 35 </h1>
              
                <br> <h2> be in </h2>`;
      },
      effect() {
        return new Decimal(1);
      },
      cost: new Decimal(35),
      currencyInternalName: "Solar_Shards",
      currencyLayer: "GL",

      unlocked() {
        //^0.09 of Solarity boosts themselves <br>
        return player.Sol["TMSun"].active;
      },
      style() {
        // let MeltedSunUIChange = player.Sol["TMSun"].active ? "rotate(40deg);" : "rotate(0deg)"
        return {
          width: "75px",
          height: "37.5px",
          "border-radius": "0px",
          border: "0px",
          margin: player.Sol["TMSun"].active ? "8px" : "5px",

          transform: player.Sol["TMSun"].active
            ? "rotate(-10deg)"
            : "rotate(0deg)",
          "letter-spacing": player.Sol["TMSun"].active ? "1.5px" : "0px",
          filter: player.Sol["TMSun"].active ? "blur(1px)" : "blur(0px)",
          color: "#664257",
          "text-shadow": "0px 0px 10px #000000",
        };
      },
      onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("GL")
            },
    },

    21: {
      fullDisplay() {
        let max = 1.17;
        let min = 0.9;
        let range = max - min;

        //add max here
        max = new Decimal(max);
        if (hasUpgrade("Sol", 11))
          max = max.plus(player.Sol.CPBoost.root(4).sub(1));

        let enter;
        let change;
        if (hasUpgrade("GL", 21)) enter = format(upgradeEffect("GL", 21), 3);
        if (hasUpgrade("GL", 21))
          change = `Oscillating... <br>Annular's Effect is ^${enter}`;
        else change = `Cost: 105 Solar Shards`;

        let forgotten = ``;
        if (player["E"].activeCheck == "Forgotton")
          forgotten = `Forgotten Annulation?`;
        else forgotten = `Annular:`;

        if (player.Sol.activeCheck == "")
          return `
              <h2>${forgotten}</h2> <br>
              <h3 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;"> Instability... </h3><br><br>
            Requires: <br>
            Shardism <br>
            Scorch <br>
            Leverage <br><br>
            
            

            Boost Range: <br> 
            ^0.9 ~ ^${max.eq(1.17) ? max : format(max, 3)} to Solarity <br><br>
            
            ${change}`;
        else
          return `<h1>${format(upgradeEffect("GL", 21))}</h1>
           
           <br> <h2>Vain. THE </h2>
           `;
      },

      unlocked() {
        if (
          hasUpgrade("GL", 11) &&
          hasUpgrade("GL", 12) &&
          hasUpgrade("GL", 13)
        )
          return true;
      },
      branches: ["11", "12", "13"],
      cost: new Decimal(105),

      currencyInternalName: "Solar_Shards",
      currencyLayer: "GL",

      effect() {
        let max = 1.17;
        let min = 0.9;

        //add max here
        max = new Decimal(max);
        if (hasUpgrade("Sol", 11) && hasUpgrade("GL", 21))
          max = max.plus(player.Sol.CPBoost.root(4).sub(1));

        max = max.toNumber();

        let range = max - min;
        let offset = (max - 1) / 2;

        let effect = Decimal.plus(
          offset + 1,
          Math.sin(player["GL"].Time.div(30)) * (range / 2)
        ).sub(0.05);

        if (player["E"].activeCheck == "Forgotton") effect = new Decimal(0.8);

        return effect;
      },

      style() {
        return {
          width: "200px",
          height: "180px",
          "border-radius": "0px",
          border: "0px",
          margin: "15px",
          "text-shadow": "0px 0px 10px #000000",
          color: "#664257",
        };
      },
      onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("GL")
            },
    },
    31: {
      fullDisplay() {
        let enter;
        let change;
        if (hasUpgrade("GL", 31)) enter = format(upgradeEffect("GL", 31), 3);
        if (hasUpgrade("GL", 31))
          change = `Oscillating... <br>Coronal's Effect is ${enter}`;
        else change = `[Get Requirements to Unlock!]`;

        if (player.Sol.activeCheck == "")
          return `
            <h2>Coronal:</h2> <br>
            <h3 style="color: #f54242; text-shadow: 0px 0px 5px #2b0101;">Uncomfortibility </h3> <br><br>
          Requires:<br> Phaser #10<br> Plasmate #35<br> Multiply #70 <br><br>

          
          

          Boost Range: <br> 
          0.4x - 5.4x to Solar Rays<br><br>
          
          ${change}`;
        else return `<br> <h2> PRESSURE OF THE SUN </h2>`;

        // THE PRESSURE OF THE SUN IS FAR GREATER THAN WHAT YOU CAN COMPREHEND
        
      },
      unlocked() {
        if (hasUpgrade("GL", 21)) return true;
      },
      branches: ["21"],
      canAfford() {
        if (
          hasUpgrade("GL", 21) &&
          getBuyableAmount("S", 11).gte(35) &&
          getBuyableAmount("S", 12).gte(70) &&
          getBuyableAmount("GL", 11).gte(10)
        )
          return true;
        else return false;
      },
      effect() {
        return Decimal.plus(0.4, cos(player["GL"].Time.div(5)) * 5)
          .abs()
          .clampMin(0.4)
          .clampMax(5.4);
      },

      style() {
        return {
          width: "290px",
          height: "180px",
          "border-radius": "0px",
          border: "0px",
          margin: "35px",
          "text-shadow": "0px 0px 10px #000000",
          color: "#664257",
        };
      },
      onPurchase() {
            if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) Self_Reset("GL")
            },
    },
  },

  buyables: {
    11: {
      cost(x) {
        let scale = new Decimal(1.2);
        let base = new Decimal(5);
       
           let trmoonp = player.Sol["TRMoon"].pending
           let trmoon = player.Sol["TRMoon"].x
           let total_Difficulty = trmoonp.plus(trmoon)

        if (player.Sol["TRMoon"].active && total_Difficulty.gte(3)) scale = total_Difficulty

        if (player.Sol.TRMoon.x.gte(3) ) scale = scale.sub(player.Sol.TRMoon.x.sub(2).mul(0.02))

        let Calculation = new Decimal(base).mul(Decimal.pow(scale, x));
        if (hasUpgrade("L", 22)) Calculation = Calculation.pow(0.85);

        return Calculation;
      },
      display() {
        let TBCoreRestrict = `<br><h4 style="color: #4c0000ff"> Because of TBC2, every (manual) purchase divides your current Core energy by 1.5 </h4>`
        return `
      <h2>Phaser #${getBuyableAmount(this.layer, this.id)}</h2>
      <br>
      <h2>  +${format(tmp[this.layer].buyables[this.id].effect)} to Plasmates base. </h2>
      <br>
      <h2>${format(tmp[this.layer].buyables[this.id].cost)} Solar Shards</h2>
      <br>
      <p> Requires Plasmate #3 <p>
      ${player.Sol.TBCore.active && getCoreDifficulty().gte(2) ? TBCoreRestrict : ""}
  `;
      },
      canAfford() {
        if (player["Sol"].activeCheck == "Heliosphere")
          return (
            getBuyableAmount("GL", 11).lt(11) && player.Sol.HelioStat["Solar_Shard"].gte(this.cost())
          );
        else
          return (
            player["GL"].Solar_Shards.gte(this.cost()) && getBuyableAmount("S", 11).gte(3)
          );
      },
      buy() {
        if (player["GL"].Solar_Shards.gte(this.cost) && !player.Sol.TRMoon.x.gte(3) )
          player["GL"].Solar_Shards = player["GL"].Solar_Shards.minus(
            this.cost()
          );
        addBuyables(this.layer, this.id, 1);
        if (player.Sol.TBCore.active && getCoreDifficulty().gte(2)) player.GL.Solar_Shards = player.GL.Solar_Shards.root(1.7)
      },
      buyMax() {
        let scale = new Decimal(1.2);
        let base = new Decimal(5);
       
        let trmoonp = player.Sol["TRMoon"].pending
        let trmoon = player.Sol["TRMoon"].x
        let total_Difficulty = trmoonp.plus(trmoon)

        //TRM3
        if (player.Sol.TRMoon.x.gte(3) ) scale = scale.sub(player.Sol.TRMoon.x.sub(2).mul(0.02))
        if (player.Sol["TRMoon"].active && total_Difficulty.gte(3)) scale = total_Difficulty
  
       
        let upg= hasUpgrade("L",22) ? 0.85 : 1
        let amount = player.GL.Solar_Shards.root(upg).div(base).log(scale)
        
        setBuyableAmount("GL", 11, amount.floor());


     




      },

      effect() {
        let effect = decimalOne;
        effect = effect.mul(getBuyableAmount(this.layer, this.id));
        effect = effect.mul(getBuyableAmount("E", 11).add(1));
        effect = effect.mul(
          getBuyableAmount("Sol", 14)
            .pow_base(1.05)
            .pow(player.Sol.SolarHeat.log(4))
        );
        if (hasUpgrade("L", 22)) effect = effect.pow(1.15);

        return effect;
      },
      style() {
        return {
          width: "305px",
          height: "155px",
          "border-radius": "10px",
          border: "0px",
          margin: "5px",
          "text-shadow": "0px 0px 10px #000000",
          color: "#ffffff",
        };
      },
     
    },
  },

  clickables: {
    11: {
      display() {

        let autoActive = player.Sol["TBSun"].x.gte(3) && getClickableState("GL",11) == false ? `<h3>Thanks to The Bleeding Eclipse 3, you're generating ${format(getPointGen().pow(0.5).pow(0.2).pow(0.3))} Solar Light per second.
        </h3><br>
        (You can still start solar light generations!)` : ``

        let Inactive = `<h2>Start Up Solar Light Generation </h2> <br>[ Requires Solarizor ]<br>
                        ${autoActive}
        `;
        let Active = `<h2> Using ^0.5 of Solarity gain to generate ^0.2 of Solar Light...</h2><br>
                     When Stopping generation, Reset Solar Upgrades, Solarity, Solar Rays, And Solar Modifiers.  <br>
                    <p>(Note: Starting generation does NOT reset lower layers!)</p><br><br>
                      <br>`;
        return getClickableState("GL", 11) ? Active : Inactive;
      },
      onClick() {
        const currentState = getClickableState("GL", 11);
        setClickableState("GL", 11, !currentState);

        if (getClickableState("GL", 11) == true) {
          player.points = decimalZero;
        }
        if (getClickableState("GL", 11) == false) {
          let currentSOLARLIGHT = player.GL.Solarlight;
          layer1Reset(player.C.EffectorTier.gte(4), "GL");
          player.GL.Solarlight = currentSOLARLIGHT;
          currentSOLARLIGHT = decimalOne;

          if (player.Sol["TBCore"].active) reset_Cent();
        }
      },
      branches: ["11", "12"],
      canClick() {
        if (hasUpgrade("S", 14)) return true;
      },
      style() {
        return getClickableState("GL", 11)
          ? {
              width: "500px",
              height: "50px",
              "border-radius": "0px",
              border: "0px",
              margin: "25px",
              "text-shadow": "0px 0px 10px #000000",
            }
          : {
              width: "400px",
              height: "40px",
              "border-radius": "20px",
              border: "10px",
              margin: "25px",
              "text-shadow": "0px 0px 10px #000000",
            };
      },
    },

    // DOWN HERE IS A CONVERTARY RESET.

    12: {
      display() {

     
    // --------------------------------------------------------------
        // Forgotton stuff
        let forgotten = ``;
        if (getClickableState("E", 14)) forgotten = `Broken Convertary...?`;
        else forgotten = `CONVERTARY [LAYER 1 RESET]:`;
        let normalLIGHT = `<br>(Requires Solar Light Generation)`;
        if (player.Sol["TMSun"].active)
          forgotten = `<i>Perished rays of light that only wanted chaos... <br>- Lunaris </i>`;
        if (player.Sol["TMSun"].active) normalLIGHT = ``;

           //The Bleeding Eclipse 3+
              let TBSunP = player.Sol["TBSun"].pending;
              let TBSun = player.Sol["TBSun"].x;
          // The Bleeding Eclipse 3+ Reward
              let power = new Decimal(0.4)
              if (TBSun.gte(3)) power = power.plus(TBSun.sub(2).mul(0.1))
        if (player.Sol["TMSun"].active)
          nnb = `
                     <h3> <i>Perished rays of light that only wanted chaos... <br>- Lunaris </i></h3>
                    `;
        else
          nnb = `
                      Convert ALL of your Solar Light into ^${format(power,1)} of Solar shards. <br> 
                    Then reset Solar Upgrades, Solarity, Solar Rays, And Solar Modifiers. 
                     <b>Doing a convertary now will give +${format(getSolarLightGain())} Solar Shards, Before reset </b>
                    `;

        let Inactive = `<h3>${forgotten}</h3><br> ${normalLIGHT}`;

        let Active = `
                    ${nnb}
                    `;
        return getClickableState("GL", 11) ? Active : Inactive;
      },
      onClick() {
        let gain = getSolarLightGain()


        player["GL"].Solar_Shards = player["GL"].Solar_Shards.plus(gain);
        player["GL"].points = player["GL"].points.plus(gain);

        // player["GL"].CenterPoints = player["GL"].CenterPoints.plus(1)
        player["GL"].Solarlight = decimalZero;
        setClickableState("GL", 11, !getClickableState("GL", 11));
        layer1Reset(player.C.EffectorTier.gte(4), "GL");
        if (player.Sol["TBCore"].active) reset_Cent();
      },
      canClick() {
        if (!player.Sol["TMSun"].active) return getClickableState("GL", 11);
        else return false;
      },
      style() {
        if (!player.Sol["TMSun"].active) {
          return getClickableState("GL", 11)
            ? {
                width: "350px",
                height: "100px",
                "border-radius": "20px",
                border: "10px",
                margin: "25px",
                "text-shadow": "0px 0px 10px #000000",
              }
            : {
                width: "200px",
                height: "40px",
                "border-radius": "20px",
                border: "10px",
                margin: "25px",
                "text-shadow": "0px 0px 10px #000000",
              };
        } else {
          return {
            width: player.GL.ghh2 + "px",
            height: player.GL.ghh2 + "px",
            "border-radius": "20px",
            border: "10px",
            margin: "25px",
            "text-shadow": "0px 0px 10px #000000",
            transform:
              "skew(" + player.GL.ghh + "deg, " + player.GL.ghh + "deg)",
            "margin-right": player.GL.ghh + "px",
            "box-shadow": "0 0 50px 20px rgba(255, 255, 255, 0.7);",
          };
        }
      },
    },

    // END OF CLICKABLE CODE
  },

  row: 1, // Row the layer is in on the tree (0 is the first row)

  branches: ["S"],
  layerShown() {
    hasCurrency = new Decimal(1);
    if (
      hasUpgrade("S", 14) ||
      player["GL"].Solar_Shards.gte(1) ||
      player["GL"].Solarlight.gte(1) ||
      player.E.EclipseTier.gte(1)
    )
      return true;
  },
});






// SIDE LAYER BELOW










