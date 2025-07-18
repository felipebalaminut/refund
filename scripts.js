// Selecionando elementos de formulário
const amount = document.getElementById("amount");

// Capturando evento de input
amount.oninput = () => {
  // Obtém o valor do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  // Converter value para centavos
  value = Number(value) / 100; // 1000 - 10.00

  // Atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

function formatCurrencyBRL(value) {
  // Formata no padrão BRL ()
  value = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  // Retorno formatado
  return value;
}
