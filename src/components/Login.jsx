import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
  });
  const [tableData, setTableData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  // console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      // Update existing entry
      const updatedData = [...tableData];
      updatedData[editingIndex] = formData;
      setTableData(updatedData);
      setEditingIndex(null);
    } else {
      // Add new entry
      setTableData([...tableData, formData]);
    }
    setFormData({ name: "", email: "", phoneNumber: "", country: "" }); // Clear form fields
  };

  const handleEdit = (index) => {
    setFormData(tableData[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));

  };
  console.log(editingIndex)

  return (
    <div className="min-h-screen bg-slate-900  flex flex-col items-center justify-center p-4 space-y-8">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          {editingIndex !== null ? "Edit User Information" : "User Information"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Enter Your Name
            </label>
            <input
              name="name"
              className="w-full px-4 py-2.5 text-slate-900 bg-slate-50 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition duration-200"
              type="text"
              value={formData.name}
              placeholder="First Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              name="email"
              className="w-full px-4 py-2.5 text-slate-900 bg-slate-50 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition duration-200"
              type="email"
              value={formData.email}
              placeholder="email@gmail.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              className="w-full px-4 py-2.5 text-slate-900 bg-slate-50 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition duration-200"
              type="tel"
              value={formData.phoneNumber}
              placeholder="+91-XXX-XXXX"
              onChange={handleChange}
              maxLength={10}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Country
            </label>
            <select
              name="country"
              className="w-full px-4 py-2.5 text-slate-900 bg-slate-50 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white transition duration-200"
              value={formData.country}
              onChange={handleChange}
              required
            >
              <option value="">Select Country</option>
              <option value="Germany">Germany</option>
              <option value="USA">USA</option>
              <option value="India">India</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 mt-8 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 hover:text-white shadow-lg"
          >
            {/* mentioning editingindx */}
            {editingIndex !== null ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-2xl">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          User Data
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 ">
                <th className="border border-slate-300 px-4 py-2 text-left  font-semibold text-slate-700">
                  Name
                </th>
                <th className="border border-slate-300 px-4 py-2 text-left font-semibold text-slate-700">
                  Email
                </th>
                <th className="border border-slate-300 px-4 py-2 text-left font-semibold text-slate-700">
                  Phone Number
                </th>
                <th className="border border-slate-300 px-4 py-2 text-left font-semibold text-slate-700">
                  Country
                </th>
                <th className="border border-slate-300 px-4 py-2 text-center font-semibold text-slate-700">
                  To-Do
                </th>
              </tr>
              
            </thead>
            {/* no records txt */}
            {tableData <= 0 && (
                <p className="text-center text-gray-500 py-4 font-medium ">
                  No records till now
                </p>
              )}
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="border border-slate-300 px-4 py-2">
                    {row.name}
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    {row.email}
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    {row.phoneNumber}
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    {row.country}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 bg-green-800 text-white rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
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

export default Login;
