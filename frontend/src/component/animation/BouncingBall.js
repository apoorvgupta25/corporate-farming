import { motion } from "framer-motion";

const ballStyle = {
    display: "block",
    width: "0.75rem",
    height: "0.75rem",
    backgroundColor: "black",
    borderRadius: "0.5rem"
};

const bounceTransition = {
    y: {
        duration: 0.4,
        yoyo: Infinity,
        ease: "easeOut"
    },
    backgroundColor: {
        duration: 0,
        yoyo: Infinity,
        ease: "easeOut",
        repeatDelay: 0.8
    }
};

const ballContainer = {
    width: "2rem",
    height: "2rem",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around"
}

const BouncingBall = () => {
    return (
        <div style={ballContainer}>
            <motion.div
                style={ballStyle}
                transition={bounceTransition}
                animate={{
                y: ["100%", "-100%"],
                backgroundColor: ["#6666ff", "#ff6699"]
                }}
            />
        </div>
    );
}

export default BouncingBall;
