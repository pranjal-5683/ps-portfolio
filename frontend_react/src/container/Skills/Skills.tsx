import "./Skills.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

interface Skill {
    name: string;
    bgColor: string;
    icon: any;
}

interface Work {
    name: string;
    company: string;
    desc: string;
}

interface Experience {
    year: string;
    works: Work[];
}

interface Brand {
    _id: string;
    name: string;
    imgUrl: any;
}

const Skills = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);

    useEffect(() => {
        const brandQuery = '*[_type == "brands"]';
        const skillsQuery = '*[_type == "skills"]';
        const experiencesQuery = '*[_type == "experiences"]';

        client
            .fetch(brandQuery)
            .then((data) => {
                setBrands(data);
            })
            .catch((error) => console.error("Error fetching brands:", error));

        client
            .fetch(skillsQuery)
            .then((data) => {
                const sortedArray = data.sort((a: Skill, b: Skill) =>
                    a.name.localeCompare(b.name)
                );
                setSkills(sortedArray);
            })
            .catch((error) => console.error("Error fetching skills:", error));

        client
            .fetch(experiencesQuery)
            .then((data) => {
                setExperiences(data);
            })
            .catch((error) =>
                console.error("Error fetching experiences:", error)
            );
    }, []);

    return (
        <>
            <h2 className="head-text">Skills & Experience</h2>
            <div className="app__skills-container">
                <motion.div className="app__skills-list">
                    {skills && skills.length > 0 ? (
                        skills?.map((skill) => (
                            <motion.div
                                key={skill.name}
                                className="app__skills-item app__flex"
                                whileInView={{ opacity: [0, 1] }}
                                transition={{ duration: 0.5 }}
                            >
                                <div
                                    className="app__flex"
                                    style={{ backgroundColor: skill.bgColor }}
                                >
                                    <img
                                        src={urlFor(skill.icon).url()}
                                        alt={skill.name}
                                    />
                                </div>
                                <p className="p-text">{skill.name}</p>
                            </motion.div>
                        ))
                    ) : (
                        <p className="p-text">Loading skills....</p>
                    )}
                </motion.div>

                <motion.div className="app__skills-exp">
                    {experiences?.map((experience) => (
                        <motion.div
                            className="app__skills-exp-item"
                            key={experience.year}
                        >
                            <div className="app__skills-exp-year">
                                <p className="bold-text">{experience.year}</p>
                            </div>
                            <motion.div className="app__skills-exp-works">
                                {experience.works.map((work: Work) => (
                                    <motion.div
                                        className="app__skills-exp-work"
                                        key={work.name}
                                        whileInView={{ opacity: [0, 1] }}
                                        transition={{ duration: 0.5 }}
                                        data-tooltip-id={work.name}
                                    >
                                        <h4 className="bold-text">
                                            {work.name} | {work.company}
                                        </h4>
                                        <p className="p-text">{work.desc}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="app__exp-brands app__flex">
                {brands.map((brand) => (
                    <motion.div
                        whileInView={{ opacity: [0, 1] }}
                        transition={{ duration: 0.5, type: "tween" }}
                        key={brand._id}
                    >
                        <img
                            src={urlFor(brand.imgUrl).url()}
                            alt={brand.name}
                        />
                    </motion.div>
                ))}
            </div>
        </>
    );
};

export default AppWrap(
    MotionWrap(Skills, "app__skills"),
    "skills",
    "app__whitebg"
);
