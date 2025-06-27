import { useEffect, useState } from "react";
import api from "../utils/axios";
import styles from "../styles/Home.module.css";

type User = {
  id: number;
  name: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users from FastAPI</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} className={styles.item}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
