import { useMemo } from "react";
import { Link } from "react-router-dom";

import styles from "./index.css";

export const Related = () => {
  const links = useMemo(() => {
    return [
      ["/facebook/react", "React"],
      ["/vuejs/vue", "Vue"],
      ["/preactjs/preact", "Preact"],
      ["/sveltejs/svelte", "Svelte"],
      ["/angular/angular", "Angular"],
      ["/vercel/next.js", "Next.JS"],
    ];
  }, []);

  return (
    <div data-testid="related">
      <h3 data-testid="title">Related Links</h3>
      <ul data-testid="list" className={styles.list}>
        {links.map(([href, title]) => (
          <li key={href}>
            <Link data-testid="link" to={href}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
