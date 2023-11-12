"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../usuarios.module.css"
import Authenticator from "@/src/components/authenticator";

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

export default function Criar() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const usuario = {
      username, password
    }

    const token = localStorage.getItem('token');
    const resposta = await fetch(`${baseUrl}/api/usuarios`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(usuario)
    })
    if (resposta.ok) {
      router.push("/usuarios")
    }
    else {
      alert("Erro ao criar usuario")
    }
  }

  return (
    <Authenticator>
      <div className={styles.container}>
        <h1>Criar usuario</h1>
        <div className={styles.principal}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username: </label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                type="text" />
            </div>
            <div>
              <label>Password: </label>
              <input
                value={password}
                type="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <button type="submit">Criar</button>
            <Link href="/usuarios" className={styles.espacamento}>Voltar</Link>
          </form>
        </div>
      </div>
    </Authenticator>
  );
}