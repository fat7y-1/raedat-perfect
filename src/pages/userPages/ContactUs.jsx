import React from "react"
import { useTranslation } from "react-i18next"

const ContactUs = () => {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t("contact.company")}</h1>

      <p>{t("contact.address")}</p>

      <p>{t("contact.email")}</p>

      <div>
        <form action="POST">
          <input type="text" placeholder={t("contact.full_name")} />

          <input type="email" placeholder={t("contact.email_placeholder")} />

          <input type="number" placeholder={t("contact.phone")} />

          <input type="text" placeholder={t("contact.subject")} />

          <textarea
            placeholder={t("contact.message")}
            id="bio"
            name="bio"
            onInput={(e) => {
              e.target.style.height = ""
              e.target.style.height = `${e.target.scrollHeight}px`
            }}
            style={{
              overflow: "hidden",
              width: "100%",
              minHeight: "50px",
              padding: "10px",
              resize: "none",
            }}
          ></textarea>

          <button type="submit">{t("contact.submit")}</button>
        </form>
      </div>
    </div>
  )
}

export default ContactUs
