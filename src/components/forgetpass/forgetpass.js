import react from 'react';
import { useState } from 'react';
import Verification from '../verification/verification';
import authentication from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
const Forget=()=> {
  // console.log(tempuser)
  // const history = useHistory();
  // let tempuser = localStorage.getItem('user');
  // let user = JSON.parse(tempuser);
  // if (tempuser === null) {
  //   history.push('/');
  // }
  // console.log(user);
  const [Phone,setPhone] = useState('');
  const [verify, setverify] = useState(false);
  // const [load, setload] = useState(false);
  const [error, seterror] = useState({});
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'forget-button',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
        },
      },
      authentication
    );
  };
  const validation = () => {
    const error = {};
    if (Phone.trim() === '') 
    error.Phone = 'mobile is require';
    seterror(error);
    return Object.keys(error).length === 0 ? null : error;
  };
  // const handleChange = (event) => {
  //   console.log(Phone)
  //   const { name, value } = event.target;
  //   setPhone({...Phone, [name]: value })
  // };
  const handleforget = async (e) => {
    e.preventDefault();
    const error = validation();
    if (error) return;
    // setload(true);
    console.log("asdad")
      let data = await fetch(
        `https://api.connect-asl.site/api/users/${Phone}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            API_KEY: process.env.REACT_APP_API_KEY,
          },
        }
      );
      let res = await data.json();
      if (res.status === 'success') {
        // setload(false);
        const error = {};
        error.mobile = 'this mobile already exist';
      //   seterror(error);
      //   console.log(error.mobile);
      //   return;
      // }
      setUpRecaptcha();
      const phoneNumber = '+' + Phone;
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          // setload(false);
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          setverify(true);
          window.confirmationResult = confirmationResult;
          console.log('sent');
        })
        .catch((error) => {
          // setload(false);
        });
      }
      else {
        const error = {};
        error.Phone = "this mobile doesn't exist";
        seterror(error);
      }
    }
  if (verify) {
    return <Verification phone={Phone} direct="forget" />;
  }
    return (
      <react.Fragment>
            <div id="forget-button"></div>
        <div className='forgetpass'>
        <form onSubmit={handleforget}  className="container">
          <div className="mb-3">
            <label htmlFor="exampleInputmobile" className="form-label">
             Enter your mobile
            </label>
            <input
              name="Phone"
              // onChange={handleChange}
              value={Phone} onChange={e => setPhone(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputmobile"
            />
           {error.Phone && (
                      <span className="text-danger">{error.Phone}</span>
                    )}
          </div>
          <button  className="btn btn-primary">
            Confirm
          </button>
        </form>
        </div>
      </react.Fragment>
    );
}

export default Forget;
