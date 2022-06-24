import { useRouter } from "next/router";
import React, { useEffect } from "react";

import enrollmentRequest, {
  StudentRC,
} from "@callbacks/student/rc/enrollQuestion";
import useStore from "@store/store";

function Index() {
  const router = useRouter();
  const { rcid } = router.query;
  const { token } = useStore();
  useEffect(() => {
    if (rcid === "" || rcid === undefined) return;
    const fetch = async () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const student = await enrollmentRequest
        .getStudentRC(token, rcid.toString())
        .catch(() => ({ ID: 0 } as StudentRC));
      if (student.is_verified) {
        router.push(`/student/rc/${rcid}/notices`);
      } else {
        router.push(`/student/rc/${rcid}/enroll`);
      }
    };
    fetch();
  }, [router, rcid, token]);
  return <div />;
}

export default Index;
