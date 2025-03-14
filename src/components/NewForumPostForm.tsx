import React, { FormEvent } from 'react';

interface NewForumPostFormProps {
  title: string;
  content: string;
  useExistingUser: boolean;
  selectedUserId: number;
  users: { id: number; name: string; email: string }[];
  newUserName: string;
  newUserEmail: string;
  newUserAddress: string;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onUserChange: (value: number) => void;
  onNewUserNameChange: (value: string) => void;
  onNewUserEmailChange: (value: string) => void;
  onNewUserAddressChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

const NewForumPostForm: React.FC<NewForumPostFormProps> = ({
  title,
  content,
  useExistingUser,
  selectedUserId,
  users,
  newUserName,
  newUserEmail,
  newUserAddress,
  onTitleChange,
  onContentChange,
  onUserChange,
  onNewUserNameChange,
  onNewUserEmailChange,
  onNewUserAddressChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          required
        />
      </label>
      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          required
        />
      </label>
      {useExistingUser ? (
        <label>
          Author:
          <select
            value={selectedUserId}
            onChange={(e) => onUserChange(Number(e.target.value))}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </label>
      ) : (
        <>
          <label>
            Name:
            <input
              type="text"
              value={newUserName}
              onChange={(e) => onNewUserNameChange(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => onNewUserEmailChange(e.target.value)}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              value={newUserAddress}
              onChange={(e) => onNewUserAddressChange(e.target.value)}
              required
            />
          </label>
        </>
      )}
      <button type="submit">Create Post</button>
    </form>
  );
};

export default NewForumPostForm;
