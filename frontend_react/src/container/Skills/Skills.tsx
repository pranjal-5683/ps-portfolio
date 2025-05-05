import "./Skills.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { Tooltip } from "react-tooltip";

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

const Skills = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [experiences, setExperiences] = useState<any[]>([]);

    useEffect(() => {
        const skillsQuery = '*[_type == "skills"]';
        const experiencesQuery = '*[_type == "experiences"]';

        client
            .fetch(skillsQuery)
            .then((data) => {
                setSkills(data);
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
                                    <>
                                        <motion.div
                                            className="app__skills-exp-work"
                                            key={work.name}
                                            whileInView={{ opacity: [0, 1] }}
                                            transition={{ duration: 0.5 }}
                                            data-tooltip-id={work.name}
                                        >
                                            <h4 className="bold-text">
                                                {work.name}
                                            </h4>
                                            <p className="p-text">
                                                {work.company}
                                            </p>
                                        </motion.div>
                                        <Tooltip
                                            id={work.name}
                                            place="top"
                                            className="skills-tooltip"
                                        >
                                            {work.desc}
                                        </Tooltip>
                                    </>
                                ))}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
};

export default AppWrap(MotionWrap(Skills, "app__skills"), "skills", "app__whitebg");
