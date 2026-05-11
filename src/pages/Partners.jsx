import React from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Partners = () => {
  const { t } = useTranslation()

  return (
    <div className="partners-container">
      {/* Media Partners Section */}
      <h1>{t("partners.media_title")}</h1>

      <Link to="https://360moms.net/ar" target="_blank">
        <img
          className="moms-img"
          src="src/assets/partners/moms.png"
          alt={t("partners.moms_alt")}
        />
      </Link>

      <Link to="https://www.albiladpress.com/" target="_blank">
        <img
          className="albilad-img"
          src="src/assets/partners/albilad.png"
          alt={t("partners.albilad_alt")}
        />
      </Link>

      <Link to="https://alroya.om/" target="_blank">
        <img
          className="alroyaOm-img"
          src="src/assets/partners/alroyaOm.png"
          alt={t("partners.alroya_alt")}
        />
      </Link>

      {/* Strategic Partners Section */}
      <h1>{t("partners.strategic_title")}</h1>

      <Link to="https://www.kaaf.bh/ar" target="_blank">
        <img
          className="kaaf-img"
          src="src/assets/partners/kaaf.png"
          alt={t("partners.kaaf_alt")}
        />
      </Link>

      <Link to="https://www.unido.org/" target="_blank">
        <img
          className="unido-img"
          src="src/assets/partners/unido.png"
          alt={t("partners.unido_alt")}
        />
      </Link>

      <Link to="https://thinksmartgulf.com/" target="_blank">
        <img
          className="thinksmart-img"
          src="src/assets/partners/thinksmart.png"
          alt={t("partners.thinksmart_alt")}
        />
      </Link>

      <Link to="https://www.instagram.com/alrawibooks/?hl=ar" target="_blank">
        <img
          className="alrawi-img"
          src="src/assets/partners/alrawi.png"
          alt={t("partners.alrawi_alt")}
        />
      </Link>

      <Link to="https://kipinakids.com/kipina-nursery-school-bahrain/" target="_blank">
        <img
          className="kipina-img"
          src="src/assets/partners/kipina.png"
          alt={t("partners.kipina_alt")}
        />
      </Link>

      <Link to="https://www.fywedo.com/" target="_blank">
        <img
          className="fywedo-img"
          src="src/assets/partners/fywedo.png"
          alt={t("partners.fywedo_alt")}
        />
      </Link>

      <Link to="https://www.instagram.com/bahwu/?hl=ar" target="_blank">
        <img
          className="bahwu-img"
          src="src/assets/partners/bahwu.png"
          alt={t("partners.bahwu_alt")}
        />
      </Link>

      <Link to="https://gtrust.org/" target="_blank">
        <img
          className="goldenTrust-img"
          src="src/assets/partners/goldenTrust.png"
          alt={t("partners.goldenTrust_alt")}
        />
      </Link>

      {/* Sponsors Section */}
      <h1>{t("partners.sponsors_title")}</h1>

      <Link to="https://gfh.com/" target="_blank">
        <img
          className="gfh-img"
          src="src/assets/partners/gfh.png"
          alt={t("partners.gfh_alt")}
        />
      </Link>

      <Link to="https://benefit.bh/" target="_blank">
        <img
          className="benefit-img"
          src="src/assets/partners/benefit.png"
          alt={t("partners.benefit_alt")}
        />
      </Link>

      {/* Extra Text Section */}
      <div className="extra-info">
        <h1>partners</h1>
        <h2>hhhhhhh</h2>
      </div>
    </div>
  )
}

export default Partners
