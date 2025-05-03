import React, { Fragment } from "react";
import moment from "moment";

const Footer = () => {
  return (
    <Fragment>
      <footer style={{ backgroundColor: "#2874f0", color: "white", padding: "40px 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
          <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "15px" }}>About Us</h3>
            <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
              Welcome to our shop! We are committed to providing the best products and services to our customers. Enjoy seamless shopping experience with us.
            </p>
          </div>
          <div style={{ flex: "1 1 150px", marginBottom: "20px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "15px" }}>Help</h3>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "14px", lineHeight: "1.8" }}>
              <li><a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact Us</a></li>
              <li><a href="/faq" style={{ color: "white", textDecoration: "none" }}>FAQ</a></li>
              <li><a href="/shipping" style={{ color: "white", textDecoration: "none" }}>Shipping</a></li>
              <li><a href="/returns" style={{ color: "white", textDecoration: "none" }}>Returns</a></li>
            </ul>
          </div>
          <div style={{ flex: "1 1 150px", marginBottom: "20px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "15px" }}>Policies</h3>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "14px", lineHeight: "1.8" }}>
              <li><a href="/privacy" style={{ color: "white", textDecoration: "none" }}>Privacy Policy</a></li>
              <li><a href="/terms" style={{ color: "white", textDecoration: "none" }}>Terms of Use</a></li>
              <li><a href="/security" style={{ color: "white", textDecoration: "none" }}>Security</a></li>
            </ul>
          </div>
          <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "15px" }}>Connect with Us</h3>
            <div style={{ display: "flex", gap: "15px", fontSize: "20px" }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }} aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-.5 0-1 .5-1 1v2h3l-.5 3h-2.5v7A10 10 0 0 0 22 12z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }} aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.3 3.9A12.14 12.14 0 0 1 3.15 4.6a4.28 4.28 0 0 0 1.32 5.7 4.27 4.27 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.44 4.2 4.3 4.3 0 0 1-1.93.07 4.28 4.28 0 0 0 4 3 8.6 8.6 0 0 1-5.3 1.83A8.7 8.7 0 0 1 2 18.57a12.14 12.14 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 22.46 6z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }} aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "white" }} aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8a2.5 2.5 0 0 0-.02-4.5zM3 9h4v12H3zM9 9h3.6v1.71h.05c.5-.95 1.72-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.75V21H16v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9z"/></svg>
              </a>
            </div>
          </div>
          <div style={{ flex: "1 1 200px", marginBottom: "20px" }}>
            <h3 style={{ fontWeight: "bold", marginBottom: "15px" }}>Download Our App</h3>
            <div style={{ display: "flex", gap: "10px" }}>
              <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play Store"
                  style={{ height: "40px" }}
                />
              </a>
              <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store"
                  style={{ height: "40px" }}
                />
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.3)", marginTop: "30px", paddingTop: "20px", fontSize: "14px", textAlign: "center" }}>
          Develop & Design Aditya25k © Copyright {moment().format("YYYY")}
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
