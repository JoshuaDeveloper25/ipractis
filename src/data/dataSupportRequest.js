export const reasons = ["Remove Authentication"];

export const errorFormMessages = {
  email: {
    required: {
      typeError: "Invalid Email",
      descError: "Email can't be empty.",
    },
    pattern: {
      typeError: "Invalid Email",
      descError: "Check your spelling email.",
    },
  },
  emailRelated: {
    required: {
      typeError: "Invalid Email Related",
      descError: "Email related can't be empty.",
    },
    pattern: {
      typeError: "Invalid Email Related",
      descError: "Check your spelling email.",
    },
  },
  reason: {
    required: {
      typeError: "Invalid Reason",
      descError: "Please, include a reason of the problem.",
    },
  },
  situation: {
    required: {
      typeError: "Invalid Situation",
      descError: "Please, describe the situation of the problem.",
    },
  },
};
