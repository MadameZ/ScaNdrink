import React, {useState} from 'react';
import { StyleSheet, View, StatusBar, TextInput } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import colors from '../components/colors';




function MonPaiement({navigation, displayPanier, displayTotalBasket, sendUserId}) {

  
  
  var sendOrderInfo = async() => {
    

    var panierSend = JSON.stringify(displayPanier)


    console.log('panierSend :', panierSend);

    const data = await fetch("http://10.2.5.210:3000/monPaiement", {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `total=${displayTotalBasket}&idUser=${sendUserId}&panierSend=${panierSend}`
    })

    var body = await data.json() 
    console.log('monPaiement / body :', body);

  
    
  


  }


    return (
  
    <View style={{flex:1}}>
       
          <View>
            <StatusBar barStyle="light-content" />
          </View>
  
          <View style= {styles.title}>
            <Text style= {{fontSize: 25 }}>Payer par carte bancaire</Text>
          </View >

          <View style={styles.globalView}>


            <View style={{marginTop:hp('3%')}}>
              <Text style={styles.label}>Informations de la carte</Text>
              <TextInput 
              style = {styles.inputLarge}
              placeholder = "  1234 1234 1234 1234"
             
              />
              <View style={{flexDirection:'row'}}>
                <TextInput 
                style = {styles.inputSmallLeft}
                placeholder = "  MM / AA"
                />
                <TextInput 
                style = {styles.inputSmallRight}
                placeholder = "  CVC"
                />
              </View>

            </View>

            <View style={{marginTop:hp('3%')}}>
              <Text style={styles.label}>Nom du titulaire de la carte</Text>
              <TextInput 
              style = {styles.inputLarge}
              placeholder = "  Name"
              />
            </View>

            <View style={{marginTop:hp('3%'), marginBottom:hp('3%')}}>
              <Text style={styles.label}>Pays ou région</Text>
              <TextInput 
              style = {styles.inputLarge}
              placeholder = "  France"
            
              />
            </View>

          </View>

          
          
  

          <Button
          buttonStyle={{backgroundColor: colors.secondary, marginLeft:hp('7%'), marginRight:hp('7%'), height:hp('6%')}}
          title = {`Payer ${displayTotalBasket} €`}
          onPress={() => {sendOrderInfo(), navigation.navigate('SuiviCommande')}}
          />
         
      
    </View>
  
  
    
  
  
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex:1, 
      backgroundColor:'#F9F9F9'
    },
    globalView: {
      marginLeft:hp('2%'), 
      marginRight:hp('2%')
    },
    title: {
      justifyContent:"center", 
      alignItems:'center', 
      marginTop: hp('4%'), 
      marginBottom:hp('7%')
    },
    label: {
      marginBottom: hp('1%')
    },
    inputLarge: {
      width: hp('42%'),
      height: hp('4%'),
      marginRight: hp('2%'),
      borderColor: '#636e72',
      borderWidth:0.3
    },
    inputSmallLeft: {
      width: hp('21%'),
      height: hp('4%'),
      borderLeftColor: '#636e72',
      borderLeftWidth: 0.3,
      borderBottomColor: '#636e72',
      borderBottomWidth: 0.3,
    },
    inputSmallRight: {
      width: hp('21%'),
      height: hp('4%'),
      borderLeftColor: '#636e72',
      borderLeftWidth: 0.3,
      borderRightColor: '#636e72',
      borderRightWidth: 0.3,
      borderBottomColor: '#636e72',
      borderBottomWidth: 0.3,
    },
  });

  function mapStateToProps(state) {

    console.log('monPaiement / state.totalBasket :', state.totalBasket);
    console.log('monPaiement /state.idUser  :', state.idUser );

    return { displayTotalBasket: state.totalBasket, 
             displayPanier: state.panier,
             sendUserId: state.idUser 
          }
  }
  
  export default connect(
    mapStateToProps,
    null
  )(MonPaiement);


 