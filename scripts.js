// Selecionando elementos de formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

// Selecionando os elementos da lista
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2");
const expensesQuantity = document.querySelector("aside header p span");

// Capturando evento de input
amount.oninput = () => {
  // Obtém o valor do input e remove os caracteres não numéricos
  let value = amount.value.replace(/\D/g, "");

  // Converter value para centavos
  value = Number(value) / 100; // 1000 - 10.00

  // Atualiza o valor do input
  amount.value = formatCurrencyBRL(value);
};

// Formata no padrão BRL ()
function formatCurrencyBRL(value) {
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

  expenseAdd(newExpense);
};

// Adiciona uma novo item à lista
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

    updateTotals();
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar a lista de despesas.");
  }
}

// Atualiza os totais
function updateTotals() {
  try {
    // Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children;

    // Atualiza o valor de contagem das despesas
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    let totalValue = 0;

    // Percorrer cada item da lista
    for (let index = 0; index < items.length; index++) {
      let itemAmount = items[index].querySelector(".expense-amount");

      // Remove caracteres não numéricos e substitui a vírgula pelo ponto
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");

      // Verifica se é um numero válido
      if (isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não parece ser um número"
        );
      }
      // Calcula o valor total
      totalValue = totalValue + Number(value);
    }

    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    // Adicionar preço total formatado
    console.log(formatCurrencyBRL(totalValue).toUpperCase().replace("R$", ""));

    // Limpando conteúdo html
    expensesTotal.innerHTML = "";

    expensesTotal.append(symbolBRL, totalValue.toFixed(2));
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os dados");
  }
}
