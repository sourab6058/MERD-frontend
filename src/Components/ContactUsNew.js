import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Nav from "./NavTwo";
import Footer from "./Footer";
import classes from "../css/ContactUsNew.module.css";

function ContactUsNew() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    var link = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=data@merd.online&su=Your+Query&body='+Name:${data.name},Email:${data.email},Message:${data.message}+'&ui=2&tf=1&pli=1`;
    window.location.href = link;
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
              <div className={classes.text_one}>data@merd.online </div>
            </div>
          </div>
          <div className={classes.right_side}>
            <div className={classes.topic_text}>Send us a message</div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged
            </p>
            <form action="#" onSubmit={handleSubmit(onSubmit)}>
              <div className={classes.input_box}>
                <input
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: true,
                    maxLength: 100,
                  })}
                  style={
                    errors.name
                      ? {
                          border: "1px solid rgba(255, 51, 38, 0.4)",
                          marginBottom: "0rem",
                        }
                      : {}
                  }
                />
              </div>
              {errors.name && errors.name.type === "required" && (
                <p className="mt-2 text-red-500 text-xs italic">
                  This Field is Required
                </p>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <p className="mt-2 text-red-500 text-xs italic">
                  Name Should not be greater than 100 character
                </p>
              )}
              <div className={classes.input_box}>
                <input
                  type="text"
                  {...register("email", {
                    required: true,
                    maxLength: 100,
                  })}
                  style={
                    errors.name
                      ? {
                          border: "1px solid rgba(255, 51, 38, 0.4)",
                          marginBottom: "0rem",
                        }
                      : {}
                  }
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && errors.email.type === "required" && (
                <p className="mt-2 text-red-500 text-xs italic">
                  This Field is Required
                </p>
              )}
              {errors.email && errors.email.type === "maxLength" && (
                <p className="mt-2 text-red-500 text-xs italic">
                  Name Should not be greater than 100 character
                </p>
              )}
              <div className={`${classes.input_box} ${classes.message_box}`}>
                <textarea
                  placeholder="Your Message"
                  {...register("message", {
                    required: true,
                    maxLength: 400,
                  })}
                  style={
                    errors.message
                      ? {
                          border: "1px solid rgba(255, 51, 38, 0.4)",
                          marginBottom: "0rem",
                        }
                      : {}
                  }
                />
              </div>
              {errors.message && errors.message.type === "required" && (
                <p className="mt-2 text-red-500 text-xs italic">
                  This Field is Required
                </p>
              )}
              {errors.message && errors.message.type === "maxLength" && (
                <p className="mt-2 text-red-500 text-xs italic">
                  Name Should not be greater than 100 character
                </p>
              )}
              <button
                type="submit"
                className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUsNew;
