import { forwardRef, type ReactNode } from 'react'

interface MainContainerProps {
  children: ReactNode
}

const MainContainer = forwardRef<HTMLDivElement, MainContainerProps>(({ children }, ref) => {
  return (
    <div ref={ref} className="fixed inset-0 overflow-y-auto overflow-x-hidden z-10">
      {children}
    </div>
  )
}
)

MainContainer.displayName = 'MainContainer'

export default MainContainer