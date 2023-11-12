"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../usuarios.module.css"
import { useRouter } from "next/navigation";
import Authenticator from "@/src/components/authenticator";

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarUsuario(id) {
  try {
    const token = localStorage.getItem('token');
    const resposta = await fetch(`${baseUrl}/api/usuarios/${id}`, {
      cache: 'no-store',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await resposta.json();
  } catch (erro) {
    console.error(erro);
    return [];
  }
}

export default function Page({ params: { id } }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    username: '',
    password: ''
  })
  useEffect(() => {
    async function fetchData() {
      const data = await buscarUsuario(id)
      setUsuario(data)
    }
    fetchData()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setUsuario(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const resposta = await fetch(`${baseUrl}/api/usuarios/${usuario.id}`, {
      method: "PUT",
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
      alert("Erro ao atualizar usuario")
    }
  }

  return (
    <Authenticator>
      <div className={styles.container}>
        <h1>Atualizar usuario</h1>
        <div className={styles.principal}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username: </label>
              <input
                value={usuario.username}
                name="username"
                onChange={handleChange}
                type="text" />
            </div>
            <div>
              <label>Password: </label>
              <input
                value={usuario.password}
                name="password"
                onChange={handleChange}
                type="password" />
            </div>            
            <button type="submit">Atualizar</button>
            <Link href="/usuarios" className={styles.espacamento}>Voltar</Link>
          </form>
        </div>
      </div>
    </Authenticator>
  );
}