import styles from "./Loader.module.css";
import LoaderImage from "../../assets/loader.gif";

export function Loader() {
    return (
        <div className={styles.loader}>
            <img src={LoaderImage}></img>
        </div>
    );
}
