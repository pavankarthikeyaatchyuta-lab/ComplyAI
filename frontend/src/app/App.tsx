import { useEffect, useState } from "react";
import { LandingPage } from "../pages/LandingPage";
import { ComplianceReportPage } from "../pages/ComplianceReportPage";
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
    return <UploadPage />;
  }

  if (route === "#/workflow") {
    return <WorkflowDashboardPage />;
  }

  if (route === "#/report") {
    return <ComplianceReportPage />;
  }

  return <LandingPage />;
}
