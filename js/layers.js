addLayer("B", {
    name: "Base increasers", 
    symbol: "B↑",
    position: 0, 
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#2f39ed",
    requires: new Decimal(10),
    resource: "BaseP", 
    baseResource:"Points", 
    baseAmount() {return player.points}, 
    type: "normal", 
    exponent: 3, 
    gainMult() {
        mult = new Decimal(1)
        if (hasUpgrade("B",14)) mult = mult.times(1.2);
        return mult

    },


    upgrades: {
        11: {
            title: "Upgrade 1",
            description() {return "Point generation is added by " + format(this.effect());},
            effect(){
                x = new Decimal(3) //base multiplier
        
                  if(hasUpgrade('B', 14)) {
                    x = x.times(upgradeEffect('B', 14))
                  } //boost from B14
        
                return x;
             },
            cost: new Decimal(5),
        },
        12: {
            title: "i hate titles",  
            description: "BaseP multiplies Point gain",
            effect() {
                return player[this.layer].points.add(1).log(5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(15), 
            unlocked() { return hasUpgrade("B",11) },
        },
        13: {
            title: "TITLES ARE FREAKING BORING", 
            description: "Points are multiplied by 2",
            cost: new Decimal(30),
            unlocked() { return hasUpgrade("B",12) }
        },
        14: {
            title: "Surely it wont get softcapped... right?",   
            description: "Upgrade 1 is stronger based on points", 
            cost: new Decimal(50),
            effect() {
                let effect = player[this.layer].points.log(10).pow(0.3)
                effect = softcap(effect, new Decimal(8000), new Decimal(0.15))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            unlocked() { return hasUpgrade("B",13) }
        },
        15: {
            title: "MORE!!!!!!",
            description:"gain 20% more baseP on prestige",
            cost: new Decimal(70),
            unlocked() { return hasUpgrade("B",14) }
        },
        16: {
            title: "Buyable time",
            description:"time for a buyable, ", //more jkladsfuroeiln
            cost: new Decimal(100),
        }
    },
    buyables: {
        21: {
            cost(x=getBuyableAmount(this.layer,this.id)) { return new Decimal(100).times(1.44) },
            display() { return "add 1 to the baseP gain\n cost:" + this.cost() + "Base."
        },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                
            },
            effect(x) { 
               return Decimal.add(1);     
                    
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
    baseResource:"Base", 
    baseAmount() {return player.points}, 
    type: "static", 
    exponent: 1.15, 
    gainMult() { 
       
        return gainMult
    },
 effect() { },

    upgrades: {
        11: {
            title: "This isnt worth it.",
            description: "Base added by 3", //finished
            cost: new Decimal(1),
        },
        12: {
            title: "Why?",  //also done
            description: "2x point gain",
            cost: new Decimal(3) 
        },
        13: {
            title: "Grind go brr", //yes
            description: "AP multiplies Point gain by 20% per amount of it",
            effect() {
                return player[this.layer].points.add(0.8).times(0.2)
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
   
    gainExp() { // Calculate the exponent on main currency from bonuses
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset to go Alpha", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return player[this.layer].unlocked || hasUpgrade('B',17)}
    
}
)










