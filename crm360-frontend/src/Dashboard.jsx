import { useState, useEffect } from "react";
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
  Tooltip
} from "recharts";
import DashboardHome from "./components/dashboard/DashboardHome";
import Customers from "./components/dashboard/Customer";
import Leads from "./components/dashboard/Leads";
import Tasks from "./components/dashboard/Tasks";
import Deals from "./components/dashboard/Deals";
import Reports from "./components/dashboard/Reports";
import Settings from "./components/dashboard/Settings";
import "./Dashboard.css";

function handleLogout() {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) {
    return;
  }

  localStorage.removeItem("crm360_token");
  localStorage.removeItem("crm360_logged_in");
  localStorage.removeItem("crm360_user");

  window.location.reload();
}

function PageContent({
  activePage,
  theme,
  language,
  setTheme,
  setLanguage,
  userRole,
}) {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showDealForm, setShowDealForm] = useState(false);

  const translations = {
    English: {
      totalCustomers: "Total Customers",
      activeLeads: "Active Leads",
      pendingTasks: "Pending Tasks",
      salesOverview: "Sales Overview",
    },

    Tamil: {
      totalCustomers: "மொத்த வாடிக்கையாளர்கள்",
      activeLeads: "செயலில் உள்ள லீட்கள்",
      pendingTasks: "நிலுவையில் உள்ள பணிகள்",
      salesOverview: "விற்பனை மேலோட்டம்",
    },
  };

  const t = translations[language];

  // =========================================================
  // CUSTOMER STATES
  // =========================================================

  const [customers, setCustomers] = useState([
    {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 9876543210",
      company: "ABC Technologies",
      status: "Active",
    },
    {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 9876543211",
      company: "Wilson Enterprises",
      status: "Active",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+1 9876543212",
      company: "Brown Solutions",
      status: "Inactive",
    },
  ]);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [customerStatus, setCustomerStatus] = useState("Active");

  const [customerSearch, setCustomerSearch] = useState("");
  const [customerFilterStatus, setCustomerFilterStatus] = useState("All");

  const [customerEditIndex, setCustomerEditIndex] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // =========================================================
  // CUSTOMER BACKEND INTEGRATION
  // =========================================================

  useEffect(() => {
    const loadCustomersFromBackend = async () => {
      try {
        const token = localStorage.getItem("crm360_token");

        if (!token) {
          console.log("CRM360 token not found.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/customers",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            "Customer fetch failed:",
            data.message || "Unable to load customers."
          );
          return;
        }

        if (Array.isArray(data)) {
          setCustomers(data);
        } else if (Array.isArray(data.customers)) {
          setCustomers(data.customers);
        } else {
          console.log("Customer API response:", data);
        }
      } catch (error) {
        console.error("Customer backend connection error:", error);
      }
    };

    loadCustomersFromBackend();
  }, []);

  // =========================================================
  // LEAD STATES
  // =========================================================

  const [leads, setLeads] = useState([
    {
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "+1 9876543213",
      company: "Johnson Corp",
      source: "Website",
      status: "New",
      assignedTo: "Sales Executive",
      notes: "Interested in CRM platform",
      followUpDate: "2026-09-20",
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+1 9876543214",
      company: "Davis Industries",
      source: "Referral",
      status: "Contacted",
      assignedTo: "Sales Manager",
      notes: "Follow-up required",
      followUpDate: "2026-09-22",
    },
  ]);

  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadSource, setLeadSource] = useState("Website");
  const [leadStatus, setLeadStatus] = useState("New");
  const [leadAssignedTo, setLeadAssignedTo] = useState("");
  const [leadUsers, setLeadUsers] = useState([]);
  const [leadNotes, setLeadNotes] = useState("");
  const [leadFollowUpDate, setLeadFollowUpDate] = useState("");

  const [leadSearch, setLeadSearch] = useState("");
  const [leadFilterStatus, setLeadFilterStatus] = useState("All");
  const [leadFilterSource, setLeadFilterSource] = useState("All");

  const [leadEditIndex, setLeadEditIndex] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  // =========================================================
  // LEADS BACKEND INTEGRATION
  // =========================================================

  useEffect(() => {
    const loadLeadUsersFromBackend = async () => {
      try {
        const token = localStorage.getItem("crm360_token");

        if (!token) {
          console.log("CRM360 token not found.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/users",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            "Lead users fetch failed:",
            data.message || "Unable to load users."
          );
          return;
        }

        if (Array.isArray(data)) {
          setLeadUsers(data);
        } else if (Array.isArray(data.users)) {
          setLeadUsers(data.users);
        } else {
          console.log("Lead users API response:", data);
        }
      } catch (error) {
        console.error(
          "Lead users backend connection error:",
          error
        );
      }
    };

    loadLeadUsersFromBackend();
  }, []);

  useEffect(() => {
    const loadLeadsFromBackend = async () => {
      try {
        const token = localStorage.getItem("crm360_token");

        if (!token) {
          console.log("CRM360 token not found.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/leads",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            "Lead fetch failed:",
            data.message || "Unable to load leads."
          );
          return;
        }

        if (Array.isArray(data)) {
          setLeads(data);
        } else if (Array.isArray(data.leads)) {
          setLeads(data.leads);
        } else {
          console.log("Lead API response:", data);
        }
      } catch (error) {
        console.error(
          "Lead backend connection error:",
          error
        );
      }
    };

    loadLeadsFromBackend();
  }, []);

  // =========================================================
  // TASK STATES
  // =========================================================

  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskAssignedTo, setTaskAssignedTo] = useState("Sales Executive");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskPriority, setTaskPriority] = useState("Medium");
  const [taskStatus, setTaskStatus] = useState("Pending");

  const [taskSearch, setTaskSearch] = useState("");
  const [taskFilterStatus, setTaskFilterStatus] = useState("All");
  const [taskFilterPriority, setTaskFilterPriority] = useState("All");

  const [taskEditIndex, setTaskEditIndex] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // =========================================================
  // TASKS BACKEND INTEGRATION
  // =========================================================

  useEffect(() => {
    const loadTasksFromBackend = async () => {
      try {
        const token = localStorage.getItem("crm360_token");

        if (!token) {
          console.log("CRM360 token not found.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/tasks",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(
            "Task fetch failed:",
            data.message || "Unable to load tasks."
          );
          return;
        }

        if (Array.isArray(data)) {
          setTasks(data);
        } else if (Array.isArray(data.tasks)) {
          setTasks(data.tasks);
        } else {
          console.log("Task API response:", data);
        }
      } catch (error) {
        console.error(
          "Task backend connection error:",
          error
        );
      }
    };

    loadTasksFromBackend();
  }, []);

  // =========================================================
  // DEAL STATES
  // =========================================================
const [deals, setDeals] = useState([]);
const [dealsLoading, setDealsLoading] = useState(true);
  const [dealTitle, setDealTitle] = useState("");
  const [dealCustomer, setDealCustomer] = useState("");
  const [dealValue, setDealValue] = useState("");
  const [dealStage, setDealStage] = useState("New");
  const [dealProbability, setDealProbability] = useState(20);
  const [dealClosingDate, setDealClosingDate] = useState("");

  const [dealSearch, setDealSearch] = useState("");
  const [dealFilterStage, setDealFilterStage] = useState("All");

  const [dealEditIndex, setDealEditIndex] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const normalizeDeal = (deal) => {
  const customerId =
    typeof deal.customer === "object"
      ? deal.customer?._id || null
      : deal.customer || deal.customerId || null;

  const customerName =
    typeof deal.customer === "object"
      ? deal.customer?.name || ""
      : deal.customerName || deal.customer || "";

  const closingDate = deal.expectedCloseDate
    ? new Date(deal.expectedCloseDate)
        .toISOString()
        .split("T")[0]
    : deal.closingDate || "";

  return {
    ...deal,
    customer: customerName,
    customerId: customerId,
    closingDate: closingDate,
  };
};

useEffect(() => {
  const loadDeals = async () => {
    try {
      const token =
        localStorage.getItem("crm360_token");

      if (!token) {
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/deals",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Failed to load deals:",
          data.message
        );
        return;
      }

      const backendDeals = Array.isArray(data)
        ? data
        : Array.isArray(data.deals)
        ? data.deals
        : [];
const normalizedBackendDeals =
  backendDeals.map(normalizeDeal);
  setDealsLoading(false);

setDeals(normalizedBackendDeals);
    } catch (error) {
      console.error(
        "Deal loading error:",
        error
      );
    }
  };

  loadDeals();
}, []);

  // =========================================================
  // CUSTOMER HANDLERS
  // =========================================================

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !customerCompany
    ) {
      alert("Please fill all customer details");
      return;
    }

    const newCustomer = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      company: customerCompany,
      status: customerStatus,
    };

    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        alert("Login session not found. Please login again.");
        return;
      }

      if (customerEditIndex !== null) {
        const customerToUpdate = customers[customerEditIndex];

        const response = await fetch(
          `http://localhost:5000/api/customers/${customerToUpdate._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newCustomer),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(
            data.message || "Unable to update customer."
          );
          return;
        }

        const updatedCustomer =
          data.customer || data;

        const updatedCustomers = [...customers];

        updatedCustomers[customerEditIndex] =
          updatedCustomer;

        setCustomers(updatedCustomers);

        alert("Customer updated successfully!");
      } else {
        const response = await fetch(
          "http://localhost:5000/api/customers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newCustomer),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(
            data.message || "Unable to add customer."
          );
          return;
        }

        const createdCustomer =
          data.customer || data;

        setCustomers([
          ...customers,
          createdCustomer,
        ]);

        alert("Customer added successfully!");
      }

      setShowCustomerForm(false);

      clearCustomerForm();

    } catch (error) {
      console.error(
        "Customer backend error:",
        error
      );

      alert(
        "Unable to connect to CRM360 backend."
      );
    }
  };

  function clearCustomerForm() {
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setCustomerCompany("");
    setCustomerStatus("Active");
    setCustomerEditIndex(null);
    setSelectedCustomer(null);
  }

  const handleCustomerEdit = (index) => {
    const customer = customers[index];

    setCustomerName(customer.name);
    setCustomerEmail(customer.email);
    setCustomerPhone(customer.phone);
    setCustomerCompany(customer.company);
    setCustomerStatus(customer.status);

    setCustomerEditIndex(index);
    setShowCustomerForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCustomerDelete = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        alert("Login session not found. Please login again.");
        return;
      }

      const customerToDelete = customers[index];

      if (!customerToDelete || !customerToDelete._id) {
        alert("Customer ID not found.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/customers/${customerToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Unable to delete customer."
        );
        return;
      }

      const updatedCustomers = customers.filter(
        (_, customerIndex) =>
          customerIndex !== index
      );

      setCustomers(updatedCustomers);

      alert("Customer deleted successfully!");

    } catch (error) {
      console.error(
        "Customer delete backend error:",
        error
      );

      alert(
        "Unable to connect to CRM360 backend."
      );
    }
  };

  const handleCustomerView = (customer) => {
    setSelectedCustomer(customer);
  };

  const filteredCustomers = customers.filter((customer) => {
    const searchText = customerSearch.toLowerCase();

    const matchesSearch =
      customer.name.toLowerCase().includes(searchText) ||
      customer.email.toLowerCase().includes(searchText) ||
      customer.phone.toLowerCase().includes(searchText) ||
      customer.company.toLowerCase().includes(searchText);

    const matchesStatus =
      customerFilterStatus === "All" ||
      customer.status === customerFilterStatus;

    return matchesSearch && matchesStatus;
  });

  // =========================================================
  // LEAD HANDLERS
  // =========================================================

  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!leadName || !leadEmail || !leadPhone || !leadCompany) {
      alert("Please fill all lead details");
      return;
    }

    const newLead = {
      name: leadName,
      email: leadEmail,
      phone: leadPhone,
      company: leadCompany,
      source: leadSource,
      status: leadStatus,
      assignedTo:
        leadAssignedTo || null,
      notes: leadNotes,
      followUpDate: leadFollowUpDate || null,
    };

    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        alert("Login session not found. Please login again.");
        return;
      }

      if (leadEditIndex !== null) {
        const leadToUpdate = leads[leadEditIndex];

        if (!leadToUpdate || !leadToUpdate._id) {
          alert("Lead ID not found.");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/leads/${leadToUpdate._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newLead),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(
            data.message || "Unable to update lead."
          );
          return;
        }

        const updatedLead =
          data.lead || data;

        const updatedLeads = [...leads];

        updatedLeads[leadEditIndex] =
          updatedLead;

        setLeads(updatedLeads);

        alert("Lead updated successfully!");

      } else {
        const response = await fetch(
          "http://localhost:5000/api/leads",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newLead),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(
            data.message || "Unable to create lead."
          );
          return;
        }

        const createdLead =
          data.lead || data;

        setLeads([
          ...leads,
          createdLead,
        ]);

        alert("Lead created successfully!");
      }

      clearLeadForm();
      setShowLeadForm(false);

    } catch (error) {
      console.error(
        "Lead backend error:",
        error
      );

      alert(
        "Unable to connect to CRM360 backend."
      );
    }
  };

  const clearLeadForm = () => {
    setLeadName("");
    setLeadEmail("");
    setLeadPhone("");
    setLeadCompany("");
    setLeadSource("Website");
    setLeadStatus("New");
    setLeadAssignedTo("");
    setLeadNotes("");
    setLeadFollowUpDate("");
    setLeadEditIndex(null);
  };

  const handleLeadEdit = (index) => {
    console.log("EDIT CLICKED", index);

    const lead = leads[index];

    console.log("LEAD DATA", lead);

    if (!lead) {
      alert("Lead not found.");
      return;
    }

    setLeadName(lead.name || "");
    setLeadEmail(lead.email || "");
    setLeadPhone(lead.phone || "");
    setLeadCompany(lead.company || "");
    setLeadSource(lead.source || "Website");
    setLeadStatus(lead.status || "New");

    setLeadAssignedTo(
      typeof lead.assignedTo === "object"
        ? lead.assignedTo?._id || ""
        : lead.assignedTo || ""
    );

    setLeadNotes(lead.notes || "");

    setLeadFollowUpDate(
      lead.followUpDate
        ? new Date(lead.followUpDate)
            .toISOString()
            .split("T")[0]
        : ""
    );

    setLeadEditIndex(index);
    setShowLeadForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // LEAD DELETE - BACKEND CONNECTED
  // =========================================================

  const handleLeadDelete = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        alert("Login session not found. Please login again.");
        return;
      }

      const leadToDelete = leads[index];

      if (!leadToDelete || !leadToDelete._id) {
        alert("Lead ID not found.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/leads/${leadToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to delete lead."
        );
        return;
      }

      setLeads((prevLeads) =>
        prevLeads.filter(
          (_, leadIndex) => leadIndex !== index
        )
      );

      if (selectedLead?._id === leadToDelete._id) {
        setSelectedLead(null);
      }

      alert("Lead deleted successfully!");

    } catch (error) {
      console.error(
        "Lead delete backend error:",
        error
      );

      alert(
        "Unable to connect to CRM360 backend."
      );
    }
  };

  const handleLeadView = (lead) => {
    setSelectedLead(lead);
  };

  // =========================================================
  // LEAD STATUS - BACKEND CONNECTED
  // =========================================================

  const handleLeadStatusChange = async (
    index,
    newStatus
  ) => {
    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        alert("Login session not found. Please login again.");
        return;
      }

      const lead = leads[index];

      if (!lead || !lead._id) {
        alert("Lead ID not found.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/leads/${lead._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            source: lead.source,
            status: newStatus,
            assignedTo:
              lead.assignedTo?._id ||
              lead.assignedTo ||
              null,
            notes: lead.notes,
            followUpDate:
              lead.followUpDate || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to update lead status."
        );
        return;
      }

      const updatedLead =
        data.lead || data;

      setLeads((prevLeads) =>
        prevLeads.map(
          (currentLead, leadIndex) =>
            leadIndex === index
              ? updatedLead
              : currentLead
        )
      );

    } catch (error) {
      console.error(
        "Lead status update error:",
        error
      );

      alert(
        "Unable to connect to CRM360 backend."
      );
    }
  };

  // =========================================================
  // LEAD ASSIGNMENT - BACKEND CONNECTED
  // =========================================================

  const handleLeadAssignmentChange = async (
    index,
    newAssignee
  ) => {
    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        alert("Login session not found. Please login again.");
        return;
      }

      const lead = leads[index];

      if (!lead || !lead._id) {
        alert("Lead ID not found.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/leads/${lead._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            company: lead.company,
            source: lead.source,
            status: lead.status,
            assignedTo: newAssignee || null,
            notes: lead.notes,
            followUpDate:
              lead.followUpDate || null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to update lead assignment."
        );
        return;
      }

      const updatedLead =
        data.lead || data;

      setLeads((prevLeads) =>
        prevLeads.map(
          (currentLead, leadIndex) =>
            leadIndex === index
              ? updatedLead
              : currentLead
        )
      );

    } catch (error) {
      console.error(
        "Lead assignment update error:",
        error
      );

      alert(
        "Unable to connect to CRM360 backend."
      );
    }
  };

  const handleConvertLeadToCustomer = (index) => {
    const lead = leads[index];

    const existingCustomer = customers.some(
      (customer) =>
        customer.email.toLowerCase() ===
        lead.email.toLowerCase()
    );

    if (existingCustomer) {
      alert("This lead already exists as a customer.");
      return;
    }

    const convertedCustomer = {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      status: "Active",
    };

    setCustomers([
      ...customers,
      convertedCustomer,
    ]);

    const updatedLeads = [...leads];

    updatedLeads[index] = {
      ...updatedLeads[index],
      status: "Converted",
    };

    setLeads(updatedLeads);

    alert(
      "Lead converted to customer successfully!"
    );
  };

  const filteredLeads = leads.filter((lead) => {
    const searchText = leadSearch.toLowerCase();

    const matchesSearch =
      (lead.name || "")
        .toLowerCase()
        .includes(searchText) ||
      (lead.email || "")
        .toLowerCase()
        .includes(searchText) ||
      (lead.phone || "")
        .toLowerCase()
        .includes(searchText) ||
      (lead.company || "")
        .toLowerCase()
        .includes(searchText);

    const matchesStatus =
      leadFilterStatus === "All" ||
      lead.status === leadFilterStatus;

    const matchesSource =
      leadFilterSource === "All" ||
      lead.source === leadFilterSource;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesSource
    );
  });

  // =========================================================
  // TASK HANDLERS
  // =========================================================

  const handleTaskSubmit = async (e) => {
    e.preventDefault();

    if (!taskTitle || !taskDescription || !taskDueDate) {
      alert("Please fill all task details");
      return;
    }

    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        alert("Login session not found. Please login again.");
        return;
      }

      const taskData = {
        title: taskTitle,
        description: taskDescription,
        assignedTo: null,
        dueDate: taskDueDate,
        priority: taskPriority,
        status: taskStatus,
      };

      if (taskEditIndex === null) {
        const response = await fetch(
          "http://localhost:5000/api/tasks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(
            data.message ||
              "Unable to create task."
          );
          return;
        }

        const createdTask =
          data.task || data;

        setTasks((prevTasks) => [
          createdTask,
          ...prevTasks,
        ]);

        alert("Task created successfully!");

      } else {
        const existingTask =
          tasks[taskEditIndex];

        if (!existingTask?._id) {
          alert("Task ID not found.");
          return;
        }

        const response = await fetch(
          `http://localhost:5000/api/tasks/${existingTask._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(taskData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(
            data.message ||
              "Unable to update task."
          );
          return;
        }

        const updatedTask =
          data.task || data;

        const updatedTasks = [...tasks];

        updatedTasks[taskEditIndex] =
          updatedTask;

        setTasks(updatedTasks);

        alert("Task updated successfully!");
      }

      clearTaskForm();
      setShowTaskForm(false);

    } catch (error) {
      console.error(
        "Task save error:",
        error
      );

      alert(
        "Unable to connect to CRM360 backend. Please make sure the backend server is running."
      );
    }
  };

  const clearTaskForm = () => {
    setTaskTitle("");
    setTaskDescription("");
    setTaskAssignedTo("Sales Executive");
    setTaskDueDate("");
    setTaskPriority("Medium");
    setTaskStatus("Pending");
    setTaskEditIndex(null);
  };

  const handleTaskEdit = (index) => {
    const task = tasks[index];

    console.log("EDIT TASK:", task);

    setTaskTitle(task.title || "");
    setTaskDescription(task.description || "");

    setTaskAssignedTo(
      typeof task.assignedTo === "object"
        ? task.assignedTo?._id || ""
        : task.assignedTo || ""
    );

    setTaskDueDate(
      task.dueDate
        ? new Date(task.dueDate)
            .toISOString()
            .split("T")[0]
        : ""
    );

    setTaskPriority(
      task.priority || "Medium"
    );

    setTaskStatus(
      task.status || "Pending"
    );

    setTaskEditIndex(index);
    setShowTaskForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // TASK DELETE - BACKEND CONNECTED
  // =========================================================

  const handleTaskDelete = async (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        alert("Login session not found. Please login again.");
        return;
      }

      const taskToDelete = tasks[index];

      if (!taskToDelete || !taskToDelete._id) {
        alert("Task ID not found.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskToDelete._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to delete task."
        );
        return;
      }

      setTasks((prevTasks) =>
        prevTasks.filter(
          (_, taskIndex) =>
            taskIndex !== index
        )
      );

      alert("Task deleted successfully!");

    } catch (error) {
      console.error(
        "Task delete backend error:",
        error
      );

      alert(
        "Unable to connect to CRM360 backend."
      );
    }
  };

  const handleTaskView = (task) => {
    setSelectedTask(task);
  };

  // =========================================================
  // TASK STATUS - BACKEND CONNECTED
  // =========================================================

  const handleTaskStatusChange = async (
    index,
    newStatus
  ) => {
    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        alert("Login session not found. Please login again.");
        return;
      }

      const task = tasks[index];

      if (!task || !task._id) {
        alert("Task ID not found.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: task.title,
            description: task.description,
            assignedTo:
              task.assignedTo?._id ||
              task.assignedTo ||
              null,
            dueDate: task.dueDate,
            priority: task.priority,
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to update task status."
        );
        return;
      }

      const updatedTask =
        data.task || data;

      setTasks((prevTasks) =>
        prevTasks.map(
          (currentTask, taskIndex) =>
            taskIndex === index
              ? updatedTask
              : currentTask
        )
      );

    } catch (error) {
      console.error(
        "Task status update error:",
        error
      );

      alert(
        "Unable to connect to CRM360 backend."
      );
    }
  };

  // =========================================================
  // TASK COMPLETE - BACKEND CONNECTED
  // =========================================================

  const handleTaskComplete = async (index) => {
    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        alert("Login session not found. Please login again.");
        return;
      }

      const task = tasks[index];

      if (!task || !task._id) {
        alert("Task ID not found.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/tasks/${task._id}/complete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to complete task."
        );
        return;
      }

      const updatedTask =
        data.task || data;

      setTasks((prevTasks) =>
        prevTasks.map(
          (currentTask, taskIndex) =>
            taskIndex === index
              ? updatedTask
              : currentTask
        )
      );

      alert("Task marked as completed!");

    } catch (error) {
      console.error(
        "Task complete error:",
        error
      );

      alert(
        "Unable to connect to CRM360 backend."
      );
    }
  };

  const handleTaskAssignmentChange = (
    index,
    newAssignee
  ) => {
    const updatedTasks = [...tasks];

    updatedTasks[index] = {
      ...updatedTasks[index],
      assignedTo: newAssignee,
    };

    setTasks(updatedTasks);
  };

  // =========================================================
  // TASK FILTER
  // =========================================================

  const filteredTasks = tasks.filter((task) => {
    const searchText =
      taskSearch.toLowerCase();

    const matchesSearch =
      (task.title || "")
        .toLowerCase()
        .includes(searchText) ||
      (task.description || "")
        .toLowerCase()
        .includes(searchText) ||
      (task.assignedTo || "")
        .toString()
        .toLowerCase()
        .includes(searchText);

    const matchesStatus =
      taskFilterStatus === "All" ||
      task.status === taskFilterStatus;

    const matchesPriority =
      taskFilterPriority === "All" ||
      task.priority === taskFilterPriority;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  // =========================================================
  // DEAL HANDLERS
  // =========================================================

 const handleDealSubmit = async (e) => {
  e.preventDefault();

  if (
    !dealTitle ||
    !dealCustomer ||
    !dealValue ||
    !dealClosingDate
  ) {
    alert("Please fill all deal details");
    return;
  }

  try {
    const token =
      localStorage.getItem("crm360_token");

    if (!token) {
      alert(
        "Login session not found. Please login again."
      );
      return;
    }

    const selectedCustomer = customers.find(
      (customer) =>
        customer._id === dealCustomer ||
        customer.name === dealCustomer
    );

    // EDIT EXISTING DATABASE DEAL
    if (dealEditIndex !== null) {
      const existingDeal =
        deals[dealEditIndex];

      // Sample deal - keep local editing
      if (!existingDeal?._id) {
        const updatedDeal = {
          ...existingDeal,
          title: dealTitle,
          customer: dealCustomer,
          value: Number(dealValue),
          stage: dealStage,
          probability: Number(dealProbability),
          closingDate: dealClosingDate,
        };

        setDeals((prevDeals) =>
          prevDeals.map(
            (deal, index) =>
              index === dealEditIndex
                ? updatedDeal
                : deal
          )
        );

        alert("Deal updated successfully!");

        clearDealForm();
        setShowDealForm(false);
        return;
      }

      const dealData = {
        title: dealTitle,
        customer:
          selectedCustomer?._id ||
          existingDeal.customerId ||
          null,
        value: Number(dealValue),
        stage: dealStage,
        probability: Number(dealProbability),
        expectedCloseDate:
          dealClosingDate || null,
      };

      const response = await fetch(
        `http://localhost:5000/api/deals/${existingDeal._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dealData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to update deal."
        );
        return;
      }

      const updatedDeal =
        data.deal || data;

      setDeals((prevDeals) =>
        prevDeals.map(
          (deal, index) =>
            index === dealEditIndex
              ? normalizeDeal(updatedDeal)
              : deal
        )
      );

      alert("Deal updated successfully!");
    }

    // CREATE NEW DEAL
    else {
      if (!selectedCustomer?._id) {
        alert(
          "Please select a valid customer."
        );
        return;
      }

      const dealData = {
        title: dealTitle,
        customer: selectedCustomer._id,
        value: Number(dealValue),
        stage: dealStage,
        probability: Number(dealProbability),
        expectedCloseDate:
          dealClosingDate || null,
      };

      const response = await fetch(
        "http://localhost:5000/api/deals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dealData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Unable to create deal."
        );
        return;
      }

      const createdDeal =
        data.deal || data;

      setDeals((prevDeals) => [
        ...prevDeals,
        normalizeDeal(createdDeal),
      ]);

      alert("Deal created successfully!");
    }

    clearDealForm();
    setShowDealForm(false);
  } catch (error) {
    console.error(
      "Deal backend error:",
      error
    );

    alert(
      "Unable to connect to CRM360 backend."
    );
  }
};
  
  const clearDealForm = () => {
    setDealTitle("");
    setDealCustomer("");
    setDealValue("");
    setDealStage("New");
    setDealProbability(20);
    setDealClosingDate("");
    setDealEditIndex(null);
  };

  const handleDealEdit = (index) => {
    const deal = deals[index];

    setDealTitle(deal.title);
    setDealCustomer(deal.customer);
    setDealValue(deal.value);
    setDealStage(deal.stage);
    setDealProbability(deal.probability);
    setDealClosingDate(deal.closingDate);

    setDealEditIndex(index);
    setShowDealForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

 const handleDealDelete = async (index) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this deal?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const token =
      localStorage.getItem("crm360_token");

    if (!token) {
      alert(
        "Login session not found. Please login again."
      );
      return;
    }

    const dealToDelete = deals[index];

    if (!dealToDelete?._id) {
      alert("Deal ID not found.");
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/deals/${dealToDelete._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(
        data.message ||
          "Unable to delete deal."
      );
      return;
    }

    setDeals((prevDeals) =>
      prevDeals.filter(
        (_, dealIndex) =>
          dealIndex !== index
      )
    );

    alert("Deal deleted successfully!");
  } catch (error) {
    console.error(
      "Deal delete error:",
      error
    );

    alert(
      "Unable to connect to CRM360 backend."
    );
  }
};
  const filteredDeals = deals.filter((deal) => {
    const searchText =
      dealSearch.toLowerCase();

    const matchesSearch =
      deal.title
        .toLowerCase()
        .includes(searchText) ||
      deal.customer
        .toLowerCase()
        .includes(searchText) ||
      deal.stage
        .toLowerCase()
        .includes(searchText);

    const matchesStage =
      dealFilterStage === "All" ||
      deal.stage === dealFilterStage;

    return (
      matchesSearch &&
      matchesStage
    );
  });

  // =========================================================
  // REPORT CALCULATIONS
  // =========================================================

  const totalCustomers =
    customers.length;

  const activeCustomers =
    customers.filter(
      (customer) =>
        customer.status === "Active"
    ).length;

  const totalLeads =
    leads.length;

  const activeLeads =
    leads.filter(
      (lead) =>
        lead.status !== "Converted" &&
        lead.status !== "Lost"
    ).length;

  const totalTasks =
    tasks.length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status !== "Completed"
    ).length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const totalDeals =
    deals.length;

  const wonDeals =
    deals.filter(
      (deal) =>
        deal.stage === "Won"
    ).length;

  const lostDeals =
    deals.filter(
      (deal) =>
        deal.stage === "Lost"
    ).length;

  const totalSales =
    deals
      .filter(
        (deal) =>
          deal.stage === "Won"
      )
      .reduce(
        (total, deal) =>
          total +
          Number(deal.value),
        0
      );

  const pipelineValue =
    deals
      .filter(
        (deal) =>
          deal.stage !== "Lost"
      )
      .reduce(
        (total, deal) =>
          total +
          Number(deal.value),
        0
      );

  // =========================================================
  // NOTIFICATION DATA
  // =========================================================

  const taskNotifications =
    tasks
      .filter(
        (task) =>
          task.status !== "Completed"
      )
      .map((task) => ({
        type: "Task",
        message: `${task.title} is assigned to ${
          task.assignedTo || "Unassigned"
        }`,
        date: task.dueDate,
      }));

  const leadNotifications =
    leads
      .filter(
        (lead) =>
          lead.followUpDate &&
          lead.status !== "Converted"
      )
      .map((lead) => ({
        type: "Lead",
        message: `Follow-up required for ${lead.name}`,
        date: lead.followUpDate,
      }));

  const notifications = [
    ...taskNotifications,
    ...leadNotifications,
  ];

  // =========================================================
  // SETTINGS PAGE
  // =========================================================

  if (activePage === "settings") {
    return (
      <Settings
        language={language}
        theme={theme}
        setTheme={setTheme}
        setLanguage={setLanguage}
      />
    );
  }

  // =========================================================
  // CUSTOMER PAGE
  // =========================================================

  if (activePage === "customers") {
    return (
      <Customers
        language={language}

        showCustomerForm={
          showCustomerForm
        }
        setShowCustomerForm={
          setShowCustomerForm
        }
        clearCustomerForm={
          clearCustomerForm
        }

        customerEditIndex={
          customerEditIndex
        }

        customerName={
          customerName
        }
        setCustomerName={
          setCustomerName
        }

        customerEmail={
          customerEmail
        }
        setCustomerEmail={
          setCustomerEmail
        }

        customerPhone={
          customerPhone
        }
        setCustomerPhone={
          setCustomerPhone
        }

        customerCompany={
          customerCompany
        }
        setCustomerCompany={
          setCustomerCompany
        }

        customerStatus={
          customerStatus
        }
        setCustomerStatus={
          setCustomerStatus
        }

        handleCustomerSubmit={
          handleCustomerSubmit
        }

        customerSearch={
          customerSearch
        }
        setCustomerSearch={
          setCustomerSearch
        }

        customerFilterStatus={
          customerFilterStatus
        }
        setCustomerFilterStatus={
          setCustomerFilterStatus
        }

        filteredCustomers={
          filteredCustomers
        }
        customers={
          customers
        }

        handleCustomerView={
          handleCustomerView
        }
        handleCustomerEdit={
          handleCustomerEdit
        }
        handleCustomerDelete={
          handleCustomerDelete
        }

        selectedCustomer={
          selectedCustomer
        }
        setSelectedCustomer={
          setSelectedCustomer
        }
      />
    );
  }

  // =========================================================
  // LEADS PAGE
  // =========================================================

  if (activePage === "leads") {
    return (
      <Leads
        showLeadForm={
          showLeadForm
        }
        setShowLeadForm={
          setShowLeadForm
        }
        clearLeadForm={
          clearLeadForm
        }

        leadEditIndex={
          leadEditIndex
        }

        leadName={
          leadName
        }
        setLeadName={
          setLeadName
        }

        leadEmail={
          leadEmail
        }
        setLeadEmail={
          setLeadEmail
        }

        leadPhone={
          leadPhone
        }
        setLeadPhone={
          setLeadPhone
        }

        leadCompany={
          leadCompany
        }
        setLeadCompany={
          setLeadCompany
        }

        leadSource={
          leadSource
        }
        setLeadSource={
          setLeadSource
        }

        leadStatus={
          leadStatus
        }
        setLeadStatus={
          setLeadStatus
        }

        leadAssignedTo={
          leadAssignedTo
        }
        setLeadAssignedTo={
          setLeadAssignedTo
        }

        leadFollowUpDate={
          leadFollowUpDate
        }
        setLeadFollowUpDate={
          setLeadFollowUpDate
        }

        leadNotes={
          leadNotes
        }
        setLeadNotes={
          setLeadNotes
        }

        leadUsers={
          leadUsers
        }

        handleLeadSubmit={
          handleLeadSubmit
        }

        leadSearch={
          leadSearch
        }
        setLeadSearch={
          setLeadSearch
        }

        leadFilterStatus={
          leadFilterStatus
        }
        setLeadFilterStatus={
          setLeadFilterStatus
        }

        leadFilterSource={
          leadFilterSource
        }
        setLeadFilterSource={
          setLeadFilterSource
        }

        filteredLeads={
          filteredLeads
        }
        leads={
          leads
        }

        handleLeadAssignmentChange={
          handleLeadAssignmentChange
        }
        handleLeadStatusChange={
          handleLeadStatusChange
        }
        handleLeadView={
          handleLeadView
        }
        handleLeadEdit={
          handleLeadEdit
        }
        handleLeadDelete={
          handleLeadDelete
        }
        handleConvertLeadToCustomer={
          handleConvertLeadToCustomer
        }

        selectedLead={
          selectedLead
        }
        setSelectedLead={
          setSelectedLead
        }
      />
    );
  }

  // =========================================================
  // TASKS PAGE
  // =========================================================

  if (activePage === "tasks") {
    return (
      <Tasks
        showTaskForm={
          showTaskForm
        }
        setShowTaskForm={
          setShowTaskForm
        }
        clearTaskForm={
          clearTaskForm
        }

        taskEditIndex={
          taskEditIndex
        }

        taskTitle={
          taskTitle
        }
        setTaskTitle={
          setTaskTitle
        }

        taskAssignedTo={
          taskAssignedTo
        }
        setTaskAssignedTo={
          setTaskAssignedTo
        }

        taskDueDate={
          taskDueDate
        }
        setTaskDueDate={
          setTaskDueDate
        }

        taskPriority={
          taskPriority
        }
        setTaskPriority={
          setTaskPriority
        }

        taskStatus={
          taskStatus
        }
        setTaskStatus={
          setTaskStatus
        }

        taskDescription={
          taskDescription
        }
        setTaskDescription={
          setTaskDescription
        }

        handleTaskSubmit={
          handleTaskSubmit
        }

        taskSearch={
          taskSearch
        }
        setTaskSearch={
          setTaskSearch
        }

        taskFilterStatus={
          taskFilterStatus
        }
        setTaskFilterStatus={
          setTaskFilterStatus
        }

        taskFilterPriority={
          taskFilterPriority
        }
        setTaskFilterPriority={
          setTaskFilterPriority
        }

        filteredTasks={
          filteredTasks
        }
        tasks={
          tasks
        }

        handleTaskAssignmentChange={
          handleTaskAssignmentChange
        }
        handleTaskStatusChange={
          handleTaskStatusChange
        }
        handleTaskView={
          handleTaskView
        }
        handleTaskEdit={
          handleTaskEdit
        }
        handleTaskDelete={
          handleTaskDelete
        }
        handleTaskComplete={
          handleTaskComplete
        }

        selectedTask={
          selectedTask
        }
        setSelectedTask={
          setSelectedTask
        }
      />
    );
  }

  // =========================================================
  // DEALS / SALES PIPELINE PAGE
  // =========================================================

  if (activePage === "deals") {
    return (
      <Deals
        setShowDealForm={
          setShowDealForm
        }
        clearDealForm={
          clearDealForm
        }

        deals={
          deals
        }
        wonDeals={
          wonDeals
        }
        lostDeals={
          lostDeals
        }

        showDealForm={
          showDealForm
        }

        dealEditIndex={
          dealEditIndex
        }

        dealTitle={
          dealTitle
        }
        setDealTitle={
          setDealTitle
        }

        customers={
          customers
        }

        dealCustomer={
          dealCustomer
        }
        setDealCustomer={
          setDealCustomer
        }

        dealValue={
          dealValue
        }
        setDealValue={
          setDealValue
        }

        dealStage={
          dealStage
        }
        setDealStage={
          setDealStage
        }

        dealProbability={
          dealProbability
        }
        setDealProbability={
          setDealProbability
        }

        dealClosingDate={
          dealClosingDate
        }
        setDealClosingDate={
          setDealClosingDate
        }

        handleDealSubmit={
          handleDealSubmit
        }

        dealSearch={
          dealSearch
        }
        setDealSearch={
          setDealSearch
        }

        dealFilterStage={
          dealFilterStage
        }
        setDealFilterStage={
          setDealFilterStage
        }

        filteredDeals={
          filteredDeals
        }
        handleDealEdit={
          handleDealEdit
        }
        handleDealDelete={
          handleDealDelete
        }

        selectedDeal={
          selectedDeal
        }
        setSelectedDeal={
          setSelectedDeal
        }
      />
    );
  }

  // =========================================================
  // REPORTS PAGE
  // =========================================================

  if (activePage === "reports") {
    return (
      <Reports
        totalCustomers={
          totalCustomers
        }
        activeCustomers={
          activeCustomers
        }
        totalLeads={
          totalLeads
        }
        activeLeads={
          activeLeads
        }
        pendingTasks={
          pendingTasks
        }
        completedTasks={
          completedTasks
        }
        totalDeals={
          totalDeals
        }
        wonDeals={
          wonDeals
        }
        lostDeals={
          lostDeals
        }
        pipelineValue={
          pipelineValue
        }
        totalSales={
          totalSales
        }
        leads={
          leads
        }
        tasks={
          tasks
        }
        deals={
          deals
        }
        t={
          t
        }
        language={
          language
        }
      />
    );
  }

  // =========================================================
  // DASHBOARD PAGE
  // =========================================================
if (activePage === "dashboard") {
  return (
    <DashboardHome
     t={{
  dashboard: "Dashboard",
  salesOverview: "Sales Overview",
}}
      totalDeals={totalDeals}
      pipelineValue={pipelineValue}
      totalSales={totalSales}
      wonDeals={wonDeals}
      notifications={notifications}
      customers={customers}
      leads={leads}
    />
  );
}
  // =========================================================
  // DEFAULT PAGE
  // =========================================================

  return (
    <div className="page-content">

      <div className="page-header">

        <div>

          <h1>
            {activePage}
          </h1>

          <p>
            CRM360 Management System
          </p>

        </div>

      </div>

      <div className="content-card">

        <div className="empty-state">

          <h2>
            Page Under Development
          </h2>

          <p>
            This section will be available soon.
          </p>

        </div>

      </div>

    </div>
  );
}

// =============================================================
// MAIN DASHBOARD COMPONENT
// =============================================================

function Dashboard() {

  const [activePage, setActivePage] =
    useState("dashboard");

  const [theme, setTheme] =
    useState("light");

  const [language, setLanguage] =
    useState("English");

  // ===========================================================
  // LANGUAGE TRANSLATIONS
  // ===========================================================

  const translations = {
    English: {
      dashboard: "Dashboard",
      customers: "Customers",
      leads: "Leads",
      tasks: "Tasks",
      deals: "Deals",
      reports: "Reports",
      settings: "Settings",
      notifications: "Notifications",
      logout: "Logout",
      totalCustomers: "Total Customers",
      activeLeads: "Active Leads",
      pendingTasks: "Pending Tasks",
      closedDeals: "Closed Deals",
      salesOverview: "Sales Overview",
      recentActivities: "Recent Activities",
      upcomingTasks: "Upcoming Tasks",
      customerName: "Customer Name",
      leadStatus: "Lead Status",
      taskStatus: "Task Status",
      dealStatus: "Deal Status",
    },

    Tamil: {
      dashboard: "டாஷ்போர்டு",
      customers: "வாடிக்கையாளர்கள்",
      leads: "லீட்கள்",
      tasks: "பணிகள்",
      deals: "டீல்கள்",
      reports: "அறிக்கைகள்",
      settings: "அமைப்புகள்",
      notifications: "அறிவிப்புகள்",
      logout: "வெளியேறு",
      totalCustomers: "மொத்த வாடிக்கையாளர்கள்",
      activeLeads: "செயலில் உள்ள லீட்கள்",
      pendingTasks: "நிலுவையில் உள்ள பணிகள்",
      closedDeals: "முடிக்கப்பட்ட டீல்கள்",
      salesOverview: "விற்பனை மேலோட்டம்",
      recentActivities: "சமீபத்திய செயல்பாடுகள்",
      upcomingTasks: "வரவிருக்கும் பணிகள்",
      customerName: "வாடிக்கையாளர் பெயர்",
      leadStatus: "லீட் நிலை",
      taskStatus: "பணி நிலை",
      dealStatus: "டீல் நிலை",
    },
  };

  const t =
    translations[language];

  useEffect(() => {
    document.body.classList.remove(
      "light-theme",
      "dark-theme"
    );

    if (theme === "dark") {
      document.body.classList.add(
        "dark-theme"
      );
    } else {
      document.body.classList.add(
        "light-theme"
      );
    }
  }, [theme]);

  const [userRole, setUserRole] =
    useState("Admin");

  const [showNotifications, setShowNotifications] =
    useState(false);

  // ===========================================================
  // SIDEBAR MENU
  // ===========================================================

  const menuItems = [
    {
      id: "dashboard",
      label: t.dashboard,
      icon: "🏠",
    },
    {
      id: "customers",
      label: t.customers,
      icon: "👥",
    },
    {
      id: "leads",
      label: t.leads,
      icon: "📈",
    },
    {
      id: "tasks",
      label: t.tasks,
      icon: "📋",
    },
    {
      id: "deals",
      label: t.deals,
      icon: "💰",
    },
    {
      id: "reports",
      label: t.reports,
      icon: "📊",
    },
    {
      id: "settings",
      label: t.settings,
      icon: "⚙️",
    },
  ];

  return (
    <div className="dashboard-layout">

      {/* =======================================================
          SIDEBAR
          ======================================================= */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <div className="logo-icon">
            C
          </div>

          <div>

            <h2>
              CRM360
            </h2>

            <span>
              CRM Platform
            </span>

          </div>

        </div>

        <div className="sidebar-menu">

          <p className="menu-title">
            {language === "Tamil"
              ? "முக்கிய மெனு"
              : "MAIN MENU"}
          </p>

          {menuItems.map(
            (item) => (

              <button
                key={item.id}
                type="button"
                className={`menu-item ${
                  activePage === item.id
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setActivePage(
                    item.id
                  )
                }
              >

                <span className="menu-icon">
                  {item.icon}
                </span>

                <span>
                  {item.label}
                </span>

              </button>

            )
          )}

        </div>

        <button
          type="button"
          className="menu-item logout-menu-item"
          onClick={handleLogout}
        >

          <span className="menu-icon">
            🚪
          </span>

          <span>
            {t.logout}
          </span>

        </button>

        <div className="sidebar-footer">

          <div className="sidebar-user">

            <div className="user-avatar">
            </div>

            <div className="user-info">

              <strong>
                Admin User
              </strong>

              <span>
                {userRole}
              </span>

            </div>

          </div>

        </div>

      </aside>

      {/* =======================================================
          MAIN AREA
          ======================================================= */}

      <main className="dashboard-main">

        {/* =====================================================
            TOP BAR
            ===================================================== */}

        <header className="topbar">

          <div className="topbar-left">

            <h2>
              {activePage === "dashboard"
                ? t.dashboard
                : activePage === "customers"
                ? t.customers
                : activePage === "leads"
                ? t.leads
                : activePage === "tasks"
                ? t.tasks
                : activePage === "deals"
                ? t.deals
                : activePage === "reports"
                ? t.reports
                : activePage === "settings"
                ? t.settings
                : activePage}
            </h2>

          </div>

          <div className="topbar-right">

            {/* =================================================
                NOTIFICATION BUTTON
                ================================================= */}

            <button
              type="button"
              className="notification-button"
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
            >

              🔔

              <span className="notification-dot">
                •
              </span>

            </button>

            {/* =================================================
                ROLE SELECTOR
                ================================================= */}

            <div className="role-selector">

              <label>
                {language === "Tamil"
                  ? "பங்கு:"
                  : "Role:"}
              </label>

              <select
                value={userRole}
                onChange={(e) =>
                  setUserRole(
                    e.target.value
                  )
                }
              >

                <option value="Admin">
                  Admin
                </option>

                <option value="Sales Manager">
                  Sales Manager
                </option>

                <option value="Sales Executive">
                  Sales Executive
                </option>

              </select>

            </div>

            {/* =================================================
                USER PROFILE
                ================================================= */}

            <div className="topbar-user">

              <div className="user-avatar">
              </div>

              <div>

                <strong>
                  Admin User
                </strong>

                <span>
                  {userRole}
                </span>

              </div>

            </div>

          </div>

        </header>

        {/* =====================================================
            QUICK NOTIFICATION DROPDOWN
            ===================================================== */}

        {showNotifications && (
          <div className="notification-dropdown">

            <div className="notification-dropdown-header">

              <h3>
                {t.notifications}
              </h3>

              <button
                type="button"
                onClick={() =>
                  setShowNotifications(
                    false
                  )
                }
              >
                ×
              </button>

            </div>

            <div className="notification-dropdown-body">

              <p>
                {language === "Tamil"
                  ? "பணிகள் மற்றும் லீட்களின் அறிவிப்புகளுக்கு டாஷ்போர்டைப் பார்க்கவும்."
                  : "Check the Dashboard for task and lead notifications."}
              </p>

            </div>

          </div>
        )}

        {/* =====================================================
            PAGE CONTENT
            ===================================================== */}

        <PageContent
          activePage={
            activePage
          }
          theme={
            theme
          }
          language={
            language
          }
          setTheme={
            setTheme
          }
          setLanguage={
            setLanguage
          }
          t={
            t
          }
          userRole={
            userRole
          }
        />

      </main>

    </div>
  );
}

export default Dashboard;