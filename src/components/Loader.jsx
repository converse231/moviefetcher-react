import Loading from "../assets/animation_lm63c4tt.json";
import Lottie from "lottie-react";

function Loader() {
  return (
    <div className="mx-auto flex justify-center items-center h-screen">
      <Lottie animationData={Loading} className="w-32 h-32" />
    </div>
  );
}

export default Loader;
