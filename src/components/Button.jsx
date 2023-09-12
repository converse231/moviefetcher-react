/* eslint react/prop-types: 0 */

import { motion } from "framer-motion";

function Button({ value, variant = "primary" }) {
  if (variant === "primary") {
    return (
      <motion.button className="px-2 py-1 border text-sm text-zinc-50 border-zinc-50 hover:bg-zinc-50 hover:text-zinc-950 duration-300 my-1 rounded-md md:text-xl m w-fit">
        {value}
      </motion.button>
    );
  }
  if (variant === "secondary") {
    return (
      <motion.button className="px-3 py-1 bg-slate-50 text-zinc-950 text-sm md:text-xl rounded-md hover:border hover:bg-transparent hover:text-zinc-50 mr-2 md:mr-4">
        {value}
      </motion.button>
    );
  }
}

export default Button;
