import type { CoverImageProps } from "../types/share-types";

const CoverImage = ({ src, alt }: CoverImageProps) => {
  return (
    <div className="relative w-full aspect-[16/6] sm:aspect-[16/5] overflow-hidden rounded-sm">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};

export default CoverImage;