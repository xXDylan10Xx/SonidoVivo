
import type { InputHTMLAttributes } from "react";
import Input from "../Atomos/Input";

interface CampoFormularioProps
    extends InputHTMLAttributes<HTMLInputElement> {
    etiqueta: string;
    error?: string;
}

function CampoFormulario({
    etiqueta,
    error,
    id,
    ...props
}: CampoFormularioProps) {
    return (
        <div className="mb-3">
        <Input
        id={id}
        etiqueta={etiqueta}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
        />

        {error && (
        <div id={`${id}-error`} className="text-danger">
            {error}
        </div>
        )}
        </div>
    );
}

export default CampoFormulario;
