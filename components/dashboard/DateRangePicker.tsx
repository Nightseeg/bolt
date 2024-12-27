import { Calendar } from 'lucide-react';
import Button from '../ui/Button';

export default function DateRangePicker() {
  return (
    <Button variant="secondary" size="sm">
      <Calendar className="w-4 h-4 mr-2" />
      Derniers 30 jours
    </Button>
  );
}