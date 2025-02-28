export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function calculateAbilityModifier(value) {
  return Math.floor((value - 10) / 2);
}