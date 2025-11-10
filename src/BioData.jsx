import React, { useState, useRef } from "react";
// 1. Import EmailJS library
import emailjs from '@emailjs/browser'; 

// 🎨 Define Styles Object (Styles remain the same)
const styles = {

  container: {
    fontFamily: 'Roboto, sans-serif',
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  header: {
    textAlign: 'center',
    color: '#1a202c', 
    marginBottom: '30px',
    fontWeight: '700',
    fontSize: '1.8rem',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#4a5568', 
  },
  
  // *** FIX APPLIED HERE ***
  input: {
    width: '100%',
    padding: '12px',
    // Replaced border: '1px solid #e2e8f0' with long-form properties
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#e2e8f0', // Base border color
    borderRadius: '8px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  
  // This now only overrides the single property (borderColor) cleanly
  inputFocus: {
    borderColor: '#4299e1', // Blue on focus
    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    outline: 'none',
  },
  
  button: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#3182ce', 
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '700',
    transition: 'background-color 0.3s, transform 0.1s',
    marginTop: '10px',
  },
  buttonHover: {
    backgroundColor: '#2b6cb0', 
  },
  
  // *** FIX APPLIED HERE ***
  submittedDataContainer: {
    marginTop: '30px',
    padding: '20px',
    // Replaced border: '1px solid #48bb78'
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#48bb78', // Green border
    borderRadius: '8px',
    backgroundColor: '#f0fff4', 
  },
  
  // *** FIX APPLIED HERE ***
  submittedHeader: {
    color: '#38a169', 
    fontSize: '1.5rem',
    // Replaced borderBottom: '1px solid #48bb78'
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: '#48bb78',
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  dataText: {
    margin: '8px 0',
    color: '#1a202c',
  },

// ... (your styles object remains here)
// Added for response messages
  statusMessage: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: '600',
  },
  success: {
    backgroundColor: '#d4edda', // Light green
    color: '#155724',           // Dark green text
  },
  error: {
    backgroundColor: '#f8d7da', // Light red
    color: '#721c24',           // Dark red text
  }
};

function BioDataDisplay() {
  // Use a ref to access the form element for EmailJS
  const formRef = useRef();

  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  
  // State to handle input focus for dynamic styling
  const [focus, setFocus] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  // State to store and display the submitted biodata
  const [submittedData, setSubmittedData] = useState(null);

  // State for EmailJS status
  const [status, setStatus] = useState({ message: '', type: '' }); // type: 'success' or 'error'

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setStatus({ message: 'Sending...', type: '' });
    const SERVICE_ID = 'service_80tvnbi'; // <--- Your Service ID
    const TEMPLATE_ID = 'template_pvxgri9'; // <--- Check your EmailJS template list
    const PUBLIC_KEY = '-i9xBHelnF9E7u3zA'; // <--- Check your EmailJS Account settings
    // 2. Use EmailJS to send the form data
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        
        // Success: Set submitted data and show success message
        const data = {
          fullName: `${firstName} ${lastName}`,
          age: age,
          email: email,
          city: city,
        };
        setSubmittedData(data);
        setStatus({ message: 'Data successfully submitted and email sent!', type: 'success' });

        // Optional: Clear form fields after submission
        setFirstName("");
        setLastName("");
        setAge("");
        setEmail("");
        setCity("");

      }, (error) => {
        console.log(error.text);
        // Error: Show error message
        setStatus({ message: 'Failed to send data/email. Please try again.', type: 'error' });
      });
  };

  // Helper function to dynamically merge styles based on focus
  const getInputStyle = (name) => ({
    ...styles.input,
    ...(focus[name] ? styles.inputFocus : {})
  });
  
  // Helper function to get status message style
  const getStatusStyle = () => {
      if (status.type === 'success') {
          return { ...styles.statusMessage, ...styles.success };
      }
      if (status.type === 'error') {
          return { ...styles.statusMessage, ...styles.error };
      }
      return styles.statusMessage;
  };


  return (
    <div style={styles.container}>
      {!submittedData && (
        <>
        <h1 style={styles.header}>Bio Data Collection</h1>

      {/* 3. Attach the ref to the form */}
      <form onSubmit={handleSubmit} ref={formRef}>
        
        {/* First Name Input - IMPORTANT: Add name attribute for EmailJS */}
        <div style={styles.formGroup}>
          <label htmlFor="firstName" style={styles.label}>First Name :</label>
          <input
            id="firstName"
            type="text"
            name="firstName" // <--- REQUIRED for EmailJS to map data to your template
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={() => setFocus({...focus, firstName: true})}
            onBlur={() => setFocus({...focus, firstName: false})}
            style={getInputStyle('firstName')}
            required
          />
        </div>

        {/* Last Name Input - IMPORTANT: Add name attribute for EmailJS */}
        <div style={styles.formGroup}>
          <label htmlFor="lastName" style={styles.label}>Last Name :</label>
          <input
            id="lastName"
            type="text"
            name="lastName" // <--- REQUIRED for EmailJS
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onFocus={() => setFocus({...focus, lastName: true})}
            onBlur={() => setFocus({...focus, lastName: false})}
            style={getInputStyle('lastName')}
            required
          />
        </div>

        {/* Age Input - IMPORTANT: Add name attribute for EmailJS */}
        <div style={styles.formGroup}>
          <label htmlFor="age" style={styles.label}>Age :</label>
          <input
            id="age"
            type="number"
            name="age" // <--- REQUIRED for EmailJS
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onFocus={() => setFocus({...focus, age: true})}
            onBlur={() => setFocus({...focus, age: false})}
            style={getInputStyle('age')}
            required
          />
        </div>

        {/* Email Input - IMPORTANT: Add name attribute for EmailJS */}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email :</label>
          <input
            id="email"
            type="email"
            name="email" // <--- REQUIRED for EmailJS
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocus({...focus, email: true})}
            onBlur={() => setFocus({...focus, email: false})}
            style={getInputStyle('email')}
            required
          />
        </div>

        {/* City Input - IMPORTANT: Add name attribute for EmailJS */}
        <div style={styles.formGroup}>
          <label htmlFor="city" style={styles.label}>City :</label>
          <input
            id="city"
            type="text"
            name="city" // <--- REQUIRED for EmailJS
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setFocus({...focus, city: true})}
            onBlur={() => setFocus({...focus, city: false})}
            style={getInputStyle('city')}
            required
          />
        </div>
        
        {/* Submit Button */}
        <div>
          <button 
            type="submit"
            style={isHovered ? {...styles.button, ...styles.buttonHover} : styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={status.message === 'Sending...'}
          >
            {status.message === 'Sending...' ? 'Sending...' : 'Submit Bio Data'}
          </button>
        </div>

      </form>
        </>
      )}

      {/* Display EmailJS Status Message */}
      {status.message && status.type && (
          <div style={getStatusStyle()}>
              {status.message}
          </div>
      )}

      {/* Conditional Display of Submitted Data */}
      {submittedData && status.type === 'success' && (
        <div style={styles.submittedDataContainer}>
          <h2 style={styles.submittedHeader}>Submitted</h2>
          <p style={styles.dataText}><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p style={styles.dataText}><strong>Age:</strong> {submittedData.age}</p>
          <p style={styles.dataText}><strong>Email:</strong> {submittedData.email}</p>
          <p style={styles.dataText}><strong>City:</strong> {submittedData.city}</p>
        </div>
      )}
    </div>
  );
}

export default BioDataDisplay;

