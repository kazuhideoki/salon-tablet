import firebase from "firebase/app";
import "firebase/auth";

type TUpdatePassword = {
  password: string
  user: firebase.User
}

export const updatePassword = ({
         password,
         user
        }: TUpdatePassword) => {

         user
           .updatePassword(password)
           .then(function() {
             return;
           })
           .catch(function(error) {
             throw new Error("updatePasswordに失敗" + error);
           });
       };