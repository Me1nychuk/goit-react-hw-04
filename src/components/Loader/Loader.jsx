import { Grid } from "react-loader-spinner";
import css from "./Loader.module.css";
const Loader = () => {
  return (
    <div className={css.wrapper}>
      <Grid
        visible={true}
        height="100px"
        width="100px"
        color="white"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
};

export default Loader;
