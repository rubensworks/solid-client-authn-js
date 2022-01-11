import React, { useState, useEffect } from "react";
import { Session as AuthSession } from "@rubensworks/solid-client-authn-browser";

const REDIRECT_URL = window.location;

export default function Home() {
  // eslint-disable-next-line
  const [session, _setSession] = useState(new AuthSession({}));
  const [issuer, setIssuer] = useState("https://broker.demo-ess.inrupt.com/");
  const [resource, setResource] = useState(session.info.webId);
  const [data, setData] = useState(null);

  useEffect(() => {
    const authCode = new URL(window.location.href).searchParams.get("code");
    if (authCode) {
      console.log("Being redirected from the IdP");
      session.handleIncomingRedirect(window.location.href).then((info) => {
        setResource(info.webId);
      });
    }
  }, [session]);

  const handleLogin = (e) => {
    // The default behaviour of the button is to resubmit.
    // This prevents the page from reloading.
    e.preventDefault();
    session.login({
      redirectUrl: REDIRECT_URL,
      oidcIssuer: issuer,
    });
  };

  const handleFetch = (e) => {
    // The default behaviour of the button is to resubmit.
    // This prevents the page from reloading.
    e.preventDefault();
    session
      .fetch(resource)
      .then((response) => response.text())
      .then(setData);
  };

  return (
    <div>
      <main>
        <h1>Sandbox app</h1>
        <p>
          {session.info.webId
            ? `Logged in as ${session.info.webId}`
            : "Not logged in yet"}{" "}
        </p>
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
