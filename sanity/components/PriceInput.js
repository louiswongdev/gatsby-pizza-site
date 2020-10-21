import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-ca', {
  style: 'currency',
  currency: 'CAD',
}).format;

// export default function PriceInput({ type, value, onChange, inputComponent }) {
//   return (
//     <div>
//       <h2>
//         {type.title} - {value ? formatMoney(value / 100) : ''}
//       </h2>
//       <p>{type.description}</p>
//       <input
//         type={type.name}
//         value={value}
//         onChange={(event) => onChange(createPatchFrom(event.target.value))}
//         ref={inputComponent}
//       />
//     </div>
//   );
// }

const PriceInput = React.forwardRef(
  ({ type, value, onChange }, inputComponent) => (
    // console.log(inputComponent);
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : null}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </div>
  )
);

// eslint --> Component definition is missing display name
PriceInput.displayName = 'PriceInput';

PriceInput.focus = function () {
  this._inputElement.focus();
};

export default PriceInput;
