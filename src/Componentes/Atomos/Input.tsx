
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    etiqueta?: string;
}

function Input({ etiqueta, id, ...props }: InputProps) {
    return (
    <div className="mb-3">
        {etiqueta && (
        <label htmlFor={id} className="form-label">
            {etiqueta}
        </label>
        )}

        <input
        id={id}
        className="form-control"
        {...props}
        />
    </div>
    );
}

export default Input;
