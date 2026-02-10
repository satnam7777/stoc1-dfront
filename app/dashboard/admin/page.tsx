'use client';

import { useEffect, useState } from 'react';
import { getAllUsers, updateUserRole, toggleUserStatus, deleteUser, getAdminStats, User, AdminStats } from '@/app/lib/adminApi';
import { useRouter } from 'next/navigation';
import { Search, UserCog, Shield, Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData();
    }, [currentPage, roleFilter, statusFilter, searchTerm]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [usersData, statsData] = await Promise.all([
                getAllUsers({
                    search: searchTerm || undefined,
                    role: roleFilter || undefined,
                    isActive: statusFilter ? statusFilter === 'active' : undefined,
                    page: currentPage,
                    limit: 10
                }),
                getAdminStats()
            ]);

            setUsers(usersData.users);
            setTotalPages(usersData.pagination.pages);
            setStats(statsData);
            setError('');
        } catch (err: any) {
            console.error('Error fetching admin data:', err);
            setError(err.message || 'Failed to load data');

            // If unauthorized, redirect to dashboard
            if (err.message.includes('Access denied') || err.message.includes('Authentication required')) {
                router.push('/dashboard');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
        try {
            await updateUserRole(userId, newRole);
            fetchData(); // Refresh data
        } catch (err: any) {
            alert(err.message || 'Failed to update role');
        }
    };

    const handleStatusToggle = async (userId: string, currentStatus: boolean) => {
        try {
            await toggleUserStatus(userId, !currentStatus);
            fetchData(); // Refresh data
        } catch (err: any) {
            alert(err.message || 'Failed to update status');
        }
    };

    const handleDelete = async (userId: string, username: string) => {
        if (!confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await deleteUser(userId);
            fetchData(); // Refresh data
        } catch (err: any) {
            alert(err.message || 'Failed to delete user');
        }
    };

    if (loading && !stats) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl">Loading admin dashboard...</div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Manage users and view system statistics</p>
                </div>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <StatCard icon={<Users />} label="Total Users" value={stats.totalUsers} color="blue" />
                        <StatCard icon={<UserCheck />} label="Active Users" value={stats.activeUsers} color="green" />
                        <StatCard icon={<Shield />} label="Admin Users" value={stats.adminUsers} color="purple" />
                        <StatCard icon={<UserX />} label="Inactive Users" value={stats.inactiveUsers} color="red" />
                        <StatCard icon={<Users />} label="Regular Users" value={stats.regularUsers} color="indigo" />
                        <StatCard icon={<TrendingUp />} label="New (7 days)" value={stats.recentUsers} color="teal" />
                    </div>
                )}

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Role Filter */}
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="">All Roles</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        {/* Status Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {/* Users Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value as 'user' | 'admin')}
                                                className={`text-xs font-semibold px-3 py-1 rounded-full ${user.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                    }`}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleStatusToggle(user._id, user.isActive)}
                                                className={`text-xs font-semibold px-3 py-1 rounded-full ${user.isActive
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}
                                            >
                                                {user.isActive ? 'Active' : 'Inactive'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                onClick={() => handleDelete(user._id, user.username)}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex items-center justify-between">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Stat Card Component
function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
    const colorClasses: Record<string, string> = {
        blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300',
        green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300',
        purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300',
        red: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300',
        indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300',
        teal: 'bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
