import { motion } from "framer-motion";

function HeroImage() {
  return (
    <motion.div
      className="flex justify-center lg:justify-end order-1 lg:order-2 mb-4 lg:mb-0"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.img
        src="./11.png"
        alt="Hero Product"
        className="w-full max-w-[320px] sm:max-w-[350px] md:max-w-[520px] lg:max-w-[580px] max-h-[700px] h-auto object-contain px-4 lg:px-0"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
    </motion.div>
  );
}

export default HeroImage;
