import './ToppieSelect.scss';

export default function ToppieSelect({
  name, title, price, iconName, selected, onSegmentationClick,
}) {
  const segmentations = () => ['F', 'R', 'L', 'Q'].map((s) => (
    <button
      key={s}
      name={name}
      type="button"
      className={`pizza-item ${s}${selected === s ? ' active' : ''}`}
      onClick={onSegmentationClick}
    >
      {s}
    </button>
  ));

  return (
    <div className={`toppie ${selected ? 'bg-blue-100 rounded' : 'hover:bg-blue-100 rounded'}`}>
      <div className="toppies-id flex w-36 relative top-1 left-1">
        <i className={`fa-duotone ${iconName} fa-beat`} />
        <div className="uppercase tracking-wide text-gray-700 text-[11px] font-bold mb-2 relative left-1 toppies-label">{`${title} ($${price})`}</div>
      </div>
      <ul className="w-full segmentations relative right-1">
        {segmentations()}
      </ul>
    </div>
  );
}

// ToDo: Add useCallBack and useMemo.
// ToDo: PropTypes.
// ToDo: Move all global styles to scss file here.
