"use client"
import { useState, useEffect } from 'react';
import styles from './contatos.module.css'
import Link from 'next/link'
import Authenticator from '@/src/components/authenticator';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';

const baseUrl =
  (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarContatos(bairro) {
  try {
    const token = localStorage.getItem('token');
    const resposta = await fetch(`${baseUrl}/api/contatos?bairro=${bairro}`, {
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

export default function Page() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [contatoDetalhe, setContatoDetalhe] = useState(null);

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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{contatoDetalhe.nome}</ModalHeader>
              <ModalBody>
                <div>
                  <p><strong>Nome: </strong>{contatoDetalhe.nome}</p>
                  <p><strong>Estado: </strong>{contatoDetalhe.estado}</p>
                  <p><strong>Cidade: </strong>{contatoDetalhe.cidade}</p>
                  <p><strong>Bairro: </strong>{contatoDetalhe.bairro}</p>
                  <p><strong>Numero: </strong>{contatoDetalhe.numero}</p>
                  <p><strong>Tipo: </strong>{contatoDetalhe.tipo}</p>
                  <p><strong>Endereço: </strong>{contatoDetalhe.endereco}</p>
                  <p><strong>Telefone: </strong>{contatoDetalhe.telefone}</p>
                  <p><strong>Observação: </strong>{contatoDetalhe.observacao}</p>
                  <p><strong>Idade: </strong>{contatoDetalhe.idade}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} color="danger" variant='light'>Fechar</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

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
                    <Button onClick={() => {
                      setContatoDetalhe(contato);
                      onOpen()
                    }}>Detalhes</Button>
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