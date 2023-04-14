addLayer("B", {
    name: "Base Points", 
    symbol: "B",
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#6AFF1D",
    requires: new Decimal(10),
    resource: "Base", 
    baseResource:"Base Points", 
    baseAmount() {return player.points}, 
    type: "normal", 
    exponent: 3, 
    gainMult() {
        
        
        
    
        mult = new Decimal(1)
        return mult
        
    },


    upgrades: {
        11: {
            title: "Second thoughts.",
            description: "Point generation is 1.15 stronger", //finished
            cost: new Decimal(10),
        },
        12: {
            title: "Pain.",  //also done
            description: "Multiply Point generation by 1.4",
            cost: new Decimal(35) 
        },
        13: {
            title: "why so high?.", //yes
            description: "Multiply Point Generation by 1.55",
            cost: new Decimal(80)
        },
        14: {
            title: "Boost.", // wip    
            description: "Base multiplies Point Generation (Base -> Points)", //increase point gain by Basepoints
            cost: new Decimal(165),
            effect() {
                return player[this.layer].points.add(1).log(5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },

        },
        15: {
            title: "Synergy.",
            description:"Points Boosts Base (Points -> Base).", //increase Basepoints by point gain, but have its effect reduced
            cost: new Decimal(500),
            effect() {
                return player.points.add(1).pow(0.15)
               
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },  
        
        },
        16: {
            title: "Boost. (again)",
            description:"Give ^1.05 boost to Point gain. and unlock a buyable", //jkladsfuroeiln
            cost: new Decimal(2000),
        },
        17: {
            title: "I hope this is worth it.",
            description:"New layer perhaps?", //more jkladsfuroeiln
            cost: new Decimal(15000),
        }
    },
    buyables: {
        21: {
            cost(x=getBuyableAmount(this.layer,this.id)) { return new Decimal(100).times(1.35) },
            display() { return "Each upgrade gives a compounding 10% boost to Points. Cost:" + this.cost() + " Base." + +"x"
        },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                
            },
            effect(x) { 
               return Decimal.pow(1.1,x);     
                    
            },
            effectDisplay() { 
                return format(buyableEffect(this.layer, this.id))+"x"
            },
            unlocked() { return hasUpgrade("B",16) },
        },

    },
    gainExp() { // Calculate the exponent on main currency from bonuses
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for BasePoints", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
    
}
)
//new layer

addLayer("A", {
    name: "Alpha Points", 
    symbol: "AP", 
    position: 1,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#8c0b0b",
    requires: new Decimal(10,000), 
    resource: "α", 
    baseResource:"Bases", 
    baseAmount() {return player.points}, 
    type: "static", 
    exponent: 1.4, 
    gainMult() { 
       
        return gainMult
    },
 effect() { },

    upgrades: {
        11: {
            title: "This isnt worth it.",
            description: "Base Is multiplied by 1.3x", //finished
            cost: new Decimal(1),
        },
        12: {
            title: "Why?",  //also done
            description: "10x point gain",
            cost: new Decimal(3) 
        },
        13: {
            title: "Grind go brr", //yes
            description: "AP multiplies Point gain by 20% per amount of it",
            effect() {
                return player[this.layer].points.add(0.8).times(1.2)
            },
            cost: new Decimal(5),
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },

        },
        14: {
            title: "Inflation", // wip    
            description: "AP multiplies Points. (AP -> Points)", //increase point gain by Basepoints
            cost: new Decimal(8),
            effect() {
                return player[this.layer].points.add(1).times(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },

        },
        15: {
            title: "What if Alpha boosts Base?",
            description:"You read the title, AP -> Base ", 
            cost: new Decimal(15),
            effect() {
                return player[this.layer].points
               
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },  
        
        },
        16: {
            title: "ASjn;roiv oi;es r",
            description:"4x to point gain", //jkladsfuroeiln
            cost: new Decimal(15),
        },
        17: {
            title: "Buyable time.",
            description:"2 new buyables, 2x boost to Base", //more jkladsfuroeiln
            cost: new Decimal(25),
        },
        18: {
            title: "aslf vparear 0inwen",
            description:"Points boosts Points", //more jkladsfuroeiln
            cost: new Decimal(25),
        },
    },
    buyables: {
        21: {
            cost(x=getBuyableAmount(this.layer,this.id)) { return new Decimal(5).mul(x) },
            display() { return "1.2x boost to Points as a compounding effect." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                
            },
            effect(x) {
                mult = mult.times(1.2)

            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x"
            
            },

            unlocked() { return hasUpgrade('A',17) },
        },
        21: {
            cost(x=getBuyableAmount(this.layer,this.id)) { return new Decimal(5).mul(x) },
            display() { return "multiply base gain by 15%" },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                
            },
            effectDisplay() { 
                return format(upgradeEffect(this.layer, this.id))+"x"
            
            },
            unlocked() { return hasUpgrade('A',17) },
        },
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset to go Alpha", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked || hasUpgrade('B',17)}
    
}
)










