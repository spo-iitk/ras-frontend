import React from "react";
import CompanyStepper from "@components/Stepper/companyStepper";

function companyStep() {
  return (
    <div className="container">
      <CompanyStepper />
    </div>
  );
}

companyStep.layout = "studentPhaseDashboard";
export default companyStep;
