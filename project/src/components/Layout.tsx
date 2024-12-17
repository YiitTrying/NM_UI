import { NewspaperIcon } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Layout() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'News Dashboard' },
    { href: '/bookmarks', label: 'Manage Bookmarks' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <nav className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <NewspaperIcon className="h-6 w-6" />
              <span className="font-semibold">News Manager</span>
            </Link>
            <ul className="flex space-x-6">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      "text-muted-foreground"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}