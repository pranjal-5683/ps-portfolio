import "./Testimonials.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Testimonials = () => {
    const [brands, setBrands] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const brandQuery = '*[_type == "brands"]';
        const testimonialsQuery = '*[_type == "testimonial"]';

        client
            .fetch(brandQuery)
            .then((data) => {
                setBrands(data);
            })
            .catch((error) => console.error("Error fetching brands:", error));

        client
            .fetch(testimonialsQuery)
            .then((data) => {
                setTestimonials(data);
            })
            .catch((error) =>
                console.error("Error fetching testimonials:", error)
            );
    }, []);

    const test = testimonials[currentIndex];

    return (
        <>
            {testimonials.length > 0 && (
                <>
                    <div className="app__testimonial-item app__flex">
                        <img
                            src={urlFor(test.imageurl).url()}
                            alt="testimonial"
                        />
                        <div className="app__testimonial-content">
                            <p className="p-text">{test.feedback}</p>
                            <div>
                                <h4 className="bold-text">{test.name}</h4>
                                <h5 className="p-text">{test.company}</h5>
                            </div>
                        </div>
                    </div>

                    <div className="app__testimonial-btns app__flex">
                        <div
                            className="app__flex"
                            onClick={() =>
                                handleClick(
                                    currentIndex === 0
                                        ? testimonials.length - 1
                                        : currentIndex - 1
                                )
                            }
                        >
                            <HiChevronLeft />
                        </div>
                        <div
                            className="app__flex"
                            onClick={() =>
                                handleClick(
                                    currentIndex === testimonials.length - 1
                                        ? 0
                                        : currentIndex + 1
                                )
                            }
                        >
                            <HiChevronRight />
                        </div>
                    </div>
                </>
            )}

            <div className="app__testimonial-brands app__flex">
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
    MotionWrap(Testimonials, "app__testimonial"),
    "testimonials",
    "app__primarybg"
);
