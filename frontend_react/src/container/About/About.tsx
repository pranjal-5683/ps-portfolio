import "./About.scss";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { client, urlFor } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";

const About = () => {
    const [abouts, setAbouts] = useState<any[]>([]);

    useEffect(() => {
        const query = '*[_type == "abouts"]';

        client
            .fetch(query)
            .then((data) => setAbouts(data))
            .catch((error) => console.error("Error fetching abouts:", error));
    }, []);

    return (
        <div className="app__about app__flex">
            <h2 className="head-text">
                I know that <span>Strong Architechture</span>
                <br />
                builds <span>Strong Products</span>
            </h2>

            <div className="app__profiles">
                {abouts.map((about, index) => (
                    <motion.div
                        whileInView={{ opacity: 1 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5, type: "tween" }}
                        className="app__profile-item"
                        key={about.title + index}
                    >
                        <img
                            src={urlFor(about.imgUrl).url()}
                            alt={about.title}
                        />
                        <h2 className="bold-text" style={{ marginTop: 20 }}>
                            {about.title}
                        </h2>
                        <p className="p-text" style={{ marginTop: 10 }}>
                            {about.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AppWrap(
    MotionWrap(About, "app__about"),
    "about",
    "app__whitebg"
);