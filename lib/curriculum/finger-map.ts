export const FINGER_MAP: Readonly<Record<string, string>> = {
  q: "left pinky", a: "left pinky", z: "left pinky", "1": "left pinky",
  w: "left ring", s: "left ring", x: "left ring", "2": "left ring",
  e: "left middle", d: "left middle", c: "left middle", "3": "left middle",
  r: "left index", f: "left index", v: "left index", t: "left index", g: "left index", b: "left index", "4": "left index", "5": "left index",
  y: "right index", h: "right index", n: "right index", u: "right index", j: "right index", m: "right index", "6": "right index", "7": "right index",
  i: "right middle", k: "right middle", ",": "right middle", "8": "right middle",
  o: "right ring", l: "right ring", ".": "right ring", "9": "right ring",
  p: "right pinky", ";": "right pinky", "/": "right pinky", "0": "right pinky", "-": "right pinky", "=": "right pinky", "+": "right pinky",
  " ": "thumb",
  "'": "right pinky", '"': "right pinky", ":": "right pinky", "?": "right pinky", "!": "left pinky",
  "$": "left index", "%": "left index", "&": "right index", "(": "right ring", ")": "right pinky",
};

export function getFingerForCharacter(character: string) {
  return FINGER_MAP[character.toLowerCase()] ?? null;
}

export function getFingerAssignments(keys: string[]) {
  return Object.fromEntries(keys.map((key) => [key, getFingerForCharacter(key) ?? "standard keyboard technique"]));
}
