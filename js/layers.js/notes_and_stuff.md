
{if upgrade 11 isnt found return early game} ["The adventure begins..."]
    [checks if got any unlocked content from shifting]   

        {if it dosent, return early shifting message} ["the ground starts moving erratically..."]

        {if shifting multipliers unlocked, return mid shifting message} ["the ground shakes before you..."]

        {if got all upgrades bought, return late shifting message} ["a large grey-like building towers over you..."]

    [checks if got any unlocked content from repression] 
        {if has only recursive elements, return post-repression message} ["gusts of wind blows in your direction..."]
        {if it dosent, return early shifting message}
        {if has one upgrade bought, return first upgrades} ["it has begun..."]

        {if has two upgrades bought, return Tier 2 unlock} ["something falls from your two eyes"]

        {if four upgrades bought, return Tier 3 unlock} ["They are watching you as you come closer to it..."]

        {if in challenge, return in challenge statement} ["A great overwhelming force is pushing you back..."]

        {if received first conversion rank, return mid repression message} ["synergy flows through your veins..."]

        {if all challenges completed, return late repression message} ["you feel as if the ground is getting softer..."]
    {if none is found then return post-shifting message} ["something with immense power awaits you..."]