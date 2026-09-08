import { lazy, Suspense } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
import { LoadingProvider } from "./context/LoadingProvider";

import ErrorBoundary from "./components/ErrorBoundary";

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <ErrorBoundary>
              <Suspense>
                <CharacterModel />
              </Suspense>
            </ErrorBoundary>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
