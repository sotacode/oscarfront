import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FormContact = {
  name: string;
  email: string;
  subject: string;
  description: string;
};
