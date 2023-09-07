import Loading from "../assets/animation_lm63c4tt.json";
import Lottie from "lottie-react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={Loading} className="w-screen h-auto" />
    </div>
  );
}

export default Loader;
