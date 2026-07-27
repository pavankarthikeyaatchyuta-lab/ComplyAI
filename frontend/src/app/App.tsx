import { useEffect, useState } from "react";
import { ComplyCursor } from "../components/cursor/ComplyCursor";
import { LandingPage } from "../pages/LandingPage";
import { ComplianceReportPage } from "../pages/ComplianceReportPage";
import { DeveloperModePage } from "../pages/DeveloperModePage";
import { UploadPage } from "../pages/UploadPage";
import { WorkflowDashboardPage } from "../pages/WorkflowDashboardPage";

export function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (route === "#/upload") {
    return (
      <>
        <ComplyCursor />
        <UploadPage />
      </>
    );
  }

  if (route === "#/workflow") {
    return (
      <>
        <ComplyCursor />
        <WorkflowDashboardPage />
      </>
    );
  }

  if (route === "#/report") {
    return (
      <>
        <ComplyCursor />
        <ComplianceReportPage />
      </>
    );
  }

  if (route === "#/developer") {
    return (
      <>
        <ComplyCursor />
        <DeveloperModePage />
      </>
    );
  }

  return (
    <>
      <ComplyCursor />
      <LandingPage />
    </>
  );
}
