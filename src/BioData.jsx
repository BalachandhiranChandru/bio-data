import React, { useState } from "react";

function BioDataDisplay() {
  // State for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  // State to store and display the submitted biodata
  const [submittedData, setSubmittedData] = useState(null);

  /**
   * Handles the form submission:
   * 1. Prevents the default form submission behavior.
   * 2. Creates an object with all the current state values.
   * 3. Updates the submittedData state to display the information.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); 

    const data = {
      fullName: `${firstName} ${lastName}`,
      age: age,
      email: email,
      city: city,
    };
    
    setSubmittedData(data);
    // You could also clear the form fields here if desired:
    // setFirstName("");
    // setLastName("");
    // setAge("");
    // setEmail("");
    // setCity("");
  };


  return (

    <div>
      <h1>👤 Bio Data Collection</h1>

      <form onSubmit={handleSubmit}>
        
        {/* First Name Input */}
        <div>
          <label htmlFor="firstName">First Name :</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        {/* Last Name Input */}
        <div>
          <label htmlFor="lastName">Last Name :</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        {/* Age Input */}
        <div>
          <label htmlFor="age">Age :</label>
          <input
            id="age"
            type="number" // Use type="number" for age
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email">Email :</label>
          <input
            id="email"
            type="email" // Use type="email" for email validation
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* City Input */}
        <div>
          <label htmlFor="city">City :</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        
        {/* Submit Button */}
        <div>
          <button type="submit">Submit Bio Data</button>
        </div>

      </form>

      <hr />

      {/* Conditional Display of Submitted Data */}
      {submittedData && (
        <div className="submitted-data">
          <h2>✅ Submitted Bio Data</h2>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>City:</strong> {submittedData.city}</p>
        </div>
      )}
    </div>
  );
}

export default BioDataDisplay;