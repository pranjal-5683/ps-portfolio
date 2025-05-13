import "./Footer.scss";
import { useState } from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import { images } from "../../constants";
import { client } from "../../client";

const Footer = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { name, email, message } = formData;

    const handleChangeInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setLoading(true);

        const contact = {
            _type: "contact",
            name: name,
            email: email,
            message: message,
        };

        client.create(contact).then(() => {
            setLoading(false);
            setIsFormSubmitted(true);
        });
    };

    return (
        <>
            <h2 className="head-text">Take a coffee & chat with me</h2>
            <div className="app__footer-cards">
                <div className="app__footer-card">
                    <img src={images.email} alt="email" />
                    <a
                        href="mailto:pranjal.srivastava.tech@gmail.com"
                        className="p-text"
                    >
                        pranjal.srivastava.tech@gmail.com
                    </a>
                </div>
                <div className="app__footer-card">
                    <img src={images.mobile} alt="mobile" />
                    <a href="tel:+918299631205" className="p-text">
                        +91 8299631205
                    </a>
                </div>
            </div>

            {!isFormSubmitted ? (
                <div className="app__footer-form app__flex">
                    <div className="app__flex">
                        <input
                            className="p-text"
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={name}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="app__flex">
                        <input
                            className="p-text"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div>
                        <textarea
                            className="p-text"
                            name="message"
                            placeholder="Your Message"
                            value={message}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <button
                        type="button"
                        className="p-text"
                        onClick={handleSubmit}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </div>
            ) : (
                <div>
                    <h3 className="head-text">
                        Thank you for getting in touch!
                    </h3>
                </div>
            )}

            <div className="copyright">
                <p className="p-text">&copy;2025 Pranjal Srivastava</p>
                <p className="p-text">All rights reserved</p>
            </div>
        </>
    );
};

export default AppWrap(
    MotionWrap(Footer, "app__footer"),
    "contact",
    "app__whitebg"
);
