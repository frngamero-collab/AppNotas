import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import ListaNotas from '../components/ListaNotas';
import NotasController from '../controllers/NotasController';

export default function NotasScreen() {

  const [inputTexto, setInputTexto] = useState('');
  const [notas, setNotas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  

  useEffect(() => {
    cargarNotas();
  }, []);

  const cargarNotas = async () => {
    const datos = await NotasController.cargarNotas();
    setNotas(datos);
  };

  const agregarNota = async () => {

    if (inputTexto.trim() === '') {
      return;
    }

    /* Codigo secreto */

     if(
        inputTexto.trim().toLowerCase() === 'pan') {
        setMostrarAlerta(true);
        return;
      }

    const nuevasNotas =
      await NotasController.guardarNota(
        inputTexto,
        notas,
      );


    setNotas(nuevasNotas);
    setInputTexto('');
  };

/* La constante para seleccionar las notas con toggleSeleccion */

  const toggleBorrar = (id) => {

    if (seleccionadas.includes(id)) {

      setSeleccionadas(
        seleccionadas.filter(
          item => item !== id
        )
      );

    } else {

      setSeleccionadas([
        ...seleccionadas,
        id
      ]);

    }
  };

  /* La constante para borrar las notas seleccionadas */

  const borrarNotasSeleccionadas = async () => {

  const nuevasNotas =
    await NotasController.borrarNotasSeleccionadas(
      notas,
      seleccionadas
    );

  setNotas(nuevasNotas);
  setSeleccionadas([]);
};


/* constante para marcar notas completadas */

  const toggleCompletada = async (id) => {
    const nuevasNotas =
    await NotasController.toggleCompletada(
      notas,
      id
    );

   setNotas(nuevasNotas);
  };



  

    /* Si se escribe el codigo secreto la app renderiza el siguiente mensaje */

    if(mostrarAlerta){
      return(
        <View style = {styles.container}>
          <Text style = {styles.titulo}>
            Enviando Mensaje de Alerta
          </Text>
          <Button
            title="Volver"
            onPress={() => {
              setMostrarAlerta(false);
              setInputTexto('');
        }}
      />
        </View>
      );
    };
    
    /* Los siguiente son el la casilla para El titulo, la casilla para introducir texto, el boton de agregar, borrar y la lista de notas que se van a renderizar en pantalla*/

    return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Mis Tareas
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Escribe una nota..."
        value={inputTexto}
        onChangeText={setInputTexto}
      />

      <Button
        title="Agregar"
        onPress={agregarNota}
      />

      <Button
        title={`Borrar (${seleccionadas.length})`}
        color="red"
        onPress={borrarNotasSeleccionadas}
      />

      <ListaNotas
        notas={notas}
        seleccionadas={seleccionadas}
        toggleBorrar={toggleBorrar}
        toggleCompletada={toggleCompletada}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#1f1a6d',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});