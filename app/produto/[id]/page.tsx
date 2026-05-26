"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/services/api";
import { motion } from "framer-motion";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
}

export default function ProdutoPage() {

    const { id } = useParams();

    const [produto, setProduto] = useState<Produto | null>(null);

    useEffect(() => {

    if (id) {
        loadProduto();
    }

}, [id]);

    async function loadProduto() {

        try {

            const response = await api.get(`/produtos/${id}`);

            setProduto(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    if (!produto) {

        return (

            <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-black via-gray-900 to-black text-3xl font-bold">

                Carregando...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-8 overflow-hidden">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-6xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.25)]"
            >

                <div className="grid grid-cols-1 lg:grid-cols-2">

                    <div className="relative h-[400px] lg:h-full overflow-hidden">

                        

                        <img
                            src={`http://localhost:3333/files/${produto.imagem}`}
                            className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
                            alt={produto.nome}
                        />

                    </div>

                    <div className="p-10 flex flex-col justify-center">

                        <h1 className="text-5xl font-black italic text-white">
                            {produto.nome}
                        </h1>

                        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 mt-8">

                            <p className="text-gray-200 text-xl leading-relaxed">
                                {produto.descricao}
                            </p>

                        </div>

                        <p className="text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mt-10">
                            R$ {produto.preco}
                        </p>

                        <div className="mt-8 space-y-3">

                            <p className="text-green-400 font-semibold">
                                ✓ Produto disponível
                            </p>

                            <p className="text-green-400 font-semibold">
                                ✓ Envio imediato
                            </p>

                           

                        </div>

                        <a
                            href="/dashboard"
                            className="mt-12 w-[250px] bg-black hover:bg-gray-800 transition-all text-white py-4 rounded-2xl font-bold text-center shadow-2xl hover:scale-105 duration-300"
                        >
                             Voltar
                        </a>

                    </div>

                </div>

            </motion.div>

        </div>

    );

}