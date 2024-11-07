import React from 'react'
import styles from "./history.module.css";
import Table from '../../components/Table';


const history = () => {
  return (
    <div id={styles.main}>
      <div id={styles.test}>
      <div id={styles.vitor}>
            <Table
              api="orders"
              columns={["Cod", "Total", "Total Tax"]}
              params={["code", "totalvalue", "totaltax"]}
            />
          </div>
      </div>
    </div>
  )
}

export default history