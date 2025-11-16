export const utilitySchemas = {
  contacts: [
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "phone", label: "Phone", type: "text" },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: ["Friend", "Family", "Work", "Service", "Other"],
    },
    { key: "notes", label: "Notes", type: "text" },
  ],

  finance: [
    { key: "item", label: "Item", type: "text" },
    { key: "amount", label: "Amount", type: "number" },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: ["Credit", "Debit", "Investment", "Savings"],
    },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [
        "Food",
        "Bills",
        "Travel",
        "Shopping",
        "Salary",
        "Entertainment",
        "Other",
      ],
    },
    { key: "date", label: "Date", type: "date" },
  ],

  subscriptions: [
    { key: "service", label: "Service", type: "text" },
    { key: "price", label: "Price", type: "number" },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [
        "Streaming",
        "Software",
        "Gaming",
        "Education",
        "Utilities",
        "Other",
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Paused", "Cancelled"],
    },
    { key: "renewalDate", label: "Renewal Date", type: "date" },
  ],

  applications: [
    { key: "company", label: "Company", type: "text" },
    { key: "role", label: "Role", type: "text" },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: ["Job", "Internship", "College", "Scholarship", "Other"],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: ["Applied", "Interview", "Offer", "Rejected"],
    },
    { key: "deadline", label: "Deadline", type: "date" },
  ],

  passwords: [
    { key: "platform", label: "Platform", type: "text" },
    { key: "username", label: "Username", type: "text" },
    { key: "password", label: "Password", type: "password" },
    {
      key: "category",
      label: "Category",
      type: "select",
      options: [
        "Social",
        "Work",
        "Finance",
        "Entertainment",
        "Shopping",
        "Utility",
        "Other",
      ],
    },
    { key: "notes", label: "Notes", type: "text" },
  ],
};
