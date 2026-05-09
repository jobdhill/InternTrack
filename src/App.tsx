import { useCallback, useState } from "react"
import "./App.css"
import ApplicationStats from "./components/ApplicationStats"
import ApplicationTable from "./components/ApplicationTable"
import type { Application } from "./types/application"
import {
  createEmptyApplication,
  nextApplicationId,
} from "./types/application"
import SearchBox from "./components/SearchBox"

export default function App() {
  const [applications, setApplications] = useState<Application[]>(() => [
    createEmptyApplication(1),
  ])

  const [searchQuery, setSearchQuery] = useState("");

    const filteredApplications = applications.filter((app) => {
        const query = searchQuery.toLowerCase();
        
        return (
          app.company.toLowerCase().includes(query) || 
          app.role.toLowerCase().includes(query)
        )
    })
  

  const updateApplication = useCallback(
    (id: number, changes: Partial<Application>) => {
      setApplications((previous) =>
        previous.map((app) => (app.id === id ? { ...app, ...changes } : app)),
      )
    },
    [],
  )

  const addRow = useCallback(() => {
    setApplications((previous) => [
      ...previous,
      createEmptyApplication(nextApplicationId(previous)),
    ])
  }, [])

  return (
    <div className="min-h-screen p-6 font-manrope bg-[#F8F8FA]">
      <ApplicationStats applications={applications} />
      <SearchBox value={searchQuery} onChange={setSearchQuery}/>
      <ApplicationTable
        applications={filteredApplications}
        onUpdate={updateApplication}
        onAddRow={addRow}
      />
    </div>
  )
}
