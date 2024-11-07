import style from "./Table.module.css";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

function Table(props) {
  return (
    <>
      <div className={style.tableComponent}>
        <div className={style.tableDiv}>
          <table className={style.genericTable}>
            <TableHead columns={props.columns} />
            <TableBody api={props.api} params={props.params} vitor={props.vitor} edit={props.edit}/>
          </table>
        </div>
      </div>
    </>
  );
}

export default Table;
