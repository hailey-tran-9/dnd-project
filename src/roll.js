export function diceRoll(numDice, numSides, modifier) {
    let result = {rollStr: "(", result: 0};
    let rollStrParts = [];
    for (let i = 0; i < numDice; i++) {
        let roll = (Math.floor(Math.random() * numSides) + 1);
        rollStrParts.push(roll.toString());
        result.result += roll;
    }
    result.rollStr += rollStrParts.join(" + ") + ") + (" + modifier.toString() + ")";
    result.result += modifier;
    return result;
}

export function check(modifier) {
    let roll = diceRoll(1, 20, modifier);
    console.log("CHECK ROLL: " + roll.rollStr);
    console.log("RESULT: " + roll.result);
    return roll;
}

export function save(modifier, proficiencyBonus) {
    let roll = diceRoll(1, 20, modifier + proficiencyBonus);
    console.log("SAVE ROLL: " + roll.rollStr);
    console.log("RESULT: " + roll.result);
    return roll;
}