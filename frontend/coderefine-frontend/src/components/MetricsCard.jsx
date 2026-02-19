export default function MetricCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <span className="text-2xl font-bold text-gray-100">
        {value}
      </span>
    </div>
  );
}
