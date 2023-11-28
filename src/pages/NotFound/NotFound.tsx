import React from "react";
// import styles from "./NotFound.module.css";
import images from "../../assets/images";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div>
      <div className="mobile_advert_container">
        <div className="mobile_advert_wrap">
          <div className="label_text_wrapper_left">
            <div className="label_text_wrapper_left">
              <img
                src={images.errorImage}
                alt="logo of a phone with dealo"
                className="mobile_img"
                // width={455}
                // height={455}
              />
            </div>
            <div className="label_text_wrapper_section_right">
              <p>ERROR COCC 404</p>
              <h1 className="mobile_h1_text">Oops!!</h1>
              <h5 className="mobile_h5_text">
                This is not the page you are looking for.
              </h5>

              <p className="label_for_courses">
                Here is a helpful link instead.
                <Link to="/" className="courses_link_highlight">
                  Home
                </Link>
              </p>
              {/* <p className="label-text_wrapper-text">
                We have 40k plus online courses & 500k+ Online registered
                Students. Find your desired courses from them.
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
