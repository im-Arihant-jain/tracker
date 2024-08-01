import React from "react";
import { useNavigate } from "react-router-dom";
import { Animate } from "react-simple-animate";
import "./styles.scss";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigateToContactMePage = () => {
    window.open("https://arihantportfolio.vercel.app/", '_blank');
  };

  return (
    <section id="home" className="home">
      <div className="home__text-wrapper">
      <h1>
  Welcome to the Ultimate
  <br />
  <div className="break-on-small">
    <div>Expense tracking platform </div>
  </div>
</h1> 
<ul className="home__bullet-points">
          <li>Track your expenses effortlessly with filters</li>
          <li>Generate detailed reports</li>
          <li>Manage your budget efficiently</li>
          <li>Get real-time best product updates</li>
          <li>View profiles of others</li>
          <li>Share Reviews, have fun</li>
        </ul>
      </div>
      <Animate
        play
        duration={1}
        delay={1}
        start={{
          transform: "translateY(550px)",
        }}
        end={{
          transform: "translatex(0px)",
        }}
      >
        <div className="home__contact-me">
          <button onClick={handleNavigateToContactMePage}>CONNECT WITH </button>
        </div>
      </Animate>
    </section>
  );
};
export default Home;
