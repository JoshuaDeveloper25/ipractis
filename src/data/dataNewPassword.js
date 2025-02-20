export const validPasswordErrors = [
  "Password too short",
  "Password too long",
  "Passwords are not the same",
  "Invalid Password",
  "Wrong password",
  "Character limit",
];

export const errorFormMessages = {
  password: {
    required: {
      typeError: "Invalid Password",
      descError: "Password can't be empty.",
    },

    minLength: {
      typeError: "Password too short",
      descError: "You need at least 8 characters to make a password.",
    },

    maxLength: {
      typeError: "Password too long",
      descError: "Your password should not exceed 30 characters.",
    },
  },
  repeatedPassword: {
    required: {
      typeError: "Invalid Repeated Password",
      descError: "Password repeated can't be empty.",
    },

    minLength: {
      typeError: "Password repeated too short",
      descError: "You need at least 8 characters to make a password.",
    },

    maxLength: {
      typeError: "Password repeated too long",
      descError: "Your password should not exceed 30 characters.",
    },
  },
};
