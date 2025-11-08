import React, { useState } from "react";

// 🎨 Define Styles Object for a clean, modern look
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
    color: '#1a202c', // Dark text color
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
    color: '#4a5568', // Medium dark gray
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #e2e8f0', // Light border
    borderRadius: '8px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  inputFocus: {
    borderColor: '#4299e1', // Blue on focus
    boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#3182ce', // Primary Blue
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
    backgroundColor: '#2b6cb0', // Darker blue on hover
  },
  submittedDataContainer: {
    marginTop: '30px',
    padding: '20px',
    border: '1px solid #48bb78', // Green border
    borderRadius: '8px',
    backgroundColor: '#f0fff4', // Light green background
  },
  submittedHeader: {
    color: '#38a169', // Success green
    fontSize: '1.5rem',
    borderBottom: '1px solid #48bb78',
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  dataText: {
    margin: '8px 0',
    color: '#1a202c',
  }
};

function BioDataDisplay() {
  // State for form inputs (using individual states for clarity here)
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

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const data = {
      fullName: `${firstName} ${lastName}`,
      age: age,
      email: email,
      city: city,
    };
    
    setSubmittedData(data);
    // Optional: Clear form fields after submission
    setFirstName("");
    setLastName("");
    setAge("");
    setEmail("");
    setCity("");
  };

  // Helper function to dynamically merge styles based on focus
  const getInputStyle = (name) => ({
    ...styles.input,
    ...(focus[name] ? styles.inputFocus : {})
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>👤 Bio Data Collection</h1>

      <form onSubmit={handleSubmit}>
        
        {/* First Name Input */}
        <div style={styles.formGroup}>
          <label htmlFor="firstName" style={styles.label}>First Name :</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onFocus={() => setFocus({...focus, firstName: true})}
            onBlur={() => setFocus({...focus, firstName: false})}
            style={getInputStyle('firstName')}
            required
          />
        </div>

        {/* Last Name Input */}
        <div style={styles.formGroup}>
          <label htmlFor="lastName" style={styles.label}>Last Name :</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onFocus={() => setFocus({...focus, lastName: true})}
            onBlur={() => setFocus({...focus, lastName: false})}
            style={getInputStyle('lastName')}
            required
          />
        </div>

        {/* Age Input */}
        <div style={styles.formGroup}>
          <label htmlFor="age" style={styles.label}>Age :</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onFocus={() => setFocus({...focus, age: true})}
            onBlur={() => setFocus({...focus, age: false})}
            style={getInputStyle('age')}
            required
          />
        </div>

        {/* Email Input */}
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email :</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocus({...focus, email: true})}
            onBlur={() => setFocus({...focus, email: false})}
            style={getInputStyle('email')}
            required
          />
        </div>

        {/* City Input */}
        <div style={styles.formGroup}>
          <label htmlFor="city" style={styles.label}>City :</label>
          <input
            id="city"
            type="text"
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
          >
            Submit Bio Data
          </button>
        </div>

      </form>

      {/* Conditional Display of Submitted Data */}
      {submittedData && (
        <div style={styles.submittedDataContainer}>
          <h2 style={styles.submittedHeader}>✅ Submitted Bio Data</h2>
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




// import React, { useState } from "react";

// function BioDataDisplay() {
//   // State for form inputs
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [age, setAge] = useState("");
//   const [email, setEmail] = useState("");
//   const [city, setCity] = useState("");

//   // State to store and display the submitted biodata
//   const [submittedData, setSubmittedData] = useState(null);

//   /**
//    * Handles the form submission:
//    * 1. Prevents the default form submission behavior.
//    * 2. Creates an object with all the current state values.
//    * 3. Updates the submittedData state to display the information.
//    * @param {Event} e - The form submission event.
//    */
//   const handleSubmit = (e) => {
//     e.preventDefault(); 

//     const data = {
//       fullName: `${firstName} ${lastName}`,
//       age: age,
//       email: email,
//       city: city,
//     };
    
//     setSubmittedData(data);
//     // You could also clear the form fields here if desired:
//     // setFirstName("");
//     // setLastName("");
//     // setAge("");
//     // setEmail("");
//     // setCity("");
//   };


//   return (

//     <div>
//       <h1>👤 Bio Data Collection</h1>

//       <form onSubmit={handleSubmit}>
        
//         {/* First Name Input */}
//         <div>
//           <label htmlFor="firstName">First Name :</label>
//           <input
//             id="firstName"
//             type="text"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Last Name Input */}
//         <div>
//           <label htmlFor="lastName">Last Name :</label>
//           <input
//             id="lastName"
//             type="text"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Age Input */}
//         <div>
//           <label htmlFor="age">Age :</label>
//           <input
//             id="age"
//             type="number" // Use type="number" for age
//             value={age}
//             onChange={(e) => setAge(e.target.value)}
//             required
//           />
//         </div>

//         {/* Email Input */}
//         <div>
//           <label htmlFor="email">Email :</label>
//           <input
//             id="email"
//             type="email" // Use type="email" for email validation
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         {/* City Input */}
//         <div>
//           <label htmlFor="city">City :</label>
//           <input
//             id="city"
//             type="text"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             required
//           />
//         </div>
        
//         {/* Submit Button */}
//         <div>
//           <button type="submit">Submit Bio Data</button>
//         </div>

//       </form>

//       <hr />

//       {/* Conditional Display of Submitted Data */}
//       {submittedData && (
//         <div className="submitted-data">
//           <h2>✅ Submitted Bio Data</h2>
//           <p><strong>Full Name:</strong> {submittedData.fullName}</p>
//           <p><strong>Age:</strong> {submittedData.age}</p>
//           <p><strong>Email:</strong> {submittedData.email}</p>
//           <p><strong>City:</strong> {submittedData.city}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default BioDataDisplay;