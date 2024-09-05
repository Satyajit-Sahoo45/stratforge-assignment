import React, { FC } from "react";

interface HeadProps {
  title: string;
}

const Heading: FC<HeadProps> = ({ title }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};

export default Heading;
