import React from 'react';

import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';


export default function ListaNotas({
  notas,
  seleccionadas,
  toggleBorrar,
  toggleCompletada
}) {

  return (
    <FlatList
      data={notas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {

        const estaSeleccionada =
          seleccionadas.includes(item.id);

        return (
          <TouchableOpacity
            style={[
              styles.nota,
              estaSeleccionada &&
              styles.seleccionada
            ]}
            onPress={() =>
              toggleCompletada(item.id)
            }
            onLongPress={() =>
              toggleBorrar(item.id)
            }
          > 
          
          <Text
            style={{
            color: item.completada
            ? 'green'
            : 'dark green',
          }}
          >
            {item.texto}
          </Text>
            
            <Text>
              {estaSeleccionada
                ? '☑️'
                : '◻️'}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  nota: {
    fontSize: 18,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  seleccionada: {
    backgroundColor: '#FF0000',
    borderWidth: 1,
    borderColor: 'red',
  },
});