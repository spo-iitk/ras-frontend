import { func, programType, rev } from "@components/Utils/matrixUtils";

export const getProgram = (id: number) => {
  if (id === 200 || id === 0) return "NA";
  return rev[id as keyof typeof rev]?.split("-")[0];
};

export const getDepartment = (id: number) => {
  if (id === 200 || id === 0) return "NA";
  return rev[id as keyof typeof rev]?.split("-")[1];
};

export const getDeptProgram = (id: number) => {
  if (id === 200 || id === 0) return "NA";
  return rev[id as keyof typeof rev];
};

export const getId = (program: string, department: string) => {
  if (
    program === "NA" ||
    department === "NA" ||
    program === undefined ||
    department === undefined
  )
    return 200;

  if (program === "" || department === "") return 0;
  return func[department as keyof typeof func][program as keyof programType];
};
