addLayer("C", {
    name: "Center", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: ">C<", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        CenterPoints: new Decimal(0),
  
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
  
  
  
         
  
  
      
  
  
  
  
  
  
  
    tabFormat: {
        "Effectors": {      
              content: [
                
                
                ["display-text",
      function() { 
        
        return ``
  
     }],
     ["display-text",
     function() { 
      if (player["GL"].Solar_Shards.gte(1))
       return `You have ${format(player["C"].CenterPoints )} Center Points `
  
    }],
  
    // player["GL"].CenterPoints
     "blank",
     "blank",
                //"main-display",
                ["infobox","about"],
                
                 
               
                
             
                "blank",
               "blank",
               "upgrades",
              
                
                
                "blank",
                "blank",
                "blank",
                
            ],
            
        },
        "Darkness?": {
          content: [
            "buyables",
          ],
          
  
        },
       
      },
    
  
   
  
  
  
  
  
  
  
    
  
  
  // if (player["GL"].Solar_shards.gte(1))
    tooltip: () => `<p>Open Centrality, side layer</p>`,
  upgrades: {
          
        //to do: make Effecter Upgrades.
  
  
  
  
          
  
  
  
  
  
  
            },
  
  buyables: { 
  
  
  
  
  
  
  
  },
            
  
            clickables: {
                // Challenge Check Upgrades!
  
                
  
  
  
  
            },
  
           
  
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "", description: "Press A to Accelerate the Energy ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    branches: ["S"],
    layerShown(){ 
      if ( hasUpgrade("GL",15) )   return true; 
  
    }
  }
  
  )