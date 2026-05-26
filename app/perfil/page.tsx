"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";

interface Usuario {
    id: number;
    nome: string;
    email: string;
}

interface Produto {
    id: number;
}

export default function PerfilPage() {

    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [quantidadeProdutos, setQuantidadeProdutos] = useState(0);

    useEffect(() => {

        loadPerfil();

    }, []);

    async function loadPerfil() {

        try {

            const token = localStorage.getItem("token");

            const responseProdutos = await api.get(
                "/meus-produtos",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setQuantidadeProdutos(responseProdutos.data.length);

            const responseUsuario = await api.get(
                "/me",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setUsuario(responseUsuario.data);

        } catch (error) {

            console.log(error);

        }

    }

    function handleLogout() {

        localStorage.removeItem("token");

        window.location.href = "/";

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-6">

            <div className="bg-white w-full max-w-xl rounded-[40px] shadow-2xl border-4 border-black p-10">

                <div className="flex flex-col items-center">

                    <img
                        src="/logo_zick.png"
                        alt="Perfil"
                        className="w-32 h-32 rounded-full border-4 border-purple-600 shadow-2xl shadow-purple-900 object-cover"
                    />

                    <h1 className="text-5xl font-black text-black italic mt-6">
                        Meu Perfil
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Usuário da ZickZone
                    </p>

                </div>

                <div className="mt-10 space-y-5">

                    <div className="bg-gray-100 p-5 rounded-2xl border-2 border-black">

                        <p className="text-gray-500 text-sm">
                            Nome
                        </p>

                        <h2 className="text-2xl font-bold text-black">
                            {usuario?.nome}
                        </h2>

                    </div>

                    <div className="bg-gray-100 p-5 rounded-2xl border-2 border-black">

                        <p className="text-gray-500 text-sm">
                            Email
                        </p>

                        <h2 className="text-2xl font-bold text-black">
                            {usuario?.email}
                        </h2>

                    </div>

                    <div className="bg-gray-100 p-5 rounded-2xl border-2 border-black">

                        <p className="text-gray-500 text-sm">
                            Produtos cadastrados
                        </p>

                        <h2 className="text-2xl font-bold text-purple-700">
                            {quantidadeProdutos}
                        </h2>

                    </div>

                </div>

                <div className="flex gap-4 mt-10">

                    <a
                        href="/dashboard"
                        className="flex-1 bg-black hover:bg-gray-800 transition-all text-white text-center p-4 rounded-2xl font-bold"
                    >
                        Dashboard
                    </a>



                    <a
                        href="/perfil"
                        className="bg-purple-700 hover:bg-purple-800 transition-all px-5 py-3 rounded-2xl text-white font-bold shadow-xl"
                    >
                        Perfil
                    </a>

                    <button
                        onClick={handleLogout}
                        className="flex-1 bg-red-500 hover:bg-red-600 transition-all text-white p-4 rounded-2xl font-bold"
                    >
                        Sair
                    </button>


                    
                


                </div>

            </div>

        </div>

    );

}