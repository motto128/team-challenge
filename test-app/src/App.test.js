import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BirthdayInput,PasswordConfirmationInput} from './TeamSignUp';
import {shallow} from 'enzyme';
import sinon from 'sinon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

function fakeUpdate(event){
    return null;
}

//Tests for the birthday input, to make sure it is working right
describe('<BirthdayInput /> component', () => {
    it('should display an error message if the field is blank', () => {
        const wrapper = shallow(<BirthdayInput value={''} updateParent={fakeUpdate} />);
        expect(wrapper.find('p').text()).toEqual('we need to know your birthdate');
    })
    it('should display an error message if the format of the date is wrong', () => {
        const wrapper = shallow(<BirthdayInput value={'kthsgthd'} updateParent={fakeUpdate} />);
        expect(wrapper.find('p').text()).toEqual('that isn\'t a valid date');
    })
    it('should display an error message if the birthdate is younger than 13 years', () => {
        const wrapper = shallow(<BirthdayInput value={'05/11/2015'} updateParent={fakeUpdate} />);
        expect(wrapper.find('p').text()).toEqual('sorry, you must be at least 13 to sign up');
    })
    it('should not display an error message if the date format is right', () => {
        const wrapper = shallow(<BirthdayInput value={'08/11/1993'} updateParent={fakeUpdate} />);
        expect(wrapper.children().length).toEqual(2);
    })
})

//Test to confirm that the password inputs give the approciate results as expected. 
describe('<PasswordConfirmationInput /> component', () => {
    it('should display password not match if the field is blank', () => {
        const wrapper = shallow(<PasswordConfirmationInput value={""} password={"jellyfish"} updateParent={fakeUpdate} />);
        expect(wrapper.find('p').text()).toEqual("passwords don't match");
    });
    it('should display an error message if the passwords dont match', () => {
        const wrapper = shallow(<PasswordConfirmationInput value={"avocado"} password={"jellyfish"} updateParent={fakeUpdate} />);
        expect(wrapper.find('p').text()).toEqual("passwords don't match");
    });
    it('should not display a message if the passwords match', () => {
        const wrapper = shallow(<PasswordConfirmationInput value={"jellyfish"} password={"jellyfish"} updateParent={fakeUpdate} />);
        expect(wrapper.children().length).toEqual(2);
    });
})