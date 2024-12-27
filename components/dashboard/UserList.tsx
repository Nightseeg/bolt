import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';

interface UserListProps {
  searchQuery: string;
}

const users = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean@example.com',
    role: 'Admin',
    lastActive: '2 min ago',
  },
  {
    id: 2,
    name: 'Marie Martin',
    email: 'marie@example.com',
    role: 'User',
    lastActive: '1 hour ago',
  },
];

export default function UserList({ searchQuery }: UserListProps) {
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="divide-y divide-white/10">
      {filteredUsers.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between py-4"
        >
          <div>
            <p className="font-medium text-white">{user.name}</p>
            <p className="text-sm text-white/60">{user.email}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white/40">{user.lastActive}</span>
            <span className="px-2 py-1 text-xs rounded-full bg-primary-400/20 text-primary-400">
              {user.role}
            </span>
            <button className="p-1 text-white/40 hover:text-white">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}