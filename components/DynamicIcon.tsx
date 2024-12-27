import { Suspense, lazy } from 'react';
import { LucideProps } from 'lucide-react';
import { Loader2 } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = lazy(() => 
    import('lucide-react').then(mod => ({ 
      default: mod[name as keyof typeof mod] 
    }))
  );

  return (
    <Suspense fallback={<Loader2 className="w-4 h-4 animate-spin" {...props} />}>
      <IconComponent {...props} />
    </Suspense>
  );
}