import React, { useState, useEffect } from 'react';
import { getItems, addItem, updateItem, deleteItem } from './Api';

const App = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data } = await getItems();
    setItems(data);
  };

  const handleAddOrUpdate = async () => {
    if (editingId) {
      await updateItem(editingId, form);
      setEditingId(null);
    } else {
      await addItem(form);
    }
    setForm({ name: '', description: '' });
    fetchItems();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setForm({ name: item.name, description: item.description });
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    fetchItems();
  };

  return (
    <div className="container">
      <h1>CRUD App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddOrUpdate();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        ></textarea>
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
