import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Image
} from "react-native";

//TODO: Read about UUID

import { uuid } from "uuid";

import { Form, Item, Input, Label, Button } from "native-base";

import { ImagePicker } from "expo";
import { Header } from "react-navigation";

//TODO: add firebase
import * as firebase from "firebase";
import { rejects } from "assert";
import console = require("console");
export default class AddNewContact extends Component {
  static navigationOptions = {
    // set screen header title
    title: "Add Contact"
  };
  //TODO: create constructor with state: fname, lname, phone, email, address, image, imageDownloadUrl, isUploading
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      phone: "",
      email: "",
      address: "",
      image: "empty",
      imageDownloadUrl: "empty",
      isUploading: false
    };
  }
  //TODO: savecontact method
  saveContact = () => {
    // create and save contact to firebase
  };
  //TODO: pick image from gallery
  pickImage = async() => {
             let result =  await ImagePicker.launchImageLibraryAsync({
                       quality:0.2,
                       base64:true,
                       allowsEditing:true,
                       aspect:[1,1]
             });


             if(!result.cancelled){
                this.setState({
                  image:result.uri
                })
             }
  }   
  //TODO: upload image to firebase
  uploadImageAsync = async (uri, storageRef) => {
             const parts =await uri.split(".");
             const fileExtension = parts[parts.length-1];
             //create blob

             const blob = await new Promise( (resolve,reject)=>{
                   const xhr = new XMLHttpRequest();
                   xhr.onload= function(){
                     resolve(xhr.response);
                   }

                   xhr.onerror =function(e){
                         console.log(e);
                         reject(new TypeError("Network Request failed"))
                   }

                   xhr.responseType ="blob"
                   xhr.open("GET",uri,true);
                   xhr.send(null)
             } )
  };
  //render method
  render() {
    if (this.state.isUploading) {
      return (
        <View
          style={{ flex: 1, alignContent: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#B83227" />
          <Text style={{ textAlign: "center" }}>
            Contact Uploading please wait..
          </Text>
        </View>
      );
    }
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEIGHT + 20} // adjust the value here if you need more padding
        style={{ flex: 1 }}
        behavior="padding"
      >
        <TouchableWithoutFeedback
          onPress={() => {
            // dismiss the keyboard if touch any other area then input
            Keyboard.dismiss();
          }}
        >
          <ScrollView style={styles.container}>
            <TouchableOpacity
              onPress={() => {
                this.pickImage();
              }}
            >
              <Image
                source={
                  this.state.image === "empty"
                    ? require("../assets/person.png")
                    : {
                        uri: this.state.image
                      }
                }
                style={styles.imagePicker}
              />
            </TouchableOpacity>

            <Form>
              <Item style={styles.inputItem} floatingLabel>
                <Label>First Name</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={fname => this.setState({ fname })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label>Last Name</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={lname => this.setState({ lname })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label>Phone</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  onChangeText={phone => this.setState({ phone })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label>Email</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={email => this.setState({ email })}
                />
              </Item>
              <Item style={styles.inputItem} floatingLabel>
                <Label>Address</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="default"
                  onChangeText={address => this.setState({ address })}
                />
              </Item>
            </Form>

            <Button
              style={styles.button}
              full
              rounded
              onPress={() => {
                // save contact
                this.saveContact();
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Button>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}
// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
  },
  imagePicker: {
    justifyContent: "center",
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    borderColor: "#c1c1c1",
    borderWidth: 2
  },
  inputItem: {
    margin: 10
  },
  button: {
    backgroundColor: "#B83227",
    marginTop: 40
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
