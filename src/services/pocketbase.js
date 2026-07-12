import PocketBase from 'pocketbase';

// Conectar a PocketBase (cambia la URL cuando tengas el backend desplegado)
const pb = new PocketBase('https://mi-app-react-pb-production.up.railway.app');

// Obtener todos los aliados
export const getAliados = async () => {
  try {
    const resultList = await pb.collection('aliados').getList(1, 50, {
      sort: '-created',
    });
    return resultList.items;
  } catch (error) {
    console.error('Error al obtener aliados:', error);
    return [];
  }
};

// Crear un nuevo aliado
export const createAliado = async (data) => {
  try {
    const record = await pb.collection('aliados').create(data);
    return record;
  } catch (error) {
    console.error('Error al crear aliado:', error);
    throw error;
  }
};

// Eliminar un aliado
export const deleteAliado = async (id) => {
  try {
    await pb.collection('aliados').delete(id);
    return true;
  } catch (error) {
    console.error('Error al eliminar aliado:', error);
    throw error;
  }
};

export default pb;
