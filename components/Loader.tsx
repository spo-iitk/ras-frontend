import React from "react";
import loaderStyles from "../styles/Loader.module.css";

function Loader() {
  return (
    <div className={loaderStyles.card}>
      <div className={loaderStyles.p32}>
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.titleLine} ${loaderStyles.end}`}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.titleLine} ${loaderStyles.end}`}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.titleLine} `}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}
        />
        <div
          className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}
        />
      </div>
    </div>
  );
}
Loader.layout = "studentPhaseDashboard";
export default Loader;
