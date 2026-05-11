import { useCallback, useEffect, useState } from "react";
import ApplicationStats from "../components/ApplicationStats";
import ApplicationTable from "../components/ApplicationTable";
import DashboardCharts from "../components/DashboardCharts";
import SearchBox, { type StatusFilter } from "../components/SearchBox";
import type { Application } from "../types/application";
import {
  createEmptyApplication,
  nextApplicationId,
} from "../types/application";

const PAGE_SIZE = 15;

export default function DashboardPage() {
  const [applications, setApplications] = useState<Application[]>(() => [
    createEmptyApplication(1),
  ]);

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

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const pageStart = (page - 1) * PAGE_SIZE;
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
    (id: number, changes: Partial<Application>) => {
      setApplications((previous) =>
        previous.map((app) => (app.id === id ? { ...app, ...changes } : app)),
      );
    },
    [],
  );

  const addRow = useCallback(() => {
    setApplications((previous) => [
      ...previous,
      createEmptyApplication(nextApplicationId(previous)),
    ]);
    setStatusFilter("All");
    setPage(Math.ceil((applications.length + 1) / PAGE_SIZE));
  }, [applications.length]);

  return (
    <div className="min-h-screen p-6 font-manrope bg-[#F8F8FA]">
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
        page={Math.min(page, totalPages)}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        onUpdate={updateApplication}
        onAddRow={addRow}
      />
    </div>
  );
}
