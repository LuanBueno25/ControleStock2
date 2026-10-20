'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';
import Swal from 'sweetalert2';

function FormularioProdutoContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const idParam = searchParams.get('id');

    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [estoqueMinimo, setEstoqueMinimo] = useState('');
    const [editandoId, setEditandoId] = useState<number | null>(null);

    useEffect(() => {
        if (idParam) {
            api.get(`/produtos/${idParam}`).then(res => {
                const p = res.data;
                setEditandoId(p.id); setCodigo(p.codigo); setDescricao(p.descricao);
                setQuantidade(String(p.quantidade)); setValorUnitario(String(p.valorUnitario)); setEstoqueMinimo(String(p.estoqueMinimo));
            });
        }
    }, [idParam]);

    const salvar = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = { codigo, descricao, quantidade: Number(quantidade), valorUnitario: Number(valorUnitario), estoqueMinimo: Number(estoqueMinimo) };
        try {
            if (editandoId) await api.put(`/produtos/${editandoId}`, payload);
            else await api.post('/produtos', payload);
            await Swal.fire('Sucesso!', 'Produto salvo com sucesso.', 'success');
            router.push('/produtos');
        } catch (error: any) {
            Swal.fire('Erro!', error.response?.data?.erro || 'Erro ao salvar.', 'warning');
        }
    };

    const inputCls = "w-full p-2 border rounded outline-none focus:ring-2 focus:ring-blue-500";
    const labelCls = "block text-sm font-medium text-slate-700 mb-1";

    return (
        <div className="max-w-2xl mx-auto p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800">{editandoId ? 'Editar Produto' : 'Novo Produto'}</h1>
                <Link href="/produtos" className="text-slate-500 hover:underline">Cancelar</Link>
            </div>
            <form onSubmit={salvar} className="bg-white p-6 rounded-lg shadow border space-y-4">
                <div>
                    <label className={labelCls}>Código do Produto</label>
                    <input type="text" required value={codigo} onChange={e => setCodigo(e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label className={labelCls}>Descrição</label>
                    <input type="text" required value={descricao} onChange={e => setDescricao(e.target.value)} className={inputCls} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className={labelCls}>Quantidade</label>
                        <input type="number" required value={quantidade} onChange={e => setQuantidade(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Preço Unitário</label>
                        <input type="number" step="0.01" required value={valorUnitario} onChange={e => setValorUnitario(e.target.value)} className={inputCls} />
                    </div>
                    <div>
                        <label className={labelCls}>Estoque Mínimo</label>
                        <input type="number" required value={estoqueMinimo} onChange={e => setEstoqueMinimo(e.target.value)} className={inputCls} />
                    </div>
                </div>
                <button type="submit" className="w-full mt-4 bg-blue-600 text-white p-2 rounded font-medium hover:bg-blue-700 transition">Salvar Produto</button>
            </form>
        </div>
    );
}

export default function FormularioProduto() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Carregando...</div>}>
            <FormularioProdutoContent />
        </Suspense>
    );
}
