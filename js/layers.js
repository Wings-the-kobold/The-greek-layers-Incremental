addLayer("U", {
    name: "Upgrades", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: true,
      
     
  }},
    color: "#B8B799",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    
    tabFormat: [
      "main-display",
      ["display-text",
          function() {`you have ${format(player.points)} points` }, //you add this for every currency, it shows the effect 
         
        ],
      "buyables",
      "upgrades",
    ],
    


    upgrades: {
      11: {
        title: `<h2>Upg1</h2>`,
        cost: new Decimal(10),
        description: `<h3>Generate 1 point per second.`,
       //</h3> <br><br><h3 style="color:#3d5706 ; text-shadow: #2c2559 2px 2px 20px;"> (Permanent)</h3>`,

        style() {
          return {
            "width": "150px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },
        currencyInternalName: "points",

      },
      12: {
        title: `<h2>Upg2</h2>`,
        cost: new Decimal(5000),
        description: `<h3>Point gain is Doubled</h3>`,

        style() {
          return {
            "width": "150px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }

        },

       unlocked() {
         if (hasUpgrade("U",11) && player.points.gte(new Decimal(this.cost)) || hasUpgrade("U",12) ) return true
        },
        currencyInternalName: "points",
      },
      13: { 
        title: `<h2>Upg3</h2>`,
        cost: new Decimal (10000),
        description: `<h3>RepUpg2 effect is increased by 20% </h3>`,

        style() {
          return {
            "width": "150px",
            "height": "85px",
            "border-radius": "10px",
            "border": "0px",
            "margin": "5px",
            "text-shadow": "0px 0px 10px #000000",
            "color": "#ffffff"
          }
        },

        unlocked() {
         if (hasUpgrade("U",12) && player.points.gte(new Decimal(this.cost)) | hasUpgrade("U",13)) return true

         
        },
        currencyInternalName: "points",
      },
    },

    
    buyables: {
        11: {
          cost(x) {
            let PowerI = new Decimal(1.55)
        
            let Calculation = new Decimal(15).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
            return Calculation;
          },
          display() {
            return `
          <h2>Rep Upgrade 1</h2>
          <br>
        <h2>  +${format(tmp[this.layer].buyables[this.id].effect)} Effect Boost to Upg1</h2>
          <br>
        <h2>${format(tmp[this.layer].buyables[this.id].cost)} Points</h2>
        <h2>${format(getBuyableAmount(this.layer, this.id))} bought</h2>`
          },
          canAfford() {
            return player.points.gte(this.cost())
          },
          style() {
            return {
              "width": "350px",
              "height": "115px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let effect = decimalZero
            effect = getBuyableAmount(this.layer, this.id)
            return effect;
          },
          unlocked() {
            if (hasUpgrade("U",11) && player.points.gte(new Decimal(15)) || getBuyableAmount(this.layer, this.id).gte(1)) return true
           }
        
        },
        12: {
          cost(x) {
            let PowerI = new Decimal(1.21)
            if (getBuyableAmount(this.layer,this.id).gte(100)) PowerI = new Decimal(1.5)
            if (getBuyableAmount(this.layer,this.id).gte(500)) PowerI = new Decimal(3)
            if (getBuyableAmount(this.layer,this.id).gte(1000)) PowerI = new Decimal(20)
            let Calculation = new Decimal(200).mul(Decimal.pow(PowerI, x.pow(1))).ceil()
            return Calculation;
          },
          display() {
            let scaling = "";
            //if (getBuyableAmount(this.layer, this.id).gte(0)) scaling = "(Scaled)";
            if (getBuyableAmount(this.layer, this.id).gte(200)) scaling = "(Superscaled)";
            if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Hyperscaled)";
            if (getBuyableAmount(this.layer, this.id).gte(500)) scaling = "(Scaling^2)"; 
            return ` 
            <h2>Rep Upgrade 2</h2>
              <br>
            <h2>  x${format(tmp[this.layer].buyables[this.id].effect)} points gain </h2>
              <br>
            <h2> ${format(tmp[this.layer].buyables[this.id].cost)} Points</h2>
            <h2>${format(getBuyableAmount(this.layer, this.id))} bought ${scaling}</h2>
     
         
        `
          },
          canAfford() {
            return player.points.gte(this.cost())
          },
          style() {
            return {
              "width": "350px",
              "height": "115px",
              "border-radius": "10px",
              "border": "0px",
              "margin": "5px",
              "text-shadow": "0px 0px 10px #000000",
              "color": "#ffffff"
            }
          },
          buy() {
            player.points = player.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
          },
          effect(x) {
            let effect = new Decimal(1.1)
            effect = effect.pow(getBuyableAmount(this.layer, this.id))
            if (hasUpgrade("U",13)) effect = effect.mul(1.2)
            return effect;
          },
          unlocked() {
            if (hasUpgrade("U",11) && player.points.gte(new Decimal(200)) || getBuyableAmount(this.layer, this.id).gte(1)) return true
           }
        
        },
    },








    row: 0, // Row the layer is in on the tree (0 is the first row)
    
    layerShown(){return true}
})
