import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BirthdayInput,PasswordConfirmationInput} from './TeamSignUp';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {SignUpForm, EmailInput, RequiredInput} from './TeamSignUp.js';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

function DummyUpdate(event){
    return null;
}

//Tests for the birthday input, to make sure it is working right
describe('<BirthdayInput /> component', () => {
    it('should display an error message if the field is blank', () => {
        const wrapper = shallow(<BirthdayInput value={''} updateParent={DummyUpdate} />);
        expect(wrapper.find('p').text()).toEqual('we need to know your birthdate');
    })
    it('should display an error message if the format of the date is wrong', () => {
        const wrapper = shallow(<BirthdayInput value={'kthsgthd'} updateParent={DummyUpdate} />);
        expect(wrapper.find('p').text()).toEqual('that isn\'t a valid date');
    })
    it('should display an error message if the birthdate is younger than 13 years', () => {
        const wrapper = shallow(<BirthdayInput value={'05/11/2015'} updateParent={DummyUpdate} />);
        expect(wrapper.find('p').text()).toEqual('sorry, you must be at least 13 to sign up');
    })
    it('should not display an error message if the date format is right', () => {
        const wrapper = shallow(<BirthdayInput value={'08/11/1993'} updateParent={DummyUpdate} />);
        expect(wrapper.children().length).toEqual(2);
    })
})

//Test to confirm that the password inputs give the approciate results as expected. 
describe('<PasswordConfirmationInput /> component', () => {
    it('should display password not match if the field is blank', () => {
        const wrapper = shallow(<PasswordConfirmationInput value={""} password={"jellyfish"} updateParent={DummyUpdate} />);
        expect(wrapper.find('p').text()).toEqual("passwords don't match");
    });
    it('should display an error message if the passwords dont match', () => {
        const wrapper = shallow(<PasswordConfirmationInput value={"avocado"} password={"jellyfish"} updateParent={DummyUpdate} />);
        expect(wrapper.find('p').text()).toEqual("passwords don't match");
    });
    it('should not display a message if the passwords match', () => {
        const wrapper = shallow(<PasswordConfirmationInput value={"jellyfish"} password={"jellyfish"} updateParent={DummyUpdate} />);
        expect(wrapper.children().length).toEqual(2);
    });
})

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
