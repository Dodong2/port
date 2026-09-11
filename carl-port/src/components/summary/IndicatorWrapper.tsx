interface IndicatorWrapperProps {
  active: boolean;
  lineWidthClass?: string; // dapat katumbas ng gap ng parent grid
  children: React.ReactNode;
}

const IndicatorWrapper = ({ active, lineWidthClass = "w-4 sm:w-10", children }: IndicatorWrapperProps) => {
  return (
    <div className="relative flex items-center">
      {children}

      <div
        className={`absolute top-1/2 -translate-y-1/2 left-full h-0.5 sm:h-1 bg-green-500 origin-left transition-transform duration-500 ease-in-out ${lineWidthClass} ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      ></div>
    </div>
  );
};

export default IndicatorWrapper;