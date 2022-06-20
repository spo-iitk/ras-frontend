export const program = [
  "BT/BS/Double Major",
  "MT/MS / MSc (Research)",
  "Dual",
  "MDes",
  "MBA",
  "PhD",
];

export const Branches = [
  "AE",
  "BSBE",
  "CE",
  "CHE",
  "CSE",
  "EE",
  "MSE",
  "ME",
  "CHM",
  "ECO",
  "ES",
  "MTH",
  "PHY",
  "CGS",
  "DES",
  "EEM",
  "IME",
  "MSP",
  "NET",
  "PSE",
  "Stats",
  "HSS",
  "Mathematics",
  "SustainableEnergy",
];

export const programExpanded = [
  "BT",
  "BS",
  "MT",
  "Double Major",
  "Dual A",
  "Dual B",
  "Dual C",
  "MDes",
  "MBA",
  "PhD",
  "MSc",
  "MSR",
  "none",
  "none",
  "none",
];

const AE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2];
const BSBE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2];
const CE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2];
const CHE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2];
const CSE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2];
const EE = [0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 2, 2, 2];
const MSE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2];
const ME = [0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2];
const CHM = [2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
const ECO = [2, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2];
const ES = [2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2];
const MTH = [2, 0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2];
const PHY = [2, 0, 2, 2, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2];
const CGS = [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2];
const DES = [2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2];
const EEM = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2];
const IME = [2, 2, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2];
const MSP = [2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
const NET = [2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2];
const PSE = [2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2];
const Stats = [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2];
const HSS = [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2];
const Mathematics = [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2];
const SustainableEnergy = [2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2];
const arr25 = Array(15).fill(2);
const arr26 = Array(15).fill(2);
const arr27 = Array(15).fill(2);
const arr28 = Array(15).fill(2);
const arr29 = Array(15).fill(2);
const arr30 = Array(15).fill(2);

export const matrix = AE.concat(
  BSBE,
  CE,
  CHE,
  CSE,
  EE,
  MSE,
  ME,
  CHM,
  ECO,
  ES,
  MTH,
  PHY,
  CGS,
  DES,
  EEM,
  IME,
  MSP,
  NET,
  PSE,
  Stats,
  HSS,
  Mathematics,
  SustainableEnergy,
  arr25,
  arr26,
  arr27,
  arr28,
  arr29,
  arr30
);

export default { programExpanded, Branches, program, matrix };
