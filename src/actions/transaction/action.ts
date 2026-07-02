"use server";

import { createClient } from "@/lib/supabase/server";

export async function getBalanceSummary() {
  //dari sini
  const supabase = await createClient();

  const { data } = await supabase.from("transactions").select("amount, type");

  //sampe sini, berfungsi utk mengambil data transaksi dari tabel "transactions" di Supabase.

  const { totalIncome, totalExpense, savings } = (data || []).reduce(
    (acc, tx) => {
      if (tx.type === "income") acc.totalIncome += tx.amount;
      else if (tx.type === "expense") acc.totalExpense += tx.amount;
      acc.savings = acc.totalIncome - acc.totalExpense;
      return acc;
    },
    {
      totalIncome: 0,
      totalExpense: 0,
      savings: 0,
    },
  );

  return {
    totalIncome,
    totalExpense,
    savings,
  };

  // perhitungan apabila ada expenses maka akan update saldo
}

export async function getTransactions(params?: {
  limit?: number;
  page?: number;
  search?: string;
}) {
  const { limit = 10, page = 1, search } = params || {};
  const supabase = await createClient();
  let query = supabase
    .from("transactions")
    .select("id, amount, type, description, date, category", {
      count: "exact",
    });

  if (search) {
    query = query.ilike("description", `%${search}%`);
  }

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await query.range(from, to);

  if (error) throw new Error(error.message);

  const totalData = count || 0;

  return {
    data,
    totalData,
    totalPages: Math.ceil(totalData / limit),
  };

  //fungsi ini digunakan untuk
  //1. mengambil data transaksi
  //2. melakukan pencarian transaksi berdasarkan deskripsi
  //3. melakukan paginasi data transaksi
}
