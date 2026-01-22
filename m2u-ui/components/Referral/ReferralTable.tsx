export default function ReferralTable() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Referral List</h2>
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">City</th>
              <th className="px-6 py-3">State</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">Divya Bhararhi</td>
              <td className="px-6 py-4">7708969382</td>
              <td className="px-6 py-4">divyabharathi@gmail.com</td>
              <td className="px-6 py-4">Coimbatore</td>
              <td className="px-6 py-4">Tamil Nadu</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">Kumarasamy</td>
              <td className="px-6 py-4">8012331863</td>
              <td className="px-6 py-4">kumarasamy@gmail.com</td>
              <td className="px-6 py-4">Coimbatore</td>
              <td className="px-6 py-4">Tamil Nadu</td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4">Ramya Byravi</td>
              <td className="px-6 py-4">8870999382</td>
              <td className="px-6 py-4">ramyabyravi@gmail.com</td>
              <td className="px-6 py-4">Madurai</td>
              <td className="px-6 py-4">Tamil Nadu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
