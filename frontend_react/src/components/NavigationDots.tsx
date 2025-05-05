import React from "react";

interface NavigationDotsProps {
    active: string;
}

const NavigationDots: React.FC<NavigationDotsProps> = ({ active }) => {
    return (
        <div className="app__navigation">
            {["home", "about", "work", "skills", "testimonials", "contact"].map(
                (item, index) => (
                    <a 
                        href={`#${item}`} 
                        key={item + index}
                        className="app__navigation-dot"
                        style={item === active ? { backgroundColor: "#313BAC" } : {}}
                    />
                )
            )}
        </div>
    );
};

export default NavigationDots;
