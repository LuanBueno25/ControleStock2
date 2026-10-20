'use client';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function MovimentacaoEstoque() {
    const [produtos, setProdutos] = useState<any[]>([]);
    const [produtoId, setProdutoId] = useState('');
    const [tipo, setTipo] = useState('SAIDA');
    const [quantidade, setQuantidade] = useState('');
    const [dataMovimentacao, setDataMovimentacao] = useState('');
    useEffect(() => {
        setDataMovimentacao(new Date().toISOString().slice(0, 10));
    }, []);
    const [historico, setHistorico] = useState<any[]>([]);

    const carregar = () => api.get('/produtos').then(res => setProdutos(res.data));
    const carregarHistorico = () => api.get('/movimentacoes').then(res => setHistorico(res.data));
    useEffect(() => { carregar(); carregarHistorico(); }, []);

    const registrar = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('userLogado') || '{}');
        try {
            const res = await api.post('/movimentacoes', { produtoId: Number(produtoId), tipo, quantidade: Number(quantidade), usuarioId: user.id, data: new Date(`${dataMovimentacao}T12:00:00`).toISOString() });
            if (res.data.alerta) Swal.fire('Aviso: Estoque Baixo!', res.data.alerta, 'warning');
            else Swal.fire('Sucesso!', 'Movimentação registrada.', 'success');
            setQuantidade('');
            carregar();
            carregarHistorico();
        } catch (error: any) {
            Swal.fire('Erro!', error.response?.data?.erro || "Erro ao registrar", 'error');
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Movimentações de Estoque</h1>
                <Link href="/dashboard" className="text-blue-600 hover:underline">Voltar</Link>
            </div>
            <form onSubmit={registrar} className="bg-white p-6 rounded shadow border">
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Produto:</label>
                    <select required value={produtoId} onChange={e => setProdutoId(e.target.value)} className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-emerald-500">
                        <option value="">Selecione um produto...</option>
                        {produtos.map(p => (<option key={p.id} value={p.id}>{p.descricao} (Estoque atual: {p.quantidade})</option>))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Data da movimentação:</label>
                    <input type="date" required value={dataMovimentacao} onChange={e => setDataMovimentacao(e.target.value)} className="w-full p-2 border rounded" />
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block mb-2 font-medium">Tipo:</label>
                        <select value={tipo} onChange={e => setTipo(e.target.value)} className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-emerald-500">
                            <option value="ENTRADA">Entrada (+)</option>
                            <option value="SAIDA">Saída (-)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Quantidade:</label>
                        <input type="number" required value={quantidade} onChange={e => setQuantidade(e.target.value)} className="w-full p-2 border rounded outline-none focus:ring-2 focus:ring-emerald-500" />
                    </div>
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white p-3 rounded font-bold hover:bg-emerald-700">Salvar Movimentação</button>
            </form>
            <section className="mt-8 bg-white p-5 rounded shadow border">
                <h2 className="text-xl font-bold mb-4">Histórico de movimentações</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead><tr className="text-left border-b"><th className="p-2">Data</th><th className="p-2">Produto ID</th><th className="p-2">Usuário ID</th><th className="p-2">Tipo</th><th className="p-2">Quantidade</th></tr></thead>
                        <tbody>{historico.map(m => <tr key={m.id} className="border-b"><td className="p-2">{new Date(m.data).toLocaleString('pt-BR')}</td><td className="p-2">{m.produtoId}</td><td className="p-2">{m.usuarioId}</td><td className="p-2">{m.tipo}</td><td className="p-2">{m.quantidade}</td></tr>)}</tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
