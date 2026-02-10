// lib/adminApi.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/api';

export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedUsers {
    users: User[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}

export interface AdminStats {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    adminUsers: number;
    regularUsers: number;
    recentUsers: number;
}

// Get all users with optional filters
export async function getAllUsers(params?: {
    search?: string;
    role?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
}): Promise<PaginatedUsers> {
    const queryParams = new URLSearchParams();

    if (params?.search) queryParams.append('search', params.search);
    if (params?.role) queryParams.append('role', params.role);
    if (params?.isActive !== undefined) queryParams.append('isActive', String(params.isActive));
    if (params?.page) queryParams.append('page', String(params.page));
    if (params?.limit) queryParams.append('limit', String(params.limit));

    const res = await fetch(`${API_BASE_URL}/admin/users?${queryParams}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to fetch users');
    }

    return res.json();
}

// Get single user by ID
export async function getUserById(id: string): Promise<User> {
    const res = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to fetch user');
    }

    return res.json();
}

// Update user role
export async function updateUserRole(id: string, role: 'user' | 'admin'): Promise<{ message: string; user: User }> {
    const res = await fetch(`${API_BASE_URL}/admin/users/${id}/role`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ role }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update user role');
    }

    return res.json();
}

// Toggle user active status
export async function toggleUserStatus(id: string, isActive: boolean): Promise<{ message: string; user: User }> {
    const res = await fetch(`${API_BASE_URL}/admin/users/${id}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ isActive }),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to update user status');
    }

    return res.json();
}

// Delete user
export async function deleteUser(id: string): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to delete user');
    }

    return res.json();
}

// Get admin dashboard stats
export async function getAdminStats(): Promise<AdminStats> {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to fetch stats');
    }

    return res.json();
}
