/* eslint-disable @next/next/no-img-element */
import React, { ImgHTMLAttributes } from "react";

interface DemoProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
}

const Demo: React.FC<DemoProps> = ({ src, alt, ...rest }) => {
  return (
    <div>
      <img
        src={require("../src/assets/ReduxFlow.gif")}
        alt={"Redux Flow"}
        {...rest}
      />
    </div>
  );
};

export default Demo;
