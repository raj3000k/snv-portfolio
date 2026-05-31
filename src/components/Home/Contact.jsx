import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const WEB3FORMS_ACCESS_KEY = "d50048b3-30f2-4049-8293-9293a8c2b601";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
        setIsSuccess(true);
        toast.success("Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.05, duration: 0.5, type: 'spring' }}
      viewport={{ once: true }}
      className="message-form"
    >
      <form className="footer-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            type="text"
            required
          />
          <label htmlFor="name" className="input-label">Your Name</label>
        </div>
        
        <div className="input-container">
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
            type="email"
            required
          />
          <label htmlFor="email" className="input-label">Your Email</label>
        </div>
        
        <div className="input-container">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="input-field"
            required
          />
          <label htmlFor="message" className="input-label">Your Message</label>
        </div>
        
        <button
          className="submit-bt"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : (isSuccess ? 'Message Sent!' : 'Send Message')}
        </button>
      </form>
      <ToastContainer theme="dark" position="bottom-right" />
    </motion.div>
  );
};

export default Contact;
