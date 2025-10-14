function Contact() {
  return (
    <div className="container contact-container">
      <div className="contact-card text-light">
        <h2 className="mb-4 text-center fw-bold">Contact Me</h2>
        <div className="d-flex flex-column align-items-center gap-3">
          <h4>Name: Bagwan Shoaib Abdul Rehman</h4>
          <h4>
            Email: 
            <a 
              href="mailto:shoaibbagwn727@gmail.com" 
              className="contact-link"
            >
              shoaibbagwn727@gmail.com
            </a>
          </h4>
          <h4>
            Mobile: 
            <a 
              href="tel:+918669018078" 
              className="contact-link"
            >
              8669018078
            </a>
          </h4>
          <h4>
            LinkedIn: 
            <a 
              href="https://www.linkedin.com/in/shoaib-bagwan-525691201/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-link"
            >
              Click me
            </a>
          </h4>
        </div>
      </div>
    </div>
  )
}

export default Contact;
