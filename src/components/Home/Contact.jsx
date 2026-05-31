import React, { useState } from 'react'
import { motion } from "framer-motion"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../CSS/submit.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [buttonClicked, setButtonClicked] = useState(false);

  const WEB3FORMS_ACCESS_KEY = "d50048b3-30f2-4049-8293-9293a8c2b601";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);

    toast("Sending Message...", {
      position: 'top-left',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          ...formData
        }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Message Sent Successfully!", {
          position: 'top-left',
          autoClose: 5000,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(result.message || "Failed to send message.", {
          position: 'top-left',
          autoClose: 5000,
        });
        setButtonClicked(false);
      }
    } catch (err) {
      toast.error("An error occurred.", {
        position: 'top-left',
        autoClose: 5000,
      });
      setButtonClicked(false);
    }
  };

  return (
    <motion.div 
      initial={{ scale: .85 }}
      whileInView={{ scale: 1 }}
      transition={{ delay: .05, duration: .5, type: 'spring', stiffness: 120 }}
      viewport={{ once: true }}
      className='message-form'
    >
      <form className='footer-form' onSubmit={handleSubmit}>
        <div className="input-container">
          <input  
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className="input-field" 
            type="text" 
            required
          />
          <label htmlFor="name" className="input-label">Your name</label>
          <span className="input-highlight"></span>
        </div>
        <div className="input-container">
          <input  
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            className="input-field" 
            type="email" 
            required
          />
          <label htmlFor="email" className="input-label">Your email</label>
          <span className="input-highlight"></span>
        </div>
        <div className="input-container">
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            className="input-field" 
            required
          />
          <label htmlFor="message" className="input-label">Your message</label>
          <span className="input-highlight"></span>
        </div>
        <button 
          className="submit-bt" 
          type="submit"
          style={buttonClicked ? { backgroundColor: 'green' } : {}}
        >
          {buttonClicked ? 'Message Sent' : 'Send Message'}
        </button>
      </form>
      <ToastContainer />
    </motion.div>
  )
}

export default Contact;
