AE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2]
BSBE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2]
CE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2]
CHE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2]
CSE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 2, 2]
EE = [0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 2, 2, 2]
MSE = [0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2]
ME = [0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2]
CHM = [2, 0, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
ECO = [2, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2]
ES = [2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2]
MTH = [2, 0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2]
PHY = [2, 0, 2, 2, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 2]
CGS = [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2]
DES = [2, 2, 2, 2, 2, 0, 2, 0, 2, 0, 2, 2, 2, 2, 2]
EEM = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2]
IME = [2, 2, 0, 2, 2, 2, 0, 2, 0, 0, 2, 2, 2, 2, 2]
MSP = [2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
NET = [2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2]
PSE = [2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2]
Stats = [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2]
HSS = [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2]
Mathematics = [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2]
SSE = [2, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2]

programExpanded = [
  "BT",
  "BS",
  "MT",
  "DoubleMajor",
  "DualA",
  "DualB",
  "DualC",
  "MDes",
  "MBA",
  "PhD",
  "MSc",
  "MSR",
]

Branches = [
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
  "SSE",
]
Branchesi = [
  AE,
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
  SSE,
]
idx = 1
master=dict()
reversemap = dict()
for (ii,branchi) in enumerate(Branchesi):
    d = dict()
    for (index, program) in enumerate(programExpanded):
        if branchi[index] == 2:
            d[program] = -1
        else:
            d[program] = idx
            reversemap[idx] = program + "-" + Branches[ii]
            idx += 1
    master[Branches[ii]] = d


print(master)
print(reversemap)
