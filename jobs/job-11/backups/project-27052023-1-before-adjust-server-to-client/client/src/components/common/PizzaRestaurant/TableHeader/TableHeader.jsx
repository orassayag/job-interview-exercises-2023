export default function TableHeader({
  title,
  px,
}) {
  return (
    <th
      className={`order-head px-${px} py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider`}
    >
      {title}
    </th>
  );
}
