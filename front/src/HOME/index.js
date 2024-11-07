const urlhome = `http://localhost/API/HOME_API.php`;
const urlCategories = `http://localhost/API/category_API.php`;
const urlProducts = `http://localhost/API/product_API.php`;
const urlhistory = `http://localhost/API/history_API.php`

const productselect = document.querySelector("#barra_escolha");
const form = document.getElementById("chefe");
const TaxBAR = document.getElementById("TAX");
const priceBar = document.getElementById("PRICE");
//inputs
const productinput = document.getElementById("productname");
const amountinput = document.getElementById("amount");
const unitpriceinput = document.getElementById("unitprice");
const totalinput = document.getElementById("total");
const taxabarinput = document.getElementById("TAXA");
//mostras dados


function addnewhome() {
  if(validadados() == false){
      //pass
  }
  else{
        const formData = new FormData(form);
 
        fetch(urlhome, {
            method: 'POST',
            body: formData
        })
          .then(response => response.text())
        .then(data => {
            alert('product added successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
        });
        location.reload();
    };
}

async function showcategorychose(){

    const response = await fetch(urlProducts);
    
    if(response){
      const productList = await response.json();
      const select = document.getElementById('barra_escolha');

      productList.forEach((product) =>{
          select.innerHTML += `<option value = "${product.cod_product}">${product.name_product}</option>`
      });
    }
}
showcategorychose()

productselect.addEventListener("change", (e) => {
  e.preventDefault();
  getvalueprice();
  getvaluetax();
  
  amountinput.value = "";
});

async function getpriceById(input){
  const response = await fetch(urlProducts);
  const productList = await response.json();
  
  return productList.find((product) => product.cod_product == input)
}

async function getvalueprice() {
  
  indice = document.getElementById("barra_escolha").value;
  priceBar.value = (await getpriceById(indice)).price;

   
}

async function getvaluetax() {
  indice = document.getElementById("barra_escolha").value;
  const response = await fetch(urlProducts);
  const productList = await response.json();

  SearchProduct = productList.find((product) => product.cod_product == indice)
  SerarchTaxProduct = SearchProduct.categorychose

  TaxBAR.value = (await getTaxById(SerarchTaxProduct)).tax
}

async function getTaxById(input){
  const response = await fetch(urlCategories);
  const CategoriestList = await response.json();

  return CategoriestList.find((category) => category.cod_categories == input)
}

function validadados() {
  amount = amountinput.value

  if (!amount) {
    alert("please provide valid information!");
    return false;
  }
  // nao deixa o usuario utlizar algo que nao sabe do tipo numero
  if (!isamountValid(amount)) {
    alert("only numbers are allowed in the Amount");
    return false;
  }
  if (amount <= 0) {
    alert("Please enter a value greater to 0");
    return false;
  }

}

function isamountValid(inputvalue) {
  const amountRegex = new RegExp(/^[0-9]/);
  if (amountRegex.test(inputvalue)) {
    return true;
  } else {
    return false;
  }
}

async function getNameById(input) {
  const response = await fetch(urlProducts);
  const productList = await response.json();
  return productList.find((product) => product.cod_product == input)
  
  
}


async function showValues() {
  const tabela = document.getElementById("tabela_produtos");
  const response = await fetch(urlhome);
  const listhome = await response.json();
    
  tabela.innerHTML = "";
  for (let i = 0; i < listhome.length; i++) {
    var indicea = listhome[i].product_home;
    
    
    tabela.innerHTML += `
       <tr>
        <td>${listhome[i].cod_home}</td>
        <td>${(await getNameById([indicea])).name_product}</td>
        <td>${listhome[i].amount_home}</td>
        <td>${listhome[i].price}</td>
        <td>${listhome[i].tax}%</td>
        <td><button id="delete_home" onclick = removeItem(${listhome[i].cod_home})>Delete</button></td>
        <td><button id="edit_home" name='popup' onclick = open_popup(${listhome[i].cod_home})>Edit</button></td>
       </tr>
        `;
  }
}
showValues()

async function removeItem(code) {
  if (confirm("Are you sure you want to delete this category? ")) {
    try{
        const response = await fetch(`http://localhost/API/HOME_API.php`, {            
            method: "DELETE",
            body: JSON.stringify({
              "CODE": code
            })
        }).then((response) => {
          location.reload()
        })
    }catch{
      console.log("erro");
    }

  }
}

async function cleartable() {
  const response = await fetch(urlhome);
  const listhome = await response.json();
  if (confirm("Are you sure you want to clear your shopping list")){
      try{
        const response = await fetch(`http://localhost/API/HOME_API.php`, {            
              method: "DELETE",
          }).then((response) => {
            location.reload()
          })
      }catch{
        console.log("erro")
    }
  }
}

async function open_popup(code) {
  newAmount = prompt(`You can edit the quantity here in the code ${code}`)
  if(validaupdate(newAmount) == false){
  //pass
  }else{
      try{
        const response = await fetch(`http://localhost/API/HOME_API.php?code=${code}&newAmount=${newAmount}`,{            
            method: "PUT",
        }).then((response) => {
          location.reload()
        })
    }catch{
      console.log("erro");
    }
  }
}

function validaupdate(input){
  if(isNumberValid(input) == false){    
    alert("only numbers are allowed in the amount")
  }
  if(input <= 0){
    alert("the quantity entered is less than or equal to 0, please check the number entered")
    return false
  }

}

function isNumberValid(inputvalue) {
  const NumberRegex = new RegExp(/^[0-9]/);
  if (NumberRegex.test(inputvalue)) {
    return true;
  } else {
    return false;
  }
}

async function showvaluestax() {
  var sum = 0;
  var valortaxado = 0;
  const response = await fetch(urlhome);
  const listhome = await response.json();
  
  for (let i = 0; i < listhome.length; i++) {
    amount = listhome[i].amount_home
    price = listhome[i].price
    valuetotal = price * amount;
    
    porcentagem = listhome[i].tax / 100;
    valortaxado += valuetotal * porcentagem;
    
    sum += valuetotal
    sumtaxado = valortaxado + sum;
    taxabarinput.value = valortaxado.toFixed(2);
    totalinput.value = sumtaxado.toFixed(2);
  }
}
showvaluestax()


async function updateamount(){
  const response = await fetch(urlhome);
  const listhome = await response.json();

  for (let i = 0; i < listhome.length; i++){
    findAmountbyID(listhome[i].product_home)
    oldAmount = (await findAmountbyID(listhome[i].product_home))
    purchaseAmount = (listhome[i].amount_home);
    newAmount = oldAmount - purchaseAmount;
    nome = (listhome[i].product_home)
    findIDbyname(nome)
    code = (await findIDbyname(nome))
    

    if(newAmount < 0){
      //pass
      return false
    }
    else{
    try{
      const response = await fetch(`http://localhost/API/amountControl_API.php?code=${code}&newAmount=${newAmount}`,{            
          method: "PUT",
      }).then((response) => {})
  }catch{
    console.log("erro");
    }
  }
}
  location.reload()
}

async function findIDbyname(input){
  const response = await fetch(urlProducts);
  const listproduct = await response.json();

  const names = listproduct.find(
    (product) => product.cod_product == input
  );
  
  return names.cod_product;
}

async function findAmountbyID(input) {
  const response2 = await fetch(urlProducts);
  const listproduct = await response2.json();

  const amounts = listproduct.find(
    (product) => product.cod_product == input
  );
  
  return amounts.amount_product;
}


async function finishtrue() {
  if (confirm("Are you sure you want to finish the shopping list? ")) {
  if(await updateamount() == false){
    alert("the quantity of products in the shopping list is greater than what we have in stock, please check the quantity")
    //pass
  }
  else{
    data = new FormData();
    let tax = taxabarinput.value
    let value = totalinput.value
    
    data.append("total", value);
    data.append("tax", tax);
    
    fetch(urlhistory, {
      method: 'POST',
      body: data 
      
    })
    .then(response => response.text())
    .then(data => {
      alert('purchase completed successfully!');
    })
    .catch(error => {
      console.error('Error:', error);
    });
    }
  }
}
