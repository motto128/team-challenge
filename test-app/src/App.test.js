import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {SignUpForm, EmailInput, RequiredInput} from './TeamSignUp.js';



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
// Verify that email field contains a string with an '@' inbetween
  it('Valid input scenario: no error message', () => {
    const wrapper = shallow(<EmailInput value={'a@a.com'} updateParent={update} />);
    expect(wrapper.children().length).toEqual(2);
  })
// Verify that if nothing is typed in, show an error message
  it ('Blank email scenario: should show error message' , () =>{
    const wrapper = shallow(<EmailInput value={''} updateParent={update}  />);
    expect(wrapper.find('p').text()).toEqual('we need to know your email address');
  })
// When there is an invalid email entered, show error message
  it('Invalid email scenario: should show error message', () => {
    const wrapper = shallow(<EmailInput value={'invalid email'} updateParent={update} />);
    expect(wrapper.find('p').text()).toEqual('this is not a valid email address'); 
  })


})

describe('<RequiredInput /> component', () => {
// When there is a blank input, show error message
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