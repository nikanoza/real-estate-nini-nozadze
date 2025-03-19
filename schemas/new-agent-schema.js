import * as yup from "yup";

export const agentSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "მინიმუმ ორი სიმბოლო")
    .required("სახელი აუცილებელია"),

  lastName: yup
    .string()
    .min(2, "მინიმუმ ორი სიმბოლო")
    .required("გვარი აუცილებელია"),

  email: yup
    .string()
    .email("შეიყვანეთ ვალიდური ელ-ფოსტა")
    .matches(/@redberry\.ge$/, "ელ-ფოსტა უნდა დასრულდეს @redberry.ge-ით")
    .required("ელ-ფოსტა აუცილებელია"),

  phone: yup
    .string()
    .matches(
      /^5\d{8}$/,
      "ტელეფონის ნომერი უნდა იწყებოდეს 5-ით და უნდა შეიცავდეს 9 ციფრს"
    )
    .required("ტელეფონის ნომერი აუცილებელია"),

  image: yup
    .mixed()
    .required("ატვირთეთ ფოტო")
    .test("fileSize", "ფაილის ზომა ძალიან დიდი არის", (value) => {
      return value && value.size <= 5 * 1024 * 1024;
    }),
});
