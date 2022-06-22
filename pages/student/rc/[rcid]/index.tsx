import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Index() {
  const router = useRouter();
  const { rcid } = router.query;
  useEffect(() => {
    if (rcid === "" || rcid === undefined) return;
    router.push(`/student/rc/${rcid}/notices`);
  }, [router, rcid]);
  return <div />;
}

export default Index;
