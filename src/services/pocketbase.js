iimport PocketBase from 'pocketbase';

const pb = new PocketBase('https://mi-app-react-pb-production.up.railway.app');

// Autenticación con el admin
const ADMIN_EMAIL = 'admin@admin.com';
const ADMIN_PASSWORD = '123456789';

let isAuthenticated = false;

const ensureAuth = async () => {
  try {
    if (!isAuthenticated) {
      await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
      isAuthenticated = true;
      console.log('✅ Autenticado correctamente');
    }
    return true;
  } catch (error) {
    console.error('❌ Error de autenticación:', error);
    throw error;
  }
};

// Obtener todos los aliados
export const getAliados = async () => {
  try {
    await ensureAuth();
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
    await ensureAuth();
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
    await ensureAuth();
    await pb.collection('aliados').delete(id);
    return true;
  } catch (error) {
    console.error('Error al eliminar aliado:', error);
    throw error;
  }
};

export default pb;
