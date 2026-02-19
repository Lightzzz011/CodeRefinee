import { useNavigate } from "react-router-dom";

const mockProjects = [
  {
    id: 1,
    name: "auth-service",
    description:
      "JWT-based authentication microservice with refresh token rotation and rate limiting.",
    submissions: 24,
  },
  {
    id: 2,
    name: "payment-gateway",
    description:
      "Stripe integration layer handling subscriptions, invoices, and webhook processing.",
    submissions: 18,
  },
  {
    id: 3,
    name: "search-engine",
    description:
      "Full-text search service built on inverted indexes with ranked retrieval.",
    submissions: 31,
  },
  {
    id: 4,
    name: "chat-api",
    description:
      "Real-time WebSocket messaging API with presence detection and message persistence.",
    submissions: 12,
  },
  {
    id: 5,
    name: "ml-pipeline",
    description:
      "End-to-end machine learning pipeline for model training, evaluation, and deployment.",
    submissions: 9,
  },
  {
    id: 6,
    name: "data-sync",
    description:
      "Event-driven data synchronization service across distributed PostgreSQL clusters.",
    submissions: 42,
  },
];

function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 flex flex-col gap-4 hover:border-gray-700 transition-colors">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-gray-100">
          {project.name}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-xs text-gray-500">
          <span className="font-medium text-gray-400">
            {project.submissions}
          </span>{" "}
          submissions
        </span>

        <button
          onClick={() =>
            navigate("/submit", {
              state: { projectName: project.name },
            })
          }
          className="rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-1.5 text-xs font-medium text-gray-300 hover:text-gray-100 hover:border-gray-600 transition-colors"
        >
          Open
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-50">
              Projects
            </h1>
            <p className="text-sm text-gray-500">
              Organize and manage your code review projects.
            </p>
          </div>

          <button
            onClick={() => navigate("/submit")}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-gray-950 hover:bg-emerald-400 transition-colors"
          >
            Create Project
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
