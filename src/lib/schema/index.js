import { z } from "zod";

export const tabProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, {
      message: "Invalid field --- Must contain 3 or more characters long.",
    })
    .regex(/^[^*^%$£]*$/, {
      message: "Invalid character --- Your name contains invalid characters.",
    }),
  middleName: z
    .string()
    .trim()
    .min(1, {
      message: "Invalid field --- Must contain 3 or more characters long.",
    })
    .regex(/^[^*^%$£]*$/, {
      message: "Invalid character --- Your name contains invalid characters.",
    }),
  lastName: z
    .string()
    .trim()
    .min(1, {
      message: "Invalid field --- Must contain 3 or more characters long.",
    })
    .regex(/^[^*^%$£]*$/, {
      message: "Invalid character --- Your name contains invalid characters.",
    }),
  introduction: z
    .string()
    .trim()
    .min(1, {
      message: "Invalid field --- Must contain 3 or more characters long.",
    })
    .regex(
      /^(?!.*\b\d{7,15}\b)(?!.*\b[A-Za-z0-9._%+-]+@gmail\.com\b)(?!.*\+\d{1,4}[\s-]?\d{4,}\b)[\s\S]+$/,
      {
        message:
          "Don't share your contact ID --- Your introduction cannot include personal contact details, such as phone numbers, email addresses, or social media IDs, to ensure platform security and privacy compliance.",
      }
    ),
  gender: z.enum(["male", "female"], {
    message: "Invalid field --- Must choose a gender.",
  }),
  languages: z
    .array(
      z.object({
        name: z.string(),
        level: z
          .string()
          .min(1, { message: "Invalid field --- Level is required." }),
      })
    )
    .min(1, { message: "Invalid field --- At least one language is required." })
    .max(6, {
      message:
        "Language Limit Reached --- You can only select up to 6 mastered languages.",
    }),
});

export const tabSubjectSchema = z.object({
  subSubject: z
    .array(z.string())
    .min(1, { message: "Invalid field --- At least one subject is required." }),
});
