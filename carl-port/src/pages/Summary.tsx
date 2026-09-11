import { useEffect, useRef, useState } from "react";
import { summaryData } from "../data/Summary";
import Profile from "../components/summary/Profile";
import IconCircle from "../components/summary/IconCircle";
import IndicatorWrapper from "../components/summary/IndicatorWrapper";

import { FaCode } from "react-icons/fa";
import { VscDeveloperTools } from "react-icons/vsc";
import { IoPerson } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";

const SECTIONS = [
  { id: "landing", icon: IoPerson, title: "Home" },
  { id: "skills", icon: FaCode, title: "Skills" },
  { id: "projects", icon: VscDeveloperTools, title: "Projects" },
  { id: "contacts", icon: BsFillTelephoneFill, title: "Contact" },
];

const Summary = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.findIndex(
              (el) => el === entry.target,
            );
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: null, threshold: 0.5 },
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const progress = activeIndex / (SECTIONS.length - 1);

  return (
    <div className="flex-1 grid grid-cols-[auto_1fr] gap-4 sm:gap-10 min-h-0 overflow-y-auto">
      {/* left */}
      <div className="sticky top-0 relative flex flex-col items-center justify-around h-screen py-2">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 bg-[#474747] -z-10 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-green-500 transition-all duration-500 ease-in-out"
            style={{ height: `${progress * 100}%` }}
          ></div>
        </div>

        {SECTIONS.map((section, idx) => (
          <div key={section.id} className="contents">
            {idx === 0 ? (
              <>
                <div className="hidden sm:block">
                  <IndicatorWrapper
                    active={activeIndex === idx}
                    lineWidthClass="w-[calc(1rem+2px)] sm:w-[calc(2.5rem+2px)]"
                  >
                    <Profile
                      src={summaryData[0].image}
                      alt="profile"
                      sizeClass="w-24 h-24 md:w-32 md:h-32 lg:w-[150px] lg:h-[150px]"
                      active={activeIndex === idx}
                    />
                  </IndicatorWrapper>
                </div>
                <div className="block sm:hidden">
                  <IndicatorWrapper
                    active={activeIndex === idx}
                    lineWidthClass="w-[calc(1rem+2px)]"
                  >
                    <IconCircle
                      icon={section.icon}
                      sizeClass="w-8 h-8"
                      iconSizeClass="text-2xl"
                      bgColor="bg-[#1f1f1f] border-2 border-[#474747]"
                      iconColor="text-[#383838]"
                      active={activeIndex === idx}
                    />
                  </IndicatorWrapper>
                </div>
              </>
            ) : (
              <IndicatorWrapper
                active={activeIndex === idx}
                lineWidthClass="w-[calc(1rem+2px)] sm:w-[calc(2.5rem+2px)]"
              >
                <IconCircle
                  icon={section.icon}
                  sizeClass="w-8 h-8 sm:w-11 sm:h-11"
                  iconSizeClass="text-sm sm:text-xl"
                  bgColor="bg-[#1f1f1f] border-2 border-[#474747]"
                  iconColor="text-[#383838]"
                  active={activeIndex === idx}
                />
              </IndicatorWrapper>
            )}
          </div>
        ))}
      </div>

      {/* right */}
      <div className="flex flex-col">
        {SECTIONS.map((section, idx) => (
          <div
            key={section.id}
            ref={(el) => {
              sectionRefs.current[idx] = el;
            }}
            className="h-screen flex items-center justify-center border-1 border-green-700"
          >
            <h1 className="text-4xl sm:text-6xl font-bold">{section.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
