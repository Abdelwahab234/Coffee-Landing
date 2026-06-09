"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import AOS from "aos";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Initialize AOS
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });

    // Custom Electron Mouse Logic
    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animationFrameId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      
      if (cursorRing) {
        cursorRing.style.transform = `translate3d(${ringX - 17.5}px, ${ringY - 17.5}px, 0)`;
      }
      
      animationFrameId = requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Timeline Glow Logic
    const onScroll = () => {
      const timeline = document.querySelector(".timeline");
      const progressBar = document.querySelector(".timeline-progress");
      const items = document.querySelectorAll(".timeline-item");
      
      if (timeline && progressBar) {
        const timelineRect = timeline.getBoundingClientRect();
        const timelineTop = timelineRect.top;
        const timelineHeight = timelineRect.height;
        const windowHeight = window.innerHeight;
        
        let progress = (windowHeight / 2 - timelineTop) / timelineHeight;
        progress = Math.max(0, Math.min(1, progress));
        
        progressBar.style.height = `${progress * 100}%`;
        
        items.forEach((item) => {
          const itemRect = item.getBoundingClientRect();
          if (itemRect.top + 10 <= windowHeight / 2) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Custom Electron Mouse */}
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-ring" ref={cursorRingRef}></div>

      {/* Loader */}
      {loading && (
        <div id="loader" className={!loading ? "loaded" : ""}>
          <div className="spinner"></div>
        </div>
      )}

      <header data-aos="fade-down" data-aos-duration="1000">
        <a href="#" className="logo">
          <img src="/img/logo.png" alt="Logo" />
        </a>
        <ul className={`navlist ${isMenuOpen ? "active" : ""}`}>
          <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
          <li><a href="#products" onClick={() => setIsMenuOpen(false)}>Menu</a></li>
          <li><a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a></li>
          <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
        </ul>
        <div className="right-content">
          <div 
            className="bx bx-menu" 
            id="menu-icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          ></div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text" data-aos="fade-right" data-aos-duration="1200">
          <h5>#Coffe for hot days</h5>
          <h1>- Cold Brew</h1>
          <p>Improve your efficiency and lift your mood with a cup of tea in the morning. Tea has a refreshing effect.</p>
          <div className="main-hero">
            <a href="#products" className="btn">Order Now</a>
            <a href="#products" className="price">
              $23.00 | <span>Regular Price</span>
            </a>
          </div>
        </div>
        <div className="hero-image" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
          <img src="/img/hero.png" alt="Hero" />
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-img" data-aos="fade-right" data-aos-duration="1200">
          <img src="/img/about.png" alt="About Us" />
        </div>
        <div className="about-text" data-aos="fade-left" data-aos-duration="1200">
          <h2>Our Story</h2>
          <p>We are passionate about delivering the finest coffee experience. Our beans are carefully selected and roasted to perfection to bring out the rich flavors and aromas that will jumpstart your day. Experience coffee like never before.</p>
          <a href="#" className="btn">Learn More</a>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section" id="features">
        <div className="center-text" data-aos="fade-up" data-aos-duration="1200">
          <h2>Why Our Coffee?</h2>
        </div>
        <div className="timeline">
          <div className="timeline-progress"></div>
          <div className="timeline-item left" data-aos="fade-right" data-aos-duration="1200">
            <div className="timeline-content">
              <h3>100% Premium Arabica</h3>
              <p>We source only the finest Arabica beans for a smooth, complex flavor profile.</p>
            </div>
          </div>
          <div className="timeline-item right" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
            <div className="timeline-content">
              <h3>Freshly Roasted Daily</h3>
              <p>Our beans are roasted every morning to ensure maximum freshness and taste.</p>
            </div>
          </div>
          <div className="timeline-item left" data-aos="fade-right" data-aos-duration="1200" data-aos-delay="400">
            <div className="timeline-content">
              <h3>Rich & Intense Aroma</h3>
              <p>Experience a captivating aroma that will awaken your senses from the first pour.</p>
            </div>
          </div>
          <div className="timeline-item right" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="600">
            <div className="timeline-content">
              <h3>Sustainably Sourced</h3>
              <p>We work closely with farmers to ensure fair trade and sustainable practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products" id="products">
        <div className="center-text" data-aos="fade-up" data-aos-duration="1200">
          <h2>Our Menu</h2>
        </div>
        <div className="products-content">
          <div className="box" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
            <img src="/img/espresso.png" alt="Product" />
            <h3>Hot Espresso</h3>
            <p>A strong and rich shot of coffee.</p>
            <div className="price-box">
              <span>$12.00</span>
              <a href="#" className="btn-small">Add</a>
            </div>
          </div>
          <div className="box" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
            <img src="/img/cold_brew.png" alt="Product" />
            <h3>Cold Brew</h3>
            <p>Smooth, refreshing cold coffee.</p>
            <div className="price-box">
              <span>$15.00</span>
              <a href="#" className="btn-small">Add</a>
            </div>
          </div>
          <div className="box" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
            <img src="/img/hero.png" alt="Product" />
            <h3>Caramel Latte</h3>
            <p>Sweet caramel with creamy milk.</p>
            <div className="price-box">
              <span>$18.00</span>
              <a href="#" className="btn-small">Add</a>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events" id="events">
        <div className="events-text" data-aos="fade-up" data-aos-duration="1200">
          <h2>Upcoming Events</h2>
          <p>Join us for live music, coffee tasting, and community gatherings every weekend. Stay tuned for our special seasonal offers.</p>
          <a href="#" className="btn">View Events</a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="contact-info" data-aos="fade-right" data-aos-duration="1200">
          <h2>Contact Us</h2>
          <p><i className="ri-map-pin-line"></i> 123 Coffee Street, NY</p>
          <p><i className="ri-phone-line"></i> +1 234 567 890</p>
          <p><i className="ri-mail-line"></i> info@coffeemoka.com</p>
        </div>
        <div className="contact-form" data-aos="fade-left" data-aos-duration="1200">
          <form action="">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea name="" id="" cols="30" rows="5" placeholder="Your Message" required></textarea>
            <input type="submit" value="Send Message" className="btn" />
          </form>
        </div>
      </section>
      
      <div className="icons">
        <a href="#"><i className="ri-facebook-fill"></i></a>
        <a href="#"><i className="ri-youtube-fill"></i></a>
        <a href="#"><i className="ri-twitter-x-line"></i></a>
      </div>
      
      <div className="scroll">
        <a href="#about"><i className="ri-scroll-to-bottom-fill"></i>Scroll Down</a>
      </div>
    </>
  );
}
