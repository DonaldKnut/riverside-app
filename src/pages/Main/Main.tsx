import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./main.module.css";
import { Link } from "react-router-dom";
import images from "../../assets/images";
import { LuClapperboard } from "react-icons/lu";

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
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
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

        <Link to="/login" onClick={handleLoginClick}>
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
