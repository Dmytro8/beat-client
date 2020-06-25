import React, { FC } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const pageTransition = {
  // transition: "linear",
  duration: 0.2,
};

export const MountTransition: FC<Props> = ({ children }) => (
  <motion.div
    exit={{ opacity: 0 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);
