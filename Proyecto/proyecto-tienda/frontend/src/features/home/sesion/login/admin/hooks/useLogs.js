import { getLogs, getLogStats } from "../../../../../../services/logService";

import { useEffect, useState } from "react";

export function useLogs() {
  const [logs, setLogs] = useState([]);

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [logsData, statsData] = await Promise.all([
          getLogs(),
          getLogStats(),
        ]);

        setLogs(logsData);
        setStats(statsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    logs,
    stats,
    loading,
  };
}
