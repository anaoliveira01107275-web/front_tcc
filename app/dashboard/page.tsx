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

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [busca, setBusca] = useState("");

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

    const produtosFiltrados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-10">

            <div className="max-w-6xl mx-auto">

                <div className="bg-black/80 backdrop-blur-xl border border-gray-700 rounded-3xl p-5 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">

                    <div className="flex items-center gap-4">

                        <img
                            src="/logo_zick.png"
                            alt="ZickZone"
                            className="w-16 h-16 rounded-full border-4 border-purple-500 shadow-xl shadow-purple-900"
                        />

                        <div>

                            <h1 className="text-3xl font-black text-white italic">
                                ZickZone
                            </h1>

                            <p className="text-gray-400 text-sm">
                                Marketplace Streetwear
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">

                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="bg-white text-black px-5 py-3 rounded-2xl outline-none w-full md:w-[300px] shadow-xl"
                        />

                        <button
                            onClick={() => {

                                localStorage.removeItem("token");

                                window.location.href = "/";

                            }}
                            className="bg-red-500 hover:bg-red-600 transition-all px-5 py-3 rounded-2xl text-white font-bold shadow-xl"
                        >
                            Sair
                        </button>

                    </div>

                </div>

                {
                    busca === "" && (

                        <div className="bg-white p-8 rounded-[35px] shadow-2xl mb-10 border-4 border-black">

                            <div className="flex items-center gap-4 mb-8">

                                <img
                                    src="/logo_zick.png"
                                    alt="ZickZone"
                                    className="w-24 h-24 rounded-full object-cover shadow-2xl shadow-black border-4 border-black"
                                />

                                <h1 className="text-5xl font-extrabold text-black italic tracking-normal">
                                    ZickZone Dashboard
                                </h1>

                            </div>

                            <div className="space-y-4">

                                <input
                                    type="text"
                                    placeholder="Nome do produto"
                                    className="w-full border-2 border-black p-4 rounded-2xl text-black placeholder:text-gray-500 outline-none"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />

                                <textarea
                                    placeholder="Descrição"
                                    className="w-full border-2 border-black p-4 rounded-2xl h-32 text-black placeholder:text-gray-500 outline-none"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                />

                                <input
                                    type="number"
                                    placeholder="Preço"
                                    className="w-full border-2 border-black p-4 rounded-2xl text-black placeholder:text-gray-500 outline-none"
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                />

                                <input
                                    type="file"
                                    className="w-full border-2 border-black p-3 rounded-2xl text-black"
                                    onChange={(e) => {

                                        if (e.target.files) {
                                            setImagem(e.target.files[0]);
                                        }

                                    }}
                                />

                                <button
                                    onClick={handleCreateProduct}
                                    className="w-full bg-purple-700 hover:bg-purple-800 transition-all text-white p-4 rounded-2xl font-black shadow-xl"
                                >
                                    Cadastrar Produto
                                </button>

                            </div>

                        </div>

                    )
                }

                <h2 className="text-4xl font-black text-white mb-8 uppercase tracking-widest italic">
                    Meus Produtos
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {produtosFiltrados.map((produto) => (

                        <div
                            key={produto.id}
                            className="bg-white rounded-[35px] shadow-2xl p-6 border-4 border-black hover:scale-105 transition-all duration-300"
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

                            <h3 className="text-3xl font-black text-black uppercase italic">
                                {produto.nome}
                            </h3>

                            <p className="text-black mt-2 text-lg">
                                {produto.descricao}
                            </p>

                            <p className="text-4xl font-black text-purple-700 mt-5">
                                R$ {produto.preco}
                            </p>

                            <div className="flex gap-3 mt-6 mb-4">

                                <a
                                    href={`/dashboard/editar/${produto.id}`}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 transition-all text-white p-3 rounded-xl font-semibold text-center"
                                >
                                    Editar
                                </a>

                                <button
                                    onClick={() => handleDelete(produto.id)}
                                    className="flex-1 bg-red-500 hover:bg-red-600 transition-all text-white p-3 rounded-xl font-semibold"
                                >
                                    Deletar
                                </button>

                            </div>

                            <a
                                href={`/produto/${produto.id}`}
                                className="block text-center bg-black hover:bg-gray-800 transition-all text-white p-3 rounded-xl font-bold"
                            >
                                Ver Produto
                            </a>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}