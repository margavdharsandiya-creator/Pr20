import { useEffect, useState } from "react";
import EmployeeForm from "./Component/EmployeeForm";
import EmployeeList from "./Component/EmployeeList";
import EmployeeCard from "./Component/EmployeeCard";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [message, setMessage] = useState("");

  // READ: Fetch employees from API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch employees");
        return response.json();
      })
      .then((data) => {
        setEmployees(
          data.map((employee) => ({
            id: employee.id,
            name: employee.name,
            email: employee.email,
            department: employee.company?.name || "General",
            salary: 30000 + employee.id * 2000,
          }))
        );
      })
      .catch(() => setError("Unable to load employees. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  // CREATE and UPDATE
  const saveEmployee = async (employeeData) => {
    try {
      const isEditing = editingEmployee !== null;
      const url = isEditing
        ? `${API_URL}/${editingEmployee.id}`
        : API_URL;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) throw new Error("Request failed");

      const savedData = await response.json();

      if (isEditing) {
        setEmployees((previous) =>
          previous.map((employee) =>
            employee.id === editingEmployee.id
              ? { ...employee, ...employeeData }
              : employee
          )
        );
        setMessage("Employee updated successfully!");
      } else {
        setEmployees((previous) => [
          ...previous,
          { ...employeeData, id: Date.now() || savedData.id },
        ]);
        setMessage("Employee added successfully!");
      }

      setEditingEmployee(null);
    } catch {
      setMessage("Unable to save employee. Please try again.");
    }
  };

  // DELETE
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      setEmployees((previous) =>
        previous.filter((employee) => employee.id !== id)
      );
      setMessage("Employee deleted successfully!");

      if (editingEmployee?.id === id) {
        setEditingEmployee(null);
      }
    } catch {
      setMessage("Unable to delete employee. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-8 shadow-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-100">
            Admin Dashboard
          </p>
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Employee Management
          </h1>
          <p className="mt-3 text-indigo-100">
            Manage your workforce in one simple dashboard.
          </p>
        </header>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Total Employees</p>
            <h2 className="mt-2 text-3xl font-bold text-indigo-400">
              {employees.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Departments</p>
            <h2 className="mt-2 text-3xl font-bold text-purple-400">
              {new Set(employees.map((e) => e.department)).size}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Average Salary</p>
            <h2 className="mt-2 text-3xl font-bold text-emerald-400">
              ₹{employees.length
                ? Math.round(
                    employees.reduce((sum, e) => sum + Number(e.salary), 0) /
                      employees.length
                  ).toLocaleString("en-IN")
                : 0}
            </h2>
          </div>
        </div>

        {message && (
          <div className="mb-5 flex items-center justify-between rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-4 text-indigo-200">
            <span>{message}</span>
            <button onClick={() => setMessage("")} className="font-bold">
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <EmployeeForm
              onSave={saveEmployee}
              editingEmployee={editingEmployee}
              onCancel={() => setEditingEmployee(null)}
            />
          </div>

          <div className="lg:col-span-2">
            {loading ? (
              <div className="rounded-2xl bg-slate-900 p-10 text-center text-slate-300">
                Loading employees...
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-300">
                {error}
                <button
                  onClick={() => window.location.reload()}
                  className="ml-3 underline"
                >
                  Retry
                </button>
              </div>
            ) : (
              <EmployeeList
                employees={employees}
                onEdit={setEditingEmployee}
                onDelete={deleteEmployee}
              />
            )}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Employee Management System • React + Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default App;