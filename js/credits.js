addLayer("N", {
    name: "Credits", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: `<p style="font-size:15px" >credits</p>`,
   // This appears on the layer's node. Default is the id with the first letter capitalized
    

 color: "#B8B799",
 type: "none",
 row: "side",

points: new Decimal(0),
tooltip: "",


clickables: {
  11: {
    style() {
      return {
        "width": "500px",
        "height": "500px",
        "border-radius": "10px",
        "border": "0px",
        "margin": "5px",
        "text-shadow": "0px 0px 10px #000000",
        "color": "#ffffff"
      }
    },
    display() {
      return `<p style="font-size:15px">this button does nothing<br>
      <br>people that helped made this project probably happen.
    escapee - for being the tutor guy, i learned alot from him <br>
    oleg - the script giver <br>
    my motivation - probably shouldnt happen, but here i am <br>
    people who joined my discord server - thank you lol for being with me  <br>
    my hunger - fuck you<br>
    my dumb brain for coming up with this idea: <br>
      - hepiville [ for the antimatter dimensions references ] <br>
      - mrredshark77 [inspiring the dumb kobold to make this game based off <h2>[incremental mass (Rewritten) ]</h2> <br>
      - my hunger [ fuck you ] <br>
    </p>`
  
      
    },
   
  
  },
  
  },


}
)