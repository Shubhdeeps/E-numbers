enum StatusAndValue {
  "true" = "check",
  "false" = "cross",
  "undefined" = "neutral",
}
export function additiveStatusAndValue(state?: boolean) {
  const _stateStr = String(state) as "true" | "false" | "undefined";
  return StatusAndValue[_stateStr];
}
