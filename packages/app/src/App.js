import { lazy } from "react";
import { Route, Switch } from "react-router-dom";

import { Page } from "./components/Page";

const App = () => {
  return (
    <Page>
      <Switch>
        <Route
          exact
          path="/:username/:repository"
          component={lazy(() => import("./pages/repository"))}
        />
      </Switch>
    </Page>
  );
};

export default App;
