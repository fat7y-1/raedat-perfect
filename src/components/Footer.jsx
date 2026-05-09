import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <img src="/images/logo.png" alt="Ra'edat Logo" className="footer-logo" />


        <div className="social-media">
          <Link to="https://www.instagram.com/raedat.bh/">
            <img src="/images/social_madia/instagram.png" alt="Instagram" />
          </Link>
          <Link to="https://www.youtube.com/@raedat_bh">
            <img src="/images/social_madia/youtube.png" alt="YouTube" />
          </Link>
          <Link to="https://www.tiktok.com/@raedat.bh">
            <img src="/images/social_madia/tiktok.png" alt="TikTok" />
          </Link>
          <Link to="https://twitter.com/raedatbh">
            <img src="/images/social_madia/twitter.png" alt="Twitter" />
          </Link>
          <Link to="mailto:support@raedat.online">
            <img src="/images/social_madia/email.png" alt="Email" />
          </Link>
        </div>

        <p className="copyright">
          © 2026 Raedat All Rights Reserved | Disclaimer | Powered by Atyaf eSolutions
        </p>
      </div>
    </footer>
  );
};

export default Footer;
