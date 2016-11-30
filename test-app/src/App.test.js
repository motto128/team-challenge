import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import SignUpForm, {EmailInput, RequiredInput, BirthdayInput,PasswordConfirmationInput} from './TeamSignUp';


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

describe ('Reset button component', () =>{

  it('should check if the reset button return blank values', () => {
    const wrapper = shallow(<SignUpForm />);

     wrapper.setState({
      email: { value: 'a@a.com' },
      name: { value: 'bob' },
      dob: { value: '11/11/1960' },
      password: { value: '123456' },
      passwordConf: { value: '123456' }
    });

    wrapper.find('#resetButton').simulate('click');
    expect(wrapper.state().email.value).toEqual('');
    expect(wrapper.state().name.value).toEqual('');
    expect(wrapper.state().dob.value).toEqual('');
    expect(wrapper.state().password.value).toEqual('');
    expect(wrapper.state().passwordConf.value).toEqual('');
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
        wrapper = mount(<SignUpForm />);
        email = wrapper.find('#email');
        dob = wrapper.find('#dob');
        name = wrapper.find('#name');
        pass = wrapper.find('#password');
        passConf = wrapper.find('#passwordConf');
        
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

})

