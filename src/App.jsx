import React, { useState, useEffect } from 'react';
import { db } from './firebase'; // Archivo de configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const App = () => {
  const [data, setData] = useState([]); // Para almacenar datos de Firestore
  const [newItem, setNewItem] = useState(''); // Para el nuevo elemento
  const [editingId, setEditingId] = useState(null); // Elemento en edición
  const [editingText, setEditingText] = useState(''); // Texto para editar

  // Leer datos de Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'items'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(items);
    };
    fetchData();
  }, []);

  // Crear un nuevo elemento
  const addItem = async () => {
    if (newItem.trim()) {
      await addDoc(collection(db, 'items'), { text: newItem });
      setNewItem('');
      window.location.reload(); // Recargar para ver cambios
    }
  };

  // Actualizar un elemento
  const updateItem = async (id) => {
    const itemRef = doc(db, 'items', id);
    await updateDoc(itemRef, { text: editingText });
    setEditingId(null);
    setEditingText('');
    window.location.reload();
  };

  // Eliminar un elemento
  const deleteItem = async (id) => {
    const itemRef = doc(db, 'items', id);
    await deleteDoc(itemRef);
    window.location.reload();
  };

  return (
    <div>
      <h1>CRUD con Firebase</h1>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Agregar nuevo item"
      />
      <button onClick={addItem}>Agregar</button>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {editingId === item.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => updateItem(item.id)}>Guardar</button>
              </>
            ) : (
              <>
                {item.text}
                <button onClick={() => {
                  setEditingId(item.id);
                  setEditingText(item.text);
                }}>Editar</button>
                <button onClick={() => deleteItem(item.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
