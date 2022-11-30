addLayer("B", {
    name: "Base Points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#6AFF1D",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Base's", // Name of prestige currency
    baseResource:"BasePoints", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.11, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },


    upgrades: {
        11: {
            title: "Second thoughts.",
            description: "Point generation is 2x stronger", //finished
            cost: new Decimal(30),
        },
        12: {
            title: "Pain.",  //also done
            description: "Unlock 2 Buyables, Multiply Point generation by 2x",
            cost: new Decimal(100) 
        },
        13: {
            title: "Slow.", //yes
            description: "Multiply Point Generation by another 2x",
            cost: new Decimal(500)
        },
        14: {
            title: "Boost.", // wip    
            description: "Base multiplies Point Generation (Base -> Points)", //increase point gain by Basepoints
            cost: new Decimal(1200),
            effect() {
                return player[this.layer].points.add(1).pow(0.6)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },

        },
        15: {
            title: "Synergy.",
            description:"Points Boosts Base (Points -> Base). and unlock a buyable", //increase Basepoints by point gain, but have its effect reduced
            cost: new Decimal(3000),
            
            gainMult() {
                let mult = new Decimal(1)
                if (hasUpgrade('B', 15)) mult = mult.times(upgradeEffect('B', 15))
                return mult
            }
        },
        16: {
            title: "Boost. (again)",
            description:"Give ^1.05 boost to Point gain, and unlock 2 buyables", //jkladsfuroeiln
            cost: new Decimal(9000),
        },
        17: {
            title: "I hope this is worth it",
            description:"New layer perhaps?", //more jkladsfuroeiln
            cost: new Decimal(20000),
        }
    },
    buyables: {
        21: {
            cost(x=getBuyableAmount(this.layer,this.id)) { return new Decimal(100).mul(x) },
            display() { return "Make Point generation 50% stronger per bought" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() { return hasUpgrade(B,16) }
        },
        22: {
            cost(x=getBuyableAmount(this.layer,this.id)) { return new Decimal(100).mul(x) },
            display() { return "This upgrade makes Upgrades 1,2,3 10% stronger" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() { return hasUpgrade(B,16) }
        },  
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1.005)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for BasePoints", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
    
}
)
