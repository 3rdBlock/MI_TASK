const HOURS = Array.from({ length: 24 }, (_, i) => i);

const TimeIndicators = ({ zoom }) => (
  <div className="flex space-x-4">
    {HOURS.map((hour) => (
      <div
        key={hour}
        style={{ width: `${100 * zoom}px` }}
        className={`border-r flex justify-center items-center ${
          zoom >= 3 ? "text-lg" : "text-sm"
        }`}
      >
        {hour}:00
      </div>
    ))}
  </div>
);

export default TimeIndicators;
