const urlhistory = `http://localhost/API/history_API.php`
const urlorders = `http://localhost/API/orders_API.php`;
const urlProducts = `http://localhost/API/product_API.php`;

async function showValues() {
  const tabela = document.getElementById("tabela_history");
  const response = await fetch(urlorders);
  const listorders = await response.json();
  
  tabela.innerHTML = "";

  for (let i = 0; i < listorders.length; i++) {
    tabela.innerHTML += `
         <tr>
          <td>${listorders[i].cod_history}</td>
          <td>$ ${listorders[i].totalvalue}</td>
          <td>$ ${listorders[i].totaltax}</td>
          <td><button class='button'id="${listorders[i].cod_history}" onclick='viewpurchase(${listorders[i].cod_history})'>View</button></td>
          </tr> `;
  }
}
showValues()

async function viewpurchase(productsid) {
  const tbody = document.getElementById("tabela_purchase");
  
  const response = await fetch(urlhistory);
  const listhistory = await response.json();
  tbody.innerHTML = "";
  
  const histories = listhistory.filter(
    (orders) => orders.cod_order == productsid
  );
  
  let quantidade = histories;

  for (let i = 0; i < quantidade.length; i++) {
    var indice = histories[i].product_home;
    tbody.innerHTML += `
    <tr>
          <td>${histories[i].cod_home}</td>
          <td>${(await getNameById(indice)).name_product}</td>
          <td>${histories[i].amount_home}</td>
          <td>$${histories[i].price}</td>
          <td>${histories[i].tax}%</td>
          </tr> `;
  }
}
async function getNameById(input) {
  const response = await fetch(urlProducts);
  const listhistory = await response.json();
  return listhistory.find((home) => home.cod_product == input);
}