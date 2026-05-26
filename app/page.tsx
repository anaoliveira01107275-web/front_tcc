"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { api } from "@/services/api";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imagem?: string;
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

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white overflow-hidden">

            <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] bg-purple-700 opacity-20 blur-[150px] rounded-full" />

            <div className="absolute bottom-[-150px] right-[-100px] w-[400px] h-[400px] bg-pink-600 opacity-20 blur-[150px] rounded-full" />

            <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">

                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

                    <h1 className="text-4xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                        ZickZone
                    </h1>

                    <div className="flex gap-4">

                        <Link
                            href="/login"
                            className="bg-white text-black px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
                        >
                            Login
                        </Link>

                        <Link
                            href="/dashboard"
                            className="border border-white/20 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Dashboard
                        </Link>

                    </div>

                </div>

            </header>

            <main className="max-w-7xl mx-auto px-6 py-16 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-20"
                >

                    <h2 className="text-6xl font-black leading-tight max-w-3xl">
                        O marketplace mais moderno para vender roupas 🔥
                    </h2>

                    <p className="text-gray-400 text-xl mt-6 max-w-2xl leading-relaxed">
                        Descubra roupas incríveis, publique seus produtos
                        e tenha uma experiência moderna e elegante.
                    </p>

                </motion.div>

                <div className="flex items-center justify-between mb-10">

                    <h3 className="text-4xl font-black">
                        Produtos
                    </h3>

                    <div className="bg-white/10 border border-white/10 px-5 py-2 rounded-2xl text-gray-300">
                        {produtos.length} produtos
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {produtos.map((produto, index) => (

                        <motion.div
                            key={produto.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[35px] overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.08)] hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] transition-all duration-500"
                        >

                            <div className="relative h-72 overflow-hidden">

                                {
                                    produto.imagem ? (

                                        <img
                                            src={`http://localhost:3333/files/${produto.imagem}`}
                                            alt={produto.nome}
                                            className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
                                        />

                                    ) : (

                                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">

                                            <span className="text-gray-400 text-lg">
                                                Sem imagem
                                            </span>

                                        </div>

                                    )
                                }

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                            </div>

                            <div className="p-7">

                                <h3 className="text-3xl font-black">
                                    {produto.nome}
                                </h3>

                                <p className="text-gray-300 mt-3 text-lg leading-relaxed">
                                    {produto.descricao}
                                </p>

                                <div className="flex items-center justify-between mt-8">

                                    <p className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                        R$ {produto.preco}
                                    </p>

                                    <Link
                                        href={`/produto/${produto.id}`}
                                        className="bg-white text-black px-5 py-3 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
                                    >
                                        Ver
                                    </Link>

                                </div>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </main>

        </div>

    );

}