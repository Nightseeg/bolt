import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Users, Settings, Calendar, Phone, ShoppingBag } from 'lucide-react';
import Logo from '../Logo';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ShoppingBag, label: 'Commandes', href: '/dashboard/orders' },
  { icon: Calendar, label: 'Réservations', href: '/dashboard/reservations' },
  { icon: Phone, label: 'Appels', href: '/dashboard/calls' },
  { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Users, label: 'Utilisateurs', href: '/dashboard/users' },
  { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
];

export default function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Fixed Sidebar */}
      <aside className="w-64 fixed top-0 left-0 h-full bg-dark-800/80 backdrop-blur-lg border-r border-white/5 z-50">
        <div className="p-4">
          <Link to="/" className="flex items-center space-x-3">
            <Logo />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
              IA-26
            </span>
          </Link>
        </div>

        <nav className="mt-8 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 ${
                  isActive
                    ? 'bg-primary-400/20 text-primary-400'
                    : 'text-white/60'
                }`}
              >
                <item.icon className="w-6 h-6 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}