import React, { useState } from "react";
import { counterData } from "../../../data/about-data";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import Style from "./about-page.module.css";

const Counter = () => {
    const [counterState, setCounterState] = useState(false);

    return (
        <ScrollTrigger
            onEnter={() => setCounterState(true)}
            onExit={() => setCounterState(false)}
        >
            <ul className={Style.counter}>
                {counterData.map((item, index) => {
                    return (
                        <li key={index}>
                            <h1>
                                {counterState && (
                                    <CountUp
                                        start={item.start}
                                        end={item.end}
                                        duration={2.75}
                                    ></CountUp>
                                )}
                            </h1>
                            <h4>{item.title}</h4>
                        </li>
                    );
                })}
            </ul>
        </ScrollTrigger>
    );
};

export default Counter;
