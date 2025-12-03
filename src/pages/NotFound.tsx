import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <span className="text-[150px] font-bold text-muted/30 leading-none select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🔌</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Connection Lost
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been disconnected.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link to="/" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Link>
          </Button>
          <Button asChild>
            <Link to="/" className="gap-2">
              <Home className="w-4 h-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
