import './AgeCalculator.css';
import "@fontsource/poppins";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/800-italic.css";
import { useState } from 'react';




export default function AgeCalculator() {
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)

  function validate() {
    const newErrors = {}
    const currentYear = new Date().getFullYear()

    if (!day) {
      newErrors.day = "This field is required"
    } else if (day < 1 || day > 31) {
      newErrors.day = "Must be a valid day"
    }

    if (!month) {
      newErrors.month = "This field is required"
    } else if (month < 1 || month > 12) {
      newErrors.month = "Must be a valid month"
    }

    if (!year) {
      newErrors.year = "This field is required"
    } else if (year > currentYear) {
      newErrors.year = "Must be in the past"
    }

    return newErrors
  }

  function handleSubmit() {
    const foundErrors = validate()

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors)
      return
    }

    setErrors({})
    const today = new Date()
    const birthDate = new Date(year, month - 1, day)

    let years = today.getFullYear() - birthDate.getFullYear()
    let months = today.getMonth() - birthDate.getMonth()
    let days = today.getDate() - birthDate.getDate()

    if (days < 0) {
      months--
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    setResult({ years, months, days })
    console.log(years, months, days)


  }

  return (
    <>
      <div className='card'>
        <div className='inputs'>
          <div className='field'>
            <label htmlFor="day" className={errors.day ? "labelError" : ""}>DAY</label>
            <input
              type="number"
              id="day"
              placeholder="DD"
              value={day}
              className={errors.day ? "inputError" : ""}
              onChange={(e) => {
                setDay(e.target.value)
                setErrors(prev => ({ ...prev, day: "" }))
              }}
            />
            {errors.day && <span className='errorMsg'>{errors.day}</span>}
          </div>
          <div className='field'>
            <label htmlFor="month" className={errors.month ? "labelError" : ""}>MONTH</label>
            <input type="number"
              id="month"
              placeholder="MM"
              value={month}
              className={errors.month ? "inputError" : ""}
              onChange={(e) => {
                setMonth(e.target.value)
                setErrors(prev => ({ ...prev, month: "" }))
              }}
            />
            {errors.month && <span className='errorMsg'>{errors.month}</span>}
          </div>
          <div className='field'>
            <label htmlFor="year" className={errors.year ? "labelError" : ""}>YEAR</label>
            <input type="number"
              id="year"
              placeholder="YYYY"
              value={year}
              className={errors.year ? "inputError" : ""}
              onChange={(e) => {
                setYear(e.target.value)
                setErrors(prev => ({ ...prev, year: "" }))
              }}
            />
            {errors.year && <span className='errorMsg'>{errors.year}</span>}
          </div>
        </div>

        <div className="divider">
          <button onClick={handleSubmit}><img src="arrow.svg" alt="" /></button>
        </div>

        <div className="results">
          <div className="result">
            <span className='number'>{result ? result.years : "--"}</span>
            <span className='label'>years</span>
          </div>
          <div className="result">
            <span className='number'>{result ? result.months : "--"}</span>
            <span className='label'>months</span>
          </div>
          <div className="result">
            <span className='number'>{result ? result.days : "--"}</span>
            <span className='label'>days</span>
          </div>
        </div>
      </div>
    </>
  )
}