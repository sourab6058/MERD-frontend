import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from './NavTwo'
import Footer from './Footer'
import classes from '../css/ContactUsNew.module.css'
function ContactUsNew() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const submitFormHandler = (data) => {
    console.log("sucess")
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])
  
  return (
    <>
      <Nav />

      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.left_side}>
            <div className={`${classes.address} ${classes.details}`}>
              <i className="fas fa-map-marker-alt"></i>
              <div className={classes.topic}>Address</div>
              <div className={classes.text_one}>Lorem, NP12</div>
              <div className={classes.text_two}>Dubai 06</div>
            </div>
            <div className={`${classes.phone} ${classes.details}`}>
              <i className="fas fa-phone-alt"></i>
              <div className={classes.topic}>Phone</div>
              <div className={classes.text_one}>+0012 3493 5647</div>
              <div className={classes.text_two}>+0012 3434 5678</div>
            </div>
            <div className={`${classes.email} ${classes.details}`}>
              <i className="fas fa-envelope"></i>
              <div className={classes.topic}>Email</div>
              <div className={classes.text_one}>merd@gmail.com</div>
              <div className={classes.text_two}>info.merd@gmail.com</div>
            </div>
          </div>
          <div className={classes.right_side}>
            <div className={classes.topic_text}>Send us a message</div>
            <p>If you have any work from me or any types of quries related to my tutorial, you can send me message from here. It's my pleasure to help you.</p>
            <form action="#">
              <div className={classes.input_box}>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className={classes.input_box}>
                <input type="text" placeholder="Enter your email" />
              </div>
              <div className={`${classes.input_box} ${classes.message_box}`}>
                <textarea placeholder="Your Message" />
              </div>
              <div className={classes.button}>
                <input type="button" value="Send Now" />
              </div>
            </form>
          </div >
        </div >
      </div >
      <Footer />
    </>
  )
}

export default ContactUsNew