import { useState, useEffect } from 'react'
import styles from './ContactForm.module.css';



export default function ContactForm() {
  const [firstName, setFirstName] = useState(``)
  const [lastName, setLastName] = useState(``)
  const [email, setEmail] = useState(``)
  const [message, setMessage] = useState("")
  const [queryType, setQueryType] = useState(``)
  const [consent, setConsent] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isSubmitted])

  function validate() {
    const newErrors = {}


    if (!firstName) newErrors.firstName = "This field is required"
    if (!lastName) newErrors.lastName = "This field is required"
    if (!email || !email.includes("@")) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!queryType) newErrors.queryType = "Please select a query type"
    if (!message) newErrors.message = "This field is required"
    if (!consent) newErrors.consent = "To submit this form, please consent to being contacted"

    return newErrors
  }

  function handleSubmit() {
    const foundErrors = validate()


    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      return
    }


    setErrors({})
    setIsSubmitted(true)
    console.log("Gönderilen veriler:", {
      firstName,
      lastName,
      email,
      queryType,
      message,
      consent
    })
    setFirstName("")
    setLastName("")
    setEmail("")
    setMessage("")
    setQueryType("")
    setConsent(false)
  }

  return (
    <div className={styles.page}>
      {isSubmitted && (
        <div className={styles.success}>
          <p className={styles.successTitle}>✓ Message Sent!</p>
          <p className={styles.successText}>Thanks for completing the form. We'll be in touch soon!</p>
          <div className={styles.successData}>
            <p>{firstName} {lastName}</p>
            <p>{email}</p>
            <p>{queryType}</p>
            <p>{message}</p>
          </div>
        </div>
      )}
      <div className={styles.card}>
        <h1 className={styles.title}>Contact Us</h1>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>First Name <span className={styles.required}>*</span></label>
            <input
              type="text"
              className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Last Name <span className={styles.required}>*</span></label>
            <input type="text"
              className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} />
            {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email Address <span className={styles.required}>*</span></label>
          <input type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span className={styles.error}>{errors.email}</span>}

        </div>

        <div className={styles.field}>
          <label className={styles.label}>Query Type <span className={styles.required}>*</span></label>
          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input type="radio"
                name="query"
                value="general"
                onChange={(e) => setQueryType(e.target.value)} /> General Enquiry
            </label>
            <label className={styles.radioOption}>
              <input type="radio"
                name="query"
                value="support"
                onChange={(e) => setQueryType(e.target.value)} /> Support Request
            </label>
          </div>
          {errors.queryType && <span className={styles.error}>{errors.queryType}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Message <span className={styles.required}>*</span></label>
          <textarea
            className={`${styles.textarea} ${errors.message ? styles.inputError : ""}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)} />
          {errors.message && <span className={styles.error}>{errors.message}</span>}
        </div>

        <div className={styles.checkboxRow}>
          <div className={styles.checkboxInner}>
            <input type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)} />
            <label htmlFor="consent">
              I consent to being contacted by the team <span className={styles.required}>*</span>
            </label>
          </div>
          {errors.consent && <span className={styles.error}>{errors.consent}</span>}
        </div>



        <button className={styles.submitBtn} onClick={handleSubmit} >Submit</button>
      </div>
    </div>
  );
}