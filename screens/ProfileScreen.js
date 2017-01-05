import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import socket from '../components/SocketIo';
import { ngrokURL } from '../lib/localvars.js';

export default class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Profile',
    },
  }
  componentDidMount() {
    socket.on('news', function (data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }

  state = {
    isConnected: false,
    data: null,
  }

  componentDidMount() {

    socket.on('connect', () => {
      this.setState({isConnected: true});
    });

    socket.on('ping', (data) => {
      this.setState(data: data);
    });

    fetch(ngrokURL + '/api/test').then(function(response){
      console.log('normal GET request answer: ', response._bodyText);
    })

  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text>This is where the profile screen will live</Text>
        <Text>But currently it is the test field for server - client conenctions:</Text>

        { this.state.data && (
          <Text>
            socket connection: {this.state.data}
          </Text>
        )}
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
