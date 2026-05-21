"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/services/api";

export default function LoginPage() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function handleLogin() {

        try {

            const response = await api.post("/login", {
                email,
                senha
            });

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            router.push("/dashboard");

        } catch (error) {

            console.log(error);

            alert("Erro no login");

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Marketplace
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Entre na sua conta
                    </p>

                </div>

                <div className="space-y-4">

                    <input
                        type="email"
                        placeholder="Digite seu email"
                        className="w-full border border-gray-300 p-4 rounded-xl outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        className="w-full border border-gray-300 p-4 rounded-xl outline-none"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button
                        onClick={handleLogin}
                        className="w-full bg-black text-white p-4 rounded-xl font-semibold"
                    >
                        Entrar
                    </button>

                </div>

            </div>

        </div>

    );

}