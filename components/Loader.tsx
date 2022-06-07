import loaderStyles from "../styles/Loader.module.css";

export default function Loader()
{
    return (
        <div className={loaderStyles.loaderContainer}>
            <div className={loaderStyles.loading}>
	            <div></div>
	            <div></div>
	            <div></div>
	            <div></div>
            </div>
        </div>
    )
}