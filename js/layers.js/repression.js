addLayer("R", {
  symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() { return {
      unlocked: true,
  points: new Decimal(0),
  pressure: new Decimal(0),
  }},

  effect() {
    let effect = new Decimal(1)
  
    effect = player["R"].pressure.add(1).log(3) //this is to add the effect
    return effect
  },
  

  color: "#520387 ",
  requires: new Decimal("1.45e19"), // Can be a function that takes requirement increases into account
  resource: "Recursivity", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {return player.points}, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.3, // Prestige currency exponent
  gainMult() { // Calculate the multiplier for main currency from bonuses
      mult = new Decimal(1.5)
      



      return mult
  },
  gainExp() { // Calculate the exponent on main currency from bonuses
      return new Decimal(1)
  },
  infoboxes: {

    about: {
      title: "Repression",
      body() {
        return `It seems you have found a strange press, and it appears to be glowing purple and black, it seems to have a sticker saying “the repressor”. And an image of what it seems... to be some kind of recursive like ore that seems to be like... a fractal like shape?  
         

         *You know what to do`
      },
    

    },
  },
  
    tabFormat: {
      "Repression?": {      
            content: [
              "main-display",
              ["display-text", 
              function() { return `<h2 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> <h3>It seems you have found a strange press, and it appears to be glowing purple and black, it seems to have a sticker saying “the repressor”. And an image of what it seems... to be some kind of recursive like ore that seems to be like... a fractal like shape?  
              </h3>
              <h2>You know what to do</h2> </h2>`}
            ],
              
              "prestige-button",
              "blank",
              "blank",
              "buyables",
          ],
      },

      "Upgrade Tree": {
        content: [
          ["display-text", 
          function() { return `<h2 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> THE UPGRADE TREE </h2>`}
        ],

        "blank",
        "blank",
       "upgrades",
       ],  
    },  
    "Challenges?": {
      content: [
     "buyables",
     "challenges",
     ], 
     },

     "The Genarator?": {
      content: [
     "milestones",
     ["display-text",
      function() { 
        if(!hasUpgrade("R",11)) return `<h3 style="color:#287233 ; text-shadow: #063770 0px 0px 10px;">hmm... something seems to be missing... maybe go back to the upgrade tree? </h3>`
        if(hasUpgrade("R",11)) return `
      <br>You have <h3 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> ${format(player["R"].pressure)}</h3> Pressure Points 
      <br>
      <br>
       Which multiplies your Point gain by <h3 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;">${format(tmp["R"].effect)}x 
       </h3>` //you add this for every currency, it shows the effect 
     }]
     ], 
    
     }
    
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
if (hasUpgrade("R",11)) player["R"].pressure = player["R"].pressure.add(0.1) //this is to increase value, change to any.
},


  upgrades: {
    
    11: {
      title: `<h2>A1</h2>`,
      cost: new Decimal(3),
      
     //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

      style() {
        return {
          "width": "145px",
          "height": "50px",
          "border-radius": "1px",
          "border": "0px",
          "margin": "15px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#ff0000"
        }
      },
      tooltip: `unlock Pressure points (unlocked from The Generator)`,
      
    },
    12: {
      title: `<h2>B1</h2>`,
      cost: new Decimal(3),
      
     //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

      style() {
        return {
          "width": "145px",
          "height": "50px",
          "border-radius": "1px",
          "border": "0px",
          "margin": "15px",
          "text-shadow": "0px 0px 10px #000000",
          "color": "#0000ff"
        }
      },
      tooltip: `Shifting upgrades are <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 2x cheaper </h3> 
      but divide shift multiplier 1 and 3 by <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> log1.3(x) </h3>`,
      
















  },
    13: {
    title: `<h2>C1</h2>`,
    cost: new Decimal(3),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "145px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "15px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffff00"
      }
    },
    tooltip: `Keep Buyable amounts in shifting resets`,
    
  },
    14: {
    title: `<h2>D1</h2>`,
    cost: new Decimal(3),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "145px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "15px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ff0074"
      }
    },
    tooltip: `Unlock Shifting Sacrifice. where you sacrifice all multipliers for a multiplier for those shift multipliers`,
    
  },



    15: {
    title: `<h2>A2</h2>`,
    cost: new Decimal(15),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "75px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#660000"
      }
    },
    tooltip: `Increase pressure point gain by 2x`,
    branches: [("R",11)],
  }, //A2
    16: {
    title: `<h2>AB2</h2>`,
    cost: new Decimal(15),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "75px",
        "height": "70px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#20124d"
      }
    },
    tooltip: `Pressure point gain is Multiplied by <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 3x </h3>, and unlock a soft reset for points!`,
    branches: [("R",11),("R",12)],
  }, //AB2
    17: {
    title: `<h2>B2</h2>`,
    cost: new Decimal(15),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "75px",
        "height": "50px",
        "border-radius": "1px",
        "border": "5px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#073763"
      }
    },
    
    tooltip: `Shift upgrade 1’s hardcap starts <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 20% later </h3> (based on MoW), divide its effect by <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> /3 </h3>`,
    branches: [("R",12)],
  }, //B2
    18: {
    title: `<h2>C2</h2>`,
    cost: new Decimal(15),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "75px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#7f6000"
      }
    },
    tooltip: `Unlock 5 Shifting upgrades`,
    branches: [("R",13),("R",2)],
  }, //C2
    19: {
    title: `<h2>D2</h2>`,
    cost: new Decimal(15),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "65px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#cc0000"
      }
    },
    tooltip: `Unspent Recursivity boost Shift dimensions 2 and 4`,
    branches: [("R",14)],
  }, //D2






  21: {
    title: `<h2>A3</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "75px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#cc0000"
      }
    },
    tooltip: `Increase pressure point gain by 2x again`,
    branches: [("R",15)],
  }, //A3

  22: {
    title: `<h2>AB3</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "75px",
        "height": "70px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#351c75"
      }
    },
    tooltip: `shftUpg3 exponent boost becomes <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> ^1.15 -> ^1.2</h3>`,       
    branches: [("R",16)],
  }, //AB3

  23: {
    title: `<h2>B3</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "75px",
        "height": "50px",
        "border-radius": "1px",
        "border": "5px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#0b5394"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.

    tooltip: `boost RepUpg 2 and 3's  <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> effect </h3> and <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> cost scaling </h3> by 1.15x`,
    branches: [("R",17)],
  }, //B3

  24: {
    title: `<h2>C3</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "75px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#bf9000"
      }
    },
    tooltip: `Generate 33% of Meteres Of Waves per second.`,
    branches: [("R",18)],
  }, //C3
  25: {
    title: `<h2>CD3</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "75px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#e69138"
      }
    },
    tooltip: `Autobuy shift dimensions`,
    branches: [("R",19)],
  }, //CD3

  26: {
    title: `<h2>D3a</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "65px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#fe0166"
      }
    },
    tooltip: `Unspent recursivity boost Shift dimensions 3 and 5`,
    branches: [("R",19)],
  }, //D3a

  27: {
    title: `<h2>D3b</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "65px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#cc0000"
      }
    },
    tooltip: `Unspent Recursivity boost Shift dimensions 1 and 6`,
    branches: [("R",14)],
  }, //D3b



  

  28: {
    title: `<h2>ABC4</h2>`,
    cost: new Decimal(337),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "175px",
        "height": "50px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#32a69f"
      }
    },
    tooltip: `Unlock ???, And keep BC4 on all resets.`,
    branches: [("R",21), ("R",24),("R",23)],
    unlocked() {
      if ((hasUpgrade("R",21)) && (hasUpgrade("R",23)) && (hasUpgrade("R",24))) return true
      //21, 23, 24
      //return


    },
  }, //ABC4

  29: {
    title: `<h2>d4(ab)</h2>`,
    cost: new Decimal(1.15e7),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "175px",
        "height": "70px",
        "border-radius": "1px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#351c75"
      }
    },
    tooltip: `shftUpg3 exponent boost becomes <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> ^1.15 -> ^1.2</h3>`,       
    branches: [("R",26), ("R",27)],
    unlocked() {
      if ((hasUpgrade("R",26)) && (hasUpgrade("R",27))) return true
      //return true

    }
  }, //d4(ab)
  31: {
    title: `<h2>BC4</h2>`,
    cost: new Decimal(113569),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "175px",
        "height": "50px",
        "border-radius": "1px",
        "border": "5px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#94ff66"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.
//The Negative effects of The Blue path is 20% weaker, but C3's effect is divided by 3.3  
    tooltip: `The Negative effects of The Blue path is <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> 20% weaker </h3> and <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> cost scaling </h3> by 1.15x`,
    branches: [("R",24),("R", 23)],
    unlocked() {
      if ((hasUpgrade("R",23)) && (hasUpgrade("R",24))) return true


    },



  }, //D5
  32: {
    title: `<h2>C4</h2>`,
    cost: new Decimal(113569),
    
   //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

    style() {
      return {
        "width": "175px",
        "height": "50px",
        "border-radius": "1px",
        "border": "5px",
        "margin": "10px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#f1c232"
      }
    },
    //<h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;">
    //make Reapeatable Upgrades 2 and 3’s effect and cost scaling 14% stronger.

    tooltip: `boost RepUpg 2 and 3's  <h3 style="color:#5eab30 ; text-shadow: #2c2559 2px 2px 20px;"> effect </h3> and <h3 style="color:#ff0000 ; text-shadow: #2c2559 2px 2px 20px;"> cost scaling </h3> by 1.15x`,
    branches: ["R",24],
  }, //D5
  





},
  






challenges: {
  11: {
      name: "Challenge 1",
      challengeDescription: `
      <h3>Anti-upgrade (noUpg) </h3><br><br>
      <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “We didn’t need it anyway” </h4> 0/50 <br><br>
      All Pre-Shifting Upgrades are temporarily disabled. all but the three rep Upgrades is the only ones available
      
      
      `,
      goal: new Decimal ("1e18"),
      //goalDescription: `Repress the game to finish this challenge.  `,
      rewardDescription: `Points base exponent becomes 1^ -> ^1.01`,
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
  12: {
    name: "Challenge 2",
    challengeDescription: `
    <h3>Dilation (Dil) </h3><br><br>
    <h4 style="color:#D95030 ; text-shadow: #063770 0px 0px 10px;"> “You suck.” </h4> 0/20 <br><br>
    All Multipliers are dilated to ^0.8
    
    
    `,
    goal: new Decimal ("1e15"),
    //goalDescription: `Repress the game to finish this challenge.  `,
    rewardDescription: `Points is multiplied by 2^completions`,
    canComplete: function() {return player.points.gte(1e25)},
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
},
},






















row: 2, // Row the layer is in on the tree (0 is the first row)
  

  branches: ["S"],
  layerShown(){
    if (hasUpgrade("R",11)) return true
    if (hasUpgrade("R",12)) return true
    if (hasUpgrade("R",13)) return true
    if (hasUpgrade("R",14)) return true
    if (player.points.gte("5.15e19")) return true
    if (player["R"].points.gte(1)) return true



  },

  symbol() {
    return `
    <p> 
    <p class='cBreak' style='font-size:16px'>Repression</p>
    </p>`
  },



})
