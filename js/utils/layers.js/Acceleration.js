addLayer("A", {
    name: "Accelerations", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A^", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F0FA64",
    requires() {
      let base = new Decimal(1)
      let scale = new Decimal (1.1)
      base = scale.pow(player[this.layer].points)
        return base
    } , // Can be a function that takes requirement increases into account
    resource: "Accelerons", // Name of prestige currency
    baseResource: "Energy", // Prestige currency uses this "base currency"
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.pow(0.3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    tabFormat: {
        "Main Upgrades": {
            
        },
        "The Machine": {
            upgrades: {
                11: {
                    title:"Chasm-1",
                    description: "5x Energy Gain",
                    cost: new Decimal(5),
                },
                12: {
                    title: "Chasm-2",
                    description: "3x Acceleron Gain",
                    cost: new Decimal(10),
                    
                },
                13: {
                    title: "Heterogenic-1",
                    description: "Accelerons boost Energy Gain",
                    cost: new Decimal(20),
                    
                },
            },
        },
    

    },







    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "Press A to Accelerate the Energy ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
