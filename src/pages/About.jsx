import React from "react"
import { useTranslation } from "react-i18next"

const About = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t("about.title")}</h1>
      <p>{t("about.description")}</p>

      <h1>{t("about.vision_mission")}</h1>
      <h2>{t("about.vision_title")}</h2>
      <p>{t("about.vision_text")}</p>

      <h2>{t("about.mission_title")}</h2>
      <p>{t("about.mission_text")}</p>

      <h1>{t("about.orange_title")}</h1>
      <p>{t("about.orange_p1")}</p>
      <p>{t("about.orange_p2")}</p>

      <h4>"{t("about.quote")}"</h4>

      <h1>{t("about.uniqueness_title")}</h1>
      <p>{t("about.uniqueness_text")}</p>

      <h1>{t("about.team_title")}</h1>
    </div>
  )
}

export default About
