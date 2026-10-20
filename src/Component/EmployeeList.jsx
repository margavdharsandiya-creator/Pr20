import EmployeeCard from "./EmployeeCard";

function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 p-6">
        <div>
          <h2 className="text-xl font-bold">Employee Directory</h2>
          <p className="mt-1 text-sm text-slate-400">
            View and manage employee records.
          </p>
        </div>

        <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-sm text-indigo-300">
          {employees.length} employees
        </span>
      </div>

      {employees.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-5 xl:grid-cols-2">
          {employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center">
          <div className="mb-3 text-5xl">👥</div>
          <h3 className="text-lg font-bold">No Employees Found</h3>
          <p className="mt-2 text-sm text-slate-400">
            Add a new employee using the form.
          </p>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;