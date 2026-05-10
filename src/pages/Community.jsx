import React from "react"
import { useTranslation } from "react-i18next"

const Community = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t("community.title")}</h1>
      <p>{t("community.description")}</p>

      <h4>{t("community.pillars_title")}</h4>

      <ul>
        <li>{t("community.pillars.live_streaming")}</li>
        <li>{t("community.pillars.events_management")}</li>
        <li>{t("community.pillars.online_courses")}</li>
        <li>{t("community.pillars.souq")}</li>
        <li>{t("community.pillars.community_support")}</li>
      </ul>

      <h1>{t("community.values_title")}</h1>

      <h3>{t("community.individuals_title")}</h3>

      <h4>{t("community.individuals.personal_growth_title")}</h4>
      <p>{t("community.individuals.personal_growth_text")}</p>

      <h4>{t("community.individuals.networking_title")}</h4>
      <p>{t("community.individuals.networking_text")}</p>

      <h4>{t("community.individuals.creative_expression_title")}</h4>
      <p>{t("community.individuals.creative_expression_text")}</p>

      <h3>{t("community.communities_title")}</h3>

      <h4>{t("community.communities.empowerment_title")}</h4>
      <p>{t("community.communities.empowerment_text")}</p>

      <h4>{t("community.communities.heritage_title")}</h4>
      <p>{t("community.communities.heritage_text")}</p>

      <h4>{t("community.communities.growth_title")}</h4>
      <p>{t("community.communities.growth_text")}</p>

      <h1>{t("community.users_title")}</h1>

      <ul>
        <li>{t("community.users.businesses")}</li>
        <li>{t("community.users.educators")}</li>
        <li>{t("community.users.coaches")}</li>
        <li>{t("community.users.creators")}</li>
        <li>{t("community.users.startups")}</li>
        <li>{t("community.users.entrepreneurs")}</li>
        <li>{t("community.users.solopreneurs")}</li>
        <li>{t("community.users.nonprofits")}</li>
      </ul>
    </div>
  )
}

export default Community
