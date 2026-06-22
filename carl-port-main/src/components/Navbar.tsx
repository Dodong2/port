import { Circle, Square, Triangle, X } from "lucide-react"

import { useNavbar } from "../hooks/useNavbar"


const Navbar = () => {
    const { showController, showNav, toggleController, scrollTo } = useNavbar()

    return (
        <>
            <div className={`fixed top-0 left-0 w-full z-20 transition-transform duration-300 ${showNav ? "translate-y-0" : "-translate-y-full"}`}>
                <div className="p-2 bg-[rgba(85,85,85,0.9)]">
                    <div className="flex items-center justify-between">
                        <div className="text-white">Carl Arocha</div>
                        <i className="transition-transform duration-75 snes-jp-logo active:scale-75" onClick={toggleController}></i>
                    </div>
                </div>
            </div>

            {/* controller */}
            {/* -bottom-10/1 */}
            {showController && (
                <div className="fixed z-30 transform -translate-x-1/2 bottom-5 left-1/2">
                    <div className="bg-white nes-container with-title is-centered is-rounded ">
                        <p className="title">controller</p>
                        <div>
                            {/* home */}
                            <div className="flex items-center justify-center">
                                <div className="flex justify-center items-center w-12 h-12 bg-[#212529] rounded-full overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-75" onClick={() => scrollTo("home")}>
                                    <Triangle className="text-green-400" />
                                </div>
                            </div>

                            {/* skills & projects */}
                            <div className="flex items-center justify-between">
                                <div className="flex justify-center items-center w-12 h-12 bg-[#212529] rounded-full overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-75" onClick={() => scrollTo("skills")}>
                                    <Square className="text-yellow-300" />
                                </div>
                                <div className="flex justify-center items-center w-12 h-12 bg-[#212529] rounded-full overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-75" onClick={() => scrollTo("projects")}>
                                    <Circle className="text-red-500" />
                                </div>
                            </div>

                            {/* contacts */}
                            <div className="flex items-center justify-center">
                                <div className="flex justify-center items-center w-12 h-12 bg-[#212529] rounded-full overflow-hidden cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-75" onClick={() => scrollTo("contacts")}>
                                    <X className="text-blue-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar