function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-950/30">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold">
          {employee.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-white">
            {employee.name}
          </h3>
          <p className="mt-1 break-all text-sm text-slate-400">
            {employee.email}
          </p>
          <span className="mt-3 inline-block rounded-lg bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            {employee.department}
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-slate-800 pt-4">
        <p className="text-xs text-slate-500">Monthly Salary</p>
        <p className="mt-1 text-xl font-bold text-emerald-400">
          ₹{Number(employee.salary).toLocaleString("en-IN")}
        </p>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => onEdit(employee)}
          className="flex-1 rounded-xl bg-amber-500/10 px-4 py-2.5 font-semibold text-amber-300 transition hover:bg-amber-500 hover:text-slate-950"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(employee.id)}
          className="flex-1 rounded-xl bg-red-500/10 px-4 py-2.5 font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EmployeeCard;