import axios from "axios";
import { useEffect, useState } from "react";
import { Inputbutton } from "./submit";
import {  useLocation } from 'react-router-dom';

// import style from "../../css/Category.module.css";

function Tablebody(props) {
  const url = "http://localhost/API/" + props.api + "_API.php";
  const [data, setData] = useState([]);
  const [post, setpost] = useState([]);
  const [test,settest] = useState([]);


  useEffect(() => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, [props.vitor, post,test]);

  function removeItem(cod, name) {
    const urldelete = "http://localhost/API/" + props.api + `_API.php?code=${cod}`;
    if (window.confirm(`Do you want to delete the product with the code ${cod} with the name ${name}`)) {
      try {
        const response = axios.delete(urldelete, {
          method: "DELETE",
        });
        setData(data.filter((e) => e.code != cod));
        alert("successfully deleted");
        window.location.reload();
      } catch {
        alert("An error was found, please check");
        settest((event) => !event)
      }
    }
  }

  async function open_popup(code, name,amount, amountstock) {
    const newAmount = prompt("editing code " + code +" with name " + name + "\n" + "quantity in cart: " + amount  + "\n" + "Amount in stock: " + amountstock)
    
    if(validaupdate(newAmount) == false || newAmount ==  null || newAmount == "" || newAmount == 0){
    //pass
    }else{
        try{
          const response = await fetch(`http://localhost/API/home_API.php?code=${code}&newAmount=${newAmount}`,{            
              method: "PUT",
          }).then((response) => {
            setpost((event) => !event)
            window.location.reload();
          })
      }catch{
        console.log("error");
      }
    }
  }

  
  function validaupdate(input){
    if(isnumberValid(input) == false){    
      alert("only numbers are allowed in the amount")
      return false
    }
    if(input <= 0){
      alert("the quantity entered is less than or equal to 0, please check the number entered")
      return false
    }
  }

  function isnumberValid(inputvalue) {
    const taxRegex = new RegExp(/^[0-9]/);
    if (taxRegex.test(inputvalue)) {
      return true;
    } else {
      return false;
    }
  }

  function key(obj, path) {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  }
  const location = useLocation();
  
  return (
    <>
      <tbody>
        {data.map((data, index) => (
          <tr key={index}>
            {props.params.map((param, cod) => (
              <td key={cod}>{key(data, param)}</td>
            ))}
            {location.pathname != '/History' &&(
              <td>
              <Inputbutton
                className="delete"
                type="button"
                id="deleteButton"
                content={<i className="fa-solid fa-trash-can"></i>}
                onClick={() => removeItem(data.code, data.name)}
                />
            </td>
              )}
            {location.pathname === '/Home' && (
            <td>
              <Inputbutton
                className="edit"
                type="button"
                id="editbutton"
                content={<i className="fa-solid fa-pen-to-square"></i>}
                onClick={() => open_popup(data.code, data.name, data.amount_home, data.amount_product)}
              />
            </td>
            )}
            {location.pathname === '/History' && (
            <td>
              <Inputbutton
                className="view"
                type="button"
                id="viewbutton"
                content={<i class="fa-solid fa-eye"></i>}
              />
            </td>
            )}
          </tr>
        ))}
      </tbody>
    </>
  );
}

export default Tablebody;
