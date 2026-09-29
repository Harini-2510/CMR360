import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "./DashboardHome.css";

function DashboardHome({
  t,
  totalDeals,
  pipelineValue,
  totalSales,
  wonDeals,
  notifications,
  customers,
  leads,
}) {
  return (
    <div className="page-content">

      <div className="page-header">
        <div>
          <h1>{t?.dashboard || "Dashboard"}</h1>
        </div>
      </div>

      {/* Dashboard top row: Sales Overview + Notifications */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: "20px",
          alignItems: "stretch",
          width: "100%",
          marginBottom: "20px",
        }}
      >

        <div style={{ minWidth: 0 }}>
          <div className="content-card sales-overview-card">

            <div className="card-header">
              <h2>{t?.salesOverview || "Sales Overview"}</h2>
            </div>

            <div className="sales-overview-grid">

              {/* TOTAL DEALS */}
              <div className="sales-mini-card">

                <div className="sales-mini-info">
                  <span>Total Deals</span>

                  <strong>
                    {totalDeals === 0 ? "..." : totalDeals}
                  </strong>
                </div>

                <div className="sales-mini-chart">

                  <ResponsiveContainer
                    width="100%"
                    height={75}
                  >
                    <BarChart
                      data={[
                        {
                          value: Math.max(
                            1,
                            Math.round(totalDeals * 0.45)
                          ),
                        },
                        {
                          value: Math.max(
                            1,
                            Math.round(totalDeals * 0.65)
                          ),
                        },
                        {
                          value: Math.max(
                            1,
                            Math.round(totalDeals * 0.5)
                          ),
                        },
                        {
                          value: Math.max(
                            1,
                            Math.round(totalDeals * 0.75)
                          ),
                        },
                        {
                          value: Math.max(
                            1,
                            Math.round(totalDeals * 0.6)
                          ),
                        },
                        {
                          value: Math.max(1, totalDeals),
                        },
                      ]}
                    >
                      <Tooltip />

                      <Bar
                        dataKey="value"
                        fill="#3b82f6"
                        radius={[5, 5, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>

                </div>
              </div>

              {/* PIPELINE VALUE */}
              <div className="sales-mini-card">

                <div className="sales-mini-info">
                  <span>Pipeline Value</span>

                  <strong>
                    ₹{pipelineValue.toLocaleString()}
                  </strong>
                </div>

                <div className="sales-mini-chart">

                  <ResponsiveContainer
                    width="100%"
                    height={75}
                  >
                    <LineChart
                      data={[
                        {
                          value: Math.round(
                            pipelineValue * 0.45
                          ),
                        },
                        {
                          value: Math.round(
                            pipelineValue * 0.58
                          ),
                        },
                        {
                          value: Math.round(
                            pipelineValue * 0.5
                          ),
                        },
                        {
                          value: Math.round(
                            pipelineValue * 0.72
                          ),
                        },
                        {
                          value: Math.round(
                            pipelineValue * 0.65
                          ),
                        },
                        {
                          value: pipelineValue,
                        },
                      ]}
                    >
                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>

                </div>
              </div>

              {/* CLOSED SALES */}
              <div className="sales-mini-card">

                <div className="sales-mini-info">
                  <span>Closed Sales</span>

                  <strong>
                    ₹{totalSales.toLocaleString()}
                  </strong>
                </div>

                <div className="sales-mini-chart">

                  <ResponsiveContainer
                    width="100%"
                    height={75}
                  >
                    <AreaChart
                      data={[
                        {
                          value: Math.round(
                            totalSales * 0.4
                          ),
                        },
                        {
                          value: Math.round(
                            totalSales * 0.55
                          ),
                        },
                        {
                          value: Math.round(
                            totalSales * 0.48
                          ),
                        },
                        {
                          value: Math.round(
                            totalSales * 0.7
                          ),
                        },
                        {
                          value: Math.round(
                            totalSales * 0.62
                          ),
                        },
                        {
                          value: totalSales,
                        },
                      ]}
                    >
                      <Tooltip />

                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.25}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                </div>
              </div>

              {/* WON DEALS */}
              <div className="sales-mini-card">

                <div className="sales-mini-info">
                  <span>Won Deals</span>

                  <strong>
                    {wonDeals}
                  </strong>
                </div>

                <div className="sales-mini-chart">

                  <ResponsiveContainer
                    width="100%"
                    height={75}
                  >
                    <PieChart>

                      <Pie
                        data={[
                          {
                            name: "Won",
                            value: Math.max(
                              1,
                              wonDeals
                            ),
                          },
                          {
                            name: "Remaining",
                            value: Math.max(
                              1,
                              totalDeals - wonDeals
                            ),
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={32}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        <Cell fill="#f59e0b" />
                        <Cell fill="#e5e7eb" />
                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div style={{ minWidth: 0 }}>

          <div
            className="content-card"
            style={{ minWidth: 0 }}
          >

            <div className="card-header">

              <h2>
                Notifications
              </h2>

              <span className="notification-count">
                {notifications.length}
              </span>

            </div>

            {notifications.length === 0 ? (

              <div className="empty-state">
                No new notifications
              </div>

            ) : (

              <div className="notification-list">

                {notifications.map(
                  (notification, index) => (

                    <div
                      className="notification-item"
                      key={index}
                    >

                      <div className="notification-icon">
                        {notification.type === "Task"
                          ? "📋"
                          : "🔔"}
                      </div>

                      <div>

                        <strong>
                          {notification.type}
                        </strong>

                        <p>
                          {notification.message}
                        </p>

                        <small>
                          {notification.date}
                        </small>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </div>

      </div>

      {/* Dashboard bottom row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0, 1fr) minmax(0, 1fr)",
          gap: "20px",
          alignItems: "start",
          width: "100%",
        }}
      >

        {/* RECENT CUSTOMERS */}
        <div style={{ minWidth: 0 }}>

          <div
            className="content-card"
            style={{ minWidth: 0 }}
          >

            <div className="card-header">
              <h2>
                Recent Customers
              </h2>
            </div>

            <div className="table-container">

              <table>

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {customers.length === 0 ? (

                    <tr>
                      <td
                        colSpan="4"
                        className="empty-state"
                      >
                        No customers available
                      </td>
                    </tr>

                  ) : (

                    customers
                      .slice(0, 5)
                      .map((customer, index) => (

                        <tr
                          key={
                            customer._id || index
                          }
                        >

                          <td>
                            <strong>
                              {customer.name}
                            </strong>
                          </td>

                          <td>
                            {customer.company}
                          </td>

                          <td>
                            {customer.email}
                          </td>

                          <td>

                            <span
                              className={`status-badge ${
                                customer.status ===
                                "Active"
                                  ? "active"
                                  : "inactive"
                              }`}
                            >
                              {customer.status}
                            </span>

                          </td>

                        </tr>

                      ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* RECENT LEADS */}
        <div style={{ minWidth: 0 }}>

          <div
            className="content-card"
            style={{ minWidth: 0 }}
          >

            <div className="card-header">
              <h2>
                Recent Leads
              </h2>
            </div>

            <div className="table-container">

              <table>

                <thead>

                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Follow-up</th>
                  </tr>

                </thead>

                <tbody>

                  {leads.length === 0 ? (

                    <tr>

                      <td
                        colSpan="5"
                        className="empty-state"
                      >
                        No leads available
                      </td>

                    </tr>

                  ) : (

                    leads
                      .slice(0, 5)
                      .map((lead, index) => (

                        <tr key={index}>

                          <td>
                            <strong>
                              {lead.name}
                            </strong>
                          </td>

                          <td>
                            {lead.company}
                          </td>

                          <td>
                            {lead.assignedTo}
                          </td>

                          <td>
                            {lead.status}
                          </td>

                          <td>
                            {lead.followUpDate ||
                              "Not set"}
                          </td>

                        </tr>

                      ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardHome;