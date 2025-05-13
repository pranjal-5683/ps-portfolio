import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";

const SocialMedia = () => {
    return (
        <div className="app__social">
            <div className="app__social-icon-linkedin">
                <a
                    href="https://www.linkedin.com/in/5683-pranjal/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <BsLinkedin />
                </a>
            </div>
            <div className="app__social-icon-github">
                <a
                    href="https://www.github.com/pranjal-5683/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <BsGithub />
                </a>
            </div>
            <div className="app__social-icon-instagram">
                <a
                    href="https://www.instagram.com/pranjal__5683/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <BsInstagram />
                </a>
            </div>
        </div>
    );
};

export default SocialMedia;
