import React, { useEffect, useState } from "react";
import styles from "./main.module.css";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import { LuClapperboard } from "react-icons/lu";
import { loginWithGitHub } from "./loginWithGitHub";

interface TypewriterProps {
  text: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    let index = 0;

    const intervalId = setInterval(() => {
      setDisplayText((prevText) => prevText + (text[index] || ""));

      index += 1;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [text]);

  return <h1>{displayText}</h1>;
};

const Main: React.FC = () => {
  // const navigate = useNavigate();

  const handleLoginClick = () => {
    loginWithGitHub();
  };

  return (
    <main className="">
      <div className={styles.main}>
        <img
          src={require("../../assets/riverside_logo.png")}
          alt="riverside logo"
          className={styles.riverside_img}
        />

        <Typewriter text="Riverside Victory International Christian Ministry" />

        <img
          src={images.jesusInit}
          alt="jesus logo"
          className={styles.hero_image}
        />

        <Link to="/dashboard" onClick={handleLoginClick}>
          <button
            className={styles.button}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Our App <LuClapperboard />
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Main;
