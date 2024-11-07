function TableHead(props) {
    return (
      <>
        <thead>
          <tr key="columns">
            {props.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th colSpan="2">Action</th>
          </tr>
        </thead>
      </>
    );
  }
  export default TableHead;