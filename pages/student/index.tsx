import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Meta from "@components/Meta";
import studentRequest from "@callbacks/student/student";
import useStore from "@store/store";

function RecruitmentPortal() {
  const router = useRouter();

  const { token } = useStore();
  useEffect(() => {
    const fetch = async () => {
      const student = await studentRequest.get(token);
      console.log(student);
    };
    fetch();
    router.push("student/rc");
  }, [router, token]);

  return (
    <div>
      <Meta title="Student Dashboard" />
    </div>
  );
}

RecruitmentPortal.layout = "studentDashboard";
export default RecruitmentPortal;
