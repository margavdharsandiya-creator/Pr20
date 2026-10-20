import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  department: "",
  salary: "",
};

function EmployeeForm({ onSave, editingEmployee, onCancel }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        name: editingEmployee.name,
        email: editingEmployee.email,
        department: editingEmployee.department,
        salary: String(editingEmployee.salary),
      });
    } else {
      setForm(initialForm);
    }
  }, [editingEmployee]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ ...form, salary: Number(form.salary) });
    if (!editingEmployee) setForm(initialForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
    >
      <h2 className="mb-6 text-xl font-bold">
        {editingEmployee ? "Update Employee" : "Add New Employee"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter employee name"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="employee@example.com"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Department
          </label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-indigo-500"
          >
            <option value="">Select department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Monthly Salary (₹)
          </label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Enter salary"
            min="1"
            required
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-500"
      >
        {editingEmployee ? "Save Changes" : "+ Add Employee"}
      </button>

      {editingEmployee && (
        <button
          type="button"
          onClick={onCancel}
          className="mt-3 w-full rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 hover:bg-slate-800"
        >
          Cancel Editing
        </button>
      )}
    </form>
  );
}

export default EmployeeForm;