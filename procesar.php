<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

/**
 * Ejecuta una operación aritmética básica.
 */
function calcular(float $numero1, float $numero2, string $operador): float|string
{
    $resultado = match ($operador) {
        '+' => $numero1 + $numero2,
        '-' => $numero1 - $numero2,
        '*' => $numero1 * $numero2,
        '/' => $numero2 === 0.0 ? 'División por cero' : $numero1 / $numero2,
        default => 'Operador no válido',
    };

    return is_float($resultado) ? round($resultado, 10) : $resultado;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['exito' => false, 'mensaje' => 'Método no permitido']);
    exit;
}

$entrada = json_decode(file_get_contents('php://input'), true);

if (
    !is_array($entrada) ||
    !isset($entrada['numero1'], $entrada['numero2'], $entrada['operador']) ||
    !is_numeric($entrada['numero1']) ||
    !is_numeric($entrada['numero2'])
) {
    http_response_code(400);
    echo json_encode(['exito' => false, 'mensaje' => 'Datos inválidos']);
    exit;
}

$resultado = calcular(
    (float) $entrada['numero1'],
    (float) $entrada['numero2'],
    (string) $entrada['operador']
);

if (is_string($resultado)) {
    echo json_encode(['exito' => false, 'mensaje' => $resultado]);
    exit;
}

echo json_encode(['exito' => true, 'resultado' => $resultado]);