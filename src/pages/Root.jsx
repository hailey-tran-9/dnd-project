import { Outlet } from "react-router-dom";

import ClassContextProvider from "../components/contexts/ClassContext";
import RaceContextProvider from "../components/contexts/RaceContext";
import SkillContextProvider from "../components/contexts/SkillContext";
import AbilityScoreContextProvider from "../components/contexts/AbilityScoreContext.jsx";
import Navbar from "../components/Navbar.jsx";

function RootLayout() {
  return (
    <>
      <AbilityScoreContextProvider>
        <ClassContextProvider>
          <RaceContextProvider>
            <SkillContextProvider>
              <Navbar />
              <Outlet />
            </SkillContextProvider>
          </RaceContextProvider>
        </ClassContextProvider>
      </AbilityScoreContextProvider>
    </>
  );
}

export default RootLayout;
