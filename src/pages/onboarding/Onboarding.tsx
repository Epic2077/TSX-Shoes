import { useState } from "react";
import Loading from "../../modules/loading/Loading";
import WelcomePage from "../../modules/welcome/Welcome";
import Boarding from "../../modules/boarding/Boarding";

const Onboarding = () => {
  const [page, setPage] = useState(0);

  return (
    <>
      {page === 0 && <Loading setPage={setPage} />}
      {page === 1 && <WelcomePage setPage={setPage} />}
      {page === 2 && <Boarding setPage={setPage} />}
    </>
  );
};
export default Onboarding;
