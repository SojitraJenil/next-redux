/* eslint-disable @next/next/no-img-element */
import React, { ImgHTMLAttributes } from "react";

interface DemoProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
}

const Demo: React.FC<DemoProps> = ({ src, alt, ...rest }) => {
  return (
    <div>
      <img
        className="h-screen mx-auto"
        src={
          "https://miro.medium.com/v2/resize:fit:5120/1*zG7xYxuqGdmIFM7sjXmCvA.jpeg"
        }
        alt={"Redux Flow"}
        {...rest}
      />
    </div>
  );
};

export default Demo;
