import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { Text, 
  TextInput, 
  Button, 
  View, 
  // ToastAndroid, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  KeyboardAvoidingView} from 'react-native';

export default function App() {

  //says it is not supported on platform
  //method that allows for a message to pop up when a button is pressed
  //could just delete

  if (Platform.OS === 'android') {
    const showToast = () => {
      console.log("Toast clicked....")
      ToastAndroid.showWithGravity(
      "You Clicked This Toast",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      50,
      50
      )
    }
  }

  //constructors for the email, password and error objects
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})

  
  //method that validates whether or not the credentials are entered correctly
  //when errored, this would cause the page to shift
  const validateForm = () => {
    let errors = {}

    if(!email) errors.email = "Email is required"
    if(!password) errors.password = "Password is required"

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  //handles final submission successfully
  const handleSubmit = () => {
    if(validateForm()){
      console.log("Submitted", email, password)
      setEmail("")
      setPassword("")
      setErrors({});
    }
  }


  return (

    //KBAV instead of just veiw for better user interface when entering credentials
      <KeyboardAvoidingView behavior = "padding" 
      keyboardVerticalOffset = {Platform.OS == "ios" ? 50 : 0} 
      style = {styles.container}>
        <View style = {styles.form}>
          <Image source = {require("./assets/adaptive-icon.png")} style = {styles.image} />
          <Text style = {styles.label}>Email</Text>
          <TextInput style = {styles.input} placeholder= "Enter your email" 
          value = {email} 
          onChangeText={setEmail}
          secureTextEntry={false}
          />

        {
          errors.email ? <Text style = {styles.errorText}>{errors.email}</Text> : null
        }

          <Text style = {styles.label}>Password</Text>
          <TextInput style = {styles.input} placeholder="Enter your password" 
          secureTextEntry 
          value = {password} 
          onChangeText = {setPassword}
          />
        {
          errors.password ? <Text style = {styles.errorText}>{errors.password}</Text> : null
        }

          <Button title = "Login" onPress = {handleSubmit}/>
          <Text style = {styles.subText}> or</Text>


          <Button title = "Sign Up" onPress = {() => {}}/>

          {/* <TouchableOpacity style = {styles.button} onPress={() => showToast()}>
          <Text style = {{color: "#fff"}}>Log In</Text>
          </TouchableOpacity> */}

        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : "center",
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,

  },

  form: {
    backgroundColor : "white",
    padding : 20,
    borderRadius: 75,
    shadowColor: "black",
    shadowOffset : {
      width: 1,
      height: 5
    },
    shadowOpacity: .5,
    shadowRadius: 10,
    elevation: 50
  },

  //text constructor made for fonts (Rutgers Color Red)
  text: {
    color: "#cc0033",
    fontSize: 20, 
    padding :20
  },

  //button constructor made for a button component
  button: {
    borderRadius: 30,
    backgroundColor : "#29b6f6",
    width : 100,
    height : 30,
    justifyContent : "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 30

  },

  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "center"
  },

  input : {
    color: '#000000',
    height: 40, 
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 5,
    borderRadius : 5,

  },

  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 50,
  }, 

  errorText: {
    color: "red",
    marginBottom: 5,
  },

  subText: {
    color: "#d3d3d3",
    marginBottom: 0,
    alignSelf: "center"
  }
});
