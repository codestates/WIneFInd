import axios from "axios";
import router, { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";

const details = () => {
  const router = useRouter();
  const { articleId } = router.query;
  //article ID로 디비에서 찾아서 ? or 앞에데이터 데리고..?
  return <div> articleId:{articleId}</div>;
};

export default details;
