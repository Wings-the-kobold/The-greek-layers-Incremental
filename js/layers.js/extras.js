
var type0 = ``
var type1 = ``
var type2 = ``
var type3 = ``
var type4 = ``
var type5 = ``
var type6 = ``
var type7 = ``
var type8 = ``
var type9 = ``
var type10 = ``
var type11 = ``
var type12 = ``










addLayer("dL", {
    name: "Solar Ray", 
    symbol: "", 
    startData() { return {
      unlocked: true,
      tab: "",
      sub: "",
  }},
  
    color: "#ff6a00",
    position: "0", 
    
    row: "side", 
    nodeStyle() {
      return {
        
      }
    },
  tabFormat: {
    ":)": {       
      content: [
                
                ["display-text", function() {

}

          ],
         ["row", [ //check upgrades
          ["Custom", {id:11}],
          ["Custom", {id:12}],
          ["Custom", {id:13}],
         ]],

         "blank",
         

         ["row", [ //check upgrades
          ["Custom", {id:21}],
          ["Custom", {id:22}],
          ["Custom", {id:23}],
          ["Custom", {id:24}],
          ["Custom", {id:25}],
        ]],



        
                
       ["display-text",
      function() { 
        //let progression = ""
        
        let dUnl = ``
        

        if (player.E.EclipseTier.eq(6)) dUnl = `Discover The Randomizer to unlock more dialogue!`
        else if (Check("L",11).has) dUnl = `Get Eclipse Tier 6 to unlock more dialogue!`
        else if (player.L.activeCheck == "TimeTillDark") dUnl = `<br> Beat '4 Minutes Until Dark' to unlock more dialogue`
        else if (hasUpgrade("L",23) && !Check("E",11).has) dUnl = `start '4 Minutes Until Dark' to unlock more dialogue` 
        else if (!player.L.LightCheck.gte(2)) dUnl = `<br> Acheive Light Check level 2 to unlock more dialogue`
        else if (!Check("E",11).has && player.E.EclipseTier.eq(5)) dUnl = `<br> Beat 'The Forgotton' to unlock more dialogue`
        else if (player.E.EclipseTier.eq(4)) dUnl = `<br> Unlock more dialogue at Eclipse Tier 5!`
        else if (player.E.EclipseTier.eq(3)) dUnl = `<br> Unlock more dialogue at Eclipse Tier 4!`
        else if (player.E.EclipseTier.eq(2)) dUnl = `<br> Unlock more dialogue at Eclipse Tier 3!`
        else if (player.E.EclipseTier.eq(1)) dUnl = `<br> Unlock more dialogue at Eclipse Tier 2!`
        else if (player["C"].activeCheck == "Twilight") dUnl = `<br>(Note that Twilight check has a large Timewall of around 6 hours) `
        else if (Check("C",13).has && player.E.EclipseTier.eq(0)) dUnl = `<br> [Unlock more dialogue at higher resets]`
        else dUnl = `Hey, this is the storyline of this game, go ahead and check it out every so often because we're here for a WILD ride :)`

        // Solaris has entered the chat. 
        let sub_type1 = hasUpgrade("Sol",14) ? `
        <br> ----------------- <br>
        <br> Solaris: oh, it looks like you found my favorite pla-
        <br> Lunaris: of course you would show this. 
        <br> Glade: oh great, we have a gamble addict~
        <br> Solaris: IM NOT A GAMBLE ADDICT! I JUST REALLY LIKE TO GAMBLE
        <br> Lunaris: That's called being an addict moron
        <br> Solaris: <s>Do you want to be put back in your chains again?</s> Sure asshole.
        <br> Glade: What was that? 
        <br> Solaris: Nothing~ you heard nothing
        <br> Glade: <-<     >->
        <br> Solaris: Get to work, user.
        <br> Glade: Fine. ill play your stupid games...
        <br> Solaris: Good. I'll reward you well if you do well...
        ` : ``

        if (player.Sol.activeCheck == "Heliosphere" || player.Sol.Heliosphere ) type10 = `
        <br>--------------------------------<br>
        WIP :)
        <br> 
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

        `

        if (player.E.EclipseTier.gte(6)) type9 = `
        <br> WIP :)
        <br> 
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        ${sub_type1}
      
        `


        if (Check("L",11).has) type8 = `
        <br>--------------------------------<br>
        <br> *as you defeat the monster, Lunaris falls down, you hear cracks of their legs, but they seem fine as they proceed to slowly but surely get up*
        <br> Glade: Man, that was exausting,never do that again. PLEASE
          <br> Lunaris: That's what you derserve kid, mess with my powers, mess with the WHOLE environment.
          <br> Glade: Never doing that again... holy damn, you're harsh
          <br> Lunaris: No, you dont realize how strong my powers are...
          <br> Glade: w-what about the others?
          <br> Lunaris: They abandoned you, right?
          <br> Glade: ...I-... 
          <br> Lunaris: Answer. me.
          <br> Glade: y-yes... they did... honestly, I feel like they were my only friends... but I, myself felt like i was growing dista-
          <br> Lunaris: I'm gonna have to stop you right there, buddy. Not that i dont want to listen, but we have someone to meet now... 
          <br> Glade: oh~... I wonder who it is?
          <br> Lunaris: oh dont worry, you'll see when we get there :)
        `
        
        if (player.L.activeCheck == "TimeTillDark" || Check("L",11).has) type7 = `
        <br>--------------------------------<br><br>
        <b><i>After freeing Lunaris, a powerful explosion booms nearby your location, say 40 feet northwest in the dark wilting forest, 
        yet you are undeterred, the force almost knocking you down, although glade is seen on the ground. 
        you look around, yet Glade is anxiously and frantically looks around trying to pinpoint where the explosion came from...</i></b><br><br>

        <br> Glade: PLAYER WHAT THE HELL DID YOU JUST DO 

        <br> <br><b><i>the ground shifts viciously, twisting and turning, trying to attack anything it sees, 
        a big monster emerges, strands of dark matter and entropy tails around its mouth, body, and eyes as it begins charging at Glade </i></b><br> <br>

        Glade gets up in a bolt trying to scape this aggro'd being lunging after you and Glade, as they begin trying their absolute best to avoid it themselves, while they shout at the user</i>
        <br> Glade: PLAYER HELP, DO SOMETHING, PLEASE 

        <br><br><b> <i>Lunaris seems to be chanting in some sort of language, as if they are being forced to attack Glade. repeating the words over and over again </i> </b>
        <br><br><h3 style="color:#7d0f9c">ANTE MEDIAM NOCTE PERIBIT, IRA DEORUM LUNARUM TE VERTERE</h3><br>
        
        <br>Glade now is attempting to escape the land, or area. trying to hide away, you are left by yourself, only to deal with glades mishaps

        `


        if (player.L.LightCheck.gte(2)) type6 = `
        <br> Glade: Hey user, it's me again, we haven't spoken in a while huh?
        <br> Glade: Still persisting huh? thats nice, I'm just over here experimenting with these Essences Lunaris gave us...
        <br> Glade: oh, I have no idea where Grayhole and That other guy is... i forgot his name already xd
        <br> Lunaris: ...who is this, user?
        <br> Glade: Oh, you must be Lunaris. hi, I'm Glade *they attempt to shake hands with Lunaris, but Lunaris doesn't seem so sure about it*
        <br> Lunaris: uh~ hi? *they are unsure, trying to get their hand off of Glades hands, but it was swept in a short handshake motion instead*
        <br> Glade: What? don't you like handshakes?
        <br> Lunaris: .-. not really, 
        <br> Glade: oh, I'm sorry, I didn't know.
        <br> Lunaris: i-it's fine...
        <br> Glade, while quietly saying: can't beleive they abandoned me... what friends they are... 
        <br> Lunaris: hm?
        <br> Glade: oh nothing, I was talking to the user, or player.
        <br> Lunaris: Who is player? are they the one that is messing with my stuff?
        <br> Glade: no that's me, I'm the one Experimenting...

        

        
        `
        
        if (Check("E",11).has) type5 = `
        <br>--------------------------------<br>
        <br> Glade: You know user, you should know something.
        <br> Glade: I like you, you're persistent, I am too.
        <br> Glade: But we have our own differences too, you know.
        <br> Glade: I may be just a character in the game, but i have feelings too...
        <br> Glade: and you know I like to Fourth wall break in alot of places, but...
        <br> Glade: you do not know the others like we do...
        <br> Glade: ...man what am I doing... why am i talking to someone imaginative like a crazy person...
        <br> Glade: ...You and I are going to be friends... trust me... 
        `

        if (player.E.EclipseTier.gte(4)) type4 = `
        <br>--------------------------------<br>
        <br> Glade: GUYS COME OVER HERE! I NEED YOU!
        <br> *but there was no man, only twilight and shadows in sight, Glade was irritated*
        <br> Glade: damn it guys, really? ughh~ the ONE time i get serious...
        <br> Glade: ...what's that noise? 
        <br> *the rustling noises of leaves shakes him, as they are looking around anxiously,*
        <br> *it is not sure what is past the bushes, as they quickly try to find a way inside something, or under, like a shelter*
        <br> Glade: oh~ i hope they're going to be okay~
        `

        if (player.E.EclipseTier.gte(3)) type3 = `
        <br>--------------------------------<br>
        <br> Grayhole: OH YOU BETTER NOT GET BACK HERE, GREEDY BASTARD!!
        <br> *while Hourglass is in a chase against Grayhole, Glade is roaming around the cold, dark, land. there seems to be... a figure in some chains... they seem beaten up, bruised, seemingly abused by someone...*
        <br> Glade, upon looking over: oh for f*cks sake, GUYS GET YOUR ASS OVER HERE! THERES SOMEONE YOU NEED TO SEE!
        <br> *you can hear their voice, echoing far and long towards glade* Grayhole: NO!
        <br> Glade, irritated: really, guys this is important-
        <br> *their voice echoes, but it can bearly be heard* Hourglass: IM F*CKING COMING HOLD ON-
        <br> Glade: IM WAITING HURRY UP~
        <br> Glade: oh for f*cks sake, im doing this myself. ooh, what could this be? 
        <br> *the warmth of the solar charge on the machine soothes them, but it seems to be a bit too warm as it gets stronger*
        <br> Glade: okay~ ow, that's warm, wow! who knew this machine can overheat that quick!  
        `

        if (player.E.EclipseTier.gte(2)) type2 = `
        <br> P-C: what? im just saying we need to tell ourselves who we are-
        <br> P-B: ...only if  you would stop breaking the FOURTH WALL, Glade
        <br> Glade: really f*cker? you decide to name me that? what if i called you HOURGLASS?
        <br> Hourglass: oh screw you, at least I'm not the one named vEnCtA-
        <br> *suddenly with no hesitation, 'Vencta' slaps Hourglass hard* do NOT call me THAT. i'd rather be something MUCH cooler, like 'Grayhole'
        <br> Glade: wait wait wait, guys, what is this stuff?
        <br> Hourglass and Grayhole: what?
        <br> Glade: this... it's... shards of something... it looks like... gray matter???
        <br> Grayhole: weird... I wonder what it could be...?
        <br> Glade: maybe... it hold some power inside it- 
        <br> Hourglass: well in that case...
        `

        if (player.E.EclipseTier.gte(1)) type1 = `
        <br>--------------------------------<br>
        <br>(P-a -> Person a; P-b -> person b, and ECT...)
        <br> Person A: YOU CLEARLY DID IT!
        <br> P-B: WAIT WAIT GUYS STOP ARGUEING! WHAT IS THAT THING???
        <br> *they all stop to look at the yellow gate, in which seems to be the Eclipsifier*
        <br> Person A and B: Woah...
        <br> Person C: Finally we get to stop arg- WOAH
        <br> Person B: ...really? you still decide to bring that up?
        <br> Person C: well actually we havent introduced ourselves with the reader here~
        <br> *they both look at them, Person A and B*
        `

      if (Check("C",13).has || player.E.EclipseTier.gte(1)) type0 = `    
        <br> Person A: In the meantime, why dont you just play other games? like touching grass? or playing adopt me in roblox??? 
        <br> ["NO!"]
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
        `
       
      

      let phase = ``  

      if (player.dL.sub == "Center") phase = `${type0}${type1}`  
      else if (player.dL.sub == "Enlighten") phase = `${type2}${type3}${type4}${type5}`
      else if (player.dL.sub == "Lunaris") phase = `${type6}${type7}${type8}`
      else if (player.dL.sub == "Solaris") phase = `${type9}${type10}`  
      else if (player.dL.sub == "The Core") phase = `${type11}${type12}`  

       let progression = `
      <h3> ${dUnl} </h3>
       ${phase} 
       `

        if (player.dL.tab == "Storyline") return progression; else return ``
  
     }],
        
      ["display-text", function(){
        if (player.dL.sub == "" && player.dL.tab == "Storyline") return `<h4> ...Choose a layer section to begin reading </h4>`

      }],

      ["display-text", function() {

   let text = `
    Hey, thanks for playing this game. it means alot to me.<br><br>
      People that helped with this game, as well as with debugging:<br>
        Escapee: component help, general JS help, and a little feedback<br>
        Donbor: providing music '86 Minutes until dark'. for a check upgrade<br>
        Voliik: providing music 'Eclipse' as for the end game music<br>
        Sedar: early game rebalancing help, and stuffs<br>
        Not my motivation: :trol:<br>
        Me: Creating the game<br>
        <br>

        Additional resources:<br>
        April 8th 2024, <a href="https://science.nasa.gov/eclipses/future-eclipses/eclipse-2024/" target="__blank" rel="noopener noreferrer">The Total Solar Eclipse!</a>
        The total solar eclipse event </a> that caused HUGE inspiration for this game <br>
        Uses some assets from The Modding Tree from version 2.6.6.2 - Remixed by ThatOneKobold (me!) 
<br><br>
        This game IS part of a series known as 'the greek layer tower', Otherwise known as TGLT. there is ALOT more to expect so get ready!<br>
        

        Difficulty stats: <br><br>

        Timewalls/Forcewalls: 7/10 [Irritation] <br>
        Strategy usage/Tedious Gameplay: 6/10 [Complex] <br>
        Overall : 6.3 / 10
<br>----------------------------------------------<br>
<span class="ignThemes" > 
Statistics: <br>
</span>
You have spent <b>${formatTime(player.timePlayed)}</b> Taming this eclipse.<br>
You are ${format(player.points.log(10).div(1000).mul(100))}% close to Taming the eclipse in this version (V0.6). <br>
It has been ${formatTime(player.resetTime)} since you made any reset.<br>
<br>
${player.TSEGI_COMPLETIONS > 0 ? "You have tamed the eclipse " + player.TSEGI_COMPLETIONS + " times." : ""}<br>
${player.GL.points.gte(1) ? "(V0.4) you have accumulated a total of: " + format(player.GL.points) + " Solar Points <br><h5>(They do nothing lol they're just for show) </h5>" : ""}






        `

        if (player.dL.tab == "Credits") return text; else return ``

      }],

      "blank",
      "blank",
      "blank",

      ["row", [ //check upgrades
        ["Custom", {id:41}],
        ["Custom", {id:42}],
        ["Custom", {id:43}],
        ["Custom", {id:44}],
        ["Custom", {id:45}],
      ]],

      
        ],
         
        },      
      },



    Custom: {
      11: {
        display() {return `<h2>Credits + Info</h2>`},
        onClick() {player.dL.tab = "Credits"; player.dL.sub = ""},
        canClick() {return true},
        style() {return {
          "width": "120px",
          "height": "40px",
          }},  
        unlocked() {return true}
      },
      12: {
        display() {return `<h2>Storyline</h2>`},
        onClick() {player.dL.tab = "Storyline"},
        canClick() {return true},
        style() {return {
          "width": "100px",
          "height": "40px",
          }},  
        unlocked() {return player.C.checkUpgrades.gte(3) || player.E.EclipseTier.gte(1)}
      },
      
      13: {
        display() {return `<h2>Unrelated</h2>`},
        onClick() {player.dL.tab = "Unrelated"},
        canClick() {return true},
        style() {return {
          "width": "100px",
          "height": "40px",
          }},  
        unlocked() {return true}

      },


    


      21: {
        display() {return `<h3>Sub: Centrality</h3>`},
        onClick() {if (player.dL.tab == "Storyline") player.dL.sub = "Center"},
        canClick() {return true},
        style() {return {
          "width": "100px",
          "height": "40px",
          }},  
        unlocked() {return (Check("C",13).has || player.E.EclipseTier.gte(1)) && player.dL.tab == "Storyline"}
      },

      22: {
        display() {return `<h3>Sub: Enlightenment </h3>`},
        onClick() {if (player.dL.tab == "Storyline") player.dL.sub = "Enlighten"},
        canClick() {return true},
        style() {return {
          "width": "120px",
          "height": "40px",
          }},  
        unlocked() {return player.E.EclipseTier.gte(1) && player.dL.tab == "Storyline"}
      },
      23: {
        display() {return `<h3>Sub: Lunaris </h3>`},
        onClick() {if (player.dL.tab == "Storyline") player.dL.sub = "Lunaris"},
        canClick() {return true},
        style() {return {
          "width": "100px",
          "height": "40px",
          }},  
        unlocked() {return Check("E",11).has && player.dL.tab == "Storyline"}
      },
       24: {
        display() {return `<h3>Sub: Solaris </h3>`},
        onClick() {if (player.dL.tab == "Storyline") player.dL.sub = "Solaris"},
        canClick() {return true},
        style() {return {
          "width": "100px",
          "height": "40px",
          }},  
        unlocked() {return player.E.EclipseTier.gte(6) && player.dL.tab == "Storyline"}
      },
       25: {
        display() {return `<h3>Sub: The Core. </h3>`},
        onClick() {if (player.dL.tab == "Storyline") player.dL.sub = "The Core"},
        canClick() {return true},
        style() {return {
          "width": "100px",
          "height": "40px",
          }},  
        unlocked() {return player.E.EclipseTier.gte(7) && player.dL.tab == "Storyline"}
      },
      // add more 




      41: {
        display() {return `booga boogus?`},
        onClick() {alert("bunga")},
        canClick() {return true},
        style() {return {
          "width": "100px",
          "height": "40px",
          }},  
        unlocked() {return player.dL.tab == "Unrelated"}
      },

      42: {
        display() {return `Click thing number<br> ${player.thingy}
          `},
        onClick() {player.thingy += 1},
        canClick() {return true},
        style() {return {
          "width": "100px",
          "height": "40px",
          }},  
        unlocked() {return player.dL.tab == "Unrelated"}
      },

        //alert("bunga")

    },  





      tooltip: `<h5>Extras, Credits, Lore and Info</h5>`,
    layerShown(){return true}
})


/*

Note that the key difference between a Queued upgrade and the 
Quest upgrade is the following:

Queued Upgrades require strategies to obtain, While Quest upgrades forces the player to live in a certain condition 
Basically:
Queued: self-inflicted challenges
Quest: self-conditional challenges

*/