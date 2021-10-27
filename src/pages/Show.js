import { useState } from "react";

function Show(props) {
  const id = props.match.params.id;
  const inventory = props.inventory;
  const item = inventory.find(i => i._id === id);

  const [ editForm, setEditForm ] = useState(item);

  // handleChange function for form
  const handleChange = event => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  }

  // handlesubmit for form
  const handleSubmit = event => {
    event.preventDefault();
    props.updateInventory(editForm, item._id);
    // redirect inventory back to index
    props.history.push("/");
  }

  const removeItem = () => {
    props.deleteInventory(item._id);
    props.history.push("/");
  }

  return (
    <div className="itemshow">
      <h1>{item.name}</h1>
      <h2>QTY: {item.inventory}</h2>
      <img src={item.image} alt={item.name} width= "200px" length ="200px"/>
      <button id="delete" onClick={removeItem}>
        DELETE
      </button>
      <form onSubmit={handleSubmit}>
        { <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="tool name"
          onChange={handleChange}
        />
        /*<input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="image URL"
          onChange={handleChange}
        /> */}
        <input
          type="number"
          value={editForm.inventory}
          name="inventory"
          placeholder="Quantity"
          onChange={handleChange}
        />
        <input type="submit" value="Update Item" />
      </form>
    </div>
  )
}

export default Show;