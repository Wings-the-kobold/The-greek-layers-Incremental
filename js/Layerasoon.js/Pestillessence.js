//soon...
// do TQET to v0.2 first!
//seriously, do it.
/*
REQUIRED TO BRING TO TQET
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// proxy: await delay(1000)


*/ 


  addLayer("PST", {
    symbol() {
      if (options.betterTree) return ``
      else return `<p><img src="resources/Solaris.png" style="width:80px;height:80px;"></p>`
    }
      ,
    startData() { return {
        unlocked: true,
        condensed_solarity: new Decimal(0)
    }},
    color: "#612700",
     nodeStyle() {
        

       let XoffSet = -3.15+(1.5*Math.PI*Math.cos(nodePos.tick/60))
       let YoffSet = 1+(-1.5*Math.PI*Math.sin(nodePos.tick/60))
      //maybe have to change this
      nodePos.SolarisX = options.animateTree ? XoffSet : 0.9
	    nodePos.SolarisY = options.animateTree ? YoffSet : 0.9
      
      // 0 degrees is -3.3, 4.5
      // 90 degrees is -7.5, 0.5
      // 180 degrees is -3.3, -3.5
      // 270 degrees is 0.5, 1
      // center is at -3.3,0.15

      // resting is at 1.5

      // use Lunaris's Cos() value 
      // max distance range for SolX is -1 to 4
      // it should be the opposite of LunX
      
      return {
          "padding":  options.betterTree ? "10px" : "0px",
          "bottom": options.betterTree ? 50 + "cm" : "2cm",
          "left":  options.betterTree ? 0 +"cm":"0", //nodePos.SolarisY +
          "height": options.betterTree ? "80px": "120px",
          "width": options.betterTree ? "80px" : "120px",
          "border": "var(--hqProperty1)",
          
          "border-color": player.borders["Sol"],
          "border-radius": "60%",
          "transform":options.betterTree && player.Sol.activeCheck == "Heliosphere" ? "scale(3,3)" : "",
          "z-index":options.betterTree && player.Sol.activeCheck == "Heliosphere" ? 100000 : 20   
      }

    },

   // Can be a function that takes requirement increases into account
   
   update(diff) {

  }, 

  // 
   
  tabFormat: {
    "": {      
      content: [     
         ["display-text", 
        function() {if (VRSN != "0.7") return `Unlocks at v0.7 TSEGI :)`}],
     
],},},














    tooltip: () => options.animateTree || options.betterTree ? `<h3>???</h3>` : `<p>Open Layer 3, ???</p><br>sneek peak for v0.7</p>`,       
  
    row: 3, 
    position: 1, 
    branches: ["E"],
    layerShown(){ 
      if ( hasMilestone("E",6) ) return true; else return false; 
    },

    unlocked(){
      return true
    },

  })
  