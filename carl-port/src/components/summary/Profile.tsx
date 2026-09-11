interface ProfileProps {
  src: string;
  alt: string;
  sizeClass?: string;
  active?: boolean;
  className?: string;
}

const Profile = ({ src, alt, sizeClass = "w-32 h-32", active = false, className = "" }: ProfileProps) => {
  return (
    <div
      className={`relative rounded-full overflow-hidden border-4 shrink-0 transition-colors duration-500 ease-in-out ${sizeClass} ${
        active ? "border-green-500" : "border-white"
      } ${className}`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover object-center" />
    </div>
  );
};

export default Profile;