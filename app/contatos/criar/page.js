"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../contatos.module.css"
import Authenticator from "@/src/components/authenticator";

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

export default function Criar() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [telefone, setTelefone] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [tipo, setTipo] = useState("");
  const [observacao, setObservacao] = useState("");
  const [idade, setIdade] = useState(0);

  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])
  const [bairros, setBairros] = useState([])

  useEffect(() => {
    const buscarEstados = async () => {
      const token = localStorage.getItem("token")
      const resposta = await fetch(`${baseUrl}/api/estados`, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const dados = await resposta.json()
      setEstados(dados)
    }

    buscarEstados()
  }, [])

  const estadoChange = async (event) => {
    const buscarCidades = async () => {
      const token = localStorage.getItem("token")
      const resposta = await fetch(`${baseUrl}/api/cidades?estadoid=${event.target.value}`, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const dados = await resposta.json()
      setCidades(dados)
    }

    await buscarCidades()
  }

  const cidadeChange = async (event) => {
    const buscarBairros = async () => {
      const token = localStorage.getItem("token")
      const resposta = await fetch(`${baseUrl}/api/bairros?cidadeid=${event.target.value}`, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const dados = await resposta.json()
      setBairros(dados)
    }

    await buscarBairros()
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const contato = {
      nome, logradouro, telefone, bairro, numero, tipo, observacao, idade
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
    <Authenticator>
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
              <select onChange={estadoChange}>
                <option>Selecione</option>
                {estados.map(estado => (
                  <option key={estado.id} value={estado.id}>{estado.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Cidade: </label>
              <select onChange={cidadeChange}>
                <option>Selecione</option>
                {cidades.map(cidade => (
                  <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Bairro: </label>
              <select
                value={bairro}
                onChange={(event) => setBairro(event.target.value)}
              >
                <option>Selecione</option>
                {bairros.map(bairro => (
                  <option key={bairro.id} value={bairro.id}>{bairro.nome}</option>
                ))}
              </select>
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
            <div>
              <label>Observação: </label>
              <input
                value={observacao}
                onChange={(event) => setObservacao(event.target.value)}
                type="text" />
            </div>
            <div>
              <label>Idade: </label>
              <input
                value={idade}
                onChange={(event) => setIdade(event.target.value)}
                type="number" />
            </div>
            <button type="submit">Criar</button>
            <Link href="/contatos" className={styles.espacamento}>Voltar</Link>
          </form>
        </div>
      </div>
    </Authenticator>
  );
}