import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

export default function DvDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [dv, setDv] = useState(null)
  const [loading, setLoading] = useState(true)

  // Get API URL from environment
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

  useEffect(() => {
    fetchDv()
  }, [id])

  const fetchDv = async () => {
    try {
      const response = await axios.get(`${API_URL}/dvs/${id}`)
      setDv(response.data)
    } catch (error) {
      console.error('Error fetching DV:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async () => {
    if (!confirm('Are you sure you want to approve this DV?')) return

    try {
      await axios.post(`${API_URL}/dvs/${id}/approve`)
      fetchDv()
      alert('DV approved successfully')
    } catch (error) {
      alert('Error approving DV')
    }
  }

  const handleDisapprove = async () => {
    const remarks = prompt('Please provide remarks for disapproval:')
    if (!remarks) return

    try {
      await axios.post(`${API_URL}/dvs/${id}/disapprove`, { remarks })
      fetchDv()
      alert('DV disapproved')
    } catch (error) {
      alert('Error disapproving DV')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!dv) {
    return <div>DV not found</div>
  }

  const getStatusColor = (status) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      disapproved: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/dvs')}
        className="mb-4 text-primary-600 hover:text-primary-900"
      >
        ← Back to List
      </button>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{dv.dv_number}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Created on {new Date(dv.created_at).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusColor(
              dv.status
            )}`}
          >
            {dv.status}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-500">DV Date</label>
            <p className="mt-1 text-gray-900">{new Date(dv.dv_date).toLocaleDateString()}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Amount</label>
            <p className="mt-1 text-gray-900 font-semibold">
              ₱{parseFloat(dv.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-500">Payee</label>
            <p className="mt-1 text-gray-900">{dv.payee}</p>
          </div>

          <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-500">Particulars</label>
            <p className="mt-1 text-gray-900 whitespace-pre-wrap">{dv.particulars}</p>
          </div>

          {dv.office_code && (
            <div>
              <label className="text-sm font-medium text-gray-500">Office Code</label>
              <p className="mt-1 text-gray-900">{dv.office_code}</p>
            </div>
          )}

          {dv.voucher_number && (
            <div>
              <label className="text-sm font-medium text-gray-500">Voucher Number</label>
              <p className="mt-1 text-gray-900">{dv.voucher_number}</p>
            </div>
          )}

          {dv.account_code && (
            <div>
              <label className="text-sm font-medium text-gray-500">Account Code</label>
              <p className="mt-1 text-gray-900">{dv.account_code}</p>
            </div>
          )}

          {dv.remarks && (
            <div>
              <label className="text-sm font-medium text-gray-500">Remarks</label>
              <p className="mt-1 text-gray-900">{dv.remarks}</p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <label className="text-sm font-medium text-gray-500">Created By</label>
          <p className="mt-1 text-gray-900">{dv.creator?.name || 'Unknown'}</p>
        </div>

        {dv.approved_by && (
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-500">Approved By</label>
            <p className="mt-1 text-gray-900">{dv.approver?.name || 'Unknown'}</p>
          </div>
        )}

        {(user?.role === 'admin' || user?.role === 'reviewer') &&
          dv.status === 'submitted' && (
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleDisapprove}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Disapprove
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          )}
      </div>
    </div>
  )
}