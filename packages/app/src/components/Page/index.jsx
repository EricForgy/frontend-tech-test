import { Suspense } from "react";

import * as Apollo from "../Apollo";

export const Page = ({ children }) => {
  return (
    <Suspense fallback={<h2>loading...</h2>}>
      <Apollo.Provider>{children}</Apollo.Provider>
    </Suspense>
  );
};
