import * as yup from "yup";

export const addListingSchema = yup.object().shape({
  address: yup
    .string()
    .min(2, "მისამართი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს")
    .required("მისამართი აუცილებელია"),

  region_id: yup.number().required("რეგიონი აუცილებელია"),

  city_id: yup.number().required("ქალაქი აუცილებელია"),

  zip_code: yup
    .string()
    .matches(/^\d+$/, "საფოსტო კოდი უნდა შეიცავდეს მხოლოდ ციფრებს")
    .required("საფოსტო კოდი აუცილებელია"),

  price: yup
    .number()
    .typeError("ფასი უნდა იყოს რიცხვი")
    .required("ფასი აუცილებელია"),

  area: yup
    .number()
    .typeError("ფართი უნდა იყოს რიცხვი")
    .required("ფართი აუცილებელია"),

  bedrooms: yup
    .number()
    .typeError("ოთახების რაოდენობა უნდა იყოს რიცხვი")
    .integer("ოთახების რაოდენობა უნდა იყოს მთელი რიცხვი")
    .required("ოთახების რაოდენობა აუცილებელია"),

  description: yup
    .string()
    .test("wordCount", "აღწერა უნდა შეიცავდეს მინიმუმ 5 სიტყვას", (value) => {
      return value && value.trim().split(/\s+/).length >= 5;
    })
    .required("აღწერა აუცილებელია"),

  is_rental: yup
    .string()
    .oneOf(["0", "1"], "აირჩიეთ იყიდება ან ქირავდება")
    .required("აირჩიეთ იყიდება ან ქირავდება"),

  agent_id: yup.string().required("აგენტის არჩევა აუცილებელია"),
});
