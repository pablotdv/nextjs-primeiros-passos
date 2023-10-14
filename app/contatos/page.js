"use client"
import { useState, useEffect } from 'react';
import styles from './contatos.module.css'
import Link from 'next/link'

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarContatos(bairro) {
  try {
    const resposta = await fetch(`${baseUrl}/api/contatos?bairro=${bairro}`, { cache: 'no-store' });
    return await resposta.json();
  } catch (erro) {
    console.error(erro);
    return [];
  }
}

export default function Page() {

  const [bairro, setBairro] = useState('');
  const [contatos, setContatos] = useState([])

  //const contatos = await buscarContatos();
  useEffect(() => {
    buscarContatos(bairro).then(results => {
      setContatos(results);
    })
  }, [bairro])
  return (
    <div className={styles.container}>
      <h1>Olá NextJS - Contatos Page</h1>
      <Link href="/contatos/criar">Criar</Link>
      <div className={styles.principal}>
        <input 
          value={bairro}
          onChange={event => setBairro(event.target.value)}
          placeholder='Pesquisa por bairro...'
        />
        <table className={styles.contatos}>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Bairro</th>
              <th>Numero</th>
              <th>Logradouro</th>
              <th>Tipo</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {
              contatos.map((contato) =>
                <tr key={contato.id}>
                  <td>
                    <Link href={`/contatos/${contato.id}/editar`}>Editar</Link> | <Link href={`/contatos/${contato.id}/excluir`}>Excluir</Link>
                  </td>
                  <td>{contato.nome}</td>
                  <td>{contato.estado}</td>
                  <td>{contato.cidade}</td>
                  <td>{contato.bairro}</td>
                  <td>{contato.numero}</td>
                  <td>{contato.logradouro}</td>
                  <td>{contato.tipo}</td>
                  <td>{contato.telefone}</td>
                </tr>
              )
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="9">Total contatos: {contatos.length}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}