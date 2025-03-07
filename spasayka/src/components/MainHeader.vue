<template>
  <header
    class="bg-white shadow-md px-8 py-4 flex items-center justify-between w-full fixed top-0 left-0"
  >
    <h1 class="text-3xl font-semibold text-gray-800">Мое веб-приложение</h1>
    <nav class="space-x-6">
      <router-link to="/" class="text-lg text-gray-700 hover:text-blue-600 transition"
        >Главная</router-link
      >
      <router-link to="/about" class="text-lg text-gray-700 hover:text-blue-600 transition"
        >О нас</router-link
      >
      <router-link to="/contact" class="text-lg text-gray-700 hover:text-blue-600 transition"
        >Контакты</router-link
      >
    </nav>
  </header>
</template>
