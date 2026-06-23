import { FormContact } from "@/types";

export function validateEmail(email: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid: boolean = regex.test(email);
  
    return isValid;
  }
  
  export function validateForm(form: FormContact): any {
    const {name, phone, email, rego, serviceRequired, message} = form;
  
    return {
      name: name.trim() === "" ? false : true,
      phone: phone.trim() === "" ? false : true,
      email: email.trim() === "" || !validateEmail(email) ? false : true,
      rego: true,
      serviceRequired: serviceRequired.trim() === "" ? false : true,
      message: message.trim() === "" ? false : true,
    };
  }
