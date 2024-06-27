import React, { useState } from 'react';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    POSTED_BY: 'Owner', // Default value to prevent empty string
    UNDER_CONSTRUCTION: false,
    RERA: false,
    BHK_NO: 1,
    BHK_OR_RK: 'BHK', // Default value to prevent empty string
    SQUARE_FT: '',
    READY_TO_MOVE: false,
    RESALE: false,
    LONGITUDE: '',
    LATITUDE: '',
    TARGET: '' // Assuming TARGET is not used for prediction, otherwise handle it properly
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert values to appropriate types
    const formattedData = {
      ...formData,
      POSTED_BY: formData.POSTED_BY === 'Owner' ? 0 : formData.POSTED_BY === 'Dealer' ? 1 : 2, // Example encoding
      UNDER_CONSTRUCTION: formData.UNDER_CONSTRUCTION ? 1 : 0,
      RERA: formData.RERA ? 1 : 0,
      BHK_NO: parseInt(formData.BHK_NO, 10),
      BHK_OR_RK: formData.BHK_OR_RK === 'BHK' ? 0 : 1, // Assuming 'BHK' is 0 and 'RK' is 1
      SQUARE_FT: parseFloat(formData.SQUARE_FT),
      READY_TO_MOVE: formData.READY_TO_MOVE ? 1 : 0,
      RESALE: formData.RESALE ? 1 : 0,
      LONGITUDE: parseFloat(formData.LONGITUDE.trim()),
      LATITUDE: parseFloat(formData.LATITUDE.trim())
    };

    console.log('Formatted data:', formattedData);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error('Failed to get prediction from API');
      }

      const data = await response.json();
      console.log('Prediction:', data.prediction);

    } catch (error) {
      console.error('Error predicting price:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        POSTED_BY:
        <select name="POSTED_BY" value={formData.POSTED_BY} onChange={handleChange}>
          <option value="Owner">Owner</option>
          <option value="Dealer">Dealer</option>
          <option value="Builder">Builder</option>
        </select>
      </label>
      <br />
      <label>
        UNDER_CONSTRUCTION:
        <input
          type="checkbox"
          name="UNDER_CONSTRUCTION"
          checked={formData.UNDER_CONSTRUCTION}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        RERA:
        <input
          type="checkbox"
          name="RERA"
          checked={formData.RERA}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        BHK_NO:
        <input
          type="number"
          name="BHK_NO"
          value={formData.BHK_NO}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        BHK_OR_RK:
        <select name="BHK_OR_RK" value={formData.BHK_OR_RK} onChange={handleChange}>
          <option value="BHK">BHK</option>
          <option value="RK">RK</option>
        </select>
      </label>
      <br />
      <label>
        SQUARE_FT:
        <input
          type="text"
          name="SQUARE_FT"
          value={formData.SQUARE_FT}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        READY_TO_MOVE:
        <input
          type="checkbox"
          name="READY_TO_MOVE"
          checked={formData.READY_TO_MOVE}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        RESALE:
        <input
          type="checkbox"
          name="RESALE"
          checked={formData.RESALE}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        LONGITUDE:
        <input
          type="text"
          name="LONGITUDE"
          value={formData.LONGITUDE}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        LATITUDE:
        <input
          type="text"
          name="LATITUDE"
          value={formData.LATITUDE}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Predict Price</button>
    </form>
  );
};

export default PredictionForm;
