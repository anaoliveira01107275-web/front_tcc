"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useParams, useRouter } from "next/navigation";

export default function EditarProdutoPage() {

    const { id } = useParams();

    const router = useRouter();

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");

    async function loadProduto() {

        try {

            const response = await api.get(
                `/produtos/${id}`
            );

            setNome(response.data.nome);
            setDescricao(response.data.descricao);
            setPreco(String(response.data.preco));

        } catch (error) {

            console.log(error);

            alert("Erro ao carregar produto");

        }

    }

    useEffect(() => {

    async function fetchProduto() {

        await loadProduto();

    }

    fetchProduto();

}, []);

    async function handleUpdate() {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/produtos/${id}`,
                {
                    nome,
                    descricao,
                    preco: Number(preco)
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Produto atualizado!");

            router.push("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Erro ao atualizar");

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-6">

            <div className="w-full max-w-2xl bg-white rounded-[35px] p-8 shadow-2xl border-4 border-black">

                <h1 className="text-5xl font-black text-black mb-8 italic">
                    Editar Produto
                </h1>

                <div className="space-y-5">

                    <input
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full border-2 border-black p-4 rounded-2xl text-black outline-none"
                    />

                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        className="w-full border-2 border-black p-4 rounded-2xl h-40 text-black outline-none"
                    />

                    <input
                        type="number"
                        placeholder="Preço"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        className="w-full border-2 border-black p-4 rounded-2xl text-black outline-none"
                    />

                    <button
                        onClick={handleUpdate}
                        className="w-full bg-purple-700 hover:bg-purple-800 transition-all text-white p-4 rounded-2xl font-black"
                    >
                        Salvar Alterações
                    </button>

                </div>

            </div>

        </div>

    );

}