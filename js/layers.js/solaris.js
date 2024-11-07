// REMINDER: TO PAUSE A FUNCTION DO setTimeout(s)

// instead just make a value 
// base value is 3 seconds

/* generate number between 0 and one and divide it by 

1 / generated num

That will be the CRNG, in which will add to TRNG.



if (CRNG > BRNG) BRNG = CRNG


*/

addLayer("SAL", {
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


   


  }, 
  
  
      
  
  
  
  
  
  
  
    tabFormat: {
        "Test": {      
              content: [             
       ["display-text",
     function() { 

        
      if (player["C"].CenterPoints.gte(1) || player.C.EffectorTier.gte(1))
       return `You have ${format(player["C"].CenterPoints )}  Center Points `
  
     }],
       ["Test2",
     function() { 
      
      return `test`
      //if (player.C.checkUpgrades.gte(2)) gain = gain.mul(Decimal.pow(5, player.C.CenterPoints).clampMin(1))
     }],
     "blank",
     "clickables",
     
    






    
    // player["GL"].CenterPoints
    
        //if (player.C.EffectorTier.gte(2)) {
        

          
        
    ]},
       
     
    
  
   
  
  
  
  
  
  
  
    
  
  
  // if (player["GL"].Solar_shards.gte(1))
    tooltip: () => `<p>Open Centrality, side layer</p>`,
  upgrades: {
 
            },
  


            
  
    clickables: {
                
               
   
    






// Challenge Check Upgrades!


      21: {
            display() {
              let text = ``
              let textActive = ``
              let rewardDisplay = ``
              if (!getClickableState("C", 21) && player.C.checkUpgrades.lt(1)) text = `Test Check
               `

             

              else if (!getClickableState("C", 21) && player.C.checkUpgrades.gte(1)) text = `Check Upgrade Completed!<br>`
              else text = `Goal: Plasmate #40`
              if (getClickableState("C", 21)) textActive = `Test Check Active [ACTIVE] 
              
              `
             
             
             
             // if (player.C.checkUpgrades.gte(1)) rewardDisplay = `^1.25 to Solarity Gain, and Automate Plasmate buyable, they also no longer spend anything.`

              return `
              <h1>Test Check</h1>
              ${textActive}              
              ${text} 
              ${rewardDisplay}
              <br>`
              

            },
            onClick() {
            if (getClickableState("C", 21) && player.C.checkUpgrades.lt(1)) { 
                player.C.checkUpgrades = player.C.checkUpgrades.plus(1) 
            }   
            if (!getClickableState("C", 21)) {
                <audio controls autoplay>
                    <source src = "4MUD.mp3"> </source>
                </audio>
            }

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






          //challenge check upgrade down here
          // should be in "Darkness?" tab

     
  
  
  
            },
  
           
  
    row: 1, // Row the layer is in on the tree (0 is the first row)
   
    branches: ["S"],
    layerShown(){ 
      if ( hasUpgrade("GL",15) || player.E.EclipseTier.gte(1) )   return true; 
  
    }
  }
})