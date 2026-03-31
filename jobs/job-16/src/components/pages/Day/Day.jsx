export default function Day() {
  const startTime = 8;

  const meetings = [
    { startTime: 8, endTime: 9 },
    { startTime: 9, endTime: 10 },
    { startTime: 9.5, endTime: 10.5 },
    { startTime: 9.25, endTime: 10.25 },
    { startTime: 10, endTime: 11 },
  ];

  meetings.sort((a, b) => a.startTime - b.startTime);

  const calculateMeetingLayout = (meeting, column) => {
    const topOffset = (meeting.startTime - startTime) * 60;
    const height = (meeting.endTime - meeting.startTime) * 60;
    const width = 100;

    const leftOffset = column * (width + 10);
    const zIndex = meetings.length - column;

    return {
      topOffset,
      height,
      width,
      leftOffset,
      zIndex,
    };
  };

  const getMeetingColumn = (meetingIndex) => {
    let column = 0;
    for (let i = 0; i < meetingIndex; i += 1) {
      if (
        meetings[i].endTime > meetings[meetingIndex].startTime
        && meetings[i].startTime < meetings[meetingIndex].endTime
      ) {
        column += 1;
      }
    }
    return column;
  };

  return (
    <div className="relative">
      {meetings.map((meeting, index) => {
        const column = getMeetingColumn(index);
        const {
          topOffset, height, width, leftOffset, zIndex,
        } = calculateMeetingLayout(meeting, column);
        return (
          <div
            key={meeting}
            className="absolute bg-blue-500 text-white px-2 py-1 rounded-lg"
            style={{
              top: `${topOffset}px`,
              height: `${height}px`,
              width: `${width}px`,
              left: `${leftOffset}px`,
              zIndex: `${zIndex}`,
            }}
          >
            <div>
              <span className="font-bold">
                {`Meeting ${index + 1}`}
              </span>
              <span className="block">
                {`${meeting.startTime} - ${meeting.endTime}`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
