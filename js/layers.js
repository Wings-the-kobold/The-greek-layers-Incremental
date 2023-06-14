addLayer("E", {
    name: "Energy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#F0FA64",
    requires: new Decimal(30), // Can be a function that takes requirement increases into account
    resource: "Energy", // Name of prestige currency
    baseResource: "Particles", // Prestige currency uses this "base currency"
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
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
                    title:"Find a Particle generator",
                    description: "You find an old and rusty generator, its condition is so bad that you might need to watch over it to keep it running.",
                    cost: new decimal(0),
                },
                12: {
                    title: "Repair 1/4",
                    description: "Start polishing the generator. Particle growth decay falls 50% slower",
                    cost: new decimal(20),
                    onclick() {
                        
                    },
                    unlocked() {},
                },
                13: {
                    title: "Repair 2/4",
                    description: "Start Fixing The Generator. Particle Gain is 50% faster",
                    cost: new decimal(20),
                    onclick() {
                        
                    },
                    unlocked() {},
                },
            },
        },
        
    },

  

    clickables: {
        1: {
            display() {return "Kick"},

            unlocked() {return hasUpgrade(E, 1)},
        },

    },







    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "e", description: "Press E to smash all particles for energy ", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
