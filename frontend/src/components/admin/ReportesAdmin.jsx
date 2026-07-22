/**
 * ReportesAdmin — Panel de reportes y exportación CSV para el administrador.
 */

import React from 'react';
import { exportarCSV } from '../../utils/csv';
import StatCard from '../shared/StatCard';

export default function ReportesAdmin({ convocatorias, postulaciones, usuarios }) {
  const totalEst  = (usuarios || []).filter((u) => u.rol === 'estudiante').length;
  const totalEmp  = (usuarios || []).filter((u) => u.rol === 'empresa').length;
  const totalPost = (postulaciones || []).length;
  const totalConv = (convocatorias || []).length;

  const REPORTES = [
    {
      titulo: '📥 Postulaciones',
      desc: 'Todos los registros de postulaciones con estado, estudiante y convocatoria.',
      count: totalPost,
      accion: () => exportarCSV(`postulaciones-${new Date().toISOString().slice(0,10)}`, [
        ['ID','Estudiante','Email','Escuela','Convocatoria','Empresa','Estado','Fecha'],
        ...(postulaciones||[]).map((p) => [
          p.id, p.Estudiante?.nombre||'—', p.Estudiante?.email||'—', p.Estudiante?.escuela||'—',
          p.Convocatoria?.titulo||'—', p.Convocatoria?.empresa||'—', p.estado,
          p.created_at ? new Date(p.created_at).toLocaleDateString('es-PE') : '—',
        ]),
      ]),
    },
    {
      titulo: '📥 Convocatorias',
      desc: 'Listado de todas las convocatorias con modalidad, estado y fechas.',
      count: totalConv,
      accion: () => exportarCSV(`convocatorias-${new Date().toISOString().slice(0,10)}`, [
        ['ID','Título','Empresa','Modalidad','Estado','Fecha inicio','Fecha cierre'],
        ...(convocatorias||[]).map((c) => [
          c.id, c.titulo, c.empresa, c.modalidad||'—', c.activo?'Activa':'Cerrada',
          c.fecha_inicio ? new Date(c.fecha_inicio).toLocaleDateString('es-PE') : '—',
          c.fecha_fin    ? new Date(c.fecha_fin).toLocaleDateString('es-PE')    : '—',
        ]),
      ]),
    },
    {
      titulo: '📥 Usuarios',
      desc: 'Lista completa de cuentas registradas con rol y estado de aprobación.',
      count: totalEst + totalEmp,
      accion: () => exportarCSV(`usuarios-${new Date().toISOString().slice(0,10)}`, [
        ['ID','Nombre','Email','Rol','Aprobado','Fecha registro'],
        ...(usuarios||[]).filter((u) => u.rol !== 'admin').map((u) => [
          u.id, u.nombre, u.email, u.rol, u.approved ? 'Sí':'No',
          u.created_at ? new Date(u.created_at).toLocaleDateString('es-PE') : '—',
        ]),
      ]),
    },
  ];

  return (
    <div>
      <h4 className="fw-bold mb-4">Reportes y estadísticas</h4>

      <div className="row g-3 mb-5">
        <div className="col-6 col-md-3"><StatCard label="Convocatorias" value={totalConv} icon="📋" color="primary" /></div>
        <div className="col-6 col-md-3"><StatCard label="Postulaciones" value={totalPost} icon="📝" color="info"    /></div>
        <div className="col-6 col-md-3"><StatCard label="Estudiantes"   value={totalEst}  icon="🎓" color="success" /></div>
        <div className="col-6 col-md-3"><StatCard label="Organizaciones" value={totalEmp} icon="🏢" color="light"   /></div>
      </div>

      <h6 className="fw-semibold text-muted text-uppercase mb-3" style={{ fontSize:'0.75rem' }}>Exportar datos</h6>
      <div className="row g-3">
        {REPORTES.map((r) => (
          <div key={r.titulo} className="col-md-4">
            <div className="card border-0 shadow-sm h-100" style={{ borderRadius:'0.75rem' }}>
              <div className="card-body p-4 d-flex flex-column">
                <h6 className="fw-bold mb-1">{r.titulo}</h6>
                <p className="small text-muted flex-grow-1">{r.desc}</p>
                <button className="btn btn-primary btn-sm mt-2" onClick={r.accion} disabled={r.count===0}>
                  {r.count === 0 ? 'Sin datos' : `Descargar CSV — ${r.count} registros`}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
