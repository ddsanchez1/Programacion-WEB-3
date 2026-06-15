import Navbar from "../../../../../shared/components/Navbar";
import Footer from "../../../../../shared/components/Footer";
import { useLogs } from "../hooks/useLogs";

export default function AdminLogsPage() {
  const { logs, stats, loading } = useLogs();
  if (loading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="app">
      <Navbar />

      <main className="admin-page container">
        <section className="admin-stats">
          <div className="stat-card">
            <h3>Total Eventos</h3>
            <p>{stats.total}</p>
          </div>

          <div className="stat-card">
            <h3>Ingresos</h3>
            <p>{stats.ingresos}</p>
          </div>

          <div className="stat-card">
            <h3>Salidas</h3>
            <p>{stats.salidas}</p>
          </div>
        </section>

        <div className="table">
          <div className="table-header logs-table">
            <span>Usuario</span>
            <span>IP</span>
            <span>Navegador</span>
            <span>Evento</span>
            <span>Fecha</span>
          </div>

          {logs.map((log) => (
            <div key={log.id} className="table-row logs-table">
              <span>{log.usuario}</span>

              <span>{log.ip}</span>

              <span title={log.browser} className="browser-cell">
                {log.browser}
              </span>

              <span>{log.evento}</span>

              <span>{new Date(log.fecha_hora).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
