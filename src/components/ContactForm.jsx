import styles from './ContactForm.module.css';



export default function ContactForm() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Contact Us</h1>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>First Name <span className={styles.required}>*</span></label>
            <input type="text" className={styles.input} />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Last Name <span className={styles.required}>*</span></label>
            <input type="text" className={styles.input} />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email Address <span className={styles.required}>*</span></label>
          <input type="email" className={styles.input} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Query Type <span className={styles.required}>*</span></label>
          <div className={styles.radioGroup}>
            <label className={styles.radioOption}>
              <input type="radio" name="query" value="general" /> General Enquiry
            </label>
            <label className={styles.radioOption}>
              <input type="radio" name="query" value="support" /> Support Request
            </label>
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Message <span className={styles.required}>*</span></label>
          <textarea className={styles.textarea} />
        </div>

        <div className={styles.checkboxRow}>
          <input type="checkbox" id="consent" />
          <label htmlFor="consent">
            I consent to being contacted by the team <span className={styles.required}>*</span>
          </label>
        </div>

        <button className={styles.submitBtn}>Submit</button>
      </div>
    </div>
  );
}