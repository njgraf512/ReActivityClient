import React from 'react';
import {
  Image,
  Button,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet
} from 'react-native';
import { store } from '../lib/reduxStore.js';

export default class EventViewScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = store.getState().currentlyViewing;

    console.log('Starting event view screen. currentlyViewing is:', this.state);


    // Bind this to functions
    this.renderAttendees = this.renderAttendees.bind(this);
  }

  renderAttendees(att) {
    var code = [];
    for (var i = 0; i < att.length; i++) {
      var snippet = (
        <Text>
          --{att[i]}
        </Text>
      )
      code.push(snippet);
    }
    return code;
  }


  render() {
    var that = this;
    return (

      <View style={styles.container}>
        <ScrollView style={styles.container}
          contentContainer={styles.contentContainer}>
          <View style={styles.formImageContainer}>
            <Text
              onPress = {
                function() {
                  that.props.navigator.pop();
                }
              }>
              Back 
            </Text>
            <Image 
              style={styles.formImage}
              source={{uri: this.state.eventPhoto}}/>
          </View>
          <View style={styles.formContainer}>

            <Text>
              Id: {this.state.id}
            </Text>
            <Text>
              Location: {this.state.location.name}
            </Text>
            <Text>
              Position: Lat - {this.state.location.latitude} : Lon - {this.state.location.longitude}
            </Text>
            <Text>
              Created At: {this.state.time.created}
            </Text>
            <Text>
              Starts At: {this.state.time.playTime}
            </Text>
            <Text>
              Event Type: {this.state.eventType}
            </Text>
            <Text>
              Player Range: Between {this.state.minPlayers} and {this.state.maxPlayers} players.
            </Text>
           
            <View style={styles.listContainer}>
              <Text>
                Coming:
              </Text>
              {this.renderAttendees(this.state.attendees)}
            </View>
            
          </View>
        </ScrollView>
      </View>
    
    )
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    contentContainer: {
      paddingTop: 80
    },
    formImageContainer: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20
    },
    formContainer: {
      marginTop: 10,
      marginBottom: 20
    },
    formImage: {
      width: 400,
      height: 200,
      marginTop: 3

    },
    inputStyle: {
      height: 40
    },
    buttonContainer: {
      marginTop: 10,
      marginBottom: 20
    },
    listContainer: {
      borderTopWidth: 2
    }

})

