import React, { useState, useCallback } from 'react';

export default function BankForm() {
  const [state, setState] = useState({
    number: '',
    mounth: '',
    year: '',
    cvv: '',
  });
  const [success, setSuccess] = useState(false);
  const [wrongNum, setWrongNum] = useState(false);
  const [wrongMoun, setWrongMoun] = useState(false);
  const [wrongYear, setWrongYear] = useState(false);
  const [wrongCvv, setWrongCvv] = useState(false);

  const { number, mounth, year, cvv } = state;

  const onFormSubmit = useCallback(
      (e) => {
        e.preventDefault();
        const regNumb = /^(\d){16}$/;
        const regMoun = /^(0[1-9]|1[0-2])$/;
        const regYear = /^([2-9][\d])$/;
        const regCvv = /^(\d){3}$/;

        if (number !== '1111222233334444' && !regNumb.test(number)) {
          alert('You entered the wrong card number');
          setWrongNum(true);
          setWrongMoun(false);
          setWrongYear(false);
          setWrongCvv(false);
        } else if (!regMoun.test(mounth)) {
          alert('You entered the wrong mounth');
          setWrongMoun(true);
          setWrongNum(false);
          setWrongYear(false);
          setWrongCvv(false);
        } else if (!regYear.test(year)) {
          alert('You entered the wrong year');
          setWrongYear(true);
          setWrongMoun(false);
          setWrongNum(false);
          setWrongCvv(false);
        } else if (!regCvv.test(cvv)) {
          alert('You entered the wrong CVV2');
          setWrongCvv(true);
          setWrongYear(false);
          setWrongMoun(false);
          setWrongNum(false);
        } else {
          setSuccess(true);
          setWrongCvv(false);
          setWrongYear(false);
          setWrongMoun(false);
          setWrongNum(false);
          setState({
            number: '',
            mounth: '',
            year: '',
            cvv: '',
          });
        }
      }, [number, mounth, year, cvv],
  );

  const onInputChange = useCallback(
      ({ target }) => {
        setWrongCvv(false);
        setWrongYear(false);
        setWrongMoun(false);
        setWrongNum(false);
        setState({
          ...state,
          [target.name]: target.value,
        });
      }, [state],
  );

  return (
    <div className='bank_form_wrapper'>
      { success ? <div className='bank_form_success'>Success</div> :
      <form className='bank_form'
        onSubmit={ onFormSubmit } >
        <input className={ wrongNum ?
          'bank_form_input wrong' : 'bank_form_input'}
        required
        type='number'
        placeholder='№card (1111222233334444)'
        name='number'
        value={ number }
        onChange={ onInputChange } />
        <input className={ wrongMoun ?
          'bank_form_input data wrong' : 'bank_form_input data'}
        required
        type='number'
        placeholder='MM'
        name='mounth'
        value={ mounth }
        onChange={ onInputChange } />
        <input className={ wrongYear ?
          'bank_form_input data wrong' : 'bank_form_input data'}
        required
        type='number'
        placeholder='YY'
        name='year'
        value={ year }
        onChange={ onInputChange } />
        <input className={ wrongCvv ?
          'bank_form_input wrong' : 'bank_form_input'}
        required
        type='number'
        placeholder='CVV2'
        name='cvv'
        value={ cvv }
        onChange={ onInputChange } />
        <button className='bank_form_button'>OK</button>
      </form> }
    </div>
  );
}
