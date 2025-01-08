// import { useState } from "react";
import Input from "./Input.jsx";
import { isEmail, isNotEmpty, hasMinLength, isEqualsToOtherValue } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";
export default function Signup() {
    const {
        value: emailValue,
        handleInputBlur: handleEmailBlur,
        handleChange: handleEmailChange,
        hasError: emailHasError,
        reset: resetEmail
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

    const {
        value: passwordValue,
        handleInputBlur: handlePasswordBlur,
        handleChange: handlePasswordChange,
        hasError: passwordHasError,
        reset: resetPassword
    } = useInput('', (value) => hasMinLength(value, 6));

    const {
        value: confirmPasswordValue,
        handleChange: handleConfirmPasswordChange,
        handleInputBlur: handleConfirmPasswordBlur,
        hasError: confirmPasswordHasError,
        reset: resetConfirmPassword
    } = useInput('', (value) => isEqualsToOtherValue(value, passwordValue));

    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const acquisition = fd.getAll('acquisition');
        const data = Object.fromEntries(fd.entries());
        data.acquisition = acquisition;

        if (emailHasError || passwordHasError || confirmPasswordHasError) {
            return;
        }
        console.log(emailValue, passwordValue);
    }

    function handleReset() {
        resetPassword();
        resetEmail();
        resetConfirmPassword();
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <Input
                label={'Email'}
                id="email"
                type="email"
                name="email"
                onBlur={handleEmailBlur}
                onChange={handleEmailChange}
                value={emailValue}
                error={emailHasError && 'Please enter a valid email address'}
            />

            <div className="control-row">
                <Input
                    label={'Password'}
                    id="password"
                    type="password"
                    name="password"
                    onBlur={handlePasswordBlur}
                    onChange={handlePasswordChange}
                    value={passwordValue}
                    error={passwordHasError && 'Please enter a valid password'}
                    required
                />

                <Input
                    label={'Password Confirmation'}
                    id="confirm-password"
                    type="password"
                    name="confirm-password"
                    onChange={handleConfirmPasswordChange}
                    value={confirmPasswordValue}
                    onBlur={handleConfirmPasswordBlur}
                    error={confirmPasswordHasError && 'Passwords do not match'}
                />
            </div>

            <hr />

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" name="first-name" required />
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" name="last-name" required />
                </div>
            </div>

            <div className="control">
                <label htmlFor="phone">What best describes your role?</label>
                <select id="role" name="role" required>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <fieldset>
                <legend>How did you find us?</legend>
                <div className="control">
                    <input
                        type="checkbox"
                        id="google"
                        name="acquisition"
                        value="google"
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input type="checkbox" id="other" name="acquisition" value="other" />
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input type="checkbox" id="terms-and-conditions" name="terms" required />I
                    agree to the terms and conditions
                </label>
            </div>

            <p className="form-actions">
                <button type="reset" onClick={handleReset} className="button button-flat">
                    Reset
                </button>
                <button type="submit" className="button">
                    Sign up
                </button>
            </p>
        </form >
    );
}