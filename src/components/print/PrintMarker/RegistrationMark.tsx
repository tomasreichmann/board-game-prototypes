import React, { CSSProperties } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { range } from "lodash";
import RegistrationMarkImage from "./registration-mark.svg";

// import "./RegistrationMark.css";

type RegistrationMarkProps = {
    className?: string;
    size?: CSSProperties["width"];
};

const RegistrationMark = ({ className, size = "5mm" }: RegistrationMarkProps) => {
    return (
        <RegistrationMarkImage
            className={twMerge("RegistrationMark", className)}
            style={{ width: size, height: size }}
        />
    );
};

export default RegistrationMark;
