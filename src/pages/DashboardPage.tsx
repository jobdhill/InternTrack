import { useCallback, useEffect, useState } from "react";
import ApplicationStats from "../components/ApplicationStats";
import ApplicationTable from "../components/ApplicationTable";
import DashboardCharts from "../components/DashboardCharts";
import SearchBox, { type StatusFilter } from "../components/SearchBox";
import Navbar from "../components/dashboard/Navbar";
import type { Application } from "../types/application";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import { useDocumentMeta } from "../lib/useDocumentMeta";

const PAGE_SIZE = 15;

export default function DashboardPage() {
  useDocumentMeta({
    title: "Dashboard — InternNEXT",
    description: "Your internship application tracker and funnel analytics.",
    path: "/app",
    index: false,
  });

  const { session } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    supabase
      .from("applications")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("Failed to load applications:", error);
          setLoadError(error.message);
        } else {
          setApplications(data ?? []);
        }
        setLoading(false);
      });
  }, [session]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [page, setPage] = useState(1);

  const filteredApplications = applications.filter((app) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      app.company.toLowerCase().includes(query) ||
      app.role.toLowerCase().includes(query);
    const matchesStatus =
      statusFilter === "All" ? true : app.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / PAGE_SIZE),
  );

  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageApplications = filteredApplications.slice(
    pageStart,
    pageStart + PAGE_SIZE,
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, []);

  const handleStatusFilterChange = useCallback((value: StatusFilter) => {
    setStatusFilter(value);
    setPage(1);
  }, []);

  const updateApplication = useCallback(
    async (id: number, changes: Partial<Application>) => {
      setApplications((previous) =>
        previous.map((app) => (app.id === id ? { ...app, ...changes } : app)),
      );

      const { error } = await supabase
        .from("applications")
        .update(changes)
        .eq("id", id);

      if (error) {
        console.error("Failed to save:", error);
        setSaveError(`Couldn't save your change: ${error.message}`);
      }
    },
    [],
  );

  const addRow = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setSaveError("You're signed out. Please log in again.");
      return;
    }

    const { data, error } = await supabase
      .from("applications")
      .insert({ user_id: user.id })
      .select()
      .single();

    if (error || !data) {
      console.error("Failed to add row:", error);
      setSaveError(
        `Couldn't add a new application: ${error?.message ?? "unknown error"}`,
      );
      return;
    }

    setApplications((previous) => [...previous, data]);
    setStatusFilter("All");
    setPage(Math.ceil((applications.length + 1) / PAGE_SIZE));
  }, [applications.length]);

  return (
    <div className="min-h-screen font-manrope bg-[#F8F8FA]">
      <Navbar />
      <main className="max-w-7xl mx-auto p-6">
        {loading && (
          <p className="text-sm text-[#6B7280] mb-4">
            Loading your applications…
          </p>
        )}
        {loadError && (
          <div className="mb-4 flex items-start justify-between gap-3 rounded-md border border-[#FECACA] bg-[#FEF2F2] px-3 py-2.5 text-xs font-medium text-[#DC2626]">
            <span>Couldn't load your applications: {loadError}</span>
            <button
              type="button"
              onClick={() => setLoadError(null)}
              className="text-[#DC2626] hover:text-[#991B1B]"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        )}
        {saveError && (
          <div className="mb-4 flex items-start justify-between gap-3 rounded-md border border-[#FECACA] bg-[#FEF2F2] px-3 py-2.5 text-xs font-medium text-[#DC2626]">
            <span>{saveError}</span>
            <button
              type="button"
              onClick={() => setSaveError(null)}
              className="text-[#DC2626] hover:text-[#991B1B]"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        )}
        <DashboardCharts applications={applications} />
        <ApplicationStats applications={applications} />
        <SearchBox
          value={searchQuery}
          onChange={handleSearchChange}
          statusFilter={statusFilter}
          onStatusFilterChange={handleStatusFilterChange}
          onAddRow={addRow}
        />
        <ApplicationTable
          applications={pageApplications}
          totalCount={filteredApplications.length}
          page={safePage}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          onUpdate={updateApplication}
          onAddRow={addRow}
        />
      </main>
    </div>
  );
}
