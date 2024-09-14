import React, { useEffect } from "react";
import "./Home.css";
import BG3 from "../../assets/BG/FG.png";
import Grid from "../../assets/BG/Grid.png";
import LOGO from "../../components/3D_Logo/3DLogo";
import Navigation from "../../components/Navigation/Navigation";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <Navigation />
            {/* <img src={BG3} alt="Background" /> */}

            <div className="overlay">
                <div className="home-box">
                    <div className="home-box-1">
                        <div className="home-box-text">
                            <h1>AthleX AI</h1>
                            <h2>FOR COACHES,</h2>
                            <h2>BY <span>AI</span></h2>
                        </div>
                    </div>
                    <div className="home-box-2">
                        <LOGO />
                    </div>
                </div>
            </div>
            <div className="grid">
                <img src={Grid} alt="Grid" />
            </div>
        </div>
    );
}
