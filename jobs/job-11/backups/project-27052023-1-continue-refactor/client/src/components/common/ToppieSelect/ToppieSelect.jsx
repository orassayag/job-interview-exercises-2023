import './ToppieSelect.scss';

export default function ToppieSelect({
  name, iconName, selected, handleSegmentationClick,
}) {
  const segmentations = () => ['F', 'R', 'L', 'Q'].map((s) => (
    <button
      key={s}
      type="button"
      className={`pizza-item ${s}${selected === s ? ' active' : ''}`}
      onClick={handleSegmentationClick}
    >
      {s}
    </button>
  ));

  return (
    <div className="toppie hover:bg-blue-100">
      <div className="flex w-24 relative top-1 left-1">
        <i className={`fa-duotone ${iconName}`} />
        <div className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 relative left-1 toppies-label">{name}</div>
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
