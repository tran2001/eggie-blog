import { Router, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import { router } from "./router";

function App() {
  const darkState = useSelector((state: RootState) => state.darkState.value);
  return (
    <div className={darkState ? "tw-dark" : ""}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
