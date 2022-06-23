import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Meta from "@components/Meta";

function RecruitmentPortal() {
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) router.push("student/rc");
  }, [router, router.isReady]);

  return (
    <div>
      <Meta title="Student Dashboard" />
    </div>
  );
}

RecruitmentPortal.layout = "studentDashboard";
export default RecruitmentPortal;
