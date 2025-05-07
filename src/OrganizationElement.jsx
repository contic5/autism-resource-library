import "./OrganizationElement.css";

function OrganizationElement(props)
{
    const organization=props.organization;

    return (
        <div className="OrganizationElement">
        <h2>{organization.ID} {organization.Organization}</h2>
        <h3>Type: {organization.Type}</h3> 
        <h3>Diagnosis: {organization.Diagnosis}</h3>
        <h3>Age Range: {organization.Ages}</h3>
        <h3>Address</h3>
        <p>{organization.Street} {organization.Appt}<br></br>
        {organization.City},NJ<br></br>
        {organization.Zip}</p>
        <h3>Contact</h3>
        <p>{organization.Phone}</p>
        <p><a href={organization.Website}>{organization.Website}</a></p>
        <h3>Mission Statement</h3>
        <p>{organization.Mission_Statement}</p>
        </div>
    );
}

export default OrganizationElement;