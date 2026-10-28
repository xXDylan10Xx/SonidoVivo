import { act } from 'react'
import { createRoot } from 'react-dom/client'
import Button from '../components/atoms/Boton'

describe('Botón', () => {
    it('muestra el texto recibido y ejecuta onClick al pulsarlo', async () => {
        const contenedor = document.createElement('div')
        document.body.appendChild(contenedor)
        const root = createRoot(contenedor)
        const onClick = vi.fn()

        try {
            await act(async () => {
                root.render(<Button texto="Agregar al carrito" onClick={onClick} />)
            })

            const boton = contenedor.querySelector('button')
            expect(boton).not.toBeNull()
            expect(boton?.textContent).toBe('Agregar al carrito')

            await act(async () => {
                boton?.click()
            })

            expect(onClick).toHaveBeenCalledTimes(1)
        } finally {
            await act(async () => {
                root.unmount()
            })
            contenedor.remove()
        }
    })
})
