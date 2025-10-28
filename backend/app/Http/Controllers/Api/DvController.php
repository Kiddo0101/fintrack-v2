<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Dv;
use Illuminate\Http\Request;

class DvController extends Controller
{
    public function index(Request $request)
    {
        $query = Dv::with(['creator', 'approver'])->latest();

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by office
        if ($request->has('office_code')) {
            $query->where('office_code', $request->office_code);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('dv_number', 'like', "%{$search}%")
                  ->orWhere('payee', 'like', "%{$search}%")
                  ->orWhere('particulars', 'like', "%{$search}%");
            });
        }

        return response()->json($query->paginate(15));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'dv_number' => 'required|string|unique:dvs',
            'dv_date' => 'required|date',
            'payee' => 'required|string|max:255',
            'particulars' => 'required|string',
            'amount' => 'required|numeric|min:0',
            'status' => 'sometimes|in:draft,submitted,approved,disapproved,cancelled',
            'office_code' => 'nullable|string',
            'voucher_number' => 'nullable|string',
            'account_code' => 'nullable|string',
            'remarks' => 'nullable|string',
        ]);

        $validated['created_by'] = auth()->id();
        $validated['status'] = $validated['status'] ?? 'draft';

        $dv = Dv::create($validated);

        return response()->json($dv->load(['creator', 'approver']), 201);
    }

    public function show(Dv $dv)
    {
        return response()->json($dv->load(['creator', 'approver']));
    }

    public function update(Request $request, Dv $dv)
    {
        $validated = $request->validate([
            'dv_number' => 'sometimes|string|unique:dvs,dv_number,' . $dv->id,
            'dv_date' => 'sometimes|date',
            'payee' => 'sometimes|string|max:255',
            'particulars' => 'sometimes|string',
            'amount' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:draft,submitted,approved,disapproved,cancelled',
            'office_code' => 'nullable|string',
            'approved_by' => 'nullable|exists:users,id',
            'voucher_number' => 'nullable|string',
            'account_code' => 'nullable|string',
            'remarks' => 'nullable|string',
        ]);

        $dv->update($validated);

        return response()->json($dv->load(['creator', 'approver']));
    }

    public function destroy(Dv $dv)
    {
        $dv->delete();

        return response()->json(['message' => 'DV deleted successfully'], 200);
    }

    public function approve(Request $request, Dv $dv)
    {
        $dv->update([
            'status' => 'approved',
            'approved_by' => auth()->id(),
        ]);

        return response()->json($dv->load(['creator', 'approver']));
    }

    public function disapprove(Request $request, Dv $dv)
    {
        $validated = $request->validate([
            'remarks' => 'required|string',
        ]);

        $dv->update([
            'status' => 'disapproved',
            'remarks' => $validated['remarks'],
        ]);

        return response()->json($dv->load(['creator', 'approver']));
    }
}
