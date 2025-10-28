import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalDvs: 0,
    pendingDvs: 0,
    approvedDvs: 0,
    totalAmount: 0,
  })
  const [loading, setLoading] = useState(true)

  // Get API URL from environment
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [allDvs, pendingDvs, approvedDvs] = await Promise.all([
        axios.get(`${API_URL}/dvs`),
        axios.get(`${API_URL}/dvs?status=submitted`),
        axios.get(`${API_URL}/dvs?status=approved`),
      ])

      const totalAmount = allDvs.data.data.reduce(
        (sum, dv) => sum + parseFloat(dv.amount),
        0
      )

      setStats({
        totalDvs: allDvs.data.total,
        pendingDvs: pendingDvs.data.total,
        approvedDvs: approvedDvs.data.total,
        totalAmount,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      name: 'Total DVs',
      value: stats.totalDvs,
      icon: '📄',
      color: 'bg-blue-500',
    },
    {
      name: 'Pending Approval',
      value: stats.pendingDvs,
      icon: '⏳',
      color: 'bg-yellow-500',
    },
    {
      name: 'Approved DVs',
      value: stats.approvedDvs,
      icon: '✅',
      color: 'bg-green-500',
    },
    {
      name: 'Total Amount',
      value: `₱${stats.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: '💰',
      color: 'bg-purple-500',
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((item) => (
          <div
            key={item.name}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${item.color} rounded-md p-3`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {item.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <a
            href="/dvs/create"
            className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">➕</span>
            <div>
              <h3 className="font-medium text-gray-900">Create New DV</h3>
              <p className="text-sm text-gray-500">Add a new disbursement voucher</p>
            </div>
          </a>
          <a
            href="/dvs"
            className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">📋</span>
            <div>
              <h3 className="font-medium text-gray-900">View All DVs</h3>
              <p className="text-sm text-gray-500">Browse all disbursement vouchers</p>
            </div>
          </a>
          <div className="flex items-center p-4 border border-gray-300 rounded-lg bg-gray-50">
            <span className="text-2xl mr-3">📊</span>
            <div>
              <h3 className="font-medium text-gray-900">Reports</h3>
              <p className="text-sm text-gray-500">View financial reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}