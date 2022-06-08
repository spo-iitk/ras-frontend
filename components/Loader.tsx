
import loaderStyles from "../styles/Loader.module.css";

function Loader()
{
    return (
      <div className={loaderStyles.card}>
        <div className={loaderStyles.p32}>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.titleLine} ${loaderStyles.end}`}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.titleLine} ${loaderStyles.end}`}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.titleLine} `}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}></div>
            <div className={`${loaderStyles.shimmerBG} ${loaderStyles.contentLine} ${loaderStyles.mt24}`}></div>
        </div>
      </div>
    )
}
Loader.layout = "studentPhaseDashboard";
export default Loader;