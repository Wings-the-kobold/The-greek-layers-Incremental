
var row1MaxSplit = new Decimal(2)
var row2MaxSplit = new Decimal(4) 

//just a reminder that this is all the challenges combined into oine variable










addLayer("R", {
  symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  pressure: new Decimal(0),
  currentPath: new Decimal(0),
  completions: new Decimal(0),
  
  }},

  effect() {
    let effect = new Decimal(1)
  
      if (player["R"].pressure.gt(1)) {     
        if (!hasUpgrade("R",43)) effect = player["R"].pressure.log(3) 
        if (hasUpgrade("R",43)) effect = player["R"].pressure.log(3).pow(1.5) 
        
  }
    //this is to add the effect
    
    return effect
  },
  

  color: "#520387 ",
  requires: new Decimal("3.65e18"), // Can be a function that takes requirement increases into account
  resource: "Recursive Elements", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    
    return player.points//.div(this.requires)
  
  
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.4, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      //this is to prevent players from accidentally leaving challenges
      


      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
  },
  infoboxes: {
 
    about: {
      title: "The Repression Machine",
      body() {
        return `<h2 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> <h2>
        <h4> As with those dreadful times and days with that strange substance, it feels as if... it has no effect on you anymore. 
         For the resistance you created by building and using such strangenes of this... substance, and yet you are tired, exausted.
         You set your journey again, after seemingly mastering this... thing. 
         You find a strange machine... it seems to have no color, but yet it has a color?  
         The size of the machine seems to be medium sized, with a familiar slot into it.
         Out of curiosity, you think to yourself as the blue Glowing substance shines directly towards the machine...
         you check back with what you have, and back at the machine, realizing its size on the inside seems infinite...
         You test it out but all it gives was a tiny speck of nothing but dust, pushing on its shiny lever handle and its black rubber encasing on its end.
         'It could all fit in there' you said to yourself... 
        </h4>
        <h2>You know what to do</h2> </h2><br>
        [Does Everything Shifting layer does Including Shift Multipliers, Upgrades, And MoW]`
      },
    },
  },
    tabFormat: {
      "Repression?": {      
            content: [
              "main-display",
              ["infobox", "about"],
               function() {
                if ( !inChallenge("R",11) && !inChallenge("R",12)&& !inChallenge("R",13)&& !inChallenge("R",14)&& !inChallenge("R",15) && !inChallenge("R",16)) return  "prestige-button"

               },           
             
              "blank",
              "blank",
              
          ],
      },

      "Upgrade Tree": {
        content: [
            ["display-text", 
            function() { return `<h2 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> THE UPGRADE TREE </h2>
            <br> <p>Note: you can only select 2 paths at once, so choose wisely!</p>
            <br> <p>ab2 is only unlocked by their parents A1 and B2. meaning you have to buy both to unlock it
            <br> <p>ab2 and any other path that combines the two, counts as "2 paths" </p>
          
            `}
        ],
        "blank",
        "blank",
"clickables",
        "blank",
  
       "upgrades",
       
       ],  
    },   
     "Challenges?": {
      content: [
        ["display-text",
      function() { 
        if(hasUpgrade("R",35) || (!inChallenge("R",11) || !inChallenge("R",12)|| !inChallenge("R",13)|| !inChallenge("R",14)|| !inChallenge("R",15)|| !inChallenge("R",16))) return `<h3 style="color:#287233 ; text-shadow: #063770 0px 0px 10px;">...wonder what this could be? </h3>` //you add this for every currency, it shows the effect 
     
      }],


     function() {
      if (hasUpgrade("R",35) || inChallenge("R",11) || inChallenge("R",12)|| inChallenge("R",13)|| inChallenge("R",14)|| inChallenge("R",15)|| inChallenge("R",16)) return "challenges"
      let totalCompletions = new Decimal(challengeCompletions("R", 11))
      totalCompletions= totalCompletions.plus(challengeCompletions("R", 12))
      totalCompletions= totalCompletions.plus(challengeCompletions("R", 13))
      totalCompletions= totalCompletions.plus(challengeCompletions("R", 14))
      if (totalCompletions.gte(1)) return "challenges"
       } 
        ],
     },
     "The Genarator?": {
      content: [
     
        ["display-text",
        function() { 
          if(!hasUpgrade("R",11) && player["R"].pressure.add(1).log(3).lt(1) ) return `<h3 style="color:#287233 ; text-shadow: #063770 0px 0px 10px;">hmm... something seems to be missing... maybe go back to the upgrade tree? </h3>`
          if(hasUpgrade("R",11) || player["R"].pressure.add(1).log(3).gte(1)) return `
        <br>You have <h3 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> ${format(player["R"].pressure)}</h3> Pressure Points 
        <br>
        <br>
         Which multiplies upg1 by <h3 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;">${format(tmp["R"].effect)}x 
         </h3>` //you add this for every currency, it shows the effect 
       }],
       ["display-text",
        function() { 
          
          if (hasUpgrade("R",61)) return `
          <br><br><br><br><br><h3 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> THE PRESSURIZOR </h3> ` 
         //you add this for every currency, it shows the effect 
       }],
       ["upgrades", [6]],
     "buyables",
     
    ],
    
     },
    
    },
  resetDescription: `
  <h2>Repress the game!</h2><br><br>
  `,


  componentStyles: {
    "prestige-button"() { return {
      
      'height':'150px','width':'200px', "border-radius": "10px"
    
    
        } 
      }
    },
  
  

update(diff) {
  diff = new Decimal(diff)
  let boost = new Decimal(1)
  if (hasUpgrade("R",21)) boost = boost.times(2)
  if (hasUpgrade("R",31)) boost = boost.times(16)
  if (hasUpgrade("R",41)) boost = boost.times(64)
  if (hasUpgrade("R",11)) player["R"].pressure = player["R"].pressure.add(diff.times(boost)) 

   player["R"].completions = challengeCompletions("R", 11) + challengeCompletions("R", 12) + (challengeCompletions("R", 13))  +(challengeCompletions("R", 14))


},

 clickables: {
  11: {
  display: `Rebuild the repression machine and repress. (respec)`,
  canClick: true,
  onClick() {
    let totalCost = Decimal.dZero;
    for (const id of player.R.upgrades) {
      totalCost = totalCost.plus(tmp.R.upgrades[id].cost);
     // doDataLayerReset()
    }
    //if (hasUpgrade("R",35)) player.R.upgrades.push("35")
    player.R.upgrades =  [];
    player.R.points = player.R.points.plus(totalCost);
    player.R.currentPath = player.R.currentPath.times(0);
    
  },
  style: {
      'min-height': "40px",
      width: "250px",
      color: "#007fff",
      
  }
},

},

  upgrades: {
    
    11: {
      title: `<h2>A1</h2>`,
      
      cost: new Decimal(3),
      style() {
        return {
          "width": "140px",
          "height": "100px",
          "border-radius": "1px",
          "border": "0px",
          "margin": "10px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ff0000"
        }
      },
      tooltip: `unlock Pressure points (unlocked from The Generator).`,
      canAfford(){
        if (player.R.currentPath.gte(row1MaxSplit)) return false
        
      },
      onPurchase() {
        player.R.currentPath = player.R.currentPath.plus(1)
        
      },
    },
 //A1
 // unlocks A2 and AB2 [id 15, id 16]
 
    12: {
      title: `<h2>B1</h2>`,
      cost: new Decimal(3),
      
     //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

      style() {
        return {
          "width": "140px",
          "height": "100px",
          "border-radius": "1px",
          "border": "0px",
          "margin": "5px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
        }
      },
      tooltip: `Shifting upgrades are <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 14x cheaper </h3> 
      but shift multipliers 1-4 scalings are also raised by <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;">  ^1.1  </h3>`,
      canAfford(){
        if (player.R.currentPath.gte(row1MaxSplit)) return false
      
      },
      onPurchase() {
        player.R.currentPath = player.R.currentPath.plus(1)
  
      },
  },
//B1
// unlocks B2 and AB2 [id 17, id 16]

    13: {
    title: `<h2>C1</h2>`,
    cost: new Decimal(3),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "140px",
          "height": "100px",
          "border-radius": "1px",
          "border": "0px",
          "margin": "10px",
          "text-shadow": "0px 0px 10px #000000",
        "color": "#ffff00"
      }
    },
    tooltip: `Keep shiftUpg5 on repression`, 
    canAfford(){
      if (player.R.currentPath.gte(row1MaxSplit)) return false
    
    },
    onPurchase() {
      player.R.currentPath = player.R.currentPath.plus(1)

    },
  },
//C1
//unlocks C2
    14: {
    title: `<h2>D1</h2>`,
    cost: new Decimal(3),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "140px",
          "height": "100px",
          "border-radius": "1px",
          "border": "0px",
          "margin": "10px",
          "text-shadow": "0px 0px 10px #000000",
        "color": "#ff0074"
      }
    },
    tooltip: `Unlock Shifting Sacrifice. where you sacrifice all multipliers for a multiplier for those shift multipliers.`,
    canAfford(){
      if (player.R.currentPath.eq(row1MaxSplit)) return false
    
    },
    onPurchase() {
      player.R.currentPath = player.R.currentPath.plus(1)

    },
  },
//D1

//



// row 2
     21: {
    title: `<h2>A2</h2>`,
    cost: new Decimal(15),
    canAfford(){
      return (hasUpgrade("R",11) && !hasUpgrade("R",22)) 
      
      
    },
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "120px",
          "height": "100px",
          "border-radius": "1px",
          "border": "0px",
          "margin": "10px",
          "text-shadow": "0px 0px 10px #000000",
        "color": "#660000"
      }
    },
    tooltip: `Increase pressure point gain by 2x`,
    branches: [("R",11)],
   }, //A2

     22: {
    title: `<h2>AB2</h2>`,
    cost: new Decimal(15),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "120px",
          "height": "100px",
          "border-radius": "1px",
          "border": "0px",
          "margin": "10px",
          "text-shadow": "0px 0px 10px #000000",
        "color": "#20124d"
      }
    },
    tooltip: `ShftUpg1 is increased  <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> ^1.00 -> ^1.35 </h3>   `,
    branches: [("R",11),("R",12)],
    canAfford(){
      if (
        (hasUpgrade("R",11) && hasUpgrade("R",12)) && (!hasUpgrade("R",21) && !hasUpgrade("R",23)) 
        
        ) return true; else return false
     
    },
    onPurchase() {
    

    },
    }, 



    //AB2
    // this counts as 2 paths being taken
     23: {
    title: `<h2>B2</h2>`,
    cost: new Decimal(15),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "120px",
          "height": "100px",
          "border-radius": "1px",
          "border": "0px",
          "margin": "10px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ffffff"
      }
    },
    
canAfford() {
  return (hasUpgrade("R",12) && !hasUpgrade("R",22)) 


},

    tooltip: `Shift upgrade 1’s roofchain starts <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 100% later </h3>, but divide its effect by <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> /1.5 </h3>`,
    branches: [("R",12)],
   }, //B2

     24: {
    title: `<h2>C2</h2>`,
    cost: new Decimal(15),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,
   canAfford() {
    return (hasUpgrade("R",13)) 
  
  
  },
    style() {
      return {
        "width": "120px",
          "height": "100px",
          "border-radius": "1px",
          "border": "0px",
          "margin": "10px",
          "text-shadow": "0px 0px 10px #000000",
        "color": "#7f6000"
      }
    },
    tooltip: `Automatically buy RepUpgrades 1-3, and they no longer spent amount`,
    branches: [("R",13),("R",2)],
    }, //C2

     25: {
    title: `<h2>D2</h2>`,
    cost: new Decimal(15),
  
   canAfford() {
    return (hasUpgrade("R",14)) 
  },
  effect() {
    let effect = new Decimal(1)
    if (hasUpgrade("R",25)) effect = effect.mul(player["R"].points.log(5)).add(1)
    return effect
  },
  style() {
    return {
      "width": "120px",
      "height": "100px",
      "border-radius": "1px",
      "border": "0px",
      "margin": "10px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#cc0000"
      }
    },
    tooltip() {return (hasUpgrade("R",25))
     ? `Unspent Recursivity boost Shift dimensions 2 and 4. <br> currently: x${format(upgradeEffect("R",25))}` 
     : `Unspent Recursivity boost Shift dimensions 2 and 4.`
     },
    branches: [("R",14)/*, ("R",35), ("R",36), ("R",37)*/],
   }, //D2









  
//row 3
  31: {
    title: `<h2>A3</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#cc0000"
      }
    },
    tooltip: `Increase pressure point gain by 16x`,
    branches: [("R",21)],
    canAfford(){
      return (hasUpgrade("R",21)) 
      
      
    },
  }, //A3

  32: {
    title: `AB3 `,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#351c75"
      }
    },
    canAfford(){
      return (hasUpgrade("R",22)) 
      
      
    },
    tooltip: `shftUpg3 exponent boost becomes <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> ^1.15 -> ^1.4</h3>`,       
    branches: [("R",22)],
  }, //AB3

  33: {
    title: `<h2>B3</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.
    canAfford(){
      return (hasUpgrade("R",23)) 
      
      
    },
    tooltip: `boost RepUpg 2 and 3's  <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> effect </h3> and <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> cost scaling </h3> by ^1.15`,
    branches: [("R",23)],
  }, //B3

  34: {
    title: `<h2>C3</h2>`,
    cost: new Decimal(337),
    canAfford(){
      return (hasUpgrade("R",24)&& !hasUpgrade("R",35)) 
      
      
    },
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#bf9000"
      }
    },
    tooltip: `Generate 33% of Meteres Of Waves per second.`,
    branches: [("R",24)],
  }, //C3

  35: {
    title: `<h2>CD3</h2>`,
    cost: new Decimal(337),
    canAfford(){
      let neighboringActive = false
      if ((hasUpgrade("R",34) || hasUpgrade("R",36)) || (hasUpgrade("R",34) && hasUpgrade("R",36))) neighboringActive = true
      return (hasUpgrade("R",24) && hasUpgrade("R",25) && neighboringActive==false) 
      
      
    },
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#e69138"
      }
    },
    tooltip: `(35) <br>- Permenantly Unlock Repression Challenges and Autobuy Shift multipliers`,
    branches: [("R",24),("R",25)],
  }, //CD3
 
  36: {
    title: `<h2>D3a</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,
   canAfford(){

    return (!player.R.currentPath.gte(row1MaxSplit) && hasUpgrade("R",25) && !hasUpgrade("R",35) ) 
   
    
  },
  onPurchase() {
    player.R.currentPath = player.R.currentPath.plus(0.5)
    
  },
  effect() {
    let effect = new Decimal(1)
    if (hasUpgrade("R",36)) effect = effect.mul(player["R"].points.log(5)).add(1)
    return effect
  },
    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#fe0166"
      }
    },
    tooltip() {return (hasUpgrade("R",36))
    ? `(36) Unspent Recursivity boost Shift dimensions 3 and 5. <br> currently: x${format(upgradeEffect("R",36))}` 
    : `Unspent Recursivity boost Shift dimensions 3 and 5.`
    },
    branches: [("R",19), ("R",25)],
  }, //D3a

  37: {
    title: `<h2>D3b</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,
   canAfford(){
    
    return (!player.R.currentPath.gte(row1MaxSplit) && hasUpgrade("R",25) && !hasUpgrade("R",35) 
    
    
    
    
    ) 
 
    
    
  },

  onPurchase() {
    player.R.currentPath = player.R.currentPath.plus(0.5)
    
  },
  effect() {
    let effect = new Decimal(1)
    if (hasUpgrade("R",37)) effect = effect.mul(player["R"].points.log(5)).add(1)
    return effect
  },
    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#cc0000"
      }
    },
    tooltip() {return (hasUpgrade("R",37))
     ? `(37) Unspent Recursivity boost Shift dimensions 1 and 6. <br> currently: x${format(upgradeEffect("R",37))}` 
     : `Unspent Recursivity boost Shift dimensions 1 and 6.`
     },
    branches: [("R",19), ("R",25)],
  }, //D3b









  //row 4
  41: {
    title: `<h2>A4</h2>`,
    cost: new Decimal(3113569),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "100px",
        "height": "50px",
        "border-radius": "10px",
        "border": "5px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#cc0000"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.
    canAfford() {
      return (hasUpgrade("R",31)) 
    },
    unlocked() {
      if (player["R"].completions>=10 ) return true
    },
    tooltip: `<p>pressure point gain is increased by 64x</p>`,
    branches: ["R",31],
  }, //A5
  42: {
    title: `<h2>AB4</h2>`,
    cost: new Decimal(3113569),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "100px",
        "height": "50px",
        "border-radius": "10px",
        "border": "5px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#674ea7"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.
    canAfford() {
      return (hasUpgrade("R",32)) 
    },
    tooltip: `multiply upg2 by <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 6x </h3>. but repUpg's scales <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> 15% faster </h3>`,
    branches: ["R",32],
    unlocked() {
      if (player["R"].completions>=10 ) return true
    },
  }, 
 
  43: {
    title: `<h2>B4</h2>`,
    cost: new Decimal(33113569),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,
   
    style() {
      return {
        "width": "100px",
        "height": "50px",
        "border-radius": "10px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#32a69f"
      }
    },
    tooltip: `Pressure point effect is raised by <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> ^1.5</h3>. but MoW gain is <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> /10 </h3>`,
    branches: [("R",33)],
    unlocked() {
      if (player["R"].completions>=10 ) return true
    },
    canAfford() {
    if (hasUpgrade("R",33) && !hasUpgrade("R",44)) return true
  },
  }, //B4
  44: {
    title: `<h2>BC4</h2>`,
    cost: new Decimal(3113569),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "100px",
        "height": "50px",
        "border-radius": "10px",
        "border": "5px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#94ff66"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.
//The Negative effects of The Blue path is 20% weaker, but C3's effect is divided by 3.3  
    tooltip: `Unlock The Pressurizor. Divide Shifting Multiplier 2 by <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> /3 </h3> `,
    branches: [("R",34),("R", 33)],
    unlocked() {
      if (player["R"].completions>=10  ) return true
    },
    canAfford() {
     let neighboringActive1 = false
      if (hasUpgrade("R",43) || hasUpgrade("R",45)) neighboringActive1 = true

      if ( hasUpgrade("R",33) && hasUpgrade("R",34) && neighboringActive1 == false  ) return true
    },


  },
  45: {
    title: `<h2>C4</h2>`,
    cost: new Decimal(3113569),
    canAfford() {
     if (hasUpgrade("R", 34) && !hasUpgrade("R",44) ) return true
      
    },
  

    style() {
      return {
        "width": "100px",
        "height": "50px",
        "border-radius": "10px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#f1c232"
      }
    },
   
    tooltip: `<p>Upgrades Are No longer Reset on Shifting </p>`,
    branches: [("R",34)],
    unlocked() {
      if (player["R"].completions>=10 ) return true
    },
  },
  46: {
    title: `<h2>D4(ab)</h2>`,
    cost: new Decimal(31135695),
    canAfford() {
      return (hasUpgrade("R",36) || hasUpgrade("R",37) ) 
    },
   

    style() {
      return {
        "width": "100px",
        "height": "70px",
        "border-radius": "10px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#c51d75"
      }
    },
    tooltip: `raise all shift multipliers effects by ^1.15`,       
    branches: [("R",36), ("R",37)],
    unlocked() {
      if ((hasUpgrade("R",26)) && (hasUpgrade("R",27)) || player["R"].completions >= 10) return true
      

    }
  }, //d4(ab)
  
/*
  51: {
    title: `<h2>A5</h2>`,
    cost: new Decimal(1e15),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "120px",
        "height": "50px",
        "border-radius": "1px",
        "border": "5px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#cc0000"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.

    tooltip: `<p>pressure point formula is better [log3(Pressure) -> Pressure^0.3]</p>`,
    branches: ["R",41],
  }, //A5
  52: {
    title: `<h2>ABC5</h2>`,
    cost: new Decimal(1e25),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "120px",
        "height": "50px",
        "border-radius": "1px",
        "border": "5px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#32a69f"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.

    tooltip: `Finish TMUI's 0.7 update`,
    branches: [("R",43),("R",41) ,("R",45)],
  }, 
  
  
 
//#32a69f for abc5
  

*/

61: {
  title: `<h2>CONVOLUTION</h2>`,
  cost: new Decimal(150000),
  description() {return `<h3>A1 and A2 is always Active`},
 //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,
  
  style() {
    return {
      "width": "130px",
      "height": "85px",
      "border-radius": "10px",
      "border": "0px",
      "margin": "5px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#ffffff"
    }
  },
  unlocked() {
    if (hasUpgrade("R",44) || hasUpgrade("R",61)) return true

  },

  currencyInternalName: "pressure",
  resetNothing() {},
},

},
  

// THE PRESSURIZOR STUFF
buyables: {
  11: {
    cost(x) {
      
      let repressdownEffect = new Decimal(1)
      if (hasUpgrade("R",12)) repressdownEffect = 1.1
      if (!hasUpgrade("R",12)) repressdownEffect = 1
      
      
      base = new Decimal(150000)
      let cost = new Decimal(0)
      let scaleplus = new Decimal(100)
      let scaleplusplus = new Decimal(500)
      let scaleplusplusplus = new Decimal(750)
      // scale formulas
      v_ = base.mul(Decimal.pow(1.4, x))// prescaling, or base scaling

      if (getBuyableAmount(this.layer,this.id).lte(scaleplus)) cost = v_ 

      if (getBuyableAmount(this.layer,this.id).gt(scaleplus)) 
      cost = base.mul(Decimal.pow(Decimal.pow(20,repressdownEffect) , x))    .mul(scaleplus.pow_base(1.4/20))

      if (getBuyableAmount(this.layer,this.id).gt(scaleplusplus)) 
      cost = base.mul(Decimal.pow(Decimal.pow(4000,repressdownEffect) , x))     .mul(scaleplusplus.pow_base(1.4/4000))

      if (getBuyableAmount(this.layer,this.id).gt(scaleplusplusplus))  
      cost = base.mul(Decimal.pow(Decimal.pow(160000000 , repressdownEffect) , x)) .mul(scaleplusplusplus.pow_base(1.4/160000000)) 

    
      return cost;

  /*
      0-99: cost = 5*1.4^amount
      100-499: cost = 5*20^amount * 5*1.4^100 / 5*20^100  
      500-749: cost = 5*4000^amount * 5*1.4^500 / 5*4000^500
      750+: cost = 5*160m^amount * 5*1.4^750 / 5*160m^750
          |                                   | (Condensing!)
          V                                   V
      sc : 5* 1.4^x
      sc+ : 5*1.4^100 / 5*20^100 ----------> (1.4/20)^100
      sc++ : * 5*1.4^500 / 5*4000^500 -----------> (1.4/4 000)^500
      sc+++ : 5*1.4^750 / 5*160m^750 -----------> (1.4/160 000 000)^750
          |                                   | (adding the base scales and its start)
          V                                   V
      5*1.4^amount * 1
      5*20^amount * (1.4/20)^scaleplus          
      5*4000^amount * (1.4/4 000)^scaleplusplus
      5*160000000^amount * (1.4/160 000 000)^scaleplusplusplus
          |                                   | (converting to TMT)
          V                                   V
      cost = base.mul(1.4).pow(x)
      cost = base.mul(20).pow(x)   .mul((1.4).div(20) ).pow(scaleplus))
      cost = base.mul(4000).pow(x)  .mul((1.4).div(4000)).pow(scaleplusplus))
      cost = base.mul(160000000).pow(x)  .mul((1.4).div(160000000)).pow(scaleplusplusplus))
          |                                   | (adding onto the scale check)
          V                                   V
      
      if (getBuyableAmount(this.layer,this.id).lt(scaleplus)) cost = v_
      if (getBuyableAmount(this.layer,this.id).gt(scaleplus)) cost = base.mul(20).pow(x)    .mul((1.4).div(20) ).pow(scaleplus))
      if (getBuyableAmount(this.layer,this.id).gt(scaleplusplus)) cost = base.mul(4000).pow(x)     .mul((1.4).div(4000)).pow(scaleplusplus))
      if (getBuyableAmount(this.layer,this.id).gt(scaleplusplusplus))  cost = base.mul(160000000).pow(x)  .mul((1.4).div(160000000)).pow(scaleplusplusplus))
          

*/    //polishing and final
    },
    display() {
      let scaling = "";
      if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
      if (getBuyableAmount(this.layer, this.id).gte(100)) scaling = "(Superscaled)";
      if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
      if (getBuyableAmount(this.layer, this.id).gte(750)) scaling = "(Scaling^2)"; 
      return ` 
      <h2>Effeciency I</h2>
        <br>
      <h2> Base Pressure Generation: <br> +${format(tmp[this.layer].buyables[this.id].effect)} </h2>
        <br>
      <h2> ${format(tmp[this.layer].buyables[this.id].cost)} Pressure</h2>
      <h2>${format(getBuyableAmount(this.layer, this.id))} bought ${scaling}</h2>

   
  `
    },
    canAfford() {
      return player["R"].pressure.gte(this.cost())
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
    buy() {
      player["R"].pressure = player["R"].pressure.sub(this.cost())
      setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
    },
    effect(x) {
      let effect = new Decimal(1)
      effect = effect.mul(getBuyableAmount(this.layer, this.id))
    
      
      return effect;
    },
    unlocked() {
      if(hasUpgrade("R",44) || getBuyableAmount(this.layer, this.id).gte(1)) return true

    },
  
  },

},



challenges: {
  
  11: {
      name: "Challenge 1",
      challengeDescription() { return `
      <h3>Anti-upgrade (noUpg) </h3><br><br>
      <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “We didn’t need it anyway” </h4> ${challengeCompletions(this.layer, this.id)}/20 <br><br>
      All Pre-Shifting Upgrades are temporarily removed. (does not include Upg1) <br> 
      reward: Points gain is raised: ^${challengeEffect("R",11)}
      
      `
    },
      completionLimit: new Decimal(20),
      goal() {
        let base = 1e19, scale = 31;
        return new Decimal(base).mul(Decimal.pow(scale,challengeCompletions(this.layer, this.id))).floor()
      }, //thats the goal description. challenge description describes the whole thing 
      canComplete() {player.points.gte(this.goal())},
      style() {
        return {
          "width": "300px",
          "height": "300px",
          "border-radius": "1px",
          "border": "5px",
          "margin": "10px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#f1c232"
        }
      },
    
    
    rewardEffect()
    {
      let effect = new Decimal(1)
      let x = new Decimal(challengeCompletions("R", 11))
      if (hasChallenge("R",11)) effect = effect.add(Decimal.mul(x , 0.02)   )
      return effect
      
    }
    




  },
  12: {
    name: "Challenge 2",
    challengeDescription() {
      return `
    <h3>Dilation (Dil) </h3><br><br>
    <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “You suck.” </h4> ${challengeCompletions(this.layer, this.id)}/20 <br><br>
    Upgrades, RepUpgs, Shift multipliers, are all dilated to ^0.8
    
    
    `} ,
    completionLimit: new Decimal(20),
    rewardDescription() {
    
      return  `Upg2 effect is multiplied by x${format(challengeEffect("R",12))} (2^x) each completion`
  
  
  
  },
   goal() {
        let x = new Decimal(challengeCompletions(this.layer, this.id))
       // x = x.add(1)
    
        let base = new Decimal(1e18) //where it starts
        let power = new Decimal(15)
        let calc = new Decimal(base).mul(Decimal.pow(power, x))
        return calc;
       },
       canComplete() {
         var sc = tmp[this.layer].challenges[this.id]
        
         let threshold = player.points.gte(sc.goal) // add any currency here
         return threshold 
        },

    style() {
      return {
        "width": "300px",
        "height": "300px",
        "border-radius": "1px",
        "border": "5px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#f1c232"
      }
    },
    rewardEffect()
    {
      let effect = new Decimal(1)
      let x = new Decimal(challengeCompletions("R", 12))
      if (hasChallenge("R",12)) effect = Decimal.pow(x , 2)
      return effect
    
    },
},
  13: {
  name: "Challenge 3",
  challengeDescription(){ return `
  <h3>superchain (chain+) </h3><br><br>
  <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “I hate you” </h4>  ${challengeCompletions(this.layer, this.id)}/10 <br><br>
  All softchains are instead roofchains, and they start 30% sooner
  
  
  `},
  completionLimit: new Decimal(10),
  rewardDescription(){ 
    let finBoost = new Decimal(challengeCompletions("R",13))
    if (hasChallenge("R",13) && !inChallenge("R",13)) finBoost = finBoost.mul(0.2)
    if (!inChallenge("R",13) ) return `Upg2 softchain starts x${format(challengeEffect("R",13))} later [cannot append in challenge]`
    else return `Upg2 softchain boost is disabled!`
  },
  goal() {
    let x = new Decimal(challengeCompletions(this.layer, this.id))
    x = x.add(1)

    let base = new Decimal(1.69e19) //where it starts
    let power = new Decimal(9).plus(challengeCompletions("R",13)) //how it scales
    let calc = new Decimal(base).mul(Decimal.pow(power, x))
    return calc;
   },
   canComplete() {
     var sc = tmp[this.layer].challenges[this.id]
    
     let threshold = player.points.gte(sc.goal) // add any currency here
     return threshold 
    },

  style() {
    return {
      "width": "300px",
      "height": "300px",
      "border-radius": "1px",
      "border": "5px",
      "margin": "10px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#f1c232"
    }
  },
  rewardEffect() {
    let finBoost = new Decimal(challengeCompletions("R",13))
    if (hasChallenge("R",13) && !inChallenge("R",13)) finBoost= finBoost.mul(0.3).add(1)
    // finBoost = new Decimal(1)
    return finBoost

   }

},
  14: {
  name: "Challenge 4",
  challengeDescription() {return `
  <h3>Time-wall (Time) </h3><br><br>
  <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “NG- version?” </h4> ${challengeCompletions("R", 14)}/10 <br><br>
 EVERYTHING is Disabled. except for Upg2,Upg1,RepUpg1 and TimeUpg1.

  
  
  `}, 
  rewardDescription() {
   return  `TimeUpg1 is x${format(challengeEffect("R",14))} stronger.`
  },
  completionLimit: new Decimal(10),
  goal() {
      let x = new Decimal(challengeCompletions(this.layer, this.id))
      x = x.add(1)
      let base = new Decimal(500000) //where it starts
      let power = new Decimal(5)
      let calc = new Decimal(base).mul(Decimal.pow(power, x))
      return calc;
     },
     canComplete() {
       var sc = tmp[this.layer].challenges[this.id] 
       let threshold = player.points.gte(sc.goal) // add any currency here
       return threshold 
      },
  style() {
    return {
      "width": "300px",
      "height": "300px",
      "border-radius": "1px",
      "border": "5px",
      "margin": "10px",
      "text-shadow": "0px 0px 10px #000000",
      "color": "#f1c232"
    }
  },
  
  rewardEffect()
  { //
    let effect = new Decimal(1)
    let x = new Decimal(challengeCompletions("R", 14))
    if (hasChallenge("R",14)) effect = Decimal.mul(x , 3)//.sub(1)
    return effect
  
  },




},

},

row: 2, // Row the layer is in on the tree (0 is the first row)
  

  branches: ["S"],
  layerShown(){
    if (hasUpgrade("R",11)) return true
    if (hasUpgrade("R",12)) return true
    if (hasUpgrade("R",13)) return true
    if (hasUpgrade("R",14)) return true
    if (player.points.gte(1e18)) return true
    if (player["R"].points.gte(1)) return true
    //return true


  },

  symbol() {
    return `
    <p> 
    <p class='cBreak' style='font-size:16px'>Repression</p>
    </p>
    <p class='cBreak' style='font-size:13px'>[Node #02]</p>
    </p>`
  },



})
