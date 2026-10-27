# Documento de cobertura de testing y control de calidad

Proyecto: SonidoVivo  
Responsable de este avance: Dylan  
Fecha: 27 de octubre de 2026 (America/Santiago)  
Revisión del código: 3fdd68e344704e7966fa707d23c6d9c6f7839da4

**Estado: avance pendiente de medición de cobertura e integración del trabajo del equipo.**

## 1. Alcance y resultados actuales

La suite actual contiene 15 casos ejecutados con Jasmine y Karma. Incluye
comprobaciones del DOM, props, eventos, cambios de estado, validaciones y mocks.
La meta acordada es contar con al menos 15 pruebas.

| Comprobación | Resultado de esta ejecución |
| --- | --- |
| Suite Jasmine/Karma | 15 aprobadas, 0 fallidas |
| Compilación de TypeScript y Vite | Aprobada |
| Análisis con ESLint | Aprobado |
| Porcentaje de cobertura de código | Pendiente de medición |

La salida completa de los tres comandos está en
[evidencias/validacion-2026-10-27.txt](evidencias/validacion-2026-10-27.txt).

La cantidad de casos aprobados y los porcentajes de líneas, ramas, funciones
y sentencias son medidas distintas. El conteo de 15 pruebas no permite asignar
un porcentaje de cobertura de código.

## 2. Entorno de pruebas

Versiones instaladas en el equipo de esta ejecución:

| Herramienta | Versión |
| --- | --- |
| Node.js | v22.13.1 |
| npm | 10.9.2 |
| React | 19.3.1 |
| TypeScript | 6.0.3 |
| Vite | 8.3.4 |
| Jasmine Core | 7.0.2 |
| Karma | 6.4.4 |
| karma-jasmine | 5.1.0 |
| karma-chrome-launcher | 3.2.0 |
| karma-esbuild | 2.3.0 |
| ESLint | 10.12.0 |
| Microsoft Edge, sin ventanas visibles | 156.0.0.0 |

La configuración está en [karma.conf.cjs](../karma.conf.cjs).
Jasmine define los casos y sus expectativas. Karma los ejecuta en el navegador.
esbuild prepara TypeScript y JSX. Los casos se ejecutan una vez y el navegador
se cierra al terminar.

Los archivos de prueba tienen la terminación .spec.ts o .spec.tsx y se encuentran
en src/Tests. setup.ts habilita el entorno de act() de React. Cada suite crea
su contenedor DOM y desmonta el componente al terminar para aislar las pruebas.

Los casos de carrito y pago montan App con MemoryRouter y prueban la interacción
entre componentes. La suite de contacto monta Contacto directamente.

## 3. Componentes y funciones ejercitados

- Boton: texto recibido mediante props y ejecución de onClick.
- Productos y Carrito: agregar, cambiar cantidades, limitar por stock, eliminar,
  calcular subtotales y total, y mostrar el estado vacío.
- Pago, PagoFallido y Confirmacion: validaciones, datos de entrega, resultado
  simulado, seguimiento ficticio y reintento.
- Contacto: campos controlados, validaciones y confirmación de envío simulado.
- cargarCarrito y guardarCarrito: recuperación, filtrado y persistencia.
- validarDatosPago, crearPedido y validarDatosContacto: reglas de los formularios
  y datos del pedido.

App, Navbar, Footer, Input y CampoFormulario también se montan en las pruebas
que los utilizan. Ese montaje no demuestra por sí solo que todos sus
comportamientos estén cubiertos.

Las reglas visuales de Bootstrap y CSS no se evalúan en esta suite: la
configuración de esbuild omite CSS durante las pruebas. La revisión responsive
de 360, 768 y 1366 px se realizó en una comprobación de navegador separada.
Su ajuste del menú está registrado en el commit f73dbc8.

## 4. Matriz requisito-prueba

Los identificadores CP corresponden a este informe; son independientes de la
numeración de las tarjetas de Trello. Los requisitos se expresan según las
tarjetas y el anexo de la evaluación.

| Caso | Requisito y datos de prueba | Archivo | Resultado esperado | Observado |
| --- | --- | --- | --- | --- |
| CP-01 | Botón recibe texto y callback; se pulsa una vez | Boton.spec.tsx | Muestra el texto y llama una vez al spy | Aprobado |
| CP-02 | Carrito sin productos | Carrito.spec.tsx | Mensaje vacío, enlace a productos y acceso al pago oculto | Aprobado |
| CP-03 | Agregar dos veces la guitarra | Carrito.spec.tsx | Una fila con cantidad 2 y guardado actualizado | Aprobado |
| CP-04 | Intentar superar stock 3 y bajar de 1 | Carrito.spec.tsx | Controles bloqueados en los límites y cantidad válida | Aprobado |
| CP-05 | Guitarra y micrófono; aumentar y disminuir la guitarra | Carrito.spec.tsx | Total pasa de $119.980 a $209.970 y vuelve a $119.980 | Aprobado |
| CP-06 | Eliminar guitarra y luego el último producto | Carrito.spec.tsx | Total $29.990 tras la primera eliminación; al final carrito vacío y guardado [] | Aprobado |
| CP-07 | Guardado con duplicados, stock excedido, producto inexistente y precio alterado | Carrito.spec.tsx | Recupera una guitarra con cantidad 2 usando el precio del catálogo; descarta registros inválidos | Aprobado |
| CP-08 | Contacto con campos vacíos o solo espacios | Contacto.spec.tsx | Bloquea el envío y muestra el error de campos obligatorios | Aprobado |
| CP-09 | Contacto con cinco correos de formato inválido | Contacto.spec.tsx | Muestra error y conserva nombre y mensaje | Aprobado |
| CP-10 | Contacto con datos válidos y nueva edición posterior | Contacto.spec.tsx | Confirma simulación, limpia campos y retira la confirmación al escribir | Aprobado |
| CP-11 | Abrir pago con carrito vacío | Pago.spec.tsx | Oculta formulario y ofrece ir a productos | Aprobado |
| CP-12 | Pago con datos vacíos, nombre con espacios o correo inválido | Pago.spec.tsx | Muestra error y conserva el carrito | Aprobado |
| CP-13 | Pago válido con fecha simulada | Pago.spec.tsx | Resumen $119.980, datos limpios, despacho incluido, enlace Chilexpress, código DEMO y carrito vacío | Aprobado |
| CP-14 | Seleccionar rechazo simulado | Pago.spec.tsx | Muestra rechazo, conserva ambos productos y permite reintentar | Aprobado |
| CP-15 | Reintentar con entrega a sucursal y transferencia | Pago.spec.tsx | Recupera datos, desmarca rechazo y permite aprobar | Aprobado |

## 5. Mocks y aislamiento

| Elemento simulado | Uso | Propósito |
| --- | --- | --- |
| Callback onClick | jasmine.createSpy en Boton.spec.tsx | Contar la llamada al pulsar el botón |
| Storage.prototype.getItem | spyOn en carrito y pago | Proporcionar un carrito conocido sin depender del almacenamiento real |
| Storage.prototype.setItem | spyOn en carrito y pago | Capturar el guardado y comprobar sus datos |
| Date.now | spyOn en el caso de pago aprobado | Obtener un número de pedido y seguimiento reproducibles |
| Navegación | MemoryRouter | Recorrer las vistas dentro de la prueba sin modificar la página del navegador |

Los spies son restaurados por Jasmine al terminar cada caso. act() espera que
React aplique los cambios antes de revisar el DOM. Los contenedores se desmontan
y eliminan en afterEach o finally.

El pago y el contacto son simulaciones. Las pruebas no realizan cobros,
no envían mensajes y no consultan el seguimiento de una encomienda real.
En la confirmación se comprueba la presencia del enlace externo.

## 6. Defectos encontrados y correcciones

| Hallazgo | Corrección | Registro |
| --- | --- | --- |
| Menú que ensanchaba la página a 360 px | Menú plegable con Bootstrap y estado React; ajuste de márgenes | f73dbc8 |
| Enlaces de Quiénes somos e Iniciar sesión con rutas incorrectas | Rutas corregidas en Navbar | f73dbc8 |
| Avisos de rutas sin coincidencia al ejecutar las pruebas | Agrupar las rutas de App en un solo bloque Routes | 069e3c9 |

La suite actual termina sin fallos. La compilación y ESLint también finalizan
con código de salida 0, según la evidencia adjunta.

## 7. Medición de cobertura de código

En esta revisión karma.conf.cjs solo tiene el reporter progress. No hay
instrumentación de cobertura ni un reporte generado que permita completar
los siguientes valores.

| Métrica | Valor |
| --- | --- |
| Sentencias | Pendiente de medición |
| Ramas | Pendiente de medición |
| Funciones | Pendiente de medición |
| Líneas | Pendiente de medición |

Según la distribución de tareas, Ferreira incorporará la configuración con
cobertura. Después de integrarla se debe ejecutar la suite completa, adjuntar
el reporte, registrar las rutas incluidas y excluidas y completar esta tabla
con los valores generados.

## 8. Pendientes de integración

1. Incorporar el reporte de cobertura y actualizar sus porcentajes.
2. Integrar las pruebas 1-5 de Ferreira: Input, CardProducto, filtro,
   catálogo sin resultados y correo inválido en login.
3. Incorporar la prueba de contraseñas distintas del registro cuando el compañero
   añada contraseña y confirmación. En esta revisión Registro solo tiene
   nombre y correo.
4. Repetir las comprobaciones después de integrar esos cambios y actualizar
   la revisión del código, la matriz, el conteo de casos y la evidencia.

La cifra actual de 15 casos corresponde a los archivos presentes en esta
revisión. Los casos pendientes del equipo se deberán verificar al integrarlos.

## 9. Cómo repetir las comprobaciones

Desde la carpeta del proyecto, ejecutar:

    npm test
    npm run build
    npm run lint

En PowerShell, si la política de scripts bloquea npm, utilizar:

    npm.cmd test
    npm.cmd run build
    npm.cmd run lint

Para instalar las versiones del archivo package-lock.json en otro equipo,
utilizar npm ci. Las pruebas necesitan Chrome o Edge instalado, o una ruta
válida en CHROME_BIN. Los cambios en el catálogo de ejemplo pueden requerir
actualizar los datos y resultados esperados de las pruebas.
