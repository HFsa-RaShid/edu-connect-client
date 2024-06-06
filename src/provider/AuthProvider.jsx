// import { createContext, useEffect, useState } from "react";
// import { app } from "../firebase/firebase.config";
// import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
// import axios from "axios";
// import PropTypes from 'prop-types';

// export const AuthContext = createContext(null);
// const auth = getAuth(app);

// const AuthProvider = ({children}) => {
//     const [user,setUser]= useState(null);
//     const [loading, setLoading]= useState(true);
//     const [disName,setDisName]=useState('')
//     const [role,setRole] = useState('')

//     const createUser = (email,password) =>{
//         setLoading(true);
//         // return createUserWithEmailAndPassword(auth,email,password);
//         return createUserWithEmailAndPassword(auth,email,password)
//     }
//     const updateUser=(name,role)=>{
      
     
//         return updateProfile(auth.currentUser, {
//             displayName: name, phoneNumber: role
            
//           })
          
//       }
    

//     const signInUser = (email,password) =>{
//         setLoading(true);
//         return signInWithEmailAndPassword(auth,email,password)
//     }

//     const logOut = () =>{
//         setLoading(true);
//         return signOut(auth);
//     }

//     useEffect(() =>{
//         const unSubscribe = onAuthStateChanged(auth,currentUser=>{

//             // const userEmail = currentUser?.email || user?.email;
//             // const loggedUser = {email: userEmail}
//             setUser(currentUser);
//             console.log('observing current provider',currentUser);
//             setLoading(false);

//             // if user exists then issue a token
//             // if(currentUser){
                
//             //     axios.post('/jwt', loggedUser, {withCredentials: true})
//             //     .then(res => {
//             //         console.log('token response',res.data);
//             //     })
//             // }
//             // else{
//             //     axios.post('/logout', loggedUser, {
//             //         withCredentials: true
//             //     })
//             //     .then(res =>{
//             //         console.log(res.data)
//             //     })

//             // }
//         });
//         return () =>{
//             unSubscribe();
//         }

//     },[])
//     const handleName=(name)=>{
//         return setDisName(name)
//       }
//       const handleImage =(role)=>{
//           return setRole(role)
//       }


//     const authInfo = {user,createUser,signInUser,logOut,loading,handleName,disName,role,handleImage,updateUser}

//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
            
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;

// AuthProvider.propTypes ={
//     children: PropTypes.node
// }

import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import axios from "axios";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [disName, setDisName] = useState('');
    const [role, setRole] = useState('');

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('observing current provider', currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, []);

    const authInfo = { user, createUser, signInUser, logOut, loading, updateUserProfile };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
};


