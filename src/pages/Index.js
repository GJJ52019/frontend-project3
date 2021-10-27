import { useState } from "react";
import { Link } from "react-router-dom"

function Index(props) {
 // state to hold formData
 const [ newForm, setNewForm ] = useState({
  name: "",
  inventory: "",
  image: "",
  link:""
});

// handleChange function for form
const handleChange = event => {
  setNewForm({ ...newForm, [event.target.name]: event.target.value });
};

// handle submit function for form
const handleSubmit = event => {
  event.preventDefault();
  props.createInventory(newForm);
  setNewForm({
    name: "",
    inventory: "",
    image: "",
    link:""
  });
};

  // loaded function
  const loaded = () => {
    return props.inventory.map((item) => (
      <div key={item._id} className="item">
        <Link to={`/inventory/${item._id}`}><h1>{item.name}</h1></Link><br></br>
        <img src={item.image} alt={item.name} width="100px" length = "100px"/>
        <h3>Qty: {item.inventory}</h3>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="tool name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        />
        <input
          type="number"
          value={newForm.inventory}
          name="inventory"
          placeholder="inventory"
          onChange={handleChange}
        />
        <input type="submit" value="Add Tool" />
      </form>
      {props.inventory ? loaded() : loading()}
    </section>
  );
}


export default Index;