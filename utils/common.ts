import { FormContact } from "@/types";

export function validateEmail(email: string): boolean {
    const regex: RegExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const isValid: boolean = regex.test(email);
  
    return isValid;
  }
  
  export function validateForm(form: FormContact): any {
    //quita los espacios en blancos de cada campo
  
    const {name, email, subject, description} = form;
  
    return {
      name: name.trim() === "" ? false : true,
      email: email.trim() === "" || !validateEmail(email) ? false : true,
      subject: subject.trim() === "" ? false : true,
      description: description.trim() === "" ? false : true,
    };
  }