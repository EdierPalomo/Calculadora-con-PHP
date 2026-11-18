<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="calculadora" aria-label="Calculadora estándar">
        <section class="pantalla" aria-live="polite">
            <div class="historial" id="historial"></div>
            <output class="valor-actual" id="pantalla">0</output>
        </section>

        <section class="teclado" role="group" aria-label="Teclado numérico y operadores">
            <button type="button" class="btn btn-funcion btn-limpiar" data-accion="limpiar">C</button>
            <button type="button" class="btn btn-funcion" data-accion="borrar" aria-label="Borrar último dígito">⌫</button>
            <button type="button" class="btn btn-funcion" data-accion="porcentaje">%</button>
            <button type="button" class="btn btn-operador" data-operador="/">÷</button>

            <button type="button" class="btn btn-numero" data-numero="7">7</button>
            <button type="button" class="btn btn-numero" data-numero="8">8</button>
            <button type="button" class="btn btn-numero" data-numero="9">9</button>
            <button type="button" class="btn btn-operador" data-operador="*">×</button>

            <button type="button" class="btn btn-numero" data-numero="4">4</button>
            <button type="button" class="btn btn-numero" data-numero="5">5</button>
            <button type="button" class="btn btn-numero" data-numero="6">6</button>
            <button type="button" class="btn btn-operador" data-operador="-">−</button>

            <button type="button" class="btn btn-numero" data-numero="1">1</button>
            <button type="button" class="btn btn-numero" data-numero="2">2</button>
            <button type="button" class="btn btn-numero" data-numero="3">3</button>
            <button type="button" class="btn btn-operador" data-operador="+">+</button>

            <button type="button" class="btn btn-numero btn-cero" data-numero="0">0</button>
            <button type="button" class="btn btn-numero" data-numero=".">.</button>
            <button type="button" class="btn btn-igual" data-accion="calcular">=</button>
        </section>
    </main>

    <script src="app.js" defer></script>
</body>
</html>