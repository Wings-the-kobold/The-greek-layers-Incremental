addLayer("dL", {
    name: "Solar Ray", 
    symbol: "💬", 
    
    startData() { return {
       
    }},
    color: "#ff6a00",
    position: "side", 
    type: "", 
    row: "side", 
  
    tabFormat: {
        "Phase 1": {      
              content: [
                ["display-text",
      function() { 
        let progression = ""
        let type1 = ""
        if (player.E.EclipseTier.gte(1)) type1 = `
        <br><br>------
        <br>part 2: (P-a -> Person a; P-b -> person b, and ECT...)
        <br> P-A: YOU CLEARLY DID IT!
        <br> P-B: WAIT WAIT GUYS STOP ARGUEING! WHAT IS THAT THING???
        <br> *they all stop to look at the yellow gate, in which seems to be the Eclipsifier*
        <br> P-A, P-B: Woah...
        <br> P-C: Finally we get to stop arg- WOAH
        <br> P-B: ...really? you still decide to bring that up?
        <br> P-C: well actually we havent introduced ourselves with the reader here~
        <br> *they both look at them, P-A, P-B glares*
        <br> [Unlock more dialogue at Eclipse Tier 2!]`

      if (getClickableState("C",23)) progression = `
        Note that this Upgrade check has a large Timewall of around 6 hours <br>
        <br> Person A: In the meantime, why dont you just play other games? like touching grass? or playing adopt me in roblox??? 
        <br> Person A: w-what do you mean you hate adopt me? 
        <br> Person A: adopt me is FUN 
        <br> Person B: pfft oh please, adopt me is for KIDS
        <br> Person A: OH YEAH? THEN WHAT DO YOU SUGGEST?? 
        <br> Person B: ...idk lmao probably something better than your stinky game 
        <br> Person A: GIVE ME SOMETHING THAT COULD BE BETTER THAN ADOPT ME
        <br> Person B: The person playing this game can probably tell us
        <br> Person C: HEY! WHAT DID I TELL YOU ABOUT BREAKING THE FOURTH WALL?
        <br> Person B: Sorry, I Have a habit to uncontrollably tell that the reader is doing
        <br> Person C: >:( well than stop it! its getting very annoying!
        <br> Person C: And were not even helping because by the looks of it, Our dialogue is filling up the bottom half of the screen!
        <br> Person A and B: HYPOCRITE!
        <br> Person C: YOU DID IT FIRST PERSON B
        <br> *the three are now arguing... when will this ever end?*
        <br> [Unlock more dialogue at higher resets]
        ${type1}
       `
            return progression
  
     }],
              ],
            
        },
       
       
      },


    layerShown(){if (player.C.checkUpgrades.gte(3) || player.E.EclipseTier.gte(1)) return true}
})