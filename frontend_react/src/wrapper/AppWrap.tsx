import React from "react";
import { NavigationDots, SocialMedia } from "../components";

const AppWrap = (
    Component: React.ComponentType,
    idName: string,
    classNames: string
) => {
    return function HOC() {
        return (
            <div id={idName} className={`app__container ${classNames}`}>
                <SocialMedia />
                <div className={`app__wrapper app__flex ${classNames}`}>
                    <Component />
                </div>
                <NavigationDots active={idName} />
            </div>
        );
    };
};

export default AppWrap;
