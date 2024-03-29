import { Audio } from "react-loader-spinner";
const Spinner = () => {
  return (
    <div className="grid place-content-center mt-[15rem] ">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

export default Spinner;
