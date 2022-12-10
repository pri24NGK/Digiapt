import Moment from "moment";

const regex = (type) => {
  let pattern;
  switch (type) {
    case "Email": {
      pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;
    }
    case "numbers": {
      pattern = /^[0-9]+$/;
      break;
    }

    default:
      break;
  }
  return pattern;
};

export const Validators = (type, data, format = false) => {
  if (!format) {
    let isValid = true;
    switch (type) {
      case "Name": {
        if (data.trim().length <= 0) {
          isValid = false;
        }
        break;
      }
      case "Email": {
        if (data.trim().length <= 0) {
          isValid = false;
        }
        let pattern = regex("Email");
        if (data.match(pattern)) {
          isValid = true;
        }
        break;
      }
      case "Password": {
        if (data.trim().length < 6) {
          isValid = false;
        }
        break;
      }
      default:
        break;
    }
    return isValid;
  } else if (format && Object.keys(format).length > 0) {
    let isValid = true;
    for (let key in format) {
      if (key === "required") {
        isValid = isValid && data.trim().length > 0;
      } else if (key === "numbers") {
        let pattern = regex(key);
        isValid = isValid && data.trim().match(pattern);
      } else if (key === "length") {
        isValid = isValid && data.trim().length <= format[key];
      } else if (key === "dates") {
        isValid = isValid && Moment(data, "YYYY-MM-DD");
      }
    }
    return isValid;
  }
};
