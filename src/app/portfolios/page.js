"use client";

import { useEffect } from 'react';

export default function PortfoliosPage() {
  useEffect(() => {
    const styleId = 'portfolios-page-styles';
    if (document.getElementById(styleId)) return;
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @page {
          size: A4;
          margin: 15mm;
        }

        body {
          font-family: "Garamond", "Georgia", "Times New Roman", serif;
          line-height: 1.6;
          color: #2c2c2c;
          background: #f8f6f3;
          -webkit-font-smoothing: antialiased;
        }

        .page {
          width: 100%;
          max-width: 210mm;
          background: white;
          margin: 0 auto;
          padding: 0;
          position: relative;
        }

        /* Page 1 - Cover */
        .page-1 {
          background: linear-gradient(
            165deg,
            #1a1a1a 0%,
            #3d2f2f 50%,
            #1a1a1a 100%
          );
          color: #f5f5f5;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .page-1::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
              circle at 20% 30%,
              rgba(139, 69, 19, 0.15) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 70%,
              rgba(184, 134, 11, 0.1) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .cover-header {
          padding: 40px 50px 25px;
          border-bottom: 1px solid rgba(218, 165, 32, 0.3);
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
        }

        .cover-header-right {
          margin-left: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .logo-badge {
          display: inline-block;
          background: linear-gradient(
            135deg,
            #8b4513 0%,
            #a0522d 50%,
            #daa520 100%
          );
          padding: 18px 35px;
          border-radius: 25px 25px 25px 5px;
          margin-bottom: 20px;
          box-shadow: 0 15px 40px rgba(218, 165, 32, 0.5);
          position: relative;
          border: 3px solid rgba(218, 165, 32, 0.3);
        }

        .logo-badge::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 15px;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #8b4513, #a0522d);
          border-radius: 0 0 0 15px;
          border-left: 3px solid rgba(218, 165, 32, 0.3);
          border-bottom: 3px solid rgba(218, 165, 32, 0.3);
        }

        .logo-text {
          font-size: 36px;
          font-weight: 700;
          color: white;
          letter-spacing: 2px;
          font-family: "Arial", sans-serif;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .company-title {
          font-size: 42px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 10px;
          color: #daa520;
          font-family: "Arial", sans-serif;
          text-transform: uppercase;
        }

        .website-link {
          display: block;
          color: #daa520;
          text-decoration: none;
          font-size: 16px;
          font-weight: 500;
          margin: 15px 0 10px;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          font-family: "Arial", sans-serif;
        }

        .website-link:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        .company-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 300;
        }

        .cover-content {
          padding: 80px 50px;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cover-title {
          font-size: 68px;
          font-weight: 300;
          letter-spacing: -2px;
          line-height: 1.1;
          margin-bottom: 30px;
          color: #f5f5f5;
          font-family: "Garamond", serif;
        }

        .cover-title strong {
          font-weight: 700;
          color: #daa520;
          display: block;
        }

        .cover-tagline {
          font-size: 19px;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 25px;
          letter-spacing: 6px;
          text-transform: uppercase;
        }

        .cover-description {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.6);
          max-width: 550px;
          margin: 0 auto;
          line-height: 1.8;
          font-style: italic;
        }

        .cover-footer {
          padding: 30px 50px;
          border-top: 1px solid rgba(218, 165, 32, 0.3);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .contact-info-cover {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
        }

        .contact-info-cover strong {
          color: #daa520;
          display: block;
          margin-bottom: 5px;
          letter-spacing: 1px;
        }

        .edition {
          text-align: right;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          font-style: italic;
        }

        /* Page 2 - Portfolio */
        .page-2 {
          padding: 40px 50px;
          background: #fdfcfb;
        }

        .editorial-header {
          text-align: center;
          margin-bottom: 35px;
          padding-bottom: 20px;
          border-bottom: 3px solid #8b4513;
          position: relative;
        }

        .editorial-header::after {
          content: "◆";
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: #fdfcfb;
          padding: 0 15px;
          color: #8b4513;
          font-size: 20px;
        }

        .editorial-title {
          font-size: 46px;
          font-weight: 300;
          letter-spacing: -1px;
          margin-bottom: 12px;
          color: #2c2c2c;
          font-family: "Garamond", serif;
        }

        .editorial-subtitle {
          font-size: 16px;
          color: #666;
          font-style: italic;
          letter-spacing: 1px;
        }

        .portfolio-layout {
          column-count: 2;
          column-gap: 35px;
          margin-bottom: 30px;
        }

        .category-block {
          break-inside: avoid;
          margin-bottom: 25px;
          background: white;
          padding: 22px;
          border-left: 4px solid #8b4513;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
        }

        .category-heading {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e5e5e5;
        }

        .category-icon {
          font-size: 22px;
        }

        .category-name {
          font-size: 18px;
          font-weight: 600;
          color: #2c2c2c;
          letter-spacing: 0.5px;
          font-family: "Arial", sans-serif;
        }

        .project-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .project-link {
          font-size: 14px;
          color: #8b4513;
          text-decoration: underline;
          font-weight: 500;
          padding: 4px 0;
          display: block;
          transition: all 0.2s;
          position: relative;
          padding-left: 15px;
        }

        .project-link::before {
          content: "▸";
          position: absolute;
          left: 0;
          color: #daa520;
          font-size: 12px;
        }

        .project-link:hover {
          color: #2c2c2c;
          padding-left: 20px;
        }

        @media print {
          .project-link::after {
            content: " (" attr(href) ")";
            font-size: 10px;
            color: #666;
            font-weight: normal;
          }
        }

        .badge {
          display: inline-block;
          background: #f5f0e8;
          color: #8b4513;
          padding: 2px 8px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 600;
          margin-left: 6px;
          vertical-align: middle;
          border: 1px solid #daa520;
        }

        /* Page 3 - Projects & Contact */
        .page-3 {
          padding: 40px 50px;
          background: #fdfcfb;
        }

        .featured-section {
          margin-bottom: 35px;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 30px;
        }

        .featured-card {
          background: white;
          padding: 22px;
          border-left: 5px solid #8b4513;
          box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .status-badge {
          display: inline-block;
          background: #2d5016;
          color: white;
          padding: 5px 15px;
          border-radius: 3px;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 15px;
          letter-spacing: 1px;
          font-family: "Arial", sans-serif;
        }

        .featured-title {
          font-size: 18px;
          font-weight: 600;
          color: #2c2c2c;
          margin-bottom: 10px;
          font-family: "Arial", sans-serif;
        }

        .featured-link {
          color: #8b4513;
          text-decoration: underline;
          font-size: 14px;
          font-weight: 500;
        }

        @media print {
          .featured-link::after {
            content: " (" attr(href) ")";
            font-size: 10px;
            color: #666;
            display: block;
            margin-top: 5px;
          }
        }

        .credentials-box {
          background: #f5f0e8;
          padding: 15px;
          border-radius: 5px;
          margin-top: 15px;
          font-size: 13px;
          color: #666;
          border: 1px solid #daa520;
        }

        .apps-showcase {
          margin-bottom: 35px;
        }

        .apps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-top: 25px;
        }

        .app-button {
          background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
          color: white;
          padding: 18px 15px;
          border-radius: 8px;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(139, 69, 19, 0.3);
          font-family: "Arial", sans-serif;
          position: relative;
        }

        .app-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(139, 69, 19, 0.4);
        }

        @media print {
          .app-button {
            page-break-inside: avoid;
          }
          .app-button::after {
            content: attr(href);
            display: block;
            font-size: 9px;
            margin-top: 5px;
            opacity: 0.8;
            font-weight: normal;
          }
        }

        .contact-finale {
          background: linear-gradient(135deg, #2c2c2c 0%, #3d2f2f 100%);
          color: white;
          padding: 35px;
          border-radius: 10px;
          margin-top: 30px;
          position: relative;
          overflow: hidden;
        }

        .contact-finale::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 200px;
          height: 200px;
          background: radial-gradient(
            circle,
            rgba(218, 165, 32, 0.15) 0%,
            transparent 70%
          );
        }

        .contact-finale-title {
          font-size: 34px;
          font-weight: 300;
          text-align: center;
          margin-bottom: 12px;
          letter-spacing: 1px;
          color: #daa520;
          font-family: "Garamond", serif;
        }

        .contact-finale-subtitle {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 28px;
          font-size: 14px;
          font-style: italic;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .contact-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 20px;
          border-radius: 8px;
          border: 1px solid rgba(218, 165, 32, 0.2);
          backdrop-filter: blur(10px);
        }

        .contact-card h4 {
          color: #daa520;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: "Arial", sans-serif;
        }

        .contact-card a {
          color: white;
          text-decoration: none;
          font-size: 14px;
          display: block;
          margin-bottom: 5px;
        }

        .contact-card p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.7;
        }

        .footer-note {
          text-align: center;
          padding: 25px 0 0;
          color: #999;
          font-size: 12px;
          border-top: 1px solid #e5e5e5;
          margin-top: 30px;
          font-style: italic;
        }

        .pdf-note {
          text-align: center;
          padding: 15px;
          background: #fff9e6;
          border: 1px solid #daa520;
          border-radius: 5px;
          margin: 20px 0;
          font-size: 12px;
          color: #8b4513;
        }

        @media print {
          .pdf-note {
            display: block !important;
          }
        }

        @media screen {
          .pdf-note {
            display: none;
          }
        }

        /* Floating Print Button */
        .print-button-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          gap: 15px;
        }

        .print-btn {
          background: linear-gradient(135deg, #8b4513 0%, #a0522d 100%);
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 50px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(139, 69, 19, 0.4);
          transition: all 0.3s ease;
          font-family: "Arial", sans-serif;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .print-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(139, 69, 19, 0.5);
          background: linear-gradient(135deg, #a0522d 0%, #8b4513 100%);
        }

        .print-btn:active {
          transform: translateY(-1px);
        }

        /* Print Styles */
        @media print {
          .print-button-container {
            display: none !important;
          }

          body {
            background: white;
            margin: 0;
            padding: 0;
          }

          .page {
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
            page-break-after: always;
            page-break-inside: avoid;
          }

          .page:last-child {
            page-break-after: auto;
          }

          .page-1 {
            min-height: auto;
          }

          .page-2,
          .page-3 {
            min-height: auto;
          }

          .category-block {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .featured-card {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .portfolio-layout {
            column-count: 2;
            column-gap: 30px;
          }
        }

        @media screen {
          .page {
            box-shadow: 0 0 60px rgba(0, 0, 0, 0.15);
            margin: 10px auto;
          }
        }

        @media screen and (max-width: 768px) {
          .page {
            width: 100%;
            min-height: auto;
            margin: 0;
            box-shadow: none;
          }

          .cover-header {
            flex-direction: column;
            align-items: flex-start;
          }


          .cover-title {
            font-size: 42px;
          }

          .portfolio-layout {
            column-count: 1;
          }

          .featured-grid,
          .apps-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .print-button-container {
            bottom: 15px;
            right: 15px;
          }

          .print-btn {
            padding: 12px 20px;
            font-size: 13px;
          }
        }
    `;
    document.head.appendChild(style);
    
    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <>
      {/* PAGE 1: COVER */}
      <div className="page page-1" suppressHydrationWarning>
        <div className="cover-header">
          <div className="logo-badge">
            <span className="logo-text">K₹AMATRIX</span>
          </div>
          <div className="cover-header-right">
            <a
              href="https://www.kramatrix.com"
              className="website-link"
              target="_blank"
              rel="noreferrer"
            >
              www.kramatrix.com
            </a>
            <p className="company-subtitle">Technology &amp; Innovation</p>
          </div>
        </div>

        <div className="cover-content">
          <h2 className="cover-title">
            You Dream It.
            <strong>We Code It.</strong>
          </h2>
          <p className="cover-tagline">Design • Build • Deliver</p>
          <p className="cover-description">
            Crafting exceptional digital experiences through cutting-edge AI
            Agents, Intelligent Automation, Web Applications &amp; Bespoke
            Software Solutions
          </p>
        </div>

        <div className="cover-footer">
          <div className="contact-info-cover">
            <strong>Connect With Us</strong>
            +91 72910 56360
            <br />
            info@kramatrix.com
          </div>
          <div className="edition">
            Portfolio Edition
            <br />
            2026
          </div>
        </div>
      </div>

      {/* PAGE 2: PORTFOLIO */}
      <div className="page page-2">
        <div className="pdf-note">
          📌 <strong>Note:</strong> All website links are clickable in the
          digital version. Visit <strong>www.kramatrix.com</strong> for the
          interactive portfolio.
        </div>

        <div className="editorial-header">
          <h2 className="editorial-title">Our Portfolio</h2>
          <p className="editorial-subtitle">
            A curated collection of excellence across industries
          </p>
        </div>

        <div className="portfolio-layout">
          <div className="category-block">
            <div className="category-heading">
              <span className="category-icon">🏥</span>
              <h3 className="category-name">Health &amp; Wellness</h3>
            </div>
            <div className="project-list">
              <a href="https://watchibia.com/" className="project-link">
                watchibia.com
              </a>
              <a
                href="https://swissfoodnutritionvalley.com/"
                className="project-link"
              >
                swissfoodnutritionvalley.com
              </a>
              <a href="https://dr-gross.de/" className="project-link">
                dr-gross.de
              </a>
              <a href="https://vitalityplus.app/" className="project-link">
                vitalityplus.app
              </a>
              <a href="https://www.helicap.com" className="project-link">
                helicap.com
              </a>
              <a href="https://www.mesh.ai/" className="project-link">
                mesh.ai
              </a>
              <a
                href="https://www.anjalishah.life/"
                className="project-link"
              >
                anjalishah.life{" "}
                <span className="badge">Psychologist &amp; Life Coach</span>
              </a>
              <a
                href="https://holisticwomensretreat.com/"
                className="project-link"
              >
                holisticwomensretreat.com
              </a>
              <a href="https://www.sharniquinn.com" className="project-link">
                sharniquinn.com
              </a>
            </div>
          </div>

          <div className="category-block">
            <div className="category-heading">
              <span className="category-icon">✈️</span>
              <h3 className="category-name">Aviation Technology</h3>
            </div>
            <div className="project-list">
              <a href="https://cirrusaircraft.com/" className="project-link">
                cirrusaircraft.com
              </a>
              <a
                href="https://www.pilatus-aircraft.com"
                className="project-link"
              >
                pilatus-aircraft.com
              </a>
              <a
                href="https://www.jobyaviation.com"
                className="project-link"
              >
                jobyaviation.com
              </a>
            </div>
          </div>

          <div className="category-block">
            <div className="category-heading">
              <span className="category-icon">🛍️</span>
              <h3 className="category-name">E-Commerce &amp; Retail</h3>
            </div>
            <div className="project-list">
              <a href="https://kisna.com" className="project-link">
                kisna.com
              </a>
              <a
                href="https://www.stylemycar.in"
                className="project-link"
              >
                stylemycar.in
              </a>
              <a href="https://watches.ae/" className="project-link">
                watches.ae
              </a>
              <a href="https://pothysmart.com/" className="project-link">
                pothysmart.com
              </a>
              <a href="https://www.hotcarshop.in" className="project-link">
                hotcarshop.in
              </a>
              <a href="https://www.parterra.watch" className="project-link">
                parterra.watch
              </a>
              <a href="https://www.merarang.com" className="project-link">
                merarang.com
              </a>
              <a
                href="https://www.maisonette.com/"
                className="project-link"
              >
                maisonette.com <span className="badge">Ruby on Rails</span>
              </a>
              <a
                href="https://www.threadless.com"
                className="project-link"
              >
                threadless.com
              </a>
              <a
                href="https://www.fashiontofigure.com"
                className="project-link"
              >
                fashiontofigure.com
              </a>
              <a href="https://charkhatales.com" className="project-link">
                charkhatales.com{" "}
                <span className="badge">Clothing</span>
              </a>
              <a
                href="https://www.thalieparis.com"
                className="project-link"
              >
                thalieparis.com <span className="badge">Luxury</span>
              </a>
              <a href="https://thinkempire.com/" className="project-link">
                thinkempire.com
              </a>
              <a
                href="https://www.lelabofragrances.com"
                className="project-link"
              >
                lelabofragrances.com
              </a>
              <a href="https://www.spanx.com" className="project-link">
                spanx.com
              </a>
            </div>
          </div>

          <div className="category-block">
            <div className="category-heading">
              <span className="category-icon">🍽️</span>
              <h3 className="category-name">Food &amp; Hospitality</h3>
            </div>
            <div className="project-list">
              <a
                href="https://www.sweetgreen.com"
                className="project-link"
              >
                sweetgreen.com
              </a>
              <a
                href="https://www.choptsalad.com"
                className="project-link"
              >
                choptsalad.com
              </a>
              <a
                href="https://www.naturesbasket.co.in"
                className="project-link"
              >
                naturesbasket.co.in
              </a>
              <a
                href="https://www.theoldfashionedcocktailco.com"
                className="project-link"
              >
                theoldfashionedcocktailco.com
              </a>
              <a
                href="https://www.theliquidcaterers.com"
                className="project-link"
              >
                theliquidcaterers.com
              </a>
            </div>
          </div>

          <div className="category-block">
            <div className="category-heading">
              <span className="category-icon">💼</span>
              <h3 className="category-name">Business &amp; Enterprise</h3>
            </div>
            <div className="project-list">
              <a href="https://linc.lu/" className="project-link">
                linc.lu
              </a>
              <a href="https://arambh.co/" className="project-link">
                arambh.co
              </a>
              <a href="https://www.fleetx.io" className="project-link">
                fleetx.io
              </a>
              <a
                href="https://www.marketdesk.com"
                className="project-link"
              >
                marketdesk.com
              </a>
              <a href="https://cedehub.io/" className="project-link">
                cedehub.io
              </a>
              <a href="https://www.agilisium.com" className="project-link">
                agilisium.com
              </a>
              <a
                href="https://www.diversityleague.pro"
                className="project-link"
              >
                diversityleague.pro
              </a>
              <a href="https://xnumbers.io/" className="project-link">
                xnumbers.io <span className="badge">eSIM</span>
              </a>
              <a href="https://zynnon.com/" className="project-link">
                zynnon.com
              </a>
              <a
                href="https://www.teamohana.com"
                className="project-link"
              >
                teamohana.com{" "}
                <span className="badge">Technology</span>
              </a>
            </div>
          </div>

          <div className="category-block">
            <div className="category-heading">
              <span className="category-icon">🏠</span>
              <h3 className="category-name">
                Real Estate &amp; Property
              </h3>
            </div>
            <div className="project-list">
              <a
                href="https://www.hometriangle.com/"
                className="project-link"
              >
                hometriangle.com
              </a>
              <a
                href="https://www.shrubbrealty.com"
                className="project-link"
              >
                shrubbrealty.com
              </a>
              <a href="https://www.redfin.com" className="project-link">
                redfin.com
              </a>
              <a
                href="https://www.chennaiproperties.in"
                className="project-link"
              >
                chennaiproperties.in
              </a>
              <a href="https://ma.green-acres.com" className="project-link">
                green-acres.com
              </a>
            </div>
          </div>

          <div className="category-block">
            <div className="category-heading">
              <span className="category-icon">💰</span>
              <h3 className="category-name">Finance &amp; Accounting</h3>
            </div>
            <div className="project-list">
              <a
                href="https://www.studiopapaleo.it/"
                className="project-link"
              >
                studiopapaleo.it{" "}
                <span className="badge">Chartered Accountants</span>
              </a>
              <a
                href="https://www.tceadvisor.com"
                className="project-link"
              >
                tceadvisor.com{" "}
                <span className="badge">Business Services</span>
              </a>
              <a href="https://ownesim.com" className="project-link">
                ownesim.com
              </a>
              <a
                href="https://www.yourloanadvisors.com"
                className="project-link"
              >
                yourloanadvisors.com
              </a>
              <a href="https://www.zeusatm.ch" className="project-link">
                zeusatm.ch
              </a>
              <a href="https://www.aquiso.at/" className="project-link">
                aquiso.at
              </a>
              <a href="https://linktr.ee/" className="project-link">
                linktr.ee
              </a>
              <a href="https://fosterkids.in/" className="project-link">
                fosterkids.in
              </a>
              <a
                href="https://www.cliniindia.com/"
                className="project-link"
              >
                cliniindia.com
              </a>
              <a href="https://faristeam.com/" className="project-link">
                faristeam.com
              </a>
              <a href="https://www.archer.com" className="project-link">
                archer.com
              </a>
            </div>
          </div>

          <div className="category-block">
            <div className="category-heading">
              <span className="category-icon">🌍</span>
              <h3 className="category-name">
                Global Partner Collaborations
              </h3>
            </div>
            <div className="project-list">
              <a
                href="https://www.lkw-walter.com"
                className="project-link"
              >
                lkw-walter.com
              </a>
              <a href="https://www.notino.si" className="project-link">
                notino.si{" "}
                <span className="badge">
                  Developed for our partner agency from Poland
                </span>
              </a>
              <a href="https://kletterling.de/" className="project-link">
                kletterling.de{" "}
                <span className="badge">
                  Developed for our partner agency from Poland
                </span>
              </a>
              <a href="https://www.wee-bot.com" className="project-link">
                wee-bot.com{" "}
                <span className="badge">
                  Developed for our partner agency from France
                </span>
              </a>
              <a
                href="https://www.de-mulders.com"
                className="project-link"
              >
                de-mulders.com{" "}
                <span className="badge">
                  Developed for our partner agency from Poland
                </span>
              </a>
              <a
                href="https://semicircle-basel.com/"
                className="project-link"
              >
                semicircle-basel.com
              </a>
              <a href="https://wider-sa.ch/" className="project-link">
                wider-sa.ch
              </a>
              <a href="https://mayd-hamburg.com/" className="project-link">
                mayd-hamburg.com
              </a>
              <a href="https://www.lott.de" className="project-link">
                lott.de
              </a>
              <a href="https://tasreeh.ae/en/" className="project-link">
                tasreeh.ae
              </a>
              <a href="https://newleveldubai.com" className="project-link">
                newleveldubai.com
              </a>
              <a href="https://newlevelegypt.com" className="project-link">
                newlevelegypt.com
              </a>
              <a
                href="https://www.lelabofragrances.com"
                className="project-link"
              >
                lelabofragrances.com
              </a>
              <a href="https://www.spanx.com" className="project-link">
                spanx.com
              </a>
            </div>
          </div>

          <div className="category-block">
            <div className="category-heading">
              <span className="category-icon">🎨</span>
              <h3 className="category-name">Creative</h3>
            </div>
            <div className="project-list">
              <a href="https://www.igloo.inc" className="project-link">
                igloo.inc
              </a>
              <a href="https://www.pudgypenguins.com" className="project-link">
                pudgypenguins.com
              </a>
              <a href="https://mayd-hamburg.com/" className="project-link">
                mayd-hamburg.com
              </a>
              <a
                href="https://www.lelabofragrances.com"
                className="project-link"
              >
                lelabofragrances.com
              </a>
              <a
                href="https://www.thalieparis.com"
                className="project-link"
              >
                thalieparis.com
              </a>
            </div>
          </div>

          <div className="category-block">
            <div className="category-heading">
              <span className="category-icon">✨</span>
              <h3 className="category-name">More Projects</h3>
            </div>
            <div className="project-list">
              <a href="https://www.flocus.pro/" className="project-link">
                flocus.pro
              </a>
              <a href="https://www.ipowerup.com/" className="project-link">
                ipowerup.com
              </a>
              <a href="https://www.rei-cameroon.com/" className="project-link">
                rei-cameroon.com
              </a>
              <a href="https://www.goireland.in/" className="project-link">
                goireland.in
              </a>
              <a href="https://www.crowe.com/ie" className="project-link">
                crowe.com/ie
              </a>
              <a href="https://chargeconstruct.de/" className="project-link">
                chargeconstruct.de
              </a>
              <a
                href="https://www.backerskeie.com/"
                className="project-link"
              >
                backerskeie.com
              </a>
              <a href="https://www.oruphones.com/" className="project-link">
                oruphones.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* PAGE 3: PROJECTS & CONTACT */}
      <div className="page page-3">
        <div className="apps-showcase">
          <div className="editorial-header">
            <h2 className="editorial-title">Mobile Applications</h2>
            <p className="editorial-subtitle">
              iOS &amp; Android development excellence
            </p>
          </div>

          <div className="apps-grid">
            <a
              href="https://apps.apple.com/us/app/maisonette/id1607354539"
              className="app-button"
            >
              📱 Maisonette iOS
            </a>
            <a
              href="https://apps.apple.com/us/app/linktree-link-in-bio-creator/id1593515263"
              className="app-button"
            >
              🔗 Linktree iOS
            </a>
            <a
              href="https://apps.apple.com/in/app/hometriangle/id6444316720"
              className="app-button"
            >
              🏠 HomeTriangle iOS
            </a>
            <a
              href="https://apps.apple.com/us/app/kitchenpal-shared-grocery-list/id1084982489"
              className="app-button"
            >
              🍳 KitchenPal iOS
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=fashion.soni"
              className="app-button"
            >
              👗 Fashion Soni
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.oruphones.oru"
              className="app-button"
            >
              📱 OruPhones
            </a>
          </div>
        </div>

        <div className="featured-section">
          <div className="editorial-header">
            <h2 className="editorial-title">Ongoing Projects</h2>
            <p className="editorial-subtitle">
              Currently live and making an impact
            </p>
          </div>

          <div className="featured-grid">
            <div className="featured-card">
              <span className="status-badge">● LIVE</span>
              <h4 className="featured-title">
                Custom LLM Business Platform
              </h4>
              <a
                href="https://test.mundibusiness.com/"
                className="featured-link"
              >
                test.mundibusiness.com →
              </a>
            </div>

            <div className="featured-card">
              <span className="status-badge">● LIVE</span>
              <h4 className="featured-title">HiHomie CRM System</h4>
              <a
                href="https://hihomie.vercel.app/"
                className="featured-link"
              >
                hihomie.vercel.app →
              </a>
              <div className="credentials-box">
                <strong>Demo Access:</strong> admin@hihomie.es / 123456
              </div>
            </div>

            <div className="featured-card">
              <span className="status-badge">● LIVE</span>
              <h4 className="featured-title">Cyber Thrust (Webflow)</h4>
              <a
                href="https://cyber-thrust-webflow.webflow.io/"
                className="featured-link"
              >
                View Project →
              </a>
            </div>

            <div className="featured-card">
              <span className="status-badge">● LIVE</span>
              <h4 className="featured-title">Tasreeh Landing Page</h4>
              <a href="#" className="featured-link">
                Figma Prototype →
              </a>
              <div className="credentials-box">
                <strong>Access Code:</strong> Tasreeh123
              </div>
            </div>
          </div>
        </div>

        <div className="contact-finale">
          <h3 className="contact-finale-title">Get In Touch</h3>
          <p className="contact-finale-subtitle">
            Ready to turn your dream into reality? Let&apos;s create something
            extraordinary together.
          </p>

          <div className="contact-grid">
            <div className="contact-card">
              <h4>🌐 Website</h4>
              <a href="https://www.kramatrix.com">www.kramatrix.com</a>
            </div>

            <div className="contact-card">
              <h4>📧 Email</h4>
              <a href="mailto:info@kramatrix.com">info@kramatrix.com</a>
              <a href="mailto:sales@kramatrix.com">sales@kramatrix.com</a>
            </div>

            <div className="contact-card">
              <h4>📞 Phone &amp; WhatsApp</h4>
              <a href="tel:+917291056360">+91 72910 56360</a>
            </div>

            <div className="contact-card">
              <h4>📍 Address</h4>
              <p>KRAMatrix, New Delhi, INDIA</p>
            </div>
          </div>
        </div>

        <div className="footer-note">
          <p>© 2026 KRAMatrix. Crafted with precision and passion.</p>
        </div>
      </div>

      
    </>
  );
}

