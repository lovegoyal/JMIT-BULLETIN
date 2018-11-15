import React from 'react';
import { ActivatingIndicator, StyleSheet, Text, View,StatusBar,ListView } from 'react-native';
import {Form1} from './components/form.js';
import * as firebase from 'firebase';
import {Button1} from './components/button';
//import {Container , Content, Header,Input,Item, Label} from 'native-base';
import {Container , Content, Header,Form,Input,Item,Button, Label,Icon,ListItem,List} from 'native-base';

// import {Bulletin} from './components/bulletin';
//var db;
var data=[];
export default class App extends React.Component {
  constructor(props){  
   super(props)
   this.ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r!=r2})

   this.state = ({
      email:'',
      rollno:'',
      Username:'',
      password:'',
      authenticating:false,
      user:null,
      error:'',
      listViewData: data,
      newContact:''
    })
          }
          componentDidMount(){

            var that = this
            firebase.database().ref('/feeds').on('child_added',function(Data){
                var newData= [...that.state.listViewData]
                newData.push(Data)
                that.setState({listViewData:newData})
        
            })
        
          }
  componentWillMount(){
    console.log('started');
    var config = {
      apiKey: "AIzaSyAXtzakiJpmVZM-SHkYQLKJtygfdehpC6g",
      authDomain: "moboapp-9d8e0.firebaseapp.com",
      databaseURL: "https://moboapp-9d8e0.firebaseio.com",
      projectId: "moboapp-9d8e0",
      storageBucket: "moboapp-9d8e0.appspot.com",
      messagingSenderId: "165676873923"
    };
    firebase.initializeApp(config);
    db= firebase.database();
     
    }
  
  logInfunction(email,password){
     
     console.log(this.state.email);
     console.log(this.state.password);
     console.log(this.state.Username);
     console.log(this.state.user);
     
     this.setState({authenticating:true});
    
    //  const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(user => this.setState({
      authenticating: false,
      user,
      error: ''
    }))
  }
  signInfunction(email,password){
      // Login was not successful
      console.log(email);
      console.log(password);
      firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(user => this.setState({
          authenticating: false,
          user,
          error: '',
        }))
        .catch(() => this.setState({
          authenticating: false,
          user: null,
          error: 'Authentication Failure',
        }))

     db.ref(`useraccounts/${this.state.Username}`).set({
      email:this.state.email,
      Username:this.state.Username,
      password:this.state.password
    });
    }
onPressLogOut() {

  firebase.auth().signOut()
    .then(() => {
      this.setState({
        email: '',
        password: '',
        authenticating: false,
        user: null,
      })
    }, error => {
      console.error('Sign Out Error', error);
    });
     console.log(this.state.email);

}

addRow(data){

  var key = firebase.database().ref('/feeds').push().key
  firebase.database().ref('/feeds').child(key).set({ name:data })


}
async deleteRow(secId,rowId,rowMap,data){

  await firebase.database().ref('feeds/'+data.key).set(null)

  rowMap[`${secId}${rowId}`].props.closeRow();
  var newData=[...this.state.listViewData];
  newData.splice(rowId,1);
  this.setState({listViewData:newData});

}


showInformation(){





}
//   renderfunction(){
//     if(this.state.authenticating)
//     {
//       return(
//       <View>
//         <Text>Loading...</Text>
//   {/*           <ActivatingIndicator size ='large' /> */}
//         </View>
//       )
//     }
//     if (this.state.user !== null) {
//       return (
//         <View style={styles.form}>
//           <Text>Logged In</Text>
// 
//           <Button onPress={() => this.onPressLogOut()}>Log Out</Button>
//         </View>
//       )
//     }
//       return(
//       <View>
// <Text style = {styles.container}> Let's Sign up To Bulletin</Text>
//       <Form 
//          label ='Email'
//           //placeholder = 'enter your email....'
//           onChangeText = {email => this.setState({email})}
//           value = {this.state.email}
//        />
//        <Form 
//          label ='Username'
//           //placeholder = 'enter your password....'
//           onChangeText = {Username => this.setState({Username})}
//           value = {this.state.Username}
//        />
//        <Form 
//          label ='Password'
//           //placeholder = 'enter your password....'
//           onChangeText = {password => this.setState({password})}
//           value = {this.state.password}
//           secureTextEntry
//        />
//        <Button onpress={() =>this.signInfunction(this.state.email,this.state.password)}>Sign Up</Button>
//        <Button onpress={() =>this.logInfunction(this.state.email,this.state.password)}>Log In</Button>
//         </View>
//       )
//     }   

  
  render() {
    if(this.state.authenticating)
        {
          return(
          <View>
            <Text>Loading...</Text>
      {/*           <ActivatingIndicator size ='large' /> */}
            </View>
          )
        }
        if(this.state.Username==='nidhikabirla'&&this.state.password==='nidhikajmit')
        {
          return(

            <Container style={styles.container2}>
            <Header style={{marginTop:StatusBar.currentHeight}}>
             {/* {this.renderfunction()}  */}
            <Content>
              <Item>
                <Input style={styles.container3}
                onChangeText = {(newContact)=>this.setState({newContact})}
                placeholder = "Add feed"
                />
      
                <Button onPress={()=>this.addRow(this.state.newContact)}>
                  <Icon name="add"/>
                  </Button>
                </Item>
              </Content>
            </Header>
            <Content>
              <List 
              enableEmptySections
              dataSource={this.ds.cloneWithRows(this.state.listViewData)}
              renderRow={data=>
              <ListItem>
                  <Text> {data.val().name}</Text>
              </ListItem>
               }
               renderLeftHiddenRow={data=>
                <Button full onPress={()=>this.addRow(data)}>
                <Icon name="information-circle"/>
                </Button>
              }
              renderRightHiddenRow={(data,secId,rowId,rowMap)=>
                <Button full danger onPress={()=>this.deleteRow(secId,rowId,rowMap,data)}>
                <Icon name="trash"/>
                </Button>
              }
              leftOpenValue={-75}
              rightOpenValue={-75}
              />
              </Content>
              <Button1 onPress={() => this.onPressLogOut()}>Log Out</Button1>
            </Container>
          );
}
        if (this.state.user !== null) {
    return (
      <Container style={styles.container2}>
      <Header style={{marginTop:StatusBar.currentHeight}}>
       {/* {this.renderfunction()}  */}
      {/* <Content>
        <Item>
          <Input style={styles.container3}
          onChangeText = {(newContact)=>this.setState({newContact})}
          placeholder = "Add feed"
          />

          <Button onPress={()=>this.addRow(this.state.newContact)}>
            <Icon name="add"/>
            </Button>
          </Item>
        </Content> */}
      </Header>
      <Content>
        <List 
        enableEmptySections
        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
        renderRow={data=>
        <ListItem>
            <Text> {data.val().name}</Text>
        </ListItem>
         }
         renderLeftHiddenRow={data=>
          <Button full onPress={()=>this.addRow(data)}>
          <Icon name="information-circle"/>
          </Button>
        }
        renderRightHiddenRow={(data,secId,rowId,rowMap)=>
          <Button full danger onPress={()=>this.deleteRow(secId,rowId,rowMap,data)}>
          <Icon name="trash"/>
          </Button>
        }
        leftOpenValue={-75}
        rightOpenValue={-75}
        />
        </Content>
        <Button1 onPress={() => this.onPressLogOut()}>Log Out</Button1>
      </Container>
      
    );
  }
  return(
          <View>
    <Text style = {styles.container}> Let's Sign up To Bulletin</Text>
          <Form1 
             label ='Email'
              //placeholder = 'enter your email....'
              onChangeText = {email => this.setState({email})}
              value = {this.state.email}
           />
           <Form1 
             label ='Username'
              //placeholder = 'enter your password....'
              onChangeText = {Username => this.setState({Username})}
              value = {this.state.Username}
           />
           <Form1 
             label ='Password'
              //placeholder = 'enter your password....'
              onChangeText = {password => this.setState({password})}
              value = {this.state.password}
              secureTextEntry
           />
           <Button1 onpress={() =>this.signInfunction(this.state.email,this.state.password)}>Sign Up</Button1>
           <Button1 onpress={() =>this.logInfunction(this.state.email,this.state.password)}>Log In</Button1>
            </View>
          )
 }



}







const styles = StyleSheet.create({
  container2:{
    flex:1,
    backgroundColor:'#fff',
  },
  container3:{
    flex:1,
    backgroundColor:'#33C4FF', 

  },

  container: {
    margin:60,
    fontSize:21,
    fontWeight:'bold',
    //flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1:{
    flex:1,
    backgroundColor:'#fff',
    justifyContent: 'center',

},
});
