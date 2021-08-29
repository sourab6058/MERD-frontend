import React from 'react';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import {Button, Modal}  from '@material-ui/core';
import closeIcon from '../img/cancel.png'

class Contact extends React.Component{

    constructor(props){
        super(props);
        this.state={
            input: {},
            errors: {},
            showComponent: true,
        };
        this.onHide = this.onHide.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    onHide(){
        this.setState({
         showComponent: false,
        });
      }

      setWrapperRef = (node) => {
        console.log("ZZZZZZZ")
        this.wrapperRef = node;
      }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
    this.props.onHide()
        }
      }

      componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);

    }

      handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
      
        this.setState({
          input
        });
      }

      handleSubmit(event) {
        event.preventDefault();
      
        if(this.validate()){
            console.log(this.state);
      
            let input = {};
            input["name"] = "";
            input["email"] = "";
            input["phone"] = "";
            input["query"] = "";
            this.setState({input:input});

            console.log("SUBMIT QUERY")
            console.log(this.state);
        //      axios.post('https://www.propviewz.com/be/management/contact_us_request/',{ 
        //       user_name:this.state.input.name?this.state.input.name:null,
        //       user_email:this.state.input.email?this.state.input.email:null,
        //       user_contact_no:this.state.input.phone?this.state.input.phone:null,
        //       user_query:this.state.input.query?this.state.input.query:null,
        //   }
        //     );
        
            alert('Your query is submitted');
         
          this.props.onHide()
        }
    }
      

      validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
    
        if (!input["name"]) {
          isValid = false;
          errors["name"] = "Please enter your name.";
        }
    
        if (!input["email"]) {
          isValid = false;
          errors["email"] = alert("Please enter your email Address.");
        }
    
        if (typeof input["email"] !== "undefined") {
            
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = alert("Please enter valid email address.");
          }
        }
    
        if (!input["phone"]) {
          isValid = false;
          errors["phone"] = "Please enter your phone number.";
        }
    
        if (typeof input["phone"] !== "undefined") {
            
          var pattern = new RegExp(/^[0-9\b]+$/);
          if (!pattern.test(input["phone"])) {
            isValid = false;
            errors["phone"] = alert("Please enter only number.");
          }else if(input["phone"].length != 10){
            isValid = false;
            errors["phone"] = alert("Please enter valid phone number.");
          }
        }
    
        if (!input["query"]) {
          isValid = false;
          errors["query"] = "Please enter your comment.";
        }
    
        this.setState({
          errors: errors
        });
    
        return isValid;
    }

    render(){
        return (
            // <Modal show={this.state.showComponent} animation="true">
                                            <Modal
                                open={this.state.showComponent}
                                onClose={() => this.setState({ showComponent: false })}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    outline: "0",
                                }}>
            {/* <Modal.Header >

            </Modal.Header> */}
            <div className="container_con" ref={this.setWrapperRef}>
            <div className="contitle"> Contact Us </div>
                {/* <img className="contact_closebtn" src={closeIcon} onClick={this.props.onHide}/>  */}
            <form onSubmit={this.handleSubmit}>
            <div>
                <label for="name">Name:</label>
                <input className="con_text" type="text" id="name" name="name" placeholder="Enter name" value={this.state.input.name} onChange={this.handleChange}></input>
            </div>

            <div>
                <label for="email">E-mail ID:</label>
                <input className="con_text" type="text" id="email" name="email" placeholder="Enter your email id"  value={this.state.input.email} onChange={this.handleChange} required></input>
                <div className="text-danger">{this.state.errors.email}</div>
            </div>

            <div>
                <label for="Phone">Contact Number:</label>
                <input className="con_text" type="text" id="email" name="phone" placeholder="Enter contact number" value={this.state.input.phone} onChange={this.handleChange} required></input>
                <div className="text-danger">{this.state.errors.phone}</div>
            </div>

            <div>
                <label for="query">Query:</label>
                <textarea className="con_text" type="text" id="query" name="query" placeholder="Write your query here.." required value={this.state.input.query} onChange={this.handleChange}></textarea>
            </div>

            <input className="con_input" type="submit" value="Submit"></input>
            </form>
            </div>
            </Modal>
        )
    }
}
export default Contact;