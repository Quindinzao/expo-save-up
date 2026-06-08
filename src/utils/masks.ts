/**
 * Formata um valor de entrada em formato de moeda brasileira (R$).
 * Apenas números são mantidos. A vírgula decimal e o ponto de milhar
 * são aplicados de trás para frente.
 *
 * Exemplo:
 * - "5" -> "0,05"
 * - "50" -> "0,50"
 * - "500" -> "5,00"
 * - "123456" -> "1.234,56"
 */
export function formatCurrency(value: string): string {
    // Remove todos os caracteres que não sejam dígitos
    const cleanValue = value.replace(/\D/g, "");

    if (!cleanValue) {
        return "";
    }

    // Converte para inteiro para descartar zeros à esquerda extras
    const numberValue = parseInt(cleanValue, 10);
    if (isNaN(numberValue)) {
        return "";
    }

    // Preenche com zeros à esquerda caso o número tenha menos de 3 dígitos (para garantir os centavos)
    const cleanStr = numberValue.toString().padStart(3, "0");

    const cents = cleanStr.slice(-2);
    const whole = cleanStr.slice(0, -2);

    // Formata a parte inteira adicionando pontos como separador de milhares
    const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${formattedWhole},${cents}`;
}
