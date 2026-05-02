import { motion } from "motion/react";
import { TechStackModule } from "./TechStackModule";

export function StackModule() {
  return (
    <motion.section 
      id="TechStack"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="col-span-12 md:col-span-6 premium-card p-0 relative overflow-hidden"
    >
      <TechStackModule />
    </motion.section>
  );
}
