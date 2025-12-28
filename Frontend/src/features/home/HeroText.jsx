import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HeroText() {
  return (
    <motion.div
      className="text-center lg:text-left mb-8 lg:mb-0 order-2 lg:order-1"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#000000] leading-tight mb-4">
        Crafted Essentials.{" "}
        <span className="text-[#1672D4]">Shop Our Latest Apparel.</span>
      </h1>

      <p className="w-full max-w-[624px] font-normal text-sm sm:text-base md:text-lg lg:text-[24px] mb-6 mx-auto lg:mx-0">
        Modern wear, designed for your everyday life. From the elegant Men's
        essentials and distinctive Women's pieces, to comfortable Kids' apparel.
      </p>
      <Link to="/products/men">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#0D1B2A] p-3 rounded-xl text-amber-50 text-sm sm:text-base hover:bg-[#0d1b2ad3] transition-colors duration-200 cursor-pointer"
        >
          Shop now
        </motion.button>
      </Link>
    </motion.div>
  );
}

export default HeroText;
