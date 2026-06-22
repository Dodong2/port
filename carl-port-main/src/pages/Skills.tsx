/* data */
import { SkillsData } from '../data/SkillsData'
/* components */
import PageTitle from '../components/PageTitle'
import RetroCardText from '../components/RetroPixelUI/RetroCardText'
/* images */
import WeaponSlot from '../assets/rpgui/img/icons/weapon-slot.png'
import Sword from '../assets/rpgui/img/icons/sword.png'

const Skills = () => {
  return (
    <section id="skills" className="min-h-screen">
      <div className="p-3">
        <PageTitle image1={WeaponSlot} image2={Sword} title={'Skills'} />

        <div className={`grid gap-6 mb-8 grid-cols-1 mt-3 sm:grid-cols-2 lg:grid-cols-3`}>
          {SkillsData.map((skill) => (
            <RetroCardText key={skill.id} data={skill} />
          ))}

          <div className='flex items-center justify-center text-center'>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl tracking-wider text-[#e0ffe3] mb-2.5 animate-pulse"
                style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.6)' }}>Coming Soon</h1>
              <i className="nes-pokeball"></i>
            </div>
          </div>

          <div className='flex items-center justify-center text-center'>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl sm:text-3xl tracking-wider text-[#e0ffe3] mb-2.5 animate-pulse"
                style={{ textShadow: '4px 4px 0 rgba(0,0,0,0.6)' }}>Coming Soon</h1>
              <i className="nes-ash"></i>
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}

export default Skills