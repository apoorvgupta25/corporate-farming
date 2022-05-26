import { motion } from "framer-motion";
import Topbar from "../topbar/topbar";

const loadingContainer = {
    width: "2rem",
    height: "100vh",
    display: "flex",
    textAlign: "center",
    margin: "0 auto",
    alignItems: "center",
    justifyContent: "space-around"
};

const loadingCircle = {
    display: "block",
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: "black",
    borderRadius: "0.25rem",
};

const loadingContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.2
        }
    },
    end: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const loadingCircleVariants = {
    start: {
        y: "50%"
    },
    end: {
        y: "150%"
    }
};

const loadingCircleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut"
};

const ThreeDotsWave = () => {
    return (
        <>
        <Topbar/>
        <motion.div
            style={loadingContainer}
            variants={loadingContainerVariants}
            initial="start"
            animate="end"
        >
            <motion.div
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.div
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
            <motion.div
                style={loadingCircle}
                variants={loadingCircleVariants}
                transition={loadingCircleTransition}
            />
        </motion.div>
        </>
    );
}

export default ThreeDotsWave;
