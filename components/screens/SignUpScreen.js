import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FormInput from "../common/FormInput";
import FormButton from "../common/FormButton";
import firebase from "firebase";

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  signUp = () => {
    if (
      name.length == 0 ||
      email.length == 0 ||
      phone.length == 0 ||
      password.length == 0
    ) {
      setError("Please fill in all the fields");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          res.user
            .updateProfile({ displayName: name, photoURL: phone })
            .then(() => {
              setEmail("");
              setPassword("");
              setName("");
              setPhone("");
              setError("");
              navigation.navigate("Welcome");
            });
        })
        .catch(err => {
          setError(err.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={name}
        onChangeText={userName => setName(userName)}
        placeholderText="Name"
        iconType="user"
      />

      <FormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="mail"
      />

      <FormInput
        labelValue={phone}
        onChangeText={userPhone => setPhone(userPhone)}
        placeholderText="Phone"
        iconType="phone"
        keyboardType="phone-pad"
      />

      <FormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => {
          signUp();
        }}
      />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Sign In")}
      >
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>

      {error.length != 0 && (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 50
  },
  text: {
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f"
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5"
  },
  error: {
    marginTop: 15
  },
  errorText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#ff0000"
  }
});

// import React from 'react';
// import {StyleSheet, Text, Button as ReactButton} from 'react-native';

// import firebase from 'firebase';
// import {Button, Card, CardSection, Input, Spinner} from '../common';

// export default function SingUpScreen({navigation}) {
//   const [email, setEmail] = React.useState('');
//   const [name, setName] = React.useState('');
//   const [phone, setPhone] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [error, setError] = React.useState('');
//   const [loading, setLoading] = React.useState(false);
//   const [wrongEmail, setEmailWrong] = React.useState(false);
//   const [wrongName, setNameWrong] = React.useState(false);
//   const [wrongPhone, setPhoneWrong] = React.useState(false);
//   const [wrongPassword, setPasswordWrong] = React.useState(false);

//   validateEmail = emailIn => {
//     const matcher = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (matcher.test(String(emailIn).toLowerCase())) {
//       setEmailWrong(false);
//       setError('');
//       return true;
//     } else {
//       setEmailWrong(true);
//       setError('Wrong Email');
//       return false;
//     }
//   };

//   validatePassword = passwordIn => {
//     if (passwordIn.length >= 8) {
//       setPasswordWrong(false);
//       setError('');
//       return true;
//     } else {
//       setPasswordWrong(true);
//       setError('Password must have more than 8 symbols');
//       return false;
//     }
//   };

//   validatePhone = phoneNumber => {
//     const matcher = /\d/g;
//     if (matcher.test(String(phoneNumber)) && phoneNumber.length === 10) {
//       setPhoneWrong(false);
//       setError('');
//       return true;
//     } else {
//       setPhoneWrong(true);
//       setError('Wrong phone format');
//       return false;
//     }
//   };

//   validateName = nameIn => {
//     if (nameIn.length > 0) {
//       setNameWrong(false);
//       setError('');
//       return true;
//     } else {
//       setNameWrong(true);
//       setError('Wrong name length');
//       return false;
//     }
//   };

//   onButtonPress = () => {
//     setError('');
//     setLoading(true);

//     if (validateEmail(email)) {
//       if (validatePassword(password)) {
//         if (validatePhone(phone)) {
//           if (validateName(name)) {
//             body = JSON.stringify({
//               email: email,
//               name: name,
//               phone: phone,
//               password: password,
//             });
//             fetch('http://10.0.2.2:4200/sign-up/', {
//               method: 'POST',
//               headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//               },
//               body: body,
//             })
//               .then(res => res.json())
//               .then(json => {
//                 if (json.res === 'Success sign up') {
//                   onSignUpSuccess(json.body);
//                 } else {
//                   onSignUpFail(json.res);
//                 }
//               })
//               .catch(err => onSignUpFail(err));
//           } else {
//             setNameWrong(true);
//             onSignUpFail('Wrong name length');
//           }
//         } else {
//           setPhoneWrong(true);
//           onSignUpFail('Wrong phone format');
//         }
//       } else {
//         setPasswordWrong(true);
//         onSignUpFail('Password must have more than 8 symbols');
//       }
//     } else {
//       setEmailWrong(true);
//       onSignUpFail('Wrong Email');
//     }
//   };

//   onSignUpFail = errorIn => {
//     setError(errorIn);
//     setLoading(false);
//   };

//   onSignUpSuccess = body => {
//     setEmail('');
//     setName('');
//     setPhone('');
//     setPassword('');
//     setError('');
//     setLoading(false);
//     navigation.navigate('Welcome', {body: body});
//   };

//   renderButton = () => {
//     if (loading) {
//       return <Spinner size="small" />;
//     }
//     return <Button onPress={onButtonPress.bind(this)}>Sign up</Button>;
//   };

//   renderEmailInput = () => {
//     if (wrongEmail) {
//       return (
//         <Input
//           label="Email"
//           value={email}
//           onChangeText={email => {
//             setEmail(email);
//             validateEmail(email);
//           }}
//           placeholder="enter email"
//           wrongInput
//         />
//       );
//     }
//     return (
//       <Input
//         label="Email"
//         value={email}
//         onChangeText={email => {
//           setEmail(email);
//           validateEmail(email);
//         }}
//         placeholder="enter email"
//       />
//     );
//   };

//   renderNameInput = () => {
//     if (wrongName) {
//       return (
//         <Input
//           placeholder="name"
//           label="Name"
//           value={name}
//           onChangeText={name => {
//             setName(name);
//             validateName(name);
//           }}
//           wrongInput
//         />
//       );
//     }
//     return (
//       <Input
//         placeholder="name"
//         label="Name"
//         value={name}
//         onChangeText={name => {
//           setName(name);
//           validateName(name);
//         }}
//       />
//     );
//   };

//   renderPhoneInput = () => {
//     if (wrongPhone) {
//       return (
//         <Input
//           placeholder="phone"
//           label="Phone"
//           value={phone}
//           onChangeText={phone => {
//             setPhone(phone);
//             validatePhone(phone);
//           }}
//           wrongInput
//         />
//       );
//     }
//     return (
//       <Input
//         placeholder="phone"
//         label="Phone"
//         value={phone}
//         onChangeText={phone => {
//           setPhone(phone);
//           validatePhone(phone);
//         }}
//       />
//     );
//   };

//   renderPasswordInput = () => {
//     if (wrongPassword) {
//       return (
//         <Input
//           secureTextEntry
//           placeholder="password"
//           label="Password"
//           value={password}
//           onChangeText={password => {
//             setPassword(password);
//             validatePassword(password);
//           }}
//           wrongInput
//         />
//       );
//     }
//     return (
//       <Input
//         secureTextEntry
//         placeholder="password"
//         label="Password"
//         value={password}
//         onChangeText={password => {
//           setPassword(password);
//           validatePassword(password);
//         }}
//       />
//     );
//   };

//   toSignIn = () => {
//     setEmail('');
//     setName('');
//     setPhone('');
//     setPassword('');
//     setError('');
//     setLoading(false);
//     navigation.navigate('Sign In');
//   };

//   return (
//     <>
//       <Card>
//         <CardSection>{renderEmailInput()}</CardSection>

//         <CardSection>{renderNameInput()}</CardSection>

//         <CardSection>{renderPhoneInput()}</CardSection>

//         <CardSection>{renderPasswordInput()}</CardSection>

//         <CardSection>{renderButton()}</CardSection>
//       </Card>
//       <ReactButton
//         title="Sign In"
//         onPress={() => navigation.navigate('Sign In')}
//       />
//       <Text style={styles.errorTextStyle}>{error}</Text>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   errorTextStyle: {
//     fontSize: 20,
//     alignSelf: 'center',
//     color: 'red',
//   },
// });
