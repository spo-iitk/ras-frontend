import whoami, { WhoamiResponse } from "@callbacks/auth/whoami";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Index() {
  const router = useRouter();
  useEffect(() => {
    const checklogin = async () => {
      const token = sessionStorage.getItem("token");
      if (token === null) {
        router.push("/login");
        return;
      }

      const res = await whoami.get(token).catch(() => {
        router.push("/login");
        sessionStorage.removeItem("token");
        return { user_id: "", role_id: 0 } as WhoamiResponse;
      });

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
        default:
          router.push("/login");
      }
    };
    checklogin();
  }, [router]);

  return <div />;
}

export default Index;
