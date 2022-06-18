import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import studentRequest, { Student } from "@callbacks/student/student";

function RecruitmentPortal() {
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      const token = sessionStorage.getItem("token") || "";
      const student = await studentRequest.get(token).catch((err) => {
        console.log(err);
        return { ID: 0 } as Student;
      });
      if (student.ID !== 0) {
        console.log(student);
      }
    };
    fetch();
    router.push("student/rc");
  });

  return (
    <div>
      <Meta title="Student Dashboard" />
    </div>
  );
}

RecruitmentPortal.layout = "studentDashboard";
export default RecruitmentPortal;
