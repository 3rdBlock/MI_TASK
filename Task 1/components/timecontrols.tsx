import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const TimelineControls = ({ handleZoomIn, handleZoomOut }) => (
  <div className="w-full flex justify-center">
    <button onClick={handleZoomOut} className="m-2">
      <MinusCircleIcon className="h-10 w-10 text-blue-400" />
    </button>
    <button onClick={handleZoomIn} className="m-2">
      <PlusCircleIcon className="h-10 w-10 text-blue-400" />
    </button>
  </div>
);

export default TimelineControls;
