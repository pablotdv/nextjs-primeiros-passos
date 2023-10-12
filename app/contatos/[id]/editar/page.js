"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../../contatos.module.css"
import { useRouter } from "next/navigation";

const baseUrl =
    (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function buscarContato(id) {
    try {
        const resposta = await fetch(`${baseUrl}/api/contatos/${id}`, { cache: 'no-store' });
        return await resposta.json();
    } catch (erro) {
        console.error(erro);
        return [];
    }
}

export default function Page({ params: { id } }) {
    const router = useRouter();
    const [contato, setContato] = useState({ nome: '', endereco: '', telefone: '' })
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
    
        const resposta = await fetch(`${baseUrl}/api/contatos/${contato.id}`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
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
                        <label>Endereco: </label>
                        <input
                            value={contato.endereco}
                            name="endereco"
                            onChange={handleChange}
                            type="text" />
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
    );
}