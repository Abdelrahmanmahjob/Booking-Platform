import { FaPhoneAlt, FaShieldAlt, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";

export const formFields = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Ahmed Mohamed",
    icon: FaUser,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    icon: IoIosMail,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "05XXXXXXXX",
    icon: FaPhoneAlt,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    icon: RiLockPasswordFill,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "••••••••",
    icon: FaShieldAlt,
  },
];
