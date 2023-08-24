addLayer("N", {
    name: "Credits", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CD", // This appears on the layer's node. Default is the id with the first letter capitalized
    
    startData() { return {
      unlocked: true,
      
     
  }},
    color: "#B8B799",
    type: "side",

  tabFormat : [

    ["display-text",
    function() { return `
    <h2>People who helped me made this tree</h2>
    
    <h3>escapee - for being the tutor kinda guy </h3> 
    <h3>oleg - the script giver</h3> 
    <h3>my motivation - probably shouldnt happen, but here i am </h3> 
    <h3>people who joined my discord server - thank you lol for being with me </h3> 
    <h3> </h3> 
    <h3> </h3> 
    <h3> </h3> 
    <h3> </h3> 
    <h3> </h3> 
    <h3> </h3> 
    
    
    
    
    
    
    `},
    "upgrades",
    

  ],


  ],
}
)