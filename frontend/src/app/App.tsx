import { useEffect, useState } from "react";
import { LandingPage } from "../pages/LandingPage";
import { UploadPage } from "../pages/UploadPage";

export function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (route === "#/upload") {
    return <UploadPage />;
  }

  return <LandingPage />;
}
