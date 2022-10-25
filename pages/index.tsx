import { useRouter } from "next/router";
import React, { useEffect } from "react";

import whoami from "@callbacks/auth/whoami";
import useStore from "store/store";

function Index() {
  const router = useRouter();
  const { token, setToken } = useStore();
  useEffect(() => {
    const checklogin = async () => {
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await whoami.get(token);
      switch (res.role_id) {
        case 1:
          router.push("/student");
          break;
        case 2:
          router.push("/company");
          break;
        case 100:
          router.push("/admin");
          break;
        case 101:
          router.push("/admin");
          break;
        case 102:
          router.push("/admin");
          break;
        case 103:
          router.push("/admin");
          break;
        default:
          setToken("");
          router.push("/login");
      }
    };
    if (router.isReady) checklogin();
  }, [router, setToken, token, router.isReady]);

  return <div />;
}

export default Index;
