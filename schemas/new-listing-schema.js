import * as yup from "yup";

export const addListingSchema = yup.object().shape({
  address: yup
    .string()
    .min(2, "მისამართი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს")
    .required("მისამართი აუცილებელია"),

  image: yup
    .mixed()
    .required("ფოტოს ატვირთვა აუცილებელია")
    .test("fileType", "ფორმატი უნდა იყოს: jpg, jpeg, png", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    })
    .test("fileSize", "ფაილის ზომა არ უნდა აღემატებოდეს 1MB-ს", (value) => {
      return value && value.size <= 1 * 1024 * 1024; // 1MB limit
    }),

  region: yup.string().required("რეგიონი აუცილებელია"),

  city: yup.string().required("ქალაქი აუცილებელია"),

  postalCode: yup
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

  listingType: yup
    .string()
    .oneOf(["sale", "rent"], "აირჩიეთ იყიდება ან ქირავდება")
    .required("აირჩიეთ იყიდება ან ქირავდება"),

  agent: yup.string().required("აგენტის არჩევა აუცილებელია"),
});
