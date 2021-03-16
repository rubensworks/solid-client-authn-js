import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

import {
  login,
  logout,
  handleIncomingRedirect,
  fetch,
  getDefaultSession,
} from "../../../../dist/index";

const REDIRECT_URL = "http://demo.zwifi.eu/";

export default function Home() {
  const [webId, setWebId] = useState(getDefaultSession().info.webId);
  const [issuer, setIssuer] = useState("https://broker.pod.inrupt.com/");
  const [resource, setResource] = useState(webId);
  const [data, setData] = useState(null);

  // The useEffect hook is executed on page load, and in particular when the user
  // is redirected to the page after logging in the identity provider.
  useEffect(() => {
    // After redirect, the current URL contains login information.
    handleIncomingRedirect({
      restorePreviousSession: true,
    }).then((info) => {
      setWebId(info.webId);
      setResource(webId);
    });
  }, [webId]);

  const handleLogin = (e) => {
    // The default behaviour of the button is to resubmit.
    // This prevents the page from reloading.
    e.preventDefault();
    // Login will redirect the user away so that they can log in the OIDC issuer,
    // and back to the provided redirect URL (which should be controlled by your app).
    login({
      redirectUrl: REDIRECT_URL,
      oidcIssuer: issuer,
      clientName: "Demo app",
      clientId: "http://demo.zwifi.eu/app-info.ttl#webid",
    });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    // The following has no impact on the logout, it just resets the UI.
    setWebId(undefined);
    setData("");
    setResource("");
  };

  const handleFetch = (e) => {
    e.preventDefault();
    fetch(resource)
      .then((response) => response.text())
      .then(setData);
  };

  return (
    <div className={styles.container}>
      <main>
        <h1>Sandbox app</h1>
        <p>{webId ? `Logged in as ${webId}` : "Not logged in yet"}</p>
        <div>
          <form>
            <input
              type="text"
              value={issuer}
              onChange={(e) => {
                setIssuer(e.target.value);
              }}
            />
            <button onClick={(e) => handleLogin(e)}>Log In</button>
            <button onClick={(e) => handleLogout(e)}>Log Out</button>
          </form>
        </div>
        <hr />
        <div>
          <input
            type="text"
            value={resource}
            onChange={(e) => {
              setResource(e.target.value);
            }}
          />
          <button onClick={(e) => handleFetch(e)}>Fetch</button>
        </div>
        <pre>{data}</pre>
      </main>
    </div>
  );
}
