import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users as UsersIcon, Search, Plus } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import UserList from '@/components/dashboard/UserList';
import UserModal from '@/components/dashboard/UserModal';

export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-8"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary-400/20 rounded-xl">
              <UsersIcon className="w-6 h-6 text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Utilisateurs</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="search"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Ajouter
            </Button>
          </div>
        </div>

        <Card>
          <UserList searchQuery={searchQuery} />
        </Card>

        <UserModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </motion.div>
    </Container>
  );
}