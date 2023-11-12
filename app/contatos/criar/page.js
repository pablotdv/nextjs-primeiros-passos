"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../contatos.module.css"

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

export default function Criar() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const contato = {
      nome, logradouro, telefone, estado, cidade, bairro, numero, tipo
    }

    const token = localStorage.getItem('token');
    const resposta = await fetch(`${baseUrl}/api/contatos`, {
      method: "POST",
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
      alert("Erro ao criar contato")
    }
  }

  return (
    <div className={styles.container}>
      <h1>Criar contato</h1>
      <div className={styles.principal}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome: </label>
            <input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              type="text" />
          </div>
          <div>
            <label>Estado: </label>
            <input
              value={estado}
              onChange={(event) => setEstado(event.target.value)}
              type="text" />
          </div>
          <div>
            <label>Cidade: </label>
            <input
              value={cidade}
              onChange={(event) => setCidade(event.target.value)}
              type="text" />
          </div>
          <div>
            <label>Bairro: </label>
            <input
              value={bairro}
              onChange={(event) => setBairro(event.target.value)}
              type="text" />
          </div>
          <div>
            <label>Numero: </label>
            <input
              value={numero}
              onChange={(event) => setNumero(event.target.value)}
              type="text" />
          </div>
          <div>
            <label>Logradouro: </label>
            <input
              value={logradouro}
              onChange={(event) => setLogradouro(event.target.value)}
              type="text" />
          </div>
          <div>
            <label>Tipo: </label>
            <select
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}>
                <option>Selecione</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Profissional">Profissional</option>
            </select>
          </div>          
          <div>
            <label>Telefone: </label>
            <input
              value={telefone}
              onChange={(event) => setTelefone(event.target.value)}
              type="number" />
          </div>
          <button type="submit">Criar</button>
          <Link href="/contatos" className={styles.espacamento}>Voltar</Link>
        </form>
      </div>
    </div>
  );
}