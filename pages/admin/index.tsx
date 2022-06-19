import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push("admin/rc");
  }, [router]);
  return <div />;
}

export default Index;
