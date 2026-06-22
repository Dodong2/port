
import { PixelImage } from "./PixelImage"

interface PageTitleProps {
    image1: string
    image2: string
    title: string
}

const PageTitle = ({ image1, image2, title }: PageTitleProps) => {
    return (
        <div className="flex justify-between">
            <div className="flex justify-left align-center">
                <PixelImage src={image1} />
                <div className="mt-1">
                    <div className="bg-[#535353] px-2 py-2 text-xs leading-none inline-flex items-center h-fit select-none text-[#86906d] border-4 border-t-[#413030] border-l-0 border-b-[#86906d] border-r-[#86906d]">
                        {title}
                    </div>
                </div>
            </div>
            <PixelImage src={image2} />
        </div>
    )
}

export default PageTitle