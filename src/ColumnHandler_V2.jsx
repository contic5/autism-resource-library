
import './ColumnHandler.css';
function ColumnHandler(props) 
{
    //console.log(props);
    const column=props.column;
    const column_written=column.replace("_"," ");
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
        <button onClick={() => props.update_sort(column,"ASC")}>&#8593;</button>
        <button onClick={() => props.update_sort(column,"DESC")}>&#8595;</button><br></br>
        <label htmlFor={column+"_search"}>Search:</label>
        <input value={props.input_value} list={column+"_list"} type={input_type} name={column} id={column+"_search"} onChange={props.handleInputs}/>
        <datalist id={column+"_list"}>{options}</datalist>
        </td>
    )
}

export default ColumnHandler;