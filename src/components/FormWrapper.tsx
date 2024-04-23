import { ReactNode } from "react";
import { motion } from "framer-motion";

type FormWrapperProps = {
  children: ReactNode;
};

const formVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: {
      ease: "easeOut",
    },
  },
};

const FormWrapper = ({ children }: FormWrapperProps) => {
  return (
    <motion.div
      className="flex flex-col gap-5 overflow-y-auto no-scrollbar"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      style={{ maxHeight: '70vh' }}
      exit="exit"
    >
      
      {children}
    </motion.div>
  );
};

export default FormWrapper;
