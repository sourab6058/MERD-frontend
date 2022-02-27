import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import classes from '../css/faq.module.css'
import NavTwo from "./NavTwo";
import Aos from "aos";
import "aos/dist/aos.css"
function Faq() {
  const [terms, setTerms] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const [notice, setNotice] = useState(false);
  const [id, setId] = useState(0);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToTop()
    Aos.init({
      duration: 1000
    });
  }, []);
  const termsConditions = [
    {
      id: "1",
      title: "Question 1 ",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: "2",
      title: "Question 2 ",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: "3",
      title: "Question 3 ",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: "4",
      title: "Question 4",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: "5",
      title: "Question 5",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      id: "6",
      title: "Question 6 ",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

  ];
  React.useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <>
      <NavTwo />
      <div className={classes.terms}>
       
      
       
        {termsConditions.map((d, i) => {
          return (
            <div className={classes.termItem} key={i}>
              <div
                onClick={() => {
                  setId(d.id);
                }}
                style={{ display: "flex", gap: "1.6rem", cursor: "pointer" }}
              >
                {/* <img src={Term3} alt="Term3" className={classes.termImg} /> */}
                <p
                  className={classes.textLg}
                  style={{ marginBottom: "1.6rem" }}
                >
                  {d.title}
                </p>
              </div>
              {d.id === id && (
                <div className={classes.termContent} data-aos="fade-zoom-in" data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="100">
                  <p
                    className={classes.textBase}
                    style={{ marginBottom: "0rem" }}
                  >
                    {d.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default Faq;
