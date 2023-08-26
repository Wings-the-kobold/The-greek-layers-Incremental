addLayer("N", {
    name: "Credits", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol() {
      return `<p>credits</p>`
    }, // This appears on the layer's node. Default is the id with the first letter capitalized
    
    startData() { return {
      unlocked: true,
      
     
  }},
    color: "#B8B799",
    type: "none",
tooltip: "Helpful people who help me find out on what to do",
  tabFormat : [

    ["display-text",
    function() { return `
    <h3>Credits tab or something idk</h3><br><br>
    people
  escapee - for being the tutor guy, i learned alot from him <br>
  oleg - the script giver <br>
  my motivation - probably shouldnt happen, but here i am <br>
  people who joined my discord server - thank you lol for being with me  <br>
  my hunger - fuck you<br>
  my dumb brain for coming up with this idea: <br>
    - hepiville [ antimatter dimensions ] <br>
    - mrredshark77 [ incremental mass (Rewritten) ] <br>
    - my hunger [ fuck you ] <br>
 
    
    
    
    
    
    
    `},
    "upgrades",
    

  ],


  ],
clickables: {
11: {
  title: `idk `

},

},
row: "otherside",
layerShown(){ return true},
}
)