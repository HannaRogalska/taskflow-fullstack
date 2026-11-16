import type { ActiveUserStats } from "../types/task";

type StatisticsProps = {
  statistics: ActiveUserStats[];
};

const Statistics = ({ statistics }: StatisticsProps) => {
  return (
    <section className="statistics">
      <h2>Active Tasks Statistics</h2>
      <p>Users with more than 2 active tasks</p>

      <div className="statistics-grid">
        {statistics.map((item) => (
          <div className="stat-card" key={item.userId}>
            <span className="stat-user">User {item.name}</span>

            <strong className="stat-number">{item.total}</strong>

            <span className="stat-label">Active tasks</span>
          </div>
        ))}
      </div>

      {statistics.length === 0 && <p>No statistics available</p>}
    </section>
  );
};

export default Statistics;
