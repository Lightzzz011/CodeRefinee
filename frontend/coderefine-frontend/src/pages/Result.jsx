import { useLocation, useNavigate } from "react-router-dom";

function ScoreBadge({ score }) {
  let color =
    "text-emerald-400 bg-emerald-500/15 border-emerald-500/40";

  if (score < 50)
    color = "text-red-400 bg-red-500/15 border-red-500/40";
  else if (score < 75)
    color = "text-amber-400 bg-amber-500/15 border-amber-500/40";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-semibold ${color}`}
    >
      {score}/100
    </span>
  );
}

function CodeBlock({ title, code }) {
  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      <span className="text-sm font-medium text-gray-300">
        {title}
      </span>
      <div className="rounded-lg border border-gray-700 bg-gray-950 p-4 overflow-x-auto h-72">
        <pre className="font-mono text-sm text-gray-300 leading-relaxed whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-5 flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
        {label}
      </span>
      <span className="text-xl font-bold text-gray-100">
        {value}
      </span>
    </div>
  );
}

function IssueCard({ type, description }) {
  const colors = {
    Performance: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    Security: "bg-red-500/10 text-red-400 border-red-500/30",
    Maintainability: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    Logic: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 flex flex-col gap-2">
      <span
        className={`inline-flex self-start items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
          colors[type] || colors.Logic
        }`}
      >
        {type}
      </span>
      <p className="text-sm text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  // 🔥 Safety check (prevents crash on page refresh)
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center gap-4">
        <h1 className="text-xl font-semibold">
          No submission data found.
        </h1>
        <button
          onClick={() => navigate("/submit")}
          className="px-4 py-2 rounded-lg bg-emerald-500 text-gray-900 font-medium"
        >
          Go Back to Submit
        </button>
      </div>
    );
  }

  const {
    language,
    submissionDate,
    qualityScore,
    improvementPercent,
    timeComplexity,
    spaceComplexity,
    originalCode,
    optimizedCode,
    issues,
  } = data;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-8">

        {/* Header */}
        <h1 className="text-2xl font-bold tracking-tight text-gray-50">
          AI Review Results
        </h1>

        {/* Metadata Row */}
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-800 bg-gray-900 px-5 py-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Language:</span>
            <span className="font-medium text-gray-200">
              {language}
            </span>
          </div>

          <div className="h-4 w-px bg-gray-700" />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Submitted:</span>
            <span className="font-medium text-gray-200">
              {submissionDate}
            </span>
          </div>

          <div className="h-4 w-px bg-gray-700" />

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Quality Score:</span>
            <ScoreBadge score={qualityScore} />
          </div>
        </div>

        {/* Split Code View */}
        <div className="flex flex-col lg:flex-row gap-4">
          <CodeBlock title="Original Code" code={originalCode} />
          <CodeBlock title="Optimized Code" code={optimizedCode} />
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Quality Score"
            value={`${qualityScore}/100`}
          />
          <MetricCard
            label="Improvement"
            value={`${improvementPercent}%`}
          />
          <MetricCard
            label="Time Complexity"
            value={timeComplexity}
          />
          <MetricCard
            label="Space Complexity"
            value={spaceComplexity}
          />
        </div>

        {/* Issues Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-100">
            Issues Found
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({issues.length})
            </span>
          </h2>

          <div className="flex flex-col gap-3">
            {issues.map((issue, idx) => (
              <IssueCard
                key={idx}
                type={issue.type}
                description={issue.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
