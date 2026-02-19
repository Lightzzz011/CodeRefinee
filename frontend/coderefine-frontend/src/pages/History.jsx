import { useNavigate } from "react-router-dom";

const mockHistory = [
  {
    id: 1,
    date: "Feb 19, 2026",
    project: "auth-service",
    language: "Java",
    score: 91,
  },
  {
    id: 2,
    date: "Feb 18, 2026",
    project: "payment-gateway",
    language: "Python",
    score: 67,
  },
  {
    id: 3,
    date: "Feb 17, 2026",
    project: "search-engine",
    language: "C++",
    score: 82,
  },
  {
    id: 4,
    date: "Feb 16, 2026",
    project: "chat-api",
    language: "JavaScript",
    score: 54,
  },
];

function ScoreBadge({ score }) {
  let color =
    "text-emerald-400 bg-emerald-500/15 border-emerald-500/40";

  if (score < 50)
    color = "text-red-400 bg-red-500/15 border-red-500/40";
  else if (score < 75)
    color = "text-amber-400 bg-amber-500/15 border-amber-500/40";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${color}`}
    >
      {score}/100
    </span>
  );
}

export default function History() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-50">
            Submission History
          </h1>
          <p className="text-sm text-gray-500">
            View and revisit your past AI code reviews.
          </p>
        </div>

        {/* History Table */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Project
                </th>
                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Language
                </th>
                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                  Score
                </th>
                <th className="px-5 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 text-right">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {mockHistory.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-800/60 last:border-0 hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-5 py-4 text-gray-400">
                    {row.date}
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-200">
                    {row.project}
                  </td>
                  <td className="px-5 py-4 text-gray-400">
                    {row.language}
                  </td>
                  <td className="px-5 py-4">
                    <ScoreBadge score={row.score} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() =>
                        navigate("/result", {
                          state: {
                            language: row.language,
                            submissionDate: row.date,
                            qualityScore: row.score,
                            improvementPercent: 15,
                            timeComplexity: "O(n)",
                            spaceComplexity: "O(1)",
                            originalCode: "// Example original code",
                            optimizedCode: "// Example optimized code",
                            issues: [],
                          },
                        })
                      }
                      className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-gray-100 hover:border-gray-600 transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
