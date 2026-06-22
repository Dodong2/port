/* Data */
import { HomeData } from "../data/HomeData"
/* components */
import RetroContainer from "../components/RetroPixelUI/RetroContainer"
import RetroCircleImage from "../components/RetroPixelUI/RetroCircleImage"
import RetroButton from "../components/RetroPixelUI/RetroButton"
import RetroModal from "../components/RetroPixelUI/RetroModal"
/* hooks */
import { useHome } from "../hooks/useHome"
import { useRetroModal } from "../hooks/useRetroModal"
/* page */
import BotPage from "./BotPage"

const Home = () => {
  const { showResume, displayedText, showContinue, handleContinue } = useHome()
  const { read, openModal, closeModal, animate } = useRetroModal()

  return (
    <section id="home" className="min-h-screen">
      {HomeData.map((home) => (
        <div className="flex flex-col items-center justify-center p-5 mt-40 lg:gap-4 lg:flex-row" key={home.id}>
          <div className="grid md:gap-0 sm:gap-0 lg:gap-1">
            <RetroCircleImage
              size="lg"
              variant="glitch"
              src={home.image}
              alt="Ryu"
              badge="WARRIOR"
            />
            {showResume && (
              <RetroButton color="red" onClick={openModal}>{home.buttonLabels[0].label}</RetroButton>
            )}
          </div>

          <div>
            <RetroContainer size="lg" title="Carl">
              <div className="text-xs leading-relaxed sm:text-sm md:text-base">
                {displayedText}
                {!showContinue && <span className="animate-pulse">▌</span>}
              </div>
              <div className="flex justify-end mt-1">
                {showContinue && !showResume && (
                  <button className="relative animate-pulse" onClick={handleContinue}>
                    <span className="absolute -top-1/14 -left-5">▶</span><span className="text-center">{home.buttonLabels[1].label}</span>
                  </button>
                )}
              </div>
            </RetroContainer>
          </div>

          {read && (
            <RetroModal onClose={closeModal} animate={animate} size="lg">
              <div className="w-full max-h-[90vh] overflow-auto">
                {/* Download button */}
                <div className="sticky z-10 flex justify-center top-5 ">
                  <RetroButton
                    color="red"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = home.resumePDF;
                      link.download = 'Carl_Stephen_Arocha_Resume.pdf';
                      link.click();
                    }}
                  >
                    DOWNLOAD
                  </RetroButton>
                </div>

                {/* Image container - perfectly centered */}
                <div className="relative p-4 mt-5 overflow-auto">
                  <div className="mb-3 text-sm text-center text-yellow-400">
                    Pinch to zoom on mobile / Use browser zoom on desktop
                  </div>

                  {/* High-res image container */}
                  <div className="flex items-center justify-center">
                    <img
                      src={home.resume}
                      alt="Resume Preview"
                      loading="lazy"
                      decoding="async"
                      className="w-full max-w-[1200px] h-auto cursor-zoom-in"
                      style={{
                        imageRendering: '-webkit-optimize-contrast',
                        filter: 'contrast(1.05) brightness(1.02)',
                        backfaceVisibility: 'hidden',
                      }}
                      onClick={() => {
                        // Open image in new tab for manual zoom
                        window.open(home.resume, '_blank');
                      }}
                    />
                  </div>
                </div>

              </div>
            </RetroModal>
          )}
        </div>
      ))}

      <BotPage/>

    </section>
  )
}

export default Home