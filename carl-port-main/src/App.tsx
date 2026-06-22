/* react-router-dom */
import { lazy, Suspense, useRef} from 'react'
/* react-router-dom */
/* css */
import './App.css'
/* components */
import FirstPageLoader from './components/loadings/FirstPageLoader'
import SampleLoader from './components/loadings/SampleLoading'
// import { AnimatedGridBackground } from './components/AnimatedGridBackground'
import MainBackground from './components/MainBackground'
import MainContainer from './components/MainContainer'
/* context */
import { ScrollContainerContext } from './context/ScrollContainerContext'

/* pages */
const MainPage = lazy(() => import('./pages/MainPage'))

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  
  return (
    <>
      {/* <AnimatedGridBackground /> */}
      <MainBackground />
      <FirstPageLoader/>
      <ScrollContainerContext.Provider value={scrollContainerRef as React.RefObject<HTMLDivElement>}>
        <MainContainer ref={scrollContainerRef}>
          <Suspense fallback={<SampleLoader />}>
            <MainPage />
          </Suspense>
        </MainContainer>
      </ScrollContainerContext.Provider>
    </>
  )
}

export default App
