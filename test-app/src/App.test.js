import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import SignUpForm, {EmailInput, RequiredInput} from './TeamSignUp.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe ('<SignUpForm/> component', () =>{

  it('should check if the sign up button is disabled at first', () => {
    const wrapper = shallow(<SignUpForm id='submitButton' disabled ='true' updateParent={update} />);
    expect(wrapper.children().toEqual(true));
  })
})


// Jorge's tests

describe ('<EmailInput/> component', () =>{

  it('Valid input scenario: no error message', () => {
    const wrapper = shallow(<EmailInput value={'a@a.com'} updateParent={update} />);
    expect(wrapper.children().length).toEqual(2);
  })

  it ('Blank email scenario: should show error message' , () =>{
    const wrapper = shallow(<EmailInput value={''} updateParent={update}  />);
    expect(wrapper.find('p').text()).toEqual('we need to know your email address');
  })

  it('Invalid email scenario: should show error message', () => {
    const wrapper = shallow(<EmailInput value={'invalid email'} updateParent={update} />);
    expect(wrapper.find('p').text()).toEqual('this is not a valid email address');
  })


})

describe('<RequiredInput /> component', () => {

    it('Blank input scenario: should show error message', () => {
        const wrapper = shallow(<RequiredInput id="name" field="name" type="text" label="Name" placeholder="your name"
        errorMessage="we need to know your name" value={''} updateParent={update} />);
        expect(wrapper.find('p').text()).toEqual('we need to know your name');
    });

})

function update(event){
  return null; 
}

// End of Jorge's Tests 

// Joes Test 
// Check when sign up button is enabled and disabled accordingly
describe('Submitt button component', () => {
    var email;
    var dob;
    var name;
    var pass;
    var passConf;
    var wrapper;

    beforeEach(() => {
        email = wrapper.find('#email');
        dob = wrapper.find('#dob');
        name = wrapper.find('#name');
        pass = wrapper.find('#password');
        passConf = wrapper.find('#passwordConf');
        wrapper = mount(<SignUpForm />);
    });

  // checks if button is disabled initialy  
  it('Submit should be disabled in begining', () => {
    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
  });

  // only the name is invalid 
  it('disabled when there is no input for name', () => {

    wrapper.find('EmailInput input').simulate('change', { target: { value: "a@a" } });
    wrapper.find('#name input').simulate('change', { target: { value: "" } });
    wrapper.find('BirthdayInput input').simulate('change', { target: { value: "01/01/1995" } });
    wrapper.find('#password input').simulate('change', { target: { value: "123456" } });
    wrapper.find('PasswordConfirmationInput input').simulate('change', { target: { value: "123456" } });

    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(true);
  });

  // all inputs are correct
  it('enabled when all the inputs are correct', () => {

    wrapper.find('EmailInput input').simulate('change', { target: { value: "a@a.com" } });
    wrapper.find('#name input').simulate('change', { target: { value: "Joe" } });
    wrapper.find('BirthdayInput input').simulate('change', { target: { value: "01/01/1995" } });
    wrapper.find('#password input').simulate('change', { target: { value: "123456" } });
    wrapper.find('PasswordConfirmationInput input').simulate('change', { target: { value: "123456" } });

    expect(wrapper.find('#submitButton').prop('disabled')).toEqual(false);
  });

});

