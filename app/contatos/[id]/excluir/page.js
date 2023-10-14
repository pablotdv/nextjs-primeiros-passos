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

    const handleDelete = async () => {
        const confirmation = window.confirm("Tem certeza de que deseja excluir este contato?")
        if (confirmation) {

            const resposta = await fetch(`${baseUrl}/api/contatos/${contato.id}`, {
                method: "DELETE",
            })
            if (resposta.ok) {
                router.push("/contatos")
            }
            else {
                alert("Erro ao excluir contato")
            }
        }
    }

    return (
        <div className={styles.container}>
            <h1>Excluir contato</h1>
            <div className={styles.principal}>
                <div>
                    <p><strong>Nome: </strong>{contato.nome}</p>
                    <p><strong>Estado: </strong>{contato.estado}</p>
                    <p><strong>Cidade: </strong>{contato.cidade}</p>
                    <p><strong>Bairro: </strong>{contato.bairro}</p>
                    <p><strong>Numero: </strong>{contato.numero}</p>
                    <p><strong>Tipo: </strong>{contato.tipo}</p>
                    <p><strong>Endereço: </strong>{contato.endereco}</p>
                    <p><strong>Telefone: </strong>{contato.telefone}</p>
                </div>
                <button onClick={handleDelete}>Excluir</button>
                <Link href="/contatos" className={styles.espacamento}>Voltar</Link>
            </div>
        </div>
    );
}