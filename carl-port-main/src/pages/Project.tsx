/* data */
import { ProjectData } from "../data/ProjectData"
/* components */
import PageTitle from "../components/PageTitle"
import RetroCardImage from "../components/RetroPixelUI/RetroCardImage"
/* images */
import PotionSlot from '../assets/rpgui/img/icons/potion-slot.png'
import Potion from '../assets/rpgui/img/icons/potion-red.png'

const Project = () => {
  return (
    <section id="projects" className="min-h-screen">
      <div className="p-3">
        <PageTitle image1={PotionSlot} image2={Potion} title="Projects" />
        <div className="mt-3">

          <div className={`grid gap-6 mb-8 grid-cols-1 mt-3 sm:grid-cols-2 lg:grid-cols-3`}>
            {ProjectData.map((project) => (
              <RetroCardImage key={project.id} data={project} />
            ))}

            <div className='flex items-center justify-center text-center'>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl sm:text-3xl tracking-wider text-[#e0ffe3] mb-2.5 animate-pulse"
                  style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.6)' }}>Coming Soon</h1>
                <i className="nes-kirby"></i>
              </div>
            </div>

            <div className='flex items-center justify-center text-center'>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl sm:text-3xl tracking-wider text-[#e0ffe3] mb-2.5 animate-pulse"
                  style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.6)' }}>Coming Soon</h1>
                <i className="nes-mario"></i>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Project