import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { useGSAP } from "@gsap/react";

function App() {
  const [showContent, setShowContent] = useState(false);
  const [showSvg, setShowSvg] = useState(true);
  const [showBottomNav, setShowBottomNav] = useState(true);

  const middleRef = useRef(null);

  useEffect(() => {
    const timeln = gsap.timeline();
    timeln
      .to(".vi-mask-group", {
        rotate: 10,
        duration: 2,
        ease: "Power4.easeInOut",
        transformOrigin: "50% 50%",
      })
      .to(".vi-mask-group", {
        scale: 10,
        duration: 2,
        delay: -1.8,
        ease: "Expo.easeInOut",
        transformOrigin: "50% 50%",
        opacity: 0,
        onUpdate: function () {
          if (this.progress() >= 0.9) {
            setShowSvg(false);
            setShowContent(true);
            this.kill();
          }
        },
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBottomNav(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (middleRef.current) observer.observe(middleRef.current);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    if (!showContent) return;
    gsap.to(".main", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });
    gsap.to(".sky", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".bg", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });
    gsap.to(".character", {
      scale: 0.9,
      x: "-55%",
      rotate: 0,
      duration: 2,
      delay: "-0.8",
      ease: "Expo.easeInOut",
    });

    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
      gsap.to(".imagediv .text", {
        x: `${-30 - xMove * 0.1}%`,
      });
      gsap.to(".imagediv .sky", {
        x: xMove,
      });
      gsap.to(".imagediv .bg", {
        x: xMove,
      });
    });
  }, [showContent]);

  return (
    <>
      {showSvg && (
        <div className="svg fixed top-0 left-0 z-[100] w-full h-full overflow-hidden bg-black">
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <mask id="viMask">
                <rect width="100%" height="100%" fill="black" />
                <g className="vi-mask-group">
                  <text
                    x="50%"
                    y="40%"
                    fontSize="250"
                    textAnchor="middle"
                    fill="white"
                    dominantBaseline="middle"
                    fontFamily="Arial Black"
                  >
                    VI
                  </text>
                </g>
              </mask>
            </defs>
            <image
              xlinkHref="./bg.png"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              mask="url(#viMask)"
            />
          </svg>
        </div>
      )}

      {showContent && (
        <div className="main w-full bg-black rotate-[-10deg] scale-[1.7]">
          <div className="landing w-full h-screen relative bg-black">
            <div className="navbar w-full absolute z-[100] px-30 py-6 h-20 flex gap-3">
              <div className="lines flex flex-col gap-1">
                <div className="line1 w-10 h-1 bg-white"></div>
                <div className="line2 w-7 h-1 bg-white"></div>
                <div className="line3 w-5 h-1 bg-white"></div>
              </div>
              <div className="logo text-3xl text-white -my-3 ">ROCKSTAR</div>
            </div>

            <div className="imagediv relative w-full h-full overflow-hidden">
              <img
                className="sky absolute scale-[1.7] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt="Sky"
              />
              <img
                className="bg absolute scale-[1.8] rotate-[-3deg] top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt="Background"
              />
              <div className="text text-[10rem] leading-none absolute left-1/2 top-10 -translate-x-1/4 text-white">
                <h1 className="-ml-60">grand</h1>
                <h1 className="-ml-10">theft</h1>
                <h1 className="ml-60">auto</h1>
              </div>
              <img
                className="character absolute bottom-[-50%] left-1/2 -translate-x-1/2 scale-[2] rotate-[-10deg]"
                src="./girlbg.png"
                alt="Character"
              />
            </div>

            {showBottomNav && (
              <div className="bottomNav absolute bottom-0 w-full py-10 px-10 bg-gradient-to-t from-black to-transparent flex gap-2 justify-center z-50">
                <i className="ri-arrow-down-line text-white text-2xl"></i>
                <div className="scrolldown text-white font-sans font-medium text-lg">
                  Scroll Down
                </div>
                <img className="h-[45px] ml-auto" src="./ps5.png" alt="PS5" />
              </div>
            )}
          </div>

          <div
            ref={middleRef}
            className="middle w-full min-h-screen flex justify-center items-center bg-black py-20 px-10"
          >
            <img className="w-1/2" src="./imag.png" alt="" />
            <div className="text-white w-1/3 flex flex-col gap-10">
              <div>
                <h1 className="text-5xl">Vice City Returns.</h1>
                <h1 className="text-5xl">The Rules Have Changed</h1>
              </div>
              <p className="font-sans text-lg">
                GTA 6 is the next major installment in the Grand Theft Auto
                series, set in a fictional version of Miami known as Vice City.
                The game will feature two main characters, including the first
                female protagonist in the franchise, and focus on a modern-day
                storyline involving crime, relationships, and survival in a
                world shaped by social and economic challenges.
              </p>
              <div className="text-white text-4xl flex bg-yellow-600 w-1/2 p-4 text-center justify-center items-center hover:bg-yellow-700">
                <h1>Download Now</h1>
              </div>
            </div>
          </div>

          <div className=" requirements bottom-0  relative px-20 h-screen w-full">
            <div className="flex justify-center items-center gap-10 translate-x-20">
              <div className="text-white flex  justify-center item-center flex-col gap-5">
                <h1 className="text-5xl text-yellow-600">PC Requirements of GTA 6</h1>
                <div className="flex gap-5 font-sans justify-around items-center">
                  <div className=" text-lg">
                    <h1 className="font-bold text-2xl text-yellow-600">Components</h1>
                    <h1>CPU</h1>
                    <h1>OS</h1>
                    <h1>Memory</h1>
                    <h1>DirectX</h1>
                    <h1>GPU</h1>
                    <h1>Storage</h1>
                  </div>
                  <div className="text-lg">
                    <h1 className="font-bold text-2xl text-yellow-600">
                      Minimum System Rquirements:
                    </h1>
                    <p>Intel Core i7 8700K/AMD Ryzen 7 3700x</p>
                    <p>Window 10/11</p>
                    <p>8GB RAM</p>
                    <p>Version 12</p>
                    <p>Nvidia Geforce GTX 1080Ti/AMD Radeon Rx5700XT</p>
                    <p>150GB Solid State Drive</p>
                  </div>
                  <div className="text-lg">
                    <h1 className="font-bold text-2xl text-yellow-600">
                      Recommended System Rquirements:
                    </h1>
                    <p>Intel Core i9 10900kK/AMD Ryzen 5 5900x</p>
                    <p>Window 11 64-bit</p>
                    <p>32GB RAM</p>
                    <p>Version 12</p>
                    <p>Nvidia Geforce GTX 3080/AMD Radeon Rx6800XT</p>
                    <p>150GB NVMe SSD</p>
                  </div>
                </div>
              </div>
              <div>
                <img src="./logo18.png" className=" w-[65%]" />
              </div>
            </div>
          </div>






        </div>
      )}
    </>
  );
}

export default App;
