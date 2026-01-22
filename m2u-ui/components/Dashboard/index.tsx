'use client'
import React from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js'
import { Line, Bar, Pie } from 'react-chartjs-2'
import Image from 'next/image'
import CountsByPeriod from './CountsByPeriod' // Import the new component

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement)

const Dashboard = () => {
  return (
    <div className="p-8  min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Details */}
        <div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-lg font-medium mb-4">Profile Details</h3>
          <div className="flex items-center space-x-4">
            <Image
              src="https://via.placeholder.com/100"
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full shadow-lg"
            />
            <div>
              <h4 className="text-xl font-semibold">Dr. John Doe</h4>
              <p className="text-gray-600">Cardiologist</p>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
          </div>
        </div>

        {/* Wallet Details */}
        <div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h3 className="text-lg font-medium mb-4">Wallet Details</h3>
          <div className="flex items-center space-x-4">
            <div className="text-4xl">💳</div>
            <div>
              <h4 className="text-xl font-semibold">Balance: $5,000</h4>
              <p className="text-gray-600">Last Transaction: $200 on 10/10/2021</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {/* Activity Overview */}
        <div className=" mb-8">
          <h3 className="text-lg font-medium mb-4">Counts By Period</h3>
          {[
            { title: 'Appointments', value: 500, icon: '📅' },
            { title: 'Operations', value: 104, icon: '🩺' },
            { title: 'New Patients', value: 150, icon: '👨‍⚕️' },
            { title: 'Earnings', value: '$20,500', icon: '💰' },
          ].map((item, index) => (
            <div key={index} className="p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h4 className="text-lg font-medium">{item.title}</h4>
                  <p className="text-2xl font-semibold">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Counts By Period */}
        <CountsByPeriod /> {/* Add the new component here */}
        {/* Popular Doctor List */}
        <div className=" p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium mb-4">Patient Visit By Department</h3>
          <Pie
            data={{
              labels: ['Cardiology', 'Neurology', 'Dermatology'],
              datasets: [
                {
                  data: [40, 30, 20],
                  backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'],
                },
              ],
            }}
          />
        </div>
      </div>

      {/* Patient Visit By Department & Popular Doctor List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">{/* Pie Chart */}</div>
      {/* Hospital Survey (Line Chart) & Average Patient Visits (Bar Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart */}
        <div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium mb-4">Hospital Survey</h3>
          <Line
            data={{
              labels: ['2000-Q1', '2000-Q2', '2000-Q3', '2000-Q4'],
              datasets: [
                {
                  label: 'Patients 2019',
                  data: [50, 100, 150, 200],
                  borderColor: '#ff6384',
                  fill: false,
                },
                {
                  label: 'Patients 2020',
                  data: [80, 120, 160, 210],
                  borderColor: '#36a2eb',
                  fill: false,
                },
              ],
            }}
          />
        </div>

        {/* Bar Chart */}
        <div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium mb-4">Average Patient Visits</h3>
          <Bar
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  label: 'Weekly Visits',
                  data: [10, 20, 30, 40, 50, 60, 70],
                  backgroundColor: '#ffcd56',
                },
              ],
            }}
          />
        </div>
      </div>
      {/* Appointment Activity */}
      <div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 p-6 rounded-lg shadow-lg mb-8">
        <h3 className="text-lg font-medium mb-4">Appointment Activity</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {['Name', 'Email', 'Date', 'Visit Time', 'Doctor', 'Conditions'].map((heading, index) => (
                <th key={index} className="px-4 py-2 text-left">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: 'Leslie Alexander',
                email: 'leslie.alexander@example.com',
                date: '10/10/2020',
                time: '09:15-09:45am',
                doctor: 'Dr. Jacob Jones',
                condition: 'Mumps Stage II',
              },
              {
                name: 'Ronald Richards',
                email: 'ronald.richards@example.com',
                date: '10/12/2020',
                time: '12:00-12:45pm',
                doctor: 'Dr. Theresa Webb',
                condition: 'Depression',
              },
            ].map((appointment, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2">{appointment.name}</td>
                <td className="px-4 py-2">{appointment.email}</td>
                <td className="px-4 py-2">{appointment.date}</td>
                <td className="px-4 py-2">{appointment.time}</td>
                <td className="px-4 py-2">{appointment.doctor}</td>
                <td className="px-4 py-2">{appointment.condition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard
