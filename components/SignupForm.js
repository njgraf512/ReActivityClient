import React, {Component} from 'react';
import {
  Button,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableHighlight,
  View } from 'react-native';

var {GiftedForm, GiftedFormManager} = require('react-native-gifted-form');
var moment = require('moment');
import GooglePlacesWidget from '../components/GooglePlacesWidget';
// import LocationDropDown from '../components/LocationDropDown';
import SelectMultiple from 'react-native-select-multiple'
import { api } from '../lib/ajaxCalls.js';
import { store } from '../lib/reduxStore'


export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalInterests: false,
      city: {},
      availableInterests: [],
      selectedInterests: [],
      submitWarning: ''
    }
  }
  componentWillMount() {
    let interests = store.getState().sportsToIds;
      let availableInterests = []
      for (var i = 0; i < interests.length; i++) {
        availableInterests.push({label: interests[i].sport, value: interests[i].id});
      }
      this.setState({availableInterests: availableInterests});
  }
  onSelectionsChange = (selectedInterests) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedInterests: selectedInterests })
  }

  render() {
    var {height, width} = Dimensions.get('window');

    return (
      <View style={{flex: 1,
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'center'}}>
  <Modal
    animationType={"slide"}
    transparent={false}
    visible={this.state.modalVisible}
    onRequestClose={() => {this.setState({modalVisible: false})}}
    >
    <View style={{flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center'}}>
    <View style={{marginTop: 25, width: width}}>
      <GooglePlacesWidget queryType='(cities)' state = {this}/>
    </View>
  </View>
      <Button
        onPress={() => {
          this.setState({modalVisible: false});
        }}
        title="Go Back"
        color="blue"
      />

  </Modal>
  <Modal
    animationType={"slide"}
    transparent={false}
    visible={this.state.modalInterests}
    onRequestClose={() => {this.setState({modalInterests: false})}}
    >
    <View style={{flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center'}}>
        <SelectMultiple
          items={this.state.availableInterests}
          selectedItems={this.state.selectedInterests}
          onSelectionsChange={this.onSelectionsChange} />
  </View>
      <Button
        onPress={() => {
          this.setState({modalInterests: false});
        }}
        title="Confirm"
        color="blue"
      />


  </Modal>

      <GiftedForm
        formName='signupForm' // GiftedForm instances that use the same name will also share the same states

        openModal={(route) => {
        this.setState({modalVisible: true});
          // this.props.navigator.push('googlePlacesWidget'); // The ModalWidget will be opened using this method. Tested with ExNavigator
        }}

        clearOnClose={false} // delete the values of the form when unmounted

        defaults={{
          //
          firstName : '',
          lastName : '',
          username: '',
          password: '',
          email: '',
          city: 'HR',
          bioText : ''

        }}

        validators={{
          firstName: {
            title: 'First name',
            validate: [{
              validator: 'isLength',
              arguments: [1, 23],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          lastName: {
            title: 'Last name',
            validate: [{
              validator: 'isLength',
              arguments: [1, 23],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          username: {
            title: 'Username',
            validate: [{
              validator: 'isLength',
              arguments: [3, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            },{
              validator: 'matches',
              arguments: /^[a-zA-Z0-9]*$/,
              message: '{TITLE} can contains only alphanumeric characters'
            }]
          },
          password: {
            title: 'Password',
            validate: [{
              validator: 'isLength',
              arguments: [6, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          email: {
            title: 'Email address',
            validate: [{
              validator: 'isLength',
              arguments: [6, 255],
            },{
              validator: 'isEmail',
            }]
          },
          bioText: {
            title: 'Biography',
            validate: [{
              validator: 'isLength',
              arguments: [0, 512],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          city: {
            title: 'City',
          },
        }}
      >

      <GiftedForm.SeparatorWidget />
      <GiftedForm.TextInputWidget
        name='firstName' // mandatory
        title='First name'

        image={require('../assets/images/icons/user.png')}

        placeholder='Marco'
        clearButtonMode='while-editing'
        />
        <GiftedForm.TextInputWidget
          name='lastName' // mandatory
          title='Last name'

          image={require('../assets/images/icons/user.png')}

          placeholder='Polo'
          clearButtonMode='while-editing'
        />


        <GiftedForm.TextInputWidget
          name='username'
          title='Username'
          image={require('../assets/images/icons/contact_card.png')}

          placeholder='MarcoPolo'
          clearButtonMode='while-editing'

          onTextInputFocus={(currentText = '') => {
            if (!currentText) {
              let firstName = GiftedFormManager.getValue('signupForm', 'firstName');
              let lastName = GiftedFormManager.getValue('signupForm', 'lastName');
              if (firstName) {
                return (firstName.replace(/[^a-zA-Z0-9-_]/g, '') + lastName.replace(/[^a-zA-Z0-9-_]/g, ''));
              }
            }
            return currentText;
          }}
        />

        <GiftedForm.TextInputWidget
          name='password' // mandatory
          title='Password'

          placeholder='******'


          clearButtonMode='while-editing'
          secureTextEntry={true}
          image={require('../assets/images/icons/lock.png')}
        />

        <GiftedForm.TextInputWidget
          name='email' // mandatory
          title='Email address'
          placeholder='example@nomads.ly'

          keyboardType='email-address'

          clearButtonMode='while-editing'

          image={require('../assets/images/icons/email.png')}
        />

        <GiftedForm.SeparatorWidget />

        <GiftedForm.TextInputWidget
          name='bioText' // mandatory
          title='Biography'

          image={require('../assets/images/icons/book.png')}

          placeholder='something interesting about yourself'
          clearButtonMode='while-editing'
          />
        <GiftedForm.ModalWidget
          title='City'
          displayValue='city'
          image={require('../assets/images/icons/passport.png')}
          scrollEnabled={false}

        >
          <GiftedForm.SelectCountryWidget
            code='alpha2'
            name='city'
            title='City'
            autoFocus={true}
          />
        </GiftedForm.ModalWidget>

        <Button
          onPress={() => { this.setState({modalInterests: true}); }}
          title="Choose interests"
          color="blue"
        />

      <Text style={{color: 'red'}}>{this.state.submitWarning}</Text>
        <GiftedForm.SubmitWidget
          title='Sign up'
          widgetStyles={{
            submitButton: {
              backgroundColor: "green",
            }
          }}
          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            if (isValid === true && this.state.details) {
              // prepare object
              interestsToSend = [];
              for (var i = 0; i < this.state.selectedInterests.length; i++) {
              interestsToSend.push(this.state.selectedInterests[i].value);
              }

              data = {
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                password: values.password,
                email: values.email,
                bioText: values.bioText,
                homeLocation: {
                  id: this.state.details.place_id,
                  name: this.state.details.name,
                  address: this.state.details.formatted_address,
                  latitude: this.state.details.geometry.location.lat,
                  longitude: this.state.details.geometry.location.lng,
                  locationName: 'home'
                },
                interests: interestsToSend
              }
              api.signupUser((response) => {
                if (response.status > 400 ) {
                  postSubmit();
                  this.setState({submitWarning: response._bodyText})
                  console.log('Error in the API callback', response._bodyText);
                } else if (response.status === 201) {
                  console.log('SignUp successul');
                  postSubmit();
                  this.props.navigator.push('signin');
                }
              }, JSON.stringify(data));

              //  then you can do:
              //  postSubmit(); // disable the loader
              //  postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              //  postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              //  GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used

            } else {
              postSubmit(['Please fill out the fields']);
              this.setState({submitWarning: 'Please fill out the fields correctly'})
              console.log('Fields not valid');
            }
          }}

        />
        <GiftedForm.NoticeWidget
          title='By signing up, you agree to the Terms of Service and Privacy Policity.'
        />

        <GiftedForm.HiddenWidget name='tos' value={true} />

      </GiftedForm>
      </View>
    );
  }
};
