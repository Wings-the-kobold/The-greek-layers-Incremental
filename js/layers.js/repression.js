
var row1MaxSplit = new Decimal(2)
var row2MaxSplit = new Decimal(4) 
addLayer("R", {
  symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  pressure: new Decimal(0),
  currentPath: new Decimal(0),
  }},

  effect() {
    let effect = new Decimal(1)
  
    effect = player["R"].pressure.add(1).log(3) //this is to add the effect
    return effect
  },
  

  color: "#520387 ",
  requires: new Decimal("3.65e18"), // Can be a function that takes requirement increases into account
  resource: "Recursivity", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {return player.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.4, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1)
      



      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
  },
  infoboxes: {
 
    about: {
      title: "Condensed Tiers",
      body() {
        return `<h2 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> <h3>It seems you have found a strange press, and it appears to be glowing purple and black, it seems to have a sticker saying “the repressor”. And an image of what it seems... to be some kind of recursive like ore that seems to be like... a fractal like shape?  
        </h3>
        <h2>You know what to do</h2> </h2>`
      },
    

    },
  },
  
    tabFormat: {
      "Repression?": {      
            content: [
              "main-display",
              "infoboxes",
             
              
              "prestige-button",
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
    
     /*"Challenges?": {
      content: [
     function() {if(player["R"].points.gte(1)) return "challenges" 
      if (hasUpgrade("R",11)) return "challenges"
      if (hasUpgrade("R",12)) return "challenges"
      if (hasUpgrade("R",13)) return "challenges"
      if (hasUpgrade("R",14)) return "challenges" 
      return "challenges"
  }
        ],

     
     },
  
*/
    

     "The Genarator?": {
      content: [
     
     ["display-text",
      function() { 
        if(!hasUpgrade("R",11)) return `<h3 style="color:#287233 ; text-shadow: #063770 0px 0px 10px;">hmm... something seems to be missing... maybe go back to the upgrade tree? </h3>`
        if(hasUpgrade("R",11)) return `
      <br>You have <h3 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> ${format(player["R"].pressure)}</h3> Pressure Points 
      <br>
      <br>
       Which multiplies upg1 by <h3 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;">${format(tmp["R"].effect)}x 
       </h3>` //you add this for every currency, it shows the effect 
     }],
    
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
  if (hasUpgrade("R",11)) player["R"].pressure= player["R"].pressure.add(diff.times(boost)) 

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
  
    player.R.upgrades = [];
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
        if (player.R.currentPath.eq(row1MaxSplit)) return false
        
      },
      onPurchase() {
        player.R.currentPath = player.R.currentPath.plus(1)
        alert("H(U*F_{B(Y*H")
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
          "color": "#0000ff"
        }
      },
      tooltip: `Shifting upgrades are <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 5x cheaper </h3> 
      but shift multipliers 1-4 scalings are also raised by <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;">  ^1.05  </h3>`,
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
    tooltip: `Unlock Shifting Sacrifice. where you sacrifice all multipliers for a multiplier for those shift multipliers`,
    canAfford(){
      if (player.R.currentPath.eq(row1MaxSplit)) return false
    
    },
    onPurchase() {
      player.R.currentPath = player.R.currentPath.plus(1)

    },
  },
//D1





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
          "margin": "0px",
          "text-shadow": "0px 0px 10px #000000",
        "color": "#20124d"
      }
    },
    tooltip: `ShftUpg1 is increased  <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> ^1.00 -> ^1.15 </h3>   `,
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
          "margin": "0px",
          "text-shadow": "0px 0px 10px #000000",
        "color": "#073763"
      }
    },
    
canAfford() {
  return (hasUpgrade("R",12) && !hasUpgrade("R",22)) 


},

    tooltip: `Shift upgrade 1’s hardcap starts <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 170% later </h3> (based on MoW), divide its effect by <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> /1.5 </h3>`,
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
          "margin": "0px",
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
    if (hasUpgrade("R",25)) effect = effect.mul(player["R"].points.sqrt(3)).add(1)
    return effect
  },
  style() {
    return {
      "width": "120px",
      "height": "100px",
      "border-radius": "1px",
      "border": "0px",
      "margin": "0px",
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
        "margin": "0px",
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
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#351c75"
      }
    },
    canAfford(){
      return (hasUpgrade("R",22)) 
      
      
    },
    tooltip: `shftUpg3 exponent boost becomes <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> ^1.15 -> ^1.3</h3>`,       
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
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#0b5394"
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
      return (hasUpgrade("R",24)) 
      
      
    },
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "0px",
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
      return (hasUpgrade("R",24) && hasUpgrade("R",25)) 
      
      
    },
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#e69138"
      }
    },
    tooltip: `Unlock shifting challenges, and autobuy shift multipliers`,
    branches: [("R",24)],
  }, //CD3

  36: {
    title: `<h2>D3a</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,
   canAfford(){
    return (hasUpgrade("R",26)) 
    
    
  },
    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#fe0166"
      }
    },
    tooltip: `Unspent recursivity boost Shift dimensions 3 and 5`,
    branches: [("R",19)],
  }, //D3a

  37: {
    title: `<h2>D3b</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,
   canAfford(){
    return (hasUpgrade("R",27)) 
    
    
  },
    style() {
      return {
        "width": "80px",
        "height": "80px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#cc0000"
      }
    },
    tooltip: `Unspent Recursivity boost Shift dimensions 1 and 6`,
    branches: [("R",19)],
  }, //D3b

 /*
  //row 4
  41: {
    title: `<h2>A4</h2>`,
    cost: new Decimal(500000),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "100px",
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

    tooltip: `<p>pressure point gain is increased by 32x</p>`,
    branches: ["R",31],
  }, //A5
  42: {
    title: `<h2>AB4</h2>`,
    cost: new Decimal(500000),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "100px",
        "height": "50px",
        "border-radius": "1px",
        "border": "5px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#674ea7"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.

    tooltip: `Boost upg2 by <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 10x </h3> but All repUpg's are <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> 10% weaker </h3>`,
    branches: ["R",32],
  }, 
  43: {
    title: `<h2>B4</h2>`,
    cost: new Decimal(1.12e8),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "100px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#32a69f"
      }
    },
    tooltip: `Unlock ???, And keep BC4 on all resets.`,
    branches: [("R",34)],
    

  }, //B4
  44: {
    title: `<h2>BC4</h2>`,
    cost: new Decimal(113569),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "100px",
        "height": "50px",
        "border-radius": "1px",
        "border": "5px",
        "margin": "0px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#94ff66"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.
//The Negative effects of The Blue path is 20% weaker, but C3's effect is divided by 3.3  
    tooltip: `The Negative effects of The Blue path is <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 20% weaker </h3> and <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> cost scaling </h3> by 1.15x`,
    branches: [("R",34),("R", 33)],
    unlocked() {
      if ((hasUpgrade("R",23)) && (hasUpgrade("R",24))) return true
      return true

    },



  },
  45: {
    title: `<h2>C4</h2>`,
    cost: new Decimal(113569),
    
  

    style() {
      return {
        "width": "100px",
        "height": "50px",
        "border-radius": "1px",
        "border": "5px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#f1c232"
      }
    },
   
    tooltip: `<p>Automatically buys shift dimensions 1-6 </p>`,
    branches: [("R",34)],
  },
  46: {
    title: `<h2>D4(ab)</h2>`,
    cost: new Decimal(1.15e7),
    
   

    style() {
      return {
        "width": "100px",
        "height": "70px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#351c75"
      }
    },
    tooltip: `raise all shift multipliers effects by ^1.15`,       
    branches: [("R",36), ("R",37)],
    unlocked() {
      if ((hasUpgrade("R",26)) && (hasUpgrade("R",27))) return true
      return true

    }
  }, //d4(ab)
  

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

    tooltip: `Finish TMUI's 0.4 update`,
    branches: [("R",43),("R",41) ,("R",45)],
  }, 
  
  
 
//#32a69f for abc5
  

*/



},
  






challenges: {
  
  11: {
      name: "Challenge 1",
      challengeDescription() { return `
      <h3>Anti-upgrade (noUpg) </h3><br><br>
      <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “We didn’t need it anyway” </h4> ${challengeCompletions(layer, id)}/20 <br><br>
      There are only the 3 rep upgrades and Upg1
      
      
      `
    },
      completionLimit: new Decimal(20),
      goal: new Decimal ("1e10"),
      //goalDescription: `Repress the game to finish this challenge.  `,
      rewardDescription: `Points base exponent is added (+0.02)`,
      canComplete: function() {return player.points.gte(1e18)},
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
     onEnter() {
      doReset("R")

     },
     onExit() {
      player["S"].points = player["S"].points.add(1)

     }
  },












  12: {
    name: "Challenge 2",
    challengeDescription: `
    <h3>Dilation (Dil) </h3><br><br>
    <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “You suck.” </h4> 0/20 <br><br>
    All Multipliers are dilated to ^0.8
    
    
    `,
    goal: new Decimal ("1e15"),
    //goalDescription: `Repress the game to finish this challenge.  `,
    rewardDescription: `Upg2 effect is multiplied by 2 each completion`,
    canComplete: function() {return player.points.gte(1000000)},
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
    onEnter() {
      doReset("R")

     }
},
13: {
  name: "Challenge 3",
  challengeDescription: `
  <h3>Anti-Softcap (soft-) </h3><br><br>
  <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “I hate you” </h4> 0/10 <br><br>
  All softcaps are instead hardcaps, and they start 25% sooner
  
  
  `,
  goal: new Decimal ("1.85e17"),
  //goalDescription: `Repress the game to finish this challenge.  `,
  rewardDescription: `Softcaps starts 1.15x later (add.) [cannot append in challenge]`,
  canComplete: function() {return player.points.gte(1e18)},
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
  onEnter() {
    doReset("R")

   }
},
14: {
  name: "Challenge 4",
  challengeDescription: `
  <h3>Time-wall (Time) </h3><br><br>
  <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “NG- version?” </h4> 0/10 <br><br>
  All upgrades except time upgrades,and Upg2 is disabled. 

  
  
  `,
  goal: new Decimal ("1000000"),
  //goalDescription: `Repress the game to finish this challenge.  `,
  rewardDescription: `All Time Upgrades are 5% stronger`,
  canComplete: function() {return player.points.gte(1e18)},
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
},
/*
15 : {
  name: "Challenge 5",
  challengeDescription: `
  <h3>Super-Scalar (Scale+) </h3><br><br>
  <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “Scale slower please” </h4> 0/10 <br><br>
  All Repeatable upgrades cost scalings are 40% stronger and they start 2x sooner (100 -> 50)

  
  
  `,
  goal: new Decimal ("1000000"),
  //goalDescription: `Repress the game to finish this challenge.  `,
  rewardDescription: `Superscaled scaling starts 10 later`,
  canComplete: function() {return player.points.gte(1e18)},
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

  onEnter() {
    doReset("S")

   }
},*/
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
