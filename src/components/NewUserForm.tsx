import React, { FormEvent } from 'react';

interface NewUserFormProps {
  name: string;
  email: string;
  address: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onAddressChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

const NewUserForm: React.FC<NewUserFormProps> = ({
  name,
  email,
  address,
  onNameChange,
  onEmailChange,
  onAddressChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="new-user-form">
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          required
        />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default NewUserForm;
