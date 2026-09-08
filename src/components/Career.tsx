import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Marketing Design Lead</h4>
                <h5>Ahearn &amp; Soper Inc.</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Own marketing design end-to-end for a Canadian enterprise technology integrator.
              Design and build conversion-focused Webflow landing pages, Meta/Google/LinkedIn paid
              ad campaigns, motion graphics, and multi-channel partner launches for Zebra, Honeywell,
              Epson, and Canon.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Brand &amp; Digital Designer</h4>
                <h5>Independent Practice</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Develop complete visual identities, responsive Webflow websites, and high-impact ad
              creative for service-based businesses, SaaS, and ecommerce brands with agile
              turnarounds and conversion-first thinking.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Motion Designer &amp; Faculty</h4>
                <h5>Animation &amp; Commercial Design</h5>
              </div>
              <h3>2018</h3>
            </div>
            <p>
              Produced branding, promotional graphics, motion graphics, and commercial video.
              Taught typography, layout, composition, and animation workflows, grounding deep
              creative execution in visual fundamentals.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Design &amp; Animation</h4>
                <h5>Seneca College &amp; LCC</h5>
              </div>
              <h3>EDU</h3>
            </div>
            <p>
              Advanced Diploma in Graphic Design (3-year program) from Seneca College (Toronto),
              and Diploma in Animation and Film Editing (2-year program) from LCC Computer Education (India).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
