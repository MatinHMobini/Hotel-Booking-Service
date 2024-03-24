import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  color?: string;
  onClick?: () => void;
}

/**
 * This function returns a button component for the website.
 * @param children the text of the button
 * @param onClick the code to be executed when the button is clicked
 * @param color the background color of the button
 * @returns the button component
 */
const Button = ({ children, onClick, color = "primary" }: ButtonProps) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
