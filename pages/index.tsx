import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, [router]);

  return <div />;
}

export default Index;
