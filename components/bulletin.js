import React from 'react';
import { ActivatingIndicator, StyleSheet, Text, View,StatusBar } from 'react-native';
import {Container , Content, Header,Form,Input,Item,Button, Label} from 'native-base';


const Bulletin =()=>{

return(
    <Container style ={styles.container} >
            <Header>
                <Content>
                    <Item>
                        <Input
                        placeholder="add feed"
                        />
                        </Item>
                    </Content>
            </Header>
    </Container>
);

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    }
})


export {Bulletin};