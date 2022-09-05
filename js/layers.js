addLayer("B", {
    name: "BasePoints", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#6AFF1D",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "BasePoints", // Name of prestige currency
    baseResource:"BasePoints", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.65, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },


    upgrades: {
        11: {
            title: "The First Upgrade",
            description: "This is the birth of the game, boost point gen by 1.5", //finished
            cost: new Decimal(10),
        },
        12: {
            title: "Man can this get any faster please?",  //also done
            description: "no, but you get a 1.5 boost again",
            cost: new Decimal(25) 
        },
        13: {
            title: "DUDE WHERE IS THE INFLATION?!", //yes
            description: "shut up man its coming in a second", //boost point gen by 1.75
            cost: new Decimal(70)
        },
        14: {
            title: "Oh my god bro, this is taking way too long.", // wip    
            description: "FINE! YOU WANT UN UPGRADE? HERE! TAKE THIS UPGRADE", //increase point gain by Basepoints
            cost: new Decimal(111)
        },
        15: {
            title: "i think this needs better upgrades"
            description:"Take this goddamn upgrade you wuss" //increase Basepoints by point gain, but have its effect reduced
            cost: new Decimal(200)
        }
        

    },
  
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for BasePoints", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
    
}
)
