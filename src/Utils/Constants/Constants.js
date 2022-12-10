export const Feed_Data = {
  Title: {
    type: "input",
    fieldType: "text",
    name: "Title",
    value: "",
    validate: {
      required: true,
      length: 50,
    },
    isValid: true,
  },
  Category: {
    type: "select",
    name: "Category",
    elementConfig: {
      options: [
        { value: "Technology", displayValue: "Technology" },
        { value: "Auto", displayValue: "Auto" },
        { value: "Finance", displayValue: "Finance" },
      ],
    },
    value: "Technology",
    validate: {},
    isValid: true,
  },
  Content: {
    type: "textarea",
    fieldType: "text",
    name: "Content",
    value: "",
    validate: {
      required: true,
      length: 300,
    },
    isValid: true,
  },
};

export const Filters = {
  sortBy: {
    type: "select",
    name: "Category",
    elementConfig: {
      options: [
        { value: "Sort-By", displayValue: "Sort-By" },
        { value: "Date", displayValue: "Date" },
        { value: "Title", displayValue: "Title" },
      ],
    },
    value: "Sort-By",
  },
  search: {
    type: "input",
    fieldType: "text",
    name: "Title",
    value: "",
    validate: {},
    isValid: true,
  },
  Category: {
    type: "select",
    name: "Category",
    elementConfig: {
      options: [
        { value: "Filter-By", displayValue: "Filter-By" },
        { value: "Technology", displayValue: "Technology" },
        { value: "Auto", displayValue: "Auto" },
        { value: "Finance", displayValue: "Finance" },
      ],
    },
    value: "Filter-By",
    validate: {},
    isValid: true,
  },
};
