import { useState } from 'react'

import PageLoader from './PageLoader'

const FirstPageLoader = () => {
    const [showInitialLoader, setShowInitialLoader] = useState(true)

    const handleLoaderComplete = () => {
        setShowInitialLoader(false)
    }

    return (
        <>
            {showInitialLoader && (
                <PageLoader minLoadTime={5000} onComplete={handleLoaderComplete} />
            )}
        </>
    )
}

export default FirstPageLoader