
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    texto: string;
    variante?: "primary" | "secondary" | "success" | "danger";
}

function Button({
    texto,
    variante = "primary",
    ...props
}: ButtonProps) {
    return (
        <button className={`btn btn-${variante}`} {...props}>
        {texto}
        </button>
    );
}

export default Button;
