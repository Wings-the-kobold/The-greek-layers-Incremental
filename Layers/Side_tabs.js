addLayer("Ph", {
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    color: "yellow",
    
    unlocked: true,
    row: "side",

    clickables: {
        11: {
            display() {return "Click for a compounding 1% boost to points!"},
            
            

        }
       
    }

}
)