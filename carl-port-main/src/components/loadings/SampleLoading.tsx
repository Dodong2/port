const SimpleFallback = () => {
  return (
    <div className="bg-[#303030] h-screen z-40 m-0 p-10 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 nes-container is-dark is-centered">
        <p className="nes-text">Loading components...</p>
        <progress className="nes-progress is-pattern"></progress>
      </div>
    </div>
  );
};

export default SimpleFallback;