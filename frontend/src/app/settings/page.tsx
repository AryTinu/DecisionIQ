
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function FeaturePage() {
  return (
    <section className="diq-overview">
      <div className="diq-page-heading">
        <div>
          <p className="diq-page-eyebrow">DECISIONIQ WORKSPACE</p>
          <h1>Feature coming soon</h1>
          <p className="diq-page-description">
            This section is ready for its feature-specific implementation.
          </p>
        </div>
      </div>

      <div className="diq-panel" style={{ padding: 32, textAlign: "center" }}>
        <Construction
          size={34}
          style={{ margin: "0 auto 16px", color: "#2c5b86" }}
        />
        <h2 style={{ margin: 0, fontSize: 20 }}>Work in progress</h2>
        <p style={{ color: "#718096", lineHeight: 1.7 }}>
          The page layout will be developed when this feature is implemented.
        </p>
        <Link
          href="/dashboard"
          className="diq-button"
          style={{ padding: "12px 17px", marginTop: 12 }}
        >
          <ArrowLeft size={16} /> Back to Overview
        </Link>
      </div>
    </section>
  );
}
