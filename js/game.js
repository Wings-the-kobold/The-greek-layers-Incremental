var player;
var needCanvasUpdate = true;

// Don't change this
const TMT_VERSION = {
  tmtNum: "2.6.6.2",
  tmtName: "Fixed Reality",
};

function getResetGain(layer, useType = null) {
  let type = useType;
  if (!useType) {
    type = tmp[layer].type;
    if (layers[layer].getResetGain !== undefined)
      return layers[layer].getResetGain();
  }
  if (tmp[layer].type == "none") return new Decimal(0);
  if (tmp[layer].gainExp.eq(0)) return decimalZero;
  if (type == "static") {
    if (!tmp[layer].canBuyMax || tmp[layer].baseAmount.lt(tmp[layer].requires))
      return decimalOne;
    let gain = tmp[layer].baseAmount
      .div(tmp[layer].requires)
      .div(tmp[layer].gainMult)
      .max(1)
      .log(tmp[layer].base)
      .times(tmp[layer].gainExp)
      .pow(Decimal.pow(tmp[layer].exponent, -1));
    gain = gain.times(tmp[layer].directMult);
    return gain.floor().sub(player[layer].points).add(1).max(1);
  } else if (type == "normal") {
    if (tmp[layer].baseAmount.lt(tmp[layer].requires)) return decimalZero;
    let gain = tmp[layer].baseAmount
      .div(tmp[layer].requires)
      .pow(tmp[layer].exponent)
      .times(tmp[layer].gainMult)
      .pow(tmp[layer].gainExp);
    if (gain.gte(tmp[layer].softcap))
      gain = gain
        .pow(tmp[layer].softcapPower)
        .times(tmp[layer].softcap.pow(decimalOne.sub(tmp[layer].softcapPower)));
    gain = gain.times(tmp[layer].directMult);
    return gain.floor().max(0);
  } else if (type == "custom") {
    return layers[layer].getResetGain();
  } else {
    return decimalZero;
  }
}

function getNextAt(layer, canMax = false, useType = null) {
  let type = useType;
  if (!useType) {
    type = tmp[layer].type;
    if (layers[layer].getNextAt !== undefined)
      return layers[layer].getNextAt(canMax);
  }
  if (tmp[layer].type == "none") return new Decimal(Infinity);

  if (tmp[layer].gainMult.lte(0)) return new Decimal(Infinity);
  if (tmp[layer].gainExp.lte(0)) return new Decimal(Infinity);

  if (type == "static") {
    if (!tmp[layer].canBuyMax) canMax = false;
    let amt = player[layer].points
      .plus(
        canMax && tmp[layer].baseAmount.gte(tmp[layer].nextAt)
          ? tmp[layer].resetGain
          : 0
      )
      .div(tmp[layer].directMult);
    let extraCost = Decimal.pow(
      tmp[layer].base,
      amt.pow(tmp[layer].exponent).div(tmp[layer].gainExp)
    ).times(tmp[layer].gainMult);
    let cost = extraCost.times(tmp[layer].requires).max(tmp[layer].requires);
    if (tmp[layer].roundUpCost) cost = cost.ceil();
    return cost;
  } else if (type == "normal") {
    let next = tmp[layer].resetGain.add(1).div(tmp[layer].directMult);
    if (next.gte(tmp[layer].softcap))
      next = next
        .div(tmp[layer].softcap.pow(decimalOne.sub(tmp[layer].softcapPower)))
        .pow(decimalOne.div(tmp[layer].softcapPower));
    next = next
      .root(tmp[layer].gainExp)
      .div(tmp[layer].gainMult)
      .root(tmp[layer].exponent)
      .times(tmp[layer].requires)
      .max(tmp[layer].requires);
    if (tmp[layer].roundUpCost) next = next.ceil();
    return next;
  } else if (type == "custom") {
    return layers[layer].getNextAt(canMax);
  } else {
    return decimalZero;
  }
}

function softcap(value, cap, power = 0.5) {
  if (value.lte(cap)) return value;
  else return value.pow(power).times(cap.pow(decimalOne.sub(power)));
}

// Return true if the layer should be highlighted. By default checks for upgrades only.
function shouldNotify(layer) {
  for (id in tmp[layer].upgrades) {
    if (isPlainObject(layers[layer].upgrades[id])) {
      if (
        canAffordUpgrade(layer, id) &&
        !hasUpgrade(layer, id) &&
        tmp[layer].upgrades[id].unlocked
      ) {
        return true;
      }
    }
  }
  if (
    player[layer].activeChallenge &&
    canCompleteChallenge(layer, player[layer].activeChallenge)
  ) {
    return true;
  }

  if (tmp[layer].shouldNotify) return true;

  if (isPlainObject(tmp[layer].tabFormat)) {
    for (subtab in tmp[layer].tabFormat) {
      if (subtabShouldNotify(layer, 'mainTabs', subtab)) {
        tmp[layer].trueGlowColor =
          tmp[layer].tabFormat[subtab].glowColor || defaultGlow;

        return true;
      }
    }
  }

  for (family in tmp[layer].microtabs) {
    for (subtab in tmp[layer].microtabs[family]) {
      if (subtabShouldNotify(layer, family, subtab)) {
        tmp[layer].trueGlowColor =
          tmp[layer].microtabs[family][subtab].glowColor;
        return true;
      }
    }
  }

  return false;
}

function canReset(layer) {
  if (layers[layer].canReset !== undefined)
    return run(layers[layer].canReset, layers[layer]);
  else if (tmp[layer].type == "normal")
    return tmp[layer].baseAmount.gte(tmp[layer].requires);
  else if (tmp[layer].type == "static")
    return tmp[layer].baseAmount.gte(tmp[layer].nextAt);
  else return false;
}

function rowReset(row, layer) {
  //here is i found what resets the layers
  for (lr in ROW_LAYERS[row]) {
    if (layers[lr].doReset) {
      if (!isNaN(row)) Vue.set(player[lr], "activeChallenge", null); // Exit challenges on any row reset on an equal or higher row
      run(layers[lr].doReset, layers[lr], layer);
    } else if (tmp[layer].row > tmp[lr].row && !isNaN(row)) layerDataReset(lr);
  }
}

function layerDataReset(layer, keep = []) {
  let storedData = {
    unlocked: player[layer].unlocked,
    forceTooltip: player[layer].forceTooltip,
    noRespecConfirm: player[layer].noRespecConfirm,
    prevTab: player[layer].prevTab,
  }; // Always keep these

  for (thing in keep) {
    if (player[layer][keep[thing]] !== undefined)
      storedData[keep[thing]] = player[layer][keep[thing]];
  }

  Vue.set(player[layer], "buyables", getStartBuyables(layer));
  Vue.set(player[layer], "clickables", getStartClickables(layer));
  Vue.set(player[layer], "challenges", getStartChallenges(layer));
  Vue.set(player[layer], "grid", getStartGrid(layer));

  layOver(player[layer], getStartLayerData(layer));
  player[layer].upgrades = [];
  player[layer].milestones = [];
  player[layer].achievements = [];

  for (thing in storedData) {
    player[layer][thing] = storedData[thing];
  }
}

function addPoints(layer, gain) {
  player[layer].points = player[layer].points.add(gain).max(0);
  if (player[layer].best)
    player[layer].best = player[layer].best.max(player[layer].points);
  if (player[layer].total) player[layer].total = player[layer].total.add(gain);
}

function generatePoints(layer, diff) {
  addPoints(layer, tmp[layer].resetGain.times(diff));
}
// run(layers["GL"].onPrestige, layers["GL"], gainh)
function doReset(layer, force = false) {
  if (tmp[layer].type == "none") return;
  let row = tmp[layer].row;
  if (!force) {
    if (tmp[layer].canReset === false) return;

    if (tmp[layer].baseAmount.lt(tmp[layer].requires)) return;
    let gain = tmp[layer].resetGain;
    if (tmp[layer].type == "static") {
      if (tmp[layer].baseAmount.lt(tmp[layer].nextAt)) return;
      gain = tmp[layer].canBuyMax ? gain : 1;
    }

    if (layers[layer].onPrestige)
      run(layers[layer].onPrestige, layers[layer], gain);

    addPoints(layer, gain);
    updateMilestones(layer);
    updateAchievements(layer);

    if (!player[layer].unlocked) {
      player[layer].unlocked = true;
      needCanvasUpdate = true;

      if (tmp[layer].increaseUnlockOrder) {
        lrs = tmp[layer].increaseUnlockOrder;
        for (lr in lrs)
          if (!player[lrs[lr]].unlocked) player[lrs[lr]].unlockOrder++;
      }
    }
  }

  if (run(layers[layer].resetsNothing, layers[layer])) return;
  tmp[layer].baseAmount = decimalZero; // quick fix

  for (layerResetting in layers) {
    if (
      row >= layers[layerResetting].row &&
      (!force || layerResetting != layer)
    )
      completeChallenge(layerResetting);
  }

  player.points = row == 0 ? decimalZero : getStartPoints();

  for (let x = row; x >= 0; x--) rowReset(x, layer);
  for (r in OTHER_LAYERS) {
    rowReset(r, layer);
  }

  player[layer].resetTime = 0;

  updateTemp();
} //EW

function resetRow(row) {
  //if (prompt('Are you sure you want to reset this row? It is highly recommended that you wait until the end of your current run before doing this! Type "I WANT TO RESET THIS" to confirm')!="I WANT TO RESET THIS") return
  let pre_layers = ROW_LAYERS[row - 1];
  let layers = ROW_LAYERS[row];
  let post_layers = ROW_LAYERS[row + 1];
  rowReset(row + 1, post_layers[0]);
  doReset(pre_layers[0], true);
  for (let layer in layers) {
    player[layer].unlocked = false;
    if (player[layer].unlockOrder) player[layer].unlockOrder = 0;
  }
  player.points = getStartPoints();
  updateTemp();
  resizeCanvas();
}

function startChallenge(layer, x) {
  let enter = false;
  if (!player[layer].unlocked || !tmp[layer].challenges[x].unlocked) return;
  if (player[layer].activeChallenge == x) {
    completeChallenge(layer, x);
    Vue.set(player[layer], "activeChallenge", null);
  } else {
    enter = true;
  }
  doReset(layer, true);
  if (enter) {
    Vue.set(player[layer], "activeChallenge", x);
    run(layers[layer].challenges[x].onEnter, layers[layer].challenges[x]);
  }
  updateChallengeTemp(layer);
} //EW

function canCompleteChallenge(layer, x) {
  if (x != player[layer].activeChallenge) return;
  let challenge = tmp[layer].challenges[x];
  if (challenge.canComplete !== undefined) return challenge.canComplete;

  if (challenge.currencyInternalName) {
    let name = challenge.currencyInternalName;
    if (challenge.currencyLocation) {
      return !challenge.currencyLocation[name].lt(challenge.goal);
    } else if (challenge.currencyLayer) {
      let lr = challenge.currencyLayer;
      return !player[lr][name].lt(challenge.goal);
    } else {
      return !player[name].lt(challenge.goal);
    }
  } else {
    return !player.points.lt(challenge.goal);
  }
} //YUCK

function completeChallenge(layer, x) {
  var x = player[layer].activeChallenge;
  if (!x) return;

  let completions = canCompleteChallenge(layer, x);
  if (!completions) {
    Vue.set(player[layer], "activeChallenge", null);
    run(layers[layer].challenges[x].onExit, layers[layer].challenges[x]);
    return;
  }
  if (player[layer].challenges[x] < tmp[layer].challenges[x].completionLimit) {
    needCanvasUpdate = true;
    player[layer].challenges[x] += completions;
    player[layer].challenges[x] = Math.min(
      player[layer].challenges[x],
      tmp[layer].challenges[x].completionLimit
    );
    if (layers[layer].challenges[x].onComplete)
      run(layers[layer].challenges[x].onComplete, layers[layer].challenges[x]);
  }
  Vue.set(player[layer], "activeChallenge", null);
  run(layers[layer].challenges[x].onExit, layers[layer].challenges[x]);
  updateChallengeTemp(layer);
}

VERSION.withoutName =
  "v" +
  VERSION.num +
  (VERSION.pre
    ? " Pre-Release " + VERSION.pre
    : VERSION.pre
    ? " Beta " + VERSION.beta
    : "");
VERSION.withName =
  VERSION.withoutName + (VERSION.name ? ": " + VERSION.name : "");

function autobuyUpgrades(layer) {
  if (!tmp[layer].upgrades) return;
  for (id in tmp[layer].upgrades)
    if (
      isPlainObject(tmp[layer].upgrades[id]) &&
      (layers[layer].upgrades[id].canAfford === undefined ||
        layers[layer].upgrades[id].canAfford() === true)
    )
      buyUpg(layer, id);
}

function gameLoop(diff) {
  if (isEndgame() || tmp.gameEnded) {
    tmp.gameEnded = true;
    clearParticles();
  }

  if (isNaN(diff) || diff < 0) diff = 0;
  if (tmp.gameEnded && !player.keepGoing) {
    diff = 0;
    //player.tab = "tmp.gameEnded"
    clearParticles();
  }

  if (maxTickLength) {
    let limit = maxTickLength();
    if (diff > limit) diff = limit;
  }
  if (!player.gameEnd || player.startedGame) addTime(diff);
  player.points = player.points.add(tmp.pointGen.times(diff)).max(0);

  for (let x = 0; x <= maxRow; x++) {
    for (item in TREE_LAYERS[x]) {
      let layer = TREE_LAYERS[x][item];
      player[layer].resetTime += diff;
      if (tmp[layer].passiveGeneration)
        generatePoints(layer, diff * tmp[layer].passiveGeneration);
      if (layers[layer].update) layers[layer].update(diff);
    }
  }

  for (row in OTHER_LAYERS) {
    for (item in OTHER_LAYERS[row]) {
      let layer = OTHER_LAYERS[row][item];
      player[layer].resetTime += diff;
      if (tmp[layer].passiveGeneration)
        generatePoints(layer, diff * tmp[layer].passiveGeneration);
      if (layers[layer].update) layers[layer].update(diff);
    }
  }

  for (let x = maxRow; x >= 0; x--) {
    for (item in TREE_LAYERS[x]) {
      let layer = TREE_LAYERS[x][item];
      if (tmp[layer].autoPrestige && tmp[layer].canReset) doReset(layer);
      if (layers[layer].automate) layers[layer].automate();
      if (tmp[layer].autoUpgrade) autobuyUpgrades(layer);
    }
  }

  for (row in OTHER_LAYERS) {
    for (item in OTHER_LAYERS[row]) {
      let layer = OTHER_LAYERS[row][item];
      if (tmp[layer].autoPrestige && tmp[layer].canReset) doReset(layer);
      if (layers[layer].automate) layers[layer].automate();
      player[layer].best = player[layer].best.max(player[layer].points);
      if (tmp[layer].autoUpgrade) autobuyUpgrades(layer);
    }
  }

  for (layer in layers) {
    if (layers[layer].milestones) updateMilestones(layer);
    if (layers[layer].achievements) updateAchievements(layer);
  }
}

function hardReset(resetOptions) {
  if (
    !confirm(
      "Are you sure you want to do this? You will lose all your progress!"
    )
  )
    return;
  player = null;
  if (resetOptions) options = null;
  save(true);
  window.location.reload();
}

var ticking = false;

var interval = setInterval(function () {
  if (player === undefined || tmp === undefined) return;
  if (ticking) return;
  if (tmp.gameEnded && !player.keepGoing) return;
  ticking = true;

  let now = Date.now();
  let diff = (now - player.time) / 1e3;
  let trueDiff = diff;
  if (player.offTime !== undefined) {
    if (player.offTime.remain > modInfo.offlineLimit * 3600)
      player.offTime.remain = modInfo.offlineLimit * 3600;
    if (player.offTime.remain > 0) {
      let offlineDiff = Math.max(player.offTime.remain / 10, diff);
      player.offTime.remain -= offlineDiff;
      diff += offlineDiff;
    }
    if (!options.offlineProd || player.offTime.remain <= 0)
      player.offTime = undefined;
  }
  if (player.devSpeed) diff *= player.devSpeed;
  player.time = now;

  if (needCanvasUpdate) {
    resizeCanvas();
    needCanvasUpdate = false;
  }

  tmp.scrolled =
    document.getElementById('treeTab') &&
    document.getElementById('treeTab').scrollTop > 30;
  updateTemp();
  updateOomps(diff);
  updateWidth();
  updateTabFormats();
  gameLoop();
  fixNaNs();
  adjustPopupTime(trueDiff);
  updateParticles(trueDiff);
  resizeCanvas();
  ticking = false;
}, 80);

setInterval(function () {
  needCanvasUpdate = true;
}, 1);

//ALL CUSTOM FUNCTIONS ARE HERE

//Layer Resets
function layer1Reset(keepUpgrades = false, type = "Any") {
  let resetPoints = 0;
  if (player.C.EffectorTier.gte(5)) {
    resetPoints = 1;
  } else if (player.C.EffectorTier.gte(4) || keepUpgrades == true) {
    player.S.upgrades = [11, 12, 13, 14];
  } else if (player.C.EffectorTier.gte(3)) {
    player.S.upgrades = [11, 12, 13];
  } else if (player.C.EffectorTier.gte(2)) {
    player.S.upgrades = [11, 12];
  } else if (player.C.EffectorTier.gte(1)) {
    player.S.upgrades = [11];
  } else {
    player.S.upgrades = [];
  }

  player["S"].points = decimalOne;

  player["GL"].Solarlight = new Decimal(0);
  player.points = player.points.mul(0); //player.points = new Decimal(0)

  if (player.Sol.TRMoon.x.gte(1) && type == "C") {
    return;
  } else if (player.Sol.TMSun.x.gte(1) && type == "SL") {
    return;
  } else {
    setBuyableAmount("S", 11, new Decimal(0));
    setBuyableAmount("S", 12, new Decimal(0));
  }
}

function layer2Reset(force = false) {
  player.C.EffectorTier = new Decimal(0);
  player.GL.Solar_Shards = new Decimal(0);

  if (!player.E.EclipseTier.gte(3) || force) player["C"].hasFormality = false;
  if (!player.E.EclipseTier.gte(4) || force) player["C"].hasHeirarchy = false;
  if (!player.E.EclipseTier.gte(5) || force) player["C"].hasTwilight = false;

  player.C.CenterPoints = new Decimal(0);
  player.C.Highest = new Decimal(0);
  player.C.Score = new Decimal(0);

  player.C.upgrades = [];
  player.GL.upgrades = [];

  setBuyableAmount("GL", 11, new Decimal(0));

  layer1Reset(false, "Default");
}
//

function exitGeneration() {
  const currentState = getClickableState("GL", 11);
  if (currentState == true) setClickableState("GL", 11, false);
}

function EclipsiumReset(Queuereset = false) {
  player.C.EffectorTier = new Decimal(0);
  player.GL.Solar_Shards = player.GL.Solar_Shards.root(3).floor();

  player.C.CenterPoints = player.C.CenterPoints.root(3);
  setBuyableAmount("GL", 11, getBuyableAmount("GL", 11).root(2).floor());
  player.GL.upgrades = [];
  player.C.upgrades = [];
  player.C.Highest = player.C.Highest.mul(0);
  player.C.Score = player.C.Score.mul(0);

  if (!player.E.EclipseTier.gte(3)) player["C"].hasFormality = false;
  if (!player.E.EclipseTier.gte(4)) player["C"].hasHeirarchy = false;
  if (!player.E.EclipseTier.gte(5)) player["C"].hasTwilight = false;

  exitGeneration();

  if (Queuereset == true) {
    player.C.checkUpgrades = new Decimal(0);
    player["C"].hasFormality = false;
    player["C"].hasHeirarchy = false;
    player["C"].hasTwilight = false;
  }
  layer1Reset(player.Sol["TBSun"].x.gte(1));
}

function ReplicEffect(offset) {
  let replic = player.Sol.MNG.Replic;
  let increment = 0.001;

  let base = (replic + offset) * increment;

  // let formula = base > 0.2 ? 0.2 + (replic - 200) * increment/2 : 1

  const cSoftcap = {
    Defective: increment / 2,
    Redundant: increment / 4,

    DefVal: 0.2 + ((replic + offset - 200) * increment) / 2,
    RedVal: 0.4 + ((replic + offset - 400) * increment) / 4,
  };

  if (cSoftcap.RedVal > 0.6) base = 0.6;
  else if (cSoftcap.DefRed > 0.4)
    base = 0.4 + (replic + offset - 400) * cSoftcap.Redundant;
  else if (base > 0.2)
    base = 0.2 + (replic + offset - 200) * cSoftcap.Defective;
  else return base;
}

function getBaseCheckGen(type) {
  let BaseLightIncrement = player.L.LightCheck.pow_base(10);
  if (player.L.UnwantedChromia.gt(1))
    BaseLightIncrement = BaseLightIncrement.div(
      player.L.UnwantedChromia.root(10)
    ).clampMin(1);
  if (player.E.EclipseTier.gte(6))
    BaseLightIncrement = BaseLightIncrement.pow(1.25);
  if (BSolStones(1).unlocked)
    BaseLightIncrement = BaseLightIncrement.mul(BSolStones(1).effect);

  let BaseDarkIncrement = player.L.DarkCheck.pow_base(10);
  if (player.L.UnwantedChromia.gt(1))
    BaseDarkIncrement = BaseDarkIncrement.div(
      player.L.UnwantedChromia.root(10)
    ).clampMin(1);
  if (player.E.EclipseTier.gte(6))
    BaseDarkIncrement = BaseDarkIncrement.pow(1.25);
  if (BSolStones(1).unlocked)
    BaseDarkIncrement = BaseDarkIncrement.mul(BSolStones(1).effect);

  let ReplicBonuses = [
    player.L.Light.gte(1) ? player.L.Light.pow(ReplicEffect(0)) : 1,
    player.L.Dark.gte(1) ? player.L.Dark.pow(ReplicEffect(0)) : 1,
  ];

  if (type == "Light") return BaseLightIncrement.mul(ReplicBonuses[0]);
  else if (type == "Dark") return BaseDarkIncrement.mul(ReplicBonuses[1]);
  else alert("Incorrect Gen type input");
}

//create a custom softcap
/* add any custom softcap formula below */
//yeah i might not use this
function cSoftcap(val, start = [], nerf = [], format = false) {
  const makeNew = {};

  makeNew.Start = {};
  makeNew.Nerfs = {};
  var effect = new Decimal(val);
  {
    //makes sure the below works and provides missing code feedback
    {
      //checks for missing paramaters
      if (val == undefined) throw new Error("Missing input 'val'");
      if (start == undefined || start.length == undefined)
        throw new Error("Missing starting nerfs, or the input isn't a list");
      if (nerf == undefined || nerf.length == undefined)
        throw new Error("Missing nerf formulas, or the input isn't a list");
      if (format !== Boolean && !format == undefined)
        throw new Error("format paramater must be a Boolean");
    }
    {
      //fixes both arrays if irregular
      if (!nerf.length >= start.length) nerf.pop();
      else if (!start.length >= nerf.length) start.pop();
    }
  }
  {
    //automatically assigns Decimals
    for (item in start)
      if (start[item] instanceof Decimal) makeNew.Start[item] = start[item];
      else makeNew.Start[item] = new Decimal(start[item]);
    console.warn("note: " + start[item] + " is not assigned to a Decimal");
    for (item in nerf)
      if (nerf[item] instanceof Decimal) makeNew.Nerfs[item] = nerf[item];
      else makeNew.Nerfs[item] = new Decimal(nerf[item]);
    console.warn("note: " + nerf[item] + " is not assigned to a Decimal");
  }

  //does the softcap stuffs based on it's starting position, THEN scales.
  for (item in makeNew.Start)
    makeNew.Start[item].gt(effect)
      ? (effect = makeNew.Start[item].plus(
          effect.sub(makeNew.Start[item]).times(makeNew.Nerfs[item])
        ))
      : 0;

  return format ? effect.toNumber() : effect;
}

// cSoftcap(20,[10,40],[0.5,0.3])

function start() {
  player.rot = 0;
  player.frames = 0;
  if (player.cutsceneName == "") player.cutsceneName = "gameStart"; //; else player.cutsceneName = ""
}

function end() {
  player.rot = 90;
  player.frames = 0;
  if (player.cutsceneName == "") player.cutsceneName = "gameEnd"; //; else player.cutsceneName = "";
  player.finalTime = player.timePlayed;
  //	tmp.gameEnded = !tmp.gameEnded
}

document.title = "Loading Content...";

if (Error) document.title = "Cannot Load Content.";

function getSRCap() {
  let baseSRCap = new Decimal(1e15);
  if (hasUpgrade("Sol", 12) && getClickableState("L", 42))
    baseSRCap = baseSRCap.mul(player["S"].bestPointsInDark);

  return baseSRCap;
}

function GetHeirarchyBonus() {
  let base = new Decimal(5);
  if (player.Sol.CPBoost.gte(0) && !player.Sol["TRMoon"].active)
    base = base.plus(player.Sol.CPBoost); //

  //if ()

  let amnt =
    player.Sol.activeCheck == "Heliosphere"
      ? player.Sol.HelioStat["CP"].plus(player.C.FreeCP)
      : player.C.CenterPoints.plus(player.C.FreeCP);

  let effect = amnt.pow_base(base).clampMin(1);

  if (hasUpgrade("L", 11)) effect = effect.pow(1.15);

  if (player["C"].activeCheck == "Twilight")
    effect = effect.log(12).clampMin(1);

  effect = player.Sol.SolarHeat.gt(50)
    ? effect.mul(player.Sol.SolarHeat.sub(50).pow_base(1.02))
    : effect;

  if (player["C"].hasHeirarchy && !player.Sol["TRMoon"].active) return effect;
  else return new Decimal(1);
}
