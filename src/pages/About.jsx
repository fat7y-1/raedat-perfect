import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import axios from "axios"

const About = ({ user }) => {
  const { t } = useTranslation()

  return (
    <div>
      {/* Dynamic Translations Part */}
      <h1>{t("about.title")}</h1>
      <p>{t("about.description")}</p>

      <h1>{t("about.vision_mission")}</h1>
      <h2>{t("about.vision_title")}</h2>
      <p>{t("about.vision_text")}</p>

      <h2>{t("about.mission_title")}</h2>
      <p>{t("about.mission_text")}</p>

      <h1>{t("about.team_title")}</h1>
    </div>
  )
}

export default About
