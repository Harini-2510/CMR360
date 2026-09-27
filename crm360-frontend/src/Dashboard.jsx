import { useState ,useEffect } from "react";
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
  setLanguage
}) {
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

  const [customers, setCustomers] = useState([]);
   
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
          "https://cmr360.onrender.com/api/customers",
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

  
  const [leads, setLeads] = useState([]);

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
          "https://cmr360.onrender.com/api/users",
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
        "https://cmr360.onrender.com/api/tasks",
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
// DEALS BACKEND INTEGRATION
// =========================================================
useEffect(() => {
  const loadDealsFromBackend = async () => {
    try {
      const token = localStorage.getItem("crm360_token");

      if (!token) {
        console.log("CRM360 token not found.");
        return;
      }

      const response = await fetch(
        "https://cmr360.onrender.com/api/deals",
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
          "Deal fetch failed:",
          data.message || "Unable to load deals."
        );
        return;
      }

      if (Array.isArray(data)) {
        setDeals(data);
      } else if (Array.isArray(data.deals)) {
        setDeals(data.deals);
      }
    } catch (error) {
      console.error(
        "Deal backend connection error:",
        error
      );
    }
  };

  loadDealsFromBackend();
}, []);
// =========================================================
// CUSTOMERS BACKEND INTEGRATION
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
        "https://cmr360.onrender.com/api/customers",
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
      }
    } catch (error) {
      console.error(
        "Customer backend connection error:",
        error
      );
    }
  };

  loadCustomersFromBackend();
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
          "https://cmr360.onrender.com/api/leads",
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
  // DEAL STATES
  // =========================================================

const [deals, setDeals] = useState([]);

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
          `https://cmr360.onrender.com/api/customers/${customerToUpdate._id}`,
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
          "https://cmr360.onrender.com/api/customers",
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
        `http:/localhost:5000/api/customers/${customerToDelete._id}`,
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
      assignedTo: leadAssignedTo,
      notes: leadNotes,
      followUpDate: leadFollowUpDate,
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
          `https://cmr360.onrender.com/api/leads/${leadToUpdate._id}`,
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
          "https://cmr360.onrender.com/api/leads",
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
    const lead = leads[index];

    setLeadName(lead.name);
    setLeadEmail(lead.email);
    setLeadPhone(lead.phone);
    setLeadCompany(lead.company);
    setLeadSource(lead.source);
    setLeadStatus(lead.status);
    setLeadAssignedTo(lead.assignedTo?._id || "");
    setLeadNotes(lead.notes);
    setLeadFollowUpDate(lead.followUpDate);

    setLeadEditIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      `https://cmr360.onrender.com/api/leads/${leadToDelete._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Unable to delete lead.");
      return;
    }

    const updatedLeads = leads.filter(
      (_, leadIndex) => leadIndex !== index
    );

    setLeads(updatedLeads);

    alert("Lead deleted successfully!");
  } catch (error) {
    console.error("Lead delete backend error:", error);

    alert("Unable to connect to CRM360 backend.");
  }
};
  const filteredLeads = leads.filter((lead) => {
    const searchText = leadSearch.toLowerCase();

    const matchesSearch =
      lead.name.toLowerCase().includes(searchText) ||
      lead.email.toLowerCase().includes(searchText) ||
      lead.phone.toLowerCase().includes(searchText) ||
      lead.company.toLowerCase().includes(searchText);

    const matchesStatus =
      leadFilterStatus === "All" ||
      lead.status === leadFilterStatus;

    const matchesSource =
      leadFilterSource === "All" ||
      lead.source === leadFilterSource;

    return matchesSearch && matchesStatus && matchesSource;
  });

  // =========================================================
  // TASK HANDLERS
  // =========================================================

  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (!taskTitle || !taskDescription || !taskDueDate) {
      alert("Please fill all task details");
      return;
    }

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      assignedTo: taskAssignedTo,
      dueDate: taskDueDate,
      priority: taskPriority,
      status: taskStatus,
    };

    if (taskEditIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[taskEditIndex] = newTask;
      setTasks(updatedTasks);
      alert("Task updated successfully!");
    } else {
      setTasks([...tasks, newTask]);
      alert("Task created successfully!");
    }

    clearTaskForm();
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

    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setTaskAssignedTo(task.assignedTo);
    setTaskDueDate(task.dueDate);
    setTaskPriority(task.priority);
    setTaskStatus(task.status);

    setTaskEditIndex(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleTaskDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedTasks = tasks.filter(
      (_, taskIndex) => taskIndex !== index
    );

    setTasks(updatedTasks);
  };

  const handleTaskView = (task) => {
    setSelectedTask(task);
  };

  const handleTaskStatusChange = (index, newStatus) => {
    const updatedTasks = [...tasks];

    updatedTasks[index] = {
      ...updatedTasks[index],
      status: newStatus,
    };

    setTasks(updatedTasks);
  };

  const handleTaskComplete = (index) => {
    const updatedTasks = [...tasks];

    updatedTasks[index] = {
      ...updatedTasks[index],
      status: "Completed",
    };

    setTasks(updatedTasks);

    alert("Task marked as completed!");
  };

  const handleTaskAssignmentChange = (index, newAssignee) => {
    const updatedTasks = [...tasks];

    updatedTasks[index] = {
      ...updatedTasks[index],
      assignedTo: newAssignee,
    };

    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    const searchText = taskSearch.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      task.description.toLowerCase().includes(searchText) ||
      task.assignedTo.toLowerCase().includes(searchText);

    const matchesStatus =
      taskFilterStatus === "All" ||
      task.status === taskFilterStatus;

    const matchesPriority =
      taskFilterPriority === "All" ||
      task.priority === taskFilterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // =========================================================
  // DEAL HANDLERS
  // =========================================================

  const handleDealSubmit = (e) => {
    e.preventDefault();

    if (!dealTitle || !dealCustomer || !dealValue || !dealClosingDate) {
      alert("Please fill all deal details");
      return;
    }

    const newDeal = {
      title: dealTitle,
      customer: dealCustomer,
      value: Number(dealValue),
      stage: dealStage,
      probability: Number(dealProbability),
      closingDate: dealClosingDate,
    };

    if (dealEditIndex !== null) {
      const updatedDeals = [...deals];
      updatedDeals[dealEditIndex] = newDeal;
      setDeals(updatedDeals);
      alert("Deal updated successfully!");
    } else {
      setDeals([...deals, newDeal]);
      alert("Deal created successfully!");
    }

    clearDealForm();
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDealDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this deal?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedDeals = deals.filter(
      (_, dealIndex) => dealIndex !== index
    );

    setDeals(updatedDeals);
  };

  const handleDealView = (deal) => {
    setSelectedDeal(deal);
  };

  const handleDealStageChange = (index, newStage) => {
    let probability = 20;

    if (newStage === "Contacted") {
      probability = 30;
    }

    if (newStage === "Qualified") {
      probability = 50;
    }

    if (newStage === "Proposal Sent") {
      probability = 70;
    }

    if (newStage === "Won") {
      probability = 100;
    }

    if (newStage === "Lost") {
      probability = 0;
    }

    const updatedDeals = [...deals];

    updatedDeals[index] = {
      ...updatedDeals[index],
      stage: newStage,
      probability: probability,
    };

    setDeals(updatedDeals);
  };

  const filteredDeals = deals.filter((deal) => {
    const searchText = dealSearch.toLowerCase();

    const matchesSearch =
      deal.title.toLowerCase().includes(searchText) ||
      deal.customer.toLowerCase().includes(searchText) ||
      deal.stage.toLowerCase().includes(searchText);

    const matchesStage =
      dealFilterStage === "All" ||
      deal.stage === dealFilterStage;

    return matchesSearch && matchesStage;
  });

  // =========================================================
  // REPORT CALCULATIONS
  // =========================================================

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const totalLeads = leads.length;

  const activeLeads = leads.filter(
    (lead) =>
      lead.status !== "Converted" &&
      lead.status !== "Lost"
  ).length;

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const totalDeals = deals.length;

  const wonDeals = deals.filter(
    (deal) => deal.stage === "Won"
  ).length;

  const lostDeals = deals.filter(
    (deal) => deal.stage === "Lost"
  ).length;

  const totalSales = deals
    .filter((deal) => deal.stage === "Won")
    .reduce((total, deal) => total + Number(deal.value), 0);

  const pipelineValue = deals
    .filter((deal) => deal.stage !== "Lost")
    .reduce((total, deal) => total + Number(deal.value), 0);

  // =========================================================
  // NOTIFICATION DATA
  // =========================================================

  const taskNotifications = tasks
    .filter((task) => task.status !== "Completed")
    .map((task) => ({
      type: "Task",
      message: `${task.title} is assigned to ${task.assignedTo}`,
      date: task.dueDate,
    }));

  const leadNotifications = leads
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
  // CUSTOMER PAGE
  // =========================================================
if (activePage === "settings") {
  return (
    <div className="page-content">

      <div className="page-header">
        <div>
              <h1>
                {language === "Tamil" ? "அமைப்புகள்" : "Settings"} 
              </h1>

              <p>
               {language === "Tamil"
                 ? "உங்கள் CRM360 கணக்கு மற்றும் விருப்பங்களை நிர்வகிக்கவும்"
                 : "Manage your CRM360 account and preferences"}
              </p>
        </div>
      </div>

      <div className="settings-container">

        {/* PROFILE SETTINGS */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h2>
              👤 {language === "Tamil"
                     ? "சுயவிவர அமைப்புகள்"
                     : "Profile Settings"}
            </h2>

            <p>
             {language === "Tamil"
                ? "உங்கள் தனிப்பட்ட தகவல்களை நிர்வகிக்கவும்"
                : "Manage your personal information"}
            </p>
          </div>

          <div className="settings-form">

            <div className="settings-field">
              <label>
                {language === "Tamil" ? "முழு பெயர்" : "Full Name"}
              </label>
              <input
                type="text"
                defaultValue="CRM360 User"
                placeholder="Enter your full name"
              />
            </div>

            <div className="settings-field">
              <label>
                {language === "Tamil" ? "மின்னஞ்சல்" : "Email"}
              </label>
              <input
                type="email"
                defaultValue="user@crm360.com"
                placeholder="Enter your email"
              />
            </div>

            <div className="settings-field">
              <label>
                {language === "Tamil" ? "தொலைபேசி எண்" : "Phone Number"}
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
              />
            </div>

            <button
              className="settings-save-btn"
              onClick={() =>
                alert("Profile settings saved successfully!")
              }
            >
              Save Profile
            </button>

          </div>
        </div>


        {/* PASSWORD SETTINGS */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h2>
              🔐 {language === "Tamil" ? "கடவுச்சொல்" : "Password"}
            </h2>
            <p>
              {language === "Tamil"
              ? "உங்கள் கணக்கு கடவுச்சொல்லைப் புதுப்பிக்கவும்"
              : "Update your account password"}
            </p>
          </div>

          <div className="settings-form">

            <div className="settings-field">
              <label>
                {language === "Tamil"
                ? "தற்போதைய கடவுச்சொல்"
                : "Current Password"}
              </label>
              <input
               type="password"
               placeholder={
               language === "Tamil"
               ? "தற்போதைய கடவுச்சொல்லை உள்ளிடவும்"
               : "Enter current password"
               }
              />
            </div>

            <div className="settings-field">
              <label>
                {language === "Tamil"
                ? "புதிய கடவுச்சொல்"
                : "New Password"}
              </label>
              <input
               type="password"
               placeholder={
               language === "Tamil"
               ? "புதிய கடவுச்சொல்லை உள்ளிடவும்"
               : "Enter new password"
              }
              />
            </div>

            <div className="settings-field">
              <label>
                {language === "Tamil"
                ? "புதிய கடவுச்சொல்லை உறுதிப்படுத்தவும்"
                : "Confirm New Password"}
              </label>
              <input
              type="password"
              placeholder={
              language === "Tamil"
              ? "புதிய கடவுச்சொல்லை மீண்டும் உள்ளிடவும்"
              : "Confirm new password"
              }
            />
            </div>

            <button
              className="settings-save-btn"
              onClick={() =>
                alert("Password updated successfully!")
              }
            >
              Update Password
            </button>

          </div>
        </div>


        {/* NOTIFICATION SETTINGS */}
        <div className="settings-card">
          <div className="settings-card-header">
            <h2>
             🔔 {language === "Tamil" ? "அறிவிப்புகள்" : "Notifications"}
            </h2>

            <p>
             {language === "Tamil"
             ? "உங்கள் அறிவிப்பு விருப்பங்களைத் தேர்வு செய்யவும்"
             : "Choose your notification preferences"}
            </p>
          </div>

          <div className="settings-options">

            <div className="settings-option">
              <div>
                <h3>
                  {language === "Tamil"
                  ? "பணி அறிவிப்புகள்"
                  : "Task Notifications"}
                </h3>

                <p>
                 {language === "Tamil"
                 ? "ஒதுக்கப்பட்ட பணிகள் குறித்து அறிவிப்பைப் பெறவும்"
                 : "Get notified about assigned tasks"}
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked
                />
                <span className="slider"></span>
              </label>
            </div>


            <div className="settings-option">
              <div>
                <h3>
                  {language === "Tamil"
                  ? "லீட் புதுப்பிப்புகள்"
                  : "Lead Updates"}
                </h3>

                <p>
                  {language === "Tamil"
                  ? "லீட் நிலை மாறும்போது புதுப்பிப்புகளைப் பெறவும்"
                  : "Receive updates when lead status changes"}
                </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked
                />
                <span className="slider"></span>
              </label>
            </div>


            <div className="settings-option">
              <div>
                <h3>
                  {language === "Tamil"
                  ? "காலக்கெடு நினைவூட்டல்கள்"
                  : "Deadline Reminders"}
                </h3>

              <p>
               {language === "Tamil"
               ? "வரவிருக்கும் காலக்கெடுகளுக்கான நினைவூட்டல்களைப் பெறவும்"
               : "Get reminders for upcoming deadlines"}
              </p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  defaultChecked
                />
                <span className="slider"></span>
              </label>
            </div>

          </div>
        </div>


        {/* APPEARANCE SETTINGS */}
<div className="settings-card">
  <div className="settings-card-header">
    <h2>
  🎨 {language === "Tamil" ? "தோற்றம்" : "Appearance"}
    </h2>

    <p>
     {language === "Tamil"
     ? "உங்கள் CRM360 இடைமுகத்தைத் தனிப்பயனாக்கவும்"
     : "Customize your CRM360 interface"}
    </p>
  </div>

  <div className="settings-form">

    <div className="settings-field">
      <label>
         {language === "Tamil" ? "தீம்" : "Theme"}
      </label>

      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
       <option value="light">
         {language === "Tamil" ? "வெளிச்சம்" : "Light"}
       </option>

       <option value="dark">
         {language === "Tamil" ? "இருள்" : "Dark"}
       </option>

       <option value="system">
        {language === "Tamil" ? "கணினி இயல்புநிலை" : "System Default"}
       </option>
      </select>
    </div>


    <div className="settings-field">
       <label>
         {language === "Tamil" ? "மொழி" : "Language"}
       </label>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="English">English</option>
        <option value="Tamil">Tamil</option>
      </select>
    </div>


    <button
       className="settings-save-btn"
       onClick={() =>
         alert(
           language === "Tamil"
           ? "தோற்ற அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன!"
           : "Appearance settings saved successfully!"
          )
        }
      >
       {language === "Tamil"
         ? "விருப்பங்களைச் சேமிக்கவும்"
         : "Save Preferences"}
    </button>
  </div>
</div>

      </div>
    </div>
  );
}
  if (activePage === "customers") {
    return (
      <div className="page-content">

        <div className="page-header">
          <div>
            <h1>
              {language === "Tamil"
              ? "வாடிக்கையாளர்கள்"
              : "Customers"}
            </h1>

            <p>
             {language === "Tamil"
             ? "உங்கள் வாடிக்கையாளர் தகவல்களை நிர்வகிக்கவும்"
             : "Manage your customer information"}
            </p>
          </div>
        </div>

        <div className="content-card">

          <div className="card-header">
            <h2>
             {customerEditIndex !== null
             ? language === "Tamil"
             ? "வாடிக்கையாளரைப் புதுப்பிக்கவும்"
             : "Update Customer"
             : language === "Tamil"
             ? "வாடிக்கையாளரைச் சேர்க்கவும்"
             : "Add Customer"}
            </h2>
          </div>

          <form
            onSubmit={handleCustomerSubmit}
            className="form-grid"
          >

            <div className="form-group">
              <label>
                {language === "Tamil"
                ? "வாடிக்கையாளர் பெயர்"
                : "Customer Name"}
              </label>
              <input
                type="text"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) =>
                  setCustomerName(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                {language === "Tamil"
                ? "மின்னஞ்சல்"
                : "Email"}
              </label>
              <input
                type="email"
                placeholder="Enter email"
                value={customerEmail}
                onChange={(e) =>
                  setCustomerEmail(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                 {language === "Tamil"
                 ? "தொலைபேசி"
                 : "Phone"}
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={customerPhone}
                onChange={(e) =>
                  setCustomerPhone(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                {language === "Tamil"
                ? "நிறுவனம்"
                : "Company"}
              </label>
              <input
                type="text"
                placeholder="Enter company name"
                value={customerCompany}
                onChange={(e) =>
                  setCustomerCompany(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>
                 {language === "Tamil"
                 ? "நிலை"
                 : "Status"}
              </label>
              <select
                value={customerStatus}
                onChange={(e) =>
                  setCustomerStatus(e.target.value)
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                {customerEditIndex !== null
                  ? "Update Customer"
                  : "Add Customer"}
              </button>

              {customerEditIndex !== null && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={clearCustomerForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        <div className="content-card">

          <div className="card-header">
            <h2>
             {language === "Tamil"
             ? "வாடிக்கையாளர் பட்டியல்"
             : "Customer List"}
            </h2>

            <div className="table-controls">

              <input
                type="text"
                placeholder={
                 language === "Tamil"
                 ? "வாடிக்கையாளர்களைத் தேடவும்..."
                 : "Search customers..."
                }
                value={customerSearch}
                onChange={(e) =>
                  setCustomerSearch(e.target.value)
                }
              />

              <select
                value={customerFilterStatus}
                onChange={(e) =>
                  setCustomerFilterStatus(e.target.value)
                }
              >
                <option value="All">
                  {language === "Tamil" ? "அனைத்து நிலைகள்" : "All Status"}
                </option>

                <option value="Active">
                   {language === "Tamil" ? "செயலில்" : "Active"}
                </option>

                <option value="Inactive">
                   {language === "Tamil" ? "செயலற்றது" : "Inactive"}
                </option>
              </select>

            </div>
          </div>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>
                    {language === "Tamil" ? "பெயர்" : "Name"}
                  </th>

                  <th>
                   {language === "Tamil" ? "மின்னஞ்சல்" : "Email"}
                  </th>

                  <th>
                   {language === "Tamil" ? "தொலைபேசி" : "Phone"}
                  </th>

                  <th>
                   {language === "Tamil" ? "நிறுவனம்" : "Company"}
                  </th>

                  <th>
                   {language === "Tamil" ? "நிலை" : "Status"}
                  </th>

                  <th>
                   {language === "Tamil" ? "செயல்கள்" : "Actions"}
                  </th>
                </tr>
              </thead>

              <tbody>

                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="empty-state"
                    >
                      {language === "Tamil"
                         ? "வாடிக்கையாளர்கள் எவரும் கிடைக்கவில்லை"
                         : "No customers found"}
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => {

                     const originalIndex =
                     customers.findIndex(
                     (item) =>
                     item._id === customer._id
                     );
                    return (
                      <tr key={originalIndex}>

                        <td>
                          <strong>
                            {customer.name}
                          </strong>
                        </td>

                        <td>
                          {customer.email}
                        </td>

                        <td>
                          {customer.phone}
                        </td>

                        <td>
                          {customer.company}
                        </td>

                        <td>
                          <span
                            className={`status-badge ${
                              customer.status === "Active"
                                ? "active"
                                : "inactive"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </td>

                        <td>

                          <div className="action-buttons">

                            <button
                              type="button"
                              className="view-btn"
                              onClick={() =>
                                handleCustomerView(customer)
                              }
                            >
                              View
                            </button>

                            <button
                              type="button"
                              className="edit-btn"
                              onClick={() =>
                                handleCustomerEdit(
                                  originalIndex
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() =>
                                handleCustomerDelete(
                                  originalIndex
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })
                )}

              </tbody>

            </table>

          </div>

        </div>

        {selectedCustomer && (
          <div className="modal-overlay">

            <div className="modal">

              <div className="modal-header">
                <h2>Customer Details</h2>

                <button
                  type="button"
                  className="close-btn"
                  onClick={() =>
                    setSelectedCustomer(null)
                  }
                >
                  ×
                </button>
              </div>

              <div className="modal-body">

                <p>
                  <strong>Name:</strong>{" "}
                  {selectedCustomer.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {selectedCustomer.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedCustomer.phone}
                </p>

                <p>
                  <strong>Company:</strong>{" "}
                  {selectedCustomer.company}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {selectedCustomer.status}
                </p>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setSelectedCustomer(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    );
  }

  // =========================================================
  // LEADS PAGE
  // =========================================================

  if (activePage === "leads") {
    return (
      <div className="page-content">

        <div className="page-header">
          <div>
            <h1>Leads</h1>
            <p>
              Manage sales leads, assignments and follow-ups
            </p>
          </div>
        </div>

        <div className="content-card">

          <div className="card-header">
            <h2>
              {leadEditIndex !== null
                ? "Update Lead"
                : "Create Lead"}
            </h2>
          </div>

          <form
            onSubmit={handleLeadSubmit}
            className="form-grid"
          >

            <div className="form-group">
              <label>Lead Name</label>
              <input
                type="text"
                placeholder="Enter lead name"
                value={leadName}
                onChange={(e) =>
                  setLeadName(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={leadEmail}
                onChange={(e) =>
                  setLeadEmail(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={leadPhone}
                onChange={(e) =>
                  setLeadPhone(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                placeholder="Enter company"
                value={leadCompany}
                onChange={(e) =>
                  setLeadCompany(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Lead Source</label>
              <select
                value={leadSource}
                onChange={(e) =>
                  setLeadSource(e.target.value)
                }
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">
                  Social Media
                </option>
                <option value="Advertisement">
                  Advertisement
                </option>
                <option value="Cold Call">
                  Cold Call
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Lead Status</label>
              <select
                value={leadStatus || ""}
                onChange={(e) =>
                  setLeadStatus(e.target.value)
                }
              >
                <option value="New">New</option>
                <option value="Contacted">
                  Contacted
                </option>
                <option value="Qualified">
                  Qualified
                </option>
                <option value="Proposal Sent">
                  Proposal Sent
                </option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
                <option value="Converted">
                  Converted
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Assign To</label>
              <select
  value={leadAssignedTo ||""}
  onChange={(e) =>
    setLeadAssignedTo(e.target.value)
  }
>
  <option value="">
    Select User
  </option>

  {leadUsers
    .filter((user) => user.isActive !== false)
    .map((user) => (
      <option
        key={user._id}
        value={user._id}
      >
        {user.name} - {user.role}
      </option>
    ))}
</select>
            </div>

            <div className="form-group">
              <label>Follow-up Date</label>
              <input
                type="date"
                value={leadFollowUpDate}
                onChange={(e) =>
                  setLeadFollowUpDate(e.target.value)
                }
              />
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea
                placeholder="Add lead notes or follow-up details"
                value={leadNotes}
                onChange={(e) =>
                  setLeadNotes(e.target.value)
                }
                rows="4"
              ></textarea>
            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                {leadEditIndex !== null
                  ? "Update Lead"
                  : "Create Lead"}
              </button>

              {leadEditIndex !== null && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={clearLeadForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        <div className="content-card">

          <div className="card-header">

            <h2>Lead List</h2>

            <div className="table-controls">

              <input
                type="text"
                placeholder="Search leads..."
                value={leadSearch}
                onChange={(e) =>
                  setLeadSearch(e.target.value)
                }
              />

              <select
                value={leadFilterStatus}
                onChange={(e) =>
                  setLeadFilterStatus(e.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">
                  Contacted
                </option>
                <option value="Qualified">
                  Qualified
                </option>
                <option value="Proposal Sent">
                  Proposal Sent
                </option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
                <option value="Converted">
                  Converted
                </option>
              </select>

              <select
                value={leadFilterSource}
                onChange={(e) =>
                  setLeadFilterSource(e.target.value)
                }
              >
                <option value="All">All Sources</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">
                  Social Media
                </option>
                <option value="Advertisement">
                  Advertisement
                </option>
                <option value="Cold Call">
                  Cold Call
                </option>
                <option value="Other">Other</option>
              </select>

            </div>

          </div>

          <div className="table-container">

            <table>

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Source</th>
                  <th>Assigned To</th>
                  <th>Status</th>
                  <th>Follow-up</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {filteredLeads.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="empty-state"
                    >
                      No leads found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {

                    const originalIndex =
                      leads.findIndex(
                        (item) =>
                          item.name === lead.name &&
                          item.email === lead.email &&
                          item.phone === lead.phone
                      );

                    return (
                      <tr key={originalIndex}>

                        <td>
                          <strong>
                            {lead.name}
                          </strong>
                        </td>

                        <td>
                          {lead.company}
                        </td>

                        <td>
                          {lead.source}
                        </td>

                        <td>

                          <select
  value={
    lead.assignedTo?._id ||
    lead.assignedTo ||
    ""
  }
  onChange={(e) =>
    handleLeadAssignmentChange(
      originalIndex,
      e.target.value
    )
  }
>
  <option value="">
    Select User
  </option>

  {leadUsers
    .filter((user) => user.isActive !== false)
    .map((user) => (
      <option
        key={user._id}
        value={user._id}
      >
        {user.name} - {user.role}
      </option>
    ))}
</select>
                        </td>

                        <td>

                          <select
                            value={lead.status}
                            onChange={(e) =>
                              handleLeadStatusChange(
                                originalIndex,
                                e.target.value
                              )
                            }
                          >
                            <option value="New">
                              New
                            </option>
                            <option value="Contacted">
                              Contacted
                            </option>
                            <option value="Qualified">
                              Qualified
                            </option>
                            <option value="Proposal Sent">
                              Proposal Sent
                            </option>
                            <option value="Won">
                              Won
                            </option>
                            <option value="Lost">
                              Lost
                            </option>
                            <option value="Converted">
                              Converted
                            </option>
                          </select>

                        </td>

                        <td>
                          {lead.followUpDate || "Not set"}
                        </td>

                        <td>

                          <div className="action-buttons">

                            <button
                              type="button"
                              className="view-btn"
                              onClick={() =>
                                handleLeadView(lead)
                              }
                            >
                              View
                            </button>

                            <button
                              type="button"
                              className="edit-btn"
                              onClick={() =>
                                handleLeadEdit(
                                  originalIndex
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() =>
                                handleLeadDelete(
                                  originalIndex
                                )
                              }
                            >
                              Delete
                            </button>

                            {lead.status !== "Converted" && (
                              <button
                                type="button"
                                className="primary-btn small-btn"
                                onClick={() =>
                                  handleConvertLeadToCustomer(
                                    originalIndex
                                  )
                                }
                              >
                                Convert
                              </button>
                            )}

                          </div>

                        </td>

                      </tr>
                    );
                  })
                )}

              </tbody>

            </table>

          </div>

        </div>

        {selectedLead && (
          <div className="modal-overlay">

            <div className="modal">

              <div className="modal-header">

                <h2>Lead Details</h2>

                <button
                  type="button"
                  className="close-btn"
                  onClick={() =>
                    setSelectedLead(null)
                  }
                >
                  ×
                </button>

              </div>

              <div className="modal-body">

                <p>
                  <strong>Name:</strong>{" "}
                  {selectedLead.name}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {selectedLead.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedLead.phone}
                </p>

                <p>
                  <strong>Company:</strong>{" "}
                  {selectedLead.company}
                </p>

                <p>
                  <strong>Source:</strong>{" "}
                  {selectedLead.source}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {selectedLead.status}
                </p>

                <p>
                  <strong>Assigned To:</strong>{" "}
                  {selectedLead.assignedTo}
                </p>

                <p>
                  <strong>Follow-up Date:</strong>{" "}
                  {selectedLead.followUpDate || "Not set"}
                </p>

                <p>
                  <strong>Notes:</strong>{" "}
                  {selectedLead.notes || "No notes added"}
                </p>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setSelectedLead(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    );
  }
  // TASKS PAGE - CONTINUES IN PART 2
  // =========================================================
  // TASKS PAGE
  // =========================================================

  if (activePage === "tasks") {
    return (
      <div className="page-content">

        <div className="page-header">
          <div>
            <h1>Tasks</h1>
            <p>
              Create, assign and manage your sales tasks
            </p>
          </div>
        </div>

        <div className="content-card">

          <div className="card-header">
            <h2>
              {taskEditIndex !== null
                ? "Update Task"
                : "Create Task"}
            </h2>
          </div>

          <form
            onSubmit={handleTaskSubmit}
            className="form-grid"
          >

            <div className="form-group">
              <label>Task Title</label>
              <input
                type="text"
                placeholder="Enter task title"
                value={taskTitle}
                onChange={(e) =>
                  setTaskTitle(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Assign To</label>
              <select
                value={taskAssignedTo}
                onChange={(e) =>
                  setTaskAssignedTo(e.target.value)
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

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) =>
                  setTaskDueDate(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                value={taskPriority}
                onChange={(e) =>
                  setTaskPriority(e.target.value)
                }
              >
                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={taskStatus}
                onChange={(e) =>
                  setTaskStatus(e.target.value)
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) =>
                  setTaskDescription(e.target.value)
                }
                rows="4"
              ></textarea>
            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                {taskEditIndex !== null
                  ? "Update Task"
                  : "Create Task"}
              </button>

              {taskEditIndex !== null && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={clearTaskForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        <div className="content-card">

          <div className="card-header">

            <h2>Task List</h2>

            <div className="table-controls">

              <input
                type="text"
                placeholder="Search tasks..."
                value={taskSearch}
                onChange={(e) =>
                  setTaskSearch(e.target.value)
                }
              />

              <select
                value={taskFilterStatus}
                onChange={(e) =>
                  setTaskFilterStatus(e.target.value)
                }
              >
                <option value="All">
                  All Status
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>

              <select
                value={taskFilterPriority}
                onChange={(e) =>
                  setTaskFilterPriority(e.target.value)
                }
              >
                <option value="All">
                  All Priority
                </option>

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>

            </div>

          </div>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Task</th>
                  <th>Assigned To</th>
                  <th>Due Date</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredTasks.length === 0 ? (
                  <tr>

                    <td
                      colSpan="6"
                      className="empty-state"
                    >
                      No tasks found
                    </td>

                  </tr>
                ) : (
                  filteredTasks.map((task) => {

                    const originalIndex =
                      tasks.findIndex(
                        (item) =>
                          item.title === task.title &&
                          item.description ===
                            task.description &&
                          item.dueDate ===
                            task.dueDate
                      );

                    return (
                      <tr key={originalIndex}>

                        <td>

                          <strong>
                            {task.title}
                          </strong>

                          <div
                            style={{
                              fontSize: "12px",
                              marginTop: "4px",
                              opacity: 0.7,
                            }}
                          >
                            {task.description}
                          </div>

                        </td>

                        <td>

                          <select
                            value={task.assignedTo}
                            onChange={(e) =>
                              handleTaskAssignmentChange(
                                originalIndex,
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

                        </td>

                        <td>
                          {task.dueDate}
                        </td>

                        <td>

                          <span
                            className={`status-badge ${
                              task.priority === "High"
                                ? "inactive"
                                : task.priority ===
                                  "Medium"
                                ? "pending"
                                : "active"
                            }`}
                          >
                            {task.priority}
                          </span>

                        </td>

                        <td>

                          <select
                            value={task.status}
                            onChange={(e) =>
                              handleTaskStatusChange(
                                originalIndex,
                                e.target.value
                              )
                            }
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="In Progress">
                              In Progress
                            </option>

                            <option value="Completed">
                              Completed
                            </option>

                          </select>

                        </td>

                        <td>

                          <div className="action-buttons">

                            <button
                              type="button"
                              className="view-btn"
                              onClick={() =>
                                handleTaskView(task)
                              }
                            >
                              View
                            </button>

                            <button
                              type="button"
                              className="edit-btn"
                              onClick={() =>
                                handleTaskEdit(
                                  originalIndex
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() =>
                                handleTaskDelete(
                                  originalIndex
                                )
                              }
                            >
                              Delete
                            </button>

                            {task.status !==
                              "Completed" && (
                              <button
                                type="button"
                                className="primary-btn small-btn"
                                onClick={() =>
                                  handleTaskComplete(
                                    originalIndex
                                  )
                                }
                              >
                                Complete
                              </button>
                            )}

                          </div>

                        </td>

                      </tr>
                    );
                  })
                )}

              </tbody>

            </table>

          </div>

        </div>

        {selectedTask && (
          <div className="modal-overlay">

            <div className="modal">

              <div className="modal-header">

                <h2>Task Details</h2>

                <button
                  type="button"
                  className="close-btn"
                  onClick={() =>
                    setSelectedTask(null)
                  }
                >
                  ×
                </button>

              </div>

              <div className="modal-body">

                <p>
                  <strong>Task:</strong>{" "}
                  {selectedTask.title}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {selectedTask.description}
                </p>

                <p>
                  <strong>Assigned To:</strong>{" "}
                  {selectedTask.assignedTo}
                </p>

                <p>
                  <strong>Due Date:</strong>{" "}
                  {selectedTask.dueDate}
                </p>

                <p>
                  <strong>Priority:</strong>{" "}
                  {selectedTask.priority}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {selectedTask.status}
                </p>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setSelectedTask(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    );
  }

  // =========================================================
  // DEALS / SALES PIPELINE PAGE
  // =========================================================

  if (activePage === "deals") {
    return (
      <div className="page-content">

        <div className="page-header">

          <div>
            <h1>Deals</h1>

            <p>
              Manage sales pipeline and track deal progress
            </p>
          </div>

        </div>

        {/* =====================================================
            SALES PIPELINE SUMMARY
            ===================================================== */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              🆕
            </div>

            <div>
              <h3>
                {
                  deals.filter(
                    (deal) => deal.stage === "New"
                  ).length
                }
              </h3>

              <p>New</p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              📞
            </div>

            <div>
              <h3>
                {
                  deals.filter(
                    (deal) =>
                      deal.stage === "Contacted"
                  ).length
                }
              </h3>

              <p>Contacted</p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              🎯
            </div>

            <div>
              <h3>
                {
                  deals.filter(
                    (deal) =>
                      deal.stage === "Qualified"
                  ).length
                }
              </h3>

              <p>Qualified</p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              📄
            </div>

            <div>
              <h3>
                {
                  deals.filter(
                    (deal) =>
                      deal.stage === "Proposal Sent"
                  ).length
                }
              </h3>

              <p>Proposal Sent</p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              🏆
            </div>

            <div>
              <h3>
                {wonDeals}
              </h3>

              <p>Won</p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              ❌
            </div>

            <div>
              <h3>
                {lostDeals}
              </h3>

              <p>Lost</p>
            </div>

          </div>

        </div>

        {/* =====================================================
            ADD / UPDATE DEAL
            ===================================================== */}

        <div className="content-card">

          <div className="card-header">

            <h2>
              {dealEditIndex !== null
                ? "Update Deal"
                : "Create Deal"}
            </h2>

          </div>

          <form
            onSubmit={handleDealSubmit}
            className="form-grid"
          >

            <div className="form-group">

              <label>
                Deal Title
              </label>

              <input
                type="text"
                placeholder="Enter deal title"
                value={dealTitle}
                onChange={(e) =>
                  setDealTitle(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                Customer
              </label>

              <select
                value={dealCustomer}
                onChange={(e) =>
                  setDealCustomer(e.target.value)
                }
              >

                <option value="">
                  Select Customer
                </option>

                {customers.map(
                  (customer, index) => (
                    <option
                      key={index}
                      value={customer.name}
                    >
                      {customer.name}
                    </option>
                  )
                )}

              </select>

            </div>

            <div className="form-group">

              <label>
                Deal Value
              </label>

              <input
                type="number"
                placeholder="Enter deal value"
                value={dealValue}
                onChange={(e) =>
                  setDealValue(e.target.value)
                }
              />

            </div>

            <div className="form-group">

              <label>
                Sales Stage
              </label>

              <select
                value={dealStage}
                onChange={(e) => {

                  const selectedStage =
                    e.target.value;

                  setDealStage(selectedStage);

                  if (
                    selectedStage === "New"
                  ) {
                    setDealProbability(20);
                  } else if (
                    selectedStage ===
                    "Contacted"
                  ) {
                    setDealProbability(30);
                  } else if (
                    selectedStage ===
                    "Qualified"
                  ) {
                    setDealProbability(50);
                  } else if (
                    selectedStage ===
                    "Proposal Sent"
                  ) {
                    setDealProbability(70);
                  } else if (
                    selectedStage === "Won"
                  ) {
                    setDealProbability(100);
                  } else if (
                    selectedStage === "Lost"
                  ) {
                    setDealProbability(0);
                  }

                }}
              >

                <option value="New">
                  New
                </option>

                <option value="Contacted">
                  Contacted
                </option>

                <option value="Qualified">
                  Qualified
                </option>

                <option value="Proposal Sent">
                  Proposal Sent
                </option>

                <option value="Won">
                  Won
                </option>

                <option value="Lost">
                  Lost
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>
                Probability (%)
              </label>

              <input
                type="number"
                min="0"
                max="100"
                value={dealProbability}
                onChange={(e) =>
                  setDealProbability(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>
                Closing Date
              </label>

              <input
                type="date"
                value={dealClosingDate}
                onChange={(e) =>
                  setDealClosingDate(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-actions">

              <button
                type="submit"
                className="primary-btn"
              >
                {dealEditIndex !== null
                  ? "Update Deal"
                  : "Create Deal"}
              </button>

              {dealEditIndex !== null && (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={clearDealForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>

        {/* =====================================================
            DEAL LIST
            ===================================================== */}

        <div className="content-card">

          <div className="card-header">

            <h2>
              Sales Pipeline
            </h2>

            <div className="table-controls">

              <input
                type="text"
                placeholder="Search deals..."
                value={dealSearch}
                onChange={(e) =>
                  setDealSearch(e.target.value)
                }
              />

              <select
                value={dealFilterStage}
                onChange={(e) =>
                  setDealFilterStage(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Stages
                </option>

                <option value="New">
                  New
                </option>

                <option value="Contacted">
                  Contacted
                </option>

                <option value="Qualified">
                  Qualified
                </option>

                <option value="Proposal Sent">
                  Proposal Sent
                </option>

                <option value="Won">
                  Won
                </option>

                <option value="Lost">
                  Lost
                </option>

              </select>

            </div>

          </div>

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Deal</th>
                  <th>Customer</th>
                  <th>Value</th>
                  <th>Stage</th>
                  <th>Probability</th>
                  <th>Closing Date</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredDeals.length === 0 ? (
                  <tr>

                    <td
                      colSpan="7"
                      className="empty-state"
                    >
                      No deals found
                    </td>

                  </tr>
                ) : (
                  filteredDeals.map((deal) => {

                    const originalIndex =
                      deals.findIndex(
                        (item) =>
                          item.title ===
                            deal.title &&
                          item.customer ===
                            deal.customer &&
                          item.closingDate ===
                            deal.closingDate
                      );

                    return (
                      <tr key={originalIndex}>

                        <td>

                          <strong>
                            {deal.title}
                          </strong>

                        </td>

                        <td>
                          {deal.customer}
                        </td>

                        <td>
                          ₹
                          {Number(
                            deal.value
                          ).toLocaleString()}
                        </td>

                        <td>

                          <select
                            value={deal.stage}
                            onChange={(e) =>
                              handleDealStageChange(
                                originalIndex,
                                e.target.value
                              )
                            }
                          >

                            <option value="New">
                              New
                            </option>

                            <option value="Contacted">
                              Contacted
                            </option>

                            <option value="Qualified">
                              Qualified
                            </option>

                            <option value="Proposal Sent">
                              Proposal Sent
                            </option>

                            <option value="Won">
                              Won
                            </option>

                            <option value="Lost">
                              Lost
                            </option>

                          </select>

                        </td>

                        <td>
                          {deal.probability}%
                        </td>

                        <td>
                          {deal.closingDate}
                        </td>

                        <td>

                          <div className="action-buttons">

                            <button
                              type="button"
                              className="view-btn"
                              onClick={() =>
                                handleDealView(
                                  deal
                                )
                              }
                            >
                              View
                            </button>

                            <button
                              type="button"
                              className="edit-btn"
                              onClick={() =>
                                handleDealEdit(
                                  originalIndex
                                )
                              }
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() =>
                                handleDealDelete(
                                  originalIndex
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  })
                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* =====================================================
            DEAL VIEW MODAL
            ===================================================== */}

        {selectedDeal && (
          <div className="modal-overlay">

            <div className="modal">

              <div className="modal-header">

                <h2>
                  Deal Details
                </h2>

                <button
                  type="button"
                  className="close-btn"
                  onClick={() =>
                    setSelectedDeal(null)
                  }
                >
                  ×
                </button>

              </div>

              <div className="modal-body">

                <p>
                  <strong>
                    Deal:
                  </strong>{" "}
                  {selectedDeal.title}
                </p>

                <p>
                  <strong>
                    Customer:
                  </strong>{" "}
                  {selectedDeal.customer}
                </p>

                <p>
                  <strong>
                    Value:
                  </strong>{" "}
                  ₹
                  {Number(
                    selectedDeal.value
                  ).toLocaleString()}
                </p>

                <p>
                  <strong>
                    Stage:
                  </strong>{" "}
                  {selectedDeal.stage}
                </p>

                <p>
                  <strong>
                    Probability:
                  </strong>{" "}
                  {selectedDeal.probability}%
                </p>

                <p>
                  <strong>
                    Closing Date:
                  </strong>{" "}
                  {selectedDeal.closingDate}
                </p>

              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setSelectedDeal(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    );
  }
  // REPORTS PAGE - CONTINUES IN PART 3
  // =========================================================
  // REPORTS PAGE
  // =========================================================

  if (activePage === "reports") {
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

        <div className="stats-grid">

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
            SALES REPORT
            ===================================================== */}

        <div className="content-card">

          <div className="card-header">

            <h2>
              Sales Overview
            </h2>

          </div>

          <div className="report-grid">

            <div className="report-item">

              <span>
                Total Deals
              </span>

              <strong>
                {totalDeals}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Won Deals
              </span>

              <strong>
                {wonDeals}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Lost Deals
              </span>

              <strong>
                {lostDeals}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Pipeline Value
              </span>

              <strong>
                ₹
                {pipelineValue.toLocaleString()}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Closed Sales
              </span>

              <strong>
                ₹
                {totalSales.toLocaleString()}
              </strong>

            </div>

          </div>

        </div>

        {/* =====================================================
            LEAD STATUS REPORT
            ===================================================== */}

        <div className="content-card">

          <div className="card-header">

            <h2>
              Lead Status Report
            </h2>

          </div>

          <div className="report-grid">

            <div className="report-item">

              <span>
                New
              </span>

              <strong>
                {
                  leads.filter(
                    (lead) =>
                      lead.status === "New"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Contacted
              </span>

              <strong>
                {
                  leads.filter(
                    (lead) =>
                      lead.status === "Contacted"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Qualified
              </span>

              <strong>
                {
                  leads.filter(
                    (lead) =>
                      lead.status === "Qualified"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Proposal Sent
              </span>

              <strong>
                {
                  leads.filter(
                    (lead) =>
                      lead.status ===
                      "Proposal Sent"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Won
              </span>

              <strong>
                {
                  leads.filter(
                    (lead) =>
                      lead.status === "Won"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Lost
              </span>

              <strong>
                {
                  leads.filter(
                    (lead) =>
                      lead.status === "Lost"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Converted
              </span>

              <strong>
                {
                  leads.filter(
                    (lead) =>
                      lead.status ===
                      "Converted"
                  ).length
                }
              </strong>

            </div>

          </div>

        </div>

        {/* =====================================================
            TASK REPORT
            ===================================================== */}

        <div className="content-card">

          <div className="card-header">

            <h2>
              Task Status Report
            </h2>

          </div>

          <div className="report-grid">

            <div className="report-item">

              <span>
                Pending
              </span>

              <strong>
                {
                  tasks.filter(
                    (task) =>
                      task.status ===
                      "Pending"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                In Progress
              </span>

              <strong>
                {
                  tasks.filter(
                    (task) =>
                      task.status ===
                      "In Progress"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Completed
              </span>

              <strong>
                {
                  tasks.filter(
                    (task) =>
                      task.status ===
                      "Completed"
                  ).length
                }
              </strong>

            </div>

          </div>

        </div>

        {/* =====================================================
            DEAL STAGE REPORT
            ===================================================== */}

        <div className="content-card">

          <div className="card-header">

            <h2>
              Sales Pipeline Report
            </h2>

          </div>

          <div className="report-grid">

            <div className="report-item">

              <span>
                New
              </span>

              <strong>
                {
                  deals.filter(
                    (deal) =>
                      deal.stage === "New"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Contacted
              </span>

              <strong>
                {
                  deals.filter(
                    (deal) =>
                      deal.stage ===
                      "Contacted"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Qualified
              </span>

              <strong>
                {
                  deals.filter(
                    (deal) =>
                      deal.stage ===
                      "Qualified"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Proposal Sent
              </span>

              <strong>
                {
                  deals.filter(
                    (deal) =>
                      deal.stage ===
                      "Proposal Sent"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Won
              </span>

              <strong>
                {
                  deals.filter(
                    (deal) =>
                      deal.stage === "Won"
                  ).length
                }
              </strong>

            </div>

            <div className="report-item">

              <span>
                Lost
              </span>

              <strong>
                {
                  deals.filter(
                    (deal) =>
                      deal.stage === "Lost"
                  ).length
                }
              </strong>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================
  // DASHBOARD PAGE
  // =========================================================

  if (activePage === "dashboard") {
    return (
      <div className="page-content">

        <div className="page-header">

          <div>
            <h1>
              Dashboard
            </h1>

            <p>
              Welcome to CRM360
            </p>
          </div>

        </div>

        {/* =====================================================
            DYNAMIC DASHBOARD STATISTICS
            ===================================================== */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div>
              <h3>
                {totalCustomers}
              </h3>

              <p>
                Total Customers
              </p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              📈
            </div>

            <div>
              <h3>
                {activeLeads}
              </h3>

              <p>
                Active Leads
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
                Pending Tasks
              </p>
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              💰
            </div>

            <div>
              <h3>
                {wonDeals}
              </h3>

              <p>
                Closed Deals
              </p>
            </div>

          </div>

        </div>

        {/* =====================================================
            SALES OVERVIEW
            ===================================================== */}

        <div className="content-card">

          <div className="card-header">

            <h2>
              Sales Overview
            </h2>

          </div>

          <div className="report-grid">

            <div className="report-item">

              <span>
                Total Deals
              </span>

              <strong>
                {totalDeals}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Pipeline Value
              </span>

              <strong>
                ₹
                {pipelineValue.toLocaleString()}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Closed Sales
              </span>

              <strong>
                ₹
                {totalSales.toLocaleString()}
              </strong>

            </div>

            <div className="report-item">

              <span>
                Won Deals
              </span>

              <strong>
                {wonDeals}
              </strong>

            </div>

          </div>

        </div>

        {/* =====================================================
            NOTIFICATIONS
            ===================================================== */}

        <div className="content-card">

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

                      {notification.type ===
                      "Task"
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

        {/* =====================================================
            RECENT CUSTOMERS
            ===================================================== */}

        <div className="content-card">

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
                    .map(
                      (customer, index) => (

                        <tr key={customer._id || index}>

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

                      )
                    )

                )}

              </tbody>

            </table>

          </div>

        </div>

        {/* =====================================================
            RECENT LEADS
            ===================================================== */}

        <div className="content-card">

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
                    .map(
                      (lead, index) => (

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

                      )
                    )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
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
      deals:"Deals",
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

  const t = translations[language];

    useEffect(() => {
  document.body.classList.remove("light-theme", "dark-theme");

  if (theme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.add("light-theme");
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
            {language === "Tamil" ? "முக்கிய மெனு" : "MAIN MENU"}
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
                  setActivePage(item.id)
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
              A
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
                {language === "Tamil" ? "பங்கு:" : "Role:"}
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
                A
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
                  setShowNotifications(false)
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
        activePage={activePage}
        theme={theme}
        language={language}
        setTheme={setTheme}
        setLanguage={setLanguage}
       />

      </main>

    </div>
  );
}

export default Dashboard;
  
  
