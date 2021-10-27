import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [ inventory, setInventory ] = useState(null);

  const URL = "https://backend-project3.herokuapp.com/inventory/";

  const getInventory = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setInventory(data);
  };

  const createInventory = async (inventory) => {
    // make post request to create inventory items
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(inventory),
    });
    // update list of inventory items
    getInventory();
  };

  const updateInventory = async (inventory, id) => {
    // make put request to create inventory
    await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(inventory),
    });
    // update the inventory
    getInventory();
  }

  const deleteInventory = async id => {
    // make delete request to create Invenotry
    await fetch(URL + id, {
      method: "DELETE",
    })
    // update the inventory
    getInventory();
  }

  useEffect(() => getInventory(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index inventory={inventory} createInventory={createInventory} />
        </Route>
        <Route
          path="/inventory/:id"
          render={(rp) => (
            <Show
            inventory={inventory}
              updateInventory={updateInventory}
              deleteInventory={deleteInventory}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;