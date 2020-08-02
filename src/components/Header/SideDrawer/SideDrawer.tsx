import React, { FC } from "react";

import classes from "./SideDrawer.module.scss";
import musicWave from "../../../static/images/musicWave.png";

import navDrawerBG from "../../../static/images/navDrawerBG.jpg";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { IconButton } from "@material-ui/core";
import AlbumIcon from "@material-ui/icons/Album";
import FastForwardIcon from "@material-ui/icons/FastForward";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HOME, MUSIC } from "../../../constants/route.urls";

const navSideDrawerBgStyle = {
  backgroundImage: `url(${navDrawerBG})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
};

const headerMotionVariants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", delay: 0.2 },
  },
  exit: {
    y: -100,
    opacity: 0,
    transition: { type: "spring", delay: 0.2 },
  },
};

const navLinkMotionVariants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", delay: 0.2 },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { type: "spring", delay: 0.2 },
  },
};

type SideDrawerPropsType = {
  toggleDrawer: (
    state: boolean
  ) => (
    event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>
  ) => void;
};

export const SideDrawer: FC<SideDrawerPropsType> = ({ toggleDrawer }) => {
  return (
    <div className={classes.sideNavBar}>
      <div
        className={classes.sideNavBar__background}
        style={navSideDrawerBgStyle}
      ></div>
      <motion.header
        variants={headerMotionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileTap={{ scale: 0.8 }}
        className={classes.sideNavBar__header}
      >
        <AlbumIcon />
        <h1>Beat</h1>
        <AlbumIcon />
      </motion.header>
      <nav className={classes.sideNavBar__content}>
        <ul>
          <Link
            to={HOME}
            className={classes.sideNavBar__link}
            onClick={toggleDrawer(false)}
          >
            <motion.li
              variants={navLinkMotionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileTap={{ scale: 1.1 }}
            >
              <FastForwardIcon />
              Home
            </motion.li>
          </Link>
          <Link
            to={MUSIC}
            className={classes.sideNavBar__link}
            onClick={toggleDrawer(false)}
          >
            <motion.li
              variants={navLinkMotionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileTap={{ scale: 1.2 }}
            >
              <FastForwardIcon />
              Music
            </motion.li>
          </Link>
        </ul>
      </nav>
      <footer className={classes.sideNavBar__footer}>
        <motion.div
          variants={navLinkMotionVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileTap={{ scale: 1.1 }}
          className={classes.sideNavBar__shape}
        >
          <img src={musicWave} alt="music wave" />
        </motion.div>
      </footer>
      <motion.button
        variants={headerMotionVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={classes.sideNavBar__close}
        onClick={toggleDrawer(false)}
      >
        <ArrowUpwardIcon />
      </motion.button>
    </div>
  );
};
