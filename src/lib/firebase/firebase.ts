import * as firebase from 'firebase';
import firebaseConfig from '../../../firebaseConfig';

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
// export const provider = new firebase.auth.FacebookAuthProvider();
