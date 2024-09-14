import React from "react"
import "./Home.css"
import BG from "../../assets/BG/football pitch.jpg"
import BG2 from "../../assets/BG/footballmain.jpeg"
import LOGO from "../../components/3D_Logo/3DLogo"
import BG3 from "../../assets/BG/FG.png"
import Grid from "../../assets/BG/Grid.png"

export default function Home(){
    return(
        <div className="home">
            {/* <img src={BG3} /> */}
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
                    <LOGO/>
                </div>
                </div>
            </div>
            <div className="grid">
                <img src={Grid}/>
            </div>
        </div>
    )
}