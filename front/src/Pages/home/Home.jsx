import React, { useState, useEffect } from "react";
import { InputText } from "../../components/Input";
import styles from "./home.module.css";
import Table from "../../components/Table";
import { Inputbutton } from "../../components/submit";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [post, setpost] = useState(false)
  const [totalTax,setTotalTax] = useState(0)
  const [totalinput, settotalinput]  = useState({
    pricetotal: 0,
    totalTax: 0
  });
  const [home, sethome] = useState({
    select: "",
    Amount: "",
    Price: "",
    Tax: "",
  });

  console.log(home);
  

  useEffect(() => {
    Getproduct();
  }, []);

  useEffect(() =>{
    updateTotals()
  },[post])

  function validadados() {
    const amount = home.Amount;
    const select = home.select
    const price = home.Price;
    const tax = home.Tax;

    if (!select || !amount || !price|| !tax) {
      alert("please provide valid information!");
    }
    // nao deixa o usuario utlizar algo que nao sabe do tipo numero
    if (!isnumberValid(amount)) {
      alert("only numbers are allowed in the amount");
      return false;
    }
    //limita o tamanho do amount
    if (amount <= 0) {
      alert("Please enter a value greater to 0 in the amount");
      return false;
    }
    return true;
  }

  function isnumberValid(inputvalue) {
    const taxRegex = new RegExp(/^[0-9]/);
    if (taxRegex.test(inputvalue)) {
      return true;
    } else {
      return false;
    }
  }
  
 async function handleselectchange(e) {
   handlechange(e);
   console.log(e.target.value);
  
  const response = await fetch(`http://localhost/API/adds_API.php?cod=${e.target.value}`)
  const responseData = await response.json()
  .then((responseData) =>{
    handledataset("Tax", responseData[0].tax)
    return responseData
  })
  .then((responseData) =>{
    handledataset("Price", responseData[0].price)
    return responseData
  })
  .catch((error) => console.log(error));
}

function handledataset(key,value){
  sethome((home) => ({...home, [key]: value}))
}

  async function Getproduct() {
    const response = await fetch("http://localhost/API/product_API.php");
    const responseData = await response.json();
    setProduct(responseData);
  }

  const handlechange = (e) => {
    sethome({
      ...home,
      [e.target.name]: e.target.value,
    });
  };


  async function updateTotals() {
    const response = await fetch("http://localhost/API/home_API.php")
    const responseData = await response.json();
    let total = 0
    let totalTax = 0
    let totalPrice = 0

    responseData.forEach(home => {
      
        totalPrice += home.price * home.amount_home
        
        let totalTaxValue = (home.price * (home.tax / 100)) * home.amount_home
        totalTax += totalTaxValue
        let totaltaxfixe = totalTax.toFixed(2)
        
        setTotalTax(totalTax.toFixed(2))

        total = totalPrice * (1 + home.tax / 100)
        let totalfixed = total.toFixed(2)

        handledataset("pricetotal",totalfixed)
        handledataset("taxtotal",totaltaxfixe)
      });

      function handledataset(key,value){
        settotalinput((totalinput) => ({...totalinput, [key]: value}))
      }
  }
    
  async function handlesubmit(event) {
    if (!validadados()) {
      //pass
    } else {
      event.preventDefault();
      const response = await fetch("http://localhost/API/home_API.php", {
        method: "POST",
        body: JSON.stringify(home),
      })
      alert("purchase completed successfully!");
      setpost((event) => !event)
    }
    
  }


  async function droptable(){
    if (window.confirm(`Are you sure you want to cancel your shopping list?`)) {
      
      const response = await fetch("http://localhost/API/adds_API.php", {
        method: "DELETE",
      }) 
      alert("your shopping list was successfully canceled")
      setpost((event) => !event)
      window.location.reload();
    }
  }
  async function finishpurchase(event){
    const test = await updateamount();
    console.log(test);

    if(await updateamount() == false){
      //pass
      alert("deu falso")
    }else{
    event.preventDefault();
    const response = await fetch("http://localhost/API/history_API.php", {
      method: "POST",
      body: JSON.stringify(totalinput),
    })
    alert("purchase completed successfully!");
    setpost((event) => !event)
    // window.location.reload();
  }
}

  async function updateamount(){
    const response = await fetch("http://localhost/API/home_API.php");
    const responseData = await response.json();

    let newamount = 0;

    console.log("responseData => ", responseData)

    responseData.forEach(async home =>{

      newamount = home.amount_product - home.amount_home
      let code = home.code_product
      if(newamount < 0){
        //pass
        alert("the quantity of products in the shopping list is greater than what we have in stock, please check the quantity")
        return false;
      }else{
        const response = await fetch(`http://localhost/API/amountControl_API.php?code=${code}&newAmount=${newamount}`,{            
          method: "PUT",
        })
      }
    })
    return "banana";
  }


  return (
    <div>
      <form id={styles.paghome}  onSubmit={handlesubmit}>
        <section id={styles.formFront}>
          <div id={styles.inputs}>
          <select
                name="select"
                id="categorychose"
                onChange={handleselectchange}
                required
              >
                <option value="" hidden>
                  Product
                </option>
                {Object.values(product).map((products) => (
                  <option key={products.code} value={products.code}>
                    {products.name}
                  </option>
                ))}
              </select>
            <InputText
              type="number"
              name="Amount"
              placeholder="Amount"
              value={home.Amount}
              onChange={handlechange}
              min="0"
              required
            />
            <InputText
              type="text"
              name="Price"
              placeholder="Unit Price"
              value={home.Price}
              max="100"
              min="0"
              readOnly
            />
            <InputText
              type="text"
              name="Tax"
              value={home.Tax}
              placeholder="Tax"
              min="0"
              readOnly
            />
            <Inputbutton
              type="submit"
              className="submit"
              content="Add Product"
            />
            <button type="button" onClick={updateamount}>dasdasasdasdasdd</button>
          </div>
        </section>
        <div id={styles.bordMid}></div>
        <section id={styles.table}>
          <div id={styles.vitor}>
            <Table
              api="home"
              columns={["Cod", "Product", "Amount", "Price", "Tax"]}
              params={["code", "name", "amount_home", "price", "tax"]}
              vitor={post}
            />
          </div>
        <div id={styles.inputsfinal}>
            <div id={styles.onlyinput}>
              Tax:
                <InputText id={styles.tax} name="pricetotal" readOnly value={totalTax}/>
            </div>
            <div id={styles.onlyinput}>
              Price:
                <InputText id={styles.price} name="taxtotal" value={totalinput.pricetotal} readOnly/>
            </div>
            <div id={styles.buttonline}>
              <Inputbutton className="homebuttoncancel" id={styles.finish} onClick={droptable} content="Cancel" type="button"/>
              <Inputbutton className="homebuttonfinish" id={styles.finish} content="Finish"  onClick={finishpurchase} type="button"/>
            </div>
        </div>
        </section>
      </form>
    </div>
  );
};

export default Home;
