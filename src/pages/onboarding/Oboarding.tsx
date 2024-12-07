import { useState } from "react";
import Loading from "../../components/loading/Loading";
import WelcomePage from "../../components/welcome/Welcome";

const Onboarding = () => {
  const [page, setPage] = useState(1);

  return (
    <>
      {page === 0 && <Loading setPage={setPage} />}
      {page === 1 && <WelcomePage setPage={setPage} />}
    </>
  );
};
export default Onboarding;
