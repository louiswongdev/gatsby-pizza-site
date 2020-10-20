import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // check if its a number and convert
    const { value } = e.target;
    if (e.target.type === 'number') {
      parseInt(value);
    }

    setValues({
      ...values,
      [e.target.name]: value,
    });
  }

  return { values, updateValue };
}
