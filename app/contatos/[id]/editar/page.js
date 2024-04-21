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

  const [estados, setEstados] = useState([])
  const [cidades, setCidades] = useState([])
  const [bairros, setBairros] = useState([])

  const [estadoId, setEstadoId] = useState(0)
  const [cidadeId, setCidadeId] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const data = await buscarContato(id)      
      setContato(data)
      setEstadoId(data.estadoid)
      setCidadeId(data.cidadeid)
    }
    fetchData()
  }, [id])

  useEffect(() => {
    async function buscarEstados() {
      const token = localStorage.getItem('token');
      const resposta = await fetch(`${baseUrl}/api/estados`, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const dados = await resposta.json();
      setEstados(dados);
    }
    buscarEstados();
  }, [])

  useEffect(() => {
    async function buscarCidades() {
      const token = localStorage.getItem('token');
      const resposta = await fetch(`${baseUrl}/api/cidades?estadoid=${estadoId}`, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const dados = await resposta.json();
      setCidades(dados);
    }
    if (estadoId) {
      buscarCidades();
    }
  }, [estadoId])

  useEffect(() => {
    async function buscarBairros() {
      const token = localStorage.getItem('token');
      const resposta = await fetch(`${baseUrl}/api/bairros?cidadeid=${cidadeId}`, {
        cache: 'no-store',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const dados = await resposta.json();
      setBairros(dados);
    }
    if (cidadeId) {
      buscarBairros();
    }
  }, [cidadeId])

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
              <label>Estado: </label>
              <select
                value={estadoId}
                onChange={(event) => {
                  setCidades([])
                  setBairros([])
                  setCidadeId(0)                  
                  setContato(prevState => ({ ...prevState, bairroid: 0 }))                  
                  setEstadoId(event.target.value)                  
                }}
                name="estadoid"
              >
                <option>Selecione</option>
                {estados.map(estado => (
                  <option key={estado.id} value={estado.id}>{estado.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Cidade: </label>
              <select
                value={cidadeId}
                onChange={(event) => {
                  setBairros([]);
                  setContato(prevState => ({ ...prevState, bairroid: 0 }))
                  setCidadeId(event.target.value);                  
                }}
                name="cidadeid"
              >
                <option>Selecione</option>
                {cidades.map(cidade => (
                  <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Bairro: </label>
              <select
                value={contato.bairroid}
                onChange={handleChange}
                name="bairroid"
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
                onChange={handleChange}
                name="tipo"
                >
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