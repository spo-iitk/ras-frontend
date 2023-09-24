/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
import React from "react";
import Head from "next/head";

function Meta({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords: string;
}) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
    </div>
  );
}

Meta.defaultProps = {
  title: "Recruitment Automation System",
  description: "",
  keywords: "automation, recuitment, system",
};

export default Meta;
