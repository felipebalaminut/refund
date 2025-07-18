// Selecionando elementos de formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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

// O navegador passa o objeto "event" para qualquer função que seja atribuída a um event handlers
form.onsubmit = (event) => {
  // Prevenir o comportamento padrão de carregamento da página
  event.preventDefault();

  // Criação de um objeto com os dados do formulário
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value.trim(),
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  };

  console.log(newExpense);
};
