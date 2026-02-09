import type { WorkOrderEvent } from '@/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { StatusBadge } from './StatusBadge';
import { cn } from '@/lib/utils';

interface StatusTimelineProps {
  events: WorkOrderEvent[];
  className?: string;
}

const eventLabel: Record<string, string> = {
  CREATED: 'OS criada',
  STATUS_CHANGED: 'Status alterado',
  MEDIA_ADDED: 'Mídia adicionada',
  NOTE_UPDATED: 'Nota atualizada',
  CANCELLED: 'OS cancelada',
};

export function StatusTimeline({ events, className }: StatusTimelineProps) {
  if (!events.length) {
    return <p className="text-sm text-muted-foreground">Nenhum evento registrado.</p>;
  }

  return (
    <div className={cn('space-y-0', className)}>
      {events.map((event, i) => (
        <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Vertical line */}
          {i < events.length - 1 && (
            <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
          )}
          {/* Dot */}
          <div className="relative z-10 mt-1.5 h-[10px] w-[10px] rounded-full bg-primary shrink-0 ring-2 ring-background" />
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{eventLabel[event.type] || event.type}</p>
            {event.to_status && (
              <div className="mt-1">
                {event.from_status && <StatusBadge status={event.from_status} className="mr-1" />}
                {event.from_status && <span className="text-xs text-muted-foreground mx-1">→</span>}
                <StatusBadge status={event.to_status} />
              </div>
            )}
            {event.message && <p className="text-sm text-muted-foreground mt-1">{event.message}</p>}
            <p className="text-xs text-muted-foreground mt-1">
              {format(new Date(event.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
              {event.actor && ` — ${event.actor.name}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
