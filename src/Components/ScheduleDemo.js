import React, { useEffect } from 'react'
import Footer from "./Footer";
import NavTwo from "./NavTwo";
import { useForm } from "react-hook-form";
function ScheduleDemo() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [])
  const onSubmit = (data) => {
    console.log(data)
    var link =`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=data@merd.online&su=Schedule+Demo&body='+Name:${data.name},Email:${data.email},PhoneNo:${data.contact},Date_Time:${data.time}+'&ui=2&tf=1&pli=1`
    window.location.href = link;

  };

  return (
    <>
      <NavTwo />
      <h1 className="text-3xl mb-5 text-center mt-3">Schedule Demo</h1>
      <div className="flex justify-center items-center mb-14">
        <form className="w-full max-w-lg"  onSubmit={handleSubmit(onSubmit)}>
          {/* first row */}
          <div className="flex flex-wrap  -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
              </label>
              <input
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />

              {errors.name && errors.name.type === "required" && (
                <p className="mt-2 text-red-500 text-xs italic">This Field is Required</p>
              )}
              {errors.name && errors.name.type === "maxLength" && (
                <p className="mt-2 text-red-500 text-xs italic">
                  Name Should not be greater than 100 character
                </p>
              )}
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Email
              </label>
              <input
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

                className="appearance-none  block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:bg-white" id="grid-last-name" type="email" placeholder="example@gmail.com" />
              {errors.email && errors.email.type === "required" && (
                <p className="mt-2 text-red-500 text-xs italic">This Field is Required</p>
              )}
              {errors.email && errors.email.type === "maxLength" && (
                <p className="mt-2 text-red-500 text-xs italic">
                  Name Should not be greater than 100 character
                </p>
              )}
            </div>

          </div>
          {/* second row */}
          <div className="flex flex-wrap  -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase  tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Phone number
              </label>
              <input
                {...register("contact", {
                  required: true,
                  maxLength: 10,
                  maxLength: 10,

                })}
                style={errors.contact ? { border: '1px solid rgba(255, 51, 38, 0.4)', marginBottom: '0rem' } : {}}

                className="appearance-none block w-full focus:ring-blue-500 focus:border-blue-500 bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:ring-blue-500 focus:border-blue-500 focus:outline-none focus:bg-white" id="grid-first-name" type="text" 
                 />
              {errors.contact && errors.contact.type === "required" && (
                <p className="mt-2 text-red-500 text-xs italic">This Field is Required</p>
              )}
              {errors.contact && errors.contact.type === "minLength" && (
                <p className="mt-2 text-red-500 text-xs italic">
                  Contact no Should be 10 chaaracter
                </p>
              )}
              {errors.contact && errors.contact.type === "maxLength" && (
                <p className="mt-2 text-red-500 text-xs italic">
                  Contact no Should not be greater than 10 character
                </p>
              )}

            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Preferred Date & Time
              </label>
              <input 
              max={new Date().toISOString().split("T")[0]} 
              className="appearance-none focus:ring-blue-500 focus:border-blue-500 block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none " 
              id="grid-last-name" 
              type="datetime-local" 
              placeholder="Doe" 
              {...register("time", {
                required: true,
               

              })}
              style={errors.time ? { border: '1px solid rgba(255, 51, 38, 0.4)', marginBottom: '0rem' } : {}}
              />
                  {errors.time && errors.time.type === "required" && (
                <p className="mt-2 text-red-500 text-xs italic">This Field is Required</p>
              )}
            </div>
          </div>
          <button
          type="submit" 
         
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
         >Schedule Demo</button>


        </form>
      </div>
      <Footer />
    </>
  )
}

export default ScheduleDemo