import { act } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import Contacto from '../page/Contacto'

describe('Formulario de contacto', () => {
    let contenedor: HTMLDivElement
    let root: Root

    beforeEach(async () => {
        contenedor = document.createElement('div')
        document.body.appendChild(contenedor)
        root = createRoot(contenedor)

        await act(async () => {
            root.render(<Contacto />)
        })
    })

    afterEach(async () => {
        await act(async () => {
            root.unmount()
        })
        contenedor.remove()
    })

    async function escribir(id: string, valor: string) {
        const campo = contenedor.querySelector<HTMLInputElement | HTMLTextAreaElement>('#' + id)
        if (!campo) throw new Error('No se encontró el campo: ' + id)

        const prototipo = campo instanceof HTMLTextAreaElement
            ? HTMLTextAreaElement.prototype
            : HTMLInputElement.prototype
        const cambiarValor = Object.getOwnPropertyDescriptor(prototipo, 'value')?.set
        if (!cambiarValor) throw new Error('No se puede escribir en el campo: ' + id)

        await act(async () => {
            // Simular la escritura de forma que React registre el cambio.
            cambiarValor.call(campo, valor)
            campo.dispatchEvent(new Event('input', { bubbles: true }))
        })
    }

    async function completarFormulario() {
        await escribir('contacto-nombre', 'Cliente de prueba')
        await escribir('contacto-correo', 'cliente@example.com')
        await escribir('contacto-mensaje', 'Consulta sobre los productos')
    }

    async function enviar() {
        const boton = contenedor.querySelector('button[type="submit"]')
        if (!(boton instanceof HTMLButtonElement)) throw new Error('No se encontró el botón de envío')

        await act(async () => {
            boton.click()
        })
    }

    it('exige nombre, correo y mensaje y rechaza campos con solo espacios', async () => {
        expect(contenedor.querySelector('[role="alert"]')).toBeNull()
        expect(contenedor.querySelector('[role="status"]')).toBeNull()

        await enviar()
        expect(contenedor.querySelector('[role="alert"]')?.textContent).toContain('Debes completar nombre, correo y mensaje.')
        expect(contenedor.querySelector('form')?.getAttribute('aria-describedby')).toBe('error-contacto')

        for (const id of ['contacto-nombre', 'contacto-correo', 'contacto-mensaje']) {
            await completarFormulario()
            await escribir(id, '   ')
            await enviar()

            expect(contenedor.querySelector('[role="alert"]')?.textContent)
                .toContain('Debes completar nombre, correo y mensaje.')
            expect(contenedor.querySelector('[role="status"]')).toBeNull()
        }
    })

    it('rechaza correos con formato incorrecto y conserva los datos para corregirlos', async () => {
        await completarFormulario()

        for (const correo of ['sin-arroba', 'cliente@', '@example.com', 'cliente@example', 'cliente @example.com']) {
            await escribir('contacto-correo', correo)
            await enviar()

            expect(contenedor.querySelector('[role="alert"]')?.textContent)
                .toContain('Ingresa un correo electrónico válido.')
            expect(contenedor.querySelector('[role="status"]')).toBeNull()
            expect(contenedor.querySelector<HTMLInputElement>('#contacto-nombre')?.value).toBe('Cliente de prueba')
            expect(contenedor.querySelector<HTMLTextAreaElement>('#contacto-mensaje')?.value).toBe('Consulta sobre los productos')
        }
    })

    it('confirma el envío simulado, limpia los campos y retira la confirmación al escribir de nuevo', async () => {
        await completarFormulario()
        await enviar()

        expect(contenedor.querySelector('[role="status"]')?.textContent).toContain('Mensaje enviado correctamente (simulación).')
        expect(contenedor.querySelector('[role="alert"]')).toBeNull()
        expect(contenedor.querySelector<HTMLInputElement>('#contacto-nombre')?.value).toBe('')
        expect(contenedor.querySelector<HTMLInputElement>('#contacto-correo')?.value).toBe('')
        expect(contenedor.querySelector<HTMLTextAreaElement>('#contacto-mensaje')?.value).toBe('')

        await escribir('contacto-nombre', 'Nueva consulta')
        expect(contenedor.querySelector('[role="status"]')).toBeNull()

        await enviar()
        expect(contenedor.querySelector('[role="alert"]')?.textContent).toContain('Debes completar nombre, correo y mensaje.')
        expect(contenedor.querySelector('[role="status"]')).toBeNull()
    })
})
