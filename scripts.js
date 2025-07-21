// Selecionando elementos de formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Selecionando os elementos da lista
const expenseList = document.querySelector("ul");

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

  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    // Cria a <li>
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // Criando ícone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_id);

    // Cria a info da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // Cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // Cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // Adiciona nome e categoria na div de informações das despesas
    expenseInfo.append(expenseName, expenseCategory);

    // Cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");

    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", ".remover");

    // Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

    // Adiciona o item na lista
    expenseList.append(expenseItem);
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar a lista de despesas.");
  }
}
