
import './ColumnHandler.css';
function ColumnHandler(props) 
{
    //console.log(props);
    const column=props.column;
    let options=null;

    options=props.unique_values.map(
        unique_value => <option key={unique_value} value={unique_value}>{unique_value}</option>
    );
    options.splice(0, 0, <option key="Any" value="">Any</option>);

    let input_type="text";
    if(column=="ID"||column=="Min_Age"||column=="Max_Age")
    {
        input_type="number";
    }
    //Make sure the name prop is set so that the parent knows which dictionary key to modify.
    return(
        <td>
        <button onClick={() => props.update_sort(column,"ASC")}>ASC</button>
        <button onClick={() => props.update_sort(column,"DESC")}>DESC</button><br></br>
        <input value={props.input_value} type={input_type} name={column} onChange={props.handleInputs}/>
        <select onChange={props.handleSelects} name={column} value={props.select_value}>{options}</select>
        </td>
    )
}

export default ColumnHandler;