import * as React from "react";
import { User } from "../interfaces";
import { sampleUserData } from "../utils/sample-data";

interface SelectUserProps {
  handleUserSelect: React.ChangeEventHandler<HTMLSelectElement>;
}

export const SelectUser: React.FC<SelectUserProps> = ({ handleUserSelect }) => (
  <select onChange={handleUserSelect}>
    <option value="100">Regular Joe</option>
    {sampleUserData.map((user: User) => (
      <option value={user.id} key={user.id}>{user.name}</option>
    ))}
  </select>
);
