import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faXTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <div className="flex bg-white flex-col md:flex-row gap-1 items-center justify-between ps-10 pe-10 p-4">
      <div className="flex justify-center gap-6 items-center">
        <a target="_blank" href="https://www.linkedin.com">
          <FontAwesomeIcon className="text-xl" icon={faLinkedin} />
        </a>
        <a target="_blank" href="https://www.github.com">
          <FontAwesomeIcon className="text-xl" icon={faGithub} />
        </a>
        <a target="_blank" href="https://www.x.com">
          <FontAwesomeIcon className="text-xl" icon={faXTwitter} />
        </a>
      </div>
      <div className="text-center text-xs font-mono">
        <p>©LetrasVivas 2025</p>
      </div>
    </div>
  );
};

export default Footer;
