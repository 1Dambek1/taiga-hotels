"use server";

import { createClient } from "next-sanity";

// Создаем клиент с правами админа (через токен)
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Токен из .env файла
  useCdn: false, // Нам нужны свежие данные
  apiVersion: "2024-01-01",
});

export async function submitCareerForm(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;

  if (!name || !phone) {
    return { error: "Пожалуйста, заполните все поля" };
  }

  try {
    // Создаем документ в базе данных Sanity
    await client.create({
      _type: "careerEntry", // Тип, который мы создали в схеме
      name,
      phone,
      status: "new",
      submittedAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    console.error("Ошибка Sanity:", error);
    return { error: "Ошибка сервера. Попробуйте позже." };
  }
}
