import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "/src/Partners.css"

const Partners = () => {
  const { t } = useTranslation();

  return (
    <div className="partners-page">
      <div className="partners-container">

        {/* Media Partners Section */}
        <section className="partners-section">
          <h1 className="section-title">{t("partners.media_title")}</h1>
          <div className="logos-grid">
            <Link to="https://360moms.net/ar" target="_blank">
              <img src="src/assets/partners/moms.png" alt={t("partners.moms_alt")} />
            </Link>
            <Link to="https://www.albiladpress.com/" target="_blank">
              <img src="src/assets/partners/albilad.png" alt={t("partners.albilad_alt")} />
            </Link>
            <Link to="https://alroya.om/" target="_blank">
              <img src="src/assets/partners/alroyaOm.png" alt={t("partners.alroya_alt")} />
            </Link>
          </div>
        </section>

        {/* Strategic Partners Section */}
        <section className="partners-section">
          <h1 className="section-title">{t("partners.strategic_title")}</h1>
          <div className="logos-grid">
            <Link to="https://www.kaaf.bh/ar" target="_blank">
              <img src="src/assets/partners/kaaf.png" alt={t("partners.kaaf_alt")} />
            </Link>
            <Link to="https://www.unido.org/" target="_blank">
              <img src="src/assets/partners/unido.png" alt={t("partners.unido_alt")} />
            </Link>
            <Link to="https://thinksmartgulf.com/" target="_blank">
              <img src="src/assets/partners/thinksmart.png" alt={t("partners.thinksmart_alt")} />
            </Link>
            <Link to="https://www.instagram.com/alrawibooks/?hl=ar" target="_blank">
              <img src="src/assets/partners/alrawi.png" alt={t("partners.alrawi_alt")} />
            </Link>
            <Link to="https://kipinakids.com/kipina-nursery-school-bahrain/" target="_blank">
              <img src="src/assets/partners/kipina.png" alt={t("partners.kipina_alt")} />
            </Link>
            <Link to="https://www.fywedo.com/" target="_blank">
              <img src="src/assets/partners/fywedo.png" alt={t("partners.fywedo_alt")} />
            </Link>
            <Link to="https://www.instagram.com/bahwu/?hl=ar" target="_blank">
              <img src="src/assets/partners/bahwu.png" alt={t("partners.bahwu_alt")} />
            </Link>
            <Link to="https://gtrust.org/" target="_blank">
              <img src="src/assets/partners/goldenTrust.png" alt={t("partners.goldenTrust_alt")} />
            </Link>
          </div>
        </section>

        {/* Sponsors Section */}
        <section className="partners-section">
          <h1 className="section-title">{t("partners.sponsors_title")}</h1>
          <div className="logos-grid">
            <Link to="https://gfh.com/" target="_blank">
              <img src="src/assets/partners/gfh.png" alt={t("partners.gfh_alt")} />
            </Link>
            <Link to="https://benefit.bh/" target="_blank">
              <img src="src/assets/partners/benefit.png" alt={t("partners.benefit_alt")} />
            </Link>
          </div>
        </section>

        {/* Extra Text Section */}
        <div className="extra-info-card">
        
          <p>Building a creative future together</p>
        </div>
      </div>
    </div>
  );
};

export default Partners;
