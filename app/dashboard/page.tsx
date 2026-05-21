"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
}

export default function DashboardPage() {

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState<File | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {

        loadProdutos();

    }, []);

    async function loadProdutos() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/meus-produtos",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setProdutos(response.data);

        } catch (error) {

            console.log(error);

        }

    }

async function handleCreateProduct() {

    try {

        const token = localStorage.getItem("token");

        let nomeImagem = "";

        if (imagem) {

            const formData = new FormData();

            formData.append("file", imagem);

            const uploadResponse = await api.post(
                "/upload",
                formData
            );

            nomeImagem = uploadResponse.data.image;

        }

        await api.post(
            "/produtos",
            {
                nome,
                descricao,
                preco: Number(preco),
                imagem: nomeImagem
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setNome("");
        setDescricao("");
        setPreco("");
        setImagem(null);

        loadProdutos();

    } catch (error) {

        console.log(error);

        alert("Erro ao cadastrar");

    }

}

    async function handleDelete(id: number) {

        try {

            const token = localStorage.getItem("token");

            await api.delete(
                `/produtos/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            loadProdutos();

        } catch (error) {

            console.log(error);

            alert("Erro ao deletar");

        }

    }
    function handleEdit(produto: Produto) {

        setEditingId(produto.id);

        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(String(produto.preco));

    }
    async function handleUpdateProduct() {

        try {

            const token = localStorage.getItem("token");

            await api.put(
                `/produtos/${editingId}`,
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

            setEditingId(null);

            setNome("");
            setDescricao("");
            setPreco("");

            loadProdutos();

        } catch (error) {

            console.log(error);

            alert("Erro ao editar");

        }

    }


    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-6xl mx-auto">

                <div className="bg-white p-8 rounded-3xl shadow-xl mb-10">

                    <h1 className="text-4xl font-bold mb-8">
                        Dashboard
                    </h1>

                    <div className="space-y-4">

                        <input
                            type="text"
                            placeholder="Nome do produto"
                            className="w-full border p-4 rounded-xl"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <textarea
                            placeholder="Descrição"
                            className="w-full border p-4 rounded-xl h-32"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Preço"
                            className="w-full border p-4 rounded-xl"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                        />

                        <input
    type="file"
    onChange={(e) => {

        if (e.target.files) {
            setImagem(e.target.files[0]);
        }

    }}
/>



                        <button
                            onClick={
                                editingId
                                    ? handleUpdateProduct
                                    : handleCreateProduct
                            }
                            className="w-full bg-black text-white p-4 rounded-xl font-semibold"
                        >
                            {editingId ? "Salvar Alterações" : "Cadastrar Produto"}
                        </button>

                    </div>

                </div>

                <h2 className="text-3xl font-bold mb-8">
                    Meus Produtos
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {produtos.map((produto) => (

                        <div
                            key={produto.id}
                            className="bg-white rounded-3xl shadow-xl p-6"
                        >

                            <div className="h-48 bg-gray-200 rounded-2xl mb-5 overflow-hidden">

    {
        produto.imagem ? (

            <img
                src={`http://localhost:3333/files/${produto.imagem}`}
                className="w-full h-full object-cover"
                alt={produto.nome}
            />

        ) : (

            <div className="w-full h-full flex items-center justify-center">

                <span className="text-gray-500">
                    Sem imagem
                </span>

            </div>

        )
    }

</div>

                            <h3 className="text-2xl font-bold">
                                {produto.nome}
                            </h3>

                            <p className="text-gray-500 mt-2">
                                {produto.descricao}
                            </p>

                            <p className="text-3xl font-bold mt-5">
                                R$ {produto.preco}
                            </p>

                            <div className="flex gap-3 mt-6">

                                <button
                                    onClick={() => handleEdit(produto)}
                                    className="flex-1 bg-blue-500 text-white p-3 rounded-xl font-semibold"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleDelete(produto.id)}
                                    className="flex-1 bg-red-500 text-white p-3 rounded-xl font-semibold"
                                >
                                    Deletar
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}