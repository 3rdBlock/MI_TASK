const Clip = ({ clip, zoom }) => (
  <div
    style={{
      left: `${zoom * clip.start * 100}px`,
      width: `${zoom * clip.duration * 100}px`,
    }}
    className="absolute bg-blue-400 border p-1 border-black/10 text-white flex justify-center items-center h-10"
  >
    {clip.title}
  </div>
);

export default Clip;
