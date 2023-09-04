import Clip from "./clip";

const Track = ({ clips, zoom }) => (
  <div className="relative flex items-center h-10 p-1 border-b">
    {clips.map((clip) => (
      <Clip key={clip.title} clip={clip} zoom={zoom} />
    ))}
  </div>
);

export default Track;
