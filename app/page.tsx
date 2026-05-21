"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { api } from "@/services/api";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
}

export default function HomePage() {

    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {

        loadProdutos();

    }, []);

    async function loadProdutos() {

        try {

            const response = await api.get("/produtos");

            setProdutos(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="min-h-screen bg-gray-100">

            <header className="bg-black text-white p-6">

                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    <h1 className="text-3xl font-bold">
                        Marketplace
                    </h1>

                    <div className="flex gap-4">

                        <Link
                            href="/login"
                            className="bg-white text-black px-5 py-2 rounded-xl font-semibold"
                        >
                            Login
                        </Link>

                        <Link
                            href="/dashboard"
                            className="border border-white px-5 py-2 rounded-xl"
                        >
                            Dashboard
                        </Link>

                    </div>

                </div>

            </header>

            <main className="max-w-7xl mx-auto p-10">

                <h2 className="text-4xl font-bold mb-10">
                    Produtos
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {produtos.map((produto) => (

                        <div
                            key={produto.id}
                            className="bg-white rounded-3xl shadow-xl p-6"
                        >

                            <div className="h-52 bg-gray-200 rounded-2xl mb-5 flex items-center justify-center">

                                <span className="text-gray-500">
                                    Sem imagem
                                </span>

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

                        </div>

                    ))}

                </div>

            </main>

        </div>

    );

}