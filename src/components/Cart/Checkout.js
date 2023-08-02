import { useRef,useState } from "react";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    phone: true,
    email: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const postalRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const isEmail = (value) => value.includes('@');
  const isSixDigits = (value) => value.trim().length === 6;
  const isTenDigits = (value) => value.trim().length === 10;

  const checkoutHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredPostalCode = postalRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredPhoneIsValid = isTenDigits(enteredPhone);
    const enteredEmailIsValid = isEmail(enteredEmail);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSixDigits(enteredPostalCode);

    const formIsValid =
      enteredNameIsValid &&
      enteredPhoneIsValid &&
      enteredEmailIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    setFormInputsValidity({
      name: enteredNameIsValid,
      phone: enteredPhoneIsValid,
      email: enteredEmailIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalCodeIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      phone: enteredPhone,
      email: enteredEmail,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostalCode
    });
  };

  const nameControlClasses = `${styles.control} ${formInputsValidity.name ? '' : styles.invalid}`;
  const phoneControlClasses = `${styles.control} ${formInputsValidity.phone ? '' : styles.invalid}`;
  const emailControlClasses = `${styles.control} ${formInputsValidity.email ? '' : styles.invalid}`;
  const streetControlClasses = `${styles.control} ${formInputsValidity.street ? '' : styles.invalid}`;
  const cityControlClasses = `${styles.control} ${formInputsValidity.city ? '' : styles.invalid}`;
  const postalControlClasses = `${styles.control} ${formInputsValidity.postal ? '' : styles.invalid}`;

  return (
    <form className={styles.form} onSubmit={checkoutHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputsValidity.name && <p>Name must not be empty.</p>}
      </div>
      <div className={phoneControlClasses}>
        <label htmlFor="phone">Phone Number</label>
        <input type="text" id="phone" pattern="[0-9]+" ref={phoneRef} />
        {!formInputsValidity.phone && <p>Phone number is not valid.</p>}
      </div>
      <div className={emailControlClasses}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" ref={emailRef} />
        {!formInputsValidity.email && <p>Email is not valid.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!formInputsValidity.street && <p>Street must not be empty.</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!formInputsValidity.city && <p>City name must not be empty.</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" pattern="[0-9]+" ref={postalRef} />
        {!formInputsValidity.postal && <p>Postal code is not valid.</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
