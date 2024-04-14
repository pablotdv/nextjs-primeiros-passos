"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../contatos.module.css"
import { useRouter } from "next/navigation";
import Authenticator from "@/src/components/authenticator";

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarContato(id) {
  try {
    const token = localStorage.getItem('token');
    const resposta = await fetch(`${baseUrl}/api/contatos/${id}`, {
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
  const [contato, setContato] = useState({
    nome: '',
    logradouro: '',
    telefone: '',
    bairroid: '',
    numero: '',
    tipo: '',
  })
  useEffect(() => {
    async function fetchData() {
      const data = await buscarContato(id)
      setContato(data)
    }
    fetchData()
  }, [id])

  const handleChange = (event) => {
    const { name, value } = event.target
    setContato(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const resposta = await fetch(`${baseUrl}/api/contatos/${contato.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(contato)
    })
    if (resposta.ok) {
      router.push("/contatos")
    }
    else {
      alert("Erro ao atualizar contato")
    }
  }

  return (
    <Authenticator>
      <div className={styles.container}>
        <h1>Atualizar contato</h1>
        <div className={styles.principal}>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nome: </label>
              <input
                value={contato.nome}
                name="nome"
                onChange={handleChange}
                type="text" />
            </div>            
            <div>
              <label>Bairro: </label>
              <input
                value={contato.bairroid}
                name="bairroid"
                onChange={handleChange}
                type="text" />
            </div>
            <div>
              <label>Numero: </label>
              <input
                value={contato.numero}
                name="numero"
                onChange={handleChange}
                type="text" />
            </div>
            <div>
              <label>Logradouro: </label>
              <input
                value={contato.logradouro}
                name="logradouro"
                onChange={handleChange}
                type="text" />
            </div>
            <div>
              <label>Tipo: </label>
              <select
                value={contato.tipo}
                onChange={handleChange}>
                <option>Selecione</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Profissional">Profissional</option>
              </select>
            </div>
            <div>
              <label>Telefone: </label>
              <input
                value={contato.telefone}
                name="telefone"
                onChange={handleChange}
                type="number" />
            </div>
            <button type="submit">Atualizar</button>
            <Link href="/contatos" className={styles.espacamento}>Voltar</Link>
          </form>
        </div>
      </div>
    </Authenticator>
  );
}