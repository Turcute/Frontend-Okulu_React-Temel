import { useState } from 'react';
import './NewsletterForm.css';
import "@fontsource/roboto";

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [errors, setErrors] = useState({})
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const [isSubmitted, setIsSubmitted] = useState(false)

  function validate() {
    const newErrors = {}

    if (!email || !emailRegex.test(email)) {
      newErrors.email = "Valid email required"
    }


    return newErrors
  }

  function handleSubmit() {
    const foundErrors = validate()

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      return
    }

    setIsSubmitted(true)
    console.log("Gonderilen email:", email)
  }

  return (
    <>
      {isSubmitted ? (
        <div className='success'>
          <img className='success-img' src="ok.svg" alt="" />
          <h1>Thanks for subscribing!</h1>
          <p>A confirmation email has been sent to <span>{email}</span>. Please open it and click the button inside to confirm your subscription.</p>
          <button onClick={() => setIsSubmitted(false)}>Dismiss message</button>
        </div>
      ) : (
        <div className='card'>
          <div className='left'>
            <h1>Stay updated!</h1>
            <p>Join 60,000+ product managers receiving monthly updates on:</p>
            <ul>
              <li>
                <img src="correct.svg" alt="" />
                <span>Product discovery and building what matters</span>
              </li>
              <li>
                <img src="correct.svg" alt="" />
                <span>Measuring to ensure updates are a success</span>
              </li>
              <li>
                <img src="correct.svg" alt="" />
                <span>And much more!</span>
              </li>
            </ul>
            <div className='inputWrapper'>
              <label htmlFor="email" className={errors.email ? 'label labelError' : "label"}>Email address</label>
              {errors.email && <span className='error'>{errors.email}</span>}
            </div>
            <input type="email"
              className={errors.email ? 'input inputError' : "input"}
              placeholder='email@company.com'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setErrors({})
              }}
            />
            <button onClick={handleSubmit}>Subscribe to monthly newsletter</button>
          </div>
          <div className='right'>
            <img className="desktop-img" src="Scale.png" alt="" />
            <img className="mobile-img" src="rank-mobile.png" alt="" />
          </div>
        </div>
      )}
    </>
  )
}


