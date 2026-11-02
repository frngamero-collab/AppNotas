import AsyncStorage from '@react-native-async-storage/async-storage';
import Nota from '../models/Nota';

const STORAGE_KEY = 'tareas';

const NotasController = {

  async cargarNotas() {
    try {
      const notasGuardadas = await AsyncStorage.getItem(STORAGE_KEY);

      if (notasGuardadas) {
        return JSON.parse(notasGuardadas);
      }

      return [];
    } catch (error) {
      console.log('Error al cargar notas:', error);
      return [];
    }
  },

  async guardarNota(texto, notasActuales) {

    const nuevaNota = new Nota(
      Date.now().toString(),
      texto
    );

    const nuevasNotas = [...notasActuales, nuevaNota];

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nuevasNotas)
      );
    } catch (error) {
      console.log('Error al guardar nota:', error);
    }

    return nuevasNotas;
  },

  async borrarNotasSeleccionadas(notasActuales, idsSeleccionados) {
    const nuevasNotas = notasActuales.filter(
      nota => !idsSeleccionados.includes(nota.id)
    );

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nuevasNotas)
      );
    } catch (error) {
      console.log('Error al borrar', error);
    }

    return nuevasNotas;
  },

  async toggleCompletada(notasActuales, id) {
    const nuevasNotas = notasActuales.map(nota =>
      nota.id === id
      ?{
        ...nota,
        completada: !nota.completada
       }
      : nota
    );

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nuevasNotas)
      );
    } catch (error) {
      console.log(error);
    }

    return nuevasNotas;
  }

};

export default NotasController;