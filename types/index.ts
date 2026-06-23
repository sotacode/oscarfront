import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FormContact = {
  name: string;
  phone: string;
  email: string;
  rego: string;
  serviceRequired: string;
  message: string;
};
