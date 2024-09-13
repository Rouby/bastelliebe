import { useEffect, useState } from "react";
import Styles from "./ComplianceBanner.module.css";

export default function ComplianceBanner() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(localStorage.getItem("cookieConsent") !== null ? false : true);
  }, []);

  if (!shown) return null;

  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <strong>Diese Website nutzt Cookies</strong>
        <p>
          Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren,
          Funktionen für soziale Medien anbieten zu können und die Zugriffe auf
          unsere Website zu analysieren. Außerdem geben wir Informationen zu
          Ihrer Verwendung unserer Website an unsere Partner für soziale Medien,
          Werbung und Analysen weiter. Unsere Partner führen diese Informationen
          möglicherweise mit weiteren Daten zusammen, die Sie ihnen
          bereitgestellt haben oder die sie im Rahmen Ihrer Nutzung der Dienste
          gesammelt haben.
        </p>
        <div className={Styles.buttons}>
          <button
            onClick={() => {
              window.consentGranted?.();
              setShown(false);
            }}
          >
            Zulassen
          </button>
          <button
            className={Styles.secondary}
            onClick={() => {
              localStorage.setItem("cookieConsent", "none");
              setShown(false);
            }}
          >
            Ablehnen
          </button>
        </div>
      </div>
    </div>
  );
}
