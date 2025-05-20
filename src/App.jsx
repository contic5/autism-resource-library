import { useState,useEffect } from 'react'
import OrganizationElement from './OrganizationElement';
import ColumnHandler from './ColumnHandler_V2.jsx';
import './App.css'
import get_excel_data from './get_excel_data.js'

const file_name="Autism Information and Resources Offline.xlsx";
const columns=["ID","Organization","Min_Age","Max_Age"];

function App() {
  function filter_data(sorted_data)
  {
    for(let column of columns)
    {
      //Check input values to filter
      if(inputs[column])
      {

        //Filter with includes if the input is a string. Otherwise filter by equality.
        if(column=="Min_Age")
        {
          sorted_data=sorted_data.filter(organization => organization[column]>=parseInt(inputs[column]));
        }
        else if(column=="Max_Age")
        {
          sorted_data=sorted_data.filter(organization => organization[column]<=parseInt(inputs[column]));
        }
        else if(isNaN(inputs[column]))
        {
          sorted_data=sorted_data.filter(organization => organization[column].toUpperCase().includes(inputs[column].toUpperCase()));
        }
        else
        {
          sorted_data=sorted_data.filter(organization => organization[column]==inputs[column]);
        }
      }
    }
    return sorted_data;
  }
  function sort_data(sorted_data)
  {
    if(!sorted_data||sorted_data.length==0)
    {
      return sorted_data;
    }
    console.log(sorted_data);
    console.log(sorted_data.length);
    
    if(sort_direction=="DESC")
      {
        //If the first value is not a number, sort by using localeCompare. Otherwise, sort by comparing numerical values.
        if(isNaN(sorted_data[0][sort_column])) 
        {
          sorted_data=sorted_data.sort((a,b) => b[sort_column].localeCompare(a[sort_column]));
        }
        else
        {
          sorted_data=sorted_data.sort((a,b) => b[sort_column]-a[sort_column]);
        }
      }
      else
      {
        //If the first value is not a number, sort by using localeCompare. Otherwise, sort by comparing numerical values.
        if(isNaN(sorted_data[0][sort_column])) 
        {
          sorted_data=sorted_data.sort((a,b) => a[sort_column].localeCompare(b[sort_column]));
        }
        else
        {
          sorted_data=sorted_data.sort((a,b) => a[sort_column]-b[sort_column]);
        }
      }
      return sorted_data;
  }
  function display_data()
  {
      console.log("Sorting with "+sort_column+" "+sort_direction);
      let sorted_data=[...organization_dictionaries];

      //Filter and sort data before displaying it
      sorted_data=filter_data(sorted_data)
      sorted_data=sort_data(sorted_data);

      
      console.log(sorted_data);

      //Create a OrganizationElement for each Organization Class
      let organization_elements=sorted_data.map(organization => <OrganizationElement key={organization.ID} organization={organization}></OrganizationElement>);
      setOrganization_Elements_Mapped(organization_elements);
  }

  //Update the sort column and sort direction values
  function update_sort(column,direction)
  {    
    setSort_Column(column);
    setSort_Direction(direction);
  }

  //Update the value of an input.
  function handleInputs(e)
  {
    const column=e.target.name;
    const value=e.target.value;
    setInputs({...inputs,[column]:value});
  }

  //Get all unique values from a column
  function get_unique_values(column)
  {
    let unique_values={};
    if(!organization_dictionaries)
    {
      return [];
    }
    for(let organization_dictionary of organization_dictionaries)
    {
      unique_values[organization_dictionary[column]]=true;
    }

    return Object.keys(unique_values);
  }
  function setup_columns()
  {
    let columns_mapped_body_temp=[];
    for(let column of columns)
    {
      let unique_values=get_unique_values(column);

      //Sort the unique values
      if(isNaN(unique_values[0]))
      {
        unique_values=unique_values.sort((a,b) => a.localeCompare(b));
      }
      else
      {
        unique_values=unique_values.sort((a,b) => a-b);
      }

      //Create a column td for each column
      const column_td=
      (
          <ColumnHandler key={column} column={column} input_value={inputs[column]} handleInputs={handleInputs} update_sort={update_sort} unique_values={unique_values} ></ColumnHandler>
      );
      columns_mapped_body_temp.push(column_td);
    }
    setColumnsMappedBody(columns_mapped_body_temp);
  }
  

  //Creates an input for each column
  const [inputs,setInputs]=useState(Object.fromEntries(columns.map(key => [key, ""])));

  const [organization_elements_mapped, setOrganization_Elements_Mapped ] = useState();

  //Create Buttons that let you sort by organization data column
  const [ sort_direction, setSort_Direction ] = useState("ASC");
  const [ sort_column, setSort_Column ] = useState("ID");

  const [columns_mapped_body,setColumnsMappedBody]=useState("");
  const [columns_mapped_head,setColumnsMappedHead]=useState("");

  //The main data values
  const [organization_dictionaries,setOrganizationDictionaries]=useState(null);

  //Load the Excel data for the Organization dictionaries when the page first opens.
  useEffect(()=>
  {
    get_excel_data(file_name).then(setOrganizationDictionaries);
  },[]);

  /*
  The main effect for displaying data. This updates 
  when the data loads for the first time
  when the sort column or sort direction change
  when the filter inputs or filter selects change
  */
  useEffect(() => {
    console.log("Effect Activated");
    if(organization_dictionaries!=null)
    {
      display_data();
      setup_columns();
    }
  }, [organization_dictionaries,sort_column,sort_direction,inputs]); // <- this runs every time `data` changes

  useEffect(()=> {
    const columns_mapped_head_temp=columns.map(column =><th className="big" key={column}>{column.replace("_"," ")}</th>);
    setColumnsMappedHead(columns_mapped_head_temp);
  },[]);
  

  if(!organization_elements_mapped||organization_elements_mapped.length==0)
  {
    return (
    <>
    <h1>New Jersey Autism Resources</h1>
    <h2>By Spectrum Works</h2>    
    <table className="column_table">
    <thead><tr>{columns_mapped_head}</tr></thead>
    <tbody><tr>{columns_mapped_body}</tr></tbody>
    </table>
    <h2>No Resources Found</h2>
    <p>Please change inputs</p>
    </>
    );
  }

  return (
    <>
    <h1>New Jersey Autism Resources</h1>
    <h2>By Spectrum Works</h2>
    <table className="column_table">
    <thead><tr>{columns_mapped_head}</tr></thead>
    <tbody><tr>{columns_mapped_body}</tr></tbody>
    </table>
    <div className="grid">
    {organization_elements_mapped}
    </div>
    </>
  );
}

export default App;