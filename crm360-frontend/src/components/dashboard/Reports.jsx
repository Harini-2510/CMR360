import "./Reports.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  RadialBarChart,
  RadialBar
} from "recharts";

function Reports({
  totalCustomers,
  activeCustomers,
  totalLeads,
  activeLeads,
  pendingTasks,
  completedTasks,
  totalDeals,
  wonDeals,
  lostDeals,
  pipelineValue,
  totalSales,
  leads,
  tasks,
  deals,
  t,
  language,
}) {
  return (
    <div className="page-content">

      <div className="page-header">

        <div>
          <h1>Reports</h1>

          <p>
            View customer, lead, task and sales reports
          </p>
        </div>

      </div>

      {/* =====================================================
          REPORT SUMMARY CARDS
          ===================================================== */}

      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "20px",
          width: "100%",
          alignItems: "stretch"
        }}
      >

        <div className="stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>
            <h3>
              {totalCustomers}
            </h3>

            <p>
              {t.totalCustomers}
            </p>
          </div>

          <div className="mini-chart">
            <ResponsiveContainer width="100%" height={50}>
              <BarChart
                data={[
                  { value: 4 },
                  { value: 7 },
                  { value: 5 },
                  { value: 9 },
                  { value: 8 },
                  { value: 12 }
                ]}
              >
                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            🟢
          </div>

          <div>
            <h3>
              {activeCustomers}
            </h3>

            <p>
              {language === "Tamil"
                ? "செயலில் உள்ள வாடிக்கையாளர்கள்"
                : "Active Customers"}
            </p>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            📈
          </div>

          <div>
            <h3>
              {totalLeads}
            </h3>

            <p>
              {language === "Tamil"
                ? "மொத்த லீட்கள்"
                : "Total Leads"}
            </p>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            🔥
          </div>

          <div>
            <h3>
              {activeLeads}
            </h3>

            <p>
              {t.activeLeads}
            </p>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>
            <h3>
              {pendingTasks}
            </h3>

            <p>
              {t.pendingTasks}
            </p>
          </div>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            ✅
          </div>

          <div>
            <h3>
              {completedTasks}
            </h3>

            <p>
              {language === "Tamil"
                ? "முடிக்கப்பட்ட பணிகள்"
                : "Completed Tasks"}
            </p>
          </div>

        </div>

      </div>

      {/* =====================================================
          REPORT CONTENT GRID
          ===================================================== */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
          alignItems: "start",
          width: "100%"
        }}
      >

        {/* =====================================================
            SALES REPORT
            ===================================================== */}

        <div className="content-card" style={{ minWidth: 0 }}>

          <div className="card-header">
            <h2>
              Sales Overview
            </h2>
          </div>

          <div className="report-grid sales-overview-grid">

            {/* Total Deals */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>🤝 Total Deals</span>

                <strong>
                  {totalDeals}
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart
                    data={[
                      { value: totalDeals * 0.4 },
                      { value: totalDeals * 0.6 },
                      { value: totalDeals * 0.5 },
                      { value: totalDeals * 0.8 },
                      { value: totalDeals * 0.7 },
                      { value: totalDeals }
                    ]}
                  >
                    <Bar
                      dataKey="value"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <small>
                Deal activity overview
              </small>

            </div>

            {/* Won Deals */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>🏆 Won Deals</span>

                <strong>
                  {wonDeals}
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <LineChart
                    data={[
                      { value: wonDeals * 0.3 },
                      { value: wonDeals * 0.5 },
                      { value: wonDeals * 0.4 },
                      { value: wonDeals * 0.7 },
                      { value: wonDeals * 0.6 },
                      { value: wonDeals }
                    ]}
                  >
                    <Line
                      type="monotone"
                      dataKey="value"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <small>
                Successful deals
              </small>

            </div>

            {/* Lost Deals */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>❌ Lost Deals</span>

                <strong>
                  {lostDeals}
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart
                    data={[
                      { value: lostDeals * 0.8 },
                      { value: lostDeals * 0.5 },
                      { value: lostDeals * 0.7 },
                      { value: lostDeals * 0.4 },
                      { value: lostDeals * 0.6 },
                      { value: lostDeals }
                    ]}
                  >
                    <Bar
                      dataKey="value"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <small>
                Lost deal overview
              </small>

            </div>

            {/* Pipeline Value */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>💰 Pipeline Value</span>

                <strong>
                  ₹{pipelineValue.toLocaleString()}
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <AreaChart
                    data={[
                      { value: pipelineValue * 0.3 },
                      { value: pipelineValue * 0.5 },
                      { value: pipelineValue * 0.4 },
                      { value: pipelineValue * 0.7 },
                      { value: pipelineValue * 0.6 },
                      { value: pipelineValue }
                    ]}
                  >
                    <Area
                      type="monotone"
                      dataKey="value"
                      strokeWidth={2}
                      fillOpacity={0.15}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <small>
                Current pipeline value
              </small>

            </div>

            {/* Closed Sales */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>💵 Closed Sales</span>

                <strong>
                  ₹{totalSales.toLocaleString()}
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <LineChart
                    data={[
                      { value: totalSales * 0.3 },
                      { value: totalSales * 0.5 },
                      { value: totalSales * 0.45 },
                      { value: totalSales * 0.7 },
                      { value: totalSales * 0.8 },
                      { value: totalSales }
                    ]}
                  >
                    <Line
                      type="monotone"
                      dataKey="value"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <small>
                Completed sales
              </small>

            </div>

          </div>

        </div>

        {/* =====================================================
            LEAD STATUS REPORT
            ===================================================== */}

        <div className="content-card" style={{ minWidth: 0 }}>

          <div className="card-header">
            <h2>
              Lead Status Report
            </h2>
          </div>

          <div className="report-grid sales-overview-grid">

            {/* New - BAR CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>🆕 New</span>

                <strong>
                  {
                    leads.filter(
                      (lead) =>
                        lead.status === "New"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart
                    data={[
                      { value: 2 },
                      { value: 4 },
                      { value: 3 },
                      { value: 5 },
                      { value: 6 },
                      {
                        value: leads.filter(
                          (lead) =>
                            lead.status === "New"
                        ).length
                      }
                    ]}
                  >
                    <Bar
                      dataKey="value"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <small>
                New lead overview
              </small>

            </div>

            {/* Contacted - LINE CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>📞 Contacted</span>

                <strong>
                  {
                    leads.filter(
                      (lead) =>
                        lead.status === "Contacted"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <LineChart
                    data={[
                      { value: 1 },
                      { value: 2 },
                      { value: 1 },
                      { value: 3 },
                      { value: 2 },
                      {
                        value: leads.filter(
                          (lead) =>
                            lead.status === "Contacted"
                        ).length
                      }
                    ]}
                  >
                    <Line
                      type="monotone"
                      dataKey="value"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <small>
                Contacted leads
              </small>

            </div>

            {/* Qualified - BAR CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>⭐ Qualified</span>

                <strong>
                  {
                    leads.filter(
                      (lead) =>
                        lead.status === "Qualified"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart
                    data={[
                      { value: 1 },
                      { value: 2 },
                      { value: 1 },
                      { value: 3 },
                      { value: 2 },
                      {
                        value: leads.filter(
                          (lead) =>
                            lead.status === "Qualified"
                        ).length
                      }
                    ]}
                  >
                    <Bar
                      dataKey="value"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <small>
                Qualified leads
              </small>

            </div>

            {/* Proposal Sent - AREA CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>📨 Proposal Sent</span>

                <strong>
                  {
                    leads.filter(
                      (lead) =>
                        lead.status === "Proposal Sent"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <AreaChart
                    data={[
                      { value: 1 },
                      { value: 2 },
                      { value: 1 },
                      { value: 2 },
                      { value: 3 },
                      {
                        value: leads.filter(
                          (lead) =>
                            lead.status === "Proposal Sent"
                        ).length
                      }
                    ]}
                  >
                    <Area
                      type="monotone"
                      dataKey="value"
                      strokeWidth={2}
                      fillOpacity={0.15}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <small>
                Proposal activity
              </small>

            </div>

            {/* Won - PIE CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>🏆 Won</span>

                <strong>
                  {
                    leads.filter(
                      (lead) =>
                        lead.status === "Won"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          value: leads.filter(
                            (lead) =>
                              lead.status === "Won"
                          ).length
                        },
                        {
                          value: 1
                        }
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={15}
                      outerRadius={30}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <small>
                Won lead overview
              </small>

            </div>

            {/* Lost - BAR CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>❌ Lost</span>

                <strong>
                  {
                    leads.filter(
                      (lead) =>
                        lead.status === "Lost"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart
                    data={[
                      { value: 2 },
                      { value: 1 },
                      { value: 3 },
                      { value: 2 },
                      { value: 1 },
                      {
                        value: leads.filter(
                          (lead) =>
                            lead.status === "Lost"
                        ).length
                      }
                    ]}
                  >
                    <Bar
                      dataKey="value"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <small>
                Lost lead overview
              </small>

            </div>

            {/* Converted - PIE CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>🔄 Converted</span>

                <strong>
                  {
                    leads.filter(
                      (lead) =>
                        lead.status === "Converted"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          value: leads.filter(
                            (lead) =>
                              lead.status === "Converted"
                          ).length
                        },
                        {
                          value: 1
                        }
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={15}
                      outerRadius={30}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <small>
                Converted lead overview
              </small>

            </div>

          </div>

        </div>

        {/* =====================================================
            TASK REPORT
            ===================================================== */}

        <div className="content-card" style={{ minWidth: 0 }}>

          <div className="card-header">
            <h2>
              Task Status Report
            </h2>
          </div>

          <div className="report-grid sales-overview-grid">

            {/* Pending - BAR CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>⏳ Pending</span>

                <strong>
                  {
                    tasks.filter(
                      (task) =>
                        task.status === "Pending"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart
                    data={[
                      { value: 2 },
                      { value: 4 },
                      { value: 3 },
                      { value: 5 },
                      { value: 4 },
                      {
                        value: tasks.filter(
                          (task) =>
                            task.status === "Pending"
                        ).length
                      }
                    ]}
                  >
                    <Bar
                      dataKey="value"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <small>
                Pending task overview
              </small>

            </div>

            {/* In Progress - AREA CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>🔄 In Progress</span>

                <strong>
                  {
                    tasks.filter(
                      (task) =>
                        task.status === "In Progress"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <AreaChart
                    data={[
                      { value: 1 },
                      { value: 3 },
                      { value: 2 },
                      { value: 4 },
                      { value: 3 },
                      {
                        value: tasks.filter(
                          (task) =>
                            task.status === "In Progress"
                        ).length
                      }
                    ]}
                  >
                    <Area
                      type="monotone"
                      dataKey="value"
                      strokeWidth={2}
                      fillOpacity={0.15}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <small>
                Tasks currently in progress
              </small>

            </div>

            {/* Completed - LINE CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>✅ Completed</span>

                <strong>
                  {
                    tasks.filter(
                      (task) =>
                        task.status === "Completed"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <LineChart
                    data={[
                      { value: 1 },
                      { value: 2 },
                      { value: 2 },
                      { value: 3 },
                      { value: 4 },
                      {
                        value: tasks.filter(
                          (task) =>
                            task.status === "Completed"
                        ).length
                      }
                    ]}
                  >
                    <Line
                      type="monotone"
                      dataKey="value"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <small>
                Completed task overview
              </small>

            </div>

          </div>

        </div>

        {/* =====================================================
            DEAL STAGE REPORT
            ===================================================== */}

        <div className="content-card" style={{ minWidth: 0 }}>

          <div className="card-header">
            <h2>
              Sales Pipeline Report
            </h2>
          </div>

          {/* SALES PIPELINE MINI CHART CARDS */}

          <div className="report-grid sales-overview-grid">

            {/* New - BLUE BAR CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>🆕 New</span>

                <strong>
                  {
                    deals.filter(
                      (deal) =>
                        deal.stage === "New"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart
                    data={[
                      { value: 2 },
                      { value: 4 },
                      { value: 3 },
                      { value: 5 },
                      { value: 4 },
                      {
                        value: deals.filter(
                          (deal) =>
                            deal.stage === "New"
                        ).length
                      }
                    ]}
                  >
                    <Bar
                      dataKey="value"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <small>
                New deal stage
              </small>

            </div>

            {/* Contacted - PURPLE LINE CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>📞 Contacted</span>

                <strong>
                  {
                    deals.filter(
                      (deal) =>
                        deal.stage === "Contacted"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <LineChart
                    data={[
                      { value: 1 },
                      { value: 3 },
                      { value: 2 },
                      { value: 4 },
                      { value: 3 },
                      {
                        value: deals.filter(
                          (deal) =>
                            deal.stage === "Contacted"
                        ).length
                      }
                    ]}
                  >
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

              <small>
                Contacted deals
              </small>

            </div>

            {/* Qualified - GREEN AREA CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>⭐ Qualified</span>

                <strong>
                  {
                    deals.filter(
                      (deal) =>
                        deal.stage === "Qualified"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <AreaChart
                    data={[
                      { value: 1 },
                      { value: 2 },
                      { value: 4 },
                      { value: 3 },
                      { value: 5 },
                      {
                        value: deals.filter(
                          (deal) =>
                            deal.stage === "Qualified"
                        ).length
                      }
                    ]}
                  >
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.18}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <small>
                Qualified deals
              </small>

            </div>

            {/* Proposal Sent - ORANGE PIE CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>📨 Proposal Sent</span>

                <strong>
                  {
                    deals.filter(
                      (deal) =>
                        deal.stage === "Proposal Sent"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <PieChart>
                    <Pie
                      data={[
                        {
                          value: deals.filter(
                            (deal) =>
                              deal.stage === "Proposal Sent"
                          ).length
                        },
                        {
                          value: 1
                        }
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={15}
                      outerRadius={30}
                      fill="#f59e0b"
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <small>
                Proposal activity
              </small>

            </div>

            {/* Won - TEAL RADIAL BAR CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>🏆 Won</span>

                <strong>
                  {
                    deals.filter(
                      (deal) =>
                        deal.stage === "Won"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="35%"
                    outerRadius="85%"
                    barSize={10}
                    data={[
                      {
                        value:
                          deals.filter(
                            (deal) =>
                              deal.stage === "Won"
                          ).length
                      }
                    ]}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      dataKey="value"
                      cornerRadius={8}
                      fill="#14b8a6"
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              <small>
                Won deal overview
              </small>

            </div>

            {/* Lost - RED RADAR CHART */}
            <div className="report-item sales-report-card">

              <div className="report-card-info">
                <span>❌ Lost</span>

                <strong>
                  {
                    deals.filter(
                      (deal) =>
                        deal.stage === "Lost"
                    ).length
                  }
                </strong>
              </div>

              <div className="report-mini-chart">
                <ResponsiveContainer width="100%" height={70}>
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="65%"
                    data={[
                      {
                        stage: "A",
                        value: 2
                      },
                      {
                        stage: "B",
                        value: 4
                      },
                      {
                        stage: "C",
                        value: 3
                      },
                      {
                        stage: "D",
                        value: 5
                      },
                      {
                        stage: "E",
                        value:
                          deals.filter(
                            (deal) =>
                              deal.stage === "Lost"
                          ).length
                      }
                    ]}
                  >
                    <PolarGrid />

                    <PolarAngleAxis
                      dataKey="stage"
                    />

                    <Radar
                      dataKey="value"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.18}
                    />

                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <small>
                Lost deal overview
              </small>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Reports;