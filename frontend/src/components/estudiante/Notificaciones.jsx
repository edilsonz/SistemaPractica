/**
 * Notificaciones — Panel de notificaciones del estudiante.
 * Las notificaciones persistentes son trabajo futuro (Sprint 3).
 * Por ahora muestra los eventos recientes derivados del estado de postulaciones.
 */

import React, { useMemo } from 'react';
import EmptyState from '../shared/EmptyState';

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (days  > 0) return `Hace ${days} día${days > 1 ? 's' : ''}`;
  if (hours > 0) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
  if (mins  > 0) return `Hace ${mins} minuto${mins > 1 ? 's' : ''}`;
  return 'Hace un momento';
}

const ESTADO_NOTIF = {
  'Enviado':       { icon: '📤', color: 'secondary', msg: 'Tu postulación fue enviada.' },
  'En Evaluación': { icon: '🔍', color: 'warning',   msg: 'Tu postulación está en evaluación.' },
  'Seleccionado':  { icon: '🎉', color: 'success',   msg: '¡Fuiste seleccionado!' },
  'Rechazado':     { icon: '❌', color: 'danger',    msg: 'Tu postulación no fue seleccionada.' },
};

export default function Notificaciones({ postulaciones }) {
  const notifs = useMemo(() => {
    return (postulaciones || []).map((p) => {
      const conv = p.Convocatoria || p.convocatoria || {};
      const cfg  = ESTADO_NOTIF[p.estado] || ESTADO_NOTIF['Enviado'];
      return {
        id:      p.id,
        icon:    cfg.icon,
        color:   cfg.color,
        titulo:  conv.titulo || 'Convocatoria',
        empresa: conv.empresa || '',
        msg:     cfg.msg,
        fecha:   p.updated_at || p.created_at,
      };
    });
  }, [postulaciones]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Notificaciones</h4>
        {notifs.length > 0 && (
          <span className="badge bg-primary rounded-pill">{notifs.length}</span>
        )}
      </div>

      {/* Aviso de funcionalidad futura */}
      <div className="alert alert-info rounded-3 mb-4">
        <small>
          🔔 Las notificaciones por email estarán disponibles próximamente.
          Por ahora se muestran los eventos de tus postulaciones.
        </small>
      </div>

      {notifs.length === 0 ? (
        <EmptyState
          icon="🔔"
          title="Sin notificaciones"
          description="Cuando postules o cambien el estado de tus postulaciones, aparecerán aquí."
        />
      ) : (
        <div className="list-group shadow-sm">
          {notifs.map((n) => (
            <div key={n.id} className="list-group-item list-group-item-action border-0 border-bottom">
              <div className="d-flex align-items-start gap-3">
                <span
                  className={`badge bg-${n.color} rounded-circle d-flex align-items-center justify-content-center`}
                  style={{ width: 40, height: 40, fontSize: '1rem', flexShrink: 0 }}
                >
                  {n.icon}
                </span>
                <div className="flex-grow-1">
                  <div className="fw-semibold">{n.titulo}</div>
                  <p className="mb-0 small text-muted">{n.empresa} — {n.msg}</p>
                </div>
                <small className="text-muted text-nowrap">{timeAgo(n.fecha)}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
