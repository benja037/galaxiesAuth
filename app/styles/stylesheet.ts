import { Dimensions, StyleSheet } from "react-native";
import { colors } from "./colors";
export const styles = StyleSheet.create({
    container_header: {
      width: '100%',  
      height:'6%',
      backgroundColor:"#ffbc11",
      justifyContent: 'center',
      borderBottomStartRadius:20,
   
    },
    title: {
      fontSize: 22, 
      padding:8
     
    },
    subtitle: {
      fontSize: 16, 
      padding:8
     
    },
    card: {
        borderWidth: 1,
        borderColor: colors.card,
        borderRadius: 10,
        marginVertical: 30,
        padding: 30,
    },
    container: {        
          flex: 1,
          backgroundColor: '#fff',
          alignItems:"center",
          // justifyContent: 'center',
    },
    container_up: { 
        width:'95%',
        height:'10%',
        padding:5,        
        backgroundColor: '#fff',   
        flexDirection:'row',
        flexWrap:'wrap',    
        // justifyContent: 'center',
    },
    container_horario_title: {
      width: '100%',  
      height:'6%',
      backgroundColor:"#c1ecf5",
      justifyContent: 'center',
      borderBottomStartRadius:20,
      flexDirection:'row',
      flexWrap:'wrap',
   
    },
    box_left_short: {        
      width: '60%',
      height: '100%',
      
      padding:5,

        // justifyContent: 'center',
      // justifyContent: 'center',
    },
    
    container_list: {        
        flex: 1,
        backgroundColor: '#fff',
        alignItems:"center",
          // justifyContent: 'center',
    },
    box_left: {        
        width: '80%',
        height: '100%',
        padding:5,

        backgroundColor: '#fff',
        // justifyContent: 'center',
  },
    box_right: {        
        width: '20%',
        height: '100%',
        padding:5,
        
        // justifyContent: 'center',
},
    containerbutton: {        
        flex:1,
        padding: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        // justifyContent: 'center',
    },
    circularbutton: {
        position:"relative",
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#fff',
        borderRadius:50,
    },
    scrollViewContent: {
      paddingVertical: 20,
      paddingHorizontal: 5,
    },
    screen: {
      padding: 20,
    }
}) 

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const offset2 = 80;
const radius = 20;
export const styles_card = StyleSheet.create({
  container: {
    width: deviceWidth - 20,
    alignItems: 'center',
    marginTop: 25,
    marginBottom:25,
    //borderWidth:1,
    //borderColor:"black",
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#00b4fc',
    height: 200,
    borderRadius: radius,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 100,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '800',
  },
  categoryStyle: {
    fontWeight: '200',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
export const styles_card_horario = StyleSheet.create({
  container: {
    width: 140,
    alignItems: 'center',
    marginTop: 5,
    marginBottom:5,
    //borderWidth:1,
    //borderColor:"black",
  },
  cardContainer: {
    width: 120,
    backgroundColor: '#ffeaad',
    height: 100,
    borderRadius: radius,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 100,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '400',
  },
  categoryStyle: {
    fontWeight: '200',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
});