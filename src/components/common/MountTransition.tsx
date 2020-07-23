import React, { FC } from "react";
import { motion } from "framer-motion";
import { RedirectProps, Redirect } from "react-router-dom";

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

export const MotionRedirect: FC<RedirectProps> = ({ children, ...props }) => (
  <motion.div exit="undefined">
    <Redirect {...props} />
  </motion.div>
);
