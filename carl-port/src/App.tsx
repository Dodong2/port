import { lazy, Suspense } from "react"

const MainPage = lazy(() => import("./pages/MainPage"))

const App = () => {
  return (
    <>
      <Suspense fallback={"loading"}>
        <MainPage/>
      </Suspense>
    </>
  )
}

export default App