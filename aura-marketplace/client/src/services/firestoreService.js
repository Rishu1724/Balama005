import { db, storage } from '../firebase/firebaseConfig';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

// User Profile Management
export const createUserProfile = async (userId, userData, userType) => {
  try {
    const userRef = doc(db, userType, userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, data: userData };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { success: false, error: error.message };
  }
};

export const getUserProfile = async (userId, userType) => {
  try {
    const userRef = doc(db, userType, userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: 'User profile not found' };
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (userId, userData, userType) => {
  try {
    const userRef = doc(db, userType, userId);
    await updateDoc(userRef, {
      ...userData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error: error.message };
  }
};

// Product Management
export const createProduct = async (productData, sellerId, imageFile = null) => {
  try {
    let imageUrl = productData.imageUrl || null;
    
    // Upload image if provided
    if (imageFile) {
      const imageRef = ref(storage, `products/${sellerId}/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(snapshot.ref);
    }
    
    const productRef = doc(collection(db, 'products'));
    const productId = productRef.id;
    
    const productDataToSave = {
      ...productData,
      imageUrl,
      sellerId,
      productId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    await setDoc(productRef, productDataToSave);
    
    return { success: true, data: { ...productDataToSave } };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message };
  }
};

export const getProducts = async () => {
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, data: products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error: error.message };
  }
};

export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      return { success: true, data: productSnap.data() };
    } else {
      return { success: false, error: 'Product not found' };
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return { success: false, error: error.message };
  }
};

// Real-time Listeners
export const subscribeToProducts = (callback) => {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    callback(products);
  }, (error) => {
    console.error('Error in products subscription:', error);
    callback([]);
  });
};

export const subscribeToUserProfile = (userId, userType, callback) => {
  const userRef = doc(db, userType, userId);
  
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    } else {
      callback(null);
    }
  }, (error) => {
    console.error('Error in user profile subscription:', error);
    callback(null);
  });
};

export const subscribeToUserProducts = (sellerId, callback) => {
  const q = query(
    collection(db, 'products'), 
    where('sellerId', '==', sellerId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    callback(products);
  }, (error) => {
    console.error('Error in user products subscription:', error);
    callback([]);
  });
};