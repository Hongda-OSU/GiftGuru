import { useCallback, useEffect, useState } from "react";
import { onValue, ref, update, remove, set  } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirebaseApp,
  getFirebaseDatabase,
  getFirebaseStorage,
} from "./firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const uploadImage = async (image) => {
  if (image == null) {
    return Promise.resolve(null);
  }
  const storage = getFirebaseStorage();
  const imageRef = storageRef(storage, `images/${uuidv4()}`);

  try {
    await uploadBytes(imageRef, image);
    return await getDownloadURL(imageRef);
  } catch (err) {
    throw err;
  }
};

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const firebase = getFirebaseApp();
    const database = getFirebaseDatabase(firebase);

    const unsubscribe = onValue(
      ref(database, path),
      (snapshot) => {
        setData(snapshot.val());
      },
      (error) => {
        setError(error);
      }
    );

    return () => unsubscribe();
  }, [path]);

  return [data, error];
};

export const useDbAdd = (path) => {
  const [result, setResult] = useState();
  const firebase = getFirebaseApp();
  const database = getFirebaseDatabase(firebase);

  const addData = useCallback(
    (key, value) => {
      set(ref(database, `${path}/${key}`), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [addData, result];
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const firebase = getFirebaseApp();
  const database = getFirebaseDatabase(firebase);
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const useDbDelete = () => {
  const firebase = getFirebaseApp();
  const database = getFirebaseDatabase(firebase);
  const [result, setResult] = useState();

  const deleteNode = useCallback(
    (path, nodeKey) => {
      const databaseRef = ref(database, path);

      remove(ref(databaseRef, nodeKey))
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database]
  );

  return [deleteNode, result];
};

export const signInWithGoogle = async () => {
  const app = getFirebaseApp();
  const auth = getAuth(app);
  signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
};

export const signInWithEmailPassword = async (email, password) => {
  const app = getFirebaseApp();
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user);
    })
    .catch((err) => {
      console.log(err.code);
      alert('Click "Use Test Account" to Sign In');
    });
};

export const signUpWithEmailPassword = async (email, password) => {
  const app = getFirebaseApp();
  const auth = getAuth(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user; 
  } catch (err) {
    console.error(err.code);
    throw err; 
  }
};

export const firebaseSignOut = async () => {
  const app = getFirebaseApp();
  const auth = getAuth(app);
  try {
    await signOut(auth);
  } catch (err) {
    throw err;
  }
};

export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return [user, loading];
};

export const useProfile = () => {
  const [user] = useAuthState();
  const [isAdmin, isLoading, error] = useDbData(
    `/admins/${user?.uid || "guest"}`
  );
  return [{ user, isAdmin }, isLoading, error];
};
