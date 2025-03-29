export default {
    formatIsActive: function (isActive: boolean) {
      switch (isActive) {
        case true:
          return "Information";
        case false:
          return "Error";
        default:
          return "None";
      }
    }
  }
  